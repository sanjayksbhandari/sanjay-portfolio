import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  TableOfContents,
  StickySectionNav,
  SectionHeader,
  NarrativeBlock,
  AchievementPanel,
  FactCard,
  BackToTop,
} from "@/components/experience";
import { DocumentationLayout } from "@/components/experience/layouts/DocumentationLayout";
import { LeadershipPrincipleCard } from "@/components/features/leadership/LeadershipPrincipleCard";
import { LeadershipTimeline } from "@/components/features/leadership/LeadershipTimeline";
import { ADRCard } from "@/components/features/architecture/ADRCard";
import { TodoNote } from "@/components/ui/TodoNote";
import {
  getLeadershipTimeline,
  getDeliveryPracticesForLeadership,
  getFeaturedLeadershipDecisions,
  getAllLeadershipPrinciples,
  getEngineeringPrinciples,
  getAllAchievements,
} from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbTrail } from "@/lib/seo/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Technical Leadership & Engineering Philosophy",
  description:
    "How team leadership, mentoring, delivery, stakeholder collaboration, and architectural decision-making actually show up across nine years of running Opal BPM's engineering — not a leadership-poster list.",
  path: "/leadership",
});

const pageSections = [
  { id: "leadership-timeline", title: "Leadership Timeline" },
  { id: "engineering-principles", title: "Engineering Principles" },
  { id: "mentoring", title: "Mentoring & Team Growth" },
  { id: "delivery", title: "Delivery Excellence" },
  { id: "collaboration", title: "Stakeholder Collaboration" },
  { id: "decision-framework", title: "Decision-Making Framework" },
  { id: "culture", title: "Engineering Culture" },
];

function principleById(id: string) {
  const principle = getAllLeadershipPrinciples().find((p) => p.id === id);
  if (!principle) return null;
  return <LeadershipPrincipleCard principle={principle} />;
}

function achievementById(id: string) {
  const achievement = getAllAchievements().find((a) => a.id === id);
  return achievement
    ? [{ id: achievement.id, statement: achievement.statement, context: achievement.context }]
    : [];
}

export default function LeadershipPage() {
  const timelineStages = getLeadershipTimeline();
  const deliveryPractices = getDeliveryPracticesForLeadership();
  const featuredDecisions = getFeaturedLeadershipDecisions();
  const engineeringPrinciples = getEngineeringPrinciples();

  const { visualItems, jsonLd: breadcrumbLd } = buildBreadcrumbTrail([
    { name: "Home", href: "/" },
    { name: "Leadership", href: "/leadership" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <DocumentationLayout family="leadership" nav={<StickySectionNav items={pageSections} />}>
        <PageHero
          breadcrumbItems={visualItems}
          kicker="Technical Leadership & Engineering Philosophy"
          title="How the team, the delivery, and the decisions actually got run."
          intro="How technical leadership showed up in one verified role: growing from Opal BPM's second engineering hire into leading its platform and a 5–7 developer team over nine-plus years."
          meta={["9 years, 7 months in a leadership role", "5–7 developers led"]}
        />

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
          <FactCard label="Grew from" value="Second engineering hire → Lead Java Developer" />
          <FactCard label="Team led" value="5–7 developers" />
          <FactCard label="Tenure in the role" value="Sep 2015 – Apr 2025" />
        </div>

        <div className="lg:hidden">
          <TableOfContents items={pageSections} />
        </div>

        {/* 1. Leadership Timeline --------------------------------------------- */}
        <section id="leadership-timeline" className="scroll-anchor mt-16">
          <SectionHeader sectionId="leadership-timeline" title="Leadership Timeline" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            The same verified roles as the Engineering Journey&rsquo;s Career Timeline, isolated to
            one question: which of them carried verified leadership scope, and which didn&rsquo;t.
            For the full role-by-role breakdown, see{" "}
            <Link href="/journey#timeline" className="text-accent-600 font-medium">
              Engineering Journey
            </Link>
            .
          </p>
          <div className="mt-8">
            <LeadershipTimeline stages={timelineStages} />
          </div>
        </section>

        {/* 2. Engineering Principles -------------------------------------------- */}
        <section id="engineering-principles" className="scroll-anchor mt-16">
          <SectionHeader sectionId="engineering-principles" title="Engineering Principles" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Five maxims — each already paired with the one verified decision that put it into
            practice on the{" "}
            <Link href="/architecture#principles" className="text-accent-600 font-medium">
              Architecture Gallery
            </Link>
            , not repeated here a second time. Titles only, so this reads as a summary of
            what&rsquo;s demonstrated in depth elsewhere, not a duplicate of that page.
          </p>
          <ul className="mt-6 max-w-xl space-y-3">
            {engineeringPrinciples.map((principle) => (
              <li key={principle.id} className="flex gap-2 text-base text-neutral-800">
                <span
                  className="bg-accent-600 mt-2.5 h-1 w-1 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                {principle.title}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Mentoring & Team Growth --------------------------------------------- */}
        <section id="mentoring" className="scroll-anchor mt-16">
          <SectionHeader sectionId="mentoring" title="Mentoring & Team Growth" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Direct mentoring and code-review-based standards are verified for the 5–7 developer team
            at Opal BPM; the onboarding process and design-discussion format aren&rsquo;t documented
            in Sanjay&rsquo;s own words yet.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {principleById("mentoring")}
            {principleById("code-reviews")}
          </div>
          <div className="mt-8">
            <AchievementPanel items={achievementById("team-mentoring")} />
          </div>
          <TodoNote
            className="mt-8 max-w-xl"
            items={[
              { label: "Developer onboarding process, in your own words" },
              {
                label: "Knowledge-sharing practices beyond code review (docs, pairing, brown-bags)",
              },
              { label: "Format of design discussions you run or participate in" },
            ]}
          />
        </section>

        {/* 4. Delivery Excellence -------------------------------------------------- */}
        <section id="delivery" className="scroll-anchor mt-16">
          <SectionHeader sectionId="delivery" title="Delivery Excellence" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Incremental delivery and direct ownership of release/deployment are verified; the
            specific release-planning cadence, QA methodology, and risk-management process
            aren&rsquo;t documented yet.
          </p>
          <div className="mt-8">{principleById("agile-delivery")}</div>
          <NarrativeBlock
            id="delivery-practices"
            title="Release & deployment practices"
            level={3}
            items={deliveryPractices}
            className="mt-8"
          />
          <div className="mt-8">
            <AchievementPanel items={achievementById("mttr-reduction")} />
          </div>
          <TodoNote
            className="mt-8 max-w-xl"
            items={[
              {
                label: "Release-planning cadence and roadmap-execution process, in your own words",
              },
              { label: "QA/testing methodology used to keep delivery quality high" },
              { label: "Specific risk-management practices for production changes" },
            ]}
          />
        </section>

        {/* 5. Stakeholder Collaboration --------------------------------------------- */}
        <section id="collaboration" className="scroll-anchor mt-16">
          <SectionHeader sectionId="collaboration" title="Stakeholder Collaboration" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Verified for business stakeholders (translating requirements into architecture),
            engineering (onshore/offshore delivery alignment), and clients (standardizing security
            across multiple independent deployments) — not yet documented for product or QA
            specifically.
          </p>
          <div className="mt-8 max-w-xl">{principleById("stakeholder-communication")}</div>
          <TodoNote
            className="mt-8 max-w-xl"
            items={[
              { label: "A specific example of collaborating directly with a product team" },
              { label: "A specific example of collaborating directly with QA" },
            ]}
          />
        </section>

        {/* 6. Decision-Making Framework ------------------------------------------------ */}
        <section id="decision-framework" className="scroll-anchor mt-16">
          <SectionHeader sectionId="decision-framework" title="Decision-Making Framework" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Every architectural decision on record follows the same shape — a problem the system
            actually had, the options weighed, the trade-off accepted, and the decision made. The
            Architecture Decision Record fields below map onto that framework: Context is the
            problem, Alternatives considered are the options, and Consequences is the trade-off
            accepted.
          </p>
          <div className="mt-8 max-w-xl">{principleById("architecture-reviews")}</div>
          <div className="mt-8 space-y-4">
            {featuredDecisions.map((record) => (
              <ADRCard key={record.id} record={record} />
            ))}
          </div>
          <p className="mt-6">
            <Link
              href="/architecture#decision-records"
              className="text-accent-600 text-sm font-medium"
            >
              See all decision records in the Architecture Gallery →
            </Link>
          </p>
        </section>

        {/* 7. Engineering Culture ------------------------------------------------------- */}
        <section id="culture" className="scroll-anchor mt-16">
          <SectionHeader sectionId="culture" title="Engineering Culture" />
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            What&rsquo;s verified about how the team actually worked, day to day — not a values
            statement.
          </p>
          <ul className="mt-8 max-w-xl space-y-4">
            <li className="flex gap-2 text-base leading-relaxed text-neutral-700">
              <span
                className="bg-accent-600 mt-2 h-1 w-1 shrink-0 rounded-full"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-neutral-800">Ownership.</strong> Joined Opal BPM
                as its second engineering hire and stayed through its Lead Java Developer role for
                nine-plus years — sustained ownership of one platform, not a series of shorter
                engagements.
              </span>
            </li>
            <li className="flex gap-2 text-base leading-relaxed text-neutral-700">
              <span
                className="bg-accent-600 mt-2 h-1 w-1 shrink-0 rounded-full"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-neutral-800">Code quality.</strong> Set
                code-review and system-design standards for the team (see Mentoring & Team Growth,
                above) rather than relying on ad hoc review.
              </span>
            </li>
            <li className="flex gap-2 text-base leading-relaxed text-neutral-700">
              <span
                className="bg-accent-600 mt-2 h-1 w-1 shrink-0 rounded-full"
                aria-hidden="true"
              />
              <span>
                <strong className="font-medium text-neutral-800">
                  Maintainability & automation.
                </strong>{" "}
                Covered in depth as their own Architecture Gallery principles —{" "}
                <Link href="/architecture#principles" className="text-accent-600 font-medium">
                  Design for maintainability
                </Link>{" "}
                and{" "}
                <Link href="/architecture#principles" className="text-accent-600 font-medium">
                  Automate repetitive work
                </Link>
                .
              </span>
            </li>
          </ul>
          <TodoNote
            className="mt-8 max-w-xl"
            items={[
              { label: "Documentation practices used for the team/codebase, in your own words" },
              {
                label:
                  "How continuous learning was supported for the team (training, conference budget, internal talks)",
              },
            ]}
          />
        </section>

        <BackToTop />
      </DocumentationLayout>
    </>
  );
}
