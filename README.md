# Keshav Anand — Developer Portfolio

Personal portfolio built with **React 19, TypeScript, Vite, React Router, Framer Motion, and Lenis**.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build & Typecheck

```bash
npm run lint
npm run build
```

## Deploy to Vercel

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Under **Project Settings → Environment Variables**, add:
   - `VITE_FORMSPREE_ID` = your Formspree form ID (e.g. `abcd1234` from `https://formspree.io/f/abcd1234`).
4. Deploy. `vercel.json` handles SPA rewrites (`/work/:slug`, `/about`, etc.) and long-term asset caching automatically.

## Where to Edit Content & Design Tokens

- **Content, Projects, Skills, Education & Links**: `src/data/portfolioData.ts`
- **Design System Tokens (Colours, Fonts, Radii, Type Scale, Breakpoints)**: `src/styles/tokens.css`
- **Layout & Component Styles**: `src/styles/global.css`
- **SEO Routes & Metadata**: `src/components/RouteMeta.tsx`, `index.html`, `public/sitemap.xml`, `public/robots.txt`
