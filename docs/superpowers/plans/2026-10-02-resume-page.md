# Resume Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Resume" menu item that opens a `/resume` page rendering the resume PDF with PDF.js and a Download PDF button.

**Architecture:** A static `/resume` route (server component for metadata and header) renders a client `ResumeViewer`, which lazy-loads `ResumeDocument` (the only module importing `react-pdf`) with `ssr: false`. The PDF path lives in one shared constant used by the nav, footer, and page.

**Tech Stack:** Next.js 16 (App Router, `output: "export"`, Turbopack), React 19, Tailwind 3, `react-pdf` 11 (bundles `pdfjs-dist` 6.3.289).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-10-02-resume-page-design.md`.
- Static export only: no API routes, no server runtime. `npm run build` must succeed and emit `out/resume.html`.
- `react-pdf` is imported only in `src/components/ResumeDocument.tsx`, and that module is loaded only via `next/dynamic` with `ssr: false`.
- Max rendered page width: 816 CSS px.
- Page title: `Resume — Sai Shashikant`.
- The project has no unit test runner. Verification is `npm run build` plus headless Chrome checks against the built `out/` folder.

---

### Task 1: Shared resume constant, Resume menu item, footer link

**Files:**
- Modify: `src/app/lib/AppConstants.ts:1-6`
- Modify: `src/components/Footer.tsx:1-4, 24-31`

**Interfaces:**
- Produces: `resumeFile: {path: string; downloadName: string}` exported from `@/app/lib/AppConstants`.

- [ ] **Step 1: Replace `navItems` and add `resumeFile` in `src/app/lib/AppConstants.ts`**

```ts
export const resumeFile = {
    path: "/Sai-Shashikant-Resume.pdf",
    downloadName: "Sai-Shashikant-Resume.pdf",
};

export const navItems = [
    {name: "About", link: "/#about"},
    {name: "Projects", link: "/#projects"},
    {name: "Testimonials", link: "/#testimonials"},
    {name: "Contact", link: "/#contact"},
    {name: "Resume", link: "/resume"},
];
```

- [ ] **Step 2: Point the footer Resume button at `/resume`**

In `src/components/Footer.tsx`, add `import Link from "next/link";` and replace the `<a href="/Sai-Shashikant-Resume.pdf" download=...>` wrapper with:

```tsx
<Link href="/resume">
    <MagicButton
        title="Resume"
        icon={<HiOutlineDocumentText/>}
        position="left"
        className="!mt-0 !h-10 !w-auto"
    />
</Link>
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds. Then `grep -c '/resume' out/index.html` prints a number ≥ 2 (nav item and footer link).

- [ ] **Step 4: Commit**

```bash
git add src/app/lib/AppConstants.ts src/components/Footer.tsx
git commit -m "feat: add Resume menu item and shared resume file constant"
```

---

### Task 2: `/resume` page with PDF.js viewer

**Files:**
- Modify: `package.json` (add `react-pdf`)
- Create: `src/components/ResumePlaceholder.tsx`
- Create: `src/components/ResumeDocument.tsx`
- Create: `src/components/ResumeViewer.tsx`
- Create: `src/app/resume/page.tsx`

**Interfaces:**
- Consumes: `resumeFile` from Task 1.
- Produces: `ResumePlaceholder({message?: string})`, `ResumeDocument({file: string})`, `ResumeViewer({file: string})`, route `/resume`.

- [ ] **Step 1: Install react-pdf**

Run: `npm install react-pdf@^11.0.0`
Expected: `package.json` lists `react-pdf`; `node_modules/pdfjs-dist/build/pdf.worker.min.mjs` exists.

- [ ] **Step 2: Create `src/components/ResumePlaceholder.tsx`**

```tsx
export const ResumePlaceholder = ({message = "Loading resume…"}: { message?: string }) => (
    <div className="mx-auto flex aspect-[8.5/11] w-full max-w-[816px] items-center justify-center rounded-lg border border-white/[0.1] bg-black-200 px-6 text-center text-sm text-white-200">
        {message}
    </div>
);
```

- [ ] **Step 3: Create `src/components/ResumeDocument.tsx`**

```tsx
"use client";

import {useEffect, useRef, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {ResumePlaceholder} from "@/components/ResumePlaceholder";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

const MAX_PAGE_WIDTH = 816;

export const ResumeDocument = ({file}: { file: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>();
    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) =>
            setWidth(Math.min(entry.contentRect.width, MAX_PAGE_WIDTH)),
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="w-full">
            <Document
                file={file}
                onLoadSuccess={({numPages}) => setNumPages(numPages)}
                loading={<ResumePlaceholder/>}
                error={<ResumePlaceholder message="Couldn't display the resume here. Use the Download PDF button above."/>}
                externalLinkTarget="_blank"
                className="flex flex-col items-center gap-6"
            >
                {width !== undefined &&
                    Array.from({length: numPages}, (_, i) => (
                        <Page
                            key={i}
                            pageNumber={i + 1}
                            width={width}
                            className="overflow-hidden rounded-lg shadow-2xl"
                        />
                    ))}
            </Document>
        </div>
    );
};
```

- [ ] **Step 4: Create `src/components/ResumeViewer.tsx`**

```tsx
"use client";

import dynamic from "next/dynamic";
import {ResumePlaceholder} from "@/components/ResumePlaceholder";

const ResumeDocument = dynamic(
    () => import("@/components/ResumeDocument").then((m) => m.ResumeDocument),
    {ssr: false, loading: () => <ResumePlaceholder/>},
);

export const ResumeViewer = ({file}: { file: string }) => <ResumeDocument file={file}/>;
```

- [ ] **Step 5: Create `src/app/resume/page.tsx`**

```tsx
import type {Metadata} from "next";
import Link from "next/link";
import {FaArrowLeft} from "react-icons/fa";
import {HiOutlineDownload} from "react-icons/hi";
import {MagicButton} from "@/components/ui/MagicButton";
import {ResumeViewer} from "@/components/ResumeViewer";
import {resumeFile} from "@/app/lib/AppConstants";

export const metadata: Metadata = {
    title: "Resume — Sai Shashikant",
    description: "Resume of D S N Shashikant, Full Stack + AI Engineer.",
};

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-black-100">
            <header className="sticky top-0 z-50 border-b border-white/[0.1] bg-black-100/90 backdrop-blur">
                <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3">
                    <Link href="/" className="flex items-center gap-2 text-sm text-white-200 hover:text-white">
                        <FaArrowLeft/> Back to portfolio
                    </Link>
                    <a href={resumeFile.path} download={resumeFile.downloadName}>
                        <MagicButton
                            title="Download PDF"
                            icon={<HiOutlineDownload/>}
                            position="left"
                            className="!mt-0 !h-10 !w-auto"
                        />
                    </a>
                </div>
            </header>
            <section className="mx-auto max-w-4xl px-5 py-8">
                <ResumeViewer file={resumeFile.path}/>
            </section>
        </main>
    );
}
```

- [ ] **Step 6: Verify the build**

Run: `npm run build`
Expected: route list includes `○ /resume`; `out/resume.html` exists; `grep -o "<title>[^<]*</title>" out/resume.html` prints `<title>Resume — Sai Shashikant</title>`; a `pdf.worker` file exists under `out/_next/`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/components/ResumePlaceholder.tsx src/components/ResumeDocument.tsx src/components/ResumeViewer.tsx src/app/resume/page.tsx
git commit -m "feat: add /resume page rendering the resume PDF with PDF.js"
```

---

### Task 3: Real-browser verification

**Files:** none (verification only).

- [ ] **Step 1: Serve the static build**

Run (background): `cd out && python3 -m http.server 4173`

- [ ] **Step 2: Screenshot phone and desktop**

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --hide-scrollbars --window-size=390,1400 --force-device-scale-factor=2 --virtual-time-budget=8000 --screenshot=/tmp/resume-phone.png http://localhost:4173/resume.html
"$CHROME" --headless=new --hide-scrollbars --window-size=1280,1400 --virtual-time-budget=8000 --screenshot=/tmp/resume-desktop.png http://localhost:4173/resume.html
```

Expected: both screenshots show the header (Back to portfolio, Download PDF) and the rendered resume page, not the loading or error placeholder.

- [ ] **Step 3: Check the download target and home nav**

Run: `curl -s -o /dev/null -w "%{http_code} %{content_type}\n" http://localhost:4173/Sai-Shashikant-Resume.pdf`
Expected: `200 application/pdf`.
Run: `grep -o 'href="/resume"' out/index.html | head -1`
Expected: `href="/resume"`.

- [ ] **Step 4: Stop the server**
