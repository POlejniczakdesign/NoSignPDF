import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Loader2,
  Table as TableIcon,
  AlertCircle,
  Settings2,
} from 'lucide-react';
import { pdfjsLib } from '../../lib/pdfjs';
import { FileUploader } from '../FileUploader';
import { useLanguage } from '../../i18n/LanguageContext';

interface PdfToExcelConverterProps {
  initialFiles?: { name: string; bytes: Uint8Array; size: number }[];
  onTriggerDownload: (blobUrl: string, fileName: string) => void;
}

export const PdfToExcelConverter: React.FC<PdfToExcelConverterProps> = ({
  initialFiles,
  onTriggerDownload,
}) => {
  const { t } = useLanguage();
  const [file, setFile] = useState<{ name: string; bytes: Uint8Array; size: number } | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'ready' | 'error'>('idle');
  const [progress, setProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const [tableRows, setTableRows] = useState<string[][]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [delimiter, setDelimiter] = useState<';' | ','>(';'); // Semicolon is default for Polish/EU Excel

  useEffect(() => {
    if (initialFiles && initialFiles.length > 0 && !file) {
      handleFileSelected(initialFiles[0]);
    }
  }, [initialFiles]);

  const handleFileSelected = (selectedFile: { name: string; bytes: Uint8Array; size: number }) => {
    setFile(selectedFile);
    processPdfToExcel(selectedFile);
  };

  const processPdfToExcel = async (targetFile: { name: string; bytes: Uint8Array; size: number }) => {
    setStatus('processing');
    setErrorMessage('');
    setProgress({ current: 0, total: 0 });

    try {
      const loadingTask = pdfjsLib.getDocument({
        data: targetFile.bytes,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@6.3.289/cmaps/',
        cMapPacked: true,
      });

      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      setProgress({ current: 0, total: numPages });

      const allExtractedRows: string[][] = [];

      for (let i = 1; i <= numPages; i++) {
        setProgress({ current: i, total: numPages });
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const rawItems = (textContent.items || []).filter(
          (item: any) => typeof item.str === 'string' && item.str.trim().length > 0
        ) as any[];

        // Group into lines by Y coordinate (tolerance ~3.5pt)
        const lineGroups: { y: number; items: any[] }[] = [];

        for (const item of rawItems) {
          const y = item.transform[5];
          let group = lineGroups.find((g) => Math.abs(g.y - y) <= 3.5);
          if (!group) {
            group = { y, items: [] };
            lineGroups.push(group);
          }
          group.items.push(item);
        }

        // Sort rows top-to-bottom (descending Y)
        lineGroups.sort((a, b) => b.y - a.y);

        // Process each line into columns
        for (const group of lineGroups) {
          // Sort items horizontally left-to-right (ascending X)
          group.items.sort((a, b) => a.transform[4] - b.transform[4]);

          const rowCells: string[] = [];

          // Determine column cells by analyzing horizontal gaps between text items
          for (let idx = 0; idx < group.items.length; idx++) {
            const currentItem = group.items[idx];
            const text = currentItem.str.trim();

            if (rowCells.length === 0) {
              rowCells.push(text);
            } else {
              const prevItem = group.items[idx - 1];
              const prevEndX = prevItem.transform[4] + (prevItem.width || prevItem.str.length * 5);
              const currentX = currentItem.transform[4];
              const gap = currentX - prevEndX;

              // If gap is greater than 14pt or text has tab/multiple spaces, consider it a new table column
              if (gap > 14) {
                rowCells.push(text);
              } else {
                // Merge with previous cell if close together
                rowCells[rowCells.length - 1] += ' ' + text;
              }
            }
          }

          // If a row has only 1 long cell with multiple spaces or tabs, split it
          const expandedCells: string[] = [];
          for (const cell of rowCells) {
            if (cell.includes('\t')) {
              expandedCells.push(...cell.split('\t'));
            } else if (/\s{3,}/.test(cell)) {
              // 3 or more spaces usually represent table column gaps in text
              expandedCells.push(...cell.split(/\s{3,}/));
            } else {
              expandedCells.push(cell);
            }
          }

          if (expandedCells.length > 0 && expandedCells.some((c) => c.trim().length > 0)) {
            allExtractedRows.push(expandedCells.map((c) => c.trim()));
          }
        }
      }

      // Normalize row column counts so table looks rectangular
      const maxCols = Math.max(...allExtractedRows.map((r) => r.length), 1);
      const normalizedRows = allExtractedRows.map((r) => {
        const padded = [...r];
        while (padded.length < maxCols) {
          padded.push('');
        }
        return padded;
      });

      setTableRows(normalizedRows);
      setStatus('ready');
    } catch (err: any) {
      console.error('Błąd ekstrakcji tabel z PDF:', err);
      setErrorMessage(
        'Nie udało się wyodrębnić tabeli z tego dokumentu. Upewnij się, że plik PDF nie jest zabezpieczony hasłem i zawiera tekst cyfrowy.'
      );
      setStatus('error');
    }
  };

  // Format cell for CSV with quotes if needed
  const escapeCsvCell = (cell: string, sep: string): string => {
    if (!cell) return '';
    if (cell.includes(sep) || cell.includes('"') || cell.includes('\n') || cell.includes('\r')) {
      return `"${cell.replace(/"/g, '""')}"`;
    }
    return cell;
  };

  // Generate Excel CSV file with UTF-8 BOM
  const handleDownloadCsv = () => {
    if (!file || tableRows.length === 0) return;

    // Excel on Windows requires UTF-8 BOM (\uFEFF) to display Polish characters (ą, ć, ę, ł, ń, ó, ś, ź, ż) properly
    const csvContent =
      '\uFEFF' +
      tableRows
        .map((row) => row.map((cell) => escapeCsvCell(cell, delimiter)).join(delimiter))
        .join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const blobUrl = URL.createObjectURL(blob);
    const baseName = file.name.replace(/\.pdf$/i, '');
    onTriggerDownload(blobUrl, `${baseName}-arkusz.csv`);
  };

  // Copy table to clipboard in TSV (Tab Separated Values) format for pasting directly into Excel/Sheets
  const handleCopyTable = async () => {
    if (tableRows.length === 0) return;

    const tsvContent = tableRows.map((row) => row.join('\t')).join('\n');
    try {
      await navigator.clipboard.writeText(tsvContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setFile(null);
    setStatus('idle');
    setTableRows([]);
    setErrorMessage('');
  };

  const colCount = tableRows.length > 0 ? tableRows[0].length : 0;
  const rowCount = tableRows.length;

  return (
    <div id="pdf-to-excel-module" className="w-full space-y-6">
      {/* Title presentation */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 shadow-2xs">
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Konwerter Client-Side PDF do Excel</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Konwertuj PDF do Excel <span className="text-emerald-600 dark:text-emerald-400">(.csv)</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Wyciągaj tabele, wiersze i kolumny z dokumentów PDF do formatu CSV zgodnego z Microsoft Excel (kodowanie UTF-8 BOM).
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
            title="Przeciągnij i upuść plik PDF z tabelą"
            subtitle="Rozpoznawanie siatki danych odbywa się w 100% lokalnie w Twojej przeglądarce"
          />

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Bezpieczeństwo danych finansowych
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Zgodność z Microsoft Excel &amp; Sheets
            </span>
          </div>
        </div>
      )}

      {/* Processing indicator */}
      {status === 'processing' && (
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Analizowanie struktury tabeli w PDF...
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Przetwarzanie strony {progress.current} z {progress.total || '...'}
            </p>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-200"
              style={{
                width: progress.total > 0 ? `${(progress.current / progress.total) * 100}%` : '20%',
              }}
            />
          </div>
        </div>
      )}

      {/* Error state */}
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

      {/* Ready / Table result */}
      {status === 'ready' && file && (
        <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in duration-200">
          {/* Action Toolbar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 shrink-0">
                <TableIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {file.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{rowCount} wierszy</span>
                  <span>•</span>
                  <span>{colCount} kolumn</span>
                  <span>•</span>
                  <span>UTF-8 BOM</span>
                </div>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {/* Delimiter selector */}
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-xs">
                <Settings2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500">Separator:</span>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value as ';' | ',')}
                  className="bg-transparent font-semibold text-slate-700 dark:text-slate-200 text-xs focus:outline-none cursor-pointer"
                >
                  <option value=";">Średnik (;) – Excel PL</option>
                  <option value=",">Przecinek (,) – Standard</option>
                </select>
              </div>

              <button
                id="btn-copy-excel-table"
                onClick={handleCopyTable}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                title="Kopiuj całą tabelę (możesz wkleić do Excela lub Google Sheets)"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Skopiowano!' : 'Kopiuj tabelę'}</span>
              </button>

              <button
                id="btn-download-csv"
                onClick={handleDownloadCsv}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Pobierz Excel (.csv)</span>
              </button>

              <button
                id="btn-reset-excel-tool"
                onClick={handleReset}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Wczytaj inny plik"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Table Preview */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Podgląd wyodrębnionej tabeli
              </span>
              <span className="text-[11px] text-slate-400">
                Wyświetlono {Math.min(rowCount, 100)} z {rowCount} wierszy
              </span>
            </div>

            <div className="max-h-[500px] overflow-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 sticky top-0 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-3 py-2 w-10 text-center text-slate-400 font-mono text-[10px] border-r border-slate-200 dark:border-slate-700">
                      #
                    </th>
                    {tableRows[0]?.map((_, colIdx) => (
                      <th
                        key={colIdx}
                        className="px-3 py-2 font-medium border-r border-slate-200 dark:border-slate-700 last:border-r-0"
                      >
                        Kolumna {colIdx + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
                  {tableRows.slice(0, 100).map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={rIdx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-900/50'}
                    >
                      <td className="px-3 py-1.5 text-center text-slate-400 text-[10px] border-r border-slate-200 dark:border-slate-800">
                        {rIdx + 1}
                      </td>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="px-3 py-1.5 text-slate-800 dark:text-slate-200 border-r border-slate-100 dark:border-slate-800/60 last:border-r-0 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs"
                          title={cell}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
