"use client";

import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onRead: () => void;
}

export default function InputView({ value, onChange, onRead }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function readFile(file: File | undefined) {
    if (!file) return;
    if (!/\.(md|markdown|txt)$/i.test(file.name) && !file.type.startsWith("text/")) {
      alert("فقط فایل‌های .md، .markdown یا .txt پشتیبانی می‌شوند.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result ?? ""));
    reader.readAsText(file, "utf-8");
  }

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border-2 border-dashed p-4 transition-colors ${
        dragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/40"
          : "border-neutral-300 dark:border-neutral-700"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        readFile(e.dataTransfer.files?.[0]);
      }}
    >
      <textarea
        dir="auto"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="متن مارک‌دان خود را اینجا بچسبانید، یا فایل را به اینجا بکشید و رها کنید…"
        className="min-h-[50vh] w-full resize-y rounded-xl border border-neutral-300 bg-white p-4 font-mono text-sm leading-7 outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900"
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRead}
          disabled={!value.trim()}
          className="rounded-xl bg-blue-600 px-6 py-2.5 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          خواندن
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-xl border border-neutral-300 px-4 py-2.5 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          بارگذاری فایل .md
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-xl px-4 py-2.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            پاک کردن
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept=".md,.markdown,.txt,text/markdown,text/plain"
          className="hidden"
          onChange={(e) => {
            readFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
