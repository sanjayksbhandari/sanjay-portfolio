import type {
  AvailabilityFact,
  ContactMethod,
  HubFAQItem,
  RecruiterResource,
  ResumeArtifact,
  SocialPresenceLink,
  TodoItem,
} from "@/types/content";
import { site } from "@/config/site";

/**
 * Professional Hub — verified channels and facts only.
 * Unverified email / GitHub / scheduling / availability preferences are
 * omitted from the public surface (not shown as TODOs).
 */

export const professionalSummary = {
  focus:
    "17+ years of enterprise Java platform work — authentication, microservices, trading and financial systems — applied to Engineering Lead / Architect-scope roles, with ongoing AI product work (LangChain, RAG, Python).",
  experienceLevel: `${site.yearsExperience} years of engineering experience. Most recent verified role: Lead Java Developer at Opal BPM (Sep 2015 – Apr 2025), mentoring a team of 5–7 developers.`,
  preferredOpportunities: null as string | null,
  preferredOpportunitiesTodo: undefined as string | undefined,
};

export const resumeArtifact: ResumeArtifact = {
  pdfPath: "/resume/sanjay-singh-bhandari-resume.pdf",
  ready: true,
  lastUpdated: "2026-07-24",
  version: "2026.07",
  label: "Sanjay Singh Bhandari — Resume (PDF)",
};

export const resumeCenterTodos: TodoItem[] = [];

export const contactMethods: ContactMethod[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    kind: "linkedin",
    href: site.social.linkedin || null,
    primary: true,
    description: "Primary channel for recruiter and hiring-manager outreach.",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    kind: "portfolio",
    href: site.url,
    primary: false,
    description: "This site — the verified engineering record.",
  },
  ...(site.email
    ? [
        {
          id: "email",
          label: "Email",
          kind: "email" as const,
          href: `mailto:${site.email}`,
          primary: true,
          description: "Direct email.",
        },
      ]
    : []),
  ...(site.social.github
    ? [
        {
          id: "github",
          label: "GitHub",
          kind: "github" as const,
          href: site.social.github,
          primary: false,
        },
      ]
    : []),
];

export const contactResponseTimeTodo = "";

export const availabilityFacts: AvailabilityFact[] = [
  {
    id: "location",
    label: "Based in",
    value: site.location,
  },
];

export const recruiterResources: RecruiterResource[] = [
  {
    id: "resume",
    label: "Resume",
    href: "/resume",
    description: "Download and online resume.",
  },
  {
    id: "journey",
    label: "Engineering Journey",
    href: "/journey",
    description: "Career progression and impact over 17+ years.",
  },
  {
    id: "architecture",
    label: "Architecture Gallery",
    href: "/architecture",
    description: "Patterns, ADRs, and design principles.",
  },
  {
    id: "showcase",
    label: "Engineering Showcase",
    href: "/showcase",
    description: "Selected engineering stories from problem to outcome.",
  },
  {
    id: "leadership",
    label: "Technical Leadership",
    href: "/leadership",
    description: "Team growth, delivery, and decision-making.",
  },
  {
    id: "ai-engineering",
    label: "AI Engineering",
    href: "/ai-engineering",
    description: "Personal AI projects — RAG, LangChain, prompt engineering.",
  },
  {
    id: "expertise",
    label: "Capability Matrix",
    href: "/expertise",
    description: "Verified engineering capabilities.",
  },
];

export const hubFaqItems: HubFAQItem[] = [
  {
    id: "years-experience",
    question: "How many years of engineering experience?",
    answer: `${site.yearsExperience} years.`,
  },
  {
    id: "leadership-experience",
    question: "What leadership experience is on record?",
    answer:
      "Lead Java Developer at Opal BPM (Sep 2015 – Apr 2025), mentoring a team of 5–7 developers and setting code-quality and system-design practices after joining as the company's second engineering hire.",
  },
  {
    id: "industries",
    question: "Which industries?",
    answer:
      "Enterprise SaaS (Retail), Trading & Marketplace Platforms, and Aviation & Financial Systems — plus personal AI product work.",
  },
  {
    id: "tech-stack",
    question: "What is the primary tech stack?",
    answer:
      "Java, Spring Boot / Spring MVC, microservices, REST APIs, OAuth2/JWT, Kafka, PostgreSQL/Redis, AWS, Docker, Jenkins. Personal AI work: Python, LangChain, RAG, prompt engineering.",
  },
];

export const hubFaqTodos: TodoItem[] = [];

export const socialPresenceLinks: SocialPresenceLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    status: "verified",
    href: site.social.linkedin || null,
  },
  ...(site.social.github
    ? [
        {
          id: "github",
          label: "GitHub",
          status: "verified" as const,
          href: site.social.github,
        },
      ]
    : []),
];
