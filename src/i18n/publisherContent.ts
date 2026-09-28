import { Language } from './translations';

export interface GuideArticle {
  id: string;
  iconName: string;
  title: string;
  summary: string;
  content: string[];
}

export interface PublisherContentSection {
  badge: string;
  mainHeading: string;
  subHeading: string;
  whyUsIntro: string[];
  pillars: {
    title: string;
    description: string;
  }[];
  businessSafetyTitle: string;
  businessSafetyParagraphs: string[];
  guideTitle: string;
  guideSubtitle: string;
  guideArticles: GuideArticle[];
  quote: {
    text: string;
    author: string;
  };
}

export const PUBLISHER_CONTENT: Record<Language, PublisherContentSection> = {
  pl: {
    badge: '100% Bezpieczeństwo i Poufność · Standard Enterprise',
    mainHeading: 'Dlaczego NoSignPDF? Rewolucja w Bezpiecznym Przetwarzaniu Dokumentów',
    subHeading: 'Współczesny obieg dokumentów wymaga bezwzględnej ochrony tajemnicy służbowej, danych osobowych (RODO) i poufności transakcji handlowych.',
    whyUsIntro: [
      'Większość powszechnie znanych internetowych narzędzi PDF (takich jak iLovePDF, SmallPDF czy Adobe Acrobat Online) opiera swoje działanie na architekturze chmurowej (Cloud-based). Oznacza to, że każdy przesyłany plik – niezależnie od tego, czy jest to poufna umowa handlowa, sprawozdanie finansowe spółki, wyciąg bankowy, czy wniosek urlopowy z numerem PESEL – zostaje wysłany przez publiczny internet na zewnętrzny serwer. Na takim serwerze plik jest zapisywany w pamięci masowej, przetwarzany przez zewnętrzne procesy i tymczasowo przechowywany w logach.',
      'Dla prawników, radców prawnych, doradców podatkowych, księgowych, lekarzy oraz przedsiębiorców przesyłanie wrażliwej dokumentacji na nieznane serwery to ogromne ryzyko prawne, naruszenie tajemnicy zawodowej oraz potencjalny wyciek danych podlegający karom RODO / GDPR. Platforma nosignpdf.com powstała, aby wyeliminować to zagrożenie w zarodku.',
      'W nosignpdf.com wdrożyliśmy zaawansowany silnik Client-Side oparty na technologiach WebAssembly oraz JavaScript (pdf-lib, pdfjs-dist). Wszystkie operacje – łączenie, dzielenie, obracanie, kompresja, usuwanie stron, wypełnianie formularzy urzędowych oraz czyszczenie metadanych – wykonują się w 100% lokalnie w pamięci RAM Twojego komputera, telefonu lub tabletu. Żaden bajt Twoich dokumentów nie opuszcza Twojej przeglądarki.',
    ],
    pillars: [
      {
        title: 'Zero Rejestracji i Brak Śladu Cyfrowego',
        description: 'Nie wymagamy podawania adresu e-mail, haseł ani numeru karty. Nie tworzymy kont użytkowników i nie śledzimy Twojej aktywności. Po zamknięciu karty przeglądarki wszystkie dane w pamięci RAM zostają bezpowrotnie wyczyszczone.',
      },
      {
        title: 'Pełna Zgodność z RODO / GDPR i NDA',
        description: 'Brak transmisji danych na serwer oznacza, że nosignpdf.com nie jest procesorem danych w rozumieniu RODO (art. 28). Korzystanie z naszej platformy jest w 100% bezpieczne nawet przy najbardziej rygorystycznych klauzulach poufności (NDA).',
      },
      {
        title: 'Prędkość Sprzętowa i Praca Offline',
        description: 'Nie tracisz czasu na wysyłanie i pobieranie ciężkich plików przez internet. Operacje na setkach stron trwają ułamki sekund, ponieważ wykorzystują bezpośrednią moc obliczeniową procesora Twojego urządzenia.',
      },
      {
        title: 'Brak Ukrytych Kosztów i Znaków Wodnych',
        description: 'Pobierasz w 100% czyste, oryginalne dokumenty w pełnej rozdzielczości wektorowej bez irytujących znaków wodnych, limitów stron czy wymuszonych płatnych subskrypcji.',
      },
    ],
    businessSafetyTitle: 'Bezpieczeństwo Dokumentów Biznesowych, Umów i Faktur',
    businessSafetyParagraphs: [
      'W erze zaawansowanych cyberataków, wycieków baz danych w chmurze oraz precyzyjnego phishingu, format PDF (Portable Document Format) stał się globalnym standardem wymiany wiążących pism urzędowych, aktów notarialnych, faktur VAT, deklaracji podatkowych (np. PIT, CIT, PCC-3) oraz raportów medycznych.',
      'Niestety, niewiele osób zdaje sobie sprawę, że standardowy plik PDF to nie tylko widoczny tekst i grafika, ale złożony kontener zawierający metadane, profile kolorów, strumienie obiektów i historię rewizji. Wysyłając dokument na darmowy serwer w chmurze, powierzasz tajemnice przedsiębiorstwa podmiotom, których polityki prywatności często zezwalają na profilowanie danych lub przechowywanie kopii zapasowych w jurysdykcjach poza Unią Europejską.',
      'Dzięki NoSignPDF zyskujesz pewność cyfrowej suwerenności: Twoje wyciągi z konta bankowego, poufne negocjacje cenowe, dane kadrowe i wnioski kredytowe są modyfikowane w hermetycznym, lokalnym środowisku Twojej własnej przeglądarki internetowej.',
    ],
    guideTitle: 'Słownik i Baza Wiedzy PDF: Praktyczny Przewodnik Ekspercki',
    guideSubtitle: 'Poznaj kluczowe pojęcia, mechanizmy bezpieczeństwa oraz standardy techniczne formatu PDF.',
    guideArticles: [
      {
        id: 'metadata-guide',
        iconName: 'ShieldAlert',
        title: 'Co to są metadane w pliku PDF i dlaczego należy je bezwzględnie czyścić?',
        summary: 'Metadane to niewidoczne na wydruku informacje zakodowane w nagłówkach pliku PDF, ujawniające dane autora, oprogramowania i środowiska pracy.',
        content: [
          'Każdy plik PDF generowany w programach biurowych (Microsoft Word, LibreOffice, Apple Pages, Google Docs) lub graficznych (Adobe InDesign, Illustrator, Photoshop, Canva) zapisuje w strukturze pliku słownik informacyjny /Info oraz strumień metadanych XML zgodny ze standardem XMP (Extensible Metadata Platform).',
          'W tych ukrytych strukturach znajdują się: pełne imię i nazwisko autora, login użytkownika w systemie Windows lub macOS, nazwa komputera w sieci firmowej, dokładna data i godzina utworzenia dokumentu, historia kolejnych modyfikacji ze strefą czasową, nazwa i wersja oprogramowania, a nierzadko również model drukarki, ścieżki plików na dysku (np. C:\\Users\\JanKowalski\\Desktop\\Poufne...) oraz unikalne identyfikatory UUID/GUID.',
          'Wysyłając ofertę przetargową, pismo procesowe lub CV z nieoczyszczonymi metadanymi, ryzykujesz ujawnienie tożsamości podwykonawców, faktycznego czasu pracy nad dokumentem lub wewnętrznych uwag roboczych. Narzędzie "Czyszczenie Metadanych PDF" w nosignpdf.com usuwa wszystkie te parametry w 100% lokalnie, pozostawiając dokument idealnie czysty i zanonimizowany.',
        ],
      },
      {
        id: 'sign-forms-guide',
        iconName: 'FileSignature',
        title: 'Jak bezpiecznie wypełnić i podpisać formularz PDF bez drukowania?',
        summary: 'Tradycyjne drukowanie, ręczne wypełnianie długopisem i skanowanie to strata czasu i papieru. Poznaj nowoczesne wypełnianie AcroForms.',
        content: [
          'Większość pism urzędowych (wnioski ZUS, deklaracje skarbowe Ministerstwa Finansów, umowy najmu, formularze celne) udostępniana jest w formacie PDF. Dzielą się one na dokumenty z aktywnymi polami cyfrowymi (tzw. AcroForms) oraz płaskie skany bez interaktywnych pól.',
          'Nasz Wypełniacz Formularzy PDF automatycznie wykrywa interaktywne pola formularza AcroForm i pozwala na ich bezpośrednią edycję. W przypadku dokumentów będących płaskimi skanami, inteligentny moduł umożliwia kliknięcie w dowolną kratkę lub linijkę, utworzenie pola tekstowego lub checkboxa, dopasowanie rozmiaru czcionki i zapisanie gotowego pliku.',
          'Kluczowa zaleta: w przeciwieństwie do drogich programów subskrypcyjnych (jak Acrobat Pro), nosignpdf.com zapisuje wprowadzone dane bezpośrednio w wektorowej specyfikacji PDF z zachowaniem polskich znaków diakrytycznych (ą, ć, ę, ł, ń, ó, ś, ź, ż). Dokument jest w pełni akceptowany przez polskie urzędy, banki i sądy.',
        ],
      },
      {
        id: 'merge-guide',
        iconName: 'FileStack',
        title: 'Jak skutecznie połączyć wiele plików PDF w jeden bez utraty jakości?',
        summary: 'Scalanie wielostronicowych dokumentów, umów z załącznikami i skanów faktur w jeden spójny plik PDF.',
        content: [
          'Łączenie plików PDF (Merge PDF) to jedna z najczęstszych operacji biurowych. Częstym błędem darmowych konwerterów jest zamiana stron wektorowych na rastrowe obrazy JPEG o niskiej rozdzielczości, co skutkuje rozmazanym tekstem po wydruku oraz ogromnym rozmiarem pliku.',
          'W nosignpdf.com proces łączenia dokumentów opiera się na bezstratnym kopiowaniu obiektów wektorowych (Lossless Vector Copying). Silnik pdf-lib przenosi oryginalne strumienie czcionek, definicje krzywych i grafiki wektorowe bez powtórnej kompresji stratnej.',
          'Dzięki wizualnemu pulpitowi Drag & Drop możesz swobodnie układać kolejność stron z różnych plików, obracać krzywo zeskanowane arkusze oraz usuwać puste strony przed ostatecznym wygenerowaniem scalonego pliku PDF.',
        ],
      },
      {
        id: 'compression-guide',
        iconName: 'Minimize2',
        title: 'Jak działa kompresja PDF i dlaczego tekst pozostaje ostry jak brzytwa?',
        summary: 'Optymalizacja rozmiaru pliku PDF pod limity załączników poczty elektronicznej (np. 10 MB / 25 MB) i systemów urzędowych (ePUAP).',
        content: [
          'Wielu użytkowników boryka się z problemem odrzucenia załącznika przez serwery pocztowe lub portale rekrutacyjne z powodu przekroczenia limitu wagi pliku. Zeskanowane faktury czy raporty potrafią ważyć po kilkadziesiąt megabajtów.',
          'Lokalna kompresja PDF w nosignpdf.com stosuje dwuetapową optymalizację: usuwa nadmiarowe, zduplikowane obiekty wewnętrzne oraz kompresuje osadzone bitmapy przy użyciu algorytmów adaptacyjnych.',
          'Co najważniejsze: warstwa wektorowa czcionek i tekstów nie ulega degradacji. Oznacza to, że niezależnie od powiększenia dokumentu na ekranie lub po wydruku w rozdzielczości 600 DPI, litery pozostają perfekcyjnie ostre i czytelne.',
        ],
      },
    ],
    quote: {
      text: 'Prawdziwa prywatność w sieci zaczyna się tam, gdzie Twoje pliki nigdy nie opuszczają Twojego urządzenia. NoSignPDF to standard bezpieczeństwa, na który zasługuje każdy internauta i przedsiębiorca.',
      author: 'Zespół Inżynierii Bezpieczeństwa nosignpdf.com',
    },
  },

  en: {
    badge: '100% Privacy-First · Enterprise Security Standard',
    mainHeading: 'Why NoSignPDF? The Next-Gen Private In-Browser PDF Suite',
    subHeading: 'Modern document management demands uncompromising protection of trade secrets, GDPR compliance, and business confidentiality.',
    whyUsIntro: [
      'Most well-known online PDF converters and utilities (such as iLovePDF, SmallPDF, or Adobe Acrobat Online) rely on server-centric cloud architecture. Whenever you edit, merge, or convert a file on these platforms, your confidential files – whether commercial contracts, company financials, tax records, or employee agreements – are uploaded over the public internet to third-party remote servers. There, documents are stored on cloud disks, processed by backend daemons, and retained in temporary storage logs.',
      'For attorneys, financial advisors, CPAs, doctors, healthcare workers, and enterprise professionals, transmitting confidential documents to unknown cloud infrastructure carries substantial legal liability, breaches attorney-client privilege, and risks catastrophic data leaks under GDPR, HIPAA, and CCPA regulations. nosignpdf.com was engineered specifically to solve this vulnerability once and for all.',
      'At nosignpdf.com, we deployed a high-performance Client-Side processing engine powered by WebAssembly and native JavaScript (pdf-lib, pdfjs-dist). All PDF tasks – merging, splitting, rotating, compressing, deleting pages, filling official forms, and scrubbing metadata – execute 100% locally inside your device RAM. Zero bytes of your documents are ever transmitted across the network.',
    ],
    pillars: [
      {
        title: 'Zero Sign-Up & Zero Digital Footprint',
        description: 'No account registration, no email address, and no credit card required. We do not track your activity, and closing your browser tab permanently purges all working memory.',
      },
      {
        title: 'Full GDPR, HIPAA & NDA Compliance',
        description: 'Because your files never touch any external server, nosignpdf.com is never a Data Processor under GDPR Article 28. Fully safe for strict non-disclosure agreements.',
      },
      {
        title: 'Hardware Acceleration & Offline Capability',
        description: 'Eliminate upload and download latency. Multi-page document operations finish in milliseconds by utilizing your device processor directly.',
      },
      {
        title: 'No Watermarks & No Hidden Subscriptions',
        description: 'Download clean, pristine documents in original vector resolution without watermarks, artificial page count limits, or aggressive paywalls.',
      },
    ],
    businessSafetyTitle: 'Securing Business Contracts, Invoices, and Legal Documents',
    businessSafetyParagraphs: [
      'In an era plagued by corporate data breaches, server vulnerabilities, and sophisticated spear-phishing attacks, the PDF (Portable Document Format) stands as the universal backbone of legal agreements, tax filings, NDAs, invoices, and medical records.',
      'Few users realize that a standard PDF is not simply rendered text and images; it is a complex container housing metadata streams, color profiles, revision histories, and embedded scripts. Uploading such documents to free cloud converters exposes proprietary corporate intelligence to third-party data collection.',
      'With NoSignPDF, you maintain complete digital sovereignty: bank statements, tender proposals, price quotes, and human resources dossiers are handled in a strictly sandboxed local browser environment.',
    ],
    guideTitle: 'PDF Knowledge Base & User Guide: Professional Best Practices',
    guideSubtitle: 'Master essential concepts, cybersecurity principles, and technical PDF standards.',
    guideArticles: [
      {
        id: 'metadata-guide',
        iconName: 'ShieldAlert',
        title: 'What is PDF metadata and why should you always scrub it?',
        summary: 'Metadata consists of invisible data encoded in PDF headers revealing authors, device models, software suites, and revision history.',
        content: [
          'Every PDF generated in office suites (Microsoft Word, LibreOffice, Apple Pages, Google Docs) or design software (Adobe InDesign, Illustrator, Photoshop, Canva) embeds an internal /Info dictionary and an XML-based XMP (Extensible Metadata Platform) stream.',
          'These hidden structures record: author full names, operating system usernames, local network computer names, creation timestamps with exact timezones, software build numbers, and even printer drivers or raw disk directory paths.',
          'Submitting proposals, legal pleadings, or resumes containing raw metadata risks leaking confidential business relationships or internal draft changes. The "PDF Metadata Stripper" on nosignpdf.com purges these traces client-side, ensuring total document anonymity.',
        ],
      },
      {
        id: 'sign-forms-guide',
        iconName: 'FileSignature',
        title: 'How to securely fill and sign PDF forms online without printing?',
        summary: 'Printing out contracts, signing with pens, and scanning them back in wastes time and paper. Discover modern in-browser AcroForms.',
        content: [
          'Most government applications, leases, tax forms, and NDAs arrive as PDFs. They typically fall into two categories: interactive digital AcroForms or flat scanned image files without interactive fields.',
          'Our PDF Form Filler automatically detects native AcroForm fields for direct typing and checkbox toggling. For flat scanned PDFs, our smart canvas engine lets you click anywhere to place custom text, set font sizes, and check boxes.',
          'Unlike costly commercial subscriptions (e.g. Adobe Acrobat Pro), nosignpdf.com embeds data directly into the vector PDF specification. The resulting files are universally recognized and valid in legal, banking, and government portals.',
        ],
      },
      {
        id: 'merge-guide',
        iconName: 'FileStack',
        title: 'How to merge multiple PDF files into one document without quality loss?',
        summary: 'Combine multi-page reports, exhibits, and invoices into a single, cohesive PDF.',
        content: [
          'Merging PDF files is a vital daily task. Poorly designed cloud tools often rasterize vector pages into low-resolution JPEG images, causing blurry text when printed and bloated file sizes.',
          'nosignpdf.com uses lossless vector stream copying. The pdf-lib engine extracts and merges original font streams, curves, and vector illustrations without any lossy re-compression.',
          'Our visual Drag & Drop workspace lets you rearrange pages, rotate upside-down sheets, and eliminate blank pages before exporting your consolidated PDF.',
        ],
      },
      {
        id: 'compression-guide',
        iconName: 'Minimize2',
        title: 'How does in-browser PDF compression work while keeping text sharp?',
        summary: 'Optimize PDF file size to clear email attachment limits (e.g., 10 MB / 25 MB) and government upload portals.',
        content: [
          'Email servers and portals regularly reject large PDF attachments. High-resolution document scans can easily swell to dozens of megabytes.',
          'Our local compression algorithm strips redundant object streams, deduplicates font dictionaries, and applies smart adaptive image quantization.',
          'Most importantly, font vector streams are never degraded. Whether viewed at 400% zoom on a Retina display or printed at 600 DPI, your typography remains crisp and legible.',
        ],
      },
    ],
    quote: {
      text: 'True digital privacy begins when your files never leave your device. NoSignPDF delivers the privacy standard that every individual and modern business deserves.',
      author: 'Security Engineering Team, nosignpdf.com',
    },
  },

  es: {
    badge: '100% Privacidad · Estándar de Seguridad Empresarial',
    mainHeading: '¿Por qué NoSignPDF? La Revolución en Edición Segura de PDF',
    subHeading: 'La gestión documental moderna exige protección absoluta del secreto profesional, normativas de privacidad (RGPD) y confidencialidad.',
    whyUsIntro: [
      'La gran mayoría de conversores y editores de PDF online (como iLovePDF, SmallPDF o Adobe Online) dependen de servidores en la nube. Cuando editas o combinas un archivo en esas plataformas, tus contratos privados, nóminas, facturas y balances son enviados a servidores remotos donde quedan registrados en discos y registros de almacenamiento temporal.',
      'Para abogados, asesores fiscales, médicos y empresas, subir información confidencial a servidores externos supone una vulneración del secreto profesional y de las normativas de protección de datos (RGPD). nosignpdf.com nació para erradicar este riesgo.',
      'En nosignpdf.com implementamos un motor Client-Side con WebAssembly y JavaScript (pdf-lib, pdfjs-dist). Todas las tareas (unir, dividir, rotar, comprimir, rellenar formularios y limpiar metadatos) se ejecutan al 100% en la memoria RAM de tu dispositivo. Ningún byte sale de tu navegador.',
    ],
    pillars: [
      {
        title: 'Sin Registro y Sin Huella Digital',
        description: 'No solicitamos correo electrónico ni datos bancarios. Al cerrar la pestaña de tu navegador, la memoria RAM se libera por completo sin dejar copias.',
      },
      {
        title: 'Cumplimiento Total de RGPD y Acuerdos NDA',
        description: 'Al no existir transmisión a servidores, nosignpdf.com no actúa como encargado del tratamiento (art. 28 RGPD). Totalmente seguro para documentos protegidos por NDA.',
      },
      {
        title: 'Velocidad de Hardware y Modo Offline',
        description: 'Sin esperas de subida o descarga. Las operaciones con cientos de páginas se realizan en milisegundos usando directamente la potencia de tu equipo.',
      },
      {
        title: 'Sin Marcas de Agua ni Pagos Ocultos',
        description: 'Descarga documentos limpios en resolución vectorial completa, sin marcas de agua publicitarias ni suscripciones engañosas.',
      },
    ],
    businessSafetyTitle: 'Seguridad en Contratos, Facturas y Documentación Legal',
    businessSafetyParagraphs: [
      'En un entorno digital expuesto a filtraciones masivas de datos y ciberataques, el formato PDF es el estándar indiscutible para contratos mercantiles, declaraciones tributarias, nóminas y expedientes judiciales.',
      'Un archivo PDF no es solo texto e imágenes; contiene metadatos ocultos, flujos de objetos y revisiones previas. Subir estos documentos a servidores externos compromete la propiedad intelectual y la privacidad de tu negocio.',
      'Con NoSignPDF garantizas la soberanía de tus datos: tus extractos bancarios y acuerdos comerciales se procesan en un entorno estrictamente aislado y local en tu navegador.',
    ],
    guideTitle: 'Guía y Base de Conocimiento PDF: Manual Práctico para Profesionales',
    guideSubtitle: 'Aprende los conceptos clave, mecanismos de seguridad y estándares técnicos del formato PDF.',
    guideArticles: [
      {
        id: 'metadata-guide',
        iconName: 'ShieldAlert',
        title: '¿Qué son los metadatos en un PDF y por qué debes eliminarlos?',
        summary: 'Son datos invisibles codificados en los encabezados del archivo que revelan autor, software, equipo y fechas de edición.',
        content: [
          'Cualquier PDF generado con procesadores de texto (Word, Docs) o programas de diseño (InDesign, Canva) incluye un diccionario /Info y un flujo XML según el estándar XMP.',
          'Esta información oculta contiene el nombre completo del autor, usuario del sistema operativo, nombre del equipo en red, fecha exacta de creación y versión del software utilizado.',
          'Enviar presupuestos o demandas judiciales sin limpiar metadatos puede exponer información confidencial de tus clientes. El limpiador de metadatos de nosignpdf.com elimina estos rastros de manera 100% local.',
        ],
      },
      {
        id: 'sign-forms-guide',
        iconName: 'FileSignature',
        title: '¿Cómo rellenar y firmar formularios PDF online sin imprimir?',
        summary: 'Imprimir, firmar a mano y escanear es costoso e ineficiente. Conoce el estándar AcroForms en navegador.',
        content: [
          'La mayoría de trámites administrativos, contratos de alquiler y modelos tributarios se distribuyen en PDF interactivo (AcroForms) o en escaneos planos.',
          'Nuestro rellenador detecta campos digitales nativos y permite escribir directamente. En PDFs escaneados, permite añadir campos de texto y casillas con total precisión.',
          'A diferencia de costosos programas de suscripción, nosignpdf.com guarda los datos directamente en la especificación vectorial del PDF, siendo válidos ante notarías y administraciones públicas.',
        ],
      },
      {
        id: 'merge-guide',
        iconName: 'FileStack',
        title: '¿Cómo unir múltiples archivos PDF sin perder calidad de impresión?',
        summary: 'Combina informes extensos, anexos y facturas en un único documento limpio y ordenado.',
        content: [
          'Unir archivos PDF es una tarea diaria esencial. Muchos convertidores gratuitos convierten las páginas en imágenes JPEG comprimidas, arruinando la nitidez del texto.',
          'En nosignpdf.com la combinación se realiza copiando flujos vectoriales originales sin pérdida, manteniendo las fuentes y líneas perfectamente definidas.',
          'Nuestro panel interactivo te permite arrastrar miniaturas para fijar el orden, girar páginas torcidas y eliminar hojas en blanco antes de descargar.',
        ],
      },
      {
        id: 'compression-guide',
        iconName: 'Minimize2',
        title: '¿Cómo funciona la compresión PDF manteniendo el texto nítido?',
        summary: 'Reduce el tamaño del archivo para cumplir con límites de correo electrónico (10 MB / 25 MB) y sedes electrónicas.',
        content: [
          'Los servidores de correo rechazan habitualmente archivos pesados. Los escaneos en alta resolución pueden ocupar decenas de megabytes.',
          'Nuestro algoritmo optimiza flujos de objetos redundantes y ajusta imágenes de forma adaptativa sin tocar los vectores tipográficos.',
          'El texto vectorial nunca pierde definición: al ampliar el documento al 400% o imprimirlo a 600 DPI, la tipografía se mantiene completamente nítida.',
        ],
      },
    ],
    quote: {
      text: 'La verdadera privacidad digital existe cuando tus documentos jamás abandonan tu dispositivo. NoSignPDF ofrece el estándar que profesionales y empresas necesitan.',
      author: 'Equipo de Seguridad, nosignpdf.com',
    },
  },

  hi: {
    badge: '100% गोपनीयता · एंटरप्राइज सुरक्षा मानक',
    mainHeading: 'NoSignPDF क्यों? सुरक्षित और निजी इन-ब्राउज़र पीडीएफ समाधान',
    subHeading: 'आधुनिक दस्तावेज़ प्रबंधन में व्यावसायिक गोपनीयता, सरकारी अनुपालन और संवेदनशील डेटा सुरक्षा सर्वोपरि है।',
    whyUsIntro: [
      'अधिकांश ऑनलाइन पीडीएफ टूल्स (जैसे iLovePDF या SmallPDF) क्लाउड सर्वर पर आधारित होते हैं। जब आप अपनी फाइलें उन वेबसाइटों पर अपलोड करते हैं, तो आपके अनुबंध, टैक्स फॉर्म और बैंक स्टेटमेंट इंटरनेट पर अज्ञात सर्वरों पर भेजे जाते हैं और वहां के स्टोरेज में अस्थायी रूप से दर्ज हो जाते हैं।',
      'वकीलों, चार्टर्ड एकाउंटेंट्स, डॉक्टरों और व्यवसायों के लिए क्लाउड सर्वर पर गोपनीय फाइलें अपलोड करना भारी कानूनी जोखिम और डेटा गोपनीयता का उल्लंघन है। nosignpdf.com को इसी समस्या को समाप्त करने के लिए बनाया गया है।',
      'nosignpdf.com में हमने WebAssembly और JavaScript (pdf-lib, pdfjs-dist) पर आधारित 100% क्लाइंट-साइड तकनीक लागू की है। सभी कार्य (मर्ज करना, विभाजित करना, रोटेट करना, फॉर्म भरना, कंप्रेस करना और मेटाडेटा हटाना) सीधे आपके डिवाइस की रैम (RAM) में होते हैं। आपकी फ़ाइल का एक भी बाइट आपके कंप्यूटर या फोन से बाहर नहीं जाता है।',
    ],
    pillars: [
      {
        title: 'बिना लॉगिन और बिना डिजिटल पदचिह्न',
        description: 'कोई खाता बनाने या ईमेल दर्ज करने की आवश्यकता नहीं है। ब्राउज़र टैब बंद करते ही रैम से सभी डेटा तुरंत और स्थायी रूप से मिट जाते हैं।',
      },
      {
        title: 'पूर्ण कानूनी और डेटा सुरक्षा',
        description: 'चूंकि फाइलें कभी किसी बाहरी सर्वर पर नहीं जातीं, इसलिए डेटा लीक या तीसरे पक्ष द्वारा एक्सेस का कोई खतरा नहीं रहता।',
      },
      {
        title: 'हार्डवेयर गति और ऑफलाइन कार्यक्षमता',
        description: 'अपलोड या डाउनलोड की धीमी स्पीड का इंतज़ार न करें। आपके डिवाइस का प्रोसेसर सीधे उपयोग में आता है जिससे काम सेकंडों में पूरा होता है।',
      },
      {
        title: 'वॉटरमार्क और शुल्क से पूर्ण मुक्ति',
        description: 'बिना किसी वॉटरमार्क, पेज सीमा या छुपे हुए सब्सक्रिप्शन के अपने दस्तावेज़ मूल उच्च गुणवत्ता में डाउनलोड करें।',
      },
    ],
    businessSafetyTitle: 'व्यावसायिक अनुबंधों, टैक्स दस्तावेजों और बिलों की सुरक्षा',
    businessSafetyParagraphs: [
      'डिजिटल युग में पीडीएफ (PDF) कानूनी कागजात, टैक्स घोषणाओं (जैसे इनकम टैक्स रिटर्न), चालान और मेडिकल रिकॉर्ड का वैश्विक मानक बन चुका है।',
      'बहुत कम लोग जानते हैं कि एक सामान्य पीडीएफ में केवल दिखाई देने वाला टेक्स्ट ही नहीं, बल्कि आंतरिक मेटाडेटा, डिवाइस कोड और संशोधन इतिहास भी छिपा होता है। इन्हें असुरक्षित क्लाउड वेबसाइटों पर अपलोड करना भारी जोखिम भरा है।',
      'NoSignPDF के साथ आप अपनी डिजिटल सुरक्षा के पूर्ण स्वामी रहते हैं: आपके बैंक विवरण, टेंडर प्रस्ताव और निजी अनुबंध आपके सुरक्षित ब्राउज़र वातावरण में ही प्रोसेस होते हैं।',
    ],
    guideTitle: 'पीडीएफ ज्ञानकोष और उपयोगकर्ता गाइड: संपूर्ण व्यावहारिक मार्गदर्शिका',
    guideSubtitle: 'पीडीएफ तकनीक, सुरक्षा मानकों और उपयोगी तरीकों के बारे में विस्तार से जानें।',
    guideArticles: [
      {
        id: 'metadata-guide',
        iconName: 'ShieldAlert',
        title: 'पीडीएफ मेटाडेटा क्या है और इसे क्यों हटाना चाहिए?',
        summary: 'मेटाडेटा वह अदृश्य जानकारी है जो फाइल में लेखक का नाम, सॉफ्टवेयर और संपादन का समय दर्ज करती है।',
        content: [
          'वर्ड या इनडिज़ाइन जैसे प्रोग्रामों में बनाई गई पीडीएफ फाइलों में लेखक का पूरा नाम, ऑपरेटिंग सिस्टम का यूजरनेम, कंप्यूटर का नेटवर्क नाम और निर्माण का सटीक समय दर्ज होता है।',
          'टेंडर प्रस्ताव या कानूनी दस्तावेज़ भेजते समय यह छिपा हुआ डेटा लीक होना नुकसानदेह हो सकता है। nosignpdf.com का मेटाडेटा क्लीनर इन सभी विवरणों को स्थानीय रूप से तुरंत मिटा देता है।',
        ],
      },
      {
        id: 'sign-forms-guide',
        iconName: 'FileSignature',
        title: 'बिना प्रिंट निकाले पीडीएफ फॉर्म कैसे भरें और डाउनलोड करें?',
        summary: 'कागज़ पर प्रिंट निकालना, पेन से भरना और फिर स्कैन करना समय और पैसे की बर्बादी है।',
        content: [
          'हमारा पीडीएफ फॉर्म फिलर सरकारी फॉर्म्स के आधिकारिक AcroForm फ़ील्ड्स को स्वतः पहचानता है और आपको सीधे टाइप करने की सुविधा देता है।',
          'स्कैन किए गए फॉर्म्स में आप कहीं भी क्लिक करके टेक्स्ट बॉक्स जोड़ सकते हैं और चेकबॉक्स टिक कर सकते हैं। यह परिणाम आधिकारिक सरकारी और बैंक पोर्टल में पूर्णतः मान्य है।',
        ],
      },
      {
        id: 'merge-guide',
        iconName: 'FileStack',
        title: 'गुणवत्ता खोए बिना कई पीडीएफ फाइलों को एक साथ कैसे जोड़ें?',
        summary: 'अनेक रिपोर्ट्स, चालानों और पेजों को एक व्यवस्थित पीडीएफ में मिलाएं।',
        content: [
          'साधारण टूल्स जोड़ने के दौरान फाइलों को कम गुणवत्ता वाली तस्वीरों में बदल देते हैं जिससे टेक्स्ट धुंधला हो जाता है।',
          'nosignpdf.com मूल वेक्टर फॉन्ट्स को बिना किसी नुकसान के जोड़ता है। थंबनेल को खींचकर आप आसानी से पेजों का सही क्रम तय कर सकते हैं।',
        ],
      },
      {
        id: 'compression-guide',
        iconName: 'Minimize2',
        title: 'टेक्स्ट की तीक्ष्णता बनाए रखते हुए पीडीएफ का आकार कैसे घटाएं?',
        summary: 'ईमेल अटैचमेंट सीमा (10-25 एमबी) को पूरा करने के लिए फाइल साइज छोटा करें।',
        content: [
          'हमारा स्थानीय एल्गोरिदम अनावश्यक आंतरिक कोड हटाकर और इमेजेस को बुद्धिमानी से अनुकूलित करके फाइल साइज घटाता है।',
          'वेक्टर टेक्स्ट की स्पष्टता कभी खराब नहीं होती; ज़ूम करने पर भी अक्षर बिल्कुल साफ और पढ़ने योग्य रहते हैं।',
        ],
      },
    ],
    quote: {
      text: 'सच्ची डिजिटल स्वतंत्रता तब शुरू होती है जब आपकी फाइलें कभी आपके डिवाइस से बाहर नहीं जातीं। NoSignPDF वही सुरक्षा प्रदान करता है जिसके आप हकदार हैं।',
      author: 'सुरक्षा इंजीनियरिंग टीम, nosignpdf.com',
    },
  },
};
