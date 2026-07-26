import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { CardFamily } from "@/components/layout/Section";

const familyClass: Record<Exclude<CardFamily, "default">, string> = {
  hero: "card-family-hero",
  experience: "card-family-experience",
  projects: "card-family-projects",
  leadership: "card-family-leadership",
  ai: "card-family-ai",
  contact: "card-family-contact",
};

/**
 * Surface 2 card by default; pass `elevated` for Surface 3 highlight cards.
 * Inherits section card-family tokens (or optional explicit `family`).
 */
export function Card({
  children,
  className,
  as: Comp = "div",
  id,
  family = "default",
  elevated = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  id?: string;
  family?: CardFamily;
  /** Surface 3 — slightly deeper fill + stronger elevation */
  elevated?: boolean;
}) {
  return (
    <Comp
      id={id}
      className={cn(
        "surface surface-interactive p-6 sm:p-7",
        elevated && "surface-elevated",
        family !== "default" && familyClass[family],
        className
      )}
    >
      {children}
    </Comp>
  );
}
