/**
 * Launch middleware — Phase 17
 * (docs/phase-17-launch-readiness/01-deployment-configuration.md).
 *
 * Preview deployments must not be indexed. Production indexing is
 * controlled by `robots.ts` + Search Console. Domain www↔apex redirects
 * are configured on the host (Vercel Domains) — not duplicated here —
 * so a single canonical host matches `site.url`.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (process.env.VERCEL_ENV === "preview") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // Stale cache busting hint for HTML on CDN edges that respect it;
  // hashed `/_next/static` assets remain immutable via Next defaults.
  if (!request.nextUrl.pathname.startsWith("/_next")) {
    response.headers.set("X-Content-Type-Options", "nosniff");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static Next internals and common assets.
     * Security headers for every route still come from next.config.ts.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|ico)$).*)",
  ],
};
