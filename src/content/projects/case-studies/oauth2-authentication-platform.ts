import type { CaseStudy } from "@/types/content";

export const oauth2AuthenticationPlatform: CaseStudy = {
  slug: "oauth2-authentication-platform",
  name: "OAuth2 Authentication Platform",
  kind: "enterprise",
  company: "Opal BPM India Pvt Ltd",
  oneLiner:
    "A standardized OAuth2 authentication and authorization system rolled out across multiple client deployments of Opal's platform.",
  status: "Production",
  businessProblem:
    "Opal BPM's platform is deployed to multiple private-brand retail clients, each historically with its own approach to authentication and authorization. That fragmentation made security review, client onboarding, and access-control consistency harder as the client base grew.",
  myRole:
    "I led the design and implementation of the OAuth2-based authentication and authorization system, and drove its standardization across the multiple client deployments — this was a leadership-and-build role, not implementation-only: it required getting buy-in for a common security model across otherwise independent client environments.",
  teamComposition: null,
  architectureSummary:
    "An OAuth2-based authorization layer sitting in front of Opal's Spring MVC / Spring Boot services, using Spring Security for enforcement, providing a single, consistent authentication and authorization model that every client deployment adopts instead of a bespoke per-client scheme.",
  systemContext: null,
  technicalChallenges:
    "Rolling out one authentication standard across multiple already-live client deployments without breaking existing integrations or access patterns during migration.",
  decisions: [
    {
      decision:
        "Standardize on OAuth2 as the single authentication/authorization model across all client deployments.",
      whyChosen:
        "A common, well-understood standard reduces the security review burden per client and lets the platform team reason about access control once instead of per-deployment.",
      // TODO: confirm the specific prior/alternative approach(es) being replaced, and what made
      // migrating each client deployment onto the new model non-trivial.
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
    "OAuth2-based authentication and authorization standardized across multiple client deployments of the platform.",
  ],
  lessonsLearned: null,
  futureImprovements: null,
  stack: ["Java", "Spring Boot", "Spring Security", "OAuth2", "JWT", "REST APIs"],
  // From this case study's own `oneLiner`/`businessProblem` above — an
  // authentication/authorization platform is, by definition, Identity &
  // Authentication work. See the `CaseStudy.industries` doc comment.
  industries: ["Identity & Authentication", "Enterprise SaaS"],
  todos: [
    {
      label: "Number of client deployments migrated, and rough timeframe of the rollout",
      section: "Business Impact",
    },
    {
      label:
        "Specific authorization model detail (roles/scopes design) that can be shared without exposing client-specific configuration",
      section: "Security Considerations",
    },
    {
      label: "Diagram of the auth flow (authorization code grant, token issuance/validation path)",
      section: "System Context",
    },
    {
      label: "A concrete migration challenge and how it was resolved",
      section: "Technical Challenges",
    },
  ],
  relatedSlugs: ["enterprise-artwork-management-platform", "enterprise-exchange-platform"],
};
