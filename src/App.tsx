import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { BibleReader } from './components/BibleReader';
import { BookChapterSelector } from './components/BookChapterSelector';
import { OfflineManagerModal } from './components/OfflineManagerModal';
import { AuthModal } from './components/AuthModal';
import { BibleBook, ReaderSettings } from './types';
import { BIBLE_BOOKS, getBookById } from './data/bibleBooks';
import { useTheme } from './styles/themeConstants';
import { Compass, BookOpen, Sparkles, User, HeartHandshake, Award } from 'lucide-react';

// Lazy loaded heavy components for optimal initial bundle & fast FCP
const InterlinearReader = lazy(() => import('./components/InterlinearReader').then(m => ({ default: m.InterlinearReader })));
const DictionaryView = lazy(() => import('./components/DictionaryView').then(m => ({ default: m.DictionaryView })));
const CharactersView = lazy(() => import('./components/CharactersView').then(m => ({ default: m.CharactersView })));
const BibleJourneyModule = lazy(() => import('./components/BibleJourneyModule').then(m => ({ default: m.BibleJourneyModule })));
const Desafio365View = lazy(() => import('./components/Desafio365View').then(m => ({ default: m.Desafio365View })));
const NotesAndSearchView = lazy(() => import('./components/NotesAndSearchView').then(m => ({ default: m.NotesAndSearchView })));
const AiTheologyAssistant = lazy(() => import('./components/AiTheologyAssistant').then(m => ({ default: m.AiTheologyAssistant })));
const MonthlyDevotionalsView = lazy(() => import('./components/MonthlyDevotionalsView').then(m => ({ default: m.MonthlyDevotionalsView })));
const PrayerJournalView = lazy(() => import('./components/PrayerJournalView').then(m => ({ default: m.PrayerJournalView })));

function ComponentFallback() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-4 animate-pulse">
      <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded-2xl w-2/3"></div>
      <div className="h-24 bg-stone-200 dark:bg-stone-800 rounded-3xl w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-40 bg-stone-200 dark:bg-stone-800 rounded-3xl"></div>
        <div className="h-40 bg-stone-200 dark:bg-stone-800 rounded-3xl"></div>
      </div>
    </div>
  );
}

export function App() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'home' | 'reader' | 'interlinear' | 'dictionary' | 'characters' | 'study' | 'challenge' | 'notes' | 'ai' | 'devotional' | 'prayers'>('home');
  const [currentBook, setCurrentBook] = useState<BibleBook>(BIBLE_BOOKS[0]); // Genesis
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [isBookSelectorOpen, setIsBookSelectorOpen] = useState<boolean>(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);


  const [settings, setSettings] = useState<ReaderSettings>({
    version: 'ARC',
    fontSize: 18,
    fontFamily: 'serif',
    theme: theme as any,
    lineHeight: 'relaxed',
    showVerseNumbers: true,
    showStrong: true,
    showInterlinear: true,
    audioSpeed: 1.0,
  });

  // Sincroniza o estado do settings quando o useTheme altera o tema
  useEffect(() => {
    if (settings.theme !== theme) {
      setSettings((prev) => ({ ...prev, theme: theme as any }));
    }
  }, [theme]);

  // Sincroniza o useTheme quando o settings altera o tema (ex: painéis de configurações)
  useEffect(() => {
    if (settings.theme && settings.theme !== theme) {
      const targetTheme = settings.theme === 'sepia' ? 'parchment' : settings.theme;
      setTheme(targetTheme as any);
    }
  }, [settings.theme, theme, setTheme]);


  // Handle Chapter Navigation (Prev / Next)
  const handleNavigateChapter = (direction: 'PREV' | 'NEXT') => {
    if (direction === 'PREV') {
      if (currentChapter > 1) {
        setCurrentChapter((prev) => prev - 1);
      } else {
        // Move to previous book's last chapter
        const currentIndex = BIBLE_BOOKS.findIndex((b) => b.id === currentBook.id);
        if (currentIndex > 0) {
          const prevBook = BIBLE_BOOKS[currentIndex - 1];
          setCurrentBook(prevBook);
          setCurrentChapter(prevBook.totalChapters);
        }
      }
    } else {
      if (currentChapter < currentBook.totalChapters) {
        setCurrentChapter((prev) => prev + 1);
      } else {
        // Move to next book's first chapter
        const currentIndex = BIBLE_BOOKS.findIndex((b) => b.id === currentBook.id);
        if (currentIndex < BIBLE_BOOKS.length - 1) {
          const nextBook = BIBLE_BOOKS[currentIndex + 1];
          setCurrentBook(nextBook);
          setCurrentChapter(1);
        }
      }
    }
  };

  const handleSelectBookAndChapter = (book: BibleBook, chapter: number) => {
    setCurrentBook(book);
    setCurrentChapter(chapter);
  };

  const handleOpenPassageFromPlan = (bookId: string, chapter: number) => {
    const book = getBookById(bookId);
    if (book) {
      setCurrentBook(book);
      setCurrentChapter(chapter);
      setActiveTab('reader');
    }
  };

  const handleOpenStudyGuideFromReader = (bookId: string) => {
    setActiveTab('study');
  };

  const isFocusModeActive = settings.focusMode && activeTab === 'reader';

  return (
    <div className="min-h-screen bg-theme-app text-theme-primary font-sans transition-colors duration-200">
      {/* App Main Navigation Header - Hidden in Focus Reader Mode */}
      {!isFocusModeActive && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          settings={settings}
          setSettings={setSettings}
          onOpenBookSelector={() => setIsBookSelectorOpen(true)}
          currentBookName={currentBook.name}
          currentChapter={currentChapter}
          onOpenOfflineManager={() => setIsOfflineModalOpen(true)}
        />
      )}

      {/* Main View Router Content */}
      <main className={`${isFocusModeActive ? 'pb-6 pt-2' : 'pb-28 sm:pb-32'} overflow-x-hidden overflow-y-auto min-h-[calc(100vh-80px)] w-full`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="w-full"
          >
            <Suspense fallback={<ComponentFallback />}>
              {activeTab === 'home' && (
                <HomeView
                  currentBook={currentBook}
                  currentChapter={currentChapter}
                  onContinueReading={() => setActiveTab('reader')}
                  onGoToStudy={() => setActiveTab('study')}
                  onGoToChallenge={() => setActiveTab('challenge')}
                  onGoToDevotional={() => setActiveTab('devotional')}
                />
              )}

              {activeTab === 'reader' && (
                <BibleReader
                  currentBook={currentBook}
                  currentChapter={currentChapter}
                  settings={settings}
                  setSettings={setSettings}
                  onNavigateChapter={handleNavigateChapter}
                  onOpenBookSelector={() => setIsBookSelectorOpen(true)}
                  onOpenStudyGuide={handleOpenStudyGuideFromReader}
                />
              )}

              {activeTab === 'interlinear' && (
                <InterlinearReader
                  currentBook={currentBook}
                  currentChapter={currentChapter}
                  onNavigateChapter={handleNavigateChapter}
                  onOpenBookSelector={() => setIsBookSelectorOpen(true)}
                />
              )}

              {activeTab === 'dictionary' && (
                <DictionaryView />
              )}

              {activeTab === 'characters' && (
                <CharactersView />
              )}

              {activeTab === 'study' && (
                <BibleJourneyModule
                  onSelectBookForReading={(bookId, chapter) => {
                    const b = getBookById(bookId);
                    if (b) {
                      setCurrentBook(b);
                      setCurrentChapter(chapter || 1);
                      setActiveTab('reader');
                    }
                  }}
                />
              )}

              {activeTab === 'challenge' && (
                <Desafio365View
                  onOpenPassage={handleOpenPassageFromPlan}
                />
              )}

              {activeTab === 'devotional' && (
                <MonthlyDevotionalsView
                  onOpenPassage={handleOpenPassageFromPlan}
                />
              )}

              {activeTab === 'prayers' && (
                <PrayerJournalView />
              )}

              {activeTab === 'notes' && (
                <NotesAndSearchView
                  onOpenVerse={(bookId, chapter) => {
                    const b = getBookById(bookId);
                    if (b) {
                      setCurrentBook(b);
                      setCurrentChapter(chapter);
                      setActiveTab('reader');
                    }
                  }}
                />
              )}

              {activeTab === 'ai' && (
                <AiTheologyAssistant 
                  onOpenOffline={() => setIsOfflineModalOpen(true)} 
                />
              )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Book & Chapter Picker Modal */}
      <BookChapterSelector
        isOpen={isBookSelectorOpen}
        onClose={() => setIsBookSelectorOpen(false)}
        onSelectBookAndChapter={handleSelectBookAndChapter}
        currentBookId={currentBook.id}
        currentChapter={currentChapter}
      />

      {/* Offline Storage Manager Modal */}
      <OfflineManagerModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
      />

      {/* Auth & Account Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Premium Mobile-First Bottom Navigation Bar - Hidden in Focus Reader Mode */}
      {!isFocusModeActive && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF8]/95 dark:bg-[#1A1816]/95 backdrop-blur-md border-t border-[#E7DECF] dark:border-stone-800 shadow-[0_-4px_24px_rgba(31,27,22,0.03)] px-0.5 min-[360px]:px-1 sm:px-4 pt-1 sm:pt-2 pb-[calc(0.25rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between sm:justify-around max-w-7xl mx-auto">
          {[
            { id: 'home', label: 'Início', icon: Compass },
            { id: 'reader', label: 'Bíblia', icon: BookOpen },
            { id: 'prayers', label: 'Oração', icon: HeartHandshake },
            { id: 'challenge', label: 'Jornada', icon: Award },
            { id: 'study', label: 'Estudo', icon: Sparkles },
            { id: 'profile', label: 'Perfil', icon: User, isAuth: true },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = item.isAuth ? isAuthModalOpen : activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isAuth) {
                    setIsAuthModalOpen(true);
                  } else {
                    setActiveTab(item.id as any);
                  }
                }}
                className="flex flex-col items-center justify-center py-1 px-0.5 sm:px-2 rounded-xl transition-all duration-200 ease-out relative group flex-1 min-w-0 cursor-pointer overflow-hidden"
              >
                <div
                  className={`p-0.5 sm:p-1 rounded-lg transition-transform duration-200 ease-out transform shrink-0 ${
                    isActive
                      ? 'text-[#3E5641] dark:text-[#D4A24C] scale-105'
                      : 'text-theme-muted group-hover:text-theme-primary group-hover:scale-105 scale-100'
                  }`}
                >
                  <Icon
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 ease-out shrink-0"
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </div>
                <span
                  className={`text-[9px] min-[360px]:text-[9.5px] sm:text-[10px] font-sans tracking-tight mt-0.5 leading-tight truncate w-full text-center transition-colors duration-200 ease-out ${
                    isActive
                      ? 'text-[#3E5641] dark:text-[#D4A24C] font-bold'
                      : 'text-theme-muted group-hover:text-theme-primary font-medium'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavDot"
                    className="absolute bottom-0 w-1 h-1 rounded-full bg-[#3E5641] dark:bg-[#D4A24C]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
