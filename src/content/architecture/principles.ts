import type { EngineeringPrinciple } from "@/types/content";

/**
 * Architecture Gallery, section 7 — Engineering Principles
 * (docs/phase-10-architecture-gallery/02-content-model.md). Five
 * maxims, each paired with one already-verified decision that put it
 * into practice — deliberately worded differently from Engineering
 * Journey's `careerPrinciples` (which cite some of the same underlying
 * facts from a career-value angle) so the two pages don't read as
 * copies of each other.
 */
export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    id: "design-for-maintainability",
    title: "Design for maintainability.",
    explanation:
      "An architecture only earns its keep if it can be changed later without a rewrite — Opal's platform moved from Spring MVC toward Spring Boot, and its frontend from ExtJS toward React, incrementally and in production, rather than as a stop-the-world migration.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "prefer-composition-over-duplication",
    title: "Prefer composition over duplication.",
    explanation:
      "Standardizing OAuth2 across multiple independently-run client deployments replaced N separate, bespoke authentication implementations with one shared, centrally-reviewable capability every deployment composes with.",
    relatedCaseStudySlug: "oauth2-authentication-platform",
  },
  {
    id: "measure-before-optimizing",
    title: "Measure before optimizing.",
    explanation:
      "The 30% reduction in production-issue resolution time at InterGlobe is a measured before/after outcome of a specific ownership change, not a general performance claim.",
    relatedCaseStudySlug: "financial-transaction-platform",
  },
  {
    id: "automate-repetitive-work",
    title: "Automate repetitive work.",
    explanation:
      "Deployment for Opal's platform runs through a Jenkins-driven CI/CD pipeline rather than manual release steps, once the team and release cadence grew past what manual deployment could keep up with.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "build-reusable-platforms",
    title: "Build reusable platforms.",
    explanation:
      "Opal's artwork-management platform is one codebase serving its entire private-brand retail client base, not a fork per client — the same reuse principle behind standardizing OAuth2 once across those same deployments instead of per-client.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
];
