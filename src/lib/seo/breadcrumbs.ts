import { site } from "@/config/site";
import { breadcrumbJsonLd } from "./jsonld";

export interface BreadcrumbTrailItem {
  name: string;
  /** Always the real path for this crumb, including the current/last page. */
  href: string;
}

/**
 * Breadcrumb Framework (docs/phase-3-application-shell/03-seo-
 * architecture.md). One trail, written once, drives both outputs:
 *
 * - `visualItems` → `<Breadcrumbs items={visualItems} />` (the last item's
 *   `href` is stripped so it renders as the current, non-linked page)
 * - `jsonLd` → a ready-to-serialize `BreadcrumbList` schema, with every
 *   crumb — including the current page — resolved to an absolute URL
 *
 * Before this existed, `case-studies/[slug]/page.tsx` hand-wrote the same
 * three-crumb trail twice (once with relative `href`s for the visual
 * breadcrumb, once with absolute `url`s for the JSON-LD) — a real drift
 * risk if one were updated without the other. This replaces both call
 * sites with one array.
 */
export function buildBreadcrumbTrail(items: BreadcrumbTrailItem[]) {
  const visualItems = items.map((item, index) =>
    index === items.length - 1 ? { name: item.name } : { name: item.name, href: item.href }
  );

  const jsonLd = breadcrumbJsonLd(
    items.map((item) => ({ name: item.name, url: `${site.url}${item.href}` }))
  );

  return { visualItems, jsonLd };
}
