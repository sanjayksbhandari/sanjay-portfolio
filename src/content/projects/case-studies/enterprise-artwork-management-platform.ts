import type { CaseStudy } from "@/types/content";

export const enterpriseArtworkManagementPlatform: CaseStudy = {
  slug: "enterprise-artwork-management-platform",
  name: "Enterprise Artwork Management Platform",
  kind: "enterprise",
  company: "Opal BPM India Pvt Ltd",
  oneLiner:
    "Opal's core product lifecycle, regulatory compliance, and packaging artwork management platform for private-brand retailers — architected and built from the company's second employee onward.",
  status: "Production",
  businessProblem:
    "Opal BPM builds an enterprise platform that lets private-brand retailers manage product specifications, supplier collaboration, packaging artwork workflows and approvals, and regulatory/compliance data (including packaging composition needed for extended producer responsibility reporting) in one system. This is Opal's core commercial product.",
  myRole:
    "I joined Opal BPM as its second employee in September 2015 and, over nine and a half years, architected and led full-stack development of its enterprise applications — spanning Spring MVC, Spring Security, Spring Boot, Microservices, ExtJS, and React on the frontend side — while the product and engineering team scaled around that architecture.",
  teamComposition: null,
  architectureSummary:
    "A distributed, service-oriented enterprise application built on the Spring stack (Spring MVC → Spring Boot as the platform matured), with ExtJS and later React on the client side, deployed via AWS EC2 and Docker with Jenkins-driven CI/CD.",
  systemContext: null,
  technicalChallenges:
    "Architecting a system that had to serve regulatory-compliance and packaging-artwork workflows for private-brand retailers — a domain where correctness and auditability matter as much as speed — while the underlying platform and team were still being built out from a two-person start.",
  decisions: [
    {
      decision:
        "Evolve the platform from Spring MVC toward Spring Boot and Microservices as it scaled.",
      whyChosen:
        "As the client base and feature surface grew, moving toward Spring Boot and a microservices decomposition supported independent scaling and deployment of platform capabilities rather than a single monolithic release train.",
      // TODO: confirm specifics of the MVC-to-microservices migration path and timeline.
    },
    {
      decision: "Migrate the frontend from ExtJS toward React over the platform's lifetime.",
      whyChosen:
        "ExtJS met the platform's early enterprise-UI needs; React was adopted as the ecosystem and hiring pool shifted, without a full-stop rewrite.",
      // TODO: confirm rationale/timeline for the ExtJS → React transition in more detail.
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
  engineeringOutcomes: [
    "In continuous production use across Opal's private-brand retail client base for nine-plus years.",
    "Scaled from a two-person starting point to a full engineering organization and product suite over that period.",
  ],
  lessonsLearned: null,
  futureImprovements: null,
  stack: [
    "Java",
    "Spring MVC",
    "Spring Boot",
    "Spring Security",
    "Microservices",
    "ExtJS",
    "React",
    "AWS",
    "Docker",
    "Jenkins",
    "CI/CD",
  ],
  // Directly from this case study's own `oneLiner`/`businessProblem` above
  // ("packaging artwork management platform ... for private-brand
  // retailers") — see the `CaseStudy.industries` doc comment.
  industries: ["Retail", "Packaging", "Enterprise SaaS"],
  metrics: [{ value: "9+", label: "Years in continuous production" }],
  todos: [
    {
      label: "Public-safe description of a specific artwork/compliance workflow you designed",
      section: "Technical Challenges",
    },
    {
      label:
        "Scale indicators safe to share (number of clients/products/SKUs managed, if approved)",
      section: "Business Impact",
    },
    { label: "Architecture diagram of the platform's service layout", section: "System Context" },
    {
      label:
        "A specific technical challenge from the early (pre-microservices) years and how it was solved",
      section: "Technical Challenges",
    },
  ],
  relatedSlugs: ["oauth2-authentication-platform", "enterprise-exchange-platform"],
};
