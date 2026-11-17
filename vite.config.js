import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Copies static assets from /image into /dist/image during production builds
 * so direct download links (like /image/keshav_CV.pdf.pdf) work on Vercel.
 */
function copyStaticImagesPlugin() {
  return {
    name: 'copy-static-images',
    closeBundle() {
      const srcDir = path.resolve(process.cwd(), 'image');
      const destDir = path.resolve(process.cwd(), 'dist', 'image');
      if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, destDir, { recursive: true });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyStaticImagesPlugin()],
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
