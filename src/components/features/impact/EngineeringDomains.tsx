import Link from "next/link";
import { getAllEngineeringDomains } from "@/content-engine";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Impact Dashboard Block 2 — Core Engineering Domains. Cards show only a
// label + short factual description (per the brief) — no tech badges
// here, that's Block 3 (`TechnologyEcosystem`), sourced from the same
// underlying data so the two blocks can't drift apart.
export function EngineeringDomains() {
  return (
    <div>
      <SectionHeading level={3} title="Core Engineering Domains" />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {getAllEngineeringDomains().map((domain) => (
          <Card key={domain.id} as="article" elevated className="flex h-full flex-col">
            <h4 className="type-h4">{domain.label}</h4>
            <p className="type-caption mt-2 flex-1 leading-relaxed">{domain.description}</p>
            <Link
              href={domain.href}
              className="text-accent-600 text-caption mt-4 inline-block font-medium"
            >
              Learn more →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
