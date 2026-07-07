import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  ExternalLink,
  Layout,
  Sparkles,
  ScanText,
  Palette,
  Wrench,
  FlaskConical,
  Rocket,
  Mail,
  Linkedin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import portrait from "@/assets/aryan-portrait.png.asset.json";
import { Navbar } from "@/components/portfolio/Navbar";
import { Footer } from "@/components/portfolio/Footer";
import { PageBackground } from "@/components/portfolio/PageBackground";
import { Spotlight } from "@/components/portfolio/Spotlight";
import { social } from "@/lib/portfolio-data";
import { journey, buildAreas, certifications, interests } from "@/lib/about-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aryan Gupta" },
      {
        name: "description",
        content:
          "Aryan Gupta — B.Tech CSE (AI) student at Lucknow University. Building full-stack web apps and AI-powered products.",
      },
      { property: "og:title", content: "About — Aryan Gupta" },
      {
        property: "og:description",
        content: "B.Tech CSE (AI) student building full-stack web apps and AI-powered products.",
      },
    ],
  }),
  component: AboutPage,
});

const buildIcons: Record<string, LucideIcon> = {
  Layout,
  Sparkles,
  ScanText,
  Palette,
};

const interestIcons: Record<string, LucideIcon> = {
  Wrench,
  FlaskConical,
  Rocket,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
      {children}
    </div>
  );
}

function AboutPage() {
  return (
    <main className="relative">
      <PageBackground />
      <Navbar />

      {/* SECTION 1 — HERO */}
      <section className="relative pt-24 pb-24 md:pt-28 md:pb-28">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-14 px-6 md:gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              About Me
            </span>

            <h1 className="mt-5 text-[40px] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]">
              Building <span className="text-primary">Software</span>,
              <br />
              Learning <span className="text-primary">AI</span>,
              <br />
              Solving Real <span className="text-primary">Problems</span>.
            </h1>

            <p className="mt-6 max-w-[580px] text-[16px] leading-[1.75] text-foreground/75">
              I'm Aryan Gupta, a B.Tech Computer Science Engineering student specializing in
              Artificial Intelligence at the University of Lucknow. I enjoy building practical
              software products, experimenting with AI-powered workflows, and turning ideas into
              usable web experiences.
            </p>
            <p className="mt-4 max-w-[580px] text-[16px] leading-[1.75] text-foreground/70">
              My work ranges from AI tools such as ResumePilot and FormSahay to production client
              work and interactive hackathon projects. I'm currently focused on strengthening my
              software engineering fundamentals, full-stack development skills, and ability to build
              reliable AI-assisted products.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={15} className="text-primary" />
              Lucknow, Uttar Pradesh, India
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/"
                hash="contact"
                className="group inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
              >
                <Mail size={16} />
                Let's Connect
              </Link>
              <Link
                to="/"
                hash="projects"
                className="group inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 glass px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
              >
                View Projects
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="mt-4">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Linkedin size={14} className="text-primary" />
                Follow on LinkedIn
              </a>
            </div>
          </motion.div>

          {/* RIGHT — circular portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[410px]"
          >
            {/* Soft radial theme glow */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 32%, transparent), transparent 70%)",
              }}
            />
            <div className="relative aspect-square w-full overflow-hidden rounded-full ring-1 ring-primary/40 shadow-[0_0_60px_-15px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
              <img
                src={portrait.url}
                alt="Aryan Gupta"
                className="h-full w-full object-cover"
                loading="eager"
              />
              {/* thin dark inner ring */}
              <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-black/40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — MY JOURNEY */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <Eyebrow>my journey</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-gradient">From Curiosity to Building Real Products</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              A short look at how my interests evolved from learning development to building
              AI-powered tools, client projects, and hackathon experiences.
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
            <ul className="space-y-8 md:space-y-12">
              {journey.map((s, i) => {
                const right = i % 2 === 1;
                return (
                  <motion.li
                    key={s.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className={`relative flex flex-col md:flex-row md:items-center ${
                      right ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="md:w-1/2 md:px-8">
                      <div className="glass isolate relative overflow-hidden rounded-2xl border border-white/5 p-6 transition-colors hover:border-primary/30">
                        <Spotlight />
                        <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-primary">
                          Step {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/75">{s.body}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 top-6 hidden -translate-x-1/2 md:top-1/2 md:block md:-translate-y-1/2">
                      <span className="block h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
                    </div>
                    <div className="md:w-1/2" />
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT I BUILD */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <Eyebrow>what i build</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-gradient">Areas I'm Currently Building In</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              I'm still developing depth across these areas, so these are spaces where I actively
              build and learn — not claims of expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {buildAreas.map((a, i) => {
              const Icon = buildIcons[a.icon] ?? Layout;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group glass isolate relative overflow-hidden rounded-2xl border border-white/5 p-6 transition-colors hover:border-primary/30"
                >
                  <Spotlight />
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{a.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CERTIFICATIONS */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <Eyebrow>certifications</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-gradient">Certifications &amp; Continuous Learning</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Selected learning milestones across AI, developer tools, and modern AI workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {certifications.map((c, i) => {
              const Icon = c.icon;
              const hasUrl = c.credentialUrl && c.credentialUrl !== "REPLACE_ME";
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group glass isolate relative overflow-hidden rounded-2xl border border-white/5 p-6 transition-colors hover:border-primary/30 hover:shadow-[0_0_30px_-10px_color-mix(in_oklab,var(--primary)_50%,transparent)]"
                >
                  <Spotlight />
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-foreground">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                        {c.provider}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5">
                    {hasUrl ? (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
                      >
                        View Credential
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground/70">
                        Credential link pending
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — BEYOND CODE */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <Eyebrow>beyond code</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-gradient">Curious About More Than Just Code</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              I enjoy exploring new developer tools, experimenting with AI workflows, understanding
              how software products are designed, and learning by building. I'm especially
              interested in turning technical ideas into practical experiences that people can
              actually use.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {interests.map((it, i) => {
              const Icon = interestIcons[it.icon] ?? Rocket;
              return (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass isolate relative overflow-hidden rounded-2xl border border-white/5 p-5 text-center transition-colors hover:border-primary/30"
                >
                  <Spotlight radius={260} />
                  <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{it.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground/65">{it.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="isolate relative overflow-hidden rounded-2xl border border-primary/25 glass p-10 text-center md:p-14"
            style={{
              boxShadow: "0 0 60px -20px color-mix(in oklab, var(--primary) 55%, transparent)",
            }}
          >
            <Spotlight intensity={0.55} radius={420} />
            <div
              className="pointer-events-none absolute inset-0 -z-0"
              style={{
                background:
                  "radial-gradient(ellipse at top, color-mix(in oklab, var(--primary) 18%, transparent), transparent 65%)",
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="text-gradient">Have an Idea Worth Building?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
                I'm open to interesting projects, collaborations, hackathons, and software
                development opportunities.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/"
                  hash="contact"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
                >
                  <Mail size={16} />
                  Let's Talk
                </Link>
                <Link
                  to="/"
                  hash="projects"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 glass px-6 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
                >
                  View My Work
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
