import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  TableOfContents,
  StickySectionNav,
  SectionHeader,
  BackToTop,
} from "@/components/experience";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { EducationTimeline } from "@/components/features/education/EducationTimeline";
import { ContinuousLearningGrid } from "@/components/features/education/ContinuousLearningGrid";
import { CertificateGallery } from "@/components/features/education/CertificateGallery";
import {
  getAcademicCredentials,
  getLearningCategories,
  getCertificateGallery,
} from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Education & Continuous Learning",
  description:
    "My academic foundation and commitment to continuous professional growth — MCA, BCA, AI learning, cloud/AWS, and Python credentials.",
  path: "/education",
});

const pageSections = [
  { id: "education", title: "Education" },
  { id: "continuous-learning", title: "Continuous Learning" },
  { id: "certificate-gallery", title: "Certificate Gallery" },
];

export default function EducationPage() {
  const credentials = getAcademicCredentials();
  const learning = getLearningCategories().filter((c) => c.programCount > 0);
  const certificates = getCertificateGallery();
  const totalPrograms = learning.reduce((sum, c) => sum + c.programCount, 0);

  const sections = certificates.length
    ? pageSections
    : pageSections.filter((s) => s.id !== "certificate-gallery");

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "Education & Continuous Learning", href: "/education" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Section containerWidth="wide" family="experience" className="pt-16 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="min-w-0">
            <PageHero
              breadcrumbItems={visualItems}
              kicker="Background"
              title="Education & Continuous Learning"
              intro="My academic foundation and commitment to continuous professional growth."
              meta={[
                `${credentials.length} academic credentials`,
                `${totalPrograms} learning programs`,
                ...(certificates.length ? [`${certificates.length} certificates on file`] : []),
              ]}
            />

            <div className="lg:hidden">
              <TableOfContents items={sections} />
            </div>

            <section id="education" className="scroll-anchor mt-16">
              <SectionHeader sectionId="education" title="Education" />
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
                A clear academic line — from school through postgraduate study — that underpins 17+
                years of engineering work.
              </p>
              <EducationTimeline credentials={credentials} />
            </section>

            <section id="continuous-learning" className="scroll-anchor mt-20">
              <SectionHeader sectionId="continuous-learning" title="Continuous Learning" />
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
                I keep investing in adjacent skills — especially AI — without treating every
                certificate as a separate badge. Related programs are grouped so the pattern of
                learning is easy to scan.
              </p>
              <ContinuousLearningGrid categories={learning} />

              {certificates.length > 0 ? (
                <div className="mt-10">
                  <Button href="#certificate-gallery" size="lg" variant="secondary">
                    View All Learning Certificates
                  </Button>
                </div>
              ) : null}
            </section>

            {certificates.length > 0 ? (
              <section id="certificate-gallery" className="scroll-anchor mt-20">
                <SectionHeader sectionId="certificate-gallery" title="Certificate Gallery" />
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
                  Verified certificate files — open any item for a full preview, then move with
                  arrows or the keyboard.
                </p>
                <CertificateGallery assets={certificates} />
              </section>
            ) : null}

            <p className="mt-16 text-sm text-neutral-600">
              Looking for role outcomes instead? See{" "}
              <Link href="/achievements" className="text-accent-600 font-medium">
                Achievements
              </Link>{" "}
              or the{" "}
              <Link href="/resume" className="text-accent-600 font-medium">
                resume
              </Link>
              .
            </p>

            <BackToTop />
          </div>

          <div>
            <StickySectionNav items={sections} />
          </div>
        </div>
      </Section>
    </>
  );
}
