import React from 'react';
import {
  FileSignature,
  FileX,
  RotateCw,
  FileStack,
  Scissors,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileText,
  FileSpreadsheet,
  Table as TableIcon,
  FileUp,
} from 'lucide-react';
import { ToolRoute } from '../types';
import { FileUploader } from './FileUploader';
import { useLanguage } from '../i18n/LanguageContext';

interface HomeHubProps {
  onNavigate: (path: ToolRoute) => void;
  onFileDrop: (files: { name: string; bytes: Uint8Array; size: number }[]) => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({ onNavigate, onFileDrop }) => {
  const { t, localizedTools } = useLanguage();

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileSignature':
        return <FileSignature className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'FileX':
        return <FileX className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      case 'RotateCw':
        return <RotateCw className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'FileStack':
        return <FileStack className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Scissors':
        return <Scissors className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Table':
        return <TableIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'FileUp':
        return <FileUp className="w-6 h-6 text-violet-600 dark:text-violet-400" />;
      default:
        return <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const actionableTools = localizedTools.filter((tool) => tool.path !== '/');

  return (
    <div id="home-hub-view" className="w-full space-y-10">
      {/* Hero Presentation */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          {t.home.heroBadge}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {t.home.heroTitle}{' '}
          <span className="text-indigo-600 dark:text-indigo-400 block sm:inline">
            {t.home.heroHighlight}
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {t.home.heroDesc}
        </p>
      </div>

      {/* Quick Launch Uploader */}
      <FileUploader
        onFilesSelected={(files) => {
          onFileDrop(files);
        }}
        multiple={true}
        sampleType="multipage"
        title={t.common.dropzoneTitle}
        subtitle={t.common.dropzoneSubtitle}
      />

      {/* Grid of Tools (Hub Cards) */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {t.home.modulesTitle}
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {t.home.modulesCount}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {actionableTools.map((tool) => (
            <div
              key={tool.id}
              id={`tool-card-${tool.id}`}
              onClick={() => onNavigate(tool.path)}
              className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs border border-slate-100 dark:border-slate-700">
                    {getToolIcon(tool.iconName)}
                  </div>
                  {tool.badge && (
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500 text-white shadow-xs">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                  {tool.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <span>{t.home.launchModule}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
