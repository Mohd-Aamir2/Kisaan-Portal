'use server';

/**
 * @fileOverview A multi-language chatbot for agricultural advice.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getWeather } from '@/ai/tools/weather';

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

// ✅ Voice detector
function detectVoiceByText(text: string): ChatOutput['voice'] {
  const t = text || '';
  if (/[\u0B80-\u0BFF]/.test(t)) return 'Antares'; // Tamil
  if (/[\u0C00-\u0C7F]/.test(t)) return 'Canopus'; // Telugu
  if (/[\u0900-\u097F]/.test(t)) return 'Sirius'; // Hindi/Marathi (default Hindi)
  return 'Algenib'; // fallback English
}

// ✅ Main chat function
export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

// ✅ Flow function (string prompt version)
async function chatFlow(input: ChatInput): Promise<ChatOutput> {
  // Convert history into text lines
  const historyText = (input.history || [])
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  // Farm profile defaults
  const farmProfile = {
    farmSize: input.farmProfile?.farmSize ?? 50,
    soilType: input.farmProfile?.soilType ?? "loamy",
    location: input.farmProfile?.location ?? "Central Valley, California",
    cropPreference: input.farmProfile?.cropPreference ?? "High-yield cash crop",
  };

  // System prompt
  const systemPrompt = `You are an expert agricultural advisor bot named Kisaan.
Your goal is to provide helpful and accurate information to farmers.
You must respond to the user in the same language they used.
Supported languages are: English, Hindi, Tamil, Marathi, and Telugu.
If you don't know the answer, say that you don't know.

When you respond, you must also select the appropriate voice for the language:
- English: 'Algenib'
- Hindi: 'Sirius'
- Tamil: 'Antares'
- Marathi: 'Spica'
- Telugu: 'Canopus'

Here is the user's farm information:
- Location: ${farmProfile.location}
- Size: ${farmProfile.farmSize} acres
- SoilType: ${farmProfile.soilType}
- Crop Preference: ${farmProfile.cropPreference}
`;

  // ✅ Weather keyword detection
  const weatherKeywords = [
    "weather", "climate", "rain", "temperature", "forecast",
    "mausam", "baarish", "barish", "tapman", "hawa", "mosam", "aaj", "kal"
  ];
  const normalized = input.message.toLowerCase();
  const isWeatherQuery = weatherKeywords.some((w) => normalized.includes(w));

  // ✅ Weather shortcut
  if (isWeatherQuery) {
    try {
      const weather = await getWeather({ location: farmProfile.location });

      let weatherText = '';
      if (!weather) {
        weatherText = `Currently I couldn't fetch the weather for ${farmProfile.location}.`;
      } else if (typeof weather === 'string') {
        weatherText = weather;
      } else if (typeof weather === 'object') {
        const parts: string[] = [];
        if ('summary' in weather && weather.summary) parts.push(String((weather as any).summary));
        if ('temperature' in weather && (weather as any).temperature != null)
          parts.push(`Temperature: ${(weather as any).temperature}°`);
        if ('chanceOfRain' in weather && (weather as any).chanceOfRain != null)
          parts.push(`Rain chance: ${(weather as any).chanceOfRain}%`);
        weatherText = parts.length ? parts.join(' · ') : JSON.stringify(weather);
      } else {
        weatherText = String(weather);
      }

      const voice = detectVoiceByText(input.message);

      const opening =
        voice === 'Sirius' ? `आपके खेत (${farmProfile.location}) का मौस‍म:` :
        voice === 'Antares' ? `உங்கள் வயலில் (${farmProfile.location}) வானிலை:` :
        voice === 'Canopus' ? `మీ వ్యవసాయ స్థలం (${farmProfile.location}) వాతావరణం:` :
        voice === 'Spica' ? `तुमच्या शेताचा (${farmProfile.location}) हवामान:` :
        `Current weather at ${farmProfile.location}:`;

      return {
        response: `${opening} ${weatherText}`,
        voice,
      };
    } catch (err: any) {
      return {
        response: `I'm sorry — I couldn't fetch the weather right now: ${err?.message ?? 'unknown error'}`,
        voice: detectVoiceByText(input.message),
      };
    }
  }

  // ✅ Build one big string prompt
  const singlePrompt = `
System: ${systemPrompt}

${historyText}

User: ${input.message}
`;

  // ✅ Call Genkit generate()
  const llmResponse = await ai.generate(singlePrompt);

  if (!llmResponse || !llmResponse.text) {
    return {
      response: "I'm sorry, I couldn't generate a response.",
      voice: "Algenib",
    };
  }

  return {
    response: llmResponse.text,
    voice: detectVoiceByText(input.message),
  };
}
