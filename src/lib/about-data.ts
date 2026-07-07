import { Award, BookOpen, BrainCircuit, Terminal as TerminalIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface JourneyStep {
  title: string;
  body: string;
}

export const journey: JourneyStep[] = [
  {
    title: "Learning the Foundations",
    body: "Started by learning programming fundamentals, Java, web development, Git, and modern frontend technologies.",
  },
  {
    title: "Building Web Projects",
    body: "Moved from learning concepts to building responsive web experiences and practical applications using React, TypeScript, Tailwind CSS, and modern development tools.",
  },
  {
    title: "Exploring AI Products",
    body: "Started integrating AI into practical applications, including resume analysis, document understanding, OCR workflows, and guided user experiences.",
  },
  {
    title: "Shipping Real Work",
    body: "Worked on a production website for K A Gupta & Associates and collaborated on Symbiotic City 2070, which won the Public Opinion category at the Copilot Jam hackathon.",
  },
];

export interface BuildArea {
  title: string;
  description: string;
  icon: string; // lucide icon name resolved in component
}

export const buildAreas: BuildArea[] = [
  {
    title: "Full-Stack Web Applications",
    description:
      "Building responsive and interactive web applications using React, TypeScript, Tailwind CSS, Node.js, and modern deployment workflows.",
    icon: "Layout",
  },
  {
    title: "AI-Powered Applications",
    description:
      "Integrating Gemini AI into practical products for analysis, structured suggestions, guided workflows, and intelligent user experiences.",
    icon: "Sparkles",
  },
  {
    title: "Document & OCR Workflows",
    description:
      "Working with OCR and document-processing workflows using tools such as Tesseract OCR for extraction and AI-assisted understanding.",
    icon: "ScanText",
  },
  {
    title: "Product UI & User Experience",
    description:
      "Designing polished, responsive interfaces with attention to usability, interaction, animation, and consistent visual systems.",
    icon: "Palette",
  },
];

export interface Certification {
  title: string;
  provider: string;
  credentialUrl: string; // if not verified, mark as REPLACE_ME
  icon: LucideIcon;
}

export const certifications: Certification[] = [
  {
    title: "Introduction to Vertex AI Studio",
    provider: "Google Skills",
    // REPLACE_ME: exact Google Skills credential URL for Aryan Gupta
    credentialUrl:
      "https://www.skills.google/public_profiles/f19e4578-d87f-49b8-bd37-1a33f3443470/badges/25308303?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    icon: BrainCircuit,
  },
  {
    title: "Introduction to Model Context Protocol",
    provider: "Anthropic · Skilljar",
    credentialUrl: "https://verify.skilljar.com/c/nts29bbf2xmr",
    icon: TerminalIcon,
  },
  {
    title: "Generative AI Fundamentals Skill Badge",
    provider: "Google Skills",
    credentialUrl:
      "https://www.skills.google/public_profiles/f19e4578-d87f-49b8-bd37-1a33f3443470/badges/25299039?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    icon: Award,
  },
  {
    title: "Claude Code 101",
    provider: "Anthropic",
    credentialUrl: "https://verify.skilljar.com/c/diy22w2rgtzi",
    icon: BookOpen,
  },
];

export interface Interest {
  title: string;
  body: string;
  icon: string;
}

export const interests: Interest[] = [
  {
    title: "Developer Tools",
    body: "Exploring modern IDEs, AI-native editors, and workflow tools that speed up building.",
    icon: "Wrench",
  },
  {
    title: "AI Experimentation",
    body: "Trying new models, prompt patterns, and agentic workflows in small side projects.",
    icon: "FlaskConical",
  },
  {
    title: "Product Building",
    body: "Turning small ideas into usable products — from concept to a shipped, polished UI.",
    icon: "Rocket",
  },
];
