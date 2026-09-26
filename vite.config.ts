import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://nosignpdf.com/</loc><priority>1.0</priority></url>
  <url><loc>https://nosignpdf.com/wypelnij-formularz-pdf</loc><priority>0.9</priority></url>
  <url><loc>https://nosignpdf.com/polacz-pdf</loc><priority>0.9</priority></url>
  <url><loc>https://nosignpdf.com/wyczysc-metadane-pdf</loc><priority>0.9</priority></url>
  <url><loc>https://nosignpdf.com/kompresuj-pdf</loc><priority>0.9</priority></url>
  <url><loc>https://nosignpdf.com/grafika-do-pdf</loc><priority>0.9</priority></url>
  <url><loc>https://nosignpdf.com/usun-strony-z-pdf</loc><priority>0.8</priority></url>
  <url><loc>https://nosignpdf.com/obroc-pdf</loc><priority>0.8</priority></url>
  <url><loc>https://nosignpdf.com/rozdziel-pdf</loc><priority>0.8</priority></url>
  <url><loc>https://nosignpdf.com/pdf-to-word</loc><priority>0.8</priority></url>
  <url><loc>https://nosignpdf.com/word-to-pdf</loc><priority>0.8</priority></url>
  <url><loc>https://nosignpdf.com/pdf-to-excel</loc><priority>0.8</priority></url>
  <url><loc>https://nosignpdf.com/excel-to-pdf</loc><priority>0.8</priority></url>
  <url><loc>https://nosignpdf.com/polityka-privacy</loc><priority>0.3</priority></url>
</urlset>
`;

const adsContent = `# Google AdSense configuration setup container
`;

function staticFilesPlugin() {
  return {
    name: 'static-seo-files-generator',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
        fs.writeFileSync(path.join(distDir, 'ads.txt'), adsContent, 'utf-8');
        console.log('[static-seo-files-generator] Successfully wrote dist/sitemap.xml and dist/ads.txt');
      }
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), staticFilesPlugin()],
    publicDir: 'public',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
