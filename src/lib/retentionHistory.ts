import { ToolRoute } from '../types';
import { Language } from '../i18n/translations';

const STORAGE_KEY_OPERATIONS = 'nosignpdf_operations_history';
const MAX_HISTORY_ITEMS = 10;

export interface OperationHistoryItem {
  id: string;
  fileName: string;
  toolRoute: ToolRoute;
  actionName: string;
  pageCount?: number;
  fileSizeBytes: number;
  timestamp: number;
}

export interface NextStepRecommendation {
  title: string;
  message: string;
  primaryAction: {
    label: string;
    route: ToolRoute;
    explanation: string;
    badge?: string;
  };
  secondaryAction?: {
    label: string;
    route: ToolRoute;
  };
  hasWorkingFile: boolean;
}

/**
 * Records an operation cleanly into localStorage.
 */
export function recordOperationHistory(item: {
  fileName: string;
  toolRoute: ToolRoute;
  pageCount?: number;
  fileSizeBytes?: number;
}): OperationHistoryItem {
  const historyItem: OperationHistoryItem = {
    id: `op-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    fileName: item.fileName,
    toolRoute: item.toolRoute,
    actionName: getActionDisplayName(item.toolRoute),
    pageCount: item.pageCount,
    fileSizeBytes: item.fileSizeBytes || 0,
    timestamp: Date.now(),
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_OPERATIONS);
    const list: OperationHistoryItem[] = raw ? JSON.parse(raw) : [];
    // Prepend new item and keep up to MAX_HISTORY_ITEMS
    const updated = [historyItem, ...list.filter(x => x.fileName !== item.fileName || Math.abs(x.timestamp - historyItem.timestamp) > 5000)].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY_OPERATIONS, JSON.stringify(updated));
  } catch (err) {
    // Ignore storage quota or access errors
  }

  return historyItem;
}

/**
 * Returns the list of recent operations from localStorage.
 */
export function getOperationHistory(): OperationHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_OPERATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Clears the operation history.
 */
export function clearOperationHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_OPERATIONS);
  } catch {
    // Ignore
  }
}

function getActionDisplayName(route: ToolRoute): string {
  switch (route) {
    case '/polacz-pdf':
      return 'Łączenie PDF';
    case '/wypelnij-formularz-pdf':
      return 'Wypełnianie formularza';
    case '/usun-strony-z-pdf':
      return 'Usuwanie stron';
    case '/obroc-pdf':
      return 'Obracanie PDF';
    case '/rozdziel-pdf':
      return 'Rozdzielanie PDF';
    case '/kompresuj-pdf':
      return 'Kompresja PDF';
    case '/wyczysc-metadane-pdf':
      return 'Czyszczenie metadanych';
    case '/grafika-do-pdf':
      return 'Grafika do PDF';
    default:
      return 'Edycja PDF';
  }
}

/**
 * Generates an intelligent, contextual recommendation for the next step
 * using the currently processed file (without re-uploading).
 */
export function getSmartNextStep(
  lastRoute: ToolRoute,
  fileInfo: { name: string; pageCount?: number; size?: number } | null,
  lang: Language
): NextStepRecommendation {
  const pages = fileInfo?.pageCount || 1;
  const fileName = fileInfo?.name || 'dokument.pdf';

  // Polish
  if (lang === 'pl') {
    if (lastRoute === '/polacz-pdf') {
      return {
        title: 'Co chcesz zrobić teraz?',
        message: `Twój nowy plik ma ${pages > 1 ? `${pages} stron` : 'wiele stron'}. Czy przed wysłaniem chcesz usunąć zbędne strony lub zadbać o prywatność?`,
        primaryAction: {
          label: 'Usuń zbędne strony',
          route: '/usun-strony-z-pdf',
          explanation: 'Wytnij puste arkusze z połączonego pliku',
          badge: 'Sugerowany krok',
        },
        secondaryAction: {
          label: 'Wyczyść ukryte metadane',
          route: '/wyczysc-metadane-pdf',
        },
        hasWorkingFile: true,
      };
    }

    if (lastRoute === '/wypelnij-formularz-pdf') {
      return {
        title: 'Co chcesz zrobić teraz?',
        message: 'Twój wniosek został pomyślnie wypełniony! Czy przed wysłaniem chcesz usunąć z niego ukryte metadane i zadbać o prywatność?',
        primaryAction: {
          label: 'Wyczyść metadane PDF',
          route: '/wyczysc-metadane-pdf',
          explanation: 'Usuń dane komputera, autora i historię zmian',
          badge: 'Ochrona prywatności',
        },
        secondaryAction: {
          label: 'Skompresuj plik do e-maila',
          route: '/kompresuj-pdf',
        },
        hasWorkingFile: true,
      };
    }

    if (lastRoute === '/wyczysc-metadane-pdf') {
      return {
        title: 'Co chcesz zrobić teraz?',
        message: 'Twój plik jest teraz w 100% oczyszczony z ukrytych śladów. Czy chcesz zmniejszyć jego rozmiar przed wysyłką e-mailem?',
        primaryAction: {
          label: 'Skompresuj PDF',
          route: '/kompresuj-pdf',
          explanation: 'Zmniejsz wagę pliku zachowując czytelność tekstu',
          badge: 'Oszczędność miejsca',
        },
        secondaryAction: {
          label: 'Wypełnij lub podpisz dokument',
          route: '/wypelnij-formularz-pdf',
        },
        hasWorkingFile: true,
      };
    }

    if (lastRoute === '/kompresuj-pdf') {
      return {
        title: 'Co chcesz zrobić teraz?',
        message: 'Plik został pomyślnie zoptymalizowany! Czy chcesz usunąć z niego ukryte metadane, aby nikt nie poznał historii edycji?',
        primaryAction: {
          label: 'Wyczyść metadane PDF',
          route: '/wyczysc-metadane-pdf',
          explanation: 'Usuń autora, wersję programu i znaczniki czasu',
          badge: '100% Privacy',
        },
        secondaryAction: {
          label: 'Obróć lub przejrzyj strony',
          route: '/obroc-pdf',
        },
        hasWorkingFile: true,
      };
    }

    // Default for delete, rotate, split, converters
    return {
      title: 'Co chcesz zrobić teraz?',
      message: 'Twój plik jest gotowy! Czy przed wysłaniem do odbiorcy chcesz usunąć z niego ukryte metadane i zadbać o prywatność?',
      primaryAction: {
        label: 'Wyczyść metadane PDF',
        route: '/wyczysc-metadane-pdf',
        explanation: 'Trwałe usunięcie autora, nazwy programu i tagów',
        badge: 'Zalecane przed wysyłką',
      },
      secondaryAction: {
        label: 'Skompresuj plik',
        route: '/kompresuj-pdf',
      },
      hasWorkingFile: true,
    };
  }

  // English
  if (lang === 'en') {
    if (lastRoute === '/polacz-pdf') {
      return {
        title: 'What would you like to do next?',
        message: `Your new file has ${pages > 1 ? `${pages} pages` : 'multiple pages'}. Would you like to remove unnecessary pages or clean metadata before sending?`,
        primaryAction: {
          label: 'Delete Extra Pages',
          route: '/usun-strony-z-pdf',
          explanation: 'Remove blank or redundant sheets from merged file',
          badge: 'Recommended',
        },
        secondaryAction: {
          label: 'Clean PDF Metadata',
          route: '/wyczysc-metadane-pdf',
        },
        hasWorkingFile: true,
      };
    }

    if (lastRoute === '/wypelnij-formularz-pdf') {
      return {
        title: 'What would you like to do next?',
        message: 'Your form is ready! Would you like to remove hidden author metadata and computer traces before sharing?',
        primaryAction: {
          label: 'Strip PDF Metadata',
          route: '/wyczysc-metadane-pdf',
          explanation: 'Erase device name, author info, and editing history',
          badge: '100% Privacy',
        },
        secondaryAction: {
          label: 'Compress PDF for Email',
          route: '/kompresuj-pdf',
        },
        hasWorkingFile: true,
      };
    }

    if (lastRoute === '/wyczysc-metadane-pdf') {
      return {
        title: 'What would you like to do next?',
        message: 'Your file is 100% clean and private. Would you like to compress it to fit email attachment limits?',
        primaryAction: {
          label: 'Compress PDF',
          route: '/kompresuj-pdf',
          explanation: 'Shrink file size while preserving high text sharpness',
          badge: 'Email Ready',
        },
        secondaryAction: {
          label: 'Fill or Sign Document',
          route: '/wypelnij-formularz-pdf',
        },
        hasWorkingFile: true,
      };
    }

    return {
      title: 'What would you like to do next?',
      message: 'Your PDF is ready! Would you like to strip hidden metadata and ensure complete confidentiality?',
      primaryAction: {
        label: 'Strip PDF Metadata',
        route: '/wyczysc-metadane-pdf',
        explanation: 'Remove author, software tags, and timestamps',
        badge: 'Privacy Shield',
      },
      secondaryAction: {
        label: 'Compress PDF',
        route: '/kompresuj-pdf',
      },
      hasWorkingFile: true,
    };
  }

  // Spanish
  if (lang === 'es') {
    if (lastRoute === '/polacz-pdf') {
      return {
        title: '¿Qué quieres hacer ahora?',
        message: `Tu nuevo archivo tiene ${pages > 1 ? `${pages} páginas` : 'múltiples páginas'}. ¿Deseas eliminar páginas innecesarias o limpiar metadatos?`,
        primaryAction: {
          label: 'Eliminar páginas sobrantes',
          route: '/usun-strony-z-pdf',
          explanation: 'Corta hojas en blanco del archivo unido',
          badge: 'Paso sugerido',
        },
        secondaryAction: {
          label: 'Limpiar metadatos',
          route: '/wyczysc-metadane-pdf',
        },
        hasWorkingFile: true,
      };
    }

    if (lastRoute === '/wyczysc-metadane-pdf') {
      return {
        title: '¿Qué quieres hacer ahora?',
        message: 'Tu archivo está 100% limpio y protegido. ¿Deseas reducir su tamaño antes de enviarlo por email?',
        primaryAction: {
          label: 'Comprimir PDF',
          route: '/kompresuj-pdf',
          explanation: 'Disminuye el peso manteniendo el texto nítido',
          badge: 'Ahorro de espacio',
        },
        secondaryAction: {
          label: 'Rellenar o firmar',
          route: '/wypelnij-formularz-pdf',
        },
        hasWorkingFile: true,
      };
    }

    return {
      title: '¿Qué quieres hacer ahora?',
      message: '¡Tu archivo está listo! ¿Deseas eliminar los metadatos ocultos para garantizar tu total privacidad?',
      primaryAction: {
        label: 'Limpiar metadatos PDF',
        route: '/wyczysc-metadane-pdf',
        explanation: 'Borra autor, software y fechas de edición',
        badge: '100% Privacidad',
      },
      secondaryAction: {
        label: 'Comprimir PDF',
        route: '/kompresuj-pdf',
      },
      hasWorkingFile: true,
    };
  }

  // Hindi
  if (lastRoute === '/polacz-pdf') {
    return {
      title: 'अब आप क्या करना चाहते हैं?',
      message: `आपकी नई फ़ाइल में ${pages} पृष्ठ हैं। क्या आप भेजने से पहले अवांछित पृष्ठ हटाना चाहते हैं?`,
      primaryAction: {
        label: 'अनावश्यक पृष्ठ हटाएं',
        route: '/usun-strony-z-pdf',
        explanation: 'खाली या अतिरिक्त पृष्ठ तुरंत निकालें',
        badge: 'सुझाया गया कदम',
      },
      secondaryAction: {
        label: 'मेटाडेटा साफ़ करें',
        route: '/wyczysc-metadane-pdf',
      },
      hasWorkingFile: true,
    };
  }

  return {
    title: 'अब आप क्या करना चाहते हैं?',
    message: 'आपकी पीडीएफ फाइल तैयार है! क्या आप भेजने से पहले छिपा हुआ मेटाडेटा हटाकर गोपनीयता सुरक्षित करना चाहते हैं?',
    primaryAction: {
      label: 'पीडीएफ मेटाडेटा साफ़ करें',
      route: '/wyczysc-metadane-pdf',
      explanation: 'लेखक, सॉफ्टवेयर और समय का विवरण मिटाएं',
      badge: '100% सुरक्षित',
    },
    secondaryAction: {
      label: 'पीडीएफ कंप्रेस करें',
      route: '/kompresuj-pdf',
    },
    hasWorkingFile: true,
  };
}
