import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { CommandPalette } from "./CommandPalette";

type NavLink = { id: string; label: string; route?: string };

const links: NavLink[] = [
  { id: "about", label: "About", route: "/about" },
  { id: "projects", label: "Projects", route: "/projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onAboutPage = pathname === "/about";
  const onProjectsPage = pathname === "/projects";
  const onSubPage = onAboutPage || onProjectsPage;

  useEffect(() => {
    if (onSubPage) {
      if (onAboutPage) setActive("about");
      else if (onProjectsPage) setActive("projects");
      setScrolled(true);
      return;
    }
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const scrollables = links.filter((l) => !l.route);
      const all = [{ id: "home" } as NavLink, ...scrollables];
      for (const l of [...all].reverse()) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(l.id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onSubPage, onAboutPage, onProjectsPage, pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goHome = () => {
    setOpen(false);
    if (pathname !== "/") {
      router.navigate({ to: "/" });
    } else {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const go = (link: NavLink) => {
    setOpen(false);
    if (link.route) {
      router.navigate({ to: link.route });
      return;
    }
    if (pathname !== "/") {
      router.navigate({ to: "/", hash: link.id });
      return;
    }
    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goContact = () => go({ id: "contact", label: "Contact" });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(5,7,10,0.75)" : "rgba(5,7,10,0.55)",
        backdropFilter: "blur(20px) saturate(160%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-6 md:h-20 md:px-10">
        <button
          onClick={goHome}
          className="flex shrink-0 items-center text-[22px] font-bold tracking-tight text-foreground md:text-[26px]"
        >
          Aryan Gupta<span className="text-primary">.</span>
        </button>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <motion.button
                key={l.id}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => go(l)}
                className="group relative flex items-center gap-2 px-3 py-2 text-sm font-medium"
              >
                <span
                  className={`font-mono text-base transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground/60 group-hover:text-primary/70"
                  }`}
                >
                  /
                </span>
                <span
                  className={`transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {l.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-3 right-3 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, var(--primary), transparent)",
                      boxShadow: "0 0 8px var(--primary)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            className="relative hidden md:block"
          >
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/80"
              strokeWidth={2}
            />
            <span
              id="nav-search"
              className="flex h-11 w-64 items-center rounded-xl border border-white/10 bg-transparent pl-10 pr-16 text-left text-[15px] text-muted-foreground/70 transition-colors hover:border-white/20"
            >
              Search...
            </span>
            <kbd className="pointer-events-none absolute right-3 top-1/2 flex h-6 -translate-y-1/2 items-center gap-0.5 rounded-md border border-white/10 bg-white/[0.03] px-1.5 font-mono text-[11px] text-muted-foreground/80">
              ⌘ K
            </kbd>
          </button>

          <motion.button
            onClick={goContact}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="hidden h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_24px_rgba(34,211,238,0.45)] md:inline-flex"
          >
            Let's Talk
          </motion.button>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-white/5 lg:hidden"
            style={{ background: "rgba(5,7,10,0.9)", backdropFilter: "blur(20px)" }}
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm ${
                      active === l.id
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-white/5"
                    }`}
                  >
                    <span className="font-mono text-primary/70">/</span>
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={goContact}
                  className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Let's Talk
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </motion.header>
  );
}
