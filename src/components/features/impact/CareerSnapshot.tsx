import { getCareerSnapshot } from "@/content-engine";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Impact Dashboard — Career Snapshot. Only verified facts with values.
 */
export function CareerSnapshot() {
  const facts = getCareerSnapshot().filter((fact) => Boolean(fact.value));

  if (facts.length === 0) return null;

  return (
    <div>
      <SectionHeading level={3} title="Career Snapshot" />
      <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.id}>
            <dt className="type-label-muted">{fact.label}</dt>
            <dd className="mt-1 text-base text-neutral-800">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
