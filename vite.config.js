import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_SITE_URL = 'https://my-portfolio-keshav529.vercel.app';

/**
 * Copies optimized static assets (.webp images + resume PDF) from /image into /dist/image
 * during production builds, and synchronizes VITE_SITE_URL in index.html, sitemap.xml, and robots.txt.
 */
function buildAssetsAndSiteUrlPlugin(siteUrl) {
  return {
    name: 'build-assets-and-site-url',
    transformIndexHtml(html) {
      if (siteUrl === DEFAULT_SITE_URL) return html;
      return html.replaceAll(DEFAULT_SITE_URL, siteUrl);
    },
    closeBundle() {
      const srcDir = path.resolve(process.cwd(), 'image');
      const destDir = path.resolve(process.cwd(), 'dist', 'image');
      if (fs.existsSync(srcDir)) {
        fs.mkdirSync(destDir, { recursive: true });
        for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
          if (!entry.isFile()) continue;
          if (entry.name.endsWith('.webp') || entry.name === 'Keshav-Anand-Resume.pdf') {
            fs.copyFileSync(path.join(srcDir, entry.name), path.join(destDir, entry.name));
          }
        }
      }

      if (siteUrl !== DEFAULT_SITE_URL) {
        for (const seoFile of ['sitemap.xml', 'robots.txt']) {
          const outFile = path.resolve(process.cwd(), 'dist', seoFile);
          if (fs.existsSync(outFile)) {
            const updated = fs.readFileSync(outFile, 'utf8').replaceAll(DEFAULT_SITE_URL, siteUrl);
            fs.writeFileSync(outFile, updated, 'utf8');
          }
        }
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL?.trim() || DEFAULT_SITE_URL).replace(/\/+$/, '');

  return {
    plugins: [react(), buildAssetsAndSiteUrlPlugin(siteUrl)],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router-vendor': ['react-router-dom'],
            'motion-vendor': ['framer-motion'],
            'lenis-vendor': ['lenis'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
  };
});
