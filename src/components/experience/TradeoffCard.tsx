import type { Tradeoff } from "@/types/content";
import { SectionHeader } from "./SectionHeader";

/**
 * Experience Framework — Trade-off Card. Generalized from Phase 6's
 * case-study-only `TradeoffCard` — same gained-vs-given-up framing, now
 * usable by any section (title is a prop instead of hardcoded
 * "Trade-offs", so a future Architecture page can label it "Design
 * trade-offs" or similar without a fork).
 */
export function TradeoffCard({
  id,
  title = "Trade-offs",
  level = 2,
  tradeoffs,
}: {
  id: string;
  title?: string;
  level?: 2 | 3;
  tradeoffs?: Tradeoff[] | null;
}) {
  if (!tradeoffs || tradeoffs.length === 0) return null;

  return (
    <section id={id} className="scroll-anchor mt-12">
      <SectionHeader sectionId={id} title={title} level={level} />
      <div className="mt-4 space-y-6">
        {tradeoffs.map((tradeoff, i) => (
          <div key={i} className="border-accent-600 border-l-2 pl-5">
            <p className="font-medium text-neutral-800">{tradeoff.title}</p>
            <p className="mt-2 text-sm text-neutral-600">
              <span className="type-label-muted">Gained — </span>
              {tradeoff.whatWeGained}
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              <span className="type-label-muted">Gave up — </span>
              {tradeoff.whatWeGaveUp}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
