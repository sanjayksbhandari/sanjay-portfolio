import type { CaseStudy } from "@/types/content";

/**
 * Case Study Architecture — single source of truth for the Phase 6
 * framework (docs/phase-6-case-study-framework/00-README.md). Every one
 * of the brief's 20 sections is listed here exactly once, in reading
 * order, with the `CaseStudy` field it reads and the anchor `id` it
 * renders at. Three things are derived from this one array so they can
 * never drift out of sync with each other:
 *
 * 1. `CaseStudyDetail` renders each section (via `CaseStudySection` or a
 *    dedicated component) in this order.
 * 2. `TableOfContents` lists only the sections a given case study
 *    actually has content for (`getRenderableSections`).
 * 3. The "Content Status" tracker lists every section a given case
 *    study does *not* yet have content for (`getMissingSections`) — so
 *    the per-project TODO list in content files only needs to note
 *    *finer-grained* gaps (a missing diagram, an unconfirmed number),
 *    not "this whole section is empty," which this file already knows.
 */
export interface CaseStudySectionDef {
  id: string;
  title: string;
  /** Section number from the Phase 6 brief (1–20), for documentation/QA — not rendered. */
  number: number;
  field: keyof CaseStudy;
}

export const CASE_STUDY_SECTIONS: readonly CaseStudySectionDef[] = [
  { id: "overview", title: "Project Overview", number: 1, field: "overview" },
  { id: "business-problem", title: "Business Problem", number: 2, field: "businessProblem" },
  { id: "role", title: "My Role", number: 3, field: "myRole" },
  { id: "team", title: "Team Composition", number: 4, field: "teamComposition" },
  { id: "stack", title: "Technology Stack", number: 5, field: "stack" },
  { id: "system-context", title: "System Context", number: 6, field: "systemContext" },
  { id: "architecture", title: "Architecture Summary", number: 7, field: "architectureSummary" },
  { id: "challenges", title: "Technical Challenges", number: 8, field: "technicalChallenges" },
  { id: "decisions", title: "Engineering Decisions", number: 9, field: "decisions" },
  { id: "tradeoffs", title: "Trade-offs", number: 10, field: "tradeoffs" },
  {
    id: "performance",
    title: "Performance Considerations",
    number: 11,
    field: "performanceConsiderations",
  },
  { id: "security", title: "Security Considerations", number: 12, field: "securityConsiderations" },
  {
    id: "scalability",
    title: "Scalability Considerations",
    number: 13,
    field: "scalabilityConsiderations",
  },
  { id: "testing", title: "Testing Strategy", number: 14, field: "testingStrategy" },
  { id: "deployment", title: "Deployment Strategy", number: 15, field: "deploymentStrategy" },
  {
    id: "monitoring",
    title: "Monitoring & Observability",
    number: 16,
    field: "monitoringAndObservability",
  },
  { id: "business-impact", title: "Business Impact", number: 17, field: "businessImpact" },
  { id: "outcomes", title: "Engineering Outcomes", number: 18, field: "engineeringOutcomes" },
  { id: "lessons", title: "Lessons Learned", number: 19, field: "lessonsLearned" },
  { id: "future", title: "Future Improvements", number: 20, field: "futureImprovements" },
];

/** `false`/`0` aren't valid section content, but nothing in `CaseStudy` is
 * boolean/numeric, so this only has to treat null/undefined/""/[] as empty. */
export function isSectionEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

export function getRenderableSections(caseStudy: CaseStudy): CaseStudySectionDef[] {
  return CASE_STUDY_SECTIONS.filter((def) => !isSectionEmpty(caseStudy[def.field]));
}

export function getMissingSections(caseStudy: CaseStudy): CaseStudySectionDef[] {
  return CASE_STUDY_SECTIONS.filter((def) => isSectionEmpty(caseStudy[def.field]));
}
