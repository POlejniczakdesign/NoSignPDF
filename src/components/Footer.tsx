import React from 'react';
import { FileText, Lock, ShieldCheck } from 'lucide-react';
import { ToolRoute } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { buildLocalizedPath } from '../lib/routing';

interface FooterProps {
  onNavigate: (path: ToolRoute) => void;
}

const FOOTER_SEO_INDEX_TITLES: Record<Language, string> = {
  pl: 'Szybki indeks modułów PDF',
  en: 'PDF Tools Index',
  es: 'Índice de herramientas PDF',
  hi: 'पीडीएफ टूल्स अनुक्रमणिका',
  pt: 'Índice de ferramentas PDF',
  ru: 'Индекс инструментов PDF',
};

const CORE_11_TOOL_IDS = [
  'wypelnij',
  'usun',
  'obroc',
  'polacz',
  'rozdziel',
  'pdf-to-word',
  'word-to-pdf',
  'pdf-to-excel',
  'excel-to-pdf',
  'kompresuj',
  'grafika',
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language, localizedTools } = useLanguage();

  const seoIndexTitle = FOOTER_SEO_INDEX_TITLES[language] || FOOTER_SEO_INDEX_TITLES.en;
  const nicheTools = localizedTools.filter((tool) => CORE_11_TOOL_IDS.includes(tool.id));

  return (
    <footer
      id="main-footer"
      className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-12 transition-colors mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-zinc-100 dark:border-zinc-800">
          {/* Col 1: About */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-950">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-zinc-900 dark:text-white">
                NoSignPDF
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              {t.footer.zeroUpload}
            </div>
          </div>

          {/* Col 2: Narzędzia PDF */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              {t.footer.toolsTitle}
            </h4>
            <ul className="space-y-1.5 text-xs">
              {nicheTools.map((tool) => {
                const localizedHref = buildLocalizedPath(tool.path, language);
                return (
                  <li key={tool.id}>
                    <a
                      id={`footer-link-${tool.id}`}
                      href={localizedHref}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(tool.path);
                      }}
                      className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer text-left block"
                    >
                      {tool.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Bezpieczeństwo i Prywatność */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              {t.footer.securityTitle}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t.footer.securityDesc}
            </p>
            <div className="pt-1 flex flex-col sm:flex-row flex-wrap gap-2">
              <button
                id="footer-privacy-policy-link"
                onClick={() => onNavigate('/polityka-privacy')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t.footer.privacyPolicy}</span>
              </button>
              <button
                id="footer-terms-link"
                onClick={() => onNavigate('/polityka-privacy')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <span>{t.footer.termsOfService}</span>
              </button>
              <button
                id="footer-cookie-link"
                onClick={() => onNavigate('/polityka-privacy')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <span>{t.footer.cookiePolicy}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Discreet SEO Text Links Grid (Discreet Crawl Booster for Googlebot across all 11 niche subpages) */}
        <div className="pt-8 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
            {seoIndexTitle}
          </div>
          <nav
            aria-label={seoIndexTitle}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2 text-[11px]"
          >
            {nicheTools.map((tool) => {
              const localizedHref = buildLocalizedPath(tool.path, language);
              return (
                <a
                  key={`seo-grid-${tool.id}`}
                  id={`footer-seo-link-${tool.id}`}
                  href={localizedHref}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(tool.path);
                  }}
                  className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors truncate"
                  title={tool.name}
                >
                  {tool.name}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom copyright and compliance */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} NoSignPDF. {t.footer.copyright}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <button
              id="footer-bottom-privacy-link"
              onClick={() => onNavigate('/polityka-privacy')}
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-2"
            >
              {t.footer.privacyPolicy}
            </button>
            <span>•</span>
            <button
              id="footer-bottom-terms-link"
              onClick={() => onNavigate('/polityka-privacy')}
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-2"
            >
              {t.footer.termsOfService}
            </button>
            <span>•</span>
            <button
              id="footer-bottom-cookies-link"
              onClick={() => onNavigate('/polityka-privacy')}
              className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-2"
            >
              {t.footer.cookiePolicy}
            </button>
            <span>•</span>
            <span>{t.footer.engine}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
