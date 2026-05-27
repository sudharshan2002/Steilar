import { NextRequest, NextResponse } from "next/server";
import { enhanceFashionPrompt } from "@/lib/ai/openai";
import { promptSchema } from "@/lib/schemas/forms";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const parsed = promptSchema.pick({ prompt: true }).safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const enhancedPrompt = await enhanceFashionPrompt(parsed.data.prompt);
  return NextResponse.json({ enhancedPrompt });
}
