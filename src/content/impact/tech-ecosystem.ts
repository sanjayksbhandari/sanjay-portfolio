import type { TechCategory } from "@/types/content";

// Impact Dashboard Block 3 — Technology Ecosystem
// (docs/phase-5-impact-dashboard/02-content-sourcing.md).
//
// Every item below already appears in `src/content/expertise.ts`, a
// `stack` array in `src/content/case-studies/*.ts`, or a `stack` array in
// `src/content/ai-projects/*.ts` — this file adds no new technology,
// only a second, tool-category axis (Languages/Frameworks/Cloud/...)
// across the same verified set, per the brief's "organize technologies
// by category" instruction. `Microservices` and `PWA` are intentionally
// excluded here even though they appear in source `stack` arrays — both
// are architectural patterns, not tools/products, and are already
// represented at the pattern level in `src/content/domains.ts` and the
// individual case studies instead of being duplicated as a "technology."
export const techCategories: TechCategory[] = [
  { id: "languages", label: "Languages", items: ["Java", "Python"] },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    items: [
      "Spring Boot",
      "Spring MVC",
      "FastAPI",
      "Flask",
      "React",
      "ExtJS",
      "Streamlit",
      "REST APIs",
    ],
  },
  { id: "cloud", label: "Cloud & Infrastructure", items: ["AWS"] },
  { id: "messaging", label: "Messaging & Async", items: ["Kafka", "Celery"] },
  {
    id: "databases",
    label: "Databases",
    items: ["PostgreSQL", "Redis", "Oracle", "MySQL", "SQLite"],
  },
  { id: "containers", label: "Containers & Orchestration", items: ["Docker", "Kubernetes"] },
  {
    id: "ci-cd",
    label: "CI/CD & Build",
    items: ["Jenkins", "CI/CD", "Maven", "Gradle"],
  },
  {
    id: "security",
    label: "Security & Identity",
    items: ["OAuth2", "JWT", "Spring Security"],
  },
  {
    id: "ai",
    label: "AI Engineering",
    items: ["LangChain", "RAG", "Prompt Engineering"],
  },
  { id: "payments", label: "Payments", items: ["Stripe", "Razorpay"] },
];
