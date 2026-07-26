import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { TodoNote } from "@/components/ui/TodoNote";
import { getAllAchievements } from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Achievements",
  description:
    "Factual, attributed achievements from nine-plus years at Opal BPM and InterGlobe Air Transport.",
  path: "/achievements",
});

export default function AchievementsPage() {
  return (
    <Section containerWidth="content" family="leadership" className="pt-16 sm:pt-20">
      <SectionHeading
        level={1}
        kicker="Achievements"
        title="Factual, not adjectival."
        intro="Each item below is tied to a specific role and system — see Case Studies for the full context behind any of these."
      />
      <div className="mt-14 space-y-4">
        {getAllAchievements().map((a) => (
          <Card key={a.id} className="flex flex-col gap-1">
            <p className="type-body text-[var(--color-text-primary)]">{a.statement}</p>
            <p className="type-caption mt-1 font-mono">{a.context}</p>
          </Card>
        ))}
      </div>
      <TodoNote
        className="mt-10"
        items={[
          {
            label:
              "Any additional independently-recognized achievements (awards, publications, speaking, OSS contributions)",
          },
        ]}
      />
    </Section>
  );
}
