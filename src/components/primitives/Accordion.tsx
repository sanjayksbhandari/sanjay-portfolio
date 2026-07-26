"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/**
 * Accordion foundation (docs/phase-2-design-system §07) — Radix
 * `Accordion` for correct `aria-expanded`/keyboard (Arrow keys, Home/End)
 * behavior. Intended future use: certification detail groups, a future
 * FAQ (docs/phase-1-design-system/07 already specified this exact use
 * case as "Specified, not yet implemented" — this is that spec, built).
 */
export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <AccordionPrimitive.Item value={value} className="border-b border-neutral-200">
      {children}
    </AccordionPrimitive.Item>
  );
}

/**
 * `level` (default 3, matching Radix's own default `Accordion.Header`
 * element) lets a trigger nested deeper than one heading level under
 * its own section — e.g. `ArchitecturePatternCard`'s h3 category → h4
 * pattern title → trigger — render as the correct next level (`asChild`
 * onto a real `h4`/`h5`, the same technique `ExpandableDetailBlock`
 * already uses for its own h2 override) instead of always emitting an
 * out-of-sequence h3.
 */
export function AccordionTrigger({
  children,
  level = 3,
}: {
  children: React.ReactNode;
  level?: 3 | 4 | 5;
}) {
  const Tag = `h${level}` as "h3" | "h4" | "h5";
  return (
    <AccordionPrimitive.Header asChild>
      <Tag className="contents">
        <AccordionPrimitive.Trigger
          className={cn(
            "type-h4 group flex w-full items-center justify-between py-4 text-left",
            "hover:text-accent-600 transition-colors duration-[var(--motion-micro)]"
          )}
        >
          {children}
          <Icon
            icon={ChevronDown}
            size="sm"
            className="text-neutral-500 transition-transform duration-[var(--motion-standard)] group-data-[state=open]:rotate-180"
          />
        </AccordionPrimitive.Trigger>
      </Tag>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ children }: { children: React.ReactNode }) {
  return (
    <AccordionPrimitive.Content className="accordion-content overflow-hidden text-sm text-neutral-700">
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Content>
  );
}
