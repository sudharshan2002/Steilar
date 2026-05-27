import type { FashionGeneration } from "@/lib/types";

const globalForSteilar = globalThis as unknown as {
  steilarGenerations?: Map<string, FashionGeneration & { expectedReadyAt?: string }>;
};

export const generationMemory = globalForSteilar.steilarGenerations ?? new Map();

if (!globalForSteilar.steilarGenerations) {
  globalForSteilar.steilarGenerations = generationMemory;
}
