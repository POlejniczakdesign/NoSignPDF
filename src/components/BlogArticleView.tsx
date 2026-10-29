import React from 'react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  Share2,
  FileText,
  Layers,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { ToolRoute } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { BLOG_ARTICLES, BLOG_HUB_TRANSLATIONS, BlogArticle } from '../data/blogArticles';
import { buildLocalizedPath } from '../lib/routing';

interface BlogArticleViewProps {
  articleRoute: ToolRoute;
  onNavigate: (route: ToolRoute) => void;
}

export const BlogArticleView: React.FC<BlogArticleViewProps> = ({ articleRoute, onNavigate }) => {
  const { language } = useLanguage();
  const hubCopy = BLOG_HUB_TRANSLATIONS[language] || BLOG_HUB_TRANSLATIONS.en;
  const articles = BLOG_ARTICLES[language] || BLOG_ARTICLES.en;

  // Find active article
  const article = articles.find((a) => a.canonicalRoute === articleRoute) || articles[0];

  const localizedBlogHubHref = buildLocalizedPath('/blog', language);

  return (
    <div id="blog-article-view" className="w-full max-w-4xl mx-auto space-y-8 py-2">
      {/* Semantic Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {language === 'pl' ? 'Strona główna' : 'Home'}
        </button>
        <span>/</span>
        <a
          href={localizedBlogHubHref}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/blog');
          }}
          className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
        >
          {hubCopy.kicker}
        </a>
        <span>/</span>
        <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-[200px] sm:max-w-xs">
          {article.title}
        </span>
      </nav>

      {/* Main Article Container */}
      <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Article Header */}
        <header className="space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800/60 uppercase tracking-wider">
              {article.categoryBadge}
            </span>
            <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
              <span className="inline-flex items-center gap-1 font-medium text-zinc-600 dark:text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>{article.readingTime}</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>{article.publishDate}</span>
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
            {article.subtitle}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-xs border border-zinc-200 dark:border-zinc-700">
              <User className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-zinc-900 dark:text-white block">
                {article.author}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">
                {article.authorRole}
              </span>
            </div>
          </div>
        </header>

        {/* Article Body Sections */}
        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {article.sections.map((sec, secIdx) => (
            <section key={secIdx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight pt-2">
                {sec.heading}
              </h2>

              {sec.subheading && (
                <h3 className="text-base sm:text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                  {sec.subheading}
                </h3>
              )}

              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                  {para}
                </p>
              ))}

              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <ul className="space-y-2.5 my-4 pl-2 list-none">
                  {sec.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold text-zinc-900 dark:text-white mr-1.5">
                          {bp.label}
                        </strong>
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {bp.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {sec.callout && (
                <div className="my-6 p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{sec.callout.title}</span>
                  </span>
                  <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">
                    {sec.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Recommended Client-Side Tools Call to Action */}
        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              {hubCopy.relatedToolsLabel}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {article.relatedTools.map((tool, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(tool.route)}
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-zinc-200/60 dark:border-zinc-700/60 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-between">
                  <span>{language === 'pl' ? 'Uruchom narzędzie' : 'Launch tool'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{hubCopy.backToBlog}</span>
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <span>{hubCopy.backToTools}</span>
          </button>
        </footer>
      </article>
    </div>
  );
};
