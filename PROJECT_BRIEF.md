# PROJECT_BRIEF.md: rules, design tokens and task board

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
- [ ] Overflow measurements (see T3b).

## 6. Task board

| ID | Task | Owner | Status | Notes |
|---|---|---|---|---|
| T0 | New build live on Vercel | Claude/Keshav | **done** | |
| T1 | Remove `bun.lock` | Claude | todo | Awaiting Keshav's OK |
| T2 | Mobile motion audit | Gemini + Claude | **done** | Cause is mostly phone reduce-motion (see `aichat.md`) |
| T3 | Mobile overflow audit by Gemini | Gemini | **rejected** | Table used selectors that don't exist; see Claude's review in `aichat.md` |
| T3b | Measure overflow in a real browser at 320/360/390/430/480/600/768, portrait + landscape, per route, using the script below; paste results into `aichat.md` | Keshav | **next** | Needs a real browser |
| T3c | Fix only what T3b proves, using real class names | Gemini | blocked on T3b | Candidate risks listed in `aichat.md` |
| T4 | Loader vs `.loader` spec and handover | Gemini | todo | Needs recordings + loader texts |
| T5 | Home motion from real ix2 data | Gemini | todo | Blocked on ix2 JS |
| T6 | Image polish; photos; export og-share.jpg | Keshav/Gemini | todo | Optional |
| T7 | Lighthouse mobile ≥ 90, deep-link refresh, form delivery, resume redirect | Keshav | todo | |
| T8 | Distinctiveness pass (own accent colour and copy) | Keshav/Claude | todo | After motion matches |

### Overflow measuring script (run in the browser console on the live site, device toolbar set to each width)

```js
({scrollW: document.documentElement.scrollWidth, innerW: innerWidth, wide: [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0,15).map(e => e.tagName + '.' + e.className.toString().slice(0,40) + ' → ' + Math.round(e.getBoundingClientRect().right))})
```

## 7. Log entry format (append to `aichat.md`)

```
### [date] [Who] T# <title>
- Changed: <files>
- Measured vs assumed: <list, with file and selector for each measured item>
- Verified how: <tsc / build / viewed on device / not verified>
- Open issues:
- Next:
```
