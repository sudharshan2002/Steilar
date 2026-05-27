import { z } from "zod";

export const promptSchema = z.object({
  prompt: z.string().min(8, "Describe the fashion moment in a little more detail."),
  sourceImageUrl: z.string().url().optional()
});

export const tailorRequestSchema = z.object({
  generationId: z.string().min(1),
  selectedImageUrl: z.string().url(),
  measurements: z.object({
    unit: z.enum(["cm", "in"]),
    height: z.coerce.number().optional(),
    bust: z.coerce.number().optional(),
    chest: z.coerce.number().optional(),
    waist: z.coerce.number().optional(),
    hips: z.coerce.number().optional(),
    shoulder: z.coerce.number().optional(),
    sleeve: z.coerce.number().optional(),
    inseam: z.coerce.number().optional()
  }),
  fabricPreferences: z.array(z.string()).default([]),
  address: z.object({
    name: z.string().min(2),
    line1: z.string().min(4),
    line2: z.string().optional(),
    city: z.string().min(2),
    region: z.string().optional(),
    postalCode: z.string().min(3),
    country: z.string().min(2)
  }),
  urgency: z.enum(["relaxed", "standard", "event"]),
  notes: z.string().optional()
});
