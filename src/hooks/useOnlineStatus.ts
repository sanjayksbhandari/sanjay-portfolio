"use client";

import { useEffect, useState } from "react";

/**
 * Offline State Foundation (docs/phase-3-application-shell/01-application-
 * shell.md "Global Experience"). Mirrors the SSR-safety pattern already
 * established by `useMediaQuery`/`useMounted`: returns `true` (assume
 * online) on the server and on first client render, then corrects itself
 * from `navigator.onLine` and the `online`/`offline` window events — never
 * guesses a false "offline" state during hydration.
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
