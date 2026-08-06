import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Plus,
  BookOpen,
  CheckCircle,
  Circle,
  Clock,
  Trash2,
  Sparkles,
  ChevronRight,
  Target,
  Layers,
  Search,
  Check,
  AlertCircle,
  X,
  Flame,
  Award,
  ArrowRight
} from 'lucide-react';
import { CustomReadingPlan, CustomPlanStage, ReadingPlanDay } from '../types';
import { BIBLE_BOOKS, getBookById } from '../data/bibleBooks';

interface CustomReadingPlanBuilderProps {
  onOpenPassage?: (bookId: string, chapter: number) => void;
}

const STORAGE_KEY = 'jornada_custom_plans_v2';

export const CustomReadingPlanBuilder: React.FC<CustomReadingPlanBuilderProps> = ({ onOpenPassage }) => {
  const [customPlans, setCustomPlans] = useState<CustomReadingPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Creation State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [planTitle, setPlanTitle] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>(['GEN', 'MAT']);
  const [bookCategoryFilter, setBookCategoryFilter] = useState<'ALL' | 'AT' | 'NT' | 'LAW' | 'POETRY' | 'GOSPELS' | 'EPISTLES'>('ALL');
  const [bookSearchQuery, setBookSearchQuery] = useState('');

  // Timeline / Deadline options
  const [deadlineMode, setDeadlineMode] = useState<'total_days' | 'target_date' | 'stage_days'>('total_days');
  const [totalDurationDays, setTotalDurationDays] = useState<number>(30);
  const [targetDate, setTargetDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  // Custom stage days map: bookId -> days
  const [stageDaysMap, setStageDaysMap] = useState<Record<string, number>>({});

  // Delete modal state
  const [planToDeleteId, setPlanToDeleteId] = useState<string | null>(null);

  // Load custom plans from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomPlans(parsed);
          setSelectedPlanId(parsed[0].id);
        }
      }
    } catch (e) {
      console.error('Error loading custom plans from localStorage:', e);
    }
  }, []);

  // Save to localStorage whenever customPlans changes
  const savePlansToStorage = (updatedPlans: CustomReadingPlan[]) => {
    setCustomPlans(updatedPlans);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlans));
    } catch (e) {
      console.error('Error saving custom plans to storage:', e);
    }
  };

  // Helper: Get selected books list
  const selectedBooks = selectedBookIds.map((id) => getBookById(id)).filter(Boolean);
  const totalChaptersSelected = selectedBooks.reduce((sum, b) => sum + (b?.totalChapters || 0), 0);

  // Filter books for Step 2
  const filteredBibleBooks = BIBLE_BOOKS.filter((b) => {
    const matchesQuery = b.name.toLowerCase().includes(bookSearchQuery.toLowerCase()) || b.abbreviation.toLowerCase().includes(bookSearchQuery.toLowerCase());
    let matchesCategory = true;

    if (bookCategoryFilter === 'AT') matchesCategory = b.testament === 'AT';
    else if (bookCategoryFilter === 'NT') matchesCategory = b.testament === 'NT';
    else if (bookCategoryFilter === 'LAW') matchesCategory = ['GEN', 'EXO', 'LEV', 'NUM', 'DEU'].includes(b.id);
    else if (bookCategoryFilter === 'POETRY') matchesCategory = ['JOB', 'PSA', 'PRO', 'ECC', 'SNG'].includes(b.id);
    else if (bookCategoryFilter === 'GOSPELS') matchesCategory = ['MAT', 'MRK', 'LUK', 'JHN', 'ACT'].includes(b.id);
    else if (bookCategoryFilter === 'EPISTLES') matchesCategory = ['ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD'].includes(b.id);

    return matchesQuery && matchesCategory;
  });

  const toggleBookSelection = (bookId: string) => {
    if (selectedBookIds.includes(bookId)) {
      if (selectedBookIds.length === 1) return; // Must keep at least 1 book
      setSelectedBookIds(selectedBookIds.filter((id) => id !== bookId));
    } else {
      setSelectedBookIds([...selectedBookIds, bookId]);
    }
  };

  const handleSelectAllCategory = (ids: string[]) => {
    const combined = Array.from(new Set([...selectedBookIds, ...ids]));
    setSelectedBookIds(combined);
  };

  // Calculate days for target date mode
  const getDaysFromTargetDate = (dateStr: string): number => {
    const now = new Date();
    const target = new Date(dateStr);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 7;
  };

  // Generate days schedule for new custom plan
  const handleCreatePlanSubmit = () => {
    if (!planTitle.trim() || selectedBookIds.length === 0) return;

    let finalTotalDays = totalDurationDays;
    if (deadlineMode === 'target_date') {
      finalTotalDays = getDaysFromTargetDate(targetDate);
    } else if (deadlineMode === 'stage_days') {
      finalTotalDays = selectedBookIds.reduce((sum, id) => sum + (stageDaysMap[id] || 5), 0);
    }

    if (finalTotalDays < 1) finalTotalDays = 1;

    // Create stages
    let currentDayOffset = 1;
    const stages: CustomPlanStage[] = [];

    selectedBookIds.forEach((id) => {
      const book = getBookById(id);
      if (!book) return;

      let bookDays = 5;
      if (deadlineMode === 'stage_days') {
        bookDays = stageDaysMap[id] || 5;
      } else {
        // Proportion of total days based on chapter ratio
        const ratio = book.totalChapters / totalChaptersSelected;
        bookDays = Math.max(1, Math.round(ratio * finalTotalDays));
      }

      const endOffset = currentDayOffset + bookDays - 1;

      stages.push({
        id: `stage-${id}-${Date.now()}`,
        bookId: id,
        bookName: book.name,
        totalChapters: book.totalChapters,
        durationDays: bookDays,
        startDayOffset: currentDayOffset,
        endDayOffset: endOffset
      });

      currentDayOffset = endOffset + 1;
    });

    const calculatedTotalDays = currentDayOffset - 1;

    // Generate daily schedule
    const daysSchedule: ReadingPlanDay[] = [];
    const allPassages: { bookId: string; chapter: number }[] = [];

    selectedBookIds.forEach((id) => {
      const book = getBookById(id);
      if (!book) return;
      for (let ch = 1; ch <= book.totalChapters; ch++) {
        allPassages.push({ bookId: id, chapter: ch });
      }
    });

    // Divide passages evenly among total calculated days
    const totalPassages = allPassages.length;
    const chaptersPerDay = Math.ceil(totalPassages / calculatedTotalDays);

    for (let d = 1; d <= calculatedTotalDays; d++) {
      const startIndex = (d - 1) * chaptersPerDay;
      const dayPassages = allPassages.slice(startIndex, startIndex + chaptersPerDay);

      if (dayPassages.length > 0) {
        const firstP = dayPassages[0];
        const lastP = dayPassages[dayPassages.length - 1];
        const titleStr = firstP.bookId === lastP.bookId
          ? `${getBookById(firstP.bookId)?.name} cap. ${firstP.chapter}${dayPassages.length > 1 ? ` a ${lastP.chapter}` : ''}`
          : `${getBookById(firstP.bookId)?.name} ${firstP.chapter} até ${getBookById(lastP.bookId)?.name} ${lastP.chapter}`;

        daysSchedule.push({
          day: d,
          title: titleStr,
          passages: dayPassages
        });
      }
    }

    const newPlan: CustomReadingPlan = {
      id: `custom-plan-${Date.now()}`,
      title: planTitle,
      description: planDescription || `Plano personalizado contendo ${selectedBookIds.length} livro(s) da Bíblia`,
      createdAt: new Date().toISOString(),
      targetEndDate: deadlineMode === 'target_date' ? targetDate : undefined,
      totalDurationDays: daysSchedule.length,
      selectedBookIds,
      stages,
      days: daysSchedule,
      completedDays: []
    };

    const updated = [newPlan, ...customPlans];
    savePlansToStorage(updated);
    setSelectedPlanId(newPlan.id);

    // Reset form
    setIsModalOpen(false);
    setStep(1);
    setPlanTitle('');
    setPlanDescription('');
  };

  // Toggle Day completion in selected custom plan
  const toggleDayInCustomPlan = (planId: string, dayNum: number) => {
    const updated = customPlans.map((plan) => {
      if (plan.id !== planId) return plan;
      const isDone = plan.completedDays.includes(dayNum);
      const updatedDays = isDone
        ? plan.completedDays.filter((d) => d !== dayNum)
        : [...plan.completedDays, dayNum];

      return {
        ...plan,
        completedDays: updatedDays
      };
    });

    savePlansToStorage(updated);
  };

  // Delete plan
  const handleDeletePlan = (planId: string) => {
    const updated = customPlans.filter((p) => p.id !== planId);
    savePlansToStorage(updated);
    setPlanToDeleteId(null);
    if (selectedPlanId === planId) {
      setSelectedPlanId(updated.length > 0 ? updated[0].id : null);
    }
  };

  const activePlan = customPlans.find((p) => p.id === selectedPlanId) || customPlans[0] || null;
  const activePlanPercent = activePlan && activePlan.days.length > 0
    ? Math.round((activePlan.completedDays.length / activePlan.days.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Header Action */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-amber-50 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-amber-500/20">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Target className="w-3.5 h-3.5" />
            <span>Criador Personalizado de Leitura</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">Seus Planos Bíblicos Sob Medida</h2>
          <p className="text-amber-100/80 text-sm leading-relaxed">
            Monte itinerários de leitura personalizados, selecione seus livros bíblicos favoritos e defina prazos flexíveis para a conclusão de cada etapa.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-amber-950 font-serif font-extrabold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Criar Novo Plano Personalizado</span>
        </button>
      </div>

      {/* Main Content Area */}
      {customPlans.length === 0 ? (
        /* Empty State */
        <div className="p-8 md:p-12 rounded-3xl bg-theme-card border border-theme text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-serif font-bold text-lg text-theme-primary">Nenhum Plano Personalizado Criado</h3>
            <p className="text-xs text-theme-muted leading-relaxed">
              Você ainda não tem nenhum plano personalizado. Crie um agora mesmo escolhendo quais livros quer ler e em quantos dias deseja terminar!
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-theme-accent text-amber-50 font-serif font-bold text-xs shadow-md hover:bg-amber-800 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Meu Primeiro Plano</span>
          </button>
        </div>
      ) : (
        /* Active Custom Plans List & Selected Plan Details */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Plan Selector Cards */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-theme-muted px-1">
              Seus Planos Ativos ({customPlans.length})
            </h3>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {customPlans.map((plan) => {
                const isSelected = plan.id === activePlan?.id;
                const doneCount = plan.completedDays.length;
                const totalDays = plan.days.length;
                const pct = totalDays > 0 ? Math.round((doneCount / totalDays) * 100) : 0;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all space-y-3 relative group ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 dark:bg-amber-950/20 shadow-md ring-1 ring-amber-500/20'
                        : 'bg-theme-card border-theme hover:bg-theme-card-hover'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-amber-500/15 text-amber-800 dark:text-amber-300">
                          Personalizado
                        </span>
                        <h4 className="font-serif font-bold text-sm text-theme-primary leading-snug">{plan.title}</h4>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlanToDeleteId(plan.id);
                        }}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Excluir Plano"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-theme-secondary line-clamp-2">{plan.description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-theme-muted">
                        <span>{doneCount} / {totalDays} dias lidos</span>
                        <span className="text-amber-600 dark:text-amber-400">{pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-theme-app overflow-hidden">
                        <div
                          className="h-full bg-amber-600 dark:bg-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Selected Plan Schedule & Stages */}
          {activePlan && (
            <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-6">
              
              {/* Active Plan Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-theme pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                      Plano Personalizado
                    </span>
                    <span className="text-xs text-theme-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Prazo: {activePlan.totalDurationDays} dias
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-theme-primary">{activePlan.title}</h3>
                  <p className="text-xs text-theme-secondary">{activePlan.description}</p>
                </div>

                {/* Progress summary */}
                <div className="p-3 rounded-2xl bg-theme-app border border-theme text-center min-w-[130px]">
                  <span className="text-[10px] uppercase font-mono font-bold text-theme-muted">Conclusão</span>
                  <div className="text-2xl font-serif font-bold text-amber-600 dark:text-amber-400">
                    {activePlanPercent}%
                  </div>
                </div>
              </div>

              {/* Stages Summary */}
              {activePlan.stages && activePlan.stages.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-theme-muted flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Etapas e Livros Selecionados ({activePlan.stages.length})</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {activePlan.stages.map((stg) => (
                      <div key={stg.id} className="p-3 rounded-xl bg-theme-app border border-theme text-xs space-y-1">
                        <div className="flex items-center justify-between font-serif font-bold text-theme-primary">
                          <span>{stg.bookName}</span>
                          <span className="text-[10px] font-mono font-normal text-amber-700 dark:text-amber-300">
                            {stg.totalChapters} cap.
                          </span>
                        </div>
                        <p className="text-[10px] text-theme-muted">
                          Prazo da etapa: {stg.durationDays} dia(s) (Dia {stg.startDayOffset} ao {stg.endDayOffset})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Days Schedule Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase text-theme-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>Cronograma Diário de Leituras</span>
                </h4>

                <div className="space-y-2.5">
                  {activePlan.days.map((dayItem) => {
                    const isDone = activePlan.completedDays.includes(dayItem.day);
                    return (
                      <div
                        key={dayItem.day}
                        className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                          isDone
                            ? 'bg-amber-500/10 border-amber-500/30'
                            : 'bg-theme-app border-theme'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleDayInCustomPlan(activePlan.id, dayItem.day)}
                            className="text-amber-600 dark:text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                          >
                            {isDone ? (
                              <CheckCircle className="w-5 h-5 fill-amber-600 text-white dark:text-stone-900" />
                            ) : (
                              <Circle className="w-5 h-5 text-stone-400" />
                            )}
                          </button>

                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase text-amber-700 dark:text-amber-300">
                              Dia {dayItem.day} de {activePlan.totalDurationDays}
                            </span>
                            <h5 className="font-serif font-bold text-xs sm:text-sm text-theme-primary">
                              {dayItem.title}
                            </h5>
                          </div>
                        </div>

                        {/* Passages List */}
                        <div className="flex flex-wrap items-center gap-2">
                          {dayItem.passages.map((p, idx) => (
                            <button
                              key={idx}
                              onClick={() => onOpenPassage && onOpenPassage(p.bookId, p.chapter)}
                              className="px-2.5 py-1 rounded-xl bg-theme-card text-xs font-serif font-bold text-amber-900 dark:text-amber-200 border border-theme hover:bg-amber-500/20 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                              <span>{p.bookId} cap. {p.chapter}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* CREATE PLAN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-2xl w-full p-5 md:p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100">
                    Criar Plano de Leitura Personalizado
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Passo {step} de 3 — {step === 1 ? 'Título e Descrição' : step === 2 ? 'Seleção de Livros Bíblicos' : 'Definição de Prazos e Etapas'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: Title & Description */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Nome do Seu Plano <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Minha Maratona dos Evangelhos, Estudo dos Salmos..."
                    value={planTitle}
                    onChange={(e) => setPlanTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Descrição ou Objetivo Devocional (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Quero dedicar 15 minutos diários para meditar nos conselhos de sabedoria e nas cartas do apóstolo Paulo."
                    value={planDescription}
                    onChange={(e) => setPlanDescription(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>No próximo passo você escolherá exatamente quais livros bíblicos farão parte deste plano!</span>
                </div>
              </div>
            )}

            {/* STEP 2: Selecting Books */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Selecione os Livros para a Leitura
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {selectedBookIds.length} livro(s) selecionado(s) • Total de {totalChaptersSelected} capítulos
                    </p>
                  </div>

                  {/* Search input */}
                  <input
                    type="text"
                    placeholder="Filtrar por nome..."
                    value={bookSearchQuery}
                    onChange={(e) => setBookSearchQuery(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none w-full sm:w-48"
                  />
                </div>

                {/* Category Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                  <button
                    onClick={() => setBookCategoryFilter('ALL')}
                    className={`px-3 py-1 rounded-full border cursor-pointer shrink-0 ${
                      bookCategoryFilter === 'ALL'
                        ? 'bg-amber-800 text-amber-50 border-amber-800 dark:bg-amber-600'
                        : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    Todos os 66
                  </button>
                  <button
                    onClick={() => setBookCategoryFilter('AT')}
                    className={`px-3 py-1 rounded-full border cursor-pointer shrink-0 ${
                      bookCategoryFilter === 'AT'
                        ? 'bg-amber-800 text-amber-50 border-amber-800 dark:bg-amber-600'
                        : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    Antigo Testamento
                  </button>
                  <button
                    onClick={() => setBookCategoryFilter('NT')}
                    className={`px-3 py-1 rounded-full border cursor-pointer shrink-0 ${
                      bookCategoryFilter === 'NT'
                        ? 'bg-amber-800 text-amber-50 border-amber-800 dark:bg-amber-600'
                        : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    Novo Testamento
                  </button>
                  <button
                    onClick={() => setBookCategoryFilter('GOSPELS')}
                    className={`px-3 py-1 rounded-full border cursor-pointer shrink-0 ${
                      bookCategoryFilter === 'GOSPELS'
                        ? 'bg-amber-800 text-amber-50 border-amber-800 dark:bg-amber-600'
                        : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    Evangelhos
                  </button>
                  <button
                    onClick={() => setBookCategoryFilter('EPISTLES')}
                    className={`px-3 py-1 rounded-full border cursor-pointer shrink-0 ${
                      bookCategoryFilter === 'EPISTLES'
                        ? 'bg-amber-800 text-amber-50 border-amber-800 dark:bg-amber-600'
                        : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    Epístolas
                  </button>
                </div>

                {/* Quick Select Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSelectAllCategory(filteredBibleBooks.map((b) => b.id))}
                    className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    + Selecionar visíveis nesta lista
                  </button>
                  <span className="text-stone-300">|</span>
                  <button
                    type="button"
                    onClick={() => setSelectedBookIds(['GEN'])}
                    className="text-[11px] font-bold text-stone-500 hover:underline cursor-pointer"
                  >
                    Limpar seleção
                  </button>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-56 overflow-y-auto p-1 border border-stone-200 dark:border-stone-800 rounded-2xl">
                  {filteredBibleBooks.map((book) => {
                    const isChecked = selectedBookIds.includes(book.id);
                    return (
                      <button
                        key={book.id}
                        type="button"
                        onClick={() => toggleBookSelection(book.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isChecked
                            ? 'bg-amber-500/15 border-amber-500 text-amber-950 dark:text-amber-200 font-bold'
                            : 'bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <div className="truncate">
                          <p className="text-xs truncate">{book.name}</p>
                          <span className="text-[10px] text-stone-400 font-mono font-normal">
                            {book.totalChapters} cap.
                          </span>
                        </div>
                        {isChecked && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Setting Deadlines / Timeframes */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    Definir Prazos para Conclusão das Etapas
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Escolha como deseja distribuir os prazos de leitura para os {selectedBookIds.length} livros ({totalChaptersSelected} capítulos no total)
                  </p>
                </div>

                {/* Deadline Mode Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeadlineMode('total_days')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                      deadlineMode === 'total_days'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-950 dark:text-amber-200 font-bold'
                        : 'bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Duração em Dias</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-normal">
                      Defina quantos dias totais levará para ler tudo
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeadlineMode('target_date')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                      deadlineMode === 'target_date'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-950 dark:text-amber-200 font-bold'
                        : 'bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>Data Alvo de Término</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-normal">
                      Escolha um dia específico no calendário
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeadlineMode('stage_days')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                      deadlineMode === 'stage_days'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-950 dark:text-amber-200 font-bold'
                        : 'bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs">
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span>Prazo por Livro/Etapa</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-normal">
                      Especifique dias individuais para cada livro
                    </p>
                  </button>
                </div>

                {/* Input Fields based on mode */}
                {deadlineMode === 'total_days' && (
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-2">
                    <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                      Total de Dias para Concluir
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        max={365}
                        value={totalDurationDays}
                        onChange={(e) => setTotalDurationDays(Number(e.target.value) || 1)}
                        className="w-28 px-3 py-2 text-xs sm:text-sm bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 font-mono font-bold"
                      />
                      <div className="text-xs text-stone-500">
                        Média de ~<strong className="text-amber-600 dark:text-amber-400">
                          {(totalChaptersSelected / Math.max(1, totalDurationDays)).toFixed(1)}
                        </strong> capítulos por dia
                      </div>
                    </div>
                  </div>
                )}

                {deadlineMode === 'target_date' && (
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-2">
                    <label className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                      Data Limite no Calendário
                    </label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="px-3 py-2 text-xs sm:text-sm bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 font-sans font-bold"
                    />
                    <p className="text-[11px] text-stone-500">
                      Calculando {getDaysFromTargetDate(targetDate)} dias até a data selecionada.
                    </p>
                  </div>
                )}

                {deadlineMode === 'stage_days' && (
                  <div className="space-y-2 max-h-48 overflow-y-auto p-1">
                    {selectedBookIds.map((id) => {
                      const book = getBookById(id);
                      if (!book) return null;
                      const curDays = stageDaysMap[id] || 5;

                      return (
                        <div key={id} className="p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-stone-900 dark:text-stone-100">{book.name}</span>
                            <span className="text-[10px] text-stone-400 block">{book.totalChapters} capítulos</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-stone-500">Prazo:</span>
                            <input
                              type="number"
                              min={1}
                              max={100}
                              value={curDays}
                              onChange={(e) => {
                                const val = Number(e.target.value) || 1;
                                setStageDaysMap({ ...stageDaysMap, [id]: val });
                              }}
                              className="w-16 px-2 py-1 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg text-center font-bold"
                            />
                            <span className="text-[10px] text-stone-500">dias</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Modal Controls / Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as any)}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-850"
                >
                  ← Voltar
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  type="button"
                  disabled={step === 1 && !planTitle.trim()}
                  onClick={() => setStep((s) => (s + 1) as any)}
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-amber-50 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span>Próximo Passo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCreatePlanSubmit}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold cursor-pointer transition-colors shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>🚀 Gerar e Salvar Plano</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {planToDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">Excluir Plano Personalizado?</h4>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Você tem certeza que deseja excluir este plano personalizado? O progresso e o histórico desta leitura específica serão removidos.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPlanToDeleteId(null)}
                className="px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-300 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePlan(planToDeleteId)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold cursor-pointer hover:bg-rose-700"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
