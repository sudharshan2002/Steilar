import { Bell, Lock, Moon, Smartphone, UserRound } from "lucide-react";
import { AppShell } from "@/components/brand/app-shell";
import { TopBar } from "@/components/brand/top-bar";

const settings = [
  { icon: UserRound, title: "Account", body: "Email, Apple, and Google identity providers" },
  { icon: Bell, title: "Push and email", body: "Firebase Cloud Messaging plus email quote alerts" },
  { icon: Moon, title: "Appearance", body: "Dark runway mode across the app" },
  { icon: Lock, title: "Privacy", body: "Private photos, measurements, and generated concepts" },
  { icon: Smartphone, title: "Install", body: "Add to iPhone Home Screen from Safari" }
];

export default function SettingsPage() {
  return (
    <AppShell showNav={false} tone="dark">
      <main className="min-h-dvh overflow-y-auto bg-black pb-10 text-white">
        <TopBar title="Menu" dark />
        <section className="safe-x pt-7">
          <h1 className="text-[1.65rem] font-semibold leading-tight">Settings</h1>
          <p className="mt-2 text-[13px] leading-6 text-white/48">Account, alerts, privacy, and app preferences.</p>
        </section>
        <section className="safe-x mt-7 space-y-2.5">
          {settings.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="flex gap-3 rounded-[1.25rem] border border-white/10 bg-[#171717]/88 p-4">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/64" />
                <div>
                  <h2 className="text-[13px] font-semibold">{item.title}</h2>
                  <p className="mt-1 text-[12px] leading-5 text-white/48">{item.body}</p>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </AppShell>
  );
}
