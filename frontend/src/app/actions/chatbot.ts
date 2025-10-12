"use server";

import { chat, type ChatOutput } from "@/ai/flows/chatbot";
import { textToSpeech } from "@/ai/flows/tts";

export type ChatResponse = {
  text: string;
  audio?: string;
};

export async function sendMessage(message: string, history: any[]): Promise<ChatResponse> {
  try {
    const input = { message, history };
    const chatResponse = await chat(input);
    
    if (!chatResponse.response) {
       return { text: "I'm sorry, I couldn't generate a response." };
    }

    const ttsResponse = await textToSpeech({ text: chatResponse.response, voice: chatResponse.voice });

    return {
      text: chatResponse.response,
      audio: ttsResponse.audio,
    };
  } catch (error) {
    console.error("Error sending message to chatbot:", error);
    // In case of an error, we still want to return a text response
    // so the user knows something went wrong.
    return {
      text: "I'm sorry, an error occurred. Please try again.",
    };
  }
}
