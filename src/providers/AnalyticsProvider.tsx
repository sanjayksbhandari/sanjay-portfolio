"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { trackPageview } from "@/lib/analytics";

/**
 * Analytics Provider — Phase 3 / 16 / 17.
 *
 * - Always fires internal `trackPageview` (no-op unless vendor configured).
 * - Mounts Vercel Analytics + Speed Insights only when
 *   `NEXT_PUBLIC_VERCEL_ANALYTICS=1` (production/preview env on Vercel).
 * - GA4 / Plausible scripts are injected only when vendor + ID are set
 *   (see `GaOrPlausibleScripts` below).
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const vercelEnabled = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "1";

  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  return (
    <>
      {children}
      {vercelEnabled ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}
      <GaOrPlausibleScripts />
    </>
  );
}

function GaOrPlausibleScripts() {
  const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  const vendor = process.env.NEXT_PUBLIC_ANALYTICS_VENDOR?.toLowerCase();

  useEffect(() => {
    if (!id || typeof document === "undefined") return;

    if (vendor === "ga4") {
      if (document.getElementById("ga4-src")) return;
      const src = document.createElement("script");
      src.id = "ga4-src";
      src.async = true;
      src.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(src);
      const inline = document.createElement("script");
      inline.id = "ga4-inline";
      inline.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}', { anonymize_ip: true });
      `;
      document.head.appendChild(inline);
      return;
    }

    if (vendor === "plausible") {
      if (document.getElementById("plausible-src")) return;
      const src = document.createElement("script");
      src.id = "plausible-src";
      src.defer = true;
      src.dataset.domain = id;
      src.src = "https://plausible.io/js/script.js";
      document.head.appendChild(src);
    }
  }, [id, vendor]);

  return null;
}
