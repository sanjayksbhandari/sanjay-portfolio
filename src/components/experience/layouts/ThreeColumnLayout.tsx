import type { ReactNode } from "react";
import { Section, type CardFamily } from "@/components/layout/Section";

/**
 * Experience Framework — Three Column layout. Wide container, an even
 * three-column grid on `lg:`+ that stacks to one column below it — for
 * content that's naturally a flat set of peer items rather than a
 * hierarchy (a future Publications grid, a comparison of three
 * options). Distinct from `DocumentationLayout`'s asymmetric
 * content+nav split.
 */
export function ThreeColumnLayout({
  children,
  family = "default",
}: {
  children: ReactNode;
  family?: CardFamily;
}) {
  return (
    <Section containerWidth="wide" family={family} className="pt-16 sm:pt-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">{children}</div>
    </Section>
  );
}
