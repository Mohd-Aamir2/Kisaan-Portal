'use server';

import { z } from 'zod';
// import { GoogleGenerativeAI } from '@google/generative-ai'; // agar na ho: npm i @google/generative-ai

const TTSInputSchema = z.object({
  text: z.string(),
  voice: z.string().optional(),
});
export type TTSInput = z.infer<typeof TTSInputSchema>;

const TTSOutputSchema = z.object({ audio: z.string() });
export type TTSOutput = z.infer<typeof TTSOutputSchema>;

// Gemini ke prebuilt voices (koi bhi ek try karo — Kore, Puck, Charon, Aoede, Fenrir waise naam hain)
const VOICE_MAP: Record<string, string> = {
  Algenib: 'Puck',
  Sirius: 'Kore',
  Antares: 'Aoede',
  Spica: 'Charon',
  Canopus: 'Fenrir',
};

function pcmToWav(pcmBase64: string, sampleRate = 24000): string {
  const pcm = Buffer.from(pcmBase64, 'base64');
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]).toString('base64');
}

export async function textToSpeech(input: TTSInput): Promise<TTSOutput> {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY missing');

  const voiceName = VOICE_MAP[input.voice || 'Algenib'] || 'Puck';

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: input.text }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName } },
          },
        },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini TTS failed: ${res.status} ${await res.text()}`);

  const json = await res.json();
  const part = json?.candidates?.[0]?.content?.parts?.[0];
  const pcmBase64 = part?.inlineData?.data;
  if (!pcmBase64) throw new Error('Gemini TTS: no audio returned');

  const wavBase64 = pcmToWav(pcmBase64);
  return { audio: `data:audio/wav;base64,${wavBase64}` };
}