# Portfolio full polish

**Date:** 2026-09-18  
**Repo:** Personal_Project  
**Status:** Pending user review  
**Approach:** Data + small project-card support (Approach 2)

## Goal

Complete the portfolio with two real projects (**Kovaad** live, **SEG-PACE** private/NDA), remove template testimonials, and refresh About / Experience / Hero / Footer so the site no longer reads as a demo template.

## Decisions

| Decision | Choice |
|----------|--------|
| Project set | Kovaad + SEG-PACE only |
| SEG-PACE link | No public URL — card is non-navigating; CTA “Private / under NDA” |
| Testimonials | Remove from nav and page |
| Tech logo strip (`Clients`) | Drop from page (redundant with About bento + project icons) |
| Experience | Keep four skill-style cards; rewrite copy to real stack |
| Inside Scoop | “Currently shipping Kovaad features” |
| Screenshots | Reuse `/p1.svg`, `/p2.svg` — no new assets |
| Approach section | Unchanged |
| Commit | Only if user asks (implementation); design doc committed per process |

## Architecture

Content lives in `src/app/lib/AppConstants.ts`. Page composition stays the Aceternity-style single home page.

**Page flow after polish:**  
`FloatingNav` → `Hero` → `Grid` → `RecentProjects` → `Experience` → `Approach` → `Footer`

**Removed from page:** `Clients` (testimonials carousel + company logos).

### Project card shape

```ts
{
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link?: string;   // omit or undefined = no navigation
  cta?: string;    // default "Check Live Site"
}
```

`RecentProjects` / `PinContainer` behavior:
- If `link` is set → navigable pin; show `cta` or “Check Live Site”.
- If `link` is unset → non-linking card; show CTA text only (SEG-PACE: “Private / under NDA”).

## Content

### Nav

`About` · `Projects` · `Contact` (drop Testimonials).

### Projects

1. **Kovaad**  
   - des: existing AI training platform copy (Next.js app + NestJS backends).  
   - link: `https://kovaad.ai`  
   - cta: `Check Live Site`  
   - img: `/p1.svg`  
   - icons: `/next.svg`, `/ts.svg`, `/re.svg`, `/tail.svg`, `/dock.svg`

2. **SEG-PACE**  
   - des: Price & Cost Evaluation platform — React/Vite frontend and FastAPI/PostgreSQL backend with Azure SSO for enterprise procurement analytics. Work is private / under NDA.  
   - link: omitted  
   - cta: `Private / under NDA`  
   - img: `/p2.svg`  
   - icons: `/re.svg`, `/ts.svg`, `/tail.svg`, `/dock.svg`, `/cloud.svg` (closest existing SVGs; no new assets)

### About grid

- Tile 5 title: `Currently shipping Kovaad features` (description remains `The Inside Scoop`).
- Bento stack chips (`BentoGrid.tsx`): left `ReactJS`, `NextJS`, `TypeScript`; right `NestJS`, `FastAPI`, `Azure`.
- Copy-email button label typo: `Email Coiped` → `Email Copied`.
- Email remains `saishashikant4@gmail.com`.

### Experience (four cards, same thumbnails)

1. **Next.js & TypeScript apps** — Built and shipped app-router products with typed components, SSR/CSR where needed, and solid DX.  
2. **NestJS / API backends** — Auth, chats, users, payments, and profile services with clear module boundaries.  
3. **React + Vite product UIs** — Enterprise dashboards with Microsoft SSO patterns and responsive, accessible UI.  
4. **Performance & reliability** — Faster loads, cleaner frontend issues, and shipping quality users notice.

### Hero / Footer

- Hero supporting line exact copy: `Hi, I'm Sai Shashikant, a full-stack developer focused on Next.js & APIs, based in India.`  
- Keep mailto and social links (GitHub, X, LinkedIn).  
- Footer copyright year: `2026`.

### Dead data cleanup

- Remove `Clients` from `page.tsx`. Delete `src/components/Clients.tsx` if nothing else imports it.  
- Remove unused `testimonials` and `companies` exports from `AppConstants`.

## Implementation outline

1. Update `AppConstants` — nav, projects (2 entries), grid tile 5, experience copy; delete testimonials/companies if unused.  
2. Update `RecentProjects` — optional `link` / `cta`; no navigation without `link`.  
3. Update `page.tsx` — remove `Clients`.  
4. Update `BentoGrid` — stack chips + “Email Copied”.  
5. Update `Hero` + `Footer` — copy and year.  
6. Smoke: `npx tsc --noEmit`; manual check nav + both project cards.

## Out of scope

- New screenshot assets or design-system redesign  
- Approach section rewrite  
- Firebase / CI / hosting fixes  
- Public SEG-PACE URL or repo  
- Real testimonials (may return later)

## Success criteria

- Nav has no Testimonials; page has no testimonial carousel.  
- Exactly two project cards: Kovaad → live site; SEG-PACE → non-linking NDA CTA.  
- About Inside Scoop and bento chips reflect Kovaad / real stack.  
- Experience and hero read as Sai’s work, not template filler.  
- Contact email and socials still work; copyright shows 2026.
