import Link from "next/link";
import { getSelectedHighlights } from "@/content-engine";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/primitives/Accordion";

/**
 * Impact Dashboard Block 6 — Selected Highlights. Uses the existing
 * Radix `Accordion` foundation (`src/components/primitives/Accordion.tsx`
 * — built in Phase 2, previously unused) rather than showing both
 * outcome fields open by default: the brief's own Interaction section
 * lists "Expand details" as an allowed pattern, and collapsing to just
 * the title keeps this block scannable in the "20 seconds" the brief's
 * final instruction budgets for the whole page, while the business/
 * technical split is still one click (or Enter/Space, or arrow-key
 * navigation between items — real Radix keyboard behavior, not custom
 * key handling) away for anyone going deeper.
 */
export function SelectedHighlights() {
  return (
    <div>
      <SectionHeading level={3} title="Selected Highlights" />
      <Accordion type="multiple" className="mt-8">
        {getSelectedHighlights().map((highlight) => (
          <AccordionItem key={highlight.id} value={highlight.id}>
            <AccordionTrigger>{highlight.title}</AccordionTrigger>
            <AccordionContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="type-label-muted">Business outcome</dt>
                  <dd className="mt-1.5 leading-relaxed">{highlight.businessOutcome}</dd>
                </div>
                <div>
                  <dt className="type-label-muted">Technical outcome</dt>
                  <dd className="mt-1.5 leading-relaxed">{highlight.technicalOutcome}</dd>
                </div>
              </dl>
              {highlight.relatedCaseStudySlug ? (
                <Link
                  href={`/case-studies/${highlight.relatedCaseStudySlug}`}
                  className="text-accent-600 mt-4 inline-block text-sm font-medium"
                >
                  Read the full case study →
                </Link>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
