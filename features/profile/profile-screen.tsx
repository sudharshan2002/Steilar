import Link from "next/link";
import { CreditCard, Heart, Package, Ruler, Settings, Sparkles } from "lucide-react";
import { AppShell } from "@/components/brand/app-shell";
import { TopBar } from "@/components/brand/top-bar";
import { Button } from "@/components/ui/button";
import { demoGenerations, demoTailorRequests } from "@/lib/data";
import { currency } from "@/lib/utils";

const rows = [
  { href: "/results", label: "Generation history", icon: Sparkles },
  { href: "/results", label: "Favourites", icon: Heart },
  { href: "/tailor", label: "Measurements", icon: Ruler },
  { href: "/subscription", label: "Subscription and credits", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function ProfileScreen() {
  return (
    <AppShell showNav={false} tone="dark">
      <main className="min-h-dvh overflow-y-auto bg-black pb-10 text-white">
        <TopBar title="Profile" dark />
        <section className="safe-x pt-7">
          <div className="rounded-[1.35rem] border border-white/10 bg-[#171717]/88 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-semibold text-black">
                S
              </div>
              <div>
                <h1 className="text-[1.35rem] font-semibold leading-tight">Steilar client</h1>
                <p className="mt-1 text-[12px] text-white/48">Free tier · 3 generation credits</p>
              </div>
            </div>
            <Button asChild className="mt-5 h-12 w-full bg-white text-black hover:bg-white/90">
              <Link href="/subscription">Upgrade atelier access</Link>
            </Button>
          </div>
        </section>

        <section className="safe-x mt-6 space-y-2.5">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <Link key={row.label} href={row.href} className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/8 px-4 py-3.5">
                <Icon className="h-4 w-4 text-white/64" />
                <span className="text-[13px] font-medium">{row.label}</span>
              </Link>
            );
          })}
        </section>

        <section className="safe-x mt-7">
          <h2 className="text-[13px] font-semibold">Recent order</h2>
          <div className="mt-3 rounded-[1.35rem] border border-white/10 bg-[#171717]/88 p-4">
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 text-white/64" />
              <div>
                <p className="text-[13px] font-semibold">Noir bloom coat</p>
                <p className="text-[12px] text-white/48">
                  {demoTailorRequests[0].status} · {currency(demoTailorRequests[0].quoteAmount || 0)}
                </p>
              </div>
            </div>
            <img src={demoGenerations[0].resultImageUrls[0]} alt="" className="mt-4 h-44 w-full rounded-[1.1rem] object-cover" />
          </div>
        </section>
      </main>
    </AppShell>
  );
}
