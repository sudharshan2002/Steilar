"use client";

import Link from "next/link";
import { Bell, CreditCard, Download, History, LogOut, Ruler, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/brand/app-shell";
import { TopBar } from "@/components/brand/top-bar";
import { Button } from "@/components/ui/button";
import { signOutOfSteilar } from "@/lib/firebase/auth";

export function ProfileScreen() {
  const [message, setMessage] = useState("");

  function clearChats() {
    window.localStorage.removeItem("steilar_chat_threads");
    setMessage("Chat history cleared on this device.");
  }

  async function signOut() {
    try {
      await signOutOfSteilar();
      window.location.href = "/login";
    } catch {
      setMessage("Sign out needs Firebase config.");
    }
  }

  const actions = [
    { type: "link", href: "/generate", label: "Chats", icon: History },
    { type: "link", href: "/results", label: "Design history", icon: Sparkles },
    { type: "link", href: "/tailor", label: "Measurements", icon: Ruler },
    { type: "link", href: "/subscription", label: "Subscription", icon: CreditCard },
    { type: "link", href: "/notifications", label: "Notifications", icon: Bell },
    { type: "button", label: "Install app", icon: Download, onClick: () => setMessage("On iPhone, open Safari share menu and choose Add to Home Screen.") },
    { type: "button", label: "Clear local chats", icon: Trash2, onClick: clearChats },
    { type: "button", label: "Sign out", icon: LogOut, onClick: signOut }
  ] as const;

  return (
    <AppShell showNav={false} tone="dark">
      <main className="min-h-dvh overflow-y-auto bg-black pb-10 text-white">
        <TopBar title="Profile" dark />
        <section className="safe-x pt-8">
          <div className="border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[1rem] font-semibold text-black">S</div>
              <div>
                <h1 className="text-[1.35rem] font-normal leading-tight">Steilar client</h1>
                <p className="mt-1 text-[12px] text-white/44">Free tier · 3 generation credits</p>
              </div>
            </div>
            <Button asChild className="mt-5 h-11 w-full bg-white text-black hover:bg-white/90">
              <Link href="/subscription">Upgrade</Link>
            </Button>
          </div>
        </section>

        <section className="safe-x mt-5">
          <div className="divide-y divide-white/8">
            {actions.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <Icon className="h-4 w-4 text-white/52" />
                  <span className="text-[13px]">{item.label}</span>
                </>
              );

              if (item.type === "link") {
                return (
                  <Link key={item.label} href={item.href} className="flex w-full items-center gap-3 py-4 text-white/78 transition hover:text-white">
                    {content}
                  </Link>
                );
              }

              return (
                <button key={item.label} className="flex w-full items-center gap-3 py-4 text-left text-white/78 transition hover:text-white" onClick={item.onClick}>
                  {content}
                </button>
              );
            })}
          </div>
          {message && <p className="mt-5 text-[12px] leading-5 text-white/48">{message}</p>}
        </section>
      </main>
    </AppShell>
  );
}
