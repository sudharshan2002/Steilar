"use client";

import { Check, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { AppShell } from "@/components/brand/app-shell";
import { TopBar } from "@/components/brand/top-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  { id: "weekly", name: "Weekly", price: "$9", detail: "12 generations, quote alerts, saved prompts" },
  { id: "monthly", name: "Monthly", price: "$29", detail: "60 generations, priority queue, style memory" },
  { id: "pro", name: "Pro creator", price: "$89", detail: "240 generations, campaign sets, atelier concierge" }
];

export default function SubscriptionPage() {
  const checkout = useMutation({
    mutationFn: async (tier: string) => {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier })
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json() as Promise<{ url?: string; demo?: boolean }>;
    },
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    }
  });

  return (
    <AppShell showNav={false} tone="dark">
      <main className="min-h-dvh overflow-y-auto bg-black pb-10 text-white">
        <TopBar title="Subscription" dark />
        <section className="safe-x pt-10">
          <Badge className="border-white/12 bg-white/8 text-white/68">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            First 3 generations free
          </Badge>
          <h1 className="mt-5 text-[1.65rem] font-semibold leading-tight">More room for imagination.</h1>
          <p className="mt-4 text-[13px] leading-6 text-white/58">
            Usage and credit checks are validated server-side before generation. Stripe handles subscription billing.
          </p>
        </section>
        <section className="safe-x mt-8 space-y-4">
          {plans.map((plan) => (
            <article key={plan.id} className="rounded-[1.55rem] border border-white/10 bg-white/8 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[1.25rem] font-semibold">{plan.name}</h2>
                  <p className="mt-2 text-[12px] leading-5 text-white/58">{plan.detail}</p>
                </div>
                <p className="text-[1.35rem] font-semibold">{plan.price}</p>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-white/48">
                <Check className="h-4 w-4" /> Secure backend validation
              </div>
              <Button className="mt-5 h-12 w-full bg-white text-black hover:bg-white/90" onClick={() => checkout.mutate(plan.id)} disabled={checkout.isPending}>
                Choose {plan.name}
              </Button>
            </article>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
