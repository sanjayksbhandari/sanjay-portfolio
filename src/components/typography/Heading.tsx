import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const typeForLevel = {
  1: "type-h1",
  2: "type-h2",
  3: "type-h3",
  4: "type-h4",
} as const;

/**
 * Generic heading primitive — maps to the editorial type scale.
 * Prefer `SectionHeading` for page/section header blocks (kicker + title + intro).
 */
export function Heading({
  level = 2,
  as,
  children,
  className,
}: {
  level?: 1 | 2 | 3 | 4;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  className?: string;
}) {
  const Tag = as ?? (`h${level}` as const);
  return <Tag className={cn(typeForLevel[level], className)}>{children}</Tag>;
}
