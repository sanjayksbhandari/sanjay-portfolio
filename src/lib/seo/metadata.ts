import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * Metadata Factory (docs/phase-3-application-shell/03-seo-architecture.md,
 * docs/phase-16-production-hardening/02-seo-report.md).
 *
 * Page `title` is the *bare* segment only (e.g. "Professional Hub").
 * The root layout's `title.template` (`%s — ${site.name}`) appends the
 * site name once. Prior to Phase 16 this factory also appended
 * ` — ${site.name}`, which composed with the template into a double
 * suffix in every page's `<title>` — fixed here.
 *
 * OpenGraph / Twitter titles are absolute strings (they do not use the
 * HTML title template), so they still include the site name once.
 */
export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${path}`;
  const absoluteTitle = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title: absoluteTitle,
      description,
      url,
      type: "website",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description,
    },
  };
}
