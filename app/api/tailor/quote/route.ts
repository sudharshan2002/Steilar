import { NextRequest, NextResponse } from "next/server";
import { adminDb, FieldValue } from "@/lib/firebase/admin";
import { getServerUser } from "@/lib/firebase/server-auth";
import { tailorRequestSchema } from "@/lib/schemas/forms";
import type { TailorRequest } from "@/lib/types";

export const runtime = "nodejs";

function estimateComplexity(input: { fabrics: string[]; notes?: string }) {
  const fabricWeight = input.fabrics.length * 9;
  const noteWeight = Math.min(input.notes?.length || 0, 300) / 6;
  return Math.min(98, Math.round(42 + fabricWeight + noteWeight));
}

export async function POST(request: NextRequest) {
  const user = await getServerUser(request);
  const json = await request.json();
  const parsed = tailorRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const complexityScore = estimateComplexity({
    fabrics: parsed.data.fabricPreferences,
    notes: parsed.data.notes
  });

  const tailorRequest: TailorRequest = {
    id: `tailor_${Date.now()}`,
    userId: user.uid,
    ...parsed.data,
    complexityScore,
    status: "manual_review",
    createdAt: new Date().toISOString()
  };

  if (!user.demo) {
    await adminDb
      .collection("tailorRequests")
      .doc(tailorRequest.id)
      .set({ ...tailorRequest, createdAt: FieldValue.serverTimestamp() });

    await adminDb.collection("notifications").add({
      userId: user.uid,
      type: "tailor_request_submitted",
      title: "Your Steilar request is in review",
      body: "We will notify you when the atelier approves a final quotation.",
      read: false,
      createdAt: FieldValue.serverTimestamp()
    });
  }

  return NextResponse.json(tailorRequest);
}
