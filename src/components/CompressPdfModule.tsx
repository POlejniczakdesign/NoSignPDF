import React, { useState } from 'react';
import {
  Minimize2,
  FileText,
  ArrowRight,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { FileUploader } from './FileUploader';
import { compressPdf, CompressionLevel, CompressionResult } from '../lib/pdfCompression';
import { useLanguage } from '../i18n/LanguageContext';

interface CompressPdfModuleProps {
  onTriggerDownload: (bytes: Uint8Array, fileName: string) => void;
}

export const CompressPdfModule: React.FC<CompressPdfModuleProps> = ({ onTriggerDownload }) => {
  const { t, language } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    bytes: Uint8Array;
    size: number;
  } | null>(null);

  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<CompressionResult | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileSelected = (files: { name: string; bytes: Uint8Array; size: number }[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setResult(null);
    }
  };

  const handleStartCompression = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(5);

    try {
      const res = await compressPdf(selectedFile.bytes, compressionLevel, (p) => {
        setProgress(p);
      });
      setResult(res);
    } catch (err) {
      console.error('Compression failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !selectedFile) return;
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
    const outName = `${baseName}-compressed.pdf`;
    onTriggerDownload(result.bytes, outName);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResult(null);
    setIsProcessing(false);
    setProgress(0);
  };

  // Translations dictionary for the compression tool
  const texts = {
    pl: {
      title: 'Kompresuj PDF Online',
      tagline: 'Zmniejsz rozmiar pliku PDF bez utraty czytelności – 100% w przeglądarce.',
      selectLevel: 'Wybierz poziom kompresji:',
      levels: {
        medium: {
          name: 'Zalecana kompresja',
          desc: 'Świetny balans między redukcją wagi a ostrością dokumentu.',
          tag: 'Optymalna',
        },
        high: {
          name: 'Maksymalna kompresja',
          desc: 'Najmniejszy możliwy rozmiar, idealny do załączników e-mail i formularzy urzędowych.',
          tag: 'Najsilniejsza',
        },
        low: {
          name: 'Lekka kompresja',
          desc: 'Optymalizacja struktury i strumieni PDF bez zauważalnych zmian w grafice.',
          tag: 'Wysoka jakość',
        },
      },
      actionBtn: 'Kompresuj PDF teraz',
      processing: 'Trwa kompresowanie dokumentu...',
      originalSize: 'Rozmiar początkowy',
      compressedSize: 'Po kompresji',
      saved: 'Zaoszczędzono',
      downloadBtn: 'Pobierz skompresowany PDF',
      compressAnother: 'Kompresuj kolejny plik',
      privacyNote: 'Prywatność gwarantowana: Plik przetwarzany jest wyłącznie w pamięci RAM.',
    },
    en: {
      title: 'Compress PDF Online',
      tagline: 'Reduce PDF file size without sacrificing clarity – 100% in your browser.',
      selectLevel: 'Choose compression level:',
      levels: {
        medium: {
          name: 'Recommended Compression',
          desc: 'Great balance between file size reduction and visual clarity.',
          tag: 'Optimal',
        },
        high: {
          name: 'Maximum Compression',
          desc: 'Smallest file size possible, perfect for email limits and government portals.',
          tag: 'Strongest',
        },
        low: {
          name: 'Light Compression',
          desc: 'Structural stream optimization with zero loss in visual image quality.',
          tag: 'High Quality',
        },
      },
      actionBtn: 'Compress PDF Now',
      processing: 'Compressing document...',
      originalSize: 'Original size',
      compressedSize: 'Compressed size',
      saved: 'Saved',
      downloadBtn: 'Download Compressed PDF',
      compressAnother: 'Compress another file',
      privacyNote: 'Privacy guaranteed: File is processed client-side in RAM with zero server upload.',
    },
    es: {
      title: 'Comprimir PDF Online',
      tagline: 'Reduce el tamaño de tus archivos PDF gratis y de forma segura en tu navegador.',
      selectLevel: 'Selecciona el nivel de compresión:',
      levels: {
        medium: {
          name: 'Compresión Recomendada',
          desc: 'Equilibrio ideal entre reducción de peso y nitidez del texto.',
          tag: 'Óptima',
        },
        high: {
          name: 'Máxima Compresión',
          desc: 'Menor tamaño de archivo para correos electrónicos y portales con límite.',
          tag: 'Más fuerte',
        },
        low: {
          name: 'Compresión Ligera',
          desc: 'Optimización de estructura interna sin pérdida visual.',
          tag: 'Alta calidad',
        },
      },
      actionBtn: 'Comprimir PDF Ahora',
      processing: 'Comprimiendo documento...',
      originalSize: 'Tamaño original',
      compressedSize: 'Tamaño comprimido',
      saved: 'Ahorro',
      downloadBtn: 'Descargar PDF Comprimido',
      compressAnother: 'Comprimir otro archivo',
      privacyNote: 'Privacidad garantizada: Procesamiento 100% local en tu memoria RAM.',
    },
    hi: {
      title: 'पीडीएफ कंप्रेस करें ऑनलाइन',
      tagline: 'ब्राउज़र में सुरक्षित और बिना सर्वर पर अपलोड किए पीडीएफ का साइज छोटा करें।',
      selectLevel: 'कंप्रेशन का स्तर चुनें:',
      levels: {
        medium: {
          name: 'अनुशंसित कंप्रेशन (Recommended)',
          desc: 'फाइल साइज और क्वालिटी के बीच बेहतरीन संतुलन।',
          tag: 'सर्वोत्तम',
        },
        high: {
          name: 'अधिकतम कंप्रेशन (Maximum)',
          desc: 'ईमेल और फॉर्म के लिए सबसे छोटा फाइल साइज।',
          tag: 'सबसे छोटा',
        },
        low: {
          name: 'हल्का कंप्रेशन (Light)',
          desc: 'क्वालिटी खोए बिना पीडीएफ संरचना का अनुकूलन।',
          tag: 'उच्च गुणवत्ता',
        },
      },
      actionBtn: 'पीडीएफ कंप्रेस करें',
      processing: 'दस्तावेज़ कंप्रेस हो रहा है...',
      originalSize: 'मूल साइज',
      compressedSize: 'नया साइज',
      saved: 'बचत',
      downloadBtn: 'कंप्रेस किया हुआ पीडीएफ डाउनलोड करें',
      compressAnother: 'दूसरी फाइल कंप्रेस करें',
      privacyNote: 'पूरी सुरक्षा: कोई भी फाइल सर्वर पर नहीं भेजी जाती।',
    },
  };

  const ui = texts[language] || texts.en;

  return (
    <div id="compress-pdf-module" className="w-full max-w-4xl mx-auto space-y-6">
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

      {!selectedFile ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          multiple={false}
          sampleType="multipage"
          title={ui.title}
          subtitle={ui.tagline}
        />
      ) : (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* File summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {selectedFile.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {ui.originalSize}: <span className="font-semibold">{formatFileSize(selectedFile.size)}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{ui.compressAnother}</span>
            </button>
          </div>

          {!result ? (
            /* Settings before compression */
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  {ui.selectLevel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['medium', 'high', 'low'] as CompressionLevel[]).map((lvl) => {
                    const info = ui.levels[lvl];
                    const isSelected = compressionLevel === lvl;
                    return (
                      <div
                        key={lvl}
                        onClick={() => setCompressionLevel(lvl)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 ring-1 ring-indigo-500'
                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">
                            {info.name}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                            {info.tag}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {info.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <span>{ui.processing}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                id="start-compress-btn"
                onClick={handleStartCompression}
                disabled={isProcessing}
                className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minimize2 className="w-4 h-4" />
                <span>{ui.actionBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Result view */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {ui.compressedSize}: {formatFileSize(result.newSize)}
                  </h3>
                  <div className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 flex items-center justify-center gap-2">
                    <span>{ui.originalSize}: {formatFileSize(result.originalSize)}</span>
                    <span>·</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {ui.saved}: -{result.savedPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="download-compressed-btn"
                  onClick={handleDownload}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{ui.downloadBtn}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="py-3.5 px-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {ui.compressAnother}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
