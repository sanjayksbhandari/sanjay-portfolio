import { cn } from "@/lib/utils";

/**
 * Skeleton (docs/phase-2-design-system §07). A static pulse — not a
 * shimmer/sweep — keeping in line with the "no gimmick motion" rule
 * (docs/phase-1-design-system/16). Every current page is statically
 * generated (docs/11-technical-architecture.md), so there is nothing to
 * actually load client-side today; this exists for a future
 * client-fetched feature, not for present use.
 */
export function Skeleton({ className }: { className?: string }) {
  // motion-safe: — pulse is suppressed under prefers-reduced-motion,
  // leaving a plain static surface (docs/phase-1-design-system/06).
  return <div className={cn("rounded-md bg-neutral-100 motion-safe:animate-pulse", className)} />;
}
