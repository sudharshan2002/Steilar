"use client";

import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";

export function MagneticButton(props: ComponentProps<typeof Button>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 });
  const rotate = useTransform(springX, [-22, 22], [-1.5, 1.5]);

  return (
    <m.div
      style={{ x: springX, y: springY, rotate }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Button {...props} />
    </m.div>
  );
}
