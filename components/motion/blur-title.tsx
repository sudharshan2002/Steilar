"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

export function BlurTitle({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.h1
      initial={{ opacity: 0, y: 18, filter: "blur(18px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn("font-sans text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.03em]", className)}
    >
      {children}
    </m.h1>
  );
}
