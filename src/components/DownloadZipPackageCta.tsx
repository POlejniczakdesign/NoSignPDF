import React from 'react';
import { Download, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

interface DownloadZipPackageCtaProps {
  className?: string;
}

const CTA_STRINGS: Record<
  Language,
  {
    title: string;
    buttonText: string;
    description: string;
    badge: string;
  }
> = {
  pl: {
    title: 'Kompletna paczka dystrybucyjna aplikacji',
    buttonText: 'Pobierz spakowane pliki (.ZIP)',
    description:
      'Pobierz kompletną paczkę produkcyjną gotową do wdrożenia na Cloudflare Pages lub do uruchomienia offline w przeglądarce.',
    badge: 'Cloudflare Pages · 100% Offline Ready',
  },
  en: {
    title: 'Complete Application Distribution Package',
    buttonText: 'Download Packaged Files (.ZIP)',
    description:
      'Download the complete production build ready for instant deployment to Cloudflare Pages or offline in-browser usage.',
    badge: 'Cloudflare Pages · 100% Offline Ready',
  },
  es: {
    title: 'Paquete de distribución completo de la aplicación',
    buttonText: 'Descargar archivos empaquetados (.ZIP)',
    description:
      'Descarga el paquete de producción completo listo para implementar en Cloudflare Pages o usar offline en tu navegador.',
    badge: 'Cloudflare Pages · Listo para Offline',
  },
  hi: {
    title: 'संपूर्ण एप्लिकेशन वितरण पैकेज',
    buttonText: 'पैकेज्ड फाइलें डाउनलोड करें (.ZIP)',
    description:
      'Cloudflare Pages पर तुरंत डिप्लॉय करने या ब्राउज़र में ऑफ़लाइन उपयोग के लिए पूर्ण प्रोडक्शन पैकेज डाउनलोड करें।',
    badge: 'Cloudflare Pages · 100% ऑफ़लाइन तैयार',
  },
  pt: {
    title: 'Pacote de distribuição completo da aplicação',
    buttonText: 'Baixar arquivos empacotados (.ZIP)',
    description:
      'Baixe o pacote de produção completo pronto para publicação no Cloudflare Pages ou para uso 100% offline no seu navegador.',
    badge: 'Cloudflare Pages · 100% Pronto para Offline',
  },
  ru: {
    title: 'Полный дистрибутивный пакет приложения',
    buttonText: 'Скачать архив с файлами (.ZIP)',
    description:
      'Скачайте готовую производственную сборку для мгновенного развертывания на Cloudflare Pages или работы офлайн в браузере.',
    badge: 'Cloudflare Pages · 100% Готов к Офлайну',
  },
};

export const DownloadZipPackageCta: React.FC<DownloadZipPackageCtaProps> = ({
  className = '',
}) => {
  const { language } = useLanguage();
  const content = CTA_STRINGS[language] || CTA_STRINGS.en;

  return (
    <div
      id="download-zip-package-section"
      className={`w-full max-w-4xl mx-auto my-6 px-2 sm:px-0 ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 transition-colors shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center sm:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{content.badge}</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              {content.title}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {content.description}
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto flex justify-center">
            <a
              id="download-cloudflare-zip-cta"
              href="/cloudflare-pages-dist.zip"
              download="cloudflare-pages-dist.zip"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all duration-150 cursor-pointer w-full sm:w-auto"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>{content.buttonText}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
