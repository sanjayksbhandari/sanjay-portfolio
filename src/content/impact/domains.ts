import type { EngineeringDomain } from "@/types/content";
import { expertiseGroups } from "@/content/skill-domains";
import { architectureThemes } from "@/content/architecture";

// Impact Dashboard Block 2 — Core Engineering Domains
// (docs/phase-5-impact-dashboard/02-content-sourcing.md).
//
// Deliberately *not* a second, hand-authored content set: the first six
// domains are `expertiseGroups` with their `items` (tech lists — Block
// 3's job, not this one) dropped, so the label/description here is
// word-for-word identical to `src/content/expertise.ts` and can't drift
// from it. The seventh, "Architecture & Systems Design," is the one
// synthesized entry — a one-sentence rollup of `architectureThemes`
// (already-verified cross-cutting themes) that didn't have a home on
// the previous home page at all.
export const engineeringDomains: EngineeringDomain[] = [
  ...expertiseGroups.map(({ id, label, description }) => ({
    id,
    label,
    description,
    href: "/expertise",
  })),
  {
    id: "architecture-systems-design",
    label: "Architecture & Systems Design",
    description: `${architectureThemes.length} cross-cutting architectural themes drawn directly from the case studies — service decomposition, event-driven consistency, identity/trust boundaries, and individual ownership inside team-scale systems.`,
    href: "/architecture",
  },
];
