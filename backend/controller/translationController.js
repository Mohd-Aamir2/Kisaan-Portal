import fetch from "node-fetch"; // Node < 18 ke liye, Node 18+ me global fetch hai

export const translateText = async (req, res) => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: "Missing text or targetLang" });
  }

  try {
    // Google Translate Unofficial API
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text
      )}`
    );

    const data = await response.json();
    const translated = data[0][0][0]; // Translation extract

    res.json({ translated });
  } catch (error) {
    console.error("Translation API failed:", error);
    res.status(500).json({ error: "Translation failed" });
  }
};
