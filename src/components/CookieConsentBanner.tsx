import React, { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';
import { ToolRoute } from '../types';

interface CookieConsentBannerProps {
  onNavigate: (path: ToolRoute) => void;
}

const STORAGE_KEY = 'pdf_studio_cookie_consent';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        setVisible(true);
      }
    } catch {
      // ignore in incognito or restricted environment
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      id="cookie-consent-banner"
      role="region"
      aria-label="Informacja o plikach cookies"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 transition-all duration-300 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl shadow-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pointer-events-auto">
        {/* Cookie Text */}
        <div className="flex items-start sm:items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
          <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <Cookie className="w-4 h-4" />
          </div>
          <p className="leading-snug">
            Ta strona używa plików cookies do personalizacji reklam (Google AdSense/Ezoic). Korzystając z aplikacji, zgadzasz się na ich użycie.{' '}
            <button
              id="cookie-privacy-link"
              type="button"
              onClick={() => onNavigate('/polityka-privacy')}
              className="font-semibold text-zinc-900 dark:text-white underline hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer ml-1"
            >
              Polityka Prywatności
            </button>
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto justify-end">
          <button
            id="cookie-accept-btn"
            type="button"
            onClick={handleAccept}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Akceptuję</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
