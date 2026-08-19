import fetch from "node-fetch"; // Node < 18 ke liye, Node 18+ me global fetch hai

// Google ki unofficial endpoint ko ek single text ke liye call karta hai.
// Fail hone par error throw karta hai — caller (batch handler) fallback decide karega.
async function translateOne(text, targetLang) {
  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`
  );

  if (!response.ok) {
    throw new Error(`Google Translate responded with ${response.status}`);
  }

  const data = await response.json();
  return data[0][0][0]; // Translation extract
}

// Ek chhote concurrency limit ke saath array ko translate karta hai,
// taaki Google ki unofficial API ek saath 50-100 parallel hits se rate-limit/block na ho.
async function translateBatch(texts, targetLang, concurrency = 5) {
  const results = new Array(texts.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < texts.length) {
      const currentIndex = nextIndex++;
      const original = texts[currentIndex];
      try {
        results[currentIndex] = await translateOne(original, targetLang);
      } catch (error) {
        // Fallback: is ek text ka translation fail hua to poora batch fail mat karo,
        // bas original text wapas bhej do taaki UI crash na ho.
        console.error(`Translation failed for one item:`, error.message);
        results[currentIndex] = original;
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, texts.length) }, worker);
  await Promise.all(workers);

  return results;
}

export const translateText = async (req, res) => {
  const { text, texts, targetLang } = req.body;

  if (!targetLang || (!text && !texts)) {
    return res.status(400).json({ error: "Missing text/texts or targetLang" });
  }

  // Batch mode: { texts: string[], targetLang } -> { translations: string[] }
  if (Array.isArray(texts)) {
    try {
      const translations = await translateBatch(texts, targetLang);
      return res.json({ translations });
    } catch (error) {
      console.error("Batch translation failed:", error);
      return res.status(500).json({ error: "Translation failed" });
    }
  }

  // Backward-compatible single mode: { text, targetLang } -> { translated }
  try {
    const translated = await translateOne(text, targetLang);
    res.json({ translated });
  } catch (error) {
    console.error("Translation API failed:", error);
    res.status(500).json({ error: "Translation failed" });
  }
};