"use client";

import { useEffect } from "react";

/**
 * Locks page scroll while `active` is true, restoring the previous value
 * on cleanup. Radix primitives (Dialog, etc.) already do this internally,
 * so components built on Radix should not use this hook redundantly —
 * it exists for any future full-screen overlay that is *not* Radix-based.
 */
export function useLockBodyScroll(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}
