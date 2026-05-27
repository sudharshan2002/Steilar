import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const fallbackReply =
  "I can shape this into a design direction. Send a clear face/reference image next, then the atelier can prepare the first design review in 8-24 hours.";

export async function POST(request: Request) {
  const { messages = [], hasReference = false } = (await request.json()) as {
    messages?: ChatMessage[];
    hasReference?: boolean;
  };

  const system: ChatMessage = {
    role: "system",
    content:
      "You are Steilar, a calm fashion atelier assistant. Keep replies short, warm, and specific. Help the client clarify their garment idea. If they have not uploaded a face/reference image, ask for it naturally. If they have uploaded a reference, confirm the direction and say the design review timeframe is 8-24 hours. Do not mention that you are an AI model. Do not over-explain."
  };

  if (!process.env.HF_TOKEN) {
    return NextResponse.json({
      message: hasReference
        ? "Perfect. I have the direction and reference. The atelier can prepare your design review in 8-24 hours."
        : fallbackReply,
      provider: "fallback"
    });
  }

  const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.HF_CHAT_MODEL || "Featherless-Chat-Models/llama2-13b-chat-hf:featherless-ai",
      messages: [system, ...messages].slice(-12),
      temperature: 0.7,
      max_tokens: 180,
      stream: false
    })
  });

  if (!response.ok) {
    return NextResponse.json({ message: fallbackReply, provider: "fallback" });
  }

  const data = await response.json();
  const message = data?.choices?.[0]?.message?.content || fallbackReply;

  return NextResponse.json({ message, provider: "huggingface" });
}
