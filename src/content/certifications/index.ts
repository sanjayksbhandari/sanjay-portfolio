import type { Certification } from "@/types/content";

/**
 * Verified certifications — names, issuers, and dates taken from the
 * certificate PDFs in `public/certificates/` (text extract / OCR) plus
 * the pre-existing Spring credential already on record.
 *
 * Do not invent issuers or dates. Aggregate GenAIx “all lessons”
 * certificate is listed once; individual lesson certificates are also
 * listed because each has its own PDF.
 */
export const certifications: Certification[] = [
  // ---- Pre-existing (no PDF in public/certificates yet) ----
  {
    id: "spring-certified-professional",
    name: "Spring Certified Professional",
    issuer: "VMware",
    date: "2023",
  },

  // ---- Generative AI Foundations (upGrad × Microsoft) ----
  {
    id: "genai-foundations",
    name: "Generative AI Foundations Certificate Program",
    issuer: "upGrad × Microsoft",
    date: "Jun 2025",
  },

  // ---- GenAIx — Gen AI & Prompt Engineering (individual lessons) ----
  {
    id: "genaix-world-of-ai",
    name: "The World of AI",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-gen-ai-fundamentals",
    name: "Gen AI Fundamentals",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-art-of-utilizing-ai",
    name: "The Art of Utilizing AI",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-exploring-chatgpt",
    name: "Exploring ChatGPT",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-mastering-chatgpt",
    name: "Mastering ChatGPT",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-beyond-chatgpt",
    name: "Beyond ChatGPT",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-getting-stuff-done-with-ai",
    name: "Getting Stuff Done with AI",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-ultimate-ai-tools-handbook",
    name: "The Ultimate AI Tools Handbook",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-image-generation",
    name: "Introduction to Image Generation",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-midjourney-and-more",
    name: "Midjourney and More",
    issuer: "GenAIx",
    date: "Apr 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-design-with-ai-canva-figma",
    name: "Design with AI: Canva & Figma",
    issuer: "GenAIx",
    date: "May 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-ai-for-music-videos",
    name: "AI for Music & Videos",
    issuer: "GenAIx",
    date: "May 2025",
    group: "Gen AI & Prompt Engineering",
  },
  {
    id: "genaix-all-lessons",
    name: "Gen AI & Prompt Engineering — All Courses",
    issuer: "GenAIx",
    date: "May 2025",
    group: "Gen AI & Prompt Engineering",
  },

  // ---- Workshop ----
  {
    id: "ai-tools-chatgpt-workshop",
    name: "AI tools and ChatGPT workshop",
    issuer: "AI Tools Workshop",
    date: "Apr 2025",
  },

  // ---- Python ----
  {
    id: "python-foundational-codefobe",
    name: "Foundational course in Python Programming",
    issuer: "CodeFobe",
    date: "Apr 2025",
    group: "Python",
  },
  {
    id: "python-basics-programiz",
    name: "Python Basics Course",
    issuer: "Programiz",
    date: "Apr 2025",
    group: "Python",
  },

  // ---- Cloud / AWS ----
  {
    id: "aws-getting-started-simplilearn",
    name: "Getting Started with AWS",
    issuer: "Simplilearn SkillUP",
    date: "Sep 2025",
    group: "Cloud & AWS",
  },
  {
    id: "cloud-computing-simplilearn",
    name: "Introduction to Cloud Computing",
    issuer: "Simplilearn SkillUP",
    date: "Sep 2025",
    group: "Cloud & AWS",
  },
  {
    id: "aws-technical-essentials",
    name: "AWS Technical Essentials",
    issuer: "AWS Training & Certification",
    date: "Aug 2026",
    group: "Cloud & AWS",
  },
  {
    id: "aws-solutions-architect-fundamentals",
    name: "AWS Solutions Architect — Fundamentals of Architecting on AWS",
    issuer: "AWS Training & Certification",
    date: "Aug 2026",
    group: "Cloud & AWS",
  },
];
