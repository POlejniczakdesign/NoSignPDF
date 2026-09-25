import { ToolMeta, ToolRoute } from '../types';

export const TOOLS: ToolMeta[] = [
  {
    id: 'hub',
    path: '/',
    name: 'Strona Główna – Wszystkie Narzędzia PDF',
    shortName: 'Wszystkie Narzędzia',
    tagline: 'Zaawansowany kombajn PDF działający w 100% lokalnie w Twojej przeglądarce.',
    description: 'Edytuj, łącz, dziel, obracaj i wypełniaj pliki PDF bez rejestracji i bez wysyłania dokumentów na zewnętrzne serwery.',
    iconName: 'LayoutGrid',
    seoKeywords: [
      'darmowy edytor pdf online',
      'bezpieczny pdf w przeglądarce',
      'narzędzia pdf bez logowania',
      'rodo edycja dokumentów pdf',
      'pdf studio online'
    ],
  },
  {
    id: 'wypelnij',
    path: '/wypelnij-formularz-pdf',
    name: 'Wypełniacz Formularzy PDF',
    shortName: 'Wypełnij Formularz',
    tagline: 'Uzupełniaj wnioski urzędowe, pisma i deklaracje bez drukowania.',
    description: 'Kliknij w dowolne miejsce dokumentu, aby wstawić tekst o wybranym rozmiarze czcionki i precyzyjnie wyrównać go z polami formularza.',
    iconName: 'FileSignature',
    badge: 'NOWY MODUŁ',
    seoKeywords: [
      'wypełnianie formularzy pdf online',
      'jak wypełnić wniosek pdf bez drukowania',
      'edytor tekstu pdf bezpłatnie',
      'wypełnij formularz urzędowy pdf',
      'dopisz tekst do pdf online'
    ],
  },
  {
    id: 'usun',
    path: '/usun-strony-z-pdf',
    name: 'Usuwanie Stron z PDF',
    shortName: 'Usuń Strony',
    tagline: 'Błyskawicznie wytnij niepotrzebne strony lub puste arkusze z dokumentu.',
    description: 'Przejrzyj miniatury stron, jednym kliknięciem usuń wybrane arkusze i pobierz odchudzony plik PDF.',
    iconName: 'FileX',
    seoKeywords: [
      'usuwanie stron z pdf',
      'jak usunąć stronę z pdf za darmo',
      'kasowanie niepotrzebnych kartek z pdf',
      'usuń puste strony pdf online',
      'wycinanie stron pdf'
    ],
  },
  {
    id: 'obroc',
    path: '/obroc-pdf',
    name: 'Obracanie PDF Online',
    shortName: 'Obróć PDF',
    tagline: 'Obracaj pojedyncze strony lub cały dokument o 90°, 180° i 270°.',
    description: 'Napraw krzywo zeskanowane strony dokumentu. Obracaj dowolne arkusze w prawo lub w lewo za pomocą jednego kliknięcia.',
    iconName: 'RotateCw',
    seoKeywords: [
      'obróć pdf online',
      'obracanie stron w pliku pdf',
      'obróć skan pdf o 90 stopni',
      'trwałe obracanie pdf',
      'jak obrócić dokument pdf'
    ],
  },
  {
    id: 'polacz',
    path: '/polacz-pdf',
    name: 'Łączenie Plików PDF (Merge)',
    shortName: 'Połącz PDF',
    tagline: 'Scal wiele plików PDF w jeden spójny dokument o ustalonej kolejności.',
    description: 'Wgraj dowolną liczbę plików PDF, uporządkuj ich kolejność metodą przeciągnij i upuść (Drag & Drop) i pobierz scalony dokument.',
    iconName: 'FileStack',
    seoKeywords: [
      'łączenie pdf w jeden plik',
      'scalanie pdf online za darmo',
      'jak połączyć kilka pdf w jeden',
      'merge pdf bez limitu stron',
      'połącz dokumenty pdf'
    ],
  },
  {
    id: 'rozdziel',
    path: '/rozdziel-pdf',
    name: 'Rozdzielanie PDF (Split & Extract)',
    shortName: 'Rozdziel PDF',
    tagline: 'Wyodrębnij konkretne zakresy stron lub podziel duży plik na mniejsze części.',
    description: 'Wybierz interesujące Cię strony, określ zakres (np. 1-3, 5) lub usuń pozostałe arkusze i zapisz nowy plik.',
    iconName: 'Scissors',
    seoKeywords: [
      'rozdzielanie pdf online',
      'wyciąganie stron z dokumentu pdf',
      'podziel plik pdf na części',
      'split pdf za darmo',
      'ekstrakcja stron pdf'
    ],
  },
  {
    id: 'privacy',
    path: '/polityka-privacy',
    name: 'Regulamin i Polityka Prywatności',
    shortName: 'Regulamin i Prywatność',
    tagline: 'Zasady korzystania, zrzeczenie się odpowiedzialności oraz ochrona danych i cookies.',
    description: 'Oficjalny Regulamin, Zrzeczenie się Odpowiedzialności oraz Polityka Prywatności i Pliki Cookies aplikacji PDF Studio Online.',
    iconName: 'ShieldCheck',
    seoKeywords: [
      'regulamin pdf studio online',
      'polityka prywatności pdf studio online',
      'pliki cookies google adsense ezoic',
      'disclaimer ochrona danych pdf'
    ],
  },
  {
    id: 'pdf-to-word',
    path: '/pdf-to-word',
    name: 'Konwertuj PDF do Word',
    shortName: 'PDF do Word',
    tagline: 'Lokalna ekstrakcja tekstu i natychmiastowa konwersja PDF do formatu Word (.docx / .txt).',
    description: 'Wyodrębnij kompletną warstwę tekstową z plików PDF i pobierz sformatowany dokument Word (.docx) lub plik tekstowy w 100% lokalnie w przeglądarce.',
    iconName: 'FileText',
    badge: 'Nowość',
    seoKeywords: [
      'konwertuj pdf do word',
      'pdf do docx online',
      'ekstrakcja tekstu z pdf',
      'pdf to word za darmo',
      'konwerter pdf docx bez serwera'
    ],
  },
  {
    id: 'word-to-pdf',
    path: '/word-to-pdf',
    name: 'Konwertuj Word do PDF',
    shortName: 'Word do PDF',
    tagline: 'Wklej tekst lub wczytaj dokument i wygeneruj czysty plik PDF czcionką Roboto Mono.',
    description: 'Wbudowany edytor tekstu i generator dokumentów PDF. Wklej treść z programu Word lub prześlij plik tekstowy i pobierz nowy plik PDF.',
    iconName: 'FileUp',
    badge: 'Nowość',
    seoKeywords: [
      'word do pdf online',
      'konwertuj tekst do pdf',
      'wklej tekst generuj pdf',
      'docx do pdf za darmo',
      'edytor tekstu do pdf'
    ],
  },
  {
    id: 'pdf-to-excel',
    path: '/pdf-to-excel',
    name: 'Konwertuj PDF do Excel',
    shortName: 'PDF do Excel',
    tagline: 'Ekstrakcja tabel z PDF i eksport do czystego arkusza CSV / Excel (UTF-8).',
    description: 'Wyciągaj tabele, wiersze i kolumny z dokumentów PDF do pliku CSV z separatorem zgodnym z Microsoft Excel bez wysyłania danych do chmury.',
    iconName: 'FileSpreadsheet',
    badge: 'Nowość',
    seoKeywords: [
      'pdf do excel online',
      'konwertuj tabele pdf do csv',
      'pdf to xlsx za darmo',
      'ekstrakcja tabel pdf',
      'zestawienie pdf do arkusza excel'
    ],
  },
  {
    id: 'excel-to-pdf',
    path: '/excel-to-pdf',
    name: 'Konwertuj Excel do PDF',
    shortName: 'Excel do PDF',
    tagline: 'Wklej tabelę z arkusza lub wczytaj plik CSV i wygeneruj czytelny PDF.',
    description: 'Wklej skopiowane komórki z programu Excel lub arkuszy kalkulacyjnych i wygeneruj elegancki, czytelny raport PDF z siatką danych.',
    iconName: 'Table',
    badge: 'Nowość',
    seoKeywords: [
      'excel do pdf online',
      'wklej tabele do pdf',
      'konwertuj csv do pdf',
      'arkusz kalkulacyjny do pdf',
      'raport z tabeli pdf'
    ],
  },
  {
    id: 'kompresuj',
    path: '/kompresuj-pdf',
    name: 'Kompresuj PDF Online',
    shortName: 'Kompresuj PDF',
    tagline: 'Zmniejsz rozmiar pliku PDF bez utraty czytelności – 100% lokalnie w przeglądarce.',
    description: 'Odchudź dokument PDF do załącznika e-mail lub wniosku urzędowego z zachowaniem ostrego tekstu i grafiki.',
    iconName: 'Minimize2',
    badge: 'Nowość',
    seoKeywords: [
      'kompresuj pdf online',
      'jak zmniejszyć rozmiar pdf',
      'odchudzanie pdf bez utraty jakości',
      'kompresja pdf bez logowania',
      'zmniejsz wagę pliku pdf darmowo'
    ],
  },
  {
    id: 'grafika',
    path: '/grafika-do-pdf',
    name: 'Grafika do PDF Online',
    shortName: 'Grafika do PDF',
    tagline: 'Konwertuj zdjęcia i grafiki JPG, PNG, WebP do czystego pliku PDF.',
    description: 'Połącz pojedyncze lub seryjne zdjęcia w jeden wielostronicowy dokument PDF z automatycznym dopasowaniem formatu i marginesów.',
    iconName: 'Images',
    badge: 'Nowość',
    seoKeywords: [
      'grafika do pdf online',
      'konwertuj jpg do pdf',
      'zdjęcia png do pdf',
      'zrób pdf ze zdjęć za darmo',
      'połącz zdjęcia w jeden pdf'
    ],
  },
];

export interface SeoContentItem {
  h2Title: string;
  intro: string;
  steps: { title: string; desc: string }[];
  benefits: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  extendedText: string;
}

export const SEO_DETAILS: Record<ToolRoute, SeoContentItem> = {
  '/': {
    h2Title: 'Dlaczego PDF Studio Online to najbezpieczniejszy edytor PDF w sieci?',
    intro: 'Większość internetowych konwerterów i edytorów PDF (takich jak iLovePDF czy SmallPDF) wymaga przesłania Twoich poufnych umów, faktur i dokumentów tożsamości na ich serwery. PDF Studio Online działa zupełnie inaczej: całe przetwarzanie odbywa się w 100% po stronie Twojej przeglądarki internetowej przy użyciu nowoczesnych technologii WebAssembly i JavaScript (pdf-lib, pdfjs-dist).',
    steps: [
      {
        title: '1. Wybierz narzędzie z listy',
        desc: 'Skorzystaj z formularza, obracania, łączenia, usuwania lub dzielenia stron.',
      },
      {
        title: '2. Przeciągnij swój plik PDF',
        desc: 'Plik natychmiast otwiera się w Twojej przeglądarce bez wysyłania bajtów do internetu.',
      },
      {
        title: '3. Zapisz gotowy dokument',
        desc: 'Wygeneruj gotowy plik PDF bezpośrednio z pamięci komputera w ułamku sekundy.',
      },
    ],
    benefits: [
      {
        title: '100% Prywatności i Zgodność z RODO',
        desc: 'Zero ryzyka wycieku danych. Żaden serwer ani osoba trzecia nie ma wglądu w treść Twoich plików.',
      },
      {
        title: 'Brak limitów rozmiaru pliku',
        desc: 'Ogranicza Cię tylko pamięć RAM Twojego urządzenia, a nie sztuczne płatne limity transferu.',
      },
      {
        title: 'Działa offline i błyskawicznie',
        desc: 'Nawet po zerwaniu połączenia z internetem możesz edytować i zapisywać swoje pliki PDF.',
      },
    ],
    faqs: [
      {
        q: 'Czy moje pliki PDF są gdziekolwiek zapisywane lub przechowywane?',
        a: 'Absolutnie nie! Pliki PDF nigdy nie opuszczają Twojego urządzenia. Kod aplikacji działa lokalnie w silniku V8 Twojej przeglądarki Chrome, Firefox, Safari lub Edge. Nawet jeśli odłączysz kabel od internetu po załadowaniu strony, program nadal będzie funkcjonował.',
      },
      {
        q: 'Czy korzystanie z narzędzi jest darmowe?',
        a: 'Tak, PDF Studio Online jest w 100% darmowe. Utrzymujemy działanie serwisu z nieinwazyjnych reklam banerowych i krótkich przerw reklamowych podczas pobierania.',
      },
      {
        q: 'Czym różni się ta aplikacja od innych programów online?',
        a: 'Konkurencyjne narzędzia wysyłają każdy plik na odległe serwery w chmurze, co narusza tajemnicę służbową i zasady RODO w firmach. Nasz moduł jest w pełni bezpieczny dla księgowych, prawników, lekarzy i urzędników.',
      },
    ],
    extendedText: 'Profesjonalne zarządzanie dokumentacją w formacie PDF (Portable Document Format) to kluczowy element codziennej pracy biurowej, akademickiej i urzędowej. W dobie rosnącej świadomości dotyczącej cyberbezpieczeństwa oraz restrykcyjnych przepisów o ochronie danych osobowych (RODO / GDPR), przesyłanie wrażliwych formularzy podatkowych (PIT, deklaracje ZUS), wyciągów bankowych czy umów handlowych na nieznane serwery w chmurze rodzi olbrzymie ryzyko. Nasza platforma PDF Studio Online rozwiązuje ten problem raz na zawsze.',
  },
  '/wypelnij-formularz-pdf': {
    h2Title: 'Wypełniaj formularze PDF, wnioski i pisma urzędowe bez drukowania',
    intro: 'Otrzymałeś formularz w formacie PDF, który nie posiada aktywnych pól formularza (tzw. "płaski PDF" lub skan)? Nie musisz go drukować, ręcznie uzupełniać długopisem i ponownie skanować! Nasz Wypełniacz Formularzy PDF pozwala nanieść dowolny tekst precyzyjnie w linijki i kratki dokumentu.',
    steps: [
      {
        title: '1. Załaduj pismo lub wniosek',
        desc: 'Przeciągnij plik PDF na pole robocze – wszystkie strony załadują się w czytelnej wstędze.',
      },
      {
        title: '2. Włącz narzędzie "Dodaj tekst"',
        desc: 'Kliknij w dowolne puste pole lub kratkę dokumentu, aby natychmiast utworzyć ramkę tekstową.',
      },
      {
        title: '3. Wpisz dane i dostosuj rozmiar',
        desc: 'Wpisz swoje dane (imię, nazwisko, PESEL, adres), dobierz rozmiar czcionki (8-24px) i przesuń pole myszką, by idealnie pasowało do linii.',
      },
    ],
    benefits: [
      {
        title: 'Obsługa skanów i płaskich plików PDF',
        desc: 'Możesz uzupełnić każdy dokument, nawet jeśli oryginalny autor nie utworzył interaktywnych pól Acrobat AcroForm.',
      },
      {
        title: 'Płynne przesuwanie i precyzja co do piksela',
        desc: 'Dzięki możliwości przeciągania wprowadzonych pól tekstowych umieścisz tekst dokładnie na linijkach formularza.',
      },
      {
        title: 'Bezpieczne dane wrażliwe (PESEL, NIP, adresy)',
        desc: 'Wprowadzane dane osobowe pozostają wyłącznie w Twoim komputerze i nie są przesyłane do sieci.',
      },
    ],
    faqs: [
      {
        q: 'Jak precyzyjnie trafić w kratki np. numeru konta lub PESEL?',
        a: 'Kliknij w pierwsze pole kratki, wpisz tekst i użyj suwaka wielkości czcionki. Możesz również utworzyć oddzielne pola tekstowe lub swobodnie przeciągnąć napis myszką za uchwyt.',
      },
      {
        q: 'Czy polskie znaki diakrytyczne (ą, ę, ś, ć, ż, ź) są poprawnie zapisywane?',
        a: 'Tak! Nasz silnik pdf-lib w pełni obsługuje kodowanie polskich znaków, dzięki czemu wypełniony dokument wygląda profesjonalnie po wydruku lub przesłaniu do urzędu.',
      },
      {
        q: 'Czy mogę usunąć błędnie dodane pole tekstowe?',
        a: 'Oczywiście. Każde aktywne pole posiada czerwoną ikonę kosza, która natychmiast kasuje dany napis z podglądu.',
      },
    ],
    extendedText: 'Wypełnianie formularzy urzędowych w formacie PDF często sprawia wiele trudności, szczególnie gdy instytucja udostępnia plik będący płaskim skanem bez zdefiniowanych interaktywnych pól tekstowych. W standardowym programie Acrobat Reader użytkownik jest często blokowany koniecznością zakupu płatnej subskrypcji Pro. Moduł Wypełniacz Formularzy PDF w PDF Studio Online daje Ci pełną swobodę wstawiania napisów w dowolnym miejscu, pozycjonowania ich metodą przeciągnij i upuść oraz natychmiastowego zapisu bez znaku wodnego.',
  },
  '/usun-strony-z-pdf': {
    h2Title: 'Usuwanie stron z PDF – jak szybko pozbyć się zbędnych kartek?',
    intro: 'Często zdarza się, że pobrany plik PDF zawiera zbędne strony tytułowe, puste arkusze z drukarki lub reklamy. Narzędzie "Usuń strony z PDF" pozwala wyczyścić dokument w zaledwie kilka sekund.',
    steps: [
      {
        title: '1. Otwórz plik PDF',
        desc: 'Załaduj dokument, aby zobaczyć czytelną siatkę miniatur wszystkich stron.',
      },
      {
        title: '2. Kliknij ikonę kosza',
        desc: 'Wskaż zbędne arkusze i kliknij czerwoną ikonę kosza na ich miniaturach.',
      },
      {
        title: '3. Pobierz oczyszczony plik',
        desc: 'Kliknij "Kompiluj i pobierz PDF", aby otrzymać gotowy plik bez usuniętych stron.',
      },
    ],
    benefits: [
      {
        title: 'Zmniejszenie rozmiaru pliku',
        desc: 'Wycinek niepotrzebnych grafik i stron znacząco redukuje wagę pliku PDF na potrzeby wysyłki e-mailem.',
      },
      {
        title: 'Czystość dokumentacji',
        desc: 'Pozbądź się stron ze stopkami reklamowymi, omyłkowych skanów do góry nogami i pustych stron.',
      },
      {
        title: 'Możliwość cofnięcia lub resetu',
        desc: 'Zawsze możesz ponownie załadować plik lub zresetować kolejność przed ostateczną kompilacją.',
      },
    ],
    faqs: [
      {
        q: 'Czy jakość pozostałych stron ulegnie pogorszeniu?',
        a: 'Nie, nasz program kopiuje bezpośrednie wektory i obiekty PDF ze źródłowego pliku bez powtórnej kompresji stratnej (lossless copy), zachowując 100% ostrości i jakości.',
      },
      {
        q: 'Czy mogę usunąć kilka stron jednocześnie?',
        a: 'Tak, wystarczy po kolei kliknąć ikonę kosza na każdej niechcianej stronie w siatce miniatur.',
      },
    ],
    extendedText: 'W codziennym obiegu dokumentów, archiwizacji faktur oraz przygotowywaniu prezentacji nierzadko zachodzi potrzeba redukcji objętości pliku poprzez usunięcie pustych kartek lub nieaktualnych załączników. Dzięki wizualnemu podglądowi miniatur w PDF Studio Online masz całkowitą pewność, które arkusze usuwasz, eliminując ryzyko przypadkowego skasowania ważnych treści.',
  },
  '/obroc-pdf': {
    h2Title: 'Obracanie stron w plikach PDF – napraw krzywe skany dokumentów',
    intro: 'Dokument zeskanowany do góry nogami lub w orientacji poziomej zamiast pionowej? Dzięki narzędziu "Obracanie PDF" skorygujesz kąt każdej strony z osobna lub całego dokumentu hurtowo.',
    steps: [
      {
        title: '1. Załaduj krzywy PDF',
        desc: 'Przeciągnij plik – od razu zobaczysz orientację wszystkich stron na miniaturach.',
      },
      {
        title: '2. Kliknij ikonę obrotu',
        desc: 'Każde kliknięcie obraca wybraną stronę o 90 stopni zgodnie z ruchem wskazówek zegara (90°, 180°, 270°).',
      },
      {
        title: '3. Zapisz wyprostowany dokument',
        desc: 'Pobierz plik ze skorygowaną orientacją stron, gotowy do druku i prezentacji.',
      },
    ],
    benefits: [
      {
        title: 'Niezależna rotacja stron',
        desc: 'Możesz obrócić np. tylko stronę 3 (szeroką tabelę Excela w poziomie), pozostawiając resztę stron w pionie.',
      },
      {
        title: 'Hurtowy obrót jednym przyciskiem',
        desc: 'Dostępna opcja obrotu wszystkich stron o 90 stopni za jednym kliknięciem.',
      },
      {
        title: 'Trwały zapis metadanych rotacji',
        desc: 'Obrót jest zapisywany w strukturze PDF /Rotate, dzięki czemu otwiera się poprawnie w każdym czytniku.',
      },
    ],
    faqs: [
      {
        q: 'Czy po zapisaniu obrót będzie widoczny w Adobe Reader i w telefonie?',
        a: 'Tak! Zmiana kąta rotacji jest wpisywana bezpośrednio do specyfikacji PDF, dlatego każdy program zewnętrzny i urządzenie mobilne wyświetli stronę we właściwym kierunku.',
      },
      {
        q: 'Czy mogę odwrócić dokument z widoku poziomego (Landscape) do pionowego (Portrait)?',
        a: 'Tak, wystarczy obrócić stronę o 90° lub 270° w zależności od kierunku ułożenia tekstu.',
      },
    ],
    extendedText: 'Niepoprawna orientacja stron to jedna z najczęstszych bolączek podczas skanowania wielostronicowych umów za pomocą biurowych urządzeń wielofunkcyjnych. Ręczne obracanie widoku w czytniku PDF jest jedynie tymczasowe i nie zapisuje się w pliku. Nasze narzędzie trwale modyfikuje atrybut rotacji stron bez utraty jakości wektorów, czcionek i grafiki.',
  },
  '/polacz-pdf': {
    h2Title: 'Łączenie wielu plików PDF w jeden dokument (Merge PDF)',
    intro: 'Połącz kilka oddzielnych plików PDF w jeden spójny dokument. Idealne do składania ofert handlowych, prac dyplomowych, załączników do urzędów czy zestawień faktur.',
    steps: [
      {
        title: '1. Wgraj pliki PDF',
        desc: 'Wybierz dwa lub więcej plików PDF z dysku komputera lub telefonu.',
      },
      {
        title: '2. Ułóż kolejność stron i plików',
        desc: 'Przeciągaj miniatury metodą Drag & Drop, aby ustalić idealną sekwencję stron.',
      },
      {
        title: '3. Scal i pobierz plik',
        desc: 'Kliknij "Kompiluj i pobierz PDF" – nowy, połączony dokument zostanie utworzony w kilka sekund.',
      },
    ],
    benefits: [
      {
        title: 'Brak limitu liczby plików',
        desc: 'Możesz scalić tyle dokumentów, ile potrzebujesz, bez konieczności płacenia abonamentu.',
      },
      {
        title: 'Mieszanie i przeplatanie stron',
        desc: 'Możesz nie tylko łączyć całe pliki, ale też swobodnie przestawiać pojedyncze strony pomiędzy różnymi dokumentami.',
      },
      {
        title: 'Szybkość działania',
        desc: 'Brak czasu oczekiwania na upload i download gigabajtów danych przez powolne łącze internetowe.',
      },
    ],
    faqs: [
      {
        q: 'Czy mogę dołączyć kolejny plik po załadowaniu pierwszego?',
        a: 'Tak! W pasku narzędzi znajduje się przycisk "Dodaj więcej plików PDF", który pozwala na bieżąco dokładać kolejne dokumenty do edycji.',
      },
      {
        q: 'Czy zakładki i spis treści zostaną zachowane?',
        a: 'Podstawowa zawartość wektorowa, tekstowa i graficzna wszystkich stron zostaje nienaruszona.',
      },
    ],
    extendedText: 'Wielu użytkowników boryka się z problemem łączenia dokumentów pochodzących z różnych źródeł: wydruków z programu księgowego, skanów podpisanych aneksów oraz załączników graficznych. PDF Studio Online oferuje intuicyjny wizualny pulpit roboczy, w którym każdy plik reprezentowany jest przez miniatury stron, gotowe do natychmiastowego przeorganizowania.',
  },
  '/rozdziel-pdf': {
    h2Title: 'Rozdzielanie PDF – wyciągaj wybrane strony i twórz nowe dokumenty',
    intro: 'Potrzebujesz tylko stron 2-4 z 50-stronicowej instrukcji lub umowy? Użyj narzędzia do dzielenia PDF, aby wyekstrahować dokładnie te arkusze, które Cię interesują.',
    steps: [
      {
        title: '1. Załaduj wielostronicowy plik',
        desc: 'Otwórz dokument, aby przeanalizować wszystkie jego strony w siatce miniatur.',
      },
      {
        title: '2. Wybierz zakres stron',
        desc: 'Wpisz zakres (np. 1-3, 5) lub klikaj miniatury, usuwając niepotrzebne strony z nowego pliku.',
      },
      {
        title: '3. Zapisz wyodrębniony plik',
        desc: 'Pobierz nowy, mniejszy dokument zawierający wyłącznie pożądane strony.',
      },
    ],
    benefits: [
      {
        title: 'Wygodne szybkie zaznaczanie',
        desc: 'Wpisz zakres w formacie tekstowym lub kliknij w interaktywne miniatury.',
      },
      {
        title: 'Ochrona poufności',
        desc: 'Przesyłaj kontrahentom tylko tę część umowy, która ich dotyczy, bez ujawniania reszty dokumentu.',
      },
      {
        title: 'Błyskawiczny eksport',
        desc: 'Nowy plik PDF generowany jest w pamięci podręcznej przeglądarki w ułamku sekundy.',
      },
    ],
    faqs: [
      {
        q: 'W jaki sposób mogę wpisać zakres stron do wyodrębnienia?',
        a: 'Możesz wpisać np. "1-5" (strony od 1 do 5) lub "1, 3, 5-7" w polu szybkiego wyboru stron, a aplikacja automatycznie zachowa tylko te arkusze.',
      },
      {
        q: 'Czy oryginalny plik na moim dysku zostanie nadpisany lub zmieniony?',
        a: 'Nie, Twoje oryginalne pliki na dysku pozostają w 100% nienaruszone. Aplikacja jedynie generuje nowy plik do pobrania.',
      },
    ],
    extendedText: 'Dzielenie i ekstrakcja stron z dokumentu PDF jest niezastąpiona, gdy przesyłasz dokumenty przez e-mail z limitem załącznika do 25 MB lub gdy chcesz udostępnić wybrane rozdziały książki lub instrukcji obsługi bez dzielenia się całością materiału.',
  },
  '/polityka-privacy': {
    h2Title: 'Polityka Prywatności i Pliki Cookies – PDF Studio Online',
    intro: 'Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies w aplikacji PDF Studio Online. Naszym priorytetem jest pełna transparentność i maksymalne bezpieczeństwo Twoich dokumentów.',
    steps: [
      {
        title: '1. Lokalne przetwarzanie w pamięci RAM',
        desc: 'Pliki przetwarzane są wyłącznie w przeglądarce przy użyciu bibliotek pdf-lib oraz pdf.js.',
      },
      {
        title: '2. Zero transferu na serwer',
        desc: 'Żadne pliki PDF ani dane osobowe nie są wysyłane na serwery ani udostępniane podmiotom trzecim.',
      },
      {
        title: '3. Pliki cookies stron trzecich',
        desc: 'Partnerzy reklamowi (Google AdSense, Ezoic) używają cookies w celu personalizacji reklam.',
      },
    ],
    benefits: [
      {
        title: '100% Client-Side Privacy',
        desc: 'Brak serwera przechowującego Twoje pliki – natychmiastowe usuwanie danych po zamknięciu karty.',
      },
      {
        title: 'Zgodność z RODO i standardami AdSense',
        desc: 'Pełna przejrzystość przetwarzania danych i możliwość wyłączenia reklam spersonalizowanych.',
      },
    ],
    faqs: [
      {
        q: 'Gdzie trafiają moje pliki PDF?',
        a: 'Nigdzie – pozostają wyłącznie w pamięci operacyjnej Twojego urządzenia i znikają po zakończeniu sesji.',
      },
      {
        q: 'Jak mogę wyłączyć pliki cookies reklamowe?',
        a: 'Możesz zarządzać preferencjami w Ustawieniach reklam Google lub na stronie www.aboutads.info.',
      },
    ],
    extendedText: 'W PDF Studio Online dbamy o najwyższe standardy ochrony prywatności naszych użytkowników oraz pełną przejrzystość w zakresie użycia technologii cookies sieci reklamowych Google AdSense i Ezoic.',
  },
  '/pdf-to-word': {
    h2Title: 'Konwertuj PDF do Word (.docx) Online – Bezpłatna Ekstrakcja Tekstu',
    intro: 'Wyodrębnij kompletną warstwę tekstową z dokumentów PDF do edytowalnego formatu Word (.docx) lub pliku tekstowego. Narzędzie działa w 100% lokalnie w Twojej przeglądarce, co gwarantuje pełne bezpieczeństwo poufnych pism i umów.',
    steps: [
      {
        title: '1. Dodaj plik PDF',
        desc: 'Przeciągnij i upuść dokument PDF lub wybierz plik z dysku komputera.',
      },
      {
        title: '2. Błyskawiczna analiza tekstu',
        desc: 'Silnik pdfjs-dist wyciąga zawartość tekstową z zachowaniem akapitów i podziału na strony.',
      },
      {
        title: '3. Pobierz dokument Word',
        desc: 'Pobierz gotowy plik .docx kompatybilny z Microsoft Word, LibreOffice i Google Docs lub skopiuj treść do schowka.',
      },
    ],
    benefits: [
      {
        title: '100% Prywatności i Poufności',
        desc: 'Żadne teksty, umowy ani dane osobowe nie opuszczają Twojego urządzenia. Konwersja zachodzi wyłącznie w pamięci RAM.',
      },
      {
        title: 'Kompatybilność z Edytorami',
        desc: 'Wygenerowane dokumenty możesz od razu otwierać i modyfikować w MS Word, Google Docs i edytorach tekstu.',
      },
      {
        title: 'Brak limitów stron',
        desc: 'Konwertuj bezpłatnie wielostronicowe raporty, artykuły naukowe oraz opracowania.',
      },
    ],
    faqs: [
      {
        q: 'Czy konwerter PDF do Word jest bezpłatny?',
        a: 'Tak, konwersja jest w 100% bezpłatna i nie wymaga rejestracji konta ani instalacji oprogramowania.',
      },
      {
        q: 'Czy moje pliki trafiają na serwer?',
        a: 'Nie, wszystkie operacje ekstrakcji tekstu są realizowane lokalnie na Twoim komputerze za pomocą technologii JavaScript.',
      },
    ],
    extendedText: 'Konwersja PDF do formatu Word jest nieoceniona, gdy potrzebujesz edytować treść pism, skopiować fragmenty raportów lub poprawić błędy w zablokowanym dokumencie. Dzięki lokalnej architekturze PDF Studio Online masz pewność, że dane wrażliwe pozostają całkowicie bezpieczne.',
  },
  '/word-to-pdf': {
    h2Title: 'Konwertuj Word / Tekst do PDF Online – Czysty Format i Polskie Znaki',
    intro: 'Wklej tekst skopiowany z programu Word lub wczytaj plik tekstowy, a nasz generator stworzy dla Ciebie czysty, elegancko sformatowany dokument PDF z pełną obsługą polskich znaków diakrytycznych.',
    steps: [
      {
        title: '1. Wklej tekst lub wczytaj plik',
        desc: 'Wklej zawartość dokumentu Word lub prześlij plik tekstowy (.txt, .rtf, .doc).',
      },
      {
        title: '2. Dopasuj formatowanie',
        desc: 'Wybierz orientację strony (pionowa lub pozioma), rozmiar czcionki i marginesy.',
      },
      {
        title: '3. Wygeneruj i pobierz PDF',
        desc: 'Kliknij przycisk generowania i pobierz gotowy plik PDF o wysokiej jakości druku.',
      },
    ],
    benefits: [
      {
        title: 'Niezawodna czcionka Roboto Mono',
        desc: 'Pełna obsługa polskich liter (ą, ć, ę, ł, ń, ó, ś, ź, ż) bez ryzyka przekłamań kodowania znaków.',
      },
      {
        title: 'Automatyczne dzielenie stron',
        desc: 'Długie teksty są płynnie dzielone na kolejne strony z numeracją w stopce.',
      },
      {
        title: 'Natychmiastowe działanie',
        desc: 'Brak kolejek serwerowych – plik PDF jest kompilowany natychmiastowo w Twojej przeglądarce.',
      },
    ],
    faqs: [
      {
        q: 'Jak przenieść treść z programu Word?',
        a: 'Wystarczy zaznaczyć tekst w Wordzie (Ctrl+A), skopiować go (Ctrl+C) i wkleić do pola edytora w aplikacji (Ctrl+V).',
      },
      {
        q: 'Czy mogę zmienić marginesy i orientację strony?',
        a: 'Tak, edytor pozwala wybrać orientację pionową lub poziomą oraz dostosować wielkość interlinii i marginesów.',
      },
    ],
    extendedText: 'Generowanie plików PDF z czystego tekstu to najszybszy sposób na przygotowanie oficjalnych oświadczeń, protokołów, instrukcji i umów, które będą wyglądały identycznie na każdym urządzeniu i systemie operacyjnym.',
  },
  '/pdf-to-excel': {
    h2Title: 'Konwertuj PDF do Excel (.csv) – Ekstrakcja Tabel i Danych Liczbowych',
    intro: 'Wyodrębnij struktury tabelaryczne, kolumny i wiersze z raportów finansowych, faktur oraz zestawień PDF do pliku CSV zoptymalizowanego pod Microsoft Excel z kodowaniem UTF-8 BOM.',
    steps: [
      {
        title: '1. Prześlij plik PDF z tabelą',
        desc: 'Wybierz dokument zawierający zestawienia danych, faktury lub tabele.',
      },
      {
        title: '2. Automatyczne wykrywanie wierszy i kolumn',
        desc: 'Algorytm geometryczny grupuje tekst w równe komórki tabeli.',
      },
      {
        title: '3. Pobierz arkusz CSV dla Excela',
        desc: 'Pobierz plik ze średnikiem jako separatorem (standard polskiego Excela) i kodowaniem UTF-8.',
      },
    ],
    benefits: [
      {
        title: 'Kodowanie UTF-8 BOM',
        desc: 'Polskie znaki diakrytyczne otwierają się poprawnie w Microsoft Excel bez krzaczków.',
      },
      {
        title: 'Podgląd tabeli przed pobraniem',
        desc: 'Zobacz wyodrębnione komórki i wiersze bezpośrednio w przeglądarce.',
      },
      {
        title: 'Bezpieczeństwo danych finansowych',
        desc: 'Sprawozdania finansowe i wyciągi bankowe nie trafiają do zewnętrznej chmury.',
      },
    ],
    faqs: [
      {
        q: 'Czy wyodrębniony plik CSV otwiera się bezpośrednio w Excelu?',
        a: 'Tak, plik zawiera znacznik UTF-8 BOM oraz separator średnikowy, dzięki czemu polski Excel automatycznie rozdziela dane na kolumny.',
      },
      {
        q: 'Co jeśli tabela ma skomplikowany układ?',
        a: 'Nasz edytor pozwala podejrzeć dane, skopiować je bezpośrednio do arkusza kalkulacyjnego lub skorygować separator.',
      },
    ],
    extendedText: 'Ręczne przepisywanie liczb z raportów PDF do arkusza kalkulacyjnego zajmuje godziny. Dzięki modułowi PDF do Excel w PDF Studio Online zaoszczędzisz czas, przetwarzając tabele z wyciągów, cenników i specyfikacji technicznych w kilka sekund.',
  },
  '/excel-to-pdf': {
    h2Title: 'Konwertuj Excel / Tabelę do PDF – Eleganckie Raporty i Wykresy Danych',
    intro: 'Wklej skopiowaną tabelę z Microsoft Excel, Google Sheets lub pliku CSV i przekształć ją w przejrzysty, gotowy do druku raport PDF z czytelnym podziałem kolumn.',
    steps: [
      {
        title: '1. Skopiuj komórki z arkusza',
        desc: 'Zaznacz i skopiuj tabelę w Excelu lub Sheets, a następnie wklej ją w edytorze.',
      },
      {
        title: '2. Dopasuj parametry tabeli',
        desc: 'Włącz poziomy układ strony (zalecany dla szerokich tabel) oraz linie siatki.',
      },
      {
        title: '3. Wygeneruj gotowy plik PDF',
        desc: 'Pobierz profesjonalnie wyjustowany dokument PDF z estetyczną tabelą danych.',
      },
    ],
    benefits: [
      {
        title: 'Idealne dopasowanie szerokości',
        desc: 'Kolumny są automatycznie skalowane na szerokość strony z zachowaniem czytelności.',
      },
      {
        title: 'Tryb poziomy (Landscape)',
        desc: 'Szerokie tabele z wieloma kolumnami mieszczą się bez ucinania krawędzi.',
      },
      {
        title: 'Elegancka typografia',
        desc: 'Wyraźna czcionka o stałej szerokości znaków zapewnia perfekcyjne wyrównanie liczb.',
      },
    ],
    faqs: [
      {
        q: 'Jak wkleić dane z Excela?',
        a: 'Zaznacz pożądany zakres komórek w Excelu, naciśnij Ctrl+C, przejdź do naszej aplikacji i naciśnij Ctrl+V w oknie edytora.',
      },
      {
        q: 'Czy mogę wczytać plik CSV?',
        a: 'Tak, możesz przeciągnąć i upuścić plik .csv lub .tsv bezpośrednio na pole edytora.',
      },
    ],
    extendedText: 'Konwersja tabeli z Excela do pliku PDF to idealny sposób na przesłanie oferty handlowej, cennika lub raportu sprzedażowego klientom w formacie zabezpieczonym przed przypadkową modyfikacją komórek.',
  },
  '/kompresuj-pdf': {
    h2Title: 'Kompresja PDF Online – Jak skutecznie zmniejszyć rozmiar pliku bez utraty jakości?',
    intro: 'Twój plik PDF jest zbyt duży, aby wysłać go pocztą elektroniczną lub załączyć we wniosku urzędowym (np. ePUAP)? Nasze narzędzie pozwala błyskawicznie skompresować i zoptymalizować dokument PDF bezpośrednio w pamięci przeglądarki.',
    steps: [
      {
        title: '1. Wybierz lub przeciągnij plik PDF',
        desc: 'Załaduj dokument – od razu zobaczysz jego bieżącą wagę oraz liczbę stron.',
      },
      {
        title: '2. Wybierz poziom kompresji',
        desc: 'Skorzystaj z zalecanej kompresji dla idealnego balansu ostrości lub maksymalnej kompresji dla najmniejszego pliku.',
      },
      {
        title: '3. Pobierz odchudzony plik',
        desc: 'Zobacz dokładną oszczędność w procentach i pobierz zoptymalizowany plik bez znaków wodnych.',
      },
    ],
    benefits: [
      {
        title: 'Brak wysyłki na serwer (100% Prywatności)',
        desc: 'Optymalizacja zachodzi lokalnie w przeglądarce, co gwarantuje pełne bezpieczeństwo poufnych umów i faktur.',
      },
      {
        title: 'Wybór siły kompresji',
        desc: 'Dopasuj stopień redukcji do własnych potrzeb: od lekkiej optymalizacji po silną kompresję do e-maili.',
      },
      {
        title: 'Brak utraty czytelności czcionek',
        desc: 'Wektory tekstowe i formularze pozostają ostre i idealne do wydruku.',
      },
    ],
    faqs: [
      {
        q: 'Czy jakość tekstu w dokumencie ulegnie pogorszeniu?',
        a: 'Nie, algorytm traktuje warstwę wektorową priorytetowo, zachowując perfekcyjną ostrość liter.',
      },
      {
        q: 'Czy plik po kompresji zmieści się w limitach e-mail (np. 10 MB / 25 MB)?',
        a: 'Tak, kompresja redukuje zbędne metadane i strumienie grafik, pozwalając zaoszczędzić od 30% do nawet 70% pierwotnej wagi pliku.',
      },
    ],
    extendedText: 'Redukcja objętości dokumentacji w formacie PDF jest niezbędna w codziennym funkcjonowaniu każdego biura. Zamiast instalować ciężkie programy komercyjne lub powierzać wrażliwe umowy obcym serwerom, skorzystaj z bezpiecznej technologii Client-Side.',
  },
  '/grafika-do-pdf': {
    h2Title: 'Konwertuj Grafikę do PDF – Zmień JPG, PNG i WebP w gotowy dokument PDF',
    intro: 'Masz zdjęcia dokumentów, paragonów, grafik lub slajdów w formatach JPG, PNG lub WebP? Z łatwością przekształć je w jeden wielostronicowy, profesjonalny plik PDF o wybranym formacie arkusza.',
    steps: [
      {
        title: '1. Dodaj zdjęcia i grafiki',
        desc: 'Przeciągnij jedno lub kilkanaście zdjęć jednocześnie – system natychmiast utworzy miniatury.',
      },
      {
        title: '2. Ustal kolejność i parametry',
        desc: 'Przesuwaj zdjęcia w górę i w dół, wybierz format A4 lub dopasowanie do oryginalnych wymiarów.',
      },
      {
        title: '3. Pobierz gotowy dokument PDF',
        desc: 'Kliknij przycisk generowania i pobierz gotowy plik PDF w ułamku sekundy.',
      },
    ],
    benefits: [
      {
        title: 'Obsługa wielu formatów graficznych',
        desc: 'Pełna zgodność z JPG, JPEG, PNG oraz nowoczesnymi plikami WebP.',
      },
      {
        title: 'Łączenie seryjne',
        desc: 'Możesz scalić nieograniczoną liczbę zdjęć w jeden dokument wielostronicowy.',
      },
      {
        title: 'Automatyczne dopasowanie proporcji',
        desc: 'Brak zniekształceń proporcji zdjęć – grafiki są idealnie wyśrodkowane na arkuszu.',
      },
    ],
    faqs: [
      {
        q: 'Czy mogę zmienić kolejność zdjęć przed zapisaniem PDF?',
        a: 'Tak, każda grafika posiada przyciski zmiany kolejności (w górę/w dół), dzięki czemu możesz dowolnie ustalić chronologię stron.',
      },
      {
        q: 'Czy moje zdjęcia są bezpieczne?',
        a: 'Tak, przetwarzanie zdjęć odbywa się wyłącznie w Twojej pamięci RAM, bez przesyłania jakichkolwiek plików do chmury.',
      },
    ],
    extendedText: 'Tworzenie dokumentów PDF ze zdjęć wykonanych smartfonem to najwygodniejszy sposób na przesyłanie umów, faktur, notatek ze spotkań czy dokumentacji technicznej w jednym spójnym pliku.',
  },
};
