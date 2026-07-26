import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, BackToTop } from "@/components/experience";
import { ResumeLayout } from "@/components/experience/layouts/ResumeLayout";
import { Button } from "@/components/ui/Button";
import { DownloadResumeButton } from "@/components/features/contact/DownloadResumeButton";
import {
  getResumeArtifact,
  getPerson,
  getCareerSnapshot,
  getAllExperience,
} from "@/content-engine";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description:
    "Online and downloadable resume for Sanjay Singh Bhandari, Senior Java Engineering Leader.",
  path: "/resume",
});

export default function ResumePage() {
  const artifact = getResumeArtifact();
  const person = getPerson();
  const snapshot = getCareerSnapshot().filter((f) => Boolean(f.value));
  const experience = getAllExperience();

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "Professional Hub", href: "/contact" },
    { name: "Resume", href: "/resume" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <ResumeLayout>
        <PageHero
          breadcrumbItems={visualItems}
          kicker="Resume"
          title={person.name}
          intro={`${person.headline}. ${person.summary}`}
          meta={
            [
              person.location,
              `${person.yearsExperience} years`,
              artifact.lastUpdated ? `Updated ${artifact.lastUpdated}` : null,
            ].filter(Boolean) as string[]
          }
        />

        <div className="mt-8 flex flex-wrap items-center gap-4 print:hidden">
          {artifact.ready ? <DownloadResumeButton href={artifact.pdfPath} /> : null}
          <Button href="/contact#resume-center" variant="secondary" size="lg">
            Professional Hub
          </Button>
          <p className="text-sm text-neutral-600">
            Use your browser Print dialog for a printable copy.
          </p>
        </div>

        <section className="mt-12" aria-labelledby="resume-snapshot-heading">
          <h2 id="resume-snapshot-heading" className="type-h3">
            Snapshot
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {snapshot.map((fact) => (
              <div key={fact.id} className="border-b border-neutral-200 pb-4">
                <dt className="type-label-muted">{fact.label}</dt>
                <dd className="mt-1 text-sm text-neutral-800">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12" aria-labelledby="resume-experience-heading">
          <h2 id="resume-experience-heading" className="type-h3">
            Experience
          </h2>
          <div className="mt-6 space-y-10">
            {experience.map((entry) => (
              <article key={entry.slug}>
                <h3 className="type-h4">{entry.title}</h3>
                <p className="mt-1 text-sm font-semibold text-neutral-600">
                  {entry.company} · {entry.dateRange}
                  {entry.durationLabel ? ` · ${entry.durationLabel}` : ""}
                </p>
                {entry.location ? (
                  <p className="mt-0.5 text-sm text-neutral-600">{entry.location}</p>
                ) : null}
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700">
                  {entry.scope.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="resume-contact-heading">
          <h2 id="resume-contact-heading" className="type-h3">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-700">
            <li>
              LinkedIn:{" "}
              <a
                href={site.social.linkedin}
                className="text-accent-600 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.social.linkedin.replace(/^https?:\/\//, "")}
              </a>
            </li>
            <li>
              Portfolio:{" "}
              <Link href="/" className="text-accent-600 font-medium">
                {site.url.replace(/^https?:\/\//, "")}
              </Link>
            </li>
          </ul>
        </section>

        <div className="print:hidden">
          <BackToTop />
        </div>
      </ResumeLayout>
    </>
  );
}
