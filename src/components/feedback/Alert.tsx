import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "success" | "danger" | "warning";

const toneClass: Record<Tone, string> = {
  neutral: "border-neutral-200 bg-neutral-50/90 text-neutral-700 shadow-[var(--shadow-sm)]",
  success:
    "border-success/25 bg-success/5 text-success shadow-[var(--shadow-sm)] dark:border-success/30",
  danger:
    "border-danger/25 bg-danger/5 text-danger shadow-[var(--shadow-sm)] dark:border-danger/30",
  warning:
    "border-warning/30 bg-warning/5 text-warning shadow-[var(--shadow-sm)] dark:border-warning/35",
};

const iconFor: Record<Tone, typeof Info> = {
  neutral: Info,
  success: CheckCircle2,
  danger: XCircle,
  warning: AlertTriangle,
};

/**
 * Alert (docs/phase-2-design-system §07). Static, inline — not a toast
 * (see `Toast.tsx` for the transient, auto-dismissing case).
 */
export function Alert({
  tone = "neutral",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("flex gap-3 rounded-lg border p-4", toneClass[tone], className)}
    >
      <Icon icon={iconFor[tone]} size="sm" className="mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-medium tracking-[-0.01em]">{title}</p>
        {children ? <div className="mt-1 text-sm opacity-90">{children}</div> : null}
      </div>
    </div>
  );
}
