"use client";

import { m, useScroll } from "framer-motion";

/**
 * Scroll Progress (docs/phase-3-application-shell/05-motion-strategy.md
 * "Scroll Experience"). A 2px accent bar pinned to the bottom edge of the
 * sticky header (rendered inside `SiteHeader`, absolutely positioned) that
 * fills left-to-right with whole-page scroll depth.
 *
 * Deliberately *not* spring-smoothed: `scrollYProgress` drives `scaleX`
 * directly, 1:1 with the user's own scroll input. This is a direct
 * reflection of a user-initiated action (like a native scrollbar thumb),
 * not a triggered animation, so there is no separate reduced-motion
 * branch — suppressing it would remove information (the requirement is
 * to keep it, not disable it), and there is no eased/bouncy motion to
 * strip out in the first place.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      style={{ scaleX: scrollYProgress }}
      className="bg-accent-600 absolute inset-x-0 bottom-0 h-[2px] origin-left"
      aria-hidden
    />
  );
}
