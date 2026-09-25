import React, { useState } from 'react';
import {
  FileSignature,
  FileX,
  RotateCw,
  FileStack,
  Scissors,
  Minimize2,
  Images,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileText,
  FileSpreadsheet,
  Table as TableIcon,
  FileUp,
  Sparkles,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { ToolRoute, ToolMeta } from '../types';
import { FileUploader } from './FileUploader';
import { useLanguage } from '../i18n/LanguageContext';
import { getCumulativeStats, formatTimeSaved } from '../lib/timeSavedTracker';

interface HomeHubProps {
  onNavigate: (path: ToolRoute) => void;
  onFileDrop: (files: { name: string; bytes: Uint8Array; size: number }[]) => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({ onNavigate, onFileDrop }) => {
  const { t, localizedTools, language } = useLanguage();
  const [moreToolsOpen, setMoreToolsOpen] = useState(false);
  const [cumulativeStats] = useState(() => getCumulativeStats());

  // The 6 prominent hero tools required
  const HERO_TOOL_ROUTES: ToolRoute[] = [
    '/wypelnij-formularz-pdf',
    '/polacz-pdf',
    '/usun-strony-z-pdf',
    '/obroc-pdf',
    '/kompresuj-pdf',
    '/grafika-do-pdf',
  ];

  // Secondary tools (split, converters)
  const SECONDARY_TOOL_ROUTES: ToolRoute[] = [
    '/rozdziel-pdf',
    '/pdf-to-word',
    '/word-to-pdf',
    '/pdf-to-excel',
    '/excel-to-pdf',
  ];

  const getToolIcon = (route: ToolRoute) => {
    switch (route) {
      case '/wypelnij-formularz-pdf':
        return <FileSignature className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />;
      case '/polacz-pdf':
        return <FileStack className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />;
      case '/usun-strony-z-pdf':
        return <FileX className="w-7 h-7 text-rose-600 dark:text-rose-400" />;
      case '/obroc-pdf':
        return <RotateCw className="w-7 h-7 text-amber-600 dark:text-amber-400" />;
      case '/kompresuj-pdf':
        return <Minimize2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />;
      case '/grafika-do-pdf':
        return <Images className="w-7 h-7 text-violet-600 dark:text-violet-400" />;
      case '/rozdziel-pdf':
        return <Scissors className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case '/pdf-to-word':
        return <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case '/word-to-pdf':
        return <FileUp className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      case '/pdf-to-excel':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case '/excel-to-pdf':
        return <TableIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Zap className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />;
    }
  };

  const getIconBg = (route: ToolRoute) => {
    switch (route) {
      case '/wypelnij-formularz-pdf':
        return 'bg-indigo-50 dark:bg-indigo-950/60 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60';
      case '/polacz-pdf':
        return 'bg-emerald-50 dark:bg-emerald-950/60 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/60';
      case '/usun-strony-z-pdf':
        return 'bg-rose-50 dark:bg-rose-950/60 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/60';
      case '/obroc-pdf':
        return 'bg-amber-50 dark:bg-amber-950/60 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/60';
      case '/kompresuj-pdf':
        return 'bg-blue-50 dark:bg-blue-950/60 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60';
      case '/grafika-do-pdf':
        return 'bg-violet-50 dark:bg-violet-950/60 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/60';
      default:
        return 'bg-zinc-50 dark:bg-zinc-800';
    }
  };

  const heroTools = HERO_TOOL_ROUTES.map((route) => {
    const meta = localizedTools.find((t) => t.path === route);
    return (
      meta || {
        id: route,
        path: route,
        name: route,
        shortName: route,
        tagline: '',
        description: '',
        iconName: 'Zap',
        seoKeywords: [],
      }
    );
  });

  const secondaryTools = SECONDARY_TOOL_ROUTES.map((route) => {
    const meta = localizedTools.find((t) => t.path === route);
    return (
      meta || {
        id: route,
        path: route,
        name: route,
        shortName: route,
        tagline: '',
        description: '',
        iconName: 'Zap',
        seoKeywords: [],
      }
    );
  });

  const sectionHeadings = {
    pl: {
      gridTitle: 'Wybierz narzędzie do pracy z PDF',
      gridSubtitle: 'Wszystkie operacje wykonują się w 100% lokalnie w pamięci RAM Twojego komputera',
      moreTitle: 'Więcej przydatnych narzędzi (Dzielenie, Konwertery)',
      showMore: 'Pokaż pozostałe narzędzia',
      hideMore: 'Zwiń listę',
      quickDropTitle: 'Lub upuść plik PDF tutaj, aby natychmiast rozpocząć',
    },
    en: {
      gridTitle: 'Select a PDF Tool to Get Started',
      gridSubtitle: 'All operations execute 100% locally in your device RAM without cloud upload',
      moreTitle: 'More Useful Tools (Split, Text & Excel Converters)',
      showMore: 'Show all additional tools',
      hideMore: 'Collapse list',
      quickDropTitle: 'Or drop a PDF file here to start immediately',
    },
    es: {
      gridTitle: 'Elige una herramienta para tus archivos PDF',
      gridSubtitle: 'Todas las operaciones se procesan 100% en la memoria RAM de tu navegador',
      moreTitle: 'Más herramientas útiles (Dividir, Conversores)',
      showMore: 'Mostrar herramientas adicionales',
      hideMore: 'Ocultar lista',
      quickDropTitle: 'O arrastra un archivo PDF aquí para empezar de inmediato',
    },
    hi: {
      gridTitle: 'कार्य शुरू करने के लिए टूल चुनें',
      gridSubtitle: 'सभी कार्य बिना सर्वर पर अपलोड किए 100% आपके डिवाइस में होते हैं',
      moreTitle: 'अन्य उपयोगी टूल्स (विभाजन व कनवर्टर)',
      showMore: 'और टूल्स देखें',
      hideMore: 'सूची बंद करें',
      quickDropTitle: 'या सीधे काम शुरू करने के लिए यहाँ पीडीएफ फ़ाइल छोड़ें',
    },
  };

  const copy = sectionHeadings[language] || sectionHeadings.en;

  return (
    <div id="home-hub-view" className="w-full space-y-12">
      {/* Hero Presentation */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.home.heroBadge}</span>
          </div>

          {cumulativeStats.totalSavedSeconds > 0 && (
            <div
              id="hero-cumulative-time-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/10 text-zinc-800 dark:text-zinc-200 text-xs font-bold border border-amber-300/40 dark:border-amber-600/30 shadow-2xs"
            >
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                {language === 'pl' && `Łącznie na nosignpdf.com zaoszczędziłeś już ${formatTimeSaved(cumulativeStats.totalSavedSeconds, 'pl')}!`}
                {language === 'en' && `Total time saved on nosignpdf.com: ${formatTimeSaved(cumulativeStats.totalSavedSeconds, 'en')}!`}
                {language === 'es' && `¡Tiempo total ahorrado en nosignpdf.com: ${formatTimeSaved(cumulativeStats.totalSavedSeconds, 'es')}!`}
                {language === 'hi' && `nosignpdf.com पर अब तक कुल बचाया गया समय: ${formatTimeSaved(cumulativeStats.totalSavedSeconds, 'hi')}!`}
              </span>
            </div>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
          {t.home.heroTitle}{' '}
          <span className="text-indigo-600 dark:text-indigo-400 block sm:inline">
            {t.home.heroHighlight}
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {t.home.heroDesc}
        </p>
      </div>

      {/* Modern 6-Tile Grid (Large, rounded, modern cards) */}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {copy.gridTitle}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {copy.gridSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {heroTools.map((tool) => {
            const isNew = tool.path === '/kompresuj-pdf' || tool.path === '/grafika-do-pdf';
            const iconBg = getIconBg(tool.path);

            return (
              <div
                key={tool.id}
                id={`hero-card-${tool.id}`}
                onClick={() => onNavigate(tool.path)}
                className="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/80 dark:hover:border-indigo-400/80 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Card Header with Icon & Optional Badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs border border-zinc-100 dark:border-zinc-800 ${iconBg}`}
                    >
                      {getToolIcon(tool.path)}
                    </div>

                    {isNew && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-xs">
                        <Sparkles className="w-3 h-3" />
                        <span>{tool.badge || 'Nowość'}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                    {tool.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom Action Indicator */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>{t.home.launchModule}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Universal Quick Dropzone */}
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            {copy.quickDropTitle}
          </span>
        </div>
        <FileUploader
          onFilesSelected={(files) => {
            onFileDrop(files);
          }}
          multiple={true}
          sampleType="multipage"
          title={t.common.dropzoneTitle}
          subtitle={t.common.dropzoneSubtitle}
        />
      </div>

      {/* Secondary Tools Section (Collapsible / Clean) */}
      <div className="max-w-6xl mx-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              {copy.moreTitle}
            </h3>
          </div>
          <button
            onClick={() => setMoreToolsOpen(!moreToolsOpen)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            <span>{moreToolsOpen ? copy.hideMore : copy.showMore}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreToolsOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {moreToolsOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 animate-in fade-in duration-200">
            {secondaryTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onNavigate(tool.path)}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-2.5">
                    {getToolIcon(tool.path)}
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1 truncate">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-2 mt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center justify-between">
                  <span>Otwórz</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
