export type UserStyleProfile = {
  userId: string;
  styleCodes: string[];
  colorPreferences: string[];
  genderExpression: string;
  inspirations: string[];
  completedAt?: string;
};

export type GenerationStatus = "draft" | "processing" | "complete" | "failed";

export type FashionGeneration = {
  id: string;
  userId: string;
  prompt: string;
  enhancedPrompt?: string;
  sourceImageUrl?: string;
  resultImageUrls: string[];
  status: GenerationStatus;
  isFavorite?: boolean;
  usageCostCredits: number;
  createdAt: string;
  expectedReadyAt?: string;
  manualFulfillment?: boolean;
};

export type TailorRequestStatus =
  | "submitted"
  | "ai_review"
  | "manual_review"
  | "quoted"
  | "accepted"
  | "paid"
  | "in_production"
  | "quality_check"
  | "shipped"
  | "delivered";

export type Measurements = {
  unit: "cm" | "in";
  height?: number;
  bust?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  shoulder?: number;
  sleeve?: number;
  inseam?: number;
};

export type TailorRequest = {
  id: string;
  userId: string;
  generationId: string;
  selectedImageUrl: string;
  measurements: Measurements;
  fabricPreferences: string[];
  address: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    region?: string;
    postalCode: string;
    country: string;
  };
  urgency: "relaxed" | "standard" | "event";
  notes?: string;
  complexityScore?: number;
  quoteAmount?: number;
  quoteCurrency?: string;
  status: TailorRequestStatus;
  createdAt: string;
};

export type SubscriptionTier = "free" | "weekly" | "monthly" | "pro";

export type SteilarUser = {
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  tier: SubscriptionTier;
  freeGenerationsUsed: number;
  credits: number;
  stripeCustomerId?: string;
  createdAt: string;
};
