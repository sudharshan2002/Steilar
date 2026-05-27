"use client";

import { m } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </m.div>
  );
}
