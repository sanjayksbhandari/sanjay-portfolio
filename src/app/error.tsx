"use client";

import { useEffect } from "react";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/typography/Text";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { track } from "@/lib/analytics";
import { captureException } from "@/lib/monitoring";

/**
 * Route-level error boundary (Global Experience — "500"). Next.js requires
 * this to be a Client Component and mounts it automatically for any
 * uncaught error thrown while rendering a route segment; the surrounding
 * root layout (header/footer/providers) stays mounted, only this segment
 * is replaced. `global-error.tsx` is the equivalent for errors in the root
 * layout itself, which is why the two files intentionally look similar
 * but are not the same component.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error, { boundary: "route" });
    track("route_error", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <Section
      containerWidth="content"
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <p className="font-mono text-sm text-neutral-600">500</p>
      <SectionHeading
        level={1}
        title="Something went wrong"
        className="mt-4 max-w-md text-center [&_h1]:mx-auto"
      />
      <Text variant="lead" className="mx-auto mt-4 max-w-md text-center">
        An unexpected error occurred while loading this page. It has been logged.
      </Text>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </Section>
  );
}
