import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  TableOfContents,
  StickySectionNav,
  SectionHeader,
  Callout,
  BackToTop,
} from "@/components/experience";
import { Divider } from "@/components/ui/Divider";
import { Badge } from "@/components/ui/Badge";
import { DocumentationLayout } from "@/components/experience/layouts/DocumentationLayout";
import { ArchitectureCategoryNav } from "@/components/features/architecture/ArchitectureCategoryNav";
import { ArchitecturePatternCard } from "@/components/features/architecture/ArchitecturePatternCard";
import { ArchitectureShowcaseEntry } from "@/components/features/architecture/ArchitectureShowcaseEntry";
import { ADRCard } from "@/components/features/architecture/ADRCard";
import { TechnologyRelationshipDiagram } from "@/components/features/architecture/TechnologyRelationshipDiagram";
import {
  getArchitecturePatternsByCategory,
  getArchitectureDecisionRecords,
  getTechnologyRelationshipChain,
  getAllArchitectureThemes,
  getEngineeringPrinciples,
  getAnyCaseStudyBySlug,
} from "@/content-engine";
import type { CaseStudy } from "@/types/content";
import type { ArchitectureDecisionRecord } from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Architecture Gallery",
  description:
    "A curated collection of architecture patterns, decisions, and system designs — drawn from verified production systems (OAuth2, a 16-service trading platform, a Beckn protocol adapter) or clearly labeled as generic engineering patterns.",
  path: "/architecture",
});

// Named systems for the "Verified Architecture Showcase" — the brief's
// own list, in this exact order. Any slug that doesn't resolve to a
// real `CaseStudy` is silently skipped (defensive; every one currently
// resolves) rather than rendering a broken entry.
const SHOWCASE_SLUGS = [
  "oauth2-authentication-platform",
  "enterprise-exchange-platform",
  "enterprise-artwork-management-platform",
  "hiringeasy",
  "rag-applications",
];

const pageSections = [
  { id: "categories", title: "Architecture Categories" },
  { id: "cards", title: "Architecture Cards" },
  { id: "showcase", title: "Verified Architecture Showcase" },
  { id: "decision-records", title: "Architecture Decision Records" },
  { id: "tech-relationships", title: "Technology Relationships" },
  { id: "principles", title: "Engineering Principles" },
];

function groupRecordsByCaseStudy(records: ArchitectureDecisionRecord[]) {
  const groups: { caseStudyName: string; records: ArchitectureDecisionRecord[] }[] = [];
  for (const record of records) {
    const existing = groups.find((g) => g.caseStudyName === record.caseStudyName);
    if (existing) {
      existing.records.push(record);
    } else {
      groups.push({ caseStudyName: record.caseStudyName, records: [record] });
    }
  }
  return groups;
}

export default function ArchitecturePage() {
  const categoryGroups = getArchitecturePatternsByCategory();
  const decisionRecords = getArchitectureDecisionRecords();
  const recordGroups = groupRecordsByCaseStudy(decisionRecords);
  const relationshipStages = getTechnologyRelationshipChain();
  const themes = getAllArchitectureThemes();
  const principles = getEngineeringPrinciples();
  const showcaseCaseStudies = SHOWCASE_SLUGS.map((slug) => getAnyCaseStudyBySlug(slug)).filter(
    (cs): cs is CaseStudy => Boolean(cs)
  );
  const totalPatterns = categoryGroups.reduce((sum, g) => sum + g.patterns.length, 0);

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "Architecture Gallery", href: "/architecture" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <DocumentationLayout family="projects" nav={<StickySectionNav items={pageSections} />}>
        <PageHero
          breadcrumbItems={visualItems}
          kicker="Architecture Gallery"
          title="How the decisions get made, not just what got built."
          intro="Not a tutorial and not documentation — a curated look at how architectural decisions actually get made: patterns organized by engineering concern, five named production systems examined in depth, the specific decisions behind them, and the principles that keep recurring. Every pattern either comes from a verified system, linked below it, or is explicitly labeled a generic pattern with no claimed production instance."
          meta={[
            `${categoryGroups.length} categories`,
            `${totalPatterns} patterns`,
            `${decisionRecords.length} decision records`,
          ]}
        />

        <div className="lg:hidden">
          <TableOfContents items={pageSections} />
        </div>

        {/* 1. Architecture Categories --------------------------------------- */}
        <section id="categories" className="scroll-anchor mt-14">
          <SectionHeader sectionId="categories" title="Architecture Categories" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Ten engineering concerns, each with at least one pattern below — grouped by what the
            pattern is for, not by which technology implements it.
          </p>
          <ArchitectureCategoryNav groups={categoryGroups} />

          {themes.length > 0 ? (
            <div className="mt-12">
              <h3 className="type-h4">Patterns that recur across categories</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                A handful of shapes show up in more than one category above — each is explored as
                individual cards and decision records elsewhere on this page.
              </p>
              <ul className="mt-4 space-y-3">
                {themes.map((theme) => (
                  <li key={theme.id} className="text-sm leading-relaxed text-neutral-700">
                    <span className="font-medium text-neutral-800">{theme.title}.</span>{" "}
                    {theme.summary}
                    {theme.relatedCaseStudySlugs && theme.relatedCaseStudySlugs.length > 0 ? (
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        {theme.relatedCaseStudySlugs.map((slug) => (
                          <Link key={slug} href={`/case-studies/${slug}`}>
                            <Badge tone="accent">{slug.replace(/-/g, " ")}</Badge>
                          </Link>
                        ))}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        {/* 2. Architecture Cards ---------------------------------------------- */}
        <section id="cards" className="scroll-anchor mt-16">
          <SectionHeader sectionId="cards" title="Architecture Cards" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Each card names a real decision behind it, or is labeled a generic pattern with no
            claimed production instance — never a blend of the two.
          </p>
          <div className="mt-10 space-y-14">
            {categoryGroups.map(({ category, patterns }, i) => (
              <div key={category.id} id={`pattern-${category.id}`} className="scroll-anchor">
                {i > 0 ? <Divider className="mb-14" /> : null}
                <h3 className="type-h4">{category.label}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  {category.description}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {patterns.map((pattern) => (
                    <ArchitecturePatternCard key={pattern.id} pattern={pattern} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Verified Architecture Showcase ------------------------------------ */}
        <section id="showcase" className="scroll-anchor mt-16">
          <SectionHeader sectionId="showcase" title="Verified Architecture Showcase" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Five named, verified systems — architecture summary, decisions, and stack from each case
            study.
          </p>
          <div className="mt-10 space-y-14">
            {showcaseCaseStudies.map((cs, i) => (
              <div key={cs.slug}>
                {i > 0 ? <Divider className="mb-14" /> : null}
                <ArchitectureShowcaseEntry caseStudy={cs} />
              </div>
            ))}
          </div>
        </section>

        {/* 4. Architecture Decision Records --------------------------------------- */}
        <section id="decision-records" className="scroll-anchor mt-16">
          <SectionHeader sectionId="decision-records" title="Architecture Decision Records" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Every decision already on record for the five case studies above, one ADR per decision —
            collapsed by default; expand any of them for context, alternatives, and consequences.
          </p>
          <div className="mt-10 space-y-10">
            {recordGroups.map(({ caseStudyName, records }) => (
              <div key={caseStudyName}>
                <p className="type-label-muted">{caseStudyName}</p>
                <div className="mt-3 space-y-3">
                  {records.map((record) => (
                    <ADRCard key={record.id} record={record} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Technology Relationships --------------------------------------------- */}
        <section id="tech-relationships" className="scroll-anchor mt-16">
          <SectionHeader sectionId="tech-relationships" title="Technology Relationships" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            A conceptual layering for a Java enterprise backend — each layer shows only the verified
            technology that actually belongs there.
          </p>
          <TechnologyRelationshipDiagram stages={relationshipStages} />
          <Callout
            tone="note"
            title="Conceptual, not a deployment diagram"
            className="mt-8 max-w-md"
          >
            This is a typical layering shape, not a literal request path — a real request
            doesn&rsquo;t necessarily pass through every layer in this order on every call.
          </Callout>
        </section>

        {/* 6. Engineering Principles ------------------------------------------------ */}
        <section id="principles" className="scroll-anchor mt-16">
          <SectionHeader sectionId="principles" title="Engineering Principles" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Five maxims, each tied to one already-verified decision that put it into practice.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.id} className="border-accent-600 border-l-2 pl-5">
                <p className="font-medium text-neutral-800">{principle.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {principle.explanation}
                </p>
                {principle.relatedCaseStudySlug ? (
                  <Link
                    href={`/case-studies/${principle.relatedCaseStudySlug}`}
                    className="text-accent-600 mt-3 inline-block text-sm font-medium"
                  >
                    Read the case study →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <BackToTop />
      </DocumentationLayout>
    </>
  );
}
