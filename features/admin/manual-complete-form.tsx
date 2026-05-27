"use client";

import { useState } from "react";
import { Check, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ManualCompleteForm() {
  const [generationId, setGenerationId] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [message, setMessage] = useState("Paste the pending generation id and one or more image URLs.");

  async function complete() {
    const response = await fetch(`/api/admin/generations/${generationId}/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrls: imageUrls.split(/\n|,/).filter(Boolean) })
    });

    if (response.ok) {
      setMessage("Concept attached. The user's countdown screen will reveal it on the next poll.");
    } else {
      setMessage(await response.text());
    }
  }

  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
      <div className="flex items-center gap-2">
        <UploadCloud className="h-5 w-5" />
        <h2 className="text-3xl font-semibold">Manual image upload</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/55">
        Partner-test mode: user submits a prompt, sees a 7-minute loading timer, and you attach the finished image here.
      </p>
      <div className="mt-5 space-y-3">
        <Input
          className="border-white/10 bg-black/30 text-white placeholder:text-white/35"
          placeholder="Generation id, e.g. gen_..."
          value={generationId}
          onChange={(event) => setGenerationId(event.target.value)}
        />
        <Textarea
          className="border-white/10 bg-black/30 text-white placeholder:text-white/35"
          placeholder="Image URL(s), comma-separated or one per line"
          value={imageUrls}
          onChange={(event) => setImageUrls(event.target.value)}
        />
        <Button className="w-full bg-white text-black" onClick={complete} disabled={!generationId || !imageUrls}>
          <Check className="h-4 w-4" />
          Attach image and reveal
        </Button>
        <p className="text-xs leading-5 text-white/45">{message}</p>
      </div>
    </article>
  );
}
