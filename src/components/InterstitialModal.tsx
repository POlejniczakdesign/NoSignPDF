import React, { useEffect, useState } from 'react';
import { ShieldCheck, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { AdContainer } from './AdContainer';
import { useLanguage } from '../i18n/LanguageContext';

interface InterstitialModalProps {
  isOpen: boolean;
  onComplete: () => void;
  fileName?: string;
}

export const InterstitialModal: React.FC<InterstitialModalProps> = ({
  isOpen,
  onComplete,
  fileName = 'dokument.pdf',
}) => {
  const { t } = useLanguage();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3);
  const [progress, setProgress] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(3);
      setProgress(0);
      setIsDone(false);
      return;
    }

    const totalDuration = 3000; // exactly 3 seconds
    const intervalTime = 30;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / totalDuration) * 100);
      const remainingSec = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));

      setProgress(currentProgress);
      setSecondsRemaining(remainingSec);

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        setIsDone(true);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div
      id="interstitial-download-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="interstitial-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Top bar with progress */}
        <div className="w-full bg-slate-100 dark:bg-slate-800/60 h-2.5 relative overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-emerald-500 via-indigo-500 to-indigo-600 transition-all duration-75 ease-linear rounded-r-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-6 sm:p-8 w-full flex flex-col items-center text-center space-y-4">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {t.interstitial.secureNote}
          </div>

          {/* Heading */}
          <div>
            <h3
              id="interstitial-title"
              className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2"
            >
              {isDone ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-bounce" />
                  {fileName} ✓
                </>
              ) : (
                <>
                  <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                  {t.interstitial.title}
                </>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              {t.interstitial.countdownPrefix}{' '}
              <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base">{secondsRemaining}</span>
              {t.interstitial.secondsSuffix} ({fileName})
            </p>
          </div>

          {/* Ad Container (Mandatory Ezoic/AdSense Placeholder) */}
          <div className="w-full my-2">
            <AdContainer type="modal-interstitial" />
          </div>

          {/* Manual download override */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Client-side RAM</span>
            <button
              onClick={onComplete}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 underline font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {t.interstitial.instantDownload}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
