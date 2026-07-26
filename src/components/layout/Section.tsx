import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "default" | "muted" | "elevated";

/** Premium card colour family — cascades CSS vars to nested surfaces. */
export type CardFamily =
  "default" | "hero" | "experience" | "projects" | "leadership" | "ai" | "contact";

const familyClass: Record<Exclude<CardFamily, "default">, string> = {
  hero: "card-family-hero",
  experience: "card-family-experience",
  projects: "card-family-projects",
  leadership: "card-family-leadership",
  ai: "card-family-ai",
  contact: "card-family-contact",
};

export function Section({
  id,
  className,
  containerWidth = "content",
  border = false,
  tone = "default",
  family = "default",
  children,
}: {
  id?: string;
  className?: string;
  containerWidth?: "prose" | "content" | "wide" | "full";
  border?: boolean;
  /** Subtle alternating canvas for section rhythm — visual only. */
  tone?: Tone;
  /** Section card colour family — tints nested `.surface` / `.surface-sm`. */
  family?: CardFamily;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        tone === "muted" && "section-tone-muted",
        tone === "elevated" && "section-tone-elevated",
        family !== "default" && familyClass[family],
        border && "border-t border-neutral-200/80",
        className
      )}
    >
      <Container width={containerWidth}>{children}</Container>
    </section>
  );
}
