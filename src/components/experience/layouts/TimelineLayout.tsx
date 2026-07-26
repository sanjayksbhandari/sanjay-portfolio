import type { ReactNode } from "react";
import { Section, type CardFamily } from "@/components/layout/Section";

/**
 * Experience Framework — Timeline layout. Content-width single column,
 * for a page whose primary content is one long `Timeline` (Engineering
 * Journey) rather than several distinct sections — content width
 * (1120px) rather than prose width (720px) because a `Timeline`
 * item's two-column date/detail row needs more horizontal room than a
 * paragraph does.
 */
export function TimelineLayout({
  children,
  family = "experience",
}: {
  children: ReactNode;
  family?: CardFamily;
}) {
  return (
    <Section containerWidth="content" family={family} className="pt-16 sm:pt-20">
      {children}
    </Section>
  );
}
