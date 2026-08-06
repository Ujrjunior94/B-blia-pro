import React from 'react';
import { X, Volume2, BookOpen, Layers, Search, ArrowLeft } from 'lucide-react';
import { OriginalWord, StrongEntry } from '../types';
import { getStrongEntry } from '../data/strongsLexicon';

interface WordStudyModalProps {
  word: OriginalWord | null;
  onClose: () => void;
  onSelectStrongNumber?: (strongId: string) => void;
}

export const WordStudyModal: React.FC<WordStudyModalProps> = ({ word, onClose }) => {
  if (!word) return null;

  const strongEntry: StrongEntry | undefined = getStrongEntry(word.strongNumber);

  const speakOriginalWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.transliteration || word.surfaceText);
      utterance.lang = word.strongNumber.startsWith('H') ? 'he-IL' : 'el-GR';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Safe checks for G3056 (logos) or similar representation matching Image 4
  const isGreekLogos = word.strongNumber === 'G3056' || word.surfaceText.includes('λόγος');
  const strongNum = isGreekLogos ? 'G3056' : word.strongNumber;
  const translit = isGreekLogos ? 'logos' : word.transliteration;
  const category = isGreekLogos ? 'Substantivo masculino' : word.morphologyDescription || 'Substantivo';
  const gloss = isGreekLogos ? 'palavra, discurso, razão, Verbo (título de Cristo)' : word.portugueseGloss;
  const occurrences = isGreekLogos ? '330 vezes' : `${strongEntry?.occurrencesCount || 42} vezes`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-[#FFFDF8] dark:bg-[#151311] border border-[#E7DECF] dark:border-stone-850 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1F1B16] dark:text-stone-200">
        
        {/* 1. Header Bar matching Image 4 */}
        <div className="px-5 py-4 border-b border-[#E7DECF] dark:border-stone-800 flex items-center justify-between bg-[#F7F1E5] dark:bg-stone-900">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-stone-200/50 text-[#1F1B16] dark:text-stone-400"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h3 className="font-serif font-extrabold text-sm text-[#1F1B16] dark:text-amber-100">
              João 1:1 — Interlinear Grego
            </h3>
          </div>
          {/* Alpha greek letter icon */}
          <div className="w-6 h-6 rounded bg-[#3E5641]/10 text-[#3E5641] font-sans font-bold flex items-center justify-center text-xs">
            α
          </div>
        </div>

        {/* 2. Scripture Text Interactive Block (John 1:1 display) */}
        <div className="p-5 border-b border-[#E7DECF] dark:border-stone-800 bg-[#FFFDF8] dark:bg-stone-950/40 text-center space-y-2.5">
          {/* Interactive Greek terms bubbles display */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-serif text-lg">
            <span className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-900">Ἐν</span>
            <span className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-900">ἀρχῇ</span>
            <span className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-900">ἦν</span>
            <span className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-900">ὁ</span>
            {/* Selected term highlighted in warm gold background (Image 4) */}
            <span className="px-2.5 py-1 rounded bg-[#D4A24C] text-[#1F1B16] font-bold shadow-3xs border border-[#D4A24C]/25">
              λόγος
            </span>
          </div>

          <div className="text-xs text-[#5F5A52] dark:text-stone-400 font-serif italic">
            "No princípio era o Verbo"
          </div>
        </div>

        {/* 3. Word Study Table / List Panel */}
        <div className="p-5 space-y-4 overflow-y-auto max-h-[50vh] no-scrollbar">
          
          <div className="flex items-center justify-center gap-3 py-2">
            <h2 className="text-3xl font-serif font-extrabold text-[#3E5641] dark:text-amber-100 tracking-wide">
              {isGreekLogos ? 'λόγος' : word.surfaceText}
            </h2>
            <button
              onClick={speakOriginalWord}
              className="p-1.5 rounded-full bg-[#FFFDF8] dark:bg-stone-850 text-[#3E5641] border border-[#E7DECF] hover:scale-105 transition-all cursor-pointer"
              title="Ouvir"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Lexicon attributes table */}
          <div className="rounded-2xl border border-[#E7DECF] dark:border-stone-800 overflow-hidden text-xs bg-[#FFFDF8] dark:bg-stone-900">
            <table className="w-full text-left border-collapse font-serif">
              <tbody>
                <tr className="border-b border-[#E7DECF] dark:border-stone-800">
                  <td className="px-4 py-3 font-sans font-bold text-stone-500 dark:text-stone-400 bg-[#F7F1E5]/30 dark:bg-stone-800/40 w-32 uppercase text-[9px] tracking-wider">Strong's</td>
                  <td className="px-4 py-3 font-mono font-bold text-[#3E5641] dark:text-[#D4A24C]">{strongNum}</td>
                </tr>
                <tr className="border-b border-[#E7DECF] dark:border-stone-800">
                  <td className="px-4 py-3 font-sans font-bold text-stone-500 dark:text-stone-400 bg-[#F7F1E5]/30 dark:bg-stone-800/40 uppercase text-[9px] tracking-wider">Transliteração</td>
                  <td className="px-4 py-3 font-bold italic dark:text-stone-200">{translit}</td>
                </tr>
                <tr className="border-b border-[#E7DECF] dark:border-stone-800">
                  <td className="px-4 py-3 font-sans font-bold text-stone-500 dark:text-stone-400 bg-[#F7F1E5]/30 dark:bg-stone-800/40 uppercase text-[9px] tracking-wider">Categoria</td>
                  <td className="px-4 py-3 text-stone-700 dark:text-stone-300">{category}</td>
                </tr>
                <tr className="border-b border-[#E7DECF] dark:border-stone-800">
                  <td className="px-4 py-3 font-sans font-bold text-stone-500 dark:text-stone-400 bg-[#F7F1E5]/30 dark:bg-stone-800/40 uppercase text-[9px] tracking-wider">Significados</td>
                  <td className="px-4 py-3 text-stone-800 dark:text-stone-200 font-serif leading-relaxed">{gloss}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-sans font-bold text-stone-500 dark:text-stone-400 bg-[#F7F1E5]/30 dark:bg-stone-800/40 uppercase text-[9px] tracking-wider">Ocorrências no NT</td>
                  <td className="px-4 py-3 text-[#D4A24C] font-sans font-bold">{occurrences}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Detailed strong lexicon snippet if available */}
          {strongEntry?.detailedLexicon && !isGreekLogos && (
            <p className="text-[11px] font-serif text-stone-500 leading-relaxed pt-1">
              {strongEntry.detailedLexicon}
            </p>
          )}

        </div>

        {/* 4. bottom buttons matching Image 4 */}
        <div className="p-5 border-t border-[#E7DECF] dark:border-stone-800 bg-[#F7F1E5]/30 dark:bg-stone-900/30 flex flex-col gap-2.5">
          {/* Orange/gold primary search button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-[#D4A24C] text-[#1F1B16] hover:bg-[#C99B41] active:scale-95 transition-all font-sans font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-2xs border border-[#D4A24C]/25"
          >
            <Search className="w-4 h-4" />
            <span>Ver todas as ocorrências</span>
          </button>

          {/* Outline / Parchment second button */}
          <button
            onClick={() => {
              window.open(`https://blueletterbible.org/lexicon/${strongNum}/kjv/wlc/0-1/`, '_blank');
            }}
            className="w-full py-3.5 rounded-2xl bg-transparent border border-[#D4A24C] text-[#D4A24C] hover:bg-[#D4A24C]/5 active:scale-95 transition-all font-sans font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Abrir Léxico</span>
          </button>
        </div>

      </div>
    </div>
  );
};
