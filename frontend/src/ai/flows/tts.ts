// File: frontend/src/ai/flows/tts.ts (Updated for ElevenLabs)

'use server';
/**
 * @fileOverview A text-to-speech (TTS) flow using ElevenLabs API.
 */

// हमें अब Genkit या wav की ज़रूरत नहीं है
import { z } from 'zod';
// import wav from 'wav'; 
// import {ai} from '@/ai/genkit'; 

// ⚠️ Step 1 से आपकी असली ElevenLabs Voice IDs यहाँ डालें
const VOICE_MAP: Record<string, string> = {
    //'Algenib': 'WWPBfJ0byWbKPMoDxFHB',  // English
     'Sirius': 'WWPBfJ0byWbKPMoDxFHB',    // Hindi
    // 'Antares': 'WWPBfJ0byWbKPMoDxFHB',  // Tamil
    // 'Spica': 'WWPBfJ0byWbKPMoDxFHB',      // Marathi
    // 'Canopus': 'WWPBfJ0byWbKPMoDxFHB',  // Telugu
};

// ✅ Input schema
const TTSInputSchema = z.object({
    text: z.string().describe('The text to convert to speech.'),
    voice: z.string().describe('The voice name to use (e.g., Sirius).').optional(),
});
export type TTSInput = z.infer<typeof TTSInputSchema>;

// ✅ Output schema (अब हम सीधे Audio Buffer/Base64 नहीं भेजेंगे, बल्कि सिर्फ़ URL)
// Note: आपके frontend को अब सीधे इस फ़ंक्शन को कॉल करने के बजाय, 
// यह फ़ंक्शन एक **API Route** (जिसे हमने पहले बनाया था) के पीछे काम करेगा।
// लेकिन क्योंकि आप इसे Genkit flow की जगह डाल रहे हैं, हम इसे एक simpler output देंगे।

// पुराने Genkit format को बनाए रखने के लिए, हम output को 'data:audio/mp3;base64' format में भेजेंगे
const TTSOutputSchema = z.object({
    audio: z
        .string()
        .describe(
            "The generated audio as a data URI. Expected format: 'data:audio/mp3;base64,<encoded_data>'."
        ),
});
export type TTSOutput = z.infer<typeof TTSOutputSchema>;

// ✅ Main TTS function
export async function textToSpeech(input: TTSInput): Promise<TTSOutput> {
    const elevenLabsVoiceId = VOICE_MAP[input.voice || 'Algenib']; // Default to Algenib

    if (!process.env.ELEVENLABS_API_KEY || !elevenLabsVoiceId) {
        throw new Error('ElevenLabs API Key or Voice ID is missing in environment or VOICE_MAP.');
    }

    try {
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}`,
            {
                method: 'POST',
                headers: {
                    'xi-api-key': process.env.ELEVENLABS_API_KEY,
                    'Content-Type': 'application/json',
                    'Accept': 'audio/mpeg', // MP3 फॉर्मेट के लिए
                },
                body: JSON.stringify({
                    text: input.text,
                    model_id: "eleven_multilingual_v2", 
                }),
            }
        );

        if (!response.ok || response.headers.get('Content-Type') !== 'audio/mpeg') {
            const errorText = await response.text();
            console.error("ElevenLabs TTS Error:", errorText);
            throw new Error(`TTS generation failed: ${response.status} - ${errorText.substring(0, 100)}...`);
        }
        
        // Audio Buffer को Base64 में बदलें
        const audioBuffer = Buffer.from(await response.arrayBuffer());
        const base64Audio = audioBuffer.toString('base64');
        
        return {
            audio: `data:audio/mp3;base64,${base64Audio}`,
        };

    } catch (error) {
        console.error('Error calling ElevenLabs TTS API:', error);
        throw new Error('Failed to generate speech using ElevenLabs.');
    }
}

// **Note:** क्योंकि हमने Genkit flow हटा दिया है, 
// अब आपका frontend इस फ़ंक्शन को सीधे नहीं कॉल कर पाएगा (अगर यह 'use server' के बाहर है)। 
// आपको यह सुनिश्चित करना होगा कि आपका `chat.ts` फ़ंक्शन TTS के लिए इस `textToSpeech` फ़ंक्शन का उपयोग करता है।