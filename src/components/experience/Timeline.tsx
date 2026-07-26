import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

/**
 * Experience Framework — Timeline Framework
 * (docs/phase-8-experience-framework/00-README.md). Generalizes and
 * replaces two Phase 0/6 implementations that were the same idea
 * rendered twice: `journey/JourneyTimeline` (a work-history entry: role
 * + company + date range + duration + bullet scope) and Phase 6's
 * case-study-only `Timeline` (a bare label + optional date). One
 * `TimelineItem` shape covers both — every field but `id`/`title` is
 * optional, so a simple case-study milestone list and a full career
 * history entry render through the same component without either one
 * carrying fields it doesn't use.
 *
 * Kept intentionally simple (a vertical list with a left date/duration
 * column, not a literal graphic timeline/rail) — matches the project's
 * "no decorative graphics" rule (Phase 1 §11, Phase 6 Visual Design).
 */
export interface TimelineItem {
  id: string;
  title: string;
  /** e.g. a date range ("Sep 2015 — Apr 2025") or a single date. */
  meta?: string;
  /** e.g. a computed duration label ("9 years, 7 months"). */
  caption?: string;
  /** e.g. "Company Name · Location" for a work-history entry. */
  description?: string;
  /** e.g. the bullet-point scope of a role, or sub-points of a milestone. */
  details?: string[];
  /**
   * A richer, page-composed body — e.g. the Engineering Journey's
   * per-role breakdown (responsibilities, outcomes, projects,
   * achievements, stack), built from other Experience Framework
   * primitives (docs/phase-9-engineering-journey/01-architecture.md).
   * Rendered instead of `details` when present, so a caller with
   * bespoke per-item content isn't forced to flatten it into a bullet
   * list just to fit `details: string[]`.
   */
  body?: ReactNode;
}

export function Timeline({
  id,
  title,
  items,
  stickyMeta = false,
}: {
  id?: string;
  title?: string;
  items?: TimelineItem[] | null;
  /**
   * Pins each item's date/duration column to the top of the viewport
   * (`lg:` and above) while that item's body scrolls past it — the
   * "Sticky timeline (desktop)" interaction from
   * docs/phase-9-engineering-journey/00-README.md. CSS `position:
   * sticky` only, degrades to normal flow below `lg:` and needs no
   * JavaScript, so it costs nothing on mobile or under reduced motion.
   */
  stickyMeta?: boolean;
}) {
  if (!items || items.length === 0) return null;

  const body = (
    <ol className="mt-4 space-y-14">
      {items.map((item) => (
        <li
          key={item.id}
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-[180px_1fr]",
            stickyMeta && "lg:items-start"
          )}
        >
          <div className={stickyMeta ? "lg:sticky lg:top-[calc(var(--header-height)+1.5rem)]" : ""}>
            {item.meta ? (
              <p className="font-mono text-sm tracking-[-0.01em] text-neutral-600">{item.meta}</p>
            ) : null}
            {item.caption ? <p className="mt-1 text-xs text-neutral-600">{item.caption}</p> : null}
          </div>
          <div
            className={cn(
              item.description || item.details || item.body ? "timeline-rail" : "",
              "rounded-md transition-[background-color] duration-[var(--motion-standard)] ease-[var(--ease-spring)] hover:bg-neutral-50/60 dark:hover:bg-neutral-100/40"
            )}
          >
            <p className="type-h4">{item.title}</p>
            {item.description ? (
              <p className="type-caption mt-1 font-semibold">{item.description}</p>
            ) : null}
            {item.body ? (
              <div className="mt-4">{item.body}</div>
            ) : item.details && item.details.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {item.details.map((line, i) => (
                  <li key={i} className="text-sm leading-relaxed text-neutral-600">
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );

  if (!id || !title) return body;

  return (
    <section id={id} className="scroll-anchor mt-12">
      <SectionHeader sectionId={id} title={title} />
      {body}
    </section>
  );
}
