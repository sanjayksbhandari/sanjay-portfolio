import Link from "next/link";
import type { EngineeringCapability } from "@/types/content";
import { Card } from "@/components/ui/Card";
import { BadgeCollection } from "@/components/experience/BadgeCollection";
import { CopyLinkButton } from "@/components/experience/CopyLinkButton";
import { TodoNote } from "@/components/ui/TodoNote";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/primitives/Accordion";
import { getProjectsForCapability } from "@/content-engine";

/**
 * Engineering Capability Matrix — Capability Card
 * (docs/phase-14-capability-matrix/01-architecture.md). Collapsed:
 * title + overview — enough for a CTO/VP to scan which problem classes
 * are covered. Expanded: the brief's own chain (Verified evidence →
 * Related projects → Related technologies → Business value), plus any
 * honest TODOs. Never a skill meter, star rating, or percentage.
 */
export function CapabilityCard({ capability }: { capability: EngineeringCapability }) {
  const projects = getProjectsForCapability(capability);

  return (
    <Card as="article" elevated id={capability.id} className="scroll-anchor">
      <div className="flex items-start justify-between gap-3">
        <h3 className="type-h4">{capability.title}</h3>
        <CopyLinkButton sectionId={capability.id} className="shrink-0" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{capability.overview}</p>

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value={capability.id}>
          <AccordionTrigger level={4}>Evidence, projects &amp; business value</AccordionTrigger>
          <AccordionContent>
            <dl className="space-y-4">
              <div>
                <dt className="type-label-muted">Verified evidence</dt>
                <dd className="mt-1 text-sm leading-relaxed text-neutral-700">
                  {capability.evidence}
                </dd>
              </div>

              <div>
                <dt className="type-label-muted">Business value</dt>
                <dd className="mt-1 text-sm leading-relaxed text-neutral-700">
                  {capability.businessValue}
                </dd>
              </div>
            </dl>

            {projects.length > 0 ? (
              <div className="mt-5">
                <p className="type-label-muted">Related projects</p>
                <ul className="mt-2 space-y-1.5">
                  {projects.map((cs) => (
                    <li key={cs.slug} className="text-sm">
                      <Link
                        href={`${cs.kind === "personal" ? "/ai-engineering" : "/case-studies"}/${cs.slug}`}
                        className="text-accent-600 font-medium"
                      >
                        {cs.name}
                        {cs.kind === "personal" ? " (personal)" : ""} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {capability.relatedTechnologies && capability.relatedTechnologies.length > 0 ? (
              <div className="mt-5">
                <p className="type-label-muted">Related technologies</p>
                <div className="mt-2">
                  <BadgeCollection items={capability.relatedTechnologies} tone="accent" />
                </div>
              </div>
            ) : null}

            {capability.todos && capability.todos.length > 0 ? (
              <TodoNote className="mt-5" items={capability.todos} />
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
