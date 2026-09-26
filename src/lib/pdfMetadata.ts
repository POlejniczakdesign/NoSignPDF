import { PDFDocument, PDFName, PDFDict, PDFString, PDFHexString } from 'pdf-lib';
import { PdfMetadataDetails, PdfMetadataItem } from '../types';

/**
 * Formats a Date object into human-readable date & time string.
 */
export function formatPdfDate(date?: Date): string {
  if (!date || isNaN(date.getTime())) return '';
  try {
    return date.toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return date.toISOString();
  }
}

/**
 * Inspects all hidden metadata inside a PDF file.
 * Returns structured information including author, creation software, operating system tags,
 * modification timestamps, XMP streams, and custom dictionary keys.
 */
export async function inspectPdfMetadata(bytes: Uint8Array): Promise<PdfMetadataDetails> {
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });

  const title = doc.getTitle()?.trim() || undefined;
  const author = doc.getAuthor()?.trim() || undefined;
  const subject = doc.getSubject()?.trim() || undefined;
  const rawKeywords = doc.getKeywords()?.trim();
  const keywords = rawKeywords ? rawKeywords.split(/[,;\s]+/).map(k => k.trim()).filter(Boolean) : undefined;
  const creator = doc.getCreator()?.trim() || undefined;
  const producer = doc.getProducer()?.trim() || undefined;
  const creationDate = doc.getCreationDate() || undefined;
  const modificationDate = doc.getModificationDate() || undefined;

  // Check XMP stream in catalog
  const hasXmp = doc.catalog.has(PDFName.of('Metadata'));
  const hasPieceInfo = doc.catalog.has(PDFName.of('PieceInfo'));

  // Inspect raw Info dictionary for extra hidden keys (e.g., Company, Trapped, custom tags)
  const customKeys: { key: string; value: string }[] = [];
  try {
    const infoRef = doc.context.trailerInfo?.Info;
    if (infoRef) {
      const infoDict = doc.context.lookup(infoRef);
      if (infoDict instanceof PDFDict) {
        const standardNames = [
          'Title',
          'Author',
          'Subject',
          'Keywords',
          'Creator',
          'Producer',
          'CreationDate',
          'ModDate',
        ];

        for (const [keyName, valueObj] of infoDict.entries()) {
          const rawKey = keyName.asString().replace('/', '');
          if (!standardNames.includes(rawKey)) {
            let strVal = '';
            if (valueObj instanceof PDFString || valueObj instanceof PDFHexString) {
              strVal = valueObj.decodeText();
            } else if (valueObj && typeof valueObj.toString === 'function') {
              strVal = valueObj.toString();
            }
            if (strVal && strVal !== 'null' && strVal !== 'undefined') {
              customKeys.push({ key: rawKey, value: strVal });
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('Could not parse raw Info dictionary:', err);
  }

  // Build presentation items list
  const items: PdfMetadataItem[] = [];

  if (author) {
    items.push({
      key: 'author',
      label: 'Autor / Użytkownik',
      value: author,
      isPrivate: true,
    });
  }

  if (creator) {
    items.push({
      key: 'creator',
      label: 'Program źródłowy (Aplikacja)',
      value: creator,
      isPrivate: true,
    });
  }

  if (producer) {
    items.push({
      key: 'producer',
      label: 'Silnik / Sterownik PDF',
      value: producer,
      isPrivate: true,
    });
  }

  if (title) {
    items.push({
      key: 'title',
      label: 'Tytuł dokumentu',
      value: title,
      isPrivate: false,
    });
  }

  if (subject) {
    items.push({
      key: 'subject',
      label: 'Temat / Opis',
      value: subject,
      isPrivate: false,
    });
  }

  if (creationDate) {
    items.push({
      key: 'creationDate',
      label: 'Data i czas utworzenia',
      value: formatPdfDate(creationDate),
      isPrivate: true,
    });
  }

  if (modificationDate) {
    items.push({
      key: 'modificationDate',
      label: 'Data ostatniej modyfikacji',
      value: formatPdfDate(modificationDate),
      isPrivate: true,
    });
  }

  if (keywords && keywords.length > 0) {
    items.push({
      key: 'keywords',
      label: 'Słowa kluczowe (Tagi)',
      value: keywords.join(', '),
      isPrivate: false,
    });
  }

  if (hasXmp) {
    items.push({
      key: 'xmp',
      label: 'Strumień XMP (Extensible Metadata Platform)',
      value: 'Obecny (może zawierać UUID, historię edycji i identyfikatory komputera)',
      isPrivate: true,
    });
  }

  if (hasPieceInfo) {
    items.push({
      key: 'pieceInfo',
      label: 'Prywatne dane programów (PieceInfo)',
      value: 'Obecne (np. warstwy robocze Illustrator/Photoshop)',
      isPrivate: true,
    });
  }

  for (const c of customKeys) {
    items.push({
      key: `custom_${c.key}`,
      label: `Klucz Info: ${c.key}`,
      value: c.value,
      isPrivate: true,
    });
  }

  let totalFound = items.length;

  return {
    title,
    author,
    subject,
    keywords,
    creator,
    producer,
    creationDate,
    modificationDate,
    hasXmp,
    hasPieceInfo,
    customKeys,
    totalFound,
    items,
  };
}

/**
 * Strips all hidden metadata traces from a PDF file:
 * - Wipes standard info fields (Title, Author, Subject, Keywords, Creator, Producer)
 * - Resets CreationDate and ModificationDate
 * - Completely removes XMP metadata XML stream from document Catalog
 * - Removes PieceInfo from Catalog and Page nodes
 * - Clears all entries from the /Info trailer dictionary
 * - Re-saves clean PDF document
 */
export async function stripPdfMetadata(bytes: Uint8Array): Promise<{
  bytes: Uint8Array;
  strippedCount: number;
  cleanSize: number;
  originalDetails: PdfMetadataDetails;
}> {
  const originalDetails = await inspectPdfMetadata(bytes);
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });

  let strippedCount = originalDetails.totalFound;

  // 1. Reset standard high-level setters
  try {
    doc.setTitle('');
    doc.setAuthor('');
    doc.setSubject('');
    doc.setKeywords([]);
    doc.setProducer('');
    doc.setCreator('');
  } catch (e) {
    console.warn('Error clearing standard setters:', e);
  }

  // 2. Remove XMP stream from Document Catalog
  try {
    if (doc.catalog.has(PDFName.of('Metadata'))) {
      doc.catalog.delete(PDFName.of('Metadata'));
    }
  } catch (e) {
    console.warn('Error removing catalog metadata:', e);
  }

  // 3. Remove PieceInfo from Document Catalog
  try {
    if (doc.catalog.has(PDFName.of('PieceInfo'))) {
      doc.catalog.delete(PDFName.of('PieceInfo'));
    }
  } catch (e) {
    console.warn('Error removing catalog PieceInfo:', e);
  }

  // 4. Scrub each Page node (for embedded page-level metadata / PieceInfo)
  try {
    const pages = doc.getPages();
    for (const page of pages) {
      if (page.node.has(PDFName.of('PieceInfo'))) {
        page.node.delete(PDFName.of('PieceInfo'));
      }
      if (page.node.has(PDFName.of('Metadata'))) {
        page.node.delete(PDFName.of('Metadata'));
      }
    }
  } catch (e) {
    console.warn('Error scrubbing pages metadata:', e);
  }

  // 5. Completely wipe all entries from Info dictionary
  try {
    const infoRef = doc.context.trailerInfo?.Info;
    if (infoRef) {
      const infoDict = doc.context.lookup(infoRef);
      if (infoDict instanceof PDFDict) {
        const keys = [...infoDict.keys()];
        for (const k of keys) {
          infoDict.delete(k);
        }
      }
    }
  } catch (e) {
    console.warn('Error scrubbing Info dictionary:', e);
  }

  // 6. Save sanitized document without object streams to ensure maximum compatibility
  const cleanBytes = await doc.save({ useObjectStreams: false });

  return {
    bytes: cleanBytes,
    strippedCount: Math.max(strippedCount, 1),
    cleanSize: cleanBytes.byteLength,
    originalDetails,
  };
}
