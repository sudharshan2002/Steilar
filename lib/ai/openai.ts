import OpenAI from "openai";
import { serverEnv } from "@/lib/env";
import { buildImagePrompt, stylistSystemPrompt } from "@/lib/ai/prompts";

export function getOpenAI() {
  if (!serverEnv.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({ apiKey: serverEnv.OPENAI_API_KEY });
}

export async function enhanceFashionPrompt(prompt: string) {
  const client = getOpenAI();
  if (!client) {
    return buildImagePrompt(prompt);
  }

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.75,
    messages: [
      { role: "system", content: stylistSystemPrompt },
      { role: "user", content: `Enhance this into one image-generation prompt: ${prompt}` }
    ]
  });

  return response.choices[0]?.message.content?.trim() || buildImagePrompt(prompt);
}

export async function generateFashionImages(prompt: string) {
  const client = getOpenAI();
  const enhancedPrompt = await enhanceFashionPrompt(prompt);

  if (!client) {
    return {
      enhancedPrompt,
      images: [
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
      ]
    };
  }

  const result = await client.images.generate({
    model: serverEnv.OPENAI_IMAGE_MODEL,
    prompt: enhancedPrompt,
    size: "1024x1536",
    quality: "high",
    n: 2
  });

  return {
    enhancedPrompt,
    images: (result.data || [])
      .map((image) => image.url || (image.b64_json ? `data:image/png;base64,${image.b64_json}` : ""))
      .filter((url): url is string => Boolean(url))
  };
}
