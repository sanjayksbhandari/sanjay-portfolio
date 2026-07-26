import type { ReactNode } from "react";
import { Section, type CardFamily } from "@/components/layout/Section";

/**
 * Experience Framework — Wide Documentation layout (also satisfies the
 * brief's "Two Column" layout: main content + a persistent side rail).
 * Wide container width, a two-column grid on `lg:` and above that
 * collapses to a single column on tablet/mobile (the `nav` prop is
 * typically a `StickySectionNav`, which is itself already
 * `lg:`-only — see that component).
 *
 * For a genuinely long page (an Architecture deep-dive, a future
 * Documentation-style page) where a persistent Table of Contents earns
 * its keep; a shorter page should use `ReadingLayout` with a static
 * `TableOfContents` instead.
 */
export function DocumentationLayout({
  nav,
  children,
  family = "default",
}: {
  /** Typically a `StickySectionNav` — rendered in the right rail on `lg:`+. */
  nav?: ReactNode;
  children: ReactNode;
  family?: CardFamily;
}) {
  return (
    <Section containerWidth="wide" family={family} className="pt-16 sm:pt-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px]">
        <div className="max-w-[var(--container-prose)]">{children}</div>
        {nav ? <div>{nav}</div> : null}
      </div>
    </Section>
  );
}
