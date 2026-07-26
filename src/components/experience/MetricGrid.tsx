import type { Metric } from "@/types/content";
import { Stat } from "@/components/ui/Stat";

/**
 * Experience Framework — Metric Grid. Moved verbatim from Phase 6's
 * `MetricsGrid` (renamed to match this framework's naming — see
 * docs/phase-8-experience-framework/00-README.md). Composes the
 * existing `Stat` primitive (Phase 2) rather than a new number/label
 * treatment — the structured counterpart to prose outcome statements,
 * for any section (Case Study outcomes, a future Resume "by the
 * numbers" block, …) with facts expressible as a single number + label
 * without editorializing.
 */
export function MetricGrid({ metrics }: { metrics?: Metric[] | null }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {metrics.map((metric, i) => (
        <Stat key={i} value={metric.value} label={metric.label} />
      ))}
    </div>
  );
}
