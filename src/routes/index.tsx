import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";

import { Section } from "@/components/portfolio/Section";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Timeline } from "@/components/portfolio/Timeline";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { experience, education } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aryan Gupta — Software Developer & AI Enthusiast" },
      {
        name: "description",
        content:
          "Portfolio of Aryan Gupta — B.Tech CSE (AI) student building full-stack web products and AI-powered tools. Projects, skills, experience and an interactive terminal.",
      },
      { property: "og:title", content: "Aryan Gupta — Software Developer & AI Enthusiast" },
      {
        property: "og:description",
        content:
          "Full-stack developer & AI enthusiast. Explore projects, skills and an interactive terminal.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      {/* Global ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-1/3 left-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      <Navbar />
      <Hero />

      <Section
        id="about"
        eyebrow="// about me"
        title="A bit about my path"
        description="Curious developer, fast shipper, AI enthusiast — here's the short version."
      >
        <About />
      </Section>

      <Section
        id="skills"
        eyebrow="// tech stack"
        title="Skills & Toolkit"
        description="Technologies and tools I use to build modern web applications and AI-powered projects."
      >
        <Skills />
      </Section>

      <Section
        id="projects"
        eyebrow="// work"
        title="Selected Projects"
        description="A few things I've built. ResumePilot is what I'm most excited about right now."
      >
        <Projects />
      </Section>

      <Section
        id="experience"
        eyebrow="// experience"
        title="Where I've Worked & Won"
        description="Internship, hackathons, and certifications along the way."
      >
        <Timeline items={experience} />
      </Section>

      <Section
        id="education"
        eyebrow="// education"
        title="Education"
        description="Formal study, ongoing learning."
      >
        <Timeline
          items={education.map((e) => ({
            role: e.degree,
            org: e.school,
            period: e.period,
            points: e.points,
          }))}
        />
      </Section>

      <Section
        id="contact"
        eyebrow="// say hi"
        title="Let's Build Something"
        description="Open to internships, collaborations, and interesting problems."
      >
        <Contact />
      </Section>

      <Footer />
    </main>
  );
}
