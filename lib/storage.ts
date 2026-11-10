export type FontKey = "Vazirmatn" | "Sahel" | "Shabnam" | "Samim" | "Estedad";
export type Theme = "light" | "dark";

export interface Settings {
  font: FontKey;
  size: number;
  color: string; // "" = default theme color
  theme: Theme;
}

export interface HistoryItem {
  id: string;
  title: string;
  text: string;
  ts: number;
}

export const FONTS: { key: FontKey; label: string }[] = [
  { key: "Vazirmatn", label: "وزیرمتن" },
  { key: "Sahel", label: "ساحل" },
  { key: "Shabnam", label: "شبنم" },
  { key: "Samim", label: "صمیم" },
  { key: "Estedad", label: "استعداد" },
];

export const DEFAULT_SETTINGS: Settings = {
  font: "Vazirmatn",
  size: 18,
  color: "",
  theme: "light",
};

const SETTINGS_KEY = "rtlmd:settings";
const HISTORY_KEY = "rtlmd:history";
const MAX_HISTORY = 20;

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const p = JSON.parse(raw) as Partial<Settings>;
    const font = FONTS.some((f) => f.key === p.font) ? p.font! : DEFAULT_SETTINGS.font;
    const size =
      typeof p.size === "number" ? Math.min(28, Math.max(14, p.size)) : DEFAULT_SETTINGS.size;
    const color = typeof p.color === "string" && /^#[0-9a-f]{6}$/i.test(p.color) ? p.color : "";
    const theme: Theme = p.theme === "dark" ? "dark" : p.theme === "light" ? "light" : getSystemTheme();
    return { font, size, color, theme };
  } catch {
    return { ...DEFAULT_SETTINGS, theme: getSystemTheme() };
  }
}

function getSystemTheme(): Theme {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function saveSettings(s: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (x): x is HistoryItem =>
        x && typeof x.id === "string" && typeof x.text === "string" && typeof x.ts === "number",
    );
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]): HistoryItem[] {
  let list = items.slice(0, MAX_HISTORY);
  while (true) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
      return list;
    } catch {
      if (list.length <= 1) return list;
      list = list.slice(0, -1); // drop oldest and retry
    }
  }
}

export function makeTitle(text: string): string {
  const line = text.split(/\r?\n/).find((l) => l.trim() !== "") ?? "";
  const t = line.replace(/^\s*#+\s*/, "").trim();
  return (t || "بدون عنوان").slice(0, 80);
}

export function addToHistory(items: HistoryItem[], text: string): HistoryItem[] {
  const rest = items.filter((i) => i.text !== text);
  const item: HistoryItem = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title: makeTitle(text),
    text,
    ts: Date.now(),
  };
  return saveHistory([item, ...rest]);
}

export function removeFromHistory(items: HistoryItem[], id: string): HistoryItem[] {
  return saveHistory(items.filter((i) => i.id !== id));
}

export function clearHistory(): HistoryItem[] {
  return saveHistory([]);
}
