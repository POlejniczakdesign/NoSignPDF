import { Language } from '../i18n/translations';
import { ToolRoute } from '../types';

export interface GuideArticle {
  title: string;
  lead: string;
  bulletPoints: { label: string; desc: string }[];
  conclusion: string;
  actionLabel?: string;
  actionRoute?: ToolRoute;
}

export interface PublisherContentDict {
  sectionAriaLabel: string;
  whyBadge: string;
  whyReadingTime: string;
  whyTitle: string;
  whyLead: string;
  whyPillars: { title: string; desc: string }[];
  whyParagraphs: string[];
  guideBadge: string;
  guideTitle: string;
  guideSubtitle: string;
  guideArticles: GuideArticle[];
}

export const PUBLISHER_CONTENT: Record<Language, PublisherContentDict> = {
  pl: {
    sectionAriaLabel: 'Baza wiedzy i przewodnik po bezpiecznym edytowaniu PDF',
    whyBadge: 'Architektura Privacy-First & 100% Bezpieczeństwa',
    whyReadingTime: 'Czas czytania: 4 minuty • Kompendium wiedzy',
    whyTitle: 'Dlaczego warto wybrać NoSignPDF? Bezpieczeństwo dokumentów w erze chmury',
    whyLead:
      'Większość popularnych serwisów internetowych do edycji plików PDF wymaga przesłania Twoich poufnych dokumentów na odległe serwery w chmurze. NoSignPDF rewolucjonizuje tę koncepcję: wszystkie operacje wykonujesz w 100% lokalnie w przeglądarce, z zerowym ryzykiem wycieku danych i bez konieczności rejestracji konta.',
    whyPillars: [
      {
        title: 'Zero Uploadu i Pamięć RAM',
        desc: 'Dokumenty są otwierane wyłącznie w pamięci operacyjnej Twojego urządzenia. Nasz serwer nie otrzymuje ani jednego bajtu z zawartości plików.',
      },
      {
        title: 'Poufność Umów i Faktur',
        desc: 'Dane wrażliwe (numery PESEL, NIP, kwoty wynagrodzeń, wyciągi bankowe) pozostają w Twoim bezpośrednim posiadaniu, zgodnie z rygorystycznymi normami RODO i GDPR.',
      },
      {
        title: 'Maksymalna Szybkość i Brak Limitów',
        desc: 'Brak konieczności oczekiwania na transfer wielomegabajtowych plików przez sieć. Silnik WebAssembly i pdf-lib przetwarza arkusze natychmiastowo na Twoim procesorze.',
      },
    ],
    whyParagraphs: [
      'Format PDF (Portable Document Format) jest globalnym fundamentem obiegu informacji biznesowych, prawnych oraz administracyjnych. Codziennie na całym świecie przesyłane są miliony umów handlowych, wyciągów finansowych, pism procesowych oraz formularzy podatkowych. Niestety, korzystanie ze standardowych konwerterów online wiąże się ze znacznym ryzykiem: wysyłając plik na obcy serwer, tracisz kontrolę nad tym, kto ma dostęp do jego kopii, jak długo jest przechowywany i czy nie posłuży do trenowania modeli maszynowych.',
      'NoSignPDF rozwiązuje ten fundamentalny problem cyberbezpieczeństwa. Dzięki wykorzystaniu nowoczesnych standardów sieciowych HTML5 File API, WebAssembly oraz silnika pdf-lib, cała skomplikowana matematyka manipulacji strukturą pliku PDF odbywa się w odizolowanym środowisku uruchomieniowym Twojej przeglądarki (sandbox). Oznacza to, że nawet przy braku połączenia z internetem po załadowaniu strony, narzędzia zachowują pełną sprawność operacyjną.',
      'Brak konieczności rejestracji i logowania to nie tylko wygoda i oszczędność cennego czasu, ale również kluczowy element higieny cyfrowej. Nie gromadzimy Twojego adresu e-mail, nie tworzymy profili użytkowników i nie wymagamy podawania kart kredytowych za usunięcie znaku wodnego. Dokument opuszcza Twoje urządzenie dopiero wtedy, gdy Ty sam zdecydujesz się go wysłać swojemu kontrahentowi.',
    ],
    guideBadge: 'Kompleksowy Przewodnik i Słownik Pojęć PDF',
    guideTitle: 'Edukacja i Dobre Praktyki: Jak bezpiecznie zarządzać plikami PDF',
    guideSubtitle: 'Odpowiedzi ekspertów na kluczowe pytania dotyczące metadanych, podpisów elektronicznych i łączenia dokumentów',
    guideArticles: [
      {
        title: 'Co to są metadane w pliku PDF i dlaczego warto je czyścić przed wysyłką?',
        lead: 'Każdy utworzony dokument PDF, poza widocznym tekstem i grafikami, zawiera ukryte warstwy informacji technicznych zwane metadanymi (Metadata). Informacje te są zapisywane automatycznie przez oprogramowanie biurowe i edytory.',
        bulletPoints: [
          {
            label: 'Historia i Identyfikacja:',
            desc: 'Metadane ujawniają imię i nazwisko autora, login systemowy, nazwę firmy oraz dokładną markę i model urządzenia.',
          },
          {
            label: 'Ścieżki Plików i Wersje:',
            desc: 'W strukturze dokumentu często pozostają lokalne ścieżki dyskowe (np. C:\\Users\\Jan\\Umowy\\...) oraz nazwa edytora (Word, Canva, InDesign).',
          },
          {
            label: 'Ryzyko Biznesowe (OSINT):',
            desc: 'Analiza metadanych jest podstawową metodą wywiadu gospodarczego stosowaną przez konkurencję i hakerów przed atakiem phishingowym.',
          },
          {
            label: 'Czyszczenie w NoSignPDF:',
            desc: 'Nasz moduł usuwa słowniki /Info, wpisy XMP oraz PieceInfo, generując w 100% anonimowy i czysty plik gotowy do bezpiecznej publikacji.',
          },
        ],
        conclusion: 'Regularne czyszczenie metadanych jest rekomendowane przez specjalistów ds. cyberbezpieczeństwa przed publikacją przetargów, umów poufności (NDA) oraz pism urzędowych.',
        actionLabel: 'Wyczyść metadane w swoim dokumencie',
        actionRoute: '/wyczysc-metadane-pdf',
      },
      {
        title: 'Jak bezpiecznie wypełnić i podpisać formularz PDF bez drukowania?',
        lead: 'Tradycyjne drukowanie, ręczne podpisywanie długopisem i ponowne skanowanie to strata papieru, tuszu i czasu. Nowoczesny obieg dokumentów opiera się na cyfrowych formularzach AcroForms.',
        bulletPoints: [
          {
            label: 'Natywne Pola AcroForms:',
            desc: 'Dobrej jakości formularze urzędowe posiadają aktywne kratki i pola tekstowe, które można edytować bezpośrednio w przeglądarce.',
          },
          {
            label: 'Brak Degradacji Jakości:',
            desc: 'Wypełnianie formularza w silniku wektorowym zachowuje krystaliczną ostrość czcionek podczas druku lub odczytu na dowolnym monitorze.',
          },
          {
            label: 'Prywatność Danych Osobowych:',
            desc: 'Wprowadzany PESEL, numer dowodu czy dane finansowe nie trafiają do żadnej bazy danych — po pobraniu formularza dane znikają z pamięci RAM.',
          },
          {
            label: 'Zgodność z Adobe Reader:',
            desc: 'Wygenerowane przez NoSignPDF pliki są w 100% zgodne z oficjalnym standardem ISO 32000 i otwierają się poprawnie w urzędach skarbowych.',
          },
        ],
        conclusion: 'Dzięki NoSignPDF uzupełnisz dowolny wniosek urzędowy w kilkadziesiąt sekund, bez konieczności instalowania drogich pakietów oprogramowania biurowego.',
        actionLabel: 'Wypełnij formularz PDF online',
        actionRoute: '/wypelnij-formularz-pdf',
      },
      {
        title: 'Jak skutecznie połączyć wiele dokumentów PDF bez utraty jakości i formatowania?',
        lead: 'Scalanie raportów, załączników do umów czy skanów faktur w jeden spójny dokument to jedna z najczęstszych operacji biurowych. Kluczem jest zachowanie proporcji stron i spójności palety barw.',
        bulletPoints: [
          {
            label: 'Zarządzanie Kolejnością Stron:',
            desc: 'Wizualny edytor miniatur pozwala intuicyjnie przeciągać i upuszczać strony, eliminując błędy w numeracji wielostronicowych dokumentów.',
          },
          {
            label: 'Zachowanie Wektorów i Czcionek:',
            desc: 'Łączenie na poziomie obiektów PDF kopiuje osadzone fonty bez rasteryzacji tekstu do postaci pikselowej, zachowując możliwość przeszukiwania (OCR).',
          },
          {
            label: 'Usuwanie Zbędnych Arkuszy:',
            desc: 'Podczas scalania możesz jednym kliknięciem usunąć puste arkusze, błędne skany lub duplikaty stron, zmniejszając ostateczną wagę pliku.',
          },
          {
            label: 'Brak Ograniczeń Rozmiaru:',
            desc: 'Dzięki przetwarzaniu na Twoim komputerze możesz łączyć nawet obszerne tomy dokumentacji, ograniczone jedynie pamięcią RAM Twojego urządzenia.',
          },
        ],
        conclusion: 'Po połączeniu plików możesz dodatkowo użyć naszego modułu kompresji lub czyszczenia metadanych, aby uzyskać perfekcyjny pakiet dokumentacji.',
        actionLabel: 'Połącz pliki PDF w jeden dokument',
        actionRoute: '/polacz-pdf',
      },
    ],
  },
  en: {
    sectionAriaLabel: 'Knowledge Base and Secure PDF Editing Guide',
    whyBadge: 'Privacy-First Architecture & 100% Security',
    whyReadingTime: 'Read time: 4 min • Knowledge Compendium',
    whyTitle: 'Why Choose NoSignPDF? Document Security in the Cloud Era',
    whyLead:
      'Most online PDF editing services require uploading confidential documents to remote cloud servers. NoSignPDF transforms this workflow: every operation runs 100% locally in your browser with zero data leakage risk, no account creation, and zero server storage.',
    whyPillars: [
      {
        title: 'Zero Uploads & In-Memory RAM',
        desc: 'Files are processed exclusively in your device volatile memory (RAM). Our servers never receive a single byte of your document contents.',
      },
      {
        title: 'Strict Confidentiality for Contracts',
        desc: 'Sensitive business data (PII, tax IDs, salaries, bank statements) remains under your complete control in compliance with GDPR and global privacy frameworks.',
      },
      {
        title: 'Instant Execution & No Caps',
        desc: 'Zero waiting for uploads or network transfers. The client-side WebAssembly engine manipulates PDF byte streams directly on your CPU hardware.',
      },
    ],
    whyParagraphs: [
      'The Portable Document Format (PDF) is the undisputed international standard for corporate, legal, and governmental communications. Hundreds of millions of business contracts, invoices, financial statements, and official tax filings are exchanged daily. However, utilizing traditional cloud-based conversion platforms carries substantial exposure: once a file is dispatched across the wire to a remote server, you relinquish oversight over data persistence, backups, and prospective machine-learning ingestion.',
      'NoSignPDF eliminates this cybersecurity dilemma. Harnessing modern Web standards — including the HTML5 File System API, WebAssembly, and pdf-lib — all parsing, drawing, and structural modifications occur entirely within your browser sandboxed execution environment. Even if you disconnect from the internet after page delivery, our toolset remains completely operational.',
      'Our zero-registration mandate safeguards both your personal bandwidth and digital hygiene. We collect no email addresses, maintain no user databases, and never watermark your finished files to force subscription upgrades. Your documents only leave your device when you personally choose to transmit them to your recipient.',
    ],
    guideBadge: 'Comprehensive PDF Guide & Terminology Index',
    guideTitle: 'Education & Best Practices: Managing PDF Documents Securely',
    guideSubtitle: 'Expert insights on metadata sanitization, form completion, and quality-preserving document merging',
    guideArticles: [
      {
        title: 'What is PDF metadata and why should you sanitize it prior to sharing?',
        lead: 'Beyond visible text and graphics, every PDF document stores hidden technical descriptors known as metadata. This diagnostic data is recorded automatically by desktop applications, operating systems, and scanners.',
        bulletPoints: [
          {
            label: 'Author & Device Identity:',
            desc: 'Metadata entries often disclose author real names, system usernames, corporate workstations, and precise printer models.',
          },
          {
            label: 'Internal Paths & Revisions:',
            desc: 'Structural dictionaries frequently preserve internal disk file paths (e.g., C:\\Users\\Admin\\Confidential\\...) and software version tags.',
          },
          {
            label: 'OSINT & Corporate Intelligence Risk:',
            desc: 'Adversaries routinely extract PDF metadata during open-source intelligence gathering to prepare targeted spear-phishing campaigns.',
          },
          {
            label: 'Client-Side Sanitization:',
            desc: 'Our metadata stripper cleans /Info dictionaries, XMP metadata streams, and PieceInfo entries, producing a thoroughly sanitized, anonymous PDF.',
          },
        ],
        conclusion: 'Cybersecurity professionals advise stripping metadata from all legal contracts, NDAs, bids, and public-facing reports before distribution.',
        actionLabel: 'Clean metadata from your PDF',
        actionRoute: '/wyczysc-metadane-pdf',
      },
      {
        title: 'How to securely fill out and sign PDF forms without physical printing?',
        lead: 'Traditional workflows of printing, handwriting signatures, and re-scanning waste precious office supplies and introduce analog degradation. Digital AcroForms modernise document workflows with zero fuss.',
        bulletPoints: [
          {
            label: 'Native AcroForm Interactive Fields:',
            desc: 'Standardized digital forms contain interactive text boxes and checkboxes that can be completed directly within your browser.',
          },
          {
            label: 'Crystal-Clear Vector Quality:',
            desc: 'Typing directly into PDF structures preserves scalable vector typography, ensuring pin-sharp rendering on any screen or paper printout.',
          },
          {
            label: 'Total PII Protection:',
            desc: 'Social security numbers, banking details, and identification codes are never stored on remote servers — when you close the tab, the RAM vanishes.',
          },
          {
            label: 'Universal Standard ISO 32000:',
            desc: 'Documents compiled by NoSignPDF comply strictly with international PDF specifications and open seamlessly across Adobe Acrobat and public administration systems.',
          },
        ],
        conclusion: 'NoSignPDF lets you finalize contracts, declarations, and tax returns in seconds without subscribing to costly desktop software.',
        actionLabel: 'Fill out PDF form online',
        actionRoute: '/wypelnij-formularz-pdf',
      },
      {
        title: 'How to combine multiple PDF documents without losing formatting or quality?',
        lead: 'Collating multiple invoices, financial reports, or legal attachments into a single, cohesive PDF is an essential administrative task. Preserving visual fidelity is paramount.',
        bulletPoints: [
          {
            label: 'Visual Page Reordering:',
            desc: 'Our interactive visual grid allows effortless drag-and-drop page sequencing, eliminating misordered pages in mission-critical proposals.',
          },
          {
            label: 'Preserving Embedded Fonts & Vectors:',
            desc: 'Direct object-level merging ensures original font subsets and vector artwork are preserved without blurry rasterization.',
          },
          {
            label: 'Instant Removal of Blank Sheets:',
            desc: 'Easily purge duplicate pages, misoriented scans, or stray blank sheets with one click before compiling the final document.',
          },
          {
            label: 'No Arbitrary File Size Limits:',
            desc: 'Because processing executes locally, your documents are bounded only by your computer memory, not arbitrary web server upload caps.',
          },
        ],
        conclusion: 'Once your documents are merged, you can immediately compress the file or remove metadata in a streamlined, zero-friction retention workflow.',
        actionLabel: 'Merge multiple PDF files now',
        actionRoute: '/polacz-pdf',
      },
    ],
  },
  es: {
    sectionAriaLabel: 'Base de conocimiento y guía de edición segura de PDF',
    whyBadge: 'Arquitectura Privacy-First y 100% Seguridad',
    whyReadingTime: 'Lectura: 4 minutos • Compendio informativo',
    whyTitle: '¿Por qué elegir NoSignPDF? Seguridad de documentos en la era cloud',
    whyLead:
      'La mayoría de convertidores online exigen subir archivos confidenciales a servidores remotos. NoSignPDF cambia las reglas: todas las operaciones se ejecutan 100% en local en tu navegador, sin riesgo de filtraciones, sin cuentas y sin almacenar datos en la nube.',
    whyPillars: [
      {
        title: 'Cero Subidas y Memoria RAM',
        desc: 'Los archivos se procesan únicamente en la memoria local de tu dispositivo. Nuestros servidores no ven ni un solo byte de tu contenido.',
      },
      {
        title: 'Confidencialidad Total para Contratos',
        desc: 'Datos sensibles (DNI, nóminas, extractos bancarios) permanecen bajo tu exclusivo control en cumplimiento estricto con el RGPD europeo.',
      },
      {
        title: 'Velocidad Inmediata sin Límites',
        desc: 'Sin esperas de transferencia de red. El motor WebAssembly y pdf-lib manipula la estructura del PDF directamente con tu procesador.',
      },
    ],
    whyParagraphs: [
      'El formato PDF es el pilar del intercambio de información legal, financiera y empresarial en todo el mundo. A diario se comparten millones de facturas, contratos mercantiles y declaraciones tributarias. Sin embargo, utilizar plataformas web convencionales implica entregar tus documentos privados a terceros sin saber dónde se almacenan ni quién tiene acceso.',
      'NoSignPDF elimina este riesgo de raíz. Gracias a las tecnologías modernas de HTML5 y WebAssembly, el análisis y la renderización ocurren en un entorno aislado dentro de tu propio navegador web. Incluso desconectando tu conexión a internet tras abrir la página, las utilidades continúan operando con total normalidad.',
      'No requerimos registro ni inicio de sesión. No recopilamos tu correo electrónico ni imponemos marcas de agua en tus archivos para forzar suscripciones premium. Tus documentos solo salen de tu equipo cuando tú decides compartirlos.',
    ],
    guideBadge: 'Guía Integral y Glosario Técnico de PDF',
    guideTitle: 'Educación y Buenas Prácticas: Cómo gestionar archivos PDF con seguridad',
    guideSubtitle: 'Consejos de expertos sobre limpieza de metadatos, firma de formularios y unión de documentos sin perder calidad',
    guideArticles: [
      {
        title: '¿Qué son los metadatos de un PDF y por qué deberías limpiarlos antes de enviarlo?',
        lead: 'Más allá del texto y las imágenes visibles, cada documento PDF almacena información técnica oculta conocida como metadatos, generada de forma automática por procesadores de texto y escáneres.',
        bulletPoints: [
          {
            label: 'Identidad y Dispositivo:',
            desc: 'Los metadatos pueden revelar el nombre del autor, el usuario del sistema operativo y la marca o modelo del ordenador.',
          },
          {
            label: 'Rutas de Disco y Versiones:',
            desc: 'A menudo quedan registradas rutas internas de carpetas corporativas y el software empleado en la edición.',
          },
          {
            label: 'Riesgo de Espionaje (OSINT):',
            desc: 'Los ciberdelincuentes analizan metadatos en documentos públicos para planificar ataques de ingeniería social o phishing.',
          },
          {
            label: 'Limpieza en NoSignPDF:',
            desc: 'Nuestro módulo suprime los diccionarios /Info, metadatos XMP y PieceInfo, produciendo un archivo totalmente anónimo y seguro.',
          },
        ],
        conclusion: 'Los expertos en seguridad informática recomiendan eliminar metadatos de contratos, licitaciones y acuerdos de confidencialidad antes de su difusión.',
        actionLabel: 'Limpiar metadatos de tu PDF',
        actionRoute: '/wyczysc-metadane-pdf',
      },
      {
        title: '¿Cómo rellenar y firmar un formulario PDF de forma segura sin imprimir?',
        lead: 'Imprimir en papel, firmar a bolígrafo y volver a escanear genera pérdida de tiempo y recursos. Los formularios digitales AcroForms agilizan las gestiones con total nitidez.',
        bulletPoints: [
          {
            label: 'Campos Nativos AcroForms:',
            desc: 'Los formularios oficiales incluyen casillas interactivas que puedes rellenar directamente desde el navegador.',
          },
          {
            label: 'Nitidez Vectorial:',
            desc: 'La escritura directa sobre la estructura del PDF mantiene las tipografías nítidas e imprimibles en cualquier resolución.',
          },
          {
            label: 'Protección de Datos Personales:',
            desc: 'Tus datos bancarios o de identificación nunca se envían a ningún servidor: al cerrar la pestaña se liberan de la RAM.',
          },
          {
            label: 'Compatibilidad ISO 32000:',
            desc: 'Los documentos producidos cumplen rigurosamente el estándar internacional y abren sin errores en Adobe Acrobat y sedes electrónicas.',
          },
        ],
        conclusion: 'Con NoSignPDF completas contratos y trámites oficiales en segundos sin pagar costosas licencias de programas de escritorio.',
        actionLabel: 'Rellenar formulario PDF online',
        actionRoute: '/wypelnij-formularz-pdf',
      },
      {
        title: '¿Cómo unir varios documentos PDF sin perder calidad ni formato?',
        lead: 'Combinar facturas, anexos o informes en un único PDF ordenado es una tarea cotidiana. La clave consiste en respetar la resolución original de fuentes y gráficos.',
        bulletPoints: [
          {
            label: 'Organización Visual de Páginas:',
            desc: 'La cuadrícula visual te permite arrastrar y soltar miniaturas para definir el orden exacto de los pliegos.',
          },
          {
            label: 'Conservación de Tipografías:',
            desc: 'La unión a nivel de objetos copia las fuentes vectoriales sin pixelar el contenido ni perder la capacidad de búsqueda.',
          },
          {
            label: 'Eliminación de Páginas en Blanco:',
            desc: 'Puedes descartar pliegos vacíos o escaneos defectuosos con un solo clic antes de compilar el documento final.',
          },
          {
            label: 'Sin Restricciones de Tamaño:',
            desc: 'Al operar en local, el límite de volumen lo determina únicamente la memoria RAM de tu propio dispositivo.',
          },
        ],
        conclusion: 'Una vez unidos tus documentos, puedes optimizarlos o retirar metadatos en un flujo fluido sin necesidad de volver a cargarlos.',
        actionLabel: 'Unir archivos PDF ahora',
        actionRoute: '/polacz-pdf',
      },
    ],
  },
  hi: {
    sectionAriaLabel: 'पीडीएफ ज्ञान केंद्र और सुरक्षित संपादन गाइड',
    whyBadge: 'Privacy-First तकनीक और 100% सुरक्षा',
    whyReadingTime: 'पढ़ने का समय: 4 मिनट • संपूर्ण मार्गदर्शिका',
    whyTitle: 'NoSignPDF क्यों चुनें? क्लाउड युग में दस्तावेज़ों की पूर्ण गोपनीयता',
    whyLead:
      'अधिकांश ऑनलाइन पीडीएफ टूल्स आपके निजी दस्तावेज़ों को बाहरी क्लाउड सर्वर पर अपलोड करवाते हैं। NoSignPDF इसे पूरी तरह बदल देता है: सभी कार्य 100% स्थानीय रूप से आपके वेब ब्राउज़र में होते हैं, जिसमें शून्य डेटा लीक का जोखिम और बिना किसी खाते के काम होता है।',
    whyPillars: [
      {
        title: 'शून्य अपलोड और डिवाइस रैम',
        desc: 'फ़ाइलें केवल आपके डिवाइस की रैम में खुलती हैं। हमारे सर्वर पर आपके दस्तावेज़ का एक भी बाइट नहीं भेजा जाता।',
      },
      {
        title: 'अनुबंधों और बिलों की गोपनीयता',
        desc: 'संवेदनशील जानकारी (पहचान पत्र, बैंक विवरण, वेतन रसीदें) केवल आपके पास सुरक्षित रहती हैं, जो कड़े गोपनीयता मानकों के अनुरूप है।',
      },
      {
        title: 'अल्ट्रा-फास्ट स्पीड और असीमित उपयोग',
        desc: 'इंटरनेट पर अपलोड की प्रतीक्षा नहीं करनी पड़ती। WebAssembly और pdf-lib सीधे आपके कंप्यूटर प्रोसेसर से काम करते हैं।',
      },
    ],
    whyParagraphs: [
      'पीडीएफ (Portable Document Format) वैश्विक स्तर पर व्यापार, कानून और सरकारी कार्यों का मुख्य आधार है। हर दिन करोड़ों अनुबंध, टैक्स रिटर्न और वित्तीय विवरण साझा किए जाते हैं। पारंपरिक टूल्स पर फाइल अपलोड करने से यह जोखिम रहता है कि आपकी निजी जानकारी सर्वर पर हमेशा के लिए दर्ज हो सकती है।',
      'NoSignPDF इस समस्या को समाप्त करता है। आधुनिक वेब मानकों, HTML5 File API और WebAssembly की सहायता से संपादन का सारा कार्य आपके ब्राउज़र के सुरक्षित सैंडबॉक्स में होता है। यहाँ तक कि पेज लोड होने के बाद इंटरनेट बंद करने पर भी सभी टूल्स काम करते रहते हैं।',
      'बिना किसी रजिस्ट्रेशन या लॉगिन के काम करना न केवल सुविधाजनक है बल्कि डिजिटल सुरक्षा के लिए भी आवश्यक है। हम न तो ईमेल एकत्र करते हैं और न ही फाइलों पर वॉटरमार्क लगाते हैं। आपका दस्तावेज़ तब तक आपके पास रहता है जब तक आप स्वयं उसे किसी को न भेजें।',
    ],
    guideBadge: 'विस्तृत पीडीएफ गाइड और शब्दावली',
    guideTitle: 'शिक्षा और सर्वोत्तम अभ्यास: पीडीएफ का सुरक्षित और कुशल प्रबंधन',
    guideSubtitle: 'मेटाडेटा हटाने, फॉर्म भरने और गुणवत्ता बनाए रखते हुए फाइलें जोड़ने पर विशेषज्ञों के सुझाव',
    guideArticles: [
      {
        title: 'पीडीएफ मेटाडेटा क्या है और इसे दूसरों को भेजने से पहले क्यों हटाना चाहिए?',
        lead: 'दृश्यमान टेक्स्ट और तस्वीरों के अलावा, प्रत्येक पीडीएफ में छिपी हुई तकनीकी जानकारी (मेटाडेटा) होती है जो सॉफ्टवेयर और कंप्यूटर द्वारा स्वतः दर्ज की जाती है।',
        bulletPoints: [
          {
            label: 'लेखक और कंप्यूटर की पहचान:',
            desc: 'मेटाडेटा में लेखक का असली नाम, ऑपरेटिंग सिस्टम का यूजरनेम और डिवाइस का मॉडल छिपा हो सकता है।',
          },
          {
            label: 'फ़ोल्डर पाथ और सॉफ़्टवेयर संस्करण:',
            desc: 'दस्तावेज़ में आपके कंप्यूटर की आंतरिक डायरेक्टरी (जैसे C:\\Users\\Name\\...) का पता दर्ज रह सकता है।',
          },
          {
            label: 'सुरक्षा जोखिम (Cyber Threat):',
            desc: 'साइबर अपराधी मेटाडेटा का विश्लेषण करके फ़िशिंग या हैकिंग की योजना बनाते हैं।',
          },
          {
            label: 'NoSignPDF से सफाई:',
            desc: 'हमारा टूल /Info, XMP और PieceInfo डेटा को पूरी तरह हटाकर दस्तावेज़ को 100% अनाम और सुरक्षित बना देता है।',
          },
        ],
        conclusion: 'सरकारी निविदाएं, व्यापारिक समझौते और अनुबंध भेजने से पहले मेटाडेटा हटाना एक सुरक्षित आदत है।',
        actionLabel: 'अपने पीडीएफ से मेटाडेटा हटाएं',
        actionRoute: '/wyczysc-metadane-pdf',
      },
      {
        title: 'प्रिंट किए बिना सुरक्षित रूप से पीडीएफ फॉर्म कैसे भरें?',
        lead: 'कागज पर प्रिंट निकालना, कलम से हस्ताक्षर करना और दोबारा स्कैन करना समय और संसाधनों की बर्बादी है। डिजिटल AcroForms से आप तुरंत काम पूरा कर सकते हैं।',
        bulletPoints: [
          {
            label: 'मूल AcroForm डिजिटल फ़ील्ड:',
            desc: 'आधिकारिक फॉर्म में डिजिटल बॉक्स होते हैं जिन्हें सीधे ब्राउज़र में क्लिक करके भरा जा सकता है।',
          },
          {
            label: 'उच्च वेक्टर गुणवत्ता:',
            desc: 'सीधे पीडीएफ में टाइप करने से फ़ॉन्ट की स्पष्टता बनी रहती है और प्रिंट में कोई धुंधलापन नहीं आता।',
          },
          {
            label: 'निजी डेटा की पूर्ण सुरक्षा:',
            desc: 'पैन कार्ड, आधार या बैंक विवरण कभी किसी बाहरी सर्वर पर दर्ज नहीं होते; टैब बंद करते ही डेटा मिट जाता है।',
          },
          {
            label: 'ISO 32000 मानक का पालन:',
            desc: 'NoSignPDF द्वारा तैयार फाइलें Adobe Reader और सरकारी पोर्टलों पर त्रुटिहीन रूप से खुलती हैं।',
          },
        ],
        conclusion: 'महंगे सॉफ्टवेयर खरीदे बिना कुछ ही पलों में अपने आधिकारिक फॉर्म और डिक्लेरेशन भरें।',
        actionLabel: 'ऑनलाइन पीडीएफ फॉर्म भरें',
        actionRoute: '/wypelnij-formularz-pdf',
      },
      {
        title: 'गुणवत्ता और फ़ॉर्मैटिंग खोए बिना कई पीडीएफ फाइलों को एक साथ कैसे जोड़ें?',
        lead: 'कई बिल, रिपोर्ट या अनुबंधों के पन्नों को एक व्यवस्थित पीडीएफ में जोड़ना कार्यालयों का सबसे आम कार्य है। इसमें स्पष्टता बरकरार रखना सबसे महत्वपूर्ण है।',
        bulletPoints: [
          {
            label: 'दृश्यात्मक क्रम बदलना (Drag & Drop):',
            desc: 'थंबनेल ग्रिड की मदद से आप आसानी से पन्नों को अपनी पसंद के क्रम में खींचकर लगा सकते हैं।',
          },
          {
            label: 'वेक्टर फ़ॉन्ट सुरक्षित रखना:',
            desc: 'ऑब्जेक्ट स्तर पर मर्ज करने से फ़ॉन्ट और टेक्स्ट सर्च करने की क्षमता सुरक्षित रहती है।',
          },
          {
            label: 'खाली पन्नों को हटाना:',
            desc: 'मर्ज करने से पहले गलत स्कैन या खाली पन्नों को एक क्लिक में रीसायकल बिन में डाला जा सकता है।',
          },
          {
            label: 'फ़ाइल साइज़ की कोई सीमा नहीं:',
            desc: 'चूंकि काम आपके अपने कंप्यूटर पर होता है, इसलिए आप अपनी सुविधानुसार बड़ी फाइलें भी जोड़ सकते हैं।',
          },
        ],
        conclusion: 'फ़ाइलें जोड़ने के बाद आप उसी दस्तावेज़ को कंप्रेस भी कर सकते हैं और मेटाडेटा भी साफ़ कर सकते हैं।',
        actionLabel: 'कई पीडीएफ फाइलों को अभी जोड़ें',
        actionRoute: '/polacz-pdf',
      },
    ],
  },
};
