import React, { useEffect, useState } from 'react';
import {
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  FileText,
  Lock,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

export interface ProcessingCustomStages {
  processingTitle?: string;
  stage1?: string;
  stage2?: string;
  stage3?: string;
  stage4?: string;
  stage5?: string;
}

interface ProcessingScreenProps {
  isOpen: boolean;
  fileName: string;
  fileSize?: number;
  onComplete: () => void;
  durationMs?: number;
  customStages?: ProcessingCustomStages;
}

export interface ProcessingCopy {
  processingTitle: string;
  stage1: string;
  stage2: string;
  stage3: string;
  stage4: string;
  stage5: string;
  badgeWasm: string;
  badgeRam: string;
  badgePrivacy: string;
  stepIndicator: (step: number, total: number) => string;
}

export const PROCESSING_STRINGS: Record<Language, ProcessingCopy> = {
  pl: {
    processingTitle: 'Przetwarzanie dokumentu PDF',
    stage1: 'Inicjalizacja silnika lokalnego WASM...',
    stage2: 'Analiza struktury obiektów i drzewa stron PDF...',
    stage3: 'Zabezpieczanie warstwy prywatności dokumentu w RAM...',
    stage4: 'Optymalizacja bufora pamięci i finalizacja...',
    stage5: 'Gotowe! Dokument przygotowany do bezpiecznej edycji.',
    badgeWasm: '100% Lokalny Silnik WASM',
    badgeRam: 'Pamięć RAM urządzenia',
    badgePrivacy: 'Zero wysyłania na serwer',
    stepIndicator: (step, total) => `Etap ${step} z ${total}`,
  },
  en: {
    processingTitle: 'Processing PDF Document',
    stage1: 'Initializing local WASM engine...',
    stage2: 'Analyzing PDF object tree & page catalog...',
    stage3: 'Securing document privacy layer in client RAM...',
    stage4: 'Optimizing memory buffer and finalizing...',
    stage5: 'Ready! Document prepared for secure editing.',
    badgeWasm: '100% Local WASM Engine',
    badgeRam: 'Device RAM Processing',
    badgePrivacy: 'Zero Server Upload',
    stepIndicator: (step, total) => `Step ${step} of ${total}`,
  },
  es: {
    processingTitle: 'Procesando documento PDF',
    stage1: 'Inicializando el motor local WASM...',
    stage2: 'Analizando la estructura de objetos y páginas PDF...',
    stage3: 'Asegurando la capa de privacidad en la RAM local...',
    stage4: 'Optimizando el búfer de memoria y finalizando...',
    stage5: '¡Listo! Documento preparado para edición segura.',
    badgeWasm: '100% Motor Local WASM',
    badgeRam: 'Procesado en memoria RAM',
    badgePrivacy: 'Cero subidas al servidor',
    stepIndicator: (step, total) => `Paso ${step} de ${total}`,
  },
  hi: {
    processingTitle: 'पीडीएफ दस्तावेज़ संसाधित हो रहा है',
    stage1: 'स्थानीय WASM इंजन प्रारंभ किया जा रहा है...',
    stage2: 'PDF ऑब्जेक्ट और पेज कैटलॉग का विश्लेषण...',
    stage3: 'क्लाइंट रैम में दस्तावेज़ गोपनीयता परत सुरक्षित की जा रही है...',
    stage4: 'मेमोरी बफ़र अनुकूलित और तैयार किया जा रहा है...',
    stage5: 'तैयार! दस्तावेज़ सुरक्षित संपादन के लिए तैयार है।',
    badgeWasm: '100% स्थानीय WASM इंजन',
    badgeRam: 'डिवाइस रैम में प्रोसेसिंग',
    badgePrivacy: 'सर्वर पर कोई अपलोड नहीं',
    stepIndicator: (step, total) => `चरण ${step} / ${total}`,
  },
  pt: {
    processingTitle: 'Processando documento PDF',
    stage1: 'Inicializando motor local WASM...',
    stage2: 'Analisando estrutura de objetos e páginas do PDF...',
    stage3: 'Blindando camada de privacidade na memória RAM...',
    stage4: 'Otimizando buffer de memória e finalizando...',
    stage5: 'Pronto! Documento preparado para edição segura.',
    badgeWasm: '100% Motor Local WASM',
    badgeRam: 'Processamento na RAM',
    badgePrivacy: 'Zero upload para servidor',
    stepIndicator: (step, total) => `Etapa ${step} de ${total}`,
  },
  ru: {
    processingTitle: 'Обработка документа PDF',
    stage1: 'Инициализация локального движка WASM...',
    stage2: 'Анализ структуры объектов и дерева страниц PDF...',
    stage3: 'Защита слоя конфиденциальности в локальной памяти RAM...',
    stage4: 'Оптимизация буфера памяти и завершение...',
    stage5: 'Готово! Документ подготовлен к безопасной работе.',
    badgeWasm: '100% Локальный движок WASM',
    badgeRam: 'Обработка в памяти RAM',
    badgePrivacy: 'Без загрузки на сервер',
    stepIndicator: (step, total) => `Шаг ${step} из ${total}`,
  },
};

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  isOpen,
  fileName,
  fileSize,
  onComplete,
  durationMs = 4500, // 4.5 seconds for optimal dwell time
  customStages,
}) => {
  const { language } = useLanguage();
  const copy = PROCESSING_STRINGS[language] || PROCESSING_STRINGS.en;

  const [progress, setProgress] = useState<number>(0);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setIsClosing(false);
      return;
    }

    setIsClosing(false);
    setProgress(0);
    const startTime = performance.now();
    let animationFrameId: number;
    let completionTimeoutId: ReturnType<typeof setTimeout> | undefined;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = (elapsed / durationMs) * 100;
      const currentProgress = Math.min(100, rawProgress);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        // At 100%, show ready state for a brief moment then initiate smooth fade-out
        completionTimeoutId = setTimeout(() => {
          setIsClosing(true);
          const closeTimeoutId = setTimeout(() => {
            onComplete();
          }, 250);
          return () => clearTimeout(closeTimeoutId);
        }, 350);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (completionTimeoutId) clearTimeout(completionTimeoutId);
    };
  }, [isOpen, durationMs, onComplete]);

  if (!isOpen) return null;

  // Determine active stage and copy
  let currentStage = 1;
  let currentMessage = customStages?.stage1 || copy.stage1;
  let StageIcon = Cpu;

  if (progress >= 100) {
    currentStage = 5;
    currentMessage = customStages?.stage5 || copy.stage5;
    StageIcon = CheckCircle2;
  } else if (progress >= 85) {
    currentStage = 4;
    currentMessage = customStages?.stage4 || copy.stage4;
    StageIcon = Sparkles;
  } else if (progress >= 55) {
    currentStage = 3;
    currentMessage = customStages?.stage3 || copy.stage3;
    StageIcon = ShieldCheck;
  } else if (progress >= 25) {
    currentStage = 2;
    currentMessage = customStages?.stage2 || copy.stage2;
    StageIcon = Layers;
  }

  const displayPercent = Math.min(100, Math.floor(progress));
  const stepLabel = currentStage <= 4 ? copy.stepIndicator(currentStage, 4) : (customStages?.stage5 || copy.stage5);

  return (
    <div
      id="pdf-processing-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={copy.processingTitle}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 dark:bg-zinc-950/85 backdrop-blur-md transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Subtle Ambient Decorative Glows */}
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-indigo-500/15 dark:bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-emerald-500/15 dark:bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Animated Spinner with Centered Icon */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            {/* Pulsing ambient halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 opacity-20 blur-md animate-pulse" />

            {/* High-tech spinning gradient ring */}
            <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-indigo-600 border-r-emerald-500 dark:border-t-indigo-400 dark:border-r-emerald-400 animate-spin" />

            {/* Inner decorative border */}
            <div className="absolute inset-1.5 rounded-full border border-zinc-200 dark:border-zinc-800" />

            {/* Center icon badge */}
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-inner transition-transform duration-200">
              {progress < 100 ? (
                <StageIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400 scale-110 transition-transform" />
              )}
            </div>
          </div>

          {/* File details pill */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 text-xs text-zinc-700 dark:text-zinc-300 max-w-full">
              <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="font-semibold truncate max-w-[220px] sm:max-w-xs">
                {fileName || 'dokument.pdf'}
              </span>
              {fileSize && (
                <>
                  <span className="text-zinc-400">•</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">
                    {formatFileSize(fileSize)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Dynamic rotating stage message */}
          <div className="space-y-1.5 min-h-[56px] flex flex-col justify-center px-2">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>{stepLabel}</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white leading-snug transition-all duration-200">
              {currentMessage}
            </p>
          </div>

          {/* Modern Progress Bar */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-zinc-500 dark:text-zinc-400">
                {progress < 100 ? (customStages?.processingTitle || copy.processingTitle) : (customStages?.stage5 || copy.stage5)}
              </span>
              <span className="font-mono text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                {displayPercent}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 p-0.5 border border-zinc-200/70 dark:border-zinc-700/70 overflow-hidden relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-500 shadow-sm shadow-emerald-500/30 transition-all duration-75 ease-out relative"
                style={{ width: `${displayPercent}%` }}
              >
                {/* Moving shimmer sheen */}
                <div className="absolute inset-0 bg-white/20 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-pulse" />
              </div>
            </div>
          </div>

          {/* Client-side Trust and Security Badges */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{copy.badgeWasm}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 font-medium">
              <Cpu className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>{copy.badgeRam}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 font-medium">
              <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{copy.badgePrivacy}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
