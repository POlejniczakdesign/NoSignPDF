import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS, TranslationDict, LANGUAGES } from './translations';
import { SEO_TRANSLATIONS, LocalizedSeoContent } from './seoData';
import { ToolMeta, ToolRoute } from '../types';
import { parsePathname, SUPPORTED_LANGUAGES } from '../lib/routing';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
  getToolMeta: (route: ToolRoute) => ToolMeta;
  getSeoData: (route: ToolRoute) => LocalizedSeoContent;
  localizedTools: ToolMeta[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const TOOL_DEFINITIONS_BY_LANG: Record<Language, ToolMeta[]> = {
  pl: [
    {
      id: 'hub',
      path: '/',
      name: 'Strona Główna – Wszystkie Narzędzia PDF',
      shortName: 'Wszystkie Narzędzia',
      tagline: 'Zaawansowany kombajn PDF działający w 100% lokalnie w Twojej przeglądarce.',
      description: 'Edytuj, łącz, dziel, obracaj i wypełniaj pliki PDF bez rejestracji i bez wysyłania dokumentów na zewnętrzne serwery.',
      iconName: 'LayoutGrid',
      seoKeywords: ['darmowy edytor pdf online', 'bezpieczny pdf w przeglądarce', 'narzędzia pdf bez logowania'],
    },
    {
      id: 'wypelnij',
      path: '/wypelnij-formularz-pdf',
      name: 'Wypełniacz Formularzy PDF',
      shortName: 'Wypełnij Formularz',
      tagline: 'Uzupełniaj wnioski urzędowe, pisma i deklaracje z natywnymi polami AcroForm.',
      description: 'Klikaj w puste pola i kratki na dokumencie. Silnik pdf-lib trwale zapisuje dane w strukturze formularza PDF.',
      iconName: 'FileSignature',
      badge: 'GŁÓWNY MODUŁ',
      seoKeywords: ['wypełnianie formularzy pdf online', 'jak wypełnić wniosek pdf', 'acroforms edytor'],
    },
    {
      id: 'usun',
      path: '/usun-strony-z-pdf',
      name: 'Usuwanie Stron z PDF',
      shortName: 'Usuń Strony',
      tagline: 'Błyskawicznie wytnij niepotrzebne strony lub puste arkusze z dokumentu.',
      description: 'Przejrzyj miniatury stron, jednym kliknięciem usuń wybrane arkusze i pobierz odchudzony plik PDF.',
      iconName: 'FileX',
      seoKeywords: ['usuwanie stron z pdf', 'usuń puste strony pdf', 'wycinanie stron pdf'],
    },
    {
      id: 'obroc',
      path: '/obroc-pdf',
      name: 'Obracanie PDF Online',
      shortName: 'Obróć PDF',
      tagline: 'Obracaj pojedyncze strony lub cały dokument o 90°, 180° i 270°.',
      description: 'Napraw krzywo zeskanowane strony dokumentu. Obracaj arkusze za pomocą jednego kliknięcia.',
      iconName: 'RotateCw',
      seoKeywords: ['obróć pdf online', 'obracanie stron w pdf', 'obróć skan o 90 stopni'],
    },
    {
      id: 'polacz',
      path: '/polacz-pdf',
      name: 'Łączenie Plików PDF (Merge)',
      shortName: 'Połącz PDF',
      tagline: 'Scal wiele plików PDF w jeden spójny dokument o ustalonej kolejności.',
      description: 'Wgraj pliki PDF, uporządkuj ich kolejność metodą przeciągnij i upuść (Drag & Drop) i pobierz scalony dokument.',
      iconName: 'FileStack',
      seoKeywords: ['łączenie pdf w jeden plik', 'scalanie pdf online', 'merge pdf'],
    },
    {
      id: 'rozdziel',
      path: '/rozdziel-pdf',
      name: 'Rozdzielanie PDF (Split & Extract)',
      shortName: 'Rozdziel PDF',
      tagline: 'Wyodrębnij konkretne zakresy stron lub podziel duży plik na mniejsze części.',
      description: 'Wybierz interesujące Cię strony, określ zakres (np. 1-3, 5) lub usuń pozostałe arkusze i zapisz nowy plik.',
      iconName: 'Scissors',
      seoKeywords: ['rozdzielanie pdf online', 'wyciąganie stron z pdf', 'podziel plik pdf'],
    },
    {
      id: 'privacy',
      path: '/polityka-privacy',
      name: 'Regulamin i Polityka Prywatności',
      shortName: 'Regulamin i Prywatność',
      tagline: 'Zasady korzystania, zrzeczenie się odpowiedzialności oraz pliki cookies.',
      description: 'Regulamin i Polityka Prywatności PDF Studio Online. Zgodność z Google AdSense i Ezoic.',
      iconName: 'ShieldCheck',
      seoKeywords: ['regulamin pdf studio', 'polityka prywatności pdf', 'pliki cookies adsense'],
    },
    {
      id: 'pdf-to-word',
      path: '/pdf-to-word',
      name: 'Konwertuj PDF do Word',
      shortName: 'PDF do Word',
      tagline: 'Lokalna ekstrakcja tekstu i konwersja PDF do formatu Word (.docx / .txt).',
      description: 'Konwertuj pliki PDF do edytowalnego dokumentu Word (.docx) lub pliku tekstowego bezpośrednio w przeglądarce.',
      iconName: 'FileText',
      badge: 'Nowość',
      seoKeywords: ['konwertuj pdf do word', 'pdf do docx online', 'ekstrakcja tekstu z pdf'],
    },
    {
      id: 'word-to-pdf',
      path: '/word-to-pdf',
      name: 'Konwertuj Word do PDF',
      shortName: 'Word do PDF',
      tagline: 'Wklej treść lub wczytaj plik i wygeneruj czysty dokument PDF.',
      description: 'Wbudowany edytor tekstu i generator dokumentów PDF z czcionką Roboto Mono.',
      iconName: 'FileUp',
      badge: 'Nowość',
      seoKeywords: ['word do pdf online', 'tekst do pdf', 'wklej i generuj pdf'],
    },
    {
      id: 'pdf-to-excel',
      path: '/pdf-to-excel',
      name: 'Konwertuj PDF do Excel',
      shortName: 'PDF do Excel',
      tagline: 'Ekstrakcja tabel z PDF i eksport do arkusza CSV / Excel (UTF-8).',
      description: 'Wyciągaj tabele i dane liczbowe z plików PDF do pliku CSV zoptymalizowanego pod Excel.',
      iconName: 'FileSpreadsheet',
      badge: 'Nowość',
      seoKeywords: ['pdf do excel online', 'ekstrakcja tabel pdf', 'pdf do csv excel'],
    },
    {
      id: 'excel-to-pdf',
      path: '/excel-to-pdf',
      name: 'Konwertuj Excel do PDF',
      shortName: 'Excel do PDF',
      tagline: 'Wklej tabelę lub wczytaj plik CSV i wygeneruj profesjonalny raport PDF.',
      description: 'Wklej wiersze i kolumny z Excela lub Sheets i utwórz czytelny, wyjustowany dokument PDF.',
      iconName: 'Table',
      badge: 'Nowość',
      seoKeywords: ['excel do pdf online', 'tabela do pdf', 'konwertuj arkusz do pdf'],
    },
    {
      id: 'kompresuj',
      path: '/kompresuj-pdf',
      name: 'Kompresuj PDF Online',
      shortName: 'Kompresuj PDF',
      tagline: 'Zmniejsz rozmiar pliku PDF bez utraty czytelności – 100% lokalnie w przeglądarce.',
      description: 'Zmniejsz wagę pliku PDF do e-maili i wniosków urzędowych z zachowaniem ostrego tekstu.',
      iconName: 'Minimize2',
      badge: 'Nowość',
      seoKeywords: ['kompresuj pdf online', 'zmniejsz rozmiar pdf', 'odchudzanie pdf'],
    },
    {
      id: 'grafika',
      path: '/grafika-do-pdf',
      name: 'Grafika do PDF Online',
      shortName: 'Grafika do PDF',
      tagline: 'Konwertuj zdjęcia i grafiki JPG, PNG, WebP do czystego pliku PDF.',
      description: 'Połącz zdjęcia JPG, PNG i WebP w jeden spójny dokument PDF z dopasowaniem formatu arkusza.',
      iconName: 'Images',
      badge: 'Nowość',
      seoKeywords: ['grafika do pdf', 'jpg do pdf online', 'zdjęcia do pdf'],
    },
  ],
  en: [
    {
      id: 'hub',
      path: '/',
      name: 'Home – All-in-One PDF Tools',
      shortName: 'All Tools',
      tagline: 'Advanced PDF suite running 100% locally in your browser.',
      description: 'Edit, merge, split, rotate, and fill PDF files without registration and without sending data to servers.',
      iconName: 'LayoutGrid',
      seoKeywords: ['free pdf editor online', 'private in-browser pdf tools', 'secure pdf without upload'],
    },
    {
      id: 'wypelnij',
      path: '/wypelnij-formularz-pdf',
      name: 'PDF Form Filler',
      shortName: 'Form Filler',
      tagline: 'Complete official applications and forms with native AcroForm fields.',
      description: 'Click on input boxes or lines in the document to type directly into native PDF form fields.',
      iconName: 'FileSignature',
      badge: 'MAIN MODULE',
      seoKeywords: ['fill pdf forms online', 'acroforms editor', 'complete application pdf'],
    },
    {
      id: 'usun',
      path: '/usun-strony-z-pdf',
      name: 'Delete Pages from PDF',
      shortName: 'Delete Pages',
      tagline: 'Quickly remove unwanted sheets or empty pages from your document.',
      description: 'Preview high-resolution thumbnails, delete unwanted pages with one click, and download a clean PDF.',
      iconName: 'FileX',
      seoKeywords: ['delete pages from pdf', 'remove pdf pages free', 'clean up pdf'],
    },
    {
      id: 'obroc',
      path: '/obroc-pdf',
      name: 'Rotate PDF Online',
      shortName: 'Rotate PDF',
      tagline: 'Rotate single pages or the entire document by 90°, 180°, or 270°.',
      description: 'Fix upside-down or landscape scans permanently with a single click.',
      iconName: 'RotateCw',
      seoKeywords: ['rotate pdf online', 'turn pdf 90 degrees', 'fix upside down scan'],
    },
    {
      id: 'polacz',
      path: '/polacz-pdf',
      name: 'Merge PDF Files',
      shortName: 'Merge PDF',
      tagline: 'Combine multiple PDF documents into one unified file.',
      description: 'Upload multiple PDFs, reorder pages with drag and drop, and download your joined file.',
      iconName: 'FileStack',
      seoKeywords: ['merge pdf files online', 'combine pdfs into one', 'join pdf documents'],
    },
    {
      id: 'rozdziel',
      path: '/rozdziel-pdf',
      name: 'Split & Extract PDF',
      shortName: 'Split PDF',
      tagline: 'Extract specific page ranges or break large files into smaller parts.',
      description: 'Define custom page ranges (e.g. 1-3, 5) or click sheets to generate a lightweight new document.',
      iconName: 'Scissors',
      seoKeywords: ['split pdf online', 'extract pages from pdf', 'separate pdf pages'],
    },
    {
      id: 'privacy',
      path: '/polityka-privacy',
      name: 'Terms & Privacy Policy',
      shortName: 'Terms & Privacy',
      tagline: 'Terms of service, disclaimer, and cookies policy.',
      description: 'Official Terms of Service, Disclaimer, and Privacy Policy for PDF Studio Online.',
      iconName: 'ShieldCheck',
      seoKeywords: ['privacy policy pdf studio', 'cookies google adsense', 'gdpr client-side'],
    },
    {
      id: 'pdf-to-word',
      path: '/pdf-to-word',
      name: 'Convert PDF to Word',
      shortName: 'PDF to Word',
      tagline: 'Local text extraction and PDF to Word (.docx / text) conversion.',
      description: 'Extract full text from PDF files directly in your browser and download as .docx or text format.',
      iconName: 'FileText',
      badge: 'New',
      seoKeywords: ['convert pdf to word', 'pdf to docx online', 'extract text from pdf'],
    },
    {
      id: 'word-to-pdf',
      path: '/word-to-pdf',
      name: 'Convert Word to PDF',
      shortName: 'Word to PDF',
      tagline: 'Paste text or upload document and generate clean PDF file.',
      description: 'Built-in text editor and PDF generator with crisp Roboto Mono typography and UTF-8 support.',
      iconName: 'FileUp',
      badge: 'New',
      seoKeywords: ['word to pdf online', 'text to pdf generator', 'paste text create pdf'],
    },
    {
      id: 'pdf-to-excel',
      path: '/pdf-to-excel',
      name: 'Convert PDF to Excel',
      shortName: 'PDF to Excel',
      tagline: 'Extract tables from PDF to Excel CSV spreadsheet.',
      description: 'Extract tabular data, columns, and rows from PDF files into UTF-8 BOM CSV files for Excel.',
      iconName: 'FileSpreadsheet',
      badge: 'New',
      seoKeywords: ['pdf to excel online', 'pdf table extraction', 'convert pdf to csv'],
    },
    {
      id: 'excel-to-pdf',
      path: '/excel-to-pdf',
      name: 'Convert Excel to PDF',
      shortName: 'Excel to PDF',
      tagline: 'Paste spreadsheet table or CSV to generate high quality PDF report.',
      description: 'Paste tabular rows from Excel or Google Sheets and produce formatted, aligned PDF documents.',
      iconName: 'Table',
      badge: 'New',
      seoKeywords: ['excel to pdf online', 'table to pdf generator', 'convert spreadsheet to pdf'],
    },
    {
      id: 'kompresuj',
      path: '/kompresuj-pdf',
      name: 'Compress PDF Online',
      shortName: 'Compress PDF',
      tagline: 'Reduce PDF file size without sacrificing clarity – 100% in your browser.',
      description: 'Compress PDF documents to fit email limits and online portals with zero server upload.',
      iconName: 'Minimize2',
      badge: 'New',
      seoKeywords: ['compress pdf online', 'reduce pdf size', 'shrink pdf free'],
    },
    {
      id: 'grafika',
      path: '/grafika-do-pdf',
      name: 'Images to PDF Online',
      shortName: 'Images to PDF',
      tagline: 'Convert JPG, PNG, and WebP images into a single clean PDF document.',
      description: 'Combine photos into a high-quality PDF with automatic page fitting and margin controls.',
      iconName: 'Images',
      badge: 'New',
      seoKeywords: ['images to pdf online', 'jpg to pdf converter', 'png to pdf'],
    },
  ],
  es: [
    {
      id: 'hub',
      path: '/',
      name: 'Inicio – Todas las Herramientas PDF',
      shortName: 'Todas las Herramientas',
      tagline: 'Suite PDF avanzada que funciona 100% localmente en tu navegador.',
      description: 'Edita, une, divide, gira y rellena archivos PDF sin registro ni subida de datos a servidores.',
      iconName: 'LayoutGrid',
      seoKeywords: ['editor pdf gratis online', 'herramientas pdf seguras', 'editar pdf sin subir'],
    },
    {
      id: 'wypelnij',
      path: '/wypelnij-formularz-pdf',
      name: 'Rellenador de Formularios PDF',
      shortName: 'Rellenar Formulario',
      tagline: 'Completa trámites y solicitudes oficiales con campos nativos AcroForm.',
      description: 'Haz clic en las casillas o líneas en blanco para escribir en campos nativos del estándar PDF.',
      iconName: 'FileSignature',
      badge: 'MÓDULO PRINCIPAL',
      seoKeywords: ['rellenar formularios pdf online', 'acroforms editor gratis', 'completar pdf'],
    },
    {
      id: 'usun',
      path: '/usun-strony-z-pdf',
      name: 'Eliminar Páginas de PDF',
      shortName: 'Eliminar Páginas',
      tagline: 'Quita hojas innecesarias o páginas en blanco en un instante.',
      description: 'Visualiza miniaturas, elimina hojas no deseadas con un clic y descarga tu PDF limpio.',
      iconName: 'FileX',
      seoKeywords: ['eliminar paginas pdf', 'borrar hojas de pdf gratis', 'quitar paginas en blanco'],
    },
    {
      id: 'obroc',
      path: '/obroc-pdf',
      name: 'Girar PDF Online',
      shortName: 'Girar PDF',
      tagline: 'Gira páginas sueltas o el documento completo 90°, 180° y 270°.',
      description: 'Corrige escaneos invertidos o páginas apaisadas con un solo clic de forma definitiva.',
      iconName: 'RotateCw',
      seoKeywords: ['girar pdf online', 'rotar paginas pdf', 'voltear pdf 90 grados'],
    },
    {
      id: 'polacz',
      path: '/polacz-pdf',
      name: 'Combinar Archivos PDF',
      shortName: 'Combinar PDF',
      tagline: 'Une varios archivos PDF en un único documento ordenado.',
      description: 'Sube varios archivos, arrastra las miniaturas para ordenar y descarga el documento combinado.',
      iconName: 'FileStack',
      seoKeywords: ['unir pdf online gratis', 'combinar archivos pdf', 'juntar documentos pdf'],
    },
    {
      id: 'rozdziel',
      path: '/rozdziel-pdf',
      name: 'Dividir y Extraer PDF',
      shortName: 'Dividir PDF',
      tagline: 'Extrae páginas específicas o divide un archivo grande.',
      description: 'Indica rangos de páginas (ej. 1-3, 5) o haz clic en las miniaturas para extraer un nuevo PDF.',
      iconName: 'Scissors',
      seoKeywords: ['dividir pdf online', 'extraer paginas pdf', 'separar hojas pdf'],
    },
    {
      id: 'privacy',
      path: '/polityka-privacy',
      name: 'Política de Privacidad y Cookies',
      shortName: 'Política de Privacidad',
      tagline: 'Principios de protección de datos y uso de cookies de terceros.',
      description: 'Política oficial de Privacidad y Cookies de PDF Studio Online, conforme a Google AdSense y Ezoic.',
      iconName: 'ShieldCheck',
      seoKeywords: ['politica de privacidad pdf', 'cookies google adsense', 'rgpd'],
    },
    {
      id: 'pdf-to-word',
      path: '/pdf-to-word',
      name: 'Convertir PDF a Word',
      shortName: 'PDF a Word',
      tagline: 'Extracción de texto local y conversión de PDF a Word (.docx / .txt).',
      description: 'Convierte archivos PDF a documentos Word (.docx) o texto editable directamente en tu navegador.',
      iconName: 'FileText',
      badge: 'Nuevo',
      seoKeywords: ['convertir pdf a word', 'pdf a docx online', 'extraer texto de pdf'],
    },
    {
      id: 'word-to-pdf',
      path: '/word-to-pdf',
      name: 'Convertir Word a PDF',
      shortName: 'Word a PDF',
      tagline: 'Pega texto o sube un archivo y genera un documento PDF limpio.',
      description: 'Editor de texto y generador de PDF integrado con fuente Roboto Mono.',
      iconName: 'FileUp',
      badge: 'Nuevo',
      seoKeywords: ['word a pdf online', 'texto a pdf', 'pegar y generar pdf'],
    },
    {
      id: 'pdf-to-excel',
      path: '/pdf-to-excel',
      name: 'Convertir PDF a Excel',
      shortName: 'PDF a Excel',
      tagline: 'Extracción de tablas de PDF y exportación a CSV / Excel (UTF-8).',
      description: 'Extrae tablas y datos numéricos de archivos PDF a CSV compatible con Excel.',
      iconName: 'FileSpreadsheet',
      badge: 'Nuevo',
      seoKeywords: ['pdf a excel online', 'extraer tablas pdf', 'pdf a csv'],
    },
    {
      id: 'excel-to-pdf',
      path: '/excel-to-pdf',
      name: 'Convertir Excel a PDF',
      shortName: 'Excel a PDF',
      tagline: 'Pega una tabla o sube un archivo CSV y genera un reporte PDF profesional.',
      description: 'Pega filas y columnas de Excel o Sheets y crea un documento PDF legible.',
      iconName: 'Table',
      badge: 'Nuevo',
      seoKeywords: ['excel a pdf online', 'tabla a pdf', 'convertir hoja a pdf'],
    },
    {
      id: 'kompresuj',
      path: '/kompresuj-pdf',
      name: 'Comprimir PDF Online',
      shortName: 'Comprimir PDF',
      tagline: 'Reduce el tamaño de tus archivos PDF gratis y de forma segura en tu navegador.',
      description: 'Disminuye el peso de archivos PDF para correos y formularios con texto nítido.',
      iconName: 'Minimize2',
      badge: 'Nuevo',
      seoKeywords: ['comprimir pdf online', 'reducir tamaño pdf', 'bajar peso pdf'],
    },
    {
      id: 'grafika',
      path: '/grafika-do-pdf',
      name: 'Imágenes a PDF Online',
      shortName: 'Imágenes a PDF',
      tagline: 'Convierte fotos JPG, PNG y WebP a documento PDF en tu navegador.',
      description: 'Une múltiples fotos en un documento PDF ordenado con ajuste automático.',
      iconName: 'Images',
      badge: 'Nuevo',
      seoKeywords: ['imagenes a pdf online', 'convertir jpg a pdf', 'fotos a pdf'],
    },
  ],
  hi: [
    {
      id: 'hub',
      path: '/',
      name: 'होम – सभी पीडीएफ टूल्स',
      shortName: 'सभी टूल्स',
      tagline: 'आपके ब्राउज़र में 100% स्थानीय रूप से चलने वाला उन्नत पीडीएफ सुइट।',
      description: 'बिना पंजीकरण और बिना सर्वर पर फाइलें भेजे पीडीएफ फाइलों को एडिट, मर्ज, स्प्लिट और भरें।',
      iconName: 'LayoutGrid',
      seoKeywords: ['मुफ्त पीडीएफ संपादक ऑनलाइन', 'सुरक्षित पीडीएफ टूल्स', 'पीडीएफ एडिट'],
    },
    {
      id: 'wypelnij',
      path: '/wypelnij-formularz-pdf',
      name: 'पीडीएफ फॉर्म फिलर',
      shortName: 'फॉर्म भरें',
      tagline: 'मूल AcroForm फ़ील्ड्स के साथ सरकारी और आधिकारिक फॉर्म भरें।',
      description: 'मूल पीडीएफ फॉर्म फ़ील्ड में सीधे टाइप करने के लिए खाली स्थानों पर क्लिक करें।',
      iconName: 'FileSignature',
      badge: 'मुख्य मॉड्यूल',
      seoKeywords: ['पीडीएफ फॉर्म भरें', 'ऑनलाइन फॉर्म फिलर', 'सरकारी फॉर्म पीडीएफ'],
    },
    {
      id: 'usun',
      path: '/usun-strony-z-pdf',
      name: 'पीडीएफ से पृष्ठ हटाएं',
      shortName: 'पृष्ठ हटाएं',
      tagline: 'दस्तावेज़ से अनचाहे या खाली पन्नों को तुरंत हटाएं।',
      description: 'थंबनेल देखें, एक क्लिक में अवांछित पृष्ठ हटाएं और नया पीडीएफ डाउनलोड करें।',
      iconName: 'FileX',
      seoKeywords: ['पीडीएफ पृष्ठ हटाएं', 'पेज डिलीट पीडीएफ', 'खाली पन्ने हटाएं'],
    },
    {
      id: 'obroc',
      path: '/obroc-pdf',
      name: 'पीडीएफ ऑनलाइन घुमाएं',
      shortName: 'पीडीएफ घुमाएं',
      tagline: 'अलग-अलग पृष्ठों या पूरे दस्तावेज़ को 90°, 180° या 270° घुमाएं।',
      description: 'उल्टे या आड़े-तिरछे स्कैन किए गए पृष्ठों को एक क्लिक में स्थायी रूप से सीधा करें।',
      iconName: 'RotateCw',
      seoKeywords: ['पीडीएफ घुमाएं', 'रोटेट पीडीएफ', 'पीडीएफ सीधा करें'],
    },
    {
      id: 'polacz',
      path: '/polacz-pdf',
      name: 'पीडीएफ फाइलें जोड़ें (मर्ज)',
      shortName: 'पीडीएफ जोड़ें',
      tagline: 'कई पीडीएफ फाइलों को एक संगठित दस्तावेज़ में जोड़ें।',
      description: 'फाइलें अपलोड करें, ड्रैग एंड ड्रॉप से क्रम व्यवस्थित करें और संयुक्त फाइल डाउनलोड करें।',
      iconName: 'FileStack',
      seoKeywords: ['पीडीएफ जोड़ें', 'मर्ज पीडीएफ', 'पीडीएफ फाइलें कंबाइन करें'],
    },
    {
      id: 'rozdziel',
      path: '/rozdziel-pdf',
      name: 'पीडीएफ विभाजित करें',
      shortName: 'पीडीएफ विभाजित करें',
      tagline: 'विशिष्ट पृष्ठ निकालें या बड़ी फाइल को छोटे भागों में विभाजित करें।',
      description: 'पेज रेंज दर्ज करें (जैसे 1-3, 5) या आवश्यक शीट चुनकर नई फाइल बनाएं।',
      iconName: 'Scissors',
      seoKeywords: ['पीडीएफ अलग करें', 'स्प्लिट पीडीएफ', 'पीडीएफ पेज निकालें'],
    },
    {
      id: 'privacy',
      path: '/polityka-privacy',
      name: 'गोपनीयता नीति और कुकीज़',
      shortName: 'गोपनीयता नीति',
      tagline: 'डेटा सुरक्षा और तृतीय-पक्ष कुकीज़ के उपयोग के नियम।',
      description: 'PDF Studio Online की आधिकारिक गोपनीयता नीति और कुकीज़ विवरण।',
      iconName: 'ShieldCheck',
      seoKeywords: ['गोपनीयता नीति', 'कुकीज़ गूगल एडसेंस', 'पीडीएफ स्टूडियो'],
    },
    {
      id: 'pdf-to-word',
      path: '/pdf-to-word',
      name: 'पीडीएफ से वर्ड बदलें',
      shortName: 'पीडीएफ से वर्ड',
      tagline: 'स्थानीय टेक्स्ट निष्कर्षण और पीडीएफ से वर्ड (.docx) रूपांतरण।',
      description: 'ब्राउज़र में सीधे पीडीएफ से टेक्स्ट निकालें और .docx या टेक्स्ट फ़ाइल डाउनलोड करें।',
      iconName: 'FileText',
      badge: 'नया',
      seoKeywords: ['पीडीएफ से वर्ड', 'पीडीएफ से डॉक्स', 'टेक्स्ट निकालें'],
    },
    {
      id: 'word-to-pdf',
      path: '/word-to-pdf',
      name: 'वर्ड से पीडीएफ बदलें',
      shortName: 'वर्ड से पीडीएफ',
      tagline: 'टेक्स्ट पेस्ट करें या फाइल अपलोड कर साफ पीडीएफ बनाएं।',
      description: 'Roboto Mono फॉन्ट के साथ इनबिल्ट टेक्स्ट एडिटर और पीडीएफ जेनरेटर।',
      iconName: 'FileUp',
      badge: 'नया',
      seoKeywords: ['वर्ड से पीडीएफ', 'टेक्स्ट टू पीडीएफ', 'पीडीएफ बनाएं'],
    },
    {
      id: 'pdf-to-excel',
      path: '/pdf-to-excel',
      name: 'पीडीएफ से एक्सेल बदलें',
      shortName: 'पीडीएफ से एक्सेल',
      tagline: 'पीडीएफ तालिकाओं को सीएसवी / एक्सेल (UTF-8) में निकालें।',
      description: 'पीडीएफ फाइलों से तालिकाओं और संख्याओं को सीधे एक्सेल सीएसवी में निकालें।',
      iconName: 'FileSpreadsheet',
      badge: 'नया',
      seoKeywords: ['पीडीएफ से एक्सेल', 'टेबल निकालें', 'पीडीएफ सीएसवी'],
    },
    {
      id: 'excel-to-pdf',
      path: '/excel-to-pdf',
      name: 'एक्सेल से पीडीएफ बदलें',
      shortName: 'एक्सेल से पीडीएफ',
      tagline: 'एक्सेल टेबल पेस्ट करें और साफ सुथरा पीडीएफ दस्तावेज बनाएं।',
      description: 'स्प्रेडशीट डेटा से साफ व व्यवस्थित पीडीएफ रिपोर्ट तैयार करें।',
      iconName: 'Table',
      badge: 'नया',
      seoKeywords: ['एक्सेल से पीडीएफ', 'टेबल से पीडीएफ', 'स्प्रेडशीट पीडीएफ'],
    },
    {
      id: 'kompresuj',
      path: '/kompresuj-pdf',
      name: 'पीडीएफ कंप्रेस करें ऑनलाइन',
      shortName: 'पीडीएफ कंप्रेस',
      tagline: 'ब्राउज़र में सुरक्षित और बिना सर्वर पर अपलोड किए पीडीएफ का साइज छोटा करें।',
      description: 'ईमेल और फॉर्म के लिए पीडीएफ का साइज घटाएं बिना गुणवत्ता खोए।',
      iconName: 'Minimize2',
      badge: 'नया',
      seoKeywords: ['पीडीएफ कंप्रेस', 'साइज छोटा करें', 'पीडीएफ साइज रिड्यूस'],
    },
    {
      id: 'grafika',
      path: '/grafika-do-pdf',
      name: 'तस्वीर से पीडीएफ ऑनलाइन',
      shortName: 'तस्वीर से पीडीएफ',
      tagline: 'JPG, PNG और WebP तस्वीरों को एक स्वच्छ पीडीएफ में बदलें।',
      description: 'कई तस्वीरों को जोड़कर सुंदर और सुव्यवस्थित पीडीएफ दस्तावेज़ तैयार करें।',
      iconName: 'Images',
      badge: 'नया',
      seoKeywords: ['तस्वीर से पीडीएफ', 'फोटो से पीडीएफ', 'jpg से pdf'],
    },
  ],
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      // 1. Sprawdź przedrostek ścieżki URL (np. /es, /hi, /en, /pl) – absolutny priorytet SEO dla Google i użytkowników
      const parsed = parsePathname(window.location.pathname);
      if (parsed.isLangInPath) {
        localStorage.setItem('app_language', parsed.lang);
        return parsed.lang;
      }

      // 2. Sprawdź parametr 'lang' z adresu URL (dla kampanii reklamowych np. ?lang=hi)
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang')?.toLowerCase();
      if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang as Language)) {
        localStorage.setItem('app_language', urlLang);
        return urlLang as Language;
      }

      // 3. Jeśli brak w URL, sprawdź język zapisany w localStorage
      const saved = localStorage.getItem('app_language') as Language;
      if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
        return saved;
      }

      // 4. Wykryj język z przeglądarki użytkownika
      const browserLang = navigator.language?.slice(0, 2).toLowerCase();
      if (browserLang && SUPPORTED_LANGUAGES.includes(browserLang as Language)) {
        return browserLang as Language;
      }
      return 'pl'; // Domyślny język polski
    }
    return 'pl';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;

      // Obsługa nawigacji wstecz/w przód w przeglądarce
      const handleUrlChange = () => {
        const parsed = parsePathname(window.location.pathname);
        if (parsed.isLangInPath && parsed.lang !== language) {
          setLanguage(parsed.lang);
          return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang')?.toLowerCase();
        if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang as Language)) {
          if (urlLang !== language) {
            setLanguage(urlLang as Language);
          }
        }
      };

      window.addEventListener('popstate', handleUrlChange);
      return () => window.removeEventListener('popstate', handleUrlChange);
    }
  }, [language]);

  const t = TRANSLATIONS[language];
  const localizedTools = TOOL_DEFINITIONS_BY_LANG[language] || TOOL_DEFINITIONS_BY_LANG.pl;

  const getToolMeta = (route: ToolRoute): ToolMeta => {
    const list = localizedTools;
    return list.find((t) => t.path === route) || list[0];
  };

  const getSeoData = (route: ToolRoute): LocalizedSeoContent => {
    const langDict = SEO_TRANSLATIONS[language] || SEO_TRANSLATIONS.pl;
    return langDict[route] || langDict['/'];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getToolMeta,
        getSeoData,
        localizedTools,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
