import React, { useState, useEffect, useRef } from 'react';
import {
  Type,
  Trash2,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckSquare,
  MousePointer,
  Sparkles,
  Info,
  Check,
  ShieldCheck,
  AlertCircle,
  FileSignature,
  Magnet,
} from 'lucide-react';
import {
  getPdfjsDoc,
  detectAcroFormFields,
  saveDocumentWithAcroFields,
  processPdfUpload,
  ProcessedPdfResult,
  PageRenderDim,
  FallbackInputField,
  checkPdfHasXfa,
  saveDocumentInFallbackMode,
} from '../lib/pdfOperations';
import { snapToGridBox, DetectedGridBox } from '../lib/gridSnapping';
import { AcroFormFieldItem } from '../types';
import { FileUploader } from './FileUploader';
import { useLanguage } from '../i18n/LanguageContext';

interface FormFillerModuleProps {
  onTriggerDownload: (bytes: Uint8Array, fileName: string) => void;
}

type ActiveTool = 'pointer' | 'text' | 'checkbox';

export const FormFillerModule: React.FC<FormFillerModuleProps> = ({ onTriggerDownload }) => {
  const { t } = useLanguage();

  const [fileBytes, setFileBytes] = useState<Uint8Array | null>(null);
  const [originalRawBytes, setOriginalRawBytes] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>('formularz.pdf');
  const [pageCount, setPageCount] = useState<number>(0);
  const [activeTool, setActiveTool] = useState<ActiveTool>('text');
  const [zoomScale, setZoomScale] = useState<number>(1.15);
  const [currentFontSize, setCurrentFontSize] = useState<number>(12);

  // Smart Grid Snapping State
  const [enableGridSnapping, setEnableGridSnapping] = useState<boolean>(true);
  const [snappedFeedback, setSnappedFeedback] = useState<string | null>(null);

  // Fallback Mode State (Canvas Overlay + page.drawText)
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(true);
  const [fallbackFields, setFallbackFields] = useState<FallbackInputField[]>([]);

  // Native AcroForm State (for standard forms)
  const [fields, setFields] = useState<AcroFormFieldItem[]>([]);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [isConvertingXfa, setIsConvertingXfa] = useState<boolean>(false);
  const [xfaNotice, setXfaNotice] = useState<string | null>(null);

  // Auto-dismiss snapped feedback toast
  useEffect(() => {
    if (!snappedFeedback) return;
    const timer = setTimeout(() => {
      setSnappedFeedback(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [snappedFeedback]);

  // References to rendered page containers
  const pageContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pageCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [pageDimensions, setPageDimensions] = useState<PageRenderDim[]>([]);

  /**
   * Main File Loading Pipeline
   * 1. Check if file has Adobe XFA structure or throws on standard load
   * 2. If XFA detected, immediately activate TRYB AWARYJNY (Fallback Mode)
   * 3. In Fallback Mode, render pages via pdfjs to Canvas as static background,
   *    and overlay transparent HTML layer where clicking creates <input> elements
   */
  const handleFileLoaded = async (rawBytes: Uint8Array, name: string) => {
    setIsConvertingXfa(true);
    setXfaNotice(null);
    setFallbackFields([]);
    setFields([]);
    setActiveFieldId(null);

    try {
      // Step 1: Check XFA structure
      const hasXfa = await checkPdfHasXfa(rawBytes);

      // Step 2: Try to open with pdfjs-dist with { enableXfa: true }
      let pdfjsCanRender = false;
      try {
        const probeDoc = await getPdfjsDoc(rawBytes, `probe_${Date.now()}`);
        if (probeDoc && probeDoc.numPages > 0) {
          pdfjsCanRender = true;
        }
      } catch (probeErr) {
        console.warn('pdfjs-dist standard load threw an error:', probeErr);
        pdfjsCanRender = false;
      }

      // If XFA or loading fails, immediately activate TRYB AWARYJNY
      if (hasXfa || !pdfjsCanRender) {
        console.log('[PDF Studio] Adobe XFA structure detected -> activating TRYB AWARYJNY');
        setIsFallbackMode(true);

        const processed: ProcessedPdfResult = await processPdfUpload(rawBytes, name);
        setFileBytes(processed.bytes);
        setOriginalRawBytes(rawBytes);
        setFileName(processed.fileName.endsWith('.pdf') ? processed.fileName : `${processed.fileName}.pdf`);
        setXfaNotice(
          'Wykryto oficjalny formularz urzędowy Adobe XFA (np. PCC-3). Uruchomiono Tryb Awaryjny (Canvas Fallback Rendering). Kliknij w dowolne puste kratki formularza, aby wpisać tekst!'
        );
        setActiveTool('text');
        return;
      }

      // Step 3: Not XFA -> Check for native AcroForm fields
      const detected = await detectAcroFormFields(rawBytes);
      if (detected.length > 0) {
        setIsFallbackMode(false);
        setFields(detected);
        setFileBytes(rawBytes);
        setOriginalRawBytes(rawBytes);
        setFileName(name.endsWith('.pdf') ? name : `${name}.pdf`);
        setActiveTool('pointer');
      } else {
        // Flat scan or form without AcroForms: activate Fallback Mode
        setIsFallbackMode(true);
        setFileBytes(rawBytes);
        setOriginalRawBytes(rawBytes);
        setFileName(name.endsWith('.pdf') ? name : `${name}.pdf`);
        setActiveTool('text');
      }
    } catch (e) {
      console.warn('Error during PDF loading, forcing Fallback Mode:', e);
      setIsFallbackMode(true);
      const processed = await processPdfUpload(rawBytes, name);
      setFileBytes(processed.bytes);
      setOriginalRawBytes(rawBytes);
      setFileName(name);
      setActiveTool('text');
    } finally {
      setIsDetecting(false);
      setIsConvertingXfa(false);
    }
  };

  // Render all pages with pdfjsLib onto HTML5 Canvas elements
  useEffect(() => {
    if (!fileBytes) return;

    let isMounted = true;

    const renderAllPages = async () => {
      try {
        const doc = await getPdfjsDoc(fileBytes, `render_${zoomScale}_${fileBytes.byteLength}`);
        if (!isMounted) return;

        setPageCount(doc.numPages);
        const dims: PageRenderDim[] = [];

        for (let i = 0; i < doc.numPages; i++) {
          const page = await doc.getPage(i + 1);
          const unscaledViewport = page.getViewport({ scale: 1.0 });
          const viewport = page.getViewport({ scale: zoomScale });

          const canvas = pageCanvasRefs.current[i];
          if (!canvas) continue;

          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);

          const ctx = canvas.getContext('2d');
          if (!ctx) continue;

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await (page.render as any)({
            canvasContext: ctx,
            viewport,
            canvas,
          }).promise;

          dims.push({
            pageIndex: i,
            domWidth: viewport.width,
            domHeight: viewport.height,
            pdfWidth: unscaledViewport.width,
            pdfHeight: unscaledViewport.height,
          });
        }

        if (isMounted) {
          setPageDimensions(dims);
        }
      } catch (err) {
        console.error('Failed to render PDF pages in viewer:', err);
      }
    };

    renderAllPages();

    return () => {
      isMounted = false;
    };
  }, [fileBytes, zoomScale]);

  /**
   * Fallback Mode: User clicks anywhere on transparent overlay
   * Uses Smart Grid Snapping to detect printed bounding boxes, checkboxes,
   * or digit cells (NIP, PESEL, Date) and align text perfectly.
   */
  const handleFallbackOverlayClick = (pageIndex: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === 'pointer') return;

    // If clicking on an existing field, don't create a new one
    const target = e.target as HTMLElement;
    if (target.closest('.fallback-field-item')) return;

    const container = pageContainerRefs.current[pageIndex];
    const canvas = pageCanvasRefs.current[pageIndex];
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let fieldX = Math.max(0, Math.round(clickX));
    let fieldY = Math.max(0, Math.round(clickY - 10));
    let boxWidth = 140;
    let boxHeight = 22;
    let isSquare = false;
    let isCharCell = false;
    let cellWidth = 22;
    let isGridCell = false;
    let fieldType: 'text' | 'checkbox' = activeTool === 'checkbox' ? 'checkbox' : 'text';

    // 1. & 2. Smart Grid Snapping (Bounding Boxes detection on canvas)
    if (enableGridSnapping && canvas) {
      const snapped = snapToGridBox(canvas, clickX, clickY, 35);
      if (snapped.found) {
        boxWidth = snapped.width;
        boxHeight = snapped.height;
        isSquare = snapped.isSquare;
        isCharCell = snapped.isCharCell;
        cellWidth = snapped.cellWidth;

        if (activeTool === 'checkbox' || isSquare) {
          // Checkbox square: center 'X' precisely in the detected box
          fieldType = 'checkbox';
          fieldX = snapped.x;
          fieldY = snapped.y;
          setSnappedFeedback(`Przyciągnięto do kratki wyboru (${boxWidth}×${boxHeight}px)`);
        } else if (isCharCell) {
          // Character cells (e.g. NIP, PESEL, date DD-MM-YYYY)
          fieldX = snapped.x;
          fieldY = snapped.y;
          isGridCell = true;
          setSnappedFeedback(`Przyciągnięto do serii kratek (komórka: ${cellWidth}px)`);
        } else {
          // General rectangular entry box
          fieldX = snapped.x + 3;
          fieldY = snapped.y + Math.max(1, (boxHeight - 20) / 2);
          isGridCell = false;
          setSnappedFeedback(`Przyciągnięto do ramki pola (${boxWidth}×${boxHeight}px)`);
        }
      }
    }

    const newId = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newField: FallbackInputField = {
      id: newId,
      pageIndex,
      domX: fieldX,
      domY: fieldY,
      domCanvasWidth: rect.width,
      domCanvasHeight: rect.height,
      text: '',
      fontSize: currentFontSize,
      type: fieldType,
      checked: fieldType === 'checkbox',
      boxWidth,
      boxHeight,
      isGridCell,
      cellWidth,
    };

    setFallbackFields((prev) => [...prev, newField]);
    setActiveFieldId(newId);
  };

  const handleToggleGridCell = (id: string) => {
    setFallbackFields((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const willBeGrid = !f.isGridCell;
        return {
          ...f,
          isGridCell: willBeGrid,
          cellWidth: f.cellWidth || 22,
        };
      })
    );
  };

  const handleUpdateFallbackText = (id: string, text: string) => {
    setFallbackFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, text } : f))
    );
  };

  const handleToggleFallbackCheckbox = (id: string) => {
    setFallbackFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
    );
  };

  const handleDeleteFallbackField = (id: string) => {
    setFallbackFields((prev) => prev.filter((f) => f.id !== id));
    if (activeFieldId === id) setActiveFieldId(null);
  };

  /**
   * Native AcroForm Handlers (Standard Mode)
   */
  const handlePageClick = (pageIndex: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === 'pointer') return;

    const target = e.target as HTMLElement;
    if (target.closest('.acro-field-container')) return;

    const container = pageContainerRefs.current[pageIndex];
    const dim = pageDimensions.find((d) => d.pageIndex === pageIndex);
    if (!container || !dim) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const scaleX = dim.pdfWidth / dim.domWidth;
    const scaleY = dim.pdfHeight / dim.domHeight;

    const fieldPdfWidth = activeTool === 'checkbox' ? 18 : 180;
    const fieldPdfHeight = activeTool === 'checkbox' ? 18 : 26;

    const pdfX = Math.max(0, clickX * scaleX);
    const pdfY = Math.max(0, dim.pdfHeight - clickY * scaleY - fieldPdfHeight);

    const newFieldId = `field_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newField: AcroFormFieldItem = {
      id: newFieldId,
      name: `field_${fields.length + 1}`,
      type: activeTool === 'checkbox' ? 'checkbox' : 'text',
      pageIndex,
      pdfX,
      pdfY,
      pdfWidth: fieldPdfWidth,
      pdfHeight: fieldPdfHeight,
      value: '',
      checked: false,
      isNew: true,
      fontSize: currentFontSize,
    };

    setFields((prev) => [...prev, newField]);
    setActiveFieldId(newFieldId);
  };

  const handleUpdateFieldValue = (id: string, value: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value } : f))
    );
  };

  const handleToggleCheckbox = (id: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
    );
  };

  const handleDeleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (activeFieldId === id) setActiveFieldId(null);
  };

  /**
   * Saving File
   * Requirement 4: In Fallback Mode, app MUST NOT call getForm().
   * It loads the original document with pdf-lib, and calls page.drawText() with page.getSize() scale!
   */
  const handleSavePdf = async () => {
    if (!fileBytes) return;
    setIsSaving(true);

    try {
      let savedBytes: Uint8Array;
      const baseBytes = originalRawBytes || fileBytes;

      if (isFallbackMode) {
        // Fallback Mode: save via page.drawText() without calling getForm()
        savedBytes = await saveDocumentInFallbackMode(baseBytes, fallbackFields);
      } else {
        // Standard Mode: AcroForm fields
        savedBytes = await saveDocumentWithAcroFields(baseBytes, fields);
      }

      const outName = fileName.replace(/\.pdf$/i, '') + '_wypelniony.pdf';
      onTriggerDownload(savedBytes, outName);
    } catch (err) {
      console.error('Error saving document:', err);
      // Fallback rescue: if AcroForm save fails, use drawText fallback
      try {
        const baseBytes = originalRawBytes || fileBytes;
        const savedBytes = await saveDocumentInFallbackMode(baseBytes, fallbackFields);
        const outName = fileName.replace(/\.pdf$/i, '') + '_wypelniony.pdf';
        onTriggerDownload(savedBytes, outName);
      } catch (err2) {
        alert('Wystąpił błąd podczas zapisywania pliku PDF. Spróbuj ponownie.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDocument = () => {
    if (confirm('Czy na pewno chcesz wyczyścić wprowadzone zmiany i zacząć od nowa?')) {
      setFileBytes(null);
      setOriginalRawBytes(null);
      setFields([]);
      setFallbackFields([]);
      setActiveFieldId(null);
    }
  };

  if (isConvertingXfa) {
    return (
      <div className="w-full max-w-xl mx-auto my-12 p-8 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900 shadow-xl text-center space-y-4">
        <div className="w-12 h-12 mx-auto border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          Analizowanie struktury PDF & konwersja Adobe XFA...
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Przygotowywanie oficjalnego formularza urzędowego (np. PCC-3) do edycji w przeglądarce.
        </p>
      </div>
    );
  }

  if (!fileBytes) {
    return (
      <div className="w-full">
        <FileUploader
          onFilesSelected={(files) => {
            if (files.length > 0) {
              handleFileLoaded(files[0].bytes, files[0].name);
            }
          }}
          onFilesLoaded={(files) => {
            if (files.length > 0) {
              handleFileLoaded(files[0].bytes, files[0].name);
            }
          }}
          multiple={false}
          sampleType="form"
          title={t.formFiller.title}
          subtitle={t.formFiller.tagline}
        />
      </div>
    );
  }

  const activeFieldCount = isFallbackMode ? fallbackFields.length : fields.length;

  return (
    <div id="form-filler-editor" className="flex flex-col gap-4 w-full items-center">
      {/* Adobe XFA Notice Banner if active */}
      {xfaNotice && (
        <div className="w-full max-w-4xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-xs text-zinc-700 dark:text-zinc-300 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              <strong>Tryb edycji:</strong> {xfaNotice}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setXfaNotice(null)}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 px-2 py-0.5 rounded text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. Pasek akcji bezpośrednio nad edytorem (Floating Toolbar) */}
      <div className="sticky top-16 z-30 w-full max-w-4xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl px-3 py-2 shadow-sm flex flex-wrap items-center justify-between gap-3 transition-colors">
        {/* Left: Concise Action Tools */}
        <div className="flex items-center gap-2">
          {/* [Dodaj Tekst] */}
          <button
            id="tool-text-btn"
            type="button"
            onClick={() => setActiveTool('text')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTool === 'text'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-2xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
            title="Wstaw pole tekstowe w formularzu"
          >
            <Type className="w-3.5 h-3.5" />
            <span>Dodaj Tekst</span>
          </button>

          {/* [Wstaw X] */}
          <button
            id="tool-checkbox-btn"
            type="button"
            onClick={() => setActiveTool('checkbox')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTool === 'checkbox'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-2xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
            title="Kliknij, aby wstawić zaznaczenie 'X'"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Wstaw X</span>
          </button>

          {/* [Wyczyść zmiany] */}
          <button
            id="tool-clear-btn"
            type="button"
            onClick={handleResetDocument}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
            title="Wyczyść wprowadzone zmiany i wczytaj nowy plik"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Wyczyść zmiany</span>
          </button>

          {/* Smart Grid Snapping Discreet Toggle */}
          <button
            id="tool-smart-grid-btn"
            type="button"
            onClick={() => setEnableGridSnapping((prev) => !prev)}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              enableGridSnapping
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold'
                : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700'
            }`}
            title="Inteligentne przyciąganie do kratek formularza"
          >
            <Magnet className={`w-3.5 h-3.5 ${enableGridSnapping ? 'text-zinc-900 dark:text-white' : ''}`} />
            <span className="text-[11px]">Kratki {enableGridSnapping ? 'WŁ' : 'WYŁ'}</span>
          </button>
        </div>

        {/* Right: Zoom & Save Action */}
        <div className="flex items-center gap-2.5">
          {/* Snapped Toast Feedback */}
          {snappedFeedback && (
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
              <span>{snappedFeedback}</span>
            </div>
          )}

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.max(0.75, +(z - 0.15).toFixed(2)))}
              className="p-1.5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded transition-colors cursor-pointer"
              title="Pomniejsz"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-2 text-zinc-700 dark:text-zinc-200">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.min(2.0, +(z + 0.15).toFixed(2)))}
              className="p-1.5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded transition-colors cursor-pointer"
              title="Powiększ"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Przycisk główny "Zapisz i pobierz PDF" - duży, wyraźny, czarny w jasnym motywie */}
          <button
            id="save-download-acro-btn"
            type="button"
            onClick={handleSavePdf}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs sm:text-sm font-medium rounded-lg shadow-xs hover:shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Zapisywanie...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Zapisz i pobierz PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace Layout (Focused Workspace: Large, clean area with neutral gray backdrop) */}
      <div className="w-full flex flex-col items-center bg-zinc-100/70 dark:bg-zinc-950/70 p-4 sm:p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-850 overflow-x-auto min-h-[500px]">
        <div className="space-y-6 flex flex-col items-center">
          {Array.from({ length: pageCount }).map((_, pageIdx) => {
            const dim = pageDimensions.find((d) => d.pageIndex === pageIdx);
            const pageAcroFields = fields.filter((f) => f.pageIndex === pageIdx);
            const pageFallbackFields = fallbackFields.filter((f) => f.pageIndex === pageIdx);

            return (
              <div
                key={`page-container-${pageIdx}`}
                className="flex flex-col items-center"
              >
                {/* Page Number Label */}
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Strona {pageIdx + 1} z {pageCount}
                </div>

                {/* Canvas & Interactive Placement Stage */}
                <div
                  ref={(el) => {
                    pageContainerRefs.current[pageIdx] = el;
                  }}
                  id={`page-stage-${pageIdx}`}
                  className="relative bg-white shadow-md hover:shadow-lg rounded-sm border border-zinc-200 dark:border-zinc-800 select-none overflow-hidden transition-shadow"
                >
                  {/* Background Canvas rendered by pdfjs */}
                  <canvas
                    ref={(el) => {
                      pageCanvasRefs.current[pageIdx] = el;
                    }}
                    className="block"
                  />

                  {/* FALLBACK MODE: Transparent HTML Overlay Div */}
                  {isFallbackMode ? (
                    <div
                      className="absolute inset-0 z-10 cursor-crosshair"
                      onClick={(e) => handleFallbackOverlayClick(pageIdx, e)}
                    >
                      {pageFallbackFields.map((field) => {
                        const isActive = activeFieldId === field.id;
                        const scaledFontSize = Math.max(10, Math.round(field.fontSize * (zoomScale / 1.15)));
                        // Courier New monospace average character advance is ~0.60 * fontSize
                        const charAdvance = 0.60 * scaledFontSize;
                        const cellWidth = field.cellWidth || 22;
                        // Calculate letter spacing so each character aligns with the center of successive grid boxes
                        const letterSpacingPx = field.isGridCell && cellWidth > charAdvance
                          ? Math.max(0, cellWidth - charAdvance)
                          : 0;
                        const firstCharPadding = field.isGridCell && cellWidth > charAdvance
                          ? Math.max(2, (cellWidth - charAdvance) / 2)
                          : 4;

                        const inputWidth = field.isGridCell
                          ? Math.max(cellWidth * 2, (field.text.length + 1) * cellWidth)
                          : Math.max(field.boxWidth || 80, Math.max(field.text.length, 1) * charAdvance + 20);

                        return (
                          <div
                            key={field.id}
                            className={`fallback-field-item absolute group transition-all ${
                              isActive ? 'z-30' : 'z-20'
                            }`}
                            style={{
                              left: `${field.domX}px`,
                              top: `${field.domY}px`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveFieldId(field.id);
                            }}
                          >
                            {/* Floating control bar for active field */}
                            {isActive && (
                              <div className="absolute -top-7 left-0 flex items-center gap-1.5 bg-zinc-900/90 text-white rounded-md px-2 py-0.5 text-[10px] shadow-sm z-40 whitespace-nowrap backdrop-blur-xs">
                                {field.type !== 'checkbox' && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleGridCell(field.id);
                                    }}
                                    className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                                      field.isGridCell
                                        ? 'bg-white text-zinc-900 font-semibold'
                                        : 'bg-zinc-800 text-zinc-300 hover:text-white'
                                    }`}
                                    title="Przełącz odstęp znaków dla kratek (np. PESEL, NIP, data)"
                                  >
                                    {field.isGridCell ? '🧲 Kratki (NIP/PESEL)' : 'Tekst ciągły'}
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteFallbackField(field.id);
                                  }}
                                  className="text-rose-300 hover:text-rose-100 p-0.5 rounded cursor-pointer"
                                  title="Usuń pole"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}

                            {field.type === 'checkbox' ? (
                              <div
                                onClick={() => handleToggleFallbackCheckbox(field.id)}
                                className={`flex items-center justify-center bg-white/90 border border-blue-600/90 rounded-xs cursor-pointer shadow-xs hover:scale-105 transition-transform select-none ${
                                  isActive ? 'ring-2 ring-blue-500' : ''
                                }`}
                                style={{
                                  width: `${field.boxWidth || 18}px`,
                                  height: `${field.boxHeight || 18}px`,
                                }}
                                title="Pole wyboru (kliknij, aby zaznaczyć/odznaczyć X)"
                              >
                                {field.checked && (
                                  <span
                                    className="font-bold text-blue-900 leading-none select-none flex items-center justify-center font-mono"
                                    style={{
                                      fontFamily: "'Courier New', Courier, monospace",
                                      fontSize: `${Math.min(14, Math.max(10, Math.round((field.boxHeight || 18) * 0.72)))}px`,
                                    }}
                                  >
                                    X
                                  </span>
                                )}
                              </div>
                            ) : (
                              <div className="relative flex items-center">
                                <input
                                  type="text"
                                  value={field.text}
                                  autoFocus={activeFieldId === field.id}
                                  onChange={(e) =>
                                    handleUpdateFallbackText(field.id, e.target.value)
                                  }
                                  onFocus={() => setActiveFieldId(field.id)}
                                  placeholder={field.isGridCell ? "123..." : "..."}
                                  className={`bg-white/95 text-slate-900 border rounded-xs focus:bg-white focus:outline-none shadow-xs font-mono font-medium ${
                                    isActive
                                      ? 'border-blue-600 ring-2 ring-blue-500/50'
                                      : 'border-blue-400 hover:border-blue-500'
                                  }`}
                                  style={{
                                    fontFamily: "'Courier New', Courier, monospace",
                                    fontSize: `${scaledFontSize}px`,
                                    letterSpacing: field.isGridCell ? `${letterSpacingPx}px` : 'normal',
                                    paddingLeft: `${firstCharPadding}px`,
                                    paddingRight: '4px',
                                    paddingTop: '1px',
                                    paddingBottom: '1px',
                                    width: `${inputWidth}px`,
                                    height: `${Math.max(20, field.boxHeight || 22)}px`,
                                    lineHeight: `${Math.max(18, (field.boxHeight || 22) - 2)}px`,
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteFallbackField(field.id);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 absolute -top-2.5 -right-2.5 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] shadow-sm hover:bg-rose-600 cursor-pointer transition-opacity"
                                  title="Usuń pole"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* STANDARD MODE: Native AcroForm Fields mapped directly to DOM position */
                    dim &&
                    pageAcroFields.map((field) => {
                      const domScaleX = dim.domWidth / dim.pdfWidth;
                      const domScaleY = dim.domHeight / dim.pdfHeight;

                      const left = field.pdfX * domScaleX;
                      const top = (dim.pdfHeight - field.pdfY - field.pdfHeight) * domScaleY;
                      const width = Math.max(20, field.pdfWidth * domScaleX);
                      const height = Math.max(18, field.pdfHeight * domScaleY);

                      const isActive = activeFieldId === field.id;

                      return (
                        <div
                          key={field.id}
                          className={`acro-field-container absolute group transition-all ${
                            isActive ? 'z-30 ring-2 ring-blue-500' : 'z-20'
                          }`}
                          style={{
                            left: `${left}px`,
                            top: `${top}px`,
                            width: `${width}px`,
                            height: `${height}px`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveFieldId(field.id);
                          }}
                        >
                          {field.type === 'checkbox' ? (
                            <div className="w-full h-full flex items-center justify-center bg-white/90 dark:bg-slate-800/90 border border-blue-500 rounded cursor-pointer hover:bg-blue-50">
                              <input
                                type="checkbox"
                                checked={!!field.checked}
                                onChange={() => handleToggleCheckbox(field.id)}
                                className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
                              />
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) =>
                                handleUpdateFieldValue(field.id, e.target.value)
                              }
                              placeholder={
                                field.isNew
                                  ? t.formFiller.placeholderInput
                                  : field.name
                              }
                              className={`w-full h-full px-1.5 py-0.5 text-xs text-slate-900 dark:text-white bg-blue-50/70 dark:bg-slate-800/80 border border-blue-400 dark:border-blue-600 rounded focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-blue-600 shadow-2xs font-sans ${
                                isActive ? 'bg-white shadow-xs' : ''
                              }`}
                              style={{
                                fontSize: `${Math.max(10, Math.round(12 * zoomScale))}px`,
                              }}
                            />
                          )}

                          {field.isNew && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteField(field.id);
                              }}
                              className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 hover:bg-rose-600 transition-opacity shadow-xs"
                              title={t.formFiller.deleteField}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
