"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "bg-neutral-0 flex h-5 w-5 items-center justify-center rounded-sm border border-neutral-300",
        "transition-colors duration-[var(--motion-micro)]",
        "data-[state=checked]:border-accent-600 data-[state=checked]:bg-accent-600",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* text-white / dark:text-[#0d0d0f] (literal, not `neutral-950` —
          see docs/phase-2-design-system/03) — same reasoning as
          `Button`'s primary variant. */}
      <CheckboxPrimitive.Indicator className="text-white dark:text-[#0d0d0f]">
        <Icon icon={Check} size="sm" strokeWidth={2.25} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
