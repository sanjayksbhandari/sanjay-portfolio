import type { CaseStudy, JourneyEntry } from "@/types/content";
import type { BaseEntity, Project } from "@/types/entities";
import { technologies } from "@/content/technologies";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * `stack` items that aren't in the Technology catalog on purpose
 * (`@/content/impact/tech-ecosystem.ts`'s own documented exclusion —
 * architectural patterns, not tools/products) resolve to nothing here
 * rather than being silently invented as a new Technology. See
 * `content-engine/validation.ts`'s `findUnresolvedStackItems` for how
 * this is surfaced instead of hidden.
 */
export function resolveTechnologySlugs(stack: string[] | null | undefined): string[] {
  if (!stack) return [];
  return stack
    .map((item) => slugify(item))
    .filter((slug) => technologies.some((technology) => technology.slug === slug));
}

/** `CaseStudy.company` → the matching `JourneyEntry.slug`, if any —
 * personal projects (no `company`) and any company string that doesn't
 * match a verified `journeyEntries` entry both resolve to `undefined`
 * rather than a guess. */
export function findExperienceSlugForCompany(
  company: string | undefined,
  experience: JourneyEntry[]
): string | undefined {
  if (!company) return undefined;
  return experience.find((entry) => entry.company === company)?.slug;
}

/**
 * `CaseStudy` → `Project`. A derived *view*, not a second authored
 * record — see the `Project` doc comment in `@/types/entities`. Called
 * by `content-engine/loaders.ts`'s `getAllProjects`, never imported
 * directly by a page.
 */
export function caseStudyToProject(caseStudy: CaseStudy, experience: JourneyEntry[]): Project {
  return {
    id: `project-${caseStudy.slug}`,
    slug: caseStudy.slug,
    title: caseStudy.name,
    description: caseStudy.oneLiner,
    summary: caseStudy.oneLiner,
    status: caseStudy.status === "In Development" ? "draft" : "published",
    kind: caseStudy.kind,
    company: caseStudy.company,
    technologySlugs: resolveTechnologySlugs(caseStudy.stack),
    experienceId: findExperienceSlugForCompany(caseStudy.company, experience),
    caseStudySlug: caseStudy.slug,
    tags: caseStudy.stack ?? [],
    relations: {
      technologies: resolveTechnologySlugs(caseStudy.stack),
      caseStudies: [caseStudy.slug],
      related: caseStudy.relatedSlugs ?? [],
    },
    seo: {
      description: caseStudy.oneLiner,
      keywords: caseStudy.stack ?? undefined,
    },
  };
}

/**
 * Adapts any Phase 0–6 entity shape into the generic `BaseEntity` used by
 * cross-cutting Content Engine features (search index, generic SEO) —
 * see the "Why not every entity extends BaseEntity" note in
 * `@/types/entities`. One small function per source shape; each is a
 * pure read-only projection, never a mutation of the original record.
 */
export function caseStudyToEntity(caseStudy: CaseStudy, basePath: string): BaseEntity {
  return {
    id: `case-study-${caseStudy.slug}`,
    slug: caseStudy.slug,
    title: caseStudy.name,
    description: caseStudy.oneLiner,
    summary: caseStudy.oneLiner,
    status: caseStudy.status === "In Development" ? "draft" : "published",
    tags: caseStudy.stack ?? [],
    metadata: {
      kind: caseStudy.kind,
      company: caseStudy.company,
      path: `${basePath}/${caseStudy.slug}`,
    },
  };
}

export function experienceToEntity(entry: JourneyEntry): BaseEntity {
  return {
    id: `experience-${entry.slug}`,
    slug: entry.slug,
    title: `${entry.title}, ${entry.company}`,
    description: entry.dateRange,
    summary: entry.scope[0],
    status: "published",
    tags: [entry.company],
    metadata: { dateRange: entry.dateRange, path: "/journey" },
  };
}
