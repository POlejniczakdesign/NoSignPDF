import { ToolRoute } from '../types';
import { Language } from '../i18n/translations';

const STORAGE_KEY_TOTAL_SECONDS = 'nosignpdf_saved_seconds_total';
const STORAGE_KEY_TOTAL_TASKS = 'nosignpdf_tasks_count_total';
const STORAGE_KEY_LAST_RECORD = 'nosignpdf_last_saved_record';

export interface TaskSavedStats {
  currentSavedSeconds: number;
  totalSavedSeconds: number;
  totalTasksCount: number;
  toolRoute: ToolRoute;
  timestamp: number;
}

/**
 * Generates an ultra-realistic time-saved value in seconds based on tool type.
 */
export function calculateSavedSeconds(toolRoute: ToolRoute): number {
  const randInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  switch (toolRoute) {
    case '/wypelnij-formularz-pdf':
      // Filling/signing by hand, printing, scanning takes ~5 mins
      return 240 + randInt(15, 55); // ~4m 15s to 4m 55s
    case '/polacz-pdf':
      return 165 + randInt(10, 45); // ~2m 55s to 3m 30s
    case '/rozdziel-pdf':
      return 125 + randInt(10, 35); // ~2m 15s to 2m 40s
    case '/usun-strony-z-pdf':
      return 105 + randInt(10, 30); // ~1m 55s to 2m 15s
    case '/obroc-pdf':
      return 85 + randInt(8, 25); // ~1m 33s to 1m 50s
    case '/kompresuj-pdf':
      return 210 + randInt(12, 45); // ~3m 42s to 4m 15s
    case '/grafika-do-pdf':
      return 215 + randInt(10, 40); // ~3m 45s to 4m 15s
    case '/pdf-to-word':
      return 225 + randInt(15, 45); // ~4m 00s to 4m 30s
    case '/pdf-to-excel':
      return 255 + randInt(15, 50); // ~4m 30s to 5m 05s
    case '/word-to-pdf':
      return 145 + randInt(10, 30); // ~2m 35s to 2m 55s
    case '/excel-to-pdf':
      return 165 + randInt(10, 35); // ~2m 55s to 3m 20s
    default:
      return 150 + randInt(10, 35);
  }
}

/**
 * Records a completed task, updates localStorage, and returns new totals.
 */
export function recordCompletedTask(toolRoute: ToolRoute): TaskSavedStats {
  const currentSaved = calculateSavedSeconds(toolRoute);

  let prevTotalSeconds = 0;
  let prevTotalTasks = 0;

  try {
    const rawSec = localStorage.getItem(STORAGE_KEY_TOTAL_SECONDS);
    const rawTasks = localStorage.getItem(STORAGE_KEY_TOTAL_TASKS);
    if (rawSec) prevTotalSeconds = parseInt(rawSec, 10) || 0;
    if (rawTasks) prevTotalTasks = parseInt(rawTasks, 10) || 0;
  } catch {
    // localStorage disabled / private mode
  }

  const newTotalSeconds = prevTotalSeconds + currentSaved;
  const newTotalTasks = prevTotalTasks + 1;

  const stats: TaskSavedStats = {
    currentSavedSeconds: currentSaved,
    totalSavedSeconds: newTotalSeconds,
    totalTasksCount: newTotalTasks,
    toolRoute,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(STORAGE_KEY_TOTAL_SECONDS, newTotalSeconds.toString());
    localStorage.setItem(STORAGE_KEY_TOTAL_TASKS, newTotalTasks.toString());
    localStorage.setItem(STORAGE_KEY_LAST_RECORD, JSON.stringify(stats));
  } catch {
    // Ignore storage quota or access errors
  }

  return stats;
}

/**
 * Retrieves current cumulative stats from localStorage.
 */
export function getCumulativeStats(): { totalSavedSeconds: number; totalTasksCount: number } {
  try {
    const rawSec = localStorage.getItem(STORAGE_KEY_TOTAL_SECONDS);
    const rawTasks = localStorage.getItem(STORAGE_KEY_TOTAL_TASKS);
    return {
      totalSavedSeconds: rawSec ? parseInt(rawSec, 10) || 0 : 0,
      totalTasksCount: rawTasks ? parseInt(rawTasks, 10) || 0 : 0,
    };
  } catch {
    return { totalSavedSeconds: 0, totalTasksCount: 0 };
  }
}

/**
 * Helper to pluralize in Polish: 1 godzina, 2-4 godziny, 5-21 godzin...
 */
function pluralizePl(n: number, one: string, few: string, many: string): string {
  if (n === 1) return `${n} ${one}`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${n} ${few}`;
  }
  return `${n} ${many}`;
}

/**
 * Formats a duration in seconds into natural localized language text.
 * e.g. "4 minuty i 18 sekund", "1 godzina i 24 minuty"
 */
export function formatTimeSaved(totalSec: number, lang: Language): string {
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  if (lang === 'pl') {
    if (hours > 0) {
      const hStr = pluralizePl(hours, 'godzina', 'godziny', 'godzin');
      if (minutes > 0) {
        const mStr = pluralizePl(minutes, 'minuta', 'minuty', 'minut');
        return `${hStr} i ${mStr}`;
      }
      return hStr;
    }
    if (minutes > 0) {
      const mStr = pluralizePl(minutes, 'minuta', 'minuty', 'minut');
      if (seconds > 0) {
        const sStr = pluralizePl(seconds, 'sekunda', 'sekundy', 'sekund');
        return `${mStr} i ${sStr}`;
      }
      return mStr;
    }
    return pluralizePl(seconds, 'sekunda', 'sekundy', 'sekund');
  }

  if (lang === 'en') {
    if (hours > 0) {
      const hStr = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
      if (minutes > 0) {
        const mStr = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
        return `${hStr} and ${mStr}`;
      }
      return hStr;
    }
    if (minutes > 0) {
      const mStr = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
      if (seconds > 0) {
        const sStr = `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
        return `${mStr} and ${sStr}`;
      }
      return mStr;
    }
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
  }

  if (lang === 'es') {
    if (hours > 0) {
      const hStr = `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      if (minutes > 0) {
        const mStr = `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        return `${hStr} y ${mStr}`;
      }
      return hStr;
    }
    if (minutes > 0) {
      const mStr = `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
      if (seconds > 0) {
        const sStr = `${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
        return `${mStr} y ${sStr}`;
      }
      return mStr;
    }
    return `${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
  }

  // Hindi (hi)
  if (hours > 0) {
    const hStr = hours === 1 ? '1 घंटा' : `${hours} घंटे`;
    if (minutes > 0) {
      return `${hStr} ${minutes} मिनट`;
    }
    return hStr;
  }
  if (minutes > 0) {
    if (seconds > 0) {
      return `${minutes} मिनट और ${seconds} सेकंड`;
    }
    return `${minutes} मिनट`;
  }
  return `${seconds} सेकंड`;
}
