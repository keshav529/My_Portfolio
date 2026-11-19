# aichat.md: Claude × Gemini collaboration file

Shared working file for **Claude** (lead / reviewer, works through the GitHub connector) and **Gemini in AI Studio** (implementer). **Keshav** is the owner and tester.

> Read this file fully before starting any task. Append to the **Handoff Log** at the end of every task. Never delete other people's log entries.

---

## 1. Goal

Make https://my-portfolio-keshav529.vercel.app look, move and behave like the reference site https://matteofabbiani.webflow.io/ (design language, layout, motion), using **Keshav's own content**.

Reference stylesheet (source of truth for static values):
https://cdn.prod.website-files.com/5e821153625dc77630c8cfd1/css/matteofabbiani.f5e85184d.min.css

**Do not copy** the reference's text, photos, logo, client reviews or branding. Recreate design, layout and motion only.

## 2. Roles

| Who | Does | Does not |
|---|---|---|
| **Claude (lead)** | Writes specs, splits work into tasks, reviews diffs, edits config/docs, updates this file, checks the live site | Can't see a rendered page; never claims visual verification |
| **Gemini (builder)** | Implements components, styles and motion in the repo, runs `tsc --noEmit` and `vite build`, reports results | Don't mark a task "done" without listing what was *not* verified |
| **Keshav (owner)** | Tests on real phone and laptop, supplies recordings, screenshots, photos and the reference's Webflow JS | Never paste secrets (client secrets, API keys) into any chat or file |

## 3. Ground rules

1. Work **one task at a time**, in the order of the Task Board. Stop after each task for Keshav's visual check.
2. **Honesty rule:** label every value as `measured` (from the reference CSS, JS data or a recording) or `assumed`. A static check (HTTP 200, `tsc`, `vite build`) does **not** prove a page looks or moves correctly.
3. Content lives in `src/data/portfolioData.ts`. Design tokens live in `src/styles/tokens.css`. Don't hard-code content or colours in components.
4. Animate **only `transform` and `opacity`**. Respect real `prefers-reduced-motion: reduce` only (never treat "mobile" as "reduced motion").
5. Don't use `100vw` for widths (use `100%`). Use `svh/dvh` for full-screen sections. Don't hide overflow bugs with `overflow-x: hidden` alone.
6. Linux/Vercel is **case-sensitive**: every import and asset path must match file names exactly. Verify files exist on disk, not by HTTP status.
7. Never commit secrets. `VITE_FORMSPREE_ID` is set in Vercel, not in the repo.
8. Prefer a **branch + pull request** for risky changes. Small docs/config edits may go to `main`.
9. Keep `package.json` versions as they are unless a build proves otherwise: react 19.1, react-dom 19.1, react-router-dom 7.6, framer-motion 12.23, lenis 1.3, lucide-react 0.525, vite 6.3, @vitejs/plugin-react 4.6, typescript 5.8, Node 22.x.

## 4. Current state (verified by Claude on 2026-11-19)

- `main` contains the Vite + React + TypeScript multi-page app (routes: `/`, `/about`, `/process`, `/work`, `/work/:slug`, `/contact`, `/resources`).
- `package.json` and `vercel.json` already contain the corrected dependency versions and Vite build settings.
- **Live site serves the new build** (page title "Keshav Anand — Web Developer & UI Designer", canonical and Open Graph tags present). *Verified from page metadata only, not visually.*
- `bun.lock` is still in the repo. `vercel.json` forces `npm install`, so it is harmless but should be removed.
- Optional images not yet added by Keshav: `journey-college.webp`, `journey-desk.webp`, `resume-preview.webp`, `<slug>-mobile.webp`, `<slug>-detail.webp`. Fallback SVGs are used meanwhile.
- `og-share.svg` exists; `og-share.jpg` must be exported from it (1200×630) for link previews.

## 5. Design tokens (measured from the reference CSS)

- **Font:** Outfit (300, 400, 500, 700). Body 1rem / 1.55, paragraphs weight 300.
- **Colours:** cream `#e7e2dc`, cream-2 `#dfd8d1`, orange `#ff5330` (hover `#e44120`), dark `#121212`, loader/transition `#2b2b2b` / `#292929`, greys 25 `#fcfcfc` … 900 `#141414`.
- **Headings (desktop / ≤767px):** h1 4.65rem / 3rem (300, -0.03em, 1.1); h2 2.875rem / 2.25rem (400); h3 2.25rem / 2rem (500); h4 2rem / 1.75rem (500); hero value 5.5rem; banner 7.5rem (0.8 line-height); menu links 4.75rem.
- **Layout:** side padding 5%; container 80rem; breakpoints 991 / 767 / 479; section padding 3 / 5 / 7 / 9 / 11 / 13rem.
- **Radii:** buttons .875rem, cards 1rem, large cards 1.25–1.5rem.
- **Easing:** `cubic-bezier(.165,.84,.44,1)`, 0.5s for button and card hovers.
- **Reference structure that differs from my early guesses (corrected):**
  - Hero is a **300vh pinned section**: text left, tall image right (40% width) with a cream wipe. Stacked below 991px.
  - Navbar has only logo + orange CONTACT + circular menu button. Links live in the **full-screen split menu**.
  - Testimonials are a **3-column grid** (2 / 1 on smaller screens), not a slider.
  - Intro loader is the `.loader` style: `#292929` panel, top bar with 1.5px cream-2 border, cream progress fill with `mix-blend-mode: exclusion`, giant counter **bottom-right** (27rem, -0.07em, margin-bottom -7rem; 18rem ≤767px; 53vw centred ≤479px).

Animation timings and scroll ranges are **not** in the CSS. They live in Webflow's `ix2` JS data. Until Keshav supplies it, any timing is `assumed`.

## 5b. What Claude needs from Keshav (blocked items)

- [ ] The reference's Webflow JS file(s) containing `Webflow.require("ix2").init(` (saved from page source), attached in AI Studio or committed to a `reference/` folder.
- [ ] Screen recordings: reference vs mine, first 6 seconds (loader) and a slow full Home scroll.
- [ ] The two loader texts (left and right of the top bar) as seen in the reference.
- [ ] Confirmation of whether "Reduce motion / Remove animations" is **off** on his phone.

## 6. Task board

Status: `todo` · `in-progress` · `needs-review` · `done`

| ID | Task | Owner | Status | Notes |
|---|---|---|---|---|
| T0 | Get new build live on Vercel | Claude/Keshav | **done** | Config fixed; live site shows new build |
| T1 | Remove `bun.lock` | Keshav/Claude | todo | One-file delete; keeps npm as the single installer |
| T2 | Mobile motion audit: list every place animation is disabled on small/touch screens; restore motion per rules (no pinning on phones, native scroll, light parallax, reveals, menu, FAQ, marquees, timeline reveals) | Gemini | todo | Must first confirm phone "reduce motion" is off |
| T3 | Mobile overflow audit at 320/360/390/430/480/600/768, portrait + landscape, all routes | Gemini | todo | Previous fix only covered `.services-tabs-bar` |
| T4 | Loader rebuild to the `.loader` spec in §5 + correct handover (hero wipe, headline lines, navbar items) | Gemini | todo | Needs recordings + loader texts |
| T5 | Home page motion rebuilt from real ix2 data, section by section (Hero → Services → Work → Reviews/Why/Resume/FAQ) | Gemini | todo | Blocked on ix2 JS data |
| T6 | Image polish: keep screenshots untinted; add Keshav's photos when supplied; export og-share.jpg | Keshav/Gemini | todo | Optional until photos exist |
| T7 | Verification pass: Lighthouse mobile ≥ 90, deep-link refresh on `/work/:slug`, contact form delivery, resume redirect | Keshav | todo | Report scores in the log |
| T8 | Distinctiveness pass: own accent colour and copy so the site isn't a clone of one designer's identity | Keshav/Claude | todo | After motion matches |

## 7. Handoff protocol

When you finish a task, append an entry to the log in this format:

```
### [date] [Claude|Gemini|Keshav] T# <title>
- Changed: <files>
- Measured vs assumed: <list>
- Verified how: <tsc / build / viewed on device / not verified>
- Open issues: <list>
- Next: <who does what>
```

Gemini: start every session by reading this file, then the files you will touch. Claude: review the latest log entry and the diff before assigning the next task.

---

## 8. Handoff log

### [2026-11-19] Claude: T0 baseline check
- Changed: created `aichat.md` only.
- Measured vs assumed: repo root listing, `package.json` and `vercel.json` read directly from GitHub (measured). Live-site metadata read from the deployed page (measured).
- Verified how: repository files and page metadata only. **No visual verification.**
- Open issues: see Task Board T1–T8; blocked items in §5b.
- Next: Keshav supplies §5b items and checks the phone "reduce motion" setting. Gemini starts T2 (diagnosis list first, no code), then T3.
