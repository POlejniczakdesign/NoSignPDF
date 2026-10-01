import React, { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { AdContainer } from './AdContainer';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

const MODAL_STRINGS: Record<
  Language,
  {
    header: string;
    close: string;
    continue: string;
  }
> = {
  pl: {
    header: 'Informacja sponsorowana',
    close: 'Zamknij',
    continue: 'Zamknij i kontynuuj korzystanie',
  },
  en: {
    header: 'Sponsored Message',
    close: 'Close',
    continue: 'Close and continue using',
  },
  es: {
    header: 'Información patrocinada',
    close: 'Cerrar',
    continue: 'Cerrar y continuar',
  },
  hi: {
    header: 'प्रायोजित संदेश',
    close: 'बंद करें',
    continue: 'बंद करें और उपयोग जारी रखें',
  },
  pt: {
    header: 'Informação patrocinada',
    close: 'Fechar',
    continue: 'Fechar e continuar navegando',
  },
  ru: {
    header: 'Спонсорская информация',
    close: 'Закрыть',
    continue: 'Закрыть и продолжить работу',
  },
};

export const TimedExitModal: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const texts = MODAL_STRINGS[language] || MODAL_STRINGS.en;

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
      aria-label={texts.header}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-2xl relative flex flex-col items-center animate-in zoom-in-95 duration-150">
        {/* Close button [X] in the top-right corner */}
        <button
          type="button"
          id="exit-modal-close-btn"
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label={texts.close}
          title={texts.close}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Small header text */}
        <div className="w-full text-center mb-3">
          <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            {texts.header}
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
          className="mt-4 text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors cursor-pointer"
        >
          {texts.continue}
        </button>
      </div>
    </div>
  );
};
