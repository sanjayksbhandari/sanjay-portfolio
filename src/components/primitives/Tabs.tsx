"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * Tabs foundation (docs/phase-2-design-system §07) — Radix `Tabs` for
 * correct roving-tabindex keyboard behavior (Arrow keys move focus and
 * activate, Home/End jump to first/last).
 */
export const Tabs = TabsPrimitive.Root;
export const TabsContent = TabsPrimitive.Content;

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TabsPrimitive.List
      className={cn("flex items-center gap-6 border-b border-neutral-200", className)}
    >
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        "relative -mb-px py-3 text-sm font-medium text-neutral-500 transition-colors duration-[var(--motion-micro)]",
        "hover:text-neutral-800",
        "data-[state=active]:text-neutral-800",
        "after:bg-accent-600 after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:scale-x-0 after:transition-transform after:duration-[var(--motion-standard)]",
        "data-[state=active]:after:scale-x-100"
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}
