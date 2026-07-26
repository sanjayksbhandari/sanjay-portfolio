import type { ReactNode } from "react";
import { Alert } from "@/components/feedback/Alert";

export type CalloutTone = "info" | "note" | "success" | "warning";

// Maps this framework's content-authoring tone names onto the existing
// `Alert` foundation's tones (Phase 2) — "info"/"note" both read as
// `Alert`'s neutral tone. `Callout` intentionally does not reimplement
// the bordered-panel-with-icon treatment: `Alert` already is that
// component, and the brief's own validation rule ("no duplicated
// logic... no duplicated renderers") means a second copy of the same
// box would be the defect, not the fix.
const toneMap: Record<CalloutTone, "neutral" | "success" | "danger" | "warning"> = {
  info: "neutral",
  note: "neutral",
  success: "success",
  warning: "warning",
};

/**
 * Experience Framework — Callout. Used directly, or via the generic
 * `ContentRenderer`'s `callout` block, for content that stands apart
 * from the surrounding prose — a caveat, an aside, a TODO note that's
 * more prominent than the inline `TodoNote`.
 */
export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: CalloutTone;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Alert tone={toneMap[tone]} title={title} className={className}>
      {children}
    </Alert>
  );
}
