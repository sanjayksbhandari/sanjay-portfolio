import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Every combination is spelled out as a full literal class string —
// Tailwind's static scanner requires this; a dynamically-built class
// name (e.g. `sm:grid-cols-${n}`) would silently not exist in the
// compiled CSS (docs/phase-2-design-system/12, same rule as `Stack`).
const colsClass = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const;

const gapClass = {
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
} as const;

type Cols = keyof typeof colsClass;
type Gap = keyof typeof gapClass;

/**
 * Responsive CSS grid primitive (docs/phase-2-design-system §07/#Layout
 * Foundations), matching the 12-column-collapsing-to-4/1 grid rule in
 * docs/phase-1-design-system/03 §11 exactly as it's already expressed by
 * `CaseStudyCard` grids today (`sm:grid-cols-2
 * lg:grid-cols-3`) — this generalizes that existing pattern into a
 * reusable component rather than a fourth ad hoc copy of the same
 * responsive breakpoint list.
 */
export function Grid({
  children,
  cols = 3,
  gap = 6,
  className,
}: {
  children: ReactNode;
  cols?: Cols;
  gap?: Gap;
  className?: string;
}) {
  return <div className={cn("grid", colsClass[cols], gapClass[gap], className)}>{children}</div>;
}
