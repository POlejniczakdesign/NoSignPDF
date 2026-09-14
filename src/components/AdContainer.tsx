import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface AdContainerProps {
  type:
    | 'banner-top'
    | 'banner-bottom'
    | 'sidebar-left'
    | 'sidebar-right'
    | 'modal-interstitial'
    | 'modal-square';
  className?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({ type, className = '' }) => {
  const { t } = useLanguage();

  if (type === 'banner-top') {
    return (
      <aside
        id="ad-banner-top"
        aria-label={t.ads.adLabel}
        className={`w-full max-w-4xl mx-auto my-3 ${className}`}
      >
        <div className="border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-lg py-2 px-4 text-center min-h-[50px] flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
          <span className="text-[10px] tracking-wider uppercase font-medium">
            {t.ads.adLabel}
          </span>
          <span className="text-[11px] font-normal text-zinc-400 dark:text-zinc-500">
            {t.ads.bannerTopTitle} (728×90)
          </span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
            Sponsor
          </span>
        </div>
      </aside>
    );
  }

  if (type === 'banner-bottom') {
    return (
      <aside
        id="ad-banner-bottom"
        aria-label="Reklama dolna"
        className={`w-full max-w-4xl mx-auto my-6 ${className}`}
      >
        <div className="border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/60 dark:bg-zinc-900/40 rounded-xl py-4 px-6 text-center min-h-[90px] flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 shadow-2xs">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-zinc-400">
            {t.ads.adLabel}
          </span>
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Miejsce na reklamę (Bottom Leaderboard)
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
              728×90 / 970×90 Leaderboard
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
            Sponsor
          </span>
        </div>
      </aside>
    );
  }

  if (type === 'sidebar-left' || type === 'sidebar-right') {
    const isLeft = type === 'sidebar-left';
    return (
      <aside
        id={isLeft ? 'ad-skyscraper-left' : 'ad-skyscraper-right'}
        aria-label={isLeft ? 'Reklama boczna lewa' : 'Reklama boczna prawa'}
        className={`hidden xl:flex flex-col w-[160px] shrink-0 ${className}`}
      >
        <div className="sticky top-20 border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl p-3 text-center min-h-[600px] flex flex-col justify-between items-center text-xs text-zinc-400 dark:text-zinc-500 shadow-2xs">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-zinc-400 dark:text-zinc-500">
            {t.ads.adLabel}
          </span>
          <div className="space-y-3 my-auto">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 mx-auto flex items-center justify-center text-zinc-500 text-xs font-semibold">
              160×600
            </div>
            <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 leading-snug">
              Miejsce na reklamę (Skyscraper 160×600)
            </p>
          </div>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
            Sponsor
          </span>
        </div>
      </aside>
    );
  }

  if (type === 'modal-square') {
    return (
      <div
        id="ad-modal-square-300x250"
        className={`w-[300px] h-[250px] mx-auto border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 rounded-xl p-4 flex flex-col items-center justify-between text-center shadow-2xs ${className}`}
      >
        <span className="text-[10px] tracking-wider uppercase font-semibold text-zinc-400">
          {t.ads.adLabel}
        </span>
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 mx-auto flex items-center justify-center text-zinc-500 text-xs font-bold">
            300×250
          </div>
          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-200 max-w-[220px]">
            Miejsce na reklamę - Pop-up / Interstitial 300x250
          </p>
          <p className="text-[10px] text-zinc-400">
            Medium Rectangle Ad Unit
          </p>
        </div>
        <span className="text-[10px] text-zinc-400 font-medium">
          Sponsor
        </span>
      </div>
    );
  }

  // Interstitial modal rectangle
  return (
    <div
      id="ad-interstitial-modal"
      className={`w-full max-w-[340px] mx-auto border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 rounded-xl p-4 text-center flex flex-col items-center justify-center min-h-[200px] ${className}`}
    >
      <span className="text-[10px] tracking-wider uppercase font-medium text-zinc-400 dark:text-zinc-500 mb-2">
        {t.ads.adLabel}
      </span>
      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs font-semibold mb-2">
        Ad
      </div>
      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {t.ads.interstitialTitle}
      </p>
    </div>
  );
};

