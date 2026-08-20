import { generateWithRotation } from "../utils/geminiClient.js";

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, error: "question required" });
    }

    // Ab ye internally saari GEMINI_API_KEYS try karta hai — ek key ki
    // quota khatam ho to automatically agli key pe switch ho jata hai.
    const answer = await generateWithRotation(question);

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Gemini API Error:", error.message);

    if (error.allKeysExhausted) {
      return res.status(503).json({
        success: false,
        error: "AI service temporarily busy hai (saari keys ki limit khatam). Thodi der baad try karo.",
      });
    }

    res.status(500).json({ success: false, error: error.message });
  }
};