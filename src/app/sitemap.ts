import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllCaseStudies, getAllPersonalProjects } from "@/content-engine";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/showcase",
    "/journey",
    "/expertise",
    "/case-studies",
    "/leadership",
    "/architecture",
    "/ai-engineering",
    "/achievements",
    "/certifications",
    "/resume",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/showcase" ? 0.9 : 0.7,
  }));

  const caseStudyRoutes = getAllCaseStudies().map((cs) => ({
    url: `${site.url}/case-studies/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Phase 6 — personal/AI projects now render individual detail pages
  // through the same case-study template, at /ai-engineering/[slug].
  const aiProjectRoutes = getAllPersonalProjects().map((project) => ({
    url: `${site.url}/ai-engineering/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...aiProjectRoutes];
}
