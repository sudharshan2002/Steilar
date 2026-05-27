import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <main className="safe-x flex min-h-dvh flex-col items-center justify-center bg-atelier-paper text-center">
      <div className="glass flex h-16 w-16 items-center justify-center rounded-full">
        <Sparkles className="h-7 w-7" />
      </div>
      <h1 className="mt-8 text-4xl font-semibold leading-tight">Steilar is resting offline.</h1>
      <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
        Your saved concepts and draft measurements remain on this device. Reconnect to generate, quote, or pay.
      </p>
      <Button asChild className="mt-8 rounded-full">
        <Link href="/home">Return home</Link>
      </Button>
    </main>
  );
}
