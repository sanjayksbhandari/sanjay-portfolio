import type { ReactNode } from "react";
import type { LeadershipTimelineStage } from "@/content-engine";
import { Timeline, type TimelineItem } from "@/components/experience/Timeline";

/**
 * Technical Leadership — Leadership Timeline
 * (docs/phase-12-technical-leadership/01-architecture.md). Renders
 * `getLeadershipTimeline()`'s stages through the Experience Framework's
 * generic `Timeline` (Phase 8) — the brief's own "Reuse existing timeline
 * components" instruction — without `Timeline`'s optional `id`/`title`
 * props, so this nests inside the page's own `SectionHeader`/intro
 * paragraph instead of growing a second heading.
 *
 * Deliberately not `CareerTimelineEntry` (Engineering Journey) or
 * `ResponsibilityEvolution` (also Engineering Journey): those already
 * render the same verified roles in full on `/journey`. This component
 * shows only the one field this page is actually about —
 * `leadershipScope` — so the pages read as different lenses over the
 * same verified roles, not copies of the same timeline.
 */
function scopeBody(leadershipScope: string[] | null): ReactNode {
  if (!leadershipScope) {
    return (
      <p className="text-sm text-neutral-500 italic">
        Individual contributor role — no leadership scope on record for this position.
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {leadershipScope.map((line, i) => (
        <li key={i} className="flex gap-2 text-sm leading-relaxed text-neutral-600">
          <span className="bg-accent-600 mt-2 h-1 w-1 shrink-0 rounded-full" aria-hidden="true" />
          {line}
        </li>
      ))}
    </ul>
  );
}

export function LeadershipTimeline({ stages }: { stages: LeadershipTimelineStage[] }) {
  const items: TimelineItem[] = stages.map(({ entry, leadershipScope }) => ({
    id: entry.slug,
    title: entry.title,
    meta: entry.dateRange,
    caption: entry.durationLabel,
    description: entry.company,
    body: scopeBody(leadershipScope),
  }));

  return <Timeline items={items} stickyMeta />;
}
