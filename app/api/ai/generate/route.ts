import { NextRequest, NextResponse } from "next/server";
import { generateFashionImages } from "@/lib/ai/openai";
import { adminDb, FieldValue } from "@/lib/firebase/admin";
import { getServerUser } from "@/lib/firebase/server-auth";
import { promptSchema } from "@/lib/schemas/forms";
import { generationMemory } from "@/lib/server-memory";
import type { FashionGeneration } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = await getServerUser(request);
  const json = await request.json();
  const parsed = promptSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const usageRef = adminDb.collection("users").doc(user.uid);
  const usageSnap = await usageRef.get().catch(() => null);
  const usage = usageSnap?.exists ? usageSnap.data() : undefined;
  const tier = usage?.tier || "free";
  const freeGenerationsUsed = usage?.freeGenerationsUsed || 0;

  if (tier === "free" && freeGenerationsUsed >= 3 && !user.demo) {
    return NextResponse.json({ error: "Free generation limit reached. Subscription required." }, { status: 402 });
  }

  const manualFulfillment = Boolean(json.manualFulfillment);
  const expectedReadyAt = new Date(Date.now() + 7 * 60 * 1000).toISOString();
  const generated = manualFulfillment
    ? { enhancedPrompt: parsed.data.prompt, images: [] }
    : await generateFashionImages(parsed.data.prompt);

  const generation: FashionGeneration = {
    id: `gen_${Date.now()}`,
    userId: user.uid,
    prompt: parsed.data.prompt,
    enhancedPrompt: generated.enhancedPrompt,
    sourceImageUrl: parsed.data.sourceImageUrl,
    resultImageUrls: generated.images,
    status: manualFulfillment ? "processing" : "complete",
    usageCostCredits: 1,
    createdAt: new Date().toISOString(),
    expectedReadyAt,
    manualFulfillment
  };

  generationMemory.set(generation.id, generation);

  if (!user.demo) {
    await adminDb
      .collection("generations")
      .doc(generation.id)
      .set({ ...generation, createdAt: FieldValue.serverTimestamp() });

    await usageRef.set(
      {
        id: user.uid,
        email: user.email,
        tier,
        freeGenerationsUsed: FieldValue.increment(1),
        credits: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  }

  return NextResponse.json(generation);
}
