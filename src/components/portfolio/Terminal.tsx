import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Cpu, HardDrive, Cloud, ShieldCheck } from "lucide-react";
import { social, skills, projects, experience, education } from "@/lib/portfolio-data";
import { THEMES, applyTheme, getStoredTheme, getThemeMeta, type ThemeId } from "@/lib/theme";
import { Neofetch } from "./Neofetch";

type Line = { kind: "in" | "out" | "node"; text?: string; node?: ReactNode };

// Terminal token classes — colors are theme-aware via CSS vars (set in src/styles.css)
const C = {
  key: "text-[color:var(--term-key)]",
  str: "text-[color:var(--term-str)]",
  num: "text-[color:var(--term-num)]",
  kw: "text-[color:var(--term-kw)]",
  comment: "text-slate-500 italic",
  fn: "text-[color:var(--term-fn)]",
  punct: "text-slate-400",
  user: "text-[color:var(--term-user)]",
  host: "text-[color:var(--term-host)]",
  path: "text-[color:var(--term-path)]",
  ok: "text-[color:var(--term-ok)]",
  warn: "text-[color:var(--term-num)]",
  err: "text-[color:var(--term-err)]",
  dim: "text-slate-400",
  fg: "text-slate-200",
};

const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "resume",
  "github",
  "linkedin",
  "leetcode",
  "contact",
  "whoami",
  "pwd",
  "ls",
  "date",
  "theme",
  "social",
  "techstack",
  "neofetch",
  "clear",
  ...THEMES.map((t) => t.id),
];

function K({ children }: { children: ReactNode }) {
  return <span className={C.key}>{children}</span>;
}
function S({ children }: { children: ReactNode }) {
  return <span className={C.str}>"{children}"</span>;
}
function P({ children }: { children: ReactNode }) {
  return <span className={C.punct}>{children}</span>;
}
function Cm({ children }: { children: ReactNode }) {
  return <span className={C.comment}>{children}</span>;
}

const HelpView = () => (
  <div className="space-y-0.5">
    <div className={C.comment}>// Available commands</div>
    {[
      ["help", "Show this list"],
      ["about", "About Aryan"],
      ["skills", "Tech stack"],
      ["projects", "Featured projects"],
      ["experience", "Work & internships"],
      ["education", "Schooling"],
      ["resume", "Download resume"],
      ["github / linkedin / leetcode", "Open profile"],
      ["contact", "Contact info"],
      ["whoami / pwd / ls / date", "System info"],
      ["theme [name]", "Switch the portfolio's visual theme"],
      ["social / techstack", "Meta"],
      ["neofetch", "System info + portfolio profile"],

      ["clear", "Clear terminal"],
    ].map(([c, d]) => (
      <div key={c}>
        <span className={C.fn}>{c.padEnd(32)}</span>
        <span className={C.dim}>{d}</span>
      </div>
    ))}
  </div>
);

const SkillsView = () => (
  <div>
    <span className={C.kw}>const</span> <span className={C.fn}>techStack</span> <P>=</P>{" "}
    <P>{"{"}</P>
    {skills.map((s, i) => (
      <div key={s.category} className="pl-4">
        <Cm>{`// ${s.category}`}</Cm>
        <div className="pl-0">
          <K>{JSON.stringify(s.category.toLowerCase().replace(/\s+/g, "_"))}</K>
          <P>: </P>
          <P>[</P>
          {s.items.map((it, j) => (
            <span key={it}>
              <S>{it}</S>
              {j < s.items.length - 1 && <P>, </P>}
            </span>
          ))}
          <P>]</P>
          {i < skills.length - 1 && <P>,</P>}
        </div>
      </div>
    ))}
    <P>{"}"}</P>
  </div>
);

const AboutView = () => (
  <div>
    <span className={C.kw}>const</span> <span className={C.fn}>aryan</span> <P>=</P> <P>{"{"}</P>
    <div className="pl-4">
      <div>
        <K>"name"</K>
        <P>: </P>
        <S>Aryan Gupta</S>
        <P>,</P>
      </div>
      <div>
        <K>"role"</K>
        <P>: </P>
        <S>Software Developer • AI Enthusiast</S>
        <P>,</P>
      </div>
      <div>
        <K>"education"</K>
        <P>: </P>
        <S>B.Tech CSE (AI), Lucknow University</S>
        <P>,</P>
      </div>
      <div>
        <K>"focus"</K>
        <P>: </P>
        <P>[</P>
        <S>Full Stack</S>
        <P>, </P>
        <S>AI</S>
        <P>, </P>
        <S>DX</S>
        <P>]</P>
        <P>,</P>
      </div>
      <div>
        <K>"mantra"</K>
        <P>: </P>
        <S>ship fast, learn faster</S>
      </div>
    </div>
    <P>{"}"}</P>
  </div>
);

const ProjectsView = () => (
  <div className="space-y-1">
    <Cm>// Featured projects</Cm>
    {projects.map((p, i) => (
      <div key={p.title}>
        <span className={C.num}>{String(i + 1).padStart(2, "0")}</span>
        <P>. </P>
        <span className={C.fn}>{p.title}</span>
        <span className={C.dim}> — {p.tagline}</span>
      </div>
    ))}
  </div>
);

const ExperienceView = () => (
  <div className="space-y-0.5">
    {experience.map((e) => (
      <div key={e.role + e.org}>
        <span className={C.kw}>▸ </span>
        <span className={C.fn}>{e.role}</span>
        <span className={C.dim}> @ </span>
        <span className={C.str}>{e.org}</span>
        <span className={C.num}> ({e.period})</span>
      </div>
    ))}
  </div>
);

const EducationView = () => (
  <div className="space-y-0.5">
    {education.map((e) => (
      <div key={e.school}>
        <span className={C.kw}>▸ </span>
        <span className={C.fn}>{e.degree}</span>
        <span className={C.dim}>, </span>
        <span className={C.str}>{e.school}</span>
        <span className={C.num}> ({e.period})</span>
      </div>
    ))}
  </div>
);

const ContactView = () => (
  <div>
    <div>
      <span className={C.key}>email</span>
      <P> → </P>
      <span className={C.str}>{social.email}</span>
    </div>
    <div>
      <span className={C.key}>github</span>
      <P> → </P>
      <span className={C.str}>{social.github}</span>
    </div>
    <div>
      <span className={C.key}>linkedin</span>
      <P> → </P>
      <span className={C.str}>{social.linkedin}</span>
    </div>
    <div>
      <span className={C.key}>leetcode</span>
      <P> → </P>
      <span className={C.str}>{social.leetcode}</span>
    </div>
  </div>
);

const ReadyBanner = () => (
  <div
    className="my-2 rounded-md px-3 py-2"
    style={{
      border: "1px solid color-mix(in oklab, var(--term-accent) 30%, transparent)",
      background: "color-mix(in oklab, var(--term-accent) 8%, transparent)",
    }}
  >
    <div className={C.ok}>🚀 Interactive Terminal Ready</div>
    <div className={C.dim}>
      Type <span className={C.fn}>help</span> to see available commands.
    </div>
  </div>
);

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ kind: "in", text: "neofetch --config portfolio" }]);
  const [neofetchMounted, setNeofetchMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      setLines((l) => [...l, { kind: "node", node: <Neofetch /> }]);
      setNeofetchMounted(true);
    }, 250);
    return () => clearTimeout(t);
  }, []);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const pushNode = (node: ReactNode) => setLines((l) => [...l, { kind: "node", node }]);
  const pushText = (text: string) => setLines((l) => [...l, { kind: "out", text }]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    const cmd = trimmed.toLowerCase();
    const [base, ...args] = cmd.split(/\s+/);
    setLines((l) => [...l, { kind: "in", text: raw }]);

    if (!cmd) return;
    setHistory((h) => [...h, raw]);
    setHIdx(-1);

    // allow bare theme id as a command (e.g. `crimson`, `cyan`)
    const directTheme = THEMES.find((t) => t.id === base);
    if (directTheme && args.length === 0) {
      applyTheme(directTheme.id);
      pushNode(
        <div>
          <span className={C.ok}>✓ </span>
          <span className={C.dim}>theme switched to </span>
          <span className={C.fn}>{directTheme.name}</span>
          <span className={C.dim}> ({directTheme.id})</span>
        </div>,
      );
      return;
    }

    if (base === "theme") {
      if (args.length === 0) {
        const current = getThemeMeta(getStoredTheme());
        pushNode(
          <div className="space-y-1">
            <div>
              <span className={C.dim}>Current Theme: </span>
              <span className={C.fn}>{current.name}</span>
              <span className={C.dim}> ({current.id})</span>
            </div>
            <Cm>// Available themes</Cm>
            {THEMES.map((t) => (
              <div key={t.id}>
                <span className={C.kw}>▸ </span>
                <span className={C.fn}>{t.id.padEnd(16)}</span>
                <span className={C.dim}>{t.description}</span>
              </div>
            ))}
            <div className="pt-1">
              <span className={C.dim}>Usage: </span>
              <span className={C.fn}>theme &lt;name&gt;</span>
              <span className={C.dim}> e.g. </span>
              <span className={C.str}>theme aurora</span>
            </div>
          </div>,
        );
        return;
      }
      const id = args[0] as ThemeId;
      const found = THEMES.find((t) => t.id === id);
      if (!found) {
        pushNode(
          <div>
            <div>
              <span className={C.err}>Theme "{args[0]}" not found.</span>
            </div>
            <div className={C.dim}>Available themes:</div>
            {THEMES.map((t) => (
              <div key={t.id}>
                <span className={C.kw}>▸ </span>
                <span className={C.fn}>{t.id}</span>
              </div>
            ))}
            <div className={C.dim}>
              Type <span className={C.fn}>theme &lt;name&gt;</span> to switch.
            </div>
          </div>,
        );
        return;
      }
      applyTheme(found.id);
      pushNode(
        <div>
          <span className={C.ok}>✓ </span>
          <span className={C.dim}>theme switched to </span>
          <span className={C.fn}>{found.name}</span>
          <span className={C.dim}> ({found.id})</span>
        </div>,
      );
      return;
    }

    switch (base) {
      case "help":
        pushNode(<HelpView />);
        break;
      case "about":
        pushNode(<AboutView />);
        break;
      case "skills":
        pushNode(<SkillsView />);
        break;
      case "projects":
        pushNode(<ProjectsView />);
        break;
      case "experience":
        pushNode(<ExperienceView />);
        break;
      case "education":
        pushNode(<EducationView />);
        break;
      case "contact":
        pushNode(<ContactView />);
        break;
      case "social":
        pushNode(<ContactView />);
        break;
      case "resume": {
        pushText("→ downloading resume...");
        const a = document.createElement("a");
        a.href = social.resume;
        a.download = "Aryan_Gupta_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        break;
      }
      case "github":
        pushText(`→ ${social.github}`);
        window.open(social.github, "_blank");
        break;
      case "linkedin":
        pushText(`→ ${social.linkedin}`);
        window.open(social.linkedin, "_blank");
        break;
      case "leetcode":
        pushText(`→ ${social.leetcode}`);
        window.open(social.leetcode, "_blank");
        break;
      case "whoami":
        pushText("guest@portfolio — visitor 👋");
        break;
      case "pwd":
        pushText("/home/aryan/portfolio");
        break;
      case "ls":
        pushNode(
          <span>
            <span className={C.key}>about/</span>
            {"  "}
            <span className={C.key}>skills/</span>
            {"  "}
            <span className={C.key}>projects/</span>
            {"  "}
            <span className={C.key}>experience/</span>
            {"  "}
            <span className={C.key}>education/</span>
            {"  "}
            <span className={C.key}>contact/</span>
          </span>,
        );
        break;
      case "date":
        pushText(new Date().toString());
        break;

      case "techstack":
        pushNode(
          <span>
            <span className={C.dim}>This site: </span>
            <span className={C.str}>React</span>
            <P> · </P>
            <span className={C.str}>TypeScript</span>
            <P> · </P>
            <span className={C.str}>TanStack Start</span>
            <P> · </P>
            <span className={C.str}>Tailwind v4</span>
            <P> · </P>
            <span className={C.str}>Framer Motion</span>
          </span>,
        );
        break;
      case "neofetch": {
        // mimic real neofetch — small delay before output
        setTimeout(() => pushNode(<Neofetch />), 250);
        break;
      }
      case "clear":
        setLines([{ kind: "in", text: "neofetch --config portfolio" }]);
        setTimeout(() => pushNode(<Neofetch key={Date.now()} />), 250);
        break;
      default:
        pushNode(
          <span>
            <span className={C.err}>command not found: </span>
            <span className={C.fg}>{raw}</span>
            <span className={C.dim}> — try </span>
            <span className={C.fn}>help</span>
          </span>,
        );
    }
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const ni = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(ni);
      setInput(history[ni] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx === -1) return;
      const ni = hIdx + 1;
      if (ni >= history.length) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(ni);
        setInput(history[ni]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([{ kind: "in", text: "neofetch --config portfolio" }]);
      setTimeout(() => pushNode(<Neofetch key={Date.now()} />), 250);
    }
  };

  const Prompt = () => (
    <>
      <span className="text-emerald-400 font-semibold">aryan@portfolio</span>
      <span className="text-slate-500">:~$ </span>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0A0B0B] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0A0B0B] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[11px] text-slate-400">
          <span className={C.ok}>›_</span> zsh — interactive — 80×24
        </span>
        <span className="text-[11px] text-slate-500">⤢ ✕</span>
      </div>

      {/* status bar */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-white/10 bg-[#0A0B0B]/70 px-4 py-1.5 font-mono text-[11px]">
        <span className="flex items-center gap-1.5 text-slate-400">
          <Cpu className={`h-3 w-3 ${C.ok}`} /> CPU: <span className={C.ok}>12%</span>
        </span>
        <span className="flex items-center gap-1.5 text-slate-400">
          <HardDrive className={`h-3 w-3 ${C.host}`} /> RAM: <span className={C.num}>6.4GB</span>
        </span>
        <span className="flex items-center gap-1.5 text-slate-400">
          <Cloud className={`h-3 w-3 ${C.host}`} /> NET: <span className={C.host}>online</span>
        </span>
        <span className="flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className={`h-3 w-3 ${C.ok}`} /> SEC: <span className={C.ok}>Active</span>
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-[440px] overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {l.kind === "in" ? (
              <div>
                <Prompt />
                <span className={C.fg}>{l.text}</span>
              </div>
            ) : l.kind === "node" ? (
              <div className={C.fg}>{l.node}</div>
            ) : (
              <div className={C.fg + " opacity-90"}>{l.text}</div>
            )}
          </div>
        ))}

        {/* live prompt */}
        <div className="flex items-center">
          <Prompt />
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent text-slate-100 outline-none"
            style={{ caretColor: "var(--term-accent)" }}
          />
          <span
            className="cursor-blink ml-0.5 inline-block h-4 w-[7px]"
            style={{ background: "var(--term-accent)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
