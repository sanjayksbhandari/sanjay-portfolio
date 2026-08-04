import {
  getAllProjectCaseStudies,
  getAllExperience,
  getAllTechnologies,
  getAllCertifications,
  getAllLeadershipPrinciples,
  getAllArchitectureThemes,
} from "./loaders";
import { caseStudyToEntity, experienceToEntity } from "./adapters";
import { caseStudies } from "@/content/projects/case-studies";

/**
 * Content Engine — Search index (docs/phase-7-content-engine/07-search-
 * and-filter-model.md). A flat, JSON-serializable array built once from
 * every already-loaded entity — the foundation for a *future* Global
 * Search / Command Palette (Phase 3's "Future Search Provider" /
 * "Future Command Palette Provider" extension points), not wired into
 * any UI yet. No command palette, search box, or `/search` route exists
 * in this phase — building the index now, ahead of the UI, is the same
 * pattern already used for `MetricsGrid`, `filters.ts`, and every other
 * "Future X" foundation in this project.
 */
export interface SearchDocument {
  id: string;
  type:
    | "case-study"
    | "personal-project"
    | "experience"
    | "technology"
    | "certification"
    | "leadership"
    | "architecture";
  title: string;
  description?: string;
  url: string;
  tags?: string[];
}

export function buildSearchIndex(): SearchDocument[] {
  const caseStudySlugs = new Set(caseStudies.map((cs) => cs.slug));

  const projectDocs: SearchDocument[] = getAllProjectCaseStudies().map((cs) => {
    const basePath = caseStudySlugs.has(cs.slug) ? "/case-studies" : "/ai-engineering";
    const entity = caseStudyToEntity(cs, basePath);
    return {
      id: entity.id,
      type: caseStudySlugs.has(cs.slug) ? "case-study" : "personal-project",
      title: entity.title,
      description: entity.description,
      url: `${basePath}/${cs.slug}`,
      tags: entity.tags,
    };
  });

  const experienceDocs: SearchDocument[] = getAllExperience().map((entry) => {
    const entity = experienceToEntity(entry);
    return {
      id: entity.id,
      type: "experience",
      title: entity.title,
      description: entity.description,
      url: "/journey",
      tags: entity.tags,
    };
  });

  const technologyDocs: SearchDocument[] = getAllTechnologies().map((technology) => ({
    id: technology.id,
    type: "technology",
    title: technology.title,
    description: technology.category,
    url: "/expertise",
    tags: technology.tags,
  }));

  const certificationDocs: SearchDocument[] = getAllCertifications().map((certification) => ({
    id: `certification-${certification.id}`,
    type: "certification",
    title: certification.name,
    description: certification.issuer,
    url: "/education",
  }));

  const leadershipDocs: SearchDocument[] = getAllLeadershipPrinciples().map((principle) => ({
    id: `leadership-${principle.id}`,
    type: "leadership",
    title: principle.title,
    description: principle.practice,
    url: "/leadership",
  }));

  const architectureDocs: SearchDocument[] = getAllArchitectureThemes().map((theme) => ({
    id: `architecture-${theme.id}`,
    type: "architecture",
    title: theme.title,
    description: theme.summary,
    url: "/architecture",
  }));

  return [
    ...projectDocs,
    ...experienceDocs,
    ...technologyDocs,
    ...certificationDocs,
    ...leadershipDocs,
    ...architectureDocs,
  ];
}
