"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    question: "Start with an idea.",
    options: ["A full outfit", "One garment", "A reference remake", "Styling direction"]
  },
  {
    question: "Add a reference.",
    options: ["Face photo", "Body reference", "Mood image", "Saved look"]
  },
  {
    question: "Review with the atelier.",
    options: ["8-24 hour designs", "Tailor quote", "Fabric notes", "Final fitting"]
  }
];

export function OnboardingFlow() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const step = steps[index];
  const progress = useMemo(() => ((index + 1) / steps.length) * 100, [index]);
  const selected = answers[index];

  function choose(answer: string) {
    setAnswers((current) => {
      const next = [...current];
      next[index] = answer;
      return next;
    });
  }

  return (
    <main className="safe-x safe-top relative flex min-h-dvh flex-col overflow-hidden bg-black pb-8 text-white">
      <div className="chat-gradient-glow pointer-events-none absolute -inset-28 opacity-58" />
      <div className="pointer-events-none absolute inset-0 bg-black/62" />
      <header className="relative z-10 flex items-center justify-between">
        <img src="/Logo/logo only.png" alt="Steilar" className="h-8 w-8 object-contain" />
        <Link href="/home" className="text-[12px] font-medium text-white/48">
          Skip
        </Link>
      </header>

      <div className="relative z-10 mt-8 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <section className="relative z-10 flex flex-1 flex-col justify-center py-10">
        <AnimatePresence mode="wait">
          <m.div
            key={step.question}
            initial={{ opacity: 0, y: 14, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="text-[12px] font-medium text-white/42">0{index + 1} / 03</p>
            <h1 className="mt-4 text-[2rem] font-normal leading-tight">{step.question}</h1>

            <div className="mt-9 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/8">
              {step.options.map((option) => (
                <button
                  key={option}
                  onClick={() => choose(option)}
                  className={cn(
                    "flex w-full items-center justify-between border-b border-white/8 px-4 py-4 text-left text-[13px] transition last:border-b-0",
                    selected === option ? "text-white" : "text-white/54"
                  )}
                >
                  <span>{option}</span>
                  <span className={cn("h-4 w-4 rounded-full border", selected === option ? "border-white bg-white" : "border-white/20")} />
                </button>
              ))}
            </div>
          </m.div>
        </AnimatePresence>
      </section>

      <div className="safe-bottom relative z-10 flex gap-3">
        <Button asChild variant="ghost" className="h-12 flex-1 text-white hover:bg-white/8">
          <Link href="/login">Sign in</Link>
        </Button>
        {index === steps.length - 1 ? (
          <Button asChild className="h-12 flex-1 bg-white text-black hover:bg-white/90" disabled={!selected}>
            <Link href="/home">
              Enter
              <Check className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button className="h-12 flex-1 bg-white text-black hover:bg-white/90" onClick={() => setIndex((current) => current + 1)} disabled={!selected}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </main>
  );
}
