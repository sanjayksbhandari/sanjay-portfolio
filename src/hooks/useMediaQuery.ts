"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Returns `false` on the server and on first
 * client render (before hydration can know the real viewport), then
 * updates — this avoids a hydration mismatch rather than guessing.
 *
 * Prefer Tailwind responsive classes for anything that can be expressed
 * in CSS (docs/phase-1-design-system/08). Reach for this hook only when a
 * *behavioral* branch (not just a style) depends on viewport/media state.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    // The real match state genuinely cannot be known during render (it
    // depends on `window`, which doesn't exist on the server) — this is
    // the one legitimate case for a synchronous setState-in-effect, not
    // state that could have been derived during render instead.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
