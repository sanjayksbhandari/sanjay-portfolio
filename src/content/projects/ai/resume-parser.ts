import type { CaseStudy } from "@/types/content";

export const resumeParser: CaseStudy = {
  slug: "resume-parser",
  name: "Resume Parser",
  kind: "personal",
  status: "Personal Project",
  oneLiner:
    "A tool for extracting structured data (skills, experience, education) out of unstructured resume documents.",
  myRole: "Personal project — designed, built, and shipped independently.",
  teamComposition: "Solo — no team.",
  businessProblem:
    "Resume content arrives as unstructured PDF/DOCX text; downstream tools (matching, scoring, ATS builders) need it as structured, queryable data.",
  architectureSummary: null,
  stack: ["Python"],
  industries: ["AI Products"],
  todos: [
    {
      label: "Actual parsing technique used (rules vs. NLP/LLM-based extraction)",
      section: "Architecture Summary",
    },
    { label: "Whether this feeds into ATS Resume Builder / AI Resume Matching directly" },
    { label: "Any accuracy/coverage figures, if measured", section: "Engineering Outcomes" },
    { label: "Repository or live link, if shareable" },
  ],
};
