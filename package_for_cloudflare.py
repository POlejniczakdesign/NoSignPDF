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

# Ensure dist/_redirects exists and specifies SPA routing with static files pass-through
redirects_content = """# Cloudflare Pages Static Files Pass-through
/sitemap.xml    /sitemap.xml    200
/robots.txt     /robots.txt     200
/favicon.ico    /favicon.ico    200
/ads.txt        /ads.txt        200

# Cloudflare Pages SPA Routing (Multi-language SEO subpaths: /en/*, /es/*, /hi/*, /*)
/*              /index.html     200
"""
redirects_dist_path = os.path.join(dist_dir, '_redirects')
with open(redirects_dist_path, 'w', encoding='utf-8') as f:
    f.write(redirects_content)
print(f"Updated {redirects_dist_path}")

# Overwrite dist/wrangler.json with compliant schema for Cloudflare
dist_wrangler_path = os.path.join(dist_dir, 'wrangler.json')
final_wrangler_schema = {
    "name": "nosignpdf",
    "compatibility_date": "2026-09-15",
    "assets": {
        "directory": ".",
        "not_found_handling": "single-page-application"
    }
}
with open(dist_wrangler_path, 'w', encoding='utf-8') as f:
    json.dump(final_wrangler_schema, f, indent=2)
    f.write('\n')

# Ensure 200.html exists in dist as Cloudflare Pages native SPA fallback
index_path = os.path.join(dist_dir, 'index.html')
spa_fallback_path = os.path.join(dist_dir, '200.html')
if os.path.exists(index_path):
    shutil.copyfile(index_path, spa_fallback_path)

# Tools and localized metadata definitions for SEO pre-rendering
TOOLS_METADATA = {
    '/': {
        'pl': {
            'title': 'PDF Studio Online – Darmowe i Bezpieczne Narzędzia PDF w Przeglądarce',
            'desc': 'Zaawansowany kombajn PDF działający w 100% lokalnie w Twojej przeglądarce. Edytuj, łącz, dziel, obracaj i wypełniaj pliki PDF bez rejestracji i bez wysyłania plików na serwer.'
        },
        'en': {
            'title': 'Free Online PDF Tools – 100% Private & In-Browser – PDF Studio',
            'desc': 'Advanced PDF suite running 100% locally in your browser. Edit, merge, split, rotate, and fill PDF files without registration and without uploading data to servers.'
        },
        'es': {
            'title': 'Herramientas PDF Gratis Online – 100% Privado en Navegador – PDF Studio',
            'desc': 'Potente suite de herramientas PDF que funciona 100% localmente en tu navegador. Edita, une, divide, gira y rellena archivos PDF sin registro y sin subir archivos.'
        },
        'hi': {
            'title': 'मुफ्त ऑनलाइन पीडीएफ टूल्स – 100% निजी व सुरक्षित – PDF Studio',
            'desc': 'आपके ब्राउज़र में 100% स्थानीय रूप से चलने वाला उन्नत पीडीएफ सुइट। बिना पंजीकरण और बिना फाइल अपलोड किए पीडीएफ संपादित करें, जोड़ें व अलग करें।'
        }
    },
    '/wypelnij-formularz-pdf': {
        'pl': {
            'title': 'Wypełniacz Formularzy PDF Online – Bezpiecznie i Bez Drukowania',
            'desc': 'Uzupełniaj wnioski urzędowe, pisma i deklaracje z natywnymi polami AcroForm bezpośrednio w przeglądarce bez wysyłania plików do internetu.'
        },
        'en': {
            'title': 'Fill PDF Forms Online – Free & Client-Side – PDF Studio',
            'desc': 'Complete official applications and forms with native AcroForm fields. Click on input boxes or lines to type directly into PDF documents.'
        },
        'es': {
            'title': 'Rellenar Formularios PDF Online – Gratis y Privado – PDF Studio',
            'desc': 'Completa formularios y solicitudes oficiales directamente en tu navegador con soporte nativo para campos AcroForm sin subir tus datos.'
        },
        'hi': {
            'title': 'पीडीएफ फॉर्म भरें ऑनलाइन – मुफ्त व सुरक्षित – PDF Studio',
            'desc': 'आधिकारिक आवेदन और फॉर्म सीधे अपने ब्राउज़र में भरें। किसी भी सर्वर पर फाइल भेजे बिना सुरक्षित रूप से फॉर्म पूरा करें।'
        }
    },
    '/usun-strony-z-pdf': {
        'pl': {
            'title': 'Usuwanie Stron z PDF – Wytnij Zbędne Strony Online – PDF Studio',
            'desc': 'Przejrzyj miniatury stron, jednym kliknięciem usuń wybrane arkusze i pobierz odchudzony plik PDF w 100% w przeglądarce.'
        },
        'en': {
            'title': 'Delete Pages from PDF Online – Free & Instant – PDF Studio',
            'desc': 'Preview high-resolution thumbnails, delete unwanted pages with one click, and download a clean PDF file locally.'
        },
        'es': {
            'title': 'Eliminar Páginas de PDF Online – Rápido y Gratis – PDF Studio',
            'desc': 'Elimina rápidamente hojas no deseadas o páginas en blanco de tu documento PDF de forma 100% privada.'
        },
        'hi': {
            'title': 'पीडीएफ से पेज हटाएं – मुफ्त ऑनलाइन टूल – PDF Studio',
            'desc': 'अपने दस्तावेज से अवांछित पेज या खाली पन्नों को तुरंत हटाएं और नया पीडीएफ डाउनलोड करें।'
        }
    },
    '/obroc-pdf': {
        'pl': {
            'title': 'Obracanie PDF Online – Obróć Strony o 90, 180, 270 Stopni',
            'desc': 'Napraw krzywo zeskanowane strony dokumentu. Obracaj arkusze za pomocą jednego kliknięcia trwale w pamięci RAM przeglądarki.'
        },
        'en': {
            'title': 'Rotate PDF Online – Turn Pages 90, 180, 270 Degrees – PDF Studio',
            'desc': 'Rotate single pages or the entire PDF document by 90, 180, or 270 degrees. Fix upside-down scans permanently with one click.'
        },
        'es': {
            'title': 'Rotar PDF Online – Gira Páginas 90, 180, 270 Grados – PDF Studio',
            'desc': 'Gira páginas individuales o todo el documento a 90, 180 y 270 grados. Arregla escaneos torcidos de inmediato.'
        },
        'hi': {
            'title': 'पीडीएफ पेज घुमाएं – 90, 180, 270 डिग्री ऑनलाइन – PDF Studio',
            'desc': 'दस्तावेज के पेजों को 90, 180 या 270 डिग्री पर घुमाएं। उल्टे स्कैन किए गए पन्नों को एक क्लिक में ठीक करें।'
        }
    },
    '/polacz-pdf': {
        'pl': {
            'title': 'Łączenie Plików PDF Online – Scal Wiele Dokumentów w Jeden',
            'desc': 'Wgraj pliki PDF, uporządkuj ich kolejność metodą przeciągnij i upuść i pobierz scalony dokument bez limitu stron i bez wysyłania do sieci.'
        },
        'en': {
            'title': 'Merge PDF Files Online – Combine PDFs into One – PDF Studio',
            'desc': 'Upload multiple PDFs, reorder pages with drag and drop, and download your unified document 100% locally.'
        },
        'es': {
            'title': 'Unir Archivos PDF Online – Combinar Varios PDF – PDF Studio',
            'desc': 'Combina múltiples documentos PDF en un solo archivo con el orden que desees. Rápido, gratis y sin límites.'
        },
        'hi': {
            'title': 'पीडीएफ फाइलें जोड़ें ऑनलाइन – कई पीडीएफ एक में – PDF Studio',
            'desc': 'कई पीडीएफ फाइलों को एक संगठित दस्तावेज में मिलाएं। ड्रैग एंड ड्रॉप से क्रम व्यवस्थित करें और डाउनलोड करें।'
        }
    },
    '/rozdziel-pdf': {
        'pl': {
            'title': 'Rozdzielanie PDF Online – Wyodrębnij i Podziel Strony – PDF Studio',
            'desc': 'Wybierz interesujące Cię strony, określ zakres lub usuń pozostałe arkusze i zapisz nowy plik PDF.'
        },
        'en': {
            'title': 'Split PDF Online – Extract Pages from PDF – PDF Studio',
            'desc': 'Extract specific page ranges or break large files into smaller parts. Define custom page ranges and download immediately.'
        },
        'es': {
            'title': 'Dividir PDF Online – Extraer Páginas de PDF – PDF Studio',
            'desc': 'Extrae rangos específicos de páginas o divide un archivo grande en partes de forma fácil y segura.'
        },
        'hi': {
            'title': 'पीडीएफ अलग करें – पेज निकालें व विभाजित करें – PDF Studio',
            'desc': 'पेज निकालें या बड़ी फाइलों को छोटे हिस्सों में विभाजित करें। अपनी पसंद के पेज चुनकर नया दस्तावेज बनाएं।'
        }
    },
    '/pdf-to-word': {
        'pl': {
            'title': 'Konwertuj PDF do Word Online (.docx) – Bezpiecznie w Przeglądarce',
            'desc': 'Lokalna ekstrakcja tekstu i natychmiastowa konwersja PDF do formatu Word (.docx / .txt) bez wysyłania plików na serwer.'
        },
        'en': {
            'title': 'Convert PDF to Word Online (.docx) – 100% In-Browser – PDF Studio',
            'desc': 'Extract text and convert PDF documents into editable Word (.docx) or plain text format directly in your browser.'
        },
        'es': {
            'title': 'Convertir PDF a Word Online (.docx) – Privado y Gratis – PDF Studio',
            'desc': 'Extracción local de texto y conversión de PDF a documento Word (.docx / .txt) directamente en tu navegador.'
        },
        'hi': {
            'title': 'पीडीएफ से वर्ड (.docx) बदलें ऑनलाइन – मुफ्त व स्थानीय – PDF Studio',
            'desc': 'ब्राउज़र में स्थानीय रूप से पीडीएफ से टेक्स्ट निकालें और संपादन योग्य वर्ड दस्तावेज (.docx) में बदलें।'
        }
    },
    '/word-to-pdf': {
        'pl': {
            'title': 'Konwertuj Word do PDF Online – Wklej Tekst i Generuj PDF',
            'desc': 'Wbudowany edytor tekstu i generator dokumentów PDF z czcionką Roboto Mono. Sformatuj tekst i pobierz gotowy plik PDF.'
        },
        'en': {
            'title': 'Convert Word to PDF Online – Text to PDF Generator – PDF Studio',
            'desc': 'Built-in text editor and PDF generator with clean formatting and fonts. Paste your text or upload a document to generate a PDF.'
        },
        'es': {
            'title': 'Convertir Word a PDF Online – Generador de PDF – PDF Studio',
            'desc': 'Editor de texto integrado y generador de documentos PDF limpios. Pega tu contenido y obtén un PDF profesional.'
        },
        'hi': {
            'title': 'वर्ड से पीडीएफ बनाएं – टेक्स्ट से पीडीएफ कनवर्टर – PDF Studio',
            'desc': 'टेक्स्ट पेस्ट करें और साफ-सुथरा पीडीएफ दस्तावेज तैयार करें। स्थानीय रूप से नया पीडीएफ तुरंत जनरेट करें।'
        }
    },
    '/pdf-to-excel': {
        'pl': {
            'title': 'Konwertuj PDF do Excel Online – Ekstrakcja Tabel i Danych CSV',
            'desc': 'Wyciągaj tabele i dane liczbowe z plików PDF do pliku CSV zoptymalizowanego pod program Microsoft Excel.'
        },
        'en': {
            'title': 'Convert PDF to Excel Online – Extract Tables to CSV – PDF Studio',
            'desc': 'Extract tables and structured numerical data from PDF files directly into Excel-ready CSV sheets.'
        },
        'es': {
            'title': 'Convertir PDF a Excel Online – Extraer Tablas a CSV – PDF Studio',
            'desc': 'Extrae tablas y datos estructurados de archivos PDF y expórtalos a hojas de cálculo CSV / Excel.'
        },
        'hi': {
            'title': 'पीडीएफ से एक्सेल बदलें ऑनलाइन – टेबल सीएसवी में निकालें – PDF Studio',
            'desc': 'पीडीएफ से टेबल व डेटा निकालें और एक्सेल के अनुकूल सीएसवी स्प्रेडशीट में डाउनलोड करें।'
        }
    },
    '/excel-to-pdf': {
        'pl': {
            'title': 'Konwertuj Excel do PDF Online – Tabela do Raportu PDF',
            'desc': 'Wklej wiersze i kolumny z programu Excel lub Arkuszy Google i utwórz czytelny, wyjustowany dokument PDF.'
        },
        'en': {
            'title': 'Convert Excel to PDF Online – Table to PDF Report – PDF Studio',
            'desc': 'Paste table rows and columns from Excel or Google Sheets to generate a clean, formatted PDF table report.'
        },
        'es': {
            'title': 'Convertir Excel a PDF Online – Tablas a Documento PDF – PDF Studio',
            'desc': 'Pega filas y columnas de Excel o Google Sheets y crea un informe PDF claro y ordenado.'
        },
        'hi': {
            'title': 'एक्सेल से पीडीएफ बदलें – टेबल से पीडीएफ रिपोर्ट – PDF Studio',
            'desc': 'एक्सेल या गूगल शीट्स से डेटा पेस्ट करें और व्यवस्थित टेबल वाला पीडीएफ दस्तावेज तैयार करें।'
        }
    },
    '/polityka-privacy': {
        'pl': {
            'title': 'Regulamin i Polityka Prywatności – PDF Studio Online',
            'desc': 'Zasady korzystania, zrzeczenie się odpowiedzialności oraz polityka prywatności i plików cookies aplikacji PDF Studio Online.'
        },
        'en': {
            'title': 'Terms & Privacy Policy – PDF Studio Online',
            'desc': 'Terms of Service, Disclaimer, and Privacy & Cookie Policy for PDF Studio Online. 100% Client-Side zero upload privacy.'
        },
        'es': {
            'title': 'Términos y Política de Privacidad – PDF Studio Online',
            'desc': 'Términos de servicio, descargo de responsabilidad y política de privacidad y cookies de PDF Studio Online.'
        },
        'hi': {
            'title': 'नियम व गोपनीयता नीति – PDF Studio Online',
            'desc': 'उपयोग के नियम, अस्वीकरण और गोपनीयता व कुकी नीति। 100% क्लाइंट-साइड सुरक्षा।'
        }
    }
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

def generate_custom_html(tool_path, lang):
    html = base_html
    # 1. Update lang attribute
    html = re.sub(r'<html\s+lang="[^"]*"', f'<html lang="{lang}"', html)

    # 2. Get tool metadata
    tool_info = TOOLS_METADATA.get(tool_path, TOOLS_METADATA['/'])
    meta = tool_info.get(lang, tool_info['pl'])
    title = meta['title']
    desc = meta['desc']

    # 3. Canonical and localized URL
    if lang == 'pl':
        localized_subpath = '' if tool_path == '/' else tool_path
    else:
        localized_subpath = f"/{lang}" if tool_path == '/' else f"/{lang}{tool_path}"
    canonical_url = f"{site_domain}{localized_subpath}" if localized_subpath else f"{site_domain}/"

    # 4. Replace title
    html = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', html, flags=re.DOTALL)

    # 5. Replace description & og tags
    html = re.sub(r'<meta\s+name="description"\s+content=".*?"\s*/?>', f'<meta name="description" content="{desc}" />', html)
    html = re.sub(r'<meta\s+property="og:title"\s+content=".*?"\s*/?>', f'<meta property="og:title" content="{title}" />', html)
    html = re.sub(r'<meta\s+property="og:description"\s+content=".*?"\s*/?>', f'<meta property="og:description" content="{desc}" />', html)

    # 6. Build alternate hreflang and canonical tags
    clean_tool = '' if tool_path == '/' else tool_path
    alternates_html = f"""    <link rel="canonical" href="{canonical_url}" />
    <meta property="og:url" content="{canonical_url}" />
    <meta property="og:locale" content="{locale_map.get(lang, 'pl_PL')}" />
    <link rel="alternate" hreflang="pl" href="{site_domain}{clean_tool or '/'}" />
    <link rel="alternate" hreflang="en" href="{site_domain}/en{clean_tool}" />
    <link rel="alternate" hreflang="es" href="{site_domain}/es{clean_tool}" />
    <link rel="alternate" hreflang="hi" href="{site_domain}/hi{clean_tool}" />
    <link rel="alternate" hreflang="x-default" href="{site_domain}{clean_tool or '/'}" />"""

    # Insert before </head>
    html = html.replace('</head>', f'{alternates_html}\n  </head>')
    return html

print("Pre-rendering static subpages for multi-language SEO...")
generated_count = 0

for tool_path in TOOLS_METADATA.keys():
    for lang in languages:
        # Determine target directory inside dist
        if lang == 'pl':
            if tool_path == '/':
                target_dir = dist_dir
            else:
                target_dir = os.path.join(dist_dir, tool_path.lstrip('/'))
        else:
            if tool_path == '/':
                target_dir = os.path.join(dist_dir, lang)
            else:
                target_dir = os.path.join(dist_dir, lang, tool_path.lstrip('/'))

        os.makedirs(target_dir, exist_ok=True)
        file_path = os.path.join(target_dir, 'index.html')
        
        # Don't overwrite the original dist/index.html unless it's root
        custom_html = generate_custom_html(tool_path, lang)
        if target_dir == dist_dir:
            # For root dist/index.html, ensure canonical & hreflang tags are present
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(custom_html)
        else:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(custom_html)
        generated_count += 1

print(f"Successfully pre-rendered {generated_count} static HTML index files for Googlebot & SEO.")

# Generate comprehensive multi-language sitemap.xml
print("Generating comprehensive sitemap.xml with multi-language alternates...")
sitemap_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">'
]

for tool_path, lang_dict in TOOLS_METADATA.items():
    clean_tool = '' if tool_path == '/' else tool_path
    priority = '1.0' if tool_path == '/' else ('0.9' if tool_path == '/wypelnij-formularz-pdf' else ('0.3' if tool_path == '/polityka-privacy' else '0.8'))

    for lang in languages:
        if lang == 'pl':
            loc = f"{site_domain}{clean_tool or '/'}"
        else:
            loc = f"{site_domain}/{lang}{clean_tool}"

        sitemap_lines.append('  <url>')
        sitemap_lines.append(f'    <loc>{loc}</loc>')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="pl" href="{site_domain}{clean_tool or "/"}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="en" href="{site_domain}/en{clean_tool}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="es" href="{site_domain}/es{clean_tool}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="hi" href="{site_domain}/hi{clean_tool}" />')
        sitemap_lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{site_domain}{clean_tool or "/"}" />')
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

# Copy robots.txt and favicon.ico if present
if os.path.exists(os.path.join('public', 'robots.txt')):
    shutil.copyfile(os.path.join('public', 'robots.txt'), os.path.join(dist_dir, 'robots.txt'))
if os.path.exists(os.path.join('public', 'favicon.ico')):
    shutil.copyfile(os.path.join('public', 'favicon.ico'), os.path.join(dist_dir, 'favicon.ico'))
if os.path.exists(os.path.join('public', 'ads.txt')):
    shutil.copyfile(os.path.join('public', 'ads.txt'), os.path.join(dist_dir, 'ads.txt'))
if os.path.exists(os.path.join('public', '_headers')):
    shutil.copyfile(os.path.join('public', '_headers'), os.path.join(dist_dir, '_headers'))

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
print("  - _redirects and 200.html SPA routing fallback")
print("  - favicon.ico, robots.txt, and ads.txt at root")
