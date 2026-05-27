import { NextRequest, NextResponse } from "next/server";
import { adminDb, FieldValue } from "@/lib/firebase/admin";
import { generationMemory } from "@/lib/server-memory";

export const runtime = "nodejs";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { imageUrls } = (await request.json()) as { imageUrls?: string[] };

  const resultImageUrls = (imageUrls || []).map((url) => url.trim()).filter(Boolean);
  if (!resultImageUrls.length) {
    return NextResponse.json({ error: "Provide at least one image URL." }, { status: 400 });
  }

  const current = generationMemory.get(id);
  const updated = {
    ...(current || { id, userId: "demo", prompt: "Manual upload", createdAt: new Date().toISOString(), usageCostCredits: 1 }),
    resultImageUrls,
    status: "complete" as const,
    manualFulfillment: true
  };
  generationMemory.set(id, updated);

  await adminDb
    .collection("generations")
    .doc(id)
    .set(
      {
        resultImageUrls,
        status: "complete",
        completedAt: FieldValue.serverTimestamp(),
        manualFulfillment: true
      },
      { merge: true }
    )
    .catch(() => undefined);

  return NextResponse.json(updated);
}
