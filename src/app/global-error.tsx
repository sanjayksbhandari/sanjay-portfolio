"use client";

import { useEffect } from "react";
import "./globals.css";
import { captureException } from "@/lib/monitoring";

/**
 * Root-level error boundary (Global Experience — "500", catastrophic
 * case). Next.js only mounts this when an error is thrown *inside the
 * root layout itself* (so the normal `error.tsx` boundary — which lives
 * inside the layout — can't catch it); it therefore has to render its own
 * complete `<html>`/`<body>`, bypassing `layout.tsx`, `ThemeProvider`, and
 * every other provider entirely.
 *
 * Deliberately does not import any component from `src/components/*` —
 * this is the last line of defense, so it stays plain HTML + Tailwind
 * utility classes (pure CSS, no runtime dependency on the rest of the
 * app) rather than reusing `Button`/`Section`/etc., which could
 * theoretically be part of what failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error, { boundary: "global" });
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-neutral-0 flex min-h-screen flex-col items-center justify-center px-6 text-center text-neutral-800">
        <p className="type-caption font-mono">500</p>
        <h1 className="type-h1 mt-4">Something went wrong</h1>
        <p className="type-lead mx-auto mt-4 max-w-md">
          The application hit an unrecoverable error. Reloading usually resolves it.
        </p>
        <button
          type="button"
          onClick={reset}
          className="bg-accent-600 hover:bg-accent-700 mt-8 inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-medium text-white"
        >
          Reload
        </button>
      </body>
    </html>
  );
}
