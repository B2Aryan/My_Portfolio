export const THEMES = [
  {
    id: "cyan",
    name: "Cyan",
    description: "Premium futuristic dark theme inspired by modern developer portfolios.",
  },
  {
    id: "aurora",
    name: "Aurora Purple",
    description: "Elegant futuristic theme with deep violet and electric blue highlights.",
  },
  {
    id: "matrix",
    name: "Emerald Matrix",
    description: "Inspired by classic terminals with a modern premium glass aesthetic.",
  },
  {
    id: "crimson",
    name: "Crimson Neon",
    description: "Bold cyberpunk-inspired dark theme with warm neon highlights.",
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "portfolio-theme";
const EVENT = "portfolio-theme-change";

// Legacy id migration
const LEGACY_ID_MAP: Record<string, ThemeId> = { "midnight-cyan": "cyan" };

export function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "cyan";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const migrated = raw && LEGACY_ID_MAP[raw] ? LEGACY_ID_MAP[raw] : (raw as ThemeId | null);
  return migrated && THEMES.some((t) => t.id === migrated) ? migrated : "cyan";
}

export function applyTheme(id: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", id);
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore localStorage error */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
}

export function onThemeChange(cb: (id: ThemeId) => void) {
  const handler = (e: Event) => cb((e as CustomEvent).detail as ThemeId);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

export function getThemeMeta(id: ThemeId) {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
