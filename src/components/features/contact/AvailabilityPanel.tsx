import type { AvailabilityFact } from "@/types/content";

/** Availability — verified facts only. */
export function AvailabilityPanel({ facts }: { facts: AvailabilityFact[] }) {
  const verified = facts.filter((fact) => Boolean(fact.value));
  if (verified.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {verified.map((fact) => (
        <div key={fact.id} id={`availability-${fact.id}`} className="scroll-anchor surface p-5">
          <dt className="type-label-muted">{fact.label}</dt>
          <dd className="mt-2 text-base text-neutral-800">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
