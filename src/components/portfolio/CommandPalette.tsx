import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";
import {
  Search,
  X,
  Home,
  User,
  FolderGit2,
  Sparkles,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  FileDown,
  Palette,
  Award,
  Code2,
  ArrowRight,
  Terminal as TerminalIcon,
  type LucideIcon,
} from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { skills as skillCategories, social } from "@/lib/portfolio-data";
import { certifications } from "@/lib/about-data";
import { THEMES, applyTheme, type ThemeId } from "@/lib/theme";

type Command = {
  id: string;
  label: string;
  description?: string;
  group: string;
  keywords: string;
  icon: LucideIcon;
  hint?: string;
  action: () => void;
};

const RECENT_KEY = "cmd-palette-recent";

function score(query: string, text: string, keywords: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const t = text.toLowerCase();
  const k = keywords.toLowerCase();
  const hay = t + " " + k;
  if (t.startsWith(q)) return 1000;
  if (t.split(/\s+/).some((w) => w.startsWith(q))) return 800;
  if (t.includes(q)) return 600;
  if (hay.includes(q)) return 400;
  // fuzzy: chars in order
  let i = 0;
  for (const ch of hay) {
    if (ch === q[i]) i++;
    if (i === q.length) return 200;
  }
  return 0;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      try {
        const raw = localStorage.getItem(RECENT_KEY);
        if (raw) setRecent(JSON.parse(raw));
      } catch {
        /* ignore localStorage error */
      }
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const navigateToSection = (sectionId: string) => {
    onClose();
    const doScroll = () => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (window.location.pathname !== "/") {
      router.navigate({ to: "/", hash: sectionId });
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  const navigateTo = (path: string) => {
    onClose();
    router.navigate({ to: path });
  };

  const openExternal = (url: string) => {
    onClose();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const downloadResume = () => {
    onClose();
    const a = document.createElement("a");
    a.href = social.resume;
    a.download = "Aryan_Gupta_Resume.pdf";
    a.rel = "noopener";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const commands: Command[] = useMemo(() => {
    const list: Command[] = [];

    // PAGES
    list.push(
      {
        id: "nav-home",
        label: "Home",
        description: "Homepage hero",
        group: "Pages",
        keywords: "home landing hero index /",
        icon: Home,
        action: () => navigateToSection("home"),
      },
      {
        id: "nav-about",
        label: "About",
        description: "About page",
        group: "Pages",
        keywords: "about me bio journey",
        icon: User,
        action: () => navigateTo("/about"),
      },
      {
        id: "nav-projects",
        label: "Projects",
        description: "Projects page",
        group: "Pages",
        keywords: "projects work portfolio",
        icon: FolderGit2,
        action: () => navigateTo("/projects"),
      },
      {
        id: "nav-skills",
        label: "Skills",
        description: "Skills section",
        group: "Pages",
        keywords: "skills tech stack",
        icon: Sparkles,
        action: () => navigateToSection("skills"),
      },
      {
        id: "nav-experience",
        label: "Experience",
        description: "Experience section",
        group: "Pages",
        keywords: "experience work jobs",
        icon: Briefcase,
        action: () => navigateToSection("experience"),
      },
      {
        id: "nav-education",
        label: "Education",
        description: "Education section",
        group: "Pages",
        keywords: "education school university",
        icon: GraduationCap,
        action: () => navigateToSection("education"),
      },
      {
        id: "nav-contact",
        label: "Contact",
        description: "Contact section",
        group: "Pages",
        keywords: "contact email reach",
        icon: Mail,
        action: () => navigateToSection("contact"),
      },
    );

    // PROJECTS
    for (const p of projects) {
      list.push({
        id: `proj-${p.id}`,
        label: p.title,
        description: p.tagline,
        group: "Projects",
        keywords: `${p.title} ${p.tagline} ${p.tech.join(" ")} project`,
        icon: FolderGit2,
        action: () => {
          onClose();
          router.navigate({ to: "/projects", hash: p.id });
          setTimeout(
            () =>
              document.getElementById(p.id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
            300,
          );
        },
      });
    }

    // SKILLS
    for (const cat of skillCategories) {
      for (const s of cat.items) {
        list.push({
          id: `skill-${cat.category}-${s}`,
          label: s,
          description: `Skill · ${cat.category}`,
          group: "Skills",
          keywords: `${s} ${cat.category} skill`,
          icon: Code2,
          action: () => navigateToSection("skills"),
        });
      }
    }

    // CERTIFICATIONS
    for (const c of certifications) {
      list.push({
        id: `cert-${c.title}`,
        label: c.title,
        description: `Certification · ${c.provider}`,
        group: "Certifications",
        keywords: `${c.title} ${c.provider} certificate certification`,
        icon: Award,
        action: () => {
          onClose();
          if (window.location.pathname !== "/about") {
            router.navigate({ to: "/about", hash: "certifications" });
            setTimeout(
              () =>
                document
                  .getElementById("certifications")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" }),
              300,
            );
          } else {
            document
              .getElementById("certifications")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        },
      });
    }

    // ACTIONS
    list.push(
      {
        id: "act-resume",
        label: "Download Resume",
        description: "Get the latest PDF",
        group: "Actions",
        keywords: "resume cv download pdf",
        icon: FileDown,
        action: downloadResume,
      },
      {
        id: "act-email",
        label: "Email Me",
        description: social.email,
        group: "Actions",
        keywords: "email mail contact reach",
        icon: Mail,
        action: () => {
          onClose();
          window.location.href = `mailto:${social.email}`;
        },
      },
      {
        id: "act-github",
        label: "Open GitHub",
        description: "@B2Aryan",
        group: "Actions",
        keywords: "github git repo code",
        icon: Github,
        action: () => openExternal(social.github),
      },
      {
        id: "act-linkedin",
        label: "Open LinkedIn",
        description: "/in/b2aryan",
        group: "Actions",
        keywords: "linkedin social profile",
        icon: Linkedin,
        action: () => openExternal(social.linkedin),
      },
      {
        id: "act-view-projects",
        label: "View Projects",
        description: "Browse all projects",
        group: "Actions",
        keywords: "projects view browse",
        icon: FolderGit2,
        action: () => navigateTo("/projects"),
      },
      {
        id: "act-about",
        label: "Go to About",
        description: "Full about page",
        group: "Actions",
        keywords: "about page",
        icon: User,
        action: () => navigateTo("/about"),
      },
      {
        id: "act-contact",
        label: "Contact Me",
        description: "Jump to contact",
        group: "Actions",
        keywords: "contact reach hire",
        icon: Mail,
        action: () => navigateToSection("contact"),
      },
    );

    // TERMINAL COMMANDS
    const term: Array<{ cmd: string; desc: string; act: () => void }> = [
      { cmd: "help", desc: "Show terminal commands", act: () => navigateToSection("terminal") },
      { cmd: "projects", desc: "View projects", act: () => navigateTo("/projects") },
      { cmd: "about", desc: "About page", act: () => navigateTo("/about") },
      { cmd: "skills", desc: "Skills section", act: () => navigateToSection("skills") },
      { cmd: "experience", desc: "Experience section", act: () => navigateToSection("experience") },
      { cmd: "education", desc: "Education section", act: () => navigateToSection("education") },
      { cmd: "contact", desc: "Contact section", act: () => navigateToSection("contact") },
      { cmd: "resume", desc: "Download resume", act: downloadResume },
      { cmd: "github", desc: "Open GitHub profile", act: () => openExternal(social.github) },
      { cmd: "linkedin", desc: "Open LinkedIn profile", act: () => openExternal(social.linkedin) },
      { cmd: "clear", desc: "Close palette", act: () => onClose() },
    ];
    for (const t of term) {
      list.push({
        id: `term-${t.cmd}`,
        label: t.cmd,
        description: t.desc,
        group: "Terminal",
        keywords: `${t.cmd} terminal command ${t.desc}`,
        icon: TerminalIcon,
        hint: `$ ${t.cmd}`,
        action: t.act,
      });
    }

    // THEMES
    for (const th of THEMES) {
      list.push({
        id: `theme-${th.id}`,
        label: `theme ${th.id}`,
        description: `${th.name} — ${th.description}`,
        group: "Themes",
        keywords: `theme ${th.id} ${th.name} color palette`,
        icon: Palette,
        action: () => {
          applyTheme(th.id as ThemeId);
          onClose();
        },
      });
    }

    return list;
  }, [router, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) {
      if (recent.length) {
        const recentCmds = recent
          .map((id) => commands.find((c) => c.id === id))
          .filter(Boolean) as Command[];
        return {
          groups: buildGroups([
            ...recentCmds.map((c) => ({ ...c, group: "Recent" })),
            ...commands.filter((c) => c.group === "Pages"),
          ]),
          flat: [...recentCmds, ...commands.filter((c) => c.group === "Pages")],
        };
      }
      const pages = commands.filter((c) => c.group === "Pages");
      return { groups: buildGroups(pages), flat: pages };
    }
    const scored = commands
      .map((c) => ({ c, s: score(q, c.label, c.keywords + " " + (c.description || "")) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 40)
      .map((x) => x.c);
    return { groups: buildGroups(scored), flat: scored };
  }, [query, commands, recent]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.flat.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered.flat[selected];
        if (cmd) runCommand(cmd);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selected]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const runCommand = (cmd: Command) => {
    try {
      const next = [cmd.id, ...recent.filter((r) => r !== cmd.id)].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      setRecent(next);
    } catch {
      /* ignore localStorage error */
    }
    cmd.action();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onClick={onClose}
        >
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              background: "var(--background)",
              borderColor: "color-mix(in oklab, var(--primary) 12%, transparent)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px color-mix(in oklab, var(--primary) 8%, transparent)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-3 border-b px-4 py-3"
              style={{
                borderColor: "color-mix(in oklab, var(--primary) 10%, transparent)",
                background: "color-mix(in oklab, var(--background) 98%, var(--primary) 2%)",
              }}
            >
              <Search size={18} className="text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60"
                aria-label="Search commands"
              />
              <kbd
                className="hidden sm:inline-flex h-6 items-center rounded-md border px-1.5 font-mono text-[11px] text-muted-foreground/80"
                style={{
                  borderColor: "color-mix(in oklab, var(--primary) 12%, transparent)",
                  background: "color-mix(in oklab, var(--primary) 5%, transparent)",
                }}
              >
                ESC
              </kbd>
              <button
                onClick={onClose}
                aria-label="Close command palette"
                className="rounded-md p-1 text-muted-foreground hover:text-foreground"
                style={{ background: "transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "color-mix(in oklab, var(--primary) 8%, transparent)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <X size={16} />
              </button>
            </div>

            <div
              ref={listRef}
              className="max-h-[520px] overflow-y-auto py-2"
              style={{ scrollbarWidth: "thin" }}
            >
              {filtered.flat.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-foreground">No results found for “{query}”</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Try searching for a page, project, skill, certification, or command.
                  </p>
                </div>
              ) : (
                filtered.groups.map((group) => (
                  <div key={group.name} className="mb-1">
                    <div className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      {group.name}
                    </div>
                    {group.items.map((cmd) => {
                      const idx = filtered.flat.indexOf(cmd);
                      const isSelected = idx === selected;
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          data-idx={idx}
                          onMouseEnter={() => setSelected(idx)}
                          onClick={() => runCommand(cmd)}
                          className={`flex w-full items-center gap-3 border-l-2 border-l-transparent px-4 py-2.5 text-left transition-colors ${
                            isSelected
                              ? "bg-primary/[0.18] border-l-primary"
                              : "hover:bg-primary/[0.06]"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                              isSelected
                                ? "border-primary/50 bg-primary/15 text-primary"
                                : "border-white/5 bg-white/[0.02] text-muted-foreground"
                            }`}
                          >
                            <Icon size={15} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div
                              className={`truncate text-[14px] ${isSelected ? "text-foreground" : "text-foreground/90"}`}
                            >
                              {cmd.label}
                            </div>
                            {cmd.description && (
                              <div
                                className={`truncate text-[12px] ${isSelected ? "text-muted-foreground/90" : "text-muted-foreground/70"}`}
                              >
                                {cmd.description}
                              </div>
                            )}
                          </div>
                          {cmd.hint && (
                            <span
                              className={`hidden font-mono text-[11px] sm:inline ${isSelected ? "text-muted-foreground/80" : "text-muted-foreground/60"}`}
                            >
                              {cmd.hint}
                            </span>
                          )}
                          {isSelected && <ArrowRight size={14} className="text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div
              className="flex items-center justify-between border-t px-4 py-2 text-[11px] text-muted-foreground/60"
              style={{
                borderColor: "color-mix(in oklab, var(--primary) 10%, transparent)",
                background: "color-mix(in oklab, var(--background) 98%, var(--primary) 2%)",
              }}
            >
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>esc Close</span>
              </div>
              <span className="font-mono">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function buildGroups(items: Command[]): Array<{ name: string; items: Command[] }> {
  const order: string[] = [];
  const map = new Map<string, Command[]>();
  for (const c of items) {
    if (!map.has(c.group)) {
      map.set(c.group, []);
      order.push(c.group);
    }
    map.get(c.group)!.push(c);
  }
  return order.map((name) => ({ name, items: map.get(name)! }));
}
