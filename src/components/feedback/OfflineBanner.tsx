"use client";

import { WifiOff } from "lucide-react";
import { Icon } from "@/components/primitives/Icon";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useMounted } from "@/hooks/useMounted";

/**
 * Offline State Foundation (docs/phase-3-application-shell/01-application-
 * shell.md "Global Experience"). Mounted once, globally, in the root
 * layout (like `Toaster`) — renders nothing while online, which is every
 * render until the network actually drops.
 *
 * A fixed bar rather than the inline `Alert` component: `Alert` is
 * authored for static placement *inside* page content; this needs to
 * float above whatever page is currently mounted regardless of scroll
 * position, which is a different layout job even though the visual
 * language (icon + short message, `role="status"`) matches. `safe-bottom`
 * keeps it clear of the home-indicator area on notched phones (docs/
 * phase-3-application-shell/01 "Safe Area Support").
 */
export function OfflineBanner() {
  const mounted = useMounted();
  const isOnline = useOnlineStatus();

  // Guard on `mounted` — `navigator.onLine` is client-only, so this stays
  // invisible until hydration can know the real state, avoiding a flash.
  if (!mounted || isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="safe-bottom z-toast fixed inset-x-0 bottom-0 flex items-center justify-center gap-2 border-t border-neutral-200 bg-neutral-800 px-4 py-2.5 text-sm text-white"
    >
      <Icon icon={WifiOff} size="sm" />
      You&rsquo;re currently offline. Some content may be unavailable.
    </div>
  );
}
