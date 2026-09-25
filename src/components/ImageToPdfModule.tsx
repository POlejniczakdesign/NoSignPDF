import React, { useState, useRef } from 'react';
import {
  Images,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  ShieldCheck,
  FileText,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { useLanguage } from '../i18n/LanguageContext';

interface ImageItem {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  width: number;
  height: number;
  format: 'jpg' | 'png' | 'other';
  rawBytes: Uint8Array;
}

interface ImageToPdfModuleProps {
  onTriggerDownload: (bytes: Uint8Array, fileName: string) => void;
}

export const ImageToPdfModule: React.FC<ImageToPdfModuleProps> = ({ onTriggerDownload }) => {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<'fit' | 'a4' | 'letter'>('fit');
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [margin, setMargin] = useState<number>(0); // in points: 0, 18, 36
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const texts = {
    pl: {
      title: 'Konwertuj Grafikę do PDF Online',
      tagline: 'Przekształć zdjęcia JPG, PNG i WebP w jeden spójny dokument PDF w 100% lokalnie w przeglądarce.',
      dropTitle: 'Wybierz lub upuść zdjęcia (JPG, PNG, WebP)',
      dropSubtitle: 'Możesz dodać wiele grafik jednocześnie i ułożyć ich kolejność',
      addMore: 'Dodaj więcej zdjęć',
      clearAll: 'Wyczyść listę',
      pageSettings: 'Ustawienia dokumentu PDF',
      pageSizeLabel: 'Format arkusza:',
      pageSizes: {
        fit: 'Dopasuj do grafiki (Oryginalny)',
        a4: 'Format A4',
        letter: 'Format US Letter',
      },
      orientationLabel: 'Orientacja strony:',
      orientations: {
        auto: 'Automatyczna',
        portrait: 'Pionowa',
        landscape: 'Pozioma',
      },
      marginLabel: 'Marginesy:',
      margins: {
        none: 'Brak marginesów',
        small: 'Wąskie marginesy',
        large: 'Szerokie marginesy',
      },
      convertBtn: 'Generuj i pobierz PDF',
      converting: 'Generowanie pliku PDF...',
      privacyNote: 'Prywatność gwarantowana: Twoje zdjęcia nie są wysyłane na serwer.',
    },
    en: {
      title: 'Convert Images to PDF Online',
      tagline: 'Convert JPG, PNG, and WebP images into a single clean PDF document client-side in your browser.',
      dropTitle: 'Drop images here or click to browse (JPG, PNG, WebP)',
      dropSubtitle: 'Add multiple photos and freely arrange their sequence',
      addMore: 'Add more photos',
      clearAll: 'Clear all',
      pageSettings: 'PDF Page Settings',
      pageSizeLabel: 'Page size:',
      pageSizes: {
        fit: 'Fit to image (Original aspect)',
        a4: 'A4 Standard',
        letter: 'US Letter',
      },
      orientationLabel: 'Orientation:',
      orientations: {
        auto: 'Automatic',
        portrait: 'Portrait',
        landscape: 'Landscape',
      },
      marginLabel: 'Margins:',
      margins: {
        none: 'No margins',
        small: 'Small margins',
        large: 'Wide margins',
      },
      convertBtn: 'Create & Download PDF',
      converting: 'Compiling PDF document...',
      privacyNote: 'Privacy guaranteed: Photos stay in device RAM with zero cloud upload.',
    },
    es: {
      title: 'Convertir Imágenes a PDF Online',
      tagline: 'Convierte fotos JPG, PNG y WebP a documento PDF en tu navegador sin subir archivos.',
      dropTitle: 'Arrastra imágenes aquí o pulsa para elegir',
      dropSubtitle: 'Combina múltiples imágenes en un solo archivo PDF',
      addMore: 'Añadir más fotos',
      clearAll: 'Limpiar lista',
      pageSettings: 'Ajustes del documento PDF',
      pageSizeLabel: 'Tamaño de página:',
      pageSizes: {
        fit: 'Ajustar a imagen (Original)',
        a4: 'Formato A4',
        letter: 'US Letter',
      },
      orientationLabel: 'Orientación:',
      orientations: {
        auto: 'Automática',
        portrait: 'Vertical',
        landscape: 'Horizontal',
      },
      marginLabel: 'Márgenes:',
      margins: {
        none: 'Sin márgenes',
        small: 'Márgenes estrechos',
        large: 'Márgenes anchos',
      },
      convertBtn: 'Generar y Descargar PDF',
      converting: 'Generando PDF...',
      privacyNote: 'Privacidad garantizada: Las fotos se procesan en tu memoria RAM.',
    },
    hi: {
      title: 'इमेज को पीडीएफ में बदलें ऑनलाइन',
      tagline: 'JPG, PNG और WebP तस्वीरों को एक स्वच्छ पीडीएफ में बदलें सीधे अपने ब्राउज़र में।',
      dropTitle: 'यहाँ फ़ोटो जोड़ें या चुनें (JPG, PNG, WebP)',
      dropSubtitle: 'कई तस्वीरों को एक साथ जोड़ें और उनका क्रम बदलें',
      addMore: 'और फ़ोटो जोड़ें',
      clearAll: 'सब हटाएं',
      pageSettings: 'पेज सेटिंग्स',
      pageSizeLabel: 'पेज का आकार:',
      pageSizes: {
        fit: 'तस्वीर के अनुसार (मूल)',
        a4: 'A4 आकार',
        letter: 'US Letter',
      },
      orientationLabel: 'दिशा (Orientation):',
      orientations: {
        auto: 'ऑटो',
        portrait: 'खड़ा (Portrait)',
        landscape: 'आड़ा (Landscape)',
      },
      marginLabel: 'मार्जिन:',
      margins: {
        none: 'बिना मार्जिन',
        small: 'छोटा मार्जिन',
        large: 'बड़ा मार्जिन',
      },
      convertBtn: 'पीडीएफ बनाएं और डाउनलोड करें',
      converting: 'पीडीएफ बन रहा है...',
      privacyNote: 'पूरी सुरक्षा: आपकी तस्वीरें कभी सर्वर पर नहीं जातीं।',
    },
  };

  const ui = texts[language] || texts.en;

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newItems: ImageItem[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.type.startsWith('image/')) continue;

      const buffer = await file.arrayBuffer();
      const rawBytes = new Uint8Array(buffer);

      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const dimensions = await new Promise<{ w: number; h: number }>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ w: img.width, h: img.height });
        img.onerror = () => resolve({ w: 800, h: 600 });
        img.src = dataUrl;
      });

      let format: 'jpg' | 'png' | 'other' = 'other';
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') format = 'jpg';
      else if (file.type === 'image/png') format = 'png';

      newItems.push({
        id: `${file.name}-${Date.now()}-${i}-${Math.random()}`,
        name: file.name,
        size: file.size,
        dataUrl,
        width: dimensions.w,
        height: dimensions.h,
        format,
        rawBytes,
      });
    }

    setImages((prev) => [...prev, ...newItems]);
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setImages(copy);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        let embeddedImage;

        if (item.format === 'jpg') {
          try {
            embeddedImage = await pdfDoc.embedJpg(item.rawBytes);
          } catch {
            // fallback via canvas
            embeddedImage = await embedViaCanvas(pdfDoc, item.dataUrl);
          }
        } else if (item.format === 'png') {
          try {
            embeddedImage = await pdfDoc.embedPng(item.rawBytes);
          } catch {
            // fallback via canvas
            embeddedImage = await embedViaCanvas(pdfDoc, item.dataUrl);
          }
        } else {
          // WebP or other format -> draw to offscreen canvas and export as JPEG
          embeddedImage = await embedViaCanvas(pdfDoc, item.dataUrl);
        }

        const imgWidth = embeddedImage.width;
        const imgHeight = embeddedImage.height;

        let pageWidth = imgWidth;
        let pageHeight = imgHeight;

        if (pageSize === 'a4') {
          pageWidth = PageSizes.A4[0];
          pageHeight = PageSizes.A4[1];
        } else if (pageSize === 'letter') {
          pageWidth = PageSizes.Letter[0];
          pageHeight = PageSizes.Letter[1];
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
          } else if (orientation === 'portrait') {
            if (pageWidth > pageHeight) {
              const tmp = pageWidth;
              pageWidth = pageHeight;
              pageHeight = tmp;
            }
          }
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Calculate fitted dimensions within margins
        const availableW = Math.max(10, pageWidth - margin * 2);
        const availableH = Math.max(10, pageHeight - margin * 2);

        const scaleW = availableW / imgWidth;
        const scaleH = availableH / imgHeight;
        const finalScale = Math.min(scaleW, scaleH);

        const drawW = imgWidth * finalScale;
        const drawH = imgHeight * finalScale;

        // Center on page
        const posX = margin + (availableW - drawW) / 2;
        const posY = margin + (availableH - drawH) / 2;

        page.drawImage(embeddedImage, {
          x: posX,
          y: posY,
          width: drawW,
          height: drawH,
        });
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
      const fileName = images.length === 1
        ? `${images[0].name.replace(/\.[^/.]+$/, '')}.pdf`
        : 'images-converted.pdf';

      onTriggerDownload(pdfBytes, fileName);
    } catch (err) {
      console.error('Image to PDF error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const embedViaCanvas = async (doc: PDFDocument, dataUrl: string) => {
    return new Promise<any>((resolve, reject) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const jpegUrl = canvas.toDataURL('image/jpeg', 0.92);
        const base64 = jpegUrl.split(',')[1];
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const embedded = await doc.embedJpg(bytes);
        resolve(embedded);
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  };

  return (
    <div id="image-to-pdf-module" className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>{ui.privacyNote}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {ui.title}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          {ui.tagline}
        </p>
      </div>

      {images.length === 0 ? (
        /* Empty dropzone */
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition-all bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-4 shadow-2xs">
            <Images className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1">
            {ui.dropTitle}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            {ui.dropSubtitle}
          </p>
        </div>
      ) : (
        /* Workspace with loaded images and settings */
        <div className="space-y-6">
          {/* Action bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-900 dark:text-white">
                Wybrano zdjęć: {images.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-1.5 cursor-pointer"
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
                onClick={() => setImages([])}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{ui.clearAll}</span>
              </button>
            </div>
          </div>

          {/* Grid of image cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="group relative rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Thumbnail container */}
                <div className="relative aspect-4/3 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="w-full h-full object-contain p-1"
                  />
                  {/* Order badge */}
                  <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-zinc-900/80 text-white text-[11px] font-bold flex items-center justify-center backdrop-blur-xs">
                    {idx + 1}
                  </span>
                  {/* Remove button */}
                  <button
                    onClick={() => removeImage(idx)}
                    title="Usuń zdjęcie"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Footer with name & reorder controls */}
                <div className="p-3 space-y-2 border-t border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                    {img.name}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>{img.width} × {img.height} px</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveImage(idx, 'up')}
                        disabled={idx === 0}
                        title="Przesuń wcześniej"
                        className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveImage(idx, 'down')}
                        disabled={idx === images.length - 1}
                        title="Przesuń dalej"
                        className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Page settings card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {ui.pageSettings}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Page size */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  {ui.pageSizeLabel}
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white"
                >
                  <option value="fit">{ui.pageSizes.fit}</option>
                  <option value="a4">{ui.pageSizes.a4}</option>
                  <option value="letter">{ui.pageSizes.letter}</option>
                </select>
              </div>

              {/* Orientation */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  {ui.orientationLabel}
                </label>
                <select
                  value={orientation}
                  disabled={pageSize === 'fit'}
                  onChange={(e) => setOrientation(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white disabled:opacity-50"
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
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white"
                >
                  <option value={0}>{ui.margins.none}</option>
                  <option value={18}>{ui.margins.small}</option>
                  <option value={36}>{ui.margins.large}</option>
                </select>
              </div>
            </div>

            {/* Convert button */}
            <button
              id="convert-images-to-pdf-btn"
              onClick={handleConvert}
              disabled={isProcessing || images.length === 0}
              className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>{isProcessing ? ui.converting : ui.convertBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
