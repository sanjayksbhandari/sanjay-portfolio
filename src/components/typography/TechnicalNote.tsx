import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Technical Notes role (docs/phase-1-design-system/04) — an uppercase,
 * tracked mono label followed by body copy. This is the generic
 * primitive for that role; `DecisionCard`
 * (`src/components/experience/DecisionCard.tsx`) currently implements
 * this pattern inline (predates this component). Left as-is rather
 * than refactored in this pass — consolidating it onto `TechnicalNote`
 * is a valid future cleanup, not done now, to keep this phase's changes
 * scoped to the Experience Framework itself.
 */
export function TechnicalNote({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-l-2 border-neutral-200 pl-4", className)}>
      <p className="type-label-muted">{label}</p>
      <p className="type-caption mt-1 text-[var(--color-text-support)]">{children}</p>
    </div>
  );
}
