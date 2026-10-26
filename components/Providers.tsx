"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

// Framer Motion follows the system's reduce-motion setting
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
