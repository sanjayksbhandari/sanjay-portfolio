import type { ReactNode } from "react";
import { Callout } from "./Callout";

/**
 * Experience Framework — Architecture Callout. A fixed preset over the
 * generic `Callout` for a specific, recurring authoring need: flagging
 * an architectural note, constraint, or non-obvious system-design
 * decision inline within a narrative (an Architecture Gallery theme, a
 * Case Study's "Architecture Summary" section). Composition, not a
 * second implementation — see `Callout` for the shared visual treatment.
 */
export function ArchitectureCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Callout tone="note" title={title}>
      {children}
    </Callout>
  );
}
