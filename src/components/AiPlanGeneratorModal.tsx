import React, { useState } from 'react';
import { Sparkles, X, BookOpen, Clock, Calendar, Check, AlertCircle, ArrowRight, Compass, Heart, Flame, Shield, BookMarked } from 'lucide-react';
import { CustomReadingPlan, ReadingPlanDay } from '../types';
import { getBookById } from '../data/bibleBooks';

interface AiPlanGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanCreated: (plan: CustomReadingPlan) => void;
}

const PRESET_TOPICS = [
  'Plano de 30 dias sobre Ansiedade & Paz',
  '21 Dias de Purificação, Oração e Jejum',
  '14 Dias de Sabedoria Prática em Provérbios',
  '30 Dias: Fé e Vitória nas Provações',
  '15 Dias: Gratidão, Contentamento e Alegria',
  '30 Dias: Liderança Cristã e Caráter',
  '14 Dias: Restauração da Família e Casamento'
];

export const AiPlanGeneratorModal: React.FC<AiPlanGeneratorModalProps> = ({
  isOpen,
  onClose,
  onPlanCreated
}) => {
  const [topic, setTopic] = useState('Plano de 30 dias sobre Ansiedade & Paz');
  const [durationDays, setDurationDays] = useState<number>(30);
  const [focusLevel, setFocusLevel] = useState<string>('Devocional Prático');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generated Plan Result State
  const [generatedPlanData, setGeneratedPlanData] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Por favor, informe um tema ou selecione uma opção sugerida.');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedPlanData(null);

    try {
      const response = await fetch('/api/theology/generate-reading-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          durationDays,
          focusLevel
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Falha ao gerar o plano de leitura com IA.');
      }

      setGeneratedPlanData(data.plan);
    } catch (err: any) {
      console.error('Error generating AI plan:', err);
      setError(err.message || 'Erro ao conectar com o serviço de IA. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndStartPlan = () => {
    if (!generatedPlanData) return;

    // Convert generated plan to CustomReadingPlan structure
    const daysList: ReadingPlanDay[] = (generatedPlanData.days || []).map((d: any) => {
      const cleanBookId = (d.bookId || 'PHP').toUpperCase();
      return {
        day: d.day,
        title: d.title || `Dia ${d.day}: ${d.passageRef || 'Leitura'}`,
        passages: [
          {
            bookId: cleanBookId,
            chapter: d.chapter || 1,
            verses: d.verses || undefined
          }
        ],
        devotionalNote: d.reflection || undefined
      };
    });

    const uniqueBookIds = Array.from(new Set(daysList.flatMap(d => d.passages.map(p => p.bookId))));

    const newPlan: CustomReadingPlan = {
      id: `ai-plan-${Date.now()}`,
      title: generatedPlanData.title || `Plano IA: ${topic}`,
      description: generatedPlanData.description || `Plano bíblico gerado com IA sobre o tema ${topic}`,
      createdAt: new Date().toISOString(),
      totalDurationDays: daysList.length,
      selectedBookIds: uniqueBookIds,
      stages: uniqueBookIds.map((bId) => {
        const bk = getBookById(bId);
        return {
          id: `stage-${bId}-${Date.now()}`,
          bookId: bId,
          bookName: bk ? bk.name : bId,
          totalChapters: bk ? bk.totalChapters : 10,
          durationDays: Math.ceil(daysList.length / uniqueBookIds.length),
          startDayOffset: 0,
          endDayOffset: daysList.length
        };
      }),
      days: daysList,
      completedDays: []
    };

    // Save to localStorage
    try {
      const existingRaw = localStorage.getItem('jornada_custom_plans_v2');
      const existingPlans: CustomReadingPlan[] = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [newPlan, ...existingPlans];
      localStorage.setItem('jornada_custom_plans_v2', JSON.stringify(updated));
    } catch (e) {
      console.error('Error storing AI plan:', e);
    }

    onPlanCreated(newPlan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-[#3E5641]/10 dark:bg-amber-500/10 text-[#3E5641] dark:text-[#D4A24C]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-extrabold text-lg text-[#1F1B16] dark:text-stone-100 flex items-center gap-2">
                <span>Criador de Plano Bíblico com IA</span>
              </h3>
              <p className="text-xs font-sans text-stone-500 dark:text-stone-400">
                Gere um plano de leitura sob medida para seu momento espiritual ou interesse teológico
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto space-y-5 pr-1 flex-1">
          
          {!generatedPlanData ? (
            /* FORM STATE */
            <div className="space-y-4">
              
              {/* Sugestões Rápidas Chips */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                  Sugestões Rápidas de Temas
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_TOPICS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setTopic(preset)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all border text-left cursor-pointer ${
                        topic === preset
                          ? 'bg-[#3E5641] text-white border-[#3E5641] shadow-2xs'
                          : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      ✨ {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Topic Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                  Ou digite seu tema/interesse específico *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex: Plano de 30 dias sobre Ansiedade, Luto, Perdão, Finanças segundo a Bíblia..."
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                />
              </div>

              {/* Grid: Duration and Focus Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                    Duração do Plano
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[7, 14, 21, 30].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setDurationDays(days)}
                        className={`py-2 rounded-xl text-xs font-sans font-extrabold transition-all border cursor-pointer text-center ${
                          durationDays === days
                            ? 'bg-[#D4A24C] text-stone-950 border-[#D4A24C] shadow-2xs'
                            : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        {days} dias
                      </button>
                    ))}
                  </div>
                </div>

                {/* Focus Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                    Foco Espiritual
                  </label>
                  <select
                    value={focusLevel}
                    onChange={(e) => setFocusLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                  >
                    <option value="Devocional Prático">Devocional Prático & Conforto</option>
                    <option value="Estudo Teológico Exegético">Estudo Teológico Exegético</option>
                    <option value="Memorização & Meditação">Memorização & Meditação Diária</option>
                    <option value="Batalha Espiritual & Vitória">Batalha Espiritual & Vitória</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-sans font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Submit */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-[#3E5641] hover:bg-[#324534] text-white font-sans font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                      <span>Gerando Plano Teológico com IA...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Gerar Plano Personalizado ({durationDays} Dias)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ) : (
            /* PREVIEW OF GENERATED PLAN STATE */
            <div className="space-y-5 animate-fade-in">
              
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#F7F1E5] to-[#EFE7D8] dark:from-[#24201C] dark:to-[#181614] border border-[#E7DECF] dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-extrabold uppercase bg-[#D4A24C] text-stone-950">
                    {generatedPlanData.theme || 'Plano Personalizado IA'}
                  </span>
                  <span className="text-xs font-sans font-bold text-stone-600 dark:text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#3E5641] dark:text-[#D4A24C]" />
                    {generatedPlanData.days?.length || durationDays} Dias de Leitura
                  </span>
                </div>

                <h3 className="font-serif font-extrabold text-xl text-[#1F1B16] dark:text-stone-100">
                  {generatedPlanData.title}
                </h3>

                <p className="text-xs font-sans text-stone-600 dark:text-stone-300 italic leading-relaxed">
                  "{generatedPlanData.description}"
                </p>
              </div>

              {/* Days List Preview */}
              <div className="space-y-2">
                <h4 className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center justify-between">
                  <span>Cronograma Diário Sugerido</span>
                  <span className="text-[10px] text-stone-400 font-normal">Scroll para ver todos os dias</span>
                </h4>

                <div className="max-h-60 overflow-y-auto space-y-2 pr-1 border border-stone-200 dark:border-stone-800 p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/50">
                  {generatedPlanData.days?.map((d: any) => (
                    <div
                      key={d.day}
                      className="p-3 rounded-xl bg-[#FFFDF8] dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-sans font-extrabold text-[#3E5641] dark:text-[#D4A24C] uppercase">
                          Dia {d.day}: {d.passageRef || `${d.bookId} ${d.chapter}`}
                        </span>
                        <span className="text-[10px] font-sans font-bold px-1.5 py-0.5 bg-amber-500/10 text-amber-800 dark:text-amber-300 rounded border border-amber-500/20">
                          {d.bookId} {d.chapter}
                        </span>
                      </div>
                      <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100">
                        {d.title}
                      </h5>
                      {d.reflection && (
                        <p className="text-[11px] font-sans italic text-stone-500 dark:text-stone-400">
                          {d.reflection}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setGeneratedPlanData(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-sans font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  Regerar / Alterar Tema
                </button>
                
                <button
                  type="button"
                  onClick={handleSaveAndStartPlan}
                  className="px-5 py-3 rounded-2xl bg-[#3E5641] hover:bg-[#324534] text-white font-sans font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Salvar e Iniciar este Plano</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
