"use client";

import { FONTS, type FontKey, type Settings } from "@/lib/storage";

interface Props {
  settings: Settings;
  onChange: (s: Settings) => void;
}

export default function SettingsBar({ settings, onChange }: Props) {
  const set = (p: Partial<Settings>) => onChange({ ...settings, ...p });
  const dark = settings.theme === "dark";
  const ctl =
    "rounded-lg border border-neutral-300 bg-white px-2 py-1.5 dark:border-neutral-700 dark:bg-neutral-900";

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
      <label className="flex items-center gap-2">
        فونت
        <select
          className={ctl}
          value={settings.font}
          onChange={(e) => set({ font: e.target.value as FontKey })}
        >
          {FONTS.map((f) => (
            <option key={f.key} value={f.key}>
              {f.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2">
        اندازه
        <input
          type="range"
          min={14}
          max={28}
          step={1}
          value={settings.size}
          onChange={(e) => set({ size: Number(e.target.value) })}
        />
        <span className="w-8 tabular-nums">{settings.size.toLocaleString("fa-IR")}</span>
      </label>

      <label className="flex items-center gap-2">
        رنگ متن
        <input
          type="color"
          className="h-8 w-10 cursor-pointer rounded border border-neutral-300 bg-transparent dark:border-neutral-700"
          value={settings.color || (dark ? "#e5e5e5" : "#171717")}
          onChange={(e) => set({ color: e.target.value })}
        />
        {settings.color && (
          <button type="button" className={ctl} onClick={() => set({ color: "" })}>
            بازنشانی
          </button>
        )}
      </label>

      <button
        type="button"
        className={ctl}
        onClick={() => set({ theme: dark ? "light" : "dark" })}
        aria-label="تغییر حالت روشن/تاریک"
      >
        {dark ? "☀️ حالت روشن" : "🌙 حالت تاریک"}
      </button>
    </div>
  );
}
