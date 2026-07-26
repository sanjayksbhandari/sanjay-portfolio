"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, m } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Animated count-up-on-scroll foundation.
 *
 * IMPORTANT — scope restriction, not a suggestion: this exists as a
 * reusable *foundation* only, per the Phase 2 brief's explicit "Counter
 * Foundation" deliverable. It is NOT used anywhere in this project today,
 * and must never be applied to the `Metric`/`Stat` role.
 * docs/phase-1-design-system/04 and /07 are explicit that a metric is "a
 * static fact, not a performance" and that count-up animation on metrics
 * is a forbidden gimmick (docs/phase-1-design-system/16 in Phase 0 terms).
 * If a future, genuinely different use case needs an animated number
 * (e.g. a live/dynamic value that isn't a portfolio "Metric"), this is
 * where it comes from — `Stat` stays exactly as it is.
 */
export function Counter({
  value,
  duration = 1.2,
  className,
  formatter = (n: number) => Math.round(n).toString(),
}: {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: reduceMotion ? 0 : duration * 1000 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (displayRef.current) displayRef.current.textContent = formatter(latest);
    });
  }, [spring, formatter]);

  return (
    <m.span ref={ref} className={className}>
      <span ref={displayRef}>{reduceMotion ? formatter(value) : formatter(0)}</span>
    </m.span>
  );
}
