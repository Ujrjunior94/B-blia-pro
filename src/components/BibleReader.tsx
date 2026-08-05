import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Search,
  Settings,
  ArrowLeft,
  MessageSquare,
  Volume2,
  Copy,
  Check,
  Share2,
  Highlighter,
  ChevronDown,
  Sparkles,
  Palette,
  Image,
  Loader2,
  RefreshCw,
  Info,
  X,
  ChevronUp
} from 'lucide-react';
import { BibleBook, BibleVersionCode, ReaderSettings, UserBookmark, UserHighlight, UserNote, Verse } from '../types';
import { fetchChapterVerses } from '../services/bibleService';
import { localDB } from '../utils/db';
import { VerseShareModal } from './VerseShareModal';

interface BibleReaderProps {
  currentBook: BibleBook;
  currentChapter: number;
  settings: ReaderSettings;
  setSettings: React.Dispatch<React.SetStateAction<ReaderSettings>>;
  onNavigateChapter: (direction: 'PREV' | 'NEXT') => void;
  onOpenBookSelector: () => void;
  onOpenStudyGuide?: (bookId: string) => void;
}

export const BibleReader: React.FC<BibleReaderProps> = ({
  currentBook,
  currentChapter,
  settings,
  setSettings,
  onNavigateChapter,
  onOpenBookSelector,
  onOpenStudyGuide,
}) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [highlights, setHighlights] = useState<UserHighlight[]>([]);
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [copiedVerseNum, setCopiedVerseNum] = useState<number | null>(null);
  const [shareVerseModal, setShareVerseModal] = useState<Verse | null>(null);

  // AI Sacred Art / Image generation states
  const [showArtPanel, setShowArtPanel] = useState(false);
  const [artStyle, setArtStyle] = useState('Pintura Clássica a Óleo');
  const [chapterArt, setChapterArt] = useState<any>(null);
  const [artLoading, setArtLoading] = useState(false);
  const [artError, setArtError] = useState<string | null>(null);
  const [loadingPhase, setLoadingPhase] = useState('');
  const [showTheologyDetail, setShowTheologyDetail] = useState(true);

  // Sync / Load cached artwork for current book & chapter
  useEffect(() => {
    const cacheKey = `bible-art-${currentBook.id}-${currentChapter}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        setChapterArt(JSON.parse(cached));
      } catch (e) {
        setChapterArt(null);
      }
    } else {
      setChapterArt(null);
    }
    setArtError(null);
  }, [currentBook.id, currentChapter]);

  // Loading phase messages rotation
  useEffect(() => {
    if (!artLoading) return;
    const phases = [
      'Analisando o simbolismo teológico da passagem...',
      'Desenhando os símbolos do pacto da redenção...',
      'Preparando pigmentos clássicos do estilo selecionado...',
      'Invocando o modelo de geração de imagens com IA...',
      'Ajustando a iluminação celestial e contrastes finais...',
      'Finalizando a renderização da obra de arte sacra...'
    ];
    let index = 0;
    setLoadingPhase(phases[0]);
    const interval = setInterval(() => {
      index = (index + 1) % phases.length;
      setLoadingPhase(phases[index]);
    }, 2800);
    return () => clearInterval(interval);
  }, [artLoading]);

  // Handle generation call
  const handleGenerateArt = async (selectedStyle = artStyle) => {
    setArtLoading(true);
    setArtError(null);
    try {
      const response = await fetch('/api/theology/generate-illustration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: currentBook.id,
          chapter: currentChapter,
          style: selectedStyle
        })
      });
      const data = await response.json();
      if (data.success) {
        setChapterArt(data);
        const cacheKey = `bible-art-${currentBook.id}-${currentChapter}`;
        localStorage.setItem(cacheKey, JSON.stringify(data));
      } else {
        setArtError(data.error || 'Não foi possível gerar a ilustração sacra.');
      }
    } catch (err: any) {
      setArtError('Erro de conexão ou falha ao gerar a arte do capítulo.');
    } finally {
      setArtLoading(false);
    }
  };

  // Initialize mock bookmarks and highlights for high-fidelity representation of Salmos 23
  useEffect(() => {
    if (currentBook.id === 'PSA' && currentChapter === 23) {
      // Mock highlight on verse 4 (gold box)
      const mockHL: UserHighlight = {
        id: 'PSA-23-4',
        bookId: 'PSA',
        chapter: 23,
        verse: 4,
        color: 'yellow',
        createdAt: new Date().toISOString(),
      };
      // Mock note on verse 2
      const mockNote: UserNote = {
        id: 'PSA-23-2-note',
        bookId: 'PSA',
        chapter: 23,
        verse: 2,
        text: 'Meditação sobre águas tranquilas e refrigério espiritual.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setHighlights((prev) => {
        if (!prev.some(h => h.id === 'PSA-23-4')) return [...prev, mockHL];
        return prev;
      });
      setNotes((prev) => {
        if (!prev.some(n => n.id === 'PSA-23-2-note')) return [...prev, mockNote];
        return prev;
      });
    }
  }, [currentBook, currentChapter]);

  // Load verses
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchChapterVerses(currentBook.id, currentChapter, settings.version).then((data) => {
      if (isMounted) {
        setVerses(data);
        setLoading(false);
      }
    });

    localDB.getHighlights().then((res) => isMounted && setHighlights((prev) => [...prev.filter(p => !res.some(r => r.id === p.id)), ...res]));
    localDB.getBookmarks().then((res) => isMounted && setBookmarks(res));
    localDB.getNotes().then((res) => isMounted && setNotes((prev) => [...prev.filter(p => !res.some(r => r.id === p.id)), ...res]));

    return () => {
      isMounted = false;
    };
  }, [currentBook.id, currentChapter, settings.version]);

  const handleToggleHighlight = (color: string) => {
    if (!selectedVerse) return;
    const existing = highlights.find(
      (h) => h.bookId === currentBook.id && h.chapter === currentChapter && h.verse === selectedVerse.verse
    );

    if (existing && existing.color === color) {
      localDB.removeHighlight(existing.id);
      setHighlights((prev) => prev.filter((h) => h.id !== existing.id));
    } else {
      const newHL: UserHighlight = {
        id: `${currentBook.id}-${currentChapter}-${selectedVerse.verse}`,
        bookId: currentBook.id,
        chapter: currentChapter,
        verse: selectedVerse.verse,
        color,
        createdAt: new Date().toISOString(),
      };
      localDB.saveHighlight(newHL);
      setHighlights((prev) => [...prev.filter((h) => h.id !== newHL.id), newHL]);
    }
  };

  const handleToggleBookmark = (v: Verse) => {
    const id = `${currentBook.id}-${currentChapter}-${v.verse}`;
    const existing = bookmarks.find((b) => b.id === id);

    if (existing) {
      localDB.removeBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } else {
      const newBM: UserBookmark = {
        id,
        bookId: currentBook.id,
        chapter: currentChapter,
        verse: v.verse,
        createdAt: new Date().toISOString(),
      };
      localDB.saveBookmark(newBM);
      setBookmarks((prev) => [...prev, newBM]);
    }
  };

  const handleSaveNote = () => {
    if (!selectedVerse || !noteText.trim()) return;
    const newNote: UserNote = {
      id: `${currentBook.id}-${currentChapter}-${selectedVerse.verse}-${Date.now()}`,
      bookId: currentBook.id,
      chapter: currentChapter,
      verse: selectedVerse.verse,
      text: noteText.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localDB.saveNote(newNote);
    setNotes((prev) => [...prev, newNote]);
    setNoteText('');
    setIsNoteInputOpen(false);
  };

  const handleReadAloudVerse = (v: Verse) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${v.text}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopyVerse = (v: Verse) => {
    const textToCopy = `"${v.text}" — ${currentBook.name} ${currentChapter}:${v.verse} (${settings.version})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedVerseNum(v.verse);
    setTimeout(() => setCopiedVerseNum(null), 2000);
  };

  const isChapterBookmarked = bookmarks.some(
    (b) => b.bookId === currentBook.id && b.chapter === currentChapter
  );

  const handleToggleWholeChapterBookmark = () => {
    const firstVerse = verses[0] || { verse: 1 };
    handleToggleBookmark({ 
      verse: firstVerse.verse, 
      text: '', 
      bookId: currentBook.id, 
      chapter: currentChapter 
    });
  };

  const getFullVersionName = (code: string) => {
    switch (code) {
      case 'ARC': return 'Almeida Revista e Corrigida (ARC)';
      case 'NAA': return 'Nova Almeida Atualizada (NAA)';
      case 'NVI': return 'Nova Versão Internacional (NVI)';
      default: return 'Almeida Revista e Corrigida (ARC)';
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-5 space-y-4 bg-[#F7F1E5] dark:bg-[#151311] min-h-screen text-[#1F1B16] dark:text-stone-200 pb-24 relative">
      
      {/* 1. Header Navigation Bar (Image 5) */}
      <div className="flex items-center justify-between pb-2">
        <button 
          onClick={onOpenBookSelector}
          className="p-2 rounded-full hover:bg-stone-200/50 text-[#1F1B16] dark:text-stone-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Dropdown Selector */}
        <button
          onClick={onOpenBookSelector}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 text-[#1F1B16] dark:text-amber-100 font-serif font-extrabold text-sm shadow-2xs hover:bg-[#EFE6D6] transition-colors"
        >
          <span>{currentBook.name} {currentChapter}</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#D4A24C]" />
        </button>

        {/* Tools */}
        <div className="flex items-center gap-1">
          <button 
            className="p-2 rounded-full hover:bg-stone-200/50 text-[#1F1B16] dark:text-stone-300 transition-colors cursor-pointer"
            onClick={onOpenBookSelector}
          >
            <Search className="w-4 h-4" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-stone-200/50 text-[#1F1B16] dark:text-stone-300 transition-colors cursor-pointer"
            onClick={() => setSettings(prev => ({ ...prev, fontSize: prev.fontSize === 18 ? 16 : 18 }))}
          >
            <Settings className="w-4 h-4" />
          </button>
          <button 
            className={`p-2 rounded-full transition-colors cursor-pointer ${isChapterBookmarked ? 'text-[#D4A24C]' : 'text-[#1F1B16] dark:text-stone-300 hover:bg-stone-200/50'}`}
            onClick={() => handleToggleWholeChapterBookmark()}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Sub-Header: Version Label & Font Size Adjustment Slider */}
      <div className="p-4 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between text-[11px] font-sans font-bold uppercase tracking-wider text-[#5F5A52]">
          <span>Tradução Ativa</span>
          <span className="text-[#3E5641] dark:text-[#D4A24C]">
            {getFullVersionName(settings.version)}
          </span>
        </div>

        {/* Font Slider Control */}
        <div className="space-y-1">
          <span className="text-[10px] font-sans font-bold text-stone-400 block uppercase">
            Tamanho da fonte
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-serif text-stone-400">A</span>
            <input
              type="range"
              min="14"
              max="26"
              value={settings.fontSize}
              onChange={(e) => setSettings((prev) => ({ ...prev, fontSize: parseInt(e.target.value) }))}
              className="flex-1 accent-[#3E5641] h-1 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
            />
            <span className="text-lg font-serif text-stone-600 font-bold">A</span>
          </div>
        </div>
      </div>

      {/* --- INÍCIO: ILUSTRAÇÃO ARTÍSTICA COM IA (USER REQUEST) --- */}
      <div id="ai-illustration-section" className="space-y-3">
        {/* Toggle Button */}
        <button
          onClick={() => setShowArtPanel(prev => !prev)}
          className="w-full flex items-center justify-between p-4 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 shadow-2xs hover:border-[#D4A24C] dark:hover:border-[#D4A24C] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-amber-500/10 text-[#D4A24C] group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-sans font-extrabold uppercase tracking-widest text-[#1F1B16] dark:text-stone-200">
                Ilustração do Capítulo
              </span>
              <span className="block text-[10px] font-sans text-stone-400 font-bold uppercase mt-0.5">
                Visualização Sacra com IA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-sans font-bold text-[#5F5A52] dark:text-stone-400">
            <span>{showArtPanel ? 'Ocultar' : 'Explorar'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showArtPanel ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {/* Art Panel */}
        {showArtPanel && (
          <div className="p-5 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 shadow-xs space-y-4 animate-fade-in">
            {artLoading ? (
              <div className="py-12 text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-amber-500/10 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#D4A24C] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Palette className="w-6 h-6 text-[#D4A24C] animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1.5 px-4">
                  <p className="text-xs font-serif italic text-stone-500 dark:text-stone-400">{loadingPhase}</p>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-400 animate-pulse">
                    Pintando {currentBook.name} {currentChapter}...
                  </p>
                </div>
              </div>
            ) : artError ? (
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-center space-y-3">
                <p className="text-xs font-sans text-red-600 dark:text-red-400 font-medium">{artError}</p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleGenerateArt()}
                    className="px-4 py-1.5 rounded-full bg-[#3E5641] text-white font-sans text-[10px] font-extrabold uppercase tracking-widest hover:bg-[#2C3E2E] transition-colors cursor-pointer"
                  >
                    Tentar Novamente
                  </button>
                  <button
                    onClick={() => {
                      // Fallback instantly to beautiful Unsplash URL without API call
                      const keywords = `${currentBook.name.toLowerCase()},bible,light`;
                      const seed = `${currentBook.id.toLowerCase()}-${currentChapter}`;
                      const fallbackArt = {
                        title: `${currentBook.name} ${currentChapter}`,
                        artPromptDesc: `Ilustração inspiradora baseada nas verdades de ${currentBook.name} ${currentChapter}.`,
                        theologicalMeaning: `Uma visualização artística criada para refletir a luz de Cristo nas escrituras.`,
                        imageUrl: `https://images.unsplash.com/featured/800x450/?${encodeURIComponent(keywords)}&sig=${encodeURIComponent(seed)}`,
                        usedRealGenerator: false,
                        style: artStyle
                      };
                      setChapterArt(fallbackArt);
                    }}
                    className="px-4 py-1.5 rounded-full border border-stone-300 dark:border-stone-700 font-sans text-[10px] font-bold uppercase tracking-wider text-[#1F1B16] dark:text-stone-300 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    Usar Imagem Alternativa
                  </button>
                </div>
              </div>
            ) : chapterArt ? (
              <div className="space-y-4 animate-fade-in">
                {/* Art Image Frame with absolute positioning and custom labels */}
                <div className="relative rounded-2xl overflow-hidden border border-[#E7DECF]/85 dark:border-stone-800 shadow-xs bg-stone-100 dark:bg-stone-900 aspect-video group">
                  <img
                    src={chapterArt.imageUrl}
                    alt={chapterArt.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full bg-[#1C1A18]/85 text-[#F7F1E5] font-sans text-[9px] font-extrabold uppercase tracking-wider border border-[#E7DECF]/15 shadow-sm backdrop-blur-xs flex items-center gap-1">
                      <Palette className="w-2.5 h-2.5 text-[#D4A24C]" />
                      {chapterArt.style}
                    </span>
                    {chapterArt.usedRealGenerator ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#3E5641]/90 text-[#F7F1E5] font-sans text-[9px] font-extrabold uppercase tracking-wider border border-[#F7F1E5]/15 shadow-sm backdrop-blur-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
                        Imagen 3 AI
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-600/90 text-white font-sans text-[9px] font-extrabold uppercase tracking-wider border border-white/10 shadow-sm backdrop-blur-xs">
                        Arte de Comunidade
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Desctiption */}
                <div className="space-y-1">
                  <h4 className="font-serif font-extrabold text-[#1F1B16] dark:text-amber-100 text-base md:text-lg leading-tight tracking-tight">
                    {chapterArt.title}
                  </h4>
                  <p className="text-xs font-serif italic text-stone-500 dark:text-stone-400">
                    {chapterArt.artPromptDesc}
                  </p>
                </div>

                {/* Theological Meaning Collapsible Box */}
                <div className="p-4 rounded-2xl bg-[#FAF5EB] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 space-y-2">
                  <button
                    onClick={() => setShowTheologyDetail(p => !p)}
                    className="w-full flex items-center justify-between text-[11px] font-sans font-extrabold uppercase tracking-wider text-[#3E5641] dark:text-[#D4A24C] cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      Significado Teológico & Cristocentrismo
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTheologyDetail ? 'rotate-180' : ''}`} />
                  </button>
                  {showTheologyDetail && (
                    <p className="text-[12.5px] font-serif leading-relaxed text-stone-700 dark:text-stone-300 pt-1 text-justify">
                      {chapterArt.theologicalMeaning}
                    </p>
                  )}
                </div>

                {/* English Prompt details for power users */}
                {chapterArt.englishPrompt && (
                  <details className="group border-t border-stone-200/50 dark:border-stone-800 pt-2.5">
                    <summary className="list-none flex items-center justify-between text-[10px] font-sans font-bold text-stone-400 uppercase cursor-pointer hover:text-stone-600 select-none">
                      <span>Ver Prompt Técnico da IA (Imagen)</span>
                      <ChevronDown className="w-3 h-3 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-1.5 text-[11px] font-sans italic bg-stone-50 dark:bg-stone-900/40 p-2.5 rounded-lg border border-stone-200/40 dark:border-stone-800/80 text-stone-500 text-justify">
                      "{chapterArt.englishPrompt}"
                    </p>
                  </details>
                )}

                {/* Re-generate Style Panel */}
                <div className="pt-2.5 border-t border-stone-200/60 dark:border-stone-800/80 space-y-2">
                  <span className="block text-[10px] font-sans font-extrabold uppercase tracking-wider text-stone-400">
                    Mudar Estilo Visual
                  </span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {[
                      'Pintura Clássica a Óleo',
                      'Vidro de Catedral / Vitral',
                      'Mosaico Bizantino Antigo',
                      'Aquarela Minimalista',
                      'Gravura em Metal Renascentista'
                    ].map((st) => (
                      <button
                        key={st}
                        onClick={() => {
                          setArtStyle(st);
                          handleGenerateArt(st);
                        }}
                        disabled={artLoading}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-sans font-bold transition-all shrink-0 cursor-pointer ${
                          chapterArt.style === st
                            ? 'bg-[#3E5641] text-[#F7F1E5] shadow-2xs'
                            : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200/60 dark:border-stone-800 hover:bg-stone-200/50'
                        }`}
                      >
                        {st.replace('Vidro de Catedral / ', '')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="space-y-1.5 max-w-xs mx-auto">
                  <h4 className="font-serif font-extrabold text-sm text-[#1F1B16] dark:text-stone-200">
                    Nenhuma Ilustração Gerada
                  </h4>
                  <p className="text-xs font-serif text-stone-500 dark:text-stone-400">
                    Crie uma representação visual inspiradora para {currentBook.name} {currentChapter} baseada na teologia do texto.
                  </p>
                </div>

                {/* Style selection pills prior to generation */}
                <div className="space-y-1.5 text-left max-w-sm mx-auto">
                  <span className="block text-[10px] font-sans font-bold uppercase tracking-wider text-stone-400 text-center">
                    Selecione o Estilo Artístico
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {[
                      'Pintura Clássica a Óleo',
                      'Vidro de Catedral / Vitral',
                      'Mosaico Bizantino Antigo',
                      'Aquarela Minimalista',
                      'Gravura em Metal Renascentista'
                    ].map((st) => (
                      <button
                        key={st}
                        onClick={() => setArtStyle(st)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-sans font-bold transition-all cursor-pointer ${
                          artStyle === st
                            ? 'bg-[#3E5641] text-[#F7F1E5] shadow-2xs'
                            : 'bg-stone-100 dark:bg-stone-900 text-[#5F5A52] dark:text-stone-400 border border-stone-200/50 dark:border-stone-800 hover:bg-stone-200/50'
                        }`}
                      >
                        {st.replace('Vidro de Catedral / ', '')}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleGenerateArt()}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#D4A24C] hover:bg-[#C0923E] text-[#1F1B16] font-sans text-xs font-extrabold uppercase tracking-widest shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#1F1B16]" />
                  <span>Gerar Ilustração Sacra</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Sacred Editorial Scriptures text flow (Image 5 style) */}
      {loading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-6 h-6 border-2 border-[#3E5641] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-serif italic text-stone-500">Buscando o texto...</p>
        </div>
      ) : (
        <div className="bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-2xs space-y-4 font-serif">
          
          <div className="space-y-3.5 leading-relaxed text-justify">
            {verses.map((v) => {
              const isSelected = selectedVerse?.verse === v.verse;
              const hasHighlight = highlights.find(
                (h) => h.bookId === currentBook.id && h.chapter === currentChapter && h.verse === v.verse
              );
              const isBookmarked = bookmarks.some(
                (b) => b.bookId === currentBook.id && b.chapter === currentChapter && b.verse === v.verse
              );
              const verseNotes = notes.filter(
                (n) => n.bookId === currentBook.id && n.chapter === currentChapter && n.verse === v.verse
              );

              // Render highlights inline or in gold containers (v4 highlighted in gold container)
              const containerHL = hasHighlight && hasHighlight.color === 'yellow';

              return (
                <div
                  key={v.verse}
                  onClick={() => setSelectedVerse(v)}
                  className={`p-2 rounded-2xl transition-all cursor-pointer relative ${
                    containerHL
                      ? 'bg-[#D4A24C]/15 border border-[#D4A24C]/45 shadow-3xs p-3.5'
                      : isSelected
                      ? 'bg-[#E7DECF]/30'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-1">
                    {/* Verse Number in Gold superscript */}
                    <span className="font-serif font-extrabold text-[11px] text-[#D4A24C] mr-1.5 select-none align-super">
                      {v.verse}
                    </span>

                    {/* Verse Content */}
                    <p
                      style={{ fontSize: `${settings.fontSize}px`, lineHeight: 1.6 }}
                      className="text-[#1F1B16] dark:text-stone-100 font-serif leading-relaxed text-justify tracking-wide flex-1"
                    >
                      {v.text}
                    </p>

                    {/* Note indicator icon */}
                    {verseNotes.length > 0 && (
                      <span className="p-1 rounded-full text-[#D4A24C] shrink-0" title="Ver anotação">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Inline Action block for verse */}
                  {isSelected && (
                    <div className="mt-3.5 pt-2.5 border-t border-[#E7DECF] dark:border-stone-800 flex items-center justify-between gap-2 animate-fade-in">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleToggleHighlight('yellow'); }}
                          className="w-4 h-4 rounded-full bg-amber-300 border border-amber-400"
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); handleToggleHighlight('green'); }}
                          className="w-4 h-4 rounded-full bg-emerald-300 border border-emerald-400"
                        />
                        <button
                          onClick={(e) => { e.stopPropagation(); handleToggleHighlight('blue'); }}
                          className="w-4 h-4 rounded-full bg-sky-300 border border-sky-400"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleToggleBookmark(v); }}
                          className={`p-1.5 rounded-lg text-[10px] font-sans font-bold flex items-center gap-1 ${
                            isBookmarked ? 'bg-[#D4A24C] text-[#1F1B16]' : 'bg-[#F7F1E5] dark:bg-stone-850 text-theme-primary'
                          }`}
                        >
                          <Bookmark className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsNoteInputOpen(true); }}
                          className="p-1.5 rounded-lg text-[10px] font-sans font-bold bg-[#F7F1E5] dark:bg-stone-850 text-theme-primary flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleReadAloudVerse(v); }}
                          className="p-1.5 rounded-lg text-[10px] font-sans font-bold bg-[#F7F1E5] dark:bg-stone-850 text-theme-primary flex items-center"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCopyVerse(v); }}
                          className="p-1.5 rounded-lg text-[10px] font-sans font-bold bg-[#F7F1E5] dark:bg-stone-850 text-theme-primary flex items-center"
                        >
                          {copiedVerseNum === v.verse ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Inline notes text display */}
                  {!isSelected && verseNotes.length > 0 && (
                    <div className="mt-2 p-2 bg-[#F7F1E5]/60 dark:bg-stone-850 rounded-xl text-[10px] font-serif italic text-stone-500 border border-stone-200/50 dark:border-stone-800">
                      {verseNotes[0].text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 4. Bottom Chapter Navigator (Image 5 style) */}
      <div className="flex items-center justify-between pt-4 pb-6 border-t border-[#E7DECF]">
        <button
          onClick={() => onNavigateChapter('PREV')}
          disabled={currentChapter <= 1}
          className="p-2.5 rounded-xl bg-[#FFFDF8] dark:bg-stone-850 hover:bg-[#F7F1E5] text-theme-primary disabled:opacity-45 shadow-2xs border border-[#E7DECF] cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenBookSelector}
          className="px-4 py-1.5 rounded-full bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] text-xs font-serif font-extrabold text-[#5F5A52]"
        >
          Capítulo {currentChapter}
        </button>

        <button
          onClick={() => onNavigateChapter('NEXT')}
          disabled={currentChapter >= currentBook.totalChapters}
          className="p-2.5 rounded-xl bg-[#FFFDF8] dark:bg-stone-850 hover:bg-[#F7F1E5] text-theme-primary disabled:opacity-45 shadow-2xs border border-[#E7DECF] cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Plus action button (Image 5) */}
      <button
        onClick={onOpenBookSelector}
        className="fixed bottom-24 right-6 z-40 p-3.5 rounded-full bg-[#3E5641] text-[#FFFDF8] shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer border border-[#3E5641]/10 font-bold"
        title="Estudar"
      >
        <span className="text-xl leading-none font-bold">+</span>
      </button>

      {/* Note modal */}
      {isNoteInputOpen && selectedVerse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 rounded-3xl p-6 space-y-4 shadow-2xl text-[#1F1B16] dark:text-stone-200">
            <h3 className="font-serif font-extrabold text-base">
              Anotação pessoal — {currentBook.name} {currentChapter}:{selectedVerse.verse}
            </h3>
            <textarea
              rows={4}
              placeholder="Escreva sua meditação..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full p-3.5 text-xs bg-[#FFFDF8] dark:bg-stone-800 border border-[#E7DECF] rounded-xl text-stone-900 dark:text-amber-100 focus:outline-none focus:border-[#3E5641] font-serif"
            />
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setIsNoteInputOpen(false)} className="px-3 py-1.5 text-xs text-stone-400">
                Cancelar
              </button>
              <button onClick={handleSaveNote} className="px-4 py-2 bg-[#3E5641] text-[#FFFDF8] rounded-xl text-xs font-bold uppercase tracking-wider">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
