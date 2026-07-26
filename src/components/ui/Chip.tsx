"use client";

import { X } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/utils";

/**
 * Chip — an interactive, optionally-removable tag (e.g. a future filter
 * chip), distinct from `Badge` (`src/components/ui/Badge.tsx`), which is
 * a static label with no interaction. Not currently used anywhere (no
 * filterable list exists yet); built as foundation.
 */
export function Chip({
  children,
  onRemove,
  className,
}: {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50/90 px-3 py-1 text-sm text-neutral-700 shadow-[var(--shadow-sm)] transition-[border-color,background-color] duration-[var(--motion-micro)] hover:border-neutral-300",
        className
      )}
    >
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          className="rounded-full text-neutral-500 hover:text-neutral-800"
        >
          <Icon icon={X} size="sm" />
        </button>
      ) : null}
    </span>
  );
}
