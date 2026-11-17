# Deploying to Vercel

This portfolio is a **Vite + React** single-page application configured for zero-config static deployment on Vercel (`vercel.json` handles SPA routing, the legacy resume PDF redirect, and asset caching).

---

## 1. Push Your Repository to GitHub

```bash
git add .
git commit -m "chore: prepare portfolio for Vercel deployment"
git push -u origin main
```

---

## 2. Connect Repository to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Click **Import** next to your portfolio repository (`my-portfolio` / `keshav529`).
3. Keep the root directory as `./` and confirm the build settings below.

---

## 3. Vercel Build & Output Settings

| Setting | Value |
| --- | --- |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node.js Version** | `22.x` (configured via `engines.node` in `package.json`) |

---

## 4. Environment Variables

In Vercel, open **Project Settings → Environment Variables** and add:

| Variable | Value | Required |
| --- | --- | --- |
| `VITE_FORMSPREE_ID` | Your Formspree form ID (the code at the end of `https://formspree.io/f/YOUR_ID`) | Required for live contact form delivery |
| `VITE_SITE_URL` | `https://my-portfolio-keshav529.vercel.app` (already used as the default fallback; set this only if you switch to a custom domain later) | Optional |

Select **Production**, **Preview**, and **Development** environments when saving `VITE_FORMSPREE_ID`.

---

## 5. Deploy & Verify

Click **Deploy**. Once finished, open your live URL and check:
- All routes load directly without 404s (`/about`, `/process`, `/work`, `/work/netflix-clone`, `/contact`, `/resources`).
- `/image/Keshav-Anand-Resume.pdf` downloads cleanly, and the legacy `/image/keshav_CV.pdf.pdf` path redirects permanently to it.
- Submitting the Contact form delivers a test message via Formspree.

---

## 6. How to Redeploy

- **After code or content changes:** Push a commit to `main` on GitHub — Vercel automatically rebuilds and publishes the update:
  ```bash
  git add .
  git commit -m "update: portfolio content"
  git push
  ```
- **After changing environment variables (such as `VITE_FORMSPREE_ID` or `VITE_SITE_URL`):** Vite bakes `VITE_*` variables into the bundle at build time, so changing an env var requires a manual redeploy:
  1. Open your project in Vercel → **Deployments**.
  2. Click the **`...`** menu on the latest production deployment and choose **Redeploy** (leave build cache unchecked if you changed `VITE_*` variables).
