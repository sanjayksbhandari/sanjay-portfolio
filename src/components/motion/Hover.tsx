"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MOTION_DURATION } from "@/constants/motion";

const MAX_SCALE = 1.02; // Hard ceiling — docs/phase-1-design-system/06. Never exceeded, by design.

/**
 * Reusable hover-scale wrapper. `scale` is clamped to the project's 1.02
 * ceiling regardless of what's passed in — this is intentional, not an
 * oversight: the motion spec sets that ceiling for every current and
 * future component, so the clamp lives here once rather than being a
 * convention every consumer has to remember.
 */
export function Hover({
  children,
  scale = MAX_SCALE,
  className,
}: {
  children: ReactNode;
  scale?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const clampedScale = Math.min(scale, MAX_SCALE);

  return (
    <m.div
      className={className}
      whileHover={reduceMotion ? undefined : { scale: clampedScale }}
      whileTap={reduceMotion ? undefined : { scale: 1 }}
      transition={{ duration: MOTION_DURATION.micro }}
    >
      {children}
    </m.div>
  );
}
