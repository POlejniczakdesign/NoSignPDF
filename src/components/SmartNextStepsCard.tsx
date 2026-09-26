import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileX,
  Minimize2,
  FileSignature,
  RotateCw,
  History,
  Trash2,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ToolRoute } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import {
  getSmartNextStep,
  getOperationHistory,
  clearOperationHistory,
  OperationHistoryItem,
} from '../lib/retentionHistory';

interface SmartNextStepsCardProps {
  lastRoute: ToolRoute;
  workingFile: {
    name: string;
    bytes: Uint8Array;
    size: number;
    pageCount?: number;
  } | null;
  onSelectAction: (targetRoute: ToolRoute) => void;
}

export const SmartNextStepsCard: React.FC<SmartNextStepsCardProps> = ({
  lastRoute,
  workingFile,
  onSelectAction,
}) => {
  const { language } = useLanguage();
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [historyItems, setHistoryItems] = useState<OperationHistoryItem[]>(() =>
    getOperationHistory()
  );

  const recommendation = getSmartNextStep(lastRoute, workingFile, language);

  useEffect(() => {
    setHistoryItems(getOperationHistory());
  }, [workingFile, lastRoute]);

  const handleClearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearOperationHistory();
    setHistoryItems([]);
  };

  const getRouteIcon = (route: ToolRoute) => {
    switch (route) {
      case '/wyczysc-metadane-pdf':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case '/usun-strony-z-pdf':
        return <FileX className="w-5 h-5 text-rose-500" />;
      case '/kompresuj-pdf':
        return <Minimize2 className="w-5 h-5 text-blue-500" />;
      case '/wypelnij-formularz-pdf':
        return <FileSignature className="w-5 h-5 text-indigo-500" />;
      case '/obroc-pdf':
        return <RotateCw className="w-5 h-5 text-amber-500" />;
      default:
        return <Zap className="w-5 h-5 text-zinc-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatRelativeTime = (timestamp: number) => {
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 60) return 'przed chwilą';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} min temu`;
    const diffHrs = Math.floor(diffMin / 60);
    return `${diffHrs} godz. temu`;
  };

  return (
    <div
      id="smart-next-steps-card"
      className="w-full max-w-4xl mx-auto my-5 rounded-3xl bg-white dark:bg-zinc-900 border border-emerald-500/30 dark:border-emerald-500/20 shadow-lg p-5 sm:p-7 relative overflow-hidden"
    >
      {/* Decorative gradient aura */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{recommendation.title}</span>
            {workingFile && (
              <span className="hidden sm:inline-block ml-1 px-2 py-0.2 rounded-full bg-emerald-200/60 dark:bg-emerald-800/60 text-[10px] font-semibold">
                ⚡ Bez wgrywania pliku
              </span>
            )}
          </div>

          <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
            {recommendation.message}
          </h4>

          {workingFile && (
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate max-w-[280px] sm:max-w-md font-medium text-zinc-700 dark:text-zinc-300">
                {workingFile.name}
              </span>
              <span>•</span>
              <span>{formatFileSize(workingFile.size)}</span>
              {workingFile.pageCount && workingFile.pageCount > 0 && (
                <>
                  <span>•</span>
                  <span>{workingFile.pageCount} str.</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => onSelectAction(recommendation.primaryAction.route)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group shrink-0"
          >
            {getRouteIcon(recommendation.primaryAction.route)}
            <span>{recommendation.primaryAction.label}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          {recommendation.secondaryAction && (
            <button
              onClick={() => onSelectAction(recommendation.secondaryAction!.route)}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-colors cursor-pointer shrink-0"
            >
              {getRouteIcon(recommendation.secondaryAction.route)}
              <span>{recommendation.secondaryAction.label}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mini-History Dropdown (Retention & Trust Reassurance) */}
      {historyItems.length > 0 && (
        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-between w-full text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-zinc-400" />
              <span>
                Ostatnie operacje w tej sesji ({historyItems.length})
              </span>
              <span className="text-[11px] text-zinc-400">
                (zapisane 100% lokalnie w localStorage)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {showHistory ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </button>

          {showHistory && (
            <div className="mt-3 space-y-2 animate-in fade-in duration-200">
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 text-xs border border-zinc-100 dark:border-zinc-800"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 shrink-0">
                        {item.actionName}:
                      </span>
                      <span className="truncate text-zinc-600 dark:text-zinc-400">
                        {item.fileName}
                      </span>
                      {item.pageCount && (
                        <span className="text-[10px] text-zinc-400 shrink-0">
                          ({item.pageCount} str.)
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-400 shrink-0 ml-2">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleClearHistory}
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Wyczyść historię sesji</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
