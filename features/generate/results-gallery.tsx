"use client";

import Link from "next/link";
import { ArrowLeft, Download, Heart, Sparkles } from "lucide-react";
import { m } from "framer-motion";
import { AppShell } from "@/components/brand/app-shell";
import { Button } from "@/components/ui/button";
import { demoGenerations, partnerDemoImages } from "@/lib/data";
import { useSteilarStore } from "@/lib/stores/use-steilar-store";

export function ResultsGallery() {
  const stored = useSteilarStore((state) => state.generations);
  const selectGeneration = useSteilarStore((state) => state.selectGeneration);
  const generation = stored[0] || demoGenerations[0];
  const images = generation?.resultImageUrls?.length ? generation.resultImageUrls : partnerDemoImages;
  const prompt = stored[0]?.prompt || "Generated from your prompt.";

  return (
    <AppShell showNav={false} tone="dark">
      <main className="safe-x safe-top min-h-dvh bg-black pb-8 text-white">
        <header className="flex items-center justify-between">
          <Link href="/generate" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/8" aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <img src="/Logo/logo only.png" alt="Steilar" className="h-8 w-8 object-contain" />
          <span className="w-10" />
        </header>

        <section className="pt-8">
          <m.p
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            className="text-[12px] font-medium text-white/42"
          >
            Concept ready
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 10, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.08 }}
            className="mt-3 max-w-xs text-[1.55rem] font-semibold leading-tight"
          >
            Your concept is ready.
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="mt-4 max-w-sm text-[12px] leading-5 text-white/52"
          >
            {prompt}
          </m.p>
        </section>

        <section className="mt-8 space-y-5">
          {images.map((url, index) => (
            <m.article
              key={url}
              initial={{ opacity: 0, y: 20, filter: "blur(18px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.25 + index * 0.18, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden rounded-[1.55rem] bg-white/8"
            >
              <img src={url} alt={`Steilar concept ${index + 1}`} className="h-auto w-full object-contain" />
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[12px] text-white/45">Look {index + 1} / {images.length}</span>
                <div className="flex items-center gap-1">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/8" aria-label="Save">
                    <Heart className="h-4 w-4" />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/8" aria-label="Download">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </m.article>
          ))}
        </section>

        <div className="safe-bottom sticky bottom-0 mt-6 bg-gradient-to-t from-black via-black to-transparent pt-8">
          <Button asChild className="h-14 w-full rounded-full bg-white text-[13px] text-black hover:bg-white/90" onClick={() => selectGeneration(generation)}>
            <Link href="/tailor">
              <Sparkles className="h-4 w-4" />
              Tailor this look
            </Link>
          </Button>
        </div>
      </main>
    </AppShell>
  );
}
