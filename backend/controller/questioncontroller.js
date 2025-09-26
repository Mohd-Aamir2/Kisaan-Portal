import { GoogleGenerativeAI } from "@google/generative-ai";

// API key load karo (dotenv use karo to .env se)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    // Model select karo (gemini-1.5-flash ya gemini-1.5-pro)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Response lo
    const result = await model.generateContent(question);

    res.json({
      success: true,
      answer: result.response.text(),
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
