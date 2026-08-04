import type { JourneyEntry } from "@/types/content";
import { getExperienceChronological } from "./journey";
import { getExperienceForLeadership } from "./relations";
import { getArchitectureDecisionRecords, type ArchitectureDecisionRecord } from "./architecture";

/**
 * Content Engine — Technical Leadership & Engineering Philosophy
 * derivations (docs/phase-12-technical-leadership/01-architecture.md).
 * Same rule as `content-engine/journey.ts`/`architecture.ts`/
 * `showcase.ts`: every function here computes a *view* over content
 * that already exists elsewhere (`JourneyEntry.leadershipScope`,
 * `JourneyEntry.scope`, `CaseStudy.decisions` via
 * `content-engine/architecture.ts`) — nothing here authors a new fact,
 * and `/leadership` renders this file's output rather than computing
 * it inline.
 */

// ---------------------------------------------------------------------
// Leadership Timeline — Technical Leadership section 2
// ---------------------------------------------------------------------

export interface LeadershipTimelineStage {
  entry: JourneyEntry;
  /**
   * `entry.leadershipScope`, or `null` when this role has none on
   * record. Explicitly `null` rather than an empty array so the
   * individual-contributor end of the IC → Leader progression renders
   * its own honest "no leadership scope" note instead of silently
   * disappearing — the Leadership Timeline's whole point is showing
   * *both* ends of that progression, not only the leadership one.
   */
  leadershipScope: string[] | null;
}

/**
 * Chronological (oldest role first, matching `/journey`'s own Career
 * Timeline ordering) view of exactly `getExperienceChronological()` —
 * every verified `JourneyEntry`, with leadership scope called out only
 * where `leadershipScope` is on record (today: Opal BPM — technical
 * leadership of 5–7 developers in the last ~5 years of a Senior → Lead
 * progression). This is a second, leadership-scoped *lens* over the same
 * records `/journey`'s Career Timeline renders in full — not a second,
 * separately-authored timeline.
 */
export function getLeadershipTimeline(): LeadershipTimelineStage[] {
  return getExperienceChronological().map((entry) => ({
    entry,
    leadershipScope:
      entry.leadershipScope && entry.leadershipScope.length > 0 ? entry.leadershipScope : null,
  }));
}

// ---------------------------------------------------------------------
// Delivery Excellence — Technical Leadership section 5
// ---------------------------------------------------------------------

/** Keywords identifying which lines of the Opal BPM role's own
 * verified `scope` are specifically about release/deployment practice
 * — filtered rather than retyped, so this list can never drift out of
 * sync with `journeyEntries`' own wording. */
const DELIVERY_PRACTICE_KEYWORDS = ["ci/cd", "deployment", "rollback"];

/**
 * The subset of the one leadership-scoped role's `scope` that's
 * specifically about *how* things ship (CI/CD strategy, deployment
 * ownership, rollback/monitoring) — a third, narrower lens over the
 * same verified `scope` array `leadershipScope` already draws from,
 * for the Delivery Excellence section specifically.
 */
export function getDeliveryPracticesForLeadership(): string[] {
  const entry = getExperienceForLeadership();
  if (!entry) return [];
  return entry.scope.filter((line) =>
    DELIVERY_PRACTICE_KEYWORDS.some((keyword) => line.toLowerCase().includes(keyword))
  );
}

// ---------------------------------------------------------------------
// Decision-Making Framework — Technical Leadership section 7
// ---------------------------------------------------------------------

/**
 * Two of the Architecture Gallery's own, already-verified ADRs —
 * deliberately the same two decisions the "Architecture Reviews"
 * `LeadershipPrinciple` (`src/content/leadership/index.ts`) already
 * names ("the Enterprise Exchange Platform's 16-service decomposition
 * and the Beckn Protocol Verification Adapter's state-machine
 * design"). Featured here as worked examples of the Problem → Options
 * → Trade-offs → Decision → Outcome framework, rather than re-listing
 * all nine ADRs a second time — those already have a full page at
 * `/architecture#decision-records`, linked from this section instead.
 */
export const FEATURED_LEADERSHIP_DECISION_IDS: readonly string[] = [
  "enterprise-exchange-platform-decision-0",
  "beckn-protocol-verification-adapter-decision-0",
];

export function getFeaturedLeadershipDecisions(): ArchitectureDecisionRecord[] {
  const all = getArchitectureDecisionRecords();
  return FEATURED_LEADERSHIP_DECISION_IDS.map((id) =>
    all.find((record) => record.id === id)
  ).filter((record): record is ArchitectureDecisionRecord => Boolean(record));
}
