import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  FileText,
  Globe2,
  Briefcase,
  CreditCard,
  ArrowRight,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { PageBackground } from "@/components/portfolio/PageBackground";
import { Spotlight } from "@/components/portfolio/Spotlight";
import { BrowserPreview } from "@/components/portfolio/BrowserPreview";
import { projects, social } from "@/lib/portfolio-data";

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  FileText,
  Globe2,
  Briefcase,
  CreditCard,
};

const ACHIEVEMENTS: Record<string, string> = {
  "symbiotic-city-2070": "Public Opinion Category Winner",
};

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Aryan Gupta" },
      {
        name: "description",
        content:
          "Selected work by Aryan Gupta — AI-powered tools, full-stack applications, client websites, and interactive web experiences.",
      },
      { property: "og:title", content: "Projects — Aryan Gupta" },
      {
        property: "og:description",
        content:
          "AI-powered tools, full-stack apps, and interactive web experiences built by Aryan Gupta.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <main className="relative">
      <PageBackground />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[1180px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
            Selected Work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mx-auto mt-6 max-w-[900px] text-[36px] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]"
          >
            Building Ideas into <span className="text-primary">Useful Digital Products.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-[780px] text-[15.5px] leading-[1.75] text-foreground/70 sm:text-base"
          >
            A collection of AI-powered tools, full-stack applications, client work, and interactive
            web experiences I've built while learning, experimenting, and solving practical
            problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-8 flex max-w-[820px] flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70"
          >
            {[
              "React",
              "TypeScript",
              "JavaScript",
              "Tailwind CSS",
              "Node.js",
              "MongoDB",
              "Supabase",
              "Gemini AI",
            ].map((t, i, arr) => (
              <span key={t} className="inline-flex items-center gap-3">
                {t}
                {i < arr.length - 1 && <span className="text-primary/50">·</span>}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="relative py-8 md:py-12">
        <div className="mx-auto max-w-[1180px] px-6">
          <FeaturedCard project={featured} />
        </div>
      </section>

      {/* GRID */}
      <section className="relative py-12 md:py-16">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                More Projects
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Things I've Been Building
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* GITHUB CTA */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="isolate relative overflow-hidden rounded-2xl border border-primary/25 glass p-8 text-center md:p-12"
            style={{
              boxShadow: "0 0 60px -20px color-mix(in oklab, var(--primary) 55%, transparent)",
            }}
          >
            <Spotlight intensity={0.55} radius={420} />
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-primary ring-1 ring-primary/30">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              Open Source & Building
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Explore the Code Behind My Projects
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">
              Most of my learning happens by building. Explore my repositories, project experiments,
              and ongoing work on GitHub.
            </p>

            <div className="mx-auto mt-6 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-[12px] text-foreground/75">
              <span className="text-primary">$</span>
              <span className="truncate">git clone curiosity && cd build</span>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
              >
                <Github size={16} />
                View GitHub Profile
              </a>
              <Link
                to="/"
                hash="contact"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 glass px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
              >
                Let's Build Something
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FeaturedCard({ project }: { project: (typeof projects)[number] }) {
  const Icon = ICONS[project.icon] ?? Sparkles;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="group isolate relative overflow-hidden rounded-2xl glass-strong border border-white/5 p-6 transition-colors hover:border-primary/30 md:p-10"
    >
      <Spotlight radius={520} intensity={0.5} />
      <div className="absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-10`} />
      </div>

      <div className="relative grid gap-8 md:grid-cols-5 md:gap-10">
        <div className="md:col-span-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-primary ring-1 ring-primary/30">
            <Sparkles size={12} /> Featured Project
          </div>
          <h3 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">{project.title}</h3>
          <p className="mt-1 font-mono text-sm text-primary">{project.tagline}</p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">
            An AI-powered resume analysis platform that evaluates resumes against job descriptions,
            identifies missing keywords, provides ATS-focused scoring, and generates actionable
            AI-assisted improvement suggestions.
          </p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {[
              "ATS-style resume scoring",
              "Job description keyword gap analysis",
              "AI-assisted improvement suggestions",
              "OCR-based resume processing",
              "Shareable analysis reports",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-foreground/75">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-foreground/75"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
              >
                <ExternalLink size={14} /> View Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 glass px-4 text-xs font-semibold text-foreground hover:border-primary/40"
              >
                <Github size={14} /> View GitHub
              </a>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          {project.image && project.liveUrl ? (
            <BrowserPreview
              url={project.liveUrl}
              title={project.title}
              image={project.image}
              accent={project.accent}
            />
          ) : (
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${project.accent} p-px`}
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#070A10]">
                <Icon size={80} className="text-primary opacity-80" />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const Icon = ICONS[project.icon] ?? Sparkles;
  const achievement = ACHIEVEMENTS[project.id];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group isolate relative flex flex-col overflow-hidden rounded-2xl glass border border-white/5 p-5 transition-colors hover:border-primary/30 hover:shadow-[0_0_30px_-12px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
    >
      <Spotlight radius={340} />

      <div className="relative mb-5">
        {project.image && project.liveUrl ? (
          <BrowserPreview
            url={project.liveUrl}
            title={project.title}
            image={project.image}
            accent={project.accent}
          />
        ) : (
          <div
            className={`flex aspect-[16/9] items-center justify-center rounded-xl bg-gradient-to-br ${project.accent} p-px`}
          >
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#070A10]">
              <Icon
                size={52}
                className="text-primary opacity-80 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
          <p className="font-mono text-xs text-primary">{project.tagline}</p>
        </div>
        {achievement && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
            <Trophy size={10} />
            Winner
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/75">{project.description}</p>

      {achievement && (
        <p className="mt-2 text-[11px] font-medium text-amber-300/90">{achievement}</p>
      )}

      <ul className="mt-4 grid gap-1.5">
        {project.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-foreground/70">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 6).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-foreground/70"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex gap-2">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary/15 px-3 py-2 text-xs font-medium text-primary ring-1 ring-primary/30 hover:bg-primary/25"
          >
            <ExternalLink size={13} /> Live Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-foreground hover:bg-white/5"
          >
            <Github size={13} /> GitHub
          </a>
        )}
      </div>
    </motion.article>
  );
}
