import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Shared ambient background for interior pages.
 * Provides continuous grid + cursor-following glow + soft blobs,
 * consistent with the homepage hero.
 */
export function PageBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.3 });

  useEffect(() => {
    // Skip cursor tracking on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setMouse({ x: e.clientX / w, y: e.clientY / h });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Cursor glow */}
      <div
        className="absolute inset-0 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 60%)`,
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_50%_120%,transparent_40%,oklch(0_0_0/0.6)_100%)]" />

      {/* Ambient blobs */}
      <motion.div
        animate={{ y: [0, -25, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[140px]"
      />
      <motion.div
        animate={{ y: [0, 25, 0], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[140px]"
      />
    </div>
  );
}
