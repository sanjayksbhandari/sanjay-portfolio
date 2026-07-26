import type { EngineeringCapability, EngineeringResponsibility } from "@/types/content";

/**
 * Engineering Capability Matrix — Capability Domains
 * (docs/phase-14-capability-matrix/02-content-model.md).
 *
 * Every `evidence`/`businessValue` string restates a fact already
 * published in a `CaseStudy`, `Achievement`, `JourneyEntry`,
 * `LeadershipPrinciple`, or `Highlight` — never a new claim authored
 * for this page alone. The brief's own example list names fifteen
 * candidate domains; only those with verified evidence appear below.
 * "Performance Optimization" and "Database Engineering" are included
 * only to the depth the record supports (verified latency/uptime
 * outcomes; databases used in production stacks), each with an
 * explicit TODO where a deeper practice statement isn't on record yet.
 */
export const engineeringCapabilities: EngineeringCapability[] = [
  {
    id: "enterprise-backend",
    title: "Enterprise Backend Development",
    overview:
      "Designing and shipping production Java backends for multi-year enterprise platforms — Spring MVC through Spring Boot — across four verified employers.",
    evidence:
      "Lead Java Developer at Opal BPM for nine-plus years (Spring MVC, Spring Boot, Microservices) and Senior Java Developer on InterGlobe's financial backend modules (Spring MVC, REST APIs).",
    businessValue:
      "Sustained ownership of the systems private-brand retailers and finance-domain teams actually ran on — not short consulting engagements.",
    relatedCaseStudySlugs: [
      "enterprise-artwork-management-platform",
      "financial-transaction-platform",
    ],
    relatedTechnologies: ["Java", "Spring Boot", "Spring MVC", "REST APIs"],
  },
  {
    id: "system-architecture",
    title: "System Architecture",
    overview:
      "Architecting production platforms from the ground up and evolving them as the client base and feature surface grew.",
    evidence:
      "Architected the 16-microservice Enterprise Exchange Platform and led the Artwork Management Platform's evolution from a Spring MVC monolith toward Spring Boot and microservices.",
    businessValue:
      "A multi-tenant trading platform in production at 99.9% uptime, and an artwork platform in continuous production use across Opal's private-brand retail client base for nine-plus years.",
    relatedCaseStudySlugs: [
      "enterprise-exchange-platform",
      "enterprise-artwork-management-platform",
    ],
    relatedTechnologies: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Kafka", "Redis"],
  },
  {
    id: "rest-api-design",
    title: "REST API Design",
    overview:
      "Building the integration surfaces that enterprise and protocol-facing systems expose to the rest of their environment.",
    evidence:
      "REST APIs on InterGlobe's financial backend modules, on Opal's Spring Boot services behind the OAuth2 layer, and as the FastAPI surface of the Beckn Protocol Verification Adapter.",
    businessValue:
      "A single, reviewable interface for finance-domain clients, platform consumers, and 5+ identity-verification providers — rather than a bespoke integration per caller.",
    relatedCaseStudySlugs: [
      "financial-transaction-platform",
      "oauth2-authentication-platform",
      "beckn-protocol-verification-adapter",
    ],
    relatedTechnologies: ["REST APIs", "Spring Boot", "FastAPI", "Java", "Python"],
  },
  {
    id: "authentication-security",
    title: "Authentication & Security",
    overview:
      "Standardizing how identity and access are established across independently-run client deployments.",
    evidence:
      "Led the design and rollout of an OAuth2-based authentication and authorization system, enforced with Spring Security and JWT, across multiple independent client deployments of Opal's platform.",
    businessValue:
      "Replaced a fragmented, per-client approach to authentication with one standard — cutting the security-review burden for every new and existing client deployment.",
    relatedCaseStudySlugs: ["oauth2-authentication-platform"],
    relatedTechnologies: ["OAuth2", "JWT", "Spring Security", "Java", "Spring Boot"],
  },
  {
    id: "performance-outcomes",
    title: "Performance-Conscious Systems",
    overview:
      "Shipping systems whose verified production outcomes include explicit latency and uptime targets — not a separate performance-tuning methodology on record.",
    evidence:
      "Enterprise Exchange Platform: 99.9% uptime with notification delivery under 100ms. Beckn Protocol Verification Adapter: sub-50ms P95 API latency across 5+ providers.",
    businessValue:
      "Trading and identity-verification paths that stay within the latency budgets those domains actually need, without inventing an unverified optimization process behind them.",
    relatedCaseStudySlugs: ["enterprise-exchange-platform", "beckn-protocol-verification-adapter"],
    relatedTechnologies: ["Kafka", "Redis", "FastAPI", "PostgreSQL"],
    todos: [
      {
        label:
          "The specific performance-tuning methodology used (profiling, load testing, caching strategy), in your own words",
      },
    ],
  },
  {
    id: "production-support",
    title: "Production Support",
    overview:
      "Owning production incident triage on systems already in use — shortening the path from an incoming issue to a root-cause fix.",
    evidence:
      "Took direct ownership of production issue triage for InterGlobe's financial systems, reducing mean time to resolution by 30%.",
    businessValue:
      "Faster recovery from production incidents in finance-domain systems, reducing the business impact of each incident.",
    relatedCaseStudySlugs: ["financial-transaction-platform"],
    relatedTechnologies: ["Java", "Spring MVC", "REST APIs"],
  },
  {
    id: "microservices",
    title: "Microservices",
    overview:
      "Decomposing a platform along domain seams so each service can scale and change independently.",
    evidence:
      "Decomposed the Enterprise Exchange Platform into 16 focused microservices (order intake, matching, settlement, notification) with distinct scaling and change profiles per tenant and waste category.",
    businessValue:
      "A multi-tenant trading platform letting buyer/seller organizations transact across 5 waste categories on shared infrastructure — each domain seam able to evolve without a single monolithic release train.",
    relatedCaseStudySlugs: ["enterprise-exchange-platform"],
    relatedTechnologies: ["Microservices", "Java 21", "Spring Boot 3.4.13", "Kafka", "PostgreSQL"],
  },
  {
    id: "database-engineering",
    title: "Database Engineering",
    overview:
      "Using relational and in-memory data stores as part of production platforms — depth of schema/query practice not yet documented separately.",
    evidence:
      "PostgreSQL and Redis on the Enterprise Exchange Platform; PostgreSQL on the Beckn adapter; Oracle and MySQL appear in the verified technology catalog from enterprise delivery.",
    businessValue:
      "Durable state and low-latency lookups behind trading and identity-verification paths that already run in production.",
    relatedCaseStudySlugs: ["enterprise-exchange-platform", "beckn-protocol-verification-adapter"],
    relatedTechnologies: ["PostgreSQL", "Redis", "Oracle", "MySQL"],
    todos: [
      {
        label:
          "Specific database-engineering practices (schema design, indexing, migration strategy) used on these platforms, in your own words",
      },
    ],
  },
  {
    id: "cloud-deployment",
    title: "Cloud & Deployment",
    overview:
      "Owning how critical services reach UAT and production — including rollback and monitoring strategy — on cloud infrastructure.",
    evidence:
      "Owned deployment of critical services to UAT/production at Opal BPM, including rollback and monitoring strategy, and implemented cloud-native deployments on AWS EC2 with Docker.",
    businessValue:
      "Repeatable path from merged change to running service, with an explicit rollback plan, rather than ad hoc production pushes.",
    relatedCaseStudySlugs: ["enterprise-artwork-management-platform"],
    relatedTechnologies: ["AWS", "Docker", "Jenkins"],
  },
  {
    id: "cicd",
    title: "CI/CD",
    overview:
      "Defining the delivery pipeline itself — not only consuming one that already existed.",
    evidence:
      "Defined CI/CD strategy using Jenkins and Docker for Opal BPM's platform deployments.",
    businessValue:
      "A named, owned pipeline strategy behind nine-plus years of incremental delivery, rather than one-off release scripts.",
    relatedCaseStudySlugs: ["enterprise-artwork-management-platform"],
    relatedTechnologies: ["Jenkins", "CI/CD", "Docker", "Maven", "Gradle"],
  },
  {
    id: "technical-leadership",
    title: "Technical Leadership",
    overview:
      "Growing into technical leadership of a product engineering team and owning the standards it worked against.",
    evidence:
      "Grew from Opal BPM's second engineering hire into Lead Java Developer over nine-plus years, providing technical leadership to a team of 5–7 developers.",
    businessValue:
      "The technical leadership Opal's engineering organization needed as it scaled from a two-person start into a full team and product suite.",
    relatedCaseStudySlugs: ["enterprise-artwork-management-platform"],
    relatedTechnologies: [],
  },
  {
    id: "code-quality",
    title: "Code Quality",
    overview: "Setting code-quality standards for a team rather than relying on ad hoc review.",
    evidence:
      "Established code-quality and system-design practices for a 5–7 developer team at Opal BPM as part of the Lead Java Developer role.",
    businessValue:
      "A shared review bar the team worked against as headcount grew — not a different standard per reviewer.",
    relatedCaseStudySlugs: ["enterprise-artwork-management-platform"],
    relatedTechnologies: [],
    todos: [
      {
        label:
          "What you specifically look for first in a code review, and how you deliver feedback",
      },
    ],
  },
  {
    id: "mentoring",
    title: "Mentoring",
    overview:
      "Mentoring developers through the same code-quality and system-design practices the team was held to.",
    evidence:
      "Provided technical leadership and mentoring to a team of 5–7 developers at Opal BPM, establishing the practices the team worked against.",
    businessValue:
      "A team that could absorb new hires against a documented standard rather than tribal knowledge alone.",
    relatedCaseStudySlugs: ["enterprise-artwork-management-platform"],
    relatedTechnologies: [],
    todos: [
      {
        label:
          "Your actual mentoring approach — how you onboard/coach a developer, in your own words",
      },
    ],
  },
  {
    id: "cross-team-collaboration",
    title: "Cross-team Collaboration",
    overview:
      "Translating business requirements into architecture and aligning delivery across organizational boundaries.",
    evidence:
      "Collaborated with cross-functional teams and stakeholders to translate business requirements into technical architecture at Opal BPM, and aligned onshore/offshore delivery with finance-domain needs at InterGlobe.",
    businessValue:
      "Architecture and delivery that stayed coupled to the business problem — not a hand-off that lost context at the org chart boundary.",
    relatedCaseStudySlugs: ["financial-transaction-platform"],
    relatedTechnologies: [],
  },
  {
    id: "ai-assisted-engineering",
    title: "AI-assisted Engineering",
    overview:
      "Extending enterprise engineering discipline into personal, solo-built AI products — not enterprise AI production deployments.",
    evidence:
      "Seven personal projects spanning ATS Resume Builder (shipped end-to-end with live ATS scoring and paid exports), Resume Parser, AI Resume Matching/Optimizer, Cover Letter Generator, RAG Applications (LangChain), and HiringEasy.",
    businessValue:
      "Practical application of prompt engineering, RAG, and LangChain to real resume/hiring workflows — clearly personal/solo work, not claimed as enterprise AI production experience.",
    relatedCaseStudySlugs: ["ats-resume-builder", "rag-applications"],
    relatedTechnologies: ["Python", "LangChain", "RAG", "Prompt Engineering", "Flask"],
  },
];

/**
 * Engineering Responsibilities Matrix — one row per brief category.
 * Evidence is a restatement of an already-published fact; categories
 * with outcomes but no documented *practice* carry a `todo`.
 */
export const engineeringResponsibilities: EngineeringResponsibility[] = [
  {
    id: "architecture",
    category: "Architecture",
    evidence:
      "Owned the architectural decisions behind the Enterprise Exchange Platform's 16-service decomposition and the Artwork Management Platform's Spring MVC → Spring Boot/microservices evolution.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
  },
  {
    id: "design",
    category: "Design",
    evidence:
      "Designed the OAuth2 authorization model rolled out across multiple client deployments, and the Beckn adapter's explicit verification-lifecycle state machine.",
    relatedCaseStudySlug: "oauth2-authentication-platform",
  },
  {
    id: "implementation",
    category: "Implementation",
    evidence:
      'Led full-stack development of Opal\'s enterprise applications and built the Beckn Protocol Verification Adapter ("WRI Connector") end-to-end.',
    relatedCaseStudySlug: "beckn-protocol-verification-adapter",
  },
  {
    id: "debugging",
    category: "Debugging",
    evidence:
      "Took direct ownership of production issue triage on InterGlobe's financial backend modules — the same ownership that produced the verified 30% MTTR reduction.",
    relatedCaseStudySlug: "financial-transaction-platform",
  },
  {
    id: "optimization",
    category: "Optimization",
    evidence:
      "Verified production outcomes include sub-100ms notification delivery and sub-50ms P95 API latency — the specific optimization methodology behind those numbers is not yet documented.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
    todo: "Specific optimization practices used to reach those latency targets, in your own words",
  },
  {
    id: "leadership",
    category: "Leadership",
    evidence:
      "Provided technical leadership to a team of 5–7 developers at Opal BPM after growing into that role from the company's second engineering hire.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "mentoring",
    category: "Mentoring",
    evidence:
      "Mentored the same 5–7 developer team and established the code-quality and system-design practices it worked against.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "delivery",
    category: "Delivery",
    evidence:
      "Delivered incrementally across nine-plus years at Opal BPM; defined CI/CD strategy with Jenkins and Docker; owned UAT/production deployment including rollback.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "stakeholder-collaboration",
    category: "Stakeholder Collaboration",
    evidence:
      "Translated business requirements into technical architecture with cross-functional stakeholders at Opal BPM, and aligned onshore/offshore delivery with finance-domain needs at InterGlobe.",
    relatedCaseStudySlug: "financial-transaction-platform",
  },
  {
    id: "quality",
    category: "Quality",
    evidence:
      "Set code-quality standards for the Opal BPM engineering team as part of the Lead Java Developer role.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "production-support",
    category: "Production Support",
    evidence:
      "Owned production issue triage directly rather than routing all incidents through a separate support layer — verified 30% MTTR reduction at InterGlobe.",
    relatedCaseStudySlug: "financial-transaction-platform",
  },
];
