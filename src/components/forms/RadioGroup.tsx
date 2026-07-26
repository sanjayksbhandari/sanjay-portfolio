"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export const RadioGroup = RadioGroupPrimitive.Root;

export function RadioGroupItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "bg-neutral-0 flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300",
        "transition-colors duration-[var(--motion-micro)]",
        "data-[state=checked]:border-accent-600",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="bg-accent-600 h-2.5 w-2.5 rounded-full" />
    </RadioGroupPrimitive.Item>
  );
}
