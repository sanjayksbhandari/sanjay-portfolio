"use client";

import { useEffect, useState } from "react";

/**
 * True only after the component has mounted on the client. Used to guard
 * anything that must read client-only state (e.g. `next-themes`'s
 * resolved theme) so the server-rendered and first-client-render markup
 * match exactly — prevents theme-related hydration warnings rather than
 * papering over them.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  // "Has this component mounted on the client" cannot be derived during
  // render by definition — it is true only once an effect has actually
  // run. This is the one legitimate case for a synchronous setState in
  // an effect, not state that could have been computed during render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  return mounted;
}
