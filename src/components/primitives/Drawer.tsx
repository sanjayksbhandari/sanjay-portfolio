"use client";

import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

type Side = "left" | "right" | "bottom";

const sideClass: Record<Side, string> = {
  right: "right-0 top-0 h-full w-[calc(100vw-3rem)] max-w-sm drawer-right",
  left: "left-0 top-0 h-full w-[calc(100vw-3rem)] max-w-sm drawer-left",
  bottom: "bottom-0 left-0 w-full max-h-[85vh] rounded-t-xl drawer-bottom",
};

/**
 * Drawer foundation — a side/bottom sheet variant of `Dialog`
 * (docs/phase-2-design-system §07). `MobileNavDrawer` is a specific,
 * already-built application of this pattern (full-screen, top-anchored,
 * app-specific nav content); this is the generic, reusable primitive for
 * any *future* drawer (a filter panel, a detail sheet) so those don't
 * reinvent the focus-trap/overlay/animation wiring `MobileNavDrawer`
 * already got right this phase.
 */
export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

export function DrawerContent({
  children,
  className,
  title,
  side = "right",
  showCloseButton = true,
}: {
  children: ReactNode;
  className?: string;
  title: string;
  side?: Side;
  showCloseButton?: boolean;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="z-overlay tooltip-content fixed inset-0 bg-neutral-950/40" />
      <DialogPrimitive.Content
        className={cn(
          "z-overlay bg-neutral-0 fixed border border-neutral-200 p-6 shadow-[var(--shadow-2)]",
          sideClass[side],
          className
        )}
      >
        <DialogPrimitive.Title className="text-lg font-semibold text-neutral-800">
          {title}
        </DialogPrimitive.Title>
        <div className="mt-4">{children}</div>
        {showCloseButton ? (
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute top-4 right-4 rounded-sm text-neutral-500 transition-colors duration-[var(--motion-micro)] hover:text-neutral-800"
          >
            <Icon icon={X} size="sm" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
