import type { CaseStudy } from "@/types/content";

export const coverLetterGenerator: CaseStudy = {
  slug: "cover-letter-generator",
  name: "Cover Letter Generator",
  kind: "personal",
  status: "Personal Project",
  oneLiner:
    "A tool that generates a tailored cover letter from a resume and a target job description.",
  myRole: "Personal project — designed, built, and shipped independently.",
  teamComposition: "Solo — no team.",
  businessProblem:
    "Writing a genuinely tailored cover letter for every application is time-consuming enough that most candidates either skip it or reuse a generic version.",
  architectureSummary: null,
  stack: ["Python", "Prompt Engineering"],
  industries: ["AI Products"],
  todos: [
    { label: "Actual generation approach and prompt design", section: "Architecture Summary" },
    { label: "Whether this shares infrastructure with AI Resume Optimizer / ATS Resume Builder" },
    { label: "Repository or live link, if shareable" },
  ],
};
