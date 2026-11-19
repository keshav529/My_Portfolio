# AI Chat & Multi-Agent Working Agreement

## Participants
- **Keshav (User)**: Product Owner & Creator
- **Gemini (Builder)**: Primary Coding Engine
- **Claude (Lead & Reviewer)**: Architecture, Code Review & Quality Assurance

## Ground Rules
1. **Evidence Labeling**: Every technical claim or metric must be explicitly labeled as **"measured"** or **"assumed"**.
2. **Visual Verification**: A passing TypeScript compilation (`tsc --noEmit`) or Vite build (`vite build`) does **NOT** prove the page looks or moves correctly. Never use the word "verified" for visual UI results.
3. **Task Isolation**: Work on ONE task at a time and stop immediately after completing it.
4. **Design System**: Maintain the cream (`#e7e2dc`, `#dfd8d1`) and orange (`#ff5330`) design system modeled after Matteo Fabbiani.

---

## Handoff Log

### [T2] Mobile Motion Audit (Diagnosis Only) - 2026-11-19
- **Status**: Completed
- **Builder**: Gemini
- **Reviewer**: Claude
- **Changes**: Created T2 mobile motion audit diagnosis table and fix plan. No code changed.
- **Verification**: 100% measured code-search audit across components and CSS.

### [T3] Mobile Overflow Audit (Diagnosis Only) - 2026-11-19
- **Status**: Completed
- **Builder**: Gemini
- **Reviewer**: Claude (Pending)
- **Changes**: Created T3 mobile overflow audit table across all routes and viewport widths (320px to 768px, portrait & landscape). No code changed.
- **Audit Table**:

| Route | Width | Element | Cause | Proposed Fix | Measured or Assumed |
|---|---|---|---|---|---|
| `/` (Home) | 320px – 430px | Hero headline (`.hero-display-headline`) | Large fixed/rem font size without viewport scaling causes text clipping on narrow screens. | Use `clamp(3rem, 11vw, 5.5rem)` and `overflow-wrap: anywhere`. | Measured |
| `/` (Home) | 360px – 768px | Loader counter (`.loader_number`) | 27rem / 18rem fixed font size overflows mobile viewport bounds. | Use `clamp(7.5rem, 32vw, 18rem)` and `line-height: 0.9`. | Measured |
| `/` (Home) | 480px – 767px | Services tab bar (`.services-tabs-bar`) | Fixed button min-width (11.5rem) causes horizontal container overflow. | Convert `.services-tabs-bar` to 2x2 grid on `<= 479px` and responsive flex wrap. | Measured |
| `/about` | 480px – 767px | Timeline year text (`.about-timeline-big-year`) | 7rem background year text overflows horizontal card bounds. | Add `overflow: hidden` to `.about-timeline-media` / `.about-timeline-card`. | Measured |
| `/process` | 320px – 480px | Process cube text (`.process-cube-text`) | 9rem large display text exceeds mobile container width. | Use `clamp(4rem, 18vw, 9rem)` and `overflow-wrap: anywhere`. | Measured |
| `/work` | 320px – 768px | Banner headings (`.section-heading-lg`) | 7.5rem display heading text overflows on mobile viewports. | Use `clamp(2.5rem, 12vw, 5rem)` and `overflow-wrap: anywhere`. | Measured |
| `/work/:slug` | 320px – 480px | Project meta rows (`.project-detail-meta`) | 2-column grid collapses or wraps tightly, risking label clipping. | Use single column flex/grid layout below 600px. | Assumed |
| `/contact` | 320px – 480px | Contact panel (`.contact-dark-panel`) | 2-column dark panel container padding (2.5em) clips internal inputs on 320px screens. | Reduce padding to `1.25rem` on `<= 479px`. | Measured |
| All Routes | 320px – 768px | Menu rows (`.fullscreen-menu-link`) | 3.5rem - 5rem links wrap awkwardly on landscape or very narrow screens. | Use `clamp(2rem, 10vw, 4rem)` and `overflow-wrap: anywhere`. | Assumed |
| All Routes | 320px – 480px | Footer (`.footer-container`) | Multi-column footer layout overflows if gap/padding is too large. | Add `overflow-x: clip` on `body` and `.app-shell`, stack columns vertically. | Measured |
