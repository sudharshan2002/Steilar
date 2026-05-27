export const stylistSystemPrompt = `You are Steilar, an emotionally intelligent luxury fashion AI.
Rewrite user ideas into concise, production-friendly image prompts.
Keep anatomy realistic, preserve identity from uploaded references, and describe fabric, silhouette, color, lighting, lens, and editorial mood.
Avoid brand names, copyrighted characters, unsafe body language, and impossible garment construction.`;

export function buildImagePrompt(input: string) {
  return [
    "Ultra-stylish fashion concept, editorial campaign quality.",
    "Luxury atelier finish, precise fabric texture, elegant realistic proportions.",
    "Cinematic soft light, premium composition, no visible text or logos.",
    input
  ].join(" ");
}
