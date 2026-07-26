// Phase 7 — Content Engine normalized entity model
// (docs/phase-7-content-engine/01-content-model.md).
//
// This file defines the *new* first-class entities Phase 7 introduces
// (Person, Technology, Publication, Presentation, OpenSourceProject,
// Education, LanguageSkill, Contact, SocialLink, TimelineEvent, Project)
// plus the shared `BaseEntity` shape every one of them implements.
//
// It deliberately does NOT retype `CaseStudy`, `JourneyEntry`,
// `ExpertiseGroup`, `Achievement`, `Certification`, `ArchitectureTheme`,
// or `LeadershipPrinciple` (all `@/types/content.ts`, Phase 0–6). Those
// already have strong, purpose-built types that predate this phase's
// `BaseEntity` convention and are not missing anything functional —
// forcing them to literally extend `BaseEntity` would mean renaming
// fields that dozens of already-working, already-validated components
// depend on, for no behavioral gain. Where a Phase 0–6 entity needs to
// participate in the generic (BaseEntity-shaped) parts of the Content
// Engine — search indexing, generic SEO/JSON-LD — an adapter function in
// `src/content-engine/adapters.ts` maps it to `BaseEntity` on read,
// instead. See docs/phase-7-content-engine/01-content-model.md
// ("Why not every entity extends BaseEntity") for the full reasoning.

/** A fact not yet verified is `null` (or an empty array) at the data
 * layer — never an invented value — with a paired `TodoItem` (from
 * `@/types/content`) explaining what's missing. `BaseEntity` doesn't
 * special-case this; every field below is written to be honestly
 * optional/nullable rather than requiring a placeholder string. */
export type EntityStatus = "published" | "draft" | "todo";

/** Deliberately the one loosely-typed field in the entire model —
 * `Record<string, unknown>` (never `any`) for genuinely free-form,
 * entity-specific extras that don't warrant a dedicated field (e.g. a
 * future CMS's own internal ID). Every fact that's actually part of the
 * portfolio's content has its own named, strongly-typed field instead of
 * living in here. */
export type EntityMetadata = Record<string, unknown>;

export interface EntitySEO {
  title?: string;
  description?: string;
  /** Path to an OG image, if this entity warrants a dedicated one
   * (most reuse the site-wide default from `opengraph-image.tsx`). */
  ogImage?: string;
  keywords?: string[];
}

/** Slugs of related entities, grouped by relation name — e.g.
 * `{ technologies: ["java", "spring-boot"], experience: ["opal-bpm"] }`.
 * Resolving a slug to the actual entity is `content-engine/relations.ts`'s
 * job, not this type's — `EntityRelations` only records *that* a
 * relation exists, kept as plain slugs so it stays JSON-serializable and
 * has no risk of circular type references between entities. */
export type EntityRelations = Record<string, string[] | undefined>;

export interface EntityTimestamps {
  createdAt?: string;
  updatedAt?: string;
}

/**
 * The shape every Phase 7+ entity implements: `id`, `slug`, `title`,
 * `description`, `summary`, `tags`, `metadata`, `seo`, `relations`,
 * `status`, timestamps — exactly the Phase 7 brief's own list.
 */
export interface BaseEntity extends EntityTimestamps {
  id: string;
  slug: string;
  title: string;
  description?: string;
  summary?: string;
  tags?: string[];
  status: EntityStatus;
  metadata?: EntityMetadata;
  seo?: EntitySEO;
  relations?: EntityRelations;
}

// ---------------------------------------------------------------------
// Person
// ---------------------------------------------------------------------

export interface SocialLink {
  platform: string;
  url: string;
  /** `false` when the URL is a known-empty placeholder pending
   * confirmation (see `src/content/person`) — lets a loader/UI skip
   * rendering an empty link without special-casing an empty string. */
  verified: boolean;
}

export interface Contact {
  email: string | null;
  location?: string;
  /** Not a committed SLA — see the open TODO on the Contact page
   * (docs/phase-3 & docs/17) asking for one to be confirmed. */
  preferredResponseTime?: string | null;
}

export interface Education extends BaseEntity {
  institution: string;
  credential: string;
  dateRange?: string;
}

export interface LanguageSkill {
  language: string;
  proficiency?: string;
}

/**
 * The Person entity — one record, `@/content/person`. Composes
 * `@/config/site` (Phase 0's site-wide constants) rather than
 * duplicating it; see `src/content/person/index.ts`.
 */
export interface Person extends BaseEntity {
  name: string;
  headline: string;
  location: string;
  yearsExperience: string;
  contact: Contact;
  socialLinks: SocialLink[];
  languages: LanguageSkill[];
  education: Education[];
}

// ---------------------------------------------------------------------
// Technology
// ---------------------------------------------------------------------

/**
 * First-class technology catalog entry. Before Phase 7, "a technology"
 * only existed as a bare string inside a `stack: string[]` array (every
 * `CaseStudy`) or a `TechCategory.items` array
 * (`@/content/impact/tech-ecosystem.ts`) — this gives every one of those
 * strings a stable identity (`slug`) that both directions of the
 * Project ↔ Technology relation can reference, without introducing a
 * second, competing list: `@/content/technologies` is *derived from*
 * the existing `stack`/`techCategories` data, not hand-authored from
 * scratch (see `src/content/technologies/index.ts`).
 */
export interface Technology extends BaseEntity {
  /** Matches a `techCategories[].id` from `@/content/impact/tech-ecosystem.ts`. */
  category: string;
}

// ---------------------------------------------------------------------
// Project (normalized view over CaseStudy)
// ---------------------------------------------------------------------

/**
 * The brief's "Project" entity, with relations to Technology, Experience,
 * and CaseStudy. Every current project already has full case-study-level
 * detail, so `Project` is a *derived, lightweight view* over
 * `CaseStudy` (`content-engine/adapters.ts`'s `caseStudyToProject`) —
 * not a second, separately-authored record that the same fact would have
 * to be kept in sync across. A future project that doesn't yet warrant a
 * full case study could still get a bare `Project` record with no
 * `caseStudySlug`; none of the current 12 needs that, since all 12
 * already have one.
 */
export interface Project extends BaseEntity {
  kind: "enterprise" | "personal";
  company?: string;
  technologySlugs: string[];
  /** The Experience this was built under — undefined where not resolvable
   * (e.g. no `journeyEntries` company match, as with personal projects). */
  experienceId?: string;
  /** Always set today (every current project has a full write-up) but
   * modeled as optional since not every future `Project` will. */
  caseStudySlug?: string;
}

// ---------------------------------------------------------------------
// Future content sources — genuinely empty today, not populated with
// placeholder entries. See `src/content/blog/index.ts`.
// ---------------------------------------------------------------------

export interface Publication extends BaseEntity {
  publishedAt?: string;
  url?: string;
  outlet?: string;
}

export interface Presentation extends BaseEntity {
  event?: string;
  date?: string;
  url?: string;
}

export interface OpenSourceProject extends BaseEntity {
  repositoryUrl?: string;
  stars?: number;
}

// ---------------------------------------------------------------------
// TimelineEvent — a normalized, cross-entity view for a future unified
// career timeline (dates from Experience/Certification/Project), not a
// new fact source. See `content-engine/loaders.ts`'s `getTimelineEvents`.
// ---------------------------------------------------------------------

export type TimelineEventType = "experience" | "achievement" | "certification" | "project";

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  date: string;
  label: string;
  relatedSlug?: string;
}
