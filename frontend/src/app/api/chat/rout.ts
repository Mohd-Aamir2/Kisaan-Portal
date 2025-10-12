import { NextResponse } from "next/server";
import { ai } from "@/ai/genkit";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const finalPrompt = `You are Kisaan, an AI farming assistant. User says: ${message}`;

    // Oldest Genkit streaming
    const stream = await ai.generateStream(finalPrompt);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          let chunk;
          // stream.next() loop
          while ((chunk = await stream.next()) && !chunk.done) {
            if (chunk.value?.text) {
              controller.enqueue(encoder.encode(chunk.value.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
