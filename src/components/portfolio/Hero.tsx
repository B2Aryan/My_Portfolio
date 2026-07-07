import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code2,
  Rocket,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { Terminal } from "./Terminal";
import { social } from "@/lib/portfolio-data";

const ROLES = ["Full Stack Developer", "Software Developer", "AI Application Builder"];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.3, y: 0.4 });

  useEffect(() => {
    const current = ROLES[roleIdx];
    const speed = deleting ? 35 : 75;
    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1500);
        return;
      }
      if (deleting && text === "") {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % ROLES.length);
        return;
      }
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, roleIdx]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden pt-24 pb-20"
    >
      {/* Background layers */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x * 100}% ${mouse.y * 100}%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_50%_120%,transparent_40%,oklch(0_0_0/0.6)_100%)]" />

      <motion.div
        animate={{ y: [0, -25, 0], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-primary/20 blur-[140px]"
      />
      <motion.div
        animate={{ y: [0, 25, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[140px]"
      />

      {/* Particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-primary/60"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 6 + (i % 5),
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-[1420px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[55fr_45fr] lg:gap-14 lg:px-10">
        {/* LEFT */}
        <div className="flex min-w-0 flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-primary/20 bg-white/[0.03] px-3.5 py-2 text-xs text-muted-foreground shadow-[0_0_24px_-16px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for Opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 font-mono text-[11px] tracking-[0.32em] text-primary/80 sm:text-xs"
          >
            ARYAN GUPTA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 text-[clamp(2.4rem,4.8vw,4.6rem)] font-bold leading-[1.02] tracking-tight"
          >
            <span className="block text-foreground">Software Developer &amp;</span>
            <span className="block text-primary">AI Engineer</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 font-mono text-base text-primary sm:text-lg"
          >
            <span className="text-muted-foreground">&gt; </span>
            {text}
            <span className="cursor-blink ml-1 inline-block h-5 w-[2px] translate-y-[2px] bg-primary" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 max-w-[620px] text-[17px] leading-[1.65] text-muted-foreground"
          >
            B.Tech CSE (AI) student at the University of Lucknow, building full-stack web
            applications and AI-powered tools. I focus on practical products, clean user
            experiences, and turning ideas into working software.
          </motion.p>

          {/* Credibility badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <div className="inline-flex items-center gap-2.5 rounded-xl border border-primary/20 bg-white/[0.03] px-3.5 py-2 shadow-[0_0_24px_-16px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <Rocket size={14} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-foreground">
                  Client Project Shipped
                </span>
                <span className="text-[11px] text-muted-foreground">Production Website · 2026</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-2.5 rounded-xl border border-primary/20 bg-white/[0.03] px-3.5 py-2 shadow-[0_0_24px_-16px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                <Sparkles size={14} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-foreground">
                  Full-Stack + AI Projects
                </span>
                <span className="text-[11px] text-muted-foreground">Building &amp; Learning</span>
              </span>
            </div>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-6px_color-mix(in_oklab,var(--primary)_65%,transparent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_-2px_color-mix(in_oklab,var(--primary)_75%,transparent)]"
            >
              View My Work
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-xl glass border border-white/10 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-white/5"
            >
              <Mail size={14} />
              Get In Touch
            </a>
          </motion.div>

          {/* Skill chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {["Java", "React", "TypeScript", "AI-Powered Apps"].map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </motion.div>

          {/* Social row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 flex items-center gap-3"
          >
            {[
              { href: social.github, icon: Github, label: "GitHub" },
              { href: social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: social.leetcode, icon: Code2, label: "LeetCode" },
              { href: `mailto:${social.email}`, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full glass border border-white/10 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                <Icon size={15} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[640px]"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="relative">
              <Terminal />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator + pro-tip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-3">
        <motion.a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pointer-events-auto flex flex-col items-center gap-1.5"
          aria-label="Scroll to explore"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-9 w-9 place-items-center rounded-full border border-primary/40 bg-primary/5 text-primary shadow-[0_0_18px_-4px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
          >
            <ArrowDown size={14} />
          </motion.span>
          <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Scroll to Explore
          </span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur-md"
        >
          <TerminalSquare size={12} className="text-primary" />
          <span>
            <span className="font-mono text-primary">&gt;_</span> Pro Tip:{" "}
            <span className="text-primary">Navigate using the terminal</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
