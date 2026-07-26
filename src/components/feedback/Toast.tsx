"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/utils";
import { dismissToast, useToastList } from "./useToast";

const iconFor = {
  neutral: Info,
  success: CheckCircle2,
  danger: XCircle,
} as const;

const toneClass = {
  neutral: "border-neutral-200 text-neutral-800",
  success: "border-success/30 text-success",
  danger: "border-danger/30 text-danger",
} as const;

/**
 * Toast foundation (docs/phase-2-design-system §07). Mounted once, in
 * `src/app/layout.tsx` — call `toast({ title, description, tone })` from
 * `useToast.ts` anywhere to trigger one. Not used by any current feature
 * (the contact form uses inline `Alert`-style status text today); this
 * is the foundation for a future case where an inline result region
 * isn't the right shape for the feedback.
 */
export function Toaster() {
  const items = useToastList();

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {items.map(({ id, title, description, tone = "neutral" }) => {
        const ToastIcon = iconFor[tone];
        return (
          <ToastPrimitive.Root
            key={id}
            duration={5000}
            onOpenChange={(open) => {
              if (!open) dismissToast(id);
            }}
            className={cn(
              "tooltip-content bg-neutral-0 flex items-start gap-3 rounded-lg border p-4 shadow-[var(--shadow-2)]",
              toneClass[tone]
            )}
          >
            <Icon icon={ToastIcon} size="sm" className="mt-0.5 shrink-0" />
            <div className="flex-1">
              <ToastPrimitive.Title className="text-sm font-medium text-neutral-800">
                {title}
              </ToastPrimitive.Title>
              {description ? (
                <ToastPrimitive.Description className="mt-1 text-sm text-neutral-600">
                  {description}
                </ToastPrimitive.Description>
              ) : null}
            </div>
            <ToastPrimitive.Close
              aria-label="Dismiss"
              className="text-neutral-500 hover:text-neutral-800"
            >
              <Icon icon={X} size="sm" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        );
      })}
      <ToastPrimitive.Viewport className="z-toast fixed right-0 bottom-0 flex w-full max-w-sm flex-col gap-2 p-6 outline-none" />
    </ToastPrimitive.Provider>
  );
}
