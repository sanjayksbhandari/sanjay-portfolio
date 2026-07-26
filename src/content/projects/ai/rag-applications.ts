import type { CaseStudy } from "@/types/content";

export const ragApplications: CaseStudy = {
  slug: "rag-applications",
  name: "RAG Applications",
  kind: "personal",
  status: "Personal Project",
  oneLiner:
    "Retrieval-augmented generation work applying LangChain-based pipelines to ground LLM output in real source data.",
  myRole: "Personal project — designed, built, and shipped independently.",
  teamComposition: "Solo — no team.",
  businessProblem: null,
  architectureSummary: null,
  stack: ["LangChain", "RAG", "Python", "Prompt Engineering"],
  industries: ["AI Products"],
  todos: [
    {
      label: "Specific problem(s) these RAG applications solve",
      section: "Business Problem",
    },
    { label: "Vector store / embedding model used", section: "Architecture Summary" },
    {
      label:
        "Whether this is a standalone project or infrastructure shared with the resume-tooling projects",
    },
    { label: "Repository or live link, if shareable" },
  ],
};
