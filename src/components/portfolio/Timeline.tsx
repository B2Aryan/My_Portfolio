import { motion } from "framer-motion";
import { Briefcase, Trophy, Award, type LucideIcon } from "lucide-react";
import { experience } from "@/lib/portfolio-data";

const ICONS: LucideIcon[] = [Briefcase, Trophy, Award];

export function Timeline({ items }: { items: typeof experience }) {
  return (
    <ol className="relative ml-3 border-l border-primary/25">
      {items.map((e, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <motion.li
            key={e.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative mb-10 pl-8"
          >
            <span className="absolute -left-[14px] top-1 grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/40">
              <Icon size={14} />
            </span>
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground">{e.role}</h3>
                <span className="font-mono text-[11px] text-primary">{e.period}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{e.org}</p>
              <ul className="mt-3 space-y-1.5">
                {e.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
