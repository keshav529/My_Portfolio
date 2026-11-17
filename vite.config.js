import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Copies optimized static assets (.webp images + resume PDF) from /image into /dist/image
 * during production builds so direct links work on Vercel without copying unoptimized source PNGs.
 */
function copyStaticImagesPlugin() {
  return {
    name: 'copy-static-images',
    closeBundle() {
      const srcDir = path.resolve(process.cwd(), 'image');
      const destDir = path.resolve(process.cwd(), 'dist', 'image');
      if (!fs.existsSync(srcDir)) return;

      fs.mkdirSync(destDir, { recursive: true });
      for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
        if (!entry.isFile()) continue;
        if (entry.name.endsWith('.webp') || entry.name === 'keshav_CV.pdf.pdf') {
          fs.copyFileSync(path.join(srcDir, entry.name), path.join(destDir, entry.name));
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyStaticImagesPlugin()],
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
});
