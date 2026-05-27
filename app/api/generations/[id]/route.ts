import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { generationMemory } from "@/lib/server-memory";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const memoryGeneration = generationMemory.get(id);

  if (memoryGeneration) {
    return NextResponse.json(memoryGeneration);
  }

  const snap = await adminDb.collection("generations").doc(id).get().catch(() => null);
  if (!snap?.exists) {
    return NextResponse.json({ error: "Generation not found" }, { status: 404 });
  }

  return NextResponse.json({ id: snap.id, ...snap.data() });
}
