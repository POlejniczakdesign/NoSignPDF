import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Eraser,
  Download,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  FileText,
  User,
  Laptop,
  Calendar,
  Tag,
  Layers,
  ArrowRight,
  Info,
  Lock,
} from 'lucide-react';
import { FileUploader } from './FileUploader';
import { inspectPdfMetadata, stripPdfMetadata } from '../lib/pdfMetadata';
import { PdfMetadataDetails } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { PDFDocument } from 'pdf-lib';

interface MetadataStripperModuleProps {
  onTriggerDownload: (bytes: Uint8Array, fileName: string) => void;
  initialFile?: {
    name: string;
    bytes: Uint8Array;
    size: number;
  } | null;
}

export const MetadataStripperModule: React.FC<MetadataStripperModuleProps> = ({
  onTriggerDownload,
  initialFile,
}) => {
  const { t, language } = useLanguage();

  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    bytes: Uint8Array;
    size: number;
  } | null>(initialFile || null);

  const [metadata, setMetadata] = useState<PdfMetadataDetails | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isStripping, setIsStripping] = useState<boolean>(false);
  const [cleanResult, setCleanResult] = useState<{
    bytes: Uint8Array;
    strippedCount: number;
    cleanSize: number;
  } | null>(null);

  // If initialFile is passed via prop (e.g. from smart next-step recommendation), analyze immediately
  useEffect(() => {
    if (initialFile && !selectedFile) {
      setSelectedFile(initialFile);
      analyzeFile(initialFile.bytes);
    }
  }, [initialFile]);

  // Inspect file on load
  const analyzeFile = async (bytes: Uint8Array) => {
    setIsAnalyzing(true);
    setCleanResult(null);
    try {
      const details = await inspectPdfMetadata(bytes);
      setMetadata(details);
    } catch (err) {
      console.error('Failed to inspect PDF metadata:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileSelected = (
    files: { name: string; bytes: Uint8Array; size: number }[]
  ) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      analyzeFile(file.bytes);
    }
  };

  const handleStripMetadata = async () => {
    if (!selectedFile) return;
    setIsStripping(true);

    try {
      const res = await stripPdfMetadata(selectedFile.bytes);
      setCleanResult(res);

      // Trigger download immediately for maximum convenience
      const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
      const outName = `${baseName}-clean.pdf`;
      onTriggerDownload(res.bytes, outName);
    } catch (err) {
      console.error('Failed to strip metadata:', err);
    } finally {
      setIsStripping(false);
    }
  };

  const handleDownloadAgain = () => {
    if (!cleanResult || !selectedFile) return;
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
    const outName = `${baseName}-clean.pdf`;
    onTriggerDownload(cleanResult.bytes, outName);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setMetadata(null);
    setCleanResult(null);
  };

  const handleGenerateSampleWithMetadata = async () => {
    try {
      const doc = await PDFDocument.create();
      doc.setTitle('Poufna Umowa Współpracy Handlowej 2026');
      doc.setAuthor('Jan Kowalski (Dyrektor Zarządzający)');
      doc.setSubject('Negocjacje biznesowe i specyfikacja techniczna');
      doc.setKeywords(['umowa', 'klient', '2026', 'poufne', 'warszawa']);
      doc.setCreator('Microsoft Word dla systemu Windows 11 Pro (Komp-JK-Office)');
      doc.setProducer('Adobe PDF Library 24.1 / HP LaserJet Enterprise Print Driver');
      doc.setCreationDate(new Date('2026-03-15T14:30:00'));
      doc.setModificationDate(new Date('2026-03-18T09:45:00'));

      const page = doc.addPage([595, 842]);
      page.drawText('PRZYKŁADOWY DOKUMENT PDF Z UKRYTYMI METADANYMI', {
        x: 50,
        y: 780,
        size: 16,
      });
      page.drawText('Ten plik zawiera ukryte informacje: autora, nazwę programu Word,', {
        x: 50,
        y: 740,
        size: 11,
      });
      page.drawText('model komputera oraz znaczniki czasu modyfikacji.', {
        x: 50,
        y: 720,
        size: 11,
      });
      page.drawText('Wciśnij zielony przycisk "Wyczyść metadane", aby usunąć te ślady.', {
        x: 50,
        y: 690,
        size: 11,
      });

      const sampleBytes = await doc.save();
      const sample = {
        name: 'umowa_handlowa_z_metadanymi.pdf',
        bytes: sampleBytes,
        size: sampleBytes.byteLength,
      };
      setSelectedFile(sample);
      analyzeFile(sampleBytes);
    } catch (e) {
      console.error('Failed to generate sample:', e);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const texts = {
    pl: {
      badge: '100% Privacy-First · Silnik Client-Side',
      title: 'Czyszczenie Metadanych PDF',
      tagline: 'Trwale usuń ukrytego autora, nazwę programu, wersję komputera, daty i tagi XMP z pliku PDF.',
      auditTitle: 'Raport audytu prywatności dokumentu',
      foundBadge: (n: number) => `Wykryto ${n} ukrytych parametrów metadanych`,
      cleanBadge: 'Dokument jest czysty – brak ukrytych parametrów',
      stripButton: 'Wyczyść metadane i pobierz bezpieczny PDF',
      stripping: 'Usuwanie ukrytych śladów...',
      cleanAgain: 'Pobierz ponownie wyczyszczony PDF',
      uploadDifferent: 'Wgraj inny dokument',
      sampleButton: 'Wypróbuj plik demonstracyjny z metadanymi Worda',
      cleanedSuccess: 'Dokument został w 100% oczyszczony z ukrytych metadanych!',
      cleanedDesc: 'Wszystkie dane personalne, identyfikatory komputera, wersje oprogramowania i historia edycji zostały trwale usunięte z pliku PDF.',
      colItem: 'Parametr',
      colValue: 'Wykryta wartość w pliku',
      colPrivacy: 'Wpływ na prywatność',
      privacyHigh: 'Wrażliwy ślad',
      privacyLow: 'Jawny parametr',
      whyTitle: 'Jakie ukryte dane usuwa ten moduł?',
      why1Title: 'Nazwa programu i sprzętu',
      why1Desc: 'Dokumenty PDF często rejestrują nazwę aplikacji (np. MS Word 2021, Adobe InDesign), nazwę komputera oraz wersję sterowników drukarki.',
      why2Title: 'Imię i nazwisko autora',
      why2Desc: 'Większość edytorów automatycznie dołącza Twój login z systemu Windows/Mac lub pełne imię i nazwisko z licencji programu.',
      why3Title: 'Historia zmian i daty',
      why3Desc: 'Dokładny czas utworzenia, data ostatniego zapisu oraz strefa czasowa ujawniają harmonogram Twojej pracy nad pismem.',
      why4Title: 'Strumień XMP i tagi UUID',
      why4Desc: 'Ukryte strumienie metadanych XML zawierają unikalne identyfikatory dokumentu (GUID) i historię wersji.',
    },
    en: {
      badge: '100% Privacy-First · Client-Side Engine',
      title: 'PDF Metadata Stripper',
      tagline: 'Permanently remove hidden author names, software tags, computer info, and XMP streams.',
      auditTitle: 'Document Privacy Audit Report',
      foundBadge: (n: number) => `Found ${n} hidden metadata parameters`,
      cleanBadge: 'Document is clean – zero metadata traces',
      stripButton: 'Strip All Metadata & Download Private PDF',
      stripping: 'Scrubbing hidden traces...',
      cleanAgain: 'Download Clean PDF Again',
      uploadDifferent: 'Upload Different PDF',
      sampleButton: 'Try Demo File with Word Metadata',
      cleanedSuccess: 'Document successfully sanitized and 100% stripped!',
      cleanedDesc: 'All personal traces, machine identifiers, software versions, and edit timestamps have been permanently removed.',
      colItem: 'Parameter',
      colValue: 'Discovered Value',
      colPrivacy: 'Privacy Impact',
      privacyHigh: 'Privacy Risk',
      privacyLow: 'Public Tag',
      whyTitle: 'What hidden data does this tool remove?',
      why1Title: 'Software & Device Name',
      why1Desc: 'PDF files record the software used (e.g., MS Word, InDesign), machine name, and printer driver versions.',
      why2Title: 'Author Name & User ID',
      why2Desc: 'Editors automatically embed your Windows/Mac OS username or license holder full name into the PDF.',
      why3Title: 'Modification Timestamps',
      why3Desc: 'Exact creation time, revision dates, and timezones reveal your document workflow history.',
      why4Title: 'XMP Streams & UUIDs',
      why4Desc: 'Hidden XML metadata streams hold persistent document identifiers (GUID) and raw version histories.',
    },
    es: {
      badge: '100% Privacidad · Motor Client-Side',
      title: 'Limpieza de Metadatos PDF',
      tagline: 'Elimina de forma permanente autor, programa de creación, fechas y flujo XMP.',
      auditTitle: 'Informe de auditoría de privacidad',
      foundBadge: (n: number) => `Detectados ${n} metadatos ocultos`,
      cleanBadge: 'El documento está limpio de metadatos',
      stripButton: 'Limpiar metadatos y descargar PDF seguro',
      stripping: 'Eliminando rastros...',
      cleanAgain: 'Descargar PDF limpio de nuevo',
      uploadDifferent: 'Cargar otro documento',
      sampleButton: 'Probar archivo de muestra con metadatos',
      cleanedSuccess: '¡Documento 100% desinfectado y limpio!',
      cleanedDesc: 'Todos los datos personales, nombres de usuario, versiones de software y marcas de tiempo han sido eliminados.',
      colItem: 'Parámetro',
      colValue: 'Valor detectado',
      colPrivacy: 'Impacto',
      privacyHigh: 'Riesgo de privacidad',
      privacyLow: 'Etiqueta pública',
      whyTitle: '¿Qué información oculta elimina esta herramienta?',
      why1Title: 'Nombre del software y equipo',
      why1Desc: 'Los PDFs registran la aplicación de creación (ej. MS Word), el equipo y controladores de impresora.',
      why2Title: 'Nombre del autor y usuario',
      why2Desc: 'Los procesadores de texto agregan tu usuario del sistema operativo o tu nombre de licencia.',
      why3Title: 'Marcas de tiempo de edición',
      why3Desc: 'La fecha exacta de creación, última modificación y zona horaria revelan tu ritmo de trabajo.',
      why4Title: 'Flujos XMP y UUID',
      why4Desc: 'Metadatos XML ocultos que almacenan identificadores únicos y versiones previas.',
    },
    hi: {
      badge: '100% गोपनीयता · क्लाइंट-साइड इंजन',
      title: 'पीडीएफ मेटाडेटा हटाएं',
      tagline: 'दस्तावेज़ से लेखक, सॉफ्टवेयर का नाम, निर्माण तिथि और XMP डेटा स्थायी रूप से मिटाएं।',
      auditTitle: 'दस्तावेज़ गोपनीयता ऑडिट रिपोर्ट',
      foundBadge: (n: number) => `${n} छिपे हुए मेटाडेटा पैरामीटर मिले`,
      cleanBadge: 'दस्तावेज़ सुरक्षित है – कोई छिपा हुआ डेटा नहीं',
      stripButton: 'सभी मेटाडेटा हटाएं और सुरक्षित पीडीएफ डाउनलोड करें',
      stripping: 'डेटा साफ़ किया जा रहा है...',
      cleanAgain: 'स्वच्छ पीडीएफ दोबारा डाउनलोड करें',
      uploadDifferent: 'दूसरी फ़ाइल चुनें',
      sampleButton: 'नमूना फ़ाइल आज़माएं',
      cleanedSuccess: 'दस्तावेज़ 100% साफ़ और सुरक्षित कर दिया गया है!',
      cleanedDesc: 'सभी व्यक्तिगत जानकारी, सॉफ्टवेयर संस्करण और संपादन समय पूरी तरह से हटा दिए गए हैं।',
      colItem: 'पैरामीटर',
      colValue: 'पहचाना गया मान',
      colPrivacy: 'गोपनीयता प्रभाव',
      privacyHigh: 'गोपनीयता जोखिम',
      privacyLow: 'सामान्य विवरण',
      whyTitle: 'यह टूल क्या छिपा हुआ डेटा हटाता है?',
      why1Title: 'सॉफ्टवेयर और डिवाइस का नाम',
      why1Desc: 'पीडीएफ फाइलें बनाने वाले प्रोग्राम का नाम और कंप्यूटर मॉडल दर्ज करती हैं।',
      why2Title: 'लेखक का नाम और आईडी',
      why2Desc: 'वर्ड प्रोसेसर आपके सिस्टम उपयोगकर्ता का नाम स्वचालित रूप से फाइल में जोड़ते हैं।',
      why3Title: 'संशोधन का समय और तारीख',
      why3Desc: 'फाइल बनाने और सहेजने का सटीक समय कार्यशैली को उजागर करता है।',
      why4Title: 'XMP स्ट्रीम्स और कोड्स',
      why4Desc: 'छिपे हुए एक्सएमएल डेटा में दस्तावेज़ के आंतरिक पहचान कोड होते हैं।',
    },
  }[language] || {
    badge: '100% Privacy-First · Client-Side Engine',
    title: 'PDF Metadata Stripper',
    tagline: 'Permanently remove hidden author names, software tags, computer info, and XMP streams.',
    auditTitle: 'Document Privacy Audit Report',
    foundBadge: (n: number) => `Found ${n} hidden metadata parameters`,
    cleanBadge: 'Document is clean – zero metadata traces',
    stripButton: 'Strip All Metadata & Download Private PDF',
    stripping: 'Scrubbing hidden traces...',
    cleanAgain: 'Download Clean PDF Again',
    uploadDifferent: 'Upload Different PDF',
    sampleButton: 'Try Demo File with Word Metadata',
    cleanedSuccess: 'Document successfully sanitized and 100% stripped!',
    cleanedDesc: 'All personal traces, machine identifiers, software versions, and edit timestamps have been permanently removed.',
    colItem: 'Parameter',
    colValue: 'Discovered Value',
    colPrivacy: 'Privacy Impact',
    privacyHigh: 'Privacy Risk',
    privacyLow: 'Public Tag',
    whyTitle: 'What hidden data does this tool remove?',
    why1Title: 'Software & Device Name',
    why1Desc: 'PDF files record the software used, machine name, and printer driver versions.',
    why2Title: 'Author Name & User ID',
    why2Desc: 'Editors automatically embed your Windows/Mac OS username or license holder full name.',
    why3Title: 'Modification Timestamps',
    why3Desc: 'Exact creation time, revision dates, and timezones reveal your document workflow history.',
    why4Title: 'XMP Streams & UUIDs',
    why4Desc: 'Hidden XML metadata streams hold persistent document identifiers and raw version histories.',
  };

  return (
    <div
      id="metadata-stripper-module"
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Header Banner */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{texts.badge}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {texts.title}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {texts.tagline}
        </p>
      </div>

      {/* Main Working Area */}
      {!selectedFile ? (
        <div className="space-y-6">
          <FileUploader
            onFilesSelected={handleFileSelected}
            multiple={false}
            title={t.common.dropzoneTitle}
            subtitle={t.common.dropzoneSubtitle}
          />

          {/* Demonstration sample button */}
          <div className="text-center">
            <button
              onClick={handleGenerateSampleWithMetadata}
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 cursor-pointer bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800/60 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{texts.sampleButton}</span>
            </button>
          </div>

          {/* Educational Explainer Cards */}
          <div className="pt-4 space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-center">
              {texts.whyTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mb-1">
                    {texts.why1Title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {texts.why1Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mb-1">
                    {texts.why2Title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {texts.why2Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mb-1">
                    {texts.why3Title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {texts.why3Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mb-1">
                    {texts.why4Title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {texts.why4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Overview Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {selectedFile.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Rozmiar: {formatFileSize(selectedFile.size)} • 100% w pamięci RAM
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{texts.uploadDifferent}</span>
            </button>
          </div>

          {/* Clean Success State */}
          {cleanResult && (
            <div className="p-6 rounded-3xl bg-linear-to-br from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 text-zinc-900 dark:text-white space-y-4 animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-emerald-950 dark:text-emerald-300">
                    {texts.cleanedSuccess}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {texts.cleanedDesc}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleDownloadAgain}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{texts.cleanAgain}</span>
                </button>
              </div>
            </div>
          )}

          {/* Privacy Audit Report */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{texts.auditTitle}</span>
                </h3>
              </div>

              {metadata && (
                <div>
                  {metadata.totalFound > 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-800">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                      <span>{texts.foundBadge(metadata.totalFound)}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{texts.cleanBadge}</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Metadata Discovered List */}
            {isAnalyzing ? (
              <div className="py-8 text-center text-xs text-zinc-500 animate-pulse">
                Trwa dogłębna analiza struktury pliku i słownika metadanych...
              </div>
            ) : metadata && metadata.items.length > 0 ? (
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-xs">
                {metadata.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 px-2 rounded-lg transition-colors"
                  >
                    <div className="min-w-[160px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex-1 font-mono text-zinc-900 dark:text-zinc-100 break-all select-all">
                      {item.value}
                    </div>

                    <div className="shrink-0">
                      {item.isPrivate ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                          {texts.privacyHigh}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {texts.privacyLow}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  {texts.cleanBadge}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                  W pliku nie znaleziono ukrytych nazw programów, tagów autora ani strumieni XMP.
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
              <button
                onClick={handleStripMetadata}
                disabled={isStripping}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                <Eraser className="w-5 h-5" />
                <span>{isStripping ? texts.stripping : texts.stripButton}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
