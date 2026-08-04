import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  TableOfContents,
  StickySectionNav,
  SectionHeader,
  FactCard,
  Callout,
  BackToTop,
  BadgeCollection,
} from "@/components/experience";
import { DocumentationLayout } from "@/components/experience/layouts/DocumentationLayout";
import { CapabilityCard } from "@/components/features/expertise/CapabilityCard";
import { CapabilityFilterBar } from "@/components/features/expertise/CapabilityFilterBar";
import { ResponsibilitiesMatrix } from "@/components/features/expertise/ResponsibilitiesMatrix";
import { ADRCard } from "@/components/features/architecture/ADRCard";
import { Badge } from "@/components/ui/Badge";
import { TodoNote } from "@/components/ui/TodoNote";
import {
  getAllEngineeringCapabilities,
  getAllEngineeringResponsibilities,
  getCapabilityFilterFacets,
  getCapabilityFilterables,
  getFeaturedCapabilityDecisions,
  CAPABILITY_DECISION_AREA_LABELS,
  getTechnologyCategories,
} from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Engineering Capability Matrix",
  description:
    "What kinds of engineering problems I can solve — capability domains backed by verified evidence and business value, not a technology badge page or skill-meter list.",
  path: "/expertise",
});

/** Technology Ecosystem categories the brief asks for on this page —
 * the same `techCategories` catalog the Impact Dashboard already uses,
 * filtered to the brief's own axis (Languages, Frameworks, Databases,
 * Messaging, Containers, Cloud, Security, AI). Payments is intentionally
 * omitted here — it supports ATS Resume Builder's billing surface, not
 * an engineering-capability claim on this page. */
const ECOSYSTEM_CATEGORY_IDS = new Set([
  "languages",
  "frameworks",
  "databases",
  "messaging",
  "containers",
  "cloud",
  "ci-cd",
  "security",
  "ai",
]);

const pageSections = [
  { id: "capability-domains", title: "Capability Domains" },
  { id: "responsibilities", title: "Engineering Responsibilities" },
  { id: "technology-ecosystem", title: "Technology Ecosystem" },
  { id: "decision-areas", title: "Decision Areas" },
];

export default function ExpertisePage() {
  const capabilities = getAllEngineeringCapabilities();
  const responsibilities = getAllEngineeringResponsibilities();
  const { technologies } = getCapabilityFilterFacets();
  const filterables = getCapabilityFilterables();
  const featuredDecisions = getFeaturedCapabilityDecisions();
  const ecosystemCategories = getTechnologyCategories().filter((category) =>
    ECOSYSTEM_CATEGORY_IDS.has(category.id)
  );

  const withProjects = capabilities.filter(
    (c) => (c.relatedCaseStudySlugs ?? []).length > 0
  ).length;

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "Expertise", href: "/expertise" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <DocumentationLayout family="experience" nav={<StickySectionNav items={pageSections} />}>
        <PageHero
          breadcrumbItems={visualItems}
          kicker="Engineering Capability Matrix"
          title="What kinds of engineering problems I can solve."
          intro="An executive summary of my verified capability domains — each tied to evidence and business value from case studies, achievements, and journey entries on this site."
          meta={[
            `${capabilities.length} capability domains`,
            "No skill meters, stars, or percentages",
          ]}
        />

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-2">
          <FactCard label="Capability domains" value={String(capabilities.length)} />
          <FactCard label="Tied to verified projects" value={String(withProjects)} />
        </div>

        <div className="lg:hidden">
          <TableOfContents items={pageSections} />
        </div>

        {/* 1. Capability Domains ------------------------------------------------ */}
        <section id="capability-domains" className="scroll-anchor mt-16">
          <SectionHeader sectionId="capability-domains" title="Capability Domains" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Fifteen problem classes with verified evidence from my work. Expand a card for the
            evidence → projects → technologies → business value chain; filter when you already know
            which technology or domain matters to the role.
          </p>

          <div className="mt-8">
            <CapabilityFilterBar technologies={technologies} capabilities={filterables} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {capabilities.map((capability) => (
              <CapabilityCard key={capability.id} capability={capability} />
            ))}
          </div>
        </section>

        {/* 2. Engineering Responsibilities Matrix -------------------------------- */}
        <section id="responsibilities" className="scroll-anchor mt-16">
          <SectionHeader sectionId="responsibilities" title="Engineering Responsibilities Matrix" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            The same verified capabilities, sliced by responsibility category rather than by problem
            class — what I have actually owned across architecture, delivery, leadership, and
            production support.
          </p>
          <div className="mt-8">
            <ResponsibilitiesMatrix responsibilities={responsibilities} />
          </div>
        </section>

        {/* 3. Technology Ecosystem ------------------------------------------------ */}
        <section id="technology-ecosystem" className="scroll-anchor mt-16">
          <SectionHeader sectionId="technology-ecosystem" title="Technology Ecosystem" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Technologies only as supporting evidence for the capabilities above — the same verified
            catalog the Impact Dashboard already organizes by category. No ratings, no logo cloud;
            badges only.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ecosystemCategories.map((category) => (
              <div
                key={category.id}
                id={`ecosystem-${category.id}`}
                className="scroll-anchor surface p-5"
              >
                <p className="type-h4">{category.label}</p>
                <div className="mt-3">
                  <BadgeCollection items={category.items} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Decision Areas ------------------------------------------------------- */}
        <section id="decision-areas" className="scroll-anchor mt-16">
          <SectionHeader sectionId="decision-areas" title="Decision Areas" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Where engineering judgment shows up as a recorded decision — Security, Scalability,
            Maintainability, and Incident response. Architecture decomposition and trade-off worked
            examples already live on the{" "}
            <Link href="/leadership#decision-framework" className="text-accent-600 font-medium">
              Leadership
            </Link>{" "}
            and{" "}
            <Link href="/architecture#decision-records" className="text-accent-600 font-medium">
              Architecture Gallery
            </Link>{" "}
            pages; the four ADRs below are a different set so this page doesn&rsquo;t repeat those.
          </p>

          <div className="mt-8 space-y-6">
            {featuredDecisions.map((record) => (
              <div key={record.id}>
                <Badge className="mb-2">
                  {CAPABILITY_DECISION_AREA_LABELS[record.id] ?? "Decision"}
                </Badge>
                <ADRCard record={record} />
              </div>
            ))}
          </div>

          <TodoNote
            className="mt-8 max-w-xl"
            items={[
              {
                label:
                  "A dedicated performance-tuning decision record (profiling, load testing, caching trade-offs), once documented",
              },
            ]}
          />

          <Callout tone="note" title="Full decision set" className="mt-8 max-w-2xl">
            All nine Architecture Decision Records — including the Exchange Platform&rsquo;s
            16-service decomposition and the Beckn adapter&rsquo;s state-machine design — are on the
            Architecture Gallery. This section only features the four that map onto judgment areas
            not already walked through as worked examples on Leadership.
          </Callout>

          <p className="mt-6">
            <Link
              href="/architecture#decision-records"
              className="text-accent-600 text-sm font-medium"
            >
              See all decision records in the Architecture Gallery →
            </Link>
          </p>
        </section>

        <BackToTop />
      </DocumentationLayout>
    </>
  );
}
