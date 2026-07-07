import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Globe2,
  Briefcase,
  CreditCard,
  Github,
  ExternalLink,
  Star,
  Clock,
  Circle,
  type LucideIcon,
} from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { BrowserPreview } from "./BrowserPreview";

const ICONS: Record<string, LucideIcon> = { Sparkles, FileText, Globe2, Briefcase, CreditCard };

interface GhMeta {
  stars: number;
  language: string | null;
  updatedAt: string | null;
}

function parseRepo(url?: string): { owner: string; repo: string } | null {
  if (!url) return null;
  const m = url.match(/github\.com\/([^/]+)\/([^/?#]+)/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, "") };
}

function useGithubMeta(url?: string): GhMeta | null {
  const [meta, setMeta] = useState<GhMeta | null>(null);
  useEffect(() => {
    const r = parseRepo(url);
    if (!r) return;
    const key = `gh:${r.owner}/${r.repo}`;
    const cached = typeof window !== "undefined" ? sessionStorage.getItem(key) : null;
    if (cached) {
      try {
        setMeta(JSON.parse(cached));
        return;
      } catch {
        /* noop */
      }
    }
    let cancelled = false;
    fetch(`https://api.github.com/repos/${r.owner}/${r.repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const m: GhMeta = {
          stars: data.stargazers_count ?? 0,
          language: data.language ?? null,
          updatedAt: data.pushed_at ?? data.updated_at ?? null,
        };
        setMeta(m);
        try {
          sessionStorage.setItem(key, JSON.stringify(m));
        } catch {
          /* noop */
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [url]);
  return meta;
}

function formatUpdated(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function GhStats({ url }: { url?: string }) {
  const meta = useGithubMeta(url);
  if (!url || !meta) return null;
  const updated = formatUpdated(meta.updatedAt);
  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-foreground/70">
      <span className="inline-flex items-center gap-1">
        <Star size={12} className="text-amber-400" /> {meta.stars}
      </span>
      {meta.language && (
        <span className="inline-flex items-center gap-1">
          <Circle size={8} className="fill-primary text-primary" /> {meta.language}
        </span>
      )}
      {updated && (
        <span className="inline-flex items-center gap-1">
          <Clock size={12} /> {updated}
        </span>
      )}
    </div>
  );
}

export function Projects() {
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-8">
      <FeaturedCard project={featured} />
      <div className="grid gap-6 md:grid-cols-2">
        {rest.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ project }: { project: (typeof projects)[number] }) {
  const Icon = ICONS[project.icon] ?? Sparkles;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl glass-strong p-6 md:p-10 transition-shadow hover:shadow-[0_0_40px_-12px_rgba(34,211,238,0.35)]"
    >
      <div className="absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-10`} />
      </div>

      <div className="relative grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-widest text-primary ring-1 ring-primary/30">
            <Star size={12} /> Featured Project
          </div>
          <h3 className="text-2xl font-bold text-foreground sm:text-3xl">{project.title}</h3>
          <p className="mt-1 text-sm text-primary font-mono">{project.tagline}</p>

          <div className="mt-3">
            <GhStats url={project.github} />
          </div>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">
            {project.description}
          </p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-foreground/75">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-foreground/75"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-shadow hover:glow-cyan"
              >
                <ExternalLink size={14} /> View Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl glass px-4 py-2 text-xs font-semibold text-foreground hover:bg-white/5"
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
              objectPosition={project.objectPosition}
            />
          ) : (
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${project.accent} p-px`}
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#070A10]">
                <Icon
                  size={80}
                  className="text-primary opacity-80 transition-transform duration-500 group-hover:scale-110"
                />
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:border-primary/30 hover:shadow-[0_0_30px_-12px_rgba(34,211,238,0.35)]"
    >
      <div className="mb-5">
        {project.image && project.liveUrl ? (
          <BrowserPreview
            url={project.liveUrl}
            title={project.title}
            image={project.image}
            accent={project.accent}
            objectPosition={project.objectPosition}
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

      <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
      <p className="text-xs text-primary font-mono">{project.tagline}</p>

      <div className="mt-2">
        <GhStats url={project.github} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/75 line-clamp-3">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-foreground/70"
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
            <ExternalLink size={13} /> View Live Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-foreground hover:bg-white/5"
          >
            <Github size={13} /> View GitHub
          </a>
        )}
      </div>
    </motion.article>
  );
}
