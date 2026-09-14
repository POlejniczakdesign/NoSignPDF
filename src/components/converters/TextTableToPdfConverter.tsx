import React, { useState, useRef } from 'react';
import {
  FileUp,
  Table as TableIcon,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  FileText,
  Loader2,
  FileSpreadsheet,
  Settings,
  AlignLeft,
  Columns,
} from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { loadMonospaceFontBytes, sanitizePolishCharsForWinAnsi } from '../../lib/pdfOperations';

interface TextTableToPdfConverterProps {
  mode: 'word' | 'excel';
  onTriggerDownload: (blobUrl: string, fileName: string) => void;
}

const SAMPLE_WORD_TEXT = `UMOWA O ŚWIADCZENIE USŁUG

Zawarta w dniu 14 września 2026 r. w Warszawie pomiędzy:
1. Zleceniodawcą: Tech Solutions Sp. z o.o. z siedzibą w Warszawie, ul. Marszałkowska 10, NIP: 5250000000.
2. Zleceniobiorcą: Janem Kowalskim, zamieszkałym w Krakowie, ul. Floriańska 12.

§ 1. Przedmiot umowy
1. Zleceniobiorca zobowiązuje się do wykonania audytu bezpieczeństwa oprogramowania oraz optymalizacji baz danych.
2. Usługi będą świadczone z zachowaniem najwyższej staranności zawodowej.

§ 2. Wynagrodzenie
1. Za wykonanie przedmiotu umowy Zleceniodawca zapłaci Zleceniobiorcy wynagrodzenie w kwocie 8 500,00 PLN netto.
2. Płatność nastąpi na rachunek bankowy Zleceniobiorcy w terminie 14 dni od doręczenia faktury VAT.

§ 3. Postanowienia końcowe
Wszelkie zmiany niniejszej umowy wymagają formy pisemnej pod rygorem nieważności.

Podpisy stron:
....................................                ....................................
       Zleceniodawca                                       Zleceniobiorca`;

const SAMPLE_EXCEL_DATA = `Lp.\tNazwa towaru / usługi\tIlość\tCena jedn. netto\tWartość netto\tStawka VAT\tWartość brutto
1\tAudyt bezpieczeństwa systemów IT\t1 szt.\t4 500,00 zł\t4 500,00 zł\t23%\t5 535,00 zł
2\tOptymalizacja wydajności bazy danych\t20 godz.\t180,00 zł\t3 600,00 zł\t23%\t4 428,00 zł
3\tWdrożenie certyfikatu SSL & DNS\t1 usł.\t650,00 zł\t650,00 zł\t23%\t799,50 zł
4\tSzkolenie zespołu z cyberbezpieczeństwa\t1 sesja\t2 200,00 zł\t2 200,00 zł\t23%\t2 706,00 zł
5\tWsparcie techniczne SLA (miesięczne)\t1 mies.\t1 500,00 zł\t1 500,00 zł\t23%\t1 845,00 zł
Razem\tSuma do zapłaty\t-\t-\t12 450,00 zł\t-\t15 313,50 zł`;

export const TextTableToPdfConverter: React.FC<TextTableToPdfConverterProps> = ({
  mode,
  onTriggerDownload,
}) => {
  const [content, setContent] = useState<string>(
    mode === 'word' ? SAMPLE_WORD_TEXT : SAMPLE_EXCEL_DATA
  );
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    mode === 'excel' ? 'landscape' : 'portrait'
  );
  const [fontSize, setFontSize] = useState<number>(mode === 'excel' ? 9 : 11);
  const [lineSpacing, setLineSpacing] = useState<number>(1.4);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload reader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setContent(text);
      }
    };
    reader.readAsText(uploadedFile);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate PDF document using pdf-lib and Roboto Mono font
  const handleGeneratePdf = async () => {
    if (!content.trim()) return;
    setIsGenerating(true);

    try {
      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit);

      // Load Roboto Mono / Courier TTF supporting Polish letters
      let font: any;
      let fontIsUnicode = false;

      try {
        const fontBytes = await loadMonospaceFontBytes(false);
        font = await pdfDoc.embedFont(fontBytes);
        fontIsUnicode = true;
      } catch (err) {
        console.warn('Nie udało się załadować fontu TTF z sieci, użyto fallbacku WinAnsi:', err);
        font = await pdfDoc.embedFont(StandardFonts.Courier);
        fontIsUnicode = false;
      }

      // Page dimensions in PDF points (A4: 595.28 x 841.89)
      const isLandscape = orientation === 'landscape';
      const pageWidth = isLandscape ? 841.89 : 595.28;
      const pageHeight = isLandscape ? 595.28 : 841.89;

      const margin = 36; // 0.5 inch margins
      const printableWidth = pageWidth - 2 * margin;
      const printableHeight = pageHeight - 2 * margin;
      const lineHeight = fontSize * lineSpacing;

      let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      let currentY = pageHeight - margin - fontSize;

      const sanitize = (str: string) => {
        return fontIsUnicode ? str : sanitizePolishCharsForWinAnsi(str);
      };

      if (mode === 'word') {
        // --- WORD MODE: Paragraph and word wrapping ---
        const paragraphs = content.split(/\r?\n/);

        for (const rawParagraph of paragraphs) {
          if (rawParagraph.trim().length === 0) {
            // Empty line
            currentY -= lineHeight * 0.8;
            if (currentY < margin + lineHeight) {
              currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
              currentY = pageHeight - margin - fontSize;
            }
            continue;
          }

          // Split paragraph into words and wrap to printable width
          const words = rawParagraph.split(' ');
          let currentLine = '';

          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const textToMeasure = sanitize(testLine);

            let textWidth = 0;
            try {
              textWidth = font.widthOfTextAtSize(textToMeasure, fontSize);
            } catch {
              textWidth = testLine.length * (fontSize * 0.6);
            }

            if (textWidth <= printableWidth) {
              currentLine = testLine;
            } else {
              // Print current line and start a new one
              if (currentLine) {
                currentPage.drawText(sanitize(currentLine), {
                  x: margin,
                  y: currentY,
                  size: fontSize,
                  font,
                  color: rgb(0.1, 0.1, 0.15),
                });

                currentY -= lineHeight;
                if (currentY < margin + lineHeight) {
                  currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                  currentY = pageHeight - margin - fontSize;
                }
              }
              currentLine = word;
            }
          }

          if (currentLine) {
            currentPage.drawText(sanitize(currentLine), {
              x: margin,
              y: currentY,
              size: fontSize,
              font,
              color: rgb(0.1, 0.1, 0.15),
            });

            currentY -= lineHeight;
            if (currentY < margin + lineHeight) {
              currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
              currentY = pageHeight - margin - fontSize;
            }
          }
        }
      } else {
        // --- EXCEL MODE: Formatted Table Grid ---
        const rawLines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
        const parsedRows: string[][] = rawLines.map((line) => {
          if (line.includes('\t')) return line.split('\t');
          if (line.includes(';') && !line.includes('\t')) return line.split(';');
          return line.split(/\s{2,}/); // fallback to double spaces
        });

        const numCols = Math.max(...parsedRows.map((r) => r.length), 1);

        // Calculate max column width proportions
        const colWidth = printableWidth / numCols;
        const rowHeight = lineHeight + 6;

        for (let rIdx = 0; rIdx < parsedRows.length; rIdx++) {
          const row = parsedRows[rIdx];
          const isHeader = rIdx === 0;

          // Check if page full
          if (currentY - rowHeight < margin) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
            currentY = pageHeight - margin - fontSize;
          }

          // Header or zebra background
          if (isHeader) {
            currentPage.drawRectangle({
              x: margin,
              y: currentY - rowHeight + 4,
              width: printableWidth,
              height: rowHeight,
              color: rgb(0.92, 0.94, 0.96),
            });
          } else if (rIdx % 2 === 1) {
            currentPage.drawRectangle({
              x: margin,
              y: currentY - rowHeight + 4,
              width: printableWidth,
              height: rowHeight,
              color: rgb(0.98, 0.98, 0.99),
            });
          }

          // Draw cells
          for (let cIdx = 0; cIdx < numCols; cIdx++) {
            const cellText = row[cIdx]?.trim() || '';
            const cellX = margin + cIdx * colWidth + 4;
            const maxChars = Math.floor(colWidth / (fontSize * 0.6));
            const truncated =
              cellText.length > maxChars ? cellText.substring(0, maxChars - 2) + '..' : cellText;

            currentPage.drawText(sanitize(truncated), {
              x: cellX,
              y: currentY - rowHeight + 8,
              size: isHeader ? fontSize : fontSize - 0.5,
              font,
              color: isHeader ? rgb(0.05, 0.1, 0.2) : rgb(0.15, 0.15, 0.2),
            });
          }

          // Horizontal row border
          currentPage.drawLine({
            start: { x: margin, y: currentY - rowHeight + 4 },
            end: { x: margin + printableWidth, y: currentY - rowHeight + 4 },
            thickness: isHeader ? 1 : 0.5,
            color: rgb(0.8, 0.85, 0.9),
          });

          currentY -= rowHeight;
        }
      }

      // Add page numbers in footer
      const totalPages = pdfDoc.getPageCount();
      for (let p = 0; p < totalPages; p++) {
        const pObj = pdfDoc.getPage(p);
        const footerText = sanitize(`Strona ${p + 1} z ${totalPages}`);
        pObj.drawText(footerText, {
          x: pageWidth - margin - 70,
          y: margin - 14,
          size: 8,
          font,
          color: rgb(0.5, 0.55, 0.6),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const fileName =
        mode === 'word' ? 'dokument-z-word.pdf' : 'arkusz-tabela-z-excel.pdf';
      onTriggerDownload(blobUrl, fileName);
    } catch (err: any) {
      console.error('Błąd generowania PDF:', err);
      alert('Wystąpił błąd podczas generowania pliku PDF. Sprawdź wprowadzone dane.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetToSample = () => {
    setContent(mode === 'word' ? SAMPLE_WORD_TEXT : SAMPLE_EXCEL_DATA);
  };

  return (
    <div id={`${mode}-to-pdf-module`} className="w-full space-y-6">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800 shadow-2xs">
          {mode === 'word' ? (
            <FileUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <TableIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          )}
          <span>
            {mode === 'word' ? 'Wklejacz Word do PDF' : 'Wklejacz Tabeli Excel do PDF'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {mode === 'word' ? (
            <>
              Konwertuj Word do PDF <span className="text-indigo-600 dark:text-indigo-400">(Roboto Mono)</span>
            </>
          ) : (
            <>
              Konwertuj Excel do PDF <span className="text-indigo-600 dark:text-indigo-400">(Tabela &amp; Raport)</span>
            </>
          )}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          {mode === 'word'
            ? 'Wklej tekst z programu Word lub wczytaj plik, a aplikacja wygeneruje nowy dokument PDF czcionką Roboto Mono.'
            : 'Wklej skopiowane komórki z programu Excel lub arkusza Google Sheets, aby wygenerować profesjonalną tabelę w PDF.'}
        </p>
      </div>

      {/* Main Formatter & Editor */}
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Controls Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          {/* Format toggles */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {/* Orientation */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setOrientation('portrait')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  orientation === 'portrait'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Pionowa
              </button>
              <button
                type="button"
                onClick={() => setOrientation('landscape')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  orientation === 'landscape'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Pozioma
              </button>
            </div>

            {/* Font size */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
              <span className="text-slate-400">Czcionka:</span>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-transparent font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value={8}>8 pt (Mała)</option>
                <option value={9}>9 pt (Tabela)</option>
                <option value={10}>10 pt (Standard)</option>
                <option value={11}>11 pt (Czytelna)</option>
                <option value={12}>12 pt (Duża)</option>
              </select>
            </div>

            {/* Line spacing */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
              <span className="text-slate-400">Interlinia:</span>
              <select
                value={lineSpacing}
                onChange={(e) => setLineSpacing(Number(e.target.value))}
                className="bg-transparent font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value={1.2}>1.2x (Zwięzła)</option>
                <option value={1.4}>1.4x (Optymalna)</option>
                <option value={1.6}>1.6x (Szeroka)</option>
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.rtf,.doc,.docx,.csv,.tsv"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Wgraj plik tekstowy z dysku"
            >
              <FileUp className="w-3.5 h-3.5" />
              <span>Wgraj plik</span>
            </button>

            <button
              type="button"
              onClick={handleResetToSample}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Wstaw przykładowy tekst lub tabelę"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Wzór</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Kopiuj zawartość do schowka"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Text / Table Editor Container */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <AlignLeft className="w-3.5 h-3.5 text-indigo-500" />
              {mode === 'word' ? 'Edytor tekstu (Wklej z Worda)' : 'Edytor tabeli (Wklej z Excela)'}
            </span>
            <span className="text-[11px] text-slate-400">
              {content.length} znaków • {content.split(/\s+/).filter(Boolean).length} słów
            </span>
          </div>

          <textarea
            id={`${mode}-text-editor-input`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full p-4 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 bg-transparent border-none focus:outline-none focus:ring-0 resize-y leading-relaxed"
            placeholder={
              mode === 'word'
                ? 'Wklej tutaj skopiowany tekst z programu Microsoft Word (Ctrl+V)...'
                : 'Wklej tutaj skopiowane komórki z programu Excel lub Google Sheets (Ctrl+V)...'
            }
          />
        </div>

        {/* Generate and Download Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">Czcionka: Roboto Mono</span>
            <span className="mx-2">•</span>
            <span>Pełne wsparcie dla polskich liter (ą, ć, ę, ł, ń, ó, ś, ź, ż)</span>
          </div>

          <button
            id={`btn-generate-pdf-${mode}`}
            onClick={handleGeneratePdf}
            disabled={isGenerating || !content.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-xs hover:shadow-md transition cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Renderowanie PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generuj i pobierz PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
