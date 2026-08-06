import React, { useState } from 'react';
import { Search, Book, Sparkles, HelpCircle, ArrowRight, Layers, Star, Zap, BookmarkCheck, CheckCircle2 } from 'lucide-react';
import { STRONGS_LEXICON } from '../data/strongsLexicon';
import { StrongEntry } from '../types';

export const DictionaryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTestament, setActiveTestament] = useState<'ALL' | 'AT' | 'NT'>('ALL');
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  // Quick chips for rapid topic lookup
  const QUICK_TOPICS = [
    { label: '✨ Graça', query: 'charis', strongId: 'G5485' },
    { label: '🛡️ Fé', query: 'pistis', strongId: 'G4102' },
    { label: '🔥 Espírito', query: 'pneuma', strongId: 'G4151' },
    { label: '❤️ Amor', query: 'agape', strongId: 'G26' },
    { label: '🕊️ Consolador', query: 'parakletos', strongId: 'G3875' },
    { label: '⚖️ Justiça', query: 'dikaiosyne', strongId: 'G1343' },
    { label: '✝️ Redenção', query: 'apolytrosis', strongId: 'G629' },
    { label: '📜 Aliança', query: 'berith', strongId: 'H1285' },
    { label: '🌱 Arrependimento', query: 'metanoia', strongId: 'G3341' },
    { label: '🕊️ Paz (Shalom)', query: 'shalom', strongId: 'H7965' },
    { label: '👑 Cristo', query: 'christos', strongId: 'G5547' },
  ];

  // Filter lexicon entries based on search query and active testament
  const lexiconEntries = Object.values(STRONGS_LEXICON);

  const filteredEntries = lexiconEntries.filter((entry) => {
    const matchesTestament = activeTestament === 'ALL' || entry.testament === activeTestament;
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesTestament;

    const matchesWord = entry.originalWord.toLowerCase().includes(query);
    const matchesTranslit = entry.transliteration.toLowerCase().includes(query);
    const matchesStrong = entry.id.toLowerCase().includes(query);
    const matchesGloss = entry.portugueseGloss.toLowerCase().includes(query);
    const matchesDef = entry.definition.toLowerCase().includes(query);
    const matchesCategory = entry.biblicalCategory.toLowerCase().includes(query);

    return matchesTestament && (matchesWord || matchesTranslit || matchesStrong || matchesGloss || matchesDef || matchesCategory);
  });

  const selectedEntry = selectedWordId ? STRONGS_LEXICON[selectedWordId] : filteredEntries[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Banner / Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-amber-50 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Book className="w-3.5 h-3.5" />
            <span>Dicionário Bíblico (Hebraico & Grego)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">Léxico Teológico Strong</h2>
          <p className="text-amber-150/80 text-sm leading-relaxed">
            Pesquise as raízes dos termos bíblicos. Desvele o significado preciso do hebraico (Antigo Testamento) 
            e grego (Novo Testamento) com explicações gramaticais, contagem de ocorrências e contexto teológico.
          </p>
        </div>
      </div>

      {/* COMPONENTE DE BUSCA RÁPIDA DE TERMOS BÍBLICOS (USER REQUEST) */}
      <div className="p-5 md:p-6 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-theme-primary">
                Busca Rápida de Termos Bíblicos & Teológicos
              </h3>
              <p className="text-[11px] text-theme-muted font-sans">
                Clique nos tópicos bíblicos essenciais ou digite termos-chave para definições teológicas instantâneas
              </p>
            </div>
          </div>
        </div>

        {/* Preset Topic Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic.label}
              onClick={() => {
                setSearchQuery(topic.query);
                if (topic.strongId && STRONGS_LEXICON[topic.strongId]) {
                  setSelectedWordId(topic.strongId);
                }
              }}
              className="px-3 py-1.5 rounded-full bg-theme-app border border-theme hover:border-amber-500/50 text-xs font-sans font-medium text-theme-primary hover:text-amber-700 dark:hover:text-amber-300 transition-all cursor-pointer shrink-0 shadow-2xs"
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Search and List on Left, Detail Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Search Bar, Filters & Word List (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Busque por palavra, significado ou nº Strong..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-theme-app border border-theme rounded-2xl text-theme-primary placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Language/Testament Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-theme-app border border-theme rounded-xl">
              <button
                onClick={() => {
                  setActiveTestament('ALL');
                  setSelectedWordId(null);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTestament === 'ALL'
                    ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => {
                  setActiveTestament('AT');
                  setSelectedWordId(null);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTestament === 'AT'
                    ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                }`}
              >
                Hebraico (AT)
              </button>
              <button
                onClick={() => {
                  setActiveTestament('NT');
                  setSelectedWordId(null);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTestament === 'NT'
                    ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                }`}
              >
                Grego (NT)
              </button>
            </div>
          </div>

          {/* Word Scroll List */}
          <div className="p-4 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-2 max-h-[460px] overflow-y-auto no-scrollbar">
            {filteredEntries.length === 0 ? (
              <div className="py-12 text-center text-xs text-theme-muted font-serif italic">
                Nenhum termo encontrado para sua busca.
              </div>
            ) : (
              filteredEntries.map((entry) => {
                const isSelected = selectedEntry ? entry.id === selectedEntry.id : false;
                return (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedWordId(entry.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-800/10 border-amber-800/30 dark:bg-amber-950/20 dark:border-amber-600 shadow-sm ring-1 ring-amber-500/10'
                        : 'bg-theme-app border-theme hover:bg-theme-card-hover'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-serif font-bold ${entry.testament === 'AT' ? 'text-emerald-700 dark:text-emerald-400 font-hebrew' : 'text-indigo-600 dark:text-indigo-400'}`}>
                          {entry.originalWord}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-bold">
                          {entry.id}
                        </span>
                      </div>
                      <div className="text-xs font-serif italic text-theme-primary font-semibold">
                        {entry.transliteration} &bull; <span className="text-theme-muted font-sans font-normal">{entry.portugueseGloss}</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-amber-700' : 'text-stone-400'}`} />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Detailed Word Information Panel (7 columns) */}
        <div className="lg:col-span-7">
          {selectedEntry ? (
            <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-6">
              
              {/* Entry header with big original word */}
              <div className="border-b border-theme pb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-3xl md:text-5xl font-serif font-bold ${selectedEntry.testament === 'AT' ? 'text-emerald-800 dark:text-emerald-400 font-hebrew' : 'text-indigo-700 dark:text-indigo-400'}`}>
                      {selectedEntry.originalWord}
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300">
                      Strong {selectedEntry.id}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-theme-primary">
                    {selectedEntry.transliteration} <span className="text-sm text-theme-muted font-sans font-normal">({selectedEntry.pronunciation})</span>
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold uppercase px-3 py-1.5 rounded-full bg-theme-app border border-theme text-theme-muted">
                    {selectedEntry.testament === 'AT' ? 'Hebraico (AT)' : 'Grego (NT)'}
                  </span>
                  <div className="text-[10px] text-theme-muted mt-1.5 font-sans font-semibold">
                    {selectedEntry.occurrencesCount} ocorrências bíblicas
                  </div>
                </div>
              </div>

              {/* Grammar / Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-theme-app border border-theme">
                  <span className="text-[10px] uppercase font-mono font-bold text-theme-muted">Classificação Gramatical</span>
                  <p className="font-serif font-semibold text-sm text-theme-primary mt-1">{selectedEntry.wordType}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-theme-app border border-theme">
                  <span className="text-[10px] uppercase font-mono font-bold text-theme-muted">Categoria Bíblica</span>
                  <p className="font-serif font-semibold text-sm text-theme-primary mt-1">{selectedEntry.biblicalCategory}</p>
                </div>
              </div>

              {/* Lexicon definition */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-stone-500">Definição Teológica Breve (Contexto das Escrituras)</h4>
                <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/20 text-theme-primary font-serif text-sm sm:text-base leading-relaxed">
                  {selectedEntry.definition}
                  {selectedEntry.keyVerseReference && (
                    <div className="mt-2 text-xs font-sans font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      <span>Versículo-Chave: {selectedEntry.keyVerseReference}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Lexicon study */}
              <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-stone-850 border border-amber-900/10 dark:border-stone-800 space-y-2.5">
                <h4 className="text-xs font-mono font-bold uppercase text-amber-900 dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Estudo Filológico e Teológico</span>
                </h4>
                <p className="font-serif text-xs sm:text-sm leading-relaxed text-theme-secondary">
                  {selectedEntry.detailedLexicon}
                </p>
              </div>

              {/* Sample Occurrences */}
              {selectedEntry.occurrencesSample && selectedEntry.occurrencesSample.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-theme">
                  <h4 className="text-xs font-mono font-bold uppercase text-stone-500 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Ocorrências Principais nas Escrituras</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedEntry.occurrencesSample.map((sample, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-theme-app border border-theme flex flex-col gap-1">
                        <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">{sample.reference}</span>
                        <p className="font-serif text-xs sm:text-sm text-theme-primary leading-tight">
                          {sample.textSnippet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center border border-theme rounded-3xl bg-theme-card text-theme-muted font-serif italic">
              Selecione uma palavra na lista para ver o estudo léxico completo.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

