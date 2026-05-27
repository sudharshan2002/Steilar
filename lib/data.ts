import type { FashionGeneration, TailorRequest } from "@/lib/types";

export const promptIdeas = [
  "Use my face reference and create the chocolate couture blazer dress.",
  "Keep the silhouette sharp, minimal, and high-fashion.",
  "Make the tailoring powerful but still elegant.",
  "Show me the final concepts one by one."
];

export const partnerDemoPrompt =
  "structured chocolate brown blazer-style mini dress with sharp padded shoulders, oversized lapels, and a deep V neckline. The fitted corset waist features floral jacquard detailing and covered buttons, creating a dramatic hourglass silhouette. The asymmetrical skirt panels and long lace drape add softness and movement, blending powerful tailoring with elegant couture styling";

export const partnerDemoImages = [
  "/output images/hf_20260526_162922_af91cdc3-3517-4957-b0dd-82a5f8aee568.png",
  "/output images/hf_20260526_162939_6ce35e2b-9a15-4464-908f-81bfa5762464.png",
  "/output images/hf_20260526_163129_2f1c10d7-d531-4eab-9356-e78f56d3e201.png"
];

export const promptLessons = [
  {
    title: "Start with mood",
    example: "quiet luxury, late afternoon, calm confidence"
  },
  {
    title: "Name the silhouette",
    example: "long column coat, sculptural shoulder, fluid trouser"
  },
  {
    title: "Choose fabric",
    example: "matte satin, silk wool, sheer organza, brushed cashmere"
  },
  {
    title: "Add context",
    example: "Paris gallery opening, rain on stone, editorial portrait"
  }
];

export const styleCodes = [
  "quiet luxury",
  "avant-garde",
  "minimal",
  "romantic",
  "street couture",
  "old money",
  "future formal",
  "soft gothic"
];

export const inspirationImages = [
  {
    title: "Drape study",
    label: "statue",
    url: "/illustrations/statue-drape.svg"
  },
  {
    title: "Line atelier",
    label: "sketch",
    url: "/illustrations/atelier-line.svg"
  },
  {
    title: "Paper fold",
    label: "form",
    url: "/illustrations/paper-fold.svg"
  },
  {
    title: "Soft volume",
    label: "shape",
    url: "/illustrations/statue-drape.svg"
  }
];

export const stylistProfile = {
  name: "Pricilla Stephy",
  role: "Fashion Product Developer & Stylist",
  email: "pricillastephy@gmail.com",
  location: "London",
  summary:
    "Fashion professional combining an MA in Fashion Design with business and commercial experience across product development, styling, range planning and digital prototyping.",
  focus: ["Product development", "Personal styling", "Trend forecasting", "Fabric sourcing", "CLO3D / VStitcher"],
  education: ["MA Fashion Design, University of East London", "Diploma in Fashion Design, FIDA", "BBA, Bishop Heber College"],
  image: "/Stylist/hf_20260525_130505_0ef43d3e-fbcb-4230-8f5d-68f490cc938e.png"
};

export const demoGenerations: FashionGeneration[] = [
  {
    id: "gen_partner_chocolate_blazer",
    userId: "demo",
    prompt: partnerDemoPrompt,
    enhancedPrompt: partnerDemoPrompt,
    resultImageUrls: partnerDemoImages,
    status: "complete",
    isFavorite: true,
    usageCostCredits: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: "gen_future_silk",
    userId: "demo",
    prompt: "Futuristic satin tailoring for a city evening.",
    enhancedPrompt: "Futuristic satin tailoring, cinematic city evening, quiet luxury, precise fabric texture.",
    resultImageUrls: [inspirationImages[3].url, inspirationImages[0].url],
    status: "complete",
    usageCostCredits: 1,
    createdAt: new Date().toISOString()
  }
];

export const demoTailorRequests: TailorRequest[] = [
  {
    id: "tailor_001",
    userId: "demo",
    generationId: "gen_noir_bloom",
    selectedImageUrl: inspirationImages[2].url,
    measurements: { unit: "cm", height: 170, bust: 88, waist: 68, hips: 94 },
    fabricPreferences: ["silk wool", "matte satin"],
    address: {
      name: "Avery Stone",
      line1: "12 Atelier Lane",
      city: "New York",
      postalCode: "10013",
      country: "US"
    },
    urgency: "standard",
    notes: "Prefer a dramatic collar but easy movement.",
    complexityScore: 82,
    quoteAmount: 1480,
    quoteCurrency: "USD",
    status: "quoted",
    createdAt: new Date().toISOString()
  }
];
