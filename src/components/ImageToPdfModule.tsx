import React, { useState, useRef, useEffect } from 'react';
import {
  Images,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Download,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  FileText,
  Maximize2,
  ArrowUpDown,
  Layers,
  Settings,
} from 'lucide-react';
import { PDFDocument, PageSizes, PDFImage } from 'pdf-lib';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { useProcessing } from '../context/ProcessingContext';
import { downloadPdfBlob } from '../lib/pdfOperations';

export interface ImageItem {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  width: number;
  height: number;
  format: 'jpg' | 'png' | 'webp' | 'other';
  rawBytes: Uint8Array;
}

interface ImageToPdfModuleProps {
  initialFile?: { name: string; bytes: Uint8Array; size: number } | null;
  onTriggerDownload?: (bytes: Uint8Array, fileName: string) => void;
  onProcessingFinished?: () => void;
}

interface GeneratedResult {
  bytes: Uint8Array;
  fileName: string;
  size: number;
  pageCount: number;
}

interface ModuleStrings {
  title: string;
  tagline: string;
  privacyBadge: string;
  dropTitle: string;
  dropSubtitle: string;
  browseFiles: string;
  loadSample: string;
  addMore: string;
  clearAll: string;
  reverseOrder: string;
  photosCount: (count: number) => string;
  totalSizeLabel: string;
  deletePhoto: string;
  moveLeft: string;
  moveRight: string;
  pageSettings: string;
  pageSizeLabel: string;
  pageSizes: {
    a4: string;
    letter: string;
    fit: string;
  };
  orientationLabel: string;
  orientations: {
    auto: string;
    portrait: string;
    landscape: string;
  };
  marginLabel: string;
  margins: {
    none: string;
    small: string;
    large: string;
  };
  convertBtn: (count: number) => string;
  converting: string;
  processingTitle: string;
  stage1: string;
  stage2: string;
  stage3: string;
  stage4: string;
  stage5: string;
  readyTitle: string;
  readySubtitle: string;
  downloadBtn: string;
  downloadAgain: string;
  editOrder: string;
  newBatch: string;
  pagesCount: string;
  fileSize: string;
  formatLabel: string;
}

const MODULE_TRANSLATIONS: Record<Language, ModuleStrings> = {
  pl: {
    title: 'Konwertuj Grafikę do PDF Online',
    tagline: 'Przekształć zdjęcia JPG, PNG i WebP w jeden spójny dokument PDF w 100% lokalnie w pamięci RAM bez limitów.',
    privacyBadge: '100% Bezpieczeństwo RAM: Twoje zdjęcia nie są wysyłane na żaden serwer',
    dropTitle: 'Wybierz lub upuść zdjęcia (JPG, PNG, WebP)',
    dropSubtitle: 'Możesz dodać wiele grafik jednocześnie, zmieniać kolejność i skalować do formatu A4',
    browseFiles: 'Wybierz zdjęcia z dysku',
    loadSample: 'Załaduj przykładowe grafiki',
    addMore: 'Dodaj więcej zdjęć',
    clearAll: 'Wyczyść listę',
    reverseOrder: 'Odwróć kolejność',
    photosCount: (n) => `Liczba zdjęć: ${n}`,
    totalSizeLabel: 'Łączny rozmiar:',
    deletePhoto: 'Usuń zdjęcie',
    moveLeft: 'Przesuń wcześniej',
    moveRight: 'Przesuń dalej',
    pageSettings: 'Ustawienia arkusza PDF',
    pageSizeLabel: 'Format arkusza:',
    pageSizes: {
      a4: 'Standard A4 (595 × 842 pt)',
      letter: 'US Letter (612 × 792 pt)',
      fit: 'Dopasuj do grafiki (Oryginał)',
    },
    orientationLabel: 'Orientacja strony:',
    orientations: {
      auto: 'Automatyczna (Wykryj z grafiki)',
      portrait: 'Pionowa (Portrait)',
      landscape: 'Pozioma (Landscape)',
    },
    marginLabel: 'Marginesy strony:',
    margins: {
      none: 'Bez marginesów (0 mm - Pełny kadr)',
      small: 'Wąskie marginesy (10 mm - Ramka)',
      large: 'Szerokie marginesy (20 mm - Album)',
    },
    convertBtn: (n) => `Generuj plik PDF (${n} ${n === 1 ? 'strona' : n < 5 ? 'strony' : 'stron'})`,
    converting: 'Generowanie pliku PDF w pamięci RAM...',
    processingTitle: 'Konwersja zdjęć do formatu PDF',
    stage1: 'Optymalizacja kompresji obrazów w pamięci RAM...',
    stage2: 'Skalowanie arkuszy do standardowego formatu A4...',
    stage3: 'Kompilacja wielostronicowego dokumentu PDF...',
    stage4: 'Zabezpieczanie warstwy prywatności dokumentu...',
    stage5: 'Gotowe! Twój plik PDF został pomyślnie wygenerowany.',
    readyTitle: 'Twój dokument PDF jest gotowy do pobrania!',
    readySubtitle: 'Wszystkie zdjęcia zostały połączone i sformatowane w 100% lokalnie w przeglądarce.',
    downloadBtn: 'Pobierz wygenerowany plik PDF',
    downloadAgain: 'Pobierz ponownie',
    editOrder: 'Zmień kolejność i opcje',
    newBatch: 'Konwertuj nowe zdjęcia',
    pagesCount: 'Liczba stron w PDF:',
    fileSize: 'Rozmiar pliku:',
    formatLabel: 'Format arkusza:',
  },
  en: {
    title: 'Convert Images to PDF Online',
    tagline: 'Convert JPG, PNG, and WebP photos into a single professional PDF document 100% locally in browser RAM.',
    privacyBadge: '100% RAM Privacy: Photos stay in device memory with zero server uploads',
    dropTitle: 'Select or drop images (JPG, PNG, WebP)',
    dropSubtitle: 'Add multiple photos at once, reorder pages, and auto-scale to standard A4 format',
    browseFiles: 'Browse photos from device',
    loadSample: 'Load demo photos',
    addMore: 'Add more photos',
    clearAll: 'Clear all',
    reverseOrder: 'Reverse order',
    photosCount: (n) => `Photos selected: ${n}`,
    totalSizeLabel: 'Total size:',
    deletePhoto: 'Delete photo',
    moveLeft: 'Move earlier',
    moveRight: 'Move later',
    pageSettings: 'PDF Page Settings',
    pageSizeLabel: 'Page size:',
    pageSizes: {
      a4: 'Standard A4 (595 × 842 pt)',
      letter: 'US Letter (612 × 792 pt)',
      fit: 'Fit to image (Original)',
    },
    orientationLabel: 'Orientation:',
    orientations: {
      auto: 'Automatic (Match photo aspect)',
      portrait: 'Portrait',
      landscape: 'Landscape',
    },
    marginLabel: 'Page margins:',
    margins: {
      none: 'No margins (0 mm - Full bleed)',
      small: 'Small margins (10 mm - Border)',
      large: 'Wide margins (20 mm - Album)',
    },
    convertBtn: (n) => `Generate PDF Document (${n} ${n === 1 ? 'page' : 'pages'})`,
    converting: 'Compiling PDF document in RAM...',
    processingTitle: 'Converting Images to PDF',
    stage1: 'Optimizing image compression in browser RAM...',
    stage2: 'Scaling sheets to standard A4 format...',
    stage3: 'Compiling multi-page PDF document...',
    stage4: 'Securing document privacy layer...',
    stage5: 'Done! Your PDF document is ready for download.',
    readyTitle: 'Your PDF Document is Ready!',
    readySubtitle: 'All images were assembled and formatted 100% client-side in RAM.',
    downloadBtn: 'Download Generated PDF',
    downloadAgain: 'Download again',
    editOrder: 'Edit photos & order',
    newBatch: 'Convert new photos',
    pagesCount: 'Total pages:',
    fileSize: 'File size:',
    formatLabel: 'Page format:',
  },
  es: {
    title: 'Convertir Imágenes a PDF Online',
    tagline: 'Transforma fotos JPG, PNG y WebP en un único documento PDF 100% localmente en la memoria RAM.',
    privacyBadge: 'Privacidad 100% en RAM: Las fotos se procesan en tu dispositivo sin subir al servidor',
    dropTitle: 'Arrastra imágenes aquí o pulsa para elegir (JPG, PNG, WebP)',
    dropSubtitle: 'Añade múltiples fotos, reorganiza su orden y escala a formato estándar A4',
    browseFiles: 'Seleccionar fotos',
    loadSample: 'Cargar fotos de muestra',
    addMore: 'Añadir más fotos',
    clearAll: 'Limpiar lista',
    reverseOrder: 'Invertir orden',
    photosCount: (n) => `Fotos seleccionadas: ${n}`,
    totalSizeLabel: 'Tamaño total:',
    deletePhoto: 'Eliminar foto',
    moveLeft: 'Mover a la izquierda',
    moveRight: 'Mover a la derecha',
    pageSettings: 'Ajustes del documento PDF',
    pageSizeLabel: 'Tamaño de hoja:',
    pageSizes: {
      a4: 'Estándar A4 (595 × 842 pt)',
      letter: 'US Letter (612 × 792 pt)',
      fit: 'Ajustar a imagen (Original)',
    },
    orientationLabel: 'Orientación:',
    orientations: {
      auto: 'Automática (Según proporción)',
      portrait: 'Vertical (Portrait)',
      landscape: 'Horizontal (Landscape)',
    },
    marginLabel: 'Márgenes de página:',
    margins: {
      none: 'Sin márgenes (0 mm - Sangrado)',
      small: 'Márgenes estrechos (10 mm)',
      large: 'Márgenes anchos (20 mm)',
    },
    convertBtn: (n) => `Generar documento PDF (${n} ${n === 1 ? 'página' : 'páginas'})`,
    converting: 'Generando PDF en la memoria RAM...',
    processingTitle: 'Conversión de imágenes a PDF',
    stage1: 'Optimizando la compresión de imágenes en RAM...',
    stage2: 'Escalando páginas a formato A4 estándar...',
    stage3: 'Compilando documento PDF multipágina...',
    stage4: 'Asegurando la capa de privacidad en memoria local...',
    stage5: '¡Listo! Tu documento PDF está listo para descargar.',
    readyTitle: '¡Tu archivo PDF está listo para descargar!',
    readySubtitle: 'Todas las imágenes se combinaron y ajustaron localmente en la memoria RAM.',
    downloadBtn: 'Descargar archivo PDF generado',
    downloadAgain: 'Descargar nuevamente',
    editOrder: 'Modificar orden y fotos',
    newBatch: 'Convertir nuevas fotos',
    pagesCount: 'Total de páginas:',
    fileSize: 'Tamaño del archivo:',
    formatLabel: 'Formato de página:',
  },
  hi: {
    title: 'इमेज को पीडीएफ में बदलें ऑनलाइन',
    tagline: 'JPG, PNG और WebP तस्वीरों को 100% स्थानीय रूप से ब्राउज़र रैम में एक पीडीएफ में बदलें।',
    privacyBadge: '100% रैम सुरक्षा: आपकी तस्वीरें कभी किसी सर्वर पर नहीं भेजी जाती हैं',
    dropTitle: 'यहाँ तस्वीरें छोड़ें या चुनें (JPG, PNG, WebP)',
    dropSubtitle: 'एक साथ कई तस्वीरें जोड़ें, क्रम बदलें और A4 में स्वचालित आकार दें',
    browseFiles: 'तस्वीरें चुनें',
    loadSample: 'नमूना तस्वीरें लोड करें',
    addMore: 'और तस्वीरें जोड़ें',
    clearAll: 'सब हटाएं',
    reverseOrder: 'उल्टा क्रम',
    photosCount: (n) => `चुनी गई तस्वीरें: ${n}`,
    totalSizeLabel: 'कुल आकार:',
    deletePhoto: 'तस्वीर हटाएं',
    moveLeft: 'बाएं खिसकाएं',
    moveRight: 'दाएं खिसकाएं',
    pageSettings: 'पीडीएफ पेज सेटिंग्स',
    pageSizeLabel: 'पेज आकार:',
    pageSizes: {
      a4: 'मानक A4 (595 × 842 pt)',
      letter: 'US Letter (612 × 792 pt)',
      fit: 'तस्वीर अनुसार (मूल)',
    },
    orientationLabel: 'पेज दिशा:',
    orientations: {
      auto: 'स्वचालित (फोटो अनुसार)',
      portrait: 'खड़ा (Portrait)',
      landscape: 'आड़ा (Landscape)',
    },
    marginLabel: 'मार्जिन:',
    margins: {
      none: 'बिना मार्जिन (0 mm)',
      small: 'छोटा मार्जिन (10 mm)',
      large: 'बड़ा मार्जिन (20 mm)',
    },
    convertBtn: (n) => `पीडीएफ दस्तावेज़ बनाएं (${n} पेज)`,
    converting: 'रैम में पीडीएफ दस्तावेज़ बन रहा है...',
    processingTitle: 'इमेज से पीडीएफ रूपांतरण',
    stage1: 'ब्राउज़र रैम में इमेज संपीड़न अनुकूलित किया जा रहा है...',
    stage2: 'A4 मानक प्रारूप में शीटों का आकार बदला जा रहा है...',
    stage3: 'मल्टी-पेज पीडीएफ दस्तावेज़ संकलित किया जा रहा है...',
    stage4: 'क्लाइंट रैम में दस्तावेज़ गोपनीयता परत सुरक्षित की जा रही है...',
    stage5: 'तैयार! आपका पीडीएफ दस्तावेज़ डाउनलोड के लिए तैयार है।',
    readyTitle: 'आपका पीडीएफ तैयार है!',
    readySubtitle: 'सभी तस्वीरें 100% स्थानीय रूप से डिवाइस रैम में संकलित की गईं।',
    downloadBtn: 'तैयार पीडीएफ डाउनलोड करें',
    downloadAgain: 'फिर से डाउनलोड करें',
    editOrder: 'क्रम और तस्वीरें बदलें',
    newBatch: 'नई तस्वीरें बदलें',
    pagesCount: 'कुल पेज:',
    fileSize: 'फ़ाइल आकार:',
    formatLabel: 'पेज प्रारूप:',
  },
  pt: {
    title: 'Converter Imagens em PDF Online',
    tagline: 'Converta fotos JPG, PNG e WebP em um único documento PDF 100% localmente na memória RAM.',
    privacyBadge: 'Privacidade 100% na RAM: Suas fotos são processadas no dispositivo sem envio para servidores',
    dropTitle: 'Arraste imagens aqui ou clique para selecionar (JPG, PNG, WebP)',
    dropSubtitle: 'Adicione várias fotos de uma vez, organize a sequência e ajuste para o padrão A4',
    browseFiles: 'Escolher fotos do dispositivo',
    loadSample: 'Carregar fotos de exemplo',
    addMore: 'Adicionar mais fotos',
    clearAll: 'Limpar tudo',
    reverseOrder: 'Inverter ordem',
    photosCount: (n) => `Fotos selecionadas: ${n}`,
    totalSizeLabel: 'Tamanho total:',
    deletePhoto: 'Excluir foto',
    moveLeft: 'Mover para esquerda',
    moveRight: 'Mover para direita',
    pageSettings: 'Configurações do Documento PDF',
    pageSizeLabel: 'Formato da folha:',
    pageSizes: {
      a4: 'Padrão A4 (595 × 842 pt)',
      letter: 'US Letter (612 × 792 pt)',
      fit: 'Ajustar à imagem (Original)',
    },
    orientationLabel: 'Orientação da página:',
    orientations: {
      auto: 'Automática (Conforme proporção)',
      portrait: 'Retrato (Vertical)',
      landscape: 'Paisagem (Horizontal)',
    },
    marginLabel: 'Margens da página:',
    margins: {
      none: 'Sem margens (0 mm - Sangria)',
      small: 'Margens estreitas (10 mm)',
      large: 'Margens largas (20 mm)',
    },
    convertBtn: (n) => `Gerar Documento PDF (${n} ${n === 1 ? 'página' : 'páginas'})`,
    converting: 'Gerando PDF na memória RAM...',
    processingTitle: 'Conversão de Imagens para PDF',
    stage1: 'Otimizando a compressão de imagens na memória RAM...',
    stage2: 'Ajustando páginas para o formato A4 padrão...',
    stage3: 'Compilando documento PDF com múltiplas páginas...',
    stage4: 'Blindando camada de privacidade na memória RAM...',
    stage5: 'Pronto! Seu documento PDF está pronto para download.',
    readyTitle: 'Seu arquivo PDF está pronto para download!',
    readySubtitle: 'Todas as imagens foram unificadas e diagramadas 100% localmente na memória RAM.',
    downloadBtn: 'Baixar Documento PDF Gerado',
    downloadAgain: 'Baixar novamente',
    editOrder: 'Editar sequência de fotos',
    newBatch: 'Converter novas fotos',
    pagesCount: 'Total de páginas:',
    fileSize: 'Tamanho do arquivo:',
    formatLabel: 'Formato da página:',
  },
  ru: {
    title: 'Конвертировать изображения в PDF онлайн',
    tagline: 'Преобразуйте фото JPG, PNG и WebP в единый документ PDF на 100% локально в оперативной памяти браузера.',
    privacyBadge: '100% Конфиденциальность в RAM: Фотографии обрабатываются на вашем устройстве без отправки на сервер',
    dropTitle: 'Перетащите изображения сюда или выберите файлы (JPG, PNG, WebP)',
    dropSubtitle: 'Добавляйте пачку фото, меняйте порядок страниц и масштабируйте под стандартный формат A4',
    browseFiles: 'Выбрать изображения',
    loadSample: 'Загрузить образцы фото',
    addMore: 'Добавить еще фото',
    clearAll: 'Очистить список',
    reverseOrder: 'Обратный порядок',
    photosCount: (n) => `Выбрано фото: ${n}`,
    totalSizeLabel: 'Общий размер:',
    deletePhoto: 'Удалить фото',
    moveLeft: 'Сдвинуть влево',
    moveRight: 'Сдвинуть вправо',
    pageSettings: 'Параметры документа PDF',
    pageSizeLabel: 'Формат страницы:',
    pageSizes: {
      a4: 'Стандарт A4 (595 × 842 pt)',
      letter: 'US Letter (612 × 792 pt)',
      fit: 'По размеру фото (Оригинал)',
    },
    orientationLabel: 'Ориентация страницы:',
    orientations: {
      auto: 'Автоматическая (По пропорциям фото)',
      portrait: 'Книжная (Вертикальная)',
      landscape: 'Альбомная (Горизонтальная)',
    },
    marginLabel: 'Поля страницы:',
    margins: {
      none: 'Без полей (0 мм - Полный кадр)',
      small: 'Узкие поля (10 мм - Рамка)',
      large: 'Широкие поля (20 мм - Альбом)',
    },
    convertBtn: (n) => `Создать документ PDF (${n} ${n === 1 ? 'страница' : n < 5 ? 'страницы' : 'страниц'})`,
    converting: 'Сборка PDF в оперативной памяти RAM...',
    processingTitle: 'Конвертация изображений в PDF',
    stage1: 'Оптимизация сжатия изображений в оперативной памяти RAM...',
    stage2: 'Масштабирование страниц под стандартный формат A4...',
    stage3: 'Сборка многостраничного документа PDF...',
    stage4: 'Защита слоя конфиденциальности в локальной памяти RAM...',
    stage5: 'Готово! Ваш PDF-документ готов к скачиванию.',
    readyTitle: 'Ваш PDF-документ готов к скачиванию!',
    readySubtitle: 'Все изображения объединены и отформатированы на 100% локально в оперативной памяти RAM.',
    downloadBtn: 'Скачать готовый PDF-документ',
    downloadAgain: 'Скачать повторно',
    editOrder: 'Изменить порядок и параметры',
    newBatch: 'Конвертировать новые фото',
    pagesCount: 'Количество страниц:',
    fileSize: 'Размер файла:',
    formatLabel: 'Формат страницы:',
  },
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const ImageToPdfModule: React.FC<ImageToPdfModuleProps> = ({
  initialFile,
  onTriggerDownload,
  onProcessingFinished,
}) => {
  const { language } = useLanguage();
  const processing = useProcessing();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'fit'>('a4');
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [margin, setMargin] = useState<number>(0); // 0, 18, 36 pt
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [generatedPdf, setGeneratedPdf] = useState<GeneratedResult | null>(null);

  const ui = MODULE_TRANSLATIONS[language] || MODULE_TRANSLATIONS.en;

  // Load initial file if it is an image
  useEffect(() => {
    if (initialFile && images.length === 0) {
      const isImg = /\.(jpe?g|png|webp|gif|bmp)$/i.test(initialFile.name);
      if (isImg) {
        processRawFile(
          new File([initialFile.bytes as any], initialFile.name, {
            type: initialFile.name.endsWith('.png') ? 'image/png' : 'image/jpeg',
          })
        );
      }
    }
  }, [initialFile]);

  const processRawFile = async (file: File): Promise<ImageItem | null> => {
    if (!file.type.startsWith('image/') && !/\.(jpe?g|png|webp|gif|bmp)$/i.test(file.name)) {
      return null;
    }

    const buffer = await file.arrayBuffer();
    const rawBytes = new Uint8Array(buffer);

    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    const dimensions = await new Promise<{ w: number; h: number }>((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          w: img.naturalWidth || img.width || 800,
          h: img.naturalHeight || img.height || 600,
        });
      };
      img.onerror = () => resolve({ w: 800, h: 600 });
      img.src = dataUrl;
    });

    let format: 'jpg' | 'png' | 'webp' | 'other' = 'other';
    const lowerName = file.name.toLowerCase();
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) {
      format = 'jpg';
    } else if (file.type === 'image/png' || lowerName.endsWith('.png')) {
      format = 'png';
    } else if (file.type === 'image/webp' || lowerName.endsWith('.webp')) {
      format = 'webp';
    }

    return {
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      dataUrl,
      width: dimensions.w,
      height: dimensions.h,
      format,
      rawBytes,
    };
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newItems: ImageItem[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const item = await processRawFile(fileList[i]);
      if (item) {
        newItems.push(item);
      }
    }

    if (newItems.length > 0) {
      setImages((prev) => [...prev, ...newItems]);
      setGeneratedPdf(null);
    }
  };

  const handleLoadSample = async () => {
    // Generate 3 elegant, high-res canvas demo graphics client-side
    const sampleItems: ImageItem[] = [];

    const samplesConfig = [
      {
        name: 'dokument-prezentacja.png',
        bg: '#4f46e5',
        title: 'PROJEKT BIZNESOWY 2026',
        subtitle: 'Raport Analityczny & Prezentacja Graficzna',
        tag: 'DOKUMENT OFICJALNY',
        w: 1200,
        h: 800,
      },
      {
        name: 'wykres-finansowy.png',
        bg: '#059669',
        title: 'ZESTAWIENIE WYNIKÓW',
        subtitle: 'Wzrost wydajności i zaoszczędzony czas w RAM',
        tag: 'ANALIZA DANYCH',
        w: 1200,
        h: 900,
      },
      {
        name: 'skan-certyfikatu.png',
        bg: '#0284c7',
        title: 'CERTYFIKAT BEZPIECZEŃSTWA',
        subtitle: '100% Zero-Upload Client-Side Guarantee',
        tag: 'CERTYFIKACJA',
        w: 900,
        h: 1200,
      },
    ];

    for (const conf of samplesConfig) {
      const canvas = document.createElement('canvas');
      canvas.width = conf.w;
      canvas.height = conf.h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Gradient background
        const grad = ctx.createLinearGradient(0, 0, conf.w, conf.h);
        grad.addColorStop(0, conf.bg);
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, conf.w, conf.h);

        // Grid lines decoration
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        for (let x = 0; x < conf.w; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, conf.h);
          ctx.stroke();
        }
        for (let y = 0; y < conf.h; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(conf.w, y);
          ctx.stroke();
        }

        // Inner frame
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, 40, conf.w - 80, conf.h - 80);

        // Tag badge
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.roundRect(80, 80, 260, 36, 8);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText(conf.tag, 100, 104);

        // Titles
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px sans-serif';
        ctx.fillText(conf.title, 80, 180);

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = '22px sans-serif';
        ctx.fillText(conf.subtitle, 80, 230);

        // Decorative chart/box
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.roundRect(80, 300, conf.w - 160, conf.h - 380, 12);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('nosignpdf.com · 100% Client-Side Engine in RAM', 110, conf.h - 110);

        const dataUrl = canvas.toDataURL('image/png');
        const base64 = dataUrl.split(',')[1];
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let b = 0; b < binary.length; b++) {
          bytes[b] = binary.charCodeAt(b);
        }

        sampleItems.push({
          id: `sample-${conf.name}-${Date.now()}-${Math.random()}`,
          name: conf.name,
          size: bytes.byteLength,
          dataUrl,
          width: conf.w,
          height: conf.h,
          format: 'png',
          rawBytes: bytes,
        });
      }
    }

    setImages(sampleItems);
    setGeneratedPdf(null);
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setImages(copy);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setGeneratedPdf(null);
  };

  const reverseAll = () => {
    setImages((prev) => [...prev].reverse());
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const copy = [...images];
    const [draggedItem] = copy.splice(draggedIndex, 1);
    copy.splice(index, 0, draggedItem);
    setImages(copy);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Canvas helper for non-JPEG/PNG or WebP embedding
  const embedViaCanvas = async (doc: PDFDocument, dataUrl: string): Promise<PDFImage> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('No canvas context');

          // Pure white background to avoid transparent alpha turning black in JPEG
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          const jpegUrl = canvas.toDataURL('image/jpeg', 0.94);
          const base64 = jpegUrl.split(',')[1];
          const binary = atob(base64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          const embedded = await doc.embedJpg(bytes);
          resolve(embedded);
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image on canvas'));
      img.src = dataUrl;
    });
  };

  const buildPdfDocument = async (): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create();

    for (const item of images) {
      let embeddedImage: PDFImage;

      if (item.format === 'jpg') {
        try {
          embeddedImage = await pdfDoc.embedJpg(item.rawBytes);
        } catch {
          embeddedImage = await embedViaCanvas(pdfDoc, item.dataUrl);
        }
      } else if (item.format === 'png') {
        try {
          embeddedImage = await pdfDoc.embedPng(item.rawBytes);
        } catch {
          embeddedImage = await embedViaCanvas(pdfDoc, item.dataUrl);
        }
      } else {
        // WebP or other format -> decode via canvas to JPEG
        embeddedImage = await embedViaCanvas(pdfDoc, item.dataUrl);
      }

      const imgWidth = embeddedImage.width;
      const imgHeight = embeddedImage.height;

      let pageWidth = imgWidth;
      let pageHeight = imgHeight;

      if (pageSize === 'a4') {
        pageWidth = PageSizes.A4[0]; // 595.28
        pageHeight = PageSizes.A4[1]; // 841.89
      } else if (pageSize === 'letter') {
        pageWidth = PageSizes.Letter[0]; // 612.0
        pageHeight = PageSizes.Letter[1]; // 792.0
      }

      // Handle orientation
      const isImageWide = imgWidth > imgHeight;
      if (pageSize !== 'fit') {
        if (orientation === 'landscape' || (orientation === 'auto' && isImageWide)) {
          if (pageWidth < pageHeight) {
            const tmp = pageWidth;
            pageWidth = pageHeight;
            pageHeight = tmp;
          }
        } else if (orientation === 'portrait' || (orientation === 'auto' && !isImageWide)) {
          if (pageWidth > pageHeight) {
            const tmp = pageWidth;
            pageWidth = pageHeight;
            pageHeight = tmp;
          }
        }
      }

      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      // Calculate fitted dimensions with preserved aspect ratio
      const availableW = Math.max(10, pageWidth - margin * 2);
      const availableH = Math.max(10, pageHeight - margin * 2);

      const scaleW = availableW / imgWidth;
      const scaleH = availableH / imgHeight;
      const finalScale = Math.min(scaleW, scaleH);

      const drawW = imgWidth * finalScale;
      const drawH = imgHeight * finalScale;

      // Perfectly center within page margins
      const posX = margin + (availableW - drawW) / 2;
      const posY = margin + (availableH - drawH) / 2;

      page.drawImage(embeddedImage, {
        x: posX,
        y: posY,
        width: drawW,
        height: drawH,
      });
    }

    return await pdfDoc.save({ useObjectStreams: true });
  };

  const handleConvert = async () => {
    if (images.length === 0 || isProcessing) return;

    setIsProcessing(true);
    const targetFileName =
      images.length === 1
        ? `${images[0].name.replace(/\.[^/.]+$/, '')}.pdf`
        : 'zdjecia-do-pdf-nosignpdf.pdf';

    const totalInputBytes = images.reduce((sum, img) => sum + img.size, 0);

    // Prepare custom stages for the 4-second dwell time screen
    const stages = {
      processingTitle: ui.processingTitle,
      stage1: ui.stage1,
      stage2: ui.stage2,
      stage3: ui.stage3,
      stage4: ui.stage4,
      stage5: ui.stage5,
    };

    // Parallel execution: compile PDF in RAM while the animated processing screen runs
    const compilePromise = buildPdfDocument();

    if (processing) {
      processing.startProcessing({
        fileName: targetFileName,
        fileSize: totalInputBytes,
        targetToolRoute: '/grafika-do-pdf',
        durationMs: 4200, // 4.2 seconds dwell time
        customStages: stages,
        onComplete: async () => {
          try {
            const pdfBytes = await compilePromise;
            setGeneratedPdf({
              bytes: pdfBytes,
              fileName: targetFileName,
              size: pdfBytes.byteLength,
              pageCount: images.length,
            });
            setIsProcessing(false);
            if (onProcessingFinished) {
              onProcessingFinished();
            }
          } catch (err) {
            console.error('Error generating PDF from images:', err);
            setIsProcessing(false);
          }
        },
      });
    } else {
      // Fallback if processing context is not present
      try {
        const pdfBytes = await compilePromise;
        setGeneratedPdf({
          bytes: pdfBytes,
          fileName: targetFileName,
          size: pdfBytes.byteLength,
          pageCount: images.length,
        });
        if (onProcessingFinished) {
          onProcessingFinished();
        }
      } catch (err) {
        console.error('Error generating PDF:', err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleDownload = () => {
    if (!generatedPdf) return;
    if (onTriggerDownload) {
      onTriggerDownload(generatedPdf.bytes, generatedPdf.fileName);
    } else {
      downloadPdfBlob(generatedPdf.bytes, generatedPdf.fileName);
    }
  };

  const totalBytes = images.reduce((acc, it) => acc + it.size, 0);

  return (
    <div id="image-to-pdf-module" className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>{ui.privacyBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {ui.title}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          {ui.tagline}
        </p>
      </div>

      {/* If generated PDF is ready, show download screen */}
      {generatedPdf ? (
        <div className="space-y-6 animate-fade-in">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                {ui.readyTitle}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                {ui.readySubtitle}
              </p>
            </div>

            {/* Document summary card */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-zinc-900 dark:text-white truncate max-w-[200px]">
                    {generatedPdf.fileName}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {ui.pagesCount} {generatedPdf.pageCount} · {pageSize.toUpperCase()}
                  </p>
                </div>
              </div>
              <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300">
                {formatBytes(generatedPdf.size)}
              </span>
            </div>

            {/* Prominent download button */}
            <div className="max-w-md mx-auto pt-2">
              <button
                id="download-generated-pdf-btn"
                onClick={handleDownload}
                className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-base shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>
                  {ui.downloadBtn} ({formatBytes(generatedPdf.size)})
                </span>
              </button>
            </div>

            {/* Secondary actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setGeneratedPdf(null)}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{ui.editOrder}</span>
              </button>
              <button
                onClick={() => {
                  setGeneratedPdf(null);
                  setImages([]);
                }}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{ui.newBatch}</span>
              </button>
            </div>
          </div>
        </div>
      ) : images.length === 0 ? (
        /* Empty dropzone state */
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md group"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
            <Images className="w-8 h-8" />
          </div>

          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1.5">
            {ui.dropTitle}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
            {ui.dropSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer"
            >
              {ui.browseFiles}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSample();
              }}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-semibold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{ui.loadSample}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Workspace with loaded image grid and settings */
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold text-zinc-900 dark:text-white">
                {ui.photosCount(images.length)}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <span className="text-zinc-500 dark:text-zinc-400 font-mono">
                {ui.totalSizeLabel} {formatBytes(totalBytes)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{ui.addMore}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />

              <button
                type="button"
                onClick={reverseAll}
                title={ui.reverseOrder}
                className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{ui.reverseOrder}</span>
              </button>

              <button
                type="button"
                onClick={() => setImages([])}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{ui.clearAll}</span>
              </button>
            </div>
          </div>

          {/* Responsive Visual Thumbnail Grid with Reordering */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, idx) => {
              const isDraggingThis = draggedIndex === idx;
              const isOverThis = dragOverIndex === idx;

              return (
                <div
                  key={img.id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={() => {
                    setDraggedIndex(null);
                    setDragOverIndex(null);
                  }}
                  className={`group relative rounded-2xl bg-white dark:bg-zinc-900 border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing ${
                    isDraggingThis
                      ? 'opacity-40 border-dashed border-indigo-400 scale-95'
                      : isOverThis
                      ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {/* Thumbnail viewport */}
                  <div className="relative aspect-4/3 bg-zinc-100 dark:bg-zinc-800/70 flex items-center justify-center overflow-hidden">
                    <img
                      src={img.dataUrl}
                      alt={img.name}
                      className="w-full h-full object-contain p-1.5 select-none pointer-events-none"
                    />

                    {/* Order badge */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-zinc-900/85 text-white text-[11px] font-mono font-bold backdrop-blur-xs shadow-xs">
                      #{idx + 1}
                    </span>

                    {/* Format badge */}
                    <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-zinc-900/70 text-zinc-200 text-[9px] font-mono uppercase tracking-wider backdrop-blur-xs">
                      {img.format}
                    </span>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      title={ui.deletePhoto}
                      aria-label={ui.deletePhoto}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs active:scale-95"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card footer: metadata and step reorder buttons */}
                  <div className="p-3 space-y-2 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <p
                      title={img.name}
                      className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate"
                    >
                      {img.name}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>
                        {img.width}×{img.height}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveImage(idx, 'left')}
                          disabled={idx === 0}
                          title={ui.moveLeft}
                          aria-label={ui.moveLeft}
                          className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 disabled:opacity-25 disabled:hover:bg-transparent cursor-pointer transition-colors"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(idx, 'right')}
                          disabled={idx === images.length - 1}
                          title={ui.moveRight}
                          aria-label={ui.moveRight}
                          className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 disabled:opacity-25 disabled:hover:bg-transparent cursor-pointer transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Document Settings Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <Layers className="w-4 h-4 text-indigo-500" />
              <span>{ui.pageSettings}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Page Format */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  {ui.pageSizeLabel}
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="a4">{ui.pageSizes.a4}</option>
                  <option value="letter">{ui.pageSizes.letter}</option>
                  <option value="fit">{ui.pageSizes.fit}</option>
                </select>
              </div>

              {/* Page Orientation */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  {ui.orientationLabel}
                </label>
                <select
                  value={orientation}
                  disabled={pageSize === 'fit'}
                  onChange={(e) => setOrientation(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="auto">{ui.orientations.auto}</option>
                  <option value="portrait">{ui.orientations.portrait}</option>
                  <option value="landscape">{ui.orientations.landscape}</option>
                </select>
              </div>

              {/* Margins */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  {ui.marginLabel}
                </label>
                <select
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value={0}>{ui.margins.none}</option>
                  <option value={18}>{ui.margins.small}</option>
                  <option value={36}>{ui.margins.large}</option>
                </select>
              </div>
            </div>

            {/* Convert Button */}
            <button
              id="convert-images-to-pdf-btn"
              type="button"
              onClick={handleConvert}
              disabled={isProcessing || images.length === 0}
              className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              <Download className="w-4 h-4" />
              <span>{isProcessing ? ui.converting : ui.convertBtn(images.length)}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
