"use client";

import { m } from "framer-motion";
import { ArrowLeft, Instagram } from "lucide-react";
import Link from "next/link";
import { partnerDemoImages, stylistProfile } from "@/lib/data";

const works = [
  stylistProfile.image,
  ...partnerDemoImages,
  "/output images/hf_20260526_163129_2f1c10d7-d531-4eab-9356-e78f56d3e201.png"
];

export function StylistScreen() {
  return (
    <main className="mx-auto min-h-dvh max-w-md overflow-y-auto bg-black pb-10 text-white">
      <section className="relative min-h-[88dvh] overflow-hidden">
        <img src={stylistProfile.image} alt={stylistProfile.name} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/8 to-black" />

        <header className="safe-x safe-top relative z-10 flex items-center justify-between">
          <Link href="/home" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/8" aria-label="Back home">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <img src="/Logo/logo only.png" alt="Steilar" className="h-8 w-8 object-contain" />
          <Link
            href="https://www.instagram.com/pricillastephy"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/8"
            aria-label="Pricilla Stephy on Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        </header>

        <section className="safe-x safe-bottom relative z-10 flex min-h-[calc(88dvh-5rem)] flex-col justify-end">
          <m.div
            initial={{ opacity: 0, y: 12, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.14, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="text-[12px] font-medium text-white/38">Steilar stylist</p>
            <h1 className="mt-2 text-[1.65rem] font-normal leading-tight">{stylistProfile.name}</h1>
            <p className="mt-2 text-[13px] text-white/62">{stylistProfile.role}</p>
            <p className="mt-5 max-w-sm text-[12px] leading-5 text-white/54">{stylistProfile.summary}</p>
          </m.div>
        </section>
      </section>

      <section className="safe-x pt-4">
        <div className="grid grid-cols-2 gap-px border-y border-white/10 py-3 text-[12px]">
          <div>
            <p className="text-white/36">Based in</p>
            <p className="mt-1 text-white/72">{stylistProfile.location}</p>
          </div>
          <div className="text-right">
            <p className="text-white/36">Focus</p>
            <p className="mt-1 text-white/72">Product, styling, fabric</p>
          </div>
        </div>
      </section>

      <section className="pt-8">
        <div className="safe-x flex items-end justify-between">
          <h2 className="text-[1.25rem] font-normal">Past work</h2>
          <span className="text-[11px] text-white/34">Swipe</span>
        </div>
        <div className="hide-scrollbar mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-2">
          {works.map((url, index) => (
            <article key={`${url}-${index}`} className="w-[78%] shrink-0 snap-center overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/8">
              <img src={url} alt="" className="h-80 w-full object-cover object-top" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
