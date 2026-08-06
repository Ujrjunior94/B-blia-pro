import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Circle, Flame, Award, BookOpen, Clock, Target } from 'lucide-react';
import { ReadingPlan, UserPlanProgress } from '../types';
import { READING_PLANS } from '../data/readingPlansData';
import { localDB } from '../utils/db';
import { Desafio365View } from './Desafio365View';
import { CustomReadingPlanBuilder } from './CustomReadingPlanBuilder';

interface ReadingPlansViewProps {
  onOpenPassage?: (bookId: string, chapter: number) => void;
}

export const ReadingPlansView: React.FC<ReadingPlansViewProps> = ({ onOpenPassage }) => {
  const [subTab, setSubTab] = useState<'standard' | 'custom' | 'challenge'>('standard');
  const [selectedPlan, setSelectedPlan] = useState<ReadingPlan>(READING_PLANS[0]);
  const [progress, setProgress] = useState<UserPlanProgress>({
    planId: READING_PLANS[0].id,
    completedDays: [],
    startDate: new Date().toISOString(),
  });

  useEffect(() => {
    let isMounted = true;
    localDB.getPlanProgress(selectedPlan.id).then((saved) => {
      if (isMounted) {
        if (saved) {
          setProgress(saved);
        } else {
          const initial: UserPlanProgress = {
            planId: selectedPlan.id,
            completedDays: [],
            startDate: new Date().toISOString(),
          };
          setProgress(initial);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [selectedPlan.id]);

  const toggleDayCompletion = (dayNum: number) => {
    const isCompleted = progress.completedDays.includes(dayNum);
    const updatedDays = isCompleted
      ? progress.completedDays.filter((d) => d !== dayNum)
      : [...progress.completedDays, dayNum];

    const updatedProgress: UserPlanProgress = {
      ...progress,
      completedDays: updatedDays,
      lastReadDate: new Date().toISOString(),
    };

    setProgress(updatedProgress);
    localDB.savePlanProgress(updatedProgress);
  };

  const percentage = Math.round((progress.completedDays.length / selectedPlan.durationDays) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Top Toggle Switcher */}
      <div className="flex items-center gap-1.5 bg-amber-500/5 dark:bg-stone-900/40 p-1 rounded-2xl border border-amber-900/10 dark:border-stone-800 w-full sm:w-max">
        <button
          onClick={() => setSubTab('standard')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            subTab === 'standard'
              ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow-sm'
              : 'text-stone-600 dark:text-stone-300 hover:bg-amber-500/10'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Planos Gerais</span>
        </button>
        <button
          onClick={() => setSubTab('custom')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            subTab === 'custom'
              ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow-sm'
              : 'text-stone-600 dark:text-stone-300 hover:bg-amber-500/10'
          }`}
        >
          <Target className="w-4 h-4 text-amber-500" />
          <span>Planos Personalizados</span>
        </button>
        <button
          onClick={() => setSubTab('challenge')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            subTab === 'challenge'
              ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow-sm'
              : 'text-stone-600 dark:text-stone-300 hover:bg-amber-500/10'
          }`}
        >
          <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
          <span>Desafio 365 Dias</span>
        </button>
      </div>

      {subTab === 'custom' ? (
        <CustomReadingPlanBuilder onOpenPassage={onOpenPassage} />
      ) : subTab === 'challenge' ? (
        <Desafio365View onOpenPassage={onOpenPassage} />
      ) : (
        <>
          {/* Plans Top Banner */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-emerald-50 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>Disciplina e Devocional Diário</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold">Planos de Leitura da Bíblia</h2>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Desenvolva a constância diária de ler a Palavra de Deus. Acompanhe seu progresso, marque os dias concluídos e mantenha sua chama espiritual acesa!
              </p>
            </div>

            {/* Streak Counter */}
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-amber-100 shadow">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs text-emerald-300/80 uppercase font-mono font-bold">Dias Concluídos</span>
                <div className="text-2xl font-serif font-bold text-emerald-100">
                  {progress.completedDays.length} / {selectedPlan.durationDays}
                </div>
              </div>
            </div>
          </div>

          {/* Plan Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {READING_PLANS.map((plan) => {
              const isSelected = plan.id === selectedPlan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-900/10 border-emerald-600 dark:bg-emerald-950/40 dark:border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white dark:bg-stone-900 border-amber-900/10 dark:border-stone-800 hover:border-emerald-600/50'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {plan.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-stone-900 dark:text-amber-100 leading-snug">{plan.title}</h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">{plan.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {plan.durationDays} dias
                    </span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">Ver Plano →</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Plan Days Grid */}
          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-amber-900/15 dark:border-stone-800 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-amber-100">{selectedPlan.title}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{selectedPlan.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-64 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-stone-600 dark:text-stone-400">Progresso</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono">{percentage}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Days List */}
            <div className="space-y-3">
              {selectedPlan.days.map((dayItem) => {
                const isDone = progress.completedDays.includes(dayItem.day);
                return (
                  <div
                    key={dayItem.day}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isDone
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/40'
                        : 'bg-stone-50/50 dark:bg-stone-850 border-amber-900/5 dark:border-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleDayCompletion(dayItem.day)}
                        className="text-emerald-700 dark:text-emerald-400 hover:scale-110 transition-transform"
                      >
                        {isDone ? <CheckCircle className="w-6 h-6 fill-emerald-600 text-white dark:text-stone-900" /> : <Circle className="w-6 h-6 text-stone-400" />}
                      </button>
                      <div>
                        <span className="text-[11px] font-mono font-bold uppercase text-emerald-800 dark:text-emerald-400">
                          Dia {dayItem.day}
                        </span>
                        <h4 className="font-serif font-semibold text-sm text-stone-900 dark:text-stone-100">{dayItem.title}</h4>
                      </div>
                    </div>

                    {/* Passages List */}
                    <div className="flex flex-wrap items-center gap-2">
                      {dayItem.passages.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => onOpenPassage && onOpenPassage(p.bookId, p.chapter)}
                          className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 text-xs font-serif font-bold text-amber-900 dark:text-amber-200 border border-amber-900/10 dark:border-stone-700 hover:bg-amber-100/60 transition-colors flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                          <span>
                            {p.bookId} cap. {p.chapter}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
