import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Users, 
  Sparkles, 
  Heart, 
  BookOpen, 
  ArrowRight, 
  UserCheck, 
  Compass, 
  Shuffle, 
  Copy, 
  Check, 
  Bookmark, 
  Share2, 
  Quote, 
  Info, 
  Layers, 
  ChevronRight, 
  Award, 
  Flame,
  Filter,
  Clock,
  GitCommit
} from 'lucide-react';
import { BIBLICAL_CHARACTERS, BiblicalCharacter } from '../data/charactersData';
import { TIMELINE_EVENTS, GENEALOGY_NODES } from '../data/timelineGenealogyData';

export const CharactersView: React.FC = () => {
  const [subView, setSubView] = useState<'gallery' | 'timeline' | 'genealogy'>('gallery');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeTestament, setActiveTestament] = useState<string>('ALL');
  const [selectedCharId, setSelectedCharId] = useState<string | null>('abraao');
  const [activeDetailTab, setActiveDetailTab] = useState<'bio' | 'christ' | 'lessons' | 'relations' | 'facts'>('bio');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(() => {
    const local = localStorage.getItem('jornada_biblia_fav_characters');
    return local ? JSON.parse(local) : [];
  });

  const categories = [
    { code: 'ALL', label: 'Todos os Grupos' },
    { code: 'Patriarcas', label: 'Patriarcas' },
    { code: 'Reis', label: 'Reis' },
    { code: 'Profetas', label: 'Profetas' },
    { code: 'Mulheres da Bíblia', label: 'Mulheres da Bíblia' },
    { code: 'Apóstolos', label: 'Apóstolos' },
    { code: 'Líderes e Juízes', label: 'Líderes e Juízes' },
  ];

  const testaments = [
    { code: 'ALL', label: 'Todos os Testamentos' },
    { code: 'Antigo Testamento', label: 'Antigo Testamento' },
    { code: 'Novo Testamento', label: 'Novo Testamento' },
  ];

  // Filter based on search query, category, and testament
  const filteredCharacters = useMemo(() => {
    return BIBLICAL_CHARACTERS.filter((char) => {
      const matchesCategory = activeCategory === 'ALL' || char.category === activeCategory;
      const matchesTestament = activeTestament === 'ALL' || char.testament === activeTestament;
      
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory && matchesTestament;

      const matchesName = char.name.toLowerCase().includes(query);
      const matchesMeaning = char.meaning.toLowerCase().includes(query);
      const matchesBio = char.biography.toLowerCase().includes(query);
      const matchesBooks = char.books.some(b => b.toLowerCase().includes(query));
      const matchesPeriod = char.period.toLowerCase().includes(query);
      const matchesLessons = char.lessons.some(l => l.toLowerCase().includes(query));
      const matchesApp = char.practicalApplication.toLowerCase().includes(query);

      return matchesCategory && matchesTestament && (
        matchesName || matchesMeaning || matchesBio || matchesBooks || matchesPeriod || matchesLessons || matchesApp
      );
    });
  }, [searchQuery, activeCategory, activeTestament]);

  const selectedCharacter = useMemo(() => {
    if (selectedCharId) {
      const found = BIBLICAL_CHARACTERS.find(c => c.id === selectedCharId);
      if (found) return found;
    }
    return filteredCharacters[0] || BIBLICAL_CHARACTERS[0];
  }, [selectedCharId, filteredCharacters]);

  const handleRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * BIBLICAL_CHARACTERS.length);
    const randomChar = BIBLICAL_CHARACTERS[randomIndex];
    setSelectedCharId(randomChar.id);
  };

  const toggleFavorite = (id: string) => {
    let updated: string[];
    if (savedFavorites.includes(id)) {
      updated = savedFavorites.filter(favId => favId !== id);
    } else {
      updated = [...savedFavorites, id];
    }
    setSavedFavorites(updated);
    localStorage.setItem('jornada_biblia_fav_characters', JSON.stringify(updated));
  };

  const handleCopySummary = () => {
    if (!selectedCharacter) return;
    const textToCopy = `📌 Personagem Bíblico: ${selectedCharacter.name} (${selectedCharacter.meaning})
📖 Passagens: ${selectedCharacter.passages}
⏳ Época: ${selectedCharacter.period}
✝️ Como aponta para Cristo: ${selectedCharacter.pointingToChrist}
💡 Lição Prática: ${selectedCharacter.practicalApplication}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 text-theme-primary font-modern pb-24 animate-fade-in">
      
      {/* 1. Header Banner */}
      <div className="p-6 md:p-10 rounded-3xl bg-gradient-to-br from-stone-900 via-[#2C2117] to-amber-950 text-amber-50 shadow-xl relative overflow-hidden border border-amber-900/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-sans font-bold border border-amber-500/30 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>Dicionário & Galeria Exegética</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-classic font-bold text-amber-100 tracking-tight">
              Personagens Bíblicos
            </h1>
            <p className="text-amber-200/80 text-sm md:text-base font-manuscript leading-relaxed">
              Explore as biografias, virtudes, provações e a conexão cristocêntrica das grandes figuras das Escrituras. 
              Entenda como cada vida reflete o plano redentor de Deus ao longo das Eras.
            </p>
          </div>

          {/* Quick Action & Stats Cards */}
          <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 shrink-0">
            <button
              onClick={handleRandomCharacter}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-sans font-bold text-xs border border-amber-400/30 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95"
              title="Descobrir um personagem aleatório"
            >
              <Shuffle className="w-4 h-4 text-amber-400" />
              <span>Personagem Aleatório</span>
            </button>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 text-center flex items-center justify-around gap-4">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-300/70 block">Total</span>
                <span className="text-lg font-classic font-bold text-amber-100">{BIBLICAL_CHARACTERS.length}</span>
              </div>
              <div className="w-[1px] h-6 bg-amber-500/20" />
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-300/70 block">Favoritos</span>
                <span className="text-lg font-classic font-bold text-amber-400">{savedFavorites.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1.5 SubView Switcher Toolbar */}
      <div className="flex items-center justify-start gap-2 p-1.5 bg-theme-card border border-theme rounded-2xl shadow-sm overflow-x-auto">
        <button
          onClick={() => setSubView('gallery')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            subView === 'gallery'
              ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow-sm'
              : 'text-theme-muted hover:text-theme-primary hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Galeria de Personagens</span>
        </button>

        <button
          onClick={() => setSubView('timeline')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            subView === 'timeline'
              ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow-sm'
              : 'text-theme-muted hover:text-theme-primary hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Linha do Tempo Bíblica</span>
        </button>

        <button
          onClick={() => setSubView('genealogy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            subView === 'genealogy'
              ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow-sm'
              : 'text-theme-muted hover:text-theme-primary hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <GitCommit className="w-4 h-4 text-rose-400" />
          <span>Árvore Genealógica Messiânica</span>
        </button>
      </div>

      {subView === 'timeline' && (
        <div className="p-6 md:p-8 bg-theme-card border border-theme rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-theme pb-4">
            <div>
              <h2 className="text-xl font-classic font-bold text-theme-primary">Linha do Tempo Histórico-Bíblica</h2>
              <p className="text-xs text-theme-muted">Reis, profetas, apóstolos, imperadores e grandes marcos da História da Redenção</p>
            </div>
          </div>

          <div className="relative border-l-2 border-amber-500/40 dark:border-amber-500/20 ml-4 pl-6 space-y-8">
            {TIMELINE_EVENTS.map((event) => (
              <div key={event.id} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-600 border-4 border-theme-card group-hover:scale-125 transition-all" />
                <div className="p-5 rounded-2xl bg-theme-app border border-theme hover:border-amber-500/30 transition-all space-y-2 cls-card-md">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                      {event.year} — {event.period}
                    </span>
                    <span className="text-xs font-mono font-semibold text-theme-accent">
                      {event.passageRef}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-theme-primary">{event.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-theme-muted">
                    <span>👑 Figura: <strong className="text-theme-primary">{event.keyFigure}</strong> ({event.role})</span>
                    <span>🏛️ Império Dominante: <strong className="text-theme-primary">{event.empire}</strong></span>
                  </div>
                  <p className="text-xs leading-relaxed text-theme-muted pt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subView === 'genealogy' && (
        <div className="p-6 md:p-8 bg-theme-card border border-theme rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-theme pb-4">
            <div>
              <h2 className="text-xl font-classic font-bold text-theme-primary">Árvore Genealógica Messiânica</h2>
              <p className="text-xs text-theme-muted">A linhagem ininterrupta de Adão até Jesus Cristo, o Leão da Tribo de Judá</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GENEALOGY_NODES.map((node) => (
              <div key={node.id} className={`p-4 rounded-2xl border transition-all cls-card-sm ${node.isMessianicLine ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-500/30' : 'bg-theme-app border-theme'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Geração #{node.generationOrder}
                  </span>
                  {node.tribe && <span className="text-[10px] bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded-full text-theme-muted">{node.tribe}</span>}
                </div>
                <h3 className="text-base font-bold text-theme-primary mt-1">{node.name}</h3>
                <p className="text-xs font-serif italic text-amber-800/80 dark:text-amber-300/80 mb-2">"{node.meaning}"</p>
                <p className="text-xs text-theme-muted leading-relaxed mb-3">{node.importance}</p>
                <div className="text-[11px] font-mono text-theme-accent">📖 {node.keyVerse}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subView === 'gallery' && (
        /* 2. Main Layout Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Column: Filter Panel & Character List (5 columns) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Search and Filters Card */}
          <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
              <input
                type="text"
                placeholder="Buscar por nome, livro, significado..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-theme-app border border-theme rounded-2xl text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans"
              />
            </div>

            {/* Testament Filter Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-theme-app border border-theme">
              {testaments.map((t) => (
                <button
                  key={t.code}
                  onClick={() => setActiveTestament(t.code)}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-sans font-bold rounded-xl transition-all cursor-pointer text-center ${
                    activeTestament === t.code
                      ? 'bg-theme-card text-theme-accent shadow-3xs border border-theme-accent/20'
                      : 'text-theme-muted hover:text-theme-primary'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Category Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-theme-muted flex items-center gap-1">
                <Filter className="w-3 h-3 text-theme-accent" />
                <span>Categoria Teológica</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.code}
                    onClick={() => setActiveCategory(cat.code)}
                    className={`px-3 py-1.5 text-xs font-sans font-semibold rounded-xl transition-all cursor-pointer ${
                      activeCategory === cat.code
                        ? 'bg-theme-accent text-white dark:text-[#1F1B16] font-bold shadow-3xs'
                        : 'bg-theme-app text-theme-secondary hover:text-theme-primary border border-theme hover:bg-theme-card-hover'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Character List Box */}
          <div className="p-4 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-2.5 max-h-[580px] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between px-2 pb-1 border-b border-theme/60 text-xs font-sans font-bold text-theme-muted uppercase tracking-wider">
              <span>Personagens Encontrados</span>
              <span className="text-theme-accent font-mono">{filteredCharacters.length}</span>
            </div>

            {filteredCharacters.length === 0 ? (
              <div className="py-12 text-center text-xs text-theme-muted font-manuscript italic space-y-2">
                <Users className="w-8 h-8 mx-auto text-theme-muted/50" />
                <p>Nenhum personagem encontrado para os filtros selecionados.</p>
              </div>
            ) : (
              filteredCharacters.map((char) => {
                const isSelected = selectedCharacter?.id === char.id;
                const isFav = savedFavorites.includes(char.id);

                return (
                  <div
                    key={char.id}
                    onClick={() => setSelectedCharId(char.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer cls-card-sm ${
                      isSelected
                        ? 'bg-theme-accent/10 border-theme-accent shadow-sm ring-1 ring-theme-accent/20'
                        : 'bg-theme-app border-theme hover:bg-theme-card-hover'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-classic font-bold text-theme-primary truncate">
                          {char.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 font-sans font-extrabold border border-amber-500/20 shrink-0">
                          {char.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-theme-muted font-manuscript truncate">
                        <span>Significado: <strong className="font-classic text-theme-secondary">"{char.meaning}"</strong></span>
                      </div>

                      <div className="text-[11px] text-amber-800 dark:text-amber-300 font-sans font-medium italic truncate flex items-center gap-1">
                        <span>💡 <strong className="not-italic font-bold">O que aprendemos:</strong> {char.lessons[0]}</span>
                      </div>

                      <div className="text-[10px] text-theme-muted font-sans font-semibold truncate">
                        ⏳ {char.period}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(char.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isFav ? 'text-rose-500 bg-rose-500/10' : 'text-theme-muted hover:text-rose-500'
                        }`}
                        title={isFav ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-theme-accent' : 'text-theme-muted'}`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side Column: Detailed Character Study Profile (7 columns) */}
        <div className="lg:col-span-7">
          {selectedCharacter ? (
            <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-md space-y-6">
              
              {/* Profile Header Header */}
              <div className="border-b border-theme pb-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-theme-accent/10 border border-theme-accent/25 text-theme-accent font-sans font-extrabold text-xs uppercase tracking-wider">
                      {selectedCharacter.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-stone-500/10 border border-stone-500/20 text-theme-secondary font-sans font-semibold text-xs">
                      {selectedCharacter.testament}
                    </span>
                  </div>

                  {/* Actions Header */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopySummary}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-theme-app border border-theme text-theme-secondary hover:text-theme-primary text-xs font-sans font-bold transition-all cursor-pointer shadow-3xs"
                      title="Copiar resumo do personagem"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-theme-accent" />}
                      <span>{copiedKey ? 'Copiado!' : 'Copiar Resumo'}</span>
                    </button>

                    <button
                      onClick={() => toggleFavorite(selectedCharacter.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        savedFavorites.includes(selectedCharacter.id)
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                          : 'bg-theme-app border-theme text-theme-muted hover:text-rose-500'
                      }`}
                      title="Favoritar Personagem"
                    >
                      <Heart className={`w-4 h-4 ${savedFavorites.includes(selectedCharacter.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-3xl md:text-4xl font-classic font-bold text-theme-primary tracking-tight">
                    {selectedCharacter.name}
                  </h2>
                  <p className="text-base font-manuscript italic text-theme-accent">
                    Significado do Nome: <span className="font-bold">"{selectedCharacter.meaning}"</span>
                  </p>
                </div>

                {/* Period & Passages Metadata Bar */}
                <div className="p-4 rounded-2xl bg-theme-app border border-theme grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider block">Época / Período Bíblico</span>
                    <span className="font-semibold text-theme-primary block">⏳ {selectedCharacter.period}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-theme-muted uppercase tracking-wider block">Passagens Principais</span>
                    <span className="font-classic font-bold text-theme-accent block">📖 {selectedCharacter.passages}</span>
                  </div>
                </div>

                {/* Key Verse Highlight Quote Box */}
                {selectedCharacter.keyVerse && (
                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-theme-primary space-y-1.5 relative overflow-hidden">
                    <Quote className="w-8 h-8 absolute -top-1 -right-1 text-amber-500/10 pointer-events-none" />
                    <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-amber-800 dark:text-amber-400 block">
                      Versículo Chave
                    </span>
                    <p className="font-serif italic text-sm md:text-base leading-relaxed text-theme-secondary">
                      "{selectedCharacter.keyVerse}"
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Tabs inside Detail View */}
              <div className="flex border-b border-theme/80 overflow-x-auto no-scrollbar gap-2">
                {[
                  { id: 'bio', label: 'Biografia & História', icon: BookOpen },
                  { id: 'lessons', label: '💡 O que Aprendemos', icon: Flame },
                  { id: 'christ', label: 'Cristocentrismo', icon: Sparkles },
                  { id: 'relations', label: 'Relações & Família', icon: Users },
                  { id: 'facts', label: 'Curiosidades', icon: Info },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  const isActive = activeDetailTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDetailTab(tab.id as any)}
                      className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-sans font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'border-theme-accent text-theme-accent font-extrabold bg-theme-accent/5'
                          : 'border-transparent text-theme-muted hover:text-theme-primary'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Panels */}
              <div className="space-y-4 min-h-[220px]">
                
                {/* 1. Biografia */}
                {activeDetailTab === 'bio' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-theme-muted flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-theme-accent" />
                        <span>História Bíblica Integrada</span>
                      </h3>
                      <p className="font-serif text-sm md:text-base text-theme-secondary leading-relaxed whitespace-pre-line">
                        {selectedCharacter.biography}
                      </p>
                    </div>

                    {/* Destaque das Lições Teológicas e Práticas */}
                    <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/25 space-y-2.5">
                      <h4 className="text-xs font-sans font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>💡 O que Aprendemos com {selectedCharacter.name}</span>
                      </h4>
                      <ul className="space-y-2">
                        {selectedCharacter.lessons.map((lesson, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm font-serif text-theme-primary">
                            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-sans text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Books Mentioned */}
                    <div className="pt-3 border-t border-theme/60 space-y-2">
                      <span className="text-[10px] font-sans font-bold uppercase text-theme-muted block">Livros Onde Aparece</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCharacter.books.map((b) => (
                          <span key={b} className="px-2.5 py-1 rounded-lg bg-theme-app border border-theme text-xs font-sans font-semibold text-theme-primary">
                            📖 {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Cristocentrismo */}
                {activeDetailTab === 'christ' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/10 via-stone-900/5 to-amber-950/10 border border-amber-500/20 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-theme-accent text-white font-classic flex items-center justify-center font-bold text-xl shadow-sm">
                          ✝
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-classic font-bold text-theme-primary">
                            Como {selectedCharacter.name} aponta para Cristo?
                          </h3>
                          <span className="text-[10px] font-sans font-semibold text-theme-muted uppercase tracking-wider">
                            Tipologia & Cumprimento Messias
                          </span>
                        </div>
                      </div>

                      <p className="font-serif text-sm md:text-base text-theme-secondary leading-relaxed pt-2 border-t border-theme/40">
                        {selectedCharacter.pointingToChrist}
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. Lições & Aplicação */}
                {activeDetailTab === 'lessons' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-5 rounded-2xl bg-theme-app border border-theme space-y-3">
                      <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-theme-accent flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-500" />
                        <span>Aplicação Espiritual Prática</span>
                      </h3>
                      <p className="font-serif italic text-sm text-theme-primary leading-relaxed">
                        "{selectedCharacter.practicalApplication}"
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-theme-muted flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-theme-accent" />
                        <span>O que Aprendemos com {selectedCharacter.name}</span>
                      </h4>
                      <div className="space-y-2">
                        {selectedCharacter.lessons.map((lesson, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-theme-app/60 border border-theme flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-theme-accent/15 text-theme-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="font-serif text-xs md:text-sm text-theme-secondary leading-relaxed">
                              {lesson}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Relacionamentos */}
                {activeDetailTab === 'relations' && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-theme-muted flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-theme-accent" />
                      <span>Conexões Familiares & Alianças</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedCharacter.relationships.map((rel, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-theme-app border border-theme flex items-center gap-2.5">
                          <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="font-sans text-xs font-semibold text-theme-primary">
                            {rel}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Curiosidades */}
                {activeDetailTab === 'facts' && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-theme-muted flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-theme-accent" />
                      <span>Curiosidades & Fatos Exegéticos</span>
                    </h3>

                    {selectedCharacter.curiosities && selectedCharacter.curiosities.length > 0 ? (
                      <div className="space-y-2.5">
                        {selectedCharacter.curiosities.map((fact, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-theme-app border border-theme flex items-start gap-3">
                            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <p className="font-serif text-xs md:text-sm text-theme-secondary leading-relaxed">
                              {fact}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-theme-app border border-theme text-xs font-serif italic text-theme-muted">
                        Sem curiosidades adicionais cadastradas para este personagem no momento.
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-theme-muted font-serif italic">
              Selecione um personagem na lista ao lado para visualizar os detalhes completos.
            </div>
          )}
        </div>

      </div>
      )}
    </div>
  );
};
