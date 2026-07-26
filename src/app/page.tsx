import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HeroIntro } from "@/components/features/hero/HeroIntro";
import { ImpactDashboard } from "@/components/features/impact/ImpactDashboard";
import { CaseStudyCard } from "@/components/features/case-studies/CaseStudyCard";
import { LeadershipPrincipleCard } from "@/components/features/leadership/LeadershipPrincipleCard";
import {
  getAllCaseStudies,
  getAllLeadershipPrinciples,
  getAllPersonalProjects,
} from "@/content-engine";

export default function Home() {
  const featuredCaseStudies = getAllCaseStudies().slice(0, 3);
  const featuredPrinciples = getAllLeadershipPrinciples().slice(0, 3);
  const featuredAIProject = getAllPersonalProjects()[0];

  return (
    <>
      <Section
        containerWidth="wide"
        family="hero"
        className="hero-ambient pt-14 sm:pt-20 lg:pt-24 lg:pb-20"
      >
        <HeroIntro />
      </Section>

      {/*
        `id`/`scroll-anchor` — the Hero's `ScrollIndicator` jumps here
        (docs/phase-4-hero-experience/00-README.md). `scroll-anchor` is
        the Phase 3 utility (globals.css) that keeps the sticky header
        from covering the section right after an anchor jump.

        This replaces the old standalone "Technical Expertise" section
        (docs/phase-5-impact-dashboard/00-README.md "What this phase
        replaced, and why") — `ImpactDashboard`'s Core Engineering
        Domains and Technology Ecosystem panels cover the same ground
        from the same underlying content, so the two weren't kept side
        by side as duplicate homepage sections.
      */}
      <Section
        id="home-impact"
        border
        family="experience"
        containerWidth="wide"
        className="scroll-anchor"
      >
        <ImpactDashboard />
      </Section>

      <Section border containerWidth="wide" family="projects">
        <SectionHeading
          kicker="Engineering Case Studies"
          title="Systems designed under real constraints."
          intro="Architecture decisions, tradeoffs accepted, and individual ownership — not a feature list."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCaseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
        <div className="mt-9">
          <Link
            href="/case-studies"
            className="hover:text-accent-700 dark:text-accent-600 dark:hover:text-accent-700 text-sm font-medium text-[var(--color-accent-royal)] transition-colors duration-[var(--motion-micro)]"
          >
            View all case studies →
          </Link>
        </div>
      </Section>

      <Section border containerWidth="wide" family="leadership">
        <SectionHeading
          kicker="Leadership"
          title="Leadership shown through practice, not adjectives."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featuredPrinciples.map((p) => (
            <LeadershipPrincipleCard key={p.id} principle={p} />
          ))}
        </div>
        <div className="mt-9">
          <Link
            href="/leadership"
            className="hover:text-accent-700 dark:text-accent-600 dark:hover:text-accent-700 text-sm font-medium text-[var(--color-accent-royal)] transition-colors duration-[var(--motion-micro)]"
          >
            View all leadership practices →
          </Link>
        </div>
      </Section>

      <Section border containerWidth="wide" family="ai">
        <SectionHeading
          kicker="AI Engineering"
          title="17 years of enterprise Java discipline, applied to AI-native product building."
        />
        <div className="mt-12 max-w-2xl">
          <CaseStudyCard caseStudy={featuredAIProject} />
        </div>
        <div className="mt-9">
          <Link
            href="/ai-engineering"
            className="hover:text-accent-700 dark:text-accent-600 dark:hover:text-accent-700 text-sm font-medium text-[var(--color-accent-royal)] transition-colors duration-[var(--motion-micro)]"
          >
            View all AI engineering projects →
          </Link>
        </div>
      </Section>

      <Section border containerWidth="wide" family="contact" className="text-center">
        <h2 className="type-h2 mx-auto max-w-xl">
          Looking for a Java engineering leader who can own architecture end to end?
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/resume" size="lg">
            View Resume
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Get in Touch
          </Button>
        </div>
      </Section>
    </>
  );
}
