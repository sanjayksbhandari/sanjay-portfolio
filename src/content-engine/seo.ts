import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import type { BaseEntity } from "@/types/entities";

/**
 * Content Engine — generic entity SEO (docs/phase-7-content-engine/
 * 04-seo-and-structured-data.md). Every entity carries an optional
 * `seo` block (`EntitySEO` — title/description/ogImage/keywords) as part
 * of `BaseEntity`; these two functions are the one place that turns that
 * block into what Next.js/schema.org actually need, by calling the
 * *existing* Phase 3 metadata factory and Phase 6 JSON-LD builders —
 * not reimplementing OpenGraph/Twitter/canonical handling a second time.
 *
 * `CaseStudy`'s own detail pages (`src/app/case-studies/[slug]/page.tsx`,
 * `src/app/ai-engineering/[slug]/page.tsx`) call `buildMetadata`/
 * `articleJsonLd` directly today rather than through this wrapper — they
 * predate this file and already do the same thing correctly; this
 * wrapper exists for entities that don't have a bespoke page-level call
 * site of their own yet (e.g. a future Publication/Presentation detail
 * page), so that one doesn't have to be invented from scratch either.
 */

export function entityMetadata(entity: BaseEntity, path: string): Metadata {
  return buildMetadata({
    title: entity.seo?.title ?? entity.title,
    description: entity.seo?.description ?? entity.description ?? entity.summary ?? "",
    path,
  });
}

export function entityJsonLd(entity: BaseEntity, url: string) {
  return articleJsonLd({
    headline: entity.seo?.title ?? entity.title,
    description: entity.seo?.description ?? entity.description ?? entity.summary ?? "",
    url,
    keywords: entity.seo?.keywords ?? entity.tags,
  });
}

export { breadcrumbJsonLd };
