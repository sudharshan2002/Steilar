import Link from "next/link";
import { Bell, CheckCircle2, Clock, CreditCard } from "lucide-react";
import { AppShell } from "@/components/brand/app-shell";
import { TopBar } from "@/components/brand/top-bar";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    icon: Clock,
    title: "Tailoring request received",
    body: "The atelier is reviewing garment complexity and fabric availability."
  },
  {
    icon: Bell,
    title: "Quote notification ready",
    body: "Enable Firebase Cloud Messaging to receive push alerts when a final quote is approved."
  },
  {
    icon: CreditCard,
    title: "Payment opens after approval",
    body: "You will only see checkout after admin quote review."
  }
];

export default function NotificationsPage() {
  return (
    <AppShell showNav={false} tone="dark">
      <main className="min-h-dvh overflow-y-auto bg-black pb-10 text-white">
        <TopBar title="Notifications" dark />
        <section className="safe-x pt-10">
          <h1 className="text-[1.65rem] font-semibold leading-tight">Atelier signals.</h1>
        </section>
        <section className="safe-x mt-8 space-y-4">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[1.55rem] border border-white/10 bg-white/8 p-5">
                <Icon className="h-5 w-5" />
                <h2 className="mt-4 text-[1.1rem] font-semibold">{item.title}</h2>
                <p className="mt-2 text-[12px] leading-5 text-white/58">{item.body}</p>
              </article>
            );
          })}
        </section>
        <div className="safe-x mt-8">
          <Button asChild className="h-14 w-full bg-white text-black hover:bg-white/90">
            <Link href="/subscription">
              <CheckCircle2 className="h-4 w-4" />
              Manage quote payments
            </Link>
          </Button>
        </div>
      </main>
    </AppShell>
  );
}
