import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-label inline-flex items-center rounded-full border px-2.5 py-1 font-mono leading-none tracking-[0.02em] transition-[border-color,background-color,color] duration-[var(--motion-micro)] ease-[var(--ease-spring)]",
        tone === "neutral" &&
          "border-neutral-200 bg-neutral-50/90 text-neutral-700 hover:border-neutral-300",
        tone === "accent" &&
          "bg-accent-50 text-accent-700 border-[color-mix(in_srgb,var(--color-accent-600)_22%,transparent)] hover:border-[color-mix(in_srgb,var(--color-accent-600)_38%,transparent)]",
        className
      )}
    >
      {children}
    </span>
  );
}
