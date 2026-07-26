import type { CaseStudy } from "@/types/content";
import { hiringEasy } from "./hiringeasy";
import { atsResumeBuilder } from "./ats-resume-builder";
import { aiResumeOptimizer } from "./ai-resume-optimizer";
import { coverLetterGenerator } from "./cover-letter-generator";
import { resumeParser } from "./resume-parser";
import { aiResumeMatching } from "./ai-resume-matching";
import { ragApplications } from "./rag-applications";

// Ordered with the most substantiated project (ATS Resume Builder — has a
// real, working production codebase behind it) first.
//
// Every entry is `kind: "personal"` — since Phase 6 these use the same
// unified `CaseStudy` shape as the enterprise case studies in
// `@/content/projects/case-studies` (docs/phase-6-case-study-framework/
// 01-content-model.md), rendered through the same `CaseStudyDetail`
// template at `/ai-engineering/[slug]` rather than a separate, narrower
// type/template.
export const aiProjects: CaseStudy[] = [
  atsResumeBuilder,
  resumeParser,
  aiResumeMatching,
  aiResumeOptimizer,
  coverLetterGenerator,
  ragApplications,
  hiringEasy,
];

export function getAIProjectBySlug(slug: string): CaseStudy | undefined {
  return aiProjects.find((p) => p.slug === slug);
}
