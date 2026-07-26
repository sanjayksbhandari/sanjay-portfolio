import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

/**
 * Experience Framework — Summary Card. A compact, scannable panel for a
 * small set of key facts about the page's subject — the generic
 * building block a page-specific "metadata panel" (e.g. Phase 6's
 * `MetadataPanel`, mapping a Case Study's own fields) can be built on,
 * without every page needing its own bordered-box implementation. Kept
 * as a thin layout shell (label + value grid) rather than merging with
 * `MetadataPanel` itself — `MetadataPanel`'s field mapping is genuinely
 * Case-Study-specific business logic, not presentation, and stays in
 * `features/case-studies`.
 */
export function SummaryCard({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Card>
      {title ? <p className="text-sm font-medium text-neutral-800">{title}</p> : null}
      <dl className={title ? "mt-4 space-y-3" : "space-y-3"}>{children}</dl>
    </Card>
  );
}

export function SummaryCardRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <dt className="text-neutral-600">{label}</dt>
      <dd className="text-right font-medium text-neutral-800">{value}</dd>
    </div>
  );
}
