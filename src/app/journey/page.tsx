import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  TableOfContents,
  StickySectionNav,
  SectionHeader,
  MetricGrid,
  AchievementPanel,
  Callout,
  BackToTop,
} from "@/components/experience";
import { Badge } from "@/components/ui/Badge";
import { DocumentationLayout } from "@/components/experience/layouts/DocumentationLayout";
import { CareerTimelineEntry } from "@/components/features/journey/CareerTimelineEntry";
import { ResponsibilityEvolution } from "@/components/features/journey/ResponsibilityEvolution";
import { TechnologyEvolution } from "@/components/features/journey/TechnologyEvolution";
import {
  getAllExperienceProfiles,
  getTechnologyEvolution,
  getIndustryExperience,
  getAllProjectMetrics,
  getAllAchievements,
  getCareerPrinciples,
} from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Engineering Journey",
  description:
    "My 17+ years of Java engineering as a narrative — from Comnet Innovations and PC Solutions through TeamLease, to nearly a decade at Opal BPM progressing from Senior Java Developer into Lead Java Developer.",
  path: "/journey",
});

/** Hero copy prefers a spelled count when the verified role set is small. */
function spellCount(n: number): string {
  const words = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
  ] as const;
  return words[n] ?? String(n);
}

const pageSections = [
  { id: "timeline", title: "Career Timeline" },
  { id: "responsibility-evolution", title: "Responsibility Evolution" },
  { id: "technology-evolution", title: "Technology Evolution" },
  { id: "industries", title: "Industry Experience" },
  { id: "impact", title: "Engineering Impact" },
  { id: "principles", title: "Career Principles" },
];

export default function JourneyPage() {
  const profiles = getAllExperienceProfiles();
  const technologyEvolution = getTechnologyEvolution();
  const industries = getIndustryExperience();
  const metrics = getAllProjectMetrics();
  const achievements = getAllAchievements();
  const principles = getCareerPrinciples();
  const companyCount = new Set(profiles.map((profile) => profile.entry.company)).size;

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "Engineering Journey", href: "/journey" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <DocumentationLayout family="experience" nav={<StickySectionNav items={pageSections} />}>
        <PageHero
          breadcrumbItems={visualItems}
          kicker="Engineering Journey"
          title={`${spellCount(companyCount)} companies, one continuous line of increasing ownership.`}
          intro={`Not a resume — a short account of how my scope of work, the systems I owned, and the leadership I took on changed across ${profiles.length} verified roles over 17+ years, from Software Programmer through Senior Java Developer into Lead Java Developer at Opal BPM — where I led a team of 5–7 developers during the last five years of a 9-year, 7-month tenure.`}
          meta={[
            `${site.yearsExperience} years`,
            `${profiles.length} verified roles`,
            `${companyCount} companies`,
          ]}
        />

        <div className="lg:hidden">
          <TableOfContents items={pageSections} />
        </div>

        {/* 1. Career Timeline ------------------------------------------------ */}
        <section id="timeline" className="scroll-anchor mt-14">
          <SectionHeader sectionId="timeline" title="Career Timeline" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Oldest first — each role&rsquo;s teaser is always visible; &ldquo;Full role
            details&rdquo; expands into responsibilities, leadership, outcomes, the projects it
            produced, and its technology stack.
          </p>
          <ol className="mt-10 space-y-16">
            {profiles.map((profile) => (
              <CareerTimelineEntry key={profile.entry.slug} profile={profile} sticky />
            ))}
          </ol>
        </section>

        {/* 2. Responsibility Evolution ---------------------------------------- */}
        <section id="responsibility-evolution" className="scroll-anchor mt-16">
          <SectionHeader sectionId="responsibility-evolution" title="Responsibility Evolution" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Only the {profiles.length} job titles on verified record — shown as progression, not a
            resume list.
          </p>
          <ResponsibilityEvolution profiles={profiles} />
        </section>

        {/* 3. Technology Evolution --------------------------------------------- */}
        <section id="technology-evolution" className="scroll-anchor mt-16">
          <SectionHeader sectionId="technology-evolution" title="Technology Evolution" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Grouped by engineering concern; each group shows which role first introduced it.
          </p>
          <TechnologyEvolution categories={technologyEvolution} />
          <Callout
            tone="note"
            title="AI engineering work sits outside this timeline"
            className="mt-8"
          >
            The technologies above are only ones verified in a role&rsquo;s own case studies. The
            LangChain/RAG/Python AI-tooling work isn&rsquo;t tied to the employers above — see{" "}
            <Link href="/ai-engineering" className="text-accent-600 font-medium">
              AI Engineering
            </Link>{" "}
            for that work.
          </Callout>
        </section>

        {/* 4. Industry Experience ------------------------------------------------ */}
        <section id="industries" className="scroll-anchor mt-16">
          <SectionHeader sectionId="industries" title="Industry Experience" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Every industry tag is a direct read of a project&rsquo;s own overview — not a separately
            claimed label.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {industries.map((industry) => (
              <div key={industry.label} className="surface flex h-full flex-col p-5">
                <p className="font-medium text-neutral-800">{industry.label}</p>
                <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
                  {industry.caseStudies.map((cs) => (
                    <Link
                      key={cs.slug}
                      href={`${cs.kind === "personal" ? "/ai-engineering" : "/case-studies"}/${cs.slug}`}
                    >
                      <Badge tone="accent">{cs.name}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Engineering Impact -------------------------------------------------- */}
        <section id="impact" className="scroll-anchor mt-16">
          <SectionHeader sectionId="impact" title="Engineering Impact" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Verified metrics and achievements only — nothing here is rounded up or estimated.
          </p>
          <MetricGrid metrics={metrics} />
          <div className="mt-10">
            <AchievementPanel items={achievements} />
          </div>
        </section>

        {/* 6. Career Principles ---------------------------------------------------- */}
        <section id="principles" className="scroll-anchor mt-16">
          <SectionHeader sectionId="principles" title="Career Principles" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Six values, each backed by one specific, already-verified decision or practice above —
            not a list of adjectives.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.id} className="border-accent-600 border-l-2 pl-5">
                <p className="font-medium text-neutral-800">{principle.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {principle.evidence}
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
