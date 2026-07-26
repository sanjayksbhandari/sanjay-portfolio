import { Section } from "@/components/layout/Section";
import { Text } from "@/components/typography/Text";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Future Maintenance Mode (docs/phase-3-application-shell/01-application-
 * shell.md "Global Experience"). Rendered by `src/app/layout.tsx` in place
 * of `{children}` whenever `config/site.ts`'s `maintenanceMode` flag is
 * `true`. Deliberately generic — no invented ETA, no business content —
 * since the real message (if this is ever switched on) would be written
 * at that time, not guessed now.
 */
export function MaintenanceScreen() {
  return (
    <Section
      containerWidth="content"
      className="flex min-h-[70vh] flex-col items-center justify-center text-center"
    >
      <p className="font-mono text-sm text-neutral-600">Maintenance</p>
      <SectionHeading
        level={1}
        title="Back shortly"
        className="mt-4 max-w-md text-center [&_h1]:mx-auto"
      />
      <Text variant="lead" className="mx-auto mt-4 max-w-md text-center">
        This site is undergoing scheduled maintenance. Please check back soon.
      </Text>
    </Section>
  );
}
