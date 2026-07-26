// Site-wide constants. Domain and social URLs are the two fields most
// likely to need a real value before launch — see docs/17 data checklist.

import packageJson from "../../package.json";

/**
 * Future Maintenance Mode (docs/phase-3-application-shell/01-application-
 * shell.md "Global Experience"). A single flag, checked once in
 * `src/app/layout.tsx`: when `true`, every route renders `MaintenanceScreen`
 * instead of its normal content, with the header/footer still present.
 * Defaults to (and must stay) `false` — this phase only wires the
 * mechanism, it does not turn it on.
 */
export const maintenanceMode = false as boolean;

export const site = {
  name: "Sanjay Singh Bhandari",
  title: "Senior Java Engineering Leader",
  shortTitle: "Java Architect & Engineering Leader",
  // TODO: confirm final production domain before launch (docs/12 SEO strategy).
  url: "https://sanjaysinghbhandari.com",
  description:
    "Senior Java engineering leader with 17+ years building enterprise platforms — authentication systems, microservices, and financial systems — now extending that discipline into AI engineering with LangChain, RAG, and Python.",
  location: "New Delhi, India",
  // TODO: add preferred public contact email — not fabricated, must be supplied.
  email: "sanjaybhandari2025@gmail.com",
  social: {
    linkedin: "https://linkedin.com/in/sanjayksbhandari",
    // TODO: confirm public GitHub profile URL to cross-link (doc 12 sameAs).
    github: "https://github.com/sanjayksbhandari",
  },
  yearsExperience: "17+",
  // Version Placeholder (footer) — sourced from package.json so it is
  // never a second, hand-maintained copy of the same number.
  version: packageJson.version,
} as const;

export const primaryNav = [
  { label: "Showcase", href: "/showcase" },
  { label: "Journey", href: "/journey" },
  { label: "Expertise", href: "/expertise" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Leadership", href: "/leadership" },
  { label: "AI Engineering", href: "/ai-engineering" },
] as const;

export const ctaNav = [
  { label: "Resume", href: "/resume" },
  { label: "Connect", href: "/contact" },
] as const;

export const footerNav = {
  explore: [
    { label: "Engineering Showcase", href: "/showcase" },
    { label: "Engineering Journey", href: "/journey" },
    { label: "Technical Expertise", href: "/expertise" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Leadership", href: "/leadership" },
    { label: "Architecture", href: "/architecture" },
    { label: "AI Engineering", href: "/ai-engineering" },
  ],
  credentials: [
    { label: "Achievements", href: "/achievements" },
    { label: "Certifications", href: "/certifications" },
    { label: "Resume", href: "/resume" },
  ],
  contact: [
    { label: "Professional Hub", href: "/contact" },
    { label: "LinkedIn", href: site.social.linkedin },
  ],
} as const;
