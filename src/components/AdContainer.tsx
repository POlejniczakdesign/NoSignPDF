import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

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

const SPONSOR_LABELS: Record<Language, string> = {
  pl: 'Sponsor',
  en: 'Sponsor',
  es: 'Patrocinador',
  hi: 'प्रायोजक',
  pt: 'Patrocinador',
  ru: 'Спонсор',
};

const BANNER_BOTTOM_TITLES: Record<Language, string> = {
  pl: 'Miejsce na reklamę (Bottom Leaderboard)',
  en: 'Advertisement Placement (Bottom Leaderboard)',
  es: 'Espacio publicitario inferior (Leaderboard)',
  hi: 'निचला विज्ञापन स्थान (Bottom Leaderboard)',
  pt: 'Espaço Publicitário Inferior (Leaderboard)',
  ru: 'Нижний рекламный блок (Leaderboard)',
};

export const AdContainer: React.FC<AdContainerProps> = ({ type, className = '' }) => {
  const { t, language } = useLanguage();
  const sponsorText = SPONSOR_LABELS[language] || SPONSOR_LABELS.en;
  const bottomTitle = BANNER_BOTTOM_TITLES[language] || BANNER_BOTTOM_TITLES.en;

  if (type === 'banner-top') {
    return (
      <aside
        id="ad-banner-top"
        aria-label={t.ads.adLabel}
        className={`w-full max-w-4xl mx-auto my-3 ${className}`}
      >
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 py-3 px-6 text-center min-h-[50px] flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500 transition-colors shadow-2xs">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-400 dark:text-neutral-500">
            {t.ads.adLabel}
          </span>
          <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 text-center">
            {t.ads.bannerTopTitle} (728×90)
          </span>
          <span className="text-[10px] tracking-wider uppercase font-semibold text-neutral-400 dark:text-neutral-500">
            {sponsorText}
          </span>
        </div>
      </aside>
    );
  }

  if (type === 'banner-bottom') {
    return (
      <aside
        id="ad-banner-bottom"
        aria-label={t.ads.adLabel}
        className={`w-full max-w-4xl mx-auto my-6 ${className}`}
      >
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 py-6 px-6 text-center min-h-[96px] flex flex-col items-center justify-center gap-1.5 transition-colors shadow-2xs">
          <div className="flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-neutral-400 dark:text-neutral-500">
            <span>{t.ads.adLabel}</span>
            <span>•</span>
            <span>{sponsorText}</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-300">
            {bottomTitle}
          </span>
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
            728×90 / 970×90 Leaderboard · Google AdSense
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
        aria-label={isLeft ? t.ads.sidebarLeftTitle : t.ads.sidebarRightTitle}
        className={`hidden xl:flex flex-col w-[160px] shrink-0 ${className}`}
      >
        <div className="sticky top-20 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 p-4 text-center min-h-[600px] flex flex-col justify-between items-center text-xs text-neutral-400 dark:text-neutral-500 shadow-2xs transition-colors">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-400 dark:text-neutral-500">
            {t.ads.adLabel}
          </span>
          <div className="space-y-3 my-auto flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-neutral-200/70 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs font-bold">
              160×600
            </div>
            <p className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 leading-snug max-w-[130px]">
              {isLeft ? t.ads.sidebarLeftTitle : t.ads.sidebarRightTitle}
            </p>
          </div>
          <span className="text-[10px] tracking-wider uppercase font-semibold text-neutral-400 dark:text-neutral-500">
            {sponsorText}
          </span>
        </div>
      </aside>
    );
  }

  if (type === 'modal-square') {
    return (
      <div
        id="ad-modal-square-300x250"
        className={`w-[300px] h-[250px] mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/60 p-5 flex flex-col items-center justify-between text-center shadow-2xs transition-colors ${className}`}
      >
        <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold text-neutral-400 dark:text-neutral-500">
          <span>{t.ads.adLabel}</span>
          <span>•</span>
          <span>{sponsorText}</span>
        </div>
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-neutral-200/70 dark:bg-neutral-800 mx-auto flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs font-bold">
            300×250
          </div>
          <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 max-w-[220px]">
            {t.ads.interstitialTitle}
          </p>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
            Medium Rectangle Ad Unit · Google AdSense
          </p>
        </div>
        <span className="text-[10px] tracking-wider uppercase font-semibold text-neutral-400 dark:text-neutral-500">
          {sponsorText}
        </span>
      </div>
    );
  }

  // Interstitial modal rectangle
  return (
    <div
      id="ad-interstitial-modal"
      className={`w-full max-w-[340px] mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 p-5 text-center flex flex-col items-center justify-center min-h-[200px] transition-colors ${className}`}
    >
      <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-widest uppercase font-semibold text-neutral-400 dark:text-neutral-500 mb-3">
        <span>{t.ads.adLabel}</span>
        <span>•</span>
        <span>{sponsorText}</span>
      </div>
      <div className="w-9 h-9 rounded-xl bg-neutral-200/70 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 text-xs font-bold mb-2">
        Ad
      </div>
      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 max-w-[240px]">
        {t.ads.interstitialTitle}
      </p>
    </div>
  );
};
