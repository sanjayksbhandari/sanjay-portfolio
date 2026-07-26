import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/utils";

/**
 * EmptyState (docs/phase-2-design-system §07) — for any future list/
 * table with no data, not a substitute for `TodoNote`
 * (`src/components/ui/TodoNote.tsx`), which remains the correct component
 * for "this content doesn't exist yet, pending verification from
 * Sanjay." `EmptyState` is for a genuinely empty *data* result (e.g. a
 * future filtered view of case studies that matches nothing) — a
 * different situation with a different meaning, kept as separate
 * components rather than overloading one (Principle 1,
 * docs/phase-1-design-system/02, applied in reverse: don't force reuse
 * where the semantics actually differ).
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border border-dashed border-neutral-200 py-16 text-center",
        className
      )}
    >
      {icon ? (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100">
          <Icon icon={icon} size="md" className="text-neutral-500" />
        </div>
      ) : null}
      <p className="type-h4">{title}</p>
      {description ? <p className="max-w-sm text-sm text-neutral-600">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
