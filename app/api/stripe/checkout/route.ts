import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { absoluteUrl } from "@/lib/utils";
import { getStripe, priceByTier } from "@/lib/stripe/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const { tier, quoteRequestId } = (await request.json()) as { tier?: keyof typeof priceByTier; quoteRequestId?: string };
  const stripe = getStripe();

  if (!stripe) {
    return NextResponse.json({
      demo: true,
      message: "Stripe is not configured. Add STRIPE_SECRET_KEY and price IDs to enable checkout."
    });
  }

  const priceId = priceByTier[tier || "monthly"];
  if (!quoteRequestId && !priceId) {
    return NextResponse.json({ error: "Missing Stripe price id for selected tier." }, { status: 400 });
  }

  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = quoteRequestId
    ? {
        price_data: {
          currency: "usd",
          unit_amount: 148000,
          product_data: { name: `Steilar custom garment ${quoteRequestId}` }
        },
        quantity: 1
      }
    : { price: priceId, quantity: 1 };

  const session = await stripe.checkout.sessions.create({
    mode: quoteRequestId ? "payment" : "subscription",
    line_items: [lineItem],
    success_url: absoluteUrl("/profile?checkout=success"),
    cancel_url: absoluteUrl("/subscription?checkout=cancelled"),
    allow_promotion_codes: true,
    metadata: {
      tier: tier || "",
      quoteRequestId: quoteRequestId || ""
    }
  });

  return NextResponse.json({ url: session.url });
}
