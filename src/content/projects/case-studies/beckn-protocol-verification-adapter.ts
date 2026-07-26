import type { CaseStudy } from "@/types/content";

export const becknProtocolVerificationAdapter: CaseStudy = {
  slug: "beckn-protocol-verification-adapter",
  name: "Beckn Protocol Verification Adapter",
  kind: "enterprise",
  company: "Opal BPM India Pvt Ltd",
  oneLiner:
    'An RFC 1.2.0-compliant Beckn adapter ("WRI Connector") for identity verification across multiple providers, with sub-50ms P95 latency.',
  status: "Production",
  businessProblem:
    "Beckn is an open, decentralized transaction protocol used to make discovery, ordering, and fulfillment interoperable across independent networks (the same protocol family behind India's ONDC). Opal needed an adapter — internally referred to as the WRI Connector — that could sit between Opal's systems and multiple external identity-verification providers while staying compliant with the Beckn RFC 1.2.0 specification.",
  myRole:
    "I built the WRI Connector: the protocol-compliance layer, the provider-integration model, and the multi-tenant isolation approach. This was an individually-owned build within the broader Opal platform work, not a shared team deliverable split across multiple engineers.",
  teamComposition: null,
  architectureSummary:
    "The adapter is a Python 3.12+ service built on FastAPI, with PostgreSQL for state and Celery for asynchronous task processing. It supports 5+ verification providers behind a common interface, uses an explicit state machine to validate each verification request's lifecycle, deduplicates by message ID to guard against retried/duplicate Beckn callbacks, and isolates tenants cryptographically using Ed25519 signatures rather than relying on data-layer isolation alone.",
  systemContext: null,
  technicalChallenges:
    "Building a strict, spec-compliant implementation of an evolving open protocol (Beckn RFC 1.2.0) while integrating 5+ real-world provider APIs that don't perfectly agree with each other on timing, retries, or error semantics.",
  decisions: [
    {
      decision: "Model the verification lifecycle as an explicit state machine.",
      whyChosen:
        "Beckn interactions are asynchronous and multi-step (discovery → verification request → provider response → confirmation); an explicit state machine makes illegal transitions impossible and makes the adapter's behavior auditable against the RFC.",
    },
    {
      decision:
        "Use Ed25519 signatures for multi-tenant isolation rather than isolation by database schema/row alone.",
      whyChosen:
        "Beckn's own trust model is signature-based; aligning tenant isolation with the protocol's native cryptographic model avoids maintaining a parallel, adapter-specific isolation mechanism.",
      // TODO: confirm the specific alternative isolation approach considered and rejected.
    },
    {
      decision: "Deduplicate incoming requests by message ID.",
      whyChosen:
        "Beckn callbacks can be retried by the network; without deduplication, a retried callback could double-process a verification and corrupt state.",
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
    "RFC 1.2.0-compliant and running in production.",
    "Supports 5+ identity-verification providers behind one adapter interface.",
    "P95 API latency under 50ms.",
  ],
  lessonsLearned: null,
  futureImprovements: null,
  stack: ["Python 3.12+", "FastAPI", "PostgreSQL", "Celery", "Docker"],
  // Deliberately not tagged "Retail"/"ONDC" — this case study's own
  // `todos` above flag the downstream business context as unconfirmed.
  // "Workflow Automation" is what's actually verified: Beckn's own
  // description (`businessProblem`) is protocol-level interoperability
  // for discovery, ordering, and fulfillment workflows.
  industries: ["Workflow Automation"],
  metrics: [
    { value: "5+", label: "Verification providers supported" },
    { value: "<50ms", label: "P95 API latency" },
  ],
  todos: [
    {
      label:
        "One or two sentences on what the adapter is used for downstream (business context), to the extent shareable",
      section: "Business Problem",
    },
    {
      label: "Sequence diagram of a verification request across the state machine",
      section: "System Context",
    },
    {
      label: "Alternative tenant-isolation approach considered before Ed25519 signatures",
      section: "Engineering Decisions",
    },
    {
      label:
        "A specific challenge/failure encountered integrating a provider, and how it was resolved",
      section: "Technical Challenges",
    },
  ],
  relatedSlugs: ["enterprise-exchange-platform", "oauth2-authentication-platform"],
};
