import { motion } from "framer-motion";
import { Lock, ExternalLink } from "lucide-react";

interface BrowserPreviewProps {
  url: string;
  title: string;
  image: string;
  accent: string;
  objectPosition?: string;
  className?: string;
}

function domainOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function Chrome({ url }: { url: string }) {
  return (
    <div className="relative flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex max-w-[80%] items-center gap-1.5 truncate rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-foreground/70">
          <Lock size={10} className="text-emerald-400" />
          <span className="truncate font-mono">{domainOf(url)}</span>
        </div>
      </div>
      <div className="w-[54px]" />
    </div>
  );
}

export function BrowserPreview({
  url,
  title,
  image,
  accent,
  objectPosition = "object-top",
  className = "",
}: BrowserPreviewProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open live ${title} website`}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group relative block cursor-pointer overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0F16]/80 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_30px_80px_-20px_color-mix(in_oklab,var(--primary)_45%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {/* accent glow */}
      <div
        className={`pointer-events-none absolute -inset-px -z-0 rounded-[20px] bg-gradient-to-br ${accent} opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-40`}
      />

      <div className="relative z-10">
        <Chrome url={url} />
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070A10]">
          <img
            src={image}
            alt={`${title} website preview`}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full select-none object-cover ${objectPosition} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
            draggable={false}
            onError={() => {
              if (import.meta.env.DEV) {
                console.error(
                  `Project preview failed to load:\n- project title: ${title}\n- resolved image src: ${image}`,
                );
              }
            }}
          />

          {/* hover overlay (desktop) */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:hidden">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md">
              View Live Project <ExternalLink size={12} />
            </div>
          </div>

          {/* reflection sheen */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
