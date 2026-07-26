import type { ReactNode } from "react";
import { Section, type CardFamily } from "@/components/layout/Section";

/**
 * Experience Framework — Article layout. Prose width, for a future
 * Blog post or Publication write-up — the same reading width as
 * `ReadingLayout`, kept as its own named layout because an article's
 * composition (`PageHero` with a publish-date meta row, then
 * `ContentRenderer` blocks, then a `FooterNav` to the next post) is a
 * distinct, recurring shape worth naming even though the container
 * math is identical today.
 */
export function ArticleLayout({
  children,
  family = "default",
}: {
  children: ReactNode;
  family?: CardFamily;
}) {
  return (
    <Section containerWidth="prose" family={family} className="pt-16 sm:pt-20">
      {children}
    </Section>
  );
}
