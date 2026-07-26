import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Input (docs/phase-2-design-system §07 Form Foundations).
 *
 * States: default, `:focus-visible` (global accent ring, globals.css),
 * `:disabled` (opacity-50, no pointer events), invalid
 * (`aria-invalid="true"` → danger border, set by the consumer/form
 * library, not inferred here — this component never guesses validity).
 */
export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "bg-neutral-0 h-11 w-full rounded-md border border-neutral-300 px-3 text-sm text-neutral-800",
          "placeholder:text-neutral-500",
          "transition-colors duration-[var(--motion-micro)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-danger",
          className
        )}
        {...props}
      />
    );
  }
);
