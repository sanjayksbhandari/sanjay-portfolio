import type { CaseStudy } from "@/types/content";

export const aiResumeOptimizer: CaseStudy = {
  slug: "ai-resume-optimizer",
  name: "AI Resume Optimizer",
  kind: "personal",
  status: "Personal Project",
  oneLiner: "A tool that rewrites or scores resume content to better align with a target role.",
  myRole: "Personal project — designed, built, and shipped independently.",
  teamComposition: "Solo — no team.",
  businessProblem:
    "Most job seekers know their resume could be stronger but not specifically how — generic advice doesn't tell them which line to rewrite or why.",
  architectureSummary: null,
  stack: ["Python", "Prompt Engineering"],
  industries: ["AI Products"],
  todos: [
    {
      label: "Actual optimization technique and what it's optimizing against",
      section: "Architecture Summary",
    },
    { label: "Relationship to ATS Resume Builder — same product surface or standalone tool?" },
    { label: "Repository or live link, if shareable" },
  ],
};
