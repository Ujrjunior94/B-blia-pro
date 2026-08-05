import React, { useState } from 'react';
import { X, Search, Info, User, Clock, Compass, Sparkles, BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { BibleBook, Testament } from '../types';
import { BIBLE_BOOKS } from '../data/bibleBooks';
import { getQuickBookSummary } from '../data/bookSummaries';

interface BookChapterSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBookAndChapter: (book: BibleBook, chapter: number) => void;
  currentBookId: string;
  currentChapter: number;
}

export const BookChapterSelector: React.FC<BookChapterSelectorProps> = ({
  isOpen,
  onClose,
  onSelectBookAndChapter,
  currentBookId,
  currentChapter,
}) => {
  const [selectedTestament, setSelectedTestament] = useState<Testament | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BibleBook>(
    BIBLE_BOOKS.find((b) => b.id === currentBookId) || BIBLE_BOOKS[0]
  );
  const [hoveredBook, setHoveredBook] = useState<BibleBook | null>(null);
  const [activeInfoBook, setActiveInfoBook] = useState<BibleBook | null>(null);
  const [mode, setMode] = useState<'BOOK' | 'CHAPTER'>('BOOK');
  const [isChapterSummaryExpanded, setIsChapterSummaryExpanded] = useState<boolean>(true);

  if (!isOpen) return null;

  const filteredBooks = BIBLE_BOOKS.filter((b) => {
    const matchesTestament = selectedTestament === 'ALL' || b.testament === selectedTestament;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTestament && matchesSearch;
  });

  const activePreviewBook = hoveredBook || activeInfoBook || selectedBook;
  const summaryData = activePreviewBook ? getQuickBookSummary(activePreviewBook.id) : null;

  const handleBookClick = (book: BibleBook) => {
    setSelectedBook(book);
    setMode('CHAPTER');
  };

  const handleChapterClick = (chapterNum: number) => {
    if (selectedBook) {
      onSelectBookAndChapter(selectedBook, chapterNum);
      onClose();
    }
  };

  const handleInfoButtonClick = (e: React.MouseEvent, book: BibleBook) => {
    e.stopPropagation();
    setActiveInfoBook(book);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-5xl bg-amber-50 dark:bg-stone-900 border border-amber-900/20 dark:border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-amber-900/10 dark:border-stone-800 flex items-center justify-between bg-amber-100/60 dark:bg-stone-850">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-800 dark:bg-amber-700 text-amber-50 flex items-center justify-center shadow-sm">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-amber-950 dark:text-amber-100">
                {mode === 'BOOK' ? 'Navegação por Livro' : `${selectedBook.name} — Selecionar Capítulo`}
              </h2>
              <p className="text-[11px] text-amber-900/70 dark:text-stone-400">
                {mode === 'BOOK' ? 'Passe o cursor ou clique em (i) para ver o resumo e o autor' : `${selectedBook.totalChapters} capítulos • ${selectedBook.category}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {mode === 'CHAPTER' && (
              <button
                onClick={() => setMode('BOOK')}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-200/70 dark:bg-stone-800 text-amber-900 dark:text-amber-200 font-medium hover:bg-amber-300 transition-colors flex items-center gap-1"
              >
                ← Livros
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-amber-900/70 dark:text-stone-400 hover:bg-amber-200/50 dark:hover:bg-stone-800 transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Container (2 columns on desktop for BOOK mode, single view for CHAPTER mode) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-amber-900/10 dark:border-stone-800/80">
            
            {/* Search & Testament Filters (If Mode is BOOK) */}
            {mode === 'BOOK' && (
              <div className="p-3.5 border-b border-amber-900/10 dark:border-stone-800 space-y-2.5 bg-amber-50/50 dark:bg-stone-900/60">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-800/50 dark:text-stone-400" />
                  <input
                    type="text"
                    placeholder="Buscar livro por nome ou sigla (ex: Gênesis, Sl, Romanos)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-stone-800 border border-amber-900/20 dark:border-stone-700 rounded-xl text-amber-950 dark:text-amber-100 placeholder-amber-900/40 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:focus:ring-amber-500 shadow-sm"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  <button
                    onClick={() => setSelectedTestament('ALL')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      selectedTestament === 'ALL'
                        ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow-sm'
                        : 'bg-amber-200/40 text-amber-900 dark:bg-stone-800 dark:text-stone-300 hover:bg-amber-200/80 dark:hover:bg-stone-750'
                    }`}
                  >
                    Todos (66)
                  </button>
                  <button
                    onClick={() => setSelectedTestament('AT')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      selectedTestament === 'AT'
                        ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow-sm'
                        : 'bg-amber-200/40 text-amber-900 dark:bg-stone-800 dark:text-stone-300 hover:bg-amber-200/80 dark:hover:bg-stone-750'
                    }`}
                  >
                    Antigo Testamento (39)
                  </button>
                  <button
                    onClick={() => setSelectedTestament('NT')}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      selectedTestament === 'NT'
                        ? 'bg-amber-800 text-amber-50 dark:bg-amber-600 shadow-sm'
                        : 'bg-amber-200/40 text-amber-900 dark:bg-stone-800 dark:text-stone-300 hover:bg-amber-200/80 dark:hover:bg-stone-750'
                    }`}
                  >
                    Novo Testamento (27)
                  </button>
                </div>
              </div>
            )}

            {/* Book or Chapter Selection Grid */}
            <div className="p-3.5 overflow-y-auto flex-1">
              {mode === 'BOOK' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredBooks.map((book) => {
                    const isSelected = book.id === currentBookId;
                    const isHovered = hoveredBook?.id === book.id;
                    const isInfoActive = activeInfoBook?.id === book.id;

                    return (
                      <div
                        key={book.id}
                        onMouseEnter={() => setHoveredBook(book)}
                        onMouseLeave={() => setHoveredBook(null)}
                        className={`group relative rounded-xl border transition-all duration-150 p-2.5 flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-800 text-amber-50 border-amber-900 dark:bg-amber-650 dark:border-amber-500 shadow-md ring-2 ring-amber-600/30'
                            : isHovered || isInfoActive
                            ? 'bg-amber-100/80 dark:bg-stone-750 border-amber-700/40 text-amber-950 dark:text-amber-100 shadow-sm'
                            : 'bg-white dark:bg-stone-800/80 border-amber-900/10 dark:border-stone-700/80 text-amber-950 dark:text-amber-100 hover:border-amber-700/40'
                        }`}
                        onClick={() => handleBookClick(book)}
                      >
                        <div className="flex items-start justify-between">
                          <span className={`text-[11px] font-mono font-bold uppercase tracking-wide ${isSelected ? 'text-amber-200' : 'text-amber-800/60 dark:text-amber-400/70'}`}>
                            {book.abbreviation}
                          </span>
                          
                          {/* Quick Info Button */}
                          <button
                            onClick={(e) => handleInfoButtonClick(e, book)}
                            className={`p-1 rounded-md transition-colors text-xs ${
                              isSelected
                                ? 'text-amber-100 hover:bg-amber-700'
                                : 'text-amber-800/50 hover:text-amber-900 hover:bg-amber-200/60 dark:text-stone-400 dark:hover:text-amber-200 dark:hover:bg-stone-700'
                            }`}
                            title={`Ver resumo e contexto de ${book.name}`}
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="my-1">
                          <h3 className="font-serif font-bold text-sm leading-tight">{book.name}</h3>
                        </div>

                        <div className={`flex items-center justify-between text-[10px] font-medium pt-1 ${isSelected ? 'text-amber-200/90' : 'text-amber-900/60 dark:text-stone-400'}`}>
                          <span className="truncate max-w-[70%]">{book.category}</span>
                          <span>{book.totalChapters} cap.</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Chapter Selection Grid & Context Header */
                <div className="space-y-4">
                  {/* Collapsible Book Context Banner */}
                  {selectedBook && summaryData && (
                    <div className="bg-amber-100/70 dark:bg-stone-800/90 border border-amber-900/15 dark:border-stone-700 rounded-xl p-3.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-amber-800 text-amber-50 dark:bg-amber-600">
                            {selectedBook.abbreviation}
                          </span>
                          <h3 className="font-serif font-bold text-base text-amber-950 dark:text-amber-100">
                            {selectedBook.name}
                          </h3>
                          <span className="text-xs text-amber-900/60 dark:text-stone-400 hidden sm:inline">
                            • {selectedBook.category}
                          </span>
                        </div>

                        <button
                          onClick={() => setIsChapterSummaryExpanded(!isChapterSummaryExpanded)}
                          className="flex items-center gap-1 text-xs font-medium text-amber-900 dark:text-amber-200 hover:underline"
                        >
                          {isChapterSummaryExpanded ? (
                            <>
                              <span>Ocultar resumo</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Ver tema & autor</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>

                      {isChapterSummaryExpanded && (
                        <div className="mt-3 pt-3 border-t border-amber-900/10 dark:border-stone-700/80 space-y-2 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex items-center gap-1.5 text-amber-900/90 dark:text-stone-300">
                              <User className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                              <span><strong className="font-semibold text-amber-950 dark:text-amber-100">Autor:</strong> {summaryData.author} ({summaryData.period})</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-amber-900/90 dark:text-stone-300">
                              <Compass className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                              <span><strong className="font-semibold text-amber-950 dark:text-amber-100">Palavra-chave:</strong> {summaryData.keyWord}</span>
                            </div>
                          </div>

                          <div className="text-amber-900/80 dark:text-stone-300 leading-relaxed bg-amber-50/70 dark:bg-stone-850 p-2.5 rounded-lg border border-amber-900/10 dark:border-stone-750">
                            <strong className="font-semibold text-amber-950 dark:text-amber-100">Tema Central: </strong>
                            {summaryData.centralTheme}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Chapter Buttons Grid */}
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                    {Array.from({ length: selectedBook?.totalChapters || 1 }, (_, i) => i + 1).map((num) => {
                      const isCurrent = selectedBook?.id === currentBookId && num === currentChapter;
                      return (
                        <button
                          key={num}
                          onClick={() => handleChapterClick(num)}
                          className={`h-11 rounded-xl font-serif font-semibold text-sm transition-all flex items-center justify-center border ${
                            isCurrent
                              ? 'bg-amber-800 text-amber-50 border-amber-900 dark:bg-amber-600 dark:border-amber-500 shadow-md ring-2 ring-amber-500/50'
                              : 'bg-white dark:bg-stone-800 border-amber-900/10 dark:border-stone-700 text-amber-950 dark:text-amber-100 hover:bg-amber-200/60 dark:hover:bg-stone-700'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Summary Sidebar (Visible on desktop or when activeInfoBook is focused) */}
          {summaryData && activePreviewBook && (
            <div className={`w-full md:w-80 lg:w-96 bg-amber-100/30 dark:bg-stone-850 p-4 border-t md:border-t-0 md:border-l border-amber-900/10 dark:border-stone-800 overflow-y-auto flex flex-col justify-between ${mode === 'CHAPTER' ? 'hidden md:flex' : 'flex'}`}>
              <div className="space-y-3.5">
                
                {/* Book Badge & Title Header */}
                <div className="flex items-start justify-between pb-3 border-b border-amber-900/10 dark:border-stone-800">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-amber-800 text-amber-50 dark:bg-amber-600">
                        {activePreviewBook.abbreviation}
                      </span>
                      <span className="text-xs font-semibold text-amber-900/70 dark:text-amber-300">
                        {activePreviewBook.testament === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-amber-950 dark:text-amber-100">
                      {activePreviewBook.name}
                    </h3>
                    <p className="text-xs text-amber-900/60 dark:text-stone-400">
                      {activePreviewBook.category} • {activePreviewBook.totalChapters} capítulos
                    </p>
                  </div>
                </div>

                {/* Author & Period Box */}
                <div className="space-y-2 bg-white/80 dark:bg-stone-800/80 p-3 rounded-xl border border-amber-900/10 dark:border-stone-750 shadow-xs">
                  <div className="flex items-center gap-2 text-xs text-amber-950 dark:text-amber-100">
                    <User className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                    <div>
                      <span className="font-bold">Autor Tradicional:</span>
                      <p className="text-amber-900/80 dark:text-stone-300">{summaryData.author}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-amber-950 dark:text-amber-100 pt-1.5 border-t border-amber-900/5 dark:border-stone-750">
                    <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                    <div>
                      <span className="font-bold">Período Histórico:</span>
                      <p className="text-amber-900/80 dark:text-stone-300">{summaryData.period}</p>
                    </div>
                  </div>
                </div>

                {/* Central Theme */}
                <div className="bg-amber-50 dark:bg-stone-800 p-3 rounded-xl border border-amber-900/10 dark:border-stone-750 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 dark:text-amber-100">
                    <Compass className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>Tema Central</span>
                  </div>
                  <p className="text-xs text-amber-900/90 dark:text-stone-300 leading-relaxed font-serif italic">
                    "{summaryData.centralTheme}"
                  </p>
                </div>

                {/* General Summary */}
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-950 dark:text-amber-100 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    <span>Visão Geral & Contexto</span>
                  </h4>
                  <p className="text-xs text-amber-900/80 dark:text-stone-300 leading-relaxed bg-white/60 dark:bg-stone-800/60 p-3 rounded-xl border border-amber-900/10 dark:border-stone-750">
                    {summaryData.summary}
                  </p>
                </div>

                {/* Christ Connection (Cristocentrismo) */}
                {summaryData.christConnection && (
                  <div className="bg-amber-200/40 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-700/20 dark:border-amber-600/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 dark:text-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                      <span>Conexão Cristocêntrica</span>
                    </div>
                    <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
                      {summaryData.christConnection}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {mode === 'BOOK' && (
                <div className="pt-4 mt-2 border-t border-amber-900/10 dark:border-stone-800">
                  <button
                    onClick={() => handleBookClick(activePreviewBook)}
                    className="w-full py-2.5 px-4 bg-amber-800 hover:bg-amber-900 dark:bg-amber-600 dark:hover:bg-amber-500 text-amber-50 font-medium text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Selecionar capítulos de {activePreviewBook.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

