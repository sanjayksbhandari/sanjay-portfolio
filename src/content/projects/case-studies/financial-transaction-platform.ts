import type { CaseStudy } from "@/types/content";

export const financialTransactionPlatform: CaseStudy = {
  slug: "financial-transaction-platform",
  name: "Financial Transaction Platform",
  kind: "enterprise",
  company: "InterGlobe Air Transport Ltd",
  oneLiner:
    "Backend ownership of critical modules inside InterGlobe's financial systems, including a 30% reduction in production issue resolution time.",
  status: "Production",
  businessProblem:
    "InterGlobe Air Transport Ltd runs financial systems that required dedicated backend ownership, built with Spring MVC and REST APIs, with delivery coordinated across onshore and offshore teams.",
  myRole:
    "As Senior Java Developer (engaged via TeamLease Services Pvt Ltd), I took ownership of critical backend modules within InterGlobe's financial systems, and led production issue triage for those modules — this was an individual-ownership role within a larger onshore/offshore delivery team.",
  teamComposition: null,
  architectureSummary:
    "Backend services built with Spring MVC and REST APIs, serving InterGlobe's finance-domain functionality, developed in coordination with onshore and offshore engineering teams.",
  systemContext: null,
  technicalChallenges:
    "Coordinating feature delivery and incident response for finance-domain systems across onshore and offshore teams, where handoffs and time-zone gaps can otherwise slow down both delivery and incident resolution.",
  decisions: [
    {
      decision:
        "Own production issue triage directly rather than routing all incidents through a separate support layer.",
      whyChosen:
        "Direct ownership of triage shortened the path from an incoming production issue to a root-cause fix, since the person triaging already had the deepest context on the backend modules involved.",
      // TODO: confirm the specific process change made to achieve the 30% MTTR reduction.
    },
  ],
  tradeoffs: null,
  performanceConsiderations: null,
  securityConsiderations: null,
  scalabilityConsiderations: null,
  testingStrategy: null,
  deploymentStrategy: null,
  monitoringAndObservability: null,
  businessImpact: null,
  engineeringOutcomes: ["Reduced mean time to resolution for production issues by 30%."],
  lessonsLearned: null,
  futureImprovements: null,
  stack: ["Java", "Spring MVC", "REST APIs"],
  // "Aviation" (InterGlobe Air Transport Ltd's own industry) plus
  // "Financial Systems" (the specific systems this role owned) — matches
  // the wording already published in `src/content/impact/career-
  // snapshot.ts`'s "Industries" fact, so this doesn't introduce a
  // second, conflicting characterization of the same verified role.
  industries: ["Aviation", "Financial Systems"],
  metrics: [{ value: "30%", label: "MTTR reduction" }],
  todos: [
    {
      label:
        "What kind of financial transactions/modules specifically (to the extent shareable without confidential detail)",
      section: "Business Problem",
    },
    {
      label: "Team size and structure of the onshore/offshore collaboration",
      section: "Team Composition",
    },
    {
      label: "The specific process or tooling change behind the 30% MTTR improvement",
      section: "Engineering Decisions",
    },
    {
      label: "A specific production incident (sanitized) and how it was resolved",
      section: "Technical Challenges",
    },
  ],
  relatedSlugs: ["oauth2-authentication-platform"],
};
