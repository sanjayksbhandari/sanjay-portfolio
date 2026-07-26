import type { DecisionRecord } from "@/types/content";
import { SectionHeader } from "@/components/experience/SectionHeader";
import { DecisionCard } from "@/components/experience/DecisionCard";

/** Section 9 — Engineering Decisions. Each entry renders via the
 * Experience Framework's `DecisionCard` ("Decision Card" in the Phase 8
 * brief's naming — moved from Phase 6's case-study-only
 * `DecisionRecordBlock`, unchanged). */
export function EngineeringDecisionsSection({
  id,
  level = 2,
  decisions,
}: {
  id: string;
  level?: 2 | 3;
  decisions?: DecisionRecord[] | null;
}) {
  if (!decisions || decisions.length === 0) return null;

  return (
    <section id={id} className="scroll-anchor mt-12">
      <SectionHeader sectionId={id} title="Engineering Decisions" level={level} />
      <div className="mt-4 space-y-6">
        {decisions.map((decision, i) => (
          <DecisionCard key={i} decision={decision} />
        ))}
      </div>
    </section>
  );
}
