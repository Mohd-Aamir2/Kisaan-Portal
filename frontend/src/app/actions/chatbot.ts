// File: 'use server' file (Example: frontend/src/app/actions.ts)

"use server";

import { chat } from "@/ai/flows/chatbot";
import { textToSpeech } from "@/ai/flows/tts";

export async function sendMessage(message: string, history: any[]) {
    try {
        const chatResponse = await chat({ message, history });
        if (!chatResponse.response) {
            return { text: "I'm sorry, I couldn't generate a response." };
        }

        // ✅ Wait for TTS to finish (so audio is ready to return)
        const ttsResponse = await textToSpeech({
            text: chatResponse.response,
            // ⚠️ CHANGES HERE: 'alloy' (Google TTS default) को 
            // 'Algenib' (ElevenLabs default/fallback) से बदलें
            voice: chatResponse.voice ?? "Algenib", 
        });

        return {
            text: chatResponse.response,
            audio: ttsResponse?.audio ?? null, // send audio back as base64 string
        };
    } catch (error) {
        console.error("Error:", error);
        return { text: "I'm sorry, an error occurred. Please try again." };
    }
}