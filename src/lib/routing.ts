import { ToolRoute, ToolMeta } from '../types';
import { Language, LANGUAGES } from '../i18n/translations';

export const SUPPORTED_LANGUAGES: Language[] = ['pl', 'en', 'es', 'hi'];
export const DEFAULT_LANGUAGE: Language = 'pl';
export const SITE_DOMAIN = 'https://nosignpdf.com';

// Aliases for tool paths (supporting English & Spanish equivalents for SEO flexibility)
export const ROUTE_ALIASES: Record<string, ToolRoute> = {
  '/': '/',
  // Polish canonical
  '/wypelnij-formularz-pdf': '/wypelnij-formularz-pdf',
  '/usun-strony-z-pdf': '/usun-strony-z-pdf',
  '/obroc-pdf': '/obroc-pdf',
  '/polacz-pdf': '/polacz-pdf',
  '/rozdziel-pdf': '/rozdziel-pdf',
  '/polityka-privacy': '/polityka-privacy',
  '/pdf-to-word': '/pdf-to-word',
  '/word-to-pdf': '/word-to-pdf',
  '/pdf-to-excel': '/pdf-to-excel',
  '/excel-to-pdf': '/excel-to-pdf',

  // English aliases
  '/fill-pdf-form': '/wypelnij-formularz-pdf',
  '/delete-pages': '/usun-strony-z-pdf',
  '/delete-pdf-pages': '/usun-strony-z-pdf',
  '/rotate-pdf': '/obroc-pdf',
  '/merge-pdf': '/polacz-pdf',
  '/split-pdf': '/rozdziel-pdf',
  '/privacy-policy': '/polityka-privacy',

  // Spanish aliases
  '/unir-pdf': '/polacz-pdf',
  '/combinar-pdf': '/polacz-pdf',
  '/dividir-pdf': '/rozdziel-pdf',
  '/separar-pdf': '/rozdziel-pdf',
  '/rellenar-formulario-pdf': '/wypelnij-formularz-pdf',
  '/llenar-formulario-pdf': '/wypelnij-formularz-pdf',
  '/rotar-pdf': '/obroc-pdf',
  '/girar-pdf': '/obroc-pdf',
  '/eliminar-paginas-pdf': '/usun-strony-z-pdf',
  '/borrar-paginas-pdf': '/usun-strony-z-pdf',
  '/pdf-a-word': '/pdf-to-word',
  '/word-a-pdf': '/word-to-pdf',
  '/pdf-a-excel': '/pdf-to-excel',
  '/excel-a-pdf': '/excel-to-pdf',
  '/politica-privacidad': '/polityka-privacy',
};

export const DEDICATED_SEO_META: Record<
  ToolRoute,
  Record<Language, { title: string; desc: string }>
> = {
  '/': {
    pl: {
      title: 'Edytor PDF Online – 100% Darmowy, Bez Logowania i Bezpieczny',
      desc: 'Darmowy edytor PDF online działający w Twojej przeglądarce bez logowania i rejestracji. Łącz, dziel, obracaj, usuwaj strony i wypełniaj formularze PDF bez wysyłania plików na serwer.',
    },
    en: {
      title: 'Free Online PDF Editor – No Sign-Up, Private & In-Browser',
      desc: '100% free online PDF editor running client-side in your browser. Merge, split, rotate, delete pages, and fill PDF forms with zero sign-up and no watermarks.',
    },
    es: {
      title: 'Editor PDF Gratis Online – Sin Registro, Seguro y en Navegador',
      desc: 'Editor PDF online 100% gratis y privado que funciona en tu navegador sin registro. Une, divide, gira, elimina páginas y rellena formularios PDF sin subir tus archivos.',
    },
    hi: {
      title: 'मुफ्त ऑनलाइन पीडीएफ संपादक – बिना लॉगिन, 100% सुरक्षित और निजी',
      desc: 'ब्राउज़र में स्थानीय रूप से चलने वाला 100% मुफ्त पीडीएफ एडिटर। बिना रजिस्ट्रेशन पीडीएफ फाइलें जोड़ें, अलग करें, घुमाएं और फॉर्म भरें बिना सर्वर पर फाइल भेजे।',
    },
  },
  '/polacz-pdf': {
    pl: {
      title: 'Połącz PDF Online – Darmowe Łączenie Plików PDF bez Logowania',
      desc: 'Szybko i bezpiecznie połącz wiele plików PDF w jeden dokument online. W 100% darmowe narzędzie, bez rejestracji i bez znaku wodnego.',
    },
    en: {
      title: 'Merge PDF Online – Free PDF Joiner with No Sign-Up',
      desc: 'Combine multiple PDF files into one single document online quickly and securely. 100% free tool, no registration, no file size limits, and no watermarks.',
    },
    es: {
      title: 'Unir PDF Online – Combinar Archivos PDF Gratis Sin Registro',
      desc: 'Une múltiples archivos PDF en un solo documento online de forma rápida y segura. Herramienta 100% gratis, sin registro y sin marcas de agua.',
    },
    hi: {
      title: 'पीडीएफ जोड़ें ऑनलाइन – मुफ्त में कई पीडीएफ एक करें (No Sign-Up)',
      desc: 'कई पीडीएफ फाइलों को एक दस्तावेज़ में सुरक्षित रूप से ऑनलाइन जोड़ें। 100% मुफ्त टूल, बिना लॉगिन और बिना वॉटरमार्क के।',
    },
  },
  '/rozdziel-pdf': {
    pl: {
      title: 'Rozdziel PDF Online – Darmowe Wyodrębnianie Stron z PDF',
      desc: 'Błyskawicznie podziel plik PDF na pojedyncze strony lub wyodrębnij wybrany zakres arkuszy. Całkowicie za darmo, bez rejestracji i bez limitów.',
    },
    en: {
      title: 'Split PDF Online – Extract Pages from PDF for Free',
      desc: 'Instantly split PDF documents into single pages or extract custom page ranges online. 100% free, client-side private, with no sign-up required.',
    },
    es: {
      title: 'Dividir PDF Online – Extraer Páginas de PDF Gratis Sin Registro',
      desc: 'Divide documentos PDF en páginas sueltas o extrae rangos específicos online. 100% gratis, sin registro y con total privacidad en tu navegador.',
    },
    hi: {
      title: 'पीडीएफ अलग करें ऑनलाइन – पेज निकालें व विभाजित करें मुफ्त में',
      desc: 'पीडीएफ फाइल को अलग-अलग पेजों में तुरंत विभाजित करें या अपनी पसंद के पेज निकालें। 100% मुफ्त, बिना पंजीकरण और पूर्ण सुरक्षा के साथ।',
    },
  },
  '/wypelnij-formularz-pdf': {
    pl: {
      title: 'Wypełnij Formularz PDF Online – Bez Drukowania i Logowania',
      desc: 'Uzupełniaj wnioski urzędowe, pisma i formularze PDF bezpośrednio w przeglądarce. Wpisuj tekst, zaznaczaj pola, podpisuj i zapisuj plik bez rejestracji.',
    },
    en: {
      title: 'Fill PDF Form Online – Free PDF Form Filler No Sign-Up',
      desc: 'Fill out applications, contracts, and official PDF forms directly in your browser. Type text, tick checkboxes, and download instantly without printing or sign-up.',
    },
    es: {
      title: 'Rellenar Formulario PDF Online – Gratis, Sin Imprimir y Sin Registro',
      desc: 'Completa formularios, contratos y solicitudes oficiales PDF directamente en tu navegador. Escribe texto, marca casillas y guarda sin registro.',
    },
    hi: {
      title: 'पीडीएफ फॉर्म भरें ऑनलाइन – बिना प्रिंट और बिना लॉगिन के मुफ्त',
      desc: 'सरकारी आवेदन, अनुबंध और फॉर्म सीधे अपने ब्राउज़र में भरें। टेक्स्ट टाइप करें, चेकबॉक्स टिक करें और बिना लॉगिन तुरंत डाउनलोड करें।',
    },
  },
  '/obroc-pdf': {
    pl: {
      title: 'Obróć PDF Online – Obracanie Stron PDF o 90, 180 Stopni Za Darmo',
      desc: 'Trwale obróć krzywe lub odwrócone strony PDF o 90°, 180° lub 270°. Napraw skany dokumentów w pamięci przeglądarki bez logowania i bez opłat.',
    },
    en: {
      title: 'Rotate PDF Online – Turn PDF Pages 90 or 180 Degrees Free',
      desc: 'Permanently rotate single pages or entire PDF files by 90, 180, or 270 degrees. Fix upside-down scans instantly in your browser with no sign-up.',
    },
    es: {
      title: 'Rotar PDF Online – Girar Páginas PDF 90 o 180 Grados Gratis',
      desc: 'Gira páginas individuales o todo el archivo PDF a 90°, 180° o 270° de forma permanente. Arregla escaneos invertidos online sin registro.',
    },
    hi: {
      title: 'पीडीएफ घुमाएं ऑनलाइन – 90 या 180 डिग्री पेज रोटेट करें मुफ्त',
      desc: 'उल्टे या तिरछे स्कैन किए गए पीडीएफ पेजों को 90°, 180° या 270° घुमाएं। बिना लॉगिन और पूरी तरह सुरक्षित अपने ब्राउज़र में ठीक करें।',
    },
  },
  '/usun-strony-z-pdf': {
    pl: {
      title: 'Usuń Strony z PDF Online – Wytnij Zbędne Strony z Pliku PDF',
      desc: 'Wybierz i usuń niepotrzebne strony lub puste arkusze ze swojego dokumentu PDF za pomocą jednego kliknięcia. Szybko, za darmo i bez wysyłania do chmury.',
    },
    en: {
      title: 'Delete Pages from PDF Online – Remove PDF Pages for Free',
      desc: 'Select and remove unwanted or blank pages from your PDF file with one click. Fast, free, client-side, and no registration required.',
    },
    es: {
      title: 'Eliminar Páginas de PDF Online – Borrar Páginas Gratis',
      desc: 'Selecciona y elimina hojas no deseadas o páginas en blanco de tu documento PDF con un solo clic. Gratis, rápido y 100% privado.',
    },
    hi: {
      title: 'पीडीएफ से पेज हटाएं ऑनलाइन – अवांछित पेज मिटाएं मुफ्त में',
      desc: 'अपने पीडीएफ दस्तावेज़ से खाली या अनावश्यक पेज एक क्लिक में हटाएं। सुरक्षित, तेज़ और बिना किसी पंजीकरण के पूरी तरह मुफ्त।',
    },
  },
  '/pdf-to-word': {
    pl: {
      title: 'Konwertuj PDF do Word Online (.docx) – Darmowa Konwersja bez Logowania',
      desc: 'Przekonwertuj dokument PDF na edytowalny plik Word (.docx) bezpośrednio w przeglądarce. Ekstrakcja tekstu bez wysyłania plików na serwer.',
    },
    en: {
      title: 'Convert PDF to Word Online (.docx) – Free Converter No Sign-Up',
      desc: 'Convert PDF documents into editable Word (.docx) files directly in your browser. Fast client-side text extraction with no file upload to servers.',
    },
    es: {
      title: 'Convertir PDF a Word Online (.docx) – Gratis y Sin Registro',
      desc: 'Convierte tus documentos PDF a archivos editables de Word (.docx) directamente en tu navegador. Extracción de texto local 100% privada.',
    },
    hi: {
      title: 'पीडीएफ से वर्ड (.docx) बदलें ऑनलाइन – मुफ्त कनवर्टर बिना लॉगिन',
      desc: 'पीडीएफ दस्तावेज़ को संपादन योग्य वर्ड (.docx) फाइल में आसानी से बदलें। बिना सर्वर पर अपलोड किए स्थानीय रूप से टेक्स्ट निकालें।',
    },
  },
  '/word-to-pdf': {
    pl: {
      title: 'Konwertuj Word do PDF Online – Wklej Tekst i Utwórz Dokument PDF',
      desc: 'Stwórz profesjonalny plik PDF z tekstu lub notatek. Wbudowany edytor tekstu, czysty format i natychmiastowe pobieranie pliku PDF za darmo.',
    },
    en: {
      title: 'Convert Word / Text to PDF Online – Free PDF Creator',
      desc: 'Turn text, notes, and documents into a clean formatted PDF. Built-in editor, zero sign-up, and instant local generation in your browser.',
    },
    es: {
      title: 'Convertir Word a PDF Online – Creador de PDF Gratis',
      desc: 'Crea documentos PDF profesionales a partir de texto o notas. Editor integrado, descarga inmediata y 100% gratis sin registro.',
    },
    hi: {
      title: 'वर्ड से पीडीएफ बनाएं ऑनलाइन – टेक्स्ट से पीडीएफ कनवर्टर मुफ्त',
      desc: 'टेक्स्ट या नोट्स से सुंदर और पेशेवर पीडीएफ तैयार करें। तुरंत स्थानीय रूप से जनरेट करें बिना किसी लॉगिन या शुल्क के।',
    },
  },
  '/pdf-to-excel': {
    pl: {
      title: 'Konwertuj PDF do Excel Online – Ekstrakcja Tabel i Danych do CSV',
      desc: 'Błyskawicznie wyodrębnij tabele i dane liczbowe z pliku PDF do formatu CSV / Excel. Bezpieczne przetwarzanie w pamięci RAM bez logowania.',
    },
    en: {
      title: 'Convert PDF to Excel Online – Extract Tables to CSV / Excel Free',
      desc: 'Extract tables and financial data from PDF files directly into Excel-compatible CSV sheets. Fast, accurate, and completely private.',
    },
    es: {
      title: 'Convertir PDF a Excel Online – Extraer Tablas a CSV / Excel Gratis',
      desc: 'Extrae tablas y datos numéricos de tus archivos PDF a hojas de cálculo CSV compatibles con Excel. Rápido, gratis y sin subir archivos.',
    },
    hi: {
      title: 'पीडीएफ से एक्सेल बदलें ऑनलाइन – टेबल और डेटा सीएसवी में निकालें',
      desc: 'पीडीएफ से टेबल और संख्यात्मक डेटा आसानी से एक्सेल के अनुकूल सीएसवी में निकालें। पूरी तरह सुरक्षित और मुफ्त ऑनलाइन टूल।',
    },
  },
  '/excel-to-pdf': {
    pl: {
      title: 'Konwertuj Excel do PDF Online – Generuj Raport Tabelaryczny PDF',
      desc: 'Wklej dane tabelaryczne z programu Excel lub Arkuszy Google i wygeneruj czytelny raport PDF z siatką danych. 100% darmowe narzędzie.',
    },
    en: {
      title: 'Convert Excel to PDF Online – Table to PDF Report Generator',
      desc: 'Paste table rows and columns from Excel or Google Sheets to generate a clean, formatted PDF table report instantly for free.',
    },
    es: {
      title: 'Convertir Excel a PDF Online – Generador de Reportes PDF desde Tablas',
      desc: 'Pega filas y columnas de Excel o Google Sheets para generar un informe PDF bien formateado y con cuadrícula al instante.',
    },
    hi: {
      title: 'एक्सेल से पीडीएफ बदलें ऑनलाइन – टेबल से पीडीएफ रिपोर्ट बनाएं',
      desc: 'एक्सेल या गूगल शीट्स से डेटा पेस्ट करें और सुंदर टेबल वाला पीडीएफ दस्तावेज़ तैयार करें। बिना लॉगिन तुरंत मुफ्त बनाएं।',
    },
  },
  '/polityka-privacy': {
    pl: {
      title: 'Polityka Prywatności i Regulamin – PDF Studio Online (nosignpdf.com)',
      desc: 'Zasady korzystania z darmowych narzędzi PDF Studio Online, gwarancja prywatności Client-Side, pliki cookies oraz warunki użytkowania.',
    },
    en: {
      title: 'Privacy Policy & Terms of Service – PDF Studio Online (nosignpdf.com)',
      desc: 'Terms of service, client-side zero upload privacy policy, cookies, and conditions for using PDF Studio Online at nosignpdf.com.',
    },
    es: {
      title: 'Política de Privacidad y Términos – PDF Studio Online (nosignpdf.com)',
      desc: 'Términos de servicio, garantía de privacidad sin subida de archivos (Client-Side) y política de cookies de PDF Studio Online.',
    },
    hi: {
      title: 'गोपनीयता नीति और नियम – PDF Studio Online (nosignpdf.com)',
      desc: 'nosignpdf.com की सेवा शर्तें, 100% क्लाइंट-साइड गोपनीयता गारंटी और कुकी नीति।',
    },
  },
};

export interface ParsedRoute {
  lang: Language;
  toolRoute: ToolRoute;
  isLangInPath: boolean;
  cleanPath: string;
}

/**
 * Parses browser pathname into language and canonical ToolRoute.
 * Examples:
 *   / -> { lang: 'pl', toolRoute: '/', isLangInPath: false }
 *   /es -> { lang: 'es', toolRoute: '/', isLangInPath: true }
 *   /es/ -> { lang: 'es', toolRoute: '/', isLangInPath: true }
 *   /es/polacz-pdf -> { lang: 'es', toolRoute: '/polacz-pdf', isLangInPath: true }
 *   /hi/wypelnij-formularz-pdf -> { lang: 'hi', toolRoute: '/wypelnij-formularz-pdf', isLangInPath: true }
 *   /en/merge-pdf -> { lang: 'en', toolRoute: '/polacz-pdf', isLangInPath: true }
 *   /polacz-pdf -> { lang: 'pl', toolRoute: '/polacz-pdf', isLangInPath: false }
 */
export function parsePathname(rawPath: string, fallbackLang: Language = DEFAULT_LANGUAGE): ParsedRoute {
  // Strip trailing slashes (except root '/')
  let path = rawPath.trim();
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Check segments
  const segments = path.split('/').filter(Boolean);

  if (segments.length === 0) {
    return {
      lang: fallbackLang,
      toolRoute: '/',
      isLangInPath: false,
      cleanPath: '/',
    };
  }

  const firstSegment = segments[0].toLowerCase();

  // Check if first segment is a supported language code
  if (SUPPORTED_LANGUAGES.includes(firstSegment as Language)) {
    const detectedLang = firstSegment as Language;
    if (segments.length === 1) {
      return {
        lang: detectedLang,
        toolRoute: '/',
        isLangInPath: true,
        cleanPath: `/${detectedLang}`,
      };
    }

    const remainingSubpath = '/' + segments.slice(1).join('/');
    const matchedTool = ROUTE_ALIASES[remainingSubpath] || '/';
    return {
      lang: detectedLang,
      toolRoute: matchedTool,
      isLangInPath: true,
      cleanPath: `/${detectedLang}${matchedTool === '/' ? '' : matchedTool}`,
    };
  }

  // No language prefix in path - default to Polish (or fallbackLang)
  const matchedTool = ROUTE_ALIASES[path] || '/';
  return {
    lang: fallbackLang,
    toolRoute: matchedTool,
    isLangInPath: false,
    cleanPath: path,
  };
}

/**
 * Builds localized URL pathname for client-side navigation.
 * Polish is canonical at '/' and '/[tool]', other languages are prefixed with '/[lang]/[tool]'.
 */
export function buildLocalizedPath(toolRoute: ToolRoute, lang: Language): string {
  if (lang === 'pl') {
    return toolRoute;
  }
  if (toolRoute === '/') {
    return `/${lang}`;
  }
  return `/${lang}${toolRoute}`;
}

/**
 * Returns canonical full URL and all alternate hreflang URLs for SEO.
 */
export function getAlternateUrls(toolRoute: ToolRoute) {
  const cleanTool = toolRoute === '/' ? '' : toolRoute;
  return {
    pl: `${SITE_DOMAIN}${cleanTool || '/'}`,
    en: `${SITE_DOMAIN}/en${cleanTool}`,
    es: `${SITE_DOMAIN}/es${cleanTool}`,
    hi: `${SITE_DOMAIN}/hi${cleanTool}`,
    'x-default': `${SITE_DOMAIN}${cleanTool || '/'}`,
  };
}

/**
 * Dynamically updates document head metadata for SEO when route or language changes.
 */
export function updateDocumentSeo(
  toolRoute: ToolRoute,
  lang: Language,
  toolMeta: ToolMeta,
  siteName: string = 'PDF Studio Online'
) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // 1. Update <html lang="...">
  document.documentElement.lang = lang;

  // 2. Localized Title and Description tailored for micro-tasks
  const seoConfig = DEDICATED_SEO_META[toolRoute]?.[lang] || DEDICATED_SEO_META['/']?.[lang];
  const title = seoConfig?.title || `${toolMeta.name} – ${siteName}`;
  const description = seoConfig?.desc || `${toolMeta.name}: ${toolMeta.description} 100% Client-Side Private PDF Engine.`;

  document.title = title;

  // 3. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // 4. Canonical link
  const currentCanonicalUrl = `${SITE_DOMAIN}${buildLocalizedPath(toolRoute, lang)}`;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', currentCanonicalUrl);

  // 5. OpenGraph & Twitter Tags
  const setMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const setMetaName = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const localeMap: Record<Language, string> = {
    pl: 'pl_PL',
    en: 'en_US',
    es: 'es_ES',
    hi: 'hi_IN',
  };

  setMetaProperty('og:title', title);
  setMetaProperty('og:description', description);
  setMetaProperty('og:url', currentCanonicalUrl);
  setMetaProperty('og:locale', localeMap[lang] || 'pl_PL');
  setMetaProperty('og:site_name', 'nosignpdf.com');

  setMetaName('twitter:title', title);
  setMetaName('twitter:description', description);

  // 6. Alternate hreflang tags
  const alternates = getAlternateUrls(toolRoute);
  // Remove existing alternate links
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

  // Insert fresh alternate links
  Object.entries(alternates).forEach(([hreflang, href]) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', href);
    document.head.appendChild(link);
  });
}
