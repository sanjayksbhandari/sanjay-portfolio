import type { ArchitectureCategory } from "@/types/content";

// Architecture Gallery — category taxonomy (docs/phase-10-architecture-
// gallery/02-content-model.md). Fixed order matches the brief's own
// list; `ArchitecturePattern.categoryId` values in `patterns.ts` must
// be one of these ids (enforced by `checkBrokenRelations` — see
// content-engine/validation.ts).
export const architectureCategories: ArchitectureCategory[] = [
  {
    id: "backend-architecture",
    label: "Backend Architecture",
    description: "How an enterprise Java backend is structured so it can keep changing.",
  },
  {
    id: "microservices",
    label: "Microservices",
    description:
      "Splitting a system into independently deployable, independently scalable services.",
  },
  {
    id: "authentication",
    label: "Authentication",
    description: "Establishing who a caller is, and trust across an organizational boundary.",
  },
  {
    id: "api-design",
    label: "API Design",
    description: "The integration surface a service exposes to the rest of the system.",
  },
  {
    id: "messaging",
    label: "Messaging",
    description: "Moving state between services as an explicit sequence of events.",
  },
  {
    id: "caching",
    label: "Caching",
    description:
      "Keeping latency-sensitive read paths fast without overloading the system of record.",
  },
  {
    id: "observability",
    label: "Observability",
    description: "Making a running system's behavior inspectable without reproducing it locally.",
  },
  {
    id: "deployment",
    label: "Deployment",
    description: "Getting a change from merged to running in production, repeatably.",
  },
  {
    id: "ai-systems",
    label: "AI Systems",
    description: "Grounding and structuring LLM-based systems around real source data.",
  },
  {
    id: "security",
    label: "Security",
    description:
      "Enforcing access control centrally rather than scattering it through business logic.",
  },
];
