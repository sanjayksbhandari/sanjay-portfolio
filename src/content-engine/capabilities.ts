import type { CaseStudy, EngineeringCapability } from "@/types/content";
import { getAllEngineeringCapabilities, getAnyCaseStudyBySlug } from "./loaders";
import { getArchitectureDecisionRecords, type ArchitectureDecisionRecord } from "./architecture";
import { normalizeTechnologyName } from "./journey";

/**
 * Content Engine — Engineering Capability Matrix derivations
 * (docs/phase-14-capability-matrix/01-architecture.md). Same rule as
 * every other derivation file: nothing here authors a new fact — it
 * only computes *views* over `engineeringCapabilities` and existing
 * ADRs so `/expertise` renders this file's output rather than
 * computing it inline.
 */

// ---------------------------------------------------------------------
// Technology / search facets for the Capability Domains filter
// ---------------------------------------------------------------------

export interface CapabilityFilterFacets {
  /** Every distinct `relatedTechnologies` entry across all capabilities,
   * in first-appearance order — so a filter can never offer a choice
   * that matches zero cards. */
  technologies: string[];
}

export function getCapabilityFilterFacets(): CapabilityFilterFacets {
  const technologies: string[] = [];
  for (const capability of getAllEngineeringCapabilities()) {
    for (const tech of capability.relatedTechnologies ?? []) {
      if (!technologies.includes(tech)) technologies.push(tech);
    }
  }
  return { technologies };
}

/** The single searchable text for a capability card — name, overview,
 * evidence, business value, technologies, and related project names. */
export function buildCapabilitySearchText(capability: EngineeringCapability): string {
  const projectNames = (capability.relatedCaseStudySlugs ?? [])
    .map((slug) => getAnyCaseStudyBySlug(slug)?.name ?? "")
    .join(" ");

  return [
    capability.title,
    capability.overview,
    capability.evidence,
    capability.businessValue,
    (capability.relatedTechnologies ?? []).join(" "),
    projectNames,
  ]
    .join(" ")
    .toLowerCase();
}

export interface CapabilityFilterable {
  id: string;
  technologies: string[];
  searchText: string;
}

export function getCapabilityFilterables(): CapabilityFilterable[] {
  return getAllEngineeringCapabilities().map((capability) => ({
    id: capability.id,
    technologies: capability.relatedTechnologies ?? [],
    searchText: buildCapabilitySearchText(capability),
  }));
}

/** Resolve related case studies for a capability — personal projects
 * route to `/ai-engineering`, enterprise to `/case-studies`. */
export function getProjectsForCapability(capability: EngineeringCapability): CaseStudy[] {
  return (capability.relatedCaseStudySlugs ?? [])
    .map((slug) => getAnyCaseStudyBySlug(slug))
    .filter((cs): cs is CaseStudy => Boolean(cs));
}

// ---------------------------------------------------------------------
// Decision Areas — curated ADRs (different set from Leadership's two)
// ---------------------------------------------------------------------

/**
 * Four ADRs chosen to cover the brief's own judgment areas that have a
 * verified decision on record: Security (OAuth2 standardization),
 * Scalability/Messaging (Kafka event backbone), Maintainability
 * (Artwork platform evolution), and Incident response (direct triage
 * ownership). Deliberately *not* the same two ADRs Leadership features
 * (Exchange decomposition + Beckn state machine) — those already have
 * a worked-example home on `/leadership#decision-framework`; this page
 * links to `/architecture#decision-records` for the full nine and
 * features four different ones so the two pages don't read as copies.
 *
 * Architecture decisions and Trade-offs are covered by the Exchange
 * decomposition ADR on Leadership and the Architecture Gallery; this
 * page's intro for Decision Areas points there rather than repeating
 * that ADR a third time. Performance tuning as a *decision process*
 * has no ADR on record — marked TODO on the page.
 */
export const FEATURED_CAPABILITY_DECISION_IDS: readonly string[] = [
  "oauth2-authentication-platform-decision-0",
  "enterprise-exchange-platform-decision-1",
  "enterprise-artwork-management-platform-decision-0",
  "financial-transaction-platform-decision-0",
];

/** Judgment-area labels for the four featured ADRs — presentation
 * metadata only; the ADR content itself is unchanged. */
export const CAPABILITY_DECISION_AREA_LABELS: Record<string, string> = {
  "oauth2-authentication-platform-decision-0": "Security",
  "enterprise-exchange-platform-decision-1": "Scalability",
  "enterprise-artwork-management-platform-decision-0": "Maintainability",
  "financial-transaction-platform-decision-0": "Incident response",
};

export function getFeaturedCapabilityDecisions(): ArchitectureDecisionRecord[] {
  const all = getArchitectureDecisionRecords();
  return FEATURED_CAPABILITY_DECISION_IDS.map((id) =>
    all.find((record) => record.id === id)
  ).filter((record): record is ArchitectureDecisionRecord => Boolean(record));
}

/**
 * Capabilities that cite a given technology (normalized), for the
 * Technology Ecosystem section's "used as evidence for" cross-links —
 * so that section never lists a technology in isolation from the
 * capability it supports.
 */
export function getCapabilitiesForTechnology(technology: string): EngineeringCapability[] {
  const normalized = normalizeTechnologyName(technology);
  return getAllEngineeringCapabilities().filter((capability) =>
    (capability.relatedTechnologies ?? []).some(
      (tech) => normalizeTechnologyName(tech) === normalized
    )
  );
}
