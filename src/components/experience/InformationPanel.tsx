import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

/**
 * Experience Framework — Information Panel. A bordered supplementary
 * panel for facts that sit alongside the main narrative rather than
 * inside it — composes the existing `Card` primitive (Phase 2) with an
 * optional label row, rather than a new bordered-box treatment.
 * Distinct from `Callout`: a `Callout` interrupts the reading flow to
 * flag something; an `InformationPanel` sits beside it as reference
 * material (a metadata summary, a compact fact list).
 */
export function InformationPanel({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn(className)}>
      {label ? <p className="type-label-muted mb-3">{label}</p> : null}
      {children}
    </Card>
  );
}
