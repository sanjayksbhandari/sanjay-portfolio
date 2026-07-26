import type { Achievement } from "@/types/content";

export const achievements: Achievement[] = [
  {
    id: "second-employee",
    statement:
      "Joined Opal BPM as its second employee and grew into its Lead Java Developer over nine and a half years.",
    context: "Opal BPM India Pvt Ltd, Sep 2015–Apr 2025.",
  },
  {
    id: "exchange-uptime",
    statement:
      "Architected the Enterprise Exchange Platform's 16-microservice trading system, running in production at 99.9% uptime with sub-100ms notification delivery.",
    context: "Enterprise Exchange Platform, Opal BPM India Pvt Ltd.",
  },
  {
    id: "beckn-latency",
    statement:
      "Built an RFC 1.2.0-compliant Beckn protocol adapter supporting 5+ identity-verification providers at sub-50ms P95 API latency.",
    context: 'Beckn Protocol Verification Adapter ("WRI Connector"), Opal BPM India Pvt Ltd.',
  },
  {
    id: "oauth2-standardization",
    statement:
      "Led the standardization of OAuth2-based authentication and authorization across multiple client deployments of Opal's platform.",
    context: "OAuth2 Authentication Platform, Opal BPM India Pvt Ltd.",
  },
  {
    id: "mttr-reduction",
    statement:
      "Reduced mean time to resolution for production issues by 30% through direct ownership of triage.",
    context: "TeamLease Services Pvt. Ltd, Apr 2014–Aug 2015.",
  },
  {
    id: "team-mentoring",
    statement:
      "Provided technical leadership and mentoring to a team of 5–7 developers, establishing code-quality and system-design practices.",
    context: "Opal BPM India Pvt Ltd.",
  },
];

// TODO (docs/17 checklist): add any additional independently-recognized
// achievements not yet reflected here (awards, publications, conference
// speaking, notable OSS contributions) — only once verified.
