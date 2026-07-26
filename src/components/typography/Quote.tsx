import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Quote role (docs/phase-1-design-system/04) — reserved. Not used
 * anywhere in this project. docs/18-future-roadmap.md's testimonials
 * feature is the only anticipated future consumer, and only once a
 * real, attributable quote exists — never a fabricated or anonymized one
 * (docs/phase-1-design-system/01 §13, docs/phase-1-design-system/11).
 * Built now, ahead of use, specifically so that future feature doesn't
 * have to improvise a type treatment under deadline pressure.
 */
export function Quote({
  children,
  attribution,
  className,
}: {
  children: ReactNode;
  attribution?: ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={cn("border-accent-600 border-l-2 pl-5", className)}>
      <p className="type-h3 font-medium">{children}</p>
      {attribution ? <footer className="type-caption mt-3">{attribution}</footer> : null}
    </blockquote>
  );
}
