import type { JourneyEntry } from "@/types/content";

// Sourced from verified public record (LinkedIn work history) and the
// verified company/role list. Reverse-chronological. Where LinkedIn listed
// two entity names for the same tenure (holding company + subsidiary), they
// are merged into one entry.

export const journeyEntries: JourneyEntry[] = [
  {
    slug: "opal-bpm-india",
    company: "Opal BPM India Pvt Ltd",
    title: "Senior Java Developer → Lead Java Developer",
    location: "India",
    dateRange: "Sep 2015 — Apr 2025",
    durationLabel: "9 years, 7 months",
    scope: [
      "I joined as a Senior Java Developer (second engineering hire) and grew with the company as it scaled its product and engineering team over nine years, progressing into Lead Java Developer.",
      "I architected and led full-stack development of Opal's enterprise applications using Spring MVC, Spring Security, Spring Boot, Microservices, ExtJS, and React.",
      "I led design and rollout of an OAuth2-based authentication and authorization system, standardizing security across multiple client deployments.",
      "I owned deployment of critical services to UAT/production, including rollback and monitoring strategy.",
      "During the last five years of my tenure, I provided technical leadership and mentoring to a team of 5–7 developers, establishing code-quality and system-design practices, while continuing hands-on architecture and backend work.",
      "I defined CI/CD strategy using Jenkins and Docker, and implemented cloud-native deployments on AWS EC2.",
      "I architected the Enterprise Exchange Platform — 16 interconnected microservices for multi-tenant trading, built on Java 21, Spring Boot 3.4.13, PostgreSQL, Kafka, and Redis.",
      'I built the Beckn Protocol Verification Adapter ("WRI Connector") — an RFC 1.2.0-compliant identity-verification adapter in Python/FastAPI supporting multiple providers with Ed25519-signed multi-tenant isolation.',
    ],
    // Verbatim subset of `scope` above — see the `leadershipScope` doc
    // comment in `src/types/content.ts`.
    leadershipScope: [
      "During the last five years of my Opal BPM tenure, I provided technical leadership and mentoring to a team of 5–7 developers, establishing code-quality and system-design practices, while continuing hands-on architecture and backend work.",
    ],
    leadershipDurationLabel: "5+ years in a technical leadership role (last ~5 years of tenure)",
    relatedCaseStudySlugs: [
      "enterprise-artwork-management-platform",
      "oauth2-authentication-platform",
      "enterprise-exchange-platform",
      "beckn-protocol-verification-adapter",
    ],
  },
  // Apr 2014–Aug 2015 — employer line matches
  // `resume/sanjay-singh-bhandari-resume.pdf` (TeamLease Services Pvt. Ltd).
  {
    slug: "teamlease-services",
    company: "TeamLease Services Pvt. Ltd",
    title: "Senior Java Developer",
    location: "Gurugram | Staffing and Recruitment Services",
    dateRange: "Apr 2014 — Aug 2015",
    durationLabel: "1 year, 4 months",
    scope: [
      "I owned critical backend modules using Spring MVC, Spring Security and REST APIs in financial systems",
      "I spearheaded production issue triage, reducing mean time to resolution by 30%",
      "I collaborated with onshore/offshore teams to align features with finance domain needs",
    ],
    relatedCaseStudySlugs: ["financial-transaction-platform"],
  },
  // Pre-2014 roles — sourced verbatim from
  // `resume/sanjay-singh-bhandari-resume.pdf` (not invented).
  {
    slug: "pc-solutions",
    company: "PC Solutions Pvt. Ltd",
    title: "Programmer",
    location: "Gurugram (Technology Solutions Provider)",
    dateRange: "Dec 2010 — Mar 2014",
    durationLabel: "3 years, 4 months",
    scope: [
      "I built core enterprise services using Java and JSP for booking and operations platforms",
      "I refactored database queries, improving data layer performance by 20%",
      "I contributed to version upgrades and performance enhancements",
    ],
  },
  {
    slug: "comnet-innovations",
    company: "Comnet Innovations Pvt. Ltd",
    title: "Software Programmer",
    location: "Gurugram (IT Solutions and Services Provider)",
    dateRange: "Dec 2007 — Dec 2010",
    durationLabel: "3 years",
    scope: [
      "I developed reporting modules for logistics and sales data visualization",
      "I participated in SDLC activities, documentation, and QA support for internal tools",
      "I collaborated with stakeholders to gather business requirements",
    ],
  },
];
