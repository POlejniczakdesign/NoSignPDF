import React, { useState, useRef, useEffect } from 'react';
import {
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Check,
  LayoutGrid,
  FileSignature,
  FileX,
  RotateCw,
  FileStack,
  Scissors,
  ShieldCheck,
  FileText,
  FileSpreadsheet,
  Table as TableIcon,
  FileUp,
  Sparkles,
  Minimize2,
  Images,
} from 'lucide-react';
import { ToolRoute } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES, Language } from '../i18n/translations';

interface HeaderProps {
  currentPath: ToolRoute;
  onNavigate: (path: ToolRoute) => void;
  onLanguageChange?: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const CATEGORY_NAMES: Record<
  Language,
  {
    allTools: string;
    pagesAndForms: string;
    conversionAndExtra: string;
  }
> = {
  pl: {
    allTools: 'Wszystkie Narzędzia',
    pagesAndForms: 'Edycja Stron i Formularzy',
    conversionAndExtra: 'Konwersja i Dodatkowe Moduły',
  },
  en: {
    allTools: 'All Tools',
    pagesAndForms: 'Pages & Form Editing',
    conversionAndExtra: 'Conversion & Utility Tools',
  },
  es: {
    allTools: 'Todas las Herramientas',
    pagesAndForms: 'Edición de Páginas y Formularios',
    conversionAndExtra: 'Conversión y Módulos Extra',
  },
  hi: {
    allTools: 'सभी टूल्स',
    pagesAndForms: 'पृष्ठ और फॉर्म संपादन',
    conversionAndExtra: 'रूपांतरण और उपयोगिता टूल्स',
  },
  pt: {
    allTools: 'Todas as Ferramentas',
    pagesAndForms: 'Edição de Páginas e Formulários',
    conversionAndExtra: 'Conversão e Módulos Úteis',
  },
  ru: {
    allTools: 'Все Инструменты',
    pagesAndForms: 'Редактирование Страниц и Форм',
    conversionAndExtra: 'Конвертация и Дополнительные Модули',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onLanguageChange,
  isDark,
  onToggleTheme,
}) => {
  const { language, setLanguage, t, localizedTools } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);

  const categories = CATEGORY_NAMES[language] || CATEGORY_NAMES.en;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangMenuOpen(false);
      }
      if (
        toolsDropdownRef.current &&
        !toolsDropdownRef.current.contains(e.target as Node)
      ) {
        setToolsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileSignature':
        return <FileSignature className="w-4 h-4" />;
      case 'FileX':
        return <FileX className="w-4 h-4" />;
      case 'RotateCw':
        return <RotateCw className="w-4 h-4" />;
      case 'FileStack':
        return <FileStack className="w-4 h-4" />;
      case 'Scissors':
        return <Scissors className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      case 'FileText':
        return <FileText className="w-4 h-4" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-4 h-4" />;
      case 'Table':
        return <TableIcon className="w-4 h-4" />;
      case 'FileUp':
        return <FileUp className="w-4 h-4" />;
      case 'Minimize2':
        return <Minimize2 className="w-4 h-4" />;
      case 'Images':
        return <Images className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // The 4 prominent navigation links requested by user
  const primaryNavRoutes: ToolRoute[] = [
    '/wypelnij-formularz-pdf',
    '/usun-strony-z-pdf',
    '/obroc-pdf',
    '/polacz-pdf',
  ];

  // Additional tools grouped for dropdown
  const otherPageTools = localizedTools.filter(
    (tool) =>
      !primaryNavRoutes.includes(tool.path) &&
      tool.path !== '/' &&
      tool.path !== '/polityka-privacy' &&
      !['/pdf-to-word', '/word-to-pdf', '/pdf-to-excel', '/excel-to-pdf'].includes(tool.path)
  );

  const conversionTools = localizedTools.filter((tool) =>
    ['/pdf-to-word', '/word-to-pdf', '/pdf-to-excel', '/excel-to-pdf'].includes(tool.path)
  );

  const isMoreActive =
    otherPageTools.some((t) => t.path === currentPath) ||
    conversionTools.some((t) => t.path === currentPath);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Left: Minimalist Logo + NoSignPDF Wordmark */}
        <div
          id="brand-logo"
          onClick={() => {
            onNavigate('/');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            {/* Elegant SVG Document with Integrated Security Shield */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2v6h6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11c1.8 0 3.2.9 3.2 2.3 0 2.2-3.2 4.2-3.2 4.2s-3.2-2-3.2-4.2c0-1.4 1.4-2.3 3.2-2.3z"
                fill="currentColor"
                fillOpacity="0.3"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m10.5 13.5 1.2 1.2 2.3-2.3"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
              NoSign<span className="text-blue-600 dark:text-blue-400">PDF</span>
            </span>
          </div>
        </div>

        {/* Center: Spacious, High-Contrast Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {primaryNavRoutes.map((route) => {
            const tool = localizedTools.find((t) => t.path === route);
            if (!tool) return null;
            const isActive = currentPath === route;

            return (
              <button
                key={tool.id}
                id={`nav-${tool.id}`}
                onClick={() => onNavigate(tool.path)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/80 dark:bg-blue-950/40'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tool.shortName}</span>
              </button>
            );
          })}

          {/* "Więcej Narzędzi" / "All Tools" Dropdown */}
          <div className="relative" ref={toolsDropdownRef}>
            <button
              id="all-tools-dropdown-btn"
              type="button"
              onClick={() => setToolsMenuOpen(!toolsMenuOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                toolsMenuOpen || isMoreActive
                  ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/80 dark:bg-blue-950/40'
                  : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{categories.allTools}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  toolsMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu Overlay */}
            {toolsMenuOpen && (
              <div
                id="all-tools-dropdown-menu"
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Column 1: Document & Page tools */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 py-1 flex items-center gap-1.5">
                      <FileSignature className="w-3.5 h-3.5" />
                      <span>{categories.pagesAndForms}</span>
                    </div>
                    {otherPageTools.map((tool) => {
                      const isActive = currentPath === tool.path;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => {
                            onNavigate(tool.path);
                            setToolsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold'
                              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {getToolIcon(tool.iconName)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium truncate">{tool.name}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Column 2: Conversion & utility tools */}
                  <div className="space-y-1 border-l border-slate-100 dark:border-slate-800 pl-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 px-2 py-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{categories.conversionAndExtra}</span>
                      </span>
                    </div>

                    {conversionTools.map((tool) => {
                      const isActive = currentPath === tool.path;
                      return (
                        <button
                          key={tool.id}
                          id={`dropdown-tool-${tool.id}`}
                          onClick={() => {
                            onNavigate(tool.path);
                            setToolsMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold'
                              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                            {getToolIcon(tool.iconName)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium truncate">{tool.name}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: Modern Language Dropdown (6 Flags) & Theme Switcher */}
        <div className="flex items-center gap-3">
          {/* Modern Language Selector Dropdown (Clean, No "PL PL" duplicate) */}
          <div className="relative" ref={langDropdownRef}>
            <button
              id="language-switcher-btn"
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors cursor-pointer shadow-xs"
              title={t.header.selectLanguage}
            >
              <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <span className="text-sm leading-none">{currentLangObj.flag}</span>
              <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">
                {currentLangObj.nativeName}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-400 transition-transform duration-200 ${
                  langMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {langMenuOpen && (
              <div
                id="language-dropdown-menu"
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
                  {t.header.selectLanguage}
                </div>
                {LANGUAGES.map((langItem) => {
                  const isSelected = language === langItem.code;
                  return (
                    <button
                      key={langItem.code}
                      id={`lang-opt-${langItem.code}`}
                      type="button"
                      onClick={() => {
                        if (onLanguageChange) {
                          onLanguageChange(langItem.code as Language);
                        } else {
                          setLanguage(langItem.code as Language);
                        }
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{langItem.flag}</span>
                        <span>{langItem.nativeName}</span>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Aesthetic Theme Switcher (Delicate circular button) */}
          <button
            id="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDark ? t.header.themeLight : t.header.themeDark}
            title={isDark ? t.header.themeLight : t.header.themeDark}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shadow-xs"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500 transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300 transition-transform duration-200 hover:-rotate-12" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shadow-xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-zinc-900 px-4 pt-3 pb-6 space-y-2 shadow-lg max-h-[80vh] overflow-y-auto">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
            {t.header.menuTools}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {localizedTools
              .filter((tool) => tool.id !== 'privacy' && tool.id !== 'hub')
              .map((tool) => {
                const isActive = currentPath === tool.path;
                return (
                  <button
                    key={tool.id}
                    id={`mobile-nav-${tool.id}`}
                    onClick={() => {
                      onNavigate(tool.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {getToolIcon(tool.iconName)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium truncate">{tool.name}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                        {tool.tagline}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Mobile Theme Switcher */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                onToggleTheme();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
                <span>{isDark ? t.header.themeLight : t.header.themeDark}</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800">
                {isDark ? 'Dark' : 'Light'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
