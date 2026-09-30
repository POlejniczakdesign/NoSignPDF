import os
import zipfile
import shutil
import json
import re

dist_dir = 'dist'
zip_filename = 'cloudflare-pages-dist.zip'
site_domain = 'https://nosignpdf.com'

if not os.path.exists(dist_dir):
    print("Error: dist directory does not exist. Run 'npm run build' first.")
    exit(1)

# Ensure 200.html exists in dist as Cloudflare Pages native SPA fallback
index_path = os.path.join(dist_dir, 'index.html')
spa_fallback_path = os.path.join(dist_dir, '200.html')
spa_404_path = os.path.join(dist_dir, '404.html')
if os.path.exists(index_path):
    shutil.copyfile(index_path, spa_fallback_path)
    shutil.copyfile(index_path, spa_404_path)
    print(f"Created native SPA fallbacks {spa_fallback_path} and {spa_404_path}")

# Read clean base HTML once before any index.html files are modified
with open(index_path, 'r', encoding='utf-8') as f:
    clean_base_html = f.read()

# Strictly ensure no _redirects file exists anywhere
for red_path in ['_redirects', os.path.join('public', '_redirects'), os.path.join(dist_dir, '_redirects')]:
    if os.path.exists(red_path):
        try:
            os.remove(red_path)
            print(f"Removed {red_path} to avoid redirect loops and conflicts.")
        except Exception:
            pass

# Generate _routes.json
routes_config = {
    "version": 1,
    "include": ["/*"],
    "exclude": [
        "/sitemap.xml",
        "/sitemap*.xml",
        "/robots.txt",
        "/ads.txt",
        "/favicon.ico",
        "/assets/*"
    ]
}
with open(os.path.join(dist_dir, '_routes.json'), 'w', encoding='utf-8') as f:
    json.dump(routes_config, f, indent=2)
    f.write('\n')
with open(os.path.join('public', '_routes.json'), 'w', encoding='utf-8') as f:
    json.dump(routes_config, f, indent=2)
    f.write('\n')
print("Generated _routes.json ensuring static files bypass SPA interception.")

# Clean up wrangler files
for cleanup_candidate in ['wrangler.json', 'wrangler.jsonc', 'wrangler.toml', os.path.join(dist_dir, 'wrangler.json')]:
    if os.path.exists(cleanup_candidate):
        try:
            os.remove(cleanup_candidate)
            print(f"Removed {cleanup_candidate} so Cloudflare Pages builds as native static assets.")
        except Exception:
            pass

# Tools and localized metadata definitions for SEO pre-rendering
TOOLS_METADATA = {
    "/": {
        "pl": {
            "title": "Edytor PDF Online – 100% Darmowy, Bez Logowania i Bezpieczny",
            "desc": "Darmowy edytor PDF online działający w Twojej przeglądarce bez logowania i rejestracji. Łącz, dziel, obracaj, usuwaj strony i wypełniaj formularze PDF bez wysyłania plików na serwer."
        },
        "en": {
            "title": "Free Online PDF Editor – No Sign-Up, Private & In-Browser",
            "desc": "100% free online PDF editor running client-side in your browser. Merge, split, rotate, delete pages, and fill PDF forms with zero sign-up and no watermarks."
        },
        "es": {
            "title": "Editor PDF Gratis Online – Sin Registro, Seguro y en Navegador",
            "desc": "Editor PDF online 100% gratis y privado que funciona en tu navegador sin registro. Une, divide, gira, elimina páginas y rellena formularios PDF sin subir tus archivos."
        },
        "hi": {
            "title": "मुफ्त ऑनलाइन पीडीएफ संपादक – बिना लॉगिन, 100% सुरक्षित और निजी",
            "desc": "ब्राउज़र में स्थानीय रूप से चलने वाला 100% मुफ्त पीडीएफ एडिटर। बिना रजिस्ट्रेशन पीडीएफ फाइलें जोड़ें, अलग करें, घुमाएं और फॉर्म भरें बिना सर्वर पर फाइल भेजे।"
        },
        "pt": {
            "title": "Editor de PDF Online Grátis – Sem Cadastro, Seguro no Navegador",
            "desc": "Editor de PDF online 100% gratuito e privado que roda direto no seu navegador sem cadastro. Junte, divida, gire, exclua páginas e preencha formulários PDF sem enviar arquivos para a nuvem."
        },
        "ru": {
            "title": "Бесплатный Онлайн PDF Редактор – Без Регистрации, Приватно в Браузере",
            "desc": "100% бесплатный онлайн-редактор PDF прямо в вашем браузере. Объединяйте, разделяйте, поворачивайте, удаляйте страницы и заполняйте формы без отправки файлов на сервер."
        }
    },
    "/polacz-pdf": {
        "pl": {
            "title": "Połącz PDF Online – Darmowe Łączenie Plików PDF bez Logowania",
            "desc": "Szybko i bezpiecznie połącz wiele plików PDF w jeden dokument online. W 100% darmowe narzędzie, bez rejestracji i bez znaku wodnego."
        },
        "en": {
            "title": "Merge PDF Online – Free PDF Joiner with No Sign-Up",
            "desc": "Combine multiple PDF files into one single document online quickly and securely. 100% free tool, no registration, no file size limits, and no watermarks."
        },
        "es": {
            "title": "Unir PDF Online – Combinar Archivos PDF Gratis Sin Registro",
            "desc": "Une múltiples archivos PDF en un solo documento online de forma rápida y segura. Herramienta 100% gratis, sin registro y sin marcas de agua."
        },
        "hi": {
            "title": "पीडीएफ जोड़ें ऑनलाइन – मुफ्त में कई पीडीएफ एक करें (No Sign-Up)",
            "desc": "कई पीडीएफ फाइलों को एक दस्तावेज़ में सुरक्षित रूप से ऑनलाइन जोड़ें। 100% मुफ्त टूल, बिना लॉगिन और बिना वॉटरमार्क के।"
        },
        "pt": {
            "title": "Juntar PDF Online – Combinar Arquivos PDF Grátis sem Cadastro",
            "desc": "Junte múltiplos arquivos PDF em um único documento online com rapidez e segurança. Ferramenta 100% gratuita, sem limites, sem registro e sem marca d’água."
        },
        "ru": {
            "title": "Объединить PDF Онлайн – Бесплатное Слияние Файлов PDF Без Регистрации",
            "desc": "Быстро и безопасно объединяйте несколько файлов PDF в один документ онлайн. 100% бесплатно, без регистрации, водяных знаков и лимитов на размер."
        }
    },
    "/rozdziel-pdf": {
        "pl": {
            "title": "Rozdziel PDF Online – Darmowe Wyodrębnianie Stron z PDF",
            "desc": "Błyskawicznie podziel plik PDF na pojedyncze strony lub wyodrębnij wybrany zakres arkuszy. Całkowicie za darmo, bez rejestracji i bez limitów."
        },
        "en": {
            "title": "Split PDF Online – Extract Pages from PDF for Free",
            "desc": "Instantly split PDF documents into single pages or extract custom page ranges online. 100% free, client-side private, with no sign-up required."
        },
        "es": {
            "title": "Dividir PDF Online – Extraer Páginas de PDF Gratis Sin Registro",
            "desc": "Divide documentos PDF en páginas sueltas o extrae rangos específicos online. 100% gratis, sin registro y con total privacidad en tu navegador."
        },
        "hi": {
            "title": "पीडीएफ अलग करें ऑनलाइन – पेज निकालें व विभाजित करें मुफ्त में",
            "desc": "पीडीएफ फाइल को अलग-अलग पेजों में तुरंत विभाजित करें या अपनी पसंद के पेज निकालें। 100% मुफ्त, बिना पंजीकरण और पूर्ण सुरक्षा के साथ।"
        },
        "pt": {
            "title": "Dividir PDF Online – Separar e Extrair Páginas de PDF Grátis",
            "desc": "Extraia páginas específicas ou divida documentos PDF pesados em arquivos menores no seu navegador. Rápido, seguro e sem enviar nada para a nuvem."
        },
        "ru": {
            "title": "Разделить PDF Онлайн – Извлечь Страницы из PDF Бесплатно",
            "desc": "Извлекайте нужные диапазоны страниц или разделяйте большие PDF на части прямо в браузере. 100% конфиденциально без загрузки в облако."
        }
    },
    "/wypelnij-formularz-pdf": {
        "pl": {
            "title": "Wypełnij Formularz PDF Online – Bez Drukowania i Logowania",
            "desc": "Uzupełniaj wnioski urzędowe, pisma i formularze PDF bezpośrednio w przeglądarce. Wpisuj tekst, zaznaczaj pola, podpisuj i zapisuj plik bez rejestracji."
        },
        "en": {
            "title": "Fill PDF Form Online – Free PDF Form Filler No Sign-Up",
            "desc": "Fill out applications, contracts, and official PDF forms directly in your browser. Type text, tick checkboxes, and download instantly without printing or sign-up."
        },
        "es": {
            "title": "Rellenar Formulario PDF Online – Gratis, Sin Imprimir y Sin Registro",
            "desc": "Completa formularios, contratos y solicitudes oficiales PDF directamente en tu navegador. Escribe texto, marca casillas y guarda sin registro."
        },
        "hi": {
            "title": "पीडीएफ फॉर्म भरें ऑनलाइन – बिना प्रिंट और बिना लॉगिन के मुफ्त",
            "desc": "सरकारी आवेदन, अनुबंध और फॉर्म सीधे अपने ब्राउज़र में भरें। टेक्स्ट टाइप करें, चेकबॉक्स टिक करें और बिना लॉगिन तुरंत डाउनलोड करें।"
        },
        "pt": {
            "title": "Preencher Formulário PDF Online – Escrever e Assinar PDF Grátis",
            "desc": "Preencha formulários oficiais, requerimentos e contratos PDF com suporte a campos nativos AcroForm e texto livre sem precisar imprimir."
        },
        "ru": {
            "title": "Заполнить Форму PDF Онлайн – Редактировать Бланки и Заявления",
            "desc": "Заполняйте официальные бланки, заявления и договоры онлайн с нативной поддержкой AcroForm без печати на бумаге и сканирования."
        }
    },
    "/obroc-pdf": {
        "pl": {
            "title": "Obróć PDF Online – Obracanie Stron PDF o 90, 180 Stopni Za Darmo",
            "desc": "Trwale obróć krzywe lub odwrócone strony PDF o 90°, 180° lub 270°. Napraw skany dokumentów w pamięci przeglądarki bez logowania i bez opłat."
        },
        "en": {
            "title": "Rotate PDF Online – Turn PDF Pages 90 or 180 Degrees Free",
            "desc": "Permanently rotate single pages or entire PDF files by 90, 180, or 270 degrees. Fix upside-down scans instantly in your browser with no sign-up."
        },
        "es": {
            "title": "Rotar PDF Online – Girar Páginas PDF 90 o 180 Grados Gratis",
            "desc": "Gira páginas individuales o todo el archivo PDF a 90°, 180° o 270° de forma permanente. Arregla escaneos invertidos online sin registro."
        },
        "hi": {
            "title": "पीडीएफ घुमाएं ऑनलाइन – 90 या 180 डिग्री पेज रोटेट करें मुफ्त",
            "desc": "उल्टे या तिरछे स्कैन किए गए पीडीएफ पेजों को 90°, 180° या 270° घुमाएं। बिना लॉगिन और पूरी तरह सुरक्षित अपने ब्राउज़र में ठीक करें।"
        },
        "pt": {
            "title": "Girar PDF Online – Rotacionar Páginas de PDF em 90°, 180° e 270°",
            "desc": "Gire páginas individuais ou todo o documento PDF para corrigir digitalizações tortas. Salve permanentemente no navegador com um clique."
        },
        "ru": {
            "title": "Повернуть PDF Онлайн – Поворот Страниц PDF на 90, 180 и 270 Градусов",
            "desc": "Поворачивайте отдельные страницы или весь документ PDF для исправления сканов. Сохраняйте файл локально в браузере за один клик."
        }
    },
    "/usun-strony-z-pdf": {
        "pl": {
            "title": "Usuń Strony z PDF Online – Wytnij Zbędne Strony z Pliku PDF",
            "desc": "Wybierz i usuń niepotrzebne strony lub puste arkusze ze swojego dokumentu PDF za pomocą jednego kliknięcia. Szybko, za darmo i bez wysyłania do chmury."
        },
        "en": {
            "title": "Delete Pages from PDF Online – Remove PDF Pages for Free",
            "desc": "Select and remove unwanted or blank pages from your PDF file with one click. Fast, free, client-side, and no registration required."
        },
        "es": {
            "title": "Eliminar Páginas de PDF Online – Borrar Páginas Gratis",
            "desc": "Selecciona y elimina hojas no deseadas o páginas en blanco de tu documento PDF con un solo clic. Gratis, rápido y 100% privado."
        },
        "hi": {
            "title": "पीडीएफ से पेज हटाएं ऑनलाइन – अवांछित पेज मिटाएं मुफ्त में",
            "desc": "अपने पीडीएफ दस्तावेज़ से खाली या अनावश्यक पेज एक क्लिक में हटाएं। सुरक्षित, तेज़ और बिना किसी पंजीकरण के पूरी तरह मुफ्त।"
        },
        "pt": {
            "title": "Excluir Páginas de PDF Online – Remover Páginas Desnecessárias Grátis",
            "desc": "Remova páginas em branco ou desnecessárias de qualquer documento PDF instantaneamente. Baixe o arquivo limpo e otimizado sem cadastro."
        },
        "ru": {
            "title": "Удалить Страницы из PDF Онлайн – Вырезать Листы из Документа",
            "desc": "Мгновенно удаляйте пустые или лишние страницы из файла PDF. Быстро, просто и полностью безопасно в вашем браузере."
        }
    },
    "/pdf-to-word": {
        "pl": {
            "title": "Konwertuj PDF do Word Online (.docx) – Darmowa Konwersja bez Logowania",
            "desc": "Przekonwertuj dokument PDF na edytowalny plik Word (.docx) bezpośrednio w przeglądarce. Ekstrakcja tekstu bez wysyłania plików na serwer."
        },
        "en": {
            "title": "Convert PDF to Word Online (.docx) – Free Converter No Sign-Up",
            "desc": "Convert PDF documents into editable Word (.docx) files directly in your browser. Fast client-side text extraction with no file upload to servers."
        },
        "es": {
            "title": "Convertir PDF a Word Online (.docx) – Gratis y Sin Registro",
            "desc": "Convierte tus documentos PDF a archivos editables de Word (.docx) directamente en tu navegador. Extracción de texto local 100% privada."
        },
        "hi": {
            "title": "पीडीएफ से वर्ड (.docx) बदलें ऑनलाइन – मुफ्त कनवर्टर बिना लॉगिन",
            "desc": "पीडीएफ दस्तावेज़ को संपादन योग्य वर्ड (.docx) फाइल में आसानी से बदलें। बिना सर्वर पर अपलोड किए स्थानीय रूप से टेक्स्ट निकालें।"
        },
        "pt": {
            "title": "Converter PDF para Word Online – PDF para DOCX Grátis no Navegador",
            "desc": "Extraia texto de arquivos PDF e salve como documento do Word (.docx) ou texto sem enviar nada para servidores externos."
        },
        "ru": {
            "title": "Конвертировать PDF в Word Онлайн – PDF в DOCX Бесплатно",
            "desc": "Извлечение текста и конвертация документов PDF в редактируемый формат Word (.docx) локально в браузере."
        }
    },
    "/word-to-pdf": {
        "pl": {
            "title": "Konwertuj Word do PDF Online – Wklej Tekst i Utwórz Dokument PDF",
            "desc": "Stwórz profesjonalny plik PDF z tekstu lub notatek. Wbudowany edytor tekstu, czysty format i natychmiastowe pobieranie pliku PDF za darmo."
        },
        "en": {
            "title": "Convert Word / Text to PDF Online – Free PDF Creator",
            "desc": "Turn text, notes, and documents into a clean formatted PDF. Built-in editor, zero sign-up, and instant local generation in your browser."
        },
        "es": {
            "title": "Convertir Word a PDF Online – Creador de PDF Gratis",
            "desc": "Crea documentos PDF profesionales a partir de texto o notas. Editor integrado, descarga inmediata y 100% gratis sin registro."
        },
        "hi": {
            "title": "वर्ड से पीडीएफ बनाएं ऑनलाइन – टेक्स्ट से पीडीएफ कनवर्टर मुफ्त",
            "desc": "टेक्स्ट या नोट्स से सुंदर और पेशेवर पीडीएफ तैयार करें। तुरंत स्थानीय रूप से जनरेट करें बिना किसी लॉगिन या शुल्क के।"
        },
        "pt": {
            "title": "Converter Word para PDF Online – Criar Documento PDF a partir de Texto",
            "desc": "Cole seu texto ou importe arquivo e gere um documento PDF limpo com tipografia clara de forma rápida e 100% gratuita."
        },
        "ru": {
            "title": "Конвертировать Word в PDF Онлайн – Создать PDF из Текста",
            "desc": "Вставьте текст или загрузите файл для быстрой генерации чистого PDF-документа прямо в браузере."
        }
    },
    "/pdf-to-excel": {
        "pl": {
            "title": "Konwertuj PDF do Excel Online – Ekstrakcja Tabel i Danych do CSV",
            "desc": "Błyskawicznie wyodrębnij tabele i dane liczbowe z pliku PDF do formatu CSV / Excel. Bezpieczne przetwarzanie w pamięci RAM bez logowania."
        },
        "en": {
            "title": "Convert PDF to Excel Online – Extract Tables to CSV / Excel Free",
            "desc": "Extract tables and financial data from PDF files directly into Excel-compatible CSV sheets. Fast, accurate, and completely private."
        },
        "es": {
            "title": "Convertir PDF a Excel Online – Extraer Tablas a CSV / Excel Gratis",
            "desc": "Extrae tablas y datos numéricos de tus archivos PDF a hojas de cálculo CSV compatibles con Excel. Rápido, gratis y sin subir archivos."
        },
        "hi": {
            "title": "पीडीएफ से एक्सेल बदलें ऑनलाइन – टेबल और डेटा सीएसवी में निकालें",
            "desc": "पीडीएफ से टेबल और संख्यात्मक डेटा आसानी से एक्सेल के अनुकूल सीएसवी में निकालें। पूरी तरह सुरक्षित और मुफ्त ऑनलाइन टूल।"
        },
        "pt": {
            "title": "Converter PDF para Excel Online – Extrair Tabelas para Planilha CSV",
            "desc": "Extraia dados, linhas e tabelas de arquivos PDF para planilhas CSV e Excel compatíveis sem upload para a nuvem."
        },
        "ru": {
            "title": "Конвертировать PDF в Excel Онлайн – Извлечь Таблицы в CSV",
            "desc": "Экспорт таблиц и строк из документов PDF в чистый формат Excel CSV с кодировкой UTF-8."
        }
    },
    "/excel-to-pdf": {
        "pl": {
            "title": "Konwertuj Excel do PDF Online – Generuj Raport Tabelaryczny PDF",
            "desc": "Wklej dane tabelaryczne z programu Excel lub Arkuszy Google i wygeneruj czytelny raport PDF z siatką danych. 100% darmowe narzędzie."
        },
        "en": {
            "title": "Convert Excel to PDF Online – Table to PDF Report Generator",
            "desc": "Paste table rows and columns from Excel or Google Sheets to generate a clean, formatted PDF table report instantly for free."
        },
        "es": {
            "title": "Convertir Excel a PDF Online – Generador de Reportes PDF desde Tablas",
            "desc": "Pega filas y columnas de Excel o Google Sheets para generar un informe PDF bien formateado y con cuadrícula al instante."
        },
        "hi": {
            "title": "एक्सेल से पीडीएफ बदलें ऑनलाइन – टेबल से पीडीएफ रिपोर्ट बनाएं",
            "desc": "एक्सेल या गूगल शीट्स से डेटा पेस्ट करें और सुंदर टेबल वाला पीडीएफ दस्तावेज़ तैयार करें। बिना लॉगिन तुरंत मुफ्त बनाएं।"
        },
        "pt": {
            "title": "Converter Excel para PDF Online – Gerar Relatório PDF de Tabela",
            "desc": "Cole células de planilhas Excel ou carregue CSV para gerar relatórios em PDF formatados e organizados com facilidade."
        },
        "ru": {
            "title": "Конвертировать Excel в PDF Онлайн – Таблицы в PDF",
            "desc": "Превратите данные из таблиц Excel или файлов CSV в аккуратный PDF-отчет с сеткой данных."
        }
    },
    "/polityka-privacy": {
        "pl": {
            "title": "Polityka Prywatności i Regulamin – PDF Studio Online (nosignpdf.com)",
            "desc": "Zasady korzystania z darmowych narzędzi PDF Studio Online, gwarancja prywatności Client-Side, pliki cookies oraz warunki użytkowania."
        },
        "en": {
            "title": "Privacy Policy & Terms of Service – PDF Studio Online (nosignpdf.com)",
            "desc": "Terms of service, client-side zero upload privacy policy, cookies, and conditions for using PDF Studio Online at nosignpdf.com."
        },
        "es": {
            "title": "Política de Privacidad y Términos – PDF Studio Online (nosignpdf.com)",
            "desc": "Términos de servicio, garantía de privacidad sin subida de archivos (Client-Side) y política de cookies de PDF Studio Online."
        },
        "hi": {
            "title": "गोपनीयता नीति और नियम – PDF Studio Online (nosignpdf.com)",
            "desc": "nosignpdf.com की सेवा शर्तें, 100% क्लाइंट-साइड गोपनीयता गारंटी और कुकी नीति।"
        },
        "pt": {
            "title": "Política de Privacidade e Termos de Uso – NoSignPDF",
            "desc": "Termos de serviço, política de privacidade, conformidade com LGPD/GDPR e diretrizes de cookies e publicidade do NoSignPDF."
        },
        "ru": {
            "title": "Политика Конфиденциальности и Условия Использования – NoSignPDF",
            "desc": "Официальные правила сервиса, политика конфиденциальности, соответствие GDPR и регламент использования файлов cookie Google AdSense."
        }
    },
    "/kompresuj-pdf": {
        "pl": {
            "title": "Kompresuj PDF Online – Zmniejsz Rozmiar Pliku PDF bez Utraty Jakości",
            "desc": "Darmowa kompresja PDF online w przeglądarce. Zmniejsz wagę dokumentu do wysyłki e-mailem lub ePUAP bez logowania i bez wysyłania plików na serwer."
        },
        "en": {
            "title": "Compress PDF Online – Reduce PDF File Size Free No Sign-Up",
            "desc": "100% free online PDF compressor running locally in your browser. Reduce file size for email attachment limits with zero data collection and no watermarks."
        },
        "es": {
            "title": "Comprimir PDF Online – Reducir Tamaño de PDF Gratis Sin Registro",
            "desc": "Reduce el tamaño de tus documentos PDF online de forma rápida y segura. Herramienta 100% gratuita, privada en tu navegador y sin marcas de agua."
        },
        "hi": {
            "title": "पीडीएफ कंप्रेस करें ऑनलाइन – फाइल साइज छोटा करें मुफ्त में",
            "desc": "अपने ब्राउज़र में स्थानीय रूप से पीडीएफ का आकार घटाएं बिना गुणवत्ता खोए। 100% मुफ्त टूल, बिना लॉगिन और बिना वॉटरमार्क।"
        },
        "pt": {
            "title": "Comprimir PDF Online – Reduzir Tamanho de Arquivo PDF sem Perda",
            "desc": "Reduza o tamanho de arquivos PDF pesados para enviar por e-mail ou órgãos públicos mantendo a nitidez do texto e das imagens."
        },
        "ru": {
            "title": "Сжать PDF Онлайн – Уменьшить Размер Файла PDF Без Потери Качества",
            "desc": "Эффективно уменьшайте вес документов PDF для отправки по почте или загрузки на госпорталы с сохранением четкости текста."
        }
    },
    "/grafika-do-pdf": {
        "pl": {
            "title": "Grafika do PDF Online – Konwertuj Zdjęcia JPG, PNG do PDF Za Darmo",
            "desc": "Błyskawicznie połącz zdjęcia i pliki graficzne JPG, PNG, WebP w jeden estetyczny dokument PDF. 100% prywatnie w pamięci RAM bez rejestracji."
        },
        "en": {
            "title": "Image to PDF Online – Convert JPG and PNG to PDF Free",
            "desc": "Convert JPG, PNG, and WebP pictures into a clean multi-page PDF document online. Fast client-side conversion, no file size limit, and no sign-up."
        },
        "es": {
            "title": "Imagen a PDF Online – Convertir JPG y PNG a PDF Gratis",
            "desc": "Combina múltiples imágenes JPG, PNG o WebP en un solo documento PDF limpio. Gratis, seguro en tu navegador y sin registros."
        },
        "hi": {
            "title": "तस्वीर से पीडीएफ बनाएं ऑनलाइन – JPG और PNG से पीडीएफ कनवर्टर",
            "desc": "JPG, PNG और WebP तस्वीरों को तुरंत स्वच्छ पीडीएफ दस्तावेज़ में बदलें। सुरक्षित, तेज़ और बिना किसी पंजीकरण के पूरी तरह मुफ्त।"
        },
        "pt": {
            "title": "Imagem para PDF Online – Converter JPG, PNG e WebP em PDF Grátis",
            "desc": "Converta fotos e imagens JPG, PNG ou WebP em um documento PDF limpo com ajuste automático de proporções e margens."
        },
        "ru": {
            "title": "Картинки в PDF Онлайн – Конвертировать JPG и PNG в PDF Бесплатно",
            "desc": "Преобразуйте фотографии и изображения JPG, PNG, WebP в единый многостраничный PDF-документ прямо в браузере."
        }
    },
    "/wyczysc-metadane-pdf": {
        "pl": {
            "title": "Usuń Metadane z PDF Online – Bezpieczne Czyszczenie Ukrytych Danych",
            "desc": "Usuń ukryte metadane, autora, wersję programu Word i historię edycji z pliku PDF. 100% bezpłatnie i lokalnie w przeglądarce bez logowania i rejestracji."
        },
        "en": {
            "title": "Remove PDF Metadata Online – Free PDF Metadata Stripper",
            "desc": "Strip hidden author names, creation software, editing dates, and XMP metadata from PDF files in your browser. 100% private, free, and no sign-up."
        },
        "es": {
            "title": "Eliminar Metadatos de PDF Online – Limpiar Datos Ocultos Gratis",
            "desc": "Elimina autor, software de creación, fechas y metadatos XMP de tus archivos PDF online. 100% privado en tu navegador y sin registro."
        },
        "hi": {
            "title": "पीडीएफ मेटाडेटा हटाएं ऑनलाइन – छिपे हुए डेटा मिटाएं मुफ्त में",
            "desc": "अपने पीडीएफ दस्तावेज़ से लेखक का नाम, सॉफ्टवेयर विवरण और मेटाडेटा आसानी से हटाएं। 100% सुरक्षित और मुफ्त बिना लॉगिन।"
        },
        "pt": {
            "title": "Remover Metadados de PDF Online – Limpeza de Dados Ocultos e Autor",
            "desc": "Remova informações confidenciais ocultas, nome do autor, software e histórico de edição de arquivos PDF com total privacidade."
        },
        "ru": {
            "title": "Удалить Метаданные из PDF Онлайн – Очистка Скрытых Данных и Автора",
            "desc": "Полное удаление скрытых метаданных, имени автора, программы Word и истории изменений из PDF-файла 100% локально."
        }
    },
    "/wyciagnij-grafiki-z-pdf": {
        "pl": {
            "title": "Wyciągnij Grafiki z PDF Online – Darmowe Pobieranie Obrazów z PDF",
            "desc": "Wyodrębnij i pobierz wszystkie zdjęcia, ilustracje i grafiki osadzone w pliku PDF w oryginalnej jakości. 100% lokalnie w przeglądarce bez logowania."
        },
        "en": {
            "title": "Extract Images from PDF Online – Download Embedded Photos Free",
            "desc": "Extract and download all photos, images, and graphics embedded inside PDF files in original resolution. 100% private, free, and no sign-up."
        },
        "es": {
            "title": "Extraer Imágenes de PDF Online – Descargar Fotos de PDF Gratis",
            "desc": "Extrae y descarga todas las fotos, imágenes y gráficos incrustados en archivos PDF con calidad original. Seguro, online y sin registro."
        },
        "hi": {
            "title": "पीडीएफ से फोटो निकालें ऑनलाइन – तस्वीरें व ग्राफिक्स डाउनलोड करें मुफ्त",
            "desc": "पीडीएफ दस्तावेज़ से सभी अंतर्निहित तस्वीरें और ग्राफिक्स मूल गुणवत्ता में निकालें। 100% मुफ्त, सुरक्षित और बिना लॉगिन।"
        },
        "pt": {
            "title": "Extrair Imagens de PDF Online – Salvar Fotos de Documento em Alta Resolução",
            "desc": "Extraia todas as fotos e ilustrações incorporadas em arquivos PDF no formato JPG e PNG original sem perda de qualidade e sem cadastro."
        },
        "ru": {
            "title": "Извлечь Картинки из PDF Онлайн – Сохранить Фото в Высоком Качестве",
            "desc": "Быстро извлекайте встроенные изображения и фото из документов PDF в оригинальном качестве JPG/PNG без регистрации."
        }
    },
    "/zabezpiecz-pdf-haslem": {
        "pl": {
            "title": "Zabezpiecz PDF Hasłem Online – Szyfrowanie Dokumentów PDF Za Darmo",
            "desc": "Zaszyfruj poufny plik PDF silnym hasłem dostępu bezpośrednio w przeglądarce. Chroń umowy i dane finansowe bez wysyłania plików na serwer."
        },
        "en": {
            "title": "Protect PDF with Password Online – Free PDF Encryption Tool",
            "desc": "Encrypt your confidential PDF files with a strong password directly in your browser. Protect contracts and sensitive data with zero uploads."
        },
        "es": {
            "title": "Proteger PDF con Contraseña Online – Encriptar PDF Gratis",
            "desc": "Protege y encripta tus documentos PDF con contraseña de forma segura en tu navegador. Máxima privacidad sin subir tus archivos."
        },
        "hi": {
            "title": "पीडीएफ पासवर्ड सुरक्षित करें ऑनलाइन – पीडीएफ पर पासवर्ड लगाएं मुफ्त",
            "desc": "अपने महत्वपूर्ण पीडीएफ दस्तावेज़ को पासवर्ड से सुरक्षित और एन्क्रिप्ट करें सीधे ब्राउज़र में। 100% सुरक्षित और बिना लॉगिन।"
        },
        "pt": {
            "title": "Proteger PDF com Senha Online – Criptografar Documento com Segurança",
            "desc": "Bloqueie e proteja arquivos PDF confidenciais com senha e criptografia forte diretamente no seu navegador sem enviar dados à nuvem."
        },
        "ru": {
            "title": "Защитить PDF Паролем Онлайн – Надежное Шифрование Документов",
            "desc": "Установите надежный пароль и шифрование на ваш PDF-документ прямо в браузере без передачи конфиденциальных данных в сеть."
        }
    },
    "/usun-haslo-z-pdf": {
        "pl": {
            "title": "Usuń Hasło z PDF Online – Szybkie Odblokowywanie PDF bez Logowania",
            "desc": "Trwale usuń zabezpieczenie hasłem i ograniczenia edycji z pliku PDF. Odblokuj swój dokument w 100% prywatnie w pamięci RAM urządzenia."
        },
        "en": {
            "title": "Unlock PDF Online – Remove Password from PDF Free No Sign-Up",
            "desc": "Permanently remove password security and permissions restrictions from PDF files. Unlock your PDF locally in memory with zero data collection."
        },
        "es": {
            "title": "Desbloquear PDF Online – Quitar Contraseña de PDF Gratis Sin Registro",
            "desc": "Elimina la contraseña y restricciones de tus archivos PDF online de forma permanente. Seguro, rápido en tu navegador y sin registro."
        },
        "hi": {
            "title": "पीडीएफ पासवर्ड हटाएं ऑनलाइन – पीडीएफ अनलॉक करें मुफ्त में",
            "desc": "पीडीएफ फाइल से पासवर्ड सुरक्षा और प्रतिबंध हटाएं सीधे ब्राउज़र में। 100% मुफ्त, तेज़ और बिना किसी पंजीकरण के।"
        },
        "pt": {
            "title": "Desbloquear PDF Online – Remover Senha de PDF Rápido e Grátis",
            "desc": "Remova senhas e restrições de documentos PDF protegidos com facilidade. Acesse e imprima seus arquivos sem travas e sem cadastro."
        },
        "ru": {
            "title": "Снять Пароль с PDF Онлайн – Разблокировать Защищенный Документ",
            "desc": "Быстрое снятие пароля и ограничений с защищенных PDF-файлов онлайн. Скачивайте свободный документ без блокировок."
        }
    },
    "/zmien-pdf-na-czarno-bialy": {
        "pl": {
            "title": "Zmień PDF na Czarno-Biały Online – Konwersja do Skali Szarości",
            "desc": "Przekonwertuj kolorowy plik PDF do odcieni szarości (monochromatyczny) online. Zmniejsz zużycie tuszu drukarki i wagę pliku bez rejestracji."
        },
        "en": {
            "title": "Convert PDF to Grayscale Online – Black and White PDF Free",
            "desc": "Convert color PDF documents to clean black and white grayscale online. Save printer ink and toner client-side with no sign-up."
        },
        "es": {
            "title": "Convertir PDF a Blanco y Negro Online – PDF en Escala de Grises",
            "desc": "Convierte documentos PDF a color en escala de grises blanco y negro. Ahorra tinta de impresión de forma 100% gratuita y privada."
        },
        "hi": {
            "title": "पीडीएफ ब्लैक एंड व्हाइट करें ऑनलाइन – ग्रेस्केल कनवर्टर मुफ्त",
            "desc": "रंगीन पीडीएफ दस्तावेज़ को ब्लैक एंड व्हाइट (ग्रेस्केल) में बदलें। प्रिंटर स्याही बचाएं और फाइल साइज घटाएं बिना लॉगिन।"
        },
        "pt": {
            "title": "PDF em Preto e Branco Online – Converter PDF Colorido para Tons de Cinza",
            "desc": "Converta arquivos PDF coloridos para escala de cinza monocromática online. Economize tinta de impressora e reduza o tamanho do arquivo."
        },
        "ru": {
            "title": "Черно-Белый PDF Онлайн – Конвертировать PDF в Оттенки Серого",
            "desc": "Преобразуйте цветной PDF-документ в черно-белый формат (градации серого) онлайн. Экономьте тонер принтера и уменьшайте размер."
        }
    },
    "/ponumeruj-strony-pdf": {
        "pl": {
            "title": "Ponumeruj Strony w PDF Online – Dodaj Numery Stron do Dokumentu",
            "desc": "Automatycznie dodaj estetyczną numerację stron (np. 1 z N) do pliku PDF. Wybierz pozycję i format numerów w przeglądarce bez logowania."
        },
        "en": {
            "title": "Add Page Numbers to PDF Online – Number PDF Pages for Free",
            "desc": "Easily insert custom page numbering (e.g. Page 1 of N) into your PDF files online. Fast, clean formatting in your browser with no sign-up."
        },
        "es": {
            "title": "Numerar Páginas de PDF Online – Insertar Números de Página Gratis",
            "desc": "Añade números de página personalizados a tus documentos PDF online fácilmente. Rápido, seguro en tu navegador y sin registro."
        },
        "hi": {
            "title": "पीडीएफ में पेज नंबर जोड़ें ऑनलाइन – पृष्ठ क्रमांक लगाएं मुफ्त में",
            "desc": "अपने पीडीएफ दस्तावेज़ के पेजों पर क्रमांक (उदा. 1, 2, 3) आसानी से लगाएं। सुंदर फॉर्मेटिंग सीधे ब्राउज़र में बिना लॉगिन।"
        },
        "pt": {
            "title": "Numerar Páginas de PDF Online – Inserir Números de Página Grátis",
            "desc": "Adicione numeração de página personalizada e profissional (ex: Página 1 de N) aos seus documentos PDF com total facilidade."
        },
        "ru": {
            "title": "Пронумеровать Страницы PDF Онлайн – Вставить Номера Страниц в PDF",
            "desc": "Автоматически добавьте аккуратную нумерацию страниц (напр. 1 из N) в документ PDF. Настраивайте формат и позицию без регистрации."
        }
    }
}

# Primary canonical slugs for each tool by language
PRIMARY_URLS = {
    "/": {
        "pl": "/",
        "en": "/en",
        "es": "/es",
        "hi": "/hi",
        "pt": "/pt",
        "ru": "/ru"
    },
    "/polacz-pdf": {
        "pl": "/polacz-pdf",
        "en": "/en/merge-pdf",
        "es": "/es/unir-pdf",
        "hi": "/hi/merge-pdf",
        "pt": "/pt/unir-pdf",
        "ru": "/ru/obedinit-pdf"
    },
    "/rozdziel-pdf": {
        "pl": "/rozdziel-pdf",
        "en": "/en/split-pdf",
        "es": "/es/dividir-pdf",
        "hi": "/hi/split-pdf",
        "pt": "/pt/dividir-pdf",
        "ru": "/ru/razdelit-pdf"
    },
    "/wypelnij-formularz-pdf": {
        "pl": "/wypelnij-formularz-pdf",
        "en": "/en/fill-pdf-form",
        "es": "/es/rellenar-formulario-pdf",
        "hi": "/hi/fill-pdf-form",
        "pt": "/pt/preencher-formulario-pdf",
        "ru": "/ru/zapolnit-formu-pdf"
    },
    "/obroc-pdf": {
        "pl": "/obroc-pdf",
        "en": "/en/rotate-pdf",
        "es": "/es/rotar-pdf",
        "hi": "/hi/rotate-pdf",
        "pt": "/pt/girar-pdf",
        "ru": "/ru/povernut-pdf"
    },
    "/usun-strony-z-pdf": {
        "pl": "/usun-strony-z-pdf",
        "en": "/en/delete-pages",
        "es": "/es/eliminar-paginas-pdf",
        "hi": "/hi/delete-pages",
        "pt": "/pt/excluir-paginas-pdf",
        "ru": "/ru/udalit-stranicy-pdf"
    },
    "/kompresuj-pdf": {
        "pl": "/kompresuj-pdf",
        "en": "/en/compress-pdf",
        "es": "/es/comprimir-pdf",
        "hi": "/hi/compress-pdf",
        "pt": "/pt/comprimir-pdf",
        "ru": "/ru/szhat-pdf"
    },
    "/grafika-do-pdf": {
        "pl": "/grafika-do-pdf",
        "en": "/en/image-to-pdf",
        "es": "/es/imagen-a-pdf",
        "hi": "/hi/image-to-pdf",
        "pt": "/pt/imagem-para-pdf",
        "ru": "/ru/kartinki-v-pdf"
    },
    "/pdf-to-word": {
        "pl": "/pdf-to-word",
        "en": "/en/pdf-to-word",
        "es": "/es/pdf-a-word",
        "hi": "/hi/pdf-to-word",
        "pt": "/pt/pdf-para-word",
        "ru": "/ru/pdf-v-word"
    },
    "/word-to-pdf": {
        "pl": "/word-to-pdf",
        "en": "/en/word-to-pdf",
        "es": "/es/word-a-pdf",
        "hi": "/hi/word-to-pdf",
        "pt": "/pt/word-para-pdf",
        "ru": "/ru/word-v-pdf"
    },
    "/pdf-to-excel": {
        "pl": "/pdf-to-excel",
        "en": "/en/pdf-to-excel",
        "es": "/es/pdf-a-excel",
        "hi": "/hi/pdf-to-excel",
        "pt": "/pt/pdf-para-excel",
        "ru": "/ru/pdf-v-excel"
    },
    "/excel-to-pdf": {
        "pl": "/excel-to-pdf",
        "en": "/en/excel-to-pdf",
        "es": "/es/excel-a-pdf",
        "hi": "/hi/excel-to-pdf",
        "pt": "/pt/excel-para-pdf",
        "ru": "/ru/excel-v-pdf"
    },
    "/wyczysc-metadane-pdf": {
        "pl": "/wyczysc-metadane-pdf",
        "en": "/en/remove-pdf-metadata",
        "es": "/es/limpiar-metadatos-pdf",
        "hi": "/hi/remove-pdf-metadata",
        "pt": "/pt/remover-metadados-pdf",
        "ru": "/ru/udalit-metadannye-pdf"
    },
    "/wyciagnij-grafiki-z-pdf": {
        "pl": "/wyciagnij-grafiki-z-pdf",
        "en": "/en/extract-images-from-pdf",
        "es": "/es/extraer-imagenes-pdf",
        "hi": "/hi/extract-images-from-pdf",
        "pt": "/pt/extrair-imagens-pdf",
        "ru": "/ru/izvlech-kartinki-iz-pdf"
    },
    "/zabezpiecz-pdf-haslem": {
        "pl": "/zabezpiecz-pdf-haslem",
        "en": "/en/protect-pdf",
        "es": "/es/proteger-pdf",
        "hi": "/hi/protect-pdf",
        "pt": "/pt/proteger-pdf-com-senha",
        "ru": "/ru/zashchitit-pdf-parolem"
    },
    "/usun-haslo-z-pdf": {
        "pl": "/usun-haslo-z-pdf",
        "en": "/en/unlock-pdf",
        "es": "/es/desbloquear-pdf",
        "hi": "/hi/unlock-pdf",
        "pt": "/pt/desbloquear-pdf",
        "ru": "/ru/snyat-parol-s-pdf"
    },
    "/zmien-pdf-na-czarno-bialy": {
        "pl": "/zmien-pdf-na-czarno-bialy",
        "en": "/en/pdf-to-grayscale",
        "es": "/es/pdf-a-blanco-y-negro",
        "hi": "/hi/pdf-to-grayscale",
        "pt": "/pt/pdf-preto-e-branco",
        "ru": "/ru/cherno-belyj-pdf"
    },
    "/ponumeruj-strony-pdf": {
        "pl": "/ponumeruj-strony-pdf",
        "en": "/en/add-page-numbers-to-pdf",
        "es": "/es/numerar-paginas-pdf",
        "hi": "/hi/add-page-numbers-to-pdf",
        "pt": "/pt/numerar-paginas-pdf",
        "ru": "/ru/pronumerovat-stranicy-pdf"
    },
    "/polityka-privacy": {
        "pl": "/polityka-privacy",
        "en": "/en/privacy-policy",
        "es": "/es/politica-privacidad",
        "hi": "/hi/privacy-policy",
        "pt": "/pt/politica-de-privacidade",
        "ru": "/ru/politika-konfidencialnosti"
    }
}

# All URLs/subpaths to pre-render
ALL_SLUGS = {
    "/": {
        "pl": [
            "/",
            "/pl"
        ],
        "en": [
            "/en",
            "/en/"
        ],
        "es": [
            "/es",
            "/es/"
        ],
        "hi": [
            "/hi",
            "/hi/"
        ],
        "pt": [
            "/pt",
            "/pt/"
        ],
        "ru": [
            "/ru",
            "/ru/"
        ]
    },
    "/polacz-pdf": {
        "pl": [
            "/polacz-pdf",
            "/pl/polacz-pdf"
        ],
        "en": [
            "/en/merge-pdf",
            "/en/polacz-pdf"
        ],
        "es": [
            "/es/unir-pdf",
            "/es/polacz-pdf",
            "/es/combinar-pdf",
            "/es/juntar-pdf"
        ],
        "hi": [
            "/hi/merge-pdf",
            "/hi/polacz-pdf"
        ],
        "pt": [
            "/pt/unir-pdf",
            "/pt/polacz-pdf",
            "/pt/juntar-pdf",
            "/pt/mesclar-pdf"
        ],
        "ru": [
            "/ru/obedinit-pdf",
            "/ru/polacz-pdf",
            "/ru/soedinit-pdf",
            "/ru/skleit-pdf"
        ]
    },
    "/rozdziel-pdf": {
        "pl": [
            "/rozdziel-pdf",
            "/pl/rozdziel-pdf"
        ],
        "en": [
            "/en/split-pdf",
            "/en/rozdziel-pdf"
        ],
        "es": [
            "/es/dividir-pdf",
            "/es/rozdziel-pdf",
            "/es/separar-pdf"
        ],
        "hi": [
            "/hi/split-pdf",
            "/hi/rozdziel-pdf"
        ],
        "pt": [
            "/pt/dividir-pdf",
            "/pt/rozdziel-pdf",
            "/pt/separar-pdf"
        ],
        "ru": [
            "/ru/razdelit-pdf",
            "/ru/rozdziel-pdf",
            "/ru/razrezat-pdf"
        ]
    },
    "/wypelnij-formularz-pdf": {
        "pl": [
            "/wypelnij-formularz-pdf",
            "/pl/wypelnij-formularz-pdf"
        ],
        "en": [
            "/en/fill-pdf-form",
            "/en/wypelnij-formularz-pdf"
        ],
        "es": [
            "/es/rellenar-formulario-pdf",
            "/es/wypelnij-formularz-pdf",
            "/es/llenar-formulario-pdf"
        ],
        "hi": [
            "/hi/fill-pdf-form",
            "/hi/wypelnij-formularz-pdf"
        ],
        "pt": [
            "/pt/preencher-formulario-pdf",
            "/pt/wypelnij-formularz-pdf",
            "/pt/editar-formulario-pdf"
        ],
        "ru": [
            "/ru/zapolnit-formu-pdf",
            "/ru/wypelnij-formularz-pdf",
            "/ru/redaktirovat-pdf"
        ]
    },
    "/obroc-pdf": {
        "pl": [
            "/obroc-pdf",
            "/pl/obroc-pdf"
        ],
        "en": [
            "/en/rotate-pdf",
            "/en/obroc-pdf"
        ],
        "es": [
            "/es/rotar-pdf",
            "/es/obroc-pdf",
            "/es/girar-pdf"
        ],
        "hi": [
            "/hi/rotate-pdf",
            "/hi/obroc-pdf"
        ],
        "pt": [
            "/pt/girar-pdf",
            "/pt/obroc-pdf",
            "/pt/rotacionar-pdf"
        ],
        "ru": [
            "/ru/povernut-pdf",
            "/ru/obroc-pdf",
            "/ru/razvernut-pdf"
        ]
    },
    "/usun-strony-z-pdf": {
        "pl": [
            "/usun-strony-z-pdf",
            "/pl/usun-strony-z-pdf"
        ],
        "en": [
            "/en/delete-pages",
            "/en/usun-strony-z-pdf"
        ],
        "es": [
            "/es/eliminar-paginas-pdf",
            "/es/usun-strony-z-pdf",
            "/es/borrar-paginas-pdf"
        ],
        "hi": [
            "/hi/delete-pages",
            "/hi/usun-strony-z-pdf"
        ],
        "pt": [
            "/pt/excluir-paginas-pdf",
            "/pt/usun-strony-z-pdf",
            "/pt/remover-paginas-pdf"
        ],
        "ru": [
            "/ru/udalit-stranicy-pdf",
            "/ru/usun-strony-z-pdf",
            "/ru/vytashchit-stranitsy-pdf"
        ]
    },
    "/kompresuj-pdf": {
        "pl": [
            "/kompresuj-pdf",
            "/pl/kompresuj-pdf"
        ],
        "en": [
            "/en/compress-pdf",
            "/en/kompresuj-pdf"
        ],
        "es": [
            "/es/comprimir-pdf",
            "/es/kompresuj-pdf"
        ],
        "hi": [
            "/hi/compress-pdf",
            "/hi/kompresuj-pdf"
        ],
        "pt": [
            "/pt/comprimir-pdf",
            "/pt/kompresuj-pdf",
            "/pt/otimizar-pdf"
        ],
        "ru": [
            "/ru/szhat-pdf",
            "/ru/kompresuj-pdf",
            "/ru/kompressiya-pdf"
        ]
    },
    "/grafika-do-pdf": {
        "pl": [
            "/grafika-do-pdf",
            "/pl/grafika-do-pdf"
        ],
        "en": [
            "/en/image-to-pdf",
            "/en/grafika-do-pdf"
        ],
        "es": [
            "/es/imagen-a-pdf",
            "/es/grafika-do-pdf",
            "/es/jpg-a-pdf"
        ],
        "hi": [
            "/hi/image-to-pdf",
            "/hi/grafika-do-pdf"
        ],
        "pt": [
            "/pt/imagem-para-pdf",
            "/pt/grafika-do-pdf",
            "/pt/jpg-para-pdf"
        ],
        "ru": [
            "/ru/kartinki-v-pdf",
            "/ru/grafika-do-pdf",
            "/ru/jpg-v-pdf"
        ]
    },
    "/pdf-to-word": {
        "pl": [
            "/pdf-to-word",
            "/pl/pdf-to-word"
        ],
        "en": [
            "/en/pdf-to-word"
        ],
        "es": [
            "/es/pdf-a-word",
            "/es/pdf-to-word"
        ],
        "hi": [
            "/hi/pdf-to-word"
        ],
        "pt": [
            "/pt/pdf-para-word",
            "/pt/pdf-to-word"
        ],
        "ru": [
            "/ru/pdf-v-word",
            "/ru/pdf-to-word"
        ]
    },
    "/word-to-pdf": {
        "pl": [
            "/word-to-pdf",
            "/pl/word-to-pdf"
        ],
        "en": [
            "/en/word-to-pdf"
        ],
        "es": [
            "/es/word-a-pdf",
            "/es/word-to-pdf"
        ],
        "hi": [
            "/hi/word-to-pdf"
        ],
        "pt": [
            "/pt/word-para-pdf",
            "/pt/word-to-pdf"
        ],
        "ru": [
            "/ru/word-v-pdf",
            "/ru/word-to-pdf"
        ]
    },
    "/pdf-to-excel": {
        "pl": [
            "/pdf-to-excel",
            "/pl/pdf-to-excel"
        ],
        "en": [
            "/en/pdf-to-excel"
        ],
        "es": [
            "/es/pdf-a-excel",
            "/es/pdf-to-excel"
        ],
        "hi": [
            "/hi/pdf-to-excel"
        ],
        "pt": [
            "/pt/pdf-para-excel",
            "/pt/pdf-to-excel"
        ],
        "ru": [
            "/ru/pdf-v-excel",
            "/ru/pdf-to-excel"
        ]
    },
    "/excel-to-pdf": {
        "pl": [
            "/excel-to-pdf",
            "/pl/excel-to-pdf"
        ],
        "en": [
            "/en/excel-to-pdf"
        ],
        "es": [
            "/es/excel-a-pdf",
            "/es/excel-to-pdf"
        ],
        "hi": [
            "/hi/excel-to-pdf"
        ],
        "pt": [
            "/pt/excel-para-pdf",
            "/pt/excel-to-pdf"
        ],
        "ru": [
            "/ru/excel-v-pdf",
            "/ru/excel-to-pdf"
        ]
    },
    "/wyczysc-metadane-pdf": {
        "pl": [
            "/wyczysc-metadane-pdf",
            "/pl/wyczysc-metadane-pdf"
        ],
        "en": [
            "/en/remove-pdf-metadata",
            "/en/wyczysc-metadane-pdf"
        ],
        "es": [
            "/es/limpiar-metadatos-pdf",
            "/es/wyczysc-metadane-pdf",
            "/es/eliminar-metadatos-pdf"
        ],
        "hi": [
            "/hi/remove-pdf-metadata",
            "/hi/wyczysc-metadane-pdf"
        ],
        "pt": [
            "/pt/remover-metadados-pdf",
            "/pt/wyczysc-metadane-pdf",
            "/pt/limpar-metadados-pdf"
        ],
        "ru": [
            "/ru/udalit-metadannye-pdf",
            "/ru/wyczysc-metadane-pdf",
            "/ru/ochistit-metadannye-pdf"
        ]
    },
    "/wyciagnij-grafiki-z-pdf": {
        "pl": [
            "/wyciagnij-grafiki-z-pdf",
            "/pl/wyciagnij-grafiki-z-pdf"
        ],
        "en": [
            "/en/extract-images-from-pdf",
            "/en/wyciagnij-grafiki-z-pdf"
        ],
        "es": [
            "/es/extraer-imagenes-pdf",
            "/es/wyciagnij-grafiki-z-pdf"
        ],
        "hi": [
            "/hi/extract-images-from-pdf",
            "/hi/wyciagnij-grafiki-z-pdf"
        ],
        "pt": [
            "/pt/extrair-imagens-pdf",
            "/pt/wyciagnij-grafiki-z-pdf"
        ],
        "ru": [
            "/ru/izvlech-kartinki-iz-pdf",
            "/ru/wyciagnij-grafiki-z-pdf"
        ]
    },
    "/zabezpiecz-pdf-haslem": {
        "pl": [
            "/zabezpiecz-pdf-haslem",
            "/pl/zabezpiecz-pdf-haslem"
        ],
        "en": [
            "/en/protect-pdf",
            "/en/zabezpiecz-pdf-haslem"
        ],
        "es": [
            "/es/proteger-pdf",
            "/es/zabezpiecz-pdf-haslem",
            "/es/proteger-pdf-con-contrasena"
        ],
        "hi": [
            "/hi/protect-pdf",
            "/hi/zabezpiecz-pdf-haslem"
        ],
        "pt": [
            "/pt/proteger-pdf-com-senha",
            "/pt/zabezpiecz-pdf-haslem",
            "/pt/proteger-pdf"
        ],
        "ru": [
            "/ru/zashchitit-pdf-parolem",
            "/ru/zabezpiecz-pdf-haslem",
            "/ru/postavit-parol-na-pdf"
        ]
    },
    "/usun-haslo-z-pdf": {
        "pl": [
            "/usun-haslo-z-pdf",
            "/pl/usun-haslo-z-pdf"
        ],
        "en": [
            "/en/unlock-pdf",
            "/en/usun-haslo-z-pdf"
        ],
        "es": [
            "/es/desbloquear-pdf",
            "/es/usun-haslo-z-pdf",
            "/es/quitar-contrasena-pdf"
        ],
        "hi": [
            "/hi/unlock-pdf",
            "/hi/usun-haslo-z-pdf"
        ],
        "pt": [
            "/pt/desbloquear-pdf",
            "/pt/usun-haslo-z-pdf",
            "/pt/remover-senha-pdf"
        ],
        "ru": [
            "/ru/snyat-parol-s-pdf",
            "/ru/usun-haslo-z-pdf",
            "/ru/razblokirovat-pdf"
        ]
    },
    "/zmien-pdf-na-czarno-bialy": {
        "pl": [
            "/zmien-pdf-na-czarno-bialy",
            "/pl/zmien-pdf-na-czarno-bialy"
        ],
        "en": [
            "/en/pdf-to-grayscale",
            "/en/zmien-pdf-na-czarno-bialy"
        ],
        "es": [
            "/es/pdf-a-blanco-y-negro",
            "/es/zmien-pdf-na-czarno-bialy",
            "/es/pdf-escala-de-grises"
        ],
        "hi": [
            "/hi/pdf-to-grayscale",
            "/hi/zmien-pdf-na-czarno-bialy"
        ],
        "pt": [
            "/pt/pdf-preto-e-branco",
            "/pt/zmien-pdf-na-czarno-bialy",
            "/pt/pdf-em-escala-de-cinza"
        ],
        "ru": [
            "/ru/cherno-belyj-pdf",
            "/ru/zmien-pdf-na-czarno-bialy",
            "/ru/pdf-v-ottenkah-serogo"
        ]
    },
    "/ponumeruj-strony-pdf": {
        "pl": [
            "/ponumeruj-strony-pdf",
            "/pl/ponumeruj-strony-pdf"
        ],
        "en": [
            "/en/add-page-numbers-to-pdf",
            "/en/ponumeruj-strony-pdf"
        ],
        "es": [
            "/es/numerar-paginas-pdf",
            "/es/ponumeruj-strony-pdf"
        ],
        "hi": [
            "/hi/add-page-numbers-to-pdf",
            "/hi/ponumeruj-strony-pdf"
        ],
        "pt": [
            "/pt/numerar-paginas-pdf",
            "/pt/ponumeruj-strony-pdf"
        ],
        "ru": [
            "/ru/pronumerovat-stranicy-pdf",
            "/ru/ponumeruj-strony-pdf"
        ]
    },
    "/polityka-privacy": {
        "pl": [
            "/polityka-privacy",
            "/pl/polityka-privacy"
        ],
        "en": [
            "/en/privacy-policy",
            "/en/polityka-privacy"
        ],
        "es": [
            "/es/politica-privacidad",
            "/es/polityka-privacy"
        ],
        "hi": [
            "/hi/privacy-policy",
            "/hi/polityka-privacy"
        ],
        "pt": [
            "/pt/politica-de-privacidade",
            "/pt/polityka-privacy"
        ],
        "ru": [
            "/ru/politika-konfidencialnosti",
            "/ru/polityka-privacy"
        ]
    }
}

languages = ['pl', 'en', 'es', 'hi', 'pt', 'ru']
locale_map = {
    'pl': 'pl_PL',
    'en': 'en_US',
    'es': 'es_ES',
    'hi': 'hi_IN',
    'pt': 'pt_BR',
    'ru': 'ru_RU'
}

PUBLISHER_CONTENT_RAW = {
    "pl": {
        "sectionAriaLabel": "Baza wiedzy i przewodnik po bezpiecznym edytowaniu PDF",
        "whyBadge": "Architektura Privacy-First & 100% Bezpieczeństwa",
        "whyReadingTime": "Czas czytania: 4 minuty • Kompendium wiedzy",
        "whyTitle": "Dlaczego warto wybrać NoSignPDF? Bezpieczeństwo dokumentów w erze chmury",
        "whyLead": "Większość popularnych serwisów internetowych do edycji plików PDF wymaga przesłania Twoich poufnych dokumentów na odległe serwery w chmurze. NoSignPDF rewolucjonizuje tę koncepcję: wszystkie operacje wykonujesz w 100% lokalnie w przeglądarce, z zerowym ryzykiem wycieku danych i bez konieczności rejestracji konta.",
        "whyPillars": [
            {
                "title": "Zero Uploadu i Pamięć RAM",
                "desc": "Dokumenty są otwierane wyłącznie w pamięci operacyjnej Twojego urządzenia. Nasz serwer nie otrzymuje ani jednego bajtu z zawartości plików."
            },
            {
                "title": "Poufność Umów i Faktur",
                "desc": "Dane wrażliwe (numery PESEL, NIP, kwoty wynagrodzeń, wyciągi bankowe) pozostają w Twoim bezpośrednim posiadaniu, zgodnie z rygorystycznymi normami RODO i GDPR."
            },
            {
                "title": "Maksymalna Szybkość i Brak Limitów",
                "desc": "Brak konieczności oczekiwania na transfer wielomegabajtowych plików przez sieć. Silnik WebAssembly i pdf-lib przetwarza arkusze natychmiastowo na Twoim procesorze."
            }
        ],
        "whyParagraphs": [
            "Format PDF (Portable Document Format) jest globalnym fundamentem obiegu informacji biznesowych, prawnych oraz administracyjnych. Codziennie na całym świecie przesyłane są miliony umów handlowych, wyciągów finansowych, pism procesowych oraz formularzy podatkowych. Niestety, korzystanie ze standardowych konwerterów online wiąże się ze znacznym ryzykiem: wysyłając plik na obcy serwer, tracisz kontrolę nad tym, kto ma dostęp do jego kopii, jak długo jest przechowywany i czy nie posłuży do trenowania modeli maszynowych.",
            "NoSignPDF rozwiązuje ten fundamentalny problem cyberbezpieczeństwa. Dzięki wykorzystaniu nowoczesnych standardów sieciowych HTML5 File API, WebAssembly oraz silnika pdf-lib, cała skomplikowana matematyka manipulacji strukturą pliku PDF odbywa się w odizolowanym środowisku uruchomieniowym Twojej przeglądarki (sandbox). Oznacza to, że nawet przy braku połączenia z internetem po załadowaniu strony, narzędzia zachowują pełną sprawność operacyjną.",
            "Brak konieczności rejestracji i logowania to nie tylko wygoda i oszczędność cennego czasu, ale również kluczowy element higieny cyfrowej. Nie gromadzimy Twojego adresu e-mail, nie tworzymy profili użytkowników i nie wymagamy podawania kart kredytowych za usunięcie znaku wodnego. Dokument opuszcza Twoje urządzenie dopiero wtedy, gdy Ty sam zdecydujesz się go wysłać swojemu kontrahentowi."
        ],
        "guideBadge": "Kompleksowy Przewodnik i Słownik Pojęć PDF",
        "guideTitle": "Edukacja i Dobre Praktyki: Jak bezpiecznie zarządzać plikami PDF",
        "guideSubtitle": "Odpowiedzi ekspertów na kluczowe pytania dotyczące metadanych, podpisów elektronicznych i łączenia dokumentów",
        "guideArticles": [
            {
                "title": "Co to są metadane w pliku PDF i dlaczego warto je czyścić przed wysyłką?",
                "lead": "Każdy utworzony dokument PDF, poza widocznym tekstem i grafikami, zawiera ukryte warstwy informacji technicznych zwane metadanymi (Metadata). Informacje te są zapisywane automatycznie przez oprogramowanie biurowe i edytory.",
                "bulletPoints": [
                    {
                        "label": "Historia i Identyfikacja:",
                        "desc": "Metadane ujawniają imię i nazwisko autora, login systemowy, nazwę firmy oraz dokładną markę i model urządzenia."
                    },
                    {
                        "label": "Ścieżki Plików i Wersje:",
                        "desc": "W strukturze dokumentu często pozostają lokalne ścieżki dyskowe (np. C:\\Users\\Jan\\Umowy\\...) oraz nazwa edytora (Word, Canva, InDesign)."
                    },
                    {
                        "label": "Ryzyko Biznesowe (OSINT):",
                        "desc": "Analiza metadanych jest podstawową metodą wywiadu gospodarczego stosowaną przez konkurencję i hakerów przed atakiem phishingowym."
                    },
                    {
                        "label": "Czyszczenie w NoSignPDF:",
                        "desc": "Nasz moduł usuwa słowniki /Info, wpisy XMP oraz PieceInfo, generując w 100% anonimowy i czysty plik gotowy do bezpiecznej publikacji."
                    }
                ],
                "conclusion": "Regularne czyszczenie metadanych jest rekomendowane przez specjalistów ds. cyberbezpieczeństwa przed publikacją przetargów, umów poufności (NDA) oraz pism urzędowych.",
                "actionLabel": "Wyczyść metadane w swoim dokumencie",
                "actionRoute": "/wyczysc-metadane-pdf"
            },
            {
                "title": "Jak bezpiecznie wypełnić i podpisać formularz PDF bez drukowania?",
                "lead": "Tradycyjne drukowanie, ręczne podpisywanie długopisem i ponowne skanowanie to strata papieru, tuszu i czasu. Nowoczesny obieg dokumentów opiera się na cyfrowych formularzach AcroForms.",
                "bulletPoints": [
                    {
                        "label": "Natywne Pola AcroForms:",
                        "desc": "Dobrej jakości formularze urzędowe posiadają aktywne kratki i pola tekstowe, które można edytować bezpośrednio w przeglądarce."
                    },
                    {
                        "label": "Brak Degradacji Jakości:",
                        "desc": "Wypełnianie formularza w silniku wektorowym zachowuje krystaliczną ostrość czcionek podczas druku lub odczytu na dowolnym monitorze."
                    },
                    {
                        "label": "Prywatność Danych Osobowych:",
                        "desc": "Wprowadzany PESEL, numer dowodu czy dane finansowe nie trafiają do żadnej bazy danych — po pobraniu formularza dane znikają z pamięci RAM."
                    },
                    {
                        "label": "Zgodność z Adobe Reader:",
                        "desc": "Wygenerowane przez NoSignPDF pliki są w 100% zgodne z oficjalnym standardem ISO 32000 i otwierają się poprawnie w urzędach skarbowych."
                    }
                ],
                "conclusion": "Dzięki NoSignPDF uzupełnisz dowolny wniosek urzędowy w kilkadziesiąt sekund, bez konieczności instalowania drogich pakietów oprogramowania biurowego.",
                "actionLabel": "Wypełnij formularz PDF online",
                "actionRoute": "/wypelnij-formularz-pdf"
            },
            {
                "title": "Jak skutecznie połączyć wiele dokumentów PDF bez utraty jakości i formatowania?",
                "lead": "Scalanie raportów, załączników do umów czy skanów faktur w jeden spójny dokument to jedna z najczęstszych operacji biurowych. Kluczem jest zachowanie proporcji stron i spójności palety barw.",
                "bulletPoints": [
                    {
                        "label": "Zarządzanie Kolejnością Stron:",
                        "desc": "Wizualny edytor miniatur pozwala intuicyjnie przeciągać i upuszczać strony, eliminując błędy w numeracji wielostronicowych dokumentów."
                    },
                    {
                        "label": "Zachowanie Wektorów i Czcionek:",
                        "desc": "Łączenie na poziomie obiektów PDF kopiuje osadzone fonty bez rasteryzacji tekstu do postaci pikselowej, zachowując możliwość przeszukiwania (OCR)."
                    },
                    {
                        "label": "Usuwanie Zbędnych Arkuszy:",
                        "desc": "Podczas scalania możesz jednym kliknięciem usunąć puste arkusze, błędne skany lub duplikaty stron, zmniejszając ostateczną wagę pliku."
                    },
                    {
                        "label": "Brak Ograniczeń Rozmiaru:",
                        "desc": "Dzięki przetwarzaniu na Twoim komputerze możesz łączyć nawet obszerne tomy dokumentacji, ograniczone jedynie pamięcią RAM Twojego urządzenia."
                    }
                ],
                "conclusion": "Po połączeniu plików możesz dodatkowo użyć naszego modułu kompresji lub czyszczenia metadanych, aby uzyskać perfekcyjny pakiet dokumentacji.",
                "actionLabel": "Połącz pliki PDF w jeden dokument",
                "actionRoute": "/polacz-pdf"
            }
        ]
    },
    "en": {
        "sectionAriaLabel": "Knowledge Base and Secure PDF Editing Guide",
        "whyBadge": "Privacy-First Architecture & 100% Security",
        "whyReadingTime": "Read time: 4 min • Knowledge Compendium",
        "whyTitle": "Why Choose NoSignPDF? Document Security in the Cloud Era",
        "whyLead": "Most online PDF editing services require uploading confidential documents to remote cloud servers. NoSignPDF transforms this workflow: every operation runs 100% locally in your browser with zero data leakage risk, no account creation, and zero server storage.",
        "whyPillars": [
            {
                "title": "Zero Uploads & In-Memory RAM",
                "desc": "Files are processed exclusively in your device volatile memory (RAM). Our servers never receive a single byte of your document contents."
            },
            {
                "title": "Strict Confidentiality for Contracts",
                "desc": "Sensitive business data (PII, tax IDs, salaries, bank statements) remains under your complete control in compliance with GDPR and global privacy frameworks."
            },
            {
                "title": "Instant Execution & No Caps",
                "desc": "Zero waiting for uploads or network transfers. The client-side WebAssembly engine manipulates PDF byte streams directly on your CPU hardware."
            }
        ],
        "whyParagraphs": [
            "The Portable Document Format (PDF) is the undisputed international standard for corporate, legal, and governmental communications. Hundreds of millions of business contracts, invoices, financial statements, and official tax filings are exchanged daily. However, utilizing traditional cloud-based conversion platforms carries substantial exposure: once a file is dispatched across the wire to a remote server, you relinquish oversight over data persistence, backups, and prospective machine-learning ingestion.",
            "NoSignPDF eliminates this cybersecurity dilemma. Harnessing modern Web standards — including the HTML5 File System API, WebAssembly, and pdf-lib — all parsing, drawing, and structural modifications occur entirely within your browser sandboxed execution environment. Even if you disconnect from the internet after page delivery, our toolset remains completely operational.",
            "Our zero-registration mandate safeguards both your personal bandwidth and digital hygiene. We collect no email addresses, maintain no user databases, and never watermark your finished files to force subscription upgrades. Your documents only leave your device when you personally choose to transmit them to your recipient."
        ],
        "guideBadge": "Comprehensive PDF Guide & Terminology Index",
        "guideTitle": "Education & Best Practices: Managing PDF Documents Securely",
        "guideSubtitle": "Expert insights on metadata sanitization, form completion, and quality-preserving document merging",
        "guideArticles": [
            {
                "title": "What is PDF metadata and why should you sanitize it prior to sharing?",
                "lead": "Beyond visible text and graphics, every PDF document stores hidden technical descriptors known as metadata. This diagnostic data is recorded automatically by desktop applications, operating systems, and scanners.",
                "bulletPoints": [
                    {
                        "label": "Author & Device Identity:",
                        "desc": "Metadata entries often disclose author real names, system usernames, corporate workstations, and precise printer models."
                    },
                    {
                        "label": "Internal Paths & Revisions:",
                        "desc": "Structural dictionaries frequently preserve internal disk file paths (e.g., C:\\Users\\Admin\\Confidential\\...) and software version tags."
                    },
                    {
                        "label": "OSINT & Corporate Intelligence Risk:",
                        "desc": "Adversaries routinely extract PDF metadata during open-source intelligence gathering to prepare targeted spear-phishing campaigns."
                    },
                    {
                        "label": "Client-Side Sanitization:",
                        "desc": "Our metadata stripper cleans /Info dictionaries, XMP metadata streams, and PieceInfo entries, producing a thoroughly sanitized, anonymous PDF."
                    }
                ],
                "conclusion": "Cybersecurity professionals advise stripping metadata from all legal contracts, NDAs, bids, and public-facing reports before distribution.",
                "actionLabel": "Clean metadata from your PDF",
                "actionRoute": "/wyczysc-metadane-pdf"
            },
            {
                "title": "How to securely fill out and sign PDF forms without physical printing?",
                "lead": "Traditional workflows of printing, handwriting signatures, and re-scanning waste precious office supplies and introduce analog degradation. Digital AcroForms modernise document workflows with zero fuss.",
                "bulletPoints": [
                    {
                        "label": "Native AcroForm Interactive Fields:",
                        "desc": "Standardized digital forms contain interactive text boxes and checkboxes that can be completed directly within your browser."
                    },
                    {
                        "label": "Crystal-Clear Vector Quality:",
                        "desc": "Typing directly into PDF structures preserves scalable vector typography, ensuring pin-sharp rendering on any screen or paper printout."
                    },
                    {
                        "label": "Total PII Protection:",
                        "desc": "Social security numbers, banking details, and identification codes are never stored on remote servers — when you close the tab, the RAM vanishes."
                    },
                    {
                        "label": "Universal Standard ISO 32000:",
                        "desc": "Documents compiled by NoSignPDF comply strictly with international PDF specifications and open seamlessly across Adobe Acrobat and public administration systems."
                    }
                ],
                "conclusion": "NoSignPDF lets you finalize contracts, declarations, and tax returns in seconds without subscribing to costly desktop software.",
                "actionLabel": "Fill out PDF form online",
                "actionRoute": "/wypelnij-formularz-pdf"
            },
            {
                "title": "How to combine multiple PDF documents without losing formatting or quality?",
                "lead": "Collating multiple invoices, financial reports, or legal attachments into a single, cohesive PDF is an essential administrative task. Preserving visual fidelity is paramount.",
                "bulletPoints": [
                    {
                        "label": "Visual Page Reordering:",
                        "desc": "Our interactive visual grid allows effortless drag-and-drop page sequencing, eliminating misordered pages in mission-critical proposals."
                    },
                    {
                        "label": "Preserving Embedded Fonts & Vectors:",
                        "desc": "Direct object-level merging ensures original font subsets and vector artwork are preserved without blurry rasterization."
                    },
                    {
                        "label": "Instant Removal of Blank Sheets:",
                        "desc": "Easily purge duplicate pages, misoriented scans, or stray blank sheets with one click before compiling the final document."
                    },
                    {
                        "label": "No Arbitrary File Size Limits:",
                        "desc": "Because processing executes locally, your documents are bounded only by your computer memory, not arbitrary web server upload caps."
                    }
                ],
                "conclusion": "Once your documents are merged, you can immediately compress the file or remove metadata in a streamlined, zero-friction retention workflow.",
                "actionLabel": "Merge multiple PDF files now",
                "actionRoute": "/polacz-pdf"
            }
        ]
    },
    "es": {
        "sectionAriaLabel": "Base de conocimiento y guía de edición segura de PDF",
        "whyBadge": "Arquitectura Privacy-First y 100% Seguridad",
        "whyReadingTime": "Lectura: 4 minutos • Compendio informativo",
        "whyTitle": "¿Por qué elegir NoSignPDF? Seguridad de documentos en la era cloud",
        "whyLead": "La mayoría de convertidores online exigen subir archivos confidenciales a servidores remotos. NoSignPDF cambia las reglas: todas las operaciones se ejecutan 100% en local en tu navegador, sin riesgo de filtraciones, sin cuentas y sin almacenar datos en la nube.",
        "whyPillars": [
            {
                "title": "Cero Subidas y Memoria RAM",
                "desc": "Los archivos se procesan únicamente en la memoria local de tu dispositivo. Nuestros servidores no ven ni un solo byte de tu contenido."
            },
            {
                "title": "Confidencialidad Total para Contratos",
                "desc": "Datos sensibles (DNI, nóminas, extractos bancarios) permanecen bajo tu exclusivo control en cumplimiento estricto con el RGPD europeo."
            },
            {
                "title": "Velocidad Inmediata sin Límites",
                "desc": "Sin esperas de transferencia de red. El motor WebAssembly y pdf-lib manipula la estructura del PDF directamente con tu procesador."
            }
        ],
        "whyParagraphs": [
            "El formato PDF es el pilar del intercambio de información legal, financiera y empresarial en todo el mundo. A diario se comparten millones de facturas, contratos mercantiles y declaraciones tributarias. Sin embargo, utilizar plataformas web convencionales implica entregar tus documentos privados a terceros sin saber dónde se almacenan ni quién tiene acceso.",
            "NoSignPDF elimina este riesgo de raíz. Gracias a las tecnologías modernas de HTML5 y WebAssembly, el análisis y la renderización ocurren en un entorno aislado dentro de tu propio navegador web. Incluso desconectando tu conexión a internet tras abrir la página, las utilidades continúan operando con total normalidad.",
            "No requerimos registro ni inicio de sesión. No recopilamos tu correo electrónico ni imponemos marcas de agua en tus archivos para forzar suscripciones premium. Tus documentos solo salen de tu equipo cuando tú decides compartirlos."
        ],
        "guideBadge": "Guía Integral y Glosario Técnico de PDF",
        "guideTitle": "Educación y Buenas Prácticas: Cómo gestionar archivos PDF con seguridad",
        "guideSubtitle": "Consejos de expertos sobre limpieza de metadatos, firma de formularios y unión de documentos sin perder calidad",
        "guideArticles": [
            {
                "title": "¿Qué son los metadatos de un PDF y por qué deberías limpiarlos antes de enviarlo?",
                "lead": "Más allá del texto y las imágenes visibles, cada documento PDF almacena información técnica oculta conocida como metadatos, generada de forma automática por procesadores de texto y escáneres.",
                "bulletPoints": [
                    {
                        "label": "Identidad y Dispositivo:",
                        "desc": "Los metadatos pueden revelar el nombre del autor, el usuario del sistema operativo y la marca o modelo del ordenador."
                    },
                    {
                        "label": "Rutas de Disco y Versiones:",
                        "desc": "A menudo quedan registradas rutas internas de carpetas corporativas y el software empleado en la edición."
                    },
                    {
                        "label": "Riesgo de Espionaje (OSINT):",
                        "desc": "Los ciberdelincuentes analizan metadatos en documentos públicos para planificar ataques de ingeniería social o phishing."
                    },
                    {
                        "label": "Limpieza en NoSignPDF:",
                        "desc": "Nuestro módulo suprime los diccionarios /Info, metadatos XMP y PieceInfo, produciendo un archivo totalmente anónimo y seguro."
                    }
                ],
                "conclusion": "Los expertos en seguridad informática recomiendan eliminar metadatos de contratos, licitaciones y acuerdos de confidencialidad antes de su difusión.",
                "actionLabel": "Limpiar metadatos de tu PDF",
                "actionRoute": "/wyczysc-metadane-pdf"
            },
            {
                "title": "¿Cómo rellenar y firmar un formulario PDF de forma segura sin imprimir?",
                "lead": "Imprimir en papel, firmar a bolígrafo y volver a escanear genera pérdida de tiempo y recursos. Los formularios digitales AcroForms agilizan las gestiones con total nitidez.",
                "bulletPoints": [
                    {
                        "label": "Campos Nativos AcroForms:",
                        "desc": "Los formularios oficiales incluyen casillas interactivas que puedes rellenar directamente desde el navegador."
                    },
                    {
                        "label": "Nitidez Vectorial:",
                        "desc": "La escritura directa sobre la estructura del PDF mantiene las tipografías nítidas e imprimibles en cualquier resolución."
                    },
                    {
                        "label": "Protección de Datos Personales:",
                        "desc": "Tus datos bancarios o de identificación nunca se envían a ningún servidor: al cerrar la pestaña se liberan de la RAM."
                    },
                    {
                        "label": "Compatibilidad ISO 32000:",
                        "desc": "Los documentos producidos cumplen rigurosamente el estándar internacional y abren sin errores en Adobe Acrobat y sedes electrónicas."
                    }
                ],
                "conclusion": "Con NoSignPDF completas contratos y trámites oficiales en segundos sin pagar costosas licencias de programas de escritorio.",
                "actionLabel": "Rellenar formulario PDF online",
                "actionRoute": "/wypelnij-formularz-pdf"
            },
            {
                "title": "¿Cómo unir varios documentos PDF sin perder calidad ni formato?",
                "lead": "Combinar facturas, anexos o informes en un único PDF ordenado es una tarea cotidiana. La clave consiste en respetar la resolución original de fuentes y gráficos.",
                "bulletPoints": [
                    {
                        "label": "Organización Visual de Páginas:",
                        "desc": "La cuadrícula visual te permite arrastrar y soltar miniaturas para definir el orden exacto de los pliegos."
                    },
                    {
                        "label": "Conservación de Tipografías:",
                        "desc": "La unión a nivel de objetos copia las fuentes vectoriales sin pixelar el contenido ni perder la capacidad de búsqueda."
                    },
                    {
                        "label": "Eliminación de Páginas en Blanco:",
                        "desc": "Puedes descartar pliegos vacíos o escaneos defectuosos con un solo clic antes de compilar el documento final."
                    },
                    {
                        "label": "Sin Restricciones de Tamaño:",
                        "desc": "Al operar en local, el límite de volumen lo determina únicamente la memoria RAM de tu propio dispositivo."
                    }
                ],
                "conclusion": "Una vez unidos tus documentos, puedes optimizarlos o retirar metadatos en un flujo fluido sin necesidad de volver a cargarlos.",
                "actionLabel": "Unir archivos PDF ahora",
                "actionRoute": "/polacz-pdf"
            }
        ]
    },
    "hi": {
        "sectionAriaLabel": "पीडीएफ ज्ञान केंद्र और सुरक्षित संपादन गाइड",
        "whyBadge": "Privacy-First तकनीक और 100% सुरक्षा",
        "whyReadingTime": "पढ़ने का समय: 4 मिनट • संपूर्ण मार्गदर्शिका",
        "whyTitle": "NoSignPDF क्यों चुनें? क्लाउड युग में दस्तावेज़ों की पूर्ण गोपनीयता",
        "whyLead": "अधिकांश ऑनलाइन पीडीएफ टूल्स आपके निजी दस्तावेज़ों को बाहरी क्लाउड सर्वर पर अपलोड करवाते हैं। NoSignPDF इसे पूरी तरह बदल देता है: सभी कार्य 100% स्थानीय रूप से आपके वेब ब्राउज़र में होते हैं, जिसमें शून्य डेटा लीक का जोखिम और बिना किसी खाते के काम होता है।",
        "whyPillars": [
            {
                "title": "शून्य अपलोड और डिवाइस रैम",
                "desc": "फ़ाइलें केवल आपके डिवाइस की रैम में खुलती हैं। हमारे सर्वर पर आपके दस्तावेज़ का एक भी बाइट नहीं भेजा जाता।"
            },
            {
                "title": "अनुबंधों और बिलों की गोपनीयता",
                "desc": "संवेदनशील जानकारी (पहचान पत्र, बैंक विवरण, वेतन रसीदें) केवल आपके पास सुरक्षित रहती हैं, जो कड़े गोपनीयता मानकों के अनुरूप है।"
            },
            {
                "title": "अल्ट्रा-फास्ट स्पीड और असीमित उपयोग",
                "desc": "इंटरनेट पर अपलोड की प्रतीक्षा नहीं करनी पड़ती। WebAssembly और pdf-lib सीधे आपके कंप्यूटर प्रोसेसर से काम करते हैं।"
            }
        ],
        "whyParagraphs": [
            "पीडीएफ (Portable Document Format) वैश्विक स्तर पर व्यापार, कानून और सरकारी कार्यों का मुख्य आधार है। हर दिन करोड़ों अनुबंध, टैक्स रिटर्न और वित्तीय विवरण साझा किए जाते हैं। पारंपरिक टूल्स पर फाइल अपलोड करने से यह जोखिम रहता है कि आपकी निजी जानकारी सर्वर पर हमेशा के लिए दर्ज हो सकती है।",
            "NoSignPDF इस समस्या को समाप्त करता है। आधुनिक वेब मानकों, HTML5 File API और WebAssembly की सहायता से संपादन का सारा कार्य आपके ब्राउज़र के सुरक्षित सैंडबॉक्स में होता है। यहाँ तक कि पेज लोड होने के बाद इंटरनेट बंद करने पर भी सभी टूल्स काम करते रहते हैं।",
            "बिना किसी रजिस्ट्रेशन या लॉगिन के काम करना न केवल सुविधाजनक है बल्कि डिजिटल सुरक्षा के लिए भी आवश्यक है। हम न तो ईमेल एकत्र करते हैं और न ही फाइलों पर वॉटरमार्क लगाते हैं। आपका दस्तावेज़ तब तक आपके पास रहता है जब तक आप स्वयं उसे किसी को न भेजें।"
        ],
        "guideBadge": "विस्तृत पीडीएफ गाइड और शब्दावली",
        "guideTitle": "शिक्षा और सर्वोत्तम अभ्यास: पीडीएफ का सुरक्षित और कुशल प्रबंधन",
        "guideSubtitle": "मेटाडेटा हटाने, फॉर्म भरने और गुणवत्ता बनाए रखते हुए फाइलें जोड़ने पर विशेषज्ञों के सुझाव",
        "guideArticles": [
            {
                "title": "पीडीएफ मेटाडेटा क्या है और इसे दूसरों को भेजने से पहले क्यों हटाना चाहिए?",
                "lead": "दृश्यमान टेक्स्ट और तस्वीरों के अलावा, प्रत्येक पीडीएफ में छिपी हुई तकनीकी जानकारी (मेटाडेटा) होती है जो सॉफ्टवेयर और कंप्यूटर द्वारा स्वतः दर्ज की जाती है।",
                "bulletPoints": [
                    {
                        "label": "लेखक और कंप्यूटर की पहचान:",
                        "desc": "मेटाडेटा में लेखक का असली नाम, ऑपरेटिंग सिस्टम का यूजरनेम और डिवाइस का मॉडल छिपा हो सकता है।"
                    },
                    {
                        "label": "फ़ोल्डर पाथ और सॉफ़्टवेयर संस्करण:",
                        "desc": "दस्तावेज़ में आपके कंप्यूटर की आंतरिक डायरेक्टरी (जैसे C:\\Users\\Name\\...) का पता दर्ज रह सकता है।"
                    },
                    {
                        "label": "सुरक्षा जोखिम (Cyber Threat):",
                        "desc": "साइबर अपराधी मेटाडेटा का विश्लेषण करके फ़िशिंग या हैकिंग की योजना बनाते हैं।"
                    },
                    {
                        "label": "NoSignPDF से सफाई:",
                        "desc": "हमारा टूल /Info, XMP और PieceInfo डेटा को पूरी तरह हटाकर दस्तावेज़ को 100% अनाम और सुरक्षित बना देता है।"
                    }
                ],
                "conclusion": "सरकारी निविदाएं, व्यापारिक समझौते और अनुबंध भेजने से पहले मेटाडेटा हटाना एक सुरक्षित आदत है।",
                "actionLabel": "अपने पीडीएफ से मेटाडेटा हटाएं",
                "actionRoute": "/wyczysc-metadane-pdf"
            },
            {
                "title": "प्रिंट किए बिना सुरक्षित रूप से पीडीएफ फॉर्म कैसे भरें?",
                "lead": "कागज पर प्रिंट निकालना, कलम से हस्ताक्षर करना और दोबारा स्कैन करना समय और संसाधनों की बर्बादी है। डिजिटल AcroForms से आप तुरंत काम पूरा कर सकते हैं।",
                "bulletPoints": [
                    {
                        "label": "मूल AcroForm डिजिटल फ़ील्ड:",
                        "desc": "आधिकारिक फॉर्म में डिजिटल बॉक्स होते हैं जिन्हें सीधे ब्राउज़र में क्लिक करके भरा जा सकता है।"
                    },
                    {
                        "label": "उच्च वेक्टर गुणवत्ता:",
                        "desc": "सीधे पीडीएफ में टाइप करने से फ़ॉन्ट की स्पष्टता बनी रहती है और प्रिंट में कोई धुंधलापन नहीं आता।"
                    },
                    {
                        "label": "निजी डेटा की पूर्ण सुरक्षा:",
                        "desc": "पैन कार्ड, आधार या बैंक विवरण कभी किसी बाहरी सर्वर पर दर्ज नहीं होते; टैब बंद करते ही डेटा मिट जाता है।"
                    },
                    {
                        "label": "ISO 32000 मानक का पालन:",
                        "desc": "NoSignPDF द्वारा तैयार फाइलें Adobe Reader और सरकारी पोर्टलों पर त्रुटिहीन रूप से खुलती हैं।"
                    }
                ],
                "conclusion": "महंगे सॉफ्टवेयर खरीदे बिना कुछ ही पलों में अपने आधिकारिक फॉर्म और डिक्लेरेशन भरें।",
                "actionLabel": "ऑनलाइन पीडीएफ फॉर्म भरें",
                "actionRoute": "/wypelnij-formularz-pdf"
            },
            {
                "title": "गुणवत्ता और फ़ॉर्मैटिंग खोए बिना कई पीडीएफ फाइलों को एक साथ कैसे जोड़ें?",
                "lead": "कई बिल, रिपोर्ट या अनुबंधों के पन्नों को एक व्यवस्थित पीडीएफ में जोड़ना कार्यालयों का सबसे आम कार्य है। इसमें स्पष्टता बरकरार रखना सबसे महत्वपूर्ण है।",
                "bulletPoints": [
                    {
                        "label": "दृश्यात्मक क्रम बदलना (Drag & Drop):",
                        "desc": "थंबनेल ग्रिड की मदद से आप आसानी से पन्नों को अपनी पसंद के क्रम में खींचकर लगा सकते हैं।"
                    },
                    {
                        "label": "वेक्टर फ़ॉन्ट सुरक्षित रखना:",
                        "desc": "ऑब्जेक्ट स्तर पर मर्ज करने से फ़ॉन्ट और टेक्स्ट सर्च करने की क्षमता सुरक्षित रहती है।"
                    },
                    {
                        "label": "खाली पन्नों को हटाना:",
                        "desc": "मर्ज करने से पहले गलत स्कैन या खाली पन्नों को एक क्लिक में रीसायकल बिन में डाला जा सकता है।"
                    },
                    {
                        "label": "फ़ाइल साइज़ की कोई सीमा नहीं:",
                        "desc": "चूंकि काम आपके अपने कंप्यूटर पर होता है, इसलिए आप अपनी सुविधानुसार बड़ी फाइलें भी जोड़ सकते हैं।"
                    }
                ],
                "conclusion": "फ़ाइलें जोड़ने के बाद आप उसी दस्तावेज़ को कंप्रेस भी कर सकते हैं और मेटाडेटा भी साफ़ कर सकते हैं।",
                "actionLabel": "कई पीडीएफ फाइलों को अभी जोड़ें",
                "actionRoute": "/polacz-pdf"
            }
        ]
    },
    "pt": {
        "sectionAriaLabel": "Base de conhecimento e guia completo sobre manipulação segura de PDF",
        "whyBadge": "Arquitetura Privacy-First & 100% Segurança",
        "whyReadingTime": "Tempo de leitura: 4 minutos • Compêndio de conhecimento",
        "whyTitle": "Por que escolher o NoSignPDF? Segurança de documentos na era da nuvem",
        "whyLead": "A maioria dos conversores e editores online exige que você envie seus contratos, faturas e documentos pessoais para servidores remotos na nuvem. O NoSignPDF revoluciona essa abordagem: todas as operações ocorrem 100% localmente no seu navegador, com risco zero de vazamento de dados e sem necessidade de cadastro.",
        "whyPillars": [
            {
                "title": "Zero Upload e Memória RAM",
                "desc": "Os documentos são abertos exclusivamente na memória volátil do seu dispositivo. Nosso servidor nunca recebe sequer um byte dos seus arquivos."
            },
            {
                "title": "Privacidade de Contratos e Faturas",
                "desc": "Dados confidenciais (CPF, CNPJ, dados bancários, salários) permanecem sob seu controle direto, em total conformidade com a LGPD e o GDPR."
            },
            {
                "title": "Velocidade Máxima sem Filas",
                "desc": "Sem tempo de espera para upload de arquivos pesados pela internet. O motor WebAssembly e pdf-lib processa as páginas instantaneamente no seu processador."
            }
        ],
        "whyParagraphs": [
            "O formato PDF (Portable Document Format) é a espinha dorsal da troca de informações em empresas, escritórios jurídicos e órgãos públicos no Brasil e no mundo. Diariamente, circulam milhões de declarações de imposto de renda, demonstrativos financeiros, procurações e propostas comerciais. No entanto, o uso de ferramentas tradicionais na nuvem impõe sérios riscos de conformidade: ao enviar um arquivo para um servidor desconhecido, perde-se a governança sobre quem tem acesso à cópia e quanto tempo ela permanece arquivada.",
            "O NoSignPDF resolve esse desafio fundamental de cibersegurança. Utilizando as tecnologias modernas da Web aberta como HTML5 File API, WebAssembly e a biblioteca pdf-lib, todo o processamento dos objetos binários do PDF é executado na sandbox segura do seu próprio navegador. Isso significa que, mesmo se você desconectar a internet após carregar a página, as ferramentas continuam funcionando perfeitamente em modo offline.",
            "A ausência de cadastro e login não é apenas uma conveniência para economizar tempo, mas um princípio de higiene digital. Não coletamos seu e-mail, não criamos rastreadores de perfil e não cobramos assinaturas para remover marcas d’água. Seus arquivos saem do seu computador apenas quando você decide enviá-los ao destinatário final."
        ],
        "guideBadge": "Guia Educativo e Glossário Essencial de PDF",
        "guideTitle": "Educação e Boas Práticas: Como gerenciar arquivos PDF com segurança",
        "guideSubtitle": "Orientações práticas de especialistas sobre metadados, formulários digitais e união de documentos",
        "guideArticles": [
            {
                "title": "O que são metadados em arquivos PDF e por que limpá-los antes do envio?",
                "lead": "Além do texto visível e das imagens, todo documento PDF armazena informações técnicas invisíveis chamadas metadados, gravadas automaticamente por softwares como Microsoft Word e Adobe Acrobat.",
                "bulletPoints": [
                    {
                        "label": "Identificação do Autor:",
                        "desc": "Os metadados podem revelar seu nome completo, login de usuário no sistema e nome da empresa."
                    },
                    {
                        "label": "Caminhos de Disco e Versões:",
                        "desc": "Caminhos internos de pastas do computador (ex: C:\\Users\\Nome\\Documentos) e versão do editor utilizado ficam gravados."
                    },
                    {
                        "label": "Vulnerabilidade em Licitações e Contratos:",
                        "desc": "Especialistas em cibersegurança e concorrentes utilizam técnicas de OSINT para extrair inteligência a partir de metadados desprotegidos."
                    },
                    {
                        "label": "Higienização no NoSignPDF:",
                        "desc": "Nosso módulo remove dicionários /Info, metadados XMP e PieceInfo na memória, gerando um PDF 100% higienizado e anônimo."
                    }
                ],
                "conclusion": "A limpeza de metadados é uma recomendação essencial de conformidade com a LGPD antes de compartilhar contratos comerciais e propostas de licitação.",
                "actionLabel": "Limpar metadados do seu PDF agora",
                "actionRoute": "/wyczysc-metadane-pdf"
            },
            {
                "title": "Como preencher e assinar formulários PDF sem imprimir em papel?",
                "lead": "Imprimir, assinar à mão com caneta e digitalizar novamente gera custos com papel e perda de nitidez visual. O fluxo moderno de trabalho utiliza formulários digitais interativos AcroForms.",
                "bulletPoints": [
                    {
                        "label": "Campos Nativos AcroForms:",
                        "desc": "Formulários oficiais possuem campos interativos que aceitam digitação direta com fontes vetoriais nítidas."
                    },
                    {
                        "label": "Preservação de Resolução:",
                        "desc": "A digitação digital mantém o alinhamento perfeito e a nitidez em qualquer tela ou impressão física."
                    },
                    {
                        "label": "Sigilo de Dados Sensíveis:",
                        "desc": "Dados como CPF, dados bancários e endereço nunca são salvos em bancos de dados na nuvem; ao fechar a aba, a memória é liberada."
                    },
                    {
                        "label": "Compatibilidade com Padrão ISO 32000:",
                        "desc": "Os arquivos gerados pelo NoSignPDF são aceitos por tribunais, prefeituras e órgãos fiscais como a Receita Federal."
                    }
                ],
                "conclusion": "Com o NoSignPDF você preenche qualquer requerimento oficial em poucos segundos sem precisar de softwares caros.",
                "actionLabel": "Preencher formulário PDF online",
                "actionRoute": "/wypelnij-formularz-pdf"
            },
            {
                "title": "Como juntar múltiplos arquivos PDF mantendo a qualidade e formatação?",
                "lead": "Combinar relatórios, anexos e comprovantes em um único PDF organizado é uma tarefa rotineira em escritórios. A integridade visual das páginas é fundamental.",
                "bulletPoints": [
                    {
                        "label": "Reorganização Visual:",
                        "desc": "A grade interativa de miniaturas permite arrastar e soltar páginas para organizar a sequência correta dos anexos."
                    },
                    {
                        "label": "Fontes e Vetores Preservados:",
                        "desc": "A união em nível de objetos binários mantém o texto pesquisável (OCR) sem transformar letras em imagens pixeladas."
                    },
                    {
                        "label": "Remoção de Páginas Vazias:",
                        "desc": "Elimine facilmente folhas em branco ou digitalizações incorretas antes de gerar o arquivo final consolidado."
                    },
                    {
                        "label": "Sem Restrição de Tamanho:",
                        "desc": "Como o processamento usa a memória do seu próprio computador, você pode juntar documentos extensos sem limites artificiais."
                    }
                ],
                "conclusion": "Após juntar os documentos, você pode utilizar o módulo de compressão para adequar o tamanho do arquivo a envios por e-mail.",
                "actionLabel": "Juntar arquivos PDF agora",
                "actionRoute": "/polacz-pdf"
            }
        ]
    },
    "ru": {
        "sectionAriaLabel": "База знаний и руководство по безопасной работе с файлами PDF",
        "whyBadge": "Архитектура Privacy-First и 100% Безопасность",
        "whyReadingTime": "Время чтения: 4 минуты • Полный справочник",
        "whyTitle": "Почему выбирают NoSignPDF? Безопасность документов в эпоху облаков",
        "whyLead": "Большинство популярных веб-сервисов требуют отправки ваших конфиденциальных договоров, счетов и паспортных данных на удаленные серверы. NoSignPDF меняет правила: все операции выполняются на 100% локально в вашем браузере, без риска утечки информации и без регистрации учетной записи.",
        "whyPillars": [
            {
                "title": "Zero Upload и память RAM",
                "desc": "Файлы открываются исключительно в оперативной памяти вашего устройства. Наш сервер не получает ни единого байта содержимого документов."
            },
            {
                "title": "Конфиденциальность договоров",
                "desc": "Персональные данные, ИНН, банковские реквизиты и финансовые отчеты остаются только у вас в соответствии с нормами GDPR."
            },
            {
                "title": "Максимальная скорость без очередей",
                "desc": "Вам не нужно тратить время на передачу тяжелых файлов по сети. Движок WebAssembly и pdf-lib мгновенно обрабатывает страницы силами процессора вашего устройства."
            }
        ],
        "whyParagraphs": [
            "Формат PDF (Portable Document Format) служит международным стандартом документооборота в бизнесе, юриспруденции и государственном секторе. Ежедневно пересылаются миллионы договоров, бухгалтерских актов, судебных исков и налоговых деклараций. Использование стандартных облачных конвертеров несет высокие риски: загружая файл на чужой сервер, вы теряете контроль над тем, сколько копий сохранено в журнале и кто имеет к ним доступ.",
            "NoSignPDF надежно устраняет эту проблему информационной безопасности. Благодаря веб-стандартам HTML5 File API, WebAssembly и библиотеке pdf-lib все математические преобразования структуры документа производятся в изолированной песочнице (sandbox) вашего веб-браузера. Это гарантирует, что даже при полном отключении интернета после загрузки страницы все инструменты продолжают стабильно работать.",
            "Отсутствие обязательной регистрации — это не только экономия времени, но и ключевой фактор цифровой гигиены. Мы не собираем адреса электронной почты, не формируем профили пользователей и не требуем оплату за снятие водяных знаков. Документ покидает ваше устройство только тогда, когда вы сами отправляете его партнеру."
        ],
        "guideBadge": "Экспертное Руководство и Словарь Терминов PDF",
        "guideTitle": "Обучение и Лучшие Практики: Как безопасно работать с PDF",
        "guideSubtitle": "Ответы экспертов по информационной безопасности на главные вопросы об очистке метаданных, заполнении форм и слиянии файлов",
        "guideArticles": [
            {
                "title": "Что такое метаданные в PDF и почему их нужно удалять перед отправкой?",
                "lead": "Каждый PDF-файл, помимо видимого текста и изображений, содержит скрытый слой технической информации (метаданные), который автоматически записывается офисными программами.",
                "bulletPoints": [
                    {
                        "label": "Имя автора и учетная запись:",
                        "desc": "В метаданных часто сохраняются реальное имя пользователя, системный логин и название организации."
                    },
                    {
                        "label": "Пути к файлам на диске:",
                        "desc": "В свойствах документа остаются внутренние пути к папкам (например, C:\\Users\\Имя\\Договоры) и версии программ."
                    },
                    {
                        "label": "Риски для бизнеса (OSINT):",
                        "desc": "Анализ скрытых метаданных — стандартная техника разведки конкурентов и злоумышленников перед фишинговыми атаками."
                    },
                    {
                        "label": "Очистка в NoSignPDF:",
                        "desc": "Наш модуль удаляет блоки /Info, потоки XMP и PieceInfo в памяти, формируя полностью анонимный документ."
                    }
                ],
                "conclusion": "Очистка метаданных настоятельно рекомендуется юристами и специалистами по кибербезопасности перед отправкой тендерной документации и конфиденциальных соглашений.",
                "actionLabel": "Очистить метаданные в файле",
                "actionRoute": "/wyczysc-metadane-pdf"
            },
            {
                "title": "Как безопасно заполнить форму PDF без распечатки на принтере?",
                "lead": "Печать на бумаге, ручное заполнение ручкой и повторное сканирование отнимают время и ухудшают качество документа. Современный документооборот построен на интерактивных AcroForms.",
                "bulletPoints": [
                    {
                        "label": "Нативные поля AcroForms:",
                        "desc": "Официальные бланки содержат цифровые интерактивные поля, позволяющие вводить текст прямо в окне браузера."
                    },
                    {
                        "label": "Идеальное качество шрифта:",
                        "desc": "Векторный ввод текста сохраняет идеальную резкость и аккуратность шрифта при печати и просмотре."
                    },
                    {
                        "label": "Защита персональных данных:",
                        "desc": "Паспортные данные, ИНН и номера счетов никогда не сохраняются в сетевых базах данных; при закрытии вкладки память очищается."
                    },
                    {
                        "label": "Соответствие стандарту ISO 32000:",
                        "desc": "Созданные в NoSignPDF файлы полностью совместимы с Adobe Acrobat и государственными порталами."
                    }
                ],
                "conclusion": "С помощью NoSignPDF вы заполните любое официальное заявление за считанные минуты без покупки дорогих офисных пакетов.",
                "actionLabel": "Заполнить форму PDF онлайн",
                "actionRoute": "/wypelnij-formularz-pdf"
            },
            {
                "title": "Как качественно объединить несколько файлов PDF в один документ?",
                "lead": "Сборка отчетов, договоров и приложений в один упорядоченный PDF — одна из самых частых офисных задач. Важно сохранить исходное качество графики и текста.",
                "bulletPoints": [
                    {
                        "label": "Удобный визуальный порядок:",
                        "desc": "Сетка миниатюр позволяет быстро перетаскивать страницы мышью, формируя правильную структуру многостраничного тома."
                    },
                    {
                        "label": "Сохранение векторного текста:",
                        "desc": "Слияние на уровне бинарных объектов PDF сохраняет возможность текстового поиска (OCR) без растеризации в картинку."
                    },
                    {
                        "label": "Удаление лишних листов:",
                        "desc": "В процессе объединения можно в один клик удалить пустые листы или ошибочные сканы."
                    },
                    {
                        "label": "Без ограничений по объему:",
                        "desc": "Так как вся обработка происходит на вашем компьютере, вы можете объединять объемные архивы документов."
                    }
                ],
                "conclusion": "После объединения страниц вы можете дополнительно сжать файл или удалить метаданные для безопасной отправки.",
                "actionLabel": "Объединить файлы PDF сейчас",
                "actionRoute": "/polacz-pdf"
            }
        ]
    }
}

def generate_custom_html(tool_path, lang, current_slug):
    html = clean_base_html
    html = re.sub(r'<html\s+lang="[^"]*"', f'<html lang="{lang}"', html)

    tool_info = TOOLS_METADATA.get(tool_path, TOOLS_METADATA['/'])
    meta = tool_info.get(lang, tool_info.get('pl', {'title': 'NoSignPDF', 'desc': 'Free PDF tools'}))
    title = meta['title']
    desc = meta['desc']

    primary_slug = PRIMARY_URLS[tool_path][lang]
    canonical_url = f"{site_domain}{primary_slug}" if primary_slug != '/' else f"{site_domain}/"
    current_page_url = f"{site_domain}{current_slug}" if current_slug != '/' else f"{site_domain}/"

    html = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', html, flags=re.DOTALL)

    html = re.sub(r'<meta\s+name="description"\s+content="[^"]*"\s*/>', f'<meta name="description" content="{desc}" />', html)
    html = re.sub(r'<meta\s+property="og:title"\s+content="[^"]*"\s*/>', f'<meta property="og:title" content="{title}" />', html)
    html = re.sub(r'<meta\s+property="og:description"\s+content="[^"]*"\s*/>', f'<meta property="og:description" content="{desc}" />', html)

    faq_data_by_lang = {
        'pl': [
            {"q": "Czy moje pliki są bezpieczne?", "a": "Tak, w 100% bezpieczne. W nosignpdf.com wszystkie operacje wykonujemy po stronie klienta (Client-Side) bezpośrednio w przeglądarce. Zero zbierania danych / pełna prywatność: Twoje pliki nigdy nie opuszczają pamięci RAM Twojego komputera lub telefonu."},
            {"q": "Czy nosignpdf.com to naprawdę darmowy edytor PDF bez rejestracji i bez znaków wodnych?", "a": "Tak! Nasz serwis to w 100% bezpłatny edytor PDF bez logowania, bez limitu stron i bez znaków wodnych."},
            {"q": "Jak szybki jest edytor w porównaniu do narzędzi chmurowych?", "a": "Jest ultra szybki, ponieważ nie wymaga przesyłania plików przez internet. Wszystkie obliczenia wykonuje procesor urządzenia w ułamku sekundy."}
        ],
        'en': [
            {"q": "Are my files safe?", "a": "Yes, 100% safe. At nosignpdf.com, we run everything client-side in your browser. Zero data collection / privacy guaranteed: your files never leave your device RAM."},
            {"q": "Is nosignpdf.com really a free PDF editor with no sign-up and no watermarks?", "a": "Yes! It is completely free with no registration, no login, and no watermarks."},
            {"q": "How fast is this editor compared to cloud tools?", "a": "It is ultra fast. Operations take place in milliseconds using your device processor without file upload waits."}
        ],
        'es': [
            {"q": "¿Mis archivos están seguros?", "a": "Sí, 100% seguros y confidenciales. En nosignpdf.com todo se procesa en el navegador (Client-Side). Seguro (zero data collection / privacidad): tus archivos jamás salen de tu memoria RAM."},
            {"q": "¿Es realmente un editor PDF gratis sin registro y sin marcas de agua?", "a": "¡Totalmente! Es un editor PDF gratis, sin registro, sin cuentas de usuario y sin marcas de agua."},
            {"q": "¿Qué tan rápido es el procesamiento?", "a": "Es ultra rápido. El procesador de tu equipo ejecuta todo en milisegundos sin subidas de red."}
        ],
        'hi': [
            {"q": "क्या मेरी फ़ाइलें सुरक्षित हैं?", "a": "हाँ, 100% पूरी तरह सुरक्षित हैं। nosignpdf.com में क्लाइंट-साइड तकनीक से फाइलें केवल आपके ब्राउज़र की रैम में खुलती हैं। सुरक्षित (zero data collection / गोपनीयता)।"},
            {"q": "क्या nosignpdf.com बिना लॉगिन और बिना वॉटरमार्क के मुफ्त पीडीएफ संपादक है?", "a": "हाँ! यह 100% मुफ्त पीडीएफ संपादक है बिना लॉगिन और बिना वॉटरमार्क के।"},
            {"q": "क्लाउड टूल्स की तुलना में यह कितना तेज़ है?", "a": "यह अल्ट्रा-तेज़ है क्योंकि अपलोड या डाउनलोड का इंतज़ार नहीं करना पड़ता। सारा काम डिवाइस से तुरंत होता है।"}
        ],
        'pt': [
            {"q": "Meus arquivos e documentos estão seguros?", "a": "Sim, 100% seguros e protegidos. No nosignpdf.com todas as operações rodam localmente no navegador (Client-Side). Seus arquivos nunca saem da memória RAM do seu dispositivo e nunca são enviados para servidores na nuvem."},
            {"q": "O NoSignPDF é gratuito, sem cadastro e sem marcas d'água?", "a": "Sim! É um editor de PDF 100% gratuito, sem necessidade de registro, sem limites ocultos e sem adicionar qualquer marca d'água."},
            {"q": "Qual é a velocidade de processamento?", "a": "É ultrarrápido! Como o processamento usa a CPU do seu próprio dispositivo via WebAssembly, não há fila de envio nem tempo de espera na internet."}
        ],
        'ru': [
            {"q": "Безопасны ли мои файлы и личные данные?", "a": "Да, на 100% безопасны. Сервис nosignpdf.com выполняет все операции локально в браузере (Client-Side). Документы открываются только в оперативной памяти (RAM) вашего устройства и никогда не передаются на сторонние серверы."},
            {"q": "Действительно ли сервис бесплатен, без водяных знаков и без регистрации?", "a": "Да! Все инструменты абсолютно бесплатны, не требуют создания аккаунта, не содержат скрытых лимитов и не ставят водяные знаки."},
            {"q": "Насколько быстро работает обработка PDF?", "a": "Мгновенно. Вся работа выполняется силами процессора вашего устройства на технологии WebAssembly без задержек на передачу файлов по сети."}
        ]
    }

    steps_data_by_lang = {
        'pl': [
            {"name": "Krok 1: Otwórz lub przeciągnij swój plik PDF", "text": "Upuść dokument w oknie edytora. Plik jest ładowany do pamięci RAM bez wysyłania do internetu."},
            {"name": "Krok 2: Wypełnij, edytuj lub modyfikuj strony", "text": "Wypełniaj formularze, obracaj, usuwaj lub łącz pliki z prędkością WebAssembly."},
            {"name": "Krok 3: Pobierz gotowy dokument PDF bez znaków wodnych", "text": "Zapisz gotowy plik na dysku w ułamku sekundy — bez logowania i bez opłat."}
        ],
        'en': [
            {"name": "Step 1: Open or Drop Your PDF File", "text": "Drag and drop your document. Loaded directly into local device RAM without internet upload."},
            {"name": "Step 2: Fill Forms, Edit or Reorder Pages", "text": "Complete AcroForms, rotate, delete pages, or merge documents with WebAssembly speed."},
            {"name": "Step 3: Download Clean PDF With No Watermarks", "text": "Save and download directly to your disk with zero watermarks and no sign-up."}
        ],
        'es': [
            {"name": "Paso 1: Abre o arrastra tu archivo PDF", "text": "Carga tu documento directamente en la memoria RAM local sin subirlo a la red."},
            {"name": "Paso 2: Rellena formularios, edita o reorganiza páginas", "text": "Edita campos AcroForms, rota o une páginas en milisegundos con WebAssembly."},
            {"name": "Paso 3: Descarga tu documento limpio y sin marcas de agua", "text": "Guarda tu PDF limpio sin marcas de agua y sin registro."}
        ],
        'hi': [
            {"name": "चरण 1: अपनी पीडीएफ फ़ाइल चुनें या ड्रैग करें", "text": "दस्तावेज़ सीधे डिवाइस की रैम में खुलता है — इंटरनेट पर कोई फाइल नहीं भेजी जाती।"},
            {"name": "चरण 2: फॉर्म भरें, संपादित करें या पेज व्यवस्थित करें", "text": "फॉर्म भरें, पेज घुमाएं या जोड़ें WebAssembly की अल्ट्रा-तेज़ गति से।"},
            {"name": "चरण 3: बिना वॉटरमार्क के स्वच्छ पीडीएफ डाउनलोड करें", "text": "बिना वॉटरमार्क और बिना लॉगिन के तुरंत नया पीडीएफ डाउनलोड करें।"}
        ],
        'pt': [
            {"name": "Passo 1: Selecione ou arraste seu documento PDF", "text": "O arquivo é aberto diretamente na memória RAM local sem envio para a internet."},
            {"name": "Passo 2: Edite, organize ou transforme suas páginas", "text": "Execute as operações com máxima velocidade de processamento local no seu processador."},
            {"name": "Passo 3: Salve e baixe o PDF sem marcas d'água", "text": "Baixe seu arquivo pronto instantaneamente, 100% gratuito e sem necessidade de login."}
        ],
        'ru': [
            {"name": "Шаг 1: Выберите или перетащите файл PDF", "text": "Документ загружается напрямую в оперативную память вашего устройства без отправки в сеть."},
            {"name": "Шаг 2: Выполните необходимое действие со страницами", "text": "Формы, объединение, сжатие и защита выполняются на скорости WebAssembly."},
            {"name": "Шаг 3: Сохраните готовый PDF без водяных знаков", "text": "Скачайте чистый документ в один клик без регистрации и без каких-либо комиссий."}
        ]
    }

    current_faqs = faq_data_by_lang.get(lang, faq_data_by_lang['en'])
    current_steps = steps_data_by_lang.get(lang, steps_data_by_lang['en'])

    jsonld_schemas = [
        {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": title,
            "description": desc,
            "inLanguage": lang,
            "step": [
                {
                    "@type": "HowToStep",
                    "position": idx + 1,
                    "name": s["name"],
                    "text": s["text"]
                } for idx, s in enumerate(current_steps)
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "inLanguage": lang,
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": item["q"],
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item["a"]
                    }
                } for item in current_faqs
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "NoSignPDF",
            "url": canonical_url,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires JavaScript and WebAssembly",
            "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
            }
        }
    ]

    jsonld_script = f"""    <script type="application/ld+json">
{json.dumps(jsonld_schemas, ensure_ascii=False, indent=4)}
    </script>"""

    pl_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['pl']}" if PRIMARY_URLS[tool_path]['pl'] != '/' else f"{site_domain}/"
    en_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['en']}"
    es_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['es']}"
    hi_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['hi']}"
    pt_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['pt']}"
    ru_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['ru']}"

    alternates_html = f"""    <link rel="canonical" href="{canonical_url}" />
    <meta property="og:url" content="{current_page_url}" />
    <meta property="og:locale" content="{locale_map.get(lang, 'pl_PL')}" />
    <meta name="twitter:title" content="{title}" />
    <meta name="twitter:description" content="{desc}" />
    <link rel="alternate" hreflang="pl" href="{pl_alt}" />
    <link rel="alternate" hreflang="en" href="{en_alt}" />
    <link rel="alternate" hreflang="es" href="{es_alt}" />
    <link rel="alternate" hreflang="hi" href="{hi_alt}" />
    <link rel="alternate" hreflang="pt" href="{pt_alt}" />
    <link rel="alternate" hreflang="ru" href="{ru_alt}" />
    <link rel="alternate" hreflang="x-default" href="{pl_alt}" />
{jsonld_script}"""

    html = html.replace('</head>', f'{alternates_html}\n  </head>')

    if tool_path == '/polityka-privacy':
        privacy_body = get_privacy_html_body(lang)
        html = html.replace('<div id="root"></div>', f'<div id="root">{privacy_body}</div>')
    else:
        publisher_body = get_publisher_html_body(lang, tool_path, title, desc)
        html = html.replace('<div id="root"></div>', f'<div id="root">{publisher_body}</div>')

    return html

def get_privacy_html_body(lang):
    if lang == 'pl':
        return """
<div id="privacy-policy-view" class="w-full max-w-4xl mx-auto py-8 px-4 font-sans text-zinc-900 dark:text-zinc-100">
  <div class="mb-6 flex items-center justify-between">
    <a href="/" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
      ← Powrót do narzędzi PDF
    </a>
    <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200">
      Zgodność z Google AdSense, RODO i GDPR
    </span>
  </div>
  <article class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
    <div class="border-b border-zinc-100 dark:border-zinc-800 pb-6">
      <span class="text-xs uppercase tracking-wider font-bold text-zinc-400">nosignpdf.com – Bezpieczeństwo i Transparentność</span>
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-white">
        Polityka Prywatności i Regulamin Serwisu (Terms of Service)
      </h1>
      <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
        Niniejszy dokument określa zasady przetwarzania danych, wyświetlania reklam sieci Google AdSense oraz korzystania z darmowych narzędzi serwisu nosignpdf.com. Naszym priorytetem jest pełna ochrona Twojej prywatności: aplikacja działa w 100% lokalnie w przeglądarce użytkownika i nie zbiera, nie przetwarza ani nie przetrzymuje żadnych plików PDF ani danych osobowych na zewnętrznych serwerach.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">100% Pamięć RAM</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Pliki PDF nigdy nie opuszczają Twojego urządzenia. Brak wysyłki do chmury.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Google AdSense & Cookies</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Ciasteczka służą wyłącznie do bezpiecznej monetyzacji i emisji reklam.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Brak Rejestracji i Baz</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Zero kont użytkowników, zero logowania i zero śledzenia treści dokumentów.</p>
      </div>
    </div>
  </article>
</div>
"""
    elif lang == 'pt':
        return """
<div id="privacy-policy-view" class="w-full max-w-4xl mx-auto py-8 px-4 font-sans text-zinc-900 dark:text-zinc-100">
  <div class="mb-6 flex items-center justify-between">
    <a href="/pt" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
      ← Voltar para as ferramentas PDF
    </a>
    <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200">
      Conformidade com Google AdSense, LGPD e GDPR
    </span>
  </div>
  <article class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
    <div class="border-b border-zinc-100 dark:border-zinc-800 pb-6">
      <span class="text-xs uppercase tracking-wider font-bold text-zinc-400">nosignpdf.com – Segurança e Transparência</span>
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-white">
        Política de Privacidade e Termos de Serviço
      </h1>
      <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
        Este documento estabelece as diretrizes de privacidade, veiculação de anúncios do Google AdSense e termos de uso do nosignpdf.com. Nosso compromisso absoluto é com a sua privacidade: nossa aplicação roda 100% localmente no navegador do usuário (Client-Side) e nunca envia, processa ou armazena seus documentos PDF ou dados confidenciais em servidores externos, em total conformidade com a LGPD e o GDPR.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">100% Memória RAM</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Seus arquivos nunca saem do seu computador ou smartphone.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Google AdSense e Cookies</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Cookies utilizados exclusivamente para publicidade segura e monetização.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Zero Cadastro e Sem Bancos</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Sem contas, sem login e sem rastreamento do conteúdo dos arquivos.</p>
      </div>
    </div>
  </article>
</div>
"""
    elif lang == 'ru':
        return """
<div id="privacy-policy-view" class="w-full max-w-4xl mx-auto py-8 px-4 font-sans text-zinc-900 dark:text-zinc-100">
  <div class="mb-6 flex items-center justify-between">
    <a href="/ru" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
      ← Вернуться к инструментам PDF
    </a>
    <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200">
      Соответствие Google AdSense и GDPR
    </span>
  </div>
  <article class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
    <div class="border-b border-zinc-100 dark:border-zinc-800 pb-6">
      <span class="text-xs uppercase tracking-wider font-bold text-zinc-400">nosignpdf.com – Безопасность и Прозрачность</span>
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-white">
        Политика Конфиденциальности и Условия Использования
      </h1>
      <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
        Настоящий документ регламентирует правила обработки данных, показ рекламы Google AdSense и условия использования веб-сервиса nosignpdf.com. Наш абсолютный приоритет — защита вашей конфиденциальности: приложение работает на 100% локально в браузере пользователя (Client-Side), не собирает, не отправляет и не сохраняет файлы PDF и персональные данные на внешних серверах в соответствии со стандартами GDPR.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">100% Память RAM</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Документы никогда не покидают ваше устройство. Без облачных серверов.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Google AdSense и Cookies</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Файлы cookie применяются исключительно для безопасной доставки рекламы.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Без Регистрации и Баз</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Ноль учетных записей, ноль авторизаций и ноль слежения за файлами.</p>
      </div>
    </div>
  </article>
</div>
"""
    elif lang == 'es':
        return """
<div id="privacy-policy-view" class="w-full max-w-4xl mx-auto py-8 px-4 font-sans text-zinc-900 dark:text-zinc-100">
  <div class="mb-6 flex items-center justify-between">
    <a href="/es" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
      ← Volver a herramientas PDF
    </a>
    <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200">
      Cumplimiento con Google AdSense y RGPD
    </span>
  </div>
  <article class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
    <div class="border-b border-zinc-100 dark:border-zinc-800 pb-6">
      <span class="text-xs uppercase tracking-wider font-bold text-zinc-400">nosignpdf.com – Seguridad y Transparencia</span>
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-white">
        Política de Privacidad y Términos de Servicio (Terms of Service)
      </h1>
      <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
        Este documento describe el tratamiento de datos, la publicidad con Google AdSense y los términos de uso en nosignpdf.com. Nuestra prioridad es tu privacidad: la aplicación funciona al 100% de manera local en el navegador del usuario y no recopila, procesa ni almacena ningún archivo PDF ni datos personales en servidores externos.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">100% Memoria RAM</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Los archivos nunca salen de tu dispositivo. Sin servidores en la nube.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Google AdSense y Cookies</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Las cookies se utilizan únicamente para monetización y entrega de publicidad.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Sin Registro ni Base de Datos</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Sin cuentas, sin inicios de sesión y sin rastreo de tus documentos.</p>
      </div>
    </div>
  </article>
</div>
"""
    elif lang == 'hi':
        return """
<div id="privacy-policy-view" class="w-full max-w-4xl mx-auto py-8 px-4 font-sans text-zinc-900 dark:text-zinc-100">
  <div class="mb-6 flex items-center justify-between">
    <a href="/hi" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
      ← पीडीएफ टूल्स पर वापस जाएं
    </a>
    <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200">
      Google AdSense और गोपनीयता मानकों के अनुरूप
    </span>
  </div>
  <article class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
    <div class="border-b border-zinc-100 dark:border-zinc-800 pb-6">
      <span class="text-xs uppercase tracking-wider font-bold text-zinc-400">nosignpdf.com – सुरक्षा और पारदर्शिता</span>
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-white">
        गोपनीयता नीति और सेवा की शर्तें (Privacy Policy & Terms)
      </h1>
      <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
        nosignpdf.com आपकी गोपनीयता को सर्वोच्च प्राथमिकता देता है। एप्लिकेशन 100% स्थानीय रूप से ब्राउज़र की रैम में चलती है और कोई भी पीडीएफ या व्यक्तिगत जानकारी किसी बाहरी सर्वर पर नहीं भेजी जाती।
      </p>
    </div>
  </article>
</div>
"""
    else:  # default 'en'
        return """
<div id="privacy-policy-view" class="w-full max-w-4xl mx-auto py-8 px-4 font-sans text-zinc-900 dark:text-zinc-100">
  <div class="mb-6 flex items-center justify-between">
    <a href="/en" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
      ← Back to PDF Tools
    </a>
    <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200">
      Compliant with Google AdSense, GDPR & Privacy Standards
    </span>
  </div>
  <article class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
    <div class="border-b border-zinc-100 dark:border-zinc-800 pb-6">
      <span class="text-xs uppercase tracking-wider font-bold text-zinc-400">nosignpdf.com – Security & Transparency</span>
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-white">
        Privacy Policy & Terms of Service
      </h1>
      <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
        This document outlines data processing policies, Google AdSense advertising integration, and terms of use for nosignpdf.com. Our highest priority is your privacy: the application operates 100% locally in your browser and never uploads, stores, or processes any PDF files or personal data on remote servers.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">100% In-Browser RAM</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Your PDF files never leave your device. No cloud storage or remote servers.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Google AdSense & Cookies</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Cookies are used solely for advertising delivery and monetization compliance.</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Zero Sign-Up & No Databases</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">No accounts, no logins, and zero tracking of your document contents.</p>
      </div>
    </div>
  </article>
</div>
"""

def get_publisher_html_body(lang, tool_path, title, desc):
    content = PUBLISHER_CONTENT_RAW.get(lang, PUBLISHER_CONTENT_RAW['en'])
    
    pillars_list = []
    for p in content.get('whyPillars', []):
        pillars_list.append(f'<div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60"><h4 class="text-xs font-bold text-zinc-900 dark:text-white">{p["title"]}</h4><p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{p["desc"]}</p></div>')
    pillars_html = "".join(pillars_list)

    paragraphs_list = []
    for p in content.get('whyParagraphs', []):
        paragraphs_list.append(f'<p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{p}</p>')
    paragraphs_html = "".join(paragraphs_list)

    articles_list = []
    for art in content.get('guideArticles', []):
        bullets_list = []
        for b in art.get('bulletPoints', []):
            bullets_list.append(f'<li><strong>{b["label"]}</strong> {b["desc"]}</li>')
        bullets_str = "".join(bullets_list)
        concl = art.get('conclusion', '')
        art_html = f'<article class="space-y-2 border-b border-zinc-100 dark:border-zinc-800/60 pb-4"><h3 class="text-lg font-bold text-zinc-900 dark:text-white">{art["title"]}</h3><p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{art["lead"]}</p><ul class="space-y-1.5 pl-5 list-disc text-xs text-zinc-600 dark:text-zinc-400">{bullets_str}</ul><p class="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-2">{concl}</p></article>'
        articles_list.append(art_html)
    articles_html = "".join(articles_list)

    footer_lang_prefix = f"/{lang}" if lang != 'pl' else ''
    if lang == 'pt':
        privacy_href = f"{footer_lang_prefix}/politica-de-privacidade"
    elif lang == 'ru':
        privacy_href = f"{footer_lang_prefix}/politika-konfidencialnosti"
    elif lang == 'es':
        privacy_href = f"{footer_lang_prefix}/politica-privacidad"
    elif lang in ['en', 'hi']:
        privacy_href = f"{footer_lang_prefix}/privacy-policy"
    else:
        privacy_href = "/polityka-privacy"

    why_badge = content.get('whyBadge', '100% Privacy-First Architecture')
    why_title = content.get('whyTitle', 'Document Security')
    why_lead = content.get('whyLead', '')
    guide_badge = content.get('guideBadge', 'Knowledge Guide')
    guide_title = content.get('guideTitle', 'Guide & Best Practices')
    guide_subtitle = content.get('guideSubtitle', '')

    return f"""
<div id="publisher-prerender-content" class="w-full max-w-5xl mx-auto py-8 px-4 font-sans text-zinc-900 dark:text-zinc-100 space-y-8">
  <header class="border-b border-zinc-200 dark:border-zinc-800 pb-6">
    <div class="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-2">
      <span>🔒 {why_badge}</span>
    </div>
    <h1 class="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">{title}</h1>
    <p class="text-base text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">{desc}</p>
  </header>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {pillars_html}
  </div>

  <section class="space-y-4">
    <h2 class="text-2xl font-bold text-zinc-900 dark:text-white">{why_title}</h2>
    <p class="text-base text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">{why_lead}</p>
    {paragraphs_html}
  </section>

  <section class="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-emerald-600">{guide_badge}</span>
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{guide_title}</h2>
      <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{guide_subtitle}</p>
    </div>
    <div class="space-y-4">
      {articles_html}
    </div>
  </section>

  <footer class="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-500">
    <a href="{privacy_href}" class="underline hover:text-zinc-900 dark:hover:text-white">Privacy Policy & Terms</a>
    <span>© 2026 NoSignPDF • 100% Client-Side Engine</span>
  </footer>
</div>
"""

print("Pre-rendering static subpages for multi-language SEO (PL, EN, ES, HI, PT, RU)...")
generated_count = 0

for tool_path in ALL_SLUGS.keys():
    for lang in languages:
        slug_list = ALL_SLUGS[tool_path].get(lang, [])
        for slug in slug_list:
            if slug == '/':
                target_dir = dist_dir
            else:
                target_dir = os.path.join(dist_dir, slug.strip('/'))

            os.makedirs(target_dir, exist_ok=True)
            file_path = os.path.join(target_dir, 'index.html')
            
            custom_html = generate_custom_html(tool_path, lang, slug)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(custom_html)
            generated_count += 1

print(f"Successfully pre-rendered {generated_count} static HTML index files with dedicated SEO metadata.")

# Generate comprehensive multi-language sitemap.xml
print("Generating comprehensive sitemap.xml with 6-language alternates...")
sitemap_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">'
]

for tool_path in PRIMARY_URLS.keys():
    priority = '1.0' if tool_path == '/' else ('0.9' if tool_path in ['/wypelnij-formularz-pdf', '/kompresuj-pdf', '/grafika-do-pdf', '/polacz-pdf', '/wyczysc-metadane-pdf', '/wyciagnij-grafiki-z-pdf', '/zabezpiecz-pdf-haslem', '/usun-haslo-z-pdf', '/zmien-pdf-na-czarno-bialy', '/ponumeruj-strony-pdf'] else ('0.3' if tool_path == '/polityka-privacy' else '0.8'))

    pl_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['pl']}" if PRIMARY_URLS[tool_path]['pl'] != '/' else f"{site_domain}/"
    en_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['en']}"
    es_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['es']}"
    hi_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['hi']}"
    pt_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['pt']}"
    ru_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['ru']}"

    for lang in languages:
        primary_slug = PRIMARY_URLS[tool_path][lang]
        loc = f"{site_domain}{primary_slug}" if primary_slug != '/' else f"{site_domain}/"

        sitemap_lines.append('  <url>')
        sitemap_lines.append(f'    <loc>{loc}</loc>')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="pl" href="{pl_alt}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="en" href="{en_alt}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="es" href="{es_alt}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="hi" href="{hi_alt}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="pt" href="{pt_alt}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="ru" href="{ru_alt}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{pl_alt}" />')
        sitemap_lines.append('    <changefreq>weekly</changefreq>')
        sitemap_lines.append(f'    <priority>{priority}</priority>')
        sitemap_lines.append('  </url>')

sitemap_lines.append('</urlset>\n')
sitemap_content = '\n'.join(sitemap_lines)

# Write sitemap.xml directly to dist/ and public/
with open(os.path.join(dist_dir, 'sitemap.xml'), 'w', encoding='utf-8') as f:
    f.write(sitemap_content)
print(f"Wrote {os.path.join(dist_dir, 'sitemap.xml')}")

os.makedirs('public', exist_ok=True)
with open(os.path.join('public', 'sitemap.xml'), 'w', encoding='utf-8') as f:
    f.write(sitemap_content)
print(f"Wrote {os.path.join('public', 'sitemap.xml')}")

# Write robots.txt with sitemap directives
robots_content = """User-agent: *
Allow: /

Sitemap: https://nosignpdf.com/sitemap.xml
Sitemap: https://nosignpdf.com
"""
with open(os.path.join(dist_dir, 'robots.txt'), 'w', encoding='utf-8') as f:
    f.write(robots_content)
with open(os.path.join('public', 'robots.txt'), 'w', encoding='utf-8') as f:
    f.write(robots_content)
print(f"Wrote {os.path.join(dist_dir, 'robots.txt')} and {os.path.join('public', 'robots.txt')}")

# Copy favicon.ico, ads.txt, and _headers if present
if os.path.exists(os.path.join('public', 'favicon.ico')):
    shutil.copyfile(os.path.join('public', 'favicon.ico'), os.path.join(dist_dir, 'favicon.ico'))
if os.path.exists(os.path.join('public', 'ads.txt')):
    shutil.copyfile(os.path.join('public', 'ads.txt'), os.path.join(dist_dir, 'ads.txt'))
if os.path.exists(os.path.join('public', '_headers')):
    shutil.copyfile(os.path.join('public', '_headers'), os.path.join(dist_dir, '_headers'))
if os.path.exists(os.path.join('public', '_routes.json')):
    shutil.copyfile(os.path.join('public', '_routes.json'), os.path.join(dist_dir, '_routes.json'))

print("Creating Cloudflare Pages production zip archive...")
with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            if file.endswith('.zip') or file.startswith('.git'):
                continue
            full_path = os.path.join(root, file)
            arcname = os.path.relpath(full_path, dist_dir)
            zipf.write(full_path, arcname)

shutil.copyfile(zip_filename, os.path.join(dist_dir, zip_filename))
shutil.copyfile(zip_filename, os.path.join('public', zip_filename))

file_size_mb = os.path.getsize(zip_filename) / (1024 * 1024)
print(f"\nSuccess! Archive created: {zip_filename} ({file_size_mb:.2f} MB)")
print("Cloudflare Pages 6-language deployment package is 100% ready:")
print("  - Static HTML pre-rendered for all 6 languages (pl, en, es, hi, pt, ru)")
print("  - Full hreflang alternates and canonical tags for Googlebot")
print("  - sitemap.xml with 114 URLs (6 languages x 19 pages)")
print("  - Native 200.html SPA routing fallback (no _redirects loops)")
print("  - favicon.ico, robots.txt, and ads.txt at root")
