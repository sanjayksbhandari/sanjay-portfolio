import type { CaseStudy } from "@/types/content";
import { Section, type CardFamily } from "@/components/layout/Section";
import { CaseStudyCard } from "./CaseStudyCard";

/**
 * Related Projects — shown for both enterprise and personal projects
 * (`relatedSlugs` resolves within whichever list the calling route
 * passed in), same card as every index page uses.
 */
export function RelatedProjects({
  projects,
  family = "projects",
}: {
  projects: CaseStudy[];
  family?: CardFamily;
}) {
  if (projects.length === 0) return null;

  return (
    <Section border containerWidth="wide" family={family}>
      <h2 className="type-h3">Related projects</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <CaseStudyCard key={project.slug} caseStudy={project} />
        ))}
      </div>
    </Section>
  );
}
