import type { CaseStudy, JourneyEntry, Achievement, ArchitectureTheme } from "@/types/content";
import type { Technology } from "@/types/entities";
import {
  getAllExperience,
  getAllTechnologies,
  getAllAchievements,
  getAllProjectCaseStudies,
  getAnyCaseStudyBySlug,
} from "./loaders";
import { resolveTechnologySlugs } from "./adapters";

/**
 * Content Engine — Relation resolvers
 * (docs/phase-7-content-engine/02-entity-relationships.md).
 *
 * `@/content/**` records only ever store the *slug* of something they
 * relate to (`relatedCaseStudySlug`, `stack`, `company`, …) — never a
 * live reference to the other object, so two content files can never
 * end up with two different copies of the same fact. Every function
 * here turns one of those slugs (or an array of them) into the actual,
 * resolved entity/entities, so a component reads `technology.title`
 * instead of re-deriving it from a string.
 */

// Projects → Technologies -------------------------------------------------

export function getTechnologiesForCaseStudy(caseStudy: CaseStudy): Technology[] {
  const slugs = resolveTechnologySlugs(caseStudy.stack);
  const all = getAllTechnologies();
  return slugs
    .map((slug) => all.find((technology) => technology.slug === slug))
    .filter((technology): technology is Technology => Boolean(technology));
}

// Technologies → Projects (reverse of the above) --------------------------

export function getCaseStudiesForTechnology(technologySlug: string): CaseStudy[] {
  return getAllProjectCaseStudies().filter((cs) =>
    resolveTechnologySlugs(cs.stack).includes(technologySlug)
  );
}

// Projects → Experience ----------------------------------------------------

export function getExperienceForCaseStudy(caseStudy: CaseStudy): JourneyEntry | undefined {
  // Prefer explicit experience → project slug links (employer name on a
  // case study can differ from the resume employer line for the same role).
  const byRelatedSlug = getAllExperience().find((entry) =>
    entry.relatedCaseStudySlugs?.includes(caseStudy.slug)
  );
  if (byRelatedSlug) return byRelatedSlug;
  if (!caseStudy.company) return undefined;
  return getAllExperience().find((entry) => entry.company === caseStudy.company);
}

// Experience → Projects (reverse) ------------------------------------------

export function getCaseStudiesForExperience(entry: JourneyEntry): CaseStudy[] {
  const slugs = entry.relatedCaseStudySlugs ?? [];
  return slugs
    .map((slug) => getAnyCaseStudyBySlug(slug))
    .filter((cs): cs is CaseStudy => Boolean(cs));
}

// Experience → Achievements -------------------------------------------------
// Achievements don't carry an explicit `experienceSlug` field (Phase 0's
// `Achievement` type predates Phase 7) — the relation is resolved via the
// `context` string already containing the company name it's already
// written to reference, which is the same verified fact a slug field
// would encode, just not yet machine-keyed. Documented as a known
// limitation rather than silently "working" on a guess — see
// docs/phase-7-content-engine/06-future-extension-points.md.
export function getAchievementsForExperience(entry: JourneyEntry): Achievement[] {
  return getAllAchievements().filter((achievement) => achievement.context.includes(entry.company));
}

// Architecture → Projects ---------------------------------------------------

export function getCaseStudiesForArchitectureTheme(theme: ArchitectureTheme): CaseStudy[] {
  const slugs = theme.relatedCaseStudySlugs ?? [];
  return slugs
    .map((slug) => getAnyCaseStudyBySlug(slug))
    .filter((cs): cs is CaseStudy => Boolean(cs));
}

// Leadership → Experience ----------------------------------------------------
// Every current `LeadershipPrinciple` is grounded in the single Opal BPM
// tenure (the only role with team-leadership scope) — resolved by
// returning that one `JourneyEntry` rather than adding a redundant
// per-principle company field that could only ever say the same thing.

export function getExperienceForLeadership(): JourneyEntry | undefined {
  return getAllExperience().find((entry) => entry.slug === "opal-bpm-india");
}

// Projects → Case Studies -----------------------------------------------------
// Identity today (every `Project` is derived 1:1 from a `CaseStudy` —
// see `content-engine/adapters.ts`), exposed as its own function so a
// future non-1:1 `Project` (no case study yet) still has one call site
// to update.

export function getCaseStudyForProject(caseStudySlug: string | undefined): CaseStudy | undefined {
  if (!caseStudySlug) return undefined;
  return getAnyCaseStudyBySlug(caseStudySlug);
}
