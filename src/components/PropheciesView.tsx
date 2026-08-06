import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Compass, 
  Award, 
  HelpCircle, 
  Heart, 
  Star, 
  Search, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Info, 
  Check, 
  ChevronRight, 
  BookMarked,
  Layers,
  MapPin,
  Users,
  Grid,
  List,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  PROPHECIES_OVERVIEW,
  MESSIANIC_PROPHECIES, 
  APOCALYPTIC_PROPHECIES, 
  HISTORICAL_PROPHECIES, 
  PROPHETIC_SYMBOLS, 
  PROPHECIES_QUIZ,
  MessianicProphecy,
  ApocalypticProphecy,
  HistoricalProphecy,
  PropheticSymbol,
  QuizQuestion
} from '../data/propheciesData';
import { useTheme } from '../styles/themeConstants';

export const PropheciesView: React.FC = () => {
  const { theme } = useTheme();
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'messianic' | 'apocalyptic' | 'historical' | 'hermeneutics' | 'symbols' | 'quiz'>('messianic');
  
  // Tab states
  const [selectedMessianicId, setSelectedMessianicId] = useState<string>('M1');
  const [messianicSearch, setMessianicSearch] = useState<string>('');
  
  const [selectedApocalypticId, setSelectedApocalypticId] = useState<string>('A1');
  const [selectedSymbolCategory, setSelectedSymbolCategory] = useState<string>('Todos');
  
  const [selectedHistoricalId, setSelectedHistoricalId] = useState<string>('H1');

  // View mode state for Messianic tab
  const [viewMode, setViewMode] = useState<'cards' | 'details'>('cards');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCardExpansion = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getFulfillmentStatus = (id: string) => {
    switch (id) {
      case "M1":
        return { text: "Cumprido na Encarnação & Cruz", color: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-950/30" };
      case "M2":
        return { text: "Cumprido no Sacrifício Substitutivo", color: "text-rose-700 bg-rose-500/10 dark:text-rose-400 dark:bg-rose-950/30" };
      case "M3":
        return { text: "Cumprido no Nascimento Histórico", color: "text-amber-700 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-950/30" };
      case "M4":
        return { text: "Cumprido por Concepção Virginal", color: "text-indigo-700 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-950/30" };
      case "M5":
        return { text: "Cumprido com Detalhes Literais", color: "text-blue-700 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-950/30" };
      case "M6":
        return { text: "Cumprido na Ressurreição Corporal", color: "text-teal-700 bg-teal-500/10 dark:text-teal-400 dark:bg-teal-950/30" };
      case "M7":
        return { text: "Cumprido na Entrada Triunfal", color: "text-purple-700 bg-purple-500/10 dark:text-purple-400 dark:bg-purple-950/30" };
      case "M8":
        return { text: "Cumprido na Cronologia Determinada", color: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-950/30" };
      default:
        return { text: "Cumprido em Cristo", color: "text-emerald-700 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-950/30" };
    }
  };

  // Quiz States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filters for Messianic
  const filteredMessianic = MESSIANIC_PROPHECIES.filter(p => 
    p.prophecyTheme.toLowerCase().includes(messianicSearch.toLowerCase()) ||
    p.oldTestamentRef.toLowerCase().includes(messianicSearch.toLowerCase()) ||
    p.newTestamentRef.toLowerCase().includes(messianicSearch.toLowerCase())
  );

  const currentMessianic = MESSIANIC_PROPHECIES.find(p => p.id === selectedMessianicId) || MESSIANIC_PROPHECIES[0];
  const currentApocalyptic = APOCALYPTIC_PROPHECIES.find(p => p.id === selectedApocalypticId) || APOCALYPTIC_PROPHECIES[0];
  const currentHistorical = HISTORICAL_PROPHECIES.find(p => p.id === selectedHistoricalId) || HISTORICAL_PROPHECIES[0];

  // Filters for Symbols
  const symbolCategories = ['Todos', ...Array.from(new Set(PROPHETIC_SYMBOLS.map(s => s.category)))];
  const filteredSymbols = selectedSymbolCategory === 'Todos'
    ? PROPHETIC_SYMBOLS
    : PROPHETIC_SYMBOLS.filter(s => s.category === selectedSymbolCategory);

  // Quiz Actions
  const handleOptionSelect = (optionIdx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(optionIdx);
    setHasAnswered(true);
    
    if (optionIdx === PROPHECIES_QUIZ[currentQuestionIdx].correctAnswerIdx) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionIdx(null);
    setHasAnswered(false);
    
    if (currentQuestionIdx < PROPHECIES_QUIZ.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setHasAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Banner / Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#4d2315] via-stone-900 to-[#220e06] text-amber-50 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            <span>Escatologia, História e Aliança</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-serif font-bold tracking-tight">Profecias Bíblicas & Soberania Divina</h2>
          <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed max-w-2xl font-serif">
            Explore a arquitetura profética das Escrituras organizada por categorias. Descubra o fio redentor messiânico, 
            a queda e ascensão providencial de impérios históricos, e as visões escatológicas sobre a consumação dos séculos, 
            todos unificados sob o controle absoluto do Soberano Deus.
          </p>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-theme no-scrollbar scroll-smooth">
        <button
          onClick={() => setActiveTab('messianic')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'messianic'
              ? 'border-amber-800 text-amber-950 dark:border-amber-400 dark:text-amber-100 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>1. Profecias Messiânicas</span>
        </button>
        
        <button
          onClick={() => setActiveTab('apocalyptic')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'apocalyptic'
              ? 'border-amber-800 text-amber-950 dark:border-amber-400 dark:text-amber-100 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>2. Profecias Apocalípticas</span>
        </button>

        <button
          onClick={() => setActiveTab('historical')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'historical'
              ? 'border-amber-800 text-amber-950 dark:border-amber-400 dark:text-amber-100 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>3. Profecias Históricas</span>
        </button>

        <button
          onClick={() => setActiveTab('hermeneutics')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'hermeneutics'
              ? 'border-amber-800 text-amber-950 dark:border-amber-400 dark:text-amber-100 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>4. Escolas de Interpretação</span>
        </button>

        <button
          onClick={() => setActiveTab('symbols')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'symbols'
              ? 'border-amber-800 text-amber-950 dark:border-amber-400 dark:text-amber-100 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>5. Glossário de Símbolos</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'quiz'
              ? 'border-amber-800 text-amber-950 dark:border-amber-400 dark:text-amber-100 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span>6. Quiz Teológico</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">

        {/* ==================== TAB: MESSIANIC PROPHECIES ==================== */}
        {activeTab === 'messianic' && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-2">
              <h3 className="text-lg font-serif font-bold text-theme-primary flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Cristo na Lei, Salmos e Profetas</span>
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary font-serif leading-relaxed">
                As profecias messiânicas traçam o plano de redenção de Deus desde o Éden até o sacrifício de Jesus Cristo. 
                Elas demonstram a consistência indestrutível das Escrituras e revelam como cada detalhe do ministério, 
                morte e ressurreição de nosso Senhor foi soberanamente decretado e cumprido.
              </p>
            </div>

            {/* Controladores de visualização */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-theme-card border border-theme p-4 rounded-2xl shadow-sm">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                  Exposição das Escrituras
                </span>
                <span className="text-xs sm:text-sm text-theme-secondary font-serif">
                  Selecione o formato de exibição das revelações proféticas e seus cumprimentos.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold font-sans transition-all border ${
                    viewMode === 'cards'
                      ? 'bg-amber-800 text-amber-50 border-amber-900 dark:bg-amber-600 dark:text-amber-950 dark:border-amber-500 font-bold'
                      : 'bg-theme-app text-theme-secondary hover:bg-theme-card-hover border-theme'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Layout de Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('details')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold font-sans transition-all border ${
                    viewMode === 'details'
                      ? 'bg-amber-800 text-amber-50 border-amber-900 dark:bg-amber-600 dark:text-amber-950 dark:border-amber-500 font-bold'
                      : 'bg-theme-app text-theme-secondary hover:bg-theme-card-hover border-theme'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Ficha Comparativa</span>
                </button>
              </div>
            </div>

            {viewMode === 'cards' ? (
              <div className="space-y-6">
                {/* Search Bar for Card View */}
                <div className="relative max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Filtrar por tema ou passagem..."
                    value={messianicSearch}
                    onChange={(e) => setMessianicSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-theme-card border border-theme rounded-xl text-theme-primary focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {filteredMessianic.length === 0 ? (
                  <div className="p-8 text-center bg-theme-card border border-theme rounded-2xl">
                    <p className="text-theme-secondary font-serif italic text-sm">Nenhuma profecia encontrada para os filtros aplicados.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMessianic.map((p) => {
                      const isExpanded = expandedCards[p.id];
                      const status = getFulfillmentStatus(p.id);
                      
                      return (
                        <div
                          key={p.id}
                          className="flex flex-col justify-between bg-theme-card border border-theme rounded-2xl shadow-sm hover:shadow-md hover:border-amber-500/25 dark:hover:border-amber-500/35 transition-all duration-200 cls-card-grid"
                        >
                          <div className="p-5 space-y-4">
                            {/* Card Header: Theme and Status */}
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-[10px] font-mono font-bold tracking-wider text-amber-700 dark:text-amber-400 uppercase bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                                  {p.id}
                                </span>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide border border-transparent whitespace-nowrap ${status.color}`}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
                                  {status.text}
                                </span>
                              </div>
                              <h4 className="font-serif font-bold text-sm sm:text-base text-theme-primary leading-snug">
                                {p.prophecyTheme}
                              </h4>
                            </div>

                            {/* References & Text Panels */}
                            <div className="space-y-4 pt-3 border-t border-theme">
                              {/* OT Section */}
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-mono font-bold uppercase text-amber-800 dark:text-amber-400 flex items-center gap-1">
                                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                                  <span>Profecia: {p.oldTestamentRef}</span>
                                </span>
                                <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-stone-900/40 border border-amber-900/10 dark:border-stone-850/60">
                                  <p className="text-xs sm:text-sm font-serif italic text-theme-secondary leading-relaxed">
                                    "{p.oldTestamentText}"
                                  </p>
                                </div>
                              </div>

                              {/* NT Section */}
                              <div className="space-y-1.5">
                                <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Cumprimento: {p.newTestamentRef}</span>
                                </span>
                                <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-stone-900/40 border border-emerald-900/10 dark:border-stone-850/60">
                                  <p className="text-xs sm:text-sm font-serif italic text-theme-secondary leading-relaxed">
                                    "{p.newTestamentText}"
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Expandable Section for Theological Context & Sovereignty */}
                            {isExpanded && (
                              <div className="pt-3 border-t border-theme space-y-3 animate-fadeIn">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-bold uppercase text-theme-muted flex items-center gap-1">
                                    <Info className="w-3 h-3 text-stone-500" />
                                    <span>Exposição Teológica</span>
                                  </span>
                                  <p className="text-xs font-serif text-theme-secondary leading-relaxed">
                                    {p.theologicalContext}
                                  </p>
                                </div>

                                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50/40 to-stone-100/40 dark:from-stone-850 dark:to-stone-900 border border-amber-800/10 dark:border-stone-800/40 space-y-1">
                                  <span className="text-[10px] font-mono font-bold uppercase text-amber-900 dark:text-amber-400 flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-amber-500/15 text-amber-600" />
                                    <span>Foco na Soberania</span>
                                  </span>
                                  <p className="text-[11px] font-serif italic text-theme-secondary leading-relaxed">
                                    {p.sovereigntyFocus}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Card Footer: Expand Button */}
                          <div className="border-t border-theme px-5 py-2.5 bg-theme-app/50 rounded-b-2xl flex items-center justify-between">
                            <span className="text-[11px] font-sans font-semibold text-theme-muted">
                              {isExpanded ? "Ocultar detalhes de estudo" : "Ver estudo teológico"}
                            </span>
                            <button
                              onClick={() => toggleCardExpansion(p.id)}
                              className="p-1 rounded-lg bg-theme-card border border-theme text-theme-secondary hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Search & List */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Filtrar profecia messiânica..."
                      value={messianicSearch}
                      onChange={(e) => setMessianicSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-theme-card border border-theme rounded-xl text-theme-primary focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="p-3 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-1.5 max-h-[400px] overflow-y-auto no-scrollbar">
                    {filteredMessianic.map((p) => {
                      const isSelected = p.id === selectedMessianicId;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setSelectedMessianicId(p.id)}
                          className={`w-full p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-800/40 dark:bg-amber-950/20 dark:border-amber-600/50 shadow-sm'
                              : 'bg-theme-app border-theme hover:bg-theme-card-hover'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">{p.oldTestamentRef}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 font-bold">Cumprido</span>
                          </div>
                          <h4 className="font-serif font-bold text-xs text-theme-primary mt-1 line-clamp-1">{p.prophecyTheme}</h4>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Comparative Study File */}
                <div className="lg:col-span-8">
                  <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-6">
                    {/* Title and references */}
                    <div className="border-b border-theme pb-4 space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-700 dark:text-amber-400 tracking-wider">
                        Ficha de Estudo Cristocêntrico
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-theme-primary leading-tight">
                        {currentMessianic.prophecyTheme}
                      </h3>
                    </div>

                    {/* OT vs NT Split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-stone-850 border border-amber-900/10 dark:border-stone-800 space-y-2">
                        <span className="text-[10px] uppercase font-mono font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Profecia (Antigo Testamento)</span>
                        </span>
                        <p className="text-xs sm:text-sm font-serif italic text-theme-primary font-bold">{currentMessianic.oldTestamentRef}</p>
                        <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed">
                          "{currentMessianic.oldTestamentText}"
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-stone-850 border border-emerald-900/10 dark:border-stone-800 space-y-2">
                        <span className="text-[10px] uppercase font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Cumprimento (Novo Testamento)</span>
                        </span>
                        <p className="text-xs sm:text-sm font-serif italic text-theme-primary font-bold">{currentMessianic.newTestamentRef}</p>
                        <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed">
                          "{currentMessianic.newTestamentText}"
                        </p>
                      </div>
                    </div>

                    {/* Theological context */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase text-stone-500 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        <span>Exposição Teológica</span>
                      </h4>
                      <p className="text-xs sm:text-sm font-serif leading-relaxed text-theme-secondary">
                        {currentMessianic.theologicalContext}
                      </p>
                    </div>

                    {/* Sovereignty Box */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-stone-850 dark:to-stone-900 border border-amber-800/10 dark:border-stone-800/40 space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase text-amber-900 dark:text-amber-400 flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-amber-500/20" />
                        <span>Foco na Soberania de Deus</span>
                      </h4>
                      <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed italic">
                        {currentMessianic.sovereigntyFocus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB: APOCALYPTIC PROPHECIES ==================== */}
        {activeTab === 'apocalyptic' && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-2">
              <h3 className="text-lg font-serif font-bold text-theme-primary flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Profecias Apocalípticas: Daniel & Apocalipse</span>
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary font-serif leading-relaxed">
                As profecias apocalípticas utilizam visões e uma linguagem simbólica vívida para desvelar a soberania de Deus sobre a consumação dos séculos. 
                Apresentamos aqui uma exposição clara e didática de passagens-chave, abordando de maneira neutra e equilibrada as diferentes correntes de interpretação históricas.
              </p>
            </div>

            {/* Selector Pills */}
            <div className="flex gap-2 border-b border-theme pb-3 overflow-x-auto no-scrollbar">
              {APOCALYPTIC_PROPHECIES.map((ap) => (
                <button
                  key={ap.id}
                  onClick={() => setSelectedApocalypticId(ap.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-serif font-semibold whitespace-nowrap border transition-all ${
                    selectedApocalypticId === ap.id
                      ? 'bg-indigo-800 text-indigo-50 border-indigo-900 dark:bg-indigo-600 dark:border-indigo-500 shadow-sm'
                      : 'bg-theme-card text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 border-theme'
                  }`}
                >
                  {ap.title}
                </button>
              ))}
            </div>

            {/* Active Apocalyptic Content */}
            <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-6">
              <div className="border-b border-theme pb-4">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 dark:text-indigo-400 block mb-1">Passagem Bíblica Analisada</span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-theme-primary">{currentApocalyptic.title}</h3>
                <span className="inline-block mt-1 text-xs font-mono font-bold text-amber-700 dark:text-amber-400">{currentApocalyptic.passageRef}</span>
              </div>

              {/* Text Snippet Card */}
              <div className="p-4 rounded-2xl bg-theme-app border border-theme space-y-1">
                <span className="text-[9px] font-mono font-bold text-theme-muted uppercase block">Extrato do Texto</span>
                <p className="text-xs sm:text-sm font-serif italic text-theme-secondary leading-relaxed">
                  "{currentApocalyptic.textSnippet}"
                </p>
              </div>

              {/* Equilibrated Interpretations Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-stone-500 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Apresentação de Interpretações Teológicas (Perspectiva Equilibrada)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Preterist */}
                  <div className="p-4 rounded-2xl bg-theme-app border border-theme space-y-1.5 hover:shadow-sm transition-all">
                    <span className="text-[10px] font-mono font-bold bg-blue-500/10 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">Preterismo</span>
                    <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed">
                      {currentApocalyptic.differentInterpretations.preterist}
                    </p>
                  </div>

                  {/* Historicist */}
                  <div className="p-4 rounded-2xl bg-theme-app border border-theme space-y-1.5 hover:shadow-sm transition-all">
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">Historicismo</span>
                    <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed">
                      {currentApocalyptic.differentInterpretations.historicist}
                    </p>
                  </div>

                  {/* Futurist */}
                  <div className="p-4 rounded-2xl bg-theme-app border border-theme space-y-1.5 hover:shadow-sm transition-all">
                    <span className="text-[10px] font-mono font-bold bg-purple-500/10 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">Futurismo</span>
                    <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed">
                      {currentApocalyptic.differentInterpretations.futurist}
                    </p>
                  </div>

                  {/* Idealist */}
                  <div className="p-4 rounded-2xl bg-theme-app border border-theme space-y-1.5 hover:shadow-sm transition-all">
                    <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">Idealismo</span>
                    <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed">
                      {currentApocalyptic.differentInterpretations.idealist}
                    </p>
                  </div>
                </div>
              </div>

              {/* Synthesis & Sovereignty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-theme">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold uppercase text-stone-500">Síntese Teológica</h4>
                  <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed">
                    {currentApocalyptic.theologicalSynthesis}
                  </p>
                </div>
                
                <div className="p-5 rounded-2xl bg-[#2b1e19]/5 dark:bg-[#382017]/15 border border-[#4d2315]/10 dark:border-[#4d2315]/40 space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#4d2315] dark:text-amber-400 flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-500/10" />
                    <span>Foco na Soberania de Deus</span>
                  </h4>
                  <p className="text-xs sm:text-sm font-serif italic text-theme-secondary leading-relaxed">
                    {currentApocalyptic.sovereigntyFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: HISTORICAL PROPHECIES ==================== */}
        {activeTab === 'historical' && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-2">
              <h3 className="text-lg font-serif font-bold text-theme-primary flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Profecias Históricas: A Soberania sobre Nações & Impérios</span>
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary font-serif leading-relaxed">
                As profecias de julgamento histórico contra nações antigas (Assíria, Tiro, Babilônia) e o anúncio de governantes séculos antes de nascerem (como Ciro) 
                fornecem testemunhos concretos e inabaláveis. O cumprimento empírico destas profecias prova que o Altíssimo reina supremo sobre reis e climas de nossa história.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Selector Sidebar */}
              <div className="lg:col-span-4 space-y-2">
                <div className="p-3 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-theme-muted px-2 block">Dossiês de Profecias Históricas</span>
                  {HISTORICAL_PROPHECIES.map((hp) => {
                    const isSelected = hp.id === selectedHistoricalId;
                    return (
                      <button
                        key={hp.id}
                        onClick={() => setSelectedHistoricalId(hp.id)}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-800/40 dark:bg-emerald-950/20 dark:border-emerald-600/50 shadow-sm'
                            : 'bg-theme-app border-theme hover:bg-theme-card-hover'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400">{hp.passageRef}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold">Arqueologia</span>
                        </div>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-theme-primary mt-1 leading-tight">{hp.title}</h4>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Content Sheet */}
              <div className="lg:col-span-8">
                <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-6">
                  {/* Header Title */}
                  <div className="border-b border-theme pb-4">
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-1">Dossiê Histórico e Arqueológico</span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-theme-primary">{currentHistorical.title}</h3>
                    <span className="inline-block mt-1 text-xs font-mono font-bold text-stone-500">{currentHistorical.passageRef}</span>
                  </div>

                  {/* Prophecy Text Box */}
                  <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-stone-850 border border-amber-900/10 dark:border-stone-800 space-y-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase text-amber-800 dark:text-amber-400 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>O Texto Profetizado</span>
                    </span>
                    <p className="text-xs sm:text-sm font-serif italic text-theme-secondary leading-relaxed">
                      "{currentHistorical.prophecyText}"
                    </p>
                  </div>

                  {/* Detailed Fulfillment & Archaeological Evidence Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase text-stone-500">Cumprimento Histórico Registrado</h4>
                      <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed">
                        {currentHistorical.fulfillmentHistory}
                      </p>
                    </div>

                    <div className="p-4.5 rounded-2xl bg-theme-app border border-theme space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Evidência e Achados Arqueológicos</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-theme-secondary font-serif leading-relaxed italic">
                        {currentHistorical.historicalEvidence}
                      </p>
                    </div>
                  </div>

                  {/* Theological Significance & Sovereignty */}
                  <div className="pt-4 border-t border-theme grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-mono font-bold uppercase text-stone-500">Significado Teológico</h4>
                      <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed">
                        {currentHistorical.theologicalSignificance}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-stone-850 border border-emerald-900/10 dark:border-stone-800 space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase text-emerald-900 dark:text-emerald-400 flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-emerald-500/10 text-emerald-600" />
                        <span>Soberania sobre as Nações</span>
                      </h4>
                      <p className="text-xs sm:text-sm font-serif text-theme-secondary leading-relaxed italic">
                        {currentHistorical.sovereigntyFocus}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: HERMENEUTICAL SCHOOLS ==================== */}
        {activeTab === 'hermeneutics' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-6">
            <div className="border-b border-theme pb-4 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-blue-700 dark:text-blue-400 tracking-wider">
                Respeito e Maturidade Teológica
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">
                {PROPHECIES_OVERVIEW.approaches.title}
              </h3>
              <p className="text-xs sm:text-sm text-theme-muted font-serif">
                {PROPHECIES_OVERVIEW.approaches.description}
              </p>
            </div>

            {/* School grids with enhanced academic context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROPHECIES_OVERVIEW.approaches.schools.map((school, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-theme-app border border-theme space-y-2.5 hover:shadow-sm transition-all flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                      {school.name}
                    </span>
                    <p className="text-xs sm:text-sm text-theme-secondary font-serif leading-relaxed pt-1.5">
                      {school.explanation}
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-xl bg-theme-card border border-theme text-[11px] font-serif text-theme-muted italic">
                    <strong>Foco Soberano:</strong> {school.sovereigntyFocus}
                  </div>
                </div>
              ))}
            </div>

            {/* Unity statement */}
            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-900/10 dark:border-stone-800 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-blue-800 dark:text-blue-400 block">Unidade Inabalável da Igreja</span>
                <p className="text-xs sm:text-sm text-theme-secondary font-serif leading-relaxed">
                  <strong>Ponto de Convergência Histórica:</strong> {PROPHECIES_OVERVIEW.approaches.theologicalClosing}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB: GLOSSARY OF SYMBOLS ==================== */}
        {activeTab === 'symbols' && (
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-2">
              <h3 className="text-lg font-serif font-bold text-theme-primary flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Glossário Interativo de Símbolos Apocalípticos</span>
              </h3>
              <p className="text-xs sm:text-sm text-theme-secondary font-serif leading-relaxed">
                As profecias de Daniel e do Apocalipse usam imagens do Oriente Antigo para descrever governantes e acontecimentos geopolíticos e celestes. 
                Utilize este glossário para decodificar cada símbolo de acordo com as próprias interpretações explicadas internamente pela Bíblia.
              </p>
            </div>

            {/* Category Pill Filters */}
            <div className="flex flex-wrap gap-1.5 items-center border-b border-theme pb-3">
              {symbolCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSymbolCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                    selectedSymbolCategory === cat
                      ? 'bg-purple-800 border-purple-900 text-purple-50 dark:bg-purple-600 dark:border-purple-500 shadow-sm'
                      : 'bg-theme-card border-theme text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Interactive Grid with Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSymbols.map((s, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border bg-theme-card border-theme hover:border-purple-500/30 dark:hover:border-purple-500/40 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold uppercase bg-purple-500/10 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-full">
                        {s.category}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                        {s.references.split(',')[0]}
                      </span>
                    </div>
                    
                    <h4 className="font-serif font-bold text-base text-theme-primary">
                      {s.symbol}
                    </h4>
                    
                    <p className="text-xs sm:text-sm font-serif font-semibold text-purple-950 dark:text-purple-300">
                      Significado: {s.meaning}
                    </p>

                    <p className="text-xs text-theme-secondary font-serif leading-relaxed italic pt-2 border-t border-theme">
                      {s.context}
                    </p>
                  </div>

                  <div className="pt-2 text-[10px] font-mono font-bold text-theme-muted block">
                    Passagens: {s.references}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB: STUDY QUIZ ==================== */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            {!quizFinished ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-6">
                {/* Header indicators */}
                <div className="flex items-center justify-between border-b border-theme pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                      Autoavaliação Teológica
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-theme-primary">
                      Maturidade Escatológica
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold bg-theme-app px-2.5 py-1 rounded-xl border border-theme">
                    Questão {currentQuestionIdx + 1} de {PROPHECIES_QUIZ.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-theme-app rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-rose-700 dark:bg-rose-500 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx) / PROPHECIES_QUIZ.length) * 100}%` }}
                  />
                </div>

                {/* Question Text */}
                <div className="space-y-2">
                  <h4 className="text-sm sm:text-base font-serif font-bold text-theme-primary leading-snug">
                    {PROPHECIES_QUIZ[currentQuestionIdx].question}
                  </h4>
                </div>

                {/* Options list */}
                <div className="space-y-2.5">
                  {PROPHECIES_QUIZ[currentQuestionIdx].options.map((opt, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const isCorrectAnswer = idx === PROPHECIES_QUIZ[currentQuestionIdx].correctAnswerIdx;
                    
                    let optionStyle = 'border-theme hover:bg-theme-card-hover bg-theme-card';
                    let statusIcon = null;

                    if (hasAnswered) {
                      if (isCorrectAnswer) {
                        optionStyle = 'border-emerald-600 bg-emerald-500/10 text-theme-primary font-bold';
                        statusIcon = <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />;
                      } else if (isSelected) {
                        optionStyle = 'border-rose-600 bg-rose-500/10 text-theme-primary';
                        statusIcon = <XCircle className="w-4 h-4 text-rose-600 shrink-0" />;
                      } else {
                        optionStyle = 'border-theme opacity-50 bg-theme-app';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-rose-800 bg-rose-500/5 ring-1 ring-rose-500/30';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasAnswered}
                        onClick={() => handleOptionSelect(idx)}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-sans transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <div className="flex gap-2.5 items-start">
                          <span className={`w-5 h-5 rounded-full border text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'bg-rose-800 text-rose-50 border-rose-800' : 'bg-theme-app text-theme-muted'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="leading-tight">{opt}</span>
                        </div>
                        {statusIcon}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box */}
                {hasAnswered && (
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-900/15 dark:border-stone-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                      <Info className="w-4 h-4 shrink-0" />
                      <span>Explicação Didática & Soberania</span>
                    </div>
                    <p className="text-xs sm:text-sm text-theme-secondary font-serif leading-relaxed">
                      {PROPHECIES_QUIZ[currentQuestionIdx].explanation}
                    </p>
                  </div>
                )}

                {/* Next button */}
                {hasAnswered && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 rounded-xl bg-rose-800 text-rose-50 dark:bg-rose-600 font-sans font-bold text-xs sm:text-sm hover:bg-rose-950 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>
                      {currentQuestionIdx === PROPHECIES_QUIZ.length - 1 ? 'Ver Resultado Final' : 'Próxima Pergunta'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Finished Page */
              <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm text-center space-y-6">
                <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-rose-700 dark:text-rose-400" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400">
                    Aproveitamento Teológico
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">
                    Desafio Concluído!
                  </h3>
                  <p className="text-xs sm:text-sm text-theme-muted max-w-md mx-auto font-serif">
                    Parabéns por se dedicar ao estudo sistemático da verdade profética e do governo soberano do Altíssimo.
                  </p>
                </div>

                {/* Score Circle */}
                <div className="inline-flex flex-col items-center justify-center p-6 bg-theme-app rounded-full border border-theme">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-theme-primary">
                    {score} / {PROPHECIES_QUIZ.length}
                  </span>
                  <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider mt-0.5">
                    Acertos ({Math.round((score / PROPHECIES_QUIZ.length) * 100)}%)
                  </span>
                </div>

                {/* Action button */}
                <div>
                  <button
                    onClick={handleRestartQuiz}
                    className="px-5 py-2.5 rounded-xl border border-theme hover:bg-theme-card-hover text-theme-primary font-sans font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reiniciar Desafio</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Devotional Closing Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm text-center max-w-3xl mx-auto space-y-4">
        <Heart className="w-8 h-8 text-rose-600 fill-rose-100 mx-auto animate-pulse" />
        <h3 className="text-lg font-serif font-bold text-theme-primary">
          {PROPHECIES_OVERVIEW.hope.title}
        </h3>
        <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed font-serif italic max-w-2xl mx-auto">
          "{PROPHECIES_OVERVIEW.hope.content}"
        </p>
        <p className="text-[10px] sm:text-xs text-theme-muted font-sans font-semibold uppercase">
          {PROPHECIES_OVERVIEW.hope.closingThought}
        </p>
      </div>
    </div>
  );
};
