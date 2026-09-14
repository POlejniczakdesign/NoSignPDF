import React, { useRef, useState } from 'react';
import { UploadCloud, Sparkles, AlertCircle } from 'lucide-react';
import { generateSamplePdf } from '../lib/pdfOperations';
import { useLanguage } from '../i18n/LanguageContext';

export interface UploadedFileItem {
  name: string;
  bytes: Uint8Array;
  size: number;
}

interface FileUploaderProps {
  onFilesSelected?: (files: UploadedFileItem[]) => void;
  onFilesLoaded?: (files: UploadedFileItem[]) => void;
  multiple?: boolean;
  sampleType?: 'form' | 'multipage' | 'pcc3';
  title?: string;
  subtitle?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  onFilesLoaded,
  multiple = false,
  sampleType = 'multipage',
  title,
  subtitle,
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [isLoadingPcc3, setIsLoadingPcc3] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const displayTitle = title || t.common.dropzoneTitle;
  const displaySubtitle = subtitle || t.common.dropzoneSubtitle;

  const emitFiles = (files: UploadedFileItem[]) => {
    if (onFilesSelected) {
      onFilesSelected(files);
    } else if (onFilesLoaded) {
      onFilesLoaded(files);
    }
  };

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage(null);

    const validFiles: UploadedFileItem[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setErrorMessage(t.common.invalidPdf || 'Wybierz poprawny plik w formacie .pdf');
        continue;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        validFiles.push({
          name: file.name,
          bytes: new Uint8Array(arrayBuffer),
          size: file.size,
        });
      } catch (err) {
        console.error('Error reading file:', err);
        setErrorMessage(`Nie udało się odczytać pliku ${file.name}`);
      }
    }

    if (validFiles.length > 0) {
      emitFiles(validFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    await processFiles(e.dataTransfer.files);
  };

  const handleSampleClick = async (typeToLoad: 'form' | 'multipage' | 'pcc3') => {
    try {
      if (typeToLoad === 'pcc3') {
        setIsLoadingPcc3(true);
      } else {
        setIsLoadingSample(true);
      }
      setErrorMessage(null);
      const sample = await generateSamplePdf(typeToLoad);
      emitFiles([
        {
          name: sample.name,
          bytes: sample.bytes,
          size: sample.bytes.byteLength,
        },
      ]);
    } catch (err) {
      console.error('Error creating sample PDF:', err);
      setErrorMessage('Nie udało się wygenerować przykładowego pliku');
    } finally {
      setIsLoadingSample(false);
      setIsLoadingPcc3(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <div
        id="file-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 group ${
          isDragging
            ? 'border-zinc-900 bg-zinc-100/80 dark:border-zinc-100 dark:bg-zinc-900/80 scale-[1.01]'
            : 'border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-xs'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple={multiple}
          onChange={(e) => processFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:scale-105 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {displayTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
              {displaySubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs sm:text-sm font-medium shadow-xs transition-colors cursor-pointer"
            >
              {t.common.browseFiles}
            </button>
            {multiple && (
              <span className="text-xs text-zinc-500 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                Wiele plików
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-850 w-full max-w-xs justify-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            100% Client-side RAM • ISO 32000
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-3 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Instant Demo Generator */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <button
          id="load-sample-btn"
          type="button"
          disabled={isLoadingSample || isLoadingPcc3}
          onClick={() => handleSampleClick(sampleType as 'form' | 'multipage')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-all cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-3 h-3 text-zinc-500" />
          <span>
            {isLoadingSample
              ? t.common.loadingSample
              : sampleType === 'form'
              ? t.common.trySample
              : t.common.trySampleMultipage}
          </span>
        </button>

        {sampleType === 'form' && (
          <button
            id="load-pcc3-sample-btn"
            type="button"
            disabled={isLoadingSample || isLoadingPcc3}
            onClick={() => handleSampleClick('pcc3')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-all cursor-pointer disabled:opacity-50"
          >
            <span className="text-xs">🇵🇱</span>
            <span>
              {isLoadingPcc3
                ? t.common.loadingSample
                : t.common.trySamplePcc3 || 'Deklaracja PCC-3'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
