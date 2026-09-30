import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Check,
  X,
  HelpCircle,
  Award,
  Lock,
  Zap,
  ShieldCheck,
  FileCheck2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ToolRoute } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { AdContainer } from './AdContainer';

interface SEOSectionProps {
  toolRoute: ToolRoute;
}

export const SEOSection: React.FC<SEOSectionProps> = ({ toolRoute }) => {
  const { getSeoData, getToolMeta, language } = useLanguage();
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const seoData = getSeoData(toolRoute);
  const currentTool = getToolMeta(toolRoute);

  // Dynamically inject JSON-LD structured data (HowTo and FAQPage) into <head>
  useEffect(() => {
    const scriptId = 'nosignpdf-jsonld-schema';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const currentUrl = window.location.href;

    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: seoData.h2Title,
      description: seoData.intro,
      inLanguage: language,
      step: seoData.steps.map((step, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: step.title,
        text: step.desc,
      })),
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: language,
      mainEntity: seoData.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    const softwareAppSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'NoSignPDF',
      url: currentUrl,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and WebAssembly support',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
      },
      featureList: [
        'Client-side PDF processing',
        'Zero data collection',
        'No sign-up or registration required',
        'No watermarks',
        'Instant RAM processing',
      ],
    };

    scriptElement.textContent = JSON.stringify([howToSchema, faqSchema, softwareAppSchema], null, 2);

    return () => {
      // Keep script updated on route/language change
    };
  }, [language, toolRoute, seoData]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const tableHeadings = {
    pl: {
      title: 'Porównanie bezpieczeństwa: PDF Studio Online vs Serwery w Chmurze',
      subtitle: 'Dlaczego eksperci od cyberbezpieczeństwa rekomendują przetwarzanie wyłącznie po stronie klienta:',
      feature: 'Cecha / Parametr',
      us: 'PDF STUDIO ONLINE (CLIENT-SIDE)',
      others: 'INNE KONWERTERY (NP. ILOVEPDF)',
      row1Label: 'Wysyłanie plików na serwer',
      row1Us: '✓ NIGDY (100% lokalnie w RAM)',
      row1Others: '✗ TAK (przesył na obcy serwer)',
      row2Label: 'Zgodność z RODO / Poufność',
      row2Us: 'Pełna poufność danych wrażliwych',
      row2Others: 'Ryzyko zapisu w logach chmury',
      row3Label: 'Limit rozmiaru pliku',
      row3Us: 'Bez limitu (pamięć przeglądarki)',
      row3Others: 'Często limit do 15–50 MB',
      row4Label: 'Czas transferu pliku',
      row4Us: '0 sekund (natychmiastowe otwarcie)',
      row4Others: 'Zależny od łącza uploadu',
      badge: 'Kompleksowy Przewodnik i Baza Wiedzy PDF',
      benefitsTitle: 'Główne zalety modułu',
      moreInfo: 'Więcej informacji o narzędziu',
      faqTitle: 'Najczęściej Zadawane Pytania (FAQ)',
      googleQueries: 'Popularne zapytania w Google:',
      ariaLabel: 'Informacje i poradnik SEO',
      isoStandardText:
        'Format PDF (Portable Document Format) opracowany przez firmę Adobe stał się globalnym standardem ISO 32000. Wybierając PDF Studio Online masz gwarancję, że struktura wektorowa, metadane oraz zawartość AcroForms są przetwarzane w bezpiecznym sandboxie Twojej przeglądarki.',
    },
    en: {
      title: 'Security Comparison: PDF Studio Online vs Cloud Servers',
      subtitle: 'Why cybersecurity experts recommend client-side processing:',
      feature: 'Feature / Metric',
      us: 'PDF STUDIO ONLINE (CLIENT-SIDE)',
      others: 'OTHER CONVERTERS (E.G. ILOVEPDF)',
      row1Label: 'Upload files to server',
      row1Us: '✓ NEVER (100% local in RAM)',
      row1Others: '✗ YES (transferred to 3rd-party servers)',
      row2Label: 'GDPR / NDA Compliance',
      row2Us: 'Full confidentiality guarantee',
      row2Others: 'Risk of server access and logs',
      row3Label: 'File size limit',
      row3Us: 'No limit (uses device hardware RAM)',
      row3Others: 'Often capped at 15–50 MB',
      row4Label: 'File transfer wait time',
      row4Us: '0 seconds (instant load)',
      row4Others: 'Depends on upload connection',
      badge: 'Comprehensive PDF Guide & Knowledge Base',
      benefitsTitle: 'Key Advantages of',
      moreInfo: 'More about',
      faqTitle: 'Frequently Asked Questions (FAQ)',
      googleQueries: 'Trending Google Searches:',
      ariaLabel: 'SEO information and knowledge guide',
      isoStandardText:
        'The PDF (Portable Document Format) standard created by Adobe is governed under ISO 32000. By using PDF Studio Online, you are guaranteed that vector fonts, document metadata, and AcroForms are rendered exclusively inside your browser sandbox.',
    },
    es: {
      title: 'Comparativa de seguridad: PDF Studio Online vs Servidores Cloud',
      subtitle: 'Por qué los expertos recomiendan el procesamiento local en el navegador:',
      feature: 'Característica / Parámetro',
      us: 'PDF STUDIO ONLINE (CLIENT-SIDE)',
      others: 'OTROS CONVERTIDORES (P. EJ. ILOVEPDF)',
      row1Label: 'Subida de archivos a un servidor',
      row1Us: '✓ NUNCA (100% local en RAM)',
      row1Others: '✗ SÍ (transferencia a servidores ajenos)',
      row2Label: 'Cumplimiento RGPD / Privacidad',
      row2Us: 'Confidencialidad absoluta',
      row2Others: 'Riesgo de almacenamiento en la nube',
      row3Label: 'Límite de tamaño de archivo',
      row3Us: 'Sin límites (memoria del equipo)',
      row3Others: 'Frecuentemente limitado a 15–50 MB',
      row4Label: 'Tiempo de subida',
      row4Us: '0 segundos (apertura instantánea)',
      row4Others: 'Depende de la conexión',
      badge: 'Guía Integral y Base de Conocimiento PDF',
      benefitsTitle: 'Principales ventajas de',
      moreInfo: 'Más información sobre',
      faqTitle: 'Preguntas Frecuentes (FAQ)',
      googleQueries: 'Búsquedas populares en Google:',
      ariaLabel: 'Información y guía educativa SEO',
      isoStandardText:
        'El formato PDF (Portable Document Format) desarrollado por Adobe es el estándar internacional ISO 32000. Al elegir PDF Studio Online, tienes la garantía de que la estructura vectorial, los metadatos y los formularios AcroForms se procesan en el entorno aislado de tu navegador.',
    },
    hi: {
      title: 'सुरक्षा तुलना: PDF Studio Online बनाम क्लाउड सर्वर',
      subtitle: 'साइबर सुरक्षा विशेषज्ञ ब्राउज़र-आधारित प्रोसेसिंग की अनुशंसा क्यों करते हैं:',
      feature: 'सुविधा / मापदंड',
      us: 'PDF STUDIO ONLINE (CLIENT-SIDE)',
      others: 'अन्य टूल्स (जैसे ILOVEPDF)',
      row1Label: 'सर्वर पर फाइल अपलोड',
      row1Us: '✓ कभी नहीं (100% स्थानीय रैम)',
      row1Others: '✗ हाँ (थर्ड-पार्टी सर्वर पर)',
      row2Label: 'डेटा गोपनीयता और सुरक्षा',
      row2Us: 'पूरी गोपनीयता की गारंटी',
      row2Others: 'सर्वर लॉग में डेटा लीक का खतरा',
      row3Label: 'फ़ाइल आकार की सीमा',
      row3Us: 'कोई सीमा नहीं (डिवाइस रैम)',
      row3Others: 'अक्सर 15–50 एमबी तक सीमित',
      row4Label: 'ट्रांसफर प्रतीक्षा समय',
      row4Us: '0 सेकंड (तुरंत खुलता है)',
      row4Others: 'अपलोड स्पीड पर निर्भर',
      badge: 'व्यापक पीडीएफ गाइड और ज्ञानकोष',
      benefitsTitle: 'मुख्य लाभ',
      moreInfo: 'के बारे में अधिक जानकारी',
      faqTitle: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
      googleQueries: 'गूगल पर लोकप्रिय खोजें:',
      ariaLabel: 'एसईओ जानकारी और गाइड',
      isoStandardText:
        'एडोब द्वारा विकसित पीडीएफ प्रारूप वैश्विक आईएसओ 32000 मानक है। PDF Studio Online का उपयोग करते समय आपके दस्तावेज़ की वेक्टर संरचना और मेटाडेटा आपके ब्राउज़र के सुरक्षित वातावरण में प्रोसेस होते हैं।',
    },
    pt: {
      title: 'Comparativo de segurança: PDF Studio Online vs Servidores na Nuvem',
      subtitle: 'Por que especialistas em segurança cibernética recomendam o processamento no navegador:',
      feature: 'Recurso / Parâmetro',
      us: 'PDF STUDIO ONLINE (CLIENT-SIDE)',
      others: 'OUTROS CONVERSORES (EX: ILOVEPDF)',
      row1Label: 'Envio de arquivos para o servidor',
      row1Us: '✓ NUNCA (100% local na RAM)',
      row1Others: '✗ SIM (enviado a servidores de terceiros)',
      row2Label: 'Conformidade LGPD / Sigilo',
      row2Us: 'Confidencialidade absoluta dos dados',
      row2Others: 'Risco de registro em logs na nuvem',
      row3Label: 'Limite de tamanho do arquivo',
      row3Us: 'Sem limite (memória do navegador)',
      row3Others: 'Frequentemente limitado a 15–50 MB',
      row4Label: 'Tempo de transferência',
      row4Us: '0 segundos (abertura instantânea)',
      row4Others: 'Depende da velocidade de upload',
      badge: 'Guia Completo e Base de Conhecimento PDF',
      benefitsTitle: 'Principais vantagens do',
      moreInfo: 'Mais informações sobre',
      faqTitle: 'Perguntas Frequentes (FAQ)',
      googleQueries: 'Consultas populares no Google:',
      ariaLabel: 'Informações e guia educativo SEO',
      isoStandardText:
        'O formato PDF (Portable Document Format) desenvolvido pela Adobe tornou-se o padrão global ISO 32000. Ao escolher o PDF Studio Online, você tem a garantia de que a estrutura vetorial, os metadados e o conteúdo dos formulários AcroForms são processados na sandbox segura do seu navegador.',
    },
    ru: {
      title: 'Сравнение безопасности: PDF Studio Online против Облачных Серверов',
      subtitle: 'Почему эксперты по информационной безопасности рекомендуют обработку на стороне клиента:',
      feature: 'Параметр / Функция',
      us: 'PDF STUDIO ONLINE (CLIENT-SIDE)',
      others: 'ДРУГИЕ СЕРВИСЫ (НАПР. ILOVEPDF)',
      row1Label: 'Отправка файлов на сервер',
      row1Us: '✓ НИКОГДА (100% локально в RAM)',
      row1Others: '✗ ДА (передача на чужие серверы)',
      row2Label: 'Соответствие GDPR / Тайна данных',
      row2Us: 'Полная конфиденциальность информации',
      row2Others: 'Риск сохранения в облачных журналах',
      row3Label: 'Ограничение на размер файла',
      row3Us: 'Без лимита (память устройства)',
      row3Others: 'Часто ограничено до 15–50 МБ',
      row4Label: 'Время ожидания передачи',
      row4Us: '0 секунд (мгновенное открытие)',
      row4Others: 'Зависит от скорости отправки',
      badge: 'Полное Руководство и База Знаний PDF',
      benefitsTitle: 'Главные преимущества модуля',
      moreInfo: 'Подробнее об инструменте',
      faqTitle: 'Часто Задаваемые Вопросы (FAQ)',
      googleQueries: 'Популярные поисковые запросы в Google:',
      ariaLabel: 'Информация и справочное руководство SEO',
      isoStandardText:
        'Формат PDF (Portable Document Format), разработанный компанией Adobe, является международным стандартом ISO 32000. Выбирая PDF Studio Online, вы получаете гарантию того, что векторная структура, метаданные и поля AcroForms обрабатываются в защищенной изолированной среде вашего веб-браузера.',
    },
  }[language] || {
    title: 'Porównanie bezpieczeństwa',
    subtitle: 'Client-side processing',
    feature: 'Cecha',
    us: 'PDF STUDIO ONLINE (CLIENT-SIDE)',
    others: 'INNE KONWERTERY (NP. ILOVEPDF)',
    row1Label: 'Wysyłanie plików',
    row1Us: '✓ NIGDY (100% lokalnie w RAM)',
    row1Others: '✗ TAK (przesył na obcy serwer)',
    row2Label: 'Poufność',
    row2Us: '100%',
    row2Others: 'Niepewna',
    row3Label: 'Limit',
    row3Us: 'Brak',
    row3Others: 'Ograniczony',
    row4Label: 'Czas',
    row4Us: '0s',
    row4Others: 'Zależy od łącza',
    badge: 'Baza Wiedzy',
    benefitsTitle: 'Zalety',
    moreInfo: 'Informacje',
    faqTitle: 'FAQ',
    googleQueries: 'Zapytania:',
    ariaLabel: 'Informacje i poradnik SEO',
    isoStandardText:
      'Format PDF (Portable Document Format) opracowany przez firmę Adobe stał się globalnym standardem ISO 32000. Wybierając PDF Studio Online masz gwarancję, że struktura wektorowa, metadane oraz zawartość AcroForms są przetwarzane w bezpiecznym sandboxie Twojej przeglądarki.',
  };

  return (
    <section
      id="seo-content-section"
      aria-label={tableHeadings.ariaLabel}
      className="w-full max-w-5xl mx-auto my-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 pt-12 space-y-12"
    >
      {/* Main SEO Article Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
          <Award className="w-3.5 h-3.5" />
          {tableHeadings.badge}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
          {seoData.h2Title}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {seoData.intro}
        </p>
      </div>

      {/* 3-Step Visual Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {seoData.steps.map((step, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-extrabold flex items-center justify-center text-sm mb-3">
              0{idx + 1}
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Benefits Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          {tableHeadings.benefitsTitle} {currentTool.shortName}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {seoData.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2"
            >
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                {benefit.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table vs Cloud Servers */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            {tableHeadings.title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {tableHeadings.subtitle}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse table-fixed min-w-[560px]">
            <colgroup>
              <col className="w-[36%]" />
              <col className="w-[32%]" />
              <col className="w-[32%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">{tableHeadings.feature}</th>
                <th className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 dark:bg-emerald-950/20">
                  {tableHeadings.us}
                </th>
                <th className="py-3 px-4 text-zinc-600 dark:text-zinc-400 font-semibold">
                  {tableHeadings.others}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              <tr>
                <td className="py-3.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                  {tableHeadings.row1Label}
                </td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 dark:bg-emerald-950/20">
                  {tableHeadings.row1Us}
                </td>
                <td className="py-3.5 px-4 text-rose-600 dark:text-rose-400 font-semibold">
                  {tableHeadings.row1Others}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                  {tableHeadings.row2Label}
                </td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 dark:bg-emerald-950/20">
                  {tableHeadings.row2Us}
                </td>
                <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400">
                  {tableHeadings.row2Others}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                  {tableHeadings.row3Label}
                </td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 dark:bg-emerald-950/20">
                  {tableHeadings.row3Us}
                </td>
                <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400">
                  {tableHeadings.row3Others}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                  {tableHeadings.row4Label}
                </td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 dark:bg-emerald-950/20">
                  {tableHeadings.row4Us}
                </td>
                <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400">
                  {tableHeadings.row4Others}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Leaderboard Ad under comparison table and before SEO text narrative */}
      <AdContainer type="banner-bottom" />

      {/* Extended SEO Narrative Article */}
      <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 bg-slate-50/60 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          {tableHeadings.moreInfo} {currentTool.name}
        </h4>
        <p>{seoData.extendedText}</p>
        <p>{tableHeadings.isoStandardText}</p>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {tableHeadings.faqTitle}
          </h3>
        </div>

        <div className="space-y-3">
          {seoData.faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.includes(idx);
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? 'border-indigo-300 dark:border-indigo-800 bg-white dark:bg-slate-900 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer gap-3"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 text-xs font-black flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 animate-fadeIn">
                    <div className="flex gap-2.5 items-start mt-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        A
                      </span>
                      <div className="flex-1 space-y-1">{faq.a}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SEO Keywords Tag Cloud */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
          {tableHeadings.googleQueries}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {seoData.keywords.map((kw, i) => (
            <span
              key={i}
              className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
