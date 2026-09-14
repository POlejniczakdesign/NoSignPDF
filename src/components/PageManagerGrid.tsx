import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCw,
  Trash2,
  Download,
  Plus,
  ArrowRightLeft,
  FileText,
  Undo,
  AlertTriangle,
} from 'lucide-react';
import { PageThumbnailItem, ToolRoute } from '../types';
import {
  renderPageThumbnail,
  compileModifiedPdf,
  getPdfjsDoc,
} from '../lib/pdfOperations';
import { FileUploader } from './FileUploader';
import { useLanguage } from '../i18n/LanguageContext';

interface PageManagerGridProps {
  toolRoute: ToolRoute;
  onTriggerDownload: (bytes: Uint8Array, fileName: string) => void;
}

export const PageManagerGrid: React.FC<PageManagerGridProps> = ({
  toolRoute,
  onTriggerDownload,
}) => {
  const { t } = useLanguage();

  const [pages, setPages] = useState<PageThumbnailItem[]>([]);
  const [originalPages, setOriginalPages] = useState<PageThumbnailItem[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileProgress, setCompileProgress] = useState<number>(0);
  const [rangeInput, setRangeInput] = useState<string>('');
  const [rangeError, setRangeError] = useState<string | null>(null);
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);

  // Hidden file input for adding more files
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  // Load files into page thumbnail list
  const handleFilesLoaded = async (
    files: { name: string; bytes: Uint8Array; size: number }[],
    append: boolean = false
  ) => {
    try {
      const newPageItems: PageThumbnailItem[] = [];
      const newFileNames: string[] = append ? [...selectedFileNames] : [];

      for (let fIdx = 0; fIdx < files.length; fIdx++) {
        const file = files[fIdx];
        if (!newFileNames.includes(file.name)) {
          newFileNames.push(file.name);
        }

        const doc = await getPdfjsDoc(file.bytes);
        for (let pIdx = 0; pIdx < doc.numPages; pIdx++) {
          const pageId = `page-${Date.now()}-${fIdx}-${pIdx}-${Math.random().toString(36).substring(2, 6)}`;
          
          // Generate thumbnail
          const thumb = await renderPageThumbnail(file.bytes, pIdx, 0);

          newPageItems.push({
            id: pageId,
            fileIndex: fIdx,
            fileName: file.name,
            originalPageIndex: pIdx,
            displayPageNumber: pIdx + 1,
            rotation: 0,
            thumbnailUrl: thumb,
            sourceFileBytes: file.bytes,
            selected: true,
          });
        }
      }

      if (append) {
        setPages((prev) => [...prev, ...newPageItems]);
        setOriginalPages((prev) => [...prev, ...newPageItems]);
      } else {
        setPages(newPageItems);
        setOriginalPages(newPageItems);
      }
      setSelectedFileNames(newFileNames);
    } catch (err) {
      console.error('Error loading pages for manager:', err);
      alert('Nie udało się przetworzyć pliku PDF.');
    }
  };

  // Rotate a single page by 90 degrees clockwise
  const handleRotatePage = async (index: number) => {
    const targetPage = pages[index];
    const newRotation = (targetPage.rotation + 90) % 360;

    // Re-render thumbnail with updated rotation
    const newThumb = await renderPageThumbnail(
      targetPage.sourceFileBytes,
      targetPage.originalPageIndex,
      newRotation
    );

    setPages((prev) =>
      prev.map((p, idx) =>
        idx === index
          ? { ...p, rotation: newRotation, thumbnailUrl: newThumb }
          : p
      )
    );
  };

  // Rotate all pages by 90 degrees
  const handleRotateAll = async (direction: 90 | 270 = 90) => {
    const updated = await Promise.all(
      pages.map(async (p) => {
        const newRotation = (p.rotation + direction) % 360;
        const newThumb = await renderPageThumbnail(
          p.sourceFileBytes,
          p.originalPageIndex,
          newRotation
        );
        return { ...p, rotation: newRotation, thumbnailUrl: newThumb };
      })
    );
    setPages(updated);
  };

  // Delete a page immediately
  const handleDeletePage = (index: number) => {
    setPages((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    setPages((prev) => {
      const items = [...prev];
      const [movedItem] = items.splice(draggedIndex, 1);
      items.splice(targetIndex, 0, movedItem);
      return items;
    });

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Range parser for /rozdziel-pdf (e.g. "1-3, 5")
  const applyPageRange = () => {
    setRangeError(null);
    if (!rangeInput.trim()) {
      setRangeError('Wpisz zakres stron, np. 1-3, 5');
      return;
    }

    const total = originalPages.length;
    const keptIndices = new Set<number>();

    const parts = rangeInput.split(',').map((s) => s.trim());
    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start > end || start < 1 || end > total) {
          setRangeError(`Niepoprawny zakres: "${part}". Maksymalna strona to ${total}.`);
          return;
        }
        for (let i = start; i <= end; i++) {
          keptIndices.add(i - 1);
        }
      } else {
        const single = parseInt(part, 10);
        if (isNaN(single) || single < 1 || single > total) {
          setRangeError(`Niepoprawny numer strony: "${part}". Maksymalna strona to ${total}.`);
          return;
        }
        keptIndices.add(single - 1);
      }
    }

    if (keptIndices.size === 0) {
      setRangeError('Żadna strona nie pasuje do podanego zakresu.');
      return;
    }

    const filtered = originalPages.filter((_, idx) => keptIndices.has(idx));
    setPages(filtered);
  };

  const applyPresetFilter = (preset: 'odd' | 'even' | 'first-half') => {
    if (preset === 'odd') {
      setPages(originalPages.filter((_, idx) => (idx + 1) % 2 !== 0));
    } else if (preset === 'even') {
      setPages(originalPages.filter((_, idx) => (idx + 1) % 2 === 0));
    } else if (preset === 'first-half') {
      const half = Math.ceil(originalPages.length / 2);
      setPages(originalPages.slice(0, half));
    }
  };

  const resetPages = () => {
    setPages([...originalPages]);
    setRangeInput('');
    setRangeError(null);
  };

  // Compile and trigger download
  const handleCompileAndDownload = async () => {
    if (pages.length === 0) {
      alert('Dokument nie posiada żadnych stron do zapisania.');
      return;
    }

    try {
      setIsCompiling(true);
      setCompileProgress(10);

      const compiledBytes = await compileModifiedPdf(pages, (progress) => {
        setCompileProgress(progress);
      });

      let outputName = 'dokument_zmodyfikowany.pdf';
      if (toolRoute === '/polacz-pdf') outputName = 'polaczony_dokument.pdf';
      else if (toolRoute === '/usun-strony-z-pdf') outputName = 'pdf_oczyszczony.pdf';
      else if (toolRoute === '/obroc-pdf') outputName = 'pdf_obrocony.pdf';
      else if (toolRoute === '/rozdziel-pdf') outputName = 'pdf_wyodrebnione_strony.pdf';

      onTriggerDownload(compiledBytes, outputName);
    } catch (err) {
      console.error('Error compiling PDF:', err);
      alert('Wystąpił błąd podczas kompilacji pliku PDF.');
    } finally {
      setIsCompiling(false);
      setCompileProgress(0);
    }
  };

  // Initial Uploader view when no pages are loaded
  if (pages.length === 0 && originalPages.length === 0) {
    const isMerge = toolRoute === '/polacz-pdf';
    return (
      <div className="w-full">
        <FileUploader
          onFilesSelected={(files) => handleFilesLoaded(files, false)}
          multiple={isMerge}
          sampleType="multipage"
          title={
            isMerge
              ? t.pageManager.mergeTitle
              : toolRoute === '/usun-strony-z-pdf'
              ? t.pageManager.deleteTitle
              : toolRoute === '/obroc-pdf'
              ? t.pageManager.rotateTitle
              : t.pageManager.splitTitle
          }
          subtitle={
            isMerge
              ? t.pageManager.mergeDesc
              : toolRoute === '/usun-strony-z-pdf'
              ? t.pageManager.deleteDesc
              : toolRoute === '/obroc-pdf'
              ? t.pageManager.rotateDesc
              : t.pageManager.splitDesc
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* Hidden file input for "Dodaj więcej plików" */}
      <input
        ref={addMoreInputRef}
        type="file"
        accept=".pdf,application/pdf"
        multiple
        className="hidden"
        onChange={async (e) => {
          if (e.target.files && e.target.files.length > 0) {
            const filesToAdd: { name: string; bytes: Uint8Array; size: number }[] = [];
            for (let i = 0; i < e.target.files.length; i++) {
              const file = e.target.files[i];
              const buf = await file.arrayBuffer();
              filesToAdd.push({
                name: file.name,
                bytes: new Uint8Array(buf),
                size: file.size,
              });
            }
            await handleFilesLoaded(filesToAdd, true);
          }
        }}
      />

      {/* Main Top Control Toolbar */}
      <div className="sticky top-16 z-30 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl p-3 mb-6 shadow-sm transition-all space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left stats & quick actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700">
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>
                {t.pageManager.selectedCount}:{' '}
                <strong className="font-semibold">{pages.length}</strong>
              </span>
            </div>

            {/* Quick rotate all */}
            <button
              onClick={() => handleRotateAll(90)}
              className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title={t.pageManager.rotate90}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{t.pageManager.rotate90}</span>
            </button>

            {/* Add more files (especially relevant for merge) */}
            <button
              onClick={() => addMoreInputRef.current?.click()}
              className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-zinc-500" />
              <span>{t.pageManager.addMorePdfs}</span>
            </button>

            {/* Reset */}
            <button
              onClick={resetPages}
              className="px-2.5 py-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title={t.common.reset}
            >
              <Undo className="w-3 h-3" />
              <span>{t.common.reset}</span>
            </button>
          </div>

          {/* Right: Compile & Download Button (prominent, rounded-lg, black in light mode) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCompileAndDownload}
              disabled={isCompiling || pages.length === 0}
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 text-xs sm:text-sm font-medium shadow-xs hover:shadow-sm active:scale-[0.98] flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.common.downloadPdf}</span>
            </button>
          </div>
        </div>

        {/* Progress bar during compiling */}
        {isCompiling && (
          <div className="w-full pt-2">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 mb-1 font-medium">
              <span>{t.common.processing}...</span>
              <span>{compileProgress}%</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-150 ease-out"
                style={{ width: `${compileProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Dedicated Range Sub-toolbar for Split (/rozdziel-pdf) */}
        {toolRoute === '/rozdziel-pdf' && (
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <span className="font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                Zakres stron:
              </span>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder={t.pageManager.extractRangePlaceholder}
                className="px-2.5 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-mono w-full focus:outline-zinc-500"
              />
              <button
                onClick={applyPageRange}
                className="px-3 py-1.5 bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer text-xs"
              >
                {t.pageManager.extractButton}
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
              <span>Filtry:</span>
              <button
                onClick={() => applyPresetFilter('odd')}
                className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                Nieparzyste
              </button>
              <button
                onClick={() => applyPresetFilter('even')}
                className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                Parzyste
              </button>
              <button
                onClick={() => applyPresetFilter('first-half')}
                className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                1. Połowa
              </button>
            </div>
          </div>
        )}

        {rangeError && (
          <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            {rangeError}
          </p>
        )}

        {/* Interaction Hint */}
        <div className="flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
          <span className="flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3 text-zinc-400" />
            {t.pageManager.dragDropReorder}
          </span>
          <span className="hidden sm:inline">
            Plików: {selectedFileNames.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 pb-12">
        {pages.map((page, index) => {
          const isBeingDragged = draggedIndex === index;
          const isDragOver = dragOverIndex === index;

          return (
            <div
              key={page.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, index)}
              className={`relative group bg-white dark:bg-zinc-900 border rounded-xl p-2 shadow-2xs hover:shadow-sm transition-all duration-150 cursor-grab active:cursor-grabbing flex flex-col items-center select-none ${
                isBeingDragged
                  ? 'opacity-40 scale-95 border-zinc-400'
                  : isDragOver
                  ? 'border-zinc-900 dark:border-white ring-1 ring-zinc-500 scale-[1.02]'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              {/* Top Page Number & Origin Tag */}
              <div className="w-full flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-mono font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  #{index + 1}
                </span>

                {page.rotation !== 0 && (
                  <span className="text-[10px] font-mono font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    +{page.rotation}°
                  </span>
                )}
              </div>

              {/* Thumbnail Image Container with Overlay Action Buttons */}
              <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800/60 flex items-center justify-center border border-zinc-200/80 dark:border-zinc-800">
                {page.thumbnailUrl ? (
                  <img
                    src={page.thumbnailUrl}
                    alt={`Strona ${index + 1}`}
                    className="w-full h-full object-contain pointer-events-none transition-transform"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-zinc-400 text-xs">{t.common.processing}...</div>
                )}

                {/* Always-accessible Action Buttons */}
                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-2xs">
                  {/* Rotate Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRotatePage(index);
                    }}
                    className="p-2 rounded-full bg-white text-zinc-800 hover:bg-zinc-900 hover:text-white shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    title={t.pageManager.rotate90}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(index);
                    }}
                    className="p-2 rounded-full bg-white text-rose-600 hover:bg-rose-600 hover:text-white shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    title={t.pageManager.deletePage}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Source File Name Footer */}
              <div className="w-full mt-2 text-center truncate px-1">
                <span
                  className="text-[10px] text-slate-400 dark:text-slate-500 block truncate"
                  title={page.fileName}
                >
                  {page.fileName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
