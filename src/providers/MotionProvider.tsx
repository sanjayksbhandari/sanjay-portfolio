"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads Framer Motion's `domAnimation` feature set asynchronously once
 * at the root, instead of every `motion.*` usage pulling in the full
 * animation engine. Components use the `m` element (not `motion`) so
 * they defer to this provider (docs/phase-2-design-system §"Zero
 * unnecessary JavaScript").
 *
 * `features` is a loader function (not a sync `domAnimation` import) so
 * the feature bundle is code-split and does not block first paint / first
 * navigation.
 */
const loadFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
