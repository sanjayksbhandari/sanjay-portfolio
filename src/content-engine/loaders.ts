import type {
  CaseStudy,
  JourneyEntry,
  ExpertiseGroup,
  Achievement,
  Certification,
  ArchitectureTheme,
  ArchitectureCategory,
  ArchitecturePattern,
  EngineeringPrinciple,
  LeadershipPrinciple,
  EngineeringDomain,
  TechCategory,
  EngineeringStrength,
  CareerFact,
  Highlight,
  CareerPrinciple,
  AILearningArea,
  EngineeringCapability,
  EngineeringResponsibility,
  ResumeArtifact,
  ContactMethod,
  AvailabilityFact,
  RecruiterResource,
  HubFAQItem,
  SocialPresenceLink,
  TodoItem,
} from "@/types/content";
import type {
  Person,
  Technology,
  Project,
  Publication,
  Presentation,
  OpenSourceProject,
} from "@/types/entities";

import { person } from "@/content/person";
import { journeyEntries } from "@/content/experience";
import { careerPrinciples } from "@/content/experience/career-principles";
import { caseStudies } from "@/content/projects/case-studies";
import { aiProjects } from "@/content/projects/ai";
import { expertiseGroups } from "@/content/skill-domains";
import { achievements } from "@/content/achievements";
import { certifications } from "@/content/certifications";
import {
  architectureThemes,
  architectureCategories,
  architecturePatterns,
  engineeringPrinciples,
} from "@/content/architecture";
import { leadershipPrinciples } from "@/content/leadership";
import { aiEngineeringPrinciples, aiEngineeringLearningAreas } from "@/content/ai-engineering";
import { engineeringCapabilities, engineeringResponsibilities } from "@/content/capabilities";
import {
  professionalSummary,
  resumeArtifact,
  resumeCenterTodos,
  contactMethods,
  contactResponseTimeTodo,
  availabilityFacts,
  recruiterResources,
  hubFaqItems,
  hubFaqTodos,
  socialPresenceLinks,
} from "@/content/professional-hub";
import { technologies, getTechnologyBySlug as findTechnologyBySlug } from "@/content/technologies";
import { engineeringDomains } from "@/content/impact/domains";
import { techCategories } from "@/content/impact/tech-ecosystem";
import { engineeringStrengths } from "@/content/impact/strengths";
import { careerSnapshot } from "@/content/impact/career-snapshot";
import { selectedHighlights } from "@/content/impact/highlights";
import { publications, presentations, openSourceProjects } from "@/content/blog";
import { caseStudyToProject } from "./adapters";

/**
 * Content Engine — Loaders (docs/phase-7-content-engine/03-loading-
 * strategy.md). This is the *only* module any page or component should
 * import portfolio content from going forward — see
 * docs/phase-7-content-engine/00-README.md, "No page owns its own
 * content."
 *
 * Every function here is a plain, synchronous, side-effect-free read
 * over an in-memory array (the underlying `@/content/**` modules are
 * bundled at build time — see 00-README.md, "Why TypeScript-as-data").
 * That makes every one of them safe to call from:
 *   - a Server Component's render body (no `await` needed, but calling
 *     it inside an `async` component or `generateStaticParams` works
 *     identically);
 *   - `generateStaticParams`/`generateMetadata` for full static
 *     generation;
 *   - a future Route Handler for a JSON API (Future API extension
 *     point — see 06-future-extension-points.md);
 *
 * and, when a future ISR/CMS/API backend replaces the current
 * TypeScript-as-data source (see 05-migration-strategy.md), it's this
 * file's function *bodies* that change to `async`/`fetch` calls — no
 * caller anywhere else in the app changes at all, because every caller
 * already only knows about the function signatures below.
 */

// ---------------------------------------------------------------------
// Person
// ---------------------------------------------------------------------

export function getPerson(): Person {
  return person;
}

// ---------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------

export function getAllExperience(): JourneyEntry[] {
  return journeyEntries;
}

export function getExperienceBySlug(slug: string): JourneyEntry | undefined {
  return journeyEntries.find((entry) => entry.slug === slug);
}

export function getCareerPrinciples(): CareerPrinciple[] {
  return careerPrinciples;
}

// ---------------------------------------------------------------------
// Projects / Case Studies
// ---------------------------------------------------------------------

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllPersonalProjects(): CaseStudy[] {
  return aiProjects;
}

export function getPersonalProjectBySlug(slug: string): CaseStudy | undefined {
  return aiProjects.find((project) => project.slug === slug);
}

/** Every enterprise case study + every personal/AI project, as one flat
 * `CaseStudy[]` — for callers (search index, sitemap) that need "every
 * project" and don't care which of the two kinds it is. */
export function getAllProjectCaseStudies(): CaseStudy[] {
  return [...caseStudies, ...aiProjects];
}

export function getAnyCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getCaseStudyBySlug(slug) ?? getPersonalProjectBySlug(slug);
}

/** The normalized `Project` view (brief's Project entity) over every
 * case study, enterprise and personal — see `Project`'s doc comment in
 * `@/types/entities` for why this is derived rather than authored. */
export function getAllProjects(): Project[] {
  return getAllProjectCaseStudies().map((cs) => caseStudyToProject(cs, journeyEntries));
}

export function getProjectBySlug(slug: string): Project | undefined {
  const caseStudy = getAnyCaseStudyBySlug(slug);
  return caseStudy ? caseStudyToProject(caseStudy, journeyEntries) : undefined;
}

// ---------------------------------------------------------------------
// Technology
// ---------------------------------------------------------------------

export function getAllTechnologies(): Technology[] {
  return technologies;
}

export function getTechnologyBySlug(slug: string): Technology | undefined {
  return findTechnologyBySlug(slug);
}

export function getTechnologyCategories(): TechCategory[] {
  return techCategories;
}

// ---------------------------------------------------------------------
// Skill Domains (Phase 5's ExpertiseGroup)
// ---------------------------------------------------------------------

export function getAllSkillDomains(): ExpertiseGroup[] {
  return expertiseGroups;
}

export function getAllEngineeringDomains(): EngineeringDomain[] {
  return engineeringDomains;
}

// ---------------------------------------------------------------------
// Achievements / Certifications / Architecture / Leadership
// ---------------------------------------------------------------------

export function getAllAchievements(): Achievement[] {
  return achievements;
}

export function getAllCertifications(): Certification[] {
  return certifications;
}

export function getAllArchitectureThemes(): ArchitectureTheme[] {
  return architectureThemes;
}

export function getArchitectureThemeById(id: string): ArchitectureTheme | undefined {
  return architectureThemes.find((theme) => theme.id === id);
}

// ---------------------------------------------------------------------
// Architecture Gallery (Phase 10)
// ---------------------------------------------------------------------

export function getArchitectureCategories(): ArchitectureCategory[] {
  return architectureCategories;
}

export function getArchitecturePatterns(): ArchitecturePattern[] {
  return architecturePatterns;
}

export function getEngineeringPrinciples(): EngineeringPrinciple[] {
  return engineeringPrinciples;
}

export function getAllLeadershipPrinciples(): LeadershipPrinciple[] {
  return leadershipPrinciples;
}

// ---------------------------------------------------------------------
// AI Engineering & Innovation Lab (Phase 13)
// ---------------------------------------------------------------------

export function getAIEngineeringPrinciples(): EngineeringPrinciple[] {
  return aiEngineeringPrinciples;
}

export function getAIEngineeringLearningAreas(): AILearningArea[] {
  return aiEngineeringLearningAreas;
}

// ---------------------------------------------------------------------
// Engineering Capability Matrix (Phase 14)
// ---------------------------------------------------------------------

export function getAllEngineeringCapabilities(): EngineeringCapability[] {
  return engineeringCapabilities;
}

export function getEngineeringCapabilityById(id: string): EngineeringCapability | undefined {
  return engineeringCapabilities.find((capability) => capability.id === id);
}

export function getAllEngineeringResponsibilities(): EngineeringResponsibility[] {
  return engineeringResponsibilities;
}

// ---------------------------------------------------------------------
// Professional Hub (Phase 15)
// ---------------------------------------------------------------------

export function getProfessionalSummary() {
  return professionalSummary;
}

export function getResumeArtifact(): ResumeArtifact {
  return resumeArtifact;
}

export function getResumeCenterTodos(): TodoItem[] {
  return resumeCenterTodos;
}

export function getContactMethods(): ContactMethod[] {
  return contactMethods;
}

export function getContactResponseTimeTodo(): string {
  return contactResponseTimeTodo;
}

export function getAvailabilityFacts(): AvailabilityFact[] {
  return availabilityFacts;
}

export function getRecruiterResources(): RecruiterResource[] {
  return recruiterResources;
}

export function getHubFaqItems(): HubFAQItem[] {
  return hubFaqItems;
}

export function getHubFaqTodos(): TodoItem[] {
  return hubFaqTodos;
}

export function getSocialPresenceLinks(): SocialPresenceLink[] {
  return socialPresenceLinks;
}

// ---------------------------------------------------------------------
// Impact Dashboard composites (Phase 5)
// ---------------------------------------------------------------------

export function getEngineeringStrengths(): EngineeringStrength[] {
  return engineeringStrengths;
}

export function getCareerSnapshot(): CareerFact[] {
  return careerSnapshot;
}

export function getSelectedHighlights(): Highlight[] {
  return selectedHighlights;
}

// ---------------------------------------------------------------------
// Future content sources — empty today (see `@/content/blog`)
// ---------------------------------------------------------------------

export function getAllPublications(): Publication[] {
  return publications;
}

export function getAllPresentations(): Presentation[] {
  return presentations;
}

export function getAllOpenSourceProjects(): OpenSourceProject[] {
  return openSourceProjects;
}
