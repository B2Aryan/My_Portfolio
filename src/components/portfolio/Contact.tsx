import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileDown, ArrowUpRight, type LucideIcon } from "lucide-react";
import { social } from "@/lib/portfolio-data";

type Card = { label: string; value: string; href: string; Icon: LucideIcon; external?: boolean };

const cards: Card[] = [
  { label: "Email", value: social.email, href: `mailto:${social.email}`, Icon: Mail },
  { label: "GitHub", value: "@B2Aryan", href: social.github, Icon: Github, external: true },
  {
    label: "LinkedIn",
    value: "/in/b2aryan",
    href: social.linkedin,
    Icon: Linkedin,
    external: true,
  },
  { label: "Resume", value: "Download PDF", href: social.resume, Icon: FileDown },
];

export function Contact() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map(({ label, value, href, Icon, external }, i) => (
        <motion.a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.05 }}
          whileHover={{ y: -4 }}
          className="group relative flex items-center gap-4 overflow-hidden rounded-2xl glass p-5 transition-all hover:border-primary/40 hover:bg-white/[0.04]"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/30 transition-shadow group-hover:glow-cyan">
            <Icon size={18} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
            <p className="truncate text-sm font-medium text-foreground">{value}</p>
          </div>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </motion.a>
      ))}
    </div>
  );
}
