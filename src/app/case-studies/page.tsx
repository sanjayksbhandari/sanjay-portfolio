import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseStudyCard } from "@/components/features/case-studies/CaseStudyCard";
import { getAllCaseStudies } from "@/content-engine";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Five enterprise systems — authentication, distributed trading, protocol adapters, and financial platforms — with the architecture decisions and tradeoffs behind each.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <Section containerWidth="wide" family="projects" className="pt-16 sm:pt-20">
      <SectionHeading
        level={1}
        kicker="Engineering Case Studies"
        title="Five systems. Real constraints. Individual ownership called out explicitly."
        intro="Each case study follows the same structure: context, my role, architecture, decisions and tradeoffs, challenges, and outcome."
      />
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {getAllCaseStudies().map((cs) => (
          <CaseStudyCard key={cs.slug} caseStudy={cs} />
        ))}
      </div>
    </Section>
  );
}
