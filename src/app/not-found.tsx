import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * 404 — Global Experience (docs/phase-3-application-shell/01-application-
 * shell.md). Rendered automatically by Next.js for any unmatched route, or
 * explicitly via `notFound()` (already used by `case-studies/[slug]`).
 *
 * Deliberately generic infrastructure copy only — no portfolio content, no
 * invented links beyond the two that always exist (home, case studies).
 * `noindex` because a 404 has nothing worth ranking.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section
      containerWidth="content"
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <p className="font-mono text-sm text-neutral-600">404</p>
      <SectionHeading
        level={1}
        title="Page not found"
        className="mt-4 max-w-md text-center [&_h1]:mx-auto"
      />
      <Text variant="lead" className="mx-auto mt-4 max-w-md text-center">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </Text>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/" variant="primary">
          Back to home
        </Button>
        <Button href="/case-studies" variant="secondary">
          View case studies
        </Button>
      </div>
    </Section>
  );
}
