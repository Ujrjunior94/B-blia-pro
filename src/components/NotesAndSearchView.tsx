import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Highlighter, Bookmark, Download, Trash2, ExternalLink, Sparkles, Tag, Heart, Flame, BookOpen, Shield, HelpCircle } from 'lucide-react';
import { BibleBook, UserBookmark, UserHighlight, UserNote } from '../types';
import { BIBLE_BOOKS, getBookById } from '../data/bibleBooks';
import { searchBibleVerses } from '../services/bibleService';
import { localDB } from '../utils/db';
import { removeHighlight, subscribeUserHighlights } from '../services/highlightService';
import { auth, onAuthStateChanged } from '../services/firebase';
import { SMART_SEARCH_CATEGORIES, SmartCategoryItem } from '../data/smartSearchData';

interface NotesAndSearchViewProps {
  onOpenVerse: (bookId: string, chapter: number) => void;
}

export const NotesAndSearchView: React.FC<NotesAndSearchViewProps> = ({ onOpenVerse }) => {
  const [activeSubTab, setActiveSubTab] = useState<'search' | 'notes' | 'highlights' | 'bookmarks'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ book: BibleBook; chapter: number; verse: number; text: string }[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('todos');

  const smartCategoryResults = SMART_SEARCH_CATEGORIES.filter((item) => {
    if (selectedCategoryFilter !== 'todos' && item.category !== selectedCategoryFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [highlights, setHighlights] = useState<UserHighlight[]>([]);
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);

  useEffect(() => {
    localDB.getNotes().then(setNotes);
    localDB.getHighlights().then(setHighlights);
    localDB.getBookmarks().then(setBookmarks);

    let hlUnsub: (() => void) | null = null;
    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        hlUnsub = subscribeUserHighlights(user.uid, (remoteHLs) => {
          setHighlights(remoteHLs);
        });
      }
    });

    return () => {
      authUnsub();
      if (hlUnsub) hlUnsub();
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const res = searchBibleVerses(searchQuery, 'ARC');
    setSearchResults(res);
  };

  const handleDeleteNote = (id: string) => {
    localDB.deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleDeleteHighlight = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await removeHighlight(id);
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  };

  const handleExportBackup = async () => {
    const jsonStr = await localDB.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jornada-da-biblia-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Subtab Navigation Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-amber-900/15 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('search')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'search'
                ? 'bg-amber-800 text-amber-50 dark:bg-amber-600'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Busca na Bíblia</span>
          </button>

          <button
            onClick={() => setActiveSubTab('notes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'notes'
                ? 'bg-amber-800 text-amber-50 dark:bg-amber-600'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Minhas Anotações ({notes.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('highlights')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'highlights'
                ? 'bg-amber-800 text-amber-50 dark:bg-amber-600'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Highlighter className="w-4 h-4" />
            <span>Destaques ({highlights.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bookmarks')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'bookmarks'
                ? 'bg-amber-800 text-amber-50 dark:bg-amber-600'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Marcadores ({bookmarks.length})</span>
          </button>
        </div>

        <button
          onClick={handleExportBackup}
          className="px-3.5 py-2 rounded-xl bg-amber-100 text-amber-950 dark:bg-stone-800 dark:text-amber-200 text-xs font-semibold hover:bg-amber-200 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Backup (JSON)</span>
        </button>
      </div>

      {/* Tab 1: Search */}
      {activeSubTab === 'search' && (
        <div className="space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Pesquisar por palavra, tema, emoção, personagem, milagre, profecia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-stone-900 border border-amber-900/15 dark:border-stone-800 rounded-2xl text-stone-900 dark:text-amber-100 font-serif focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-amber-800 dark:bg-amber-600 text-amber-50 font-serif font-bold text-sm hover:bg-amber-900 transition-colors shadow"
            >
              Pesquisar
            </button>
          </form>

          {/* Categorias de Busca Inteligente */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-400">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Filtros de Busca Temática e Exegética:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {['todos', 'tema', 'emoção', 'personagem', 'milagre', 'profecia', 'parábola', 'doutrina', 'pecado', 'promessa', 'oração'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all ${
                    selectedCategoryFilter === cat
                      ? 'bg-amber-700 text-amber-50 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Smart Categorized Results */}
          {smartCategoryResults.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  Tópicos e Categorias Encontrados ({smartCategoryResults.length})
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {smartCategoryResults.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-amber-900/15 dark:border-stone-800 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 dark:text-amber-100">{item.title}</h3>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">{item.summary}</p>
                    </div>
                    <div className="space-y-1.5 pt-1 border-t border-stone-100 dark:border-stone-800">
                      {item.keyVerses.map((kv, idx) => (
                        <div
                          key={idx}
                          onClick={() => onOpenVerse(kv.bookId, kv.chapter)}
                          className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 cursor-pointer transition-colors"
                        >
                          <span className="text-xs font-bold text-amber-800 dark:text-amber-400 block mb-0.5">
                            📖 {kv.reference}
                          </span>
                          <p className="text-xs font-serif italic text-stone-700 dark:text-stone-300">
                            "{kv.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-stone-500 font-semibold">{searchResults.length} resultados encontrados:</p>
              <div className="space-y-3">
                {searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onOpenVerse(item.book.id, item.chapter)}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-amber-900/10 dark:border-stone-800 hover:border-amber-600 cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-amber-900 dark:text-amber-300">
                        {item.book.name} {item.chapter}:{item.verse}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">Abrir capítulo →</span>
                    </div>
                    <p className="font-serif text-sm text-stone-800 dark:text-stone-200 leading-relaxed italic">
                      "{item.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Notes */}
      {activeSubTab === 'notes' && (
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <MessageSquare className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto" />
              <p className="font-serif text-stone-500">Nenhuma anotação guardada ainda.</p>
              <p className="text-xs text-stone-400">Ao ler a Bíblia, toque em um versículo e selecione "Anotar".</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((n) => {
                const book = getBookById(n.bookId);
                return (
                  <div key={n.id} className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-amber-900/10 dark:border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => onOpenVerse(n.bookId, n.chapter)}
                        className="font-serif font-bold text-sm text-amber-900 dark:text-amber-300 hover:underline"
                      >
                        {book ? book.name : n.bookId} {n.chapter}:{n.verse}
                      </button>
                      <button
                        onClick={() => handleDeleteNote(n.id)}
                        className="p-1 rounded text-rose-500 hover:bg-rose-100 dark:hover:bg-stone-800"
                        title="Excluir anotação"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-stone-800 dark:text-stone-200 font-serif leading-relaxed italic">{n.text}</p>
                    <span className="text-[10px] text-stone-400 block">{new Date(n.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Highlights */}
      {activeSubTab === 'highlights' && (
        <div className="space-y-3">
          {highlights.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Highlighter className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto" />
              <p className="font-serif text-stone-500">Nenhum versículo destacado ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights.map((h) => {
                const book = getBookById(h.bookId);
                const colorLabel =
                  h.color === 'yellow' ? 'Ouro' :
                  h.color === 'green' ? 'Esperança' :
                  h.color === 'blue' ? 'Graça' :
                  h.color === 'purple' ? 'Realeza' :
                  h.color === 'pink' ? 'Amor' : h.color;

                const colorDot =
                  h.color === 'yellow' ? 'bg-amber-400' :
                  h.color === 'green' ? 'bg-emerald-400' :
                  h.color === 'blue' ? 'bg-sky-400' :
                  h.color === 'purple' ? 'bg-purple-400' :
                  h.color === 'pink' ? 'bg-rose-400' : 'bg-amber-400';

                return (
                  <div
                    key={h.id}
                    onClick={() => onOpenVerse(h.bookId, h.chapter)}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-amber-900/10 dark:border-stone-800 cursor-pointer hover:border-amber-600 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${colorDot} shrink-0`} />
                      <div>
                        <span className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100">
                          {book ? book.name : h.bookId} {h.chapter}:{h.verse}
                        </span>
                        <span className="text-xs text-stone-500 block">Destaque {colorLabel}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleDeleteHighlight(h.id, e)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Excluir destaque"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-amber-700 font-semibold group-hover:translate-x-0.5 transition-transform">Ir para →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Bookmarks */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarks.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Bookmark className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto" />
              <p className="font-serif text-stone-500">Nenhum marcador salvo ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bookmarks.map((b) => {
                const book = getBookById(b.bookId);
                return (
                  <div
                    key={b.id}
                    onClick={() => onOpenVerse(b.bookId, b.chapter)}
                    className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-amber-900/10 dark:border-stone-800 cursor-pointer hover:border-amber-600 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      <span className="font-serif font-bold text-sm text-stone-900 dark:text-amber-100">
                        {book ? book.name : b.bookId} {b.chapter}:{b.verse}
                      </span>
                    </div>
                    <span className="text-xs text-amber-700 font-semibold">Abrir →</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
