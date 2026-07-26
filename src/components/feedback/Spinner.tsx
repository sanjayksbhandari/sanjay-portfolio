import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeMap = { sm: 16, md: 20, lg: 24 } as const;

/**
 * Spinner (docs/phase-2-design-system §07) — a plain rotating stroke, no
 * bounce, no branded flourish (docs/phase-1-design-system/01 §12 /
 * /phase-1-design-system/06). `motion-safe:` — a spinner communicates
 * indeterminate wait state visually; under reduced motion it still needs
 * to convey "busy," so it falls back to a static icon plus the
 * `aria-label` doing the communicating instead of rotation.
 */
export function Spinner({
  size = "md",
  label = "Loading",
  className,
}: {
  size?: keyof typeof sizeMap;
  label?: string;
  className?: string;
}) {
  const pixels = sizeMap[size];
  return (
    <Loader2
      width={pixels}
      height={pixels}
      strokeWidth={2}
      role="status"
      aria-label={label}
      className={cn("text-neutral-500 motion-safe:animate-spin", className)}
    />
  );
}
