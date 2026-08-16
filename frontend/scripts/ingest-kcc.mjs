/**
 * ingest-kcc.mjs — KCC records ko embed karke MongoDB Atlas me daalta hai.
 *
 * Run (frontend folder se):
 *   node scripts/ingest-kcc.mjs --limit 500
 *   node scripts/ingest-kcc.mjs                      # sab
 *   node scripts/ingest-kcc.mjs --query-type "Plant Protection"
 *
 * Zaruri env (.env.local me):
 *   GOOGLE_GENAI_API_KEY=...
 *   MONGODB_URI=...
 *
 * Resumable hai — dobara chalane pe jo pehle se daal chuke hain unhe skip karta hai.
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);


// ── config ───────────────────────────────────────────────────────
const DATA_FILE = path.resolve("data/kcc_clean.jsonl");
const DB_NAME = "kisaan";
const COLLECTION = "kcc_knowledge";

const EMBED_MODEL = "models/gemini-embedding-2";

// 3072 (default) M0 free tier ki 512MB limit kha jaata hai.
// 768 pe ~62MB lagta hai aur quality lagbhag utni hi rehti hai.
const OUTPUT_DIM = 768;

const BATCH_SIZE = 20;      // ek request me kitne texts
const SLEEP_MS = 6000;      // rate limit se bachne ke liye
const MAX_RETRIES = 4;

// batch endpoint har model pe nahi hota - fail hone pe single pe gir jaate hain
let useBatch = true;

// ── env ──────────────────────────────────────────────────────────
loadEnvLocal();

const API_KEY = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

if (!API_KEY) fail("GOOGLE_GENAI_API_KEY .env.local me nahi mila");
if (!MONGODB_URI) fail("MONGODB_URI .env.local me nahi mila");
if (!fs.existsSync(DATA_FILE)) fail(`Data file nahi mili: ${DATA_FILE}`);

// ── args ─────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const limit = numArg("--limit");
const queryTypeFilter = strArg("--query-type");

// ── main ─────────────────────────────────────────────────────────
const client = new MongoClient(MONGODB_URI);

try {
  await client.connect();
  const col = client.db(DB_NAME).collection(COLLECTION);

  // pehle se kaunse ids daal chuke hain
  const existing = new Set(
    (await col.find({}, { projection: { _id: 1 } }).toArray()).map((d) => d._id)
  );
  if (existing.size) console.log(`Already in DB: ${existing.size} records (skip honge)`);

  // records padho
  const records = [];
  const rl = readline.createInterface({
    input: fs.createReadStream(DATA_FILE, "utf-8"),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (!line.trim()) continue;
    const r = JSON.parse(line);
    if (existing.has(r.id)) continue;
    if (queryTypeFilter && r.metadata?.query_type !== queryTypeFilter) continue;
    records.push(r);
    if (limit && records.length >= limit) break;
  }

  console.log(`To embed: ${records.length} records`);
  if (!records.length) {
    console.log("Kuch naya nahi hai. Done.");
    process.exit(0);
  }

  let done = 0;
  let dimLogged = false;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const vectors = await embedBatch(batch.map((r) => r.text));

    if (!vectors) {
      console.error("Batch fail hua, ruk rahe hain. Dobara chalao — resume ho jayega.");
      break;
    }

    if (!dimLogged) {
      console.log(`\n>>> Embedding dimension: ${vectors[0].length}`);
      console.log(">>> Ye number Atlas index banate waqt chahiye hoga. Note kar lo.\n");
      dimLogged = true;
    }

    const ops = batch.map((r, j) => ({
      replaceOne: {
        filter: { _id: r.id },
        replacement: {
          _id: r.id,
          text: r.text,
          question: r.question,
          answer: r.answer,
          crop: r.metadata?.crop ?? null,
          district: r.metadata?.district ?? null,
          state: r.metadata?.state ?? null,
          queryType: r.metadata?.query_type ?? null,
          embedding: vectors[j],
        },
        upsert: true,
      },
    }));

    await col.bulkWrite(ops);
    done += batch.length;
    console.log(`  ${done}/${records.length} done`);

    if (i + BATCH_SIZE < records.length) await sleep(SLEEP_MS);
  }

  console.log(`\nIngested ${done} records into ${DB_NAME}.${COLLECTION}`);
  console.log("Ab Atlas UI me vector search index banao (agla step).");
} finally {
  await client.close();
}

// ── helpers ──────────────────────────────────────────────────────

async function embedBatch(texts) {
  if (useBatch) {
    const out = await tryBatch(texts);
    if (out) return out;
   console.log("  Batch fail — rate limit. Ruk rahe hain, thodi der baad dobara chalao.");
    return null;
  }

  const out = [];
  for (const t of texts) {
    const v = await embedOne(t);
    if (!v) return null;
    out.push(v);
    await sleep(200);
  }
  return out;
}

async function tryBatch(texts) {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/${EMBED_MODEL}:batchEmbedContents?key=${API_KEY}`;

  const body = {
    requests: texts.map((t) => ({
      model: EMBED_MODEL,
      content: { parts: [{ text: t }] },
      taskType: "RETRIEVAL_DOCUMENT",
      outputDimensionality: OUTPUT_DIM,
    })),
  };

  const json = await postWithRetry(url, body);
  if (!json?.embeddings) return null;
  return json.embeddings.map((e) => normalize(e.values));
}

async function embedOne(text) {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/${EMBED_MODEL}:embedContent?key=${API_KEY}`;

  const body = {
    model: EMBED_MODEL,
    content: { parts: [{ text }] },
    taskType: "RETRIEVAL_DOCUMENT",
    outputDimensionality: OUTPUT_DIM,
  };

  const json = await postWithRetry(url, body);
  const values = json?.embedding?.values;
  return values ? normalize(values) : null;
}

async function postWithRetry(url, body) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) return await res.json();

      const errText = await res.text();

      if (res.status === 429 || res.status >= 500) {
        const wait = 2 ** attempt * 15000;
        console.log(`  HTTP ${res.status} — ${wait / 1000}s baad retry`);
        await sleep(wait);
        continue;
      }

      console.error(`  HTTP ${res.status}: ${errText.slice(0, 400)}`);
      return null;
    } catch (err) {
      const wait = 2 ** attempt * 15000;
      console.log(`  Network error — ${wait / 1000}s baad retry`);
      await sleep(wait);
    }
  }
  return null;
}

// Truncated embeddings ko dobara normalize karna padta hai,
// warna cosine similarity kharab ho jaati hai.
function normalize(vec) {
  let sum = 0;
  for (const v of vec) sum += v * v;
  const norm = Math.sqrt(sum);
  return norm > 0 ? vec.map((v) => v / norm) : vec;
}

function loadEnvLocal() {
  const p = path.resolve(".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf-8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

function numArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? parseInt(args[i + 1], 10) : null;
}

function strArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fail(msg) {
  console.error("ERROR: " + msg);
  process.exit(1);
}