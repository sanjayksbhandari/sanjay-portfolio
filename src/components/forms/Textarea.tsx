import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "bg-neutral-0 min-h-32 w-full rounded-md border border-neutral-300 px-3 py-2.5 text-sm text-neutral-800",
        "placeholder:text-neutral-500",
        "transition-colors duration-[var(--motion-micro)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-danger",
        className
      )}
      {...props}
    />
  );
});
