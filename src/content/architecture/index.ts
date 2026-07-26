import type { ArchitectureTheme } from "@/types/content";

export { architectureCategories } from "./categories";
export { architecturePatterns } from "./patterns";
export { engineeringPrinciples } from "./principles";

// Cross-cutting architectural themes drawn from the case studies —
// see docs/06 (/architecture spec). These intentionally restate decisions
// already present in the case studies at a higher, thematic level rather
// than introducing new unverified claims. Phase 10 (Architecture Gallery,
// docs/phase-10-architecture-gallery/02-content-model.md) surfaces these
// as short "recurring across categories" cross-links rather than
// re-deriving the same grouping a second way.
export const architectureThemes: ArchitectureTheme[] = [
  {
    id: "identity-and-trust",
    title: "Identity, authentication, and cross-boundary trust",
    summary:
      "Two of the case studies are fundamentally about establishing trust across a boundary the platform doesn't fully control: standardizing OAuth2 across independently-run client deployments, and isolating tenants in the Beckn adapter using the protocol's own Ed25519 signature model instead of a bespoke mechanism.",
    decisions: [
      {
        decision:
          "Prefer standards-based trust mechanisms (OAuth2, Ed25519/Beckn) over bespoke, platform-specific ones.",
        whyChosen:
          "A standard is reviewable by people outside the team and composes with other systems that already understand it — a bespoke mechanism has to be re-explained and re-audited every time.",
      },
    ],
    relatedCaseStudySlugs: [
      "oauth2-authentication-platform",
      "beckn-protocol-verification-adapter",
    ],
  },
  {
    id: "service-decomposition",
    title: "Service decomposition driven by change and scale profile, not by team boundaries",
    summary:
      "The Enterprise Exchange Platform's 16-service split follows the natural seams in the domain (order intake, matching, settlement, notification) — each with different scaling and change characteristics — rather than being split to match a team org chart.",
    decisions: [
      {
        decision:
          "Split services along domain seams (order/matching/settlement/notification) rather than by team ownership.",
        whyChosen:
          "Domain seams are stable over time even as team structure changes, which keeps the architecture legible years after the original team that built it has moved on.",
      },
    ],
    relatedCaseStudySlugs: ["enterprise-exchange-platform"],
  },
  {
    id: "event-driven-consistency",
    title: "Event-driven flow for multi-step, asynchronous business processes",
    summary:
      "Both the Exchange Platform's order-to-settlement flow and the Beckn adapter's verification lifecycle are modeled as explicit sequences of state transitions (Kafka events in one case, a state machine in the other) rather than as a single synchronous call chain.",
    decisions: [
      {
        decision:
          "Model multi-step business processes as explicit event/state sequences rather than synchronous call chains.",
        whyChosen:
          "Multi-step processes (place → match → settle; verify → confirm) fail and retry at intermediate steps in the real world — an explicit sequence makes each intermediate state inspectable and recoverable, where a synchronous chain would not.",
      },
    ],
    relatedCaseStudySlugs: ["enterprise-exchange-platform", "beckn-protocol-verification-adapter"],
  },
  {
    id: "individual-ownership-in-team-systems",
    title: "Individual ownership inside team-scale systems",
    summary:
      "Across every case study, there is a specific piece with individually-attributable ownership (the WRI Connector build, the OAuth2 rollout, the 16-service architecture, InterGlobe's financial backend modules) even though the surrounding system was built with a team — architecture decisions were made and owned, not just distributed.",
    decisions: [],
    relatedCaseStudySlugs: [
      "enterprise-exchange-platform",
      "beckn-protocol-verification-adapter",
      "oauth2-authentication-platform",
      "financial-transaction-platform",
    ],
    todos: [
      {
        label:
          "One more cross-cutting theme once additional case-study detail (decisions/tradeoffs) is filled in from the content checklist",
      },
    ],
  },
];
