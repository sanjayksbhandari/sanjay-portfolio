import type { ReactNode } from "react";
import Link from "next/link";
import type { ArchitectureDecisionRecord } from "@/content-engine";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/primitives/Accordion";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="type-label-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-neutral-700">{children}</dd>
    </div>
  );
}

/** ADR card — verified fields only; gaps omitted for recruiters. */
export function ADRCard({ record }: { record: ArchitectureDecisionRecord }) {
  return (
    <div id={record.id} className="scroll-anchor border-l-2 border-neutral-200 pl-5">
      <Accordion type="single" collapsible>
        <AccordionItem value={record.id}>
          <AccordionTrigger>{record.title}</AccordionTrigger>
          <AccordionContent>
            <p className="type-label-muted">{record.caseStudyName}</p>
            <dl className="mt-4 space-y-4">
              {record.context ? <Field label="Context">{record.context}</Field> : null}
              <Field label="Decision">{record.decision}</Field>
              <Field label="Why">{record.rationale}</Field>
              {record.alternativesConsidered && record.alternativesConsidered.length > 0 ? (
                <Field label="Alternatives considered">
                  {record.alternativesConsidered.join("; ")}
                </Field>
              ) : null}
              {record.consequences ? (
                <Field label="Consequences">{record.consequences}</Field>
              ) : null}
              {record.futureImprovements && record.futureImprovements.length > 0 ? (
                <Field label="Future improvements">{record.futureImprovements.join("; ")}</Field>
              ) : null}
            </dl>
            <Link
              href={`/case-studies/${record.caseStudySlug}`}
              className="text-accent-600 mt-5 inline-block text-sm font-medium"
            >
              Read the {record.caseStudyName} case study →
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
