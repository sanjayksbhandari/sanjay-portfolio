import {
  getAllProjectCaseStudies,
  getAllExperience,
  getAllArchitectureThemes,
  getAllLeadershipPrinciples,
  getEngineeringStrengths,
  getSelectedHighlights,
  getAllTechnologies,
  getAnyCaseStudyBySlug,
  getCareerPrinciples,
  getArchitecturePatterns,
  getEngineeringPrinciples,
  getAIEngineeringPrinciples,
  getAIEngineeringLearningAreas,
  getAllEngineeringCapabilities,
  getAllEngineeringResponsibilities,
  getContactMethods,
  getSocialPresenceLinks,
  getResumeArtifact,
  getRecruiterResources,
  getHubFaqItems,
} from "./loaders";
import { resolveTechnologySlugs } from "./adapters";
import { SHOWCASE_SLUGS } from "./showcase";
import { FEATURED_LEADERSHIP_DECISION_IDS, getFeaturedLeadershipDecisions } from "./leadership";
import { FEATURED_CAPABILITY_DECISION_IDS, getFeaturedCapabilityDecisions } from "./capabilities";

/**
 * Content Engine — Validation (docs/phase-7-content-engine/08-validation-
 * strategy.md). Hand-rolled TypeScript checks today — no runtime schema
 * library is a dependency yet ("Future Zod Validation" per the Phase 7
 * brief is deliberately future: every one of these checks is expressed
 * as a plain function over already-strictly-typed data, which is enough
 * to catch the two things that actually matter for a git-versioned,
 * TypeScript-as-data project — *content integrity* (broken slug
 * references, duplicates) and *missing metadata* — without adding a
 * dependency for problems `tsc` already prevents (wrong shape, wrong
 * type). See 08-validation-strategy.md, "Why not Zod yet," for exactly
 * where a Zod schema would slot in if/when content moves to a runtime
 * source (MDX frontmatter, a CMS, an API) that `tsc` can no longer see.
 */

export type IssueSeverity = "error" | "warning";

export interface ContentIssue {
  severity: IssueSeverity;
  entity: string;
  message: string;
}

function checkDuplicateSlugs(): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const seen = new Map<string, number>();
  for (const cs of getAllProjectCaseStudies()) {
    seen.set(cs.slug, (seen.get(cs.slug) ?? 0) + 1);
  }
  for (const [slug, count] of seen) {
    if (count > 1) {
      issues.push({
        severity: "error",
        entity: `CaseStudy:${slug}`,
        message: `Slug "${slug}" is used by ${count} case studies/projects — slugs must be unique.`,
      });
    }
  }
  return issues;
}

function checkRequiredCaseStudyFields(): ContentIssue[] {
  const issues: ContentIssue[] = [];
  for (const cs of getAllProjectCaseStudies()) {
    if (!cs.oneLiner || cs.oneLiner.trim().length === 0) {
      issues.push({
        severity: "error",
        entity: `CaseStudy:${cs.slug}`,
        message: "Missing `oneLiner` — required for cards, breadcrumbs, and <meta description>.",
      });
    }
    if (!cs.name || cs.name.trim().length === 0) {
      issues.push({
        severity: "error",
        entity: `CaseStudy:${cs.slug}`,
        message: "Missing `name`.",
      });
    }
  }
  return issues;
}

/** Broken Link Detection — every `relatedSlugs`/`relatedCaseStudySlug(s)`
 * across every content file must resolve to a real, existing slug. */
function checkBrokenRelations(): ContentIssue[] {
  const issues: ContentIssue[] = [];

  for (const cs of getAllProjectCaseStudies()) {
    for (const slug of cs.relatedSlugs ?? []) {
      if (!getAnyCaseStudyBySlug(slug)) {
        issues.push({
          severity: "error",
          entity: `CaseStudy:${cs.slug}`,
          message: `relatedSlugs references unknown slug "${slug}".`,
        });
      }
    }
  }

  for (const entry of getAllExperience()) {
    for (const slug of entry.relatedCaseStudySlugs ?? []) {
      if (!getAnyCaseStudyBySlug(slug)) {
        issues.push({
          severity: "error",
          entity: `Experience:${entry.slug}`,
          message: `relatedCaseStudySlugs references unknown slug "${slug}".`,
        });
      }
    }
  }

  for (const theme of getAllArchitectureThemes()) {
    for (const slug of theme.relatedCaseStudySlugs ?? []) {
      if (!getAnyCaseStudyBySlug(slug)) {
        issues.push({
          severity: "error",
          entity: `ArchitectureTheme:${theme.id}`,
          message: `relatedCaseStudySlugs references unknown slug "${slug}".`,
        });
      }
    }
  }

  for (const principle of getAllLeadershipPrinciples()) {
    if (principle.relatedCaseStudySlug && !getAnyCaseStudyBySlug(principle.relatedCaseStudySlug)) {
      issues.push({
        severity: "error",
        entity: `LeadershipPrinciple:${principle.id}`,
        message: `relatedCaseStudySlug references unknown slug "${principle.relatedCaseStudySlug}".`,
      });
    }
  }

  for (const strength of getEngineeringStrengths()) {
    if (strength.relatedCaseStudySlug && !getAnyCaseStudyBySlug(strength.relatedCaseStudySlug)) {
      issues.push({
        severity: "error",
        entity: `EngineeringStrength:${strength.id}`,
        message: `relatedCaseStudySlug references unknown slug "${strength.relatedCaseStudySlug}".`,
      });
    }
  }

  for (const highlight of getSelectedHighlights()) {
    if (highlight.relatedCaseStudySlug && !getAnyCaseStudyBySlug(highlight.relatedCaseStudySlug)) {
      issues.push({
        severity: "error",
        entity: `Highlight:${highlight.id}`,
        message: `relatedCaseStudySlug references unknown slug "${highlight.relatedCaseStudySlug}".`,
      });
    }
  }

  for (const principle of getCareerPrinciples()) {
    if (principle.relatedCaseStudySlug && !getAnyCaseStudyBySlug(principle.relatedCaseStudySlug)) {
      issues.push({
        severity: "error",
        entity: `CareerPrinciple:${principle.id}`,
        message: `relatedCaseStudySlug references unknown slug "${principle.relatedCaseStudySlug}".`,
      });
    }
  }

  for (const pattern of getArchitecturePatterns()) {
    for (const slug of pattern.relatedCaseStudySlugs ?? []) {
      if (!getAnyCaseStudyBySlug(slug)) {
        issues.push({
          severity: "error",
          entity: `ArchitecturePattern:${pattern.id}`,
          message: `relatedCaseStudySlugs references unknown slug "${slug}".`,
        });
      }
    }
    if (pattern.status === "verified" && (pattern.relatedCaseStudySlugs ?? []).length === 0) {
      issues.push({
        severity: "error",
        entity: `ArchitecturePattern:${pattern.id}`,
        message:
          'status is "verified" but relatedCaseStudySlugs is empty — a verified pattern must link at least one real case study.',
      });
    }
  }

  for (const principle of getEngineeringPrinciples()) {
    if (principle.relatedCaseStudySlug && !getAnyCaseStudyBySlug(principle.relatedCaseStudySlug)) {
      issues.push({
        severity: "error",
        entity: `EngineeringPrinciple:${principle.id}`,
        message: `relatedCaseStudySlug references unknown slug "${principle.relatedCaseStudySlug}".`,
      });
    }
  }

  for (const principle of getAIEngineeringPrinciples()) {
    if (principle.relatedCaseStudySlug && !getAnyCaseStudyBySlug(principle.relatedCaseStudySlug)) {
      issues.push({
        severity: "error",
        entity: `AIEngineeringPrinciple:${principle.id}`,
        message: `relatedCaseStudySlug references unknown slug "${principle.relatedCaseStudySlug}".`,
      });
    }
  }

  for (const area of getAIEngineeringLearningAreas()) {
    if (area.relatedCaseStudySlug && !getAnyCaseStudyBySlug(area.relatedCaseStudySlug)) {
      issues.push({
        severity: "error",
        entity: `AILearningArea:${area.id}`,
        message: `relatedCaseStudySlug references unknown slug "${area.relatedCaseStudySlug}".`,
      });
    }
    if (area.status === "applied" && !area.evidence) {
      issues.push({
        severity: "error",
        entity: `AILearningArea:${area.id}`,
        message: 'status is "applied" but `evidence` is missing.',
      });
    }
    if (area.status === "exploring" && !area.todo) {
      issues.push({
        severity: "error",
        entity: `AILearningArea:${area.id}`,
        message: 'status is "exploring" but `todo` is missing — an unverified area must say so.',
      });
    }
  }

  for (const capability of getAllEngineeringCapabilities()) {
    for (const slug of capability.relatedCaseStudySlugs ?? []) {
      if (!getAnyCaseStudyBySlug(slug)) {
        issues.push({
          severity: "error",
          entity: `EngineeringCapability:${capability.id}`,
          message: `relatedCaseStudySlugs references unknown slug "${slug}".`,
        });
      }
    }
    if (!capability.evidence || capability.evidence.trim().length === 0) {
      issues.push({
        severity: "error",
        entity: `EngineeringCapability:${capability.id}`,
        message: "Missing `evidence` — a capability without verified evidence must not be listed.",
      });
    }
    if (!capability.businessValue || capability.businessValue.trim().length === 0) {
      issues.push({
        severity: "error",
        entity: `EngineeringCapability:${capability.id}`,
        message:
          "Missing `businessValue` — capability → evidence → business value requires all three.",
      });
    }
  }

  for (const responsibility of getAllEngineeringResponsibilities()) {
    if (
      responsibility.relatedCaseStudySlug &&
      !getAnyCaseStudyBySlug(responsibility.relatedCaseStudySlug)
    ) {
      issues.push({
        severity: "error",
        entity: `EngineeringResponsibility:${responsibility.id}`,
        message: `relatedCaseStudySlug references unknown slug "${responsibility.relatedCaseStudySlug}".`,
      });
    }
  }

  for (const method of getContactMethods()) {
    if (!method.href && !method.todo) {
      issues.push({
        severity: "error",
        entity: `ContactMethod:${method.id}`,
        message: "Missing both `href` and `todo` — an unverified channel must say so.",
      });
    }
  }

  for (const link of getSocialPresenceLinks()) {
    if (link.status === "verified" && !link.href) {
      issues.push({
        severity: "error",
        entity: `SocialPresence:${link.id}`,
        message: 'status is "verified" but `href` is missing.',
      });
    }
    if (link.status === "planned" && !link.todo) {
      issues.push({
        severity: "error",
        entity: `SocialPresence:${link.id}`,
        message: 'status is "planned" but `todo` is missing.',
      });
    }
  }

  for (const faq of getHubFaqItems()) {
    if (!faq.answer || faq.answer.trim().length === 0) {
      issues.push({
        severity: "error",
        entity: `HubFAQ:${faq.id}`,
        message: "FAQ answer is empty — only verified answers may be listed.",
      });
    }
  }

  return issues;
}

/** Engineering Showcase (Phase 11) — every curated slug must resolve to
 * a real, existing `CaseStudy`, and the list itself must not repeat a
 * slug (each of the ten projects should appear as exactly one story). */
function checkShowcaseSlugs(): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const seen = new Map<string, number>();

  for (const slug of SHOWCASE_SLUGS) {
    seen.set(slug, (seen.get(slug) ?? 0) + 1);
    if (!getAnyCaseStudyBySlug(slug)) {
      issues.push({
        severity: "error",
        entity: `Showcase:${slug}`,
        message: `SHOWCASE_SLUGS references unknown slug "${slug}" — no matching CaseStudy exists.`,
      });
    }
  }

  for (const [slug, count] of seen) {
    if (count > 1) {
      issues.push({
        severity: "error",
        entity: `Showcase:${slug}`,
        message: `SHOWCASE_SLUGS lists "${slug}" ${count} times — each curated project must appear once.`,
      });
    }
  }

  return issues;
}

/** Technical Leadership (Phase 12) — every id in
 * `FEATURED_LEADERSHIP_DECISION_IDS` must resolve to a real
 * `ArchitectureDecisionRecord` (same shape of check as
 * `checkShowcaseSlugs` above, scaled to a two-item list). */
function checkFeaturedLeadershipDecisions(): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const resolved = new Set(getFeaturedLeadershipDecisions().map((record) => record.id));

  for (const id of FEATURED_LEADERSHIP_DECISION_IDS) {
    if (!resolved.has(id)) {
      issues.push({
        severity: "error",
        entity: `Leadership:${id}`,
        message: `FEATURED_LEADERSHIP_DECISION_IDS references unknown decision record "${id}" — no matching ArchitectureDecisionRecord exists.`,
      });
    }
  }

  return issues;
}

/** Capability Matrix (Phase 14) — every id in
 * `FEATURED_CAPABILITY_DECISION_IDS` must resolve to a real
 * `ArchitectureDecisionRecord`, and the list itself must not overlap
 * Leadership's featured set (the two pages deliberately feature
 * different ADRs so they don't read as copies). */
function checkFeaturedCapabilityDecisions(): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const resolved = new Set(getFeaturedCapabilityDecisions().map((record) => record.id));
  const leadershipIds = new Set(FEATURED_LEADERSHIP_DECISION_IDS);

  for (const id of FEATURED_CAPABILITY_DECISION_IDS) {
    if (!resolved.has(id)) {
      issues.push({
        severity: "error",
        entity: `Capability:${id}`,
        message: `FEATURED_CAPABILITY_DECISION_IDS references unknown decision record "${id}" — no matching ArchitectureDecisionRecord exists.`,
      });
    }
    if (leadershipIds.has(id)) {
      issues.push({
        severity: "error",
        entity: `Capability:${id}`,
        message: `FEATURED_CAPABILITY_DECISION_IDS overlaps Leadership's featured set ("${id}") — the two pages must feature different ADRs.`,
      });
    }
  }

  return issues;
}

/** Professional Hub (Phase 15) — resume download must not claim ready
 * without a path; recruiter-resource hrefs must be internal absolute
 * paths (start with `/`). Contact/social/FAQ rules live in
 * `checkBrokenRelations` above. */
function checkProfessionalHub(): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const resume = getResumeArtifact();

  if (resume.ready && !resume.pdfPath) {
    issues.push({
      severity: "error",
      entity: "ResumeArtifact",
      message: "`ready` is true but `pdfPath` is empty — download would 404.",
    });
  }

  if (!resume.ready && resume.lastUpdated) {
    issues.push({
      severity: "warning",
      entity: "ResumeArtifact",
      message:
        "`lastUpdated` is set while `ready` is false — confirm the PDF is actually published before dating it.",
    });
  }

  for (const resource of getRecruiterResources()) {
    if (!resource.href.startsWith("/")) {
      issues.push({
        severity: "error",
        entity: `RecruiterResource:${resource.id}`,
        message: `href "${resource.href}" must be an internal path starting with /.`,
      });
    }
  }

  return issues;
}

/** Content Integrity — every technology slug must be unique (Technology
 * catalog is derived, but a duplicate technology *name* in two
 * `techCategories` entries would silently collide). */
function checkDuplicateTechnologySlugs(): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const seen = new Map<string, number>();
  for (const technology of getAllTechnologies()) {
    seen.set(technology.slug, (seen.get(technology.slug) ?? 0) + 1);
  }
  for (const [slug, count] of seen) {
    if (count > 1) {
      issues.push({
        severity: "error",
        entity: `Technology:${slug}`,
        message: `Technology slug "${slug}" appears in ${count} categories in tech-ecosystem.ts.`,
      });
    }
  }
  return issues;
}

/** Missing Metadata Detection (warning, not error) — a `stack` item that
 * doesn't resolve to a Technology catalog entry. Intentionally a
 * *warning*: some `stack` items are architectural patterns
 * (Microservices, PWA) deliberately excluded from the Technology
 * catalog (see `@/content/impact/tech-ecosystem.ts`), so this can have
 * expected, permanent entries — it exists to catch a genuinely new,
 * uncategorized technology being added to a case study without also
 * being added to `techCategories`. */
function checkUnresolvedStackItems(): ContentIssue[] {
  const issues: ContentIssue[] = [];
  for (const cs of getAllProjectCaseStudies()) {
    const resolved = new Set(resolveTechnologySlugs(cs.stack));
    for (const item of cs.stack ?? []) {
      const slug = item
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (!resolved.has(slug)) {
        issues.push({
          severity: "warning",
          entity: `CaseStudy:${cs.slug}`,
          message: `Stack item "${item}" has no matching Technology catalog entry (either add it to techCategories, or confirm it's an architectural pattern, not a technology).`,
        });
      }
    }
  }
  return issues;
}

export function validateContent(): ContentIssue[] {
  return [
    ...checkDuplicateSlugs(),
    ...checkRequiredCaseStudyFields(),
    ...checkBrokenRelations(),
    ...checkShowcaseSlugs(),
    ...checkFeaturedLeadershipDecisions(),
    ...checkFeaturedCapabilityDecisions(),
    ...checkProfessionalHub(),
    ...checkDuplicateTechnologySlugs(),
    ...checkUnresolvedStackItems(),
  ];
}
