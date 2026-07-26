import type { ArchitecturePattern, CaseStudy } from "@/types/content";
import { getAnyCaseStudyBySlug, getArchitecturePatterns } from "./loaders";
import { normalizeTechnologyName } from "./journey";

/**
 * Content Engine — Engineering Showcase derivations
 * (docs/phase-11-engineering-showcase/01-architecture.md). Same rule as
 * every other derivation file in this module: nothing here authors a
 * new fact — it only computes a curated *view* over `CaseStudy`/
 * `ArchitecturePattern` records that already exist, so `/showcase`
 * renders this file's output rather than computing it inline.
 *
 * The Showcase is deliberately a curated *subset* of
 * `getAllProjectCaseStudies()` — the brief's own "SUPPORTED PROJECTS"
 * list, in that exact order (five enterprise systems, then five
 * personal/AI projects) — not "every project," which is what
 * `/case-studies` and `/ai-engineering` already show in full. A slug
 * that doesn't resolve to a real `CaseStudy` is dropped rather than
 * rendered as a broken entry; `validateContent()` flags that case as a
 * content-authoring error instead (see `validation.ts`).
 */
export const SHOWCASE_SLUGS: readonly string[] = [
  "enterprise-artwork-management-platform",
  "enterprise-exchange-platform",
  "oauth2-authentication-platform",
  "financial-transaction-platform",
  "beckn-protocol-verification-adapter",
  "hiringeasy",
  "ats-resume-builder",
  "resume-parser",
  "ai-resume-optimizer",
  "rag-applications",
];

/** The curated ten, resolved and in the brief's own fixed order — the
 * single source every Showcase feature (the story list, filters,
 * search, Next/Previous) reads from. */
export function getShowcaseProjects(): CaseStudy[] {
  return SHOWCASE_SLUGS.map((slug) => getAnyCaseStudyBySlug(slug)).filter((cs): cs is CaseStudy =>
    Boolean(cs)
  );
}

export function getShowcaseProjectBySlug(slug: string): CaseStudy | undefined {
  return getShowcaseProjects().find((cs) => cs.slug === slug);
}

export interface ShowcaseNeighbors {
  previous: CaseStudy | null;
  next: CaseStudy | null;
}

/**
 * Previous/Next *within the curated Showcase order* — deliberately
 * separate from the same-kind Previous/Next `CaseStudyDetail` already
 * computes on `/case-studies/[slug]` and `/ai-engineering/[slug]`
 * (which cycles through *every* case study or *every* AI project). A
 * reader moving through the Showcase's ten engineering stories in
 * order should land on the next *curated* story, which for the fifth
 * entry means crossing from the enterprise set into the personal one —
 * something the existing same-kind navigation never does.
 */
export function getShowcaseNeighbors(slug: string): ShowcaseNeighbors {
  const projects = getShowcaseProjects();
  const index = projects.findIndex((cs) => cs.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

/**
 * Related Architecture Patterns — the reverse of
 * `ArchitecturePattern.relatedCaseStudySlugs`. Only `status: "verified"`
 * patterns ever carry a `relatedCaseStudySlugs` entry (Phase 10's own
 * validation rule), so a pattern surfaced here is always one actually
 * grounded in this project's own recorded decisions — never a generic
 * pattern implying experience this project doesn't have.
 */
export function getArchitecturePatternsForCaseStudy(slug: string): ArchitecturePattern[] {
  return getArchitecturePatterns().filter((pattern) =>
    (pattern.relatedCaseStudySlugs ?? []).includes(slug)
  );
}

/**
 * Related Technologies — other Showcase projects that share at least
 * one verified `stack` entry with the given project (technology names
 * normalized via `normalizeTechnologyName`, the same alias table
 * `/journey`'s Technology Evolution section uses, so "Java 21" and
 * "Java" count as the same technology). Excludes the project itself;
 * returns an empty array — not a fabricated connection — for a stack
 * that shares nothing with the rest of the curated set.
 */
export function getRelatedShowcaseProjectsByTechnology(caseStudy: CaseStudy): CaseStudy[] {
  const ownStack = new Set((caseStudy.stack ?? []).map(normalizeTechnologyName));
  if (ownStack.size === 0) return [];

  return getShowcaseProjects().filter((other) => {
    if (other.slug === caseStudy.slug) return false;
    return (other.stack ?? []).some((tech) => ownStack.has(normalizeTechnologyName(tech)));
  });
}

/** The single, shared searchable text for a Showcase story — read by
 * both `ShowcaseFilterBar` (what a search query matches against) and,
 * were a future feature to need it, anything else that wants "does this
 * project match a free-text query" without re-deriving its own notion
 * of what counts as searchable. */
export function buildShowcaseSearchText(caseStudy: CaseStudy): string {
  return [
    caseStudy.name,
    caseStudy.oneLiner,
    caseStudy.company ?? "",
    (caseStudy.stack ?? []).join(" "),
    (caseStudy.industries ?? []).join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

export interface ShowcaseFilterFacets {
  /** Every distinct, verified `stack` technology across the curated ten,
   * in first-appearance order. */
  technologies: string[];
  /** Every distinct, verified `industries` value across the curated ten,
   * in first-appearance order. */
  industries: string[];
}

/** The option lists the Showcase's Technology/Industry filters render —
 * derived from the curated set itself, so a filter can never offer a
 * choice that would match zero stories. */
export function getShowcaseFilterFacets(): ShowcaseFilterFacets {
  const technologies: string[] = [];
  const industries: string[] = [];

  for (const cs of getShowcaseProjects()) {
    for (const tech of cs.stack ?? []) {
      if (!technologies.includes(tech)) technologies.push(tech);
    }
    for (const industry of cs.industries ?? []) {
      if (!industries.includes(industry)) industries.push(industry);
    }
  }

  return { technologies, industries };
}
