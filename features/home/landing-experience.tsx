"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export function LandingExperience() {
  return (
    <main className="relative mx-auto flex min-h-dvh max-w-md flex-col overflow-hidden bg-[#f6f4ef]">
      <div className="safe-x safe-top z-10 flex items-center justify-between">
        <Logo />
        <Button asChild variant="ghost" size="sm" className="text-[12px]">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>

      <section className="relative flex flex-1 flex-col justify-center px-6 pb-28">
        <m.div
          initial={{ opacity: 0, scale: 0.96, filter: "blur(18px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative z-10 text-left"
        >
          <img src="/illustrations/atelier-line.svg" alt="" className="mb-10 h-72 w-full rounded-[1.8rem] object-cover shadow-glass" />
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">AI fashion atelier</p>
          <h1 className="max-w-xs text-[2.75rem] font-semibold leading-[0.96] tracking-[-0.04em] text-atelier-ink">
            Imagine. Create. Wear.
          </h1>
          <p className="mt-5 max-w-xs text-[14px] leading-6 text-muted-foreground">
            A chat-first fashion app for custom looks, prompt help, stylist review, and made-to-order clothing.
          </p>
        </m.div>
      </section>

      <div className="safe-x safe-bottom fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md">
        <div className="rounded-[1.55rem] border border-black/10 bg-white/85 p-2.5 shadow-glass backdrop-blur-2xl">
          <Button asChild size="lg" className="h-14 w-full rounded-[1.2rem] text-[14px]">
            <Link href="/home">
              Get started
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
