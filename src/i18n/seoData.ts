import { ToolRoute } from '../types';
import { Language } from './translations';

export interface SeoStepItem {
  title: string;
  desc: string;
}

export interface SeoBenefitItem {
  title: string;
  desc: string;
}

export interface SeoFaqItem {
  q: string;
  a: string;
}

export interface LocalizedSeoContent {
  h2Title: string;
  intro: string;
  steps: SeoStepItem[];
  benefits: SeoBenefitItem[];
  faqs: SeoFaqItem[];
  extendedText: string;
  keywords: string[];
}

export const SEO_TRANSLATIONS: Record<Language, Partial<Record<ToolRoute, LocalizedSeoContent>>> = {
  pl: {
    '/': {
      h2Title: 'Dlaczego PDF Studio Online to najbezpieczniejszy edytor PDF w sieci?',
      intro: 'Większość internetowych konwerterów i edytorów PDF (takich jak iLovePDF czy SmallPDF) wymaga przesłania Twoich poufnych umów, faktur i dokumentów tożsamości na ich serwery. PDF Studio Online działa zupełnie inaczej: całe przetwarzanie odbywa się w 100% po stronie Twojej przeglądarki internetowej przy użyciu silnika WebAssembly i JavaScript (pdf-lib, pdfjs-dist).',
      steps: [
        {
          title: '1. Wybierz narzędzie z listy',
          desc: 'Skorzystaj z wypełniacza formularzy, obracania, łączenia, usuwania lub dzielenia stron.',
        },
        {
          title: '2. Przeciągnij swój plik PDF',
          desc: 'Plik natychmiast otwiera się w Twojej przeglądarce bez wysyłania bajtów do internetu.',
        },
        {
          title: '3. Zapisz gotowy dokument',
          desc: 'Wygeneruj gotowy plik PDF bezpośrednio z pamięci RAM komputera w ułamku sekundy.',
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
          q: 'Czy moje pliki są bezpieczne?',
          a: 'Tak, w 100% bezpieczne. Tradycyjne serwisy PDF wysyłają Twoje pliki na zewnętrzne serwery w chmurze, gdzie są one zapisywane w logach i bazach danych. W nosignpdf.com wdrożyliśmy bezpieczny silnik Client-Side — pliki otwierają się wyłącznie w izolowanym środowisku (Sandbox) Twojej przeglądarki. Zero data collection / prywatność gwarantowana: nasz serwer nie widzi ani jednego bajtu Twoich dokumentów.',
        },
        {
          q: 'Czy nosignpdf.com to darmowy edytor pdf bez logowania i bez znaków wodnych?',
          a: 'Tak! Jest to w 100% darmowy edytor pdf bez logowania, bez rejestracji i bez znaków wodnych. Pobierasz czyste, oryginalne dokumenty natychmiast po edycji.',
        },
        {
          q: 'Jak szybki jest edytor w porównaniu do narzędzi chmurowych?',
          a: 'Jest ultra szybki, ponieważ nie marnujesz czasu na upload i download ciężkich plików przez internet. Wszystkie obliczenia wykonuje procesor Twojego urządzenia w pamięci RAM w ułamku sekundy, nawet w trybie offline.',
        },
      ],
      extendedText: 'Profesjonalne zarządzanie dokumentacją w formacie PDF (Portable Document Format) to kluczowy element codziennej pracy biurowej, akademickiej i urzędowej. W dobie rosnącej świadomości dotyczącej cyberbezpieczeństwa oraz restrykcyjnych przepisów o ochronie danych osobowych (RODO / GDPR), przesyłanie wrażliwych formularzy podatkowych (PIT, deklaracje ZUS), wyciągów bankowych czy umów handlowych na nieznane serwery w chmurze rodzi olbrzymie ryzyko. Nasza platforma PDF Studio Online rozwiązuje ten problem.',
      keywords: ['darmowy edytor pdf online', 'bezpieczny pdf w przeglądarce', 'narzędzia pdf bez logowania', 'rodo edycja dokumentów pdf', 'pdf studio online'],
    },
    '/wypelnij-formularz-pdf': {
      h2Title: 'Wypełniacz Formularzy PDF – Natywne pola AcroForm bez drukowania',
      intro: 'Potrzebujesz pilnie uzupełnić wniosek urzędowy, oświadczenie, deklarację podatkową lub umowę w formacie PDF? PDF Studio Online umożliwia automatyczne wykrycie natywnych pól formularza (AcroForms) oraz tworzenie nowych cyfrowych pól tekstowych i checkboxów bez drukowania i skanowania papieru.',
      steps: [
        {
          title: '1. Otwórz formularz PDF',
          desc: 'Wgraj plik z dysku lub przeciągnij go do okna aplikacji. Silnik automatycznie rozpozna istniejące pola formularza.',
        },
        {
          title: '2. Wypełnij pola lub dodaj nowe',
          desc: 'Kliknij bezpośrednio w kratki i wpisz tekst. Jeżeli dokument to płaski skan, użyj przycisku „Dodaj Pole Tekstowe”, aby wstawić cyfrowe pole w strukturę pliku.',
        },
        {
          title: '3. Zapisz wypełniony PDF',
          desc: 'Kliknij „Zapisz i pobierz wypełniony PDF”. Dane zostaną trwale i oficjalnie zapisane w strukturze AcroForm dokumentu.',
        },
      ],
      benefits: [
        {
          title: 'Natywna integracja AcroForms',
          desc: 'Pola stają się oficjalną częścią specyfikacji PDF – są w pełni czytelne dla urzędów, banków i programu Adobe Acrobat.',
        },
        {
          title: 'Brak konieczności drukowania',
          desc: 'Oszczędzasz papier, tusz oraz czas spędzony na ręcznym skanowaniu formularzy.',
        },
        {
          title: 'Bezpieczeństwo danych osobowych',
          desc: 'Twój numer PESEL, NIP, adres i zarobki nie trafią na żaden zewnętrzny serwer.',
        },
      ],
      faqs: [
        {
          q: 'Czy formularz zachowa edytowalność w innych programach?',
          a: 'Tak! Zapisujemy dane jako oficjalne pola AcroForm zgodnie ze standardem ISO 32000 PDF. Gdy otworzysz plik w programie Adobe Acrobat Reader lub przeglądarce urzędowej, wszystkie pola będą widoczne i edytowalne.',
        },
        {
          q: 'Co jeśli mój PDF to skan papieru bez aktywnych pól?',
          a: 'Skorzystaj z narzędzia „Dodaj Pole Tekstowe” lub „Dodaj Checkbox” w górnym pasku. Po kliknięciu w dowolną linijkę skanu aplikacja wygeneruje natywne pole formularza dokładnie w tym miejscu.',
        },
      ],
      extendedText: 'Większość pism urzędowych i deklaracji w Polsce dostarczana jest w formacie PDF. Wiele z nich to tzw. „martwe” formularze lub dokumenty ze starymi strukturami. Dzięki technologii pdf-lib nasza platforma pozwala błyskawicznie ożywić każdy dokument, wprowadzając certyfikowane pola wejściowe bezpośrednio na Twoim komputerze.',
      keywords: ['wypełnianie formularzy pdf online', 'jak wypełnić wniosek pdf bez drukowania', 'acroforms edytor pdf', 'wypełnij formularz urzędowy pdf', 'darmowy edytor tekstu pdf'],
    },
    '/usun-strony-z-pdf': {
      h2Title: 'Jak bezpiecznie usunąć wybrane strony z pliku PDF?',
      intro: 'Otrzymałeś wielostronicowy dokument, z którego musisz usunąć niepotrzebne strony tytułowe, puste arkusze, regulaminy lub załączniki? Nasze narzędzie pozwala w ułamku sekundy przejrzeć miniatury stron i usunąć niechciane arkusze bez utraty jakości.',
      steps: [
        {
          title: '1. Załaduj dokument',
          desc: 'Wybierz plik PDF z dysku. Silnik natychmiast wygeneruje czytelne miniatury wszystkich stron.',
        },
        {
          title: '2. Wskaż strony do usunięcia',
          desc: 'Kliknij ikonę kosza na niepotrzebnych arkuszach lub zaznacz je za pomocą pól wyboru.',
        },
        {
          title: '3. Pobierz odchudzony plik',
          desc: 'Kliknij przycisk pobierania. Nowy plik PDF zostanie skompilowany bezpośrednio w pamięci RAM.',
        },
      ],
      benefits: [
        {
          title: 'Brak utraty jakości rastrowej',
          desc: 'Teksty wektorowe, czcionki i grafiki w zachowanych stronach pozostają w 100% nienaruszone.',
        },
        {
          title: 'Zmniejszenie wagi pliku',
          desc: 'Usunięcie zbędnych stron drastycznie zmniejsza rozmiar pliku, ułatwiając wysyłkę e-mailem.',
        },
        {
          title: 'Poufność dokumentów',
          desc: 'Usuwane strony są natychmiast niszczone w pamięci podręcznej przeglądarki.',
        },
      ],
      faqs: [
        {
          q: 'Czy mogę cofnąć usunięcie strony przed pobraniem?',
          a: 'Tak! Wystarczy kliknąć przycisk „Zresetuj” lub ponownie załadować plik, aby przywrócić pierwotny stan dokumentu.',
        },
        {
          q: 'Czy usunięcie strony wpływa na interaktywne linki?',
          a: 'Struktura pozostałych stron jest zachowywana, a wewnętrzne odnośniki w ramach tych stron działają poprawnie.',
        },
      ],
      extendedText: 'Częstym problemem w pracy z umowami i skanami jest obecność pustych stron lub poufnych aneksów, których nie chcemy przekazywać klientowi. Usuwanie stron w PDF Studio Online jest szybkie, intuicyjne i całkowicie bezpieczne.',
      keywords: ['usuwanie stron z pdf', 'jak usunąć stronę z pdf za darmo', 'kasowanie niepotrzebnych kartek z pdf', 'usuń puste strony pdf online', 'wycinanie stron pdf'],
    },
    '/obroc-pdf': {
      h2Title: 'Obracanie stron w pliku PDF – Obróć o 90°, 180° i 270°',
      intro: 'Zeskanowałeś dokument do góry nogami lub w orientacji poziomej zamiast pionowej? Z narzędziem Obróć PDF możesz jednym kliknięciem trwale obrócić każdą stronę o 90 stopni w prawo lub obrócić cały plik jednocześnie.',
      steps: [
        {
          title: '1. Dodaj plik PDF',
          desc: 'Przeciągnij dokument do okna przeglądarki. Miniatury natychmiast pokażą orientację arkuszy.',
        },
        {
          title: '2. Obróć strony',
          desc: 'Użyj przycisku obrotu na miniaturze danej strony lub obróć wszystkie strony jednocześnie.',
        },
        {
          title: '3. Zapisz zrotowany dokument',
          desc: 'Pobierz gotowy dokument z poprawną orientacją stron zapisaną w metadanych PDF.',
        },
      ],
      benefits: [
        {
          title: 'Trwały zapis orientacji',
          desc: 'Obrót zostaje na stałe wpisany do tagu Rotate pliku PDF, więc dokument wyświetli się poprawnie na każdym urządzeniu.',
        },
        {
          title: 'Niezależny obrót stron',
          desc: 'Możesz obrócić wyłącznie stronę 2 i 4, pozostawiając stronę 1 i 3 bez zmian.',
        },
        {
          title: 'Błyskawiczna prędkość',
          desc: 'Brak konieczności przesyłania gigabajtów danych przez internet sprawia, że proces trwa ułamek sekundy.',
        },
      ],
      faqs: [
        {
          q: 'Czy obracanie zmniejsza ostrość zeskanowanego tekstu?',
          a: 'Nie. Modyfikujemy jedynie flagę rotacji w nagłówku strony PDF. Warstwa rastrowa i wektorowa nie ulegają ponownej kompresji.',
        },
        {
          q: 'Czy mogę obrócić dokument o 180 stopni?',
          a: 'Tak, wystarczy dwukrotnie kliknąć przycisk obrotu o 90 stopni na wybranej karcie.',
        },
      ],
      extendedText: 'Błędy automatycznych podajników skanerów biurowych często skutkują odwróconą orientacją arkuszy. Dzięki PDF Studio Online skorygujesz błędy skanowania bez konieczności instalowania płatnego oprogramowania.',
      keywords: ['obróć pdf online', 'obracanie stron w pliku pdf', 'obróć skan pdf o 90 stopni', 'trwałe obracanie pdf', 'jak obrócić dokument pdf'],
    },
    '/polacz-pdf': {
      h2Title: 'Łączenie plików PDF (Merge PDF) – Scal wiele dokumentów w jeden',
      intro: 'Masz kilka osobnych rozdziałów, załączników lub skanów, które musisz wysłać jako jeden spójny plik PDF? Użyj naszego bezpłatnego modułu łączenia: wgraj pliki, uporządkuj strony i pobierz połączony dokument.',
      steps: [
        {
          title: '1. Wgraj pliki PDF',
          desc: 'Wybierz dwa lub więcej plików PDF ze swojego komputera lub upuść je w obszarze roboczym.',
        },
        {
          title: '2. Ustal kolejność stron',
          desc: 'Przeciągaj miniatury metodą Drag & Drop, aby ustalić dokładnie taką kolejność arkuszy, jakiej potrzebujesz.',
        },
        {
          title: '3. Scal i pobierz plik',
          desc: 'Kliknij przycisk „Połącz PDF”. Otrzymasz jeden zoptymalizowany plik gotowy do wysyłki.',
        },
      ],
      benefits: [
        {
          title: 'Brak limitu ilości dokumentów',
          desc: 'Możesz łączyć dowolną liczbę plików PDF bez sztucznych ograniczeń wersji darmowej.',
        },
        {
          title: 'Zachowanie formularzy i zakładek',
          desc: 'Silnik kopiuje obiekty PDF zachowując ostrość wektorów i oryginalne formatowanie.',
        },
        {
          title: '100% Prywatności RODO',
          desc: 'Twoje umowy handlowe i faktury nie są przesyłane do zewnętrznej chmury.',
        },
      ],
      faqs: [
        {
          q: 'Czy mogę usunąć lub obrócić pojedyncze strony podczas łączenia?',
          a: 'Tak! W naszym zintegrowanym widoku możesz obrócić dowolną stronę lub usunąć niepotrzebny arkusz przed kliknięciem pobierania.',
        },
        {
          q: 'Jaki jest maksymalny rozmiar łączonych plików?',
          a: 'Nie nakładamy żadnych limitów serwerowych. Ogranicza Cię jedynie dostępna pamięć operacyjna Twojego komputera.',
        },
      ],
      extendedText: 'Scalanie raportów kwartalnych, prac dyplomowych i ofert przetargowych w jeden plik to podstawa nowoczesnego biura. W PDF Studio Online robisz to szybko, wygodnie i bez ryzyka naruszenia tajemnicy przedsiębiorstwa.',
      keywords: ['łączenie pdf w jeden plik', 'scalanie pdf online za darmo', 'jak połączyć kilka pdf w jeden', 'merge pdf bez limitu stron', 'połącz dokumenty pdf'],
    },
    '/rozdziel-pdf': {
      h2Title: 'Rozdzielanie PDF (Split & Extract) – Wyodrębnij konkretne strony',
      intro: 'Potrzebujesz wyciągnąć ze 100-stronicowego pliku PDF tylko strony 5-10 lub pojedynczy certyfikat? Narzędzie Rozdziel PDF pozwala na precyzyjną ekstrakcję wybranych arkuszy i zapisanie ich w osobnym dokumencie.',
      steps: [
        {
          title: '1. Otwórz plik PDF',
          desc: 'Wgraj dokument, który chcesz podzielić na mniejsze fragmenty.',
        },
        {
          title: '2. Wskaż zakres stron',
          desc: 'Wpisz zakres (np. 1-3, 7) w polu tekstowym lub kliknij myszką konkretne arkusze.',
        },
        {
          title: '3. Wyodrębnij i zapisz',
          desc: 'Kliknij przycisk ekstrakcji, aby natychmiast wygenerować nowy, wydzielony plik PDF.',
        },
      ],
      benefits: [
        {
          title: 'Elastyczny wybór zakresów',
          desc: 'Możesz łączyć pojedyncze strony oraz przedziały (np. 1, 3, 5-8).',
        },
        {
          title: 'Oryginalna jakość',
          desc: 'Wyodrębnione strony nie są ponownie kompresowane – jakość druku pozostaje idealna.',
        },
        {
          title: 'Błyskawiczne działanie w pamięci RAM',
          desc: 'Wycięcie 5 stron z 200-stronicowego pliku trwa mniej niż sekundę.',
        },
      ],
      faqs: [
        {
          q: 'Czy mój oryginalny plik zostanie zmodyfikowany na dysku?',
          a: 'Nie, oryginalny plik na Twoim komputerze pozostaje nienaruszony. Aplikacja tworzy zupełnie nowy, oddzielny dokument z wybranymi stronami.',
        },
        {
          q: 'Czy mogę wyodrębnić tylko jedną stronę?',
          a: 'Oczywiście, wystarczy kliknąć interesującą Cię stronę i pobrać gotowy plik.',
        },
      ],
      extendedText: 'Wielostronicowe katalogi, publikacje naukowe i zestawienia tabelaryczne często zawierają tylko kilka stron interesujących odbiorcę. Wyciągnij kluczowe dane w kilka sekund za pomocą PDF Studio Online.',
      keywords: ['rozdzielanie pdf online', 'wyciąganie stron z dokumentu pdf', 'podziel plik pdf na części', 'split pdf za darmo', 'ekstrakcja stron pdf'],
    },
    '/polityka-privacy': {
      h2Title: 'Polityka Prywatności i Pliki Cookies – PDF Studio Online',
      intro: 'Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies w aplikacji PDF Studio Online. Naszym priorytetem jest pełna transparentność i maksymalne bezpieczeństwo Twoich dokumentów.',
      steps: [
        {
          title: '1. Przetwarzanie plików PDF (Bezpieczeństwo Client-Side)',
          desc: 'Wszystkie operacje na plikach PDF odbywają się wyłącznie lokalnie w pamięci RAM przeglądarki.',
        },
        {
          title: '2. Monetyzacja i pliki cookies stron trzecich',
          desc: 'Sieci reklamowe Google AdSense oraz Ezoic wykorzystują pliki cookies do wyświetlania spersonalizowanych reklam.',
        },
        {
          title: '3. Logi serwera i analityka',
          desc: 'Hosting statyczny zbiera anonimowe dane techniczne wyłącznie w celach optymalizacji i ochrony DDoS.',
        },
      ],
      benefits: [
        {
          title: 'Zero transferu na serwer',
          desc: 'Żadne pliki PDF ani zawarte w nich dane nie są przesyłane na serwer zewnętrzny.',
        },
        {
          title: 'Pełna zgodność z RODO i AdSense',
          desc: 'Możliwość wyłączenia personalizacji reklam i pełna kontrola nad prywatnością.',
        },
      ],
      faqs: [
        {
          q: 'Czy moje pliki PDF są gdziekolwiek wysyłane?',
          a: 'Nie. Wszystkie operacje (wypełnianie, obracanie, scalanie, usuwanie) wykonywane są lokalnie w przeglądarce.',
        },
        {
          q: 'Jak mogę wyłączyć reklamy spersonalizowane?',
          a: 'Możesz zrezygnować z personalizacji w Ustawieniach reklam Google lub odwiedzając stronę www.aboutads.info.',
        },
      ],
      extendedText: 'Oficjalna Polityka Prywatności PDF Studio Online określa zasady przetwarzania danych w 100% po stronie klienta oraz wykorzystanie cookies partnerskich sieci reklamowych Google AdSense i Ezoic.',
      keywords: ['polityka prywatności', 'pliki cookies', 'google adsense rodo', 'ezoic privacy'],
    },
    '/pdf-to-word': {
      h2Title: 'Konwertuj PDF do Word (.docx) Online – Błyskawiczna i Bezpieczna Ekstrakcja Tekstu',
      intro: 'Wyodrębnij kompletną warstwę tekstową z dokumentów PDF do edytowalnego formatu Word (.docx) lub czystego pliku tekstowego. Narzędzie działa w 100% lokalnie w Twojej przeglądarce, zapewniając całkowitą poufność pism, wniosków i umów.',
      steps: [
        {
          title: '1. Wybierz lub przeciągnij plik PDF',
          desc: 'Wskaż dokument PDF z dysku swojego komputera lub upuść go bezpośrednio w polu roboczym.',
        },
        {
          title: '2. Ekstrakcja tekstu w czasie rzeczywistym',
          desc: 'Biblioteka pdfjs-dist odczytuje strukturę tekstową, akapity oraz wiersze bez wysyłania pliku na serwer.',
        },
        {
          title: '3. Pobierz plik Word lub skopiuj treść',
          desc: 'Pobierz gotowy dokument .docx otwierający się w MS Word i Google Docs lub skopiuj tekst do schowka.',
        },
      ],
      benefits: [
        {
          title: 'Zero transferu do chmury',
          desc: 'Wszystkie dane pozostają wyłącznie w Twojej pamięci RAM, co czyni narzędzie w pełni zgodnym z RODO.',
        },
        {
          title: 'Format kompatybilny z Wordem',
          desc: 'Wygenerowany dokument .docx zachowuje podział na akapity i strony dla łatwej dalszej edycji.',
        },
        {
          title: 'Brak ograniczeń wielkości pliku',
          desc: 'Możesz konwertować obszerne książki, e-booki i publikacje bez opłat i rejestracji.',
        },
      ],
      faqs: [
        {
          q: 'Czy konwerter PDF do Word jest całkowicie darmowy?',
          a: 'Tak, wszystkie funkcje ekstrakcji tekstu do formatu Word są bezpłatne i nie wymagają podawania adresu e-mail.',
        },
        {
          q: 'Czy narzędzie obsługuje zeskanowane dokumenty graficzne (OCR)?',
          a: 'Narzędzie odczytuje warstwę tekstową (tekst cyfrowy) zawartą w dokumencie PDF. Jeśli dokument zawiera wektorowy tekst cyfrowy, zostanie on natychmiast wyodrębniony.',
        },
      ],
      extendedText: 'Konwersja dokumentów PDF do formatu Word to jedno z najczęstszych zadań biurowych. Zamiast ryzykować wysyłanie poufnych umów czy faktur na zewnętrzne serwery, skorzystaj z PDF Studio Online – narzędzia działającego całkowicie w Twojej przeglądarce.',
      keywords: ['konwertuj pdf do word', 'pdf do docx online', 'ekstrakcja tekstu z pdf', 'pdf to word za darmo', 'zamiana pdf na word'],
    },
    '/word-to-pdf': {
      h2Title: 'Konwertuj Word / Tekst do PDF Online – Generuj Czyste Dokumenty PDF',
      intro: 'Wklej tekst skopiowany z programu Word lub wczytaj plik tekstowy, a nasz lokalny silnik stworzy dla Ciebie elegancki, wyjustowany plik PDF z pełną obsługą polskich znaków diakrytycznych i czcionką Roboto Mono.',
      steps: [
        {
          title: '1. Wklej treść lub wgraj plik',
          desc: 'Wklej tekst ze schowka programu Word lub upuść plik tekstowy (.txt, .rtf, .doc).',
        },
        {
          title: '2. Dostosuj orientację i marginesy',
          desc: 'Wybierz układ strony (pionowy/poziomy), wielkość interlinii oraz rozmiar czcionki.',
        },
        {
          title: '3. Kliknij Generuj PDF',
          desc: 'Aplikacja natychmiast wyrenderuje i pobierze wysokiej jakości dokument PDF.',
        },
      ],
      benefits: [
        {
          title: 'Czysta czcionka Roboto Mono',
          desc: 'Optymalna czytelność i perfekcyjne wsparcie dla znaków: ą, ć, ę, ł, ń, ó, ś, ź, ż.',
        },
        {
          title: 'Inteligentne dzielenie stron',
          desc: 'Długie teksty są automatycznie dzielone na strony wraz ze zgrabną numeracją w stopce.',
        },
        {
          title: '100% Client-Side',
          desc: 'Żadne teksty nie są zapisywane na serwerze ani przesyłane przez sieć internetową.',
        },
      ],
      faqs: [
        {
          q: 'Jak najlepiej przekonwertować dokument Word do PDF?',
          a: 'Wystarczy skopiować tekst w Microsoft Word (Ctrl+A, Ctrl+C) i wkleić go w polu edytora na naszej stronie (Ctrl+V), a następnie kliknąć „Generuj PDF”.',
        },
        {
          q: 'Czy mogę wygenerować dokument w orientacji poziomej?',
          a: 'Tak, wystarczy zmienić opcję orientacji na „Pozioma (Landscape)” przed wygenerowaniem pliku.',
        },
      ],
      extendedText: 'Tworzenie dokumentów PDF bezpośrednio z wklejonego tekstu jest idealnym rozwiązaniem dla oświadczeń, umów zlecenie, regulaminów i oficjalnych pism urzędowych, które wymagają nienagannego wyglądu na każdym urządzeniu.',
      keywords: ['word do pdf online', 'konwertuj tekst do pdf', 'wklej tekst generuj pdf', 'docx do pdf za darmo', 'generator pism pdf'],
    },
    '/pdf-to-excel': {
      h2Title: 'Konwertuj PDF do Excel (.csv) – Ekstrakcja Tabel i Danych Finansowych',
      intro: 'Przekształć tabele, wyciągi bankowe, faktury i zestawienia liczbowe z plików PDF w czysty arkusz CSV zgodny z Microsoft Excel z kodowaniem UTF-8 BOM i separatorem średnikowym.',
      steps: [
        {
          title: '1. Prześlij plik PDF z tabelą',
          desc: 'Wybierz dokument zawierający zestawienie danych, cennik lub wyciąg bankowy.',
        },
        {
          title: '2. Automatyczne wykrywanie siatki danych',
          desc: 'Algorytm geometryczny analizuje położenie tekstu i łączy powiązane komórki w wiersze i kolumny.',
        },
        {
          title: '3. Pobierz arkusz CSV dla Excela',
          desc: 'Pobierz plik ze średnikiem lub przecinkiem, gotowy do natychmiastowego otwarcia w MS Excel.',
        },
      ],
      benefits: [
        {
          title: 'Kodowanie UTF-8 BOM',
          desc: 'Brak zniekształceń polskich liter – plik otwiera się od razu z poprawnymi znakami w polskim Excelu.',
        },
        {
          title: 'Podgląd i kopiowanie do schowka',
          desc: 'Możesz podejrzeć wyodrębnioną tabelę w przeglądarce i jednym kliknięciem skopiować ją do Google Sheets.',
        },
        {
          title: 'Ochrona wrażliwych danych finansowych',
          desc: 'Wyciągi z konta i raporty przychodów nie są wysyłane na żaden zewnętrzny serwer.',
        },
      ],
      faqs: [
        {
          q: 'Dlaczego plik pobiera się jako .csv, a nie .xlsx?',
          a: 'Plik CSV z kodowaniem UTF-8 BOM jest standardowym, lekkim formatem, który Microsoft Excel otwiera automatycznie jako arkusz kalkulacyjny bez potrzeby ciężkich bibliotek zewnętrznych.',
        },
        {
          q: 'Czy mogę zmienić separator kolumn?',
          a: 'Tak, możesz wybrać separator średnikowy (domyślny w polskim Excelu) lub przecinkowy (standard międzynarodowy).',
        },
      ],
      extendedText: 'Ekstrakcja danych z tabel PDF do Excela pozwala zaoszczędzić godziny żmudnego ręcznego wprowadzania danych. Bezpiecznie przetwarzaj cenniki, specyfikacje i zestawienia księgowe w 100% lokalnie.',
      keywords: ['pdf do excel online', 'konwertuj tabele pdf do csv', 'pdf to xlsx za darmo', 'ekstrakcja tabel pdf', 'wyciąg bankowy pdf do excel'],
    },
    '/excel-to-pdf': {
      h2Title: 'Konwertuj Excel / Tabelę do PDF – Profesjonalne Raporty i Tabele Danych',
      intro: 'Wklej dane z Microsoft Excel, arkuszy kalkulacyjnych Google lub pliku CSV, aby wygenerować elegancki, czytelny raport PDF z liniami siatki i wyrównanymi kolumnami.',
      steps: [
        {
          title: '1. Skopiuj zakres komórek z Excela',
          desc: 'Zaznacz tabelę w programie Excel lub Google Sheets i skopiuj ją do schowka (Ctrl+C).',
        },
        {
          title: '2. Wklej w edytorze aplikacji',
          desc: 'Wklej zawartość (Ctrl+V) – aplikacja automatycznie rozpozna podział na kolumny i wiersze.',
        },
        {
          title: '3. Wygeneruj sformatowany PDF',
          desc: 'Wybierz układ poziomy lub pionowy i pobierz gotowy, profesjonalny dokument PDF.',
        },
      ],
      benefits: [
        {
          title: 'Automatyczne dopasowanie kolumn',
          desc: 'Algorytm oblicza optymalne szerokości kolumn na podstawie długości zawartych w nich danych.',
        },
        {
          title: 'Dedykowany tryb poziomy (Landscape)',
          desc: 'Szerokie tabele z dużą liczbą kolumn mieszczą się bez ucinania tekstu.',
        },
        {
          title: 'Estetyczne linie siatki',
          desc: 'Tabela otrzymuje czytelne nagłówki i separator wierszy dla maksymalnej przejrzystości.',
        },
      ],
      faqs: [
        {
          q: 'Jak prawidłowo wkleić tabelę z programu Excel?',
          a: 'Zaznacz komórki w programie Excel, naciśnij Ctrl+C, a następnie wklej je w polu tekstowym naszej aplikacji (Ctrl+V). Dane skopiowane z Excela zachowują tabulacje, które automatycznie zamieniamy na kolumny.',
        },
        {
          q: 'Czy mogę wczytać plik z rozszerzeniem .csv?',
          a: 'Tak, możesz przeciągnąć plik CSV lub TSV bezpośrednio do okna edytora.',
        },
      ],
      extendedText: 'Wysyłanie surowego arkusza kalkulacyjnego klientowi stwarza ryzyko przypadkowego usunięcia formuł lub naruszenia struktury danych. Konwersja tabeli do pliku PDF tworzy niezmienny, elegancki dokument gotowy do prezentacji lub druku.',
      keywords: ['excel do pdf online', 'wklej tabele do pdf', 'konwertuj csv do pdf', 'arkusz kalkulacyjny do pdf', 'tabela w pdf'],
    },
    '/wyczysc-metadane-pdf': {
      h2Title: 'Usuwanie Metadanych z PDF Online – Bezpieczne Czyszczenie Ukrytych Danych',
      intro: 'Każdy dokument PDF utworzony w edytorach tekstu (Microsoft Word, Google Docs) lub programach graficznych zawiera ukryte metadane: autora, nazwę programu, model komputera, daty edycji oraz tagi XMP. Nasze narzędzie pozwala trwale wymazać wszystkie te ślady bezpośrednio w Twojej przeglądarce.',
      steps: [
        { title: '1. Dodaj plik PDF', desc: 'Przeciągnij dokument do okna przeglądarki – silnik automatycznie przeskanuje słownik Info i strumień XMP.' },
        { title: '2. Przejrzyj raport audytu', desc: 'Zobacz dokładną listę wykrytych parametrów: autora, wersję oprogramowania i historię zmian.' },
        { title: '3. Wyczyść metadane', desc: 'Kliknij przycisk oczyszczania i pobierz w 100% anonimowy plik PDF bez żadnych cyfrowych śladów.' },
      ],
      benefits: [
        { title: '100% Client-Side Privacy', desc: 'Pliki są analizowane i czyszczone wyłącznie w pamięci RAM urządzenia.' },
        { title: 'Głębokie czyszczenie XMP i PieceInfo', desc: 'Usuwamy nie tylko standardowe pola, ale również ukryte strumienie XML i dane programów.' },
        { title: 'Brak utraty jakości', desc: 'Warstwa tekstowa, grafiki, czcionki i układ stron pozostają w 100% nienaruszone.' },
      ],
      faqs: [
        { q: 'Jakie informacje są ukryte w plikach PDF?', a: 'Standardowy plik PDF może zawierać: imię i nazwisko autora, login systemowy, nazwę programu (np. Word 2021), nazwę komputera oraz daty utworzenia i edycji.' },
        { q: 'Czy czyszczenie metadanych zmienia wygląd dokumentu?', a: 'Nie, proces czyszczenia dotyczy wyłącznie ukrytych struktur nagłówkowych. Widoczna treść pozostaje identyczna.' },
      ],
      extendedText: 'Anonimizacja i czyszczenie metadanych w formacie PDF to kluczowy element dbania o poufność umów, pism prawnych i ofert handlowych.',
      keywords: ['usuń metadane z pdf', 'czyszczenie metadanych pdf online', 'jak usunąć autora z pdf', 'usuwanie xmp pdf bez programu', 'anonimizacja dokumentu pdf'],
    },
  },
  en: {
    '/': {
      h2Title: 'Why is PDF Studio Online the Most Secure PDF Suite on the Web?',
      intro: 'Most online PDF converters and editors (such as iLovePDF or SmallPDF) require uploading your confidential contracts, invoices, and IDs to remote cloud servers. PDF Studio Online works fundamentally differently: 100% of document processing happens entirely inside your web browser using WebAssembly and JavaScript (pdf-lib and pdfjs-dist).',
      steps: [
        {
          title: '1. Select a Tool',
          desc: 'Choose from Form Filler, Page Delete, Rotate, Merge, or Split.',
        },
        {
          title: '2. Drop Your PDF File',
          desc: 'Your file opens instantly inside your browser without uploading any bytes to the web.',
        },
        {
          title: '3. Save Your Output File',
          desc: 'Compile your new PDF file directly from device RAM in a fraction of a second.',
        },
      ],
      benefits: [
        {
          title: '100% Privacy & GDPR Compliance',
          desc: 'Zero leak risk. No server, employee, or third party can ever see or inspect your files.',
        },
        {
          title: 'No Arbitrary File Limits',
          desc: 'You are only limited by your device hardware RAM, not artificial paywalls.',
        },
        {
          title: 'Offline-Ready and Lightning Fast',
          desc: 'Even if your internet connection disconnects, you can keep editing and saving documents.',
        },
      ],
      faqs: [
        {
          q: 'Are my files safe?',
          a: 'Yes, 100% safe. Traditional PDF services upload your files to remote cloud servers where they are logged and stored. At nosignpdf.com, we run everything client-side in your browser. Zero data collection / privacy guaranteed: your files never leave your device RAM.',
        },
        {
          q: 'Is nosignpdf.com really a free PDF editor with no sign-up and no watermarks?',
          a: 'Yes! It is completely free with no registration, no login, and no watermarks. You download clean, untampered documents with zero cost.',
        },
        {
          q: 'How fast is this editor compared to cloud tools?',
          a: 'It is ultra fast. There is no waiting for file uploads or cloud rendering. All operations take place in milliseconds using your device processor, even when working completely offline.',
        },
      ],
      extendedText: 'Managing documents in Portable Document Format (PDF) is a staple of everyday business, legal, and academic life. In an era of heightened cyber threats and strict privacy laws, uploading tax filings, salary slips, or trade secrets to unknown cloud servers poses huge liabilities. PDF Studio Online solves this permanently.',
      keywords: ['free pdf editor online', 'private in-browser pdf tools', 'secure pdf without upload', 'gdpr compliant pdf editor', 'pdf studio online'],
    },
    '/wypelnij-formularz-pdf': {
      h2Title: 'PDF Form Filler – Fill Official AcroForms Without Printing',
      intro: 'Need to urgently fill out a government application, tax filing, or contract in PDF format? PDF Studio Online automatically detects native interactive form fields (AcroForms) and allows adding new digital text fields and checkboxes without printing a single sheet of paper.',
      steps: [
        {
          title: '1. Open Your PDF Form',
          desc: 'Upload your document. Our engine immediately inspects and loads native interactive form fields.',
        },
        {
          title: '2. Fill In or Add Fields',
          desc: 'Click directly inside input boxes to type. If the PDF is a flat scan, use the "Add Text Field" button to embed official fields into the file structure.',
        },
        {
          title: '3. Save & Download PDF',
          desc: 'Click "Save & Download Filled PDF" to permanently embed all values into the native AcroForm structure.',
        },
      ],
      benefits: [
        {
          title: 'Native AcroForm Integration',
          desc: 'Fields become an official part of the PDF standard – fully compatible with Adobe Acrobat and official portals.',
        },
        {
          title: 'Save Ink, Paper & Time',
          desc: 'Never waste time printing, pen-signing, and rescanning documents again.',
        },
        {
          title: 'Zero Leakage of Personal Data',
          desc: 'Your Social Security, tax ID, and financial data remain safe inside your browser RAM.',
        },
      ],
      faqs: [
        {
          q: 'Will the form remain editable in other PDF viewers?',
          a: 'Yes! We serialize form values into native AcroForm dictionaries per ISO 32000 specifications, ensuring full compatibility in Adobe Reader and government submission portals.',
        },
        {
          q: 'What if my PDF is an older flattened scan?',
          a: 'Simply choose "Add Text Field" or "Add Checkbox" on the toolbar. Click anywhere on the blank lines or boxes to insert interactive digital fields on the fly.',
        },
      ],
      extendedText: 'Most official applications are distributed as PDF files. With pdf-lib, PDF Studio Online brings full AcroForm manipulation directly to the browser, offering desktop-grade precision without requiring expensive software subscriptions.',
      keywords: ['fill pdf forms online', 'acroforms editor free', 'complete application pdf without printing', 'fillable pdf online', 'edit pdf text fields'],
    },
    '/usun-strony-z-pdf': {
      h2Title: 'Delete Pages from PDF Online – Quick & Private',
      intro: 'Received a lengthy PDF with unnecessary cover sheets, empty pages, or confidential exhibits? Preview all page thumbnails in high resolution and remove unneeded sheets with a single click.',
      steps: [
        {
          title: '1. Load Your Document',
          desc: 'Select your PDF. High-resolution thumbnails are generated in real-time.',
        },
        {
          title: '2. Pick Pages to Delete',
          desc: 'Click the trash icon on any page thumbnail or select unwanted sheets.',
        },
        {
          title: '3. Download Trimmed PDF',
          desc: 'Click download to compile your cleaned PDF directly from your browser.',
        },
      ],
      benefits: [
        {
          title: 'Lossless Quality',
          desc: 'Vector typography, embeds, and image layers remain at 100% original fidelity.',
        },
        {
          title: 'Smaller File Size',
          desc: 'Eliminate bloat to make sharing documents via email fast and effortless.',
        },
        {
          title: 'Immediate Privacy',
          desc: 'Deleted pages are cleared from browser memory immediately.',
        },
      ],
      faqs: [
        {
          q: 'Can I undo a page deletion before downloading?',
          a: 'Yes! Click "Reset" or re-upload your file at any time to restore all original pages.',
        },
        {
          q: 'Does removing pages corrupt internal links?',
          a: 'No, all retained pages maintain their relative structures and assets perfectly.',
        },
      ],
      extendedText: 'Cleaning up contracts, presentations, and scans by removing blank or confidential pages is effortless with PDF Studio Online.',
      keywords: ['delete pages from pdf', 'remove pdf pages free', 'clean up pdf document', 'delete empty pdf pages', 'cut pages out of pdf'],
    },
    '/obroc-pdf': {
      h2Title: 'Rotate PDF Pages Online – Fix Orientation Permanently',
      intro: 'Scanned a document upside-down or in landscape mode? Rotate single pages or the entire document by 90°, 180°, or 270° with a single click.',
      steps: [
        {
          title: '1. Add Your PDF File',
          desc: 'Drop your document to preview individual page orientations.',
        },
        {
          title: '2. Rotate Target Pages',
          desc: 'Click the 90° rotation button on any thumbnail to straighten it.',
        },
        {
          title: '3. Save Corrected PDF',
          desc: 'Download your updated file with permanent rotation metadata applied.',
        },
      ],
      benefits: [
        {
          title: 'Permanent Orientation Fix',
          desc: 'Rotation is saved directly into the PDF specification so it opens correctly on all devices.',
        },
        {
          title: 'Selective Page Rotation',
          desc: 'Rotate only pages that need adjustments without altering the rest.',
        },
        {
          title: 'Zero Quality Loss',
          desc: 'No raster re-compression occurs; only page matrix orientation flags are updated.',
        },
      ],
      faqs: [
        {
          q: 'Can I rotate pages by 180 degrees?',
          a: 'Yes, simply click the 90° rotate button twice on the desired page.',
        },
        {
          q: 'Will my scanned text stay crisp?',
          a: 'Yes, rotation changes the display matrix without re-encoding scanned imagery.',
        },
      ],
      extendedText: 'Deskewing and correcting upside-down scans is simple and instant with PDF Studio Online.',
      keywords: ['rotate pdf online', 'turn pdf 90 degrees', 'rotate single page pdf', 'permanent pdf rotation', 'fix upside down pdf'],
    },
    '/polacz-pdf': {
      h2Title: 'Merge PDF Files Online – Combine Documents in Custom Order',
      intro: 'Need to combine multiple receipts, chapters, or contract sections into one single PDF? Upload multiple files, drag and drop thumbnails to reorder, and download a unified document.',
      steps: [
        {
          title: '1. Upload PDF Files',
          desc: 'Select two or more PDF files from your computer or phone.',
        },
        {
          title: '2. Reorder Pages',
          desc: 'Drag and drop page cards to establish the exact reading sequence you want.',
        },
        {
          title: '3. Merge and Save',
          desc: 'Click "Merge PDF" to produce a single consolidated document in seconds.',
        },
      ],
      benefits: [
        {
          title: 'No File Quantity Restrictions',
          desc: 'Combine as many files and pages as your device hardware can handle.',
        },
        {
          title: 'Preserve Bookmarks & Visuals',
          desc: 'High-precision document copying maintains fonts, formatting, and vector lines.',
        },
        {
          title: 'Client-Side Security',
          desc: 'Confidential company dossiers are merged entirely within your browser.',
        },
      ],
      faqs: [
        {
          q: 'Can I delete pages while merging files?',
          a: 'Yes! You can delete or rotate individual pages across all uploaded files before merging.',
        },
        {
          q: 'Is there a limit on total file size?',
          a: 'There are no server-side caps; your local RAM is the only factor.',
        },
      ],
      extendedText: 'Consolidate multiple documents into one clean, professional PDF file without risking your data security.',
      keywords: ['merge pdf files online', 'combine pdfs into one free', 'merge pdf unlimited', 'join pdf pages', 'reorder and combine pdf'],
    },
    '/rozdziel-pdf': {
      h2Title: 'Split PDF & Extract Pages Online – Instant & Free',
      intro: 'Need to extract pages 5 through 12 from a massive 200-page manual or pluck out a single invoice? Specify custom page ranges and extract clean new PDF files.',
      steps: [
        {
          title: '1. Select Source PDF',
          desc: 'Upload the document you need to divide or extract from.',
        },
        {
          title: '2. Define Page Range',
          desc: 'Type ranges like "1-3, 7" or click on individual thumbnail cards.',
        },
        {
          title: '3. Extract & Download',
          desc: 'Download your newly created lightweight PDF file immediately.',
        },
      ],
      benefits: [
        {
          title: 'Flexible Range Syntax',
          desc: 'Extract arbitrary combinations such as "1-4, 7, 10-12" effortlessly.',
        },
        {
          title: 'Original Vector Crispness',
          desc: 'Extracted pages are preserved with pixel-perfect fidelity.',
        },
        {
          title: 'Superfast RAM Execution',
          desc: 'Splitting large files takes less than one second.',
        },
      ],
      faqs: [
        {
          q: 'Will splitting alter my original file on disk?',
          a: 'No, your original file remains completely untouched. A new independent file is created.',
        },
        {
          q: 'Can I extract just one single page?',
          a: 'Yes, select a single page and click download to get a 1-page PDF.',
        },
      ],
      extendedText: 'Extracting key chapters, invoices, or statements from comprehensive PDF archives is smooth and secure with PDF Studio Online.',
      keywords: ['split pdf online', 'extract pages from pdf', 'separate pdf pages free', 'divide pdf document', 'split pdf range'],
    },
    '/wyczysc-metadane-pdf': {
      h2Title: 'Remove PDF Metadata Online – Free PDF Metadata Stripper',
      intro: 'PDF documents created with Microsoft Word, InDesign, or Google Docs contain invisible metadata: author names, software versions, computer names, timestamps, and raw XMP streams. Strip all hidden traces permanently in your browser without software installations.',
      steps: [
        { title: '1. Upload PDF File', desc: 'Drop your document into the browser to instantly scan the Info dictionary and XMP metadata stream.' },
        { title: '2. Inspect Discovered Traces', desc: 'Review the privacy audit report showing detected authors, creation apps, and revision dates.' },
        { title: '3. Strip Metadata & Download', desc: 'Click to permanently sanitize the PDF and download a 100% clean, anonymous document.' },
      ],
      benefits: [
        { title: '100% Client-Side Privacy', desc: 'Documents are analyzed and scrubbed in local device RAM. Zero bytes are uploaded to servers.' },
        { title: 'Deep XMP & Dictionary Scrubbing', desc: 'Removes catalog XMP streams, PieceInfo, and private application parameters.' },
        { title: 'Zero Quality Loss', desc: 'Text, vectors, fonts, and page layouts remain completely untouched.' },
      ],
      faqs: [
        { q: 'What hidden metadata is stored inside PDF files?', a: 'PDF files frequently store author full names, operating system usernames, software identifiers, printer versions, and editing histories.' },
        { q: 'Does stripping metadata modify document contents?', a: 'No, only internal hidden header streams are cleaned. Visual pages and typography remain 100% identical.' },
      ],
      extendedText: 'Sanitizing PDF metadata is essential before submitting bids, contracts, legal briefs, or confidential resumes.',
      keywords: ['remove pdf metadata online', 'strip pdf metadata free', 'delete author from pdf', 'clean xmp pdf in browser', 'sanitize pdf file'],
    },
  },
  es: {
    '/': {
      h2Title: '¿Por qué PDF Studio Online es la suite PDF más segura de la web?',
      intro: 'La mayoría de convertidores de PDF en línea (como iLovePDF o SmallPDF) exigen subir tus contratos confidenciales y facturas a servidores externos. PDF Studio Online funciona de forma 100% local en tu navegador con WebAssembly y JavaScript (pdf-lib y pdfjs-dist).',
      steps: [
        { title: '1. Elige una herramienta', desc: 'Rellenar formularios, rotar, combinar, eliminar o dividir páginas.' },
        { title: '2. Arrastra tu archivo PDF', desc: 'El archivo se abre al instante sin enviar ni un solo byte a la nube.' },
        { title: '3. Guarda el documento final', desc: 'Genera el nuevo PDF directamente en la memoria RAM de tu dispositivo.' },
      ],
      benefits: [
        { title: '100% Privacidad y RGPD', desc: 'Cero riesgo de filtración. Ningún servidor ni tercero tiene acceso a tus documentos.' },
        { title: 'Sin límites arbitrarios', desc: 'Solo dependes de la memoria de tu equipo, sin suscripciones de pago.' },
        { title: 'Funciona offline y al instante', desc: 'Incluso sin conexión a internet puedes continuar editando tus archivos.' },
      ],
      faqs: [
        { q: '¿Mis archivos están seguros?', a: 'Sí, 100% seguros y confidenciales. Las herramientas tradicionales suben tus documentos a servidores externos en la nube. En nosignpdf.com todo se procesa en el navegador (Client-Side). Seguro (zero data collection / privacidad): tus archivos jamás salen de tu memoria RAM.' },
        { q: '¿Es realmente un editor PDF gratis sin registro y sin marcas de agua?', a: '¡Totalmente! Es un editor PDF gratis, sin registro, sin cuentas de usuario y sin marcas de agua de ningún tipo.' },
        { q: '¿Qué tan rápido es el procesamiento?', a: 'Es ultra rápido. No requiere tiempos de espera de subida ni descarga. El procesador de tu equipo ejecuta todo en milisegundos, incluso sin conexión a Internet.' },
      ],
      extendedText: 'Gestionar documentos PDF con máxima privacidad es indispensable para abogados, médicos, empresas y particulares.',
      keywords: ['editor pdf gratis online', 'herramientas pdf seguras', 'editar pdf sin subir a la nube', 'suite pdf rgpd', 'pdf studio online'],
    },
    '/wypelnij-formularz-pdf': {
      h2Title: 'Rellenador de Formularios PDF – Campos AcroForm sin imprimir',
      intro: 'Completa solicitudes oficiales, trámites gubernamentales y contratos en PDF. Detecta automáticamente campos interactivos (AcroForms) y permite crear nuevos campos de texto y casillas interactivas.',
      steps: [
        { title: '1. Abre tu formulario PDF', desc: 'Carga el archivo. El motor detecta inmediatamente los campos nativos del documento.' },
        { title: '2. Rellena o añade nuevos campos', desc: 'Haz clic en las casillas para escribir. Usa "Añadir Campo de Texto" para documentos escaneados.' },
        { title: '3. Guarda y descarga', desc: 'Guarda los datos de forma oficial en la estructura AcroForm del archivo PDF.' },
      ],
      benefits: [
        { title: 'Campos AcroForm nativos', desc: 'Compatibles al 100% con Adobe Acrobat y administraciones públicas.' },
        { title: 'Ahorro de papel y tinta', desc: 'Olvídate de imprimir, firmar con bolígrafo y volver a escanear.' },
        { title: 'Privacidad absoluta', desc: 'Tus datos fiscales y personales permanecen en tu equipo.' },
      ],
      faqs: [
        { q: '¿El archivo será editable en otros programas?', a: 'Sí, guardamos según el estándar ISO 32000 PDF para que cualquier visor lo reconozca.' },
        { q: '¿Qué pasa si mi PDF es un escaneo plano?', a: 'Usa la herramienta "Añadir Campo de Texto" y haz clic sobre las líneas vacías.' },
      ],
      extendedText: 'Convierte cualquier trámite burocrático en una tarea de segundos directamente desde tu navegador.',
      keywords: ['rellenar formularios pdf online', 'acroforms editor gratis', 'completar pdf sin imprimir', 'formulario interactivo pdf', 'editar campos pdf'],
    },
    '/usun-strony-z-pdf': {
      h2Title: 'Eliminar páginas de un PDF – Rápido y privado',
      intro: 'Elimina portadas innecesarias, páginas en blanco o anexos confidenciales en un clic.',
      steps: [
        { title: '1. Carga tu PDF', desc: 'Visualiza miniaturas de todas las páginas al instante.' },
        { title: '2. Selecciona qué quitar', desc: 'Haz clic en la papelera de las páginas descartadas.' },
        { title: '3. Descarga el archivo', desc: 'Obtén el documento limpio sin perder calidad.' },
      ],
      benefits: [
        { title: 'Calidad vectorial intacta', desc: 'Las tipografías e imágenes no se comprimen de nuevo.' },
        { title: 'Reduce el peso del archivo', desc: 'Facilita el envío de documentos por correo electrónico.' },
        { title: 'Destrucción inmediata', desc: 'Las páginas eliminadas desaparecen de la memoria.' },
      ],
      faqs: [
        { q: '¿Puedo deshacer la eliminación?', a: 'Sí, antes de descargar puedes hacer clic en "Limpiar todo" o volver a cargar el archivo.' },
      ],
      extendedText: 'Optimiza tus documentos eliminando páginas sobrantes de manera rápida y segura.',
      keywords: ['eliminar paginas pdf', 'borrar hojas de pdf gratis', 'quitar paginas en blanco pdf', 'recortar paginas pdf'],
    },
    '/obroc-pdf': {
      h2Title: 'Girar páginas PDF online – Corrige la orientación permanentemente',
      intro: 'Corrige escaneos invertidos o páginas en horizontal girándolas 90°, 180° o 270° de forma definitiva.',
      steps: [
        { title: '1. Sube tu archivo', desc: 'Comprueba la orientación de cada página en las miniaturas.' },
        { title: '2. Gira las páginas', desc: 'Haz clic en el botón de giro de 90° en las hojas deseadas.' },
        { title: '3. Guarda los cambios', desc: 'Descarga el PDF con la orientación fijada en los metadatos.' },
      ],
      benefits: [
        { title: 'Fijación permanente', desc: 'La orientación se guarda en el archivo y se respeta en cualquier dispositivo.' },
        { title: 'Giro selectivo', desc: 'Modifica solo las páginas torcidas sin alterar el resto.' },
        { title: 'Sin pérdida de nitidez', desc: 'La resolución de las páginas se mantiene idéntica.' },
      ],
      faqs: [
        { q: '¿Puedo girar una página 180 grados?', a: 'Sí, haz clic dos veces en el botón de rotar 90°.' },
      ],
      extendedText: 'Soluciona errores de escaneo en segundos sin instalar aplicaciones pesadas.',
      keywords: ['girar pdf online', 'rotar paginas pdf', 'voltear pdf 90 grados', 'corregir orientacion pdf'],
    },
    '/polacz-pdf': {
      h2Title: 'Combinar archivos PDF (Merge PDF) – Une varios documentos en uno',
      intro: 'Une múltiples informes, facturas o capítulos en un único PDF ordenado a tu gusto con arrastrar y soltar.',
      steps: [
        { title: '1. Sube tus PDF', desc: 'Selecciona los archivos que deseas unir.' },
        { title: '2. Ordena las páginas', desc: 'Arrastra las miniaturas para fijar el orden final.' },
        { title: '3. Combina y descarga', desc: 'Genera un documento unificado en segundos.' },
      ],
      benefits: [
        { title: 'Sin límite de archivos', desc: 'Une tantos documentos como admita la memoria de tu equipo.' },
        { title: 'Conserva el formato', desc: 'Mantiene las fuentes y vectores originales.' },
        { title: 'Seguridad garantizada', desc: 'Tus contratos no se envían a servidores de terceros.' },
      ],
      faqs: [
        { q: '¿Puedo eliminar hojas antes de unir?', a: 'Sí, puedes eliminar o girar hojas individuales antes de descargar.' },
      ],
      extendedText: 'Organiza y fusiona tu documentación en un único PDF limpio y profesional.',
      keywords: ['unir pdf online gratis', 'combinar archivos pdf', 'juntar documentos pdf', 'merge pdf sin limite'],
    },
    '/rozdziel-pdf': {
      h2Title: 'Dividir y extraer páginas de PDF – Rápido y sencillo',
      intro: 'Extrae páginas específicas (ej. 1-3, 7) de un manual extenso y guárdalas en un archivo nuevo e independiente.',
      steps: [
        { title: '1. Carga tu PDF', desc: 'Selecciona el documento del que quieres extraer páginas.' },
        { title: '2. Define el rango', desc: 'Escribe los números de página o haz clic en las miniaturas.' },
        { title: '3. Extrae el nuevo PDF', desc: 'Descarga el nuevo archivo ligero al instante.' },
      ],
      benefits: [
        { title: 'Sintaxis flexible', desc: 'Combina hojas sueltas y rangos continuos con facilidad.' },
        { title: 'Máxima nitidez', desc: 'Las páginas conservan su resolución de impresión.' },
        { title: 'Velocidad inmediata', desc: 'La extracción se completa en menos de un segundo.' },
      ],
      faqs: [
        { q: '¿Se modifica mi archivo original?', a: 'No, tu archivo en el disco queda intacto; se crea una copia nueva.' },
      ],
      extendedText: 'Separa capítulos, contratos o recibos en archivos independientes con total comodidad.',
      keywords: ['dividir pdf online', 'extraer paginas pdf', 'separar hojas pdf gratis', 'split pdf'],
    },
    '/wyczysc-metadane-pdf': {
      h2Title: 'Eliminar metadatos de PDF online – Limpieza de datos ocultos gratis',
      intro: 'Los documentos PDF almacenan datos invisibles como autor, programa de creación (Word, InDesign), equipo y marcas de tiempo. Elimina de forma permanente todos los rastros en tu navegador sin subir archivos.',
      steps: [
        { title: '1. Sube tu documento', desc: 'Arrastra el PDF para analizar la estructura de metadatos y el flujo XMP.' },
        { title: '2. Revisa el informe', desc: 'Comprueba los datos ocultos detectados como autor, software y fechas.' },
        { title: '3. Limpia y descarga', desc: 'Elimina todos los metadatos y descarga un PDF 100% limpio y confidencial.' },
      ],
      benefits: [
        { title: 'Privacidad 100% local', desc: 'Todo el procesamiento se ejecuta en la memoria RAM de tu equipo.' },
        { title: 'Limpieza profunda de XMP', desc: 'Elimina flujos XML, identificadores UUID y datos privados de software.' },
        { title: 'Sin pérdida de calidad', desc: 'El contenido visual y el texto permanecen inalterados.' },
      ],
      faqs: [
        { q: '¿Qué información oculta tienen los PDFs?', a: 'Pueden contener el nombre del autor, usuario del sistema operativo, programa de creación y fechas de modificación.' },
      ],
      extendedText: 'Garantiza la confidencialidad de tus contratos y presupuestos eliminando metadatos antes de enviarlos.',
      keywords: ['eliminar metadatos pdf', 'limpiar metadatos pdf online', 'quitar autor de pdf gratis', 'desinfectar pdf'],
    },
  },
  hi: {
    '/': {
      h2Title: 'PDF Studio Online वेब पर सबसे सुरक्षित पीडीएफ सुइट क्यों है?',
      intro: 'अधिकांश ऑनलाइन कनवर्टर आपकी फाइलें क्लाउड सर्वर पर अपलोड करवाते हैं। PDF Studio Online पूरी तरह से आपके ब्राउज़र में WebAssembly और JavaScript (pdf-lib, pdfjs-dist) का उपयोग करके काम करता है।',
      steps: [
        { title: '1. उपयुक्त टूल चुनें', desc: 'फॉर्म फिलर, रोटेट, मर्ज, डिलीट या स्प्लिट टूल चुनें।' },
        { title: '2. अपनी पीडीएफ फाइल खींचें', desc: 'फ़ाइल बिना इंटरनेट पर अपलोड हुए तुरंत ब्राउज़र में खुलती है।' },
        { title: '3. नया दस्तावेज़ सहेजें', desc: 'अपने कंप्यूटर की रैम से तुरंत सुरक्षित पीडीएफ डाउनलोड करें।' },
      ],
      benefits: [
        { title: '100% गोपनीयता और सुरक्षा', desc: 'डेटा लीक का कोई खतरा नहीं। कोई सर्वर आपकी फाइलें नहीं देख सकता।' },
        { title: 'कोई फ़ाइल सीमा नहीं', desc: 'आपकी डिवाइस रैम ही आपकी क्षमता तय करती है।' },
        { title: 'ऑफलाइन काम करता है', desc: 'इंटरनेट बंद होने पर भी आप संपादन कर सकते हैं।' },
      ],
      faqs: [
        { q: 'क्या मेरी फ़ाइलें सुरक्षित हैं? (Are my files safe?)', a: 'हाँ, 100% पूरी तरह सुरक्षित हैं। साधारण टूल्स फ़ाइलों को क्लाउड सर्वर पर अपलोड करते हैं। nosignpdf.com में क्लाइंट-साइड (Client-Side) तकनीक से फाइलें केवल आपके ब्राउज़र की रैम (RAM) में खुलती हैं। सुरक्षित (zero data collection / गोपनीयता): इंटरनेट पर एक भी बाइट नहीं भेजी जाती।' },
        { q: 'क्या nosignpdf.com बिना लॉगिन और बिना वॉटरमार्क के मुफ्त पीडीएफ संपादक है?', a: 'हाँ! यह 100% मुफ्त पीडीएफ संपादक है बिना लॉगिन (bez logowania), बिना पंजीकरण और बिना किसी वॉटरमार्क (bez znaków wodnych) के।' },
        { q: 'क्लाउड टूल्स की तुलना में यह कितना तेज़ (szybki) है?', a: 'यह अल्ट्रा-तेज़ है क्योंकि अपलोड या डाउनलोड का इंतज़ार नहीं करना पड़ता। सारा काम आपके डिवाइस के प्रोसेसर से तुरंत और ऑफलाइन भी होता है।' },
      ],
      extendedText: 'गोपनीय कानूनी, वित्तीय और व्यक्तिगत दस्तावेजों के संपादन के लिए PDF Studio Online एक आदर्श और सुरक्षित विकल्प है।',
      keywords: ['मुफ्त पीडीएफ संपादक ऑनलाइन', 'सुरक्षित पीडीएफ टूल्स', 'बिना अपलोड पीडीएफ एडिट', 'pdf studio online'],
    },
    '/wypelnij-formularz-pdf': {
      h2Title: 'पीडीएफ फॉर्म फिलर – बिना प्रिंट किए मूल AcroForms भरें',
      intro: 'सरकारी फॉर्म, कर रिटर्न और अनुबंध भरें। यह टूल इंटरैक्टिव डिजिटल फ़ील्ड्स (AcroForms) की पहचान करता है और नए टेक्स्ट बॉक्स और चेकबॉक्स जोड़ने की सुविधा देता है।',
      steps: [
        { title: '1. फॉर्म अपलोड करें', desc: 'दस्तावेज़ चुनें। डिजिटल फ़ील्ड्स अपने आप लोड हो जाते हैं।' },
        { title: '2. जानकारी भरें या फ़ील्ड जोड़ें', desc: 'बॉक्स में टाइप करें या नए फ़ील्ड्स जोड़ने के लिए टूल का उपयोग करें।' },
        { title: '3. भरा हुआ पीडीएफ सहेजें', desc: 'आधिकारिक AcroForm प्रारूप में डेटा सहेजें।' },
      ],
      benefits: [
        { title: 'आधिकारिक AcroForm फ़ील्ड्स', desc: 'Adobe Acrobat और सरकारी पोर्टलों के अनुकूल।' },
        { title: 'कागज और समय की बचत', desc: 'प्रिंट और स्कैन करने की आवश्यकता नहीं।' },
        { title: 'पूर्ण डेटा सुरक्षा', desc: 'आपका व्यक्तिगत डेटा डिवाइस में ही रहता है।' },
      ],
      faqs: [
        { q: 'क्या यह फॉर्म दूसरे सॉफ्टवेयर में काम करेगा?', a: 'हाँ, यह अंतरराष्ट्रीय ISO 32000 मानक का पालन करता है।' },
      ],
      extendedText: 'डिजिटल फॉर्म भरने की आधुनिक और तेज तकनीक सीधे आपके ब्राउज़र में।',
      keywords: ['पीडीएफ फॉर्म भरें', 'ऑनलाइन फॉर्म फिलर', 'सरकारी फॉर्म पीडीएफ भरें', 'acroforms'],
    },
    '/usun-strony-z-pdf': {
      h2Title: 'पीडीएफ से अवांछित पृष्ठ हटाएं – त्वरित और निजी',
      intro: 'खाली पृष्ठों या अतिरिक्त शीटों को एक क्लिक में हटाएं।',
      steps: [
        { title: '1. पीडीएफ खोलें', desc: 'सभी पृष्ठों के थंबनेल देखें।' },
        { title: '2. पृष्ठ चुनें', desc: 'हटाने के लिए ट्रैश आइकन पर क्लिक करें।' },
        { title: '3. डाउनलोड करें', desc: 'साफ सुथरा पीडीएफ प्राप्त करें।' },
      ],
      benefits: [
        { title: 'गुणवत्ता बरकरार', desc: 'टेक्स्ट और ग्राफिक्स पहले जैसे रहते हैं।' },
        { title: 'फ़ाइल का आकार छोटा', desc: 'ईमेल से भेजना आसान होता है।' },
      ],
      faqs: [
        { q: 'क्या मैं गलती से हटाए पृष्ठ वापस ला सकता हूँ?', a: 'हाँ, डाउनलोड से पहले रीसेट करें।' },
      ],
      extendedText: 'दस्तावेजों से खाली या गैर-जरूरी पन्ने आसानी से हटाएं।',
      keywords: ['पीडीएफ पृष्ठ हटाएं', 'पेज डिलीट पीडीएफ', 'खाली पन्ने हटाएं'],
    },
    '/obroc-pdf': {
      h2Title: 'पीडीएफ पृष्ठों को ऑनलाइन घुमाएं – स्थायी रूप से सीधा करें',
      intro: 'उल्टे या आड़े-तिरछे स्कैन किए गए पृष्ठों को 90°, 180° या 270° घुमाएं।',
      steps: [
        { title: '1. फ़ाइल चुनें', desc: 'थंबनेल में पृष्ठों का ओरिएंटेशन देखें।' },
        { title: '2. पृष्ठ घुमाएं', desc: 'रोटेट बटन पर क्लिक करें।' },
        { title: '3. सहेजें', desc: 'सही दिशा में पीडीएफ डाउनलोड करें।' },
      ],
      benefits: [
        { title: 'स्थायी रोटेशन', desc: 'सभी उपकरणों पर सही दिखाई देगा।' },
        { title: 'चुनिंदा पृष्ठ घुमाएं', desc: 'केवल गलत पृष्ठों को सीधा करें।' },
      ],
      faqs: [
        { q: 'क्या टेक्स्ट धुंधला होगा?', a: 'नहीं, केवल ओरिएंटेशन फ्लैग बदला जाता है।' },
      ],
      extendedText: 'स्कैन किए गए दस्तावेजों को सीधा करने का सबसे आसान टूल।',
      keywords: ['पीडीएफ घुमाएं', 'रोटेट पीडीएफ', 'पीडीएफ सीधा करें'],
    },
    '/polacz-pdf': {
      h2Title: 'पीडीएफ फाइलें जोड़ें (Merge PDF) – कई दस्तावेज़ों को एक बनाएं',
      intro: 'कई अलग-अलग पीडीएफ फाइलों को एक ही क्रमबद्ध दस्तावेज़ में जोड़ें।',
      steps: [
        { title: '1. फाइलें जोड़ें', desc: 'दो या अधिक पीडीएफ फाइलें चुनें।' },
        { title: '2. क्रम व्यवस्थित करें', desc: 'थंबनेल को खींचकर सही क्रम में लाएं।' },
        { title: '3. मर्ज करें', desc: 'एकल संयुक्त दस्तावेज़ डाउनलोड करें।' },
      ],
      benefits: [
        { title: 'कोई फ़ाइल सीमा नहीं', desc: 'जितनी चाहें उतनी फाइलें जोड़ें।' },
        { title: 'मूल फॉर्मेटिंग सुरक्षित', desc: 'वेक्टर और फॉन्ट सही रहते हैं।' },
      ],
      faqs: [
        { q: 'क्या मैं जोड़ने से पहले पेज हटा सकता हूँ?', a: 'हाँ, आप किसी भी पेज को हटा या घुमा सकते हैं।' },
      ],
      extendedText: 'रिपोर्ट्स और प्रमाणपत्रों को एक पीडीएफ में जोड़ना अब बहुत आसान है।',
      keywords: ['पीडीएफ जोड़ें', 'मर्ज पीडीएफ', 'पीडीएफ फाइलें कंबाइन करें'],
    },
    '/rozdziel-pdf': {
      h2Title: 'पीडीएफ विभाजित करें – महत्वपूर्ण पृष्ठ निकालें',
      intro: 'बड़ी पीडीएफ फाइल में से केवल आवश्यक पृष्ठ (जैसे 1-3, 5) निकालकर नई फाइल बनाएं।',
      steps: [
        { title: '1. दस्तावेज़ चुनें', desc: 'विभाजित करने वाली फ़ाइल अपलोड करें।' },
        { title: '2. पेज रेंज दर्ज करें', desc: 'जैसे 1-4 या सीधे थंबनेल पर क्लिक करें।' },
        { title: '3. नया पीडीएफ निकालें', desc: 'हल्की और नई फाइल डाउनलोड करें।' },
      ],
      benefits: [
        { title: 'लचीला रेंज चयन', desc: 'मनचाहे पन्ने आसानी से चुनें।' },
        { title: 'तेज़ प्रोसेसिंग', desc: 'एक सेकंड से भी कम में निष्पादन।' },
      ],
      faqs: [
        { q: 'क्या मेरी मूल फ़ाइल बदल जाएगी?', a: 'नहीं, मूल फ़ाइल जैसी है वैसी ही रहेगी।' },
      ],
      extendedText: 'लंबे दस्तावेजों से जरूरी पन्ने अलग करने का सबसे सुरक्षित तरीका।',
      keywords: ['पीडीएफ अलग करें', 'स्प्लिट पीडीएफ', 'पीडीएफ पेज निकालें'],
    },
    '/wyczysc-metadane-pdf': {
      h2Title: 'पीडीएफ मेटाडेटा हटाएं ऑनलाइन – छिपे हुए डेटा मिटाएं',
      intro: 'पीडीएफ दस्तावेजों में छिपा हुआ डेटा जैसे लेखक का नाम, सॉफ्टवेयर विवरण और समय दर्ज होता है। बिना सर्वर पर फाइल भेजे इसे पूरी तरह साफ़ करें।',
      steps: [
        { title: '1. फ़ाइल चुनें', desc: 'दस्तावेज़ को ब्राउज़र में खोलें और मेटाडेटा की जांच करें।' },
        { title: '2. पहचाने गए डेटा देखें', desc: 'लेखक, सॉफ्टवेयर और संपादन समय की सूची देखें।' },
        { title: '3. साफ़ करें और डाउनलोड करें', desc: 'सभी छिपे हुए विवरण हटाकर सुरक्षित पीडीएफ प्राप्त करें।' },
      ],
      benefits: [
        { title: '100% स्थानीय सुरक्षा', desc: 'फाइलें केवल आपकी डिवाइस मेमोरी में प्रोसेस होती हैं।' },
        { title: 'पूर्ण सफाई', desc: 'XMP स्ट्रीम और आंतरिक पहचान कोड पूरी तरह हटाए जाते हैं।' },
      ],
      faqs: [
        { q: 'क्या इससे दस्तावेज़ की सामग्री बदलती है?', a: 'नहीं, केवल छिपे हुए हेडर हटाए जाते हैं; मुख्य सामग्री वैसी ही रहती है।' },
      ],
      extendedText: 'संवेदनशील दस्तावेजों को भेजने से पहले मेटाडेटा हटाना एक बेहतरीन सुरक्षा उपाय है।',
      keywords: ['पीडीएफ मेटाडेटा हटाएं', 'मेटाडेटा क्लीनर', 'पीडीएफ से लेखक हटाएं'],
    },
  },
};
