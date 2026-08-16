import { MongoClient, type Collection } from "mongodb";

const DB_NAME = "kisaan";
const COLLECTION = "kcc_knowledge";
const VECTOR_INDEX = "kcc_vector_index";

const EMBED_MODEL = "models/gemini-embedding-2";
const OUTPUT_DIM = 768; // ingestion se match hona chahiye

export type KccDoc = {
  _id: string;
  question: string;
  answer: string;
  crop: string | null;
  district: string | null;
  queryType: string | null;
  score: number;
};

// Next.js dev me hot-reload har baar naya client banata hai aur
// Atlas connections khatam ho jaate hain - isliye global pe cache.
declare global {
  // eslint-disable-next-line no-var
  var _kccMongoClient: Promise<MongoClient> | undefined;
}

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI missing in .env.local");

  if (!global._kccMongoClient) {
    global._kccMongoClient = new MongoClient(uri).connect();
  }
  return global._kccMongoClient;
}

async function getCollection(): Promise<Collection> {
  const client = await getClient();
  return client.db(DB_NAME).collection(COLLECTION);
}

/**
 * Query ko embed karo.
 * NOTE: taskType RETRIEVAL_QUERY hai (documents RETRIEVAL_DOCUMENT the) -
 * ye jodi match honi chahiye, warna retrieval quality girti hai.
 */
async function embedQuery(text: string): Promise<number[] | null> {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_GENAI_API_KEY missing in .env.local");

  const url =
    `https://generativelanguage.googleapis.com/v1beta/${EMBED_MODEL}:embedContent?key=${apiKey}`;

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
    console.error("[kcc-retriever] embed failed:", res.status, await res.text());
    return null;
  }

  const json = await res.json();
  const values: number[] | undefined = json?.embedding?.values;
  if (!values) return null;

  // truncated embeddings ko normalize karna zaroori hai
  let sum = 0;
  for (const v of values) sum += v * v;
  const norm = Math.sqrt(sum);
  return norm > 0 ? values.map((v) => v / norm) : values;
}

export type RetrieveOptions = {
  limit?: number;
  crop?: string;
  district?: string;
  /** similarity is se kam ho to document discard - kachra context rokta hai */
  minScore?: number;
};

export async function retrieveKcc(
  query: string,
  opts: RetrieveOptions = {}
): Promise<KccDoc[]> {
  const { limit = 4, crop, district, minScore = 0.55 } = opts;

  try {
    const vector = await embedQuery(query);
    if (!vector) return [];

    // Filters optional rakhe hain. Bahut tight filter lagaoge to
    // relevant jawab bhi chhoot jayenge - data me crop aksar "Others" hai.
    const filter: Record<string, unknown> = {};
    if (crop) filter.crop = crop;
    if (district) filter.district = district;

    const col = await getCollection();

    const results = await col
      .aggregate([
        {
          $vectorSearch: {
            index: VECTOR_INDEX,
            path: "embedding",
            queryVector: vector,
            numCandidates: Math.max(100, limit * 20),
            limit,
            ...(Object.keys(filter).length ? { filter } : {}),
          },
        },
        {
          $project: {
            _id: 1,
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

    return (results as KccDoc[]).filter((d) => d.score >= minScore);
  } catch (err) {
    // Retrieval fail ho to chatbot band nahi hona chahiye -
    // khali array matlab "bina context ke jawab do".
    console.error("[kcc-retriever] retrieval failed:", err);
    return [];
  }
}

/** Retrieved docs ko prompt me daalne layak text banao. */
export function formatKccContext(docs: KccDoc[]): string {
  if (!docs.length) return "";

  const blocks = docs.map((d, i) => {
    const tags = [d.crop, d.district, d.queryType].filter(Boolean).join(" · ");
    return `[${i + 1}]${tags ? ` (${tags})` : ""}
Farmer asked: ${d.question}
KVK advisor answered: ${d.answer}`;
  });

  return blocks.join("\n\n");
}