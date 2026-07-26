import type { ExpertiseGroup } from "@/types/content";

// Grouped per docs/06 & docs/08 — never rendered as a flat list or as
// percentage/meter widgets.
export const expertiseGroups: ExpertiseGroup[] = [
  {
    id: "backend",
    label: "Backend & Frameworks",
    description:
      "Primary stack across nine-plus years of enterprise Java delivery — from Spring MVC-era monoliths through Spring Boot microservices on Java 21.",
    items: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "Microservices", "REST APIs"],
  },
  {
    id: "data-messaging",
    label: "Distributed Systems & Data",
    description:
      "Event-driven and data-layer technologies used in production trading and platform systems, including the Enterprise Exchange Platform.",
    items: ["Kafka", "Redis", "PostgreSQL", "Oracle", "MySQL"],
  },
  {
    id: "security-identity",
    label: "Security & Identity",
    description:
      "Led the design and rollout of an OAuth2-based authentication and authorization system across multiple production client deployments.",
    items: ["OAuth2", "JWT"],
  },
  {
    id: "cloud-delivery",
    label: "Cloud & Delivery",
    description:
      "CI/CD strategy, containerization, and cloud deployment ownership — defining pipelines rather than just using them.",
    items: ["AWS", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Maven", "Gradle"],
  },
  {
    id: "ai-engineering",
    label: "AI Engineering",
    description:
      "Applying LLM-based tooling and retrieval-augmented generation to real, shipped resume/hiring products — see the AI Engineering page for specifics.",
    items: ["LangChain", "Prompt Engineering", "RAG", "Python", "Streamlit", "FastAPI"],
  },
  {
    id: "leadership-practice",
    label: "Leadership Practice",
    description:
      "Mentored teams of 5–7 developers and drove architecture/code-review standards at Opal BPM — see the Leadership page for the practices behind each of these.",
    items: [
      "Team Leadership",
      "Mentoring",
      "Architecture Reviews",
      "Code Reviews",
      "Agile Delivery",
      "Stakeholder Communication",
    ],
  },
];
