import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { AdContainer } from './components/AdContainer';
import { InterstitialModal } from './components/InterstitialModal';
import { TimedExitModal } from './components/TimedExitModal';
import { HomeHub } from './components/HomeHub';
import { FormFillerModule } from './components/FormFillerModule';
import { PageManagerGrid } from './components/PageManagerGrid';
import { SEOSection } from './components/SEOSection';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { Footer } from './components/Footer';
import { PdfToWordConverter } from './components/converters/PdfToWordConverter';
import { PdfToExcelConverter } from './components/converters/PdfToExcelConverter';
import { TextTableToPdfConverter } from './components/converters/TextTableToPdfConverter';
import { ToolRoute } from './types';
import { TOOLS } from './data/tools';
import { downloadPdfBlob } from './lib/pdfOperations';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { Language } from './i18n/translations';
import { parsePathname, buildLocalizedPath, updateDocumentSeo } from './lib/routing';

function AppContent() {
  const { t, getToolMeta, language, setLanguage } = useLanguage();

  // Routing state initialized from URL path (e.g. /es/obroc-pdf -> /obroc-pdf)
  const [currentPath, setCurrentPath] = useState<ToolRoute>(() => {
    if (typeof window !== 'undefined') {
      const parsed = parsePathname(window.location.pathname);
      return parsed.toolRoute;
    }
    return '/';
  });

  // Theme state (default light)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // Interstitial modal state
  const [interstitialOpen, setInterstitialOpen] = useState<boolean>(false);
  const [pendingDownload, setPendingDownload] = useState<{
    bytes?: Uint8Array;
    blobUrl?: string;
    fileName: string;
  } | null>(null);

  // Sync theme with HTML document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Sync route on mount and browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parsePathname(window.location.pathname);
      setCurrentPath(parsed.toolRoute);
      if (parsed.isLangInPath && parsed.lang !== language) {
        setLanguage(parsed.lang);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [language, setLanguage]);

  // Update dynamic document title, meta tags, and hreflang links on route or language change for Googlebot
  useEffect(() => {
    const currentToolMeta = getToolMeta(currentPath);
    updateDocumentSeo(currentPath, language, currentToolMeta, 'PDF Studio Online');
  }, [currentPath, language, getToolMeta]);

  // Multi-language navigate helper (keeps URL in sync with active language prefix)
  const navigateTo = (path: ToolRoute, targetLang?: Language) => {
    const activeLang = targetLang || language;
    setCurrentPath(path);
    if (targetLang && targetLang !== language) {
      setLanguage(targetLang);
    }
    const localizedUrl = buildLocalizedPath(path, activeLang);
    window.history.pushState({}, '', localizedUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for download request from PDF modules (bytes)
  const handleTriggerDownload = (bytes: Uint8Array, fileName: string) => {
    setPendingDownload({ bytes, fileName });
    setInterstitialOpen(true);
  };

  // Handler for download request from converter modules (blob URLs)
  const handleTriggerBlobDownload = (blobUrl: string, fileName: string) => {
    setPendingDownload({ blobUrl, fileName });
    setInterstitialOpen(true);
  };

  // When interstitial modal finishes (after 3 seconds)
  const handleInterstitialComplete = () => {
    setInterstitialOpen(false);
    if (pendingDownload) {
      if (pendingDownload.blobUrl) {
        const a = document.createElement('a');
        a.href = pendingDownload.blobUrl;
        a.download = pendingDownload.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pendingDownload.blobUrl);
      } else if (pendingDownload.bytes) {
        downloadPdfBlob(pendingDownload.bytes, pendingDownload.fileName);
      }
      setPendingDownload(null);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // ignore
      }
    }
  };

  // When files are dropped on the Home Hub
  const handleHubFileDrop = (
    files: { name: string; bytes: Uint8Array; size: number }[]
  ) => {
    if (files.length > 1) {
      navigateTo('/polacz-pdf');
    } else {
      navigateTo('/wypelnij-formularz-pdf');
    }
  };

  // Render active workspace module
  const renderActiveModule = () => {
    if (currentPath === '/') {
      return (
        <HomeHub
          onNavigate={navigateTo}
          onFileDrop={handleHubFileDrop}
        />
      );
    }

    if (currentPath === '/wypelnij-formularz-pdf') {
      return (
        <FormFillerModule
          key="form-filler"
          onTriggerDownload={handleTriggerDownload}
        />
      );
    }

    if (currentPath === '/pdf-to-word') {
      return (
        <PdfToWordConverter
          key="pdf-to-word"
          onTriggerDownload={handleTriggerBlobDownload}
        />
      );
    }

    if (currentPath === '/word-to-pdf') {
      return (
        <TextTableToPdfConverter
          key="word-to-pdf"
          mode="word"
          onTriggerDownload={handleTriggerBlobDownload}
        />
      );
    }

    if (currentPath === '/pdf-to-excel') {
      return (
        <PdfToExcelConverter
          key="pdf-to-excel"
          onTriggerDownload={handleTriggerBlobDownload}
        />
      );
    }

    if (currentPath === '/excel-to-pdf') {
      return (
        <TextTableToPdfConverter
          key="excel-to-pdf"
          mode="excel"
          onTriggerDownload={handleTriggerBlobDownload}
        />
      );
    }

    if (currentPath === '/polityka-privacy') {
      return <PrivacyPolicy onNavigate={navigateTo} />;
    }

    // Manager grid for delete, rotate, merge, split
    return (
      <PageManagerGrid
        key={currentPath}
        toolRoute={currentPath}
        onTriggerDownload={handleTriggerDownload}
      />
    );
  };

  const activeToolMeta = getToolMeta(currentPath);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 transition-colors">
      {/* Sleek Minimalist Sticky Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onLanguageChange={(newLang: Language) => navigateTo(currentPath, newLang)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      {/* Workspace with Desktop Skyscraper Ad Wings */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-2 sm:px-4 flex justify-center gap-3 lg:gap-6">
        {/* Left Skyscraper (Desktop only) */}
        <AdContainer type="sidebar-left" className="pt-4" />

        {/* Focused Workspace Layout (Clean, Wide, Uncluttered) */}
        <main className="flex-1 min-w-0 max-w-5xl mx-auto px-1 sm:px-4 py-4 sm:py-6 flex flex-col items-center">
          {/* Subtle Top Ad banner placeholder */}
          <AdContainer type="banner-top" />

          {/* Subpage Header (only on tools if desired, clean and understated) */}
          {currentPath !== '/' && (
            <div className="w-full max-w-5xl mb-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => navigateTo('/')}
                  className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  {t.common.home}
                </button>
                <span>/</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {activeToolMeta.shortName}
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                {activeToolMeta.tagline}
              </span>
            </div>
          )}

          {/* Active Working Module: Focused Workspace */}
          <div className="w-full flex justify-center">{renderActiveModule()}</div>

          {/* Standard Bottom Ad banner placeholder */}
          <div className="w-full max-w-4xl mt-8">
            <AdContainer type="banner-bottom" />
          </div>

          {/* Structured SEO Content Section (tools and home only) */}
          {currentPath !== '/polityka-privacy' && (
            <div className="w-full max-w-4xl mt-8">
              <SEOSection toolRoute={currentPath} />
            </div>
          )}
        </main>

        {/* Right Skyscraper (Desktop only) */}
        <AdContainer type="sidebar-right" className="pt-4" />
      </div>

      {/* 3-Second Download Interstitial Modal */}
      <InterstitialModal
        isOpen={interstitialOpen}
        onComplete={handleInterstitialComplete}
        fileName={pendingDownload?.fileName}
      />

      {/* Timed (30s) / Exit-Intent Pop-up Modal */}
      <TimedExitModal />

      {/* Cookie Consent Banner for Google AdSense / Ezoic */}
      <CookieConsentBanner onNavigate={navigateTo} />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
