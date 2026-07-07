import { motion } from "framer-motion";
import { Compass, Rocket, GraduationCap, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "The Journey",
    body: "Started writing code in school, quickly fell for the magic of turning ideas into working products. From scrappy scripts to full-stack apps, every project taught me to ship better.",
  },
  {
    icon: Rocket,
    title: "Passion for Building",
    body: "I love designing clean interfaces and reliable systems. The best part of development is the moment a feature clicks for someone — that's what I optimize for.",
  },
  {
    icon: GraduationCap,
    title: "Currently Learning",
    body: "Deepening my work in applied AI, system design, and production-grade frontends. Exploring agentic AI workflows, retrieval, and developer tooling.",
  },
  {
    icon: Sparkles,
    title: "Future Goals",
    body: "Build products at the intersection of AI and great UX, contribute to open source, and grow into a thoughtful, full-stack engineer who ships work that lasts.",
  },
];

export function About() {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
      <ul className="space-y-10">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const right = i % 2 === 1;
          return (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative flex flex-col md:flex-row md:items-center ${
                right ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 md:px-10">
                <div className="glass rounded-2xl p-6 transition-all hover:border-primary/30">
                  <div className="mb-3 inline-flex items-center gap-2 text-primary">
                    <Icon size={18} />
                    <span className="text-xs uppercase tracking-widest">{s.title}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/85">{s.body}</p>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2">
                <span className="block h-3 w-3 rounded-full bg-primary glow-cyan" />
              </div>
              <div className="md:w-1/2" />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
