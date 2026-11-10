"use client";

import type { HistoryItem } from "@/lib/storage";

interface Props {
  open: boolean;
  items: HistoryItem[];
  onClose: () => void;
  onRestore: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export default function HistoryDrawer({ open, items, onClose, onRestore, onDelete, onClear }: Props) {
  if (!open) return null;
  const fmt = new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside
        className="relative z-10 flex h-full w-full max-w-sm flex-col border-e border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
        role="dialog"
        aria-label="تاریخچه"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
          <h2 className="text-lg font-bold">تاریخچه</h2>
          <button type="button" onClick={onClose} aria-label="بستن" className="px-2 text-xl">
            ✕
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {items.length === 0 && (
            <li className="p-6 text-center text-neutral-500">تاریخچه‌ای وجود ندارد.</li>
          )}
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-center gap-2 border-b border-neutral-100 p-3 dark:border-neutral-800"
            >
              <button
                type="button"
                onClick={() => onRestore(it)}
                className="min-w-0 flex-1 text-start hover:opacity-80"
              >
                <div className="truncate font-medium" dir="auto">
                  {it.title}
                </div>
                <div className="text-xs text-neutral-500">{fmt.format(it.ts)}</div>
              </button>
              <button
                type="button"
                onClick={() => onDelete(it.id)}
                className="rounded-lg px-2 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
        {items.length > 0 && (
          <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => {
                if (confirm("همهٔ تاریخچه پاک شود؟")) onClear();
              }}
              className="w-full rounded-lg border border-red-300 py-2 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
            >
              پاک کردن همه
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
