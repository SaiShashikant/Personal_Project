# Kovaad Portfolio Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a single Kovaad project card on the portfolio linking to https://kovaad.ai, and remove all template projects.

**Architecture:** Data-only change in `AppConstants.ts` plus re-enable the existing `RecentProjects` section on the home page. No new components or dependencies.

**Tech Stack:** Next.js 14 App Router, React, TypeScript, existing Aceternity `PinContainer` UI.

## Global Constraints

- Exactly one entry in `projects`; link must be `https://kovaad.ai`.
- Do not change grid/experience/testimonial copy unless listed in a task.
- Do not add new image assets; use `/p1.svg` and existing icon SVGs.
- Do not commit unless the user explicitly asks.

---

### Task 1: Replace template projects with Kovaad

**Files:**
- Modify: `src/app/lib/AppConstants.ts` (the `projects` export)

**Interfaces:**
- Consumes: existing `projects` shape `{ id, title, des, img, iconLists, link }`
- Produces: `projects` array with length 1 for `RecentProjects`

- [ ] **Step 1: Replace the `projects` array**

Replace the entire `export const projects = [ ... ];` block with:

```ts
export const projects = [
    {
        id: 1,
        title: "Kovaad",
        des: "AI training platform for specially abled children — therapists and guardians use LLM-powered sessions to build social awareness and emotion understanding. Built the Next.js app (app.kovaad.ai) and NestJS backends (auth, chats, users, payments, profile).",
        img: "/p1.svg",
        iconLists: ["/next.svg", "/ts.svg", "/re.svg", "/tail.svg", "/dock.svg"],
        link: "https://kovaad.ai",
    },
];
```

- [ ] **Step 2: Verify no leftover template project links**

Run: `rg -n "adrianhajdin|Yoom|Solar System|iphone|Canva Application" src/app/lib/AppConstants.ts`

Expected: no matches

- [ ] **Step 3: Commit only if the user asks**

Skip commit by default (user rule). If asked:

```bash
git add src/app/lib/AppConstants.ts
git commit -m "$(cat <<'EOF'
Replace template portfolio projects with Kovaad.

EOF
)"
```

---

### Task 2: Show RecentProjects on the home page

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `RecentProjects` from `@/components/RecentProjects` (existing default named export)
- Produces: `#projects` section rendered between Grid and Clients

- [ ] **Step 1: Import and render RecentProjects**

Update `src/app/page.tsx` to:

```tsx
import {Hero} from "@/components/Hero";
import {FloatingNav} from "@/components/ui/FloatingNav";
import {Grid} from "@/components/Grid";
import {navItems} from "@/app/lib/AppConstants";
import {Clients} from "@/components/Clients";
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
                <Clients/>
                <Experience/>
                <Approach/>
                <Footer/>
            </div>
        </main>
    );
}
```

- [ ] **Step 2: Smoke-check the page compiles**

Run: `cd /Users/saishashikant/Workspaces/Personal_Project && npx tsc --noEmit`

Expected: exit 0 (or only pre-existing errors unrelated to these files)

- [ ] **Step 3: Manual verify**

Run: `npm run dev` and open http://localhost:3000

Check:
- Nav “Projects” scrolls to the projects section
- Exactly one card titled “Kovaad”
- Card links to https://kovaad.ai

- [ ] **Step 4: Commit only if the user asks**

Skip by default.
