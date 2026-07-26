import type { Metric } from "@/types/content";
import { SectionHeader } from "@/components/experience/SectionHeader";
import { MetricGrid } from "@/components/experience/MetricGrid";

/** Section 18 — Engineering Outcomes. Structured `metrics` (if any)
 * render above the prose bullets via `MetricsGrid`. */
export function OutcomeCard({
  id,
  title = "Engineering Outcomes",
  level = 2,
  outcomes,
  metrics,
}: {
  id: string;
  title?: string;
  level?: 2 | 3;
  outcomes?: string[] | null;
  metrics?: Metric[] | null;
}) {
  const hasOutcomes = Boolean(outcomes && outcomes.length > 0);
  const hasMetrics = Boolean(metrics && metrics.length > 0);
  if (!hasOutcomes && !hasMetrics) return null;

  return (
    <section id={id} className="scroll-anchor mt-12">
      <SectionHeader sectionId={id} title={title} level={level} />
      <MetricGrid metrics={metrics} />
      {hasOutcomes ? (
        <ul className={hasMetrics ? "mt-6 space-y-2" : "mt-4 space-y-2"}>
          {(outcomes ?? []).map((line, i) => (
            <li key={i} className="flex gap-2 text-base leading-relaxed text-neutral-600">
              <span
                className="bg-accent-600 mt-2 h-1 w-1 shrink-0 rounded-full"
                aria-hidden="true"
              />
              {line}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
