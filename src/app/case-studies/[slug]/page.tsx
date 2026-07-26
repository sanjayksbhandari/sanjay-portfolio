import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/features/case-studies/CaseStudyDetail";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";
import { site } from "@/config/site";

export function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return buildMetadata({
    title: caseStudy.name,
    description: caseStudy.oneLiner,
    path: `/case-studies/${caseStudy.slug}`,
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const related = (caseStudy.relatedSlugs ?? [])
    .map((relatedSlug) => getCaseStudyBySlug(relatedSlug))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  const allCaseStudies = getAllCaseStudies();
  const index = allCaseStudies.findIndex((cs) => cs.slug === caseStudy.slug);
  const previous = index > 0 ? allCaseStudies[index - 1] : null;
  const next = index >= 0 && index < allCaseStudies.length - 1 ? allCaseStudies[index + 1] : null;

  // Single trail drives both the visual breadcrumb and its JSON-LD twin —
  // see src/lib/seo/breadcrumbs.ts.
  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "Case Studies", href: "/case-studies" },
    { name: caseStudy.name, href: `/case-studies/${caseStudy.slug}` },
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
              headline: caseStudy.name,
              description: caseStudy.oneLiner,
              url: `${site.url}/case-studies/${caseStudy.slug}`,
              keywords: caseStudy.stack ?? undefined,
            })
          ),
        }}
      />

      <CaseStudyDetail
        caseStudy={caseStudy}
        basePath="/case-studies"
        breadcrumbItems={visualItems}
        related={related}
        previous={previous}
        next={next}
      />
    </>
  );
}
