import type { CaseStudy } from "@/types/content";

export const enterpriseExchangePlatform: CaseStudy = {
  slug: "enterprise-exchange-platform",
  name: "Enterprise Exchange Platform",
  kind: "enterprise",
  company: "Opal BPM India Pvt Ltd",
  oneLiner:
    "A 16-microservice trading platform matching buyers and sellers across multi-tenant e-waste categories, run at 99.9% uptime.",
  status: "Production",
  businessProblem:
    "Opal BPM needed a trading platform to let buyers and sellers transact across multiple waste categories in a multi-tenant setup — meaning many separate client organizations run their own trading operations on shared infrastructure without seeing each other's data. Order intake, trade matching, settlement, and notification all needed to work correctly for every tenant, at production reliability, across 5 waste categories.",
  myRole:
    "I architected the platform as the lead developer at Opal BPM: I designed the service decomposition, made the core data and messaging architecture decisions, and led implementation across the microservice set. This was built and delivered under my technical ownership, not handed to me as a pre-defined spec.",
  teamComposition: null,
  architectureSummary:
    "The platform is composed of 16 interconnected microservices on Java 21 and Spring Boot 3.4.13, covering buyer/seller order management, trade matching, settlement, and notifications. PostgreSQL is the system of record; Kafka carries the event flow between services (orders → matching → settlement → notification); Redis supports low-latency lookups and caching in the matching/notification path.",
  systemContext: null,
  technicalChallenges:
    "Maintaining strict multi-tenant data isolation while still sharing infrastructure across tenants, and keeping notification delivery fast and reliable as order volume scaled across 5 waste categories concurrently.",
  decisions: [
    {
      decision:
        "Decompose the platform into 16 focused microservices rather than a smaller number of broader services.",
      whyChosen:
        "Order intake, trade matching, settlement, and notification have distinct scaling and change profiles per tenant and waste category — separating them let each evolve and scale independently.",
      tradeoffAccepted:
        "More services to operate, deploy, and monitor, and more discipline required in inter-service contracts and versioning.",
    },
    {
      decision: "Use Kafka as the backbone for order-to-settlement event flow.",
      whyChosen:
        "Trade matching and settlement are inherently event-driven (an order placed, matched, and settled is a sequence of state transitions across services) — Kafka gives durable, ordered delivery and lets notification consume the same event stream without coupling to the transactional path.",
      // TODO: confirm the specific alternative considered before Kafka (e.g. direct
      // synchronous service calls or a different broker) and why it was rejected.
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
    "Running in production at 99.9% uptime.",
    "Notification delivery at under 100ms.",
    "Supports buyer/seller order management, trade matching, and settlement across 5 waste categories in a single multi-tenant platform.",
  ],
  lessonsLearned: null,
  futureImprovements: null,
  stack: [
    "Java 21",
    "Spring Boot 3.4.13",
    "Microservices",
    "PostgreSQL",
    "Kafka",
    "Redis",
    "AWS",
    "Docker",
  ],
  // From this case study's own `oneLiner` ("trading platform matching
  // buyers and sellers") and `businessProblem` (multi-tenant, multiple
  // waste categories) — see the `CaseStudy.industries` doc comment.
  industries: ["Trading & Marketplace Platforms", "Enterprise SaaS"],
  metrics: [
    { value: "16", label: "Microservices" },
    { value: "99.9%", label: "Production uptime" },
    { value: "<100ms", label: "Notification delivery" },
    { value: "5", label: "Waste categories supported" },
  ],
  todos: [
    {
      label: "Approximate transaction/order volume the platform handles, if shareable",
      section: "Business Impact",
    },
    {
      label: "Number of tenants/client organizations live on the platform",
      section: "Business Impact",
    },
    { label: "Architecture diagram of the 16-service topology", section: "System Context" },
    {
      label: "Specific alternative considered before choosing the Kafka-based event flow",
      section: "Engineering Decisions",
    },
    {
      label: "A concrete lesson learned or a decision that, in hindsight, you'd make differently",
      section: "Lessons Learned",
    },
  ],
  relatedSlugs: ["beckn-protocol-verification-adapter", "oauth2-authentication-platform"],
};
