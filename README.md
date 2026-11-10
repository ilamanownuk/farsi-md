# خوانندهٔ مارک‌دان فارسی (farsi-md)

یک خوانندهٔ مارک‌دان راست‌به‌چپ. متن را بچسبانید یا فایل `.md` را بارگذاری (یا بکشید و رها کنید) کنید و با فونت‌های فارسی (وزیرمتن، ساحل، شبنم، صمیم، استعداد) بخوانید. اندازه، رنگ متن، فونت و حالت روشن/تاریک قابل تنظیم است؛ تنظیمات و تاریخچهٔ ۲۰ متن آخر در `localStorage` مرورگر ذخیره می‌شود.

**English:** A Persian RTL Markdown reader. Paste or upload Markdown and read it with Persian fonts. Adjustable font, size, color, light/dark theme. Settings (`rtlmd:settings`) and history (`rtlmd:history`, max 20) are stored in localStorage. Built with Next.js (static export), Tailwind, marked + DOMPurify.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

Deploy on Vercel: import the repo (framework preset: Next.js); no extra config needed.
