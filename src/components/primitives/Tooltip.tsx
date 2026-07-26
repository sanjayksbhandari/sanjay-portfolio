"use client";

import type { ReactNode } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

/**
 * Tooltip (docs/phase-1-design-system/07). Built on Radix `Tooltip` for
 * correct hover/focus-both, Escape-to-dismiss, and delay-group behavior —
 * exactly the kind of interaction-state logic Phase 1 flagged as missing
 * from hand-rolled components (docs/phase-1-design-system/09).
 *
 * `TooltipProvider` must wrap any part of the tree using `Tooltip` — it
 * is mounted once in `src/providers` territory conceptually, but since
 * Radix's provider is cheap and stateless per-subtree, each `Tooltip`
 * instance provides its own rather than requiring a global provider,
 * which keeps this component fully self-contained and reusable in
 * isolation (Storybook-style usage, no app-level wiring required).
 */
export function Tooltip({
  children,
  content,
  side = "top",
  delayDuration = 200,
}: {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className={cn(
              "z-dropdown bg-neutral-0 rounded-md border border-neutral-200 px-2.5 py-1.5 font-mono text-xs text-neutral-700 shadow-[var(--shadow-1)]",
              // Plain CSS keyframe (globals.css), not a Tailwind animation
              // plugin we don't have installed — Radix unmounts this node
              // on close, so a mount-in fade is all that's needed.
              "tooltip-content"
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-neutral-0" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
