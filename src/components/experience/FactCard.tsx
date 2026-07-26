/**
 * Experience Framework — Fact Card. A single label/value pair.
 * `h-full` + min-height keep grid rows even when values wrap differently.
 */
export function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-full min-h-[5.5rem] flex-col border-t border-neutral-200 pt-3">
      <p className="type-label-muted">{label}</p>
      <p className="type-body mt-1 flex-1 text-[var(--color-text-primary)]">{value}</p>
    </div>
  );
}
