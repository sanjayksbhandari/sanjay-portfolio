import type { CaseStudy } from "@/types/content";

export const aiResumeMatching: CaseStudy = {
  slug: "ai-resume-matching",
  name: "AI Resume Matching",
  kind: "personal",
  status: "Personal Project",
  oneLiner: "A system for scoring how well a resume matches a specific job description.",
  myRole: "Personal project — designed, built, and shipped independently.",
  teamComposition: "Solo — no team.",
  businessProblem:
    "Keyword-only matching between resumes and job descriptions misses genuinely relevant candidates whose experience is phrased differently from the job posting.",
  architectureSummary: null,
  stack: ["Python"],
  industries: ["AI Products"],
  todos: [
    {
      label:
        "Actual matching technique (embeddings/semantic similarity, LLM-based, or rubric-based)",
      section: "Architecture Summary",
    },
    { label: "Whether this uses RAG Applications / LangChain work directly" },
    { label: "Relationship to Resume Parser and ATS Resume Builder in the overall pipeline" },
    { label: "Repository or live link, if shareable" },
  ],
};
