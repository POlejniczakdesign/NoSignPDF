import React from 'react';
import { ShieldCheck, Lock, Cookie, Server, ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import { ToolRoute } from '../types';

interface PrivacyPolicyProps {
  onNavigate: (path: ToolRoute) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div id="privacy-policy-view" className="w-full max-w-4xl mx-auto py-4 sm:py-8 px-2 sm:px-0">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          id="privacy-back-btn"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Powrót do narzędzi PDF</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/50">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Oficjalny Dokument Zgodności RODO / GDPR</span>
        </div>
      </div>

      {/* Main Privacy Policy Card */}
      <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Header section with Icon */}
        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">
                PDF Studio Online – Bezpieczeństwo i Przejrzystość
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Polityka Prywatności i Pliki Cookies – PDF Studio Online
              </h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2">
            Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies w aplikacji PDF Studio Online. Naszym priorytetem jest pełna transparentność i maksymalne bezpieczeństwo Twoich dokumentów.
          </p>
        </div>

        {/* Security Highlights Bento Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 flex items-start gap-3">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">100% Pamięć RAM</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                Brak wysyłki dokumentów do zewnętrznej chmury.
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 flex items-start gap-3">
            <Cookie className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Google & Ezoic Ads</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                Pliki cookies służą wyłącznie do monetyzacji i reklam.
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 flex items-start gap-3">
            <Server className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Anonimowe Logi</h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                Ochrona DDoS i statystyki bez łączenia z plikami PDF.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Client-side processing */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
              1
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              1. Przetwarzanie plików PDF (Bezpieczeństwo Client-Side)
            </h3>
          </div>
          <ul className="space-y-2.5 pl-4 sm:pl-8 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc leading-relaxed">
            <li>
              <strong>Lokalne przetwarzanie:</strong> Wszystkie operacje na plikach PDF (wypełnianie formularzy, usuwanie i obracanie stron, scalanie) odbywają się wyłącznie lokalnie w pamięci RAM przeglądarki użytkownika przy użyciu bibliotek JavaScript (pdf-lib, pdf.js).
            </li>
            <li>
              <strong>Brak serwera:</strong> Żadne pliki PDF ani zawarte w nich dane osobowe (np. PESEL, NIP, adresy, dane finansowe) NIE są wysyłane na nasz serwer, nie są nigdzie zapisywane ani udostępniane podmiotom trzecim.
            </li>
            <li>
              <strong>Trwałość danych:</strong> Dane istnieją wyłącznie na Twoim urządzeniu w trakcie trwania aktywnej sesji i są bezpowrotnie usuwane po zamknięciu karty przeglądarki.
            </li>
          </ul>
        </section>

        {/* Section 2: Ads & Cookies */}
        <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold">
              2
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              2. Monetyzacja i pliki cookies stron trzecich (Google AdSense, Ezoic)
            </h3>
          </div>
          <ul className="space-y-2.5 pl-4 sm:pl-8 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc leading-relaxed">
            <li>
              W celu utrzymania bezpłatnego charakteru aplikacji, na stronie wyświetlane są reklamy dostarczane przez zewnętrzne sieci reklamowe, takie jak Google AdSense oraz Ezoic.
            </li>
            <li>
              Dostawcy zewnętrzni, w tym Google, używają plików cookies do wyświetlania reklam na podstawie poprzednich odwiedzin użytkownika w tej lub innych witrynach.
            </li>
            <li>
              Pliki cookies do reklam spersonalizowanych pozwalają firmie Google i jej partnerom wyświetlać użytkownikom konkretne reklamy na podstawie ich wizyt w Twojej witrynie i innych stronach internetowych.
            </li>
            <li>
              Użytkownik może zrezygnować z reklam spersonalizowanych w{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-zinc-900 dark:text-white underline hover:text-indigo-600 inline-flex items-center gap-0.5"
              >
                Ustawieniach reklam Google <ExternalLink className="w-3 h-3 inline" />
              </a>{' '}
              lub odwiedzając stronę{' '}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-zinc-900 dark:text-white underline hover:text-indigo-600 inline-flex items-center gap-0.5"
              >
                www.aboutads.info <ExternalLink className="w-3 h-3 inline" />
              </a>.
            </li>
          </ul>
        </section>

        {/* Section 3: Server logs & analytics */}
        <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-bold">
              3
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              3. Logi serwera i analityka
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 pl-4 sm:pl-8 leading-relaxed">
            Hosting statyczny (np. Cloudflare Pages) może automatycznie zbierać anonimowe informacje techniczne (takie jak adres IP, typ przeglądarki, system operacyjny) wyłącznie w celach statystycznych, optymalizacji wydajności oraz ochrony przed atakami DDoS. Dane te nie są łączone z zawartością przesyłanych przez Ciebie dokumentów PDF.
          </p>
        </section>

        <hr className="my-8 border-slate-200 dark:border-zinc-800" />

        {/* Regulamin i Zrzeczenie się Odpowiedzialności */}
        <div id="regulamin-section" className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Regulamin i Zrzeczenie się Odpowiedzialności
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2">
              Korzystając z aplikacji PDF Studio Online, akceptujesz poniższe zasady dotyczące odpowiedzialności za poprawność wypełnianych dokumentów.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              1. Przeznaczenie aplikacji
            </h3>
            <ul className="space-y-2 pl-4 sm:pl-8 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc leading-relaxed">
              <li>
                PDF Studio Online jest darmowym narzędziem technicznym wspomagającym proces wizualnego uzupełniania pól w plikach PDF (w tym oficjalnych formularzach urzędowych, takich jak PIT czy PCC-3).
              </li>
              <li>
                Aplikacja nie stanowi oprogramowania księgowego, podatkowego ani porady prawnej.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              2. Całkowite wyłączenie odpowiedzialności (Disclaimer)
            </h3>
            <ul className="space-y-2.5 pl-4 sm:pl-8 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 list-disc leading-relaxed">
              <li>
                <strong>Odpowiedzialność użytkownika:</strong> Użytkownik ponosi pełną i wyłączną odpowiedzialność za poprawność, rzetelność oraz zgodność z prawdą wszelkich danych wpisywanych do dokumentów za pomocą aplikacji.
              </li>
              <li>
                <strong>Brak odpowiedzialności twórcy:</strong> Jako twórca aplikacji PDF Studio Online nie ponoszę żadnej odpowiedzialności (cywilnej, karnej ani finansowej) za ewentualne błędy, niedopatrzenia, niepoprawne formatowanie tekstów lub przesunięcia znaków w wygenerowanym pliku PDF.
              </li>
              <li>
                <strong>Konsekwencje urzędowe:</strong> Twórca nie odpowiada za odrzucenie dokumentu przez urzędy, instytucje państwowe lub kontrahentów, ani za jakiekolwiek sankcje skarbowe lub prawne wynikające z wadliwego wypełnienia formularza przez użytkownika.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
              3. Zmiany w działaniu serwisu
            </h3>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 pl-4 sm:pl-8 leading-relaxed">
              Aplikacja jest dostarczana w stanie "takim, jaki jest" (As Is), bez jakichkolwiek gwarancji bezawaryjnego działania. Twórca zastrzega sobie prawo do modyfikacji lub zakończenia działania narzędzia w dowolnym momencie.
            </p>
          </section>
        </div>

        {/* Closing summary / timestamp */}
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Dokument aktualny na dzień: {new Date().toLocaleDateString('pl-PL')}</span>
          </div>
          <div>Administrator Serwisu: PDF Studio Online</div>
        </div>
      </article>
    </div>
  );
};
