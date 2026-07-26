"use client";

import { forwardRef } from "react";
import { Search, X } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/utils";

/**
 * SearchInput (docs/phase-2-design-system §07). A specialization of
 * `Input`, not a copy of it — the leading search icon and optional clear
 * button are the only things this adds; base field styling is shared via
 * the same classes `Input` uses.
 */
export const SearchInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { onClear?: () => void }
>(function SearchInput({ className, onClear, value, ...props }, ref) {
  return (
    <div className="relative">
      <Icon
        icon={Search}
        size="sm"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"
      />
      <input
        ref={ref}
        value={value}
        type="search"
        className={cn(
          "bg-neutral-0 h-11 w-full rounded-md border border-neutral-300 pr-9 pl-9 text-sm text-neutral-800",
          "placeholder:text-neutral-500",
          "transition-colors duration-[var(--motion-micro)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      {onClear && value ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-500 hover:text-neutral-800"
        >
          <Icon icon={X} size="sm" />
        </button>
      ) : null}
    </div>
  );
});
