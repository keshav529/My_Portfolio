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
- [ ] Overflow measurements with the script below (T3b), especially the menu in **landscape**.

## 6. Task board

| ID | Task | Owner | Status | Notes |
|---|---|---|---|---|
| T0 | New build live on Vercel | Claude/Keshav | **done** | |
| T1 | Remove `bun.lock` | Claude | todo | Awaiting Keshav's OK |
| T2 | Mobile motion audit | Gemini + Claude | **done** | Cause is mostly phone reduce-motion |
| T3 | Mobile overflow audit | Gemini | **accepted (redo)** | First table rejected; the redo is accepted, see Decisions D1 |
| T3b | Measure overflow in a real browser, portrait + landscape | Keshav | **next** | Script below. Does not block T3c items A-C |
| T3c | Apply ONLY changes A, B, C from Decisions D2, on a branch + PR | Gemini | **approved** | Nothing else |
| T4 | Loader vs `.loader` spec and handover | Gemini | todo | Needs recordings + loader texts |
| T5 | Home motion from real ix2 data | Gemini | todo | Blocked on ix2 JS |
| T6 | Image polish; photos; export og-share.jpg | Keshav/Gemini | todo | Optional |
| T7 | Lighthouse mobile ≥ 90, deep-link refresh, form delivery, resume redirect | Keshav | todo | |
| T8 | Distinctiveness pass (own accent colour and copy) | Keshav/Claude | todo | After motion matches |

## 7. Decisions (Claude, 2026-11-19)

### D1. Review of Gemini's T3 redo: accepted
- Selectors, values and token numbers in the redo match what I read in `tokens.css`, `global.css`, `Hero.tsx`, `ProcessPage.tsx`. Every row uses real class names and labels browser behaviour as `assumed`. That is the standard going forward. I did not re-check each line number.
- The one finding I rate as **very likely a real bug** is the landscape menu: Gemini's arithmetic (list area about 154–254px for six rows, against 56px text with `line-height: 1`) is correct. Because `1fr` rows cannot shrink below their content, the list will grow past the panel instead of squeezing, and `.fullscreen-menu-overlay` has `overflow: hidden`. So on a phone held sideways the lower menu links (Resources, Contact) and the theme and email footer can be **unreachable**. This is calculated from the code, not seen on a device.
- The loader at 480–520px and "Resources" at 320px are plausible but depend on real glyph widths, so they are low-risk, small fixes only.
- The cube at ≤479px is off (`ProcessPage.tsx` renders the static word stack), so the cube row is not applicable now.
- The hero headline wrapping is cosmetic and matches the design token. Leave it.

### D2. Approved scope for T3c (Gemini may change only this)
Work on a new branch `t3c-mobile-fixes`, open a pull request, do not touch `main`.
- **A. Menu on short screens.** Add `@media (max-height: 520px)`: `.menu-right-panel { overflow-y: auto; overscroll-behavior: contain; }`, `.menu-rows-list { grid-template-rows: repeat(6, minmax(3.25rem, auto)); }`, `.menu-row-link { font-size: clamp(1.75rem, 6svh, var(--text-menu-link)); }`. Requirement: every link, the theme button and the email must be reachable by scrolling inside the menu at 568×320, 667×375, 844×390 and 932×430 (landscape). Make sure the page behind does not scroll while the menu is open.
- **B. Loader size.** Inside the existing `@media (max-width: 767px)`, change `.loader_number` to `font-size: clamp(9rem, 48vw, 18rem);`. Do not change the ≤479px `53vw` rule or any other loader value.
- **C. Menu words on very narrow phones.** Add `@media (max-width: 360px) { .menu-row-link { font-size: clamp(2.25rem, 11vw, var(--text-menu-link)); gap: 0.75rem; } }`. Do **not** apply it to the whole ≤479px range, because that would move the type scale away from the reference.
- **Not approved:** the `.process-cube-face` change (cube is off at ≤479px) and any change to `--text-hero`.
- After the changes: run `npm run lint` and `npm run build`, append a log entry in `aichat.md` listing the exact lines changed, mark results as `not verified visually`, and stop. Keshav checks the Vercel preview of the branch on a real phone in landscape before the merge.

### D3. Reminder on what is still open
T1 (`bun.lock`), the blocked items in section 5, and the motion work (T4, T5) are unchanged.

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
