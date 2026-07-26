"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  EASE_ENTRANCE,
  MOTION_DURATION,
  STAGGER_MAX_TOTAL,
  STAGGER_STEP,
} from "@/constants/motion";
import { cn } from "@/lib/utils";

const OFFSET = 12;

/**
 * Container + item pair for staggered list reveals
 * (docs/phase-1-design-system/06 — 40–60ms per item, capped so a long
 * list never takes more than ~550ms total to finish revealing).
 *
 * Usage:
 * ```tsx
 * <Stagger className="grid gap-6 sm:grid-cols-3">
 *   {items.map((item) => (
 *     <StaggerItem key={item.id}><Card>...</Card></StaggerItem>
 *   ))}
 * </Stagger>
 * ```
 */
export function Stagger({
  children,
  className,
  itemCount,
}: {
  children: ReactNode;
  className?: string;
  /** Used to shrink the per-item delay for long lists so the total stays under the cap. */
  itemCount?: number;
}) {
  const reduceMotion = useReducedMotion();
  const step =
    itemCount && itemCount > 0
      ? Math.min(STAGGER_STEP, STAGGER_MAX_TOTAL / itemCount)
      : STAGGER_STEP;

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : step } },
      }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      className={cn("h-full", className)}
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : OFFSET },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0.01 : MOTION_DURATION.entrance,
            ease: EASE_ENTRANCE,
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}
