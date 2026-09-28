import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  FileSignature,
  FileStack,
  Minimize2,
  Lock,
  Cpu,
  Award,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileCheck,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PUBLISHER_CONTENT, GuideArticle } from '../i18n/publisherContent';

export const PublisherContentGuide: React.FC = () => {
  const { language } = useLanguage();
  const content = PUBLISHER_CONTENT[language] || PUBLISHER_CONTENT.pl;

  // Track expanded guide articles
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({
    'metadata-guide': true,
    'sign-forms-guide': true,
    'merge-guide': true,
    'compression-guide': true,
  });

  const toggleArticle = (id: string) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getArticleIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'FileSignature':
        return <FileSignature className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'FileStack':
        return <FileStack className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Minimize2':
        return <Minimize2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <article
      id="publisher-content-guide"
      className="w-full max-w-5xl mx-auto my-12 space-y-16 text-zinc-900 dark:text-zinc-100"
      aria-label="Dlaczego NoSignPDF i Baza Wiedzy"
    >
      {/* ========================================================================= */}
      {/* SECTION 1: DLACZEGO NOSIGNPDF? (Why NoSignPDF? Client-Side Privacy Deep Dive) */}
      {/* ========================================================================= */}
      <section className="space-y-8 bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{content.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
            {content.mainHeading}
          </h2>

          <p className="text-base sm:text-lg font-medium text-emerald-700 dark:text-emerald-400 leading-relaxed">
            {content.subHeading}
          </p>
        </div>

        {/* Narrative In-depth Explanation Paragraphs */}
        <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-6">
          {content.whyUsIntro.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 4 Pillars Grid (Key Enterprise Features) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {content.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-700/60 space-y-2 hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 font-bold text-xs">
                  {idx + 1}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-10.5">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Business Document Security Callout */}
        <div className="rounded-2xl p-6 bg-linear-to-br from-zinc-50 via-emerald-50/20 to-teal-50/30 dark:from-zinc-800/60 dark:via-zinc-800/30 dark:to-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Bezpieczeństwo Danych Wrażliwych</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
            {content.businessSafetyTitle}
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {content.businessSafetyParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: SŁOWNIK I BAZA WIEDZY PDF (PDF Knowledge Base & Expert Guide) */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Edukacja & Kompendium Wiedzy</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {content.guideTitle}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {content.guideSubtitle}
          </p>
        </div>

        {/* 4 In-depth Educational Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.guideArticles.map((article) => {
            const isExpanded = !!expandedArticles[article.id];

            return (
              <div
                key={article.id}
                id={`guide-${article.id}`}
                className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7 shadow-sm space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Article Icon & Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-2xs border border-zinc-200/60 dark:border-zinc-700/60">
                      {getArticleIcon(article.iconName)}
                    </div>

                    <button
                      onClick={() => toggleArticle(article.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      aria-label="Rozwiń treść artykułu"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Expandable Extended Body */}
                  {isExpanded && (
                    <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed animate-in fade-in duration-200">
                      {article.content.map((para, pIdx) => (
                        <p key={pIdx} className="leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Toggle Indicator */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleArticle(article.id)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer select-none"
                  >
                    <span>{isExpanded ? 'Zwiń artykuł' : 'Czytaj pełne omówienie'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Quote / Editorial Conclusion */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 text-white dark:bg-zinc-950 border border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3">
            <Sparkles className="w-6 h-6 text-emerald-400 mx-auto" />
            <blockquote className="text-sm sm:text-base md:text-lg font-semibold italic text-zinc-100 leading-relaxed">
              "{content.quote.text}"
            </blockquote>
            <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
              — {content.quote.author}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};
