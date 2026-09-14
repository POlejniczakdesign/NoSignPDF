import React, { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { AdContainer } from './AdContainer';

export const TimedExitModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    try {
      const alreadyShown = sessionStorage.getItem('pdf_studio_exit_modal_shown');
      if (alreadyShown === 'true') {
        return;
      }
      sessionStorage.setItem('pdf_studio_exit_modal_shown', 'true');
    } catch {
      // ignore storage errors
    }
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    try {
      const alreadyShown = sessionStorage.getItem('pdf_studio_exit_modal_shown');
      if (alreadyShown === 'true') {
        return;
      }
    } catch {
      // ignore
    }

    // 1. Timed trigger: 30 seconds after mounting
    const timer = setTimeout(() => {
      handleOpen();
    }, 30000);

    // 2. Exit intent trigger: cursor leaving the browser viewport towards top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        handleOpen();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="exit-intent-timed-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Informacja sponsorowana"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-2xl relative flex flex-col items-center animate-in zoom-in-95 duration-150">
        {/* Close button [X] in the top-right corner */}
        <button
          type="button"
          id="exit-modal-close-btn"
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Zamknij"
          title="Zamknij"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Small header text */}
        <div className="w-full text-left mb-3 pr-6">
          <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Informacja sponsorowana
          </span>
        </div>

        {/* Central square 300x250 ad box */}
        <div className="w-full flex justify-center">
          <AdContainer type="modal-square" />
        </div>

        {/* Footer close action */}
        <button
          type="button"
          onClick={handleClose}
          className="mt-4 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          Zamknij i kontynuuj korzystanie
        </button>
      </div>
    </div>
  );
};
