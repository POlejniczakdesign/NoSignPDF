import { ToolRoute, ToolMeta } from '../types';
import { Language, LANGUAGES } from '../i18n/translations';

export const SUPPORTED_LANGUAGES: Language[] = ['pl', 'en', 'es', 'hi'];
export const DEFAULT_LANGUAGE: Language = 'pl';
export const SITE_DOMAIN = 'https://nosignpdf.com';

// Aliases for tool paths (supporting English equivalents for SEO flexibility)
export const ROUTE_ALIASES: Record<string, ToolRoute> = {
  '/': '/',
  '/wypelnij-formularz-pdf': '/wypelnij-formularz-pdf',
  '/fill-pdf-form': '/wypelnij-formularz-pdf',
  '/usun-strony-z-pdf': '/usun-strony-z-pdf',
  '/delete-pages': '/usun-strony-z-pdf',
  '/obroc-pdf': '/obroc-pdf',
  '/rotate-pdf': '/obroc-pdf',
  '/polacz-pdf': '/polacz-pdf',
  '/merge-pdf': '/polacz-pdf',
  '/rozdziel-pdf': '/rozdziel-pdf',
  '/split-pdf': '/rozdziel-pdf',
  '/polityka-privacy': '/polityka-privacy',
  '/privacy-policy': '/polityka-privacy',
  '/pdf-to-word': '/pdf-to-word',
  '/word-to-pdf': '/word-to-pdf',
  '/pdf-to-excel': '/pdf-to-excel',
  '/excel-to-pdf': '/excel-to-pdf',
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

  // 2. Localized Title
  const title = `${toolMeta.name} – ${siteName}`;
  document.title = title;

  // 3. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute(
    'content',
    `${toolMeta.name}: ${toolMeta.description} 100% Client-Side Private PDF Engine.`
  );

  // 4. Canonical link
  const currentCanonicalUrl = `${SITE_DOMAIN}${buildLocalizedPath(toolRoute, lang)}`;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', currentCanonicalUrl);

  // 5. OpenGraph Tags
  const setMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
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
  setMetaProperty('og:description', `${toolMeta.name}: ${toolMeta.description}`);
  setMetaProperty('og:url', currentCanonicalUrl);
  setMetaProperty('og:locale', localeMap[lang] || 'pl_PL');
  setMetaProperty('og:site_name', siteName);

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
