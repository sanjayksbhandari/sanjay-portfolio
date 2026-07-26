"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const sizeClass = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-base",
} as const;

/**
 * Avatar (docs/phase-2-design-system §07). Photography rules
 * (docs/phase-1-design-system/01 §10) still apply: no stock imagery — the
 * fallback (initials on a neutral surface) is the expected default state
 * everywhere until/unless a real, approved photo is supplied.
 */
export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
}: {
  src?: string;
  alt: string;
  fallback: string;
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 font-mono font-medium text-neutral-700",
        sizeClass[size],
        className
      )}
    >
      {src ? (
        <AvatarPrimitive.Image src={src} alt={alt} className="h-full w-full object-cover" />
      ) : null}
      <AvatarPrimitive.Fallback delayMs={src ? 400 : 0}>{fallback}</AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
