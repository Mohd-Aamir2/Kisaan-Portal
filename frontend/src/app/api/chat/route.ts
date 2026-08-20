import { NextRequest } from 'next/server';
import { ai } from '@/ai/genkit';
import { prepareChat, type ChatInput } from '@/ai/flows/chatbot';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ChatInput;
  const prep = await prepareChat(body);
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      if (prep.directAnswer) {
        controller.enqueue(encoder.encode(prep.directAnswer));
        controller.close();
        return;
      }
      try {
        const { stream: genStream } = ai.generateStream({
          prompt: prep.prompt,
          config: { maxOutputTokens: 600, temperature: 0.7 },
        });
        for await (const chunk of genStream) {
          if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
        }
      } catch (err) {
        console.error('[chat route] stream failed:', err);
        controller.enqueue(encoder.encode("I'm having trouble reaching the AI service right now. Please try again in a moment."));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Bot-Voice': prep.voice,
      'Cache-Control': 'no-store',
    },
  });
}