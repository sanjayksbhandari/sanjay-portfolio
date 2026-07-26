import type { CaseStudy } from "@/types/content";
import { getAllPersonalProjects } from "./loaders";
import { normalizeTechnologyName } from "./journey";
import type { TechnologyRelationshipStage } from "./architecture";

/**
 * Content Engine — AI Engineering & Innovation Lab derivations
 * (docs/phase-13-ai-engineering/01-architecture.md). Same rule as every
 * other derivation file in this module: nothing here authors a new
 * fact — it only computes a *view* over the seven `CaseStudy` records
 * in `@/content/projects/ai` (`getAllPersonalProjects()`) that already
 * exist, so `/ai-engineering` renders this file's output rather than
 * computing it inline.
 */

// ---------------------------------------------------------------------
// Innovation Timeline — page section 2
// ---------------------------------------------------------------------

/**
 * The brief's own five-stage evolution shape (Prompt Engineering → RAG
 * → LangChain → LLMs & AI APIs → Automation) — a generic, widely-
 * recognized progression, not itself a verified fact or a dated
 * timeline. No AI project on record carries a `timeline` date, so this
 * is rendered as a *conceptual* progression (reusing the exact
 * `TechnologyRelationshipStage` shape and `TechnologyRelationshipDiagram`
 * component the Architecture Gallery already built for its own
 * conceptual Java-backend layering — see that component's doc comment)
 * rather than a chronological one. What's verified, and shown at each
 * stage, is only the `stack` strings that actually belong there; a
 * stage with nothing verified yet renders that component's own "No
 * verified technology confirmed" TODO instead of a guessed date.
 */
const AI_INNOVATION_STAGES: { id: string; label: string; match: string[] }[] = [
  { id: "prompt-engineering", label: "Prompt Engineering", match: ["prompt engineering"] },
  { id: "rag", label: "Retrieval-Augmented Generation (RAG)", match: ["rag"] },
  { id: "langchain", label: "LangChain", match: ["langchain"] },
  { id: "llms-ai-apis", label: "LLMs & AI APIs", match: [] },
  { id: "automation", label: "Automation", match: [] },
];

export function getAIInnovationTimeline(): TechnologyRelationshipStage[] {
  const allStackItems = getAllPersonalProjects().flatMap((cs) => cs.stack ?? []);

  return AI_INNOVATION_STAGES.map((stage) => {
    const matched = allStackItems.filter((item) =>
      stage.match.includes(normalizeTechnologyName(item))
    );
    return { id: stage.id, label: stage.label, verifiedTechnologies: Array.from(new Set(matched)) };
  });
}

// ---------------------------------------------------------------------
// AI Technology Stack — page section 4
// ---------------------------------------------------------------------

export interface AIStackCategory {
  id: string;
  label: string;
  /** Exact, verified `stack` strings from the seven AI projects that
   * belong in this category. Empty when nothing verified matches it —
   * the page renders every category from the brief's own taxonomy
   * rather than silently dropping the ones with nothing in them yet,
   * so a reader sees the full, honest shape of what's confirmed and
   * what isn't. */
  technologies: string[];
}

/**
 * The brief's own seven-bucket taxonomy for this section (LLMs,
 * Embedding Models, Vector Databases, Prompt Engineering, Frameworks,
 * Evaluation, Deployment) — scoped strictly to technologies that appear
 * in an actual AI project's own `stack` (never the broader, project-
 * unlinked "AI Engineering" skill claim in
 * `@/content/skill-domains/index.ts`, which names Streamlit/FastAPI
 * without tying either to one specific case study — see
 * `aiEngineeringLearningAreas` for how that distinction is surfaced
 * instead of blurred into "verified"). "Frameworks" is widened to
 * "Frameworks & Languages" only to honestly include Python, the base
 * language every one of the seven projects is written in.
 */
const AI_STACK_CATEGORIES: { id: string; label: string; match: string[] }[] = [
  { id: "prompt-engineering", label: "Prompt Engineering", match: ["prompt engineering"] },
  { id: "frameworks", label: "Frameworks & Languages", match: ["langchain", "rag", "python"] },
  { id: "llms", label: "LLMs", match: [] },
  { id: "embedding-models", label: "Embedding Models", match: [] },
  { id: "vector-databases", label: "Vector Databases", match: [] },
  { id: "evaluation", label: "Evaluation", match: [] },
  { id: "deployment", label: "Deployment", match: [] },
];

export function getAIStackByCategory(): AIStackCategory[] {
  const allStackItems = getAllPersonalProjects().flatMap((cs) => cs.stack ?? []);

  return AI_STACK_CATEGORIES.map((category) => {
    const matched = allStackItems.filter((item) =>
      category.match.includes(normalizeTechnologyName(item))
    );
    return { id: category.id, label: category.label, technologies: Array.from(new Set(matched)) };
  });
}

// ---------------------------------------------------------------------
// AI Projects — page section 3, "Current Status" field
// ---------------------------------------------------------------------

export interface AIProjectDocumentationStatus {
  documentedSections: number;
  totalSections: number;
  openTodos: number;
}

/** The six narrative-bearing `CaseStudy` fields this page's "AI Projects"
 * cards actually check for depth (excludes `oneLiner`/`myRole`/
 * `teamComposition`/`stack`/`status`, which every one of the seven
 * projects already has — checking those wouldn't distinguish anything). */
const NARRATIVE_FIELD_CHECKLIST: (keyof CaseStudy)[] = [
  "businessProblem",
  "architectureSummary",
  "technicalChallenges",
  "lessonsLearned",
  "futureImprovements",
  "engineeringOutcomes",
];

/**
 * How much of a given AI project is actually documented yet, versus
 * still an open item — a genuinely per-project signal (unlike `status`
 * or `teamComposition`, which read "Personal Project" / "Solo — no
 * team." identically across all seven and would just repeat if shown
 * per card) computed from data that already varies, not authored fresh
 * per project.
 */
export function getAIProjectDocumentationStatus(
  caseStudy: CaseStudy
): AIProjectDocumentationStatus {
  const documentedSections = NARRATIVE_FIELD_CHECKLIST.filter((field) => {
    const value = caseStudy[field];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;

  return {
    documentedSections,
    totalSections: NARRATIVE_FIELD_CHECKLIST.length,
    openTodos: caseStudy.todos?.length ?? 0,
  };
}

// ---------------------------------------------------------------------
// Technology filter — page section 3's "Technology filters" interaction
// ---------------------------------------------------------------------

/** Every distinct, verified `stack` technology across the seven AI
 * projects, in first-appearance order — the option list `AITechnology
 * FilterBar` renders, so a filter can never offer a choice that would
 * match zero project cards. Same shape as `getShowcaseFilterFacets()`,
 * scoped to this page's own project set instead of the Showcase's
 * curated ten. */
export function getAIProjectTechnologyFacets(): string[] {
  const technologies: string[] = [];
  for (const cs of getAllPersonalProjects()) {
    for (const tech of cs.stack ?? []) {
      if (!technologies.includes(tech)) technologies.push(tech);
    }
  }
  return technologies;
}
