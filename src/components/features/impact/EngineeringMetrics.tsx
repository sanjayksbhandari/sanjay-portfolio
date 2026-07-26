import { Stat } from "@/components/ui/Stat";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";

// Impact Dashboard Block 1 — Engineering Impact
// (docs/phase-5-impact-dashboard/03-motion-and-accessibility.md).
//
// Deliberately a *different* six metrics than the Hero's four, not the
// same four repeated immediately below it — see docs/phase-5-impact-
// dashboard/01 for the reasoning. `Stat` (unanimated) + `Stagger`, same
// as the Hero — no `Counter`/count-up here either, for the same reason
// documented in Phase 4.
const metrics = [
  { value: site.yearsExperience, label: "Years of experience" },
  { value: "16", label: "Microservices in one production platform" },
  { value: "99.9%", label: "Uptime, Enterprise Exchange Platform" },
  { value: "5–7", label: "Developers mentored directly" },
  { value: "<50ms", label: "P95 latency, Beckn Protocol adapter" },
  { value: "30%", label: "MTTR reduction, InterGlobe production support" },
] as const;

export function EngineeringMetrics() {
  return (
    <div>
      <SectionHeading level={3} title="Engineering Impact" />
      <Stagger
        className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6"
        itemCount={metrics.length}
      >
        {metrics.map((metric) => (
          <StaggerItem key={metric.label}>
            <Stat value={metric.value} label={metric.label} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
