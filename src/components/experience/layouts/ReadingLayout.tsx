import type { ReactNode } from "react";
import { Section, type CardFamily } from "@/components/layout/Section";

/**
 * Experience Framework — Standard Reading layout. Single-column, prose
 * width (`container-prose` — the design system's reading-width token,
 * docs/phase-1-design-system/03 §9). The default layout for any
 * content-rich page that doesn't need a persistent side navigation —
 * Leadership, Technical Expertise, a short Case Study. Composes the
 * existing `Section`/`Container` primitives; introduces no new width
 * token.
 */
export function ReadingLayout({
  children,
  className,
  family = "default",
}: {
  children: ReactNode;
  className?: string;
  family?: CardFamily;
}) {
  return (
    <Section containerWidth="prose" family={family} className={className ?? "pt-16 sm:pt-20"}>
      {children}
    </Section>
  );
}
