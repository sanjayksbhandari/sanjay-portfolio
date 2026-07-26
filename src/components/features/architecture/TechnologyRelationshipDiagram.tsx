import { ArrowDown } from "lucide-react";
import type { TechnologyRelationshipStage } from "@/content-engine";
import { Icon } from "@/components/primitives/Icon";
import { BadgeCollection } from "@/components/experience/BadgeCollection";

/** Conceptual layer diagram — layers with verified tech only. */
export function TechnologyRelationshipDiagram({
  stages,
}: {
  stages: TechnologyRelationshipStage[];
}) {
  const visible = stages.filter((stage) => stage.verifiedTechnologies.length > 0);
  if (visible.length === 0) return null;

  return (
    <ol className="mt-8 max-w-md" aria-label="Conceptual technology layering, top to bottom">
      {visible.map((stage, i) => (
        <li key={stage.id}>
          {i > 0 ? (
            <div className="flex justify-center py-2" aria-hidden="true">
              <Icon icon={ArrowDown} size="sm" className="text-neutral-400" />
            </div>
          ) : null}
          <div className="surface p-5">
            <p className="type-h4">{stage.label}</p>
            <div className="mt-3">
              <BadgeCollection items={stage.verifiedTechnologies} tone="accent" />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
