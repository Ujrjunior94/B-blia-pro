import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Users,
  Compass,
  Heart,
  Search,
  Star,
  BookMarked,
  ArrowRight,
  Award,
  Book,
  PenTool,
  Scroll,
  Target,
  Key,
  Crown,
  Image as ImageIcon,
  Clock,
  HelpCircle,
  Lightbulb,
  FileText,
  ChevronRight,
  Info
} from 'lucide-react';
import { BIBLE_BOOKS } from '../data/bibleBooks';
import { getBookStudyGuide } from '../data/bibleJourneyData';
import { PropheciesView } from './PropheciesView';
import { IllustrationsView } from './IllustrationsView';
import { useTheme } from '../styles/themeConstants';

interface BibleJourneyModuleProps {
  onSelectBookForReading?: (bookId: string, chapter?: number) => void;
}

// Map beautiful, high-quality thematic Unsplash images for each biblical book to give an immediate premium feel
const BOOK_COVER_IMAGES: Record<string, string> = {
  GEN: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200', // Sunkissed peaks / Beginning
  EXO: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200', // Desert mountains and sky
  LEV: 'https://images.unsplash.com/photo-1543357115-92e515b2c9b3?auto=format&fit=crop&q=80&w=1200', // Warm altar / sacred light
  NUM: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200', // Deep starry night / wilderness path
  DEU: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=1200', // Scroll and antique pen
  PSA: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1200', // Green pastures and quiet waters
  PRO: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=1200', // Antique book / candle light
  ISA: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=1200', // Heaven / Clouds and dawn
  MAT: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1200', // Golden crown in glowing light
  ROM: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200', // Ancient roman ruins at sunset
  REV: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200'  // Cosmic galaxy / triumph
};

const BOOK_CURIOSITIES: Record<string, string[]> = {
  GEN: [
    "O título em hebraico é 'Bereshit', que significa simplesmente 'No Princípio'.",
    "É o único livro bíblico que narra o início absoluto do tempo, do espaço e da matéria.",
    "Contém a primeira profecia da Bíblia (o Protoevangelho em Gn 3:15) apontando para a vitória final de Cristo."
  ],
  EXO: [
    "As dez pragas do Egito foram juízos diretos e específicos contra as principais divindades egípcias adoradas na época.",
    "O Tabernáculo foi construído inteiramente com ofertas voluntárias do povo, que doou tanto que Moisés teve que pedir para pararem.",
    "O nome de Deus 'Eu Sou o que Eu Sou' (YHWH) é revelado pela primeira vez de forma solene a Moisés na sarça ardente."
  ],
  LEV: [
    "Contém algumas das regras de higiene, quarentena e saúde pública mais avançadas de toda a antiguidade oriental.",
    "O Dia da Expiação (Yom Kippur) era o único dia do ano em que o Sumo Sacerdote podia entrar no Santo dos Santos.",
    "Mais de 90% do livro consiste em falas diretas de Deus a Moisés, tornando-o o livro com maior proporção de discurso divino direto."
  ],
  NUM: [
    "O título em hebraico é 'Bamidbar', que significa 'No Deserto', refletindo o verdadeiro local geográfico da narrativa.",
    "Relata o censo de duas gerações diferentes de guerreiros, daí o nome tradicional em português 'Números'.",
    "Balaão foi contratado para amaldiçoar Israel, mas acabou abençoando a nação três vezes sob influência do Espírito de Deus."
  ],
  DEU: [
    "Consiste essencialmente em discursos pastorais pregados por Moisés no final de sua vida, antes de subir ao Monte Nebo.",
    "Foi o livro mais citado por Jesus durante Seu ministério, inclusive para repelir as três tentações do Diabo no deserto.",
    "O 'Shema Israel' (Dt 6:4-5) contido no livro é considerado até hoje a declaração de fé mais importante da liturgia judaica."
  ],
  PSA: [
    "O Salmo 119 é o maior capítulo de toda a Bíblia e é estruturado como um acróstico alfabético hebraico perfeito.",
    "Salmos é o livro do Antigo Testamento mais citado pelos autores do Novo Testamento, em especial sobre a pessoa do Messias.",
    "O Salmo 117 é o capítulo mais curto da Bíblia e também o ponto central geográfico das Escrituras Sagradas."
  ],
  PRO: [
    "Salomão compôs cerca de 3.000 provérbios e 1.005 cânticos ao longo de sua vida, uma parte dos quais está reunida neste livro.",
    "O famoso poema da Mulher Virtuosa (Provérbios 31:10-31) é escrito no original hebraico seguindo o alfabeto acróstico.",
    "Diferente da filosofia grega abstrata, a 'sabedoria' em Provérbios é extremamente prática e focada no cotidiano e na conduta ética."
  ],
  ISA: [
    "Frequentemente chamado de 'O Quinto Evangelho' devido ao nível de detalhes sobre o nascimento, ministério e sacrifício expiatório de Jesus.",
    "A descoberta dos Manuscritos do Mar Morto em 1947 continha um rolo completo de Isaías de 100 a.C., provando sua preservação perfeita.",
    "O livro divide-se perfeitamente em duas partes (caps. 1-39 sobre juízo; caps. 40-66 sobre consolação), espelhando a própria Bíblia (39 livros do AT e 27 do NT)."
  ],
  MAT: [
    "Foi escrito com foco primário no público judeu, contendo mais de 60 referências ao cumprimento de profecias do Antigo Testamento.",
    "Mateus (Levi) era cobrador de impostos, o que explica sua precisão com números, tabelas e transações financeiras.",
    "É o único dos quatro evangelhos que registra a palavra grega 'Ekklesia' (Igreja) proferida por Jesus."
  ],
  ROM: [
    "É amplamente considerado o documento teológico mais sistemático e influente de toda a história cristã ocidental.",
    "Serviu de estopim espiritual para a conversão de grandes líderes da fé, incluindo Santo Agostinho, Martinho Lutero e John Wesley.",
    "O tema da carta revolucionou a teologia ao provar que a salvação é inteiramente pela fé na graça divina, livre de mérito humano."
  ],
  REV: [
    "O nome do livro significa 'Apocalipse' (do grego Apokalupsis = Desvelamento, Revelação) e não destruição ou catástrofe final.",
    "É o único livro de toda a Bíblia que promete uma bem-aventurança especial explícita a quem o lê e ouve suas palavras.",
    "O livro fecha com chaves de ouro o plano divino: a Árvore da Vida, perdida no Gênesis, é restaurada na Nova Jerusalém celestial."
  ]
};

export const BibleJourneyModule: React.FC<BibleJourneyModuleProps> = ({ onSelectBookForReading }) => {
  const { theme } = useTheme();
  const [moduleType, setModuleType] = useState<'books' | 'prophecies' | 'illustrations'>('books');
  const [selectedBookId, setSelectedBookId] = useState<string>('ROM');
  const [filterTestament, setFilterTestament] = useState<'ALL' | 'AT' | 'NT'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const studyGuide = getBookStudyGuide(selectedBookId);
  const currentBook = BIBLE_BOOKS.find((b) => b.id === selectedBookId) || BIBLE_BOOKS[0];

  const filteredBooks = BIBLE_BOOKS.filter((b) => {
    const matchesTestament = filterTestament === 'ALL' || b.testament === filterTestament;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTestament && matchesSearch;
  });

  const getCoverImage = (bookId: string) => {
    return BOOK_COVER_IMAGES[bookId.toUpperCase()] || 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=1200';
  };

  const getCuriosities = (bookId: string) => {
    return BOOK_CURIOSITIES[bookId.toUpperCase()] || [
      "Este livro faz parte do cânone bíblico inspirado, preservado com extrema exatidão ao longo dos séculos.",
      "Apresenta ensinamentos teológicos profundos que edificam a comunidade de fé em todas as eras.",
      "Aponta para a fidelidade inabalável de Deus em cumprir Suas promessas de redenção eterna."
    ];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8 text-theme-primary font-modern pb-24">
      
      {/* Dynamic Navigation Tabs with Scriptorium theme */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-full bg-theme-card border border-theme shadow-sm">
          <button
            onClick={() => setModuleType('books')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              moduleType === 'books'
                ? 'bg-theme-accent text-amber-50 shadow-sm'
                : 'text-theme-secondary hover:bg-theme-card-hover'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#D4A24C]" />
            <span>Guia dos 66 Livros</span>
          </button>
          <button
            onClick={() => setModuleType('prophecies')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              moduleType === 'prophecies'
                ? 'bg-theme-accent text-amber-50 shadow-sm'
                : 'text-theme-secondary hover:bg-theme-card-hover'
            }`}
          >
            <Star className="w-4 h-4 text-[#D4A24C]" />
            <span>Profecias Bíblicas</span>
          </button>
          <button
            onClick={() => setModuleType('illustrations')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              moduleType === 'illustrations'
                ? 'bg-theme-accent text-amber-50 shadow-sm'
                : 'text-theme-secondary hover:bg-theme-card-hover'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#D4A24C]" />
            <span>Cenas Ilustradas</span>
          </button>
        </div>
      </div>

      {moduleType === 'prophecies' ? (
        <div className="animate-fade-in">
          <PropheciesView />
        </div>
      ) : moduleType === 'illustrations' ? (
        <div className="animate-fade-in">
          <IllustrationsView onOpenPassage={onSelectBookForReading} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* LEFT COLUMN: Modern, Responsive Bible Book Selector (4 Cols on large screens) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-classic font-bold text-theme-primary flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-theme-accent" />
                  <span>Cânon Sagrado</span>
                </h3>
                <p className="text-xs text-theme-secondary">Filtre e selecione o livro bíblico para abrir o dossiê teológico.</p>
              </div>

              {/* Testament Tabs */}
              <div className="flex gap-1 border-b border-theme pb-2.5">
                {[
                  { id: 'ALL', label: 'Todos (66)' },
                  { id: 'AT', label: 'Antigo (39)' },
                  { id: 'NT', label: 'Novo (27)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterTestament(tab.id as any)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-sans font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                      filterTestament === tab.id
                        ? 'bg-theme-accent text-amber-50 border-transparent shadow-3xs'
                        : 'bg-transparent text-theme-secondary border-theme hover:bg-theme-card-hover'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input
                  type="text"
                  placeholder="Pesquisar livro ou abreviação..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-theme-app border border-theme rounded-xl text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent/30"
                />
              </div>

              {/* Responsive Scrollable Book List Grid */}
              <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1 no-scrollbar scroll-smooth">
                {filteredBooks.length === 0 ? (
                  <p className="text-xs text-center text-theme-muted py-8 italic">Nenhum livro encontrado para o filtro.</p>
                ) : (
                  filteredBooks.map((book) => {
                    const isSelected = book.id === selectedBookId;
                    return (
                      <button
                        key={book.id}
                        onClick={() => setSelectedBookId(book.id)}
                        className={`w-full px-4 py-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-theme-accent/10 border-theme-accent/40 shadow-3xs'
                            : 'bg-transparent border-transparent hover:bg-theme-card-hover'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Book className={`w-4 h-4 ${isSelected ? 'text-theme-accent' : 'text-theme-muted'}`} />
                          <div className="space-y-0.5">
                            <span className={`text-xs font-serif font-bold ${isSelected ? 'text-theme-accent font-extrabold' : 'text-theme-primary'}`}>
                              {book.name}
                            </span>
                            <span className="text-[10px] text-theme-muted block font-sans">
                              {book.category}
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-theme-app text-theme-secondary border border-theme font-bold">
                          {book.abbreviation}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Premium Thematic Study File (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Luxurious Banner Section (Exquisite and Majestic) */}
            <div className="relative rounded-3xl overflow-hidden shadow-md bg-stone-900 border border-theme text-amber-50">
              {/* Cover Image Background with dark artistic wash */}
              <div className="absolute inset-0 z-0">
                <img
                  src={getCoverImage(selectedBookId)}
                  alt={studyGuide.bookName}
                  className="w-full h-full object-cover opacity-35 scale-105 transform hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent" />
              </div>

              {/* Banner Content (Framed beautifully) */}
              <div className="relative z-10 p-6 md:p-8 space-y-4 md:space-y-6 min-h-[220px] flex flex-col justify-end">
                {/* Micro Category Labels */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-[9px] font-sans font-bold tracking-wider uppercase bg-[#2B422F] text-emerald-100 px-2.5 py-1 rounded-md border border-emerald-500/10">
                    <BookMarked className="w-3 h-3 text-[#D4A24C]" />
                    <span>{currentBook.testament === 'AT' ? 'Antigo Testamento' : 'Novo Testamento'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-sans font-bold tracking-wider uppercase bg-stone-850 text-amber-200 px-2.5 py-1 rounded-md border border-amber-500/10">
                    <Clock className="w-3 h-3 text-[#D4A24C]" />
                    <span>{studyGuide.historicalPeriod.split('(')[0].trim()}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-sans font-bold tracking-wider uppercase bg-stone-800 text-stone-200 px-2.5 py-1 rounded-md border border-stone-700">
                    <span>{currentBook.category}</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl font-classic font-bold tracking-tight text-amber-100">
                    {studyGuide.bookName}
                  </h1>
                  <p className="text-stone-300 font-manuscript italic text-sm md:text-base leading-relaxed max-w-2xl">
                    Escrito por <strong className="text-amber-300 font-semibold">{studyGuide.traditionalAuthor}</strong>. {studyGuide.nameMeaning}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Structured Information Scriptorium Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box A: Tema Central & Versículo-Chave */}
              <div className="p-5 md:p-6 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-3">
                <h3 className="text-sm font-classic font-bold text-theme-accent uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#D4A24C]" />
                  <span>Tema Central & Versículo</span>
                </h3>
                <div className="space-y-3 font-manuscript">
                  <p className="text-base font-bold text-theme-primary leading-snug">
                    {studyGuide.centralTheme}
                  </p>
                  <div className="p-3.5 rounded-2xl bg-theme-app border border-theme border-l-4 border-l-[#D4A24C] space-y-1">
                    <span className="text-[9px] font-sans font-extrabold text-[#D4A24C] uppercase tracking-wider block">Passagem Chave</span>
                    <p className="text-xs italic text-theme-secondary font-medium leading-relaxed">
                      "{studyGuide.keyVerse}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Box B: Foco Linguístico & Palavra-chave */}
              <div className="p-5 md:p-6 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-3">
                <h3 className="text-sm font-classic font-bold text-theme-accent uppercase tracking-wider flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#D4A24C]" />
                  <span>Foco Linguístico</span>
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-theme-muted font-sans font-bold uppercase tracking-wider block">Palavra-Chave Principal</span>
                    <div className="inline-flex px-3.5 py-1.5 bg-theme-accent/10 border border-theme-accent/35 rounded-xl font-classic font-bold text-xs text-theme-accent">
                      {studyGuide.keyWord}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 pt-3 border-t border-theme">
                    <span className="text-[10px] text-theme-muted font-sans font-bold uppercase tracking-wider block">Significado Hermenêutico do Nome</span>
                    <p className="text-xs font-manuscript italic text-theme-secondary leading-relaxed">
                      {studyGuide.nameMeaning}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* 3. Book Summary Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-3">
              <h3 className="text-sm font-classic font-bold text-theme-accent uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4A24C]" />
                <span>Resumo Teológico e Narrativo</span>
              </h3>
              <p className="text-sm md:text-base font-manuscript text-theme-secondary leading-relaxed first-letter:text-3xl first-letter:font-classic first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-theme-accent">
                {studyGuide.generalSummary}
              </p>
            </div>

            {/* 4. Timeline / Chronological Outline (Beautiful Vertical component matching requirement) */}
            <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-classic font-bold text-theme-accent uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4A24C]" />
                  <span>Linha do Tempo & Esboço do Livro</span>
                </h3>
                <p className="text-xs text-theme-muted font-sans">Siga a ordem cronológica e a estrutura literária por capítulos.</p>
              </div>

              {/* Vertical Timeline */}
              <div className="relative border-l-2 border-theme-accent/30 pl-5 ml-2.5 space-y-6 pt-2">
                {studyGuide.keyEventsAndOutline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Golden Circle Bullet */}
                    <div className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-theme-card border-2 border-theme-accent flex items-center justify-center group-hover:scale-125 transition-transform">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4A24C]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-[10px] font-mono font-bold text-theme-accent bg-theme-accent/10 px-2 py-0.5 rounded border border-theme-accent/25 uppercase tracking-wider">
                          {item.chapterRange}
                        </span>
                        <h4 className="font-classic font-bold text-sm text-theme-primary">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm font-manuscript text-theme-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Main Historical Characters */}
            <div className="p-6 md:p-8 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-5">
              <h3 className="text-sm font-classic font-bold text-theme-accent uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D4A24C]" />
                <span>Personagens e Figuras Principais</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyGuide.mainCharacters.map((char, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-theme-app border border-theme hover:border-theme-accent/20 transition-all flex gap-3.5 items-start">
                    {/* Circle avatar with initial letter */}
                    <div className="w-10 h-10 rounded-full bg-theme-accent/15 border border-theme-accent/30 flex items-center justify-center font-classic font-extrabold text-sm text-theme-accent shrink-0 shadow-3xs">
                      {char.name.charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <h4 className="font-classic font-bold text-xs text-theme-primary">{char.name}</h4>
                        <span className="text-[9px] font-sans text-theme-accent uppercase tracking-wider bg-theme-accent/5 px-1.5 py-0.2 rounded border border-theme-accent/10">{char.role}</span>
                      </div>
                      <p className="text-xs font-manuscript text-theme-secondary leading-relaxed">
                        {char.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Christ in the Book Section (Theological Highlight block) */}
            <div className="p-6 md:p-8 rounded-3xl bg-theme-card border-2 border-theme-accent/20 dark:border-theme-accent/30 shadow-sm relative overflow-hidden bg-gradient-to-br from-theme-card to-theme-accent/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-theme-accent/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Crown className="w-5 h-5 text-theme-accent animate-pulse" />
                  <h3 className="text-base font-classic font-bold text-theme-accent uppercase tracking-wider">
                    Cristocentrismo: Revelação de Cristo
                  </h3>
                </div>
                
                <p className="text-sm md:text-base font-manuscript text-theme-secondary leading-relaxed italic">
                  {studyGuide.ChristInTheBook}
                </p>
              </div>
            </div>

            {/* 7. Theological Purposes & Practical Application */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Purposes */}
              <div className="p-5 md:p-6 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-3">
                <h3 className="text-sm font-classic font-bold text-theme-accent uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4A24C]" />
                  <span>Propósitos Teológicos</span>
                </h3>
                <ul className="space-y-2.5">
                  {studyGuide.theologicalPurposes ? (
                    studyGuide.theologicalPurposes.map((purpose, idx) => (
                      <li key={idx} className="text-xs sm:text-sm font-manuscript text-theme-secondary leading-relaxed flex gap-2">
                        <span className="text-[#D4A24C] font-extrabold">•</span>
                        <span>{purpose}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs italic text-theme-muted">Exposição em desenvolvimento.</li>
                  )}
                </ul>
              </div>

              {/* Applications */}
              <div className="p-5 md:p-6 rounded-3xl bg-theme-card border border-theme shadow-sm space-y-3">
                <h3 className="text-sm font-classic font-bold text-theme-accent uppercase tracking-wider flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Aplicação Prática</span>
                </h3>
                <ul className="space-y-2.5">
                  {studyGuide.practicalApplication.map((app, idx) => (
                    <li key={idx} className="text-xs sm:text-sm font-manuscript text-theme-secondary leading-relaxed flex gap-2">
                      <span className="text-rose-500 font-extrabold">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* 8. Curiosities Cabinet (Highly engaging interactive card matching request) */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#FAF6EE] dark:bg-[#201C18] border border-[#E7DECF] dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-500/10" />
                <h3 className="text-sm font-classic font-bold text-[#38312B] dark:text-amber-100 uppercase tracking-wider">
                  Gabinete de Curiosidades Teológicas & Históricas
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {getCuriosities(selectedBookId).map((curio, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-theme-card border border-theme flex gap-3 items-start hover:shadow-3xs transition-shadow">
                    <span className="font-classic font-extrabold text-[#D4A24C] text-xs pt-0.5">0{idx + 1}</span>
                    <p className="text-xs sm:text-sm font-manuscript text-theme-secondary leading-relaxed">
                      {curio}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. Interactive Scriptorium Navigation Trigger ("Iniciar Estudo Completo") */}
            {onSelectBookForReading && (
              <div className="pt-4">
                <button
                  onClick={() => onSelectBookForReading(selectedBookId)}
                  className="w-full py-4.5 rounded-2xl bg-theme-accent text-amber-50 hover:bg-theme-accent/95 active:scale-[0.99] transition-all font-classic font-bold text-base flex items-center justify-center gap-3 cursor-pointer shadow-md border-b-4 border-b-[#1C2E1E] dark:border-b-[#B28236]"
                >
                  <BookOpen className="w-5 h-5 text-[#D4A24C]" />
                  <span>Iniciar Estudo Completo de {studyGuide.bookName}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
