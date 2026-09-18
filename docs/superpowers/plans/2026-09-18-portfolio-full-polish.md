# Portfolio Full Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the portfolio with Kovaad (live) + SEG-PACE (private/NDA), remove testimonials, and refresh About / Experience / Hero / Footer so the site is no longer template filler.

**Architecture:** Content-driven changes in `AppConstants.ts`, optional `link`/`cta` on project cards, and a small `PinContainer` change so cards without `href` do not navigate. Drop `Clients` from the home page; keep Approach untouched.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, existing Aceternity `PinContainer` / BentoGrid UI.

**Spec:** `docs/superpowers/specs/2026-09-18-portfolio-full-polish-design.md`

## Global Constraints

- Exactly two projects: Kovaad (`https://kovaad.ai`) and SEG-PACE (no `link`).
- SEG-PACE CTA text must be exactly `Private / under NDA`.
- No new image assets; use `/p1.svg`, `/p2.svg`, and existing public SVGs only.
- Do not rewrite Approach section.
- Do not commit unless the user explicitly asks (user rule overrides frequent-commit defaults).
- Working tree may already contain partial Kovaad-only edits in `AppConstants.ts` and `page.tsx` — fold those into this plan; do not revert them unless they conflict.

## File map

| File | Responsibility |
|------|----------------|
| `src/app/lib/AppConstants.ts` | Nav, projects, grid, experience; delete testimonials/companies |
| `src/components/ui/3d-pin.tsx` | Optional non-linking pin when `href` omitted |
| `src/components/RecentProjects.tsx` | Map `link?` / `cta?`; show correct CTA |
| `src/app/page.tsx` | Page composition without `Clients` |
| `src/components/Clients.tsx` | Delete (unused after page change) |
| `src/components/ui/BentoGrid.tsx` | Stack chips + Email Copied typo |
| `src/components/Hero.tsx` | Full-stack supporting line |
| `src/components/Footer.tsx` | Copyright year 2026 |

---

### Task 1: AppConstants content (nav, projects, grid, experience)

**Files:**
- Modify: `src/app/lib/AppConstants.ts`

**Interfaces:**
- Consumes: none
- Produces: `navItems`, `projects` (length 2, optional `link`/`cta`), `gridItems`, `workExperience`; no `testimonials` / `companies`

- [ ] **Step 1: Replace `navItems`**

```ts
export const navItems = [
    {name: "About", link: "#about"},
    {name: "Projects", link: "#projects"},
    {name: "Contact", link: "#contact"},
];
```

- [ ] **Step 2: Replace `projects` with Kovaad + SEG-PACE**

```ts
export const projects = [
    {
        id: 1,
        title: "Kovaad",
        des: "AI training platform for specially abled children — therapists and guardians use LLM-powered sessions to build social awareness and emotion understanding. Built the Next.js app (app.kovaad.ai) and NestJS backends (auth, chats, users, payments, profile).",
        img: "/p1.svg",
        iconLists: ["/next.svg", "/ts.svg", "/re.svg", "/tail.svg", "/dock.svg"],
        link: "https://kovaad.ai",
        cta: "Check Live Site",
    },
    {
        id: 2,
        title: "SEG-PACE",
        des: "Price & Cost Evaluation platform — React/Vite frontend and FastAPI/PostgreSQL backend with Azure SSO for enterprise procurement analytics. Work is private / under NDA.",
        img: "/p2.svg",
        iconLists: ["/re.svg", "/ts.svg", "/tail.svg", "/dock.svg", "/cloud.svg"],
        cta: "Private / under NDA",
    },
];
```

- [ ] **Step 3: Update grid tile 5 title**

In `gridItems`, set the object with `id: 5` `title` to:

```ts
title: "Currently shipping Kovaad features",
```

Leave `description: "The Inside Scoop"` unchanged.

- [ ] **Step 4: Replace `workExperience`**

```ts
export const workExperience = [
    {
        id: 1,
        title: "Next.js & TypeScript apps",
        desc: "Built and shipped app-router products with typed components, SSR/CSR where needed, and solid DX.",
        className: "md:col-span-2",
        thumbnail: "/exp1.svg",
    },
    {
        id: 2,
        title: "NestJS / API backends",
        desc: "Auth, chats, users, payments, and profile services with clear module boundaries.",
        className: "md:col-span-2",
        thumbnail: "/exp2.svg",
    },
    {
        id: 3,
        title: "React + Vite product UIs",
        desc: "Enterprise dashboards with Microsoft SSO patterns and responsive, accessible UI.",
        className: "md:col-span-2",
        thumbnail: "/exp3.svg",
    },
    {
        id: 4,
        title: "Performance & reliability",
        desc: "Faster loads, cleaner frontend issues, and shipping quality users notice.",
        className: "md:col-span-2",
        thumbnail: "/exp4.svg",
    },
];
```

- [ ] **Step 5: Delete `testimonials` and `companies` exports**

Remove the entire `export const testimonials = [...]` and `export const companies = [...]` blocks from this file.

- [ ] **Step 6: Verify constants**

Run:

```bash
rg -n "Testimonials|testimonials|companies|Arjun|JS Animation|adrianhajdin" src/app/lib/AppConstants.ts
```

Expected: no matches.

Run:

```bash
rg -n "SEG-PACE|kovaad.ai|Private / under NDA|Currently shipping Kovaad" src/app/lib/AppConstants.ts
```

Expected: matches for all of those strings.

---

### Task 2: Non-linking PinContainer + RecentProjects CTA

**Files:**
- Modify: `src/components/ui/3d-pin.tsx`
- Modify: `src/components/RecentProjects.tsx`

**Interfaces:**
- Consumes: `projects` entries with optional `link?: string` and `cta?: string`
- Produces: Navigable pin when `href` provided; non-navigating wrapper when `href` omitted

- [ ] **Step 1: Update `PinContainer` to support missing `href`**

In `src/components/ui/3d-pin.tsx`, replace the return of `PinContainer` (the part that always wraps with `<Link href={href || "/"}>`) so that:

- When `href` is a non-empty string → keep current `<Link ... href={href}>` behavior (also pass `target="_blank"` / `rel="noopener noreferrer"` if already desired elsewhere; do not force homepage fallback).
- When `href` is undefined or empty → render a `<div>` with the same classes/handlers instead of `Link`, and do not default to `"/"`.

Concrete replacement for the outer wrapper:

```tsx
    const interactiveClassName = cn(
        "relative group/pin z-50",
        href ? "cursor-pointer" : "cursor-default",
        containerClassName
    );

    const inner = (
        <>
            <div
                style={{
                    perspective: "1000px",
                    transform: "rotateX(70deg) translateZ(0deg)",
                }}
                className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
            >
                <div
                    style={{
                        transform: transform,
                    }}
                    className="absolute left-1/2 p-4 top-1/2  flex justify-start items-start  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
                >
                    <div className={cn(" relative z-50 ", className)}>{children}</div>
                </div>
            </div>
            <PinPerspective title={title} href={href}/>
        </>
    );

    if (href) {
        return (
            <Link
                className={interactiveClassName}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {inner}
            </Link>
        );
    }

    return (
        <div
            className={interactiveClassName}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {inner}
        </div>
    );
```

Keep the existing `isClient` early `return null` guard above this.

- [ ] **Step 2: Update `PinPerspective` hover chip when there is no `href`**

In `PinPerspective`, only render the top `<a href={href}>` chip when `href` is truthy. When missing, render a non-anchor chip (e.g. `<span>` with the same visual classes) so hover still shows the title/CTA without navigation:

```tsx
                <div className="absolute top-0 inset-x-0  flex justify-center">
                    {href ? (
                        <a
                            href={href}
                            target={"_blank"}
                            rel="noopener noreferrer"
                            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 "
                        >
                            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
                                {title}
                            </span>
                            <span
                                className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
                        </a>
                    ) : (
                        <span
                            className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 "
                        >
                            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
                                {title}
                            </span>
                        </span>
                    )}
                </div>
```

Leave the rest of the perspective animations unchanged.

- [ ] **Step 3: Update `RecentProjects` to pass optional `link` / `cta`**

Replace the map body in `src/components/RecentProjects.tsx` with:

```tsx
            <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
                {projects.map(({id, title, des, img, iconLists, link, cta}) => (
                    <div key={id}
                         className="sm:h-[42rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]">
                        <PinContainer title={cta ?? (link ? "Check Live Site" : "Private / under NDA")} href={link}>
                            <div
                                className="relative flex items-center justify-center sm:w-[570px] w-[80vw] sm:h-[40vh] h-[30vh] overflow-hidden mb-10">
                                <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]">
                                    <img src="/bg.png" alt="bg-img"/>
                                </div>
                                <img src={img}
                                     alt={title}
                                     className="z-10 absolute bottom-0"/>
                            </div>
                            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                                {title}
                            </h1>
                            <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2">
                                {des}
                            </p>

                            <div className="flex items-center justify-center mt-7 mb-3">
                                <div className="flex items-center">
                                    {iconLists.map((icon, index) => (
                                        <div key={index}
                                             className="border border-white/[0.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                                             style={{
                                                 transform: `translateX(-${5 * index * 2}px)`
                                             }}>
                                            <img src={icon} alt={icon} className="p-2"/>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center items-center">
                                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                                        {cta ?? (link ? "Check Live Site" : "Private / under NDA")}
                                    </p>
                                    {link ? (
                                        <FaLocationArrow className="ms-3" color={"#cbacf9"}/>
                                    ) : null}
                                </div>
                            </div>
                        </PinContainer>
                    </div>
                ))}
            </div>
```

- [ ] **Step 4: Typecheck**

Run:

```bash
cd /Users/saishashikant/Workspaces/Personal_Project && npx tsc --noEmit
```

Expected: exit 0, or only pre-existing errors unrelated to these files.

---

### Task 3: Remove Clients / testimonials from the page

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/Clients.tsx`

**Interfaces:**
- Consumes: `RecentProjects`, `Experience`, etc.
- Produces: Home page without testimonials section

- [ ] **Step 1: Update `page.tsx`**

Replace file contents with:

```tsx
import {Hero} from "@/components/Hero";
import {FloatingNav} from "@/components/ui/FloatingNav";
import {Grid} from "@/components/Grid";
import {navItems} from "@/app/lib/AppConstants";
import {Experience} from "@/components/Experience";
import {Approach} from "@/components/Approach";
import {Footer} from "@/components/Footer";
import {RecentProjects} from "@/components/RecentProjects";

export default function Home() {
    return (
        <main className="relative bg-black-100 flex justify-center items-center
                flex-col overflow-clip mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">
                <FloatingNav navItems={navItems}/>
                <Hero/>
                <Grid/>
                <RecentProjects/>
                <Experience/>
                <Approach/>
                <Footer/>
            </div>
        </main>
    );
}
```

- [ ] **Step 2: Delete `Clients.tsx`**

```bash
rm src/components/Clients.tsx
```

- [ ] **Step 3: Verify no leftover imports**

Run:

```bash
rg -n "Clients|testimonials|companies|InfiniteMovingCards" src --glob '!**/node_modules/**'
```

Expected: no matches for `Clients`, `testimonials`, or `companies`. `InfiniteMovingCards` may remain as an unused UI file — leave it (out of scope to delete unused UI primitives unless imported nowhere and you prefer cleanup; do not expand scope).

---

### Task 4: Bento stack chips + Email Copied

**Files:**
- Modify: `src/components/ui/BentoGrid.tsx`

**Interfaces:**
- Consumes: none
- Produces: Updated `leftLists` / `rightLists` and button label

- [ ] **Step 1: Update stack lists**

Replace:

```ts
    const leftLists = ["ReactJS", "Express", "Typescript"];
    const rightLists = ["JavaScript", "NextJS", "AWS"];
```

with:

```ts
    const leftLists = ["ReactJS", "NextJS", "TypeScript"];
    const rightLists = ["NestJS", "FastAPI", "Azure"];
```

- [ ] **Step 2: Fix typo**

Replace `Email Coiped` with `Email Copied` in the MagicButton `title` ternary.

- [ ] **Step 3: Verify**

Run:

```bash
rg -n "Email Coiped|Express|AWS" src/components/ui/BentoGrid.tsx
```

Expected: no matches.

---

### Task 5: Hero + Footer polish

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: none
- Produces: Spec hero line + copyright 2026

- [ ] **Step 1: Update Hero supporting paragraph**

In `src/components/Hero.tsx`, replace the paragraph with:

```tsx
                    <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
                        Hi, I&apos;m Sai Shashikant, a full-stack developer focused on Next.js &amp; APIs, based in India.
                    </p>
```

- [ ] **Step 2: Update Footer copyright**

In `src/components/Footer.tsx`, replace:

```tsx
                <p className="md:text-base text-sm md:font-normal font-light"> Copyright © 2024</p>
```

with:

```tsx
                <p className="md:text-base text-sm md:font-normal font-light"> Copyright © 2026</p>
```

Keep `mailto:saishashikant4@gmail.com` unchanged.

- [ ] **Step 3: Verify**

Run:

```bash
rg -n "Next.js Developer based|Copyright © 2024" src/components
```

Expected: no matches.

---

### Task 6: End-to-end smoke verification

**Files:**
- None (verification only)

- [ ] **Step 1: Typecheck**

```bash
cd /Users/saishashikant/Workspaces/Personal_Project && npx tsc --noEmit
```

Expected: exit 0 (or only unrelated pre-existing errors).

- [ ] **Step 2: Grep success criteria**

```bash
rg -n "Testimonials|#testimonials|Arjun|satisfied clients" src
rg -n "SEG-PACE|Private / under NDA|Currently shipping Kovaad|Copyright © 2026" src
```

Expected: first command no matches; second command hits for all listed strings.

- [ ] **Step 3: Manual UI check**

```bash
npm run dev
```

Open http://localhost:3000 and confirm:

1. Nav: About, Projects, Contact only  
2. Two project cards; Kovaad opens `https://kovaad.ai` in a new tab; SEG-PACE does not navigate  
3. SEG-PACE CTA reads `Private / under NDA`  
4. No testimonials section  
5. About tile says currently shipping Kovaad; bento chips include NestJS / FastAPI / Azure  
6. Footer year 2026; email button still copies / mailto works  

- [ ] **Step 4: Commit only if the user asks**

Skip by default. If asked:

```bash
git add src/app/lib/AppConstants.ts src/app/page.tsx src/components/RecentProjects.tsx src/components/ui/3d-pin.tsx src/components/ui/BentoGrid.tsx src/components/Hero.tsx src/components/Footer.tsx
git add -u src/components/Clients.tsx
git commit -m "$(cat <<'EOF'
Polish portfolio with Kovaad, private SEG-PACE, and real copy.

EOF
)"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Two projects, Kovaad live + SEG-PACE NDA | 1, 2 |
| Optional `link` / `cta`; no nav without link | 2 |
| Remove testimonials + Clients | 1, 3 |
| Grid Inside Scoop + bento chips + Email Copied | 1, 4 |
| Experience skill rewrite | 1 |
| Hero full-stack line + footer 2026 | 5 |
| Smoke / success criteria | 6 |
| No Approach rewrite / no new assets | Global constraints |
