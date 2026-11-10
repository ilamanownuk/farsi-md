import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "خوانندهٔ مارک‌دان فارسی",
  description:
    "متن یا فایل مارک‌دان را بچسبانید و با فونت‌های فارسی، راست‌به‌چپ و خوانا بخوانید.",
};

const FONT_CSS = [
  "https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css",
  "https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css",
  "https://cdn.jsdelivr.net/gh/rastikerdar/shabnam-font@v5.0.1/dist/font-face.css",
  "https://cdn.jsdelivr.net/gh/rastikerdar/samim-font@v4.0.0/dist/font-face.css",
];

const THEME_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem('rtlmd:settings')||'null');var t=s&&s.theme;var d=t==='dark'||((t!=='light')&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){if(window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        {FONT_CSS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
