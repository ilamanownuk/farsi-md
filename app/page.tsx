"use client";

import { useEffect, useState } from "react";
import InputView from "@/components/InputView";
import Reader from "@/components/Reader";
import SettingsBar from "@/components/SettingsBar";
import HistoryDrawer from "@/components/HistoryDrawer";
import {
  DEFAULT_SETTINGS,
  addToHistory,
  clearHistory,
  loadHistory,
  loadSettings,
  removeFromHistory,
  saveSettings,
  type HistoryItem,
  type Settings,
} from "@/lib/storage";

export default function Home() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [text, setText] = useState("");
  const [view, setView] = useState<"input" | "reader">("input");
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(loadSettings());
    setHistory(loadHistory());
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
    if (ready) saveSettings(settings);
  }, [settings, ready]);

  function read() {
    if (!text.trim()) return;
    setHistory((h) => addToHistory(h, text));
    setView("reader");
    window.scrollTo(0, 0);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">خوانندهٔ مارک‌دان فارسی</h1>
        <nav className="flex gap-2">
          {view === "reader" && (
            <button
              type="button"
              onClick={() => setView("input")}
              className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              ویرایش متن
            </button>
          )}
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            تاریخچه ({history.length.toLocaleString("fa-IR")})
          </button>
        </nav>
      </header>

      <section className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
        <SettingsBar settings={settings} onChange={setSettings} />
      </section>

      <main className="flex-1">
        {view === "input" ? (
          <InputView value={text} onChange={setText} onRead={read} />
        ) : (
          <Reader markdown={text} settings={settings} />
        )}
      </main>

      <HistoryDrawer
        open={drawer}
        items={history}
        onClose={() => setDrawer(false)}
        onRestore={(it) => {
          setText(it.text);
          setView("reader");
          setDrawer(false);
        }}
        onDelete={(id) => setHistory((h) => removeFromHistory(h, id))}
        onClear={() => setHistory(clearHistory())}
      />
    </div>
  );
}
