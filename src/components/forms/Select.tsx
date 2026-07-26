"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/utils";

/**
 * Select (docs/phase-2-design-system §07) — native option semantics via
 * Radix, for the case a `Combobox` (search) is more than what's needed.
 */
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "bg-neutral-0 flex h-11 w-full items-center justify-between rounded-md border border-neutral-300 px-3 text-sm text-neutral-800",
        "data-[placeholder]:text-neutral-500",
        className
      )}
    >
      {children}
      <SelectPrimitive.Icon>
        <Icon icon={ChevronDown} size="sm" className="text-neutral-500" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={6}
        className="select-content z-dropdown bg-neutral-0 surface overflow-hidden p-1 shadow-[var(--shadow-2)]"
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <SelectPrimitive.Item
      value={value}
      className={cn(
        "relative flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm text-neutral-800 outline-none",
        "data-[highlighted]:bg-neutral-100"
      )}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Icon icon={Check} size="sm" className="text-accent-600" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
