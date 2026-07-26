import type { ReactNode } from "react";

/**
 * Previously a Framer `AnimatePresence mode="wait"` cross-fade mounted
 * from `template.tsx`. That forced ~200ms exit + enter on every route
 * change and remounted the page tree via the template boundary — the
 * main source of “click → lag” on this site.
 *
 * Navigation is now an instant App Router swap (no template, no wait).
 * This helper remains as a transparent pass-through so any future
 * opt-in call sites stay stable without reintroducing blocking motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return children;
}
