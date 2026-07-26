"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_ENTRANCE, MOTION_DURATION } from "@/constants/motion";

/**
 * Fade + scale-in entrance, for modal/popover-style content
 * (docs/phase-1-design-system/06 — used by primitives/Dialog and
 * primitives/Tooltip rather than page content, which should use `Fade`).
 * Scales from 0.96, never lower — matches the ≤1.02 max-scale ceiling in
 * spirit (docs/phase-1-design-system/06 hover-behavior rule) even though
 * this is an entrance, not a hover effect.
 */
export function Scale({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
      transition={{
        duration: reduceMotion ? 0.01 : MOTION_DURATION.standard,
        delay,
        ease: EASE_ENTRANCE,
      }}
    >
      {children}
    </m.div>
  );
}
