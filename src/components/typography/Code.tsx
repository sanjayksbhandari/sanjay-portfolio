import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Code role (docs/phase-1-design-system/04) — inline code references,
 * config keys, technical notes. No syntax highlighting (Phase 1 §01/#12:
 * "in most cases, plain monospace text with no highlighting is
 * preferred"); a real fenced code block, if one is ever needed for a
 * multi-line snippet, is deliberately out of scope until a real use case
 * exists (docs/phase-1-design-system/01 §12 — no fake terminal styling).
 */
export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        "rounded-sm bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.85em] text-neutral-800",
        className
      )}
    >
      {children}
    </code>
  );
}
