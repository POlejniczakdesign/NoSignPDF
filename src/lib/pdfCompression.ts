import { PDFDocument } from 'pdf-lib';
import { pdfjsLib } from './pdfjs';

export type CompressionLevel = 'low' | 'medium' | 'high';

export interface CompressionResult {
  bytes: Uint8Array;
  originalSize: number;
  newSize: number;
  savedPercentage: number;
}

/**
 * Compresses a PDF file 100% client-side in browser memory.
 */
export async function compressPdf(
  inputBytes: Uint8Array,
  level: CompressionLevel = 'medium',
  onProgress?: (percent: number) => void
): Promise<CompressionResult> {
  const originalSize = inputBytes.byteLength;

  if (onProgress) onProgress(10);

  // Strategy 1: Always load and rebuild with object streams first
  try {
    const srcDoc = await PDFDocument.load(inputBytes, { ignoreEncryption: true });

    // Remove heavy metadata or redundant tags if needed
    srcDoc.setTitle('');
    srcDoc.setAuthor('');
    srcDoc.setSubject('');
    srcDoc.setKeywords([]);
    srcDoc.setProducer('PDF Studio Online');
    srcDoc.setCreator('PDF Studio Online');

    if (onProgress) onProgress(30);

    if (level === 'low') {
      // Pure lossless structural optimization with compressed object streams
      const optimizedBytes = await srcDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      if (onProgress) onProgress(100);

      const newSize = optimizedBytes.byteLength;
      // If structural save saved bytes, use it; otherwise return input
      if (newSize < originalSize) {
        const savedPercentage = Math.round(((originalSize - newSize) / originalSize) * 100);
        return {
          bytes: optimizedBytes,
          originalSize,
          newSize,
          savedPercentage: Math.max(1, savedPercentage),
        };
      } else {
        return {
          bytes: inputBytes,
          originalSize,
          newSize: originalSize,
          savedPercentage: 0,
        };
      }
    }

    // Strategy 2: For 'medium' and 'high', use rasterization downsampling for image-heavy scans
    // Render each page with PDF.js to an offscreen canvas and re-embed with JPEG compression
    const quality = level === 'high' ? 0.55 : 0.75;
    const scale = level === 'high' ? 1.0 : 1.25;

    const loadingTask = pdfjsLib.getDocument({ data: inputBytes.slice() });
    const pdfJsDoc = await loadingTask.promise;
    const totalPages = pdfJsDoc.numPages;

    const newDoc = await PDFDocument.create();

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdfJsDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas 2D context not available');
      }

      // Fill white background for scans / transparent PDFs
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render page
      // @ts-ignore
      await page.render({ canvasContext: ctx, viewport }).promise;

      // Extract as JPEG blob
      const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
      const base64Data = jpegDataUrl.split(',')[1];
      const binaryString = atob(base64Data);
      const jpegBytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        jpegBytes[i] = binaryString.charCodeAt(i);
      }

      // Embed into new PDF
      const embeddedJpg = await newDoc.embedJpg(jpegBytes);
      const origViewport = page.getViewport({ scale: 1.0 });
      const newPage = newDoc.addPage([origViewport.width, origViewport.height]);
      newPage.drawImage(embeddedJpg, {
        x: 0,
        y: 0,
        width: origViewport.width,
        height: origViewport.height,
      });

      if (onProgress) {
        const progressVal = Math.min(95, 30 + Math.round((pageNum / totalPages) * 60));
        onProgress(progressVal);
      }
    }

    const compressedRasterBytes = await newDoc.save({ useObjectStreams: true });
    const newSize = compressedRasterBytes.byteLength;

    if (onProgress) onProgress(100);

    // If rasterized version is smaller than original, return it
    if (newSize < originalSize) {
      const savedPercentage = Math.round(((originalSize - newSize) / originalSize) * 100);
      return {
        bytes: compressedRasterBytes,
        originalSize,
        newSize,
        savedPercentage: Math.max(1, savedPercentage),
      };
    }

    // Otherwise try structural save as fallback
    const fallbackBytes = await srcDoc.save({ useObjectStreams: true });
    if (fallbackBytes.byteLength < originalSize) {
      const savedPercentage = Math.round(((originalSize - fallbackBytes.byteLength) / originalSize) * 100);
      return {
        bytes: fallbackBytes,
        originalSize,
        newSize: fallbackBytes.byteLength,
        savedPercentage: Math.max(1, savedPercentage),
      };
    }

    return {
      bytes: inputBytes,
      originalSize,
      newSize: originalSize,
      savedPercentage: 0,
    };
  } catch (err) {
    console.error('PDF compression error, falling back to original bytes:', err);
    return {
      bytes: inputBytes,
      originalSize,
      newSize: originalSize,
      savedPercentage: 0,
    };
  }
}
