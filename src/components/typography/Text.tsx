import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "body" | "lead" | "caption";

const variantClass: Record<Variant, string> = {
  body: "type-body",
  lead: "type-lead",
  caption: "type-caption",
};

const defaultTag: Record<Variant, ElementType> = {
  body: "p",
  lead: "p",
  caption: "span",
};

/**
 * Body / Lead / Caption — editorial type tokens only.
 */
export function Text({
  variant = "body",
  as,
  children,
  className,
}: {
  variant?: Variant;
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  const Tag = as ?? defaultTag[variant];
  return <Tag className={cn(variantClass[variant], className)}>{children}</Tag>;
}
