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
# Cloudflare Pages automatically serves 200.html for any unmatched route in Single Page Apps
# without using _redirects file, completely eliminating ERR_TOO_MANY_REDIRECTS loops!
index_path = os.path.join(dist_dir, 'index.html')
spa_fallback_path = os.path.join(dist_dir, '200.html')
spa_404_path = os.path.join(dist_dir, '404.html')
if os.path.exists(index_path):
    shutil.copyfile(index_path, spa_fallback_path)
    shutil.copyfile(index_path, spa_404_path)
    print(f"Created native SPA fallbacks {spa_fallback_path} and {spa_404_path}")

# Strictly ensure no _redirects file exists anywhere (dist, public, or root)
# Native Cloudflare single-page-application handling in wrangler.json handles all SPA routing cleanly
for red_path in ['_redirects', os.path.join('public', '_redirects'), os.path.join(dist_dir, '_redirects')]:
    if os.path.exists(red_path):
        try:
            os.remove(red_path)
            print(f"Removed {red_path} to avoid redirect loops and conflicts.")
        except Exception:
            pass

# Generate _routes.json to explicitly exclude static files (sitemap, robots, ads, assets)
# from Worker / Function / SPA routing intercepts on Cloudflare Pages
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

# Ensure wrangler.json is configured for static assets with SPA handling
wrangler_config = {
    "$schema": "node_modules/wrangler/config-schema.json",
    "name": "nosignpdf",
    "compatibility_date": "2026-09-25",
    "assets": {
        "directory": "./dist",
        "not_found_handling": "single-page-application"
    }
}
with open('wrangler.json', 'w', encoding='utf-8') as f:
    json.dump(wrangler_config, f, indent=2)
    f.write('\n')
print("Configured wrangler.json with assets.directory pointing to ./dist.")

# Tools and localized metadata definitions for SEO pre-rendering
TOOLS_METADATA = {
    '/': {
        'pl': {
            'title': 'Edytor PDF Online – 100% Darmowy, Bez Logowania i Bezpieczny',
            'desc': 'Darmowy edytor PDF online działający w Twojej przeglądarce bez logowania i rejestracji. Łącz, dziel, obracaj, usuwaj strony i wypełniaj formularze PDF bez wysyłania plików na serwer.'
        },
        'en': {
            'title': 'Free Online PDF Editor – No Sign-Up, Private & In-Browser',
            'desc': '100% free online PDF editor running client-side in your browser. Merge, split, rotate, delete pages, and fill PDF forms with zero sign-up and no watermarks.'
        },
        'es': {
            'title': 'Editor PDF Gratis Online – Sin Registro, Seguro y en Navegador',
            'desc': 'Editor PDF online 100% gratis y privado que funciona en tu navegador sin registro. Une, divide, gira, elimina páginas y rellena formularios PDF sin subir tus archivos.'
        },
        'hi': {
            'title': 'मुफ्त ऑनलाइन पीडीएफ संपादक – बिना लॉगिन, 100% सुरक्षित और निजी',
            'desc': 'ब्राउज़र में स्थानीय रूप से चलने वाला 100% मुफ्त पीडीएफ एडिटर। बिना रजिस्ट्रेशन पीडीएफ फाइलें जोड़ें, अलग करें, घुमाएं और फॉर्म भरें बिना सर्वर पर फाइल भेजे।'
        }
    },
    '/polacz-pdf': {
        'pl': {
            'title': 'Połącz PDF Online – Darmowe Łączenie Plików PDF bez Logowania',
            'desc': 'Szybko i bezpiecznie połącz wiele plików PDF w jeden dokument online. W 100% darmowe narzędzie, bez rejestracji i bez znaku wodnego.'
        },
        'en': {
            'title': 'Merge PDF Online – Free PDF Joiner with No Sign-Up',
            'desc': 'Combine multiple PDF files into one single document online quickly and securely. 100% free tool, no registration, no file size limits, and no watermarks.'
        },
        'es': {
            'title': 'Unir PDF Online – Combinar Archivos PDF Gratis Sin Registro',
            'desc': 'Une múltiples archivos PDF en un solo documento online de forma rápida y segura. Herramienta 100% gratis, sin registro y sin marcas de agua.'
        },
        'hi': {
            'title': 'पीडीएफ जोड़ें ऑनलाइन – मुफ्त में कई पीडीएफ एक करें (No Sign-Up)',
            'desc': 'कई पीडीएफ फाइलों को एक दस्तावेज़ में सुरक्षित रूप से ऑनलाइन जोड़ें। 100% मुफ्त टूल, बिना लॉगिन और बिना वॉटरमार्क के।'
        }
    },
    '/rozdziel-pdf': {
        'pl': {
            'title': 'Rozdziel PDF Online – Darmowe Wyodrębnianie Stron z PDF',
            'desc': 'Błyskawicznie podziel plik PDF na pojedyncze strony lub wyodrębnij wybrany zakres arkuszy. Całkowicie za darmo, bez rejestracji i bez limitów.'
        },
        'en': {
            'title': 'Split PDF Online – Extract Pages from PDF for Free',
            'desc': 'Instantly split PDF documents into single pages or extract custom page ranges online. 100% free, client-side private, with no sign-up required.'
        },
        'es': {
            'title': 'Dividir PDF Online – Extraer Páginas de PDF Gratis Sin Registro',
            'desc': 'Divide documentos PDF en páginas sueltas o extrae rangos específicos online. 100% gratis, sin registro y con total privacidad en tu navegador.'
        },
        'hi': {
            'title': 'पीडीएफ अलग करें ऑनलाइन – पेज निकालें व विभाजित करें मुफ्त में',
            'desc': 'पीडीएफ फाइल को अलग-अलग पेजों में तुरंत विभाजित करें या अपनी पसंद के पेज निकालें। 100% मुफ्त, बिना पंजीकरण और पूर्ण सुरक्षा के साथ।'
        }
    },
    '/wypelnij-formularz-pdf': {
        'pl': {
            'title': 'Wypełnij Formularz PDF Online – Bez Drukowania i Logowania',
            'desc': 'Uzupełniaj wnioski urzędowe, pisma i formularze PDF bezpośrednio w przeglądarce. Wpisuj tekst, zaznaczaj pola, podpisuj i zapisuj plik bez rejestracji.'
        },
        'en': {
            'title': 'Fill PDF Form Online – Free PDF Form Filler No Sign-Up',
            'desc': 'Fill out applications, contracts, and official PDF forms directly in your browser. Type text, tick checkboxes, and download instantly without printing or sign-up.'
        },
        'es': {
            'title': 'Rellenar Formulario PDF Online – Gratis, Sin Imprimir y Sin Registro',
            'desc': 'Completa formularios, contratos y solicitudes oficiales PDF directamente en tu navegador. Escribe texto, marca casillas y guarda sin registro.'
        },
        'hi': {
            'title': 'पीडीएफ फॉर्म भरें ऑनलाइन – बिना प्रिंट और बिना लॉगिन के मुफ्त',
            'desc': 'सरकारी आवेदन, अनुबंध और फॉर्म सीधे अपने ब्राउज़र में भरें। टेक्स्ट टाइप करें, चेकबॉक्स टिक करें और बिना लॉगिन तुरंत डाउनलोड करें।'
        }
    },
    '/obroc-pdf': {
        'pl': {
            'title': 'Obróć PDF Online – Obracanie Stron PDF o 90, 180 Stopni Za Darmo',
            'desc': 'Trwale obróć krzywe lub odwrócone strony PDF o 90°, 180° lub 270°. Napraw skany dokumentów w pamięci przeglądarki bez logowania i bez opłat.'
        },
        'en': {
            'title': 'Rotate PDF Online – Turn PDF Pages 90 or 180 Degrees Free',
            'desc': 'Permanently rotate single pages or entire PDF files by 90, 180, or 270 degrees. Fix upside-down scans instantly in your browser with no sign-up.'
        },
        'es': {
            'title': 'Rotar PDF Online – Girar Páginas PDF 90 o 180 Grados Gratis',
            'desc': 'Gira páginas individuales o todo el archivo PDF a 90°, 180° o 270° de forma permanente. Arregla escaneos invertidos online sin registro.'
        },
        'hi': {
            'title': 'पीडीएफ घुमाएं ऑनलाइन – 90 या 180 डिग्री पेज रोटेट करें मुफ्त',
            'desc': 'उल्टे या तिरछे स्कैन किए गए पीडीएफ पेजों को 90°, 180° या 270° घुमाएं। बिना लॉगिन और पूरी तरह सुरक्षित अपने ब्राउज़र में ठीक करें।'
        }
    },
    '/usun-strony-z-pdf': {
        'pl': {
            'title': 'Usuń Strony z PDF Online – Wytnij Zbędne Strony z Pliku PDF',
            'desc': 'Wybierz i usuń niepotrzebne strony lub puste arkusze ze swojego dokumentu PDF za pomocą jednego kliknięcia. Szybko, za darmo i bez wysyłania do chmury.'
        },
        'en': {
            'title': 'Delete Pages from PDF Online – Remove PDF Pages for Free',
            'desc': 'Select and remove unwanted or blank pages from your PDF file with one click. Fast, free, client-side, and no registration required.'
        },
        'es': {
            'title': 'Eliminar Páginas de PDF Online – Borrar Páginas Gratis',
            'desc': 'Selecciona y elimina hojas no deseadas o páginas en blanco de tu documento PDF con un solo clic. Gratis, rápido y 100% privado.'
        },
        'hi': {
            'title': 'पीडीएफ से पेज हटाएं ऑनलाइन – अवांछित पेज मिटाएं मुफ्त में',
            'desc': 'अपने पीडीएफ दस्तावेज़ से खाली या अनावश्यक पेज एक क्लिक में हटाएं। सुरक्षित, तेज़ और बिना किसी पंजीकरण के पूरी तरह मुफ्त।'
        }
    },
    '/pdf-to-word': {
        'pl': {
            'title': 'Konwertuj PDF do Word Online (.docx) – Darmowa Konwersja bez Logowania',
            'desc': 'Przekonwertuj dokument PDF na edytowalny plik Word (.docx) bezpośrednio w przeglądarce. Ekstrakcja tekstu bez wysyłania plików na serwer.'
        },
        'en': {
            'title': 'Convert PDF to Word Online (.docx) – Free Converter No Sign-Up',
            'desc': 'Convert PDF documents into editable Word (.docx) files directly in your browser. Fast client-side text extraction with no file upload to servers.'
        },
        'es': {
            'title': 'Convertir PDF a Word Online (.docx) – Gratis y Sin Registro',
            'desc': 'Convierte tus documentos PDF a archivos editables de Word (.docx) directamente en tu navegador. Extracción de texto local 100% privada.'
        },
        'hi': {
            'title': 'पीडीएफ से वर्ड (.docx) बदलें ऑनलाइन – मुफ्त कनवर्टर बिना लॉगिन',
            'desc': 'पीडीएफ दस्तावेज़ को संपादन योग्य वर्ड (.docx) फाइल में आसानी से बदलें। बिना सर्वर पर अपलोड किए स्थानीय रूप से टेक्स्ट निकालें।'
        }
    },
    '/word-to-pdf': {
        'pl': {
            'title': 'Konwertuj Word do PDF Online – Wklej Tekst i Utwórz Dokument PDF',
            'desc': 'Stwórz profesjonalny plik PDF z tekstu lub notatek. Wbudowany edytor tekstu, czysty format i natychmiastowe pobieranie pliku PDF za darmo.'
        },
        'en': {
            'title': 'Convert Word / Text to PDF Online – Free PDF Creator',
            'desc': 'Turn text, notes, and documents into a clean formatted PDF. Built-in editor, zero sign-up, and instant local generation in your browser.'
        },
        'es': {
            'title': 'Convertir Word a PDF Online – Creador de PDF Gratis',
            'desc': 'Crea documentos PDF profesionales a partir de texto o notas. Editor integrado, descarga inmediata y 100% gratis sin registro.'
        },
        'hi': {
            'title': 'वर्ड से पीडीएफ बनाएं ऑनलाइन – टेक्स्ट से पीडीएफ कनवर्टर मुफ्त',
            'desc': 'टेक्स्ट या नोट्स से सुंदर और पेशेवर पीडीएफ तैयार करें। तुरंत स्थानीय रूप से जनरेट करें बिना किसी लॉगिन या शुल्क के।'
        }
    },
    '/pdf-to-excel': {
        'pl': {
            'title': 'Konwertuj PDF do Excel Online – Ekstrakcja Tabel i Danych do CSV',
            'desc': 'Błyskawicznie wyodrębnij tabele i dane liczbowe z pliku PDF do formatu CSV / Excel. Bezpieczne przetwarzanie w pamięci RAM bez logowania.'
        },
        'en': {
            'title': 'Convert PDF to Excel Online – Extract Tables to CSV / Excel Free',
            'desc': 'Extract tables and financial data from PDF files directly into Excel-compatible CSV sheets. Fast, accurate, and completely private.'
        },
        'es': {
            'title': 'Convertir PDF a Excel Online – Extraer Tablas a CSV / Excel Gratis',
            'desc': 'Extrae tablas y datos numéricos de tus archivos PDF a hojas de cálculo CSV compatibles con Excel. Rápido, gratis y sin subir archivos.'
        },
        'hi': {
            'title': 'पीडीएफ से एक्सेल बदलें ऑनलाइन – टेबल और डेटा सीएसवी में निकालें',
            'desc': 'पीडीएफ से टेबल और संख्यात्मक डेटा आसानी से एक्सेल के अनुकूल सीएसवी में निकालें। पूरी तरह सुरक्षित और मुफ्त ऑनलाइन टूल।'
        }
    },
    '/excel-to-pdf': {
        'pl': {
            'title': 'Konwertuj Excel do PDF Online – Generuj Raport Tabelaryczny PDF',
            'desc': 'Wklej dane tabelaryczne z programu Excel lub Arkuszy Google i wygeneruj czytelny raport PDF z siatką danych. 100% darmowe narzędzie.'
        },
        'en': {
            'title': 'Convert Excel to PDF Online – Table to PDF Report Generator',
            'desc': 'Paste table rows and columns from Excel or Google Sheets to generate a clean, formatted PDF table report instantly for free.'
        },
        'es': {
            'title': 'Convertir Excel a PDF Online – Generador de Reportes PDF desde Tablas',
            'desc': 'Pega filas y columnas de Excel o Google Sheets para generar un informe PDF bien formateado y con cuadrícula al instante.'
        },
        'hi': {
            'title': 'एक्सेल से पीडीएफ बदलें ऑनलाइन – टेबल से पीडीएफ रिपोर्ट बनाएं',
            'desc': 'एक्सेल या गूगल शीट्स से डेटा पेस्ट करें और सुंदर टेबल वाला पीडीएफ दस्तावेज़ तैयार करें। बिना लॉगिन तुरंत मुफ्त बनाएं।',
        }
    },
    '/polityka-privacy': {
        'pl': {
            'title': 'Polityka Prywatności i Regulamin – PDF Studio Online (nosignpdf.com)',
            'desc': 'Zasady korzystania z darmowych narzędzi PDF Studio Online, gwarancja prywatności Client-Side, pliki cookies oraz warunki użytkowania.'
        },
        'en': {
            'title': 'Privacy Policy & Terms of Service – PDF Studio Online (nosignpdf.com)',
            'desc': 'Terms of service, client-side zero upload privacy policy, cookies, and conditions for using PDF Studio Online at nosignpdf.com.'
        },
        'es': {
            'title': 'Política de Privacidad y Términos – PDF Studio Online (nosignpdf.com)',
            'desc': 'Términos de servicio, garantía de privacidad sin subida de archivos (Client-Side) y política de cookies de PDF Studio Online.'
        },
        'hi': {
            'title': 'गोपनीयता नीति और नियम – PDF Studio Online (nosignpdf.com)',
            'desc': 'nosignpdf.com की सेवा शर्तें, 100% क्लाइंट-साइड गोपनीयता गारंटी और कुकी नीति।',
        }
    }
}

# Primary canonical slugs for each tool by language
PRIMARY_URLS = {
    '/': {
        'pl': '/',
        'en': '/en',
        'es': '/es',
        'hi': '/hi',
    },
    '/polacz-pdf': {
        'pl': '/polacz-pdf',
        'en': '/en/merge-pdf',
        'es': '/es/unir-pdf',
        'hi': '/hi/merge-pdf',
    },
    '/rozdziel-pdf': {
        'pl': '/rozdziel-pdf',
        'en': '/en/split-pdf',
        'es': '/es/dividir-pdf',
        'hi': '/hi/split-pdf',
    },
    '/wypelnij-formularz-pdf': {
        'pl': '/wypelnij-formularz-pdf',
        'en': '/en/fill-pdf-form',
        'es': '/es/rellenar-formulario-pdf',
        'hi': '/hi/fill-pdf-form',
    },
    '/obroc-pdf': {
        'pl': '/obroc-pdf',
        'en': '/en/rotate-pdf',
        'es': '/es/rotar-pdf',
        'hi': '/hi/rotate-pdf',
    },
    '/usun-strony-z-pdf': {
        'pl': '/usun-strony-z-pdf',
        'en': '/en/delete-pages',
        'es': '/es/eliminar-paginas-pdf',
        'hi': '/hi/delete-pages',
    },
    '/pdf-to-word': {
        'pl': '/pdf-to-word',
        'en': '/en/pdf-to-word',
        'es': '/es/pdf-a-word',
        'hi': '/hi/pdf-to-word',
    },
    '/word-to-pdf': {
        'pl': '/word-to-pdf',
        'en': '/en/word-to-pdf',
        'es': '/es/word-a-pdf',
        'hi': '/hi/word-to-pdf',
    },
    '/pdf-to-excel': {
        'pl': '/pdf-to-excel',
        'en': '/en/pdf-to-excel',
        'es': '/es/pdf-a-excel',
        'hi': '/hi/pdf-to-excel',
    },
    '/excel-to-pdf': {
        'pl': '/excel-to-pdf',
        'en': '/en/excel-to-pdf',
        'es': '/es/excel-a-pdf',
        'hi': '/hi/excel-to-pdf',
    },
    '/polityka-privacy': {
        'pl': '/polityka-privacy',
        'en': '/en/privacy-policy',
        'es': '/es/politica-privacidad',
        'hi': '/hi/privacy-policy',
    },
}

# All URLs/subpaths to pre-render (including native aliases like /pl/polacz-pdf, /en/split-pdf, /es/unir-pdf)
ALL_SLUGS = {
    '/': {
        'pl': ['/', '/pl'],
        'en': ['/en'],
        'es': ['/es'],
        'hi': ['/hi'],
    },
    '/polacz-pdf': {
        'pl': ['/polacz-pdf', '/pl/polacz-pdf'],
        'en': ['/en/merge-pdf', '/en/polacz-pdf'],
        'es': ['/es/unir-pdf', '/es/combinar-pdf', '/es/polacz-pdf'],
        'hi': ['/hi/merge-pdf', '/hi/polacz-pdf'],
    },
    '/rozdziel-pdf': {
        'pl': ['/rozdziel-pdf', '/pl/rozdziel-pdf'],
        'en': ['/en/split-pdf', '/en/rozdziel-pdf'],
        'es': ['/es/dividir-pdf', '/es/separar-pdf', '/es/rozdziel-pdf'],
        'hi': ['/hi/split-pdf', '/hi/rozdziel-pdf'],
    },
    '/wypelnij-formularz-pdf': {
        'pl': ['/wypelnij-formularz-pdf', '/pl/wypelnij-formularz-pdf'],
        'en': ['/en/fill-pdf-form', '/en/wypelnij-formularz-pdf'],
        'es': ['/es/rellenar-formulario-pdf', '/es/llenar-formulario-pdf', '/es/wypelnij-formularz-pdf'],
        'hi': ['/hi/fill-pdf-form', '/hi/wypelnij-formularz-pdf'],
    },
    '/obroc-pdf': {
        'pl': ['/obroc-pdf', '/pl/obroc-pdf'],
        'en': ['/en/rotate-pdf', '/en/obroc-pdf'],
        'es': ['/es/rotar-pdf', '/es/girar-pdf', '/es/obroc-pdf'],
        'hi': ['/hi/rotate-pdf', '/hi/obroc-pdf'],
    },
    '/usun-strony-z-pdf': {
        'pl': ['/usun-strony-z-pdf', '/pl/usun-strony-z-pdf'],
        'en': ['/en/delete-pages', '/en/delete-pdf-pages', '/en/usun-strony-z-pdf'],
        'es': ['/es/eliminar-paginas-pdf', '/es/borrar-paginas-pdf', '/es/usun-strony-z-pdf'],
        'hi': ['/hi/delete-pages', '/hi/usun-strony-z-pdf'],
    },
    '/pdf-to-word': {
        'pl': ['/pdf-to-word', '/pl/pdf-to-word'],
        'en': ['/en/pdf-to-word'],
        'es': ['/es/pdf-a-word', '/es/pdf-to-word'],
        'hi': ['/hi/pdf-to-word'],
    },
    '/word-to-pdf': {
        'pl': ['/word-to-pdf', '/pl/word-to-pdf'],
        'en': ['/en/word-to-pdf'],
        'es': ['/es/word-a-pdf', '/es/word-to-pdf'],
        'hi': ['/hi/word-to-pdf'],
    },
    '/pdf-to-excel': {
        'pl': ['/pdf-to-excel', '/pl/pdf-to-excel'],
        'en': ['/en/pdf-to-excel'],
        'es': ['/es/pdf-a-excel', '/es/pdf-to-excel'],
        'hi': ['/hi/pdf-to-excel'],
    },
    '/excel-to-pdf': {
        'pl': ['/excel-to-pdf', '/pl/excel-to-pdf'],
        'en': ['/en/excel-to-pdf'],
        'es': ['/es/excel-a-pdf', '/es/excel-to-pdf'],
        'hi': ['/hi/excel-to-pdf'],
    },
    '/polityka-privacy': {
        'pl': ['/polityka-privacy', '/pl/polityka-privacy'],
        'en': ['/en/privacy-policy', '/en/polityka-privacy'],
        'es': ['/es/politica-privacidad', '/es/polityka-privacy'],
        'hi': ['/hi/privacy-policy', '/hi/polityka-privacy'],
    },
}

languages = ['pl', 'en', 'es', 'hi']
locale_map = {
    'pl': 'pl_PL',
    'en': 'en_US',
    'es': 'es_ES',
    'hi': 'hi_IN'
}

# Read base index.html
with open(index_path, 'r', encoding='utf-8') as f:
    base_html = f.read()

def generate_custom_html(tool_path, lang, current_slug):
    html = base_html
    # 1. Update lang attribute
    html = re.sub(r'<html\s+lang="[^"]*"', f'<html lang="{lang}"', html)

    # 2. Get tool metadata tailored for this micro-task
    tool_info = TOOLS_METADATA.get(tool_path, TOOLS_METADATA['/'])
    meta = tool_info.get(lang, tool_info['pl'])
    title = meta['title']
    desc = meta['desc']

    # 3. Canonical and localized URL calculation
    primary_slug = PRIMARY_URLS[tool_path][lang]
    canonical_url = f"{site_domain}{primary_slug}" if primary_slug != '/' else f"{site_domain}/"
    current_page_url = f"{site_domain}{current_slug}" if current_slug != '/' else f"{site_domain}/"

    # 4. Replace title
    html = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', html, flags=re.DOTALL)

    # 5. Replace description & og tags
    html = re.sub(r'<meta\s+name="description"\s+content=".*?"\s*/?>', f'<meta name="description" content="{desc}" />', html)
    html = re.sub(r'<meta\s+property="og:title"\s+content=".*?"\s*/?>', f'<meta property="og:title" content="{title}" />', html)
    html = re.sub(r'<meta\s+property="og:description"\s+content=".*?"\s*/?>', f'<meta property="og:description" content="{desc}" />', html)

    # Remove any existing canonical, alternates, or ld+json from previous scripts
    html = re.sub(r'\s*<link\s+rel="canonical"[^>]*>', '', html)
    html = re.sub(r'\s*<link\s+rel="alternate"[^>]*>', '', html)
    html = re.sub(r'\s*<meta\s+property="og:url"[^>]*>', '', html)
    html = re.sub(r'\s*<meta\s+property="og:locale"[^>]*>', '', html)
    html = re.sub(r'\s*<meta\s+name="twitter:title"[^>]*>', '', html)
    html = re.sub(r'\s*<meta\s+name="twitter:description"[^>]*>', '', html)
    html = re.sub(r'\s*<script\s+type="application/ld\+json">.*?</script>', '', html, flags=re.DOTALL)
    
    # 6. Generate JSON-LD structured data for HowTo, FAQPage, WebApplication
    faq_data_by_lang = {
        'pl': [
            {"q": "Czy moje pliki są bezpieczne?", "a": "Tak, w 100% bezpieczne. W nosignpdf.com wdrożyliśmy bezpieczny silnik Client-Side — pliki otwierają się wyłącznie w pamięci RAM przeglądarki. Zero data collection / prywatność gwarantowana: nasz serwer nie widzi ani jednego bajtu."},
            {"q": "Czy nosignpdf.com to darmowy edytor pdf bez logowania i bez znaków wodnych?", "a": "Tak! Jest to w 100% darmowy edytor pdf bez logowania, bez rejestracji i bez znaków wodnych."},
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
            {"q": "क्या मेरी फ़ाइलें सुरक्षित हैं? (Are my files safe?)", "a": "हाँ, 100% पूरी तरह सुरक्षित हैं। nosignpdf.com में क्लाइंट-साइड तकनीक से फाइलें केवल आपके ब्राउज़र की रैम में खुलती हैं। सुरक्षित (zero data collection / गोपनीयता)।"},
            {"q": "क्या nosignpdf.com बिना लॉगिन और बिना वॉटरमार्क के मुफ्त पीडीएफ संपादक है?", "a": "हाँ! यह 100% मुफ्त पीडीएफ संपादक है बिना लॉगिन (bez logowania) और बिना वॉटरमार्क (bez znaków wodnych) के।"},
            {"q": "क्लाउड टूल्स की तुलना में यह कितना तेज़ (szybki) है?", "a": "यह अल्ट्रा-तेज़ है क्योंकि अपलोड या डाउनलोड का इंतज़ार नहीं करना पड़ता। सारा काम डिवाइस से तुरंत होता है।"}
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

    alternates_html = f"""    <link rel="canonical" href="{canonical_url}" />
    <meta property="og:url" content="{current_page_url}" />
    <meta property="og:locale" content="{locale_map.get(lang, 'pl_PL')}" />
    <meta name="twitter:title" content="{title}" />
    <meta name="twitter:description" content="{desc}" />
    <link rel="alternate" hreflang="pl" href="{pl_alt}" />
    <link rel="alternate" hreflang="en" href="{en_alt}" />
    <link rel="alternate" hreflang="es" href="{es_alt}" />
    <link rel="alternate" hreflang="hi" href="{hi_alt}" />
    <link rel="alternate" hreflang="x-default" href="{pl_alt}" />
{jsonld_script}"""

    # Insert before </head>
    html = html.replace('</head>', f'{alternates_html}\n  </head>')

    # 8. If privacy policy page, inject pre-rendered semantic HTML body for Google AdSense crawlers
    if tool_path == '/polityka-privacy':
        privacy_body = get_privacy_html_body(lang)
        html = html.replace('<div id="root"></div>', f'<div id="root">{privacy_body}</div>')

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

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">1. Lokalna Architektura Przetwarzania Dokumentów (Privacy-First)</h2>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li>Wszystkie operacje techniczne (łączenie, rozdzielanie, obracanie, usuwanie stron, wypełnianie formularzy AcroForm oraz konwersje) wykonywane są wyłącznie w silniku Twojej przeglądarki internetowej przy użyciu bibliotek WebAssembly oraz JavaScript (pdf-lib, pdfjs-dist).</li>
        <li>Twoje dokumenty PDF, wprowadzone dane tekstowe, dane wrażliwe (PESEL, NIP, numery kont, dane finansowe) oraz grafiki NIGDY nie są przesyłane na nasz serwer ani serwery pośredniczące.</li>
        <li>Pliki istnieją wyłącznie w pamięci operacyjnej RAM Twojego komputera lub smartfona i są natychmiastowo zwalniane po zakończeniu pracy lub zamknięciu karty przeglądarki.</li>
      </ul>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">2. Monetyzacja, Reklamy Google AdSense i Pliki Cookies</h2>
      <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        W celu sfinansowania kosztów infrastruktury oraz utrzymania bezpłatnego charakteru serwisu bez opłat subskrypcyjnych, nosignpdf.com wyświetla reklamy dostarczane przez zewnętrznych dostawców, w tym sieć Google AdSense.
      </p>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li>Dostawcy zewnętrzni, w tym Google, używają plików cookies (ciasteczek) do wyświetlania reklam na podstawie poprzednich odwiedzin użytkownika w niniejszej witrynie lub w innych witrynach internetowych.</li>
        <li>Pliki cookie do reklam umożliwiają firmie Google i jej partnerom wyświetlanie użytkownikom odpowiednich reklam na podstawie ich wizyt w witrynie nosignpdf.com i/lub innych witrynach w internecie.</li>
      </ul>
      <div class="p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl space-y-1 text-xs">
        <p class="font-semibold text-amber-900 dark:text-amber-200">Prawo do rezygnacji z reklam spersonalizowanych:</p>
        <p class="text-amber-800 dark:text-amber-300">
          Użytkownik może w każdej chwili zrezygnować ze spersonalizowanych reklam w 
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="font-bold underline">Ustawieniach reklam Google (Google Ads Settings)</a> 
          lub odwiedzając stronę 
          <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="font-bold underline">www.aboutads.info</a>.
        </p>
      </div>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">3. Prawa Użytkownika i Przepisy RODO / GDPR</h2>
      <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        Zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO / GDPR), użytkownik ma pełne prawo do prywatności. Ponieważ nosignpdf.com nie przetwarza plików PDF na serwerze, ryzyko wycieku danych z naszej strony wynosi zero.
      </p>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">4. Regulamin Świadczenia Usług (Terms of Service)</h2>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li><strong>Charakter usługi:</strong> Narzędzia nosignpdf.com są udostępniane bezpłatnie w modelu „As Is” i mają charakter techniczny pomocniczy. Nie stanowią doradztwa podatkowego ani prawnego.</li>
        <li><strong>Zrzeczenie się odpowiedzialności:</strong> Użytkownik ponosi wyłączną odpowiedzialność za poprawność danych wpisywanych do formularzy urzędowych (w tym PIT, PCC-3). Twórca nie odpowiada za odrzucenie dokumentów przez instytucje państwowe ani za skutki podatkowe.</li>
      </ul>
    </section>

    <div class="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs text-zinc-400">
      <span>Zaktualizowano na potrzeby weryfikacji Google AdSense: 2026</span>
      <span>Administrator: nosignpdf.com</span>
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

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">1. Arquitectura Local del Lado del Cliente (Privacy-First)</h2>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li>Todas las operaciones técnicas se ejecutan exclusivamente en tu navegador mediante WebAssembly y JavaScript (pdf-lib, pdfjs-dist).</li>
        <li>Tus documentos PDF, datos de texto y datos confidenciales NUNCA se transfieren a nuestro servidor ni a terceros.</li>
        <li>Los archivos se eliminan inmediatamente de la memoria RAM al cerrar la pestaña del navegador.</li>
      </ul>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">2. Publicidad de Google AdSense y Cookies de Terceros</h2>
      <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        Para mantener este servicio 100% gratuito sin costes de suscripción, nosignpdf.com muestra anuncios de proveedores externos, principalmente Google AdSense.
      </p>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li>Los proveedores externos, incluido Google, utilizan cookies para publicar anuncios basados en las visitas anteriores del usuario a este o a otros sitios web.</li>
        <li>El uso de cookies publicitarias permite a Google y a sus socios mostrar anuncios basados en las visitas a nosignpdf.com y/o a otros sitios de Internet.</li>
      </ul>
      <div class="p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl space-y-1 text-xs">
        <p class="font-semibold text-amber-900 dark:text-amber-200">Inhabilitación de publicidad personalizada:</p>
        <p class="text-amber-800 dark:text-amber-300">
          Puedes inhabilitar la publicidad personalizada en 
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="font-bold underline">Configuración de anuncios de Google</a> 
          o en 
          <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="font-bold underline">www.aboutads.info</a>.
        </p>
      </div>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">3. Términos y Condiciones del Servicio (Terms of Service)</h2>
      <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        El servicio se proporciona "tal cual" (As Is). El usuario es el único responsable de la veracidad y legalidad de los datos introducidos en documentos o formularios oficiales.
      </p>
    </section>

    <div class="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs text-zinc-400">
      <span>Actualizado para verificación de Google AdSense: 2026</span>
      <span>Administrador: nosignpdf.com</span>
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
      Google AdSense और GDPR के अनुरूप
    </span>
  </div>
  <article class="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
    <div class="border-b border-zinc-100 dark:border-zinc-800 pb-6">
      <span class="text-xs uppercase tracking-wider font-bold text-zinc-400">nosignpdf.com – सुरक्षा और पारदर्शिता</span>
      <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-zinc-900 dark:text-white">
        गोपनीयता नीति और सेवा की शर्तें (Privacy Policy & Terms)
      </h1>
      <p class="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
        यह दस्तावेज़ nosignpdf.com के डेटा प्रोसेसिंग, Google AdSense विज्ञापन और सेवा शर्तों का विवरण देता है। हमारी प्राथमिकता आपकी पूर्ण गोपनीयता है: यह टूल 100% आपके ब्राउज़र में स्थानीय रूप से काम करता है और कभी किसी रिमोट सर्वर पर पीडीएफ फाइलें या डेटा अपलोड नहीं करता है।
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">100% ब्राउज़र रैम में</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">आपकी फाइलें कभी आपके डिवाइस से बाहर नहीं जातीं। कोई क्लाउड अपलोड नहीं।</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">Google AdSense और कुकीज़</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">कुकीज़ का उपयोग केवल सुरक्षित मुद्रीकरण और विज्ञापन वितरण के लिए किया जाता है।</p>
      </div>
      <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
        <h4 class="text-xs font-bold text-zinc-900 dark:text-white">शून्य डेटाबेस और पंजीकरण</h4>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">कोई खाता नहीं, कोई लॉगिन नहीं और आपकी फाइलों का कोई ट्रैकिंग नहीं।</p>
      </div>
    </div>

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">1. स्थानीय क्लाइंट-साइड सुरक्षा (Privacy-First Architecture)</h2>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li>सभी कार्य (मर्ज, अलग करना, घुमाना, पेज हटाना, फॉर्म भरना) केवल आपके वेब ब्राउज़र में WebAssembly और JavaScript से होते हैं।</li>
        <li>आपकी पीडीएफ फाइलें या संवेदनशील जानकारी कभी हमारे सर्वर पर नहीं भेजी जाती।</li>
        <li>ब्राउज़र टैब बंद करते ही डेटा रैम से तुरंत नष्ट हो जाता है।</li>
      </ul>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">2. Google AdSense विज्ञापन और कुकी नीति</h2>
      <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        वेबसाइट को पूरी तरह मुफ्त और बिना शुल्क चलाने के लिए nosignpdf.com पर Google AdSense द्वारा विज्ञापन प्रदर्शित किए जाते हैं।
      </p>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li>Google सहित तीसरे पक्ष के विक्रेता विज़िट के आधार पर विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करते हैं।</li>
        <li>उपयोगकर्ता <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="font-bold underline">Google Ads Settings</a> या <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="font-bold underline">www.aboutads.info</a> पर जाकर व्यक्तिगत विज्ञापन से बाहर निकल सकते हैं।</li>
      </ul>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">3. सेवा की शर्तें (Terms of Service)</h2>
      <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        यह उपकरण "जैसा है" (As Is) आधार पर प्रदान किया जाता है। फॉर्म में भरी गई जानकारी की शुद्धता के लिए उपयोगकर्ता पूरी तरह जिम्मेदार है।
      </p>
    </section>

    <div class="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs text-zinc-400">
      <span>Google AdSense सत्यापन के लिए अद्यतन: 2026</span>
      <span>प्रशासक: nosignpdf.com</span>
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
        This document outlines the data processing policies, Google AdSense advertising integration, and terms of use for nosignpdf.com. Our highest priority is your privacy: the application operates 100% locally in your browser and never uploads, stores, or processes any PDF files or personal data on remote servers (Privacy-First Architecture).
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

    <section class="space-y-3">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">1. In-Browser Client-Side Processing (Privacy-First Architecture)</h2>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li>All document operations (merging, splitting, rotating, deleting pages, AcroForm filling, and conversions) are performed exclusively within your web browser using WebAssembly and JavaScript (pdf-lib, pdfjs-dist).</li>
        <li>Your PDF documents, form field inputs, sensitive identifiers (tax IDs, financial details, contracts), and images are NEVER uploaded to our server or any third-party cloud.</li>
        <li>Document data exists solely in your device volatile memory (RAM) and is purged immediately upon finishing your work or closing the browser tab.</li>
      </ul>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">2. Monetization, Google AdSense Advertising & Cookies Policy</h2>
      <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        To finance server bandwidth and keep this tool completely free with no paywalls or user sign-ups, nosignpdf.com displays advertisements served by third-party advertising networks, including Google AdSense.
      </p>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li>Third-party vendors, including Google, use cookies to serve ads based on a user prior visits to your website or other websites.</li>
        <li>Google advertising cookies enable it and its partners to serve ads to users based on their visits to nosignpdf.com and/or other sites across the Internet.</li>
      </ul>
      <div class="p-3.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl space-y-1 text-xs">
        <p class="font-semibold text-amber-900 dark:text-amber-200">How to opt out of personalized advertising:</p>
        <p class="text-amber-800 dark:text-amber-300">
          Users may opt out of personalized advertising by visiting 
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="font-bold underline">Google Ads Settings</a> 
          or consumer choice portals such as 
          <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="font-bold underline">www.aboutads.info</a>.
        </p>
      </div>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">3. User Rights & GDPR / CCPA Compliance</h2>
      <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        Under GDPR and global privacy frameworks, you retain full rights regarding your data privacy. Because nosignpdf.com does not collect or transmit document data to servers, your personal documents cannot be leaked, breached, or accessed by third parties.
      </p>
    </section>

    <section class="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <h2 class="text-lg font-bold text-zinc-900 dark:text-white">4. Terms of Service</h2>
      <ul class="space-y-2 pl-6 list-disc text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <li><strong>Free Service "As Is":</strong> nosignpdf.com is provided free of charge on an "As Is" and "As Available" basis without warranties of any kind. The application is a technical utility and does not constitute official legal, accounting, or tax advice.</li>
        <li><strong>Limitation of Liability:</strong> The user assumes sole responsibility for data entered into PDF forms. The operator of nosignpdf.com disclaims liability for form rejection by government offices or institutions.</li>
      </ul>
    </section>

    <div class="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs text-zinc-400">
      <span>Updated for Google AdSense verification: 2026</span>
      <span>Website Administrator: nosignpdf.com</span>
    </div>
  </article>
</div>
"""


print("Pre-rendering static subpages for multi-language SEO (micro-task titles & descriptions)...")
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
print("Generating comprehensive sitemap.xml with multi-language alternates...")
sitemap_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">'
]

for tool_path in PRIMARY_URLS.keys():
    priority = '1.0' if tool_path == '/' else ('0.9' if tool_path == '/wypelnij-formularz-pdf' else ('0.3' if tool_path == '/polityka-privacy' else '0.8'))

    pl_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['pl']}" if PRIMARY_URLS[tool_path]['pl'] != '/' else f"{site_domain}/"
    en_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['en']}"
    es_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['es']}"
    hi_alt = f"{site_domain}{PRIMARY_URLS[tool_path]['hi']}"

    for lang in languages:
        primary_slug = PRIMARY_URLS[tool_path][lang]
        loc = f"{site_domain}{primary_slug}" if primary_slug != '/' else f"{site_domain}/"

        sitemap_lines.append('  <url>')
        sitemap_lines.append(f'    <loc>{loc}</loc>')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="pl" href="{pl_alt}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="en" href="{en_alt}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="es" href="{es_alt}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="hi" href="{hi_alt}" />')
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
print("Cloudflare Pages multi-language deployment package is 100% ready:")
print("  - Static HTML pre-rendered for all languages (pl, en, es, hi)")
print("  - Full hreflang alternates and canonical tags for Googlebot")
print("  - sitemap.xml with 48 URLs (4 languages x 12 pages)")
print("  - Native 200.html SPA routing fallback (no _redirects loops)")
print("  - favicon.ico, robots.txt, and ads.txt at root")
