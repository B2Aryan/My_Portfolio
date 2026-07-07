import resumeAsset from "@/assets/resume.pdf.asset.json";

export type ProjectTech = string;

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: ProjectTech[];
  features: string[];
  github?: string;
  demo?: string;
  liveUrl?: string;
  image?: string;
  objectPosition?: string;
  featured?: boolean;
  accent: string; // gradient class
  icon: string; // lucide icon name handled in component
}

export const projects: Project[] = [
  {
    id: "resumepilot",
    title: "ResumePilot",
    tagline: "AI Resume Analyzer",
    description:
      "An AI-powered ATS resume analyzer that evaluates resumes against job descriptions, identifies missing keywords, provides detailed ATS scoring, generates AI-powered suggestions, and allows users to share analysis reports.",
    tech: [
      "React",
      "TypeScript",
      "TanStack Start",
      "Tailwind CSS",
      "Supabase",
      "Gemini AI",
      "OCR (Tesseract)",
    ],
    features: [
      "ATS-style scoring with section-level breakdown",
      "Job-description keyword gap analysis",
      "AI-generated rewrite suggestions",
      "Shareable analysis reports",
    ],
    github: "https://github.com/B2Aryan/Resume_Analyzer_Project",
    demo: "https://www.resumepilot.site",
    liveUrl: "https://www.resumepilot.site",
    image: "/images/Resumepilot.png",
    featured: true,
    accent: "from-cyan-400 to-teal-500",
    icon: "Sparkles",
  },
  {
    id: "formsahay",
    title: "FormSahay",
    tagline: "Government Form Assistant",
    description:
      "An AI-powered government form assistant that helps users understand, verify, and complete Indian government forms through OCR, intelligent document extraction, AI validation, and guided workflows.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Gemini AI", "Tesseract OCR"],
    features: [
      "OCR-based document extraction",
      "AI-driven field validation",
      "Step-by-step guided filling",
      "Multi-form workflow support",
    ],
    github: "https://github.com/B2Aryan/FormSahay_Portal",
    demo: "https://form-sahay-portal.vercel.app/",
    liveUrl: "https://form-sahay-portal.vercel.app/",
    image: "/images/FormSahay.png",
    accent: "from-emerald-400 to-cyan-500",
    icon: "FileText",
  },
  {
    id: "symbiotic-city-2070",
    title: "Symbiotic City 2070",
    tagline: "Interactive Web Experience",
    description:
      "An immersive futuristic web experience showcasing the vision of a sustainable smart city through interactive storytelling, animations, and modern web technologies.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Three.js"],
    features: [
      "Interactive scrollytelling",
      "Animated concept visuals",
      "Section-based narrative",
      "Responsive cinematic layout",
    ],
    github: "https://github.com/B2Aryan/Symbiotic-City-Model-2070",
    demo: "https://symbiotic-city-model-2070-1w7x.vercel.app/",
    liveUrl: "https://symbiotic-city-model-2070-1w7x.vercel.app/",
    image: "/images/Symbiotic City 2070.png",
    accent: "from-sky-400 to-indigo-500",
    icon: "Globe2",
  },
  {
    id: "ka-gupta",
    title: "K A Gupta & Associates",
    tagline: "Professional Business Website",
    description:
      "Designed and developed a modern chartered accountancy firm website with responsive design, SEO optimization, service pages, contact integration, and a clean user experience.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    features: [
      "SEO-optimized service pages",
      "Responsive across devices",
      "Contact and inquiry flow",
      "Clean, accessible UI",
    ],
    demo: "https://kaguptaassociates.vercel.app/",
    liveUrl: "https://kaguptaassociates.vercel.app/",
    image: "/images/K A Gupta.png",
    objectPosition: "object-left-top",
    accent: "from-teal-400 to-emerald-500",
    icon: "Briefcase",
  },
  {
    id: "razorpay-clone",
    title: "Razorpay Clone",
    tagline: "Frontend Clone Project",
    description:
      "A pixel-perfect clone of the Razorpay landing page built to practice responsive layouts, Tailwind CSS, animations, and production-quality frontend development.",
    tech: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    features: [
      "Pixel-accurate hero and sections",
      "Smooth scroll animations",
      "Fully responsive layouts",
      "Reusable component patterns",
    ],
    github: "https://github.com/B2Aryan/Razorpay-Clone",
    demo: "https://b2aryan.github.io/Razorpay-Clone/",
    liveUrl: "https://b2aryan.github.io/Razorpay-Clone/",
    image: "/images/Razorpay.png",
    accent: "from-blue-400 to-cyan-500",
    icon: "CreditCard",
  },
];

export interface SkillCategory {
  category: string;
  icon: string;
  items: string[];
  description: string;
}

export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "Code2",
    items: ["Java (Primary)", "HTML5", "CSS3"],
    description: "Strong foundation in object-oriented and web programming languages.",
  },
  {
    category: "Frontend Development",
    icon: "Layout",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Responsive Design"],
    description: "Building responsive, modern, and high-performance user interfaces.",
  },
  {
    category: "Backend Development",
    icon: "Server",
    items: ["Node.js", "Express.js"],
    description: "Creating robust server-side logic and scalable API architectures.",
  },
  {
    category: "Databases",
    icon: "Database",
    items: ["MongoDB", "Supabase"],
    description: "Designing and managing structured and NoSQL data stores.",
  },
  {
    category: "AI & APIs",
    icon: "Brain",
    items: ["Google Gemini API", "Prompt Engineering", "AI Workflow Design"],
    description: "Integrating AI services and designing intelligent automation pipelines.",
  },
  {
    category: "Developer Tools",
    icon: "Wrench",
    items: ["Git", "GitHub", "VS Code", "Cursor IDE", "Kiro IDE", "Postman", "npm"],
    description: "Daily development tooling for version control, coding, and API testing.",
  },
];

export const experience = [
  {
    role: "Hackathon Participant & Finalist",
    org: "Multiple Hackathons",
    period: "2023 — Present",
    points: [
      "Shipped full-stack prototypes under tight time constraints",
      "Led front-end and AI-integration tracks for team projects",
      "Recognized for product thinking and execution speed",
    ],
  },
  {
    role: "Certifications",
    org: "Online & University Programs",
    period: "Ongoing",
    points: [
      "Full-Stack Web Development",
      "AI / Machine Learning Foundations",
      "Cloud and Developer Tooling",
    ],
  },
];

export const education = [
  {
    school: "Lucknow University",
    degree: "B.Tech, Computer Science Engineering (AI)",
    period: "Expected 2027",
    points: [
      "Core CS: DSA, OS, DBMS, Computer Networks",
      "AI specialization: ML, NLP, Neural Networks",
      "Active in coding clubs and hackathons",
    ],
  },
];

export const social = {
  email: "aryan639244@gmail.com",
  github: "https://github.com/B2Aryan",
  linkedin: "https://www.linkedin.com/in/b2aryan/",
  leetcode: "https://leetcode.com/aryangupta",
  resume: resumeAsset.url,
};
