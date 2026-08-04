import type { Metadata } from "next";
import { PageHero, TableOfContents, StickySectionNav, BackToTop } from "@/components/experience";
import { DocumentationLayout } from "@/components/experience/layouts/DocumentationLayout";
import { ShowcaseFilterBar } from "@/components/features/showcase/ShowcaseFilterBar";
import { EngineeringStory } from "@/components/features/showcase/EngineeringStory";
import {
  getShowcaseProjects,
  getShowcaseNeighbors,
  getShowcaseFilterFacets,
  getArchitecturePatternsForCaseStudy,
  getRelatedShowcaseProjectsByTechnology,
  buildShowcaseSearchText,
} from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: "Engineering Showcase",
  description:
    "Ten engineering stories — enterprise systems and personal AI projects, each from business problem to outcome.",
  path: "/showcase",
});

export default function EngineeringShowcasePage() {
  const projects = getShowcaseProjects();
  const { technologies, industries } = getShowcaseFilterFacets();
  const filterableStories = projects.map((cs) => ({
    slug: cs.slug,
    technologies: cs.stack ?? [],
    industries: cs.industries ?? [],
    searchText: buildShowcaseSearchText(cs),
  }));

  const pageSections = [
    { id: "filters", title: "Filter & Search" },
    ...projects.map((cs) => ({ id: cs.slug, title: cs.name })),
  ];

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "Engineering Showcase", href: "/showcase" },
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
                url: `${site.url}/showcase#${cs.slug}`,
                keywords: cs.stack ?? undefined,
              })
            ),
          }}
        />
      ))}

      <DocumentationLayout family="projects" nav={<StickySectionNav items={pageSections} />}>
        <PageHero
          breadcrumbItems={visualItems}
          kicker="Engineering Showcase"
          title="Ten engineering stories — not a project list."
          intro="Enterprise systems and personal AI projects, each walked from problem to outcome: constraints, decisions, trade-offs, and what would change next time."
          meta={[`${projects.length} projects`, "Every claim sourced from a verified case study"]}
        />

        <div className="lg:hidden">
          <TableOfContents items={pageSections} />
        </div>

        <section id="filters" className="scroll-anchor mt-8 mb-8">
          <h2 className="sr-only">Filter and search the showcase</h2>
          <ShowcaseFilterBar
            technologies={technologies}
            industries={industries}
            stories={filterableStories}
          />
        </section>

        <div id="engineering-stories">
          {projects.map((cs, index) => {
            const { previous, next } = getShowcaseNeighbors(cs.slug);
            return (
              <EngineeringStory
                key={cs.slug}
                caseStudy={cs}
                index={index}
                total={projects.length}
                relatedPatterns={getArchitecturePatternsForCaseStudy(cs.slug)}
                relatedByTechnology={getRelatedShowcaseProjectsByTechnology(cs)}
                previous={previous}
                next={next}
              />
            );
          })}
        </div>

        <BackToTop />
      </DocumentationLayout>
    </>
  );
}
