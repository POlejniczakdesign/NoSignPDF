import { Language } from './translations';

export interface LegalSection {
  title: string;
  points: string[];
}

export interface LocalizedPrivacyDoc {
  backBtn: string;
  badge: string;
  tagline: string;
  title: string;
  intro: string;
  tabs: {
    all: string;
    privacy: string;
    terms: string;
  };
  highlights: {
    ramTitle: string;
    ramDesc: string;
    adsTitle: string;
    adsDesc: string;
    logsTitle: string;
    logsDesc: string;
  };
  privacyHeading: string;
  privacySections: LegalSection[];
  adsHeading: string;
  adsText: string[];
  adsOptOutLabel: string;
  googleSettingsLabel: string;
  aboutAdsLabel: string;
  logsHeading: string;
  logsText: string;
  termsHeading: string;
  termsIntro: string;
  termsSections: LegalSection[];
  updatedLabel: string;
  adminLabel: string;
}

export const PRIVACY_CONTENT: Record<Language, LocalizedPrivacyDoc> = {
  pl: {
    backBtn: 'Powrót do narzędzi PDF',
    badge: 'Zgodność z Google AdSense, RODO i GDPR',
    tagline: 'nosignpdf.com – Bezpieczeństwo i Transparentność',
    title: 'Polityka Prywatności i Regulamin Serwisu (Terms of Service)',
    intro: 'Niniejszy dokument określa zasady przetwarzania danych, wyświetlania reklam sieci Google AdSense oraz korzystania z darmowych narzędzi serwisu nosignpdf.com. Naszym priorytetem jest pełna ochrona Twojej prywatności: aplikacja działa w 100% lokalnie w przeglądarce użytkownika i nie zbiera, nie przetwarza ani nie przetrzymuje żadnych plików PDF ani danych osobowych na zewnętrznych serwerach.',
    tabs: {
      all: 'Wszystkie Dokumenty',
      privacy: 'Polityka Prywatności & Cookies',
      terms: 'Regulamin Świadczenia Usług',
    },
    highlights: {
      ramTitle: '100% Lokalnie w Pamięci RAM',
      ramDesc: 'Pliki PDF nigdy nie opuszczają Twojego urządzenia. Brak wysyłki do chmury.',
      adsTitle: 'Google AdSense & Cookies',
      adsDesc: 'Ciasteczka służą wyłącznie do bezpiecznej monetyzacji i emisji reklam.',
      logsTitle: 'Brak Rejestracji i Baz Danych',
      logsDesc: 'Zero kont użytkowników, zero logowania i zero śledzenia treści dokumentów.',
    },
    privacyHeading: 'Polityka Prywatności i Architektura Client-Side (Zero-Upload)',
    privacySections: [
      {
        title: '1. Lokalna Architektura Przetwarzania Dokumentów (Privacy-First)',
        points: [
          'Wszystkie operacje techniczne (łączenie, rozdzielanie, obracanie, usuwanie stron, wypełnianie formularzy AcroForm oraz konwersje) wykonywane są wyłącznie w silniku Twojej przeglądarki internetowej przy użyciu bibliotek WebAssembly oraz JavaScript (pdf-lib, pdfjs-dist).',
          'Twoje dokumenty PDF, wprowadzone dane tekstowe, dane wrażliwe (PESEL, NIP, numery kont, dane finansowe) oraz grafiki NIGDY nie są przesyłane na nasz serwer ani serwery pośredniczące.',
          'Pliki istnieją wyłącznie w pamięci operacyjnej RAM Twojego komputera lub smartfona i są natychmiastowo zwalniane po zakończeniu pracy lub zamknięciu karty przeglądarki.',
        ],
      },
      {
        title: '2. Prawa Użytkownika i Przepisy RODO / GDPR',
        points: [
          'Zgodnie z przepisami Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO / GDPR), jako użytkownik masz pełne prawo do prywatności i ochrony informacji.',
          'Ponieważ serwis nosignpdf.com nie gromadzi ani nie przetwarza plików PDF na serwerze, ryzyko wycieku danych z naszej strony wynosi zero.',
          'W sprawach związanych z funkcjonowaniem strony możesz skontaktować się z administratorem pod adresem kontaktowym wskazanym w serwisie.',
        ],
      },
    ],
    adsHeading: 'Monetyzacja, Reklamy Google AdSense i Pliki Cookies',
    adsText: [
      'W celu sfinansowania kosztów infrastruktury oraz utrzymania bezpłatnego charakteru serwisu bez opłat subskrypcyjnych, nosignpdf.com wyświetla reklamy dostarczane przez zewnętrznych dostawców, w tym sieć Google AdSense.',
      'Dostawcy zewnętrzni, w tym Google, używają plików cookies (ciasteczek) do wyświetlania reklam na podstawie poprzednich odwiedzin użytkownika w niniejszej witrynie lub w innych witrynach internetowych.',
      'Pliki cookie do reklam umożliwiają firmie Google i jej partnerom wyświetlanie użytkownikom odpowiednich reklam na podstawie ich wizyt w witrynie nosignpdf.com i/lub innych witrynach w internecie.',
    ],
    adsOptOutLabel: 'Prawo do rezygnacji z reklam spersonalizowanych:',
    googleSettingsLabel: 'Ustawienia reklam Google (Google Ads Settings)',
    aboutAdsLabel: 'Wybór konsumencki www.aboutads.info',
    logsHeading: 'Logi Serwera Hostingowego i Bezpieczeństwo Sieci',
    logsText: 'Dostawca hostingu statycznego (Cloudflare Pages) może automatycznie rejestrować standardowe, anonimowe dane telemetryczne HTTP (np. adres IP, typ przeglądarki, stempel czasowy) wyłącznie w celu ochrony przed atakami DDoS, zapewnienia stabilności infrastruktury oraz statystyk ruchu. Dane te nie są powiązane z zawartością edytowanych dokumentów PDF.',
    termsHeading: 'Regulamin Świadczenia Usług (Terms of Service)',
    termsIntro: 'Korzystając z bezpłatnych narzędzi dostępnych pod adresem nosignpdf.com, akceptujesz poniższe warunki użytkowania serwisu.',
    termsSections: [
      {
        title: '1. Charakter Usługi i Brak Opłat',
        points: [
          'Serwis nosignpdf.com jest w 100% darmowym narzędziem online udostępnianym w modelu „tak jak jest” (As Is) bez wymogu logowania i rejestracji.',
          'Aplikacja ma charakter pomocniczy i nie stanowi oprogramowania księgowego, doradztwa podatkowego ani porady prawnej.',
        ],
      },
      {
        title: '2. Całkowite Wyłączenie Odpowiedzialności (Disclaimer)',
        points: [
          'Użytkownik ponosi wyłączną odpowiedzialność za poprawność, rzetelność oraz zgodność z prawem danych wpisywanych do formularzy urzędowych (w tym deklaracji podatkowych PIT, PCC-3, VAT) oraz modyfikowanych dokumentów.',
          'Właściciel i twórca serwisu nie ponosi żadnej odpowiedzialności finansowej, prawnej ani cywilnej za jakiekolwiek błędy w wygenerowanych dokumentach, odrzucenie formularza przez urząd lub instytucję państwową, ani za ewentualne sankcje skarbowe.',
          'Przed złożeniem wypełnionego dokumentu do organu administracji publicznej lub kontrahenta, zaleca się dokładne zweryfikowanie wygenerowanego pliku PDF.',
        ],
      },
      {
        title: '3. Dozwolony Użytek i Zmiany w Serwisie',
        points: [
          'Zabronione jest wykorzystywanie serwisu w sposób naruszający powszechnie obowiązujące przepisy prawa lub prawa osób trzecich.',
          'Administrator zastrzega sobie prawo do modyfikacji, aktualizacji lub czasowego zawieszenia działania dowolnych modułów serwisu w dowolnym momencie.',
        ],
      },
    ],
    updatedLabel: 'Dokument zaktualizowany na potrzeby weryfikacji Google AdSense: ',
    adminLabel: 'Administrator Serwisu: nosignpdf.com',
  },
  en: {
    backBtn: 'Back to PDF Tools',
    badge: 'Compliant with Google AdSense, GDPR & Privacy Standards',
    tagline: 'nosignpdf.com – Security & Transparency',
    title: 'Privacy Policy & Terms of Service',
    intro: 'This document outlines the data processing policies, Google AdSense advertising integration, and terms of use for nosignpdf.com. Our highest priority is your privacy: the application operates 100% locally in your browser and never uploads, stores, or processes any PDF files or personal data on remote servers (Privacy-First Architecture).',
    tabs: {
      all: 'All Documents',
      privacy: 'Privacy Policy & Cookies',
      terms: 'Terms of Service',
    },
    highlights: {
      ramTitle: '100% In-Browser RAM Processing',
      ramDesc: 'Your PDF files never leave your device. No cloud storage or remote servers.',
      adsTitle: 'Google AdSense & Cookies',
      adsDesc: 'Cookies are used solely for advertising delivery and monetization compliance.',
      logsTitle: 'Zero Sign-Up & No Databases',
      logsDesc: 'No accounts, no logins, and zero tracking of your document contents.',
    },
    privacyHeading: 'Privacy Policy & Zero-Upload Client-Side Architecture',
    privacySections: [
      {
        title: '1. In-Browser Client-Side Processing (Privacy-First Architecture)',
        points: [
          'All document operations (merging, splitting, rotating, deleting pages, AcroForm filling, and conversions) are performed exclusively within your web browser using WebAssembly and JavaScript (pdf-lib, pdfjs-dist).',
          'Your PDF documents, form field inputs, sensitive identifiers (tax IDs, financial details, contracts), and images are NEVER uploaded to our server or any third-party cloud.',
          'Document data exists solely in your device volatile memory (RAM) and is purged immediately upon finishing your work or closing the browser tab.',
        ],
      },
      {
        title: '2. User Rights & GDPR / CCPA Compliance',
        points: [
          'Under the General Data Protection Regulation (GDPR) and applicable data protection regulations, you retain full rights regarding your data privacy.',
          'Because nosignpdf.com does not collect or transmit document data to servers, your personal documents cannot be leaked, breached, or accessed by third parties.',
          'For any inquiries regarding site operations, you may contact the administrator via the contact details provided on this website.',
        ],
      },
    ],
    adsHeading: 'Monetization, Google AdSense Advertising & Cookies Policy',
    adsText: [
      'To finance server bandwidth and keep this tool completely free with no paywalls or user sign-ups, nosignpdf.com displays advertisements served by third-party advertising networks, including Google AdSense.',
      'Third-party vendors, including Google, use cookies to serve ads based on a user prior visits to your website or other websites.',
      'Google advertising cookies enable it and its partners to serve ads to users based on their visits to nosignpdf.com and/or other sites across the Internet.',
    ],
    adsOptOutLabel: 'How to opt out of personalized advertising:',
    googleSettingsLabel: 'Google Ads Settings',
    aboutAdsLabel: 'Consumer opt-out at www.aboutads.info',
    logsHeading: 'Server Hosting Logs & Network Security',
    logsText: 'Static hosting providers (Cloudflare Pages) may automatically log standard anonymous HTTP access information (such as IP address, browser user-agent, timestamp) solely to protect against DDoS attacks, ensure system uptime, and monitor technical performance. These technical logs are completely segregated from your PDF documents.',
    termsHeading: 'Terms of Service',
    termsIntro: 'By using the free online PDF tools provided on nosignpdf.com, you agree to the following Terms of Service.',
    termsSections: [
      {
        title: '1. Free Service "As Is"',
        points: [
          'nosignpdf.com is provided free of charge on an "As Is" and "As Available" basis without warranties of any kind.',
          'The application is a technical utility and does not constitute official legal, accounting, or tax advice.',
        ],
      },
      {
        title: '2. Limitation of Liability & Disclaimer',
        points: [
          'The user assumes sole and full responsibility for the accuracy, legality, and validity of all data entered into PDF forms (including tax declarations, government petitions, and legal agreements).',
          'The author and operator of nosignpdf.com disclaim any civil, penal, or financial liability for form rejection by government offices or institutions, formatting variances, or tax/legal consequences.',
          'Users are strongly advised to inspect and verify their generated PDF files prior to official filing or transmission.',
        ],
      },
      {
        title: '3. Acceptable Use & Modifications',
        points: [
          'Users must not utilize the service for unlawful purposes or in violation of applicable laws.',
          'The service administrator reserves the right to modify, enhance, or discontinue any modules at any time without prior notice.',
        ],
      },
    ],
    updatedLabel: 'Updated for Google AdSense verification: ',
    adminLabel: 'Website Administrator: nosignpdf.com',
  },
  es: {
    backBtn: 'Volver a herramientas PDF',
    badge: 'Cumplimiento con Google AdSense, RGPD y Privacidad',
    tagline: 'nosignpdf.com – Seguridad y Transparencia',
    title: 'Política de Privacidad y Términos de Servicio (Terms of Service)',
    intro: 'Este documento establece las normas de tratamiento de datos, publicidad de Google AdSense y condiciones de uso de nosignpdf.com. Nuestra prioridad absoluta es tu privacidad: la aplicación funciona 100% de manera local en el navegador y nunca sube, almacena ni procesa archivos PDF ni datos personales en servidores externos.',
    tabs: {
      all: 'Todos los Documentos',
      privacy: 'Política de Privacidad y Cookies',
      terms: 'Términos de Servicio',
    },
    highlights: {
      ramTitle: '100% Local en Memoria RAM',
      ramDesc: 'Tus archivos PDF nunca salen de tu ordenador o teléfono. Cero subidas a la nube.',
      adsTitle: 'Google AdSense y Cookies',
      adsDesc: 'Las cookies se usan únicamente para mostrar publicidad segura y financiar el servicio.',
      logsTitle: 'Sin Registro ni Bases de Datos',
      logsDesc: 'Sin cuentas de usuario, sin contraseñas y sin rastreo del contenido de tus documentos.',
    },
    privacyHeading: 'Política de Privacidad y Arquitectura del Lado del Cliente (Zero-Upload)',
    privacySections: [
      {
        title: '1. Procesamiento Local en el Navegador (Privacy-First)',
        points: [
          'Todas las operaciones (unir, dividir, rotar, eliminar páginas, rellenar formularios AcroForm y conversiones) se realizan íntegramente en tu navegador web mediante WebAssembly y JavaScript (pdf-lib, pdfjs-dist).',
          'Tus documentos PDF, datos confidenciales, números de identificación, contratos e imágenes NUNCA se envían a nuestro servidor ni a terceros.',
          'Los datos existen únicamente en la memoria RAM temporal de tu dispositivo y se eliminan inmediatamente al cerrar la pestaña del navegador.',
        ],
      },
      {
        title: '2. Derechos del Usuario y Normativa RGPD / GDPR',
        points: [
          'De conformidad con el Reglamento General de Protección de Datos (RGPD) de la UE, tienes derecho pleno a la confidencialidad y protección de tu información.',
          'Dado que nosignpdf.com no almacena archivos en servidores, no existe riesgo alguno de filtraciones ni acceso no autorizado a tus documentos.',
        ],
      },
    ],
    adsHeading: 'Monetización, Publicidad de Google AdSense y Política de Cookies',
    adsText: [
      'Para sufragar los costes de infraestructura y mantener la herramienta 100% gratuita sin suscripciones de pago, nosignpdf.com muestra anuncios servidos por redes publicitarias externas, principalmente Google AdSense.',
      'Los proveedores externos, incluido Google, utilizan cookies para publicar anuncios basados en las visitas anteriores de un usuario a este sitio web o a otros sitios web.',
      'El uso de cookies publicitarias permite a Google y a sus socios mostrar anuncios a los usuarios en función de sus visitas a nosignpdf.com y/o a otros sitios de Internet.',
    ],
    adsOptOutLabel: 'Cómo inhabilitar la publicidad personalizada:',
    googleSettingsLabel: 'Configuración de anuncios de Google (Google Ads Settings)',
    aboutAdsLabel: 'Preferencia del consumidor en www.aboutads.info',
    logsHeading: 'Registros del Servidor y Seguridad',
    logsText: 'Los servidores de alojamiento estático (Cloudflare Pages) pueden registrar información técnica anónima estándar (como dirección IP, navegador y fecha) únicamente para prevenir ataques DDoS y garantizar el funcionamiento del sistema. Estos registros técnicos están completamente disociados de los documentos PDF.',
    termsHeading: 'Términos y Condiciones del Servicio',
    termsIntro: 'Al utilizar las herramientas gratuitas de nosignpdf.com, aceptas los siguientes términos de servicio.',
    termsSections: [
      {
        title: '1. Servicio Gratuito "Tal Cual" (As Is)',
        points: [
          'nosignpdf.com se ofrece gratuitamente sin garantías de ningún tipo y no constituye asesoramiento fiscal, legal o contable.',
        ],
      },
      {
        title: '2. Exención Total de Responsabilidad (Disclaimer)',
        points: [
          'El usuario es el único responsable de la exactitud de los datos introducidos en formularios oficiales o contratos.',
          'El creador y administrador del servicio no asume ninguna responsabilidad por el rechazo de documentos por parte de organismos oficiales ni por sanciones tributarias o legales.',
        ],
      },
      {
        title: '3. Uso Adecuado y Modificaciones',
        points: [
          'Queda prohibido utilizar la herramienta para fines ilícitos o fraudulentos.',
          'El administrador se reserva el derecho de modificar o actualizar cualquier módulo de la web en cualquier momento.',
        ],
      },
    ],
    updatedLabel: 'Actualizado para verificación de Google AdSense: ',
    adminLabel: 'Administrador del Sitio: nosignpdf.com',
  },
  hi: {
    backBtn: 'पीडीएफ टूल्स पर वापस जाएं',
    badge: 'Google AdSense, GDPR और गोपनीयता मानकों के अनुरूप',
    tagline: 'nosignpdf.com – सुरक्षा और पारदर्शिता',
    title: 'गोपनीयता नीति और सेवा की शर्तें (Privacy Policy & Terms)',
    intro: 'यह दस्तावेज़ nosignpdf.com के डेटा प्रोसेसिंग, Google AdSense विज्ञापनों और सेवा शर्तों को स्पष्ट करता है। हमारी सर्वोच्च प्राथमिकता आपकी गोपनीयता है: यह टूल 100% आपके ब्राउज़र में स्थानीय रूप से काम करता है और कभी भी सर्वर पर कोई पीडीएफ या व्यक्तिगत डेटा अपलोड, संग्रहीत या प्रोसेस नहीं करता है।',
    tabs: {
      all: 'सभी दस्तावेज़',
      privacy: 'गोपनीयता नीति व कुकीज़',
      terms: 'उपयोग की शर्तें',
    },
    highlights: {
      ramTitle: '100% ब्राउज़र रैम में प्रोसेसिंग',
      ramDesc: 'आपकी पीडीएफ फाइलें कभी आपके डिवाइस से बाहर नहीं जातीं। कोई क्लाउड अपलोड नहीं।',
      adsTitle: 'Google AdSense और कुकीज़',
      adsDesc: 'कुकीज़ का उपयोग केवल सुरक्षित मुद्रीकरण और विज्ञापन प्रदर्शित करने के लिए किया जाता है।',
      logsTitle: 'बिना लॉगिन, शून्य डेटाबेस',
      logsDesc: 'कोई खाता नहीं, कोई लॉगिन नहीं और आपकी फाइलों की कोई ट्रैकिंग नहीं।',
    },
    privacyHeading: 'गोपनीयता नीति और क्लाइंट-साइड सुरक्षा (Zero-Upload)',
    privacySections: [
      {
        title: '1. स्थानीय क्लाइंट-साइड प्रोसेसिंग (Privacy-First)',
        points: [
          'सभी पीडीएफ कार्य (मर्ज करना, अलग करना, घुमाना, पेज हटाना, फॉर्म भरना और बदलना) केवल आपके ब्राउज़र में WebAssembly और JavaScript से किए जाते हैं।',
          'आपकी फाइलें, संवेदनशील डेटा (टैक्स नंबर, अनुबंध, पहचान पत्र) कभी किसी रिमोट सर्वर पर नहीं भेजे जाते।',
          'डेटा केवल अस्थायी रैम में रहता है और ब्राउज़र टैब बंद करते ही तुरंत नष्ट हो जाता है।',
        ],
      },
      {
        title: '2. उपयोगकर्ता अधिकार और GDPR अनुपालन',
        points: [
          'यूरोपीय संघ के GDPR और गोपनीयता नियमों के अनुसार आपके डेटा सुरक्षा अधिकारों का पूरा सम्मान किया जाता है।',
          'चूंकि फाइलें सर्वर पर नहीं जातीं, डेटा लीक होने का कोई जोखिम नहीं है।',
        ],
      },
    ],
    adsHeading: 'मुद्रीकरण, Google AdSense विज्ञापन और कुकी नीति',
    adsText: [
      'वेबसाइट को पूरी तरह मुफ्त और बिना सदस्यता शुल्क के चलाने के लिए nosignpdf.com पर Google AdSense द्वारा विज्ञापन दिखाए जाते हैं।',
      'Google सहित तीसरे पक्ष के विक्रेता इस या अन्य वेबसाइटों पर पिछली विज़िट के आधार पर विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करते हैं।',
      'Google की विज्ञापन कुकीज़ उसे और उसके भागीदारों को उपयोगकर्ताओं को इंटरनेट पर विज़िट के आधार पर प्रासंगिक विज्ञापन दिखाने में सक्षम बनाती हैं।',
    ],
    adsOptOutLabel: 'व्यक्तिगत विज्ञापन से बाहर निकलने का विकल्प:',
    googleSettingsLabel: 'Google Ads Settings (विज्ञापन सेटिंग्स)',
    aboutAdsLabel: 'उपभोक्ता विकल्प www.aboutads.info पर',
    logsHeading: 'होस्टिंग सर्वर लॉग और सुरक्षा',
    logsText: 'स्टैटिक होस्टिंग प्रदाता (Cloudflare Pages) DDoS हमलों से सुरक्षा और नेटवर्क स्थिरता के लिए मानक अनाम तकनीकी डेटा (जैसे आईपी पता, ब्राउज़र प्रकार) रिकॉर्ड कर सकता है। यह डेटा कभी भी आपकी पीडीएफ फाइलों से संबंधित नहीं होता।',
    termsHeading: 'सेवा की शर्तें (Terms of Service)',
    termsIntro: 'nosignpdf.com के मुफ्त टूल्स का उपयोग करके आप निम्नलिखित शर्तों से सहमत होते हैं।',
    termsSections: [
      {
        title: '1. मुफ्त सेवा "जैसी है" (As Is)',
        points: [
          'nosignpdf.com मुफ्त में प्रदान किया जाता है और यह कोई कानूनी या कर सलाह नहीं है।',
        ],
      },
      {
        title: '2. देयता की सीमा (Disclaimer)',
        points: [
          'फॉर्म में भरी गई जानकारी की सत्यता के लिए उपयोगकर्ता पूरी तरह जिम्मेदार है।',
          'सरकारी विभागों द्वारा फॉर्म अस्वीकार किए जाने पर डेवलपर की कोई कानूनी या वित्तीय जिम्मेदारी नहीं होगी।',
        ],
      },
      {
        title: '3. उचित उपयोग',
        points: [
          'उपकरण का उपयोग किसी भी अवैध गतिविधि के लिए नहीं किया जाना चाहिए।',
        ],
      },
    ],
    updatedLabel: 'Google AdSense सत्यापन के लिए अद्यतन: ',
    adminLabel: 'वेबसाइट प्रशासक: nosignpdf.com',
  },
};
