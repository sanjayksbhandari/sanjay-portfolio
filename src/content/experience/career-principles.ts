import type { CareerPrinciple } from "@/types/content";

// Engineering Journey, section 7 — Career Principles
// (docs/phase-9-engineering-journey/02-content-model.md). Every
// `evidence` string below is a restatement of a fact already published
// in `src/content/projects/case-studies/*.ts`, `src/content/leadership`,
// or `src/content/experience` — this file authors no new claim, only a
// values-oriented lens over six already-verified facts. Deliberately
// six entries, matching the brief's own named themes (Maintainability,
// Scalability, Code Quality, Architecture, Mentoring, Reliability) —
// not a "top N" ranking of a larger unverified list.
export const careerPrinciples: CareerPrinciple[] = [
  {
    id: "maintainability",
    title: "Maintainability",
    evidence:
      "I evolved Opal's platform from a Spring MVC monolith toward Spring Boot and microservices, and its frontend from ExtJS to React, without a full-stop rewrite.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "scalability",
    title: "Scalability",
    evidence:
      "I decomposed the Enterprise Exchange Platform into 16 focused microservices so order intake, trade matching, settlement, and notification could each scale and deploy independently.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
  },
  {
    id: "code-quality",
    title: "Code Quality",
    evidence:
      "I set code-quality and system-design standards for a 5–7 developer team during the last five years of my Opal BPM tenure, rather than relying on ad hoc review.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "architecture",
    title: "Architecture",
    evidence:
      "I owned the architectural decisions behind the Enterprise Exchange Platform's 16-service decomposition and the Beckn Protocol Verification Adapter's state-machine design — decisions made and defended, not implemented from a pre-defined spec.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
  },
  {
    id: "mentoring",
    title: "Mentoring",
    evidence:
      "During the last five years at Opal BPM, I provided technical leadership and mentoring to a team of 5–7 developers after progressing from Senior Java Developer into Lead Java Developer.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "reliability",
    title: "Reliability",
    evidence:
      "I architected and operated the Enterprise Exchange Platform in production at 99.9% uptime, with notification delivery under 100ms.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
  },
];
