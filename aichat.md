# aichat.md: Claude × Gemini collaboration file

Shared working file for **Claude** (lead / reviewer, works through the GitHub connector), **Gemini in AI Studio** (implementer) and **Keshav** (owner, tester).

> **Gemini: pull before you edit this file, and never replace it with a shorter copy.** Append to the Handoff Log; don't delete other people's entries or sections. (On 2026-11-19 an earlier version was overwritten and had to be restored from commit 6e56b36.)

---

## 1. Goal

Make https://my-portfolio-keshav529.vercel.app look, move and behave like https://matteofabbiani.webflow.io/ (design language, layout, motion), using **Keshav's own content**.

Reference stylesheet (source of truth for static values):
https://cdn.prod.website-files.com/5e821153625dc77630c8cfd1/css/matteofabbiani.f5e85184d.min.css

**Do not copy** the reference's text, photos, logo, client reviews or branding.

## 2. Roles

| Who | Does | Does not |
|---|---|---|
| **Claude (lead)** | Specs, task split, reviews real code in the repo, edits config/docs, checks the live page metadata | Can't see a rendered page; never claims visual verification |
| **Gemini (builder)** | Implements components, styles, motion; runs `tsc --noEmit` and `vite build`; reports | Doesn't mark a task done without listing what was *not* verified; doesn't paste a table only in chat, it must also go into the log |
| **Keshav (owner)** | Tests on real phone and laptop; supplies recordings, screenshots, photos, the reference's Webflow JS | Never pastes secrets into any chat or file |

## 3. Ground rules

1. One task at a time, in Task Board order. Stop after each task for Keshav's check.
2. Label every value `measured` (reference CSS, ix2 data, recording, repo code) or `assumed`. `tsc`, `vite build` and HTTP 200 do **not** prove a page looks or moves right.
3. Content lives in `src/data/portfolioData.ts`; tokens in `src/styles/tokens.css`.
4. Animate only `transform` and `opacity`. Only the real `prefers-reduced-motion: reduce` switches to a calm version; "mobile" is never "reduced motion".
5. No `100vw` widths (use `100%`); `svh/dvh` for full-screen sections; don't hide overflow bugs with `overflow-x: hidden` alone.
6. Vercel is Linux (case-sensitive): imports and asset paths must match file names exactly; verify files exist on disk.
7. No secrets in the repo. `VITE_FORMSPREE_ID` lives in Vercel.
8. Risky changes go on a branch + pull request; docs and small config may go to `main`.
9. Keep `package.json` versions (react 19.1, react-router-dom 7.6, framer-motion 12.23, lenis 1.3, lucide-react 0.525, vite 6.3, @vitejs/plugin-react 4.6, typescript 5.8, Node 22.x) unless a build proves otherwise.

## 4. Current state (Claude, 2026-11-19, read from the repo and live page metadata; no visual check)

- `main` holds the Vite + React + TS multi-page app. `package.json` and `vercel.json` are corrected; the live site serves the new build.
- `bun.lock` is still present (harmless: `vercel.json` forces `npm install`).
- Commit c3e1f52 (2026-11-17) already removed viewport-based disabling of hero motion and added entrance animation to the About timeline. Hero parallax now runs on mobile with a smaller range.
- Optional images still missing (SVG fallbacks used): `journey-college.webp`, `journey-desk.webp`, `resume-preview.webp`, `<slug>-mobile.webp`, `<slug>-detail.webp`. `og-share.jpg` still needs exporting from the SVG.

## 5. Design tokens (measured from the reference CSS)

- Font Outfit 300/400/500/700; body 1rem/1.55; paragraphs weight 300.
- Colours: cream `#e7e2dc`, cream-2 `#dfd8d1`, orange `#ff5330` (hover `#e44120`), dark `#121212`, loader `#292929`, transition panels `#2b2b2b`, greys 25 `#fcfcfc` to 900 `#141414`.
- Headings (desktop / ≤767px): h1 4.65 / 3rem (300, -0.03em); h2 2.875 / 2.25rem; h3 2.25 / 2rem; hero value 5.5rem; banner 7.5rem; menu links 4.75rem.
- Layout: 5% side padding; container 80rem; breakpoints 991 / 767 / 479; radii .875 / 1 / 1.25-1.5rem; easing `cubic-bezier(.165,.84,.44,1)`, 0.5s hovers.
- Reference structure: hero = 300vh pinned (text left, tall image right with cream wipe), stacked at ≤991px; navbar = logo + orange CONTACT + circular menu button, links inside the full-screen split menu; reviews = 3-column grid; loader = `.loader` style (`#292929` panel, cream progress fill with `mix-blend-mode: exclusion`, giant counter bottom-right).
- Animation timings are **not** in the CSS (they are in Webflow's ix2 JS). Any timing without that data is `assumed`.

## 5b. Blocked: needed from Keshav

- [ ] Reference Webflow JS containing `Webflow.require("ix2").init(` (page source), committed to a `reference/` folder or attached in AI Studio.
- [ ] Screen recordings of reference vs mine: first 6 seconds (loader) and a slow Home scroll.
- [ ] The two loader texts (left and right of the top bar) from the reference.
- [ ] Phone check: is "Remove animations / Reduce motion" and Battery saver **off**? (see T2 finding 1)

## 6. Task board

| ID | Task | Owner | Status | Notes |
|---|---|---|---|---|
| T0 | New build live on Vercel | Claude/Keshav | **done** | |
| T1 | Remove `bun.lock` | Claude | todo | Awaiting Keshav's OK |
| T2 | Mobile motion audit | Gemini + Claude | **done (diagnosis)** | See Claude's review in the log; the cause is mostly the phone's reduce-motion state |
| T3 | Mobile overflow audit: 320/360/390/430/480/600/768, portrait + landscape, all routes | Gemini | **next** | Earlier fix only covered `.services-tabs-bar` |
| T4 | Loader check vs `.loader` spec and handover (hero wipe, headline lines, nav items) | Gemini | todo | Needs recordings + loader texts |
| T5 | Home motion rebuilt from real ix2 data, section by section | Gemini | todo | Blocked on ix2 JS |
| T6 | Image polish; Keshav's photos; export og-share.jpg | Keshav/Gemini | todo | Optional |
| T7 | Verification: Lighthouse mobile ≥ 90, deep-link refresh, form delivery, resume redirect | Keshav | todo | |
| T8 | Distinctiveness pass (own accent colour and copy) | Keshav/Claude | todo | After motion matches |

## 7. Handoff protocol

```
### [date] [Claude|Gemini|Keshav] T# <title>
- Changed: <files>
- Measured vs assumed: <list>
- Verified how: <tsc / build / viewed on device / not verified>
- Open issues: <list>
- Next: <who does what>
```

Gemini: put your full audit tables **in the log entry**, not only in chat.

---

## 8. Handoff log

### [2026-11-19] Claude: T0 baseline
- Changed: created this file; read `package.json`, `vercel.json`, live-page metadata.
- Verified how: repo files and page metadata only. No visual verification.

### [2026-11-19] Gemini: T2 mobile motion audit (as recorded by Gemini)
- Status: completed, no code changed. Gemini's entry contained only a one-line summary; its table was not saved here. Gemini: add the table below this entry.

### [2026-11-19] Claude: T2 review (measured from repo code: App.tsx, SmoothScroll.tsx, Hero.tsx, global.css)
1. **Reduced motion is the most likely reason the phone looks static.** `App.tsx` wraps everything in `<MotionConfig reducedMotion="user">`, and `global.css` ends with an `@media (prefers-reduced-motion: reduce)` block that sets every animation and transition to 0.01ms and stops the marquees and orbit ring. On a phone with Android "Remove animations", Battery saver or iOS "Reduce Motion", the whole site becomes static by design. Keshav must check this first.
2. **No viewport-based motion disabling remains in JS.** `SmoothScroll.tsx` switches Lenis off only for reduced motion and ≤479px (the unused `coarseQuery` listener can be removed). `Hero.tsx` keeps parallax on compact screens with a smaller range; only `prefersReducedMotion` disables it.
3. **Layouts that become static at ≤991px match the reference's own mobile behaviour:** hero (stacked, no pin), work strip (swipe row with scroll-snap, no scrubbed movement), `.about-timeline` list at ≤479px, services stage stacked. These are layout decisions, not bugs.
4. **Small gaps that can make mobile feel flatter than the reference:** services selector pill is `display: none` at ≤479px; work strip cards on phones have no scroll-position effect (scale/opacity); `.hero-scroll-indicator` is hidden ≤991px (as designed).
5. Loader CSS now follows the `.loader` spec (`#292929`, 1.5px cream-2 border, `mix-blend-mode: exclusion`, counter bottom-right, 27 / 21 / 18rem, 53vw at ≤479px). Sizes at 991px (21rem) are `assumed`; timings are `assumed`.
- Measured vs assumed: all items above measured from code; nothing visual verified.
- Next: Keshav checks the phone settings (5b). Gemini starts T3 (overflow audit), writes the table into this log, and does not change code before reporting.
