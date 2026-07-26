import Link from "next/link";
import type { ResumeArtifact } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { DownloadResumeButton } from "./DownloadResumeButton";

/**
 * Professional Hub — Resume Center. Download / online / print CTAs with
 * version metadata when available.
 */
export function ResumeCenter({ artifact }: { artifact: ResumeArtifact }) {
  return (
    <div className="surface p-6">
      <div className="flex flex-wrap items-center gap-4">
        {artifact.ready ? (
          <DownloadResumeButton href={artifact.pdfPath} />
        ) : (
          <Button size="lg" disabled>
            Download Resume (PDF)
          </Button>
        )}
        <Button href="/resume" variant="secondary" size="lg">
          Online Resume
        </Button>
        <Button href="/resume" variant="ghost" size="md">
          Printable Resume
        </Button>
      </div>

      {(artifact.version || artifact.lastUpdated) && (
        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {artifact.version ? (
            <div>
              <dt className="type-label-muted">Version</dt>
              <dd className="mt-1 text-sm text-neutral-700">{artifact.version}</dd>
            </div>
          ) : null}
          {artifact.lastUpdated ? (
            <div>
              <dt className="type-label-muted">Last updated</dt>
              <dd className="mt-1 text-sm text-neutral-700">{artifact.lastUpdated}</dd>
            </div>
          ) : null}
        </dl>
      )}

      <p className="mt-4 text-sm leading-relaxed text-neutral-600">
        Prefer depth on the site? Start with{" "}
        <Link href="/journey" className="text-accent-600 font-medium">
          Engineering Journey
        </Link>{" "}
        and{" "}
        <Link href="/showcase" className="text-accent-600 font-medium">
          Showcase
        </Link>
        .
      </p>
    </div>
  );
}
