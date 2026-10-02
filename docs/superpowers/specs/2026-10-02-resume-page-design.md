# Resume Page Design

**Date:** 2026-10-02
**Status:** Approved

## Goal

Add a "Resume" menu item that opens a dedicated `/resume` page showing the resume PDF, with a button to download it.

## Decisions

- **Rendering:** PDF.js via `react-pdf`. The PDF in `public/Sai-Shashikant-Resume.pdf` stays the single source of truth (exported from `resume/Sai-Shashikant-Resume.html`). Renders identically on all devices, including Android Chrome, where `<iframe>` PDFs show blank.
- **Rejected:** native `<iframe>`/`<object>` viewer (poor mobile support); HTML rebuild of the resume (two copies to keep in sync).

## Navigation

- Append `{name: "Resume", link: "/resume"}` to `navItems` in `src/app/lib/AppConstants.ts`.
- Change existing section links from `#about` style to `/#about` style so they work from `/resume` and return to the right home section.
- Footer "Resume" button links to `/resume` instead of downloading directly.

## `/resume` page

- **Header:** sticky top bar in the site's dark theme. Left: "← Back to portfolio" link to `/`. Right: "Download PDF" button (`<a href download>`).
- **Viewer:** centered PDF pages, width fits the viewport up to 816 CSS px (8.5in), rendered at device pixel ratio for sharpness. Text layer and annotation layer enabled so text is selectable and links are clickable.
- **Loading:** a placeholder card while the document loads.
- **Error:** a message with the download button if the PDF fails to load.
- **Metadata:** title "Resume — Sai Shashikant".

## Components

- `src/app/resume/page.tsx` — server component: metadata, header, renders `ResumeViewer`.
- `src/components/ResumeViewer.tsx` — client component; loads `ResumeDocument` with `next/dynamic` and `ssr: false`, showing the loading placeholder meanwhile.
- `src/components/ResumeDocument.tsx` — client component wrapping `react-pdf` (`Document`/`Page`), measures container width, handles the error state.
- `src/app/lib/AppConstants.ts` — `resumeFile = {path: "/Sai-Shashikant-Resume.pdf", downloadName: "Sai-Shashikant-Resume.pdf"}` shared by nav, footer, and page.

## Constraints

- Site uses `output: "export"` (static). The PDF.js worker is bundled via `new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url)` so no server is needed.
- `react-pdf` touches browser-only APIs at import time, so it must never be prerendered; only `ResumeDocument` imports it, and only via the `ssr: false` dynamic import. The home page bundle is unaffected.

## Testing

- `npm run build` succeeds and emits `out/resume.html`.
- Headless Chrome screenshots of `/resume` at 390px (phone) and 1280px (desktop) show the rendered resume and the download button.
- Download button serves the PDF; nav links from `/resume` resolve to home sections.
