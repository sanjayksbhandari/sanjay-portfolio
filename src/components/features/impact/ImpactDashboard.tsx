import { getTechnologyCategories } from "@/content-engine";
import { Divider } from "@/components/ui/Divider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EngineeringMetrics } from "./EngineeringMetrics";
import { EngineeringDomains } from "./EngineeringDomains";
import { TechnologyEcosystem } from "./TechnologyEcosystem";
import { EngineeringStrengths } from "./EngineeringStrengths";
import { CareerSnapshot } from "./CareerSnapshot";
import { SelectedHighlights } from "./SelectedHighlights";

/**
 * Impact Dashboard (Phase 5 — docs/phase-5-impact-dashboard/00-README.md).
 * The home page's "executive summary": one section, six panels, meant to
 * be read like a dashboard rather than six separate homepage sections —
 * hence subtle `Divider`s between panels instead of each panel getting
 * its own bordered `Section` (the treatment the rest of the home page
 * uses between genuinely distinct sections).
 */
export function ImpactDashboard() {
  const techCategories = getTechnologyCategories();

  return (
    <div>
      <SectionHeading
        kicker="Impact Dashboard"
        title="Why this is worth 20 seconds of your time."
        intro="A CTO-level summary: verified scale, domains, technology, and outcomes — no filler, no unverified claims."
      />
      <div className="mt-12 space-y-14">
        <EngineeringMetrics />
        <Divider />
        <EngineeringDomains />
        <Divider />
        <TechnologyEcosystem categories={techCategories} />
        <Divider />
        <EngineeringStrengths />
        <Divider />
        <CareerSnapshot />
        <Divider />
        <SelectedHighlights />
      </div>
    </div>
  );
}
