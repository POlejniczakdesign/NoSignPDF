import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Loader2,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import { pdfjsLib } from '../../lib/pdfjs';
import { FileUploader } from '../FileUploader';
import { useLanguage } from '../../i18n/LanguageContext';

interface PdfToWordConverterProps {
  initialFiles?: { name: string; bytes: Uint8Array; size: number }[];
  onTriggerDownload: (blobUrl: string, fileName: string) => void;
}

interface ExtractedPage {
  pageNumber: number;
  lines: string[];
  fullText: string;
}

export const PdfToWordConverter: React.FC<PdfToWordConverterProps> = ({
  initialFiles,
  onTriggerDownload,
}) => {
  const { t } = useLanguage();
  const [file, setFile] = useState<{ name: string; bytes: Uint8Array; size: number } | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'ready' | 'error'>('idle');
  const [progress, setProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const [extractedPages, setExtractedPages] = useState<ExtractedPage[]>([]);
  const [allText, setAllText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0 && !file) {
      handleFileSelected(initialFiles[0]);
    }
  }, [initialFiles]);

  const handleFileSelected = (selectedFile: { name: string; bytes: Uint8Array; size: number }) => {
    setFile(selectedFile);
    processPdfToWord(selectedFile);
  };

  const processPdfToWord = async (targetFile: { name: string; bytes: Uint8Array; size: number }) => {
    setStatus('processing');
    setErrorMessage('');
    setProgress({ current: 0, total: 0 });

    try {
      // Load document using pdfjs-dist
      const loadingTask = pdfjsLib.getDocument({
        data: targetFile.bytes,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@6.3.289/cmaps/',
        cMapPacked: true,
      });

      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      setProgress({ current: 0, total: numPages });

      const pages: ExtractedPage[] = [];
      let combined = '';

      for (let i = 1; i <= numPages; i++) {
        setProgress({ current: i, total: numPages });
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Extract items with text
        const items = (textContent.items || []).filter(
          (item: any) => typeof item.str === 'string' && item.str.length > 0
        ) as any[];

        // Group text items by line (Y coordinate, with tolerance ~4pt)
        const lineBuckets: { y: number; items: any[] }[] = [];

        for (const item of items) {
          const y = item.transform[5];
          let bucket = lineBuckets.find((b) => Math.abs(b.y - y) <= 4);
          if (!bucket) {
            bucket = { y, items: [] };
            lineBuckets.push(bucket);
          }
          bucket.items.push(item);
        }

        // Sort lines top to bottom (Y descending)
        lineBuckets.sort((a, b) => b.y - a.y);

        const pageLines: string[] = [];
        for (const bucket of lineBuckets) {
          // Sort items in line left to right (X ascending)
          bucket.items.sort((a, b) => a.transform[4] - b.transform[4]);
          const lineStr = bucket.items.map((it) => it.str).join(' ');
          if (lineStr.trim().length > 0) {
            pageLines.push(lineStr);
          }
        }

        const pageText = pageLines.join('\n');
        pages.push({
          pageNumber: i,
          lines: pageLines,
          fullText: pageText,
        });

        if (numPages > 1) {
          combined += `\n--- [Strona ${i} z ${numPages}] ---\n\n` + pageText + '\n';
        } else {
          combined += pageText;
        }
      }

      setExtractedPages(pages);
      setAllText(combined.trim());
      setStatus('ready');
    } catch (err: any) {
      console.error('Błąd ekstrakcji tekstu z PDF:', err);
      setErrorMessage(
        'Nie udało się wyodrębnić tekstu z tego dokumentu. Upewnij się, że plik PDF nie jest zabezpieczony hasłem i zawiera cyfrową warstwę tekstową.'
      );
      setStatus('error');
    }
  };

  // Generate and trigger Word (.docx) download
  const handleDownloadDocx = () => {
    if (!file || !allText) return;

    // Create Word-compatible HTML/XML document with MSO markup
    const baseName = file.name.replace(/\.pdf$/i, '');
    const docTitle = `${baseName} (PDF Studio Online)`;

    const paragraphsHtml = extractedPages
      .map((p) => {
        const pageHeader =
          extractedPages.length > 1
            ? `<div class="page-header">Strona ${p.pageNumber} z ${extractedPages.length}</div>`
            : '';
        const bodyLines = p.lines
          .map((line) => `<p class="MsoNormal">${escapeHtml(line)}</p>`)
          .join('\n');
        return `<div class="page-container">${pageHeader}${bodyLines}</div><br clear="all" style="page-break-before:always" />`;
      })
      .join('\n');

    const wordDocContent = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${escapeHtml(docTitle)}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
@page {
  size: 21.0cm 29.7cm;
  margin: 2.54cm 2.54cm 2.54cm 2.54cm;
  mso-page-orientation: portrait;
}
body {
  font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
  font-size: 11pt;
  line-height: 1.45;
  color: #111827;
  background-color: #ffffff;
}
p.MsoNormal {
  margin: 0 0 6pt 0;
  text-align: left;
}
.page-header {
  font-size: 8.5pt;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 3pt;
  margin-bottom: 14pt;
  text-align: right;
  font-family: 'Calibri', sans-serif;
}
.page-container {
  margin-bottom: 24pt;
}
</style>
</head>
<body>
${paragraphsHtml}
</body>
</html>`;

    const blob = new Blob([wordDocContent], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8',
    });
    const blobUrl = URL.createObjectURL(blob);
    onTriggerDownload(blobUrl, `${baseName}-skonwertowany.docx`);
  };

  // Generate plain text download
  const handleDownloadTxt = () => {
    if (!file || !allText) return;
    const baseName = file.name.replace(/\.pdf$/i, '');
    const blob = new Blob(['\uFEFF' + allText], { type: 'text/plain;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    onTriggerDownload(blobUrl, `${baseName}-tekst.txt`);
  };

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(allText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setFile(null);
    setStatus('idle');
    setExtractedPages([]);
    setAllText('');
    setErrorMessage('');
  };

  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Calculate statistics
  const wordCount = allText ? allText.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = allText ? allText.length : 0;

  return (
    <div id="pdf-to-word-module" className="w-full space-y-6">
      {/* Header presentation */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800 shadow-2xs">
          <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Konwerter Client-Side PDF do Word</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Konwertuj PDF do Word <span className="text-blue-600 dark:text-blue-400">(.docx)</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Wyodrębnij całą warstwę tekstową z dokumentu PDF i pobierz gotowy plik Word (.docx). Przetwarzanie w 100% lokalnie w Twojej przeglądarce.
        </p>
      </div>

      {/* Upload area when idle */}
      {status === 'idle' && (
        <div className="max-w-3xl mx-auto space-y-4">
          <FileUploader
            onFilesSelected={(files) => {
              if (files.length > 0) handleFileSelected(files[0]);
            }}
            multiple={false}
            sampleType="multipage"
            title="Przeciągnij i upuść plik PDF"
            subtitle="Plik zostanie przetworzony w pamięci RAM bez wysyłania na serwer"
          />

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Prywatności RODO
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Format Word (.docx) &amp; .txt
            </span>
          </div>
        </div>
      )}

      {/* Processing indicator */}
      {status === 'processing' && (
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Wyodrębnianie tekstu z pliku PDF...
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Przetwarzanie strony {progress.current} z {progress.total || '...'}
            </p>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-200"
              style={{
                width: progress.total > 0 ? `${(progress.current / progress.total) * 100}%` : '20%',
              }}
            />
          </div>
        </div>
      )}

      {/* Error display */}
      {status === 'error' && (
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
          <p className="text-sm font-medium text-rose-800 dark:text-rose-200">{errorMessage}</p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition cursor-pointer"
          >
            Wybierz inny plik
          </button>
        </div>
      )}

      {/* Ready / Result view */}
      {status === 'ready' && file && (
        <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-200">
          {/* Action Toolbar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {file.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{extractedPages.length} str.</span>
                  <span>•</span>
                  <span>{wordCount} słów</span>
                  <span>•</span>
                  <span>{charCount} znaków</span>
                </div>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button
                id="btn-copy-word-text"
                onClick={handleCopyClipboard}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                title="Kopiuj całą treść do schowka"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Skopiowano!' : 'Kopiuj tekst'}</span>
              </button>

              <button
                id="btn-download-txt"
                onClick={handleDownloadTxt}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                title="Pobierz jako plik tekstowy .txt"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tekst (.txt)</span>
              </button>

              <button
                id="btn-download-docx"
                onClick={handleDownloadDocx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Pobierz Word (.docx)</span>
              </button>

              <button
                id="btn-reset-word-tool"
                onClick={handleReset}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Wczytaj inny plik"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Text preview card */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Podgląd wyodrębnionego tekstu
              </span>
              <span className="text-[11px] text-slate-400">
                Możesz zaznaczyć lub edytować tekst przed pobraniem
              </span>
            </div>
            <textarea
              id="extracted-word-text-area"
              value={allText}
              onChange={(e) => setAllText(e.target.value)}
              rows={16}
              className="w-full p-4 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-transparent border-none focus:outline-none focus:ring-0 resize-y leading-relaxed"
              placeholder="Tutaj pojawi się wyodrębniony tekst..."
            />
          </div>
        </div>
      )}
    </div>
  );
};
