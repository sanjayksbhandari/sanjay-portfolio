import type {
  ArchitectureCategory,
  ArchitecturePattern,
  CaseStudy,
  TodoItem,
} from "@/types/content";
import {
  getAllCaseStudies,
  getAllProjectCaseStudies,
  getArchitectureCategories,
  getArchitecturePatterns,
} from "./loaders";
import { normalizeTechnologyName } from "./journey";

/**
 * Content Engine — Architecture Gallery derivations
 * (docs/phase-10-architecture-gallery/01-architecture.md). Same rule as
 * `content-engine/journey.ts`: every function here computes a *view*
 * over content that already exists elsewhere (`CaseStudy.decisions`,
 * `stack`, `architecturePatterns`) — nothing here authors a new fact,
 * and `/architecture` renders this file's output rather than computing
 * it inline.
 */

// ---------------------------------------------------------------------
// Architecture Decision Records — Architecture Gallery section 5
// ---------------------------------------------------------------------

export interface ArchitectureDecisionRecord {
  id: string;
  title: string;
  caseStudySlug: string;
  caseStudyName: string;
  /** The forces/constraints the decision was made under — the case
   * study's own `technicalChallenges`, falling back to
   * `architectureSummary` when a case study has no distinct
   * technical-challenges write-up. */
  context: string;
  decision: string;
  rationale: string;
  /** `undefined` (rendered as TODO) when `DecisionRecord.alternativeConsidered`
   * isn't on record — most current decisions don't have one yet. */
  alternativesConsidered?: string[];
  /** `undefined` (rendered as TODO) when `DecisionRecord.tradeoffAccepted`
   * isn't on record. Deliberately never falls back to `rationale`
   * ("why chosen" and "what it cost" are different questions — collapsing
   * them would misrepresent a rationale as a consequence). */
  consequences?: string;
  /** From the case study's own `futureImprovements` — `undefined` (TODO)
   * today for every case study, since none has that field populated yet. */
  futureImprovements?: string[];
  todos: TodoItem[];
}

/**
 * Flattens every enterprise `CaseStudy.decisions` entry into one ADR —
 * 9 records across the 5 enterprise case studies at time of writing.
 * Personal/AI projects have no `decisions` recorded, so they contribute
 * none (not a gap the ADR section needs to flag — a personal project's
 * `todos` on its own case study page already covers that).
 */
export function getArchitectureDecisionRecords(): ArchitectureDecisionRecord[] {
  const records: ArchitectureDecisionRecord[] = [];

  for (const cs of getAllCaseStudies()) {
    (cs.decisions ?? []).forEach((decision, index) => {
      const todos: TodoItem[] = [];
      if (!decision.alternativeConsidered) {
        todos.push({ label: "Alternative(s) considered before this decision" });
      }
      if (!decision.tradeoffAccepted) {
        todos.push({ label: "Consequence or trade-off accepted as a result of this decision" });
      }
      if (!cs.futureImprovements || cs.futureImprovements.length === 0) {
        todos.push({ label: "Future improvements identified for this decision, if any" });
      }

      records.push({
        id: `${cs.slug}-decision-${index}`,
        title: decision.decision,
        caseStudySlug: cs.slug,
        caseStudyName: cs.name,
        context: cs.technicalChallenges ?? cs.architectureSummary ?? "",
        decision: decision.decision,
        rationale: decision.whyChosen,
        alternativesConsidered: decision.alternativeConsidered
          ? [decision.alternativeConsidered]
          : undefined,
        consequences: decision.tradeoffAccepted ?? undefined,
        futureImprovements: cs.futureImprovements ?? undefined,
        todos,
      });
    });
  }

  return records;
}

// ---------------------------------------------------------------------
// Architecture Cards grouped by category — Architecture Gallery section 3
// ---------------------------------------------------------------------

export interface ArchitecturePatternGroup {
  category: ArchitectureCategory;
  patterns: ArchitecturePattern[];
}

/** Every category with at least one pattern, in the taxonomy's own
 * fixed order — a category with zero patterns simply doesn't render a
 * group rather than showing an empty section. */
export function getArchitecturePatternsByCategory(): ArchitecturePatternGroup[] {
  const patterns = getArchitecturePatterns();
  return getArchitectureCategories()
    .map((category) => ({
      category,
      patterns: patterns.filter((pattern) => pattern.categoryId === category.id),
    }))
    .filter((group): group is ArchitecturePatternGroup => group.patterns.length > 0);
}

// ---------------------------------------------------------------------
// Technology Relationships — Architecture Gallery section 6
// ---------------------------------------------------------------------

export interface TechnologyRelationshipStage {
  id: string;
  label: string;
  /** Exact, verified `stack` strings that belong at this layer —
   * de-duplicated but not normalized for display, so e.g. both "Java"
   * and "Java 21" can appear if both are verified. Empty when nothing
   * verified matches this conceptual layer. */
  verifiedTechnologies: string[];
}

/**
 * The brief's own 7-layer conceptual chain (Java → Spring Boot → REST
 * APIs → Security → Messaging → Databases → Deployment) — a generic,
 * widely-recognized shape for a Java enterprise backend, not itself a
 * verified fact. What *is* verified, and rendered alongside each layer,
 * is which of Sanjay's own case studies' `stack` entries actually
 * belong there — see `getTechnologyRelationshipChain()`.
 */
const RELATIONSHIP_CHAIN: { id: string; label: string; match: string[] }[] = [
  { id: "language", label: "Java", match: ["java"] },
  { id: "framework", label: "Spring Boot", match: ["spring mvc", "spring boot"] },
  { id: "api", label: "REST APIs", match: ["rest apis"] },
  { id: "security", label: "Security", match: ["spring security", "oauth2", "jwt"] },
  { id: "messaging", label: "Messaging", match: ["kafka", "celery"] },
  { id: "databases", label: "Databases", match: ["postgresql", "redis"] },
  { id: "deployment", label: "Deployment", match: ["aws", "docker", "jenkins", "ci/cd"] },
];

export function getTechnologyRelationshipChain(): TechnologyRelationshipStage[] {
  const allStackItems = getAllProjectCaseStudies().flatMap((cs) => cs.stack ?? []);

  return RELATIONSHIP_CHAIN.map((stage) => {
    const matched = allStackItems.filter((item) =>
      stage.match.includes(normalizeTechnologyName(item))
    );
    return { id: stage.id, label: stage.label, verifiedTechnologies: Array.from(new Set(matched)) };
  });
}

// ---------------------------------------------------------------------
// Verified Architecture Showcase — Architecture Gallery section 4
// ---------------------------------------------------------------------

/** Sections of a `CaseStudy.todos` entry that a reader of the
 * Architecture Gallery's Showcase (architecture-focused, not a full
 * case-study read) actually cares about — excludes business-impact/
 * team-composition/stack gaps that belong to the case study's own page
 * instead. */
const ARCHITECTURE_RELEVANT_TODO_SECTIONS = new Set([
  "System Context",
  "Architecture Summary",
  "Engineering Decisions",
  "Technical Challenges",
  "Security Considerations",
  "Scalability Considerations",
  "Performance Considerations",
]);

export function getArchitectureRelevantTodos(caseStudy: CaseStudy): TodoItem[] {
  return (caseStudy.todos ?? []).filter(
    (todo) => todo.section && ARCHITECTURE_RELEVANT_TODO_SECTIONS.has(todo.section)
  );
}
