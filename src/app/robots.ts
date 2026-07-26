import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * robots.txt — Phase 3 / 17.
 * Preview deployments disallow all crawlers (defense in depth with
 * middleware `X-Robots-Tag`). Production allows indexing and points at
 * the canonical sitemap on `site.url`.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
