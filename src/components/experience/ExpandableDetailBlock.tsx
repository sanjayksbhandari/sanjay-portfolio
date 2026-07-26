"use client";

import type { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/utils";
import { CopyLinkButton } from "./CopyLinkButton";

/**
 * Experience Framework — Expandable Detail Block. Generalizes Phase 6's
 * `ExpandableSection` (real Radix `Accordion` — `aria-expanded`,
 * Space/Enter, reduced-motion-respecting height transition via
 * `.accordion-content` in globals.css) into a page-agnostic collapsible
 * section with its own anchor id + copy-link button on the trigger row.
 *
 * Use for reflective/supplementary content that shouldn't compete with
 * the primary narrative for attention by default — Case Study Lessons
 * Learned/Future Improvements (Phase 6), and any future page with a
 * "details" or "read more" section (a Leadership principle's fuller
 * write-up, an Architecture theme's extended rationale, …).
 */
const headingSizeByLevel: Record<2 | 3, string> = {
  2: "type-h3",
  3: "type-h4",
};

export function ExpandableDetailBlock({
  id,
  title,
  level = 2,
  defaultOpen = false,
  children,
}: {
  id: string;
  title: string;
  /** Heading level of the trigger row — default `2` matches every other
   * top-level section on a page. Pass `3` when this block is nested one
   * level deeper (e.g. a Showcase story's Lessons Learned, itself a
   * subsection of the project's own `h2`) — same pattern as
   * `SectionHeader`'s `level` prop. */
  level?: 2 | 3;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <section id={id} className="scroll-anchor mt-12">
      <AccordionPrimitive.Root
        type="single"
        collapsible
        defaultValue={defaultOpen ? id : undefined}
      >
        <AccordionPrimitive.Item value={id}>
          {/* `asChild` so this renders as an actual heading (matching the
              surrounding section's level) instead of Radix's default
              `<h3>`, which could otherwise land at the wrong depth and
              break the page's heading hierarchy. */}
          <AccordionPrimitive.Header asChild>
            <Tag className={cn("flex items-center gap-2", headingSizeByLevel[level])}>
              <AccordionPrimitive.Trigger className="group hover:text-accent-600 flex flex-1 items-center justify-between gap-2 text-left font-medium transition-colors duration-[var(--motion-micro)]">
                {title}
                <Icon
                  icon={ChevronDown}
                  size="sm"
                  className="text-neutral-500 transition-transform duration-[var(--motion-standard)] group-data-[state=open]:rotate-180"
                />
              </AccordionPrimitive.Trigger>
              <CopyLinkButton sectionId={id} />
            </Tag>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="accordion-content overflow-hidden">
            <div className="mt-3 pb-1">{children}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </section>
  );
}
