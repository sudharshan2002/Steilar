import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";

initializeApp();
const db = getFirestore();

export const analyzeTailorRequest = onDocumentCreated("tailorRequests/{requestId}", async (event) => {
  const snap = event.data;
  if (!snap) return;

  const data = snap.data();
  const fabrics = Array.isArray(data.fabricPreferences) ? data.fabricPreferences.length : 0;
  const notes = typeof data.notes === "string" ? data.notes.length : 0;
  const complexityScore = Math.min(98, Math.round(42 + fabrics * 9 + Math.min(notes, 300) / 6));

  await snap.ref.update({
    status: "manual_review",
    complexityScore,
    aiComplexityNotes: `Estimated complexity ${complexityScore}/100. Admin should review fabric, construction, and timeline before quote.`,
    reviewedAt: FieldValue.serverTimestamp()
  });

  logger.info("Tailor request analyzed", { requestId: event.params.requestId, complexityScore });
});

export const notifyQuoteReady = onDocumentUpdated("tailorRequests/{requestId}", async (event) => {
  const before = event.data?.before.data();
  const after = event.data?.after.data();

  if (!after || before?.status === after.status || after.status !== "quoted") {
    return;
  }

  await db.collection("notifications").add({
    userId: after.userId,
    type: "quote_ready",
    title: "Your Steilar quotation is ready",
    body: `The atelier quoted your custom garment at ${after.quoteCurrency || "USD"} ${after.quoteAmount || ""}.`,
    tailorRequestId: event.params.requestId,
    read: false,
    createdAt: FieldValue.serverTimestamp()
  });

  logger.info("Quote notification created", { requestId: event.params.requestId });
});
