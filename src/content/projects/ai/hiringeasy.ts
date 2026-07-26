import type { CaseStudy } from "@/types/content";

export const hiringEasy: CaseStudy = {
  slug: "hiringeasy",
  name: "HiringEasy",
  kind: "personal",
  status: "Personal Project",
  oneLiner:
    "A personal product built to make part of the hiring workflow easier — full scope to be confirmed.",
  myRole: "Personal project — designed, built, and shipped independently.",
  teamComposition: "Solo — no team.",
  businessProblem: null,
  architectureSummary: null,
  stack: ["Python"],
  industries: ["AI Products"],
  todos: [
    { label: "What HiringEasy actually does (scope/feature set)", section: "Business Problem" },
    {
      label: "Architecture and approach behind HiringEasy, once scope is confirmed",
      section: "Architecture Summary",
    },
    { label: "Live product URL or repository, if shareable" },
    {
      label: "Stack used (confirm beyond the general Python/AI-engineering stack)",
      section: "Technology Stack",
    },
    { label: "Any real usage, if applicable", section: "Business Impact" },
  ],
};
