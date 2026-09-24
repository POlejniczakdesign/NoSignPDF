import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Cookie,
  Server,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  FileText,
  FileCheck2,
} from 'lucide-react';
import { ToolRoute } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { PRIVACY_CONTENT } from '../i18n/privacyContent';

interface PrivacyPolicyProps {
  onNavigate: (path: ToolRoute) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'privacy' | 'terms'>('all');

  const content = PRIVACY_CONTENT[language] || PRIVACY_CONTENT.en;

  const showPrivacy = activeTab === 'all' || activeTab === 'privacy';
  const showTerms = activeTab === 'all' || activeTab === 'terms';

  return (
    <div id="privacy-policy-view" className="w-full max-w-4xl mx-auto py-4 sm:py-8 px-2 sm:px-0">
      {/* Top back & compliance header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          id="privacy-back-btn"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{content.backBtn}</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{content.badge}</span>
        </div>
      </div>

      {/* Main Container Card */}
      <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Document Header */}
        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-11 h-11 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
                {content.tagline}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {content.title}
              </h1>
            </div>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2">
            {content.intro}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            {content.tabs.all}
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{content.tabs.privacy}</span>
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xs'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{content.tabs.terms}</span>
          </button>
        </div>

        {/* Security Highlights Bento Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 flex items-start gap-3">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                {content.highlights.ramTitle}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                {content.highlights.ramDesc}
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 flex items-start gap-3">
            <Cookie className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                {content.highlights.adsTitle}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                {content.highlights.adsDesc}
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 flex items-start gap-3">
            <Server className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                {content.highlights.logsTitle}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                {content.highlights.logsDesc}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: Privacy Policy */}
        {showPrivacy && (
          <div id="privacy-section" className="space-y-6 pt-2">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg sm:text-xl font-bold">{content.privacyHeading}</h2>
            </div>

            {content.privacySections.map((sec, idx) => (
              <section key={idx} className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                  {sec.title}
                </h3>
                <ul className="space-y-2 pl-4 sm:pl-6 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc leading-relaxed">
                  {sec.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </section>
            ))}

            {/* Google AdSense specific required disclosure */}
            <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Cookie className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                  {content.adsHeading}
                </h3>
              </div>
              <ul className="space-y-2 pl-4 sm:pl-6 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc leading-relaxed">
                {content.adsText.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>

              <div className="mt-3 p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl space-y-2">
                <p className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                  {content.adsOptOutLabel}
                </p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-800 dark:text-amber-300 underline hover:text-amber-950 dark:hover:text-amber-100 inline-flex items-center gap-1"
                  >
                    <span>{content.googleSettingsLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-amber-400">•</span>
                  <a
                    href="https://www.aboutads.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-800 dark:text-amber-300 underline hover:text-amber-950 dark:hover:text-amber-100 inline-flex items-center gap-1"
                  >
                    <span>{content.aboutAdsLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* Server logs */}
            <section className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                {content.logsHeading}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 pl-4 sm:pl-6 leading-relaxed">
                {content.logsText}
              </p>
            </section>
          </div>
        )}

        {/* SECTION: Terms of Service */}
        {showTerms && (
          <div id="terms-section" className="space-y-6 pt-4 border-t-2 border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <FileCheck2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg sm:text-xl font-bold">{content.termsHeading}</h2>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {content.termsIntro}
            </p>

            {content.termsSections.map((sec, idx) => (
              <section key={idx} className="space-y-2.5">
                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                  {sec.title}
                </h3>
                <ul className="space-y-2 pl-4 sm:pl-6 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc leading-relaxed">
                  {sec.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {/* Footer verification note */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>
              {content.updatedLabel} {new Date().toISOString().split('T')[0]}
            </span>
          </div>
          <div>{content.adminLabel}</div>
        </div>
      </article>
    </div>
  );
};
