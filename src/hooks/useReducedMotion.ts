"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Single source of truth for `prefers-reduced-motion` in JS-driven motion
 * (Framer Motion components under src/components/motion). Every animated
 * component must consult this — never re-implement its own media query
 * (docs/phase-1-design-system/06 gap, closed this phase).
 *
 * CSS-only motion (the `.reveal` class in globals.css) has its own
 * `@media (prefers-reduced-motion: reduce)` block and doesn't need this —
 * this hook exists specifically for the JS motion library.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
