# Kovaad as portfolio project

**Date:** 2026-08-01  
**Repo:** Personal_Project  
**Status:** Pending user review

## Goal

Show **Kovaad** as the only real project on the portfolio: one card covering the Next.js app (`app.kovaad.ai`) and NestJS backends, linking to https://kovaad.ai. Remove template/demo projects.

## Decisions

| Decision | Choice |
|----------|--------|
| Representation | Single project card (frontend + backend) |
| Other projects | Replace all four template entries |
| Live link | https://kovaad.ai |
| UI approach | Reuse existing `RecentProjects` + `PinContainer` |
| Image | Reuse `/p1.svg` until a real screenshot is added |
| Grid “Inside Scoop” copy | Out of scope (unchanged unless requested later) |

## Content

- **Title:** Kovaad  
- **Description:** AI training platform for specially abled children — therapists and guardians use LLM-powered sessions to build social awareness and emotion understanding. Built the Next.js app (`app.kovaad.ai`) and NestJS backends (auth, chats, users, payments, profile).  
- **Link:** https://kovaad.ai  
- **Icons:** `/next.svg`, `/ts.svg`, `/re.svg`, `/tail.svg`, `/dock.svg`

## Implementation

1. Update `src/app/lib/AppConstants.ts` — `projects` array = one Kovaad object (`id: 1`).  
2. Update `src/app/page.tsx` — import `RecentProjects` and render it (uncomment / restore) between `Grid` and `Clients` so `#projects` matches nav.  
3. No component API changes; no new dependencies; no assets required beyond existing public icons.

## Out of scope

- Firebase hosting / CI fixes  
- New Kovaad screenshot assets  
- Copying Kovaad source into this repo  
- Separate frontend/backend cards  
- Updating about-grid or experience copy

## Success criteria

- Projects section visible on the home page with `id="projects"`.  
- Only one card: Kovaad → https://kovaad.ai.  
- No leftover adrianhajdin / template project links.
