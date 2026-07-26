import type { CaseStudy } from "@/types/content";
import type { ArchitecturePattern } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BadgeCollection } from "@/components/experience/BadgeCollection";
import { ReferencesPanel } from "@/components/experience/ReferencesPanel";
import { TodoNote } from "@/components/ui/TodoNote";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/primitives/Accordion";
import { getAnyCaseStudyBySlug } from "@/content-engine";

/**
 * Architecture Gallery — Architecture Card
 * (docs/phase-10-architecture-gallery/01-architecture.md). Always
 * visible: title, verification-status badge, and `purpose` — enough
 * for the "recruiter in five minutes" objective without expanding
 * anything. Behind "Problem, solution & trade-offs": the denser fields
 * (`problem`/`typicalSolution`/`tradeoffs`/when-(not)-to-use/related
 * technologies/related projects), using the same item-level `Accordion`
 * disclosure `CareerTimelineEntry` established for this exact shape.
 *
 * The status badge reads "Verified · production", "Verified · personal
 * project", or "Generic pattern" — resolved here (not authored per-card)
 * by checking whether every linked case study is `kind: "personal"`, so
 * a personal-project pattern can never accidentally read as enterprise
 * production experience.
 */
export function ArchitecturePatternCard({ pattern }: { pattern: ArchitecturePattern }) {
  const relatedCaseStudies = (pattern.relatedCaseStudySlugs ?? [])
    .map((slug) => getAnyCaseStudyBySlug(slug))
    .filter((cs): cs is CaseStudy => Boolean(cs));
  const isPersonalOnly =
    relatedCaseStudies.length > 0 && relatedCaseStudies.every((cs) => cs.kind === "personal");

  const statusLabel =
    pattern.status === "generic"
      ? "Generic pattern"
      : isPersonalOnly
        ? "Verified · personal project"
        : "Verified · production";

  return (
    <Card as="article" elevated id={`pattern-card-${pattern.id}`} className="scroll-anchor">
      <div className="flex items-start justify-between gap-3">
        <h4 className="type-h4">{pattern.title}</h4>
        <Badge tone={pattern.status === "verified" ? "accent" : "neutral"} className="shrink-0">
          {statusLabel}
        </Badge>
      </div>
      <p className="type-caption mt-3 leading-relaxed">{pattern.purpose}</p>

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value={pattern.id}>
          {/* h4 above (pattern title) sits under the category's h3 — this
              trigger is one level deeper than that, not a sibling of it. */}
          <AccordionTrigger level={5}>Problem, solution &amp; trade-offs</AccordionTrigger>
          <AccordionContent>
            <dl className="space-y-4">
              <div>
                <dt className="type-label-muted">Problem</dt>
                <dd className="mt-1 text-sm leading-relaxed text-neutral-700">{pattern.problem}</dd>
              </div>
              <div>
                <dt className="type-label-muted">Typical solution</dt>
                <dd className="mt-1 text-sm leading-relaxed text-neutral-700">
                  {pattern.typicalSolution}
                </dd>
              </div>
              {pattern.tradeoffs && pattern.tradeoffs.length > 0 ? (
                <div>
                  <dt className="type-label-muted">Trade-offs</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-neutral-700">
                    {pattern.tradeoffs.join(" ")}
                  </dd>
                </div>
              ) : null}
              {pattern.whenToUse && pattern.whenToUse.length > 0 ? (
                <div>
                  <dt className="type-label-muted">When to use</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-neutral-700">
                    {pattern.whenToUse.join(" ")}
                  </dd>
                </div>
              ) : null}
              {pattern.whenNotToUse && pattern.whenNotToUse.length > 0 ? (
                <div>
                  <dt className="type-label-muted">When not to use</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-neutral-700">
                    {pattern.whenNotToUse.join(" ")}
                  </dd>
                </div>
              ) : null}
            </dl>

            {pattern.relatedTechnologies && pattern.relatedTechnologies.length > 0 ? (
              <div className="mt-5">
                <p className="type-label-muted">Related technologies</p>
                <div className="mt-2">
                  <BadgeCollection items={pattern.relatedTechnologies} />
                </div>
              </div>
            ) : null}

            <ReferencesPanel
              title="Related projects"
              links={relatedCaseStudies.map((cs) => ({
                label: cs.name,
                href: `${cs.kind === "personal" ? "/ai-engineering" : "/case-studies"}/${cs.slug}`,
              }))}
            />

            {pattern.todos && pattern.todos.length > 0 ? (
              <TodoNote className="mt-5" items={pattern.todos} />
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
