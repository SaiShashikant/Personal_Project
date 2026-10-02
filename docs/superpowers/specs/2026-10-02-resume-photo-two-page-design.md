# Resume: Photo + Two-Page Expansion Design

**Date:** 2026-10-02
**Status:** Approved
**Supersedes:** one-page constraint in `2026-09-22-professional-resume-design.md`

## Goal

Add a profile photo and expand the resume to two pages with a longer summary, a Key Achievements section, and a Selected Projects section. Also produce a no-photo variant.

## Layout

- Single column (ATS-safe), US Letter, existing typography and accent color.
- Header: name, title, contact on the left; circular photo (~1in) on the right.
- Page 1: Summary → Key Achievements → Experience (Kovaad, Vindago/SEG-PACE; existing bullets unchanged).
- Page 2: Selected Projects → Technical Skills → Education.
- Entries use `break-inside: avoid` so no project or job splits across pages.

## Content rules

- Every claim traces to commits or design docs in the Kovaad repos (see research summary in the 2026-10-02 session): authorship shares (chats 378/469, users 172/219, members 93/137, payments 85/96, app 1019/1787), 4 LLM providers, 4 roles, 20+ notification types, ~676 test cases (team-wide; phrased as "contributed to").
- Kovaad dates stay `Oct 2020 – Present` (confirmed by user).
- Excluded: internal pricing/plan counts/customer numbers; chat-ui-kit as own library (it is a fork); profile service (minor contributor).
- Portfolio link points to `https://saishashikant-2101e.web.app`.

## Projects (5)

1. Conversation Orchestration Engine (topic selection, gap-aware session resume).
2. AI Progress Reports (LLM chat analysis → PDF, cron/threshold/manual triggers).
3. Payments & Subscriptions Microservice (Razorpay retail + B2B, INR/USD).
4. Trainee Safety & Access Control (red-flag alerts, suspension, audit log).
5. Real-time Voice Chat (streaming STT incl. mixed-language, TTS, idle handling).

## Photo

- Source: `KovaadWebsite/public/shashikant.jpeg` (774×1024). Cropped square on the face, resized to 600×600, JPEG, saved as `resume/photo.jpg`.

## Variants and export

- One HTML source. Loading it with `?nophoto` adds a `no-photo` class that hides the photo.
- `npm run resume` runs `scripts/export-resume.mjs`, which prints the HTML with headless Chrome to:
  - `public/Sai-Shashikant-Resume.pdf` (with photo; used by the site)
  - `public/Sai-Shashikant-Resume-ATS.pdf` (no photo; not linked in the UI)

## Testing

- Both PDFs are exactly 2 pages, with fonts embedded and links preserved.
- Visual check of both pages, and of `/resume` rendering 2 pages.
