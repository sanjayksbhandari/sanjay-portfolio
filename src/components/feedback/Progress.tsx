"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

/**
 * Progress foundation (docs/phase-2-design-system §07). Determinate only
 * — for indeterminate/loading states, use `Spinner` instead
 * (docs/phase-1-design-system/16: no fake/ambiguous progress).
 */
export function Progress({
  value,
  label,
  className,
}: {
  value: number;
  label?: string;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={className}>
      {label ? (
        <div className="mb-1.5 flex justify-between font-mono text-xs text-neutral-600">
          <span>{label}</span>
          <span>{Math.round(clamped)}%</span>
        </div>
      ) : null}
      <ProgressPrimitive.Root
        value={clamped}
        className={cn("h-1.5 w-full overflow-hidden rounded-full bg-neutral-100")}
      >
        <ProgressPrimitive.Indicator
          className="bg-accent-600 h-full transition-transform duration-[var(--motion-standard)] ease-out"
          style={{ transform: `translateX(-${100 - clamped}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}
