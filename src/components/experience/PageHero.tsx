import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export type PageHeroBreadcrumbItem = { name: string; href?: string };

/**
 * Experience Framework — Page Hero. The top-of-page block every
 * content-rich page (Engineering Journey, Leadership, Technical
 * Expertise, Architecture Gallery, AI Engineering, Resume, future Blog
 * post) opens with: breadcrumbs, the existing `SectionHeading` (Phase
 * 2) at heading level 1, and an optional meta row for facts that don't
 * belong in the intro paragraph (last updated, read time, entry count).
 *
 * Deliberately does not reimplement heading typography — `SectionHeading`
 * is already the system's one heading component (docs/phase-1-design-
 * system/04-typography.md); this composes it instead of a second
 * "page title" style existing alongside it.
 */
export function PageHero({
  breadcrumbItems,
  kicker,
  title,
  intro,
  meta,
  actions,
}: {
  breadcrumbItems?: PageHeroBreadcrumbItem[];
  kicker?: string;
  title: string;
  intro?: string;
  /** Short facts rendered as a single-line list under the intro — e.g.
   * "Last updated Jul 2026 · 4 min read". Pass pre-formatted strings;
   * this component does not format dates or compute read time itself. */
  meta?: string[];
  /** Optional CTA(s) — e.g. "Download resume" — rendered under the meta row. */
  actions?: ReactNode;
}) {
  return (
    <div id="top" className="hero-ambient">
      {breadcrumbItems && breadcrumbItems.length > 0 ? (
        <Breadcrumbs items={breadcrumbItems} />
      ) : null}
      <div className={breadcrumbItems && breadcrumbItems.length > 0 ? "mt-7" : undefined}>
        <SectionHeading
          level={1}
          kicker={kicker}
          title={title}
          intro={intro}
          className="max-w-3xl"
        />
      </div>
      {meta && meta.length > 0 ? <p className="type-label-muted mt-4">{meta.join(" · ")}</p> : null}
      {actions ? <div className="mt-6 flex flex-wrap items-center gap-4">{actions}</div> : null}
    </div>
  );
}
