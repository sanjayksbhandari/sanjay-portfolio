import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * Default OpenGraph/Twitter image, generated at build time via Satori
 * (`next/og`). Closes the tracked gap noted in docs/phase-1-design-
 * system/10-seo-design-strategy.md: "every page currently shares one
 * static OG image (or none)."
 *
 * This file is the *site-wide default* — Next.js's file convention picks
 * it up automatically for any route that doesn't define its own
 * `opengraph-image`. A future content page (e.g. a case study) can add
 * its own `opengraph-image.tsx` in the same route segment to override
 * this per-page without any change here (docs/phase-3-application-shell/
 * 03-seo-architecture.md "Future Blog SEO" extension point).
 *
 * Deliberately system-font (no `next/font` — Satori needs raw font
 * bytes, not the Google Fonts loader this project already uses for the
 * live site) and monochrome — same restrained visual language as the
 * rest of the design system, not a second brand.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.title}`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px",
        backgroundColor: "#ffffff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontFamily: "monospace",
          letterSpacing: 4,
          color: "#5c5c64",
          textTransform: "uppercase",
        }}
      >
        Engineering Portfolio
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 72,
          fontWeight: 700,
          color: "#0d0d0f",
          letterSpacing: -2,
        }}
      >
        {site.name}
      </div>
      <div style={{ marginTop: 20, fontSize: 32, color: "#404046" }}>{site.title}</div>
      <div
        style={{
          marginTop: 48,
          width: 96,
          height: 6,
          backgroundColor: "#1d4ed8",
        }}
      />
    </div>,
    { ...size }
  );
}
