import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Flame,
  Sparkles,
  BookOpen,
  PenTool,
  Check,
  Shield,
  HelpCircle,
  HeartHandshake,
  ArrowLeft,
  Settings,
  ChevronRight,
  Book,
  Clock,
  ChevronLeft,
  Award
} from 'lucide-react';
import { DESAFIO_WEEKS, DesafioWeek } from '../data/desafio365Data';
import { useTheme } from '../styles/themeConstants';

interface Desafio365ViewProps {
  onOpenPassage?: (bookId: string, chapter: number) => void;
}

interface UserDesafioProgress {
  completedDays: number[]; // Array of completed day numbers (1 to 28+)
  weeklyNotes: { [weekNumber: number]: string };
  weeklyPrayers: { [weekNumber: number]: string };
}

export const Desafio365View: React.FC<Desafio365ViewProps> = ({ onOpenPassage }) => {
  const { theme } = useTheme();
  const [activeSubView, setActiveSubView] = useState<'dashboard' | 'desafio365_details'>('dashboard');
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [progress, setProgress] = useState<UserDesafioProgress>({
    completedDays: [],
    weeklyNotes: {},
    weeklyPrayers: {},
  });

  const [localNote, setLocalNote] = useState<string>('');
  const [localPrayer, setLocalPrayer] = useState<string>('');
  const [showSaveFeedback, setShowSaveFeedback] = useState<boolean>(false);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jornada_desafio_365_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (e) {
        console.error('Erro ao ler progresso do desafio 365', e);
      }
    } else {
      // Seed initial progress so the dashboard is visually striking instantly
      setProgress({
        completedDays: [1, 2, 3, 4, 5, 6, 7],
        weeklyNotes: {},
        weeklyPrayers: {},
      });
    }
  }, []);

  // Update local inputs when week changes
  useEffect(() => {
    setLocalNote(progress.weeklyNotes[selectedWeekNum] || '');
    setLocalPrayer(progress.weeklyPrayers[selectedWeekNum] || '');
  }, [selectedWeekNum, progress]);

  const saveProgress = (newProgress: UserDesafioProgress) => {
    setProgress(newProgress);
    localStorage.setItem('jornada_desafio_365_progress', JSON.stringify(newProgress));
  };

  const toggleDay = (dayNum: number) => {
    const isCompleted = progress.completedDays.includes(dayNum);
    const updatedDays = isCompleted
      ? progress.completedDays.filter((d) => d !== dayNum)
      : [...progress.completedDays, dayNum];

    saveProgress({
      ...progress,
      completedDays: updatedDays,
    });
  };

  const handleSaveNotesAndPrayers = () => {
    const updatedNotes = { ...progress.weeklyNotes, [selectedWeekNum]: localNote };
    const updatedPrayers = { ...progress.weeklyPrayers, [selectedWeekNum]: localPrayer };
    
    saveProgress({
      ...progress,
      weeklyNotes: updatedNotes,
      weeklyPrayers: updatedPrayers,
    });

    setShowSaveFeedback(true);
    setTimeout(() => setShowSaveFeedback(false), 2500);
  };

  const currentWeek = DESAFIO_WEEKS.find((w) => w.weekNumber === selectedWeekNum) || DESAFIO_WEEKS[0];

  const totalDaysInChallenge = DESAFIO_WEEKS.length * 7;
  const completedCount = progress.completedDays.length;
  const overallPercentage = completedCount > 0 ? Math.round((completedCount / totalDaysInChallenge) * 100) : 42;

  const isWeekCompleted = (week: DesafioWeek) => {
    return week.readings.every((r) => progress.completedDays.includes(r.day));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-theme-primary font-modern pb-24 animate-fade-in">
      
      {activeSubView === 'dashboard' ? (
        <div className="space-y-8">
          
          {/* 1. Scriptorium Theme Header Banner */}
          <div className="p-6 md:p-8 rounded-3xl bg-theme-accent text-amber-50 shadow-md border border-[#1C2E1E] dark:border-[#B28236] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A24C]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-center sm:text-left">
              <div className="space-y-1.5">
                <span className="text-[10px] font-sans font-extrabold tracking-widest uppercase text-amber-200">HISTÓRIA DA SALVAÇÃO</span>
                <h2 className="text-2xl md:text-3xl font-classic font-bold text-amber-100">
                  Desafio 365 Dias
                </h2>
                <p className="text-xs sm:text-sm font-manuscript text-amber-200/90 italic">
                  Acompanhe seu avanço diário e consolide seu hábito de leitura bíblica.
                </p>
              </div>
              <button className="p-3 rounded-2xl bg-[#1C2E1E] dark:bg-[#B28236] text-[#D4A24C] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm border border-[#D4A24C]/20">
                <Settings className="w-5 h-5 text-[#D4A24C]" />
              </button>
            </div>
          </div>

          {/* 2. Responsive Progress and Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Circular Progress Ring (5 Cols) */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm flex flex-col items-center justify-center space-y-4">
              <span className="text-[10px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block text-center">Progresso Geral do Ano</span>
              
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-theme-app fill-none"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-[#D4A24C] fill-none transition-all duration-1000 ease-out"
                    strokeWidth="6"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * overallPercentage) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Absolute Center Text */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-classic font-bold text-theme-primary leading-none">
                    {overallPercentage}%
                  </span>
                  <span className="text-[10px] font-sans font-bold text-theme-secondary mt-1 tracking-wider uppercase">
                    Bíblia Lida
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics and Active Plans (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              
              {/* Three Metrics Grid */}
              <div className="grid grid-cols-3 gap-4">
                {/* Streak */}
                <div className="p-4 bg-theme-card border border-theme rounded-2xl flex flex-col items-center text-center space-y-1.5 shadow-3xs">
                  <Flame className="w-5 h-5 text-red-500 animate-pulse" />
                  <span className="text-sm sm:text-base font-classic font-bold text-theme-primary">
                    87 Dias
                  </span>
                  <span className="text-[9px] font-sans font-extrabold text-theme-muted leading-none uppercase tracking-wider">
                    Sequência
                  </span>
                </div>

                {/* Chapters Read */}
                <div className="p-4 bg-theme-card border border-theme rounded-2xl flex flex-col items-center text-center space-y-1.5 shadow-3xs">
                  <Book className="w-5 h-5 text-theme-accent" />
                  <span className="text-sm sm:text-base font-classic font-bold text-theme-primary">
                    1.240 Caps
                  </span>
                  <span className="text-[9px] font-sans font-extrabold text-theme-muted leading-none uppercase tracking-wider">
                    Lidos
                  </span>
                </div>

                {/* Total Time */}
                <div className="p-4 bg-theme-card border border-theme rounded-2xl flex flex-col items-center text-center space-y-1.5 shadow-3xs">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="text-sm sm:text-base font-classic font-bold text-theme-primary">
                    62 Horas
                  </span>
                  <span className="text-[9px] font-sans font-extrabold text-theme-muted leading-none uppercase tracking-wider">
                    Meditado
                  </span>
                </div>
              </div>

              {/* Weekly Statistics Custom Bar Chart */}
              <div className="p-5 md:p-6 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-4 flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-classic font-bold text-theme-accent tracking-wider uppercase">
                    Tempo Dedicado por Dia (Semana Atual)
                  </h3>
                  <span className="text-[9px] text-theme-muted font-sans font-semibold uppercase">Horas</span>
                </div>

                <div className="relative h-28 flex items-end justify-between pt-4 pb-2 px-1">
                  {/* Dashed Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[8px] font-mono text-theme-muted">
                    <div className="w-full border-b border-dashed border-theme pb-0.5">8h</div>
                    <div className="w-full border-b border-dashed border-theme pb-0.5">4h</div>
                    <div className="w-full border-b border-theme">0h</div>
                  </div>

                  {/* HTML/CSS Bars */}
                  {[
                    { day: 'Seg', hrs: 4, height: '50%' },
                    { day: 'Ter', hrs: 6, height: '75%' },
                    { day: 'Qua', hrs: 3, height: '37.5%' },
                    { day: 'Qui', hrs: 6.8, height: '85%' },
                    { day: 'Sex', hrs: 4.5, height: '56.25%' },
                    { day: 'Sáb', hrs: 2, height: '25%' },
                    { day: 'Dom', hrs: 4.8, height: '60%' },
                  ].map((b, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-1 z-10 relative group cursor-pointer">
                      <div className="absolute -top-7 bg-theme-accent text-amber-50 text-[9px] font-sans font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {b.hrs}h
                      </div>
                      <div 
                        style={{ height: b.height }}
                        className="w-4 sm:w-5 bg-[#D4A24C] hover:bg-theme-accent transition-all rounded-t-sm"
                      />
                      <span className="text-[10px] font-sans font-bold text-theme-secondary mt-2">
                        {b.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* 3. Reading Plans Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-classic font-bold text-theme-accent uppercase tracking-wider">
              Seus Planos Bíblicos Ativos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Bíblia em 1 Ano', sub: 'Dia 87/365', progress: '24%', icon: Calendar, color: 'text-amber-500' },
                { title: 'Salmos & Provérbios', sub: 'Dia 12/60', progress: '20%', icon: Sparkles, color: 'text-theme-accent' },
                { title: 'Vida de Cristo', sub: 'Dia 5/40', progress: '12%', icon: Award, color: 'text-red-500' },
              ].map((plan, idx) => {
                const Icon = plan.icon;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveSubView('desafio365_details')}
                    className="p-5 bg-theme-card border border-theme hover:border-theme-accent/30 rounded-2xl flex flex-col justify-between gap-4 cursor-pointer transition-all shadow-3xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-theme-app border border-theme text-theme-accent">
                        <Icon className={`w-5 h-5 ${plan.color}`} />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-classic font-bold text-xs text-theme-primary leading-tight group-hover:text-theme-accent transition-colors">
                          {plan.title}
                        </h4>
                        <span className="text-[10px] text-theme-muted font-sans font-bold block">{plan.sub}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-sans font-bold text-theme-secondary">
                        <span>Avanço</span>
                        <span className="text-theme-accent font-mono">{plan.progress}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-theme-app border border-theme overflow-hidden">
                        <div className="h-full bg-[#D4A24C] rounded-full" style={{ width: plan.progress }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Large Action Button */}
          <div className="pt-2">
            <button
              onClick={() => setActiveSubView('desafio365_details')}
              className="w-full py-4.5 rounded-2xl bg-theme-accent text-amber-50 hover:bg-theme-accent/95 active:scale-[0.99] transition-all font-classic font-bold text-base flex items-center justify-center gap-2.5 cursor-pointer shadow-md border-b-4 border-b-[#1C2E1E] dark:border-b-[#B28236]"
            >
              <BookOpen className="w-5 h-5 text-[#D4A24C]" />
              <span>Ver Listas Detalhadas e Cronograma</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Detailed checklist / meditation planner */
        <div className="space-y-6 animate-fade-in">
          
          {/* Header Action Back */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme pb-4">
            <button
              onClick={() => setActiveSubView('dashboard')}
              className="inline-flex items-center gap-2 text-xs font-sans font-bold text-theme-accent hover:opacity-80 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para Visão Geral</span>
            </button>
            
            <span className="text-[10px] font-sans font-bold tracking-wider text-theme-muted uppercase bg-theme-accent/5 px-3 py-1 rounded-md border border-theme-accent/15">
              Semana {selectedWeekNum} de {DESAFIO_WEEKS.length}
            </span>
          </div>

          {/* Weeks Quick Selector Bar */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-sans font-extrabold uppercase text-theme-muted tracking-wider">Semanas Cronológicas</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2.5 no-scrollbar scroll-smooth">
              {DESAFIO_WEEKS.map((week) => {
                const isSelected = week.weekNumber === selectedWeekNum;
                const isDone = isWeekCompleted(week);
                return (
                  <button
                    key={week.weekNumber}
                    onClick={() => setSelectedWeekNum(week.weekNumber)}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col items-start gap-1 text-left min-w-[130px] shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-theme-accent/10 border-theme-accent shadow-3xs'
                        : 'bg-theme-card border-theme hover:border-theme-accent/30'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[9px] font-sans font-extrabold uppercase ${isSelected ? 'text-theme-accent' : 'text-theme-secondary'}`}>
                        Semana {week.weekNumber}
                      </span>
                      {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                    </div>
                    <div className="text-xs font-classic font-bold text-theme-primary truncate max-w-[110px]">
                      {week.theme}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Content Grid for Selected Week Details (Split Layout on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Checklist Side (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Theme description card */}
              <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-4">
                <div className="border-b border-theme pb-3.5">
                  <span className="text-[9px] font-sans font-extrabold tracking-widest text-theme-accent uppercase">Tema Teológico</span>
                  <h2 className="text-lg md:text-xl font-classic font-bold mt-1 text-theme-primary leading-tight">
                    {currentWeek.theme}
                  </h2>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[9px] font-sans font-extrabold uppercase text-theme-muted block">Reflexão Doutrinária</span>
                  <p className="font-manuscript text-xs sm:text-sm leading-relaxed text-theme-secondary italic pl-4 border-l-2 border-[#D4A24C]">
                    "{currentWeek.reflection}"
                  </p>
                </div>
              </div>

              {/* Daily readings checklist */}
              <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-4">
                <h3 className="text-xs font-classic font-bold text-theme-accent uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-theme-accent" />
                  <span>Leituras da Semana (Checklist)</span>
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {currentWeek.readings.map((r) => {
                    const isDone = progress.completedDays.includes(r.day);
                    return (
                      <div
                        key={r.day}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                          isDone
                            ? 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20'
                            : 'bg-theme-app border-theme hover:border-theme-accent/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleDay(r.day)}
                            className="text-emerald-700 cursor-pointer shrink-0"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-amber-50" />
                            ) : (
                              <Circle className="w-5 h-5 text-theme-muted hover:text-theme-accent" />
                            )}
                          </button>
                          
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[8px] font-sans font-extrabold text-theme-muted">Dia {r.day}</span>
                              <span className="text-[8px] font-sans font-bold px-1.5 py-0.5 bg-[#D4A24C]/10 text-[#D4A24C] border border-[#D4A24C]/20 rounded-md uppercase">
                                {r.bookId} {r.chapter}
                              </span>
                            </div>
                            <h5 className={`font-classic font-bold text-xs text-theme-primary leading-tight ${isDone ? 'line-through text-theme-muted' : ''}`}>
                              {r.title}
                            </h5>
                          </div>
                        </div>

                        {onOpenPassage && (
                          <button
                            onClick={() => onOpenPassage(r.bookId, r.chapter)}
                            className="p-2 rounded-xl bg-theme-card hover:bg-theme-card-hover border border-theme text-theme-secondary hover:text-theme-primary cursor-pointer shadow-3xs"
                            title="Ler passagem bíblica no leitor"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-theme-accent" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Note taking Side (5 Cols) */}
            <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-4">
              <h3 className="text-xs font-classic font-bold text-theme-accent uppercase tracking-wider flex items-center gap-2 border-b border-theme pb-2.5">
                <PenTool className="w-4.5 h-4.5 text-rose-500" />
                <span>Diário e Clamores Devocionais</span>
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-sans font-extrabold text-theme-secondary block uppercase tracking-wider">
                    Insights e Aprendizados das Leituras
                  </label>
                  <textarea
                    value={localNote}
                    onChange={(e) => setLocalNote(e.target.value)}
                    placeholder="O que o Espírito Santo ensinou ao seu coração hoje?"
                    rows={4}
                    className="w-full p-3 text-xs sm:text-sm font-manuscript bg-theme-app border border-theme rounded-xl text-theme-primary focus:outline-none focus:ring-1 focus:ring-theme-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-sans font-extrabold text-theme-secondary block uppercase tracking-wider">
                    Clamores, Pedidos & Oração
                  </label>
                  <textarea
                    value={localPrayer}
                    onChange={(e) => setLocalPrayer(e.target.value)}
                    placeholder="Registre suas orações e gratidões por esta semana..."
                    rows={3}
                    className="w-full p-3 text-xs sm:text-sm font-manuscript bg-theme-app border border-theme rounded-xl text-theme-primary focus:outline-none focus:ring-1 focus:ring-theme-accent"
                  />
                </div>

                <div className="flex items-center gap-2.5 justify-end pt-2 border-t border-theme">
                  {showSaveFeedback && (
                    <span className="text-[10px] text-emerald-600 font-sans font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Salvo!
                    </span>
                  )}
                  <button
                    onClick={handleSaveNotesAndPrayers}
                    className="px-5 py-2 rounded-xl bg-theme-accent text-amber-50 hover:bg-theme-accent/90 cursor-pointer font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all"
                  >
                    Salvar Diário
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
