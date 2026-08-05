import React, { useState } from 'react';
import { Search, Users, Sparkles, Heart, HelpCircle, BookOpen, ArrowRight, UserCheck } from 'lucide-react';
import { BIBLICAL_CHARACTERS, BiblicalCharacter } from '../data/charactersData';

export const CharactersView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  const categories = [
    { code: 'ALL', label: 'Todos os Personagens' },
    { code: 'Patriarcas', label: 'Patriarcas' },
    { code: 'Reis', label: 'Reis' },
    { code: 'Profetas', label: 'Profetas' },
    { code: 'Mulheres da Bíblia', label: 'Mulheres da Bíblia' },
    { code: 'Apóstolos', label: 'Apóstolos' },
  ];

  // Filter based on search query and category
  const filteredCharacters = BIBLICAL_CHARACTERS.filter((char) => {
    const matchesCategory = activeCategory === 'ALL' || char.category === activeCategory;
    
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName = char.name.toLowerCase().includes(query);
    const matchesMeaning = char.meaning.toLowerCase().includes(query);
    const matchesBio = char.biography.toLowerCase().includes(query);
    const matchesBooks = char.books.some(b => b.toLowerCase().includes(query));

    return matchesCategory && (matchesName || matchesMeaning || matchesBio || matchesBooks);
  });

  const selectedCharacter = selectedCharId 
    ? BIBLICAL_CHARACTERS.find(c => c.id === selectedCharId) 
    : filteredCharacters[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Banner / Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-amber-950 to-stone-950 text-amber-50 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Users className="w-3.5 h-3.5" />
            <span>Galeria de Heróis da Fé e Personagens</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">Personagens Bíblicos</h2>
          <p className="text-amber-150/80 text-sm leading-relaxed">
            Explore a biografia de homens e mulheres das Escrituras. Entenda as suas provações, falhas e virtudes, 
            e acima de tudo, enxergue como as suas vidas compõem o grande tapete redentor que aponta para Jesus Cristo.
          </p>
        </div>
      </div>

      {/* Main Grid: list of characters on left, detail view on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Search Bar, Category Filters & List (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Busque por nome, livro ou significado..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-theme-app border border-theme rounded-2xl text-theme-primary placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Category Pill Filters */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.code}
                  onClick={() => {
                    setActiveCategory(cat.code);
                    setSelectedCharId(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    activeCategory === cat.code
                      ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow'
                      : 'bg-theme-app text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 border border-theme'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Characters Scroll List */}
          <div className="p-4 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-2 max-h-[460px] overflow-y-auto no-scrollbar">
            {filteredCharacters.length === 0 ? (
              <div className="py-12 text-center text-xs text-theme-muted font-serif italic">
                Nenhum personagem encontrado com os filtros atuais.
              </div>
            ) : (
              filteredCharacters.map((char) => {
                const isSelected = selectedCharacter ? char.id === selectedCharacter.id : false;
                return (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharId(char.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'bg-amber-800/10 border-amber-800/30 dark:bg-amber-950/20 dark:border-amber-600 shadow-sm ring-1 ring-amber-500/10'
                        : 'bg-theme-app border-theme hover:bg-theme-card-hover'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-serif font-bold text-theme-primary">
                          {char.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300 font-semibold">
                          {char.category}
                        </span>
                      </div>
                      <div className="text-xs text-theme-muted font-serif truncate max-w-[260px]">
                        Significado: <span className="font-semibold italic text-theme-primary">"{char.meaning}"</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-amber-700' : 'text-stone-400'}`} />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Character Profile Details (7 columns) */}
        <div className="lg:col-span-7">
          {selectedCharacter ? (
            <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-6">
              
              {/* Profile Header Card */}
              <div className="border-b border-theme pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400">
                    {selectedCharacter.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-theme-primary">
                    {selectedCharacter.name}
                  </h1>
                  <p className="text-sm font-serif italic text-theme-muted">
                    Significado do Nome: <span className="font-bold text-amber-900 dark:text-amber-300">"{selectedCharacter.meaning}"</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-theme-app border border-theme text-left sm:text-right">
                  <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 font-bold uppercase block">Passagens Chave</span>
                  <span className="font-serif text-xs font-bold text-theme-primary block mt-0.5">{selectedCharacter.passages}</span>
                  <div className="flex gap-1 flex-wrap mt-2 sm:justify-end">
                    {selectedCharacter.books.map((b) => (
                      <span key={b} className="text-[9px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-theme font-semibold">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Biography Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold uppercase text-stone-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Biografia Bíblica</span>
                </h3>
                <p className="font-serif leading-relaxed text-theme-secondary text-sm md:text-base">
                  {selectedCharacter.biography}
                </p>
              </div>

              {/* Relationships Section */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-mono font-bold uppercase text-stone-500">Relações & Parentescos</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCharacter.relationships.map((rel) => (
                    <span key={rel} className="px-3 py-1.5 text-xs rounded-xl bg-theme-app border border-theme font-medium text-theme-primary">
                      {rel}
                    </span>
                  ))}
                </div>
              </div>

              {/* Christ-Connection (Cristocentrismo) Section */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-950/5 via-amber-900/5 to-rose-950/5 dark:from-stone-850 dark:to-stone-900 border border-rose-900/10 dark:border-rose-800/20 space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-700 text-white font-serif flex items-center justify-center font-bold text-lg shadow">
                    ✝
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-serif font-bold text-theme-primary">
                      Como {selectedCharacter.name} aponta para Cristo?
                    </h3>
                    <p className="text-[10px] text-rose-900/70 dark:text-rose-300/80 font-mono uppercase tracking-wider font-semibold">
                      Tipologia Bíblica e Cumprimento Redentor
                    </p>
                  </div>
                </div>
                <p className="font-serif text-sm leading-relaxed text-theme-secondary">
                  {selectedCharacter.pointingToChrist}
                </p>
              </div>

              {/* Character Lessons Checklist */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono font-bold uppercase text-stone-500 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Lições Espirituais Principais</span>
                </h3>
                <div className="space-y-2">
                  {selectedCharacter.lessons.map((lesson, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-theme-app border border-theme flex items-start gap-3 text-xs sm:text-sm text-theme-primary">
                      <span className="w-5 h-5 rounded-full bg-amber-800/10 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-serif leading-relaxed">{lesson}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Application */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-stone-850 border border-emerald-900/10 dark:border-stone-800 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-emerald-900 dark:text-emerald-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Aplicação Prática para sua vida de fé</span>
                </h4>
                <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed font-sans">
                  {selectedCharacter.practicalApplication}
                </p>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center border border-theme rounded-3xl bg-theme-card text-theme-muted font-serif italic">
              Selecione um personagem na galeria para visualizar o perfil teológico completo.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
