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
