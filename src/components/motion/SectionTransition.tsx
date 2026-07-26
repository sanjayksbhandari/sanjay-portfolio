"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * `Reveal`, pre-configured for whole `<Section>`-sized blocks rather than
 * individual small elements: a larger scroll-trigger margin so a big
 * section doesn't wait until it's almost fully in view to begin
 * revealing. Named separately from `Reveal` because the *intent*
 * ("this is a whole section") is different from a generic element
 * reveal, even though the implementation is a thin configuration of the
 * same primitive (no duplicated animation logic).
 */
export function SectionTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal direction="up" className={className}>
      {children}
    </Reveal>
  );
}
