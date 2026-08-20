/**
 * geminiClient.js — Gemini API calls ke liye multi-key rotation wrapper.
 *
 * Kaam: agar ek Gemini API key ki free-tier quota khatam ho jaaye
 * (429 / RESOURCE_EXHAUSTED) ya key hi invalid ho, to automatically
 * agli key try karo — taaki AI-generated features (askQuestion, crop
 * advisory, future image analysis, etc.) bina ruke chalte rahein.
 *
 * .env me:
 *   GEMINI_API_KEYS=key1,key2,key3   (comma-separated, recommended)
 * Backward-compatible: sirf GEMINI_API_KEY (single) bhi chalega.
 *
 * Use karne ka tarika (kisi bhi controller me):
 *   import { generateWithRotation } from "../utils/geminiClient.js";
 *   const text = await generateWithRotation(prompt);
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_KEYS = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

// Rate-limited key ko kuch der cooldown me daal do taaki har request pe
// usi exhausted key se pehle try na ho.
const COOLDOWN_MS = 30 * 60 * 1000; // 30 min
const cooldownUntil = new Map(); // key -> timestamp

const maskKey = (key) => (key ? `...${key.slice(-4)}` : "unknown");

/** Error ye batata hai ki quota/permission issue hai ya genuine content/network error. */
function isRotatableError(err) {
  const status = err?.status || err?.response?.status;
  const message = (err?.message || "").toLowerCase();

  if (status === 429 || status === 403 || status === 401) return true;
  if (
    message.includes("quota") ||
    message.includes("resource_exhausted") ||
    message.includes("rate limit") ||
    message.includes("api key not valid") ||
    message.includes("permission_denied")
  ) {
    return true;
  }
  return false;
}

/**
 * Prompt ko Gemini ko bhejta hai, quota/invalid-key errors pe agli key
 * try karta hai. Saari keys fail hone par error throw karta hai (jise
 * calling controller apne hisaab se handle kare — jaise cache fallback,
 * user ko friendly message, etc).
 *
 * @param {string} prompt
 * @param {string} modelName - default "gemini-1.5-flash"
 * @returns {Promise<string>} generated text
 */
export async function generateWithRotation(prompt, modelName = "gemini-1.5-flash") {
  if (!GEMINI_KEYS.length) {
    throw new Error("No Gemini API keys configured (set GEMINI_API_KEYS or GEMINI_API_KEY)");
  }

  const now = Date.now();
  const orderedKeys = [
    ...GEMINI_KEYS.filter((k) => (cooldownUntil.get(k) || 0) <= now),
    ...GEMINI_KEYS.filter((k) => (cooldownUntil.get(k) || 0) > now),
  ];

  const rotationLog = [];

  for (const key of orderedKeys) {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      if (rotationLog.length) {
        console.log(
          `[geminiClient] Succeeded with key ${maskKey(key)} after rotating past: ${rotationLog.join(", ")}`
        );
      }
      return text;
    } catch (err) {
      if (isRotatableError(err)) {
        cooldownUntil.set(key, Date.now() + COOLDOWN_MS);
        rotationLog.push(`${maskKey(key)} (${err.message?.slice(0, 60) || "quota/key error"})`);
        console.warn(
          `[geminiClient] Key ${maskKey(key)} failed (quota/invalid) — rotating to next key.`
        );
        continue; // agli key try karo
      }
      // Genuine error (bad prompt, safety block, network down) — har key
      // se yahi hoga, rotate karne ka faayda nahi. Turant throw karo.
      console.error(`[geminiClient] Non-rotatable error with key ${maskKey(key)}:`, err.message);
      throw err;
    }
  }

  // Saari keys quota-exhausted/invalid nikli
  const finalErr = new Error(
    `Saari Gemini API keys exhausted/invalid hain: ${rotationLog.join(", ")}`
  );
  finalErr.allKeysExhausted = true;
  throw finalErr;
}