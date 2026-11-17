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
- **Unified Image Slot & Fallback SVGs**: `src/components/ImageSlot.tsx`, `src/components/BrandIllustration.tsx`
- **SEO Routes & Metadata**: `src/components/RouteMeta.tsx`, `index.html`, `public/sitemap.xml`, `public/robots.txt`

## Image Assets, Custom Photos & Social Card

The site uses a single `<ImageSlot />` component that shows a warm placeholder while loading, applies an editorial cream/orange tint overlay that fades off smoothly on hover, and falls back to an on-brand SVG illustration if an optional custom `.webp` file has not been added yet.

Place any new WebP files inside the project root `image/` folder (which Vite copies to `dist/image/` during `npm run build` so they resolve at `/image/...` in production):

| File Path | Aspect Ratio | Recommended Size | Max Weight | Section |
| --- | --- | --- | --- | --- |
| `image/resume-preview.webp` | `3:4` | `600x800` | `< 150 KB` | Resume banner (Home & Resources) |
| `image/journey-college.webp` | `16:10` | `800x500` | `< 150 KB` | About timeline (Stop 3) & Menu |
| `image/journey-desk.webp` | `3:4` | `720x960` | `< 150 KB` | About timeline (Stop 6) & Process |
| `image/<slug>-mobile.webp` | `1:1` | `600x600` | `< 150 KB` | Project detail mobile slot |
| `image/<slug>-detail.webp` | `1:1` | `600x600` | `< 150 KB` | Project detail state slot |

Project `<slug>` values: `currency-converter`, `netflix-clone`, `website-clone`, `tic-tac-toe`, `stopwatch`, `calculator`.

### Exporting the Social Share Card (`public/og-share.jpg`)

Social platforms (LinkedIn, X, WhatsApp, Discord) require a raster `.jpg` or `.png` for `og:image`. Both `index.html` and `src/components/RouteMeta.tsx` already point to `/og-share.jpg`:

1. Open `public/og-share.svg` (1200&times;630) in Figma, Inkscape, or Chrome/Squoosh.
2. Export at `1x` (`1200x630`) and overwrite `public/og-share.jpg` (`< 150 KB`, quality ~85).

