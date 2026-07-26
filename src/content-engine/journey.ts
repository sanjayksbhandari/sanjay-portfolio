import type { CaseStudy, JourneyEntry, Achievement, Metric } from "@/types/content";
import { getAllExperience, getAllProjectCaseStudies } from "./loaders";
import { getCaseStudiesForExperience, getAchievementsForExperience } from "./relations";

/**
 * Content Engine — Engineering Journey derivations
 * (docs/phase-9-engineering-journey/01-architecture.md). Every function
 * here computes a *view* over content that already exists elsewhere
 * (`journeyEntries`, `CaseStudy.stack`/`engineeringOutcomes`/
 * `industries`/`metrics`) via `content-engine/relations.ts` — nothing
 * here authors a new fact, and no page performs this derivation itself
 * (docs/phase-7-content-engine/00-README.md, "No page owns its own
 * content"): `/journey` renders this file's output, it doesn't compute
 * it.
 */

// ---------------------------------------------------------------------
// Chronological ordering
// ---------------------------------------------------------------------

/**
 * `journeyEntries` is authored reverse-chronological (most recent role
 * first — how a resume reads); this page tells a "growth over time"
 * story, so it needs the opposite order. Parses only the *start* of
 * `dateRange` ("Sep 2015 — Apr 2025" → "Sep 2015"); a `dateRange` the
 * parser can't read sorts last rather than throwing.
 */
function parseDateRangeStart(dateRange: string): number {
  const [start] = dateRange.split("—");
  const parsed = Date.parse(`1 ${(start ?? dateRange).trim()}`);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

export function getExperienceChronological(): JourneyEntry[] {
  return [...getAllExperience()].sort(
    (a, b) => parseDateRangeStart(a.dateRange) - parseDateRangeStart(b.dateRange)
  );
}

// ---------------------------------------------------------------------
// Per-role profile — the structured facts a Career Timeline entry needs
// ---------------------------------------------------------------------

export interface ExperienceProfile {
  entry: JourneyEntry;
  caseStudies: CaseStudy[];
  achievements: Achievement[];
  /** Union of related case studies' `stack`, de-duplicated. */
  technologyStack: string[];
  /** Union of related case studies' `engineeringOutcomes`. */
  businessOutcomes: string[];
  /** Union of related case studies' `industries`. */
  industries: string[];
}

function dedupe(items: string[]): string[] {
  return Array.from(new Set(items));
}

export function getExperienceProfile(entry: JourneyEntry): ExperienceProfile {
  const caseStudies = getCaseStudiesForExperience(entry);
  return {
    entry,
    caseStudies,
    achievements: getAchievementsForExperience(entry),
    technologyStack: dedupe(caseStudies.flatMap((cs) => cs.stack ?? [])),
    businessOutcomes: dedupe(caseStudies.flatMap((cs) => cs.engineeringOutcomes ?? [])),
    industries: dedupe(caseStudies.flatMap((cs) => cs.industries ?? [])),
  };
}

export function getAllExperienceProfiles(): ExperienceProfile[] {
  return getExperienceChronological().map(getExperienceProfile);
}

// ---------------------------------------------------------------------
// Technology Evolution — Engineering Journey section 4
// ---------------------------------------------------------------------

export interface TechnologyEvolutionCategory {
  id: string;
  label: string;
  technologies: { name: string; firstSeenIn: JourneyEntry }[];
}

/**
 * This page's own small, explicit taxonomy — deliberately not a reuse
 * of `@/content/impact/tech-ecosystem.ts`'s `techCategories`. That
 * catalog groups by *tool type* (Languages, Frameworks, …) for the
 * Impact Dashboard's Technology Ecosystem block and intentionally
 * excludes architectural patterns like Microservices/Kafka (see that
 * file's own comment). This section groups by *engineering concern* —
 * the brief's own "Backend, Architecture, Cloud, Security, Databases,
 * DevOps, AI" plus "Frontend" (added because ExtJS/React are verified,
 * named parts of the stack evolution and none of the brief's seven
 * buckets fit them) — so Microservices/Kafka belong here, under
 * "Architecture", where `techCategories` deliberately omits them.
 * "AI" is not listed: no AI technology is verified in a `CaseStudy`
 * related to a `JourneyEntry` (LangChain/RAG appear only in personal
 * projects, unlinked to any employer) — see the page's callout to
 * `/ai-engineering` instead of a fabricated "AI" bucket here.
 */
const EVOLUTION_CATEGORIES: { id: string; label: string; match: string[] }[] = [
  {
    id: "backend",
    label: "Backend",
    match: ["java", "python", "spring mvc", "spring boot", "fastapi", "rest apis", "celery"],
  },
  { id: "frontend", label: "Frontend", match: ["extjs", "react"] },
  { id: "architecture", label: "Architecture", match: ["microservices", "kafka"] },
  { id: "cloud", label: "Cloud", match: ["aws"] },
  { id: "security", label: "Security", match: ["spring security", "oauth2", "jwt"] },
  { id: "databases", label: "Databases", match: ["postgresql", "redis"] },
  { id: "devops", label: "DevOps", match: ["docker", "jenkins", "ci/cd"] },
];

/**
 * Folds the small, explicit set of version-suffixed aliases that
 * actually appear in verified `stack` arrays onto their base technology
 * name, for category lookup and cross-role de-duplication only —
 * display always uses the original, exact verified string. Not a
 * general version-number stripper (that would risk silently merging two
 * genuinely different technologies); only the three variants on record
 * are listed here.
 */
export function normalizeTechnologyName(name: string): string {
  const aliases: Record<string, string> = {
    "java 21": "java",
    "spring boot 3.4.13": "spring boot",
    "python 3.12+": "python",
  };
  return aliases[name.toLowerCase()] ?? name.toLowerCase();
}

function categoryFor(name: string): { id: string; label: string } | undefined {
  const normalized = normalizeTechnologyName(name);
  return EVOLUTION_CATEGORIES.find((category) => category.match.includes(normalized));
}

/**
 * Every technology tagged with the earliest (chronological) role it's
 * verified in, grouped by engineering concern. Only technologies from a
 * `CaseStudy.stack` *related to a `JourneyEntry`* are included —
 * deliberately excluding the AI/personal projects' stack, since those
 * aren't part of any employer's verified journey entry.
 */
export function getTechnologyEvolution(): TechnologyEvolutionCategory[] {
  const seen = new Set<string>();
  const byCategory = new Map<string, TechnologyEvolutionCategory>();

  for (const entry of getExperienceChronological()) {
    const { technologyStack } = getExperienceProfile(entry);
    for (const name of technologyStack) {
      const normalized = normalizeTechnologyName(name);
      if (seen.has(normalized)) continue;
      seen.add(normalized);

      const category = categoryFor(name);
      if (!category) continue;

      const bucket = byCategory.get(category.id) ?? {
        id: category.id,
        label: category.label,
        technologies: [],
      };
      bucket.technologies.push({ name, firstSeenIn: entry });
      byCategory.set(category.id, bucket);
    }
  }

  return EVOLUTION_CATEGORIES.map((category) => byCategory.get(category.id)).filter(
    (category): category is TechnologyEvolutionCategory => Boolean(category)
  );
}

// ---------------------------------------------------------------------
// Industry Experience — Engineering Journey section 5
// ---------------------------------------------------------------------

export interface IndustryExperienceEntry {
  label: string;
  caseStudies: CaseStudy[];
}

/**
 * Every unique `CaseStudy.industries` value across every case study and
 * AI/personal project, with the case studies that back it as click-
 * through evidence. Order follows first appearance in
 * `getAllProjectCaseStudies()` (enterprise case studies before personal
 * projects) rather than alphabetical, so the enterprise industries read
 * first.
 */
export function getIndustryExperience(): IndustryExperienceEntry[] {
  const byLabel = new Map<string, CaseStudy[]>();
  for (const cs of getAllProjectCaseStudies()) {
    for (const label of cs.industries ?? []) {
      const existing = byLabel.get(label) ?? [];
      existing.push(cs);
      byLabel.set(label, existing);
    }
  }
  return Array.from(byLabel.entries()).map(([label, caseStudies]) => ({ label, caseStudies }));
}

// ---------------------------------------------------------------------
// Engineering Impact — Engineering Journey section 6
// ---------------------------------------------------------------------

/**
 * Every `Metric` already recorded on a case study, unioned across every
 * project — the structured counterpart to `getAllAchievements()`'s
 * prose statements; the Engineering Impact section renders both.
 */
export function getAllProjectMetrics(): Metric[] {
  return getAllProjectCaseStudies().flatMap((cs) => cs.metrics ?? []);
}
