// Shared content types for the portfolio.
// These types structurally enforce the content rules from
// docs/17-content-strategy.md — e.g. a CaseStudy cannot be authored
// without myRoleAndScope, and unverified specifics must be expressed
// through the `todo` field rather than invented prose.

export interface TodoItem {
  /** What is missing, phrased the way it should read once resolved. */
  label: string;
  /** Which case-study section this TODO belongs to, if any — drives the
   * "TODO Tracking" rollup in `CaseStudyDetail` (docs/phase-6-case-study-
   * framework/02). Free text, not a key into `CaseStudy` — most TODOs
   * (dates, diagrams, "confirm X") aren't about a whole section. */
  section?: string;
}

export interface DecisionRecord {
  decision: string;
  alternativeConsidered?: string;
  whyChosen: string;
  tradeoffAccepted?: string;
}

/**
 * A dedicated trade-off write-up (Case Study section 10) — distinct from
 * `DecisionRecord.tradeoffAccepted` (a one-line note attached to a single
 * decision). This is for a trade-off substantial enough to warrant its
 * own gained-vs-given-up framing, independent of any single decision.
 */
export interface Tradeoff {
  title: string;
  whatWeGained: string;
  whatWeGaveUp: string;
}

/** A quantifiable metric (Case Study section 18, `MetricsGrid`) — the
 * structured counterpart to a prose outcome statement (`OutcomeCard`).
 * Kept as a separate, optional list because not every verified outcome
 * is expressible as a single number + label without editorializing. */
export interface Metric {
  value: string;
  label: string;
}

/** Case Study section 19. `context` is optional — some lessons stand on
 * their own, others need the situation that produced them. */
export interface LessonLearned {
  lesson: string;
  context?: string;
}

/** Case Study Timeline component input — explicitly "(optional)" per the
 * Phase 6 brief's own section list; a project can have zero of these. */
export interface TimelineEntry {
  label: string;
  date?: string;
}

export type CaseStudyKind = "enterprise" | "personal";

/**
 * The unified Engineering Case Study framework
 * (docs/phase-6-case-study-framework/00-README.md). One type for every
 * project — enterprise (`kind: "enterprise"`, e.g. the Enterprise
 * Exchange Platform) and personal (`kind: "personal"`, e.g. the AI
 * resume-tooling projects) — because the brief's own "SUPPORTED PROJECTS"
 * list mixes both under one framework rather than keeping them as two
 * incompatible shapes (Phase 2's original `CaseStudy` and `AIProject`).
 *
 * Every one of the brief's 20 sections is optional (`?`, and `| null`
 * where a field previously existed and now needs an explicit "known to
 * be absent" state distinct from "not yet migrated") — "Every section
 * must be optional so projects can vary in depth." A component renders
 * a section only when it has content; missing sections surface once, in
 * a rolled-up `todos` list, not as 15 empty placeholders per page (see
 * `CaseStudySection` and `CaseStudyDetail`).
 *
 * Field-to-section mapping is documented in full in
 * docs/phase-6-case-study-framework/01-content-model.md — summary:
 * `oneLiner` + `overview` = 1 (Project Overview), `businessProblem` = 2,
 * `myRole`/`teamComposition` = 3–4, `stack` = 5, `systemContext` = 6,
 * `architectureSummary` = 7, `technicalChallenges` = 8, `decisions` = 9,
 * `tradeoffs` = 10, `performanceConsiderations`/`securityConsiderations`/
 * `scalabilityConsiderations` = 11–13, `testingStrategy`/
 * `deploymentStrategy`/`monitoringAndObservability` = 14–16,
 * `businessImpact` = 17, `engineeringOutcomes`/`metrics` = 18,
 * `lessonsLearned` = 19, `futureImprovements` = 20.
 */
export interface CaseStudy {
  // Identity — the only fields every project is guaranteed to have,
  // because they're needed just to list/link to the project at all
  // (cards, nav, breadcrumbs, metadata). Not one of the 20 numbered
  // sections themselves.
  slug: string;
  name: string;
  kind: CaseStudyKind;
  status: "Production" | "Personal Project" | "In Development";
  /** Company/client this was built for — absent for personal projects. */
  company?: string;
  /** The short form of section 1 (Project Overview) — also what cards
   * and `<meta description>` use, so it's required rather than nullable
   * like every other section. */
  oneLiner: string;

  // 1. Project Overview (long form; `oneLiner` above is the short form
  // every project already has — this is optional additional depth).
  overview?: string | null;
  // 2. Business Problem
  businessProblem?: string | null;
  // 3. My Role
  myRole?: string | null;
  // 4. Team Composition
  teamComposition?: string | null;
  // 5. Technology Stack
  stack?: string[] | null;
  // 6. System Context
  systemContext?: string | null;
  // 7. Architecture Summary
  architectureSummary?: string | null;
  // 8. Technical Challenges
  technicalChallenges?: string | null;
  // 9. Engineering Decisions
  decisions?: DecisionRecord[] | null;
  // 10. Trade-offs
  tradeoffs?: Tradeoff[] | null;
  // 11. Performance Considerations
  performanceConsiderations?: string | null;
  // 12. Security Considerations
  securityConsiderations?: string | null;
  // 13. Scalability Considerations
  scalabilityConsiderations?: string | null;
  // 14. Testing Strategy
  testingStrategy?: string | null;
  // 15. Deployment Strategy
  deploymentStrategy?: string | null;
  // 16. Monitoring & Observability
  monitoringAndObservability?: string | null;
  // 17. Business Impact
  businessImpact?: string | null;
  // 18. Engineering Outcomes (+ optional structured `metrics`)
  engineeringOutcomes?: string[] | null;
  metrics?: Metric[] | null;
  // 19. Lessons Learned
  lessonsLearned?: LessonLearned[] | null;
  // 20. Future Improvements
  futureImprovements?: string[] | null;

  /** Timeline component input — optional per the brief, not a numbered section. */
  timeline?: TimelineEntry[] | null;
  relatedSlugs?: string[];
  todos?: TodoItem[];

  /**
   * Industries this project served — a categorization tag, not one of
   * the 20 numbered sections (docs/phase-9-engineering-journey/02-
   * content-model.md). Every value is a direct read of what `oneLiner`/
   * `businessProblem` already say (e.g. "packaging artwork management
   * platform for private-brand retailers" → `["Retail", "Packaging"]`),
   * not a separately-sourced fact — this field restructures existing
   * verified prose for the Engineering Journey page's "Industry
   * Experience" section rather than introducing a new class of claim.
   */
  industries?: string[] | null;
}

export interface JourneyEntry {
  /** Stable identity for the Content Engine's relation graph (Phase 7) —
   * e.g. Person → Experience, Project → Experience. Added alongside the
   * existing fields below; nothing that already reads `company`/`title`/
   * etc. needed to change. */
  slug: string;
  company: string;
  title: string;
  location?: string;
  dateRange: string;
  durationLabel?: string;
  scope: string[];
  /**
   * The subset of this role's scope that was specifically about leading
   * or mentoring other engineers, called out separately from `scope` so
   * the Engineering Journey page's "Leadership Responsibilities" can
   * render it on its own. Verbatim overlap with `scope` is intentional
   * (docs/phase-9-engineering-journey/02-content-model.md) — this is a
   * second, labeled view of an already-verified sentence, not a new
   * fact; a role with no verified leadership scope simply omits this
   * field rather than asserting "none."
   */
  leadershipScope?: string[];
  relatedCaseStudySlugs?: string[];
}

/**
 * Engineering Journey, section 7 — Career Principles
 * (docs/phase-9-engineering-journey/02-content-model.md). Deliberately
 * its own type rather than reusing `EngineeringStrength`'s identical
 * shape: a "strength" claims capability, a "principle" names a value
 * (Maintainability, Scalability, Code Quality, Architecture, Mentoring,
 * Reliability) — same distinction this codebase already draws between
 * `LeadershipPrinciple` and `EngineeringStrength`. Every `evidence`
 * string is a restatement of a fact already published elsewhere
 * (a `CaseStudy` decision, an `Achievement`, a `LeadershipPrinciple`) —
 * never a new claim authored for this section alone.
 */
export interface CareerPrinciple {
  id: string;
  title: string;
  evidence: string;
  relatedCaseStudySlug?: string;
}

export interface ExpertiseGroup {
  id: string;
  label: string;
  description: string;
  items: string[];
}

export interface LeadershipPrinciple {
  id: string;
  title: string;
  practice: string;
  evidence?: string;
  relatedCaseStudySlug?: string;
  todos?: TodoItem[];
}

export interface Achievement {
  id: string;
  statement: string;
  context: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  group?: string;
}

export interface ArchitectureTheme {
  id: string;
  title: string;
  summary: string;
  decisions: DecisionRecord[];
  relatedCaseStudySlugs?: string[];
  todos?: TodoItem[];
}

// ---------------------------------------------------------------------
// Architecture Gallery (Phase 10) types below
// (docs/phase-10-architecture-gallery/02-content-model.md). These are
// deliberately distinct from `ArchitectureTheme` above: a theme is a
// cross-cutting narrative spanning several case studies; a
// `ArchitectureCategory`/`ArchitecturePattern` pair is a single,
// nameable engineering pattern (Microservices, Caching, …) that either
// comes from verified production experience or is explicitly labeled a
// generic pattern with no verified instance yet — the Architecture
// Gallery brief's own "come from verified experience, or be clearly
// labelled as a generic engineering pattern" rule, encoded in the type
// itself via `status` rather than left to prose to get right.
// ---------------------------------------------------------------------

/** The Architecture Gallery's own category taxonomy — Backend,
 * Microservices, Authentication, API Design, Messaging, Caching,
 * Observability, Deployment, AI Systems, Security (the brief's own
 * list). Deliberately not the same taxonomy as `techCategories`
 * (tool-type, Phase 5) or `EVOLUTION_CATEGORIES` (engineering-concern,
 * Phase 9) — this one groups *patterns*, not raw technologies or a
 * career timeline. */
export interface ArchitectureCategory {
  id: string;
  label: string;
  description: string;
}

export type ArchitecturePatternStatus = "verified" | "generic";

/**
 * One Architecture Card. `status: "verified"` means `purpose`/
 * `problem`/`typicalSolution`/`tradeoffs` describe a decision actually
 * made on a named, verified system — `relatedCaseStudySlugs` must be
 * non-empty in that case. `status: "generic"` means the opposite: a
 * recognized engineering pattern presented as general knowledge, with
 * no claim of personal production experience — `relatedCaseStudySlugs`
 * is intentionally omitted, and a `todos` entry records that a verified
 * instance hasn't been confirmed yet, rather than silently implying
 * one. This distinction is the mechanism, not just documentation, for
 * the brief's "never imply experience that is not verified."
 */
export interface ArchitecturePattern {
  id: string;
  categoryId: string;
  title: string;
  status: ArchitecturePatternStatus;
  purpose: string;
  problem: string;
  typicalSolution: string;
  tradeoffs?: string[] | null;
  whenToUse?: string[] | null;
  whenNotToUse?: string[] | null;
  relatedTechnologies?: string[] | null;
  relatedCaseStudySlugs?: string[] | null;
  todos?: TodoItem[];
}

/**
 * Architecture Gallery, section 7 — Engineering Principles. Distinct
 * from Engineering Journey's `CareerPrinciple` (a career *value* like
 * Maintainability/Reliability) — this is a concise engineering
 * *maxim* ("Design for maintainability.", "Measure before
 * optimizing.") paired with the one verified decision that actually
 * put it into practice, following the same "claim + one piece of
 * verified evidence" shape as `EngineeringStrength` (Phase 5) and
 * `CareerPrinciple` (Phase 9) rather than a fourth near-identical type
 * with different field names for the same idea.
 */
export interface EngineeringPrinciple {
  id: string;
  title: string;
  explanation: string;
  relatedCaseStudySlug?: string;
}

// Phase 5 (Impact Dashboard) types below. Each is a thin, purpose-built
// shape over content that (per docs/phase-5-impact-dashboard/02) is
// already verified elsewhere — these types don't introduce a new class of
// unverified fact, just a new way of presenting existing ones.

/** Block 2 — Core Engineering Domains. A higher-level grouping than
 * `ExpertiseGroup` (no tech-item list — that's Block 3's job); see
 * `src/content/domains.ts` for how this is composed from
 * `expertiseGroups`/`architectureThemes` rather than re-authored from
 * scratch. */
export interface EngineeringDomain {
  id: string;
  label: string;
  description: string;
  href: string;
}

/** Block 3 — Technology Ecosystem, organized by category (Languages,
 * Frameworks, etc.) rather than by domain. */
export interface TechCategory {
  id: string;
  label: string;
  items: string[];
}

/** Block 4 — Engineering Strengths. Each strength is a claim plus the one
 * piece of verified evidence that backs it — never an unsupported
 * adjective. */
export interface EngineeringStrength {
  id: string;
  title: string;
  explanation: string;
  relatedCaseStudySlug?: string;
}

/** Block 5 — Career Snapshot. `value` is `null` (not an empty string or
 * an invented placeholder) when the fact isn't yet verified — the
 * component renders that as a visible `TODO`, never as blank/missing. */
export interface CareerFact {
  id: string;
  label: string;
  value: string | null;
  todoLabel?: string;
}

/** Block 6 — Selected Highlights. `businessOutcome`/`technicalOutcome`
 * are deliberately separate fields (not one merged sentence) because the
 * brief requires each highlight to name both. */
export interface Highlight {
  id: string;
  title: string;
  businessOutcome: string;
  technicalOutcome: string;
  relatedCaseStudySlug?: string;
}

// ---------------------------------------------------------------------
// AI Engineering & Innovation Lab (Phase 13) type below
// (docs/phase-13-ai-engineering/02-content-model.md).
// ---------------------------------------------------------------------

export type AILearningAreaStatus = "applied" | "exploring";

/**
 * Section 6 — Learning & Experimentation. Deliberately a single type
 * with a required `status` rather than two separate lists, so the page
 * can never render an "exploring" topic without also stating that it
 * isn't yet applied in shipped work — the brief's own "clearly
 * distinguish experimentation from production experience" instruction,
 * encoded in the type instead of left to prose to get right each time.
 * `status: "applied"` requires `evidence` + `relatedCaseStudySlug`;
 * `status: "exploring"` requires `todo` instead of a fabricated claim.
 */
export interface AILearningArea {
  id: string;
  label: string;
  status: AILearningAreaStatus;
  evidence?: string;
  relatedCaseStudySlug?: string;
  todo?: string;
}

// ---------------------------------------------------------------------
// Engineering Capability Matrix (Phase 14) types below
// (docs/phase-14-capability-matrix/02-content-model.md).
// ---------------------------------------------------------------------

/**
 * One capability domain on `/expertise`. Deliberately richer than
 * `EngineeringStrength` (Impact Dashboard — title + one-sentence
 * explanation) and distinct from `ExpertiseGroup` (skill-domain label
 * + tech-item list): a capability is a *problem class* Sanjay can
 * solve, backed by verified evidence, related projects, related
 * technologies, and the business value that evidence produced — the
 * brief's own "capability → evidence → business value" chain, encoded
 * in the type so a card can never render a capability without all four
 * of those fields.
 */
export interface EngineeringCapability {
  id: string;
  title: string;
  overview: string;
  evidence: string;
  businessValue: string;
  relatedCaseStudySlugs?: string[];
  relatedTechnologies?: string[];
  todos?: TodoItem[];
}

/**
 * One row of the Engineering Responsibilities Matrix. `category` is
 * the brief's own responsibility axis (Architecture, Design,
 * Implementation, …); `evidence` is a restatement of a fact already
 * published elsewhere — never a new claim. Categories the brief names
 * but that have no verified depth yet carry a `todo` instead of an
 * invented practice description.
 */
export interface EngineeringResponsibility {
  id: string;
  category: string;
  evidence: string;
  relatedCaseStudySlug?: string;
  todo?: string;
}

// ---------------------------------------------------------------------
// Professional Hub (Phase 15) types below
// (docs/phase-15-professional-hub/02-content-model.md).
// ---------------------------------------------------------------------

/** Resume Center artifact metadata — never invents a PDF that isn't
 * actually at `pdfPath` (`ready: false` disables the download CTA). */
export interface ResumeArtifact {
  pdfPath: string;
  ready: boolean;
  lastUpdated: string | null;
  version: string | null;
  label: string;
  todos?: TodoItem[];
}

export type ContactMethodKind =
  "email" | "linkedin" | "github" | "portfolio" | "hiringeasy" | "calendly";

/**
 * One contact channel. `href: null` means the channel is named but not
 * yet verified (render TODO, never a dead link). `primary` distinguishes
 * preferred outreach paths from secondary ones.
 */
export interface ContactMethod {
  id: string;
  label: string;
  kind: ContactMethodKind;
  href: string | null;
  primary: boolean;
  description?: string;
  todo?: string;
}

/** Availability fact — same null+todoLabel convention as `CareerFact`. */
export interface AvailabilityFact {
  id: string;
  label: string;
  value: string | null;
  todoLabel?: string;
}

export interface RecruiterResource {
  id: string;
  label: string;
  href: string;
  description: string;
}

export interface HubFAQItem {
  id: string;
  question: string;
  answer: string;
}

export type SocialPresenceStatus = "verified" | "planned";

/**
 * Social Presence entry. `status: "verified"` requires a real `href`;
 * `status: "planned"` is a named future surface (Blog, Talks, OSS) with
 * a `todo` instead of a fabricated URL.
 */
export interface SocialPresenceLink {
  id: string;
  label: string;
  status: SocialPresenceStatus;
  href?: string | null;
  todo?: string;
}
