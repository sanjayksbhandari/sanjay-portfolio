import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

type IconSize = keyof typeof sizeMap;

/**
 * The one way an icon is ever rendered on this site (docs/phase-1-design-
 * system/01 §8 icon usage rules). Never import a Lucide icon and render
 * it directly in a page/feature component — always go through `Icon` so
 * size and stroke width can never drift component-to-component.
 *
 * - Sizes: 16 / 20 / 24px only (`sm`/`md`/`lg`) — matches
 *   docs/phase-1-design-system/01.
 * - Stroke: 1.5–1.75px — defaults to 1.75 to match the hand-drawn menu/
 *   close icons already in `MobileNavDrawer` prior to this phase.
 * - Color: inherited from `currentColor` (i.e. controlled by the
 *   consumer's text color class) — an icon never hardcodes its own color.
 * - `aria-hidden` by default, since docs/phase-1-design-system/01 requires
 *   every icon to be paired with a text label or be a universally
 *   understood action; pass `label` for the rare icon-only-button case,
 *   which renders a real accessible name instead.
 */
export function Icon({
  icon: LucideIconComponent,
  size = "md",
  strokeWidth = 1.75,
  className,
  label,
}: {
  icon: LucideIcon;
  size?: IconSize;
  strokeWidth?: number;
  className?: string;
  label?: string;
}) {
  const pixels = sizeMap[size];
  return (
    <LucideIconComponent
      width={pixels}
      height={pixels}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    />
  );
}
