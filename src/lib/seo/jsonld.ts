import { site } from "@/config/site";

/**
 * WebSite schema — mounted once, alongside `personJsonLd()`, in the root
 * layout (docs/phase-3-application-shell/03-seo-architecture.md). No
 * `SearchAction` (`potentialAction`) is declared: this project has no
 * search yet (see "Future Search Provider" extension point) and adding
 * one speculatively would advertise a feature that doesn't exist.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: site.url,
    sameAs: [site.social.linkedin, site.social.github].filter(Boolean),
    knowsAbout: [
      "Java",
      "Spring Boot",
      "Microservices",
      "OAuth2",
      "AWS",
      "Kafka",
      "Docker",
      "Kubernetes",
      "LangChain",
      "Retrieval-Augmented Generation",
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Also the "Project schema" for case studies/AI projects
 * (docs/phase-6-case-study-framework/05-seo-and-performance.md) —
 * `TechArticle` (a schema.org `Article` subtype for technical writing)
 * is the closest real vocabulary match for "a written case study about
 * an engineering project," which is what these pages actually are.
 * schema.org has no dedicated "project" type; inventing custom
 * `@type`/property names outside the vocabulary would make the JSON-LD
 * unparseable by real consumers, which defeats the point of structured
 * data. `keywords` is optional and, when passed, is the project's own
 * verified tech stack — never invented topic tags.
 */
export function articleJsonLd({
  headline,
  description,
  url,
  keywords,
}: {
  headline: string;
  description: string;
  url: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    url,
    author: { "@type": "Person", name: site.name },
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
  };
}
