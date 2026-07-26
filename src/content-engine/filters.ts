import type { CaseStudy, CaseStudyKind } from "@/types/content";
import { getAllProjectCaseStudies, getAllTechnologies } from "./loaders";
import { resolveTechnologySlugs } from "./adapters";

/**
 * Content Engine — Filter model (docs/phase-7-content-engine/07-search-
 * and-filter-model.md). Plain array filters over `getAllProjectCaseStudies()`
 * — the foundation for future filter UI on `/case-studies`,
 * `/ai-engineering`, or a future unified `/projects` page. Not wired
 * into any page in this phase (per the Phase 7 brief: "Stop after
 * completing the Content Engine").
 *
 * Every filter degrades gracefully to "no results" rather than throwing
 * on an unknown value — a future filter UI can pass whatever the user
 * picked without a defensive existence check first.
 */

export function filterByTechnology(
  technologySlug: string,
  projects = getAllProjectCaseStudies()
): CaseStudy[] {
  return projects.filter((cs) => resolveTechnologySlugs(cs.stack).includes(technologySlug));
}

export function filterByCompany(
  company: string,
  projects = getAllProjectCaseStudies()
): CaseStudy[] {
  return projects.filter((cs) => cs.company === company);
}

export function filterByKind(
  kind: CaseStudyKind,
  projects = getAllProjectCaseStudies()
): CaseStudy[] {
  return projects.filter((cs) => cs.kind === kind);
}

/** "Category" is the same axis `techCategories` groups technologies by
 * (Languages, Cloud, AI, …) — a project matches a category if any of
 * its resolved technologies belong to it. */
export function filterByTechnologyCategory(
  categoryId: string,
  projects = getAllProjectCaseStudies()
): CaseStudy[] {
  const categorySlugs = new Set(
    getAllTechnologies()
      .filter((technology) => technology.category === categoryId)
      .map((technology) => technology.slug)
  );
  return projects.filter((cs) =>
    resolveTechnologySlugs(cs.stack).some((slug) => categorySlugs.has(slug))
  );
}

/**
 * "Industry" is now verified at the per-project level
 * (`CaseStudy.industries`, added in docs/phase-9-engineering-journey/02-
 * content-model.md) — this now does a real filter instead of the
 * "returns everything unfiltered" placeholder documented in Phase 7.
 * See `content-engine/journey.ts`'s `getIndustryExperience()` for the
 * aggregate view this powers on `/journey`.
 */
export function filterByIndustry(
  industry: string,
  projects = getAllProjectCaseStudies()
): CaseStudy[] {
  return projects.filter((cs) => (cs.industries ?? []).includes(industry));
}

/**
 * "Year" isn't a field on `CaseStudy` either — only the *Experience*
 * (`journeyEntries[].dateRange`) has a verified span, and attributing a
 * specific project to a specific year inside a multi-year tenure
 * without a verified project date would be a fabrication. Returns no
 * matches rather than guessing; a verified per-project date would
 * replace this with a real comparison.
 */
export function filterByYear(_year: string, projects = getAllProjectCaseStudies()): CaseStudy[] {
  void projects;
  return [];
}

/** "Architecture" and "Leadership" filters operate on the already-
 * separate `architectureThemes`/`leadershipPrinciples` collections
 * (they're not project attributes) — see
 * `getCaseStudiesForArchitectureTheme` / `getExperienceForLeadership` in
 * `content-engine/relations.ts` instead of a filter here. */
