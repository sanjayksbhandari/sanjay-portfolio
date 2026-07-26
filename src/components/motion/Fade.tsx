"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_ENTRANCE, MOTION_DURATION } from "@/constants/motion";

type Direction = "none" | "up" | "down" | "left" | "right";

const OFFSET = 12; // px — matches the existing CSS `.reveal` keyframe's translateY(12px).

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  none: {},
  up: { y: OFFSET },
  down: { y: -OFFSET },
  left: { x: OFFSET },
  right: { x: -OFFSET },
};

interface FadeBaseProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  /** Entrance-on-mount by default. Set `whileInView` for scroll-triggered use (see Reveal). */
  whileInView?: boolean;
  once?: boolean;
}

/**
 * Shared implementation behind `Fade`/`FadeUp`/`FadeDown`/`FadeLeft`/
 * `FadeRight` (docs/phase-2-design-system §07/#Motion). One implementation,
 * five thin named exports below — avoids duplicating the same transition
 * logic five times (docs/phase-2-design-system §14 code-quality rule).
 */
function FadeBase({
  children,
  direction = "none",
  delay = 0,
  className,
  whileInView,
  once = true,
}: FadeBaseProps) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? {} : directionOffset[direction];

  const viewportProps = whileInView ? { viewport: { once, margin: "-10% 0px" } } : {};
  const animateProp = whileInView ? "whileInView" : "animate";

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      {...{ [animateProp]: { opacity: 1, x: 0, y: 0 } }}
      transition={{
        duration: reduceMotion ? 0.01 : MOTION_DURATION.entrance,
        delay: reduceMotion ? 0 : delay,
        ease: EASE_ENTRANCE,
      }}
      {...viewportProps}
    >
      {children}
    </m.div>
  );
}

export function Fade(props: Omit<FadeBaseProps, "direction">) {
  return <FadeBase {...props} direction="none" />;
}
export function FadeUp(props: Omit<FadeBaseProps, "direction">) {
  return <FadeBase {...props} direction="up" />;
}
export function FadeDown(props: Omit<FadeBaseProps, "direction">) {
  return <FadeBase {...props} direction="down" />;
}
export function FadeLeft(props: Omit<FadeBaseProps, "direction">) {
  return <FadeBase {...props} direction="left" />;
}
export function FadeRight(props: Omit<FadeBaseProps, "direction">) {
  return <FadeBase {...props} direction="right" />;
}
