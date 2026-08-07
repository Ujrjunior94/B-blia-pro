import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, BookMarked, Calendar, Search, Bot, Download, Moon, Sun, Layers, ShieldCheck, Book, Users, Compass, Flame, Scroll, User, LogIn, Settings, HeartHandshake } from 'lucide-react';
import { ReaderSettings } from '../types';
import { auth, onAuthStateChanged, db, doc, getDoc } from '../services/firebase';

interface HeaderProps {
  activeTab: 'home' | 'reader' | 'interlinear' | 'dictionary' | 'characters' | 'study' | 'challenge' | 'notes' | 'ai' | 'devotional' | 'prayers';
  setActiveTab: (tab: 'home' | 'reader' | 'interlinear' | 'dictionary' | 'characters' | 'study' | 'challenge' | 'notes' | 'ai' | 'devotional' | 'prayers') => void;
  settings: ReaderSettings;
  setSettings: React.Dispatch<React.SetStateAction<ReaderSettings>>;
  onOpenBookSelector: () => void;
  currentBookName: string;
  currentChapter: number;
  onOpenOfflineManager: () => void;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
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
  onOpenAuth,
  onOpenSettings,
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [registeredName, setRegisteredName] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && !user.isAnonymous) {
        try {
          const uDoc = await getDoc(doc(db, 'users', user.uid));
          if (uDoc.exists() && uDoc.data().displayName) {
            setRegisteredName(uDoc.data().displayName);
            return;
          }
        } catch (err) {
          console.error('Error fetching user profile in header:', err);
        }
        if (user.displayName) {
          setRegisteredName(user.displayName);
        } else if (user.email) {
          const raw = user.email.split('@')[0];
          setRegisteredName(raw.charAt(0).toUpperCase() + raw.slice(1));
        }
      } else {
        setRegisteredName('');
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const themeOrder: ('parchment' | 'dark' | 'oliveira' | 'templo')[] = ['parchment', 'dark', 'oliveira', 'templo'];
    const currIndex = themeOrder.indexOf(settings.theme as any);
    const nextTheme = themeOrder[(currIndex + 1) % themeOrder.length] || 'parchment';
    setSettings((prev) => ({ ...prev, theme: nextTheme }));
  };

  const getUserInitials = () => {
    const nameToUse = registeredName || currentUser?.displayName;
    if (nameToUse) {
      return nameToUse.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase();
    }
    if (currentUser?.email) {
      return currentUser.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="sticky top-0 z-30 border-b border-theme bg-theme-card/95 backdrop-blur-md transition-colors shadow-sm">
      {/* Top Brand Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Scriptorium Inspired Logo & Title */}
        <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => setActiveTab('home')}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-theme-accent flex items-center justify-center text-amber-50 shadow-md shadow-theme-accent/15 border border-[#1C2E1E] dark:border-[#B28236] shrink-0">
            <BookOpen className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#D4A24C]" />
          </div>
          <div className="hidden min-[360px]:block">
            <h1 className="font-classic text-sm sm:text-base md:text-lg font-bold tracking-tight text-theme-primary leading-tight whitespace-nowrap">
              Jornada da Bíblia
            </h1>
            <p className="text-[9px] sm:text-[10px] text-theme-muted font-sans font-semibold tracking-wider uppercase hidden sm:block">
              Manuscrito, Scriptorium & Exegese
            </p>
          </div>
        </div>

        {/* Current Study Focus Quick Selector */}
        <button
          onClick={onOpenBookSelector}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-theme-app hover:bg-theme-card-hover text-theme-primary font-classic font-bold text-xs sm:text-sm transition-all border border-theme shadow-3xs min-w-0 max-w-[140px] min-[400px]:max-w-[200px] sm:max-w-none cursor-pointer"
        >
          <Scroll className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-theme-accent shrink-0" />
          <span className="truncate">
            {currentBookName} {currentChapter}
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1 sm:px-1.5 py-0.5 rounded bg-theme-accent/10 border border-theme-accent/25 text-theme-accent shrink-0">
            {settings.version}
          </span>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* 100% Offline Badge */}
          <button
            onClick={onOpenOfflineManager}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-[10px] font-sans font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all cursor-pointer shrink-0"
            title="Download de versões para uso 100% offline"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden md:inline">100% Offline</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 sm:p-2.5 rounded-xl text-theme-secondary hover:text-theme-primary bg-theme-app border border-theme hover:bg-theme-card-hover transition-colors shadow-3xs cursor-pointer shrink-0"
            title="Configurações & Zerar Progresso"
          >
            <Settings className="w-4 h-4 text-theme-accent shrink-0" />
          </button>

          {/* Exclusive Design System Theme Selector Button */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl text-theme-secondary hover:text-theme-primary bg-theme-app border border-theme hover:bg-theme-card-hover transition-colors shadow-3xs cursor-pointer flex items-center justify-center shrink-0"
            title={`Tema Atual: ${
              settings.theme === 'parchment' ? '📜 Pergaminho Moderno' :
              settings.theme === 'dark' ? '🌙 Noite de Estudo' :
              settings.theme === 'oliveira' ? '🌿 Oliveira' :
              settings.theme === 'templo' ? '🏛️ Templo' : settings.theme
            } (Clique para alternar)`}
          >
            {settings.theme === 'dark' ? (
              <span className="text-sm leading-none">🌙</span>
            ) : settings.theme === 'oliveira' ? (
              <span className="text-sm leading-none">🌿</span>
            ) : settings.theme === 'templo' ? (
              <span className="text-sm leading-none">🏛️</span>
            ) : (
              <span className="text-sm leading-none">📜</span>
            )}
          </button>

          {/* User Auth Indicator */}
          {currentUser ? (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 sm:gap-2 p-1 pl-2 sm:pl-2.5 rounded-xl bg-theme-accent/10 border border-theme-accent/20 hover:bg-theme-accent/20 text-theme-primary transition-all cursor-pointer shadow-3xs animate-fade-in shrink-0"
              title="Acessar Perfil & Sincronização"
            >
              <span className="text-[10px] sm:text-[11px] font-sans font-extrabold tracking-tight hidden sm:inline text-theme-accent truncate max-w-[100px]">
                {currentUser.isAnonymous ? 'Convidado' : (registeredName || currentUser.displayName || currentUser.email?.split('@')[0])}
              </span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-br from-[#3E5641] to-[#2D3E30] flex items-center justify-center text-white border border-[#D4A24C] font-serif font-extrabold text-[10px] sm:text-[11px] shrink-0">
                {getUserInitials()}
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 sm:gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl bg-theme-accent hover:bg-theme-accent-hover text-white dark:text-[#1F1B16] font-sans font-extrabold text-xs cursor-pointer transition-all shadow-3xs shrink-0"
              title="Acessar Conta / Criar Conta"
            >
              <LogIn className="w-3.5 h-3.5 shrink-0" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>

      {/* Scriptorium Classic Secondary Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-theme/60 scroll-smooth">
        {[
          { id: 'home', label: 'Início', icon: Compass, color: 'text-[#D4A24C]' },
          { id: 'reader', label: 'Leitor Bíblico', icon: BookOpen, color: 'text-amber-700' },
          { id: 'prayers', label: 'Oração', icon: HeartHandshake, color: 'text-rose-600' },
          { id: 'devotional', label: 'Estudo Mensal', icon: Calendar, color: 'text-emerald-700' },
          { id: 'interlinear', label: 'Texto Original', icon: Layers, color: 'text-indigo-600' },
          { id: 'dictionary', label: 'Dicionário', icon: Book, color: 'text-emerald-600' },
          { id: 'characters', label: 'Personagens', icon: Users, color: 'text-orange-600' },
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
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-sans font-semibold tracking-wide border-b-2 whitespace-nowrap transition-all cursor-pointer shrink-0 rounded-t-lg ${
                isActive
                  ? 'border-theme-accent text-theme-accent font-extrabold bg-theme-accent/10'
                  : 'border-transparent text-theme-muted hover:text-theme-secondary hover:bg-theme-card-hover/40'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};

