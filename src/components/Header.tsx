import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, BookMarked, Calendar, Search, Bot, Download, Moon, Sun, Layers, ShieldCheck, Book, Users, Compass, Flame, Scroll, User, LogIn } from 'lucide-react';
import { ReaderSettings } from '../types';
import { auth, onAuthStateChanged } from '../services/firebase';

interface HeaderProps {
  activeTab: 'home' | 'reader' | 'interlinear' | 'dictionary' | 'characters' | 'maps' | 'study' | 'challenge' | 'notes' | 'ai' | 'devotional';
  setActiveTab: (tab: 'home' | 'reader' | 'interlinear' | 'dictionary' | 'characters' | 'maps' | 'study' | 'challenge' | 'notes' | 'ai' | 'devotional') => void;
  settings: ReaderSettings;
  setSettings: React.Dispatch<React.SetStateAction<ReaderSettings>>;
  onOpenBookSelector: () => void;
  currentBookName: string;
  currentChapter: number;
  onOpenOfflineManager: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  settings,
  setSettings,
  onOpenBookSelector,
  currentBookName,
  currentChapter,
  onOpenOfflineManager,
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : settings.theme === 'light' ? 'parchment' : 'dark';
    setSettings((prev) => ({ ...prev, theme: nextTheme }));
  };

  const getUserInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase();
    }
    if (currentUser?.email) {
      return currentUser.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="sticky top-0 z-30 border-b border-theme bg-theme-card/95 backdrop-blur-md transition-colors shadow-sm">
      {/* Top Brand Banner */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        
        {/* Scriptorium Inspired Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-theme-accent flex items-center justify-center text-amber-50 shadow-md shadow-theme-accent/15 border border-[#1C2E1E] dark:border-[#B28236]">
            <BookOpen className="w-5 h-5 text-[#D4A24C]" />
          </div>
          <div>
            <h1 className="font-classic text-base md:text-lg font-bold tracking-tight text-theme-primary leading-tight">
              Jornada da Bíblia
            </h1>
            <p className="text-[10px] text-theme-muted font-sans font-semibold tracking-wider uppercase hidden sm:block">
              Manuscrito, Scriptorium & Exegese
            </p>
          </div>
        </div>

        {/* Current Study Focus Quick Selector */}
        <button
          onClick={onOpenBookSelector}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-theme-app hover:bg-theme-card-hover text-theme-primary font-classic font-bold text-xs sm:text-sm transition-all border border-theme shadow-3xs"
        >
          <Scroll className="w-4 h-4 text-theme-accent" />
          <span>
            {currentBookName} {currentChapter}
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-theme-accent/10 border border-theme-accent/25 text-theme-accent">
            {settings.version}
          </span>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* 100% Offline Badge */}
          <button
            onClick={onOpenOfflineManager}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-sans font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all"
            title="Download de versões para uso 100% offline"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">100% Offline</span>
          </button>

          {/* Scriptorium Theme Cycle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-theme-secondary hover:text-theme-primary bg-theme-app border border-theme hover:bg-theme-card-hover transition-colors shadow-3xs"
            title={`Alternar tema scriptorium (Atual: ${settings.theme})`}
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#D4A24C]" />
            ) : (
              <Moon className="w-4 h-4 text-theme-accent" />
            )}
          </button>

          {/* User Auth Indicator */}
          {currentUser ? (
            <button
              onClick={() => setActiveTab('ai')}
              className="flex items-center gap-2 p-1 pl-2.5 rounded-xl bg-theme-accent/10 border border-theme-accent/20 hover:bg-theme-accent/20 text-theme-primary transition-all cursor-pointer shadow-3xs animate-fade-in"
              title="Acessar Perfil & Sincronização"
            >
              <span className="text-[11px] font-sans font-extrabold tracking-tight hidden sm:inline text-theme-accent">
                {currentUser.isAnonymous ? 'Convidado' : (currentUser.displayName || currentUser.email?.split('@')[0])}
              </span>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3E5641] to-[#2D3E30] flex items-center justify-center text-white border border-[#D4A24C] font-serif font-extrabold text-[11px]">
                {getUserInitials()}
              </div>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('ai')}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-theme-accent hover:bg-theme-accent-hover text-white dark:text-[#1F1B16] font-sans font-extrabold text-xs cursor-pointer transition-all shadow-3xs"
              title="Acessar Conta / Criar Conta"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>

      {/* Scriptorium Classic Secondary Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-theme/60 scroll-smooth">
        {[
          { id: 'home', label: 'Início', icon: Compass, color: 'text-[#D4A24C]' },
          { id: 'reader', label: 'Leitor Bíblico', icon: BookOpen, color: 'text-amber-700' },
          { id: 'devotional', label: 'Estudo Mensal', icon: Calendar, color: 'text-emerald-700' },
          { id: 'interlinear', label: 'Texto Original', icon: Layers, color: 'text-indigo-600' },
          { id: 'dictionary', label: 'Dicionário', icon: Book, color: 'text-emerald-600' },
          { id: 'characters', label: 'Personagens', icon: Users, color: 'text-orange-600' },
          { id: 'maps', label: 'Mapas', icon: Compass, color: 'text-blue-600' },
          { id: 'study', label: 'Estudo por Livro', icon: Sparkles, color: 'text-amber-500' },
          { id: 'challenge', label: 'Desafio 365 Dias', icon: Flame, color: 'text-red-500 animate-pulse' },
          { id: 'notes', label: 'Busca & Notas', icon: Search, color: 'text-rose-500' },
          { id: 'ai', label: 'Teólogo IA', icon: Bot, color: 'text-purple-600' },
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'border-theme-accent text-theme-accent font-extrabold bg-theme-accent/5'
                  : 'border-transparent text-theme-muted hover:text-theme-secondary hover:bg-theme-card-hover/40'
              }`}
            >
              <IconComponent className={`w-4 h-4 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
