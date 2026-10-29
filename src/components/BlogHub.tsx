import React from 'react';
import {
  BookOpen,
  ShieldCheck,
  FileText,
  FileSignature,
  ArrowRight,
  Clock,
  Sparkles,
  Lock,
  Cpu,
  Layers,
} from 'lucide-react';
import { ToolRoute } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { BLOG_ARTICLES, BLOG_HUB_TRANSLATIONS, BlogArticle } from '../data/blogArticles';
import { buildLocalizedPath } from '../lib/routing';

interface BlogHubProps {
  onNavigate: (route: ToolRoute) => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const hubCopy = BLOG_HUB_TRANSLATIONS[language] || BLOG_HUB_TRANSLATIONS.en;
  const articles = BLOG_ARTICLES[language] || BLOG_ARTICLES.en;

  const getArticleIcon = (id: string) => {
    switch (id) {
      case 'cloud-pdf-security':
        return <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'pdf-metadata-guide':
        return <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'legal-pdf-iso-acroforms':
        return <FileSignature className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <BookOpen className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />;
    }
  };

  return (
    <div id="blog-hub-view" className="w-full max-w-5xl mx-auto space-y-10 py-4">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{hubCopy.kicker}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
          {hubCopy.hubHeading}
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {hubCopy.hubLead}
        </p>
      </div>

      {/* Featured 3 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article: BlogArticle) => {
          const localizedHref = buildLocalizedPath(article.canonicalRoute, language);

          return (
            <article
              key={article.id}
              id={`blog-card-${article.id}`}
              className="group rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/80 dark:hover:border-indigo-400/80 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {getArticleIcon(article.id)}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {article.categoryBadge}
                  </span>
                </div>

                {/* Metadata: Reading Time & Date */}
                <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                  <span className="inline-flex items-center gap-1 font-medium text-zinc-600 dark:text-zinc-400">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{article.readingTime}</span>
                  </span>
                  <span>•</span>
                  <span>{article.publishDate}</span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  <a
                    href={localizedHref}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(article.canonicalRoute);
                    }}
                    className="hover:underline focus:outline-hidden"
                  >
                    {article.title}
                  </a>
                </h2>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Card Footer: Action */}
              <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800">
                <a
                  href={localizedHref}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(article.canonicalRoute);
                  }}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors"
                >
                  <span>{hubCopy.readArticleBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Trust & Architecture Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-indigo-50/60 via-white to-emerald-50/60 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Architektura Zero-Upload w Praktyce
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Każdy poradnik opisuje standardy stosowane bezpośrednio w silniku NoSignPDF
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shrink-0 cursor-pointer"
          >
            {hubCopy.backToTools}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="space-y-1">
            <span className="font-bold text-zinc-800 dark:text-zinc-200 block">
              1. Pamięć RAM komputera
            </span>
            <p>
              Przetwarzanie dokumentów zachodzi w odizolowanym procesie przeglądarki bez dotykania serwera.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-zinc-800 dark:text-zinc-200 block">
              2. Brak zapisu na dysku
            </span>
            <p>
              Po zamknięciu karty bufor pamięci jest czyszczony przez silnik JavaScript Garbage Collector.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-zinc-800 dark:text-zinc-200 block">
              3. Zgodność z RODO i NIS2
            </span>
            <p>
              Brak powierzenia przetwarzania danych podmiotom trzecim (brak konieczności umów DPA).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
