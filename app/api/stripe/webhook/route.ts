import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { adminDb, FieldValue } from "@/lib/firebase/admin";
import { getStripe } from "@/lib/stripe/server";
import { serverEnv } from "@/lib/env";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!stripe || !serverEnv.STRIPE_WEBHOOK_SECRET || !signature) {
    return NextResponse.json({ received: true, demo: true });
  }

  const event = stripe.webhooks.constructEvent(body, signature, serverEnv.STRIPE_WEBHOOK_SECRET);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await adminDb.collection("stripeEvents").doc(event.id).set({
      type: event.type,
      customer: session.customer,
      subscription: session.subscription,
      metadata: session.metadata,
      createdAt: FieldValue.serverTimestamp()
    });
  }

  return NextResponse.json({ received: true });
}
