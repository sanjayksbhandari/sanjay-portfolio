import NextLink from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Inline prose link — the "Link" typography role
 * (docs/phase-1-design-system/04), for internal links inside body copy
 * (case-study prose, leadership evidence lines). Distinct from
 * `NavLink` (nav items, no underline) and `ExternalLink` (off-site, adds
 * an icon + new-tab semantics) — three different roles, three small
 * components, not one component with three behavioral modes
 * (docs/phase-2-design-system §12: don't force reuse where the
 * semantics genuinely differ).
 */
export function Link({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <NextLink
      href={href}
      className={cn(
        "text-accent-600 decoration-accent-600/30 underline underline-offset-2",
        "hover:decoration-accent-600 transition-colors duration-[var(--motion-micro)]",
        className
      )}
    >
      {children}
    </NextLink>
  );
}
