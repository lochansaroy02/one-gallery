"use client";

import { motion } from "motion/react";
import { shotSrc, shotSrcSet } from "@/lib/shots";

export type SwapShot = { key: string; name: string; alt: string };

// screenshots stacked in one cell; the chosen one cross-fades in
export function Swap({ shots, shown, sizes = "(min-width: 980px) 640px, 94vw" }: {
  shots: SwapShot[];
  shown: string;
  sizes?: string;
}) {
  return (
    <div className="swap">
      {shots.map((s) => {
        const on = s.key === shown;
        return (
          <motion.img key={s.key} src={shotSrc(s.name)} srcSet={shotSrcSet(s.name)} sizes={sizes}
            width={1920} height={1200} loading="lazy" alt={s.alt} aria-hidden={!on}
            initial={false}
            animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.015 }}
            transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } }} />
        );
      })}
    </div>
  );
}
