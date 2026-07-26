import type { ArchitecturePattern } from "@/types/content";

/**
 * Architecture Gallery — pattern cards (docs/phase-10-architecture-
 * gallery/02-content-model.md). Every `status: "verified"` card's
 * `purpose`/`problem`/`typicalSolution`/`tradeoffs` paraphrase a real
 * decision already on record in a linked `CaseStudy` (see the source
 * comment above each one) — nothing here introduces a new fact.
 * `status: "generic"` cards (currently: both Observability cards) are
 * standard, widely-documented engineering patterns presented as
 * general knowledge — not a claim about verified personal experience —
 * with a `todos` entry rather than a fabricated case-study link.
 */
export const architecturePatterns: ArchitecturePattern[] = [
  // Backend Architecture ---------------------------------------------------
  {
    id: "layered-backend-evolved-incrementally",
    categoryId: "backend-architecture",
    title: "Layered Backend, Evolved Incrementally",
    status: "verified",
    purpose:
      "Give a growing enterprise codebase a structure that can absorb new features and a growing team without a rewrite.",
    problem:
      "A platform's initial backend structure needs to keep working as the client base, feature surface, and engineering team all grow well past what it was originally sized for.",
    typicalSolution:
      "Keep the same platform and language, and evolve the internal structure — Spring MVC toward Spring Boot, then toward a service decomposition — as scale actually demands it, rather than re-platforming.",
    tradeoffs: [
      "Incremental evolution reaches a fully modernized end state more slowly than a rewrite would, in exchange for never stopping feature delivery to get there.",
    ],
    whenToUse: [
      "The current system is still delivering business value, and a full rewrite would freeze delivery for an extended period.",
    ],
    whenNotToUse: [
      "The existing architecture is fundamentally incompatible with a new requirement it can't be evolved to express (e.g. a hard compliance boundary).",
    ],
    relatedTechnologies: ["Java", "Spring MVC", "Spring Boot", "Microservices"],
    // enterprise-artwork-management-platform's `decisions`: "Evolve the
    // platform from Spring MVC toward Spring Boot and Microservices as
    // it scaled."
    relatedCaseStudySlugs: ["enterprise-artwork-management-platform"],
  },

  // Microservices -----------------------------------------------------------
  {
    id: "domain-seam-service-decomposition",
    categoryId: "microservices",
    title: "Domain-Seam Service Decomposition",
    status: "verified",
    purpose: "Let independently-changing parts of a system scale and deploy on their own schedule.",
    problem:
      "A trading platform's order intake, matching, settlement, and notification steps each have a different load and change profile per tenant and category — one deployable can't scale or release each of them independently.",
    typicalSolution:
      "Split along domain seams — not team boundaries — into focused services, each owning one step of the business process.",
    tradeoffs: [
      "More services to deploy, operate, and monitor, and more discipline required in inter-service contracts and versioning — the specific trade-off accepted on the Enterprise Exchange Platform's 16-service split.",
    ],
    whenToUse: [
      "Different parts of the domain genuinely have different scaling, release, or ownership needs.",
    ],
    whenNotToUse: [
      "The team is too small to absorb the operational overhead of running many services, or the domain seams aren't yet stable.",
    ],
    relatedTechnologies: ["Microservices", "Spring Boot", "Kafka"],
    // enterprise-exchange-platform's `decisions[0]` + `tradeoffAccepted`.
    relatedCaseStudySlugs: [
      "enterprise-exchange-platform",
      "enterprise-artwork-management-platform",
    ],
  },

  // Authentication ------------------------------------------------------------
  {
    id: "standardized-oauth2-across-deployments",
    categoryId: "authentication",
    title: "Standardized OAuth2 Across Independent Deployments",
    status: "verified",
    purpose:
      "Give every deployment of a multi-tenant platform the same, centrally-reviewable authentication model.",
    problem:
      "Each client deployment of a platform historically had its own approach to authentication and authorization, which made security review and access-control consistency harder as the client base grew.",
    typicalSolution:
      "Standardize on a single OAuth2-based model, enforced with Spring Security, adopted by every client deployment instead of a bespoke per-client scheme.",
    tradeoffs: [
      "Rolling out one standard across multiple already-live deployments without breaking existing integrations during migration.",
    ],
    whenToUse: [
      "Multiple independently-run deployments of the same platform need one consistent, auditable security model.",
    ],
    whenNotToUse: ["A single deployment with no multi-client fragmentation to standardize."],
    relatedTechnologies: ["OAuth2", "Spring Security", "JWT"],
    // oauth2-authentication-platform's `businessProblem`/`decisions`.
    relatedCaseStudySlugs: ["oauth2-authentication-platform"],
  },
  {
    id: "protocol-native-signature-trust",
    categoryId: "authentication",
    title: "Protocol-Native, Signature-Based Trust",
    status: "verified",
    purpose:
      "Establish trust and tenant isolation across an organizational boundary the platform doesn't fully control.",
    problem:
      "A protocol adapter needs to isolate tenants and verify identity across external, independently-run providers, without a shared database or a bespoke, adapter-specific trust mechanism.",
    typicalSolution:
      "Use the interoperating protocol's own cryptographic trust model (Ed25519 signatures, in Beckn's case) for tenant isolation, instead of relying on data-layer isolation alone.",
    tradeoffs: null,
    whenToUse: [
      "The protocol being integrated already defines its own signature/trust model to align with.",
    ],
    whenNotToUse: [
      "There's no external protocol-level trust model to align with — a bespoke mechanism would just add complexity for no interoperability benefit.",
    ],
    relatedTechnologies: ["Beckn Protocol", "Ed25519"],
    // beckn-protocol-verification-adapter's `architectureSummary`/`decisions`.
    relatedCaseStudySlugs: ["beckn-protocol-verification-adapter"],
    todos: [
      {
        label:
          "Specific alternative tenant-isolation approach considered and rejected before Ed25519",
      },
    ],
  },

  // API Design ------------------------------------------------------------------
  {
    id: "rest-as-default-integration-surface",
    categoryId: "api-design",
    title: "REST as the Default Integration Surface",
    status: "verified",
    purpose:
      "Give a service a well-understood, broadly-tooled integration surface for both internal and external callers.",
    problem:
      "Services need an integration contract that any client — internal or external — can consume without adopting a bespoke protocol.",
    typicalSolution:
      "Expose REST APIs as the default integration surface, layered behind whatever authentication model the platform already standardizes on.",
    tradeoffs: null,
    whenToUse: [
      "The integration is request/response-shaped and doesn't need a persistent connection or streaming.",
    ],
    whenNotToUse: [
      "The interaction is inherently a multi-step, asynchronous event flow — see Messaging instead.",
    ],
    relatedTechnologies: ["REST APIs"],
    // oauth2-authentication-platform's `stack`; financial-transaction-platform's `stack`.
    relatedCaseStudySlugs: ["oauth2-authentication-platform", "financial-transaction-platform"],
    todos: [
      {
        label:
          'Deeper API-design conventions actually used (versioning strategy, pagination, error-response shape) beyond "REST APIs" in the verified stack',
      },
    ],
  },

  // Messaging --------------------------------------------------------------------
  {
    id: "event-driven-multistep-flow",
    categoryId: "messaging",
    title: "Event-Driven Flow for Multi-Step Business Processes",
    status: "verified",
    purpose:
      "Make a multi-step business process inspectable and recoverable at every intermediate step.",
    problem:
      "A synchronous call chain for a multi-step process (place → match → settle) fails atomically — an intermediate failure has nowhere to be inspected or retried from.",
    typicalSolution:
      "Model the process as an explicit sequence of events (Kafka, in the Exchange Platform's order-to-settlement flow) so each step is durable, ordered, and independently retryable.",
    tradeoffs: null,
    whenToUse: [
      "The process has multiple steps, potentially owned by different services, and needs to survive partial failure.",
    ],
    whenNotToUse: [
      "The interaction is a single, synchronous request/response with no intermediate state worth persisting.",
    ],
    relatedTechnologies: ["Kafka"],
    // enterprise-exchange-platform's `decisions[1]`.
    relatedCaseStudySlugs: ["enterprise-exchange-platform"],
  },

  // Caching -------------------------------------------------------------------
  {
    id: "redis-for-low-latency-lookups",
    categoryId: "caching",
    title: "Redis for Low-Latency Lookup Paths",
    status: "verified",
    purpose: "Keep latency-sensitive read paths fast without adding load to the system of record.",
    problem:
      "Trade matching and notification need low-latency lookups; querying the primary database directly on every lookup would add latency and load exactly where the platform can least afford it.",
    typicalSolution:
      "Put Redis in front of the latency-sensitive lookup and caching paths (matching/notification), keeping PostgreSQL as the system of record for everything else.",
    tradeoffs: null,
    whenToUse: [
      "A specific, identified lookup path is latency-sensitive and its data is safe to serve slightly stale.",
    ],
    whenNotToUse: [
      "The data must always be read-your-writes consistent, or the lookup isn't actually a measured bottleneck yet.",
    ],
    relatedTechnologies: ["Redis", "PostgreSQL"],
    // enterprise-exchange-platform's `architectureSummary`.
    relatedCaseStudySlugs: ["enterprise-exchange-platform"],
  },

  // Observability — nothing verified for either card; both generic ------------
  {
    id: "structured-logging-and-centralized-metrics",
    categoryId: "observability",
    title: "Structured Logging and Centralized Metrics",
    status: "generic",
    purpose:
      "Make a distributed system's behavior inspectable without attaching a debugger to a specific instance.",
    problem:
      "Once a system is decomposed into multiple services, a single log file or an ad hoc print statement no longer shows the whole picture of a request's path.",
    typicalSolution:
      "Emit structured (not free-text) logs and metrics from every service to a central store, correlated by a request/trace ID.",
    tradeoffs: [
      "Added infrastructure and instrumentation cost, in exchange for the ability to debug a production issue without reproducing it locally.",
    ],
    whenToUse: ["More than one service is involved in fulfilling a request."],
    whenNotToUse: ["A single-process application where local logs already show the full picture."],
    relatedTechnologies: [],
    relatedCaseStudySlugs: [],
    todos: [
      {
        label:
          "Confirm whether a specific observability stack (centralized logging/metrics/tracing tooling) has been used on a verified production system — no case study's `monitoringAndObservability` field is filled in yet",
      },
    ],
  },
  {
    id: "circuit-breakers-and-retries",
    categoryId: "observability",
    title: "Circuit Breakers and Bounded Retries",
    status: "generic",
    purpose: "Stop a failing downstream dependency from taking the calling service down with it.",
    problem:
      "An unbounded retry loop against a failing or slow downstream service amplifies the outage instead of containing it.",
    typicalSolution:
      "Wrap the call in a circuit breaker that stops calling a consistently-failing dependency for a cooldown period, combined with a bounded, backed-off retry policy.",
    tradeoffs: [
      "The calling service must define a sensible fallback/degraded behavior for when the breaker is open — that decision is domain-specific, not free.",
    ],
    whenToUse: ["A service depends on another network call whose failure shouldn't cascade."],
    whenNotToUse: [
      "The dependency is in-process, or its failure modes are already fully handled by a simpler timeout.",
    ],
    relatedTechnologies: [],
    relatedCaseStudySlugs: [],
    todos: [
      {
        label:
          "Confirm whether this pattern has been applied on a verified production system; link the case study here if so",
      },
    ],
  },

  // Deployment -----------------------------------------------------------------
  {
    id: "containerized-deployment-with-cicd",
    categoryId: "deployment",
    title: "Containerized Deployment with CI/CD",
    status: "verified",
    purpose:
      "Make releases repeatable and reduce the manual steps between a merged change and it running in production.",
    problem:
      "As a platform and its team grow, manual or ad hoc deployment steps become a bottleneck and a source of inconsistency between environments.",
    typicalSolution:
      "Package services as Docker containers, run on AWS, with Jenkins driving the CI/CD pipeline from commit to deployment.",
    tradeoffs: null,
    whenToUse: ["Deployments happen often enough that manual steps cost real engineering time."],
    whenNotToUse: [
      "A system deploys rarely enough that the automation investment wouldn't pay back yet.",
    ],
    relatedTechnologies: ["Docker", "Jenkins", "AWS", "CI/CD"],
    // enterprise-artwork-management-platform's `stack`; enterprise-exchange-platform's `stack`.
    relatedCaseStudySlugs: [
      "enterprise-artwork-management-platform",
      "enterprise-exchange-platform",
    ],
  },

  // AI Systems ----------------------------------------------------------------
  {
    id: "rag-grounding-for-llm-output",
    categoryId: "ai-systems",
    title: "Retrieval-Augmented Generation to Ground LLM Output",
    status: "verified",
    purpose:
      "Reduce an LLM's tendency to answer confidently from its parameters alone by grounding its output in real source data.",
    problem:
      "A general-purpose LLM has no reliable way to answer correctly about content it wasn't trained on (a specific document, a specific resume, a specific job posting) without that content being supplied at inference time.",
    typicalSolution:
      "Retrieve relevant source content and pass it into the prompt (a LangChain-based RAG pipeline) rather than relying on the model's parametric knowledge alone.",
    tradeoffs: null,
    whenToUse: ["The answer depends on specific source content the model wasn't trained on."],
    whenNotToUse: [
      "The task is general reasoning or writing with no dependency on a specific source document.",
    ],
    relatedTechnologies: ["LangChain", "RAG", "Python", "Prompt Engineering"],
    // rag-applications' `stack`/`oneLiner`. Personal project, not enterprise
    // production — the page renders this distinction explicitly rather than
    // implying enterprise AI production experience.
    relatedCaseStudySlugs: ["rag-applications"],
    todos: [
      {
        label:
          "Vector store / embedding model used, once confirmed on the RAG Applications case study",
      },
    ],
  },

  // Security --------------------------------------------------------------------
  {
    id: "centralized-authorization-spring-security",
    categoryId: "security",
    title: "Centralized Authorization with Spring Security",
    status: "verified",
    purpose:
      "Enforce a single, consistent authorization model at the framework layer rather than scattering access checks through business logic.",
    problem:
      "Access-control logic embedded ad hoc in business code is hard to audit and easy to get subtly wrong per endpoint.",
    typicalSolution:
      "Enforce OAuth2/JWT-based authorization centrally through Spring Security, so endpoints declare their required access rather than each implementing its own check.",
    tradeoffs: null,
    whenToUse: [
      "The platform already runs on Spring and needs consistent, centrally-auditable access control.",
    ],
    whenNotToUse: ["A trivial single-user tool with no meaningful access-control surface."],
    relatedTechnologies: ["Spring Security", "OAuth2", "JWT"],
    relatedCaseStudySlugs: ["oauth2-authentication-platform"],
  },
];
