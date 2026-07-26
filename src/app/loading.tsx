/**
 * Root-level route loading UI. Kept deliberately light: a thin top bar
 * instead of a full-viewport spinner, so brief RSC waits during
 * navigation do not feel like a blank "loading page" flash.
 *
 * Routes that need a real skeleton can add their own `loading.tsx`.
 */
export default function Loading() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-[var(--header-height)] z-50 h-0.5 overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="nav-loading-bar h-full w-1/3 rounded-full bg-[var(--color-accent-royal)]" />
    </div>
  );
}
