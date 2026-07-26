import type { ReactNode } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BadgeCollection } from "@/components/experience/BadgeCollection";
import { CopyLinkButton } from "@/components/experience/CopyLinkButton";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/primitives/Accordion";
import { SHOWCASE_SLUGS, getAIProjectDocumentationStatus } from "@/content-engine";

const ARCHITECTURE_TEASERS: Record<string, string> = {
  "ats-resume-builder":
    "A Flask backend pairing a free resume editor and live ATS score with paid, ATS-safe PDF/DOCX/TXT exports and Stripe/Razorpay subscription billing.",
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="type-label-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-neutral-700">{children}</dd>
    </div>
  );
}

export function AIProjectCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const docStatus = getAIProjectDocumentationStatus(caseStudy);
  const architectureTeaser = ARCHITECTURE_TEASERS[caseStudy.slug];
  const isInShowcase = SHOWCASE_SLUGS.includes(caseStudy.slug);

  return (
    <Card as="article" elevated id={caseStudy.slug} className="scroll-anchor">
      <div className="flex items-start justify-between gap-3">
        <h3 className="type-h4">{caseStudy.name}</h3>
        <div className="flex shrink-0 items-center gap-2">
          <Badge>{caseStudy.status}</Badge>
          <CopyLinkButton sectionId={caseStudy.slug} />
        </div>
      </div>

      <p className="mt-3 text-base leading-relaxed text-neutral-600">{caseStudy.oneLiner}</p>

      {caseStudy.stack && caseStudy.stack.length > 0 ? (
        <div className="mt-4">
          <BadgeCollection items={caseStudy.stack} tone="accent" />
        </div>
      ) : null}

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value={caseStudy.slug}>
          <AccordionTrigger level={4}>Full project details</AccordionTrigger>
          <AccordionContent>
            <dl className="space-y-4">
              {caseStudy.businessProblem ? (
                <Field label="Problem">{caseStudy.businessProblem}</Field>
              ) : null}

              {architectureTeaser ? (
                <Field label="Architecture">
                  {architectureTeaser}{" "}
                  <Link
                    href={`/ai-engineering/${caseStudy.slug}#architecture`}
                    className="text-accent-600 font-medium"
                  >
                    Full architecture →
                  </Link>
                </Field>
              ) : caseStudy.architectureSummary ? (
                <Field label="Architecture">{caseStudy.architectureSummary}</Field>
              ) : null}

              {caseStudy.technicalChallenges ? (
                <Field label="Challenges">{caseStudy.technicalChallenges}</Field>
              ) : null}

              <Field label="Documentation">
                {docStatus.documentedSections} of {docStatus.totalSections} narrative sections
              </Field>

              {caseStudy.lessonsLearned && caseStudy.lessonsLearned.length > 0 ? (
                <Field label="Lessons Learned">
                  <ul className="space-y-1">
                    {caseStudy.lessonsLearned.map((item, i) => (
                      <li key={i}>
                        {item.lesson}
                        {item.context ? ` — ${item.context}` : ""}
                      </li>
                    ))}
                  </ul>
                </Field>
              ) : null}

              {caseStudy.futureImprovements && caseStudy.futureImprovements.length > 0 ? (
                <Field label="Future Roadmap">
                  <ul className="space-y-1">
                    {caseStudy.futureImprovements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </Field>
              ) : null}
            </dl>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                href={`/ai-engineering/${caseStudy.slug}`}
                className="text-accent-600 font-medium"
              >
                Full case study →
              </Link>
              {isInShowcase ? (
                <Link href={`/showcase#${caseStudy.slug}`} className="text-accent-600 font-medium">
                  Showcase story →
                </Link>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
