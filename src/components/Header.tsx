import React, { useState, useRef, useEffect } from 'react';
import {
  FileSignature,
  FileX,
  RotateCw,
  FileStack,
  Scissors,
  LayoutGrid,
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Lock,
  Globe,
  Check,
  ChevronDown,
  Download,
  ShieldCheck,
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

  // Close menus on outside click
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

  // Group tools into categories for the dropdown menu
  const primaryPageTools = localizedTools.filter((tool) =>
    [
      '/wypelnij-formularz-pdf',
      '/polacz-pdf',
      '/kompresuj-pdf',
      '/grafika-do-pdf',
      '/usun-strony-z-pdf',
      '/obroc-pdf',
      '/rozdziel-pdf',
    ].includes(tool.path)
  );

  const conversionTools = localizedTools.filter((tool) =>
    ['/pdf-to-word', '/word-to-pdf', '/pdf-to-excel', '/excel-to-pdf'].includes(tool.path)
  );

  const isConversionActive = conversionTools.some((t) => t.path === currentPath);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <div
          id="brand-logo"
          onClick={() => {
            onNavigate('/');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-950 shadow-2xs group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex items-center">
            <span className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-white">
              PDF Studio <span className="font-normal text-zinc-500 dark:text-zinc-400">Online</span>
            </span>
          </div>
        </div>

        {/* Center: Discreet Tool Tabs + "Wszystkie Narzędzia" Dropdown Menu */}
        <nav className="hidden lg:flex items-center p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 text-xs">
          {/* Quick primary tools */}
          {primaryPageTools.slice(0, 4).map((tool) => {
            const isActive = currentPath === tool.path;
            return (
              <button
                key={tool.id}
                id={`nav-${tool.id}`}
                onClick={() => onNavigate(tool.path)}
                className={`relative px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40'
                }`}
              >
                <span>{tool.shortName}</span>
              </button>
            );
          })}

          {/* "Wszystkie Narzędzia" Dropdown Toggle */}
          <div className="relative" ref={toolsDropdownRef}>
            <button
              id="all-tools-dropdown-btn"
              type="button"
              onClick={() => setToolsMenuOpen(!toolsMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                toolsMenuOpen || isConversionActive
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/40 dark:hover:bg-zinc-800/40'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Wszystkie Narzędzia</span>
              {isConversionActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              )}
              <ChevronDown className={`w-3 h-3 transition-transform ${toolsMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Overlay */}
            {toolsMenuOpen && (
              <div
                id="all-tools-dropdown-menu"
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Column 1: Document & Page tools */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-2 py-1 flex items-center gap-1.5">
                      <FileSignature className="w-3 h-3" />
                      <span>Edycja Stron i Formularzy</span>
                    </div>
                    {primaryPageTools.map((tool) => {
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
                              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                          }`}
                        >
                          <div className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                            {getToolIcon(tool.iconName)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium truncate">{tool.name}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Column 2: Conversion tools (New!) */}
                  <div className="space-y-1 border-l border-zinc-100 dark:border-zinc-800 pl-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 px-2 py-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Konwersja Tekstu i Arkuszy</span>
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        NOWE
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
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-semibold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                          }`}
                        >
                          <div className="p-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
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

        {/* Right side: Language switcher, Theme toggle, Cloudflare zip, Mobile menu */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              id="language-switcher-btn"
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title={t.header.selectLanguage}
            >
              <Globe className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span className="font-mono uppercase text-[11px] font-semibold">{currentLangObj.code}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {langMenuOpen && (
              <div
                id="language-dropdown-menu"
                className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
              >
                <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 mb-1">
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
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold'
                          : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{langItem.flag}</span>
                        <span>{langItem.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme switcher */}
          <button
            id="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Przełącz na jasny motyw' : 'Przełącz na ciemny motyw'}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title={isDark ? 'Jasny motyw' : 'Ciemny motyw'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          {/* Cloudflare Pages Zip Download Button */}
          <a
            id="download-cloudflare-zip-btn"
            href="/cloudflare-pages-dist.zip"
            download="cloudflare-pages-dist.zip"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-all cursor-pointer"
            title="Pobierz gotową paczkę ZIP dla Cloudflare Pages"
          >
            <Download className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>.ZIP</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Otwórz menu nawigacji"
            className="lg:hidden p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-3 pb-5 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider px-2 mb-2">
            {t.header.menuTools}
          </p>

          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2 pt-1">
            Edycja Stron i Formularzy
          </div>
          {primaryPageTools.map((tool) => {
            const isActive = currentPath === tool.path;
            return (
              <button
                key={tool.id}
                id={`mobile-nav-${tool.id}`}
                onClick={() => {
                  onNavigate(tool.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1 rounded-md ${isActive ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
                    {getToolIcon(tool.iconName)}
                  </div>
                  <span>{tool.name}</span>
                </div>
              </button>
            );
          })}

          <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider px-2 pt-3">
            Konwersja Tekstu i Arkuszy (Nowość)
          </div>
          {conversionTools.map((tool) => {
            const isActive = currentPath === tool.path;
            return (
              <button
                key={tool.id}
                id={`mobile-nav-${tool.id}`}
                onClick={() => {
                  onNavigate(tool.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-blue-950 text-blue-600'}`}>
                    {getToolIcon(tool.iconName)}
                  </div>
                  <span>{tool.name}</span>
                </div>
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-blue-600 text-white">
                  Nowość
                </span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-2 pb-1.5">
              {t.header.selectLanguage}
            </div>
            <div className="grid grid-cols-2 gap-1.5 px-1">
              {LANGUAGES.map((langItem) => {
                const isSelected = language === langItem.code;
                return (
                  <button
                    key={langItem.code}
                    id={`mobile-lang-${langItem.code}`}
                    type="button"
                    onClick={() => {
                      if (onLanguageChange) {
                        onLanguageChange(langItem.code as Language);
                      } else {
                        setLanguage(langItem.code as Language);
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{langItem.flag}</span>
                      <span>{langItem.name}</span>
                    </div>
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <button
              id="mobile-theme-toggle"
              type="button"
              onClick={() => {
                onToggleTheme();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
                <span>{isDark ? t.header.themeLight : t.header.themeDark}</span>
              </div>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800">
                {isDark ? 'Dark' : 'Light'}
              </span>
            </button>
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <a
              id="mobile-download-cloudflare-zip-btn"
              href="/cloudflare-pages-dist.zip"
              download="cloudflare-pages-dist.zip"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center gap-2">
                <Download className="w-3.5 h-3.5 text-zinc-500" />
                <span>Pobierz paczkę ZIP (Cloudflare Pages)</span>
              </div>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                .ZIP
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

