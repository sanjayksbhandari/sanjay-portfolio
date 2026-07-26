/**
 * Analytics Ready Architecture — Phase 16/17
 * (docs/phase-17-launch-readiness/05-analytics-setup.md).
 *
 * Single call-site module. Vendors:
 * - Vercel Analytics / Speed Insights: mounted from AnalyticsProvider when
 *   `NEXT_PUBLIC_VERCEL_ANALYTICS=1` (pageviews automatic; custom events
 *   via `@vercel/analytics` `track`).
 * - GA4 / Plausible: fire only when `NEXT_PUBLIC_ANALYTICS_ID` + vendor set.
 *
 * Privacy-first: no third-party network calls when flags/IDs are unset.
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean | undefined>;
}

export const AnalyticsEvents = {
  PAGEVIEW: "pageview",
  CTA_CLICK: "cta_click",
  RESUME_DOWNLOAD: "resume_download",
  COPY_EMAIL: "copy_email",
  OUTBOUND_LINK: "outbound_link",
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  ROUTE_ERROR: "route_error",
} as const;

function vendor(): string | undefined {
  return process.env.NEXT_PUBLIC_ANALYTICS_VENDOR?.toLowerCase();
}

function analyticsId(): string | undefined {
  return process.env.NEXT_PUBLIC_ANALYTICS_ID || undefined;
}

function vercelAnalyticsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1";
}

function emit(event: AnalyticsEvent) {
  const id = analyticsId();
  const v = vendor();

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event.name, event.properties ?? {});
  }

  // Vercel custom events (Web Analytics). Requires the <Analytics />
  // component mounted and the project flag enabled on Vercel.
  if (vercelAnalyticsEnabled() && typeof window !== "undefined") {
    void import("@vercel/analytics").then(({ track }) => {
      const props: Record<string, string | number | boolean> = {};
      for (const [key, value] of Object.entries(event.properties ?? {})) {
        if (value !== undefined) props[key] = value;
      }
      track(event.name, props);
    });
  }

  if (!id) return;

  if (typeof window === "undefined") return;

  if (v === "ga4") {
    const w = window as Window & {
      gtag?: (...args: unknown[]) => void;
    };
    w.gtag?.("event", event.name, event.properties ?? {});
    return;
  }

  if (v === "plausible") {
    const w = window as Window & {
      plausible?: (name: string, opts?: { props?: Record<string, unknown> }) => void;
    };
    w.plausible?.(event.name, { props: event.properties ?? {} });
    return;
  }

  // Unknown vendor + ID: refuse to send (no silent leak).
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics:unwired-vendor]", v, event.name);
  }
}

export function track(name: string, properties?: AnalyticsEvent["properties"]) {
  emit({ name, properties });
}

export function trackPageview(path: string) {
  // Vercel Analytics records pageviews automatically via <Analytics />.
  // Still emit for GA4/Plausible custom pageview parity.
  emit({ name: AnalyticsEvents.PAGEVIEW, properties: { path } });
}

export function trackCtaClick(label: string, href: string) {
  track(AnalyticsEvents.CTA_CLICK, { label, href });
}

export function trackResumeDownload(path: string) {
  track(AnalyticsEvents.RESUME_DOWNLOAD, { path });
}

export function trackCopyEmail() {
  track(AnalyticsEvents.COPY_EMAIL);
}

export function trackOutboundLink(href: string, label?: string) {
  track(AnalyticsEvents.OUTBOUND_LINK, { href, label });
}

export function trackContactFormSubmit(status: "success" | "error") {
  track(AnalyticsEvents.CONTACT_FORM_SUBMIT, { status });
}
