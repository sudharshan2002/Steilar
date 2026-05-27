"use client";

import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, Loader2, Ruler, Shirt } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/brand/app-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { demoGenerations } from "@/lib/data";
import { useSteilarStore } from "@/lib/stores/use-steilar-store";

const fabrics = ["silk wool", "matte satin", "organic cotton", "cashmere blend", "vegan leather", "linen silk"];
const fieldClass =
  "border-white/12 bg-white/8 text-white placeholder:text-white/34 shadow-none focus:border-white/35 focus:bg-white/10 focus:ring-white/10";
const measurementFields = [
  { key: "height", label: "Height" },
  { key: "bust", label: "Bust" },
  { key: "chest", label: "Chest" },
  { key: "waist", label: "Waist" },
  { key: "hips", label: "Hips" },
  { key: "inseam", label: "Inseam" }
] as const;
const addressFields = [
  { key: "name", label: "Name" },
  { key: "line1", label: "Address" },
  { key: "city", label: "City" },
  { key: "postalCode", label: "Postal code" },
  { key: "country", label: "Country" }
] as const;

function MinimalInput({
  label,
  value,
  unit,
  inputMode = "text",
  onChange
}: {
  label: string;
  value?: string | number;
  unit?: string;
  inputMode?: "text" | "decimal";
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-h-12 items-center gap-3 border-b border-white/8 px-4 last:border-b-0">
      <span className="w-24 shrink-0 text-[12px] text-white/44">{label}</span>
      <input
        value={value ?? ""}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent py-3 text-right text-[14px] text-white outline-none placeholder:text-white/24"
        placeholder={unit ? unit : "Required"}
      />
    </label>
  );
}

export function TailorFlow() {
  const selectedGeneration = useSteilarStore((state) => state.selectedGeneration) || demoGenerations[0];
  const measurements = useSteilarStore((state) => state.measurements);
  const updateMeasurements = useSteilarStore((state) => state.updateMeasurements);
  const [step, setStep] = useState(0);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>(["silk wool"]);
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState({
    name: "",
    line1: "",
    city: "",
    postalCode: "",
    country: "US"
  });
  const progress = useMemo(() => ((step + 1) / 4) * 100, [step]);
  const selectedImage = selectedGeneration.resultImageUrls[0];

  const submit = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/tailor/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generationId: selectedGeneration.id,
          selectedImageUrl: selectedImage,
          measurements,
          fabricPreferences: selectedFabrics,
          address,
          urgency: "standard",
          notes
        })
      });
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
    onSettled: () => setStep(3)
  });

  return (
    <AppShell showNav={false} tone="dark">
      <div className="min-h-dvh overflow-y-auto bg-black pb-32 text-white">
        <header className="safe-x safe-top sticky top-0 z-30 flex items-center justify-between bg-black/82 pb-3 backdrop-blur-2xl">
          <Link href="/results" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/8" aria-label="Back to results">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-[13px] font-semibold">Make this real</span>
          <span className="w-10" />
        </header>

        <section className="safe-x pt-3">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} />
          </div>
        </section>

        <section className="safe-x pt-6">
          <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/8">
            <img src={selectedImage} alt="Selected concept" className="h-64 w-full object-cover object-top" />
          </div>
        </section>

        <section className="safe-x pt-7">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <m.div key="measure" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/68">
                  <Ruler className="mr-1 h-3.5 w-3.5" />
                  Measurements
                </div>
                <h1 className="mt-5 text-[1.55rem] font-semibold leading-tight">Tell the atelier how cloth should meet you.</h1>
                <div className="mt-7 overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#161616]/92">
                  {measurementFields.map((field) => (
                    <MinimalInput
                      key={field.key}
                      label={field.label}
                      unit={measurements.unit}
                      inputMode="decimal"
                      value={(measurements as Record<string, string | number | undefined>)[field.key]}
                      onChange={(value) => updateMeasurements({ [field.key]: Number(value) })}
                    />
                  ))}
                </div>
              </m.div>
            )}

            {step === 1 && (
              <m.div key="fabric" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/68">
                  <Shirt className="mr-1 h-3.5 w-3.5" />
                  Fabric
                </div>
                <h1 className="mt-5 text-[1.55rem] font-semibold leading-tight">Choose the feeling of the garment.</h1>
                <div className="mt-8 flex flex-wrap gap-3">
                  {fabrics.map((fabric) => {
                    const active = selectedFabrics.includes(fabric);
                    return (
                      <button
                        key={fabric}
                        onClick={() =>
                          setSelectedFabrics((current) => (active ? current.filter((item) => item !== fabric) : [...current, fabric]))
                        }
                        className={`rounded-full border px-4 py-2.5 text-[13px] transition ${
                          active ? "border-white bg-white text-black" : "border-white/12 bg-white/8 text-white/70"
                        }`}
                      >
                        {fabric}
                      </button>
                    );
                  })}
                </div>
                <Textarea
                  className="mt-6 min-h-28 rounded-[1.2rem] border border-white/10 !bg-[#161616] px-4 py-3 text-[13px] leading-5 !text-white shadow-none placeholder:text-white/34 focus:border-white/28 focus:!bg-[#161616] focus:ring-2 focus:ring-white/10"
                  placeholder="Notes for movement, lining, event date, modesty, or finish..."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </m.div>
            )}

            {step === 2 && (
              <m.div key="address" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/68">
                  Delivery
                </div>
                <h1 className="mt-5 text-[1.55rem] font-semibold leading-tight">Where should the finished piece arrive?</h1>
                <div className="mt-7 overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#161616]/92">
                  {addressFields.map((field) => (
                    <MinimalInput
                      key={field.key}
                      label={field.label}
                      value={address[field.key]}
                      onChange={(value) => setAddress((current) => ({ ...current, [field.key]: value }))}
                    />
                  ))}
                </div>
              </m.div>
            )}

            {step === 3 && (
              <m.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-black">
                  <Check className="h-9 w-9" />
                </div>
                <h1 className="mt-8 text-center text-[1.65rem] font-semibold leading-tight">Your atelier request is in review.</h1>
                <p className="mt-5 text-center text-[13px] leading-6 text-white/58">
                  The request is saved for quote review. You can check status from notifications and come back to the app without losing the flow.
                </p>
                <Button asChild className="mt-8 h-14 w-full bg-white text-black hover:bg-white/90">
                  <Link href="/notifications">
                    <Clock className="h-4 w-4" />
                    Watch quote status
                  </Link>
                </Button>
              </m.div>
            )}
          </AnimatePresence>
        </section>

        {step < 3 && (
          <div className="safe-x safe-bottom fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md bg-gradient-to-t from-black via-black to-transparent pt-8">
            <div className="flex gap-3">
              <Button
                variant="ghost"
                className="h-14 w-14 shrink-0 text-white hover:bg-white/8"
                onClick={() => setStep((current) => Math.max(current - 1, 0))}
                disabled={step === 0 || submit.isPending}
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                className="h-14 flex-1 bg-white text-black hover:bg-white/90"
                onClick={() => (step === 2 ? submit.mutate() : setStep((current) => current + 1))}
                disabled={submit.isPending}
              >
                {submit.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : step === 2 ? "Submit for quote" : "Continue"}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
