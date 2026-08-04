import type { Metadata } from "next";
import {
  PageHero,
  TableOfContents,
  StickySectionNav,
  SectionHeader,
  BackToTop,
} from "@/components/experience";
import { DocumentationLayout } from "@/components/experience/layouts/DocumentationLayout";
import { ResumeCenter } from "@/components/features/contact/ResumeCenter";
import { ContactOptionsList } from "@/components/features/contact/ContactOptionsList";
import { AvailabilityPanel } from "@/components/features/contact/AvailabilityPanel";
import { RecruiterResourcesList } from "@/components/features/contact/RecruiterResourcesList";
import { HubFAQ } from "@/components/features/contact/HubFAQ";
import { SocialPresenceList } from "@/components/features/contact/SocialPresenceList";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { site } from "@/config/site";
import {
  getProfessionalSummary,
  getResumeArtifact,
  getPrimaryContactMethods,
  getSecondaryContactMethods,
  getAvailabilityFacts,
  getRecruiterResources,
  getHubFaqItems,
  getVerifiedSocialPresence,
  getPerson,
} from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Professional Hub",
  description: "My resume, contact options, and recruiter shortcuts.",
  path: "/contact",
});

const pageSections = [
  { id: "professional-summary", title: "Professional Summary" },
  { id: "resume-center", title: "Resume Center" },
  { id: "contact-options", title: "Contact" },
  { id: "availability", title: "Availability" },
  { id: "recruiter-resources", title: "Recruiter Resources" },
  { id: "faq", title: "FAQ" },
  { id: "social-presence", title: "Social" },
];

export default function ProfessionalHubPage() {
  const summary = getProfessionalSummary();
  const resume = getResumeArtifact();
  const primaryContacts = getPrimaryContactMethods().filter((m) => Boolean(m.href));
  const secondaryContacts = getSecondaryContactMethods().filter((m) => Boolean(m.href));
  const availability = getAvailabilityFacts().filter((f) => Boolean(f.value));
  const resources = getRecruiterResources();
  const faqItems = getHubFaqItems();
  const verifiedSocial = getVerifiedSocialPresence();
  const person = getPerson();

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "Professional Hub", href: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <DocumentationLayout family="contact" nav={<StickySectionNav items={pageSections} />}>
        <PageHero
          breadcrumbItems={visualItems}
          kicker="Professional Hub"
          title="Resume, contact, and the pages that answer a hiring conversation."
          intro="Download the resume, open LinkedIn, or jump into journey, architecture, and case studies."
          meta={[person.headline, `${person.yearsExperience} years`, person.location]}
        />

        <div className="lg:hidden">
          <TableOfContents items={pageSections} />
        </div>

        <section id="professional-summary" className="scroll-anchor mt-16">
          <SectionHeader sectionId="professional-summary" title="Professional Summary" />
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-neutral-600">
            <p>{summary.focus}</p>
            <p>{summary.experienceLevel}</p>
          </div>
        </section>

        <section id="resume-center" className="scroll-anchor mt-16">
          <SectionHeader sectionId="resume-center" title="Resume Center" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Download the PDF, read the online resume, or print from the browser.
          </p>
          <div className="mt-8">
            <ResumeCenter artifact={resume} />
          </div>
        </section>

        <section id="contact-options" className="scroll-anchor mt-16">
          <SectionHeader sectionId="contact-options" title="Contact" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            LinkedIn is the primary outreach channel.{" "}
            <ExternalLink href={site.social.linkedin} label="LinkedIn">
              Message on LinkedIn
            </ExternalLink>
            .
          </p>
          <div className="mt-8">
            <ContactOptionsList primary={primaryContacts} secondary={secondaryContacts} />
          </div>
        </section>

        <section id="availability" className="scroll-anchor mt-16">
          <SectionHeader sectionId="availability" title="Availability" />
          <div className="mt-8">
            <AvailabilityPanel facts={availability} />
          </div>
        </section>

        <section id="recruiter-resources" className="scroll-anchor mt-16">
          <SectionHeader sectionId="recruiter-resources" title="Recruiter Resources" />
          <div className="mt-8">
            <RecruiterResourcesList resources={resources} />
          </div>
        </section>

        <section id="faq" className="scroll-anchor mt-16">
          <SectionHeader sectionId="faq" title="FAQ" />
          <div className="mt-8">
            <HubFAQ items={faqItems} />
          </div>
        </section>

        <section id="social-presence" className="scroll-anchor mt-16">
          <SectionHeader sectionId="social-presence" title="Social" />
          <div className="mt-8">
            <SocialPresenceList verified={verifiedSocial} planned={[]} />
          </div>
        </section>

        <BackToTop />
      </DocumentationLayout>
    </>
  );
}
