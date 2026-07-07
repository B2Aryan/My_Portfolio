import { useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Layout, Server, Database, Brain, Wrench, type LucideIcon } from "lucide-react";
import { skills } from "@/lib/portfolio-data";

const ICONS: Record<string, LucideIcon> = { Code2, Layout, Server, Database, Brain, Wrench };

export function Skills() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((s, i) => {
        const Icon = ICONS[s.icon] ?? Code2;
        return (
          <motion.div
            key={s.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:border-primary/40"
          >
            <GlowSpot />
            <div className="relative">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-shadow group-hover:glow-cyan">
                <Icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-foreground">{s.category}</h3>
              <p className="mt-1 text-xs text-foreground/50 leading-relaxed">{s.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-[11px] text-cyan-300/90 shadow-[0_0_10px_rgba(6,182,212,0.08)] transition-all duration-300 group-hover:shadow-[0_0_14px_rgba(6,182,212,0.18)]"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function GlowSpot() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current?.style.setProperty("--mx", `${x}px`);
    ref.current?.style.setProperty("--my", `${y}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.82 0.16 195 / 0.15), transparent 50%)",
      }}
    />
  );
}
