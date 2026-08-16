/**
 * test-index.mjs — Atlas vector index verify karta hai BINA Gemini API call ke.
 *
 * Ek stored document ka apna embedding hi query vector ki tarah use karta hai.
 * Wo document khud top result aana chahiye, score ~1.0 pe.
 * Agar aisa hua to index bilkul sahi hai — sirf quota ka intezaar hai.
 *
 * Run (frontend folder se):
 *   node scripts/test-index.mjs
 */

import fs from "node:fs";
import path from "node:path";
import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const DB_NAME = "kisaan";
const COLLECTION = "kcc_knowledge";
const VECTOR_INDEX = "kcc_vector_index";

loadEnvLocal();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) fail("MONGODB_URI .env.local me nahi mila");

const client = new MongoClient(MONGODB_URI);

try {
  await client.connect();
  const col = client.db(DB_NAME).collection(COLLECTION);

  const total = await col.countDocuments();
  console.log(`\nCollection: ${DB_NAME}.${COLLECTION}`);
  console.log(`Total documents: ${total}`);
  if (total === 0) fail("Collection khali hai — pehle ingestion chalao.");

  // Beech me se ek document lo (pehla nahi, taaki test thoda realistic ho)
  const skip = Math.floor(total / 2);
  const sample = await col.find({}).skip(skip).limit(1).next();

  if (!sample?.embedding) fail("Document me 'embedding' field nahi hai. Ingestion adhoori hai.");

  console.log(`Embedding dimension: ${sample.embedding.length}`);
  console.log(`\nTest document:`);
  console.log(`  Q: ${sample.question}`);
  console.log(`  crop: ${sample.crop} | district: ${sample.district}\n`);

  console.log("Vector search chala rahe hain (koi API call nahi)...\n");

  const results = await col
    .aggregate([
      {
        $vectorSearch: {
          index: VECTOR_INDEX,
          path: "embedding",
          queryVector: sample.embedding,
          numCandidates: 100,
          limit: 3,
        },
      },
      {
        $project: {
          question: 1,
          answer: 1,
          crop: 1,
          queryType: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ])
    .toArray();

  if (!results.length) {
    console.log("❌ Koi result nahi mila.\n");
    console.log("Ye check karo Atlas me:");
    console.log("  1. Index ka naam exactly 'kcc_vector_index' hai?");
    console.log("  2. Status 'Active' hai (Building nahi)?");
    console.log("  3. Type 'Vector Search' hai, plain 'Search' nahi?");
    console.log(`  4. numDimensions ${sample.embedding.length} hai?`);
    console.log("  5. Database 'kisaan', collection 'kcc_knowledge' pe bana hai?");
    process.exit(1);
  }

  console.log(`✅ ${results.length} results mile:\n`);
  results.forEach((r, i) => {
    const tags = [r.crop, r.queryType].filter(Boolean).join(" · ");
    console.log(`[${i + 1}] score ${r.score.toFixed(4)}  ${tags}`);
    console.log(`    Q: ${r.question}`);
    console.log(`    A: ${String(r.answer).slice(0, 150)}`);
    console.log();
  });

  const top = results[0].score;
  if (top > 0.99) {
    console.log("✅ Top score ~1.0 — index bilkul sahi kaam kar raha hai.");
    console.log("   RAG pipeline ready hai. Bas Gemini quota wapas aane ka intezaar.");
  } else {
    console.log(`⚠️  Top score ${top.toFixed(4)} hai, ~1.0 hona chahiye tha.`);
    console.log("   Similarity setting 'cosine' hai? numDimensions match kar rahi hai?");
  }
} finally {
  await client.close();
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