import { useEffect, useRef } from "react";

/**
 * Spotlight — drop-in cursor-tracing glow for card-style elements.
 *
 * Usage: place <Spotlight /> as the FIRST child of any `position: relative`
 * card. It attaches pointer listeners to the parent element and renders two
 * theme-aware overlays (inner radial glow + localized border highlight) that
 * follow the cursor. No React rerenders occur on pointer movement — only CSS
 * custom properties are mutated.
 *
 * The color automatically inherits the active theme via `var(--primary)`.
 *
 * Disabled on touch-only devices via `@media (hover:hover) and (pointer:fine)`.
 */
export function Spotlight({
  intensity = 1,
  radius = 320,
}: {
  /** Multiplier on glow opacity. Use ~0.6 for subtle (e.g. CTA card). */
  intensity?: number;
  /** Radius (px) of the inner radial glow. */
  radius?: number;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    const parent = el?.parentElement as HTMLElement | null;
    if (!el || !parent) return;

    // Only activate on fine-pointer devices.
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    let raf = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${px}px`);
      el.style.setProperty("--my", `${py}px`);
    };

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onEnter = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      el.style.setProperty("--mx", `${px}px`);
      el.style.setProperty("--my", `${py}px`);
      el.style.setProperty("--glow-o", "1");
    };
    const onLeave = () => {
      el.style.setProperty("--glow-o", "0");
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerenter", onEnter);
    parent.addEventListener("pointerleave", onLeave);

    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerenter", onEnter);
      parent.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const innerOpacity = 0.35 * intensity;
  const borderOpacity = 0.55 * intensity;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--glow-o": 0,
        } as React.CSSProperties
      }
    >
      {/* Inner radial glow */}
      <div
        className="absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--glow-o)",
          background: `radial-gradient(${radius}px circle at var(--mx) var(--my), color-mix(in oklab, var(--primary) ${
            innerOpacity * 100
          }%, transparent), transparent 60%)`,
        }}
      />
      {/* Localized border highlight */}
      <div
        className="absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out"
        style={{
          opacity: "var(--glow-o)",
          padding: "1px",
          background: `radial-gradient(${Math.round(
            radius * 0.9,
          )}px circle at var(--mx) var(--my), color-mix(in oklab, var(--primary) ${
            borderOpacity * 100
          }%, transparent), transparent 65%)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
    </div>
  );
}
