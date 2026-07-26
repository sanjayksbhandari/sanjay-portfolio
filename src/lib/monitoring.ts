/**
 * Error monitoring facade — Phase 17
 * (docs/phase-17-launch-readiness/06-monitoring-setup.md).
 *
 * Default: log to the runtime console (captured by Vercel Runtime Logs).
 * When `@sentry/nextjs` is installed and initialized, replace the body of
 * `captureException` with `Sentry.captureException(error)` — keep this
 * module as the only call site from UI boundaries.
 *
 * No Sentry SDK ships by default (privacy + dependency policy). Set
 * `NEXT_PUBLIC_SENTRY_DSN` only after the SDK wizard has been run.
 */

export function captureException(error: unknown, context?: Record<string, string | undefined>) {
  const message = error instanceof Error ? error.message : String(error);
  const digest =
    error && typeof error === "object" && "digest" in error
      ? String((error as { digest?: string }).digest ?? "")
      : undefined;

  console.error("[monitoring]", message, {
    ...context,
    digest,
  });

  // Hook for Sentry (or another APM) once installed:
  // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  //   void import("@sentry/nextjs").then((Sentry) => {
  //     Sentry.captureException(error, { extra: context });
  //   });
  // }
}

export function captureMessage(message: string, context?: Record<string, string | undefined>) {
  captureException(new Error(message), context);
}
