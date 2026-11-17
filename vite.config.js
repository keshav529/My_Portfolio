import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

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
  plugins: [copyStaticImagesPlugin()],
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
