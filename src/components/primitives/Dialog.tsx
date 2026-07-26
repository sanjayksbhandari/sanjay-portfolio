import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/**
 * Modal foundation (docs/phase-2-design-system §07). Centered overlay
 * dialog, built on Radix `Dialog` for the same reason `MobileNavDrawer`
 * was rebuilt on it this phase: a real focus trap, Escape handling, and
 * focus restoration to the trigger, for free.
 *
 * Animation is a plain CSS mount-in fade/scale (`.popover-content`-style
 * keyframe in `globals.css`) rather than Framer Motion + `AnimatePresence`
 * here — Radix unmounts `Content`/`Overlay` on close by default, so
 * there's no exit frame to animate without extra `forceMount` plumbing
 * that a *foundation* component shouldn't force onto every consumer. A
 * feature that specifically needs an animated exit can compose Framer
 * Motion around this the same way `MobileNavDrawer` does.
 *
 * This is a foundation — not wired into any page. A future feature
 * composes `Dialog`/`DialogTrigger`/`DialogContent` directly.
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  children,
  className,
  title,
  description,
  showCloseButton = true,
}: {
  children: ReactNode;
  className?: string;
  title: string;
  description?: string;
  showCloseButton?: boolean;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="z-overlay tooltip-content fixed inset-0 bg-neutral-950/40" />
      <DialogPrimitive.Content
        className={cn(
          "z-overlay fixed top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
          "bg-neutral-0 tooltip-content surface p-6 shadow-[var(--shadow-2)]",
          className
        )}
      >
        <DialogPrimitive.Title className="text-lg font-semibold text-neutral-800">
          {title}
        </DialogPrimitive.Title>
        {description ? (
          <DialogPrimitive.Description className="mt-1 text-sm text-neutral-600">
            {description}
          </DialogPrimitive.Description>
        ) : null}
        <div className="mt-4">{children}</div>
        {showCloseButton ? (
          <DialogPrimitive.Close
            aria-label="Close dialog"
            className="absolute top-4 right-4 rounded-sm text-neutral-500 transition-colors duration-[var(--motion-micro)] hover:text-neutral-800"
          >
            <Icon icon={X} size="sm" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
