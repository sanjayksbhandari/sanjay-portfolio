import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MaintenanceScreen } from "@/components/feedback/MaintenanceScreen";
import { OfflineBanner } from "@/components/feedback/OfflineBanner";
import { site, maintenanceMode } from "@/config/site";
import { personJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { MotionProvider } from "@/providers/MotionProvider";
import { AnalyticsProvider } from "@/providers/AnalyticsProvider";
import { Toaster } from "@/components/feedback/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The home page (`src/app/page.tsx`) is the one route that has no
// `generateMetadata`/`buildMetadata` call of its own — every other route
// goes through `buildMetadata()` (docs/phase-3-application-shell/03-seo-
// architecture.md), which sets `alternates.canonical`/`openGraph`/
// `twitter`/`robots` per page. This root export is what the home page
// actually renders with, so it needs the same fields set directly rather
// than silently missing them (closes a real, previously-shipped gap: the
// home page had no `<link rel="canonical">` at all until this phase).
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.description,
    url: site.url,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.description,
  },
};

/**
 * Safe Area Support (docs/phase-3-application-shell/04-layout-strategy.md):
 * `viewportFit: "cover"` is what makes `env(safe-area-inset-*)` resolve to
 * non-zero values on notched/home-indicator devices at all — without it
 * every `.safe-top`/`.safe-bottom` in globals.css is a silent no-op.
 *
 * `colorScheme`/`themeColor` are set per color-scheme media query (not a
 * single static value) so the browser's own UI (native form controls,
 * and on mobile the address-bar/status-bar chrome) matches the resolved
 * theme immediately on load — one more surface, beyond the page content
 * itself, where a wrong-theme flash was possible (docs/phase-3-
 * application-shell/06-theme-architecture.md "No flashing").
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#121316" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Next.js App Router: pair CSS `scroll-behavior: smooth` with this
      // attribute so route transitions do not warn / fight native scroll
      // restoration during client navigations.
      data-scroll-behavior="smooth"
      // suppressHydrationWarning is required by next-themes: it sets the
      // `class` attribute on <html> before hydration (via an inline
      // script) to avoid a flash of the wrong theme, which otherwise
      // trips React's server/client markup-mismatch warning for this one
      // attribute. Nothing else on this element is allowed to differ
      // between server and client render.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-neutral-0 flex min-h-full flex-col text-neutral-800">
        <ThemeProvider>
          <MotionProvider>
            <AnalyticsProvider>
              <a href="#main-content" className="skip-link">
                Skip to content
              </a>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
              />
              <SiteHeader />
              {/*
                Future Maintenance Mode (docs/phase-3-application-shell/01
                "Global Experience"): header/footer stay mounted so the
                site never looks broken, only the page content swaps.
                `maintenanceMode` is a static `false` today.
              */}
              <main id="main-content" className="flex-1">
                {maintenanceMode ? <MaintenanceScreen /> : children}
              </main>
              <SiteFooter />
              <Toaster />
              <OfflineBanner />
            </AnalyticsProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
