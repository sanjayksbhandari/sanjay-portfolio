import type { NextConfig } from "next";

/**
 * Production / Launch config — Phase 16 + 17
 * (docs/phase-17-launch-readiness/01-deployment-configuration.md,
 * docs/phase-16-production-hardening/05-security-checklist.md).
 *
 * CSP remains pragmatic for next-themes. Extra script/connect hosts are
 * included for optional Vercel Analytics, GA4, and Plausible so enabling
 * those env flags does not immediately violate CSP. Tighten further with
 * nonces when middleware CSP lands.
 */
const vercelAnalytics = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1";
const analyticsVendor = process.env.NEXT_PUBLIC_ANALYTICS_VENDOR?.toLowerCase();

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "'unsafe-eval'",
  ...(vercelAnalytics ? ["https://va.vercel-scripts.com"] : []),
  ...(analyticsVendor === "ga4" ? ["https://www.googletagmanager.com"] : []),
  ...(analyticsVendor === "plausible" ? ["https://plausible.io"] : []),
];

const connectSrc = [
  "'self'",
  ...(vercelAnalytics
    ? ["https://vitals.vercel-insights.com", "https://va.vercel-scripts.com"]
    : []),
  ...(analyticsVendor === "ga4"
    ? ["https://www.google-analytics.com", "https://analytics.google.com"]
    : []),
  ...(analyticsVendor === "plausible" ? ["https://plausible.io"] : []),
];

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src ${scriptSrc.join(" ")}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      `connect-src ${connectSrc.join(" ")}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
