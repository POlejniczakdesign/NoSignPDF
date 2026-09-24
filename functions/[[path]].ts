/**
 * Cloudflare Pages Functions - Catch-all router for Multi-Language SPA & SEO
 * Handles clean URLs for /en, /es, /hi, and all localized subpaths
 */

export interface PagesFunctionContext {
  request: Request;
  next: () => Promise<Response>;
  env: {
    ASSETS: {
      fetch: (req: Request | string | URL) => Promise<Response>;
    };
  };
}

export const onRequest = async (context: PagesFunctionContext): Promise<Response> => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Let static assets (css, js, xml, txt, ico, images, fonts) pass through directly
  if (pathname.includes('.') && !pathname.endsWith('.html')) {
    return context.next();
  }

  // Detect language from path prefix (/es, /hi, /en, /pl)
  const segments = pathname.split('/').filter(Boolean);
  const langPrefix = segments.length > 0 ? segments[0].toLowerCase() : '';
  const isSupportedLang = ['pl', 'en', 'es', 'hi'].includes(langPrefix);
  const activeLang = isSupportedLang ? langPrefix : 'pl';

  // Proceed with standard fetch (matches pre-rendered /es/index.html or static assets)
  const response = await context.next();

  // If Cloudflare Pages found the static file (200 OK), append Content-Language header
  if (response.status === 200) {
    const headers = new Headers(response.headers);
    headers.set('Content-Language', activeLang);
    return new Response(response.body, {
      status: 200,
      headers,
    });
  }

  // If 404 (e.g. dynamic client route), fall back to index.html with 200 OK for SPA
  if (response.status === 404 && context.env?.ASSETS) {
    const indexResponse = await context.env.ASSETS.fetch(new URL('/index.html', url.origin));
    const headers = new Headers(indexResponse.headers);
    headers.set('Content-Language', activeLang);
    return new Response(indexResponse.body, {
      status: 200,
      headers,
    });
  }

  return response;
};
