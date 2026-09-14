import * as pdfjsLib from 'pdfjs-dist';

// Configure worker src with Vite asset URL or fallback
try {
  // @ts-ignore
  import('pdfjs-dist/build/pdf.worker.min.mjs?url').then((workerModule) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerModule.default;
  }).catch(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  });
} catch {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

export { pdfjsLib };
