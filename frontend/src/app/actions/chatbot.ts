"use server";

import { chat } from "@/ai/flows/chatbot";
import { textToSpeech } from "@/ai/flows/tts";

type FarmProfile = {
  farmSize?: number;
  soilType?: string;
  location?: string;
  cropPreference?: string;
};

type ChatHistoryItem = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function sendMessage(
  message: string,
  history: ChatHistoryItem[],
  farmProfile?: FarmProfile
) {
  let chatResponse;

  try {
    chatResponse = await chat({ message, history, farmProfile });
  } catch (error) {
    console.error("[sendMessage] chat failed:", error);
    return { text: "I'm sorry, an error occurred. Please try again.", audio: null };
  }

  if (!chatResponse?.response) {
    return { text: "I'm sorry, I couldn't generate a response.", audio: null };
  }

  // TTS optional hai. Fail ho to bhi text zaroor jaana chahiye -
  // pehle ye same try block me tha, isliye ek missing API key
  // pura jawab kha jaati thi.
  let audio: string | null = null;
  try {
    const ttsResponse = await textToSpeech({
      text: chatResponse.response,
      voice: chatResponse.voice ?? "Algenib",
    });
    audio = ttsResponse?.audio ?? null;
  } catch (error) {
    console.warn("[sendMessage] TTS unavailable, returning text only:", error);
  }

  return {
    text: chatResponse.response,
    audio,
  };
}

export async function getAudioForText(text: string, voice: string) {
  try {
    const r = await textToSpeech({ text, voice });
    return { audio: r?.audio ?? null };
  } catch (err) {
    console.warn('[getAudioForText] TTS failed:', err);
    return { audio: null };
  }
}