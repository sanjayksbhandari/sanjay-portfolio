"use client";

import type { ReactNode } from "react";
import { FadeUp, Fade, FadeDown, FadeLeft, FadeRight } from "./Fade";

type Direction = "up" | "down" | "left" | "right" | "none";

const componentFor: Record<Direction, typeof FadeUp> = {
  up: FadeUp,
  down: FadeDown,
  left: FadeLeft,
  right: FadeRight,
  none: Fade,
};

/**
 * Scroll-triggered reveal — the JS-driven equivalent of the CSS `.reveal`
 * class in `globals.css`, for cases that need Framer Motion specifically
 * (staggered children via `Stagger`, or a direction other than up).
 *
 * The existing CSS `.reveal` class is left exactly as-is and is still the
 * right choice for a single, simple, non-staggered reveal (zero JS cost)
 * — this component is for the cases CSS alone can't express, not a
 * wholesale replacement (docs/phase-2-design-system §12, "don't rewrite
 * working code without a valid engineering reason").
 *
 * Fires once per element by default (docs/phase-1-design-system/06 —
 * reveal animations never re-trigger on re-scroll).
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  once = true,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  once?: boolean;
  className?: string;
}) {
  const Component = componentFor[direction];
  return (
    <Component whileInView once={once} delay={delay} className={className}>
      {children}
    </Component>
  );
}
