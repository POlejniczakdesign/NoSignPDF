import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

interface AdContainerProps {
  type:
    | 'banner-top'
    | 'banner-bottom'
    | 'bottom-slot-1'
    | 'bottom-slot-2'
    | 'sidebar-left'
    | 'sidebar-right'
    | 'modal-interstitial'
    | 'modal-square';
  className?: string;
}

const SPONSORED_TOOLS_LABELS: Record<Language, string> = {
  pl: 'Narzędzia sponsorowane',
  en: 'Sponsored tools',
  es: 'Herramientas patrocinadas',
  hi: 'प्रायोजित उपकरण',
  pt: 'Ferramentas patrocinadas',
  ru: 'Спонсорские инструменты',
};

export const AdContainer: React.FC<AdContainerProps> = ({ type, className = '' }) => {
  const { language } = useLanguage();
  const sponsoredLabel = SPONSORED_TOOLS_LABELS[language] || SPONSORED_TOOLS_LABELS.en;

  if (type === 'bottom-slot-1' || type === 'bottom-slot-2') {
    const isSlot1 = type === 'bottom-slot-1';
    const slotDomId = isSlot1 ? 'ad-slot-bottom-1' : 'ad-slot-bottom-2';

    return (
      <aside
        id={slotDomId}
        aria-label={sponsoredLabel}
        className={`adsense-inject-zone w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 min-h-[100px] flex flex-col justify-between transition-colors shadow-2xs ${className}`}
      >
        <div className="w-full flex items-center justify-between pb-2 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-neutral-400 dark:text-neutral-500 uppercase select-none">
            {sponsoredLabel}
          </span>
          <span className="text-[9px] font-mono text-neutral-300 dark:text-neutral-600 select-none">
            {isSlot1 ? 'Slot #1' : 'Slot #2'}
          </span>
        </div>

        {/* Clean AdSense Injection Area - Ready for Google Auto Ads and manual <ins> script */}
        <div
          className="adsense-inject-target w-full flex-1 flex items-center justify-center min-h-[60px] py-1"
          data-ad-client="ca-pub-7672441336686997"
          data-ad-slot={isSlot1 ? 'auto-bottom-1' : 'auto-bottom-2'}
          data-ad-format="auto"
          data-full-width-responsive="true"
        >
          {/* Google AdSense Ready:
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-client="ca-pub-7672441336686997"
                   data-ad-slot="auto"
                   data-ad-format="auto"
                   data-full-width-responsive="true" />
          */}
        </div>
      </aside>
    );
  }

  if (type === 'banner-top') {
    return (
      <aside
        id="ad-banner-top"
        aria-label={sponsoredLabel}
        className={`adsense-inject-zone w-full max-w-4xl mx-auto my-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 py-2.5 px-6 flex items-center justify-between transition-colors shadow-2xs ${className}`}
      >
        <span className="text-[10px] tracking-wider uppercase font-medium text-neutral-400 dark:text-neutral-500 select-none">
          {sponsoredLabel}
        </span>
        <div
          className="adsense-inject-target flex-1 flex items-center justify-center px-4"
          data-ad-client="ca-pub-7672441336686997"
          data-ad-slot="auto-top"
          data-ad-format="auto"
          data-full-width-responsive="true"
        >
          {/* Google AdSense Ready:
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-client="ca-pub-7672441336686997"
                   data-ad-slot="auto"
                   data-ad-format="auto"
                   data-full-width-responsive="true" />
          */}
        </div>
        <span className="text-[9px] font-mono text-neutral-300 dark:text-neutral-600 select-none">
          Top Banner
        </span>
      </aside>
    );
  }

  if (type === 'banner-bottom') {
    return (
      <aside
        id="ad-banner-bottom"
        aria-label={sponsoredLabel}
        className={`adsense-inject-zone w-full max-w-4xl mx-auto my-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 min-h-[100px] flex flex-col justify-between transition-colors shadow-2xs ${className}`}
      >
        <div className="w-full flex items-center justify-between pb-2 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-neutral-400 dark:text-neutral-500 uppercase select-none">
            {sponsoredLabel}
          </span>
          <span className="text-[9px] font-mono text-neutral-300 dark:text-neutral-600 select-none">
            Responsive Leaderboard
          </span>
        </div>

        <div
          className="adsense-inject-target w-full flex-1 flex items-center justify-center min-h-[60px] py-1"
          data-ad-client="ca-pub-7672441336686997"
          data-ad-slot="auto-leaderboard"
          data-ad-format="auto"
          data-full-width-responsive="true"
        >
          {/* Google AdSense Ready:
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-client="ca-pub-7672441336686997"
                   data-ad-slot="auto"
                   data-ad-format="auto"
                   data-full-width-responsive="true" />
          */}
        </div>
      </aside>
    );
  }

  if (type === 'sidebar-left' || type === 'sidebar-right') {
    const isLeft = type === 'sidebar-left';
    return (
      <aside
        id={isLeft ? 'ad-skyscraper-left' : 'ad-skyscraper-right'}
        aria-label={sponsoredLabel}
        className={`adsense-inject-zone hidden xl:flex flex-col w-[160px] shrink-0 ${className}`}
      >
        <div className="sticky top-20 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 text-center min-h-[600px] flex flex-col justify-between items-center shadow-2xs transition-colors">
          <span className="text-[10px] tracking-wider uppercase font-medium text-neutral-400 dark:text-neutral-500 select-none">
            {sponsoredLabel}
          </span>
          <div
            className="adsense-inject-target my-auto w-full flex items-center justify-center min-h-[400px]"
            data-ad-client="ca-pub-7672441336686997"
            data-ad-slot={isLeft ? 'auto-sidebar-left' : 'auto-sidebar-right'}
            data-ad-format="auto"
          >
            {/* Google AdSense Ready:
                <ins className="adsbygoogle"
                     style={{ display: 'block' }}
                     data-ad-client="ca-pub-7672441336686997"
                     data-ad-slot="auto"
                     data-ad-format="auto" />
            */}
          </div>
          <span className="text-[9px] font-mono text-neutral-300 dark:text-neutral-600 select-none">
            {isLeft ? 'Skyscraper L' : 'Skyscraper R'}
          </span>
        </div>
      </aside>
    );
  }

  if (type === 'modal-square') {
    return (
      <div
        id="ad-modal-square-300x250"
        className={`adsense-inject-zone w-[300px] h-[250px] mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 flex flex-col items-center justify-between text-center shadow-2xs transition-colors ${className}`}
      >
        <span className="text-[10px] tracking-wider uppercase font-medium text-neutral-400 dark:text-neutral-500 select-none">
          {sponsoredLabel}
        </span>
        <div
          className="adsense-inject-target my-auto w-full flex items-center justify-center min-h-[160px]"
          data-ad-client="ca-pub-7672441336686997"
          data-ad-slot="auto-modal-square"
          data-ad-format="rectangle"
        >
          {/* Google AdSense Ready:
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-client="ca-pub-7672441336686997"
                   data-ad-slot="auto"
                   data-ad-format="rectangle" />
          */}
        </div>
        <span className="text-[9px] font-mono text-neutral-300 dark:text-neutral-600 select-none">
          Medium Rectangle
        </span>
      </div>
    );
  }

  // Interstitial modal rectangle
  return (
    <div
      id="ad-interstitial-modal"
      className={`adsense-inject-zone w-full max-w-[340px] mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 text-center flex flex-col items-center justify-between min-h-[180px] shadow-2xs transition-colors ${className}`}
    >
      <span className="text-[10px] tracking-wider uppercase font-medium text-neutral-400 dark:text-neutral-500 select-none">
        {sponsoredLabel}
      </span>
      <div
        className="adsense-inject-target my-auto w-full flex items-center justify-center min-h-[120px]"
        data-ad-client="ca-pub-7672441336686997"
        data-ad-slot="auto-interstitial"
        data-ad-format="auto"
      >
        {/* Google AdSense Ready:
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-7672441336686997"
                 data-ad-slot="auto"
                 data-ad-format="auto" />
        */}
      </div>
      <span className="text-[9px] font-mono text-neutral-300 dark:text-neutral-600 select-none">
        Interstitial Unit
      </span>
    </div>
  );
};
