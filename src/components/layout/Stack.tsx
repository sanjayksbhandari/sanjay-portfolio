import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const gapClass = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
} as const;

type Gap = keyof typeof gapClass;

// Full literal class strings, not template-string interpolation — Tailwind's
// static scanner can't see a class name built as `items-${align}` at
// runtime, so every variant must be spelled out here in full.
const alignClass = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

const justifyClass = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
} as const;

/**
 * Flex layout primitive (docs/phase-2-design-system §07/#Layout
 * Foundations). Replaces ad hoc `flex flex-col gap-4` / `flex items-
 * center gap-3` strings with one component so spacing between siblings
 * always comes from the spacing scale (docs/phase-1-design-system/03),
 * never an arbitrary value.
 *
 * Existing pages already use raw Tailwind flex classes directly and are
 * not being retrofitted onto this component in this phase (see
 * docs/phase-2-design-system/12) — this is the primitive future layout
 * code should reach for instead of a new ad hoc flex string.
 */
export function Stack({
  children,
  direction = "column",
  gap = 4,
  align,
  justify,
  wrap = false,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  direction?: "row" | "column";
  gap?: Gap;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        gapClass[gap],
        align && alignClass[align],
        justify && justifyClass[justify],
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </Tag>
  );
}
