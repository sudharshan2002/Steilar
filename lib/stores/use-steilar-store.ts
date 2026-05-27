"use client";

import { create } from "zustand";
import type { FashionGeneration, Measurements, SubscriptionTier } from "@/lib/types";

type SteilarState = {
  activePrompt: string;
  uploadedImage?: string;
  generations: FashionGeneration[];
  selectedGeneration?: FashionGeneration;
  tier: SubscriptionTier;
  freeGenerationsUsed: number;
  measurements: Measurements;
  setPrompt: (prompt: string) => void;
  setUploadedImage: (url?: string) => void;
  addGeneration: (generation: FashionGeneration) => void;
  selectGeneration: (generation: FashionGeneration) => void;
  updateMeasurements: (measurements: Partial<Measurements>) => void;
  useFreeGeneration: () => void;
};

export const useSteilarStore = create<SteilarState>((set) => ({
  activePrompt: "",
  generations: [],
  tier: "free",
  freeGenerationsUsed: 0,
  measurements: { unit: "cm" },
  setPrompt: (activePrompt) => set({ activePrompt }),
  setUploadedImage: (uploadedImage) => set({ uploadedImage }),
  addGeneration: (generation) =>
    set((state) => ({
      generations: [generation, ...state.generations],
      selectedGeneration: generation,
      freeGenerationsUsed: state.freeGenerationsUsed + 1
    })),
  selectGeneration: (selectedGeneration) => set({ selectedGeneration }),
  updateMeasurements: (measurements) => set((state) => ({ measurements: { ...state.measurements, ...measurements } })),
  useFreeGeneration: () => set((state) => ({ freeGenerationsUsed: state.freeGenerationsUsed + 1 }))
}));
