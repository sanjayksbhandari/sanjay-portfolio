import type { EngineeringStrength } from "@/types/content";

// Impact Dashboard Block 4 — Engineering Strengths
// (docs/phase-5-impact-dashboard/02-content-sourcing.md). Every
// `explanation` cites the one specific, already-verified fact that backs
// it — never an unsupported adjective standing alone.
export const engineeringStrengths: EngineeringStrength[] = [
  {
    id: "enterprise-architecture",
    title: "Enterprise Architecture",
    explanation:
      "I architected two production platforms from the ground up at Opal BPM: the 16-microservice Enterprise Exchange Platform and the company's core Artwork Management Platform.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
  },
  {
    id: "distributed-systems",
    title: "Distributed & Event-Driven Systems",
    explanation:
      "I designed the Kafka-based order-to-settlement event flow behind a multi-tenant trading platform running in production at 99.9% uptime, with notification delivery under 100ms.",
    relatedCaseStudySlug: "enterprise-exchange-platform",
  },
  {
    id: "authentication-identity",
    title: "Authentication & Identity",
    explanation:
      "I led the design and rollout of a standardized OAuth2 authentication and authorization model across multiple independent client deployments.",
    relatedCaseStudySlug: "oauth2-authentication-platform",
  },
  {
    id: "protocol-integration",
    title: "Protocol Compliance & Integration",
    explanation:
      'I built an RFC 1.2.0-compliant Beckn adapter ("WRI Connector") integrating 5+ identity-verification providers behind one interface, at sub-50ms P95 latency.',
    relatedCaseStudySlug: "beckn-protocol-verification-adapter",
  },
  {
    id: "production-support",
    title: "Production Support",
    explanation:
      "I took direct ownership of production issue triage for InterGlobe's financial systems, reducing mean time to resolution by 30%.",
    relatedCaseStudySlug: "financial-transaction-platform",
  },
  {
    id: "technical-leadership",
    title: "Technical Leadership",
    explanation:
      "I joined Opal BPM as a Senior Java Developer and progressed into Lead Java Developer; during the last five years of my nearly 10-year tenure, I mentored a team of 5–7 developers and set code-quality and system-design standards.",
    relatedCaseStudySlug: "enterprise-artwork-management-platform",
  },
];
