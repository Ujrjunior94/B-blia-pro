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
  ChevronUp,
  Cloud,
  CloudCheck,
  Trash2,
  Maximize2,
  Minimize2,
  Eye,
  Scroll,
  Feather,
  BookOpen,
  Sun,
  Moon,
  Layers,
  Play,
  Pause,
  ChevronsDown,
  FastForward,
  Gauge
} from 'lucide-react';
import { BibleBook, BibleVersionCode, ReaderSettings, UserBookmark, UserHighlight, UserNote, Verse } from '../types';
import { fetchChapterVerses, BIBLE_VERSIONS } from '../services/bibleService';
import { localDB } from '../utils/db';
import { VerseShareModal } from './VerseShareModal';
import { DevotionalCardModal } from './DevotionalCardModal';
import { saveHighlight, removeHighlight, subscribeUserHighlights } from '../services/highlightService';
import { auth, onAuthStateChanged } from '../services/firebase';

const HIGHLIGHT_COLORS = [
  {
    id: 'yellow',
    name: 'Ouro (Amarelo)',
    dotBg: 'bg-amber-400 border-amber-500',
    containerStyle: 'bg-amber-100/90 dark:bg-amber-950/50 border-l-4 border-l-amber-500 border-amber-300/60 dark:border-amber-800/60 shadow-3xs p-3.5',
    badgeStyle: 'bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200'
  },
  {
    id: 'green',
    name: 'Esperança (Verde)',
    dotBg: 'bg-emerald-400 border-emerald-500',
    containerStyle: 'bg-emerald-100/90 dark:bg-emerald-950/50 border-l-4 border-l-emerald-500 border-emerald-300/60 dark:border-emerald-800/60 shadow-3xs p-3.5',
    badgeStyle: 'bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-200'
  },
  {
    id: 'blue',
    name: 'Graça (Azul)',
    dotBg: 'bg-sky-400 border-sky-500',
    containerStyle: 'bg-sky-100/90 dark:bg-sky-950/50 border-l-4 border-l-sky-500 border-sky-300/60 dark:border-sky-800/60 shadow-3xs p-3.5',
    badgeStyle: 'bg-sky-200/80 dark:bg-sky-900/60 text-sky-950 dark:text-sky-200'
  },
  {
    id: 'purple',
    name: 'Realeza (Roxo)',
    dotBg: 'bg-purple-400 border-purple-500',
    containerStyle: 'bg-purple-100/90 dark:bg-purple-950/50 border-l-4 border-l-purple-500 border-purple-300/60 dark:border-purple-800/60 shadow-3xs p-3.5',
    badgeStyle: 'bg-purple-200/80 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200'
  },
  {
    id: 'pink',
    name: 'Amor (Rosa)',
    dotBg: 'bg-rose-400 border-rose-500',
    containerStyle: 'bg-rose-100/90 dark:bg-rose-950/50 border-l-4 border-l-rose-500 border-rose-300/60 dark:border-rose-800/60 shadow-3xs p-3.5',
    badgeStyle: 'bg-rose-200/80 dark:bg-rose-900/60 text-rose-950 dark:text-rose-200'
  }
];

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFirebaseSynced, setIsFirebaseSynced] = useState<boolean>(false);
  const [showVersionModal, setShowVersionModal] = useState<boolean>(false);
  const [showAppearanceModal, setShowAppearanceModal] = useState<boolean>(false);
  const [devotionalModalVerse, setDevotionalModalVerse] = useState<Verse | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState<number>(2); // 1 to 5 speed level

  // Long-press detection states for verses
  const longPressTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [longPressedVerse, setLongPressedVerse] = useState<Verse | null>(null);
  const touchStartPosRef = React.useRef<{ x: number; y: number } | null>(null);

  const handleStartPressVerse = (v: Verse, e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchStartPosRef.current = { x: clientX, y: clientY };

    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);

    longPressTimerRef.current = setTimeout(() => {
      if (window.navigator && 'vibrate' in window.navigator) {
        try { window.navigator.vibrate(50); } catch (_) {}
      }
      setSelectedVerse(v);
      setLongPressedVerse(v);
      showToast(`Versículo ${v.verse} selecionado por clique longo! Escolha a cor do destaque.`);
    }, 450);
  };

  const handleMovePressVerse = (e: React.TouchEvent | React.MouseEvent) => {
    if (!touchStartPosRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const dist = Math.hypot(clientX - touchStartPosRef.current.x, clientY - touchStartPosRef.current.y);

    if (dist > 10 && longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleEndPressVerse = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    touchStartPosRef.current = null;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Auto-scroll smooth mechanism
  useEffect(() => {
    if (!isAutoScrolling) return;

    const speedMs = [65, 42, 26, 16, 9][autoScrollSpeed - 1] || 42;

    const interval = setInterval(() => {
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 20);
      if (isAtBottom) {
        setIsAutoScrolling(false);
        showToast('Rolagem automática concluída no final do capítulo');
        return;
      }
      window.scrollBy({ top: 1, behavior: 'auto' });
    }, speedMs);

    return () => clearInterval(interval);
  }, [isAutoScrolling, autoScrollSpeed]);

  // Subscribe to realtime Firebase highlights when authenticated
  useEffect(() => {
    let hlUnsub: (() => void) | null = null;
    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsFirebaseSynced(true);
        hlUnsub = subscribeUserHighlights(user.uid, (remoteHLs) => {
          setHighlights(remoteHLs);
        });
      } else {
        setIsFirebaseSynced(false);
      }
    });

    return () => {
      authUnsub();
      if (hlUnsub) hlUnsub();
    };
  }, []);

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

  // Load verses & local cached highlights
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

  const handleToggleHighlight = async (color: string, targetVerse?: Verse) => {
    const verseToHighlight = targetVerse || selectedVerse;
    if (!verseToHighlight) return;
    const existing = highlights.find(
      (h) => h.bookId === currentBook.id && h.chapter === currentChapter && h.verse === verseToHighlight.verse
    );

    if (existing && existing.color === color) {
      await removeHighlight(existing.id);
      setHighlights((prev) => prev.filter((h) => h.id !== existing.id));
      showToast(`Destaque removido do versículo ${verseToHighlight.verse}`);
    } else {
      const newHL: UserHighlight = {
        id: `${currentBook.id}-${currentChapter}-${verseToHighlight.verse}`,
        bookId: currentBook.id,
        chapter: currentChapter,
        verse: verseToHighlight.verse,
        color,
        createdAt: new Date().toISOString(),
      };
      await saveHighlight(newHL);
      setHighlights((prev) => [...prev.filter((h) => h.id !== newHL.id), newHL]);

      const colorObj = HIGHLIGHT_COLORS.find(c => c.id === color);
      const colorName = colorObj ? colorObj.name : color;
      const destination = auth.currentUser ? 'e sincronizado no Firebase' : 'salvo no armazenamento local';
      showToast(`Versículo ${verseToHighlight.verse} destacado em ${colorName} (${destination})!`);
    }
    setLongPressedVerse(null);
  };

  const handleRemoveHighlight = async (verseNum: number) => {
    const existing = highlights.find(
      (h) => h.bookId === currentBook.id && h.chapter === currentChapter && h.verse === verseNum
    );
    if (existing) {
      await removeHighlight(existing.id);
      setHighlights((prev) => prev.filter((h) => h.id !== existing.id));
      showToast(`Destaque removido do versículo ${verseNum}`);
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
      case 'INTERLINEAR': return 'Hebraico / Grego Interlinear';
      default: return 'Almeida Revista e Corrigida (ARC)';
    }
  };

  const getThemeContainerClass = (theme: ReaderSettings['theme']) => {
    switch (theme) {
      case 'manuscript':
        return 'bg-[#F2E8D5] text-[#2B1E12] border-2 border-[#8B5A2B]/40 shadow-md font-serif relative overflow-hidden';
      case 'tora':
        return 'bg-[#FAF3E0] text-[#1E1711] border-x-4 md:border-x-8 border-x-[#7B3F00] shadow-xl font-serif relative overflow-hidden';
      case 'sepia':
        return 'bg-[#F4ECD8] text-[#3D2C1E] border border-[#D8C8B0] font-serif';
      case 'dark':
        return 'bg-[#1C1A18] text-[#E0D8C8] border border-stone-800 font-serif';
      case 'light':
      default:
        return 'bg-[#FFFDF8] dark:bg-[#1C1A18] text-[#1F1B16] dark:text-stone-100 border border-[#E7DECF] dark:border-stone-800 font-serif';
    }
  };

  const renderThemeHeaders = (theme: ReaderSettings['theme']) => {
    if (theme === 'tora') {
      return (
        <div className="space-y-3 mb-6">
          <div className="w-full h-5 rounded-full bg-gradient-to-r from-[#3D1E03] via-[#7B3F00] to-[#3D1E03] border-2 border-[#C59B27] shadow-md flex items-center justify-between px-3">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-700 shadow-inner" />
            <span className="text-[9px] font-sans font-bold tracking-widest text-amber-200 uppercase">
              ‎מגילת תורה • MEGILLAT TORAH
            </span>
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-700 shadow-inner" />
          </div>

          <div className="text-center space-y-1 pt-1 border-b border-dashed border-[#7B3F00]/30 pb-3">
            <span className="text-[11px] font-sans font-extrabold uppercase tracking-widest text-[#7B3F00]">
              ‎תּוֹרַת יְהוָה תְּמִימָה — PERGAMINHO SACRO‎
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-extrabold text-[#3D1E03]">
              {currentBook.name} • {currentChapter}
            </h3>
          </div>
        </div>
      );
    }

    if (theme === 'manuscript') {
      return (
        <div className="text-center py-3 border-b-2 border-[#8B1A10]/30 mb-6 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1A10]/10 text-[#8B1A10] font-sans text-[10px] font-extrabold uppercase tracking-widest">
            <Scroll className="w-3.5 h-3.5" />
            <span>Codex Scriptura • Manuscrito Antigo</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-[#2B1E12] tracking-tight">
            {currentBook.name} — Capitulum {currentChapter}
          </h3>
        </div>
      );
    }

    return null;
  };

  const renderThemeFooters = (theme: ReaderSettings['theme']) => {
    if (theme === 'tora') {
      return (
        <div className="mt-8 pt-4 border-t border-dashed border-[#7B3F00]/30 space-y-3">
          <div className="w-full h-5 rounded-full bg-gradient-to-r from-[#3D1E03] via-[#7B3F00] to-[#3D1E03] border-2 border-[#C59B27] shadow-md flex items-center justify-between px-3">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-700 shadow-inner" />
            <span className="text-[9px] font-sans font-bold tracking-widest text-amber-200 uppercase">
              ‎כָּתוּב כַּהֲלָכָה • SEFER TORAH‎
            </span>
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-700 shadow-inner" />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-5 space-y-4 bg-[#F7F1E5] dark:bg-[#151311] min-h-screen text-[#1F1B16] dark:text-stone-200 pb-24 relative">
      
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
            onClick={() => setShowAppearanceModal(true)}
            title="Aparência e Configurações"
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

      {/* 2. Sub-Header: Quick Version Switcher, Focus Mode & Theme Selector */}
      <div className="p-4 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 shadow-2xs space-y-3.5">
        
        {/* Version Switcher Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-sans font-bold uppercase tracking-wider text-[#5F5A52] dark:text-stone-300">
            <span>Tradução da Bíblia</span>
            <button
              onClick={() => setShowVersionModal(true)}
              className="text-[#3E5641] dark:text-[#D4A24C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3 h-3" />
              <span>Ver todas</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { code: 'ARC', name: 'Almeida Corrigida' },
              { code: 'NAA', name: 'Nova Almeida' },
              { code: 'NVI', name: 'Nova Versão Int.' },
              { code: 'INTERLINEAR', name: 'Hebraico / Grego' },
            ].map((v) => {
              const isSelected = settings.version === v.code;
              return (
                <button
                  key={v.code}
                  onClick={() => {
                    setSettings((prev) => ({ ...prev, version: v.code as any }));
                    showToast(`Tradução alterada para ${v.name}`);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-sans font-extrabold uppercase transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#3E5641] text-amber-50 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-800 hover:border-[#3E5641]'
                  }`}
                >
                  {v.code}
                </button>
              );
            })}
          </div>
        </div>

        {/* Focus Mode & Theme Selector Buttons */}
        <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-sans font-extrabold text-stone-400 uppercase tracking-wider">
              Aparência do Leitor
            </span>

            {/* Focus Mode Toggle Button */}
            <button
              onClick={() => setSettings((prev) => ({ ...prev, focusMode: !prev.focusMode }))}
              className={`px-3 py-1 rounded-full text-[11px] font-sans font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                settings.focusMode
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-emerald-800/10 dark:bg-emerald-400/10 text-emerald-800 dark:text-emerald-300 border border-emerald-700/20 hover:bg-emerald-800/20'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Modo Foco</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'light', name: 'Claro', icon: '☀️' },
              { id: 'dark', name: 'Escuro', icon: '🌙' },
              { id: 'sepia', name: 'Sépia', icon: '📜' },
              { id: 'manuscript', name: 'Manuscrito', icon: '🏛️' },
              { id: 'tora', name: 'Torá', icon: '🕎' },
            ].map((th) => {
              const isSelected = settings.theme === th.id;
              return (
                <button
                  key={th.id}
                  onClick={() => {
                    setSettings((prev) => ({ ...prev, theme: th.id as any }));
                    showToast(`Tema alterado para ${th.name}`);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-serif font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#D4A24C] text-[#1F1B16] shadow-xs font-extrabold'
                      : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-800 hover:border-[#D4A24C]'
                  }`}
                >
                  <span>{th.icon}</span>
                  <span>{th.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Slider Control */}
        <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-sans font-bold text-stone-400 uppercase">
            <span>Tamanho da fonte</span>
            <span>{settings.fontSize}px</span>
          </div>
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

        {/* Auto-Scroll Control Section */}
        <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ChevronsDown className={`w-3.5 h-3.5 ${isAutoScrolling ? 'text-amber-500 animate-pulse' : 'text-stone-400'}`} />
              <span className="text-[10px] font-sans font-extrabold text-stone-400 uppercase tracking-wider">
                Rolagem Automática
              </span>
            </div>

            <button
              onClick={() => {
                setIsAutoScrolling(!isAutoScrolling);
                showToast(isAutoScrolling ? 'Rolagem automática pausada' : 'Rolagem automática iniciada');
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-sans font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAutoScrolling
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-200 border border-stone-200/60 dark:border-stone-800 hover:border-[#3E5641]'
              }`}
            >
              {isAutoScrolling ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isAutoScrolling ? 'Pausar' : 'Iniciar'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 bg-stone-50 dark:bg-stone-900/60 p-2 rounded-2xl border border-stone-200/50 dark:border-stone-800/60">
            <span className="text-[10px] font-sans font-bold text-stone-500 uppercase pl-1">
              Velocidade:
            </span>
            <div className="flex items-center gap-1">
              {[
                { level: 1, label: '1x' },
                { level: 2, label: '2x' },
                { level: 3, label: '3x' },
                { level: 4, label: '4x' },
                { level: 5, label: '5x' },
              ].map((s) => (
                <button
                  key={s.level}
                  onClick={() => {
                    setAutoScrollSpeed(s.level);
                    showToast(`Velocidade de rolagem: ${s.label}`);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-sans font-black transition-all cursor-pointer ${
                    autoScrollSpeed === s.level
                      ? 'bg-[#3E5641] text-amber-50 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
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
        <div className={`rounded-3xl p-6 md:p-8 shadow-2xs space-y-4 font-serif ${getThemeContainerClass(settings.theme)}`}>
          
          {/* Ancient Manuscript or Torah Header */}
          {renderThemeHeaders(settings.theme)}

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

              const hlColorObj = hasHighlight ? HIGHLIGHT_COLORS.find((c) => c.id === hasHighlight.color) : null;
              const isManuscriptDropCap = settings.theme === 'manuscript' && v.verse === 1;
              const firstChar = isManuscriptDropCap ? v.text.charAt(0) : '';
              const restText = isManuscriptDropCap ? v.text.slice(1) : v.text;

              return (
                <div
                  key={v.verse}
                  onClick={() => {
                    if (!longPressedVerse) {
                      setSelectedVerse(v);
                    }
                  }}
                  onTouchStart={(e) => handleStartPressVerse(v, e)}
                  onTouchMove={handleMovePressVerse}
                  onTouchEnd={handleEndPressVerse}
                  onMouseDown={(e) => handleStartPressVerse(v, e)}
                  onMouseMove={handleMovePressVerse}
                  onMouseUp={handleEndPressVerse}
                  className={`p-2.5 rounded-2xl transition-all cursor-pointer relative select-none ${
                    hasHighlight && hlColorObj
                      ? hlColorObj.containerStyle
                      : isSelected
                      ? 'bg-[#E7DECF]/40 dark:bg-stone-800/60 ring-2 ring-[#D4A24C]/60'
                      : 'hover:bg-stone-100/50 dark:hover:bg-stone-850/50'
                  }`}
                >
                  <div className="flex items-start gap-1">
                    {/* Verse Number styled according to theme */}
                    <span className={`font-serif select-none align-super mr-1.5 ${
                      settings.theme === 'manuscript'
                        ? 'font-black text-xs text-[#8B1A10] dark:text-amber-500'
                        : settings.theme === 'tora'
                        ? 'font-black text-xs text-[#1A365D] dark:text-[#C59B27]'
                        : 'font-extrabold text-[11px] text-[#D4A24C]'
                    }`}>
                      {v.verse}
                    </span>

                    {/* Verse Content */}
                    <p
                      style={{ fontSize: `${settings.fontSize}px`, lineHeight: 1.6 }}
                      className={`font-serif leading-relaxed text-justify tracking-wide flex-1 ${
                        settings.theme === 'manuscript'
                          ? 'text-[#2A1C12]'
                          : settings.theme === 'tora'
                          ? 'text-[#1C140E]'
                          : 'text-[#1F1B16] dark:text-stone-100'
                      }`}
                    >
                      {isManuscriptDropCap && (
                        <span className="float-left text-3xl md:text-4xl font-serif font-black pr-2 pt-0.5 text-[#8B1A10] dark:text-amber-500 leading-none uppercase select-none drop-shadow-xs">
                          {firstChar}
                        </span>
                      )}
                      {restText}
                    </p>

                    {/* Right side indicators */}
                    <div className="flex items-center gap-1 shrink-0">
                      {hasHighlight && hlColorObj && (
                        <span
                          className={`text-[9px] font-sans font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${hlColorObj.badgeStyle}`}
                          title={`Destacado em ${hlColorObj.name}`}
                        >
                          <Highlighter className="w-2.5 h-2.5" />
                          <span>{hlColorObj.name.split(' ')[0]}</span>
                        </span>
                      )}

                      {verseNotes.length > 0 && (
                        <span className="p-1 rounded-full text-[#D4A24C]" title="Ver anotação">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Inline Action block for verse */}
                  {isSelected && (
                    <div className="mt-3.5 pt-2.5 border-t border-[#E7DECF] dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 animate-fade-in">
                      {/* Color dots & remove button */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-sans font-bold text-stone-500 mr-1">Destaque:</span>
                        {HIGHLIGHT_COLORS.map((col) => (
                          <button
                            key={col.id}
                            title={`Destacar em ${col.name}`}
                            onClick={(e) => { e.stopPropagation(); handleToggleHighlight(col.id); }}
                            className={`w-5 h-5 rounded-full ${col.dotBg} transition-transform hover:scale-125 active:scale-95 ${
                              hasHighlight?.color === col.id ? 'ring-2 ring-stone-900 dark:ring-stone-100 ring-offset-1' : ''
                            }`}
                          />
                        ))}
                        {hasHighlight && (
                          <button
                            title="Remover destaque deste versículo"
                            onClick={(e) => { e.stopPropagation(); handleRemoveHighlight(v.verse); }}
                            className="ml-1 p-1 rounded-lg text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-[10px] font-sans font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Remover</span>
                          </button>
                        )}
                      </div>

                      {/* Other actions & Firebase status indicator */}
                      <div className="flex items-center gap-1.5">
                        <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-sans text-stone-500 mr-1">
                          {isFirebaseSynced ? (
                            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                              <CloudCheck className="w-3 h-3" /> Firebase Sync
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
                              <Cloud className="w-3 h-3" /> Local
                            </span>
                          )}
                        </span>

                        <button
                          onClick={(e) => { e.stopPropagation(); setDevotionalModalVerse(v); }}
                          title="Gerar Card Devocional com IA para Redes Sociais"
                          className="p-1.5 px-2.5 rounded-lg text-[10px] font-sans font-extrabold bg-[#3E5641] hover:bg-[#324534] text-white flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                          <span>Card IA</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleToggleBookmark(v); }}
                          title="Marcar versículo"
                          className={`p-1.5 rounded-lg text-[10px] font-sans font-bold flex items-center gap-1 cursor-pointer ${
                            isBookmarked ? 'bg-[#D4A24C] text-[#1F1B16]' : 'bg-[#F7F1E5] dark:bg-stone-850 text-theme-primary'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsNoteInputOpen(true); }}
                          title="Adicionar anotação"
                          className="p-1.5 rounded-lg text-[10px] font-sans font-bold bg-[#F7F1E5] dark:bg-stone-850 text-theme-primary flex items-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleReadAloudVerse(v); }}
                          title="Ouvir áudio"
                          className="p-1.5 rounded-lg text-[10px] font-sans font-bold bg-[#F7F1E5] dark:bg-stone-850 text-theme-primary flex items-center cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCopyVerse(v); }}
                          title="Copiar versículo"
                          className="p-1.5 rounded-lg text-[10px] font-sans font-bold bg-[#F7F1E5] dark:bg-stone-850 text-theme-primary flex items-center cursor-pointer"
                        >
                          {copiedVerseNum === v.verse ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
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

          {/* Ancient Theme Footer */}
          {renderThemeFooters(settings.theme)}

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

      {/* Share Modal */}
      {shareVerseModal && (
        <VerseShareModal
          verse={shareVerseModal}
          bookName={currentBook.name}
          chapter={currentChapter}
          onClose={() => setShareVerseModal(null)}
        />
      )}

      {/* Version Selector Modal */}
      {showVersionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 rounded-3xl p-6 space-y-4 shadow-2xl text-[#1F1B16] dark:text-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF] dark:border-stone-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D4A24C]" />
                <h3 className="font-serif font-extrabold text-base md:text-lg">
                  Versões & Traduções da Bíblia
                </h3>
              </div>
              <button
                onClick={() => setShowVersionModal(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs font-serif text-stone-500 dark:text-stone-400">
              Selecione a versão da Bíblia desejada para leitura e estudo exegético comparativo:
            </p>

            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {BIBLE_VERSIONS.map((ver) => {
                const isCurrent = settings.version === ver.code;
                return (
                  <button
                    key={ver.code}
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, version: ver.code }));
                      setShowVersionModal(false);
                      showToast(`Versão alterada para ${ver.name} (${ver.code})`);
                    }}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isCurrent
                        ? 'bg-[#3E5641]/10 border-[#3E5641] dark:border-[#D4A24C] shadow-sm'
                        : 'bg-[#FFFDF8] dark:bg-stone-850 border-[#E7DECF] dark:border-stone-800 hover:border-[#D4A24C]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#3E5641] text-amber-50 font-sans font-black text-[10px] uppercase tracking-wider">
                          {ver.code}
                        </span>
                        <h4 className="font-serif font-bold text-sm text-[#1F1B16] dark:text-amber-100">
                          {ver.name}
                        </h4>
                      </div>
                      <p className="text-xs font-serif text-stone-600 dark:text-stone-300 leading-relaxed">
                        {ver.description}
                      </p>
                    </div>

                    {isCurrent && (
                      <span className="p-1 rounded-full bg-[#3E5641] text-amber-300 shrink-0 mt-1">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Appearance & Themes Modal */}
      {showAppearanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/65 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 rounded-3xl p-6 space-y-5 shadow-2xl text-[#1F1B16] dark:text-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7DECF] dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#D4A24C]" />
                <h3 className="font-serif font-extrabold text-base md:text-lg">
                  Aparência & Temas do Leitor
                </h3>
              </div>
              <button
                onClick={() => setShowAppearanceModal(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="block text-[11px] font-sans font-extrabold uppercase tracking-wider text-stone-400">
                Estilo Visual do Livro / Pergaminho
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'parchment', name: 'Pergaminho Moderno', icon: '📜', desc: 'Textura de papel, marrom grafite e dourado' },
                  { id: 'dark', name: 'Noite de Estudo', icon: '🌙', desc: 'Fundo azul profundo e texto claro' },
                  { id: 'oliveira', name: 'Oliveira', icon: '🌿', desc: 'Verdes suaves e aparência acolhedora' },
                  { id: 'templo', name: 'Templo', icon: '🏛️', desc: 'Minimalista inspirado em pedra clara' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, theme: th.id as any }));
                      showToast(`Aparência alterada para ${th.name}`);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3 ${
                      settings.theme === th.id
                        ? 'bg-[#3E5641]/10 border-[#3E5641] dark:border-[#D4A24C] ring-1 ring-[#3E5641]'
                        : 'bg-[#FFFDF8] dark:bg-stone-850 border-[#E7DECF] dark:border-stone-800 hover:border-[#D4A24C]'
                    }`}
                  >
                    <span className="text-xl">{th.icon}</span>
                    <div>
                      <span className="block font-serif font-bold text-xs text-[#1F1B16] dark:text-amber-100">
                        {th.name}
                      </span>
                      <span className="block text-[10px] font-sans text-stone-500">
                        {th.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#E7DECF] dark:border-stone-800 space-y-1.5">
              <span className="text-[11px] font-sans font-extrabold text-stone-400 block uppercase tracking-wider">
                Tamanho da Fonte ({settings.fontSize}px)
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-serif text-stone-400">A</span>
                <input
                  type="range"
                  min="14"
                  max="26"
                  value={settings.fontSize}
                  onChange={(e) => setSettings((prev) => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                  className="flex-1 accent-[#3E5641] h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
                />
                <span className="text-lg font-serif text-stone-600 font-bold">A</span>
              </div>
            </div>

            {/* Auto-Scroll Settings in Modal */}
            <div className="pt-2 border-t border-[#E7DECF] dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block font-serif font-bold text-xs">Rolagem Automática (Auto-scroll)</span>
                  <span className="block text-[10px] font-sans text-stone-500">Rola o texto suavemente enquanto você lê</span>
                </div>
                <button
                  onClick={() => {
                    setIsAutoScrolling(!isAutoScrolling);
                    showToast(isAutoScrolling ? 'Rolagem automática pausada' : 'Rolagem automática iniciada');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isAutoScrolling
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-[#3E5641] text-amber-50 hover:bg-[#324635]'
                  }`}
                >
                  {isAutoScrolling ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isAutoScrolling ? 'Pausar' : 'Iniciar'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 bg-stone-100 dark:bg-stone-850 p-2.5 rounded-2xl border border-stone-200/60 dark:border-stone-800">
                <span className="text-[11px] font-sans font-extrabold text-stone-500 uppercase tracking-wider pl-1">
                  Velocidade:
                </span>
                <div className="flex items-center gap-1">
                  {[
                    { level: 1, label: '1x (Lento)' },
                    { level: 2, label: '2x (Normal)' },
                    { level: 3, label: '3x (Médio)' },
                    { level: 4, label: '4x (Rápido)' },
                    { level: 5, label: '5x (Máx)' },
                  ].map((s) => (
                    <button
                      key={s.level}
                      onClick={() => {
                        setAutoScrollSpeed(s.level);
                        showToast(`Velocidade de rolagem: ${s.level}x`);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-sans font-black transition-all cursor-pointer ${
                        autoScrollSpeed === s.level
                          ? 'bg-[#3E5641] text-amber-50 shadow-xs'
                          : 'bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E7DECF] dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="block font-serif font-bold text-xs">Modo Leitor em Foco</span>
                <span className="block text-[10px] font-sans text-stone-500">Oculta menus para leitura imersiva</span>
              </div>
              <button
                onClick={() => {
                  setSettings(prev => ({ ...prev, focusMode: !prev.focusMode }));
                  setShowAppearanceModal(false);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer ${
                  settings.focusMode ? 'bg-rose-600 text-white' : 'bg-[#3E5641] text-amber-50'
                }`}
              >
                {settings.focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{settings.focusMode ? 'Desativar Foco' : 'Ativar Foco'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Auto-Scroll Control Toolbar */}
      {isAutoScrolling && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 dark:bg-stone-950/95 text-stone-100 backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-fade-in">
          <div className="flex items-center gap-1.5 pl-1">
            <ChevronsDown className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-sans font-bold text-amber-200 whitespace-nowrap">Rolagem Ativa</span>
          </div>

          <div className="h-4 w-px bg-stone-700" />

          {/* Pause Toggle */}
          <button
            onClick={() => {
              setIsAutoScrolling(false);
              showToast('Rolagem automática pausada');
            }}
            className="p-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all cursor-pointer"
            title="Pausar Rolagem"
          >
            <Pause className="w-4 h-4 fill-current" />
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-stone-800/80 px-2 py-1 rounded-full border border-stone-700">
            <Gauge className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setAutoScrollSpeed(s);
                  showToast(`Velocidade: ${s}x`);
                }}
                className={`w-6 h-6 rounded-full text-[10px] font-sans font-black flex items-center justify-center transition-all cursor-pointer ${
                  autoScrollSpeed === s
                    ? 'bg-amber-400 text-stone-950 shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-stone-700" />

          {/* Close button */}
          <button
            onClick={() => setIsAutoScrolling(false)}
            className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-all cursor-pointer"
            title="Parar e Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-stone-900 text-stone-100 dark:bg-amber-100 dark:text-stone-900 text-xs font-sans font-medium shadow-xl flex items-center gap-2 border border-stone-700/50 dark:border-amber-300 animate-fade-in">
          {isFirebaseSynced ? (
            <CloudCheck className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          ) : (
            <Cloud className="w-4 h-4 text-amber-400 dark:text-amber-600 shrink-0" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dedicated Long-Press Verse Highlighting Modal */}
      {longPressedVerse && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-2xl bg-amber-500/10 text-[#D4A24C]">
                  <Highlighter className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-extrabold text-sm text-[#1F1B16] dark:text-stone-100">
                    Destacar Versículo {longPressedVerse.verse}
                  </h4>
                  <p className="text-[10px] font-sans text-stone-500 uppercase tracking-wider font-bold">
                    {currentBook.name} {currentChapter}:{longPressedVerse.verse} • Clique Longo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setLongPressedVerse(null)}
                className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7F1E5]/60 dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800">
              <p className="text-xs font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-3">
                "{longPressedVerse.text}"
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                Escolha a Cor do Destaque:
              </span>
              <div className="grid grid-cols-5 gap-2">
                {HIGHLIGHT_COLORS.map((col) => {
                  const isCurrentHL = highlights.some(
                    (h) => h.bookId === currentBook.id && h.chapter === currentChapter && h.verse === longPressedVerse.verse && h.color === col.id
                  );
                  return (
                    <button
                      key={col.id}
                      onClick={() => handleToggleHighlight(col.id, longPressedVerse)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-850 transition-all cursor-pointer group border ${
                        isCurrentHL ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800' : 'border-transparent'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full ${col.dotBg} shadow-xs group-hover:scale-115 transition-transform`} />
                      <span className="text-[9px] font-sans font-extrabold text-stone-700 dark:text-stone-300">
                        {col.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                const targetV = longPressedVerse;
                setLongPressedVerse(null);
                setDevotionalModalVerse(targetV);
              }}
              className="w-full py-3 rounded-2xl bg-[#3E5641] hover:bg-[#324534] text-white font-sans font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Gerar Card Devocional com IA</span>
            </button>

            {highlights.some(h => h.bookId === currentBook.id && h.chapter === currentChapter && h.verse === longPressedVerse.verse) && (
              <button
                onClick={() => {
                  handleRemoveHighlight(longPressedVerse.verse);
                  setLongPressedVerse(null);
                }}
                className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-sans font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-rose-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remover Destaque</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Devotional Card Modal */}
      {devotionalModalVerse && (
        <DevotionalCardModal
          isOpen={!!devotionalModalVerse}
          onClose={() => setDevotionalModalVerse(null)}
          verseText={devotionalModalVerse.text}
          bookName={currentBook.name}
          chapter={currentChapter}
          verseNum={devotionalModalVerse.verse}
          versionCode={settings.version}
        />
      )}
    </div>
  );
};
