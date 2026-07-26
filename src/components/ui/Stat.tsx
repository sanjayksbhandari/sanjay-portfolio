import { cn } from "@/lib/utils";

export function Stat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "surface-sm surface-interactive flex h-full min-h-[7.75rem] flex-col px-4 py-4 sm:min-h-[8.25rem] sm:px-5 sm:py-5",
        className
      )}
    >
      <div className="type-metric">{value}</div>
      <div className="type-metric-label mt-1.5 flex-1">{label}</div>
    </div>
  );
}
