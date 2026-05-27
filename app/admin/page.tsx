import { Activity, CreditCard, Images, Package, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ManualCompleteForm } from "@/features/admin/manual-complete-form";
import { demoGenerations, demoTailorRequests } from "@/lib/data";
import { currency } from "@/lib/utils";

const stats = [
  { label: "Generations", value: "1,284", icon: Images },
  { label: "Tailor requests", value: "86", icon: Package },
  { label: "Subscribers", value: "412", icon: Users },
  { label: "Revenue", value: "$42k", icon: CreditCard }
];

export default function AdminPage() {
  return (
    <main className="min-h-dvh bg-[#0a0909] px-5 py-8 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge className="bg-white/10 text-white/70">Secure admin panel</Badge>
            <h1 className="mt-4 text-5xl font-semibold">Steilar atelier ops</h1>
          </div>
          <Button className="bg-white text-black">Export analytics</Button>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
                <Icon className="h-5 w-5 text-white/60" />
                <p className="mt-5 text-sm text-white/50">{stat.label}</p>
                <p className="text-3xl font-semibold">{stat.value}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <h2 className="text-3xl font-semibold">Tailoring queue</h2>
            </div>
            <div className="mt-6 space-y-4">
              {demoTailorRequests.map((request) => (
                <div key={request.id} className="grid gap-4 rounded-[1.5rem] bg-black/30 p-4 md:grid-cols-[7rem_1fr_auto]">
                  <img src={request.selectedImageUrl} alt="" className="h-32 w-full rounded-[1rem] object-cover" />
                  <div>
                    <p className="text-sm text-white/50">{request.status}</p>
                    <h3 className="text-2xl font-semibold">Custom concept request</h3>
                    <p className="mt-2 text-sm leading-6 text-white/60">{request.notes}</p>
                  </div>
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <p className="text-2xl font-semibold">{currency(request.quoteAmount || 0)}</p>
                    <Button className="bg-white text-black">Approve quote</Button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="space-y-6">
            <ManualCompleteForm />
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
              <h2 className="text-3xl font-semibold">Recent generations</h2>
              <div className="mt-6 space-y-4">
                {demoGenerations.map((generation) => (
                  <div key={generation.id} className="rounded-[1.5rem] bg-black/30 p-3">
                    <img src={generation.resultImageUrls[0]} alt="" className="h-44 w-full rounded-[1rem] object-cover" />
                    <p className="mt-3 text-sm leading-6 text-white/70">{generation.prompt}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
