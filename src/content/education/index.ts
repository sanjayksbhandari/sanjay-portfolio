import type { AcademicCredential, LearningCategory } from "@/types/content";

/**
 * Verified academic record — sourced from the Education & Continuous
 * Learning brief. Newest first to match the career timeline convention.
 */
export const academicCredentials: AcademicCredential[] = [
  {
    id: "mca",
    degree: "Master of Computer Applications (MCA)",
    institute: "Sri Balaji College of Engineering & Technology",
    authority: "University of Rajasthan",
    authorityLabel: "University",
    location: "Jaipur, Rajasthan",
    duration: "2004 – 2007",
    score: "79.5%",
    kind: "masters",
  },
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institute: "Graphic Era Institute of Technology",
    authority: "Hemwati Nandan Bahuguna Garhwal University (HNBGU)",
    authorityLabel: "University",
    location: "Dehradun, Uttarakhand",
    duration: "2000 – 2003",
    score: "64.91%",
    kind: "bachelors",
  },
  {
    id: "class-xii",
    degree: "Class XII",
    institute: "Army School",
    authority: "CBSE",
    authorityLabel: "Board",
    location: "Raiwala, Dehradun, Uttarakhand",
    duration: "2000",
    score: "64.2%",
    kind: "secondary",
  },
  {
    id: "class-x",
    degree: "Class X",
    institute: "Government Inter College (GIC)",
    authority: "U.P. Board",
    authorityLabel: "Board",
    location: "Gauchar, Chamoli, Uttarakhand",
    duration: "1997",
    score: "67.83%",
    kind: "secondary",
  },
];

/**
 * Continuous Learning categories — groups verified certifications by theme.
 * Counts come from `certificationIds` only (no invented credentials).
 *
 * The GenAIx “all courses” aggregate certificate is omitted from category
 * counts so individual lesson certificates are not double-counted.
 */
export const learningCategories: LearningCategory[] = [
  {
    id: "artificial-intelligence",
    category: "Artificial Intelligence",
    summary:
      "Core AI literacy — fundamentals and the broader landscape of applied artificial intelligence.",
    certificationIds: ["genaix-gen-ai-fundamentals", "genaix-world-of-ai"],
  },
  {
    id: "generative-ai",
    category: "Generative AI",
    summary:
      "Structured foundations in generative AI systems through a formal certificate program.",
    certificationIds: ["genai-foundations"],
  },
  {
    id: "chatgpt",
    category: "ChatGPT",
    summary:
      "Hands-on ChatGPT fluency — exploration, mastery, and going beyond defaults, plus a practical AI tools workshop.",
    certificationIds: [
      "genaix-exploring-chatgpt",
      "genaix-mastering-chatgpt",
      "genaix-beyond-chatgpt",
      "ai-tools-chatgpt-workshop",
    ],
  },
  {
    id: "ai-productivity",
    category: "AI Productivity",
    summary: "Using AI deliberately to improve professional effectiveness and daily workflows.",
    certificationIds: ["genaix-art-of-utilizing-ai", "genaix-getting-stuff-done-with-ai"],
  },
  {
    id: "ai-content-creation",
    category: "AI Content Creation",
    summary:
      "Image, design, and media generation — from Midjourney to Canva, Figma, music, and video.",
    certificationIds: [
      "genaix-image-generation",
      "genaix-midjourney-and-more",
      "genaix-design-with-ai-canva-figma",
      "genaix-ai-for-music-videos",
    ],
  },
  {
    id: "emerging-ai-tools",
    category: "Emerging AI Tools",
    summary: "Survey of contemporary AI tooling and how to evaluate it for real work.",
    certificationIds: ["genaix-ultimate-ai-tools-handbook"],
  },
  {
    id: "cloud-aws",
    category: "Cloud & AWS",
    summary:
      "Cloud foundations and AWS training — from getting started through solutions-architect fundamentals.",
    certificationIds: [
      "aws-getting-started-simplilearn",
      "cloud-computing-simplilearn",
      "aws-technical-essentials",
      "aws-solutions-architect-fundamentals",
    ],
  },
  {
    id: "python",
    category: "Python",
    summary: "Foundational and basics-level Python programming credentials.",
    certificationIds: ["python-foundational-codefobe", "python-basics-programiz"],
  },
];
