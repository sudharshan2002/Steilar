import Stripe from "stripe";
import { serverEnv } from "@/lib/env";

export function getStripe() {
  if (!serverEnv.STRIPE_SECRET_KEY) {
    return null;
  }
  return new Stripe(serverEnv.STRIPE_SECRET_KEY, {
    typescript: true
  });
}

export const priceByTier = {
  weekly: serverEnv.STRIPE_WEEKLY_PRICE_ID,
  monthly: serverEnv.STRIPE_MONTHLY_PRICE_ID,
  pro: serverEnv.STRIPE_PRO_PRICE_ID
};
