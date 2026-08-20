'use server';

/**
 * @fileOverview A multi-language chatbot for agricultural advice, grounded in
 * Kisan Call Centre (KCC) records via Atlas Vector Search.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getWeather } from '@/ai/tools/weather';
import { retrieveKcc, formatKccContext } from '@/lib/kcc-retriever';

// ✅ Input schema
const ChatInputSchema = z.object({
  message: z.string().describe("The user's message."),
  history: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ).describe("The conversation history."),
  farmProfile: z
    .object({
      farmSize: z.number().optional().describe("Farm size in acres."),
      soilType: z.string().optional().describe("Soil type."),
      location: z.string().optional().describe("Farm location."),
      cropPreference: z.string().optional().describe("Preferred crop type."),
    })
    .optional()
    .describe("Optional farm details for personalized advice."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

// ✅ Output schema
const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
  voice: z.enum(["Algenib", "Sirius", "Antares", "Spica", "Canopus"]).describe("The voice to use for TTS."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

const MAX_HISTORY_TURNS = 6;
const RETRIEVE_COUNT = 4;

// ✅ Voice detector
function detectVoiceByText(text: string): ChatOutput['voice'] {
  const t = text || '';
  if (/[\u0B80-\u0BFF]/.test(t)) return 'Antares'; // Tamil
  if (/[\u0C00-\u0C7F]/.test(t)) return 'Canopus'; // Telugu
  if (/[\u0900-\u097F]/.test(t)) return 'Sirius';  // Hindi/Marathi
  return 'Algenib'; // English
}

// ✅ Prep result — ya seedha jawab (weather/no-location), ya generation ke liye prompt
type PrepResult =
  | { voice: ChatOutput['voice']; directAnswer: string; prompt?: undefined }
  | { voice: ChatOutput['voice']; prompt: string; directAnswer?: undefined };

/**
 * Saara prep yahan hota hai — weather ka direct jawab, ya phir RAG-grounded
 * prompt bana ke deta hai. LLM call yahan NAHI hota, taaki streaming route
 * (/api/chat) aur non-streaming chatFlow dono isi function ko reuse kar sakein.
 */
export async function prepareChat(input: ChatInput): Promise<PrepResult> {
  const voice = detectVoiceByText(input.message);

  const historyText = (input.history || [])
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  // Profile - sirf jo maujood hai wahi bhejo, fake defaults nahi
  const p = input.farmProfile ?? {};
  const profileLines: string[] = [];
  if (p.location) profileLines.push(`- Location: ${p.location}`);
  if (p.farmSize != null) profileLines.push(`- Size: ${p.farmSize} acres`);
  if (p.soilType) profileLines.push(`- Soil type: ${p.soilType}`);
  if (p.cropPreference) profileLines.push(`- Crop preference: ${p.cropPreference}`);

  const profileBlock = profileLines.length
    ? `Farmer's profile:\n${profileLines.join("\n")}`
    : `No farm profile available. If a detail (location, soil type, crop) is needed to answer safely, ask for it instead of assuming.`;

  // ─── Weather shortcut ────────────────────────────────────────
  const weatherKeywords = [
    "weather", "climate", "rain", "temperature", "forecast",
    "mausam", "mosam", "baarish", "barish", "tapman",
  ];
  const normalized = input.message.toLowerCase();

  if (weatherKeywords.some((w) => normalized.includes(w))) {
    const location = p.location;

    if (!location) {
      const askMsg =
        voice === 'Sirius'  ? 'मौसम बताने के लिए आपका ज़िला चाहिए। कृपया अपना ज़िला बताएं।' :
        voice === 'Antares' ? 'வானிலை தெரிவிக்க உங்கள் மாவட்டம் தேவை.' :
        voice === 'Canopus' ? 'వాతావరణం చెప్పడానికి మీ జిల్లా కావాలి.' :
        voice === 'Spica'   ? 'हवामान सांगण्यासाठी तुमचा जिल्हा हवा आहे.' :
        'I need your district to check the weather. Could you tell me your location?';
      return { voice, directAnswer: askMsg };
    }

    try {
      const weather = await getWeather({ location });

      let weatherText = '';
      if (!weather) {
        weatherText = `Currently I couldn't fetch the weather for ${location}.`;
      } else if (typeof weather === 'string') {
        weatherText = weather;
      } else if (typeof weather === 'object') {
        const w = weather as Record<string, unknown>;
        const parts: string[] = [];
        if (w.summary) parts.push(String(w.summary));
        if (w.temperature != null) parts.push(`Temperature: ${w.temperature}°`);
        if (w.chanceOfRain != null) parts.push(`Rain chance: ${w.chanceOfRain}%`);
        weatherText = parts.length ? parts.join(' · ') : JSON.stringify(weather);
      } else {
        weatherText = String(weather);
      }

      const opening =
        voice === 'Sirius'  ? `आपके खेत (${location}) का मौसम:` :
        voice === 'Antares' ? `உங்கள் வயலில் (${location}) வானிலை:` :
        voice === 'Canopus' ? `మీ వ్యవసాయ స్థలం (${location}) వాతావరణం:` :
        voice === 'Spica'   ? `तुमच्या शेताचे (${location}) हवामान:` :
        `Current weather at ${location}:`;

      return { voice, directAnswer: `${opening} ${weatherText}` };
    } catch (err) {
      console.error('[chatbot] weather fetch failed:', err);
      return {
        voice,
        directAnswer: `I'm sorry — I couldn't fetch the weather right now. Please try again in a moment.`,
      };
    }
  }

  // ─── RAG: KCC records retrieve karo ──────────────────────────
  const docs = await retrieveKcc(input.message, {
    limit: RETRIEVE_COUNT,
    district: p.location || undefined,
  });

  const contextBlock = docs.length
    ? `Reference material — real answers given by Kisan Call Centre advisors to farmers with similar questions:

${formatKccContext(docs)}

Use this material when it fits the farmer's question — especially the specific chemical names, doses, and intervals. If it does not fit, ignore it and answer from your own knowledge. Do not mention that you consulted reference material.`
    : '';

  console.log(`[chatbot] retrieved ${docs.length} KCC docs` +
    (docs.length ? ` (top score ${docs[0].score.toFixed(3)})` : ''));

  // ─── Prompt ──────────────────────────────────────────────────
  const systemPrompt = `You are an expert agricultural advisor bot named Kisaan, helping farmers in India.

Rules:
- Respond in the SAME language the farmer used. Supported: English, Hindi, Tamil, Marathi, Telugu.
- Keep answers short and practical. Farmers often read this on a phone.
- When recommending a pesticide or fertilizer, state the dose and the interval.
- If you are not sure, say so and suggest contacting the local Krishi Vigyan Kendra (KVK).
- Never invent scheme deadlines, subsidy amounts, or prices.

${profileBlock}`;

  const singlePrompt = `System: ${systemPrompt}
${contextBlock ? `\n${contextBlock}\n` : ''}
${historyText}

User: ${input.message}
`;

  return { voice, prompt: singlePrompt };
}

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

async function chatFlow(input: ChatInput): Promise<ChatOutput> {
  const prep = await prepareChat(input);

  if (prep.directAnswer) {
    return { response: prep.directAnswer, voice: prep.voice };
  }

  try {
    const llmResponse = await ai.generate({
      prompt: prep.prompt,
      config: {
        maxOutputTokens: 600,
        temperature: 0.7,
      },
    });

    if (!llmResponse?.text) {
      return {
        response: "I'm sorry, I couldn't generate a response. Please try again.",
        voice: prep.voice,
      };
    }

    return { response: llmResponse.text, voice: prep.voice };
  } catch (err) {
    console.error('[chatbot] generate failed:', err);
    return {
      response: "I'm having trouble reaching the AI service right now. Please try again in a moment.",
      voice: prep.voice,
    };
  }
}