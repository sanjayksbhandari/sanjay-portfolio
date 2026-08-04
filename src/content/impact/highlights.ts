import type { Highlight } from "@/types/content";

// Impact Dashboard Block 6 — Selected Highlights
// (docs/phase-5-impact-dashboard/02-content-sourcing.md). The brief's own
// example list includes "Scaled product from 4 to 30+ enterprise
// clients" — that specific figure appears nowhere in verified content, so
// it was not used (see docs/phase-5-impact-dashboard/01 for the full
// reasoning). All six highlights below are drawn only from
// `src/content/case-studies/*.ts`, `src/content/journey.ts`, and
// `src/content/achievements.ts`.
export const selectedHighlights: Highlight[] = [
  {
    id: "exchange-platform",
    title: "Architected the Enterprise Exchange Platform",
    businessOutcome:
      "A multi-tenant trading platform letting buyer/seller organizations transact across 5 waste categories on shared infrastructure, in production at 99.9% uptime.",
    technicalOutcome:
      "Decomposed into 16 microservices on Java 21 and Spring Boot 3.4.13, with Kafka carrying the order → match → settle → notify event flow and Redis backing low-latency lookups; notification delivery runs under 100ms.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
  },
  {
    id: "oauth2-platform",
    title: "Built a Reusable OAuth2 Authentication Platform",
    businessOutcome:
      "Replaced a fragmented, per-client approach to authentication with one standard, cutting the security-review burden for every new and existing client deployment.",
    technicalOutcome:
      "An OAuth2-based authorization layer in front of Opal's Spring Boot services, enforced with Spring Security, adopted across multiple independent client deployments instead of a bespoke scheme per client.",
    relatedCaseStudySlug: "oauth2-authentication-platform",
  },
  {
    id: "beckn-adapter",
    title: "Implemented the Beckn Protocol Verification Adapter",
    businessOutcome:
      'Gave Opal a single, spec-compliant way ("WRI Connector") to plug into the Beckn open-network protocol for identity verification across independent providers.',
    technicalOutcome:
      "RFC 1.2.0-compliant Python/FastAPI service with an explicit state machine for the verification lifecycle, Ed25519-signature-based multi-tenant isolation, and message-ID deduplication — supports 5+ providers at sub-50ms P95 latency.",
    relatedCaseStudySlug: "beckn-protocol-verification-adapter",
  },
  {
    id: "mttr-reduction",
    title: "Cut Production Incident Resolution Time by 30%",
    businessOutcome:
      "Faster recovery from production incidents in InterGlobe's finance-domain systems, reducing the business impact of each incident.",
    technicalOutcome:
      "I took direct ownership of issue triage instead of routing every incident through a separate support layer, shortening the path from an incoming issue to a root-cause fix.",
    relatedCaseStudySlug: "financial-transaction-platform",
  },
  {
    id: "artwork-platform",
    title: "Grew Opal's Core Product from Two-Person Start to Full Platform",
    businessOutcome:
      "Opal's Artwork Management Platform has been in continuous production use across its private-brand retail client base for nine-plus years.",
    technicalOutcome:
      "I architected and led the platform's evolution from a Spring MVC monolith toward Spring Boot and microservices, and its frontend from ExtJS to React, without a full-stop rewrite.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
  {
    id: "team-growth",
    title: "Led Engineering as the Team Scaled",
    businessOutcome:
      "I provided the technical leadership Opal BPM's engineering organization needed as the team and product suite scaled — distinct from my full nearly 10-year tenure at the company.",
    technicalOutcome:
      "During the last five years of my tenure, I mentored a team of 5–7 developers directly and established the code-quality and system-design practices the team worked against.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
];
