/**
 * JS mirror of the Tailwind breakpoints (docs/phase-1-design-system/03
 * §10) for the rare case a behavioral (not just visual) decision needs
 * to branch on viewport in JS — pair with `useMediaQuery`
 * (`src/hooks/useMediaQuery.ts`). Prefer Tailwind responsive classes for
 * anything expressible in CSS; this exists for the exception, not the rule.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const MEDIA_QUERY = {
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  "2xl": `(min-width: ${BREAKPOINTS["2xl"]}px)`,
} as const;
