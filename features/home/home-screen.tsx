"use client";

import Link from "next/link";
import { ArrowUp, Image, Mic, Plus } from "lucide-react";
import { AppShell } from "@/components/brand/app-shell";

export function HomeScreen() {
  return (
    <AppShell showNav={false} tone="dark">
      <main className="safe-x safe-top relative flex min-h-dvh flex-col overflow-hidden bg-black text-white">
        <div className="chat-gradient-glow pointer-events-none absolute -inset-28 opacity-75" />
        <div className="subtle-dot-pattern pointer-events-none absolute inset-0 opacity-38" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72),rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.58))]" />
        <header className="relative z-10 flex items-center justify-between">
          <img src="/Logo/logo only.png" alt="Steilar" className="h-8 w-8 object-contain" />
          <div className="flex items-center gap-5">
            <Link href="/stylist" className="text-[12px] font-medium text-white/50">Stylist</Link>
            <Link href="/profile" className="text-[12px] font-medium text-white/50">Profile</Link>
          </div>
        </header>

        <section className="relative z-10 flex flex-1 flex-col justify-center pb-8">
          <p className="text-[12px] font-medium text-white/42">Steilar</p>
          <h1 className="mt-2 text-left text-[1.45rem] font-semibold leading-tight">
            What are we creating?
          </h1>

          <Link
            href="/generate"
            className="mt-8 block rounded-[1.45rem] border border-white/12 bg-[#171717]/88 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
          >
            <div className="min-h-24 rounded-[1.15rem] px-3 py-3 text-[13px] leading-6 text-white/38">
              Message Steilar
            </div>
            <div className="flex items-center justify-between px-1 pb-1">
              <div className="flex items-center gap-1.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/8">
                  <Plus className="h-4 w-4 text-white/68" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/8">
                  <Image className="h-4 w-4 text-white/68" />
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/8">
                  <Mic className="h-4 w-4 text-white/68" />
                </span>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                <ArrowUp className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </section>
      </main>
    </AppShell>
  );
}
