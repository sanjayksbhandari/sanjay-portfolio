import { GraduationCap, School, BookMarked, type LucideIcon } from "lucide-react";
import type { AcademicCredential } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/primitives/Icon";

const kindIcon: Record<AcademicCredential["kind"], LucideIcon> = {
  masters: GraduationCap,
  bachelors: GraduationCap,
  secondary: School,
};

/**
 * Premium education timeline — left rail + date, right elevated cards.
 * Matches Experience Framework spacing and surface language without
 * reusing the career `Timeline` (that one is resume-shaped).
 */
export function EducationTimeline({ credentials }: { credentials: AcademicCredential[] }) {
  return (
    <ol className="relative mt-10 space-y-8 sm:space-y-10">
      {/* Continuous vertical rail (desktop/tablet) */}
      <span
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-[0.6875rem] hidden w-px bg-neutral-200/90 sm:left-[7.25rem] md:block"
      />

      {credentials.map((credential) => {
        const IconGlyph = kindIcon[credential.kind] ?? BookMarked;
        return (
          <li
            key={credential.id}
            className="relative grid grid-cols-1 gap-4 sm:grid-cols-[6.5rem_1fr] sm:gap-8 md:grid-cols-[7.25rem_1fr]"
          >
            {/* Date column */}
            <div className="flex items-center gap-3 sm:block sm:pt-6">
              <span
                aria-hidden="true"
                className="bg-accent-600 ring-neutral-0 relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-[6px] sm:mx-auto md:mx-0 md:ml-[0.2rem]"
              >
                <span className="bg-neutral-0 h-1.5 w-1.5 rounded-full" />
              </span>
              <p className="font-mono text-sm tracking-[-0.01em] text-neutral-600 sm:mt-3 sm:text-center md:text-left">
                {credential.duration}
              </p>
            </div>

            {/* Credential card */}
            <Card elevated className="min-w-0">
              <div className="flex items-start gap-4">
                <span className="bg-accent-50 text-accent-600 dark:bg-accent-600/15 flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)]">
                  <Icon icon={IconGlyph} size="md" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="type-h4 text-balance">{credential.degree}</p>
                  <p className="mt-2 text-sm font-semibold text-neutral-700">
                    {credential.institute}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    <span className="text-neutral-500">{credential.authorityLabel}</span>
                    {" · "}
                    {credential.authority}
                  </p>

                  <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <dt className="type-label-muted">Duration</dt>
                      <dd className="mt-1 font-mono text-sm text-neutral-800">
                        {credential.duration}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-label-muted">Location</dt>
                      <dd className="mt-1 text-sm text-neutral-800">{credential.location}</dd>
                    </div>
                    <div>
                      <dt className="type-label-muted">Score</dt>
                      <dd className="mt-1 font-mono text-sm font-medium text-neutral-800">
                        {credential.score}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Card>
          </li>
        );
      })}
    </ol>
  );
}
