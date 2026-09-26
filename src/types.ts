export type ToolRoute =
  | '/'
  | '/wypelnij-formularz-pdf'
  | '/usun-strony-z-pdf'
  | '/obroc-pdf'
  | '/polacz-pdf'
  | '/rozdziel-pdf'
  | '/kompresuj-pdf'
  | '/grafika-do-pdf'
  | '/polityka-privacy'
  | '/pdf-to-word'
  | '/word-to-pdf'
  | '/pdf-to-excel'
  | '/excel-to-pdf'
  | '/wyczysc-metadane-pdf';

export interface PdfMetadataItem {
  key: string;
  label: string;
  value: string;
  isPrivate: boolean;
}

export interface PdfMetadataDetails {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
  hasXmp: boolean;
  hasPieceInfo: boolean;
  customKeys: { key: string; value: string }[];
  totalFound: number;
  items: PdfMetadataItem[];
}

export interface ToolMeta {
  id: string;
  path: ToolRoute;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  badge?: string;
  seoKeywords: string[];
}

export interface TextOverlay {
  id: string;
  pageIndex: number;
  text: string;
  x: number; // percentage or px relative to rendered page
  y: number; // percentage or px relative to rendered page
  fontSize: number; // in pt / px (8 - 24)
  color: string;
}

export interface PageThumbnailItem {
  id: string;
  fileIndex: number;
  fileName: string;
  originalPageIndex: number; // 0-indexed in source file
  displayPageNumber: number; // 1-indexed for display
  rotation: number; // 0, 90, 180, 270 degrees relative to original
  thumbnailUrl?: string;
  sourceFileBytes: Uint8Array;
  selected?: boolean;
}

export interface LoadedPdfFile {
  id: string;
  name: string;
  size: number;
  bytes: Uint8Array;
  pageCount: number;
}

export type AcroFieldType = 'text' | 'checkbox' | 'dropdown';

export interface AcroFormFieldItem {
  id: string;
  name: string;
  type: AcroFieldType;
  pageIndex: number;
  pdfX: number; // PDF points (bottom-left origin)
  pdfY: number; // PDF points (bottom-left origin)
  pdfWidth: number; // PDF points width
  pdfHeight: number; // PDF points height
  value: string;
  checked?: boolean;
  options?: string[];
  isNew?: boolean;
  fontSize?: number;
}
