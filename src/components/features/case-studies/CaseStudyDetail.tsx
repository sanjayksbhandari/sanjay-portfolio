import Link from "next/link";
import type { CaseStudy } from "@/types/content";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { getRenderableSections } from "@/lib/case-study-sections";
import { NarrativeBlock } from "@/components/experience/NarrativeBlock";
import { TableOfContents } from "@/components/experience/TableOfContents";
import { TechnologyList } from "@/components/experience/TechnologyList";
import { TradeoffCard } from "@/components/experience/TradeoffCard";
import { Timeline } from "@/components/experience/Timeline";
import { FooterNav, type FooterNavEntry } from "@/components/experience/FooterNav";
import { CaseStudyHeader } from "./CaseStudyHeader";
import { MetadataPanel } from "./MetadataPanel";
import { RoleCard } from "./RoleCard";
import { EngineeringDecisionsSection } from "./EngineeringDecisionsSection";
import { OutcomeCard } from "./OutcomeCard";
import { LessonsLearned } from "./LessonsLearned";
import { FutureImprovements } from "./FutureImprovements";
import { ContentStatus } from "./ContentStatus";
import { RelatedProjects } from "./RelatedProjects";

export interface ProjectNavEntry {
  slug: string;
  name: string;
}

/**
 * The Engineering Case Study framework's actual template
 * (docs/phase-6-case-study-framework/00-README.md) — every project,
 * enterprise or personal, renders through this one component. The two
 * route files (`/case-studies/[slug]` and `/ai-engineering/[slug]`) are
 * thin: resolve a slug to a `CaseStudy`, compute breadcrumbs/related/
 * prev-next, and hand everything to this.
 *
 * Section order below matches the Phase 6 brief's own 1–20 numbering
 * (`src/lib/case-study-sections.ts` is the source of truth for that
 * order — keep this file's JSX order in sync with it). Every section
 * component independently no-ops when its field is empty, so this
 * function never branches on "does this project have X" itself.
 */
export function CaseStudyDetail({
  caseStudy,
  basePath,
  breadcrumbItems,
  related,
  previous,
  next,
}: {
  caseStudy: CaseStudy;
  basePath: string;
  breadcrumbItems: { name: string; href?: string }[];
  related: CaseStudy[];
  previous?: ProjectNavEntry | null;
  next?: ProjectNavEntry | null;
}) {
  const renderableSections = getRenderableSections(caseStudy);
  const indexLabel = caseStudy.kind === "personal" ? "AI Engineering" : "case studies";
  const family = caseStudy.kind === "personal" ? "ai" : "projects";

  const timelineItems = (caseStudy.timeline ?? []).map((entry, i) => ({
    id: `timeline-${i}`,
    title: entry.label,
    meta: entry.date,
  }));

  const toFooterNavEntry = (entry?: ProjectNavEntry | null): FooterNavEntry | null =>
    entry ? { href: `${basePath}/${entry.slug}`, label: entry.name } : null;

  return (
    <>
      <Section containerWidth="prose" family={family} className="pt-16 sm:pt-20">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6">
          <CaseStudyHeader caseStudy={caseStudy} />
        </div>

        <MetadataPanel caseStudy={caseStudy} />

        <TableOfContents items={renderableSections} />

        <NarrativeBlock
          id="overview"
          title="Project Overview"
          content={caseStudy.overview}
          className="mt-12"
        />
        <NarrativeBlock
          id="business-problem"
          title="Business Problem"
          content={caseStudy.businessProblem}
        />
        <RoleCard id="role" caseStudy={caseStudy} />
        <TechnologyList id="stack" stack={caseStudy.stack} />
        <NarrativeBlock
          id="system-context"
          title="System Context"
          content={caseStudy.systemContext}
        />
        <NarrativeBlock
          id="architecture"
          title="Architecture Summary"
          content={caseStudy.architectureSummary}
          emphasized
        />
        <NarrativeBlock
          id="challenges"
          title="Technical Challenges"
          content={caseStudy.technicalChallenges}
        />
        <EngineeringDecisionsSection id="decisions" decisions={caseStudy.decisions} />
        <TradeoffCard id="tradeoffs" tradeoffs={caseStudy.tradeoffs} />
        <NarrativeBlock
          id="performance"
          title="Performance Considerations"
          content={caseStudy.performanceConsiderations}
        />
        <NarrativeBlock
          id="security"
          title="Security Considerations"
          content={caseStudy.securityConsiderations}
        />
        <NarrativeBlock
          id="scalability"
          title="Scalability Considerations"
          content={caseStudy.scalabilityConsiderations}
        />
        <NarrativeBlock id="testing" title="Testing Strategy" content={caseStudy.testingStrategy} />
        <NarrativeBlock
          id="deployment"
          title="Deployment Strategy"
          content={caseStudy.deploymentStrategy}
        />
        <NarrativeBlock
          id="monitoring"
          title="Monitoring & Observability"
          content={caseStudy.monitoringAndObservability}
        />
        <NarrativeBlock
          id="business-impact"
          title="Business Impact"
          content={caseStudy.businessImpact}
        />
        <OutcomeCard
          id="outcomes"
          outcomes={caseStudy.engineeringOutcomes}
          metrics={caseStudy.metrics}
        />
        <Timeline id="timeline" title="Timeline" items={timelineItems} />
        <LessonsLearned id="lessons" lessons={caseStudy.lessonsLearned} />
        <FutureImprovements id="future" items={caseStudy.futureImprovements} />

        <ContentStatus caseStudy={caseStudy} />

        <FooterNav previous={toFooterNavEntry(previous)} next={toFooterNavEntry(next)} />
      </Section>

      <RelatedProjects projects={related} family={family} />

      <Section border containerWidth="prose" family={family} className="text-center">
        <Link href={basePath} className="text-accent-600 text-sm font-medium">
          ← Back to all {indexLabel}
        </Link>
      </Section>
    </>
  );
}
