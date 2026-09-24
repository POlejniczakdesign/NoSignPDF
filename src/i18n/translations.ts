export type Language = 'pl' | 'en' | 'es' | 'hi';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'pl', name: 'Polski', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export interface TranslationDict {
  securityBanner: {
    badge: string;
    message: string;
    subBadge: string;
  };
  header: {
    title: string;
    highlight: string;
    localBadge: string;
    subtitle: string;
    themeLight: string;
    themeDark: string;
    selectLanguage: string;
    menuTools: string;
  };
  ads: {
    adLabel: string;
    bannerTopTitle: string;
    sidebarLeftTitle: string;
    sidebarRightTitle: string;
    interstitialTitle: string;
    format: string;
    responsiveDesc: string;
  };
  interstitial: {
    title: string;
    subtitle: string;
    countdownPrefix: string;
    secondsSuffix: string;
    instantDownload: string;
    close: string;
    secureNote: string;
  };
  common: {
    home: string;
    ramBadge: string;
    clientOnlyBadge: string;
    downloadPdf: string;
    cancel: string;
    reset: string;
    zoomIn: string;
    zoomOut: string;
    resetZoom: string;
    page: string;
    of: string;
    pages: string;
    selectAll: string;
    deselectAll: string;
    applyChanges: string;
    processing: string;
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    browseFiles: string;
    trySample: string;
    trySampleMultipage: string;
    trySamplePcc3: string;
    loadingSample: string;
    fileTooLarge: string;
    invalidPdf: string;
    xfaConvertingNotice: string;
    xfaConvertedNotice: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroHighlight: string;
    heroDesc: string;
    modulesTitle: string;
    modulesCount: string;
    launchModule: string;
  };
  formFiller: {
    title: string;
    tagline: string;
    toolbarTextTool: string;
    toolbarCheckboxTool: string;
    toolbarPointerTool: string;
    detectedFieldsBadge: string;
    noFieldsBadge: string;
    addTextFieldHint: string;
    addCheckboxHint: string;
    fontSize: string;
    deleteField: string;
    placeholderInput: string;
    emptyScanNoticeTitle: string;
    emptyScanNoticeDesc: string;
    saveAndDownload: string;
    savingText: string;
    nativeAcroBadge: string;
    nativeAcroExplainer: string;
    clickToType: string;
    xfaBannerTitle: string;
    xfaBannerDesc: string;
  };
  pageManager: {
    deleteTitle: string;
    deleteDesc: string;
    rotateTitle: string;
    rotateDesc: string;
    mergeTitle: string;
    mergeDesc: string;
    splitTitle: string;
    splitDesc: string;
    rotate90: string;
    deletePage: string;
    selectedCount: string;
    extractRangePlaceholder: string;
    extractButton: string;
    addMorePdfs: string;
    dragDropReorder: string;
  };
  footer: {
    desc: string;
    zeroUpload: string;
    toolsTitle: string;
    securityTitle: string;
    securityDesc: string;
    privacyPolicy: string;
    termsOfService: string;
    privacyAndTerms: string;
    copyright: string;
    engine: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  pl: {
    securityBanner: {
      badge: '🔒 100% Prywatności:',
      message: 'Twoje pliki są przetwarzane lokalnie w Twojej przeglądarce i nigdy nie trafiają na nasz serwer.',
      subBadge: 'RODO / Sandbox',
    },
    header: {
      title: 'PDF Studio',
      highlight: 'Online',
      localBadge: 'LOKALNIE',
      subtitle: 'Darmowy i bezpieczny kombajn PDF w przeglądarce',
      themeLight: 'Przełącz na jasny motyw',
      themeDark: 'Przełącz na ciemny motyw',
      selectLanguage: 'Wybierz język',
      menuTools: 'Narzędzia PDF Studio',
    },
    ads: {
      adLabel: 'Reklama',
      bannerTopTitle: 'Miejsce na baner reklamowy (Google AdSense / Ezoic Leaderboard)',
      sidebarLeftTitle: 'Reklama boczna lewa (Skyscraper 160x600 / 300x600)',
      sidebarRightTitle: 'Reklama boczna prawa (Skyscraper 160x600 / 300x600)',
      interstitialTitle: 'Przestrzeń reklamowa (Interstitial Ad 300x250 / Responsive)',
      format: 'Format:',
      responsiveDesc: 'Płynna siatka reklamowa zoptymalizowana pod wysokie RPM i zgodna z zasadami Google AdSense.',
    },
    interstitial: {
      title: 'Trwa bezpieczne generowanie pliku PDF...',
      subtitle: 'Wszystkie operacje i pola AcroForm kompilują się w 100% lokalnie w pamięci RAM Twojej przeglądarki.',
      countdownPrefix: 'Pobieranie pliku rozpocznie się za',
      secondsSuffix: 'sek.',
      instantDownload: 'Pobierz natychmiast',
      close: 'Zamknij okno',
      secureNote: 'Gwarancja bezpieczeństwa: Żadne dane formularza nie zostały przesłane do internetu.',
    },
    common: {
      home: 'Strona Główna',
      ramBadge: 'Przetwarzanie w pamięci RAM',
      clientOnlyBadge: 'Client-Side Engine',
      downloadPdf: 'Pobierz PDF',
      cancel: 'Anuluj',
      reset: 'Wyczyść wszystko',
      zoomIn: 'Powiększ',
      zoomOut: 'Pomniejsz',
      resetZoom: 'Domyślna skala',
      page: 'Strona',
      of: 'z',
      pages: 'stron',
      selectAll: 'Zaznacz wszystkie',
      deselectAll: 'Odznacz wszystkie',
      applyChanges: 'Zastosuj i zapisz',
      processing: 'Przetwarzanie dokumentu...',
      dropzoneTitle: 'Upuść plik PDF tutaj lub kliknij, aby wybrać',
      dropzoneSubtitle: 'Obsługujemy standardowe formularze oraz wielostronicowe dokumenty',
      browseFiles: 'Wybierz z dysku',
      trySample: 'Wypróbuj przykładowy wniosek urzędowy',
      trySampleMultipage: 'Wypróbuj dokument 4-stronicowy',
      trySamplePcc3: 'Wypróbuj formularz PCC-3 (podatki.gov.pl)',
      loadingSample: 'Generowanie pliku testowego...',
      fileTooLarge: 'Plik jest zbyt duży lub uszkodzony.',
      invalidPdf: 'Wybrany plik nie jest prawidłowym dokumentem PDF.',
      xfaConvertingNotice: 'Wykryto urzędową strukturę Adobe XFA. Trwa konwersja do standardowego formatu PDF...',
      xfaConvertedNotice: 'Formularz Adobe XFA (np. PCC-3) został pomyślnie przekształcony do formatu edytowalnego w przeglądarce.',
    },
    home: {
      heroBadge: 'Bezpieczeństwo Client-Side: Żaden plik nie opuszcza Twojego urządzenia',
      heroTitle: 'Wszystkie narzędzia do plików PDF.',
      heroHighlight: '100% lokalnie i bez opłat.',
      heroDesc: 'Wypełniaj oficjalne pisma urzędowe (AcroForms), usuwaj i obracaj strony, łącz i rozdzielaj dokumenty PDF bezpośrednio w pamięci RAM przeglądarki. Bez rejestracji, bez limitów i bez ryzyka wycieku danych.',
      modulesTitle: 'Wybierz dedykowane narzędzie PDF',
      modulesCount: '5 profesjonalnych modułów',
      launchModule: 'Uruchom moduł',
    },
    formFiller: {
      title: 'Wypełniacz Formularzy PDF',
      tagline: 'Uzupełniaj oficjalne pisma, deklaracje i wnioski z natywnymi polami AcroForm.',
      toolbarTextTool: 'Dodaj Pole Tekstowe',
      toolbarCheckboxTool: 'Dodaj Checkbox',
      toolbarPointerTool: 'Tryb Zwykły (Wypełnianie)',
      detectedFieldsBadge: 'Wykryto natywnych pól AcroForm:',
      noFieldsBadge: 'Brak pól cyfrowych – kliknij „Dodaj Pole”, aby stworzyć formularz',
      addTextFieldHint: 'Kliknij w dowolną białą kratkę lub linię na dokumencie, aby wstawić natywne pole formularza PDF.',
      addCheckboxHint: 'Kliknij w pole wyboru na dokumencie, aby dodać interaktywny znacznik checkbox.',
      fontSize: 'Rozmiar czcionki',
      deleteField: 'Usuń pole',
      placeholderInput: 'Wpisz tekst...',
      emptyScanNoticeTitle: 'Dokument bez cyfrowych pól formularza (AcroForms)',
      emptyScanNoticeDesc: 'Użyj narzędzia „Dodaj Pole Tekstowe” lub „Dodaj Checkbox” powyżej, a następnie kliknij w puste miejsce wniosku, aby wygenerować pole w strukturze pliku.',
      saveAndDownload: 'Zapisz i pobierz wypełniony PDF',
      savingText: 'Kompilowanie pól AcroForm w PDF...',
      nativeAcroBadge: 'Natywne pola AcroForm',
      nativeAcroExplainer: 'Wszystkie wartości są zapisywane jako oficjalne pola PDF – otworzysz je i wyedytujesz w programie Adobe Acrobat lub w urzędzie.',
      clickToType: 'Kliknij tutaj, aby wpisać dane',
      xfaBannerTitle: 'Formularz urzędowy XFA (np. PCC-3 z podatki.gov.pl)',
      xfaBannerDesc: 'Wykryto i przekonwertowano strukturę Adobe XFA na standardowy PDF. Kliknij w dowolne puste kratki formularza, aby dynamicznie utworzyć zapisywalne pola tekstowe (form.createTextField).',
    },
    pageManager: {
      deleteTitle: 'Usuń wybrane strony z dokumentu',
      deleteDesc: 'Zaznacz strony, których chcesz się pozbyć lub kliknij ikonę kosza na miniaturze.',
      rotateTitle: 'Obróć strony dokumentu PDF',
      rotateDesc: 'Klikaj przyciski obrotu na miniaturach, aby wyrównać pionowe i poziome arkusze.',
      mergeTitle: 'Połącz pliki PDF w jeden',
      mergeDesc: 'Przeciągaj miniatury stron, aby ustalić ich idealną kolejność w docelowym dokumencie.',
      splitTitle: 'Rozdziel dokument i wyodrębnij strony',
      splitDesc: 'Wpisz zakres stron do wyciągnięcia (np. 1-2, 4) lub zaznacz wybrane arkusze.',
      rotate90: 'Obróć o 90°',
      deletePage: 'Usuń stronę',
      selectedCount: 'Zaznaczono stron:',
      extractRangePlaceholder: 'np. 1-3, 5, 8-10',
      extractButton: 'Wyodrębnij zaznaczone',
      addMorePdfs: 'Dodaj kolejny plik PDF',
      dragDropReorder: 'Przeciągaj miniatury, aby zmienić kolejność stron',
    },
    footer: {
      desc: 'Nowoczesna, bezpłatna platforma internetowa do bezpiecznej edycji dokumentów PDF. Wszystkie operacje (wypełnianie natywnych pól AcroForm, obracanie, łączenie, usuwanie i dzielenie stron) wykonują się w 100% po stronie Twojej przeglądarki.',
      zeroUpload: 'Gwarancja zero-upload: Pliki nie dotykają serwera',
      toolsTitle: 'Narzędzia PDF',
      securityTitle: 'Bezpieczeństwo & RODO',
      securityDesc: 'Zgodność z europejskimi przepisami RODO / GDPR. Przeglądarka tworzy odizolowaną piaskownicę (Sandbox), chroniąc Twoje poufne dane bankowe, PESEL i umowy handlowe.',
      privacyPolicy: 'Polityka Prywatności',
      termsOfService: 'Regulamin Serwisu',
      privacyAndTerms: 'Regulamin i Polityka Prywatności',
      copyright: 'Wszelkie prawa zastrzeżone.',
      engine: '100% Client-Side Engine • Powered by pdf-lib & pdfjs-dist',
    },
  },
  en: {
    securityBanner: {
      badge: '🔒 100% Privacy:',
      message: 'Your files are processed locally in your browser and are never sent to our server.',
      subBadge: 'GDPR / Sandbox',
    },
    header: {
      title: 'PDF Studio',
      highlight: 'Online',
      localBadge: 'LOCAL',
      subtitle: 'Free & private in-browser PDF suite',
      themeLight: 'Switch to light mode',
      themeDark: 'Switch to dark mode',
      selectLanguage: 'Select language',
      menuTools: 'PDF Studio Tools',
    },
    ads: {
      adLabel: 'Advertisement',
      bannerTopTitle: 'Ad Placement (Google AdSense / Ezoic Leaderboard)',
      sidebarLeftTitle: 'Sidebar Ad Left (Skyscraper 160x600 / 300x600)',
      sidebarRightTitle: 'Sidebar Ad Right (Skyscraper 160x600 / 300x600)',
      interstitialTitle: 'Interstitial Ad Space (300x250 / Responsive)',
      format: 'Format:',
      responsiveDesc: 'Responsive ad layout designed for high RPM and compliant with Google AdSense policies.',
    },
    interstitial: {
      title: 'Safely generating your PDF file...',
      subtitle: 'All modifications and AcroForm fields are compiling 100% locally in your browser RAM.',
      countdownPrefix: 'Download will begin in',
      secondsSuffix: 'sec.',
      instantDownload: 'Download Now',
      close: 'Close Window',
      secureNote: 'Privacy guarantee: Zero bytes were transmitted over the network.',
    },
    common: {
      home: 'Home',
      ramBadge: 'Processed in RAM',
      clientOnlyBadge: 'Client-Side Engine',
      downloadPdf: 'Download PDF',
      cancel: 'Cancel',
      reset: 'Reset All',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      resetZoom: 'Reset Zoom',
      page: 'Page',
      of: 'of',
      pages: 'pages',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      applyChanges: 'Apply & Save',
      processing: 'Processing document...',
      dropzoneTitle: 'Drop your PDF here or click to select',
      dropzoneSubtitle: 'Supports official forms, invoices, and multi-page documents',
      browseFiles: 'Browse Files',
      trySample: 'Try official sample application form',
      trySampleMultipage: 'Try 4-page sample document',
      trySamplePcc3: 'Try official PCC-3 tax form (podatki.gov.pl)',
      loadingSample: 'Generating test document...',
      fileTooLarge: 'File is too large or corrupted.',
      invalidPdf: 'The selected file is not a valid PDF document.',
      xfaConvertingNotice: 'Detected Adobe XFA structure. Converting to standard PDF format...',
      xfaConvertedNotice: 'Adobe XFA form (e.g. PCC-3) converted successfully for in-browser editing.',
    },
    home: {
      heroBadge: 'Client-Side Security: No files ever leave your device',
      heroTitle: 'All-in-One PDF Tools.',
      heroHighlight: '100% local, private and free.',
      heroDesc: 'Fill out official forms (AcroForms), delete and rotate pages, merge and split PDF files entirely in your browser RAM. No accounts, no file limits, and zero leak risk.',
      modulesTitle: 'Select a Dedicated PDF Tool',
      modulesCount: '5 professional modules',
      launchModule: 'Open Module',
    },
    formFiller: {
      title: 'PDF Form Filler',
      tagline: 'Complete official applications, tax papers and contracts with native AcroForm fields.',
      toolbarTextTool: 'Add Text Field',
      toolbarCheckboxTool: 'Add Checkbox',
      toolbarPointerTool: 'Fill Mode (Interactive)',
      detectedFieldsBadge: 'Detected native AcroForm fields:',
      noFieldsBadge: 'No digital fields detected – click "Add Field" to create fields',
      addTextFieldHint: 'Click anywhere on an empty line or box in the document to create an official PDF text field.',
      addCheckboxHint: 'Click on any checkbox box in the document to add an interactive checkbox.',
      fontSize: 'Font size',
      deleteField: 'Delete field',
      placeholderInput: 'Type here...',
      emptyScanNoticeTitle: 'Document has no pre-existing AcroForm fields',
      emptyScanNoticeDesc: 'Use the "Add Text Field" or "Add Checkbox" tool above, then click on the blank areas of your document to embed native form fields into the PDF.',
      saveAndDownload: 'Save & Download Filled PDF',
      savingText: 'Compiling AcroForm fields into PDF...',
      nativeAcroBadge: 'Native AcroForm Fields',
      nativeAcroExplainer: 'All inputs are saved as official PDF form entries – fully editable and valid in Adobe Acrobat and government systems.',
      clickToType: 'Click here to enter data',
      xfaBannerTitle: 'Official XFA Form (e.g. PCC-3 tax form)',
      xfaBannerDesc: 'Adobe XFA structure was detected and converted to standard PDF. Click in any empty form boxes or grid cells to dynamically create writable text fields (form.createTextField).',
    },
    pageManager: {
      deleteTitle: 'Delete selected pages from PDF',
      deleteDesc: 'Select pages to remove or click the trash icon on any page thumbnail.',
      rotateTitle: 'Rotate PDF pages online',
      rotateDesc: 'Click rotation buttons on page thumbnails to straighten scans and landscape sheets.',
      mergeTitle: 'Merge PDF files together',
      mergeDesc: 'Drag and drop page thumbnails to rearrange pages into your desired final sequence.',
      splitTitle: 'Split & extract PDF pages',
      splitDesc: 'Enter page ranges (e.g. 1-2, 4) or click individual sheets to extract them into a new file.',
      rotate90: 'Rotate 90°',
      deletePage: 'Delete page',
      selectedCount: 'Pages selected:',
      extractRangePlaceholder: 'e.g. 1-3, 5, 8-10',
      extractButton: 'Extract Selected',
      addMorePdfs: 'Add Another PDF',
      dragDropReorder: 'Drag and drop thumbnails to reorder pages',
    },
    footer: {
      desc: 'Modern, free online platform for secure PDF editing. All operations (AcroForm filling, rotating, merging, deleting, and splitting pages) execute 100% in your browser without servers.',
      zeroUpload: 'Zero-upload guarantee: Files never touch any server',
      toolsTitle: 'PDF Tools',
      securityTitle: 'Security & Privacy',
      securityDesc: 'Compliant with European GDPR regulations. The browser executes inside an isolated sandbox, keeping your financial, tax, and private data safe.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      privacyAndTerms: 'Privacy Policy & Terms',
      copyright: 'All rights reserved.',
      engine: '100% Client-Side Engine • Powered by pdf-lib & pdfjs-dist',
    },
  },
  es: {
    securityBanner: {
      badge: '🔒 100% Privacidad:',
      message: 'Tus archivos se procesan localmente en tu navegador y nunca se envían a nuestro servidor.',
      subBadge: 'RGPD / Sandbox',
    },
    header: {
      title: 'PDF Studio',
      highlight: 'Online',
      localBadge: 'LOCAL',
      subtitle: 'Herramientas PDF gratuitas y seguras en tu navegador',
      themeLight: 'Cambiar a modo claro',
      themeDark: 'Cambiar a modo oscuro',
      selectLanguage: 'Seleccionar idioma',
      menuTools: 'Herramientas PDF Studio',
    },
    ads: {
      adLabel: 'Publicidad',
      bannerTopTitle: 'Espacio publicitario superior (Google AdSense / Ezoic Leaderboard)',
      sidebarLeftTitle: 'Publicidad lateral izquierda (Skyscraper 160x600 / 300x600)',
      sidebarRightTitle: 'Publicidad lateral derecha (Skyscraper 160x600 / 300x600)',
      interstitialTitle: 'Espacio publicitario interstitial (300x250 / Adaptable)',
      format: 'Formato:',
      responsiveDesc: 'Diseño publicitario adaptable optimizado para un alto RPM cumpliendo las directrices de Google AdSense.',
    },
    interstitial: {
      title: 'Generando tu archivo PDF de forma segura...',
      subtitle: 'Todas las modificaciones y campos AcroForm se compilan 100% localmente en la memoria RAM de tu navegador.',
      countdownPrefix: 'La descarga comenzará en',
      secondsSuffix: 'seg.',
      instantDownload: 'Descargar ahora',
      close: 'Cerrar ventana',
      secureNote: 'Garantía de privacidad: Ningún byte ha salido hacia internet.',
    },
    common: {
      home: 'Inicio',
      ramBadge: 'Procesado en memoria RAM',
      clientOnlyBadge: 'Motor del lado del cliente',
      downloadPdf: 'Descargar PDF',
      cancel: 'Cancelar',
      reset: 'Limpiar todo',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      resetZoom: 'Zoom original',
      page: 'Página',
      of: 'de',
      pages: 'páginas',
      selectAll: 'Seleccionar todo',
      deselectAll: 'Deseleccionar todo',
      applyChanges: 'Aplicar y guardar',
      processing: 'Procesando documento...',
      dropzoneTitle: 'Arrastra tu PDF aquí o haz clic para seleccionarlo',
      dropzoneSubtitle: 'Compatible con formularios oficiales, facturas y documentos de varias páginas',
      browseFiles: 'Buscar en tu equipo',
      trySample: 'Probar formulario de solicitud oficial',
      trySampleMultipage: 'Probar documento de 4 páginas',
      trySamplePcc3: 'Probar formulario tributario oficial PCC-3',
      loadingSample: 'Generando documento de prueba...',
      fileTooLarge: 'El archivo es demasiado grande o está dañado.',
      invalidPdf: 'El archivo seleccionado no es un documento PDF válido.',
      xfaConvertingNotice: 'Detectada estructura Adobe XFA. Convirtiendo a formato PDF estándar...',
      xfaConvertedNotice: 'Formulario oficial Adobe XFA (ej. PCC-3) convertido con éxito para edición en navegador.',
    },
    home: {
      heroBadge: 'Seguridad del lado del cliente: Ningún archivo sale de tu dispositivo',
      heroTitle: 'Todas las herramientas para tus PDF.',
      heroHighlight: '100% locales, privadas y gratuitas.',
      heroDesc: 'Rellena formularios oficiales (AcroForms), elimina y rota páginas, combina y divide documentos PDF directamente en la memoria RAM de tu navegador. Sin registro, sin límites y sin riesgos.',
      modulesTitle: 'Elige una herramienta PDF especializada',
      modulesCount: '5 módulos profesionales',
      launchModule: 'Abrir módulo',
    },
    formFiller: {
      title: 'Rellenador de Formularios PDF',
      tagline: 'Completa solicitudes oficiales, contratos y declaraciones con campos nativos AcroForm.',
      toolbarTextTool: 'Añadir Campo de Texto',
      toolbarCheckboxTool: 'Añadir Casilla (Checkbox)',
      toolbarPointerTool: 'Modo Rellenar (Interactuar)',
      detectedFieldsBadge: 'Campos AcroForm nativos detectados:',
      noFieldsBadge: 'Sin campos digitales – haz clic en "Añadir Campo" para crearlos',
      addTextFieldHint: 'Haz clic en cualquier línea en blanco o casilla del documento para insertar un campo de formulario PDF oficial.',
      addCheckboxHint: 'Haz clic en una casilla del documento para añadir una marca de verificación interactiva.',
      fontSize: 'Tamaño de fuente',
      deleteField: 'Eliminar campo',
      placeholderInput: 'Escribe aquí...',
      emptyScanNoticeTitle: 'El documento no tiene campos interactivos preexistentes',
      emptyScanNoticeDesc: 'Usa la herramienta "Añadir Campo de Texto" o "Añadir Casilla" arriba y haz clic en las áreas vacías de tu documento para crear campos nativos en la estructura del PDF.',
      saveAndDownload: 'Guardar y descargar PDF rellenado',
      savingText: 'Compilando campos AcroForm en el PDF...',
      nativeAcroBadge: 'Campos AcroForm nativos',
      nativeAcroExplainer: 'Todos los datos se guardan como campos PDF oficiales, compatibles con Adobe Acrobat y administraciones públicas.',
      clickToType: 'Haz clic aquí para escribir',
      xfaBannerTitle: 'Formulario oficial XFA (ej. modelo PCC-3)',
      xfaBannerDesc: 'Se detectó y convirtió la estructura Adobe XFA a PDF estándar. Haz clic en cualquier casilla en blanco para crear campos de texto editables dinámicamente (form.createTextField).',
    },
    pageManager: {
      deleteTitle: 'Eliminar páginas seleccionadas de PDF',
      deleteDesc: 'Selecciona las páginas que deseas descartar o haz clic en la papelera de cada miniatura.',
      rotateTitle: 'Girar páginas PDF online',
      rotateDesc: 'Gira las miniaturas para enderezar escaneos y hojas horizontales.',
      mergeTitle: 'Combinar y unir archivos PDF',
      mergeDesc: 'Arrastra y suelta miniaturas para ordenar las páginas en el documento final.',
      splitTitle: 'Dividir y extraer páginas de PDF',
      splitDesc: 'Indica rangos de páginas (ej. 1-2, 4) o selecciona hojas individuales para guardarlas en un nuevo archivo.',
      rotate90: 'Girar 90°',
      deletePage: 'Eliminar página',
      selectedCount: 'Páginas seleccionadas:',
      extractRangePlaceholder: 'ej. 1-3, 5, 8-10',
      extractButton: 'Extraer seleccionadas',
      addMorePdfs: 'Añadir otro archivo PDF',
      dragDropReorder: 'Arrastra las miniaturas para reordenar las páginas',
    },
    footer: {
      desc: 'Plataforma web moderna y gratuita para la edición segura de documentos PDF. Todas las operaciones (AcroForms, rotación, combinación, eliminación y división) se ejecutan al 100% en tu navegador.',
      zeroUpload: 'Garantía sin subida: Los archivos nunca tocan ningún servidor',
      toolsTitle: 'Herramientas PDF',
      securityTitle: 'Seguridad y RGPD',
      securityDesc: 'Cumplimiento de normativas RGPD / GDPR de la UE. El navegador crea un entorno aislado (Sandbox) protegiendo tus datos confidenciales.',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',
      privacyAndTerms: 'Política de Privacidad y Términos',
      copyright: 'Todos los derechos reservados.',
      engine: '100% Client-Side Engine • Desarrollado con pdf-lib y pdfjs-dist',
    },
  },
  hi: {
    securityBanner: {
      badge: '🔒 100% गोपनीयता:',
      message: 'आपकी फाइलें आपके ब्राउज़र में स्थानीय रूप से प्रोसेस की जाती हैं और कभी हमारे सर्वर पर नहीं भेजी जाती हैं।',
      subBadge: 'गोपनीयता / सैंडबॉक्स',
    },
    header: {
      title: 'PDF Studio',
      highlight: 'Online',
      localBadge: 'स्थानीय',
      subtitle: 'ब्राउज़र में मुफ्त और सुरक्षित पीडीएफ सुइट',
      themeLight: 'लाइट मोड चुनें',
      themeDark: 'डार्क मोड चुनें',
      selectLanguage: 'भाषा चुनें',
      menuTools: 'पीडीएफ टूल्स मेनू',
    },
    ads: {
      adLabel: 'विज्ञापन',
      bannerTopTitle: 'शीर्ष विज्ञापन स्थान (Google AdSense / Ezoic Leaderboard)',
      sidebarLeftTitle: 'बायां साइडबार विज्ञापन (Skyscraper 160x600 / 300x600)',
      sidebarRightTitle: 'दायां साइडबार विज्ञापन (Skyscraper 160x600 / 300x600)',
      interstitialTitle: 'डाउनलोड विज्ञापन स्थान (Interstitial Ad 300x250)',
      format: 'प्रारूप:',
      responsiveDesc: 'उच्च RPM और Google AdSense नीतियों के अनुकूल रिस्पॉन्सिव विज्ञापन लेआउट।',
    },
    interstitial: {
      title: 'आपकी पीडीएफ फाइल सुरक्षित रूप से तैयार की जा रही है...',
      subtitle: 'सभी संपादन और AcroForm फ़ील्ड आपके डिवाइस की रैम में 100% स्थानीय रूप से तैयार किए जा रहे हैं।',
      countdownPrefix: 'डाउनलोड शुरू होगा',
      secondsSuffix: 'सेकंड में।',
      instantDownload: 'अभी डाउनलोड करें',
      close: 'विंडो बंद करें',
      secureNote: 'गोपनीयता की गारंटी: कोई भी डेटा इंटरनेट पर नहीं भेजा गया।',
    },
    common: {
      home: 'होम',
      ramBadge: 'रैम में सुरक्षित प्रोसेसिंग',
      clientOnlyBadge: 'क्लाइंट-साइड इंजन',
      downloadPdf: 'पीडीएफ डाउनलोड करें',
      cancel: 'रद्द करें',
      reset: 'रीसेट करें',
      zoomIn: 'ज़ूम इन',
      zoomOut: 'ज़ूम आउट',
      resetZoom: 'सामान्य आकार',
      page: 'पृष्ठ',
      of: 'का',
      pages: 'पृष्ठ',
      selectAll: 'सभी चुनें',
      deselectAll: 'सभी हटाएं',
      applyChanges: 'लागू करें और सहेजें',
      processing: 'दस्तावेज़ प्रोसेस हो रहा है...',
      dropzoneTitle: 'अपनी पीडीएफ फाइल यहां खींचें या चुनने के लिए क्लिक करें',
      dropzoneSubtitle: 'सरकारी फॉर्म, चालान और बहु-पृष्ठ दस्तावेज़ समर्थित हैं',
      browseFiles: 'फ़ाइलें चुनें',
      trySample: 'नमूना आवेदन पत्र आज़माएं',
      trySampleMultipage: '4 पृष्ठों का नमूना दस्तावेज़ आज़माएं',
      trySamplePcc3: 'आधिकारिक PCC-3 टैक्स फॉर्म आज़माएं',
      loadingSample: 'नमूना दस्तावेज़ बनाया जा रहा है...',
      fileTooLarge: 'फ़ाइल बहुत बड़ी या क्षतिग्रस्त है।',
      invalidPdf: 'चुनी गई फ़ाइल मान्य पीडीएफ नहीं है।',
      xfaConvertingNotice: 'Adobe XFA संरचना पहचानी गई। मानक पीडीएफ में परिवर्तित किया जा रहा है...',
      xfaConvertedNotice: 'Adobe XFA फॉर्म (उदा. PCC-3) ब्राउज़र में संपादन के लिए सफलतापूर्वक परिवर्तित हो गया।',
    },
    home: {
      heroBadge: 'क्लाइंट-साइड सुरक्षा: कोई भी फ़ाइल आपके डिवाइस से बाहर नहीं जाती',
      heroTitle: 'सभी आवश्यक पीडीएफ टूल्स।',
      heroHighlight: '100% स्थानीय, निजी और मुफ्त।',
      heroDesc: 'सरकारी फॉर्म (AcroForms) भरें, पृष्ठ हटाएं और घुमाएं, पीडीएफ फाइलों को सीधे ब्राउज़र की रैम में मर्ज और विभाजित करें। बिना किसी पंजीकरण, सीमा या डेटा लीक के जोखिम के।',
      modulesTitle: 'उपयुक्त पीडीएफ टूल चुनें',
      modulesCount: '5 पेशेवर मॉड्यूल',
      launchModule: 'मॉड्यूल खोलें',
    },
    formFiller: {
      title: 'पीडीएफ फॉर्म फिलर',
      tagline: 'मूल AcroForm फ़ील्ड्स के साथ सरकारी फॉर्म, अनुबंध और घोषणाएं भरें।',
      toolbarTextTool: 'टेक्स्ट फ़ील्ड जोड़ें',
      toolbarCheckboxTool: 'चेकबॉक्स जोड़ें',
      toolbarPointerTool: 'भरने का मोड (क्लिक करें)',
      detectedFieldsBadge: 'पहचाने गए मूल AcroForm फ़ील्ड:',
      noFieldsBadge: 'कोई डिजिटल फ़ील्ड नहीं मिला – फॉर्म बनाने के लिए "फ़ील्ड जोड़ें" पर क्लिक करें',
      addTextFieldHint: 'दस्तावेज़ में आधिकारिक पीडीएफ टेक्स्ट फ़ील्ड बनाने के लिए किसी भी खाली स्थान पर क्लिक करें।',
      addCheckboxHint: 'दस्तावेज़ में इंटरएक्टिव चेकबॉक्स जोड़ने के लिए बॉक्स पर क्लिक करें।',
      fontSize: 'फ़ॉन्ट आकार',
      deleteField: 'फ़ील्ड हटाएं',
      placeholderInput: 'यहाँ टाइप करें...',
      emptyScanNoticeTitle: 'दस्तावेज़ में पहले से डिजिटल फॉर्म फ़ील्ड नहीं हैं',
      emptyScanNoticeDesc: 'ऊपर "टेक्स्ट फ़ील्ड जोड़ें" या "चेकबॉक्स जोड़ें" टूल का उपयोग करें और दस्तावेज़ की खाली जगहों पर क्लिक करके नए फॉर्म फ़ील्ड बनाएं।',
      saveAndDownload: 'सहेजें और भरा हुआ पीडीएफ डाउनलोड करें',
      savingText: 'पीडीएफ में AcroForm फ़ील्ड संकलित किए जा रहे हैं...',
      nativeAcroBadge: 'मूल AcroForm फ़ील्ड',
      nativeAcroExplainer: 'सभी डेटा आधिकारिक पीडीएफ फ़ील्ड के रूप में सहेजे जाते हैं – Adobe Acrobat और सरकारी प्रणालियों में पूरी तरह से मान्य।',
      clickToType: 'टाइप करने के लिए क्लिक करें',
      xfaBannerTitle: 'आधिकारिक XFA फॉर्म (उदा. PCC-3 टैक्स फॉर्म)',
      xfaBannerDesc: 'Adobe XFA संरचना को मानक पीडीएफ में बदला गया। टेक्स्ट बॉक्स बनाने के लिए किसी भी खाली स्थान पर क्लिक करें (form.createTextField)।',
    },
    pageManager: {
      deleteTitle: 'पीडीएफ से चुने गए पृष्ठ हटाएं',
      deleteDesc: 'हटाने के लिए पृष्ठ चुनें या थंबनेल पर रीसायकल बिन आइकन पर क्लिक करें।',
      rotateTitle: 'पीडीएफ पृष्ठों को ऑनलाइन घुमाएं',
      rotateDesc: 'पृष्ठों को सीधा करने के लिए थंबनेल पर रोटेट बटन पर क्लिक करें।',
      mergeTitle: 'पीडीएफ फाइलों को एक साथ जोड़ें (मर्ज)',
      mergeDesc: 'दस्तावेज़ में पृष्ठों का क्रम बदलने के लिए थंबनेल को ड्रैग और ड्रॉप करें।',
      splitTitle: 'पीडीएफ विभाजित करें और पृष्ठ निकालें',
      splitDesc: 'पेज रेंज दर्ज करें (उदा. 1-2, 4) या नई फाइल में सहेजने के लिए अलग-अलग शीट चुनें।',
      rotate90: '90° घुमाएं',
      deletePage: 'पृष्ठ हटाएं',
      selectedCount: 'चुने गए पृष्ठ:',
      extractRangePlaceholder: 'उदा. 1-3, 5, 8-10',
      extractButton: 'चुने हुए निकालें',
      addMorePdfs: 'अन्य पीडीएफ जोड़ें',
      dragDropReorder: 'क्रम बदलने के लिए थंबनेल को खींचें और छोड़ें',
    },
    footer: {
      desc: 'सुरक्षित पीडीएफ संपादन के लिए आधुनिक, मुफ्त ऑनलाइन प्लेटफॉर्म। सभी कार्य (फॉर्म भरना, घुमाना, मर्ज करना, हटाना और विभाजित करना) आपके ब्राउज़र में 100% निष्पादित होते हैं।',
      zeroUpload: 'शून्य अपलोड गारंटी: फाइलें कभी किसी सर्वर पर नहीं जातीं',
      toolsTitle: 'पीडीएफ टूल्स',
      securityTitle: 'सुरक्षा और गोपनीयता',
      securityDesc: 'यूरोपीय GDPR नियमों का पूर्ण अनुपालन। ब्राउज़र एक सुरक्षित सैंडबॉक्स बनाता है जो आपके वित्तीय और निजी डेटा की सुरक्षा करता है।',
      privacyPolicy: 'गोपनीयता नीति (Privacy Policy)',
      termsOfService: 'उपयोग की शर्तें (Terms of Service)',
      privacyAndTerms: 'गोपनीयता नीति और नियम',
      copyright: 'सर्वाधिकार सुरक्षित।',
      engine: '100% Client-Side Engine • Powered by pdf-lib & pdfjs-dist',
    },
  },
};
