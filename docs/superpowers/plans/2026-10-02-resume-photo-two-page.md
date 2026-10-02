# Resume Photo + Two-Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Two-page resume with photo, longer summary, Key Achievements, Selected Projects, plus a no-photo variant, exported by `npm run resume`.

**Architecture:** Edit the single HTML source; a Node script drives headless Chrome `--print-to-pdf` for both variants.

**Tech Stack:** HTML/CSS, Node 22+, Google Chrome (macOS path), sharp (already in node_modules via Next).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-10-02-resume-photo-two-page-design.md`.
- Output must be exactly 2 Letter pages; experience bullets unchanged.
- No internal pricing or customer numbers.

---

### Task 1: Photo asset

**Files:** Create `resume/photo.jpg`.

- [ ] Crop `KovaadWebsite/public/shashikant.jpeg` to a face-centred square and resize to 600×600 JPEG (q85) with sharp; view the result to confirm framing.
- [ ] Commit: `git commit -m "Add resume photo" -- resume/photo.jpg`

### Task 2: HTML content and layout

**Files:** Modify `resume/Sai-Shashikant-Resume.html`.

- [ ] Header becomes a flex row: text left, `<img class="photo" src="photo.jpg">` right (1in circle). Add `body.no-photo .photo {display:none}` and a script: `if (location.search.includes("nophoto")) document.body.classList.add("no-photo")`.
- [ ] Replace the Summary text with the expanded summary; add a Key Achievements section (5 bullets) after Summary.
- [ ] Add a Selected Projects section (5 entries: title, tech line, 2 bullets each) before Technical Skills, styled like job entries.
- [ ] Add `break-inside: avoid` to `.job-entry` and `.project-entry`; update the Portfolio link to `https://saishashikant-2101e.web.app`.

### Task 3: Export script

**Files:** Create `scripts/export-resume.mjs`; modify `package.json` (`"resume": "node scripts/export-resume.mjs"`).

- [ ] The script prints `resume/Sai-Shashikant-Resume.html` (and `?nophoto`) with headless Chrome (`--print-to-pdf`, `--no-pdf-header-footer`, `--virtual-time-budget=8000`) to the two public PDFs, then logs their page counts.
- [ ] Run `npm run resume`; expect two PDFs, 2 pages each.

### Task 4: Verify and commit

- [ ] Render each page of both PDFs to PNG and inspect: photo framing, no awkward page breaks, fonts are Source Serif 4.
- [ ] `npm run build`; confirm `/resume` shows 2 pages in Chrome.
- [ ] Commit HTML, script, package.json and PDFs.
