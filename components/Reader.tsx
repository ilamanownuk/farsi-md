"use client";

import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import type { Settings } from "@/lib/storage";

export default function Reader({ markdown, settings }: { markdown: string; settings: Settings }) {
  const html = useMemo(() => {
    const raw = marked.parse(markdown, { async: false, gfm: true }) as string;
    const clean = DOMPurify.sanitize(raw);
    const doc = new DOMParser().parseFromString(clean, "text/html");
    doc
      .querySelectorAll("p,li,h1,h2,h3,h4,h5,h6,blockquote,td,th")
      .forEach((el) => el.setAttribute("dir", "auto"));
    doc.querySelectorAll("pre,code").forEach((el) => el.setAttribute("dir", "ltr"));
    doc.querySelectorAll("a").forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
    return doc.body.innerHTML;
  }, [markdown]);

  const style: React.CSSProperties = {
    fontFamily: `"${settings.font}", Tahoma, sans-serif`,
    fontSize: `${settings.size}px`,
    ...(settings.color ? { color: settings.color } : {}),
  };

  return (
    <article
      dir="rtl"
      className="prose-fa"
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
