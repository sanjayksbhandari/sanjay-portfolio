import type { AILearningArea, EngineeringPrinciple } from "@/types/content";

/**
 * AI Engineering & Innovation Lab, section 5 — AI Engineering Principles
 * (docs/phase-13-ai-engineering/02-content-model.md). Reuses the exact
 * `EngineeringPrinciple` shape the Architecture Gallery's own principles
 * already use (title + explanation + one verified case study) instead
 * of a fifth near-identical principle type — see that type's own doc
 * comment in `src/types/content.ts`.
 *
 * Deliberately only two entries. The brief's own example list for this
 * section names six candidate principles (human-in-the-loop, responsible
 * AI, prompt evaluation, retrieval over memorization, observability,
 * security); only two are reflected in actual, verified work today —
 * "Only include principles reflected in actual work" is the brief's own
 * instruction. The other four aren't included here; the page states
 * that omission explicitly (see `aiEngineeringLearningAreas` and the
 * page's own callout) instead of silently leaving a reader to wonder
 * why they're missing.
 */
export const aiEngineeringPrinciples: EngineeringPrinciple[] = [
  {
    id: "retrieval-over-memorization",
    title: "Retrieval over memorization.",
    explanation:
      "RAG Applications grounds LLM output in retrieved source content instead of relying on a model's parametric knowledge alone — the same idea the Architecture Gallery's own verified pattern for this describes in solution-shape terms.",
    relatedCaseStudySlug: "rag-applications",
  },
  {
    id: "security-even-in-a-solo-project",
    title: "Security even in a solo project.",
    explanation:
      "ATS Resume Builder's paid tier runs JWT-based auth with OTP verification and signed, time-limited download links — the same discipline applied to a personal project's payment/export flow as to an enterprise authentication system, not relaxed because nobody's reviewing it.",
    relatedCaseStudySlug: "ats-resume-builder",
  },
];

/**
 * Section 6 — Learning & Experimentation
 * (docs/phase-13-ai-engineering/02-content-model.md). Combines the
 * brief's "SUPPORTED PROJECTS" experimentation list (LangChain
 * experiments, Streamlit applications, prompt engineering, local LLM
 * experiments) with its own section-6 example list (Agentic AI,
 * Workflow Automation, Voice Agents, Evaluation, Model Selection) into
 * one taxonomy, each entry marked `"applied"` (verified, tied to a
 * shipped personal project) or `"exploring"` (named as an area of
 * interest, with an honest `todo` instead of an invented claim of
 * activity). Two are applied; six are exploring — that ratio is itself
 * the accurate picture, not a gap to paper over.
 */
export const aiEngineeringLearningAreas: AILearningArea[] = [
  {
    id: "prompt-engineering",
    label: "Prompt Engineering",
    status: "applied",
    evidence: "Used in AI Resume Optimizer, Cover Letter Generator, and RAG Applications.",
    relatedCaseStudySlug: "ai-resume-optimizer",
  },
  {
    id: "rag-langchain",
    label: "RAG & LangChain",
    status: "applied",
    evidence: "RAG Applications builds LangChain-based retrieval pipelines.",
    relatedCaseStudySlug: "rag-applications",
  },
  {
    id: "streamlit",
    label: "Streamlit",
    status: "exploring",
    todo: "Claimed as an AI-engineering skill on the Impact Dashboard; not yet tied to one specific documented project.",
  },
  {
    id: "local-llm-experiments",
    label: "Local LLM experiments",
    status: "exploring",
    todo: "No verified local-model work on record yet.",
  },
  {
    id: "agentic-ai",
    label: "Agentic AI",
    status: "exploring",
    todo: "No verified agentic-workflow work on record yet.",
  },
  {
    id: "ai-workflow-automation",
    label: "AI-driven Workflow Automation",
    status: "exploring",
    todo: "No verified AI-driven automation work on record yet.",
  },
  {
    id: "voice-agents",
    label: "Voice Agents",
    status: "exploring",
    todo: "No verified voice-agent work on record yet.",
  },
  {
    id: "model-selection-evaluation",
    label: "Model Selection & Evaluation",
    status: "exploring",
    todo: 'Resume Parser\u2019s own open item ("any accuracy/coverage figures, if measured") is the clearest sign this isn\u2019t formalized yet.',
  },
];
