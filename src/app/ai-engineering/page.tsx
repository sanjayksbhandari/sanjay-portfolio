import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  TableOfContents,
  StickySectionNav,
  SectionHeader,
  FactCard,
  Callout,
  BackToTop,
} from "@/components/experience";
import { DocumentationLayout } from "@/components/experience/layouts/DocumentationLayout";
import { TechnologyRelationshipDiagram } from "@/components/features/architecture/TechnologyRelationshipDiagram";
import { AIProjectCard } from "@/components/features/ai-engineering/AIProjectCard";
import { AITechnologyFilterBar } from "@/components/features/ai-engineering/AITechnologyFilterBar";
import { Badge } from "@/components/ui/Badge";
import {
  getAllPersonalProjects,
  getAIInnovationTimeline,
  getAIStackByCategory,
  getAIProjectTechnologyFacets,
  getAIEngineeringPrinciples,
  getAIEngineeringLearningAreas,
} from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "AI Engineering & Innovation Lab",
  description:
    "I extend 17+ years of enterprise Java discipline into prompt engineering, retrieval-augmented generation, and LangChain — seven personal, solo-built resume/hiring projects, with what's still just curiosity marked as clearly as what's actually shipped.",
  path: "/ai-engineering",
});

const pageSections = [
  { id: "innovation-timeline", title: "Innovation Timeline" },
  { id: "ai-projects", title: "AI Projects" },
  { id: "ai-technology-stack", title: "AI Technology Stack" },
  { id: "ai-engineering-principles", title: "AI Engineering Principles" },
  { id: "learning-experimentation", title: "Learning & Experimentation" },
];

export default function AIEngineeringPage() {
  const projects = getAllPersonalProjects();
  const innovationStages = getAIInnovationTimeline();
  const stackCategories = getAIStackByCategory();
  const technologyFacets = getAIProjectTechnologyFacets();
  const principles = getAIEngineeringPrinciples();
  const learningAreas = getAIEngineeringLearningAreas();

  const filterableProjects = projects.map((cs) => ({
    slug: cs.slug,
    technologies: cs.stack ?? [],
  }));

  const appliedAreas = learningAreas.filter((area) => area.status === "applied");
  const exploringAreas = learningAreas.filter((area) => area.status === "exploring");

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "AI Engineering", href: "/ai-engineering" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {projects.map((cs) => (
        <script
          key={cs.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              articleJsonLd({
                headline: cs.name,
                description: cs.oneLiner,
                url: `${site.url}/ai-engineering#${cs.slug}`,
                keywords: cs.stack ?? undefined,
              })
            ),
          }}
        />
      ))}

      <DocumentationLayout family="ai" nav={<StickySectionNav items={pageSections} />}>
        <PageHero
          breadcrumbItems={visualItems}
          kicker="AI Engineering & Innovation Lab"
          title="The bridge between enterprise Java and AI-native building."
          intro="Seven personal resume/hiring-tooling projects — solo-built, not enterprise deliverables — extending backend engineering into prompt engineering, RAG, and LangChain."
          meta={[
            `${projects.length} personal AI projects`,
            "Solo-built, not enterprise production",
          ]}
        />

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
          <FactCard label="Personal AI projects" value={String(projects.length)} />
          <FactCard label="Applied in shipped work" value={String(appliedAreas.length)} />
          <FactCard label="Still exploring" value={String(exploringAreas.length)} />
        </div>

        <div className="lg:hidden">
          <TableOfContents items={pageSections} />
        </div>

        {/* 1. Innovation Timeline ------------------------------------------------ */}
        <section id="innovation-timeline" className="scroll-anchor mt-16">
          <SectionHeader sectionId="innovation-timeline" title="Innovation Timeline" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            No AI project below carries a verified date, so this is a conceptual progression — the
            same &ldquo;widely-recognized shape, verified technology at each layer&rdquo; treatment
            the Architecture Gallery already uses for its own Java-backend layering — rather than a
            dated career timeline.
          </p>
          <TechnologyRelationshipDiagram stages={innovationStages} />
        </section>

        {/* 2. AI Projects ---------------------------------------------------------- */}
        <section id="ai-projects" className="scroll-anchor mt-16">
          <SectionHeader sectionId="ai-projects" title="AI Projects" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Every project below was designed, built, and shipped by one person — not an enterprise
            deliverable. What varies between them is how deeply each one is documented here; where
            that&rsquo;s still thin, the card says so rather than filling the gap.
          </p>

          <div className="mt-8">
            <AITechnologyFilterBar technologies={technologyFacets} projects={filterableProjects} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {projects.map((cs) => (
              <AIProjectCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </section>

        {/* 3. AI Technology Stack --------------------------------------------------- */}
        <section id="ai-technology-stack" className="scroll-anchor mt-16">
          <SectionHeader sectionId="ai-technology-stack" title="AI Technology Stack" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Grouped by the same seven categories most AI-engineering stacks get organized by. Only
            technologies verified in one of the seven projects&rsquo; own stack appear as badges
            below — a category with nothing verified yet says so instead of being dropped, so the
            shape of what&rsquo;s confirmed and what isn&rsquo;t stays visible.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stackCategories
              .filter((category) => category.technologies.length > 0)
              .map((category) => (
                <div
                  key={category.id}
                  id={`ai-stack-${category.id}`}
                  className="scroll-anchor surface p-5"
                >
                  <p className="type-h4">{category.label}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <Badge key={tech} tone="accent">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* 4. AI Engineering Principles ----------------------------------------------- */}
        <section id="ai-engineering-principles" className="scroll-anchor mt-16">
          <SectionHeader sectionId="ai-engineering-principles" title="AI Engineering Principles" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Two maxims, each tied to one already-verified project — not six, because only two of the
            commonly-cited AI engineering principles are actually reflected in shipped work today.
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
                    href={`/ai-engineering/${principle.relatedCaseStudySlug}`}
                    className="text-accent-600 mt-3 inline-block text-sm font-medium"
                  >
                    Read the case study →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
          <Callout tone="note" title="Named but not included" className="mt-8 max-w-2xl">
            Human-in-the-loop review, responsible-AI safeguards, formal prompt evaluation, and
            AI-specific observability are all common AI-engineering principles — none of them are
            reflected in verified work yet, so none are listed above as if they were.
          </Callout>
        </section>

        {/* 5. Learning & Experimentation ------------------------------------------------ */}
        <section id="learning-experimentation" className="scroll-anchor mt-16">
          <SectionHeader sectionId="learning-experimentation" title="Learning & Experimentation" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            What&rsquo;s actually been applied in shipped, personal work, and what&rsquo;s just an
            area of continued interest — kept as two distinct lists rather than one, so curiosity
            never reads as production experience.
          </p>

          <div className="mt-8">
            <p className="type-label-muted">Applied</p>
            <ul className="mt-3 space-y-4">
              {appliedAreas.map((area) => (
                <li key={area.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <Badge tone="accent">{area.label}</Badge>
                  <span className="text-sm leading-relaxed text-neutral-600">{area.evidence}</span>
                  {area.relatedCaseStudySlug ? (
                    <Link
                      href={`/ai-engineering/${area.relatedCaseStudySlug}`}
                      className="text-accent-600 text-sm font-medium"
                    >
                      See it →
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <p className="type-label-muted">Exploring — not yet verified in shipped work</p>
            <ul className="mt-3 space-y-3">
              {exploringAreas.map((area) => (
                <li key={area.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <Badge>{area.label}</Badge>
                  {area.todo ? (
                    <span className="text-sm leading-relaxed text-neutral-600">{area.todo}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <BackToTop />
      </DocumentationLayout>
    </>
  );
}
