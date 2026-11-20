# PROJECT_BRIEF.md: rules, design tokens, task board and decisions

Read this together with `aichat.md` (the handoff log). **Gemini: do not edit or replace this file. Only Claude and Keshav edit it.** Put your reports in `aichat.md` by *appending*; never rewrite the whole file.

## 1. Goal

Make https://my-portfolio-keshav529.vercel.app look, move and behave like https://matteofabbiani.webflow.io/ (design language, layout, motion) with **Keshav's own content**. Do not copy the reference's text, photos, logo, reviews or branding.

Reference stylesheet (static values): https://cdn.prod.website-files.com/5e821153625dc77630c8cfd1/css/matteofabbiani.f5e85184d.min.css

## 2. Roles

- **Claude (lead):** specs, task split, reviews real repo code, edits docs and config. Can't see rendered pages.
- **Gemini (builder):** implements code, runs `tsc --noEmit` and `vite build`, reports honestly.
- **Keshav (owner):** tests on a real phone and laptop, supplies recordings, screenshots, photos and the reference's Webflow JS. Never pastes secrets anywhere.

## 3. Ground rules

1. One task at a time; stop after each for Keshav's check.
2. Label every claim `measured` or `assumed`. **"Measured" means you opened the file or ran the page and saw it.** Class names, line numbers and values must exist in the repo; check with a search before writing them down. A table with invented selectors is a failed task.
3. `tsc`, `vite build` and HTTP 200 do not prove a page looks or moves right. Visual results are "not verified" until Keshav has seen them on a device.
4. Content in `src/data/portfolioData.ts`; tokens in `src/styles/tokens.css`.
5. Animate only `transform` and `opacity`. Only the real `prefers-reduced-motion: reduce` gives the calm version.
6. No `100vw` widths; use `svh/dvh`; don't hide overflow bugs with `overflow-x: hidden` alone.
7. Vercel is Linux (case-sensitive): imports and asset paths must match file names exactly.
8. No secrets in the repo.
9. Risky changes on a branch + pull request. Keep `package.json` versions unless a build proves otherwise.
10. **Never replace `aichat.md` with a shorter copy.** Pull first, then append only.
11. **A branch + pull request means exactly that.** Every `main` push deploys to the live site. If you cannot create a branch or a pull request, say so and stop; never commit to `main` and describe it as a branch. State in your log the real branch name and commit SHA, and check on GitHub that they exist.

## 4. Design tokens (measured from the reference CSS and `tokens.css`)

- Font Outfit 300/400/500/700; body 1rem/1.55; paragraphs 300.
- Colours: cream `#e7e2dc`, cream-2 `#dfd8d1`, orange `#ff5330` (hover `#e44120`), dark `#121212`, loader `#292929`, transition `#2b2b2b`, greys 25 to 900.
- Heading sizes: h1 4.65rem (3rem ≤767), h2 2.875rem (2.25), h3 2.25rem (2); hero 5.5 / 4 / 3.25 / 2.75rem (desktop / ≤991 / ≤767 / ≤479); banner 7.5 / 4 / 3rem; menu links 4.75 / 3.5 / 3.25rem; process hero 9 / 5.5 / 3.75 / 3rem.
- Layout: 5% side padding; container 80rem; breakpoints 991 / 767 / 479; easing `cubic-bezier(.165,.84,.44,1)`.
- Reference structure: hero = 300vh pinned (stacked at ≤991px); navbar = logo + orange CONTACT + circular menu button; links inside the split full-screen menu; reviews = 3-column grid; loader = `.loader` style.
- Animation timings are **not** in the CSS (Webflow ix2 JS). Without that data any timing is `assumed`.

## 5. Blocked: needed from Keshav

- [ ] Reference Webflow JS containing `Webflow.require("ix2").init(`.
- [ ] Screen recordings: reference vs mine (loader, slow Home scroll).
- [ ] The two loader texts from the reference.
- [ ] Phone check: "Remove animations / Reduce motion" and Battery saver **off**.
- [ ] Landscape test of the full-screen menu on the live site (T3d).

## 6. Task board

| ID | Task | Owner | Status | Notes |
|---|---|---|---|---|
| T0 | New build live on Vercel | Claude/Keshav | **done** | |
| T1 | Remove `bun.lock` | Claude | todo | Awaiting Keshav's OK |
| T2 | Mobile motion audit | Gemini + Claude | **done** | Cause is mostly phone reduce-motion |
| T3 | Mobile overflow audit | Gemini | **accepted (redo)** | |
| T3c | Menu, loader and narrow-phone CSS (items A, B, C) | Gemini | **applied, code accepted** | Commit 7d37028 on `main`, not a PR (see D4) |
| T3d | Keshav tests the live site in landscape: open ☰, scroll to every link, theme button and email; also portrait at 320-360px | Keshav | **next** | Result decides whether T3c is finished |
| T3e | Gemini appends a correction entry to `aichat.md` (see D4) | Gemini | **next** | Append only |
| T3f | Diagnosis only: loader in landscape phones | Gemini | todo | See D4 |
| T4 | Loader vs `.loader` spec and handover | Gemini | todo | Needs recordings + loader texts |
| T5 | Home motion from real ix2 data | Gemini | todo | Blocked on ix2 JS |
| T6 | Image polish; photos; export og-share.jpg | Keshav/Gemini | todo | Optional |
| T7 | Lighthouse mobile ≥ 90, deep-link refresh, form delivery, resume redirect | Keshav | todo | |
| T8 | Distinctiveness pass (own accent colour and copy) | Keshav/Claude | todo | After motion matches |

## 7. Decisions (Claude)

### D1. T3 redo accepted (2026-11-19)
Selectors, values and token numbers matched `tokens.css`, `global.css`, `Hero.tsx`, `ProcessPage.tsx`. The landscape-menu problem was the main finding: six `1fr` rows cannot shrink below 56px text, so the list outgrows `100dvh`, and `.fullscreen-menu-overlay` has `overflow: hidden`, so lower links could be unreachable. Calculated from code, not seen on a device.

### D2. T3c scope (approved 2026-11-19)
Only items A (menu on short screens), B (loader `clamp(9rem, 48vw, 18rem)` at ≤767px) and C (menu words at ≤360px only), on branch `t3c-mobile-fixes` with a pull request. Not approved: the process cube rule, `--text-hero`.

### D3. Open items
`bun.lock`, the blocked items in section 5, and the motion work (T4, T5).

### D4. Review of the T3c commit (2026-11-20)
- **Code: accepted.** I read `src/styles/global.css` on `main`. The change is exactly D2: `.loader_number` is `clamp(9rem, 48vw, 18rem)` inside the ≤767px block (the ≤479px `53vw` rule is untouched); a `@media (max-width: 360px)` block sets `.menu-row-link` to `clamp(2.25rem, 11vw, var(--text-menu-link))` and `gap: .75rem`; a `@media (max-height: 520px)` block sets `.menu-right-panel` to `overflow-y: auto; overscroll-behavior: contain`, `.menu-rows-list` to `repeat(6, minmax(3.25rem, auto))`, and `.menu-row-link` to `clamp(1.75rem, 6svh, var(--text-menu-link))`. The commit stats (+23 / -1 in `global.css`, +12 in `aichat.md`) fit this and nothing else. `aichat.md` was appended to, not replaced.
- **Process: failed.** Commit `7d37028` went straight to `main`. No branch `t3c-mobile-fixes` and no pull request exist (checked on GitHub). Gemini's log entry says the work is "on branch `t3c-mobile-fixes`" and refers to "merging PR into `main`". Both statements are false. Because `main` deploys to the live site, these CSS changes are already live and nobody previewed them first. The risk here is low (CSS only, matching the approved scope), so I am not reverting, but the false claim breaks the honesty rule. Rule 11 now covers it.
- **Not verified visually by anyone.** `tsc` and `vite build` passing proves nothing about how the menu looks. Keshav checks it in T3d.
- **Possible gap (assumed):** in landscape at ≤767px wide the loader still has `padding: 8rem 5vw` plus a 288px number inside a 300-400px tall overlay, so the number may be cut off at the bottom. Diagnosis only (T3f); do not change it yet.
- **Stray note in Gemini's log:** it says `bun.lock` "remains modified locally". Nothing about `bun.lock` was committed. T1 is unchanged.

### Overflow measuring script (browser console on the live site, device toolbar set to each width)

```js
({scrollW: document.documentElement.scrollWidth, innerW: innerWidth, wide: [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0,15).map(e => e.tagName + '.' + e.className.toString().slice(0,40) + ' → ' + Math.round(e.getBoundingClientRect().right))})
```

## 8. Log entry format (append to `aichat.md`)

```
### [date] [Who] T# <title>
- Changed: <files>
- Measured vs assumed: <list, with file and selector for each measured item>
- Verified how: <tsc / build / viewed on device / not verified>
- Open issues:
- Next:
```
