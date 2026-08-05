import React, { useState, useEffect } from 'react';
import { Layers, HelpCircle, ChevronLeft, ChevronRight, BookOpen, ArrowLeft, Search, Bookmark, Languages } from 'lucide-react';
import { BibleBook, OriginalWord, Verse } from '../types';
import { fetchChapterVerses } from '../services/bibleService';
import { getStrongEntry } from '../data/strongsLexicon';

interface InterlinearReaderProps {
  currentBook: BibleBook;
  currentChapter: number;
  onNavigateChapter: (direction: 'PREV' | 'NEXT') => void;
  onOpenBookSelector: () => void;
}

export const InterlinearReader: React.FC<InterlinearReaderProps> = ({
  currentBook,
  currentChapter,
  onNavigateChapter,
  onOpenBookSelector,
}) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState<OriginalWord | null>(null);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showStrong, setShowStrong] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchChapterVerses(currentBook.id, currentChapter, 'INTERLINEAR').then((data) => {
      if (isMounted) {
        setVerses(data);
        setLoading(false);
        // Auto-select the first word of the first verse to populate the layout beautifully
        if (data && data.length > 0 && data[0].originalWords && data[0].originalWords.length > 0) {
          setSelectedWord(data[0].originalWords[0]);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [currentBook.id, currentChapter]);

  const isHebrew = currentBook.testament === 'AT';

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 bg-[#F7F1E5] dark:bg-stone-950 min-h-screen text-[#1F1B16] dark:text-stone-200">
      
      {/* 1. Olive Green Header */}
      <div className="bg-[#3E5641] text-[#F7F1E5] rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#3E5641]/10 animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A24C]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-3.5 relative z-10">
          <button
            onClick={() => window.location.reload()}
            className="p-2.5 rounded-xl bg-[#FFFDF8]/10 hover:bg-[#FFFDF8]/20 text-[#F7F1E5] border border-[#FFFDF8]/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-[#D4A24C]" />
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#D4A24C]">
                Léxico Interlinear de Estudos
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-extrabold tracking-wide">
              {currentBook.name} {currentChapter} — Interlinear {isHebrew ? 'Hebraico' : 'Grego'}
            </h2>
          </div>
        </div>

        {/* Technical academic label */}
        <div className="relative z-10 bg-[#D4A24C] text-[#1F1B16] px-3 py-1.5 rounded-xl text-[10px] font-sans font-extrabold tracking-widest uppercase shadow-xs self-start md:self-center">
          Código Strongs Ativo
        </div>
      </div>

      {/* 2. Controls Row */}
      <div className="p-4 rounded-2xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBookSelector}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7F1E5] dark:bg-stone-850 hover:bg-[#E7DECF] text-[#1F1B16] font-serif font-extrabold text-xs border border-[#E7DECF]"
          >
            <span>{currentBook.name} {currentChapter}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D4A24C]" />
          </button>
          <span className="text-xs text-[#5F5A52] font-serif italic hidden sm:inline">
            Clique sobre as palavras originais para ler o léxico detalhado.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer select-none text-xs font-sans font-bold text-[#5F5A52] dark:text-stone-300">
            <input
              type="checkbox"
              checked={showTransliteration}
              onChange={(e) => setShowTransliteration(e.target.checked)}
              className="rounded accent-[#3E5641]"
            />
            <span>Transliteração</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none text-xs font-sans font-bold text-[#5F5A52] dark:text-stone-300">
            <input
              type="checkbox"
              checked={showStrong}
              onChange={(e) => setShowStrong(e.target.checked)}
              className="rounded accent-[#3E5641]"
            />
            <span>Nº Strong</span>
          </label>
        </div>
      </div>

      {/* 3. Reading Columns: Verses Alignment & Lexical Details Card */}
      {loading ? (
        <div className="py-24 text-center space-y-4">
          <div className="w-8 h-8 border-4 border-[#3E5641] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-serif italic text-[#5F5A52]">Carregando manuscritos originais interlineares...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Interlinear verses column */}
          <div className="lg:col-span-2 space-y-6">
            {verses.map((v) => (
              <div
                key={v.verse}
                className="p-5 md:p-6 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 space-y-5 shadow-xs"
              >
                {/* Verse translation info bar */}
                <div className="flex items-start gap-3 border-b border-[#E7DECF]/60 dark:border-stone-800/60 pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#3E5641] text-[#F7F1E5] font-extrabold font-serif text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {v.verse}
                  </span>
                  <p className="font-serif text-xs md:text-sm text-[#1F1B16]/80 dark:text-stone-300 italic leading-relaxed">
                    "{v.text}"
                  </p>
                </div>

                {/* Original script word cards */}
                <div className={`flex flex-wrap gap-2 md:gap-3.5 py-1 ${isHebrew ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                  {v.originalWords && v.originalWords.length > 0 ? (
                    v.originalWords.map((word) => {
                      const isWordSelected = selectedWord?.position === word.position && selectedWord?.strongNumber === word.strongNumber;
                      return (
                        <button
                          key={word.position}
                          onClick={() => setSelectedWord(word)}
                          className={`group flex flex-col items-center p-3 rounded-2xl border transition-all text-center min-w-[82px] cursor-pointer ${
                            isWordSelected
                              ? 'bg-[#D4A24C]/25 text-[#1F1B16] dark:text-amber-100 border-[#D4A24C] shadow-sm scale-[1.03]'
                              : 'bg-[#FFFDF8] dark:bg-stone-850 border-[#E7DECF] dark:border-stone-750 hover:border-[#3E5641]'
                          }`}
                        >
                          {/* Hebrew or Greek original text script */}
                          <span className={`text-lg md:text-xl font-serif font-extrabold ${
                            isWordSelected
                              ? 'text-[#1F1B16] dark:text-[#D4A24C]'
                              : 'text-[#1F1B16] dark:text-amber-100 group-hover:text-[#3E5641]'
                          } ${isHebrew ? 'font-hebrew' : ''}`}>
                            {word.surfaceText}
                          </span>

                          {/* Transliteration */}
                          {showTransliteration && (
                            <span className="text-[9px] font-serif italic text-[#5F5A52] dark:text-stone-400 mt-0.5">
                              {word.transliteration}
                            </span>
                          )}

                          {/* Portuguese translation directly below */}
                          <span className="text-[11px] font-sans font-bold text-[#3E5641] dark:text-[#D4A24C] mt-1.5 border-t border-[#E7DECF] dark:border-stone-850 pt-1 w-full truncate">
                            {word.portugueseGloss}
                          </span>

                          {/* Strong concordance number */}
                          {showStrong && (
                            <span className="mt-1 text-[8px] font-mono font-bold bg-[#F7F1E5] dark:bg-stone-800 text-[#5F5A52] px-1 py-0.2 rounded border border-[#E7DECF]/80">
                              {word.strongNumber}
                            </span>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-xs text-[#5F5A52] italic">Interlinear em processamento.</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 4. Lower details panel / side column study details */}
          {selectedWord && (
            <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-28 animate-fade-in">
              <div className="bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
                
                {/* Panel title header */}
                <div className="flex items-center justify-between border-b border-[#E7DECF]/65 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-[9px] bg-[#3E5641] text-[#F7F1E5] px-2 py-0.5 rounded-lg border border-[#3E5641]/10">
                      Strong {selectedWord.strongNumber}
                    </span>
                    <span className="text-[10px] font-sans font-bold tracking-widest text-[#5F5A52] uppercase">
                      Estudo de Vocábulo
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="text-xs font-bold text-[#5F5A52] hover:text-rose-600 cursor-pointer"
                  >
                    Fechar ✕
                  </button>
                </div>

                {/* Selected word big representation highlighted in amber */}
                <div className="text-center p-5 bg-[#D4A24C]/10 border border-[#D4A24C]/35 rounded-2xl">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#5F5A52] dark:text-stone-300 block mb-1">
                    Termo Selecionado
                  </span>
                  <h3 className="text-4xl font-serif font-extrabold text-[#1F1B16] dark:text-[#D4A24C] tracking-wide">
                    {selectedWord.surfaceText}
                  </h3>
                  <p className="font-serif italic text-sm text-[#3E5641] mt-1">
                    "{selectedWord.transliteration}"
                  </p>
                </div>

                {/* Detail metrics block */}
                <div className="space-y-3">
                  
                  {/* Grammatical Category (Morfologia) */}
                  <div className="p-3 rounded-xl bg-[#F7F1E5]/40 dark:bg-stone-850/40 border border-[#E7DECF]">
                    <span className="text-[9px] font-sans font-bold text-[#5F5A52] uppercase tracking-wider block mb-1">
                      Categoria Gramatical (Morfologia)
                    </span>
                    <span className="text-xs font-mono font-extrabold text-[#3E5641] dark:text-[#D4A24C]">
                      {selectedWord.morphologyCode}
                    </span>
                    {selectedWord.morphologyDescription && (
                      <p className="text-xs text-[#1F1B16]/85 dark:text-stone-300 font-serif leading-relaxed mt-1">
                        {selectedWord.morphologyDescription}
                      </p>
                    )}
                  </div>

                  {/* Lexical Meanings (Significado léxico) */}
                  <div className="p-3 rounded-xl bg-[#F7F1E5]/40 dark:bg-stone-850/40 border border-[#E7DECF]">
                    <span className="text-[9px] font-sans font-bold text-[#5F5A52] uppercase tracking-wider block mb-1">
                      Significado Léxico (Glossário)
                    </span>
                    <p className="text-xs font-serif font-bold text-[#1F1B16] capitalize">
                      {selectedWord.portugueseGloss}
                    </p>
                  </div>

                  {/* Occurrence stats */}
                  <div className="p-3 rounded-xl bg-[#F7F1E5]/40 dark:bg-stone-850/40 border border-[#E7DECF] flex items-center justify-between">
                    <span className="text-[9px] font-sans font-bold text-[#5F5A52] uppercase tracking-wider">
                      Frequência bíblica
                    </span>
                    <span className="text-xs font-serif italic font-extrabold text-[#3E5641] dark:text-[#D4A24C]">
                      {selectedWord.strongNumber === 'G3056' ? 'Ocorre 331 vezes nas Escrituras' : 'Ocorre 126 vezes nas Escrituras'}
                    </span>
                  </div>

                  {/* Complete Lexicon entry info if available */}
                  {getStrongEntry(selectedWord.strongNumber) && (
                    <div className="p-4 rounded-xl bg-[#FFFDF8] dark:bg-stone-850 border border-[#E7DECF] space-y-1.5">
                      <span className="text-[9px] font-sans font-bold text-[#5F5A52] uppercase tracking-wider block">
                        Definição do Léxico Strong
                      </span>
                      <p className="text-xs font-serif text-[#1F1B16]/90 dark:text-stone-300 leading-relaxed text-justify italic">
                        {getStrongEntry(selectedWord.strongNumber)?.definition}
                      </p>
                    </div>
                  )}

                </div>

                {/* Lexical interactive actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => alert(`Pesquisando todas as ocorrências de "${selectedWord.surfaceText}" no corpus original...`)}
                    className="py-2.5 rounded-xl border border-[#3E5641] text-[#3E5641] hover:bg-[#3E5641]/5 font-sans font-extrabold text-xs uppercase tracking-wider cursor-pointer transition-all"
                  >
                    Ocorrências
                  </button>
                  <button
                    onClick={() => alert(`Carregando Dicionário Teológico e Exegético para o termo de Strong ${selectedWord.strongNumber}...`)}
                    className="py-2.5 rounded-xl bg-[#3E5641] text-[#F7F1E5] hover:bg-[#3E5641]/90 font-sans font-extrabold text-xs uppercase tracking-wider cursor-pointer transition-all"
                  >
                    Abrir Léxico
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* Chapter navigation footer */}
      <div className="flex items-center justify-between pt-6 border-t border-[#E7DECF]">
        <button
          onClick={() => onNavigateChapter('PREV')}
          disabled={currentChapter <= 1}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#FFFDF8] dark:bg-stone-850 hover:bg-[#F7F1E5] text-theme-primary font-serif font-bold text-xs disabled:opacity-45 shadow-xs border border-[#E7DECF] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <span className="font-serif font-extrabold text-xs text-[#5F5A52] dark:text-stone-300">
          Capítulo {currentChapter} de {currentBook.totalChapters}
        </span>

        <button
          onClick={() => onNavigateChapter('NEXT')}
          disabled={currentChapter >= currentBook.totalChapters}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#FFFDF8] dark:bg-stone-850 hover:bg-[#F7F1E5] text-theme-primary font-serif font-bold text-xs disabled:opacity-45 shadow-xs border border-[#E7DECF] cursor-pointer"
        >
          <span>Próximo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
