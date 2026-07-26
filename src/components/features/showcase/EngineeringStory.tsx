import Link from "next/link";
import type { ArchitecturePattern, CaseStudy } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/experience/SectionHeader";
import { NarrativeBlock } from "@/components/experience/NarrativeBlock";
import { TechnologyList } from "@/components/experience/TechnologyList";
import { TradeoffCard } from "@/components/experience/TradeoffCard";
import { BadgeCollection } from "@/components/experience/BadgeCollection";
import { CopyLinkButton } from "@/components/experience/CopyLinkButton";
import { FooterNav, type FooterNavEntry } from "@/components/experience/FooterNav";
import { RoleCard } from "@/components/features/case-studies/RoleCard";
import { EngineeringDecisionsSection } from "@/components/features/case-studies/EngineeringDecisionsSection";
import { OutcomeCard } from "@/components/features/case-studies/OutcomeCard";
import { LessonsLearned } from "@/components/features/case-studies/LessonsLearned";
import { FutureImprovements } from "@/components/features/case-studies/FutureImprovements";
import { ContentStatus } from "@/components/features/case-studies/ContentStatus";
import { Icon } from "@/components/primitives/Icon";
import { ChevronDown } from "lucide-react";

/** Enterprise case studies live at `/case-studies/[slug]`, personal
 * projects at `/ai-engineering/[slug]` — same rule `CaseStudyCard` and
 * the search index already use for the same `CaseStudy.kind` field. */
function detailPathFor(caseStudy: CaseStudy): string {
  return caseStudy.kind === "personal" ? "/ai-engineering" : "/case-studies";
}

/**
 * One engineering story — Engineering Showcase, section-per-project
 * (docs/phase-11-engineering-showcase/02-content-model.md). Composes
 * only components the Case Study framework (Phase 6) and Experience
 * Framework (Phase 8) already built — nothing here is a new visual
 * treatment, just a different arrangement of the same 20-section shape
 * under this page's own titles (see that doc's field-mapping table for
 * why "Business Context" reads `systemContext`, not a duplicate of
 * "Problem Statement"'s `businessProblem`).
 *
 * The project name is this story's own `h2` — matching the Sticky Table
 * of Contents' granularity (one entry per story) — with every
 * subsection below it as a flat `h3`, including the ones nested inside
 * the native `<details>` "read the full engineering story" disclosure.
 * `<details>` is deliberately not `ExpandableDetailBlock` here: that
 * component's trigger *is* a heading (right for Lessons Learned/Future
 * Improvements as their own subsection), but this disclosure is a
 * "show more" affordance wrapping several *already-headed* subsections
 * — giving it a heading too would nest an h3 a level too deep.
 */
export function EngineeringStory({
  caseStudy,
  index,
  total,
  relatedPatterns,
  relatedByTechnology,
  previous,
  next,
}: {
  caseStudy: CaseStudy;
  index: number;
  total: number;
  relatedPatterns: ArchitecturePattern[];
  relatedByTechnology: CaseStudy[];
  previous?: CaseStudy | null;
  next?: CaseStudy | null;
}) {
  const { slug } = caseStudy;
  const detailPath = `${detailPathFor(caseStudy)}/${slug}`;
  const hasStack = Boolean(caseStudy.stack && caseStudy.stack.length > 0);

  const toFooterNavEntry = (cs?: CaseStudy | null): FooterNavEntry | null =>
    cs ? { href: `#${cs.slug}`, label: cs.name } : null;

  return (
    <article id={slug} className="scroll-anchor mt-20 first:mt-0 lg:mt-24">
      <p className="type-label-muted">
        Story {index + 1} of {total}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <h2 className="type-h2">{caseStudy.name}</h2>
        <CopyLinkButton sectionId={slug} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Badge tone="accent">{caseStudy.status}</Badge>
        {caseStudy.company ? (
          <span className="font-mono text-xs text-neutral-600">{caseStudy.company}</span>
        ) : null}
        <span className="font-mono text-xs text-neutral-500">
          {caseStudy.kind === "personal" ? "Personal project" : "Enterprise case study"}
        </span>
      </div>

      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral-600">
        {caseStudy.oneLiner}
      </p>

      <NarrativeBlock
        id={`${slug}-summary`}
        title="Project Summary"
        level={3}
        content={caseStudy.overview ?? caseStudy.oneLiner}
        className="mt-10"
      />
      <NarrativeBlock
        id={`${slug}-business-context`}
        title="Business Context"
        level={3}
        content={caseStudy.systemContext}
      />
      <NarrativeBlock
        id={`${slug}-problem`}
        title="Problem Statement"
        level={3}
        content={caseStudy.businessProblem}
      />
      <RoleCard
        id={`${slug}-responsibilities`}
        title="My Responsibilities"
        level={3}
        caseStudy={caseStudy}
      />
      <TechnologyList id={`${slug}-stack`} level={3} stack={caseStudy.stack} />

      {/* Native `<details>` — zero-JS expand/collapse, no heading of its
          own (see the file doc comment above for why). */}
      <details className="group mt-12">
        <summary className="hover:text-accent-600 flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-neutral-700 marker:content-none [&::-webkit-details-marker]:hidden">
          <Icon
            icon={ChevronDown}
            size="sm"
            className="text-neutral-500 transition-transform duration-[var(--motion-standard)] group-open:rotate-180"
          />
          Read the full engineering story
        </summary>

        <div className="timeline-rail mt-3">
          <NarrativeBlock
            id={`${slug}-architecture`}
            title="Architecture Overview"
            level={3}
            content={caseStudy.architectureSummary}
            emphasized
          />
          <NarrativeBlock
            id={`${slug}-challenges`}
            title="Engineering Challenges"
            level={3}
            content={caseStudy.technicalChallenges}
          />
          <TradeoffCard id={`${slug}-tradeoffs`} level={3} tradeoffs={caseStudy.tradeoffs} />
          <EngineeringDecisionsSection
            id={`${slug}-decisions`}
            level={3}
            decisions={caseStudy.decisions}
          />
          <NarrativeBlock
            id={`${slug}-performance`}
            title="Performance Considerations"
            level={3}
            content={caseStudy.performanceConsiderations}
          />
          <NarrativeBlock
            id={`${slug}-security`}
            title="Security Considerations"
            level={3}
            content={caseStudy.securityConsiderations}
          />
          <NarrativeBlock
            id={`${slug}-scalability`}
            title="Scalability Considerations"
            level={3}
            content={caseStudy.scalabilityConsiderations}
          />
          <NarrativeBlock
            id={`${slug}-testing`}
            title="Testing Strategy"
            level={3}
            content={caseStudy.testingStrategy}
          />
          <NarrativeBlock
            id={`${slug}-deployment`}
            title="Deployment Strategy"
            level={3}
            content={caseStudy.deploymentStrategy}
          />
          <NarrativeBlock
            id={`${slug}-business-outcome`}
            title="Business Outcome"
            level={3}
            content={caseStudy.businessImpact}
          />
          <OutcomeCard
            id={`${slug}-engineering-outcome`}
            title="Engineering Outcome"
            level={3}
            outcomes={caseStudy.engineeringOutcomes}
            metrics={caseStudy.metrics}
          />
          <LessonsLearned id={`${slug}-lessons`} level={3} lessons={caseStudy.lessonsLearned} />
          <FutureImprovements
            id={`${slug}-improve`}
            title="What I Would Improve Today"
            level={3}
            items={caseStudy.futureImprovements}
          />

          {hasStack ? (
            <section id={`${slug}-related-tech`} className="scroll-anchor mt-12">
              <SectionHeader
                sectionId={`${slug}-related-tech`}
                title="Related Technologies"
                level={3}
              />
              <div className="mt-3">
                <BadgeCollection items={caseStudy.stack ?? []} tone="accent" />
              </div>
              {relatedByTechnology.length > 0 ? (
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  Also used elsewhere in this showcase:{" "}
                  {relatedByTechnology.map((related, i) => (
                    <span key={related.slug}>
                      {i > 0 ? ", " : ""}
                      <Link href={`#${related.slug}`} className="text-accent-600 font-medium">
                        {related.name}
                      </Link>
                    </span>
                  ))}
                  .
                </p>
              ) : null}
            </section>
          ) : null}

          {relatedPatterns.length > 0 ? (
            <section id={`${slug}-related-patterns`} className="scroll-anchor mt-12">
              <SectionHeader
                sectionId={`${slug}-related-patterns`}
                title="Related Architecture Patterns"
                level={3}
              />
              <ul className="mt-4 space-y-3">
                {relatedPatterns.map((pattern) => (
                  <li key={pattern.id}>
                    <Link
                      href={`/architecture#pattern-${pattern.categoryId}`}
                      className="text-accent-600 font-medium"
                    >
                      {pattern.title}
                    </Link>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      {pattern.purpose}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <ContentStatus caseStudy={caseStudy} headingId={`${slug}-content-status-heading`} />
        </div>
      </details>

      <p className="mt-8">
        <Link href={detailPath} className="text-accent-600 text-sm font-medium">
          Read the full case study →
        </Link>
      </p>

      {previous || next ? (
        <FooterNav previous={toFooterNavEntry(previous)} next={toFooterNavEntry(next)} />
      ) : null}
    </article>
  );
}
