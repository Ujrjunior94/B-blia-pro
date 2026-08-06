import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ChevronRight, Bell, Sun, BookMarked, Award, ArrowRight, Flame, Sparkles, Book as BookIcon, Search, ShieldCheck } from 'lucide-react';
import { BibleBook } from '../types';
import { useTheme } from '../styles/themeConstants';
import { auth, onAuthStateChanged, db, doc, getDoc } from '../services/firebase';

interface HomeViewProps {
  currentBook: BibleBook;
  currentChapter: number;
  onContinueReading: () => void;
  onGoToStudy: () => void;
  onGoToChallenge: () => void;
  onGoToDevotional: () => void;
  onGoToDictionary?: () => void;
  onGoToOriginalText?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentBook,
  currentChapter,
  onContinueReading,
  onGoToStudy,
  onGoToChallenge,
  onGoToDevotional,
  onGoToDictionary,
  onGoToOriginalText,
}) => {
  const { theme } = useTheme();
  const [userName, setUserName] = useState<string>('Visitante');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.isAnonymous) {
          setUserName('Convidado');
          return;
        }
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().displayName) {
            setUserName(userDoc.data().displayName);
            return;
          }
        } catch (e) {
          console.error('Error fetching profile for greeting:', e);
        }

        if (user.displayName) {
          setUserName(user.displayName);
        } else if (user.email) {
          const rawName = user.email.split('@')[0];
          const formatted = rawName.charAt(0).toUpperCase() + rawName.slice(1);
          setUserName(formatted);
        } else {
          setUserName('Discípulo');
        }
      } else {
        setUserName('Visitante');
      }
    });

    return () => unsubscribe();
  }, []);
  
  const monthsPt = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-theme-primary font-modern pb-24 animate-fade-in">
      
      {/* 1. Header Welcome & Premium Brand Branding */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 text-theme-accent">
            <Sun className="w-5 h-5 animate-spin-slow" />
            <h2 className="text-2xl md:text-3xl font-classic font-bold text-theme-primary">
              Graça e Paz, {userName}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-theme-secondary font-manuscript italic">
            "Lâmpada para os meus pés é tua palavra e luz, para o meu caminho." — Salmo 119:105
          </p>
        </div>

        {/* Dynamic Activity/Streak Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-theme-accent/5 border border-theme-accent/20">
          <Flame className="w-5 h-5 text-red-500 animate-pulse" />
          <div className="text-left leading-none">
            <span className="text-[10px] font-sans font-bold tracking-wider text-theme-secondary uppercase block">Seu Progresso</span>
            <span className="text-xs font-serif font-bold text-theme-accent block mt-0.5">87 Dias Seguidos!</span>
          </div>
        </div>
      </div>

      {/* 2. Featured Banner: Scriptorium Devotional Versículo do Dia (Majestic Landscape Visuals) */}
      <div className="relative overflow-hidden rounded-3xl border border-theme bg-theme-card shadow-md flex flex-col md:flex-row min-h-[220px]">
        {/* Artistic Landscape Overlay Side */}
        <div className="md:w-[40%] bg-gradient-to-tr from-[#1E2D1F] via-[#2B422F] to-[#D4A24C] relative overflow-hidden flex flex-col justify-end p-6 text-amber-50 shrink-0 border-b md:border-b-0 md:border-r border-theme">
          {/* Glowing Divine Rays backplate */}
          <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />
          
          {/* Clean Landscape SVG styling */}
          <svg className="absolute bottom-0 left-0 w-full h-[45%] text-[#1D2C1E] opacity-90" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 L0,55 L35,80 L75,45 L100,75 L100,100 Z" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full h-[30%] text-[#141F15]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 L0,75 L20,65 L55,90 L80,60 L100,80 L100,100 Z" fill="currentColor" />
          </svg>

          {/* Golden beams */}
          <div className="absolute bottom-8 left-16 w-36 h-[1px] bg-amber-200/20 rotate-30 transform origin-left pointer-events-none" />
          <div className="absolute bottom-8 left-16 w-36 h-[1px] bg-amber-200/20 -rotate-12 transform origin-left pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-sans font-bold tracking-widest text-amber-200 uppercase block">
              Alimento Diário
            </span>
            <span className="font-classic font-bold text-base block text-amber-50 leading-tight">
              A Palavra Eterna
            </span>
          </div>
        </div>

        {/* Scripture Text Side */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center space-y-3 relative z-10 pl-6 md:pl-8">
          <div className="space-y-1">
            <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-theme-muted">
              Versículo do Dia
            </span>
            <div className="w-8 h-[2px] bg-theme-accent" />
          </div>

          <div className="relative">
            <span className="absolute -top-3.5 -left-3 text-3xl font-serif text-[#D4A24C] opacity-45">“</span>
            <p className="text-sm sm:text-base font-manuscript font-medium text-theme-primary leading-relaxed italic pr-4">
              Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="font-classic font-bold text-xs sm:text-sm text-theme-accent">
              João 3:16
            </span>
            <span className="text-[8px] font-sans font-extrabold bg-theme-accent/10 border border-theme-accent/25 text-theme-accent px-2 py-0.5 rounded-md uppercase tracking-wider">
              Versão Almeida Revista e Corrigida
            </span>
          </div>
        </div>
      </div>

      {/* 3. Reading Progress Timeline Highlight */}
      <div 
        onClick={onGoToChallenge}
        className="p-5 sm:p-6 rounded-3xl bg-theme-card border border-theme hover:border-theme-accent/30 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm group"
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Achievement Trophy visual badge */}
          <div className="relative w-12 h-12 shrink-0 rounded-2xl bg-theme-accent/10 flex items-center justify-center border border-theme-accent/20 overflow-hidden shadow-3xs">
            <Award className="w-6 h-6 text-theme-accent" />
          </div>

          <div className="space-y-2 flex-1">
            <span className="text-[9px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block">
              Seu Plano de Leitura
            </span>
            <h3 className="font-classic font-bold text-sm sm:text-base text-theme-primary leading-none">
              História da Salvação — <span className="text-theme-accent">42% concluído</span>
            </h3>
            
            {/* Smooth Golden/Olive Progress Bar */}
            <div className="w-full h-2 rounded-full bg-theme-app border border-theme overflow-hidden">
              <div 
                className="h-full bg-[#D4A24C] rounded-full transition-all duration-1000" 
                style={{ width: '42%' }} 
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-theme-accent bg-theme-accent/5 px-3.5 py-2 rounded-xl border border-theme-accent/20 hover:bg-theme-accent/10 shrink-0 self-start sm:self-auto transition-colors">
          <span>Abrir Plano</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* 3.5 Monthly Devotional & Study Highlight Banner */}
      <div 
        onClick={onGoToDevotional}
        className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#FFFDF8] to-[#F5ECE0] dark:from-[#1C1917] dark:to-[#171513] border border-theme hover:border-[#D4A24C]/40 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm group relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4A24C]/5 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-12 h-12 shrink-0 rounded-2xl bg-emerald-500/10 dark:bg-emerald-400/5 flex items-center justify-center border border-emerald-500/20 overflow-hidden shadow-3xs text-emerald-700 dark:text-emerald-400">
            <Calendar className="w-6 h-6 text-[#D4A24C]" />
          </div>

          <div className="space-y-1">
            <span className="text-[8px] sm:text-[9px] font-sans font-extrabold text-[#D4A24C] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Destaque Teológico de {monthsPt[new Date().getMonth()]}</span>
            </span>
            <h3 className="font-classic font-bold text-sm sm:text-base text-theme-primary leading-tight">
              Centro de Estudos e Devocionais Mensais
            </h3>
            <p className="text-[11px] sm:text-xs font-manuscript text-theme-secondary italic leading-relaxed">
              Descubra exegeses, questionários práticos e registre suas meditações diárias de forma contínua no diário pessoal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-white bg-[#3E5641] dark:bg-[#D4A24C] dark:text-[#1F1B16] px-4 py-2.5 rounded-xl hover:bg-[#324534] dark:hover:bg-[#B28236] shrink-0 self-start md:self-auto transition-colors shadow-3xs">
          <span>Acessar Estudos</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* 4. Elegant 2x2 Bento Navigation Grid (Beautiful Layout) */}
      <div className="space-y-4">
        <h3 className="font-classic font-bold text-sm text-theme-accent uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#D4A24C]" />
          <span>Módulos de Estudo e Edificação</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Bento Card 1: Continuar Leitura */}
          <div 
            onClick={onContinueReading}
            className="p-6 rounded-3xl bg-theme-card border border-theme hover:border-theme-accent/25 transition-all cursor-pointer flex flex-col justify-between min-h-[190px] group shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-theme-accent/10 text-theme-accent flex items-center justify-center border border-theme-accent/15">
                <BookMarked className="w-5 h-5 text-[#D4A24C]" />
              </div>
              
              <div>
                <span className="text-[8px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block">
                  ÚLTIMA LEITURA ATIVA
                </span>
                <h4 className="font-classic font-bold text-lg text-theme-primary mt-1">
                  {currentBook.name} {currentChapter}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-manuscript text-theme-secondary italic leading-relaxed line-clamp-2">
              "O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar..."
            </p>

            <div className="flex items-center gap-1 text-xs font-sans font-extrabold text-theme-accent pt-2">
              <span>Retomar Leitura</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bento Card 2: Guia de Estudo dos Livros */}
          <div 
            onClick={onGoToStudy}
            className="p-6 rounded-3xl bg-theme-card border border-theme hover:border-theme-accent/25 transition-all cursor-pointer flex flex-col justify-between min-h-[190px] group shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Sparkles className="w-5 h-5 text-[#D4A24C]" />
              </div>
              
              <div>
                <span className="text-[8px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block">
                  GUIA DOS 66 LIVROS
                </span>
                <h4 className="font-classic font-bold text-lg text-theme-primary mt-1">
                  Exegese e Dossiês
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-manuscript text-theme-secondary leading-relaxed line-clamp-2">
              Explore o contexto histórico, autor, significado do nome, temas centrais e curiosidades de cada livro bíblico.
            </p>

            <div className="flex items-center gap-1 text-xs font-sans font-extrabold text-theme-accent pt-2">
              <span>Explorar Dossiês</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bento Card 3: Dicionário & Números Strong (Conditional access) */}
          <div 
            onClick={onGoToDictionary}
            className="p-6 rounded-3xl bg-theme-card border border-theme hover:border-theme-accent/25 transition-all cursor-pointer flex flex-col justify-between min-h-[190px] group shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <BookIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              
              <div>
                <span className="text-[8px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block">
                  HERMENÊUTICA & CHAVES
                </span>
                <h4 className="font-classic font-bold text-lg text-theme-primary mt-1">
                  Dicionário Exegético
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-manuscript text-theme-secondary leading-relaxed line-clamp-2">
              Busque por palavras chaves gregas e hebraicas com os números originais de Strong e significados teológicos.
            </p>

            <div className="flex items-center gap-1 text-xs font-sans font-extrabold text-theme-accent pt-2">
              <span>Abrir Léxico</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bento Card 4: Desafio 365 Cronológico */}
          <div 
            onClick={onGoToChallenge}
            className="p-6 rounded-3xl bg-theme-card border border-theme hover:border-theme-accent/25 transition-all cursor-pointer flex flex-col justify-between min-h-[190px] group shadow-sm"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center border border-red-500/20">
                <Flame className="w-5 h-5 text-red-500" />
              </div>
              
              <div>
                <span className="text-[8px] font-sans font-extrabold text-theme-muted uppercase tracking-widest block">
                  DESAFIO CRONOLÓGICO
                </span>
                <h4 className="font-classic font-bold text-lg text-theme-primary mt-1">
                  Plano 365 Dias
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-manuscript text-theme-secondary leading-relaxed line-clamp-2">
              Acompanhe seu progresso de leitura anual. Complete o plano cronológico da História da Salvação dia após dia.
            </p>

            <div className="flex items-center gap-1 text-xs font-sans font-extrabold text-theme-accent pt-2">
              <span>Continuar Desafio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
