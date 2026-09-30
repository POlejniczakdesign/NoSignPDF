import { ToolRoute, ToolMeta } from '../types';
import { Language, LANGUAGES } from '../i18n/translations';

export const SUPPORTED_LANGUAGES: Language[] = ['pl', 'en', 'es', 'hi', 'pt', 'ru'];
export const DEFAULT_LANGUAGE: Language = 'pl';
export const SITE_DOMAIN = 'https://nosignpdf.com';

// Aliases for tool paths (supporting English, Spanish, Portuguese, Russian equivalents for SEO flexibility)
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
  '/kompresuj-pdf': '/kompresuj-pdf',
  '/grafika-do-pdf': '/grafika-do-pdf',
  '/wyczysc-metadane-pdf': '/wyczysc-metadane-pdf',
  '/wyciagnij-grafiki-z-pdf': '/wyciagnij-grafiki-z-pdf',
  '/zabezpiecz-pdf-haslem': '/zabezpiecz-pdf-haslem',
  '/usun-haslo-z-pdf': '/usun-haslo-z-pdf',
  '/zmien-pdf-na-czarno-bialy': '/zmien-pdf-na-czarno-bialy',
  '/ponumeruj-strony-pdf': '/ponumeruj-strony-pdf',

  // English aliases
  '/fill-pdf-form': '/wypelnij-formularz-pdf',
  '/delete-pages': '/usun-strony-z-pdf',
  '/delete-pdf-pages': '/usun-strony-z-pdf',
  '/rotate-pdf': '/obroc-pdf',
  '/merge-pdf': '/polacz-pdf',
  '/split-pdf': '/rozdziel-pdf',
  '/compress-pdf': '/kompresuj-pdf',
  '/image-to-pdf': '/grafika-do-pdf',
  '/jpg-to-pdf': '/grafika-do-pdf',
  '/png-to-pdf': '/grafika-do-pdf',
  '/remove-pdf-metadata': '/wyczysc-metadane-pdf',
  '/strip-pdf-metadata': '/wyczysc-metadane-pdf',
  '/clean-pdf-metadata': '/wyczysc-metadane-pdf',
  '/extract-images-from-pdf': '/wyciagnij-grafiki-z-pdf',
  '/extract-pdf-images': '/wyciagnij-grafiki-z-pdf',
  '/protect-pdf': '/zabezpiecz-pdf-haslem',
  '/protect-pdf-with-password': '/zabezpiecz-pdf-haslem',
  '/unlock-pdf': '/usun-haslo-z-pdf',
  '/remove-pdf-password': '/usun-haslo-z-pdf',
  '/pdf-to-grayscale': '/zmien-pdf-na-czarno-bialy',
  '/grayscale-pdf': '/zmien-pdf-na-czarno-bialy',
  '/add-page-numbers-to-pdf': '/ponumeruj-strony-pdf',
  '/number-pdf-pages': '/ponumeruj-strony-pdf',
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
  '/comprimir-pdf': '/kompresuj-pdf',
  '/imagen-a-pdf': '/grafika-do-pdf',
  '/jpg-a-pdf': '/grafika-do-pdf',
  '/limpiar-metadatos-pdf': '/wyczysc-metadane-pdf',
  '/eliminar-metadatos-pdf': '/wyczysc-metadane-pdf',
  '/extraer-imagenes-pdf': '/wyciagnij-grafiki-z-pdf',
  '/proteger-pdf': '/zabezpiecz-pdf-haslem',
  '/proteger-pdf-con-contrasena': '/zabezpiecz-pdf-haslem',
  '/desbloquear-pdf': '/usun-haslo-z-pdf',
  '/quitar-contrasena-pdf': '/usun-haslo-z-pdf',
  '/pdf-a-blanco-y-negro': '/zmien-pdf-na-czarno-bialy',
  '/pdf-escala-de-grises': '/zmien-pdf-na-czarno-bialy',
  '/numerar-paginas-pdf': '/ponumeruj-strony-pdf',
  '/pdf-a-word': '/pdf-to-word',
  '/word-a-pdf': '/word-to-pdf',
  '/pdf-a-excel': '/pdf-to-excel',
  '/excel-a-pdf': '/excel-to-pdf',
  '/politica-privacidad': '/polityka-privacy',

  // Portuguese aliases (PT-BR)
  '/juntar-pdf': '/polacz-pdf',
  '/preencher-formulario-pdf': '/wypelnij-formularz-pdf',
  '/rotacionar-pdf': '/obroc-pdf',
  '/excluir-paginas-pdf': '/usun-strony-z-pdf',
  '/remover-paginas-pdf': '/usun-strony-z-pdf',
  '/imagem-para-pdf': '/grafika-do-pdf',
  '/remover-metadados-pdf': '/wyczysc-metadane-pdf',
  '/extrair-imagens-pdf': '/wyciagnij-grafiki-z-pdf',
  '/proteger-pdf-com-senha': '/zabezpiecz-pdf-haslem',
  '/remover-senha-pdf': '/usun-haslo-z-pdf',
  '/pdf-preto-e-branco': '/zmien-pdf-na-czarno-bialy',
  '/pdf-em-escala-de-cinza': '/zmien-pdf-na-czarno-bialy',
  '/pdf-para-word': '/pdf-to-word',
  '/word-para-pdf': '/word-to-pdf',
  '/pdf-para-excel': '/pdf-to-excel',
  '/excel-para-pdf': '/excel-to-pdf',
  '/politica-de-privacidade': '/polityka-privacy',

  // Russian aliases (transliterated slugs)
  '/obedinit-pdf': '/polacz-pdf',
  '/soedinit-pdf': '/polacz-pdf',
  '/skleit-pdf': '/polacz-pdf',
  '/razdelit-pdf': '/rozdziel-pdf',
  '/zapolnit-formu-pdf': '/wypelnij-formularz-pdf',
  '/povernut-pdf': '/obroc-pdf',
  '/udalit-stranicy-pdf': '/usun-strony-z-pdf',
  '/szhat-pdf': '/kompresuj-pdf',
  '/kompressiya-pdf': '/kompresuj-pdf',
  '/kartinki-v-pdf': '/grafika-do-pdf',
  '/jpg-v-pdf': '/grafika-do-pdf',
  '/udalit-metadannye-pdf': '/wyczysc-metadane-pdf',
  '/ochistit-metadannye-pdf': '/wyczysc-metadane-pdf',
  '/izvlech-kartinki-iz-pdf': '/wyciagnij-grafiki-z-pdf',
  '/zashchitit-pdf-parolem': '/zabezpiecz-pdf-haslem',
  '/postavit-parol-na-pdf': '/zabezpiecz-pdf-haslem',
  '/snyat-parol-s-pdf': '/usun-haslo-z-pdf',
  '/razblokirovat-pdf': '/usun-haslo-z-pdf',
  '/cherno-belyj-pdf': '/zmien-pdf-na-czarno-bialy',
  '/pdf-v-ottenkah-serogo': '/zmien-pdf-na-czarno-bialy',
  '/pronumerovat-stranicy-pdf': '/ponumeruj-strony-pdf',
  '/pdf-v-word': '/pdf-to-word',
  '/word-v-pdf': '/word-to-pdf',
  '/pdf-v-excel': '/pdf-to-excel',
  '/excel-v-pdf': '/excel-to-pdf',
  '/politika-konfidencialnosti': '/polityka-privacy',
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
    pt: {
      title: 'Editor de PDF Online Grátis – Sem Cadastro, Seguro no Navegador',
      desc: 'Editor de PDF online 100% gratuito e privado que roda direto no seu navegador sem cadastro. Junte, divida, gire, exclua páginas e preencha formulários PDF sem enviar arquivos para a nuvem.',
    },
    ru: {
      title: 'Бесплатный Онлайн PDF Редактор – Без Регистрации, Приватно в Браузере',
      desc: '100% бесплатный онлайн-редактор PDF прямо в вашем браузере. Объединяйте, разделяйте, поворачивайте, удаляйте страницы и заполняйте формы без отправки файлов на сервер.',
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
    pt: {
      title: 'Juntar PDF Online – Combinar Arquivos PDF Grátis sem Cadastro',
      desc: 'Junte múltiplos arquivos PDF em um único documento online com rapidez e segurança. Ferramenta 100% gratuita, sem limites, sem registro e sem marca d’água.',
    },
    ru: {
      title: 'Объединить PDF Онлайн – Бесплатное Слияние Файлов PDF Без Регистрации',
      desc: 'Быстро и безопасно объединяйте несколько файлов PDF в один документ онлайн. 100% бесплатно, без регистрации, водяных знаков и лимитов на размер.',
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
    pt: {
      title: 'Dividir PDF Online – Separar e Extrair Páginas de PDF Grátis',
      desc: 'Extraia páginas específicas ou divida documentos PDF pesados em arquivos menores no seu navegador. Rápido, seguro e sem enviar nada para a nuvem.',
    },
    ru: {
      title: 'Разделить PDF Онлайн – Извлечь Страницы из PDF Бесплатно',
      desc: 'Извлекайте нужные диапазоны страниц или разделяйте большие PDF на части прямо в браузере. 100% конфиденциально без загрузки в облако.',
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
    pt: {
      title: 'Preencher Formulário PDF Online – Escrever e Assinar PDF Grátis',
      desc: 'Preencha formulários oficiais, requerimentos e contratos PDF com suporte a campos nativos AcroForm e texto livre sem precisar imprimir.',
    },
    ru: {
      title: 'Заполнить Форму PDF Онлайн – Редактировать Бланки и Заявления',
      desc: 'Заполняйте официальные бланки, заявления и договоры онлайн с нативной поддержкой AcroForm без печати на бумаге и сканирования.',
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
    pt: {
      title: 'Girar PDF Online – Rotacionar Páginas de PDF em 90°, 180° e 270°',
      desc: 'Gire páginas individuais ou todo o documento PDF para corrigir digitalizações tortas. Salve permanentemente no navegador com um clique.',
    },
    ru: {
      title: 'Повернуть PDF Онлайн – Поворот Страниц PDF на 90, 180 и 270 Градусов',
      desc: 'Поворачивайте отдельные страницы или весь документ PDF для исправления сканов. Сохраняйте файл локально в браузере за один клик.',
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
    pt: {
      title: 'Excluir Páginas de PDF Online – Remover Páginas Desnecessárias Grátis',
      desc: 'Remova páginas em branco ou desnecessárias de qualquer documento PDF instantaneamente. Baixe o arquivo limpo e otimizado sem cadastro.',
    },
    ru: {
      title: 'Удалить Страницы из PDF Онлайн – Вырезать Листы из Документа',
      desc: 'Мгновенно удаляйте пустые или лишние страницы из файла PDF. Быстро, просто и полностью безопасно в вашем браузере.',
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
    pt: {
      title: 'Converter PDF para Word Online – PDF para DOCX Grátis no Navegador',
      desc: 'Extraia texto de arquivos PDF e salve como documento do Word (.docx) ou texto sem enviar nada para servidores externos.',
    },
    ru: {
      title: 'Конвертировать PDF в Word Онлайн – PDF в DOCX Бесплатно',
      desc: 'Извлечение текста и конвертация документов PDF в редактируемый формат Word (.docx) локально в браузере.',
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
    pt: {
      title: 'Converter Word para PDF Online – Criar Documento PDF a partir de Texto',
      desc: 'Cole seu texto ou importe arquivo e gere um documento PDF limpo com tipografia clara de forma rápida e 100% gratuita.',
    },
    ru: {
      title: 'Конвертировать Word в PDF Онлайн – Создать PDF из Текста',
      desc: 'Вставьте текст или загрузите файл для быстрой генерации чистого PDF-документа прямо в браузере.',
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
    pt: {
      title: 'Converter PDF para Excel Online – Extrair Tabelas para Planilha CSV',
      desc: 'Extraia dados, linhas e tabelas de arquivos PDF para planilhas CSV e Excel compatíveis sem upload para a nuvem.',
    },
    ru: {
      title: 'Конвертировать PDF в Excel Онлайн – Извлечь Таблицы в CSV',
      desc: 'Экспорт таблиц и строк из документов PDF в чистый формат Excel CSV с кодировкой UTF-8.',
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
    pt: {
      title: 'Converter Excel para PDF Online – Gerar Relatório PDF de Tabela',
      desc: 'Cole células de planilhas Excel ou carregue CSV para gerar relatórios em PDF formatados e organizados com facilidade.',
    },
    ru: {
      title: 'Конвертировать Excel в PDF Онлайн – Таблицы в PDF',
      desc: 'Превратите данные из таблиц Excel или файлов CSV в аккуратный PDF-отчет с сеткой данных.',
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
    pt: {
      title: 'Política de Privacidade e Termos de Uso – NoSignPDF',
      desc: 'Termos de serviço, política de privacidade, conformidade com LGPD/GDPR e diretrizes de cookies e publicidade do NoSignPDF.',
    },
    ru: {
      title: 'Политика Конфиденциальности и Условия Использования – NoSignPDF',
      desc: 'Официальные правила сервиса, политика конфиденциальности, соответствие GDPR и регламент использования файлов cookie Google AdSense.',
    },
  },
  '/kompresuj-pdf': {
    pl: {
      title: 'Kompresuj PDF Online – Zmniejsz Rozmiar Pliku PDF bez Utraty Jakości',
      desc: 'Darmowa kompresja PDF online w przeglądarce. Zmniejsz wagę dokumentu do wysyłki e-mailem lub ePUAP bez logowania i bez wysyłania plików na serwer.',
    },
    en: {
      title: 'Compress PDF Online – Reduce PDF File Size Free No Sign-Up',
      desc: '100% free online PDF compressor running locally in your browser. Reduce file size for email attachment limits with zero data collection and no watermarks.',
    },
    es: {
      title: 'Comprimir PDF Online – Reducir Tamaño de PDF Gratis Sin Registro',
      desc: 'Reduce el tamaño de tus documentos PDF online de forma rápida y segura. Herramienta 100% gratuita, privada en tu navegador y sin marcas de agua.',
    },
    hi: {
      title: 'पीडीएफ कंप्रेस करें ऑनलाइन – फाइल साइज छोटा करें मुफ्त में',
      desc: 'अपने ब्राउज़र में स्थानीय रूप से पीडीएफ का आकार घटाएं बिना गुणवत्ता खोए। 100% मुफ्त टूल, बिना लॉगिन और बिना वॉटरमार्क।',
    },
    pt: {
      title: 'Comprimir PDF Online – Reduzir Tamanho de Arquivo PDF sem Perda',
      desc: 'Reduza o tamanho de arquivos PDF pesados para enviar por e-mail ou órgãos públicos mantendo a nitidez do texto e das imagens.',
    },
    ru: {
      title: 'Сжать PDF Онлайн – Уменьшить Размер Файла PDF Без Потери Качества',
      desc: 'Эффективно уменьшайте вес документов PDF для отправки по почте или загрузки на госпорталы с сохранением четкости текста.',
    },
  },
  '/grafika-do-pdf': {
    pl: {
      title: 'Grafika do PDF Online – Konwertuj Zdjęcia JPG, PNG do PDF Za Darmo',
      desc: 'Błyskawicznie połącz zdjęcia i pliki graficzne JPG, PNG, WebP w jeden estetyczny dokument PDF. 100% prywatnie w pamięci RAM bez rejestracji.',
    },
    en: {
      title: 'Image to PDF Online – Convert JPG and PNG to PDF Free',
      desc: 'Convert JPG, PNG, and WebP pictures into a clean multi-page PDF document online. Fast client-side conversion, no file size limit, and no sign-up.',
    },
    es: {
      title: 'Imagen a PDF Online – Convertir JPG y PNG a PDF Gratis',
      desc: 'Combina múltiples imágenes JPG, PNG o WebP en un solo documento PDF limpio. Gratis, seguro en tu navegador y sin registros.',
    },
    hi: {
      title: 'तस्वीर से पीडीएफ बनाएं ऑनलाइन – JPG और PNG से पीडीएफ कनवर्टर',
      desc: 'JPG, PNG और WebP तस्वीरों को तुरंत स्वच्छ पीडीएफ दस्तावेज़ में बदलें। सुरक्षित, तेज़ और बिना किसी पंजीकरण के पूरी तरह मुफ्त।',
    },
    pt: {
      title: 'Imagem para PDF Online – Converter JPG, PNG e WebP em PDF Grátis',
      desc: 'Converta fotos e imagens JPG, PNG ou WebP em um documento PDF limpo com ajuste automático de proporções e margens.',
    },
    ru: {
      title: 'Картинки в PDF Онлайн – Конвертировать JPG и PNG в PDF Бесплатно',
      desc: 'Преобразуйте фотографии и изображения JPG, PNG, WebP в единый многостраничный PDF-документ прямо в браузере.',
    },
  },
  '/wyczysc-metadane-pdf': {
    pl: {
      title: 'Usuń Metadane z PDF Online – Bezpieczne Czyszczenie Ukrytych Danych',
      desc: 'Usuń ukryte metadane, autora, wersję programu Word i historię edycji z pliku PDF. 100% bezpłatnie i lokalnie w przeglądarce bez logowania i rejestracji.',
    },
    en: {
      title: 'Remove PDF Metadata Online – Free PDF Metadata Stripper',
      desc: 'Strip hidden author names, creation software, editing dates, and XMP metadata from PDF files in your browser. 100% private, free, and no sign-up.',
    },
    es: {
      title: 'Eliminar Metadatos de PDF Online – Limpiar Datos Ocultos Gratis',
      desc: 'Elimina autor, software de creación, fechas y metadatos XMP de tus archivos PDF online. 100% privado en tu navegador y sin registro.',
    },
    hi: {
      title: 'पीडीएफ मेटाडेटा हटाएं ऑनलाइन – छिपे हुए डेटा मिटाएं मुफ्त में',
      desc: 'अपने पीडीएफ दस्तावेज़ से लेखक का नाम, सॉफ्टवेयर विवरण और मेटाडेटा आसानी से हटाएं। 100% सुरक्षित और मुफ्त बिना लॉगिन।',
    },
    pt: {
      title: 'Remover Metadados de PDF Online – Limpeza de Dados Ocultos e Autor',
      desc: 'Remova informações confidenciais ocultas, nome do autor, software e histórico de edição de arquivos PDF com total privacidade.',
    },
    ru: {
      title: 'Удалить Метаданные из PDF Онлайн – Очистка Скрытых Данных и Автора',
      desc: 'Полное удаление скрытых метаданных, имени автора, программы Word и истории изменений из PDF-файла 100% локально.',
    },
  },
  '/wyciagnij-grafiki-z-pdf': {
    pl: {
      title: 'Wyciągnij Grafiki z PDF Online – Darmowe Pobieranie Obrazów z PDF',
      desc: 'Wyodrębnij i pobierz wszystkie zdjęcia, ilustracje i grafiki osadzone w pliku PDF w oryginalnej jakości. 100% lokalnie w przeglądarce bez logowania.',
    },
    en: {
      title: 'Extract Images from PDF Online – Download Embedded Photos Free',
      desc: 'Extract and download all photos, images, and graphics embedded inside PDF files in original resolution. 100% private, free, and no sign-up.',
    },
    es: {
      title: 'Extraer Imágenes de PDF Online – Descargar Fotos de PDF Gratis',
      desc: 'Extrae y descarga todas las fotos, imágenes y gráficos incrustados en archivos PDF con calidad original. Seguro, online y sin registro.',
    },
    hi: {
      title: 'पीडीएफ से फोटो निकालें ऑनलाइन – तस्वीरें व ग्राफिक्स डाउनलोड करें मुफ्त',
      desc: 'पीडीएफ दस्तावेज़ से सभी अंतर्निहित तस्वीरें और ग्राफिक्स मूल गुणवत्ता में निकालें। 100% मुफ्त, सुरक्षित और बिना लॉगिन।',
    },
    pt: {
      title: 'Extrair Imagens de PDF Online – Salvar Fotos de Documento em Alta Resolução',
      desc: 'Extraia todas as fotos e ilustrações incorporadas em arquivos PDF no formato JPG e PNG original sem perda de qualidade e sem cadastro.',
    },
    ru: {
      title: 'Извлечь Картинки из PDF Онлайн – Сохранить Фото в Высоком Качестве',
      desc: 'Быстро извлекайте встроенные изображения и фото из документов PDF в оригинальном качестве JPG/PNG без регистрации.',
    },
  },
  '/zabezpiecz-pdf-haslem': {
    pl: {
      title: 'Zabezpiecz PDF Hasłem Online – Szyfrowanie Dokumentów PDF Za Darmo',
      desc: 'Zaszyfruj poufny plik PDF silnym hasłem dostępu bezpośrednio w przeglądarce. Chroń umowy i dane finansowe bez wysyłania plików na serwer.',
    },
    en: {
      title: 'Protect PDF with Password Online – Free PDF Encryption Tool',
      desc: 'Encrypt your confidential PDF files with a strong password directly in your browser. Protect contracts and sensitive data with zero uploads.',
    },
    es: {
      title: 'Proteger PDF con Contraseña Online – Encriptar PDF Gratis',
      desc: 'Protege y encripta tus documentos PDF con contraseña de forma segura en tu navegador. Máxima privacidad sin subir tus archivos.',
    },
    hi: {
      title: 'पीडीएफ पासवर्ड सुरक्षित करें ऑनलाइन – पीडीएफ पर पासवर्ड लगाएं मुफ्त',
      desc: 'अपने महत्वपूर्ण पीडीएफ दस्तावेज़ को पासवर्ड से सुरक्षित और एन्क्रिप्ट करें सीधे ब्राउज़र में। 100% सुरक्षित और बिना लॉगिन।',
    },
    pt: {
      title: 'Proteger PDF com Senha Online – Criptografar Documento com Segurança',
      desc: 'Bloqueie e proteja arquivos PDF confidenciais com senha e criptografia forte diretamente no seu navegador sem enviar dados à nuvem.',
    },
    ru: {
      title: 'Защитить PDF Паролем Онлайн – Надежное Шифрование Документов',
      desc: 'Установите надежный пароль и шифрование на ваш PDF-документ прямо в браузере без передачи конфиденциальных данных в сеть.',
    },
  },
  '/usun-haslo-z-pdf': {
    pl: {
      title: 'Usuń Hasło z PDF Online – Szybkie Odblokowywanie PDF bez Logowania',
      desc: 'Trwale usuń zabezpieczenie hasłem i ograniczenia edycji z pliku PDF. Odblokuj swój dokument w 100% prywatnie w pamięci RAM urządzenia.',
    },
    en: {
      title: 'Unlock PDF Online – Remove Password from PDF Free No Sign-Up',
      desc: 'Permanently remove password security and permissions restrictions from PDF files. Unlock your PDF locally in memory with zero data collection.',
    },
    es: {
      title: 'Desbloquear PDF Online – Quitar Contraseña de PDF Gratis Sin Registro',
      desc: 'Elimina la contraseña y restricciones de tus archivos PDF online de forma permanente. Seguro, rápido en tu navegador y sin registro.',
    },
    hi: {
      title: 'पीडीएफ पासवर्ड हटाएं ऑनलाइन – पीडीएफ अनलॉक करें मुफ्त में',
      desc: 'पीडीएफ फाइल से पासवर्ड सुरक्षा और प्रतिबंध हटाएं सीधे ब्राउज़र में। 100% मुफ्त, तेज़ और बिना किसी पंजीकरण के।',
    },
    pt: {
      title: 'Desbloquear PDF Online – Remover Senha de PDF Rápido e Grátis',
      desc: 'Remova senhas e restrições de documentos PDF protegidos com facilidade. Acesse e imprima seus arquivos sem travas e sem cadastro.',
    },
    ru: {
      title: 'Снять Пароль с PDF Онлайн – Разблокировать Защищенный Документ',
      desc: 'Быстрое снятие пароля и ограничений с защищенных PDF-файлов онлайн. Скачивайте свободный документ без блокировок.',
    },
  },
  '/zmien-pdf-na-czarno-bialy': {
    pl: {
      title: 'Zmień PDF na Czarno-Biały Online – Konwersja do Skali Szarości',
      desc: 'Przekonwertuj kolorowy plik PDF do odcieni szarości (monochromatyczny) online. Zmniejsz zużycie tuszu drukarki i wagę pliku bez rejestracji.',
    },
    en: {
      title: 'Convert PDF to Grayscale Online – Black and White PDF Free',
      desc: 'Convert color PDF documents to clean black and white grayscale online. Save printer ink and toner client-side with no sign-up.',
    },
    es: {
      title: 'Convertir PDF a Blanco y Negro Online – PDF en Escala de Grises',
      desc: 'Convierte documentos PDF a color en escala de grises blanco y negro. Ahorra tinta de impresión de forma 100% gratuita y privada.',
    },
    hi: {
      title: 'पीडीएफ ब्लैक एंड व्हाइट करें ऑनलाइन – ग्रेस्केल कनवर्टर मुफ्त',
      desc: 'रंगीन पीडीएफ दस्तावेज़ को ब्लैक एंड व्हाइट (ग्रेस्केल) में बदलें। प्रिंटर स्याही बचाएं और फाइल साइज घटाएं बिना लॉगिन।',
    },
    pt: {
      title: 'PDF em Preto e Branco Online – Converter PDF Colorido para Tons de Cinza',
      desc: 'Converta arquivos PDF coloridos para escala de cinza monocromática online. Economize tinta de impressora e reduza o tamanho do arquivo.',
    },
    ru: {
      title: 'Черно-Белый PDF Онлайн – Конвертировать PDF в Оттенки Серого',
      desc: 'Преобразуйте цветной PDF-документ в черно-белый формат (градации серого) онлайн. Экономьте тонер принтера и уменьшайте размер.',
    },
  },
  '/ponumeruj-strony-pdf': {
    pl: {
      title: 'Ponumeruj Strony w PDF Online – Dodaj Numery Stron do Dokumentu',
      desc: 'Automatycznie dodaj estetyczną numerację stron (np. 1 z N) do pliku PDF. Wybierz pozycję i format numerów w przeglądarce bez logowania.',
    },
    en: {
      title: 'Add Page Numbers to PDF Online – Number PDF Pages for Free',
      desc: 'Easily insert custom page numbering (e.g. Page 1 of N) into your PDF files online. Fast, clean formatting in your browser with no sign-up.',
    },
    es: {
      title: 'Numerar Páginas de PDF Online – Insertar Números de Página Gratis',
      desc: 'Añade números de página personalizados a tus documentos PDF online fácilmente. Rápido, seguro en tu navegador y sin registro.',
    },
    hi: {
      title: 'पीडीएफ में पेज नंबर जोड़ें ऑनलाइन – पृष्ठ क्रमांक लगाएं मुफ्त में',
      desc: 'अपने पीडीएफ दस्तावेज़ के पेजों पर क्रमांक (उदा. 1, 2, 3) आसानी से लगाएं। सुंदर फॉर्मेटिंग सीधे ब्राउज़र में बिना लॉगिन।',
    },
    pt: {
      title: 'Numerar Páginas de PDF Online – Inserir Números de Página Grátis',
      desc: 'Adicione numeração de página personalizada e profissional (ex: Página 1 de N) aos seus documentos PDF com total facilidade.',
    },
    ru: {
      title: 'Пронумеровать Страницы PDF Онлайн – Вставить Номера Страниц в PDF',
      desc: 'Автоматически добавьте аккуратную нумерацию страниц (напр. 1 из N) в документ PDF. Настраивайте формат и позицию без регистрации.',
    },
  },
};

export const PRIMARY_LOCALIZED_SLUGS: Record<ToolRoute, Record<Language, string>> = {
  '/': { pl: '/', en: '/en', es: '/es', hi: '/hi', pt: '/pt', ru: '/ru' },
  '/polacz-pdf': { pl: '/polacz-pdf', en: '/en/merge-pdf', es: '/es/unir-pdf', hi: '/hi/merge-pdf', pt: '/pt/unir-pdf', ru: '/ru/obedinit-pdf' },
  '/rozdziel-pdf': { pl: '/rozdziel-pdf', en: '/en/split-pdf', es: '/es/dividir-pdf', hi: '/hi/split-pdf', pt: '/pt/dividir-pdf', ru: '/ru/razdelit-pdf' },
  '/wypelnij-formularz-pdf': { pl: '/wypelnij-formularz-pdf', en: '/en/fill-pdf-form', es: '/es/rellenar-formulario-pdf', hi: '/hi/fill-pdf-form', pt: '/pt/preencher-formulario-pdf', ru: '/ru/zapolnit-formu-pdf' },
  '/obroc-pdf': { pl: '/obroc-pdf', en: '/en/rotate-pdf', es: '/es/rotar-pdf', hi: '/hi/rotate-pdf', pt: '/pt/girar-pdf', ru: '/ru/povernut-pdf' },
  '/usun-strony-z-pdf': { pl: '/usun-strony-z-pdf', en: '/en/delete-pages', es: '/es/eliminar-paginas-pdf', hi: '/hi/delete-pages', pt: '/pt/excluir-paginas-pdf', ru: '/ru/udalit-stranicy-pdf' },
  '/kompresuj-pdf': { pl: '/kompresuj-pdf', en: '/en/compress-pdf', es: '/es/comprimir-pdf', hi: '/hi/compress-pdf', pt: '/pt/comprimir-pdf', ru: '/ru/szhat-pdf' },
  '/grafika-do-pdf': { pl: '/grafika-do-pdf', en: '/en/image-to-pdf', es: '/es/imagen-a-pdf', hi: '/hi/image-to-pdf', pt: '/pt/imagem-para-pdf', ru: '/ru/kartinki-v-pdf' },
  '/pdf-to-word': { pl: '/pdf-to-word', en: '/en/pdf-to-word', es: '/es/pdf-a-word', hi: '/hi/pdf-to-word', pt: '/pt/pdf-para-word', ru: '/ru/pdf-v-word' },
  '/word-to-pdf': { pl: '/word-to-pdf', en: '/en/word-to-pdf', es: '/es/word-a-pdf', hi: '/hi/word-to-pdf', pt: '/pt/word-para-pdf', ru: '/ru/word-v-pdf' },
  '/pdf-to-excel': { pl: '/pdf-to-excel', en: '/en/pdf-to-excel', es: '/es/pdf-a-excel', hi: '/hi/pdf-to-excel', pt: '/pt/pdf-para-excel', ru: '/ru/pdf-v-excel' },
  '/excel-to-pdf': { pl: '/excel-to-pdf', en: '/en/excel-to-pdf', es: '/es/excel-a-pdf', hi: '/hi/excel-to-pdf', pt: '/pt/excel-para-pdf', ru: '/ru/excel-v-pdf' },
  '/wyczysc-metadane-pdf': { pl: '/wyczysc-metadane-pdf', en: '/en/remove-pdf-metadata', es: '/es/limpiar-metadatos-pdf', hi: '/hi/remove-pdf-metadata', pt: '/pt/remover-metadados-pdf', ru: '/ru/udalit-metadannye-pdf' },
  '/wyciagnij-grafiki-z-pdf': { pl: '/wyciagnij-grafiki-z-pdf', en: '/en/extract-images-from-pdf', es: '/es/extraer-imagenes-pdf', hi: '/hi/extract-images-from-pdf', pt: '/pt/extrair-imagens-pdf', ru: '/ru/izvlech-kartinki-iz-pdf' },
  '/zabezpiecz-pdf-haslem': { pl: '/zabezpiecz-pdf-haslem', en: '/en/protect-pdf', es: '/es/proteger-pdf', hi: '/hi/protect-pdf', pt: '/pt/proteger-pdf-com-senha', ru: '/ru/zashchitit-pdf-parolem' },
  '/usun-haslo-z-pdf': { pl: '/usun-haslo-z-pdf', en: '/en/unlock-pdf', es: '/es/desbloquear-pdf', hi: '/hi/unlock-pdf', pt: '/pt/desbloquear-pdf', ru: '/ru/snyat-parol-s-pdf' },
  '/zmien-pdf-na-czarno-bialy': { pl: '/zmien-pdf-na-czarno-bialy', en: '/en/pdf-to-grayscale', es: '/es/pdf-a-blanco-y-negro', hi: '/hi/pdf-to-grayscale', pt: '/pt/pdf-preto-e-branco', ru: '/ru/cherno-belyj-pdf' },
  '/ponumeruj-strony-pdf': { pl: '/ponumeruj-strony-pdf', en: '/en/add-page-numbers-to-pdf', es: '/es/numerar-paginas-pdf', hi: '/hi/add-page-numbers-to-pdf', pt: '/pt/numerar-paginas-pdf', ru: '/ru/pronumerovat-stranicy-pdf' },
  '/polityka-privacy': { pl: '/polityka-privacy', en: '/en/privacy-policy', es: '/es/politica-privacidad', hi: '/hi/privacy-policy', pt: '/pt/politica-de-privacidade', ru: '/ru/politika-konfidencialnosti' },
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
 * Polish is canonical at '/' and '/[tool]', other languages use clean native localized slugs.
 */
export function buildLocalizedPath(toolRoute: ToolRoute, lang: Language): string {
  const localized = PRIMARY_LOCALIZED_SLUGS[toolRoute]?.[lang];
  if (localized) {
    return localized;
  }
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
  const slugs = PRIMARY_LOCALIZED_SLUGS[toolRoute];
  if (slugs) {
    return {
      pl: `${SITE_DOMAIN}${slugs.pl === '/' ? '/' : slugs.pl}`,
      en: `${SITE_DOMAIN}${slugs.en}`,
      es: `${SITE_DOMAIN}${slugs.es}`,
      hi: `${SITE_DOMAIN}${slugs.hi}`,
      pt: `${SITE_DOMAIN}${slugs.pt}`,
      ru: `${SITE_DOMAIN}${slugs.ru}`,
      'x-default': `${SITE_DOMAIN}${slugs.pl === '/' ? '/' : slugs.pl}`,
    };
  }
  const cleanTool = toolRoute === '/' ? '' : toolRoute;
  return {
    pl: `${SITE_DOMAIN}${cleanTool || '/'}`,
    en: `${SITE_DOMAIN}/en${cleanTool}`,
    es: `${SITE_DOMAIN}/es${cleanTool}`,
    hi: `${SITE_DOMAIN}/hi${cleanTool}`,
    pt: `${SITE_DOMAIN}/pt${cleanTool}`,
    ru: `${SITE_DOMAIN}/ru${cleanTool}`,
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
    pt: 'pt_BR',
    ru: 'ru_RU',
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
