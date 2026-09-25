import React, { useEffect, useState } from 'react';
import {
  Clock,
  Sparkles,
  Trophy,
  X,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { TaskSavedStats, formatTimeSaved } from '../lib/timeSavedTracker';

interface TimeSavedCardProps {
  stats: TaskSavedStats;
  onClose?: () => void;
}

export const TimeSavedCard: React.FC<TimeSavedCardProps> = ({ stats, onClose }) => {
  const { language } = useLanguage();
  const [animatedSeconds, setAnimatedSeconds] = useState<number>(0);

  // Smooth counting animation for currentSavedSeconds
  useEffect(() => {
    const target = stats.currentSavedSeconds;
    const duration = 1400; // ms
    const startTime = performance.now();

    let animationFrameId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      setAnimatedSeconds(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setAnimatedSeconds(target);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [stats.currentSavedSeconds]);

  // Approximate minutes for the traditional comparison sentence
  const approxMinutes = Math.max(2, Math.round(stats.currentSavedSeconds / 60));

  const copy = {
    pl: {
      congrats: 'Świetna robota!',
      subheading: `To zadanie zajęłoby Ci tradycyjnie około ${approxMinutes} minut przy użyciu komercyjnych programów lub drukowania. Dzięki nosignpdf.com zaoszczędziłeś ten czas!`,
      currentSaveLabel: 'Zaoszczędzony czas w tym zadaniu:',
      totalSaveLabel: 'Twój łączny zaoszczędzony czas z nami:',
      tasksCountLabel: (count: number) => `w ${count} ukończonych operacjach`,
      badgeClientSide: '100% lokalnie w RAM',
      badgeInstant: 'Zero oczekiwania na serwer',
      dismiss: 'Zamknij powiadomienie',
    },
    en: {
      congrats: 'Great job!',
      subheading: `This task would typically take around ${approxMinutes} minutes with complex desktop software or printing. You saved that valuable time with nosignpdf.com!`,
      currentSaveLabel: 'Time saved on this task:',
      totalSaveLabel: 'Your cumulative time saved with us:',
      tasksCountLabel: (count: number) => `across ${count} completed tasks`,
      badgeClientSide: '100% Client-Side RAM',
      badgeInstant: 'Zero server queue wait',
      dismiss: 'Dismiss',
    },
    es: {
      congrats: '¡Excelente trabajo!',
      subheading: `Esta tarea habitualmente tomaría unos ${approxMinutes} minutos con programas complejos o impresión. ¡Con nosignpdf.com has ahorrado ese valioso tiempo!`,
      currentSaveLabel: 'Tiempo ahorrado en esta tarea:',
      totalSaveLabel: 'Tu tiempo total acumulado con nosotros:',
      tasksCountLabel: (count: number) => `en ${count} tareas completadas`,
      badgeClientSide: '100% local en tu RAM',
      badgeInstant: 'Sin colas en servidores',
      dismiss: 'Cerrar',
    },
    hi: {
      congrats: 'शानदार काम!',
      subheading: `इस काम में आमतौर पर लगभग ${approxMinutes} मिनट का समय लगता। nosignpdf.com की बदौलत आपने अपना कीमती समय बचाया है!`,
      currentSaveLabel: 'इस कार्य में बचाया गया समय:',
      totalSaveLabel: 'अब तक कुल बचाया गया समय:',
      tasksCountLabel: (count: number) => `${count} सफल कार्यों में`,
      badgeClientSide: '100% डिवाइस में सुरक्षित',
      badgeInstant: 'तुरंत परिणाम बिना इंतज़ार',
      dismiss: 'बंद करें',
    },
  }[language] || {
    congrats: 'Great job!',
    subheading: `This task would typically take around ${approxMinutes} minutes. You saved that valuable time with nosignpdf.com!`,
    currentSaveLabel: 'Time saved on this task:',
    totalSaveLabel: 'Your cumulative time saved with us:',
    tasksCountLabel: (count: number) => `across ${count} completed tasks`,
    badgeClientSide: '100% Client-Side RAM',
    badgeInstant: 'Zero server queue wait',
    dismiss: 'Dismiss',
  };

  const currentFormatted = formatTimeSaved(animatedSeconds, language);
  const totalFormatted = formatTimeSaved(stats.totalSavedSeconds, language);

  return (
    <div
      id="time-saved-celebration-card"
      role="region"
      aria-label="Statystyki zaoszczędzonego czasu"
      className="w-full max-w-4xl mx-auto my-6 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-900 via-zinc-900 to-slate-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-500/30">
        {/* Subtle background glow circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Dismiss button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label={copy.dismiss}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left section: Congratulations and psychological reassurance */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{copy.congrats}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400 shrink-0" />
              <span>{copy.currentSaveLabel}</span>
            </h3>

            {/* Big Animated Counter */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-200 to-indigo-300">
                +{currentFormatted}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
              {copy.subheading}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-zinc-400">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {copy.badgeClientSide}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                {copy.badgeInstant}
              </span>
            </div>
          </div>

          {/* Right section: Cumulative Global Counter */}
          <div className="w-full md:w-auto shrink-0 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3 min-w-[260px]">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{copy.totalSaveLabel}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 text-zinc-950 flex items-center justify-center shrink-0 shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                  {totalFormatted}
                </p>
                <p className="text-[11px] text-zinc-300">
                  {copy.tasksCountLabel(stats.totalTasksCount)}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-300">
              <span>nosignpdf.com</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                Zapisano w pamięci
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
