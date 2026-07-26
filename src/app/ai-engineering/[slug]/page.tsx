import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/features/case-studies/CaseStudyDetail";
import { getAllPersonalProjects, getPersonalProjectBySlug } from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";
import { site } from "@/config/site";

export function generateStaticParams() {
  return getAllPersonalProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getPersonalProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.name,
    description: project.oneLiner,
    path: `/ai-engineering/${project.slug}`,
  });
}

/**
 * Personal/AI project detail page — same `CaseStudyDetail` template as
 * `/case-studies/[slug]`, mounted at the `/ai-engineering` branch so the
 * URL matches the IA these projects already live under (their index
 * page, breadcrumb, and nav item) rather than the enterprise one
 * (docs/phase-6-case-study-framework/00-README.md, "Routing Structure").
 */
export default async function AIProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPersonalProjectBySlug(slug);
  if (!project) notFound();

  const related = (project.relatedSlugs ?? [])
    .map((relatedSlug) => getPersonalProjectBySlug(relatedSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const allPersonalProjects = getAllPersonalProjects();
  const index = allPersonalProjects.findIndex((p) => p.slug === project.slug);
  const previous = index > 0 ? allPersonalProjects[index - 1] : null;
  const next =
    index >= 0 && index < allPersonalProjects.length - 1 ? allPersonalProjects[index + 1] : null;

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "AI Engineering", href: "/ai-engineering" },
    { name: project.name, href: `/ai-engineering/${project.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: project.name,
              description: project.oneLiner,
              url: `${site.url}/ai-engineering/${project.slug}`,
              keywords: project.stack ?? undefined,
            })
          ),
        }}
      />

      <CaseStudyDetail
        caseStudy={project}
        basePath="/ai-engineering"
        breadcrumbItems={visualItems}
        related={related}
        previous={previous}
        next={next}
      />
    </>
  );
}
