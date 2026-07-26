"use client";

import { useId, useState } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { Icon } from "./Icon";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { cn } from "@/lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
}

/**
 * Combobox foundation (docs/phase-2-design-system §07 Form Foundations),
 * built on `cmdk` + the `Popover` primitive above. `cmdk` is also the
 * library a future Command Palette (docs/phase-1-design-system/07,
 * deferred to Phase 3) would use — choosing it here means that later
 * feature reuses this exact filtering/keyboard-navigation engine instead
 * of introducing a second one.
 *
 * Foundation only — not wired into any page; a future form (if one needs
 * a searchable select) composes this directly.
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option…",
  emptyMessage = "No results found.",
}: {
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  const listboxId = useId();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          className={cn(
            "bg-neutral-0 flex h-11 w-full items-center justify-between rounded-md border border-neutral-300 px-3 text-sm text-neutral-800",
            "focus-visible:outline-2"
          )}
        >
          <span className={selected ? "" : "text-neutral-500"}>
            {selected ? selected.label : placeholder}
          </span>
          <Icon icon={ChevronsUpDown} size="sm" className="text-neutral-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <CommandPrimitive className="w-full">
          <CommandPrimitive.Input
            placeholder="Search…"
            className="w-full border-b border-neutral-200 px-3 py-2.5 text-sm text-neutral-800 outline-none placeholder:text-neutral-500"
          />
          <CommandPrimitive.List id={listboxId} className="max-h-64 overflow-y-auto p-1">
            <CommandPrimitive.Empty className="px-3 py-6 text-center text-sm text-neutral-500">
              {emptyMessage}
            </CommandPrimitive.Empty>
            {options.map((option) => (
              <CommandPrimitive.Item
                key={option.value}
                value={option.label}
                onSelect={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm text-neutral-800",
                  "data-[selected=true]:bg-neutral-100"
                )}
              >
                {option.label}
                {option.value === value ? (
                  <Icon icon={Check} size="sm" className="text-accent-600" />
                ) : null}
              </CommandPrimitive.Item>
            ))}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </PopoverContent>
    </Popover>
  );
}
