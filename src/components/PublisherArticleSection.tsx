import React, { useState } from 'react';
import {
  ShieldCheck,
  BookOpen,
  FileText,
  Lock,
  Zap,
  CheckCircle2,
  HelpCircle,
  Cpu,
  FileCheck2,
  Trash2,
  FileSignature,
  Maximize2,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ToolRoute } from '../types';
import { PUBLISHER_CONTENT } from '../data/publisherContent';

interface PublisherArticleSectionProps {
  onNavigate: (route: ToolRoute) => void;
}

export const PublisherArticleSection: React.FC<PublisherArticleSectionProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [openGuideIndex, setOpenGuideIndex] = useState<number | null>(0);

  const content = PUBLISHER_CONTENT[language] || PUBLISHER_CONTENT.en;

  const toggleGuide = (idx: number) => {
    setOpenGuideIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="publisher-content-hub"
      aria-label={content.sectionAriaLabel}
      className="w-full max-w-5xl mx-auto mt-12 mb-8 px-2 sm:px-4 space-y-10"
    >
      {/* 1. SEKCJA "DLACZEGO NOSIGNPDF?" (Why NoSignPDF / Privacy-First Architecture) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        {/* Header Badge & Title */}
        <div className="space-y-3 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{content.whyBadge}</span>
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">•</span>
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {content.whyReadingTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {content.whyTitle}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {content.whyLead}
          </p>
        </div>

        {/* 3 Pillars / Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.whyPillars.map((pillar, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 space-y-2.5"
            >
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center justify-center shadow-2xs">
                {i === 0 && <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                {i === 1 && <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                {i === 2 && <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* In-depth Article Body */}
        <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pt-2">
          {content.whyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      {/* 2. SŁOWNIK I EDUKACJA (PDF Guide: Definitive Knowledge Base) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{content.guideBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {content.guideTitle}
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm sm:text-right">
            {content.guideSubtitle}
          </p>
        </div>

        {/* Interactive Guide Chapters */}
        <div className="space-y-4">
          {content.guideArticles.map((article, idx) => {
            const isOpen = openGuideIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? 'border-indigo-200 dark:border-indigo-800 bg-zinc-50/50 dark:bg-zinc-800/30 shadow-xs'
                    : 'border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleGuide(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer gap-3"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-100/70 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="leading-snug">{article.title}</span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 pt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 space-y-4">
                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                      {article.lead}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {article.bulletPoints.map((bp, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-semibold text-zinc-900 dark:text-white block">
                              {bp.label}
                            </strong>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                              {bp.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="pt-2 text-xs sm:text-sm">{article.conclusion}</p>

                    {article.actionRoute && (
                      <div className="pt-2 flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => onNavigate(article.actionRoute!)}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer"
                        >
                          <span>{article.actionLabel}</span>
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
