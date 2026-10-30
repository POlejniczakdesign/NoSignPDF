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

  // Blog hub and technical articles (canonical & aliases)
  '/blog': '/blog',
  '/blog/bezpieczenstwo-dokumentow-pdf-w-chmurze': '/blog/bezpieczenstwo-dokumentow-pdf-w-chmurze',
  '/blog/zarzadzanie-metadanymi-pdf-usuwanie-danych': '/blog/zarzadzanie-metadanymi-pdf-usuwanie-danych',
  '/blog/format-pdf-w-obrocie-prawnym-iso-32000-acroforms': '/blog/format-pdf-w-obrocie-prawnym-iso-32000-acroforms',

  // English blog aliases
  '/blog/cloud-pdf-document-security': '/blog/bezpieczenstwo-dokumentow-pdf-w-chmurze',
  '/blog/pdf-metadata-management-guide': '/blog/zarzadzanie-metadanymi-pdf-usuwanie-danych',
  '/blog/pdf-legal-standards-iso-32000-acroforms': '/blog/format-pdf-w-obrocie-prawnym-iso-32000-acroforms',

  // Spanish blog aliases
  '/blog/seguridad-documentos-pdf-nube': '/blog/bezpieczenstwo-dokumentow-pdf-w-chmurze',
  '/blog/guia-gestion-metadatos-pdf': '/blog/zarzadzanie-metadanymi-pdf-usuwanie-danych',
  '/blog/formato-pdf-ambito-legal-iso-32000-acroforms': '/blog/format-pdf-w-obrocie-prawnym-iso-32000-acroforms',

  // Portuguese blog aliases
  '/blog/seguranca-documentos-pdf-nuvem': '/blog/bezpieczenstwo-dokumentow-pdf-w-chmurze',
  '/blog/guia-gestao-metadados-pdf': '/blog/zarzadzanie-metadanymi-pdf-usuwanie-danych',
  '/blog/formato-pdf-ambito-juridico-iso-32000-acroforms': '/blog/format-pdf-w-obrocie-prawnym-iso-32000-acroforms',

  // Russian blog aliases
  '/blog/bezopasnost-dokumentov-pdf-v-oblake': '/blog/bezpieczenstwo-dokumentow-pdf-w-chmurze',
  '/blog/upravlenie-metadannymi-pdf-rukovodstvo': '/blog/zarzadzanie-metadanymi-pdf-usuwanie-danych',
  '/blog/format-pdf-v-yuridicheskoj-sfere-iso-32000-acroforms': '/blog/format-pdf-w-obrocie-prawnym-iso-32000-acroforms',

  // About Us and Contact canonical & localized aliases
  '/about': '/about',
  '/about-us': '/about',
  '/o-nas': '/about',
  '/sobre-nosotros': '/about',
  '/sobre': '/about',
  '/o-projekte': '/about',

  '/contact': '/contact',
  '/contact-us': '/contact',
  '/kontakt': '/contact',
  '/contacto': '/contact',
  '/contato': '/contact',
  '/kontakty': '/contact',
  '/support': '/contact',
  '/wsparcie': '/contact',
};

export const DEDICATED_SEO_META: Record<
  ToolRoute,
  Record<Language, { title: string; desc: string }>
> = {
  '/': {
    pl: {
      title: 'Darmowy Edytor PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Darmowy edytor PDF online działający w Twojej przeglądarce bez logowania i rejestracji. Łącz, dziel, obracaj, usuwaj strony i wypełniaj formularze PDF bez wysyłania plików na serwer.',
    },
    en: {
      title: '100% FREE PDF Editor (No Sign Up, No Limits) - nosignpdf.com',
      desc: '100% free online PDF editor running client-side in your browser. Merge, split, rotate, delete pages, and fill PDF forms with zero sign-up and no watermarks.',
    },
    es: {
      title: 'Editor PDF 100% Gratis (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Editor PDF online 100% gratis y privado que funciona en tu navegador sin registro. Une, divide, gira, elimina páginas y rellena formularios PDF sin subir tus archivos.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर (बिना लॉगिन, बिना सीमा) - nosignpdf.com',
      desc: 'ब्राउज़र में स्थानीय रूप से चलने वाला 100% मुफ्त पीडीएफ एडिटर। बिना रजिस्ट्रेशन पीडीएफ फाइलें जोड़ें, अलग करें, घुमाएं और फॉर्म भरें बिना सर्वर पर फाइल भेजे।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis (Sem Cadastro, Sem Limites) - nosignpdf.com',
      desc: 'Editor de PDF online 100% gratuito e privado que roda direto no seu navegador sem cadastro. Junte, divida, gire, exclua páginas e preencha formulários PDF sem enviar arquivos para a nuvem.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор (Без Регистрации и Лимитов) - nosignpdf.com',
      desc: '100% бесплатный онлайн-редактор PDF прямо в вашем браузере. Объединяйте, разделяйте, поворачивайте, удаляйте страницы и заполняйте формы без отправки файлов на сервер.',
    },
  },
  '/polacz-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Połącz PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Szybko i bezpiecznie połącz wiele plików PDF w jeden dokument online. W 100% darmowe narzędzie, bez rejestracji i bez znaku wodnego.',
    },
    en: {
      title: '100% FREE PDF Editor: Merge PDF (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Combine multiple PDF files into one single document online quickly and securely. 100% free tool, no registration, no file size limits, and no watermarks.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Unir PDF (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Une múltiples archivos PDF en un solo documento online de forma rápida y segura. Herramienta 100% gratis, sin registro y sin marcas de agua.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ जोड़ें (बिना लॉगिन, बिना सीमा) - nosignpdf.com',
      desc: 'कई पीडीएफ फाइलों को एक दस्तावेज़ में सुरक्षित रूप से ऑनलाइन जोड़ें। 100% मुफ्त टूल, बिना लॉगिन और बिना वॉटरमार्क के।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Juntar PDF (Sem Cadastro, Sem Limites) - nosignpdf.com',
      desc: 'Junte múltiplos arquivos PDF em um único documento online com rapidez e segurança. Ferramenta 100% gratuita, sem limites, sem registro e sem marca d’água.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Объединить PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Быстро и безопасно объединяйте несколько файлов PDF в один документ онлайн. 100% бесплатно, без регистрации, водяных знаков и лимитов на размер.',
    },
  },
  '/rozdziel-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Rozdziel PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Błyskawicznie podziel plik PDF na pojedyncze strony lub wyodrębnij wybrany zakres arkuszy. Całkowicie za darmo, bez rejestracji i bez limitów.',
    },
    en: {
      title: '100% FREE PDF Editor: Split PDF (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Instantly split PDF documents into single pages or extract custom page ranges online. 100% free, client-side private, with no sign-up required.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Dividir PDF (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Divide documentos PDF en páginas sueltas o extrae rangos específicos online. 100% gratis, sin registro y con total privacidad en tu navegador.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ अलग करें (बिना लॉगिन, बिना सीमा) - nosignpdf.com',
      desc: 'पीडीएफ फाइल को अलग-अलग पेजों में तुरंत विभाजित करें या अपनी पसंद के पेज निकालें। 100% मुफ्त, बिना पंजीकरण और पूर्ण सुरक्षा के साथ।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Dividir PDF (Sem Cadastro, Sem Limites) - nosignpdf.com',
      desc: 'Extraia páginas específicas ou divida documentos PDF pesados em arquivos menores no seu navegador. Rápido, seguro e sem enviar nada para a nuvem.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Разделить PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Извлекайте нужные диапазоны страниц или разделяйте большие PDF на части прямо в браузере. 100% конфиденциально без загрузки в облако.',
    },
  },
  '/wypelnij-formularz-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Wypełnij Formularz PDF (Bez Logowania) - nosignpdf.com',
      desc: 'Uzupełniaj wnioski urzędowe, pisma i formularze PDF bezpośrednio w przeglądarce. Wpisuj tekst, zaznaczaj pola, podpisuj i zapisuj plik bez rejestracji.',
    },
    en: {
      title: '100% FREE PDF Editor: Fill PDF Form (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Fill out applications, contracts, and official PDF forms directly in your browser. Type text, tick checkboxes, and download instantly without printing or sign-up.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Rellenar Formulario PDF (Sin Registro) - nosignpdf.com',
      desc: 'Completa formularios, contratos y solicitudes oficiales PDF directamente en tu navegador. Escribe texto, marca casillas y guarda sin registro.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ फॉर्म भरें (बिना लॉगिन) - nosignpdf.com',
      desc: 'सरकारी आवेदन, अनुबंध और फॉर्म सीधे अपने ब्राउज़र में भरें। टेक्स्ट टाइप करें, चेकबॉक्स टिक करें और बिना लॉगिन तुरंत डाउनलोड करें।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Preencher Formulário PDF (Sem Cadastro) - nosignpdf.com',
      desc: 'Preencha formulários oficiais, requerimentos e contratos PDF com suporte a campos nativos AcroForm e texto livre sem precisar imprimir.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Заполнить Форму PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Заполняйте официальные бланки, заявления и договоры онлайн с нативной поддержкой AcroForm без печати на бумаге и сканирования.',
    },
  },
  '/obroc-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Obróć PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Trwale obróć krzywe lub odwrócone strony PDF o 90°, 180° lub 270°. Napraw skany dokumentów w pamięci przeglądarki bez logowania i bez opłat.',
    },
    en: {
      title: '100% FREE PDF Editor: Rotate PDF (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Permanently rotate single pages or entire PDF files by 90, 180, or 270 degrees. Fix upside-down scans instantly in your browser with no sign-up.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Rotar PDF (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Gira páginas individuales o todo el archivo PDF a 90°, 180° o 270° de forma permanente. Arregla escaneos invertidos online sin registro.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ घुमाएं (बिना लॉगिन, बिना सीमा) - nosignpdf.com',
      desc: 'उल्टे या तिरछे स्कैन किए गए पीडीएफ पेजों को 90°, 180° या 270° घुमाएं। बिना लॉगिन और पूरी तरह सुरक्षित अपने ब्राउज़र में ठीक करें।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Girar PDF (Sem Cadastro, Sem Limites) - nosignpdf.com',
      desc: 'Gire páginas individuais ou todo o documento PDF para corrigir digitalizações tortas. Salve permanentemente no navegador com um clique.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Повернуть PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Поворачивайте отдельные страницы или весь документ PDF для исправления сканов. Сохраняйте файл локально в браузере за один клик.',
    },
  },
  '/usun-strony-z-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Usuń Strony z PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Wybierz i usuń niepotrzebne strony lub puste arkusze ze swojego dokumentu PDF za pomocą jednego kliknięcia. Szybko, za darmo i bez wysyłania do chmury.',
    },
    en: {
      title: '100% FREE PDF Editor: Delete PDF Pages (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Select and remove unwanted or blank pages from your PDF file with one click. Fast, free, client-side, and no registration required.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Eliminar Páginas PDF (Sin Registro) - nosignpdf.com',
      desc: 'Selecciona y elimina hojas no deseadas o páginas en blanco de tu documento PDF con un solo clic. Gratis, rápido y 100% privado.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ से पेज हटाएं (बिना लॉगिन) - nosignpdf.com',
      desc: 'अपने पीडीएफ दस्तावेज़ से खाली या अनावश्यक पेज एक क्लिक में हटाएं। सुरक्षित, तेज़ और बिना किसी पंजीकरण के पूरी तरह मुफ्त।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Excluir Páginas de PDF (Sem Cadastro) - nosignpdf.com',
      desc: 'Remova páginas em branco ou desnecessárias de qualquer documento PDF instantaneamente. Baixe o arquivo limpo e otimizado sem cadastro.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Удалить Страницы PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Мгновенно удаляйте пустые или лишние страницы из файла PDF. Быстро, просто и полностью безопасно в вашем браузере.',
    },
  },
  '/pdf-to-word': {
    pl: {
      title: 'Darmowy Edytor PDF: PDF do Word DOCX (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Przekonwertuj dokument PDF na edytowalny plik Word (.docx) bezpośrednio w przeglądarce. Ekstrakcja tekstu bez wysyłania plików na serwer.',
    },
    en: {
      title: '100% FREE PDF Editor: PDF to Word DOCX (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Convert PDF documents into editable Word (.docx) files directly in your browser. Fast client-side text extraction with no file upload to servers.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: PDF a Word DOCX (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Convierte tus documentos PDF a archivos editables de Word (.docx) directamente en tu navegador. Extracción de texto local 100% privada.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ से वर्ड DOCX (बिना लॉगिन) - nosignpdf.com',
      desc: 'पीडीएफ दस्तावेज़ को संपादन योग्य वर्ड (.docx) फाइल में आसानी से बदलें। बिना सर्वर पर अपलोड किए स्थानीय रूप से टेक्स्ट निकालें।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: PDF para Word DOCX (Sem Cadastro) - nosignpdf.com',
      desc: 'Extraia texto de arquivos PDF e salve como documento do Word (.docx) ou texto sem enviar nada para servidores externos.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: PDF в Word DOCX (Без Регистрации) - nosignpdf.com',
      desc: 'Извлечение текста и конвертация документов PDF в редактируемый формат Word (.docx) локально в браузере.',
    },
  },
  '/word-to-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Word do PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Stwórz profesjonalny plik PDF z tekstu lub notatek. Wbudowany edytor tekstu, czysty format i natychmiastowe pobieranie pliku PDF za darmo.',
    },
    en: {
      title: '100% FREE PDF Editor: Word to PDF (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Turn text, notes, and documents into a clean formatted PDF. Built-in editor, zero sign-up, and instant local generation in your browser.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Word a PDF (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Crea documentos PDF profesionales a partir de texto o notas. Editor integrado, descarga inmediata y 100% gratis sin registro.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: वर्ड से पीडीएफ (बिना लॉगिन, बिना सीमा) - nosignpdf.com',
      desc: 'टेक्स्ट या नोट्स से सुंदर और पेशेवर पीडीएफ तैयार करें। तुरंत स्थानीय रूप से जनरेट करें बिना किसी लॉगिन या शुल्क के।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Word para PDF (Sem Cadastro, Sem Limites) - nosignpdf.com',
      desc: 'Cole seu texto ou importe arquivo e gere um documento PDF limpo com tipografia clara de forma rápida e 100% gratuita.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Word в PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Вставьте текст или загрузите файл для быстрой генерации чистого PDF-документа прямо в браузере.',
    },
  },
  '/pdf-to-excel': {
    pl: {
      title: 'Darmowy Edytor PDF: PDF do Excel CSV (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Błyskawicznie wyodrębnij tabele i dane liczbowe z pliku PDF do formatu CSV / Excel. Bezpieczne przetwarzanie w pamięci RAM bez logowania.',
    },
    en: {
      title: '100% FREE PDF Editor: PDF to Excel CSV (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Extract tables and financial data from PDF files directly into Excel-compatible CSV sheets. Fast, accurate, and completely private.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: PDF a Excel CSV (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Extrae tablas y datos numéricos de tus archivos PDF a hojas de cálculo CSV compatibles con Excel. Rápido, gratis y sin subir archivos.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ से एक्सेल CSV (बिना लॉगिन) - nosignpdf.com',
      desc: 'पीडीएफ से टेबल और संख्यात्मक डेटा आसानी से एक्सेल के अनुकूल सीएसवी में निकालें। पूरी तरह सुरक्षित और मुफ्त ऑनलाइन टूल।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: PDF para Excel CSV (Sem Cadastro) - nosignpdf.com',
      desc: 'Extraia dados, linhas e tabelas de arquivos PDF para planilhas CSV e Excel compatíveis sem upload para a nuvem.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: PDF в Excel CSV (Без Регистрации) - nosignpdf.com',
      desc: 'Экспорт таблиц и строк из документов PDF в чистый формат Excel CSV с кодировкой UTF-8.',
    },
  },
  '/excel-to-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Excel do PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Wklej dane tabelaryczne z programu Excel lub Arkuszy Google i wygeneruj czytelny raport PDF z siatką danych. 100% darmowe narzędzie.',
    },
    en: {
      title: '100% FREE PDF Editor: Excel to PDF (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Paste table rows and columns from Excel or Google Sheets to generate a clean, formatted PDF table report instantly for free.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Excel a PDF (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Pega filas y columnas de Excel o Google Sheets para generar un informe PDF bien formateado y con cuadrícula al instante.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: एक्सेल से पीडीएफ (बिना लॉगिन, बिना सीमा) - nosignpdf.com',
      desc: 'एक्सेल या गूगल शीट्स से डेटा पेस्ट करें और सुंदर टेबल वाला पीडीएफ दस्तावेज़ तैयार करें। बिना लॉगिन तुरंत मुफ्त बनाएं।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Excel para PDF (Sem Cadastro, Sem Limites) - nosignpdf.com',
      desc: 'Cole células de planilhas Excel ou carregue CSV para gerar relatórios em PDF formatados e organizados com facilidade.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Excel в PDF (Без Регистрации) - nosignpdf.com',
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
      title: 'Darmowy Edytor PDF: Kompresuj PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Darmowa kompresja PDF online w przeglądarce. Zmniejsz wagę dokumentu do wysyłki e-mailem lub ePUAP bez logowania i bez wysyłania plików na serwer.',
    },
    en: {
      title: '100% FREE PDF Editor: Compress PDF (No Sign Up, No Limits) - nosignpdf.com',
      desc: '100% free online PDF compressor running locally in your browser. Reduce file size for email attachment limits with zero data collection and no watermarks.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Comprimir PDF (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Reduce el tamaño de tus documentos PDF online de forma rápida y segura. Herramienta 100% gratuita, privada en tu navegador y sin marcas de agua.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ कंप्रेस करें (बिना लॉगिन) - nosignpdf.com',
      desc: 'अपने ब्राउज़र में स्थानीय रूप से पीडीएफ का आकार घटाएं बिना गुणवत्ता खोए। 100% मुफ्त टूल, बिना लॉगिन और बिना वॉटरमार्क।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Comprimir PDF (Sem Cadastro, Sem Limites) - nosignpdf.com',
      desc: 'Reduza o tamanho de arquivos PDF pesados para enviar por e-mail ou órgãos públicos mantendo a nitidez do texto e das imagens.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Сжать PDF (Без Регистрации и Лимитов) - nosignpdf.com',
      desc: 'Эффективно уменьшайте вес документов PDF для отправки по почте или загрузки на госпорталы с сохранением четкости текста.',
    },
  },
  '/grafika-do-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Zdjęcia i Grafika do PDF (Bez Logowania) - nosignpdf.com',
      desc: 'Błyskawicznie połącz zdjęcia i pliki graficzne JPG, PNG, WebP w jeden estetyczny dokument PDF. 100% prywatnie w pamięci RAM bez rejestracji.',
    },
    en: {
      title: '100% FREE PDF Editor: Image to PDF (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Convert JPG, PNG, and WebP pictures into a clean multi-page PDF document online. Fast client-side conversion, no file size limit, and no sign-up.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Imagen a PDF (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Combina múltiples imágenes JPG, PNG o WebP en un solo documento PDF limpio. Gratis, seguro en tu navegador y sin registros.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: तस्वीर से पीडीएफ (बिना लॉगिन) - nosignpdf.com',
      desc: 'JPG, PNG और WebP तस्वीरों को तुरंत स्वच्छ पीडीएफ दस्तावेज़ में बदलें। सुरक्षित, तेज़ और बिना किसी पंजीकरण के पूरी तरह मुफ्त।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Imagem para PDF (Sem Cadastro, Sem Limites) - nosignpdf.com',
      desc: 'Converta fotos e imagens JPG, PNG ou WebP em um documento PDF limpo com ajuste automático de proporções e margens.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Картинки в PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Преобразуйте фотографии и изображения JPG, PNG, WebP в единый многостраничный PDF-документ прямо в браузере.',
    },
  },
  '/wyczysc-metadane-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Usuń Metadane z PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Usuń ukryte metadane, autora, wersję programu Word i historię edycji z pliku PDF. 100% bezpłatnie i lokalnie w przeglądarce bez logowania i rejestracji.',
    },
    en: {
      title: '100% FREE PDF Editor: Remove PDF Metadata (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Strip hidden author names, creation software, editing dates, and XMP metadata from PDF files in your browser. 100% private, free, and no sign-up.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Eliminar Metadatos de PDF (Sin Registro) - nosignpdf.com',
      desc: 'Elimina autor, software de creación, fechas y metadatos XMP de tus archivos PDF online. 100% privado en tu navegador y sin registro.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ मेटाडेटा हटाएं (बिना लॉगिन) - nosignpdf.com',
      desc: 'अपने पीडीएफ दस्तावेज़ से लेखक का नाम, सॉफ्टवेयर विवरण और मेटाडेटा आसानी से हटाएं। 100% सुरक्षित और मुफ्त बिना लॉगिन।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Remover Metadados de PDF (Sem Cadastro) - nosignpdf.com',
      desc: 'Remova informações confidenciais ocultas, nome do autor, software e histórico de edição de arquivos PDF com total privacidade.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Удалить Метаданные PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Полное удаление скрытых метаданных, имени автора, программы Word и истории изменений из PDF-файла 100% локально.',
    },
  },
  '/wyciagnij-grafiki-z-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Wyciągnij Zdjęcia z PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Wyodrębnij i pobierz wszystkie zdjęcia, ilustracje i grafiki osadzone w pliku PDF w oryginalnej jakości. 100% lokalnie w przeglądarce bez logowania.',
    },
    en: {
      title: '100% FREE PDF Editor: Extract Images from PDF (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Extract and download all photos, images, and graphics embedded inside PDF files in original resolution. 100% private, free, and no sign-up.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Extraer Imágenes de PDF (Sin Registro) - nosignpdf.com',
      desc: 'Extrae y descarga todas las fotos, imágenes y gráficos incrustados en archivos PDF con calidad original. Seguro, online y sin registro.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ से फोटो निकालें (बिना लॉगिन) - nosignpdf.com',
      desc: 'पीडीएफ दस्तावेज़ से सभी अंतर्निहित तस्वीरें और ग्राफिक्स मूल गुणवत्ता में निकालें। 100% मुफ्त, सुरक्षित और बिना लॉगिन।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Extrair Imagens de PDF (Sem Cadastro) - nosignpdf.com',
      desc: 'Extraia todas as fotos e ilustrações incorporadas em arquivos PDF no formato JPG e PNG original sem perda de qualidade e sem cadastro.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Извлечь Картинки из PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Быстро извлекайте встроенные изображения и фото из документов PDF в оригинальном качестве JPG/PNG без регистрации.',
    },
  },
  '/zabezpiecz-pdf-haslem': {
    pl: {
      title: 'Darmowy Edytor PDF: Zabezpiecz PDF Hasłem (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Zaszyfruj poufny plik PDF silnym hasłem dostępu bezpośrednio w przeglądarce. Chroń umowy i dane finansowe bez wysyłania plików na serwer.',
    },
    en: {
      title: '100% FREE PDF Editor: Protect PDF with Password (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Encrypt your confidential PDF files with a strong password directly in your browser. Protect contracts and sensitive data with zero uploads.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Proteger PDF con Contraseña (Sin Registro) - nosignpdf.com',
      desc: 'Protege y encripta tus documentos PDF con contraseña de forma segura en tu navegador. Máxima privacidad sin subir tus archivos.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ पासवर्ड सुरक्षित करें (बिना लॉगिन) - nosignpdf.com',
      desc: 'अपने महत्वपूर्ण पीडीएफ दस्तावेज़ को पासवर्ड से सुरक्षित और एन्क्रिप्ट करें सीधे ब्राउज़र में। 100% सुरक्षित और बिना लॉगिन।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Proteger PDF com Senha (Sem Cadastro) - nosignpdf.com',
      desc: 'Bloqueie e proteja arquivos PDF confidenciais com senha e criptografia forte diretamente no seu navegador sem enviar dados à nuvem.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Защитить PDF Паролем (Без Регистрации) - nosignpdf.com',
      desc: 'Установите надежный пароль и шифрование на ваш PDF-документ прямо в браузере без передачи конфиденциальных данных в сеть.',
    },
  },
  '/usun-haslo-z-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Odblokuj i Usuń Hasło z PDF (Bez Logowania) - nosignpdf.com',
      desc: 'Trwale usuń zabezpieczenie hasłem i ograniczenia edycji z pliku PDF. Odblokuj swój dokument w 100% prywatnie w pamięci RAM urządzenia.',
    },
    en: {
      title: '100% FREE PDF Editor: Unlock & Remove PDF Password (No Sign Up) - nosignpdf.com',
      desc: 'Permanently remove password security and permissions restrictions from PDF files. Unlock your PDF locally in memory with zero data collection.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Desbloquear y Quitar Contraseña PDF (Sin Registro) - nosignpdf.com',
      desc: 'Elimina la contraseña y restricciones de tus archivos PDF online de forma permanente. Seguro, rápido en tu navegador y sin registro.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ पासवर्ड हटाएं व अनलॉक करें (बिना लॉगिन) - nosignpdf.com',
      desc: 'पीडीएफ फाइल से पासवर्ड सुरक्षा और प्रतिबंध हटाएं सीधे ब्राउज़र में। 100% मुफ्त, तेज़ और बिना किसी पंजीकरण के।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Desbloquear e Remover Senha do PDF (Sem Cadastro) - nosignpdf.com',
      desc: 'Remova senhas e restrições de documentos PDF protegidos com facilidade. Acesse e imprima seus arquivos sem travas e sem cadastro.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Снять Пароль и Разблокировать PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Быстрое снятие пароля и ограничений с защищенных PDF-файлов онлайн. Скачивайте свободный документ без блокировок.',
    },
  },
  '/zmien-pdf-na-czarno-bialy': {
    pl: {
      title: 'Darmowy Edytor PDF: Zmień PDF na Czarno-Biały (Bez Logowania) - nosignpdf.com',
      desc: 'Przekonwertuj kolorowy plik PDF do odcieni szarości (monochromatyczny) online. Zmniejsz zużycie tuszu drukarki i wagę pliku bez rejestracji.',
    },
    en: {
      title: '100% FREE PDF Editor: Convert PDF to Grayscale (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Convert color PDF documents to clean black and white grayscale online. Save printer ink and toner client-side with no sign-up.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Convertir PDF a Blanco y Negro (Sin Registro) - nosignpdf.com',
      desc: 'Convierte documentos PDF a color en escala de grises blanco y negro. Ahorra tinta de impresión de forma 100% gratuita y privada.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ ब्लैक एंड व्हाइट ग्रेस्केल (बिना लॉगिन) - nosignpdf.com',
      desc: 'रंगीन पीडीएफ दस्तावेज़ को ब्लैक एंड व्हाइट (ग्रेस्केल) में बदलें। प्रिंटर स्याही बचाएं और फाइल साइज घटाएं बिना लॉगिन।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: PDF em Preto e Branco Grayscale (Sem Cadastro) - nosignpdf.com',
      desc: 'Converta arquivos PDF coloridos para escala de cinza monocromática online. Economize tinta de impressora e reduza o tamanho do arquivo.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Черно-Белый PDF в Оттенках Серого (Без Регистрации) - nosignpdf.com',
      desc: 'Преобразуйте цветной PDF-документ в черно-белый формат (градации серого) онлайн. Экономьте тонер принтера и уменьшайте размер.',
    },
  },
  '/ponumeruj-strony-pdf': {
    pl: {
      title: 'Darmowy Edytor PDF: Ponumeruj Strony w PDF (Bez Logowania i Rejestracji) - nosignpdf.com',
      desc: 'Automatycznie dodaj estetyczną numerację stron (np. 1 z N) do pliku PDF. Wybierz pozycję i format numerów w przeglądarce bez logowania.',
    },
    en: {
      title: '100% FREE PDF Editor: Add Page Numbers to PDF (No Sign Up, No Limits) - nosignpdf.com',
      desc: 'Easily insert custom page numbering (e.g. Page 1 of N) into your PDF files online. Fast, clean formatting in your browser with no sign-up.',
    },
    es: {
      title: 'Editor PDF 100% Gratis: Numerar Páginas de PDF (Sin Registro, Sin Límites) - nosignpdf.com',
      desc: 'Añade números de página personalizados a tus documentos PDF online fácilmente. Rápido, seguro en tu navegador y sin registro.',
    },
    hi: {
      title: '100% मुफ्त पीडीएफ एडिटर: पीडीएफ में पेज नंबर जोड़ें (बिना लॉगिन) - nosignpdf.com',
      desc: 'अपने पीडीएफ दस्तावेज़ के पेजों पर क्रमांक (उदा. 1, 2, 3) आसानी से लगाएं। सुंदर फॉर्मेटिंग सीधे ब्राउज़र में बिना लॉगिन।',
    },
    pt: {
      title: 'Editor de PDF 100% Grátis: Numerar Páginas de PDF (Sem Cadastro, Sem Limites) - nosignpdf.com',
      desc: 'Adicione numeração de página personalizada e profissional (ex: Página 1 de N) aos seus documentos PDF com total facilidade.',
    },
    ru: {
      title: '100% Бесплатный PDF Редактор: Пронумеровать Страницы PDF (Без Регистрации) - nosignpdf.com',
      desc: 'Автоматически добавьте аккуратную нумерацию страниц (напр. 1 из N) в документ PDF. Настраивайте формат и позицию без регистрации.',
    },
  },
  '/blog': {
    pl: {
      title: 'Baza Wiedzy i Poradniki PDF – Bezpieczeństwo i Standardy | nosignpdf.com',
      desc: 'Eksperckie poradniki o bezpieczeństwie plików PDF, prywatności w pamięci RAM, usuwaniu metadanych i standardach ISO 32000. Kompendium wiedzy bez logowania.',
    },
    en: {
      title: 'PDF Knowledge Base & Expert Guides – Security & Standards | nosignpdf.com',
      desc: 'Authoritative guides on PDF document cybersecurity, client-side RAM processing, metadata privacy sanitization, and ISO 32000 standards.',
    },
    es: {
      title: 'Base de Conocimiento y Guías PDF – Seguridad y Estándares | nosignpdf.com',
      desc: 'Guías expertas sobre ciberseguridad en documentos PDF, procesamiento local en RAM, eliminación de metadatos y normas ISO 32000.',
    },
    hi: {
      title: 'पीडीएफ ज्ञान केंद्र और विशेषज्ञ मार्गदर्शिकाएं – सुरक्षा और मानक | nosignpdf.com',
      desc: 'पीडीएफ दस्तावेज़ सुरक्षा, क्लाइंट-साइड रैम प्रोसेसिंग, मेटाडेटा हटाने और आईएसओ 32000 मानकों पर व्यापक मार्गदर्शिका।',
    },
    pt: {
      title: 'Base de Conhecimento e Guias PDF – Segurança e Padrões | nosignpdf.com',
      desc: 'Artigos e guias técnicos sobre segurança de documentos PDF na nuvem, processamento em memória RAM e remoção definitiva de metadados.',
    },
    ru: {
      title: 'База Знаний и Руководства по PDF – Безопасность и Стандарты | nosignpdf.com',
      desc: 'Экспертные статьи по информационной безопасности документов PDF, локальной обработке в RAM, очистке метаданных и стандарту ISO 32000.',
    },
  },
  '/blog/bezpieczenstwo-dokumentow-pdf-w-chmurze': {
    pl: {
      title: 'Bezpieczeństwo dokumentów PDF w chmurze – Lokalne przetwarzanie w RAM | nosignpdf.com',
      desc: 'Dlaczego lokalne przetwarzanie w pamięci RAM eliminuje ryzyko wycieku danych w firmie? Analiza zagrożeń chmurowych konwerterów, RODO i dyrektywy NIS2.',
    },
    en: {
      title: 'Cloud PDF Document Security – Why Client-Side RAM Processing Protects Data | nosignpdf.com',
      desc: 'Discover why in-browser RAM execution protects confidential corporate data from cloud server leaks, third-party sub-processors, and regulatory fines.',
    },
    es: {
      title: 'Seguridad de Documentos PDF en la Nube – Procesamiento Local en RAM | nosignpdf.com',
      desc: 'Descubre por qué la ejecución local en RAM protege los datos corporativos frente a fugas en servidores cloud y exigencias de RGPD.',
    },
    hi: {
      title: 'क्लाउड में पीडीएफ दस्तावेज़ सुरक्षा – रैम प्रोसेसिंग क्यों सुरक्षित है | nosignpdf.com',
      desc: 'जानें कि ब्राउज़र मेमोरी (रैम) में स्थानीय प्रोसेसिंग कैसे क्लाउड सर्वर लीक से गोपनीय कॉर्पोरेट डेटा की रक्षा करती है।',
    },
    pt: {
      title: 'Segurança de Documentos PDF na Nuvem – Processamento Local em RAM | nosignpdf.com',
      desc: 'Por que o processamento estritamente local em RAM protege os dados sigilosos da sua empresa contra vazamentos na nuvem e cumpre a LGPD.',
    },
    ru: {
      title: 'Безопасность документов PDF в облаке – Почему обработка в RAM защищает данные | nosignpdf.com',
      desc: 'Узнайте, почему локальная обработка PDF в оперативной памяти браузера полностью исключает утечки корпоративных данных на сторонние серверы.',
    },
  },
  '/blog/zarzadzanie-metadanymi-pdf-usuwanie-danych': {
    pl: {
      title: 'Zarządzanie metadanymi PDF – Jak trwale usunąć ukryte informacje | nosignpdf.com',
      desc: 'Kompleksowy poradnik: jak trwale usunąć ukryte dane o autorze, oprogramowaniu, historii rewizji i współrzędnych GPS z plików PDF przed ich publikacją.',
    },
    en: {
      title: 'PDF Metadata Management Guide – How to Sanitize Hidden Author Info | nosignpdf.com',
      desc: 'Learn how to strip invisible document metadata: author names, device models, GPS coordinates, editing history, and embedded object timestamps.',
    },
    es: {
      title: 'Guía de Gestión de Metadatos PDF – Cómo Eliminar Datos Ocultos | nosignpdf.com',
      desc: 'Guía exhaustiva para eliminar metadatos ocultos en archivos PDF: autor, software, coordenadas GPS e historial de revisiones antes de compartir.',
    },
    hi: {
      title: 'पीडीएफ मेटाडेटा प्रबंधन – छिपी हुई जानकारी कैसे हटाएं | nosignpdf.com',
      desc: 'पीडीएफ फाइलों से लेखक का नाम, सॉफ्टवेयर, जीपीएस निर्देशांक और संशोधन इतिहास को सुरक्षित और स्थायी रूप से हटाने की पूरी जानकारी।',
    },
    pt: {
      title: 'Guia de Gestão de Metadados PDF – Como Remover Informações Ocultas | nosignpdf.com',
      desc: 'Aprenda a higienizar completamente metadados ocultos de PDFs: nomes de autores, aparelhos, histórico de revisões e coordenadas de GPS.',
    },
    ru: {
      title: 'Управление метаданными PDF – Как удалить скрытые сведения об авторе | nosignpdf.com',
      desc: 'Подробное руководство по удалению скрытых метаданных из PDF: имена авторов, версии софта, координаты GPS и история правок перед публикацией.',
    },
  },
  '/blog/format-pdf-w-obrocie-prawnym-iso-32000-acroforms': {
    pl: {
      title: 'Format PDF w obrocie prawnym i administracji – ISO 32000 i AcroForms | nosignpdf.com',
      desc: 'Standard ISO 32000, archiwizacja PDF/A, formularze AcroForms oraz podpisy cyfrowe PAdES w sprawach urzędowych i procedurach prawnych.',
    },
    en: {
      title: 'PDF in Legal & Government Workflow – ISO 32000 & AcroForms Standards | nosignpdf.com',
      desc: 'Comprehensive technical review of ISO 32000-1/2, PDF/A archival compliance, AcroForms architecture, and cryptographic PAdES digital signatures.',
    },
    es: {
      title: 'El Formato PDF en el Ámbito Legal – Estándares ISO 32000 y AcroForms | nosignpdf.com',
      desc: 'Normativa ISO 32000, archivo a largo plazo PDF/A, formularios interactivos AcroForms y validez de firmas electrónicas PAdES en tribunales.',
    },
    hi: {
      title: 'कानूनी और प्रशासनिक कार्यों में पीडीएफ प्रारूप – आईएसओ 32000 और एक्रोफॉर्म्स | nosignpdf.com',
      desc: 'कानूनी और सरकारी प्रक्रियाओं में आईएसओ 32000 मानक, पीडीएफ/ए दीर्घकालिक संग्रहण, एक्रोफॉर्म्स और डिजिटल हस्ताक्षर की विस्तृत तकनीकी समीक्षा।',
    },
    pt: {
      title: 'O Formato PDF no Meio Jurídico e Administrativo – ISO 32000 e AcroForms | nosignpdf.com',
      desc: 'Guia técnico sobre a norma ISO 32000, conformidade de arquivamento PDF/A, formulários AcroForms e assinaturas digitais qualificadas PAdES.',
    },
    ru: {
      title: 'Формат PDF в юридической сфере – Стандарты ISO 32000 и AcroForms | nosignpdf.com',
      desc: 'Стандарты ISO 32000-1/2, архивный формат PDF/A, интерактивные формы AcroForms и квалифицированные электронные подписи PAdES в судах.',
    },
  },
  '/about': {
    pl: {
      title: 'O Nas i Twórcach – Misja NoSignPDF Dev Team | nosignpdf.com',
      desc: 'Poznaj zespół inżynierów cyberbezpieczeństwa NoSignPDF Dev Team. Dowiedz się, dlaczego stworzyliśmy darmowe, w 100% lokalne narzędzia PDF w technologii WebAssembly chroniące prywatność danych w pamięci RAM.',
    },
    en: {
      title: 'About Us & Dev Team – In-Browser Privacy Mission | nosignpdf.com',
      desc: 'Meet the cybersecurity engineers behind NoSignPDF Dev Team. Discover our mission to provide 100% client-side, zero-upload WebAssembly PDF tools that protect business data privacy.',
    },
    es: {
      title: 'Sobre Nosotros y el Equipo – Misión de Privacidad Local | nosignpdf.com',
      desc: 'Conoce al equipo de ingenieros de ciberseguridad NoSignPDF Dev Team. Descubre nuestra misión de ofrecer herramientas PDF gratuitas, locales en RAM y sin subidas a servidores en la nube.',
    },
    hi: {
      title: 'हमारे बारे में और डेवलपर्स – स्थानीय गोपनीयता मिशन | nosignpdf.com',
      desc: 'NoSignPDF Dev Team के साइबर सुरक्षा इंजीनियरों से मिलें। जानें कैसे हमारे 100% ब्राउज़र-आधारित क्लाइंट-साइड टूल्स आपके दस्तावेज़ों की गोपनीयता सुरक्षित रखते हैं।',
    },
    pt: {
      title: 'Sobre Nós e a Equipe Dev – Missão de Privacidade em RAM | nosignpdf.com',
      desc: 'Conheça a equipe de engenheiros de segurança da informação NoSignPDF Dev Team. Nossa missão é disponibilizar ferramentas PDF gratuitas executadas 100% na memória RAM do seu navegador.',
    },
    ru: {
      title: 'О Нас и Разработчиках – Миссия Конфиденциальности в RAM | nosignpdf.com',
      desc: 'Познакомьтесь с командой инженеров кибербезопасности NoSignPDF Dev Team. Узнайте, почему мы создали бесплатные локальные инструменты PDF на WebAssembly без отправки файлов в облако.',
    },
  },
  '/contact': {
    pl: {
      title: 'Kontakt i Wsparcie Techniczne – NoSignPDF Dev Team | nosignpdf.com',
      desc: 'Skontaktuj się z zespołem NoSignPDF Dev Team. Zgłoś problem z plikiem PDF, zaproponuj nową funkcję lub uzyskaj pomoc techniczną pod adresem contact@nosignpdf.com.',
    },
    en: {
      title: 'Contact Us & Technical Support – NoSignPDF Dev Team | nosignpdf.com',
      desc: 'Get in touch with the NoSignPDF Dev Team. Report PDF processing issues, submit feature requests, or reach technical support directly at contact@nosignpdf.com.',
    },
    es: {
      title: 'Contacto y Soporte Técnico – NoSignPDF Dev Team | nosignpdf.com',
      desc: 'Ponte en contacto con el equipo de NoSignPDF. Reporta incidencias con documentos PDF, solicita nuevas funciones o escribe a soporte en contact@nosignpdf.com.',
    },
    hi: {
      title: 'संपर्क करें और तकनीकी सहायता – NoSignPDF Dev Team | nosignpdf.com',
      desc: 'NoSignPDF डेवलपर टीम से संपर्क करें। किसी भी पीडीएफ समस्या या सुझाव के लिए contact@nosignpdf.com पर तकनीकी सहायता प्राप्त करें।',
    },
    pt: {
      title: 'Contato e Suporte Técnico – NoSignPDF Dev Team | nosignpdf.com',
      desc: 'Fale com a equipe de engenharia NoSignPDF Dev Team. Envie dúvidas sobre processamento de PDFs, sugestões ou contate o suporte em contact@nosignpdf.com.',
    },
    ru: {
      title: 'Контакты и Техническая Поддержка – NoSignPDF Dev Team | nosignpdf.com',
      desc: 'Свяжитесь с командой инженеров NoSignPDF Dev Team. Сообщите об ошибке обработки PDF или направьте запрос в службу поддержки: contact@nosignpdf.com.',
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
  '/blog': { pl: '/blog', en: '/en/blog', es: '/es/blog', hi: '/hi/blog', pt: '/pt/blog', ru: '/ru/blog' },
  '/blog/bezpieczenstwo-dokumentow-pdf-w-chmurze': {
    pl: '/blog/bezpieczenstwo-dokumentow-pdf-w-chmurze',
    en: '/en/blog/cloud-pdf-document-security',
    es: '/es/blog/seguridad-documentos-pdf-nube',
    hi: '/hi/blog/cloud-pdf-document-security',
    pt: '/pt/blog/seguranca-documentos-pdf-nuvem',
    ru: '/ru/blog/bezopasnost-dokumentov-pdf-v-oblake',
  },
  '/blog/zarzadzanie-metadanymi-pdf-usuwanie-danych': {
    pl: '/blog/zarzadzanie-metadanymi-pdf-usuwanie-danych',
    en: '/en/blog/pdf-metadata-management-guide',
    es: '/es/blog/guia-gestion-metadatos-pdf',
    hi: '/hi/blog/pdf-metadata-management-guide',
    pt: '/pt/blog/guia-gestao-metadados-pdf',
    ru: '/ru/blog/upravlenie-metadannymi-pdf-rukovodstvo',
  },
  '/blog/format-pdf-w-obrocie-prawnym-iso-32000-acroforms': {
    pl: '/blog/format-pdf-w-obrocie-prawnym-iso-32000-acroforms',
    en: '/en/blog/pdf-legal-standards-iso-32000-acroforms',
    es: '/es/blog/formato-pdf-ambito-legal-iso-32000-acroforms',
    hi: '/hi/blog/pdf-legal-standards-iso-32000-acroforms',
    pt: '/pt/blog/formato-pdf-ambito-juridico-iso-32000-acroforms',
    ru: '/ru/blog/format-pdf-v-yuridicheskoj-sfere-iso-32000-acroforms',
  },
  '/about': {
    pl: '/about',
    en: '/en/about',
    es: '/es/about',
    hi: '/hi/about',
    pt: '/pt/about',
    ru: '/ru/about',
  },
  '/contact': {
    pl: '/contact',
    en: '/en/contact',
    es: '/es/contact',
    hi: '/hi/contact',
    pt: '/pt/contact',
    ru: '/ru/contact',
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
