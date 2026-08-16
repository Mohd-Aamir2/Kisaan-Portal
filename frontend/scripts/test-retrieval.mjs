/**
 * test-retrieval.mjs — sirf vector search test karta hai, chatbot ke bina.
 *
 * Run (frontend folder se):
 *   node scripts/test-retrieval.mjs "aloo me jhulsa rog ka ilaj"
 *   node scripts/test-retrieval.mjs "wheat me kharpatwar kaise hataye"
 */

import fs from "node:fs";
import path from "node:path";
import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const DB_NAME = "kisaan";
const COLLECTION = "kcc_knowledge";
const VECTOR_INDEX = "kcc_vector_index";
const EMBED_MODEL = "models/gemini-embedding-2";
const OUTPUT_DIM = 768;

loadEnvLocal();

const API_KEY = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const query = process.argv[2] || "aloo me jhulsa rog ka ilaj kya hai";

if (!API_KEY) fail("GOOGLE_GENAI_API_KEY missing");
if (!MONGODB_URI) fail("MONGODB_URI missing");

console.log(`\nQuery: "${query}"\n`);

const client = new MongoClient(MONGODB_URI);

try {
  await client.connect();
  const col = client.db(DB_NAME).collection(COLLECTION);

  const total = await col.countDocuments();
  console.log(`Collection me total documents: ${total}`);
  if (total === 0) fail("Collection khali hai — pehle ingestion chalao.");

  console.log("Query embed kar rahe hain...");
  const vector = await embedQuery(query);
  if (!vector) fail("Embedding fail hui — quota ya API key check karo.");
  console.log(`Embedding dimension: ${vector.length}\n`);

  const results = await col
    .aggregate([
      {
        $vectorSearch: {
          index: VECTOR_INDEX,
          path: "embedding",
          queryVector: vector,
          numCandidates: 100,
          limit: 5,
        },
      },
      {
        $project: {
          question: 1,
          answer: 1,
          crop: 1,
          district: 1,
          queryType: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ])
    .toArray();

  if (!results.length) {
    console.log("❌ Koi result nahi mila.");
    console.log("   Check karo: index ka naam 'kcc_vector_index' hai? Status Active hai?");
    console.log("   numDimensions 768 hai? Type 'vectorSearch' hai (plain 'search' nahi)?");
  } else {
    console.log(`✅ ${results.length} results mile:\n`);
    results.forEach((r, i) => {
      const tags = [r.crop, r.district, r.queryType].filter(Boolean).join(" · ");
      console.log(`[${i + 1}] score ${r.score.toFixed(4)}  ${tags}`);
      console.log(`    Q: ${r.question}`);
      console.log(`    A: ${String(r.answer).slice(0, 200)}`);
      console.log();
    });
  }
} finally {
  await client.close();
}

async function embedQuery(text) {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/${EMBED_MODEL}:embedContent?key=${API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: EMBED_MODEL,
      content: { parts: [{ text }] },
      taskType: "RETRIEVAL_QUERY",
      outputDimensionality: OUTPUT_DIM,
    }),
  });

  if (!res.ok) {
    console.error(`Embed HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return null;
  }

  const values = (await res.json())?.embedding?.values;
  if (!values) return null;

  let sum = 0;
  for (const v of values) sum += v * v;
  const norm = Math.sqrt(sum);
  return norm > 0 ? values.map((v) => v / norm) : values;
}

function loadEnvLocal() {
  const p = path.resolve(".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf-8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

function fail(msg) {
  console.error("ERROR: " + msg);
  process.exit(1);
}