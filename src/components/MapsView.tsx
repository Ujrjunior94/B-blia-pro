import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  MapPin, 
  Navigation, 
  Sparkles, 
  BookOpen, 
  Users, 
  Search, 
  Calendar, 
  Filter, 
  CheckCircle,
  HelpCircle,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';
import { BIBLICAL_MAPS, BiblicalMap, MapPoint, MapRoute } from '../data/mapsData';

export const MapsView: React.FC = () => {
  const [selectedMapId, setSelectedMapId] = useState<string>('antigo-oriente');
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  
  // Custom Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [animateRoutes, setAnimateRoutes] = useState<boolean>(true);

  // SVG pan and zoom state
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeMap = useMemo(() => {
    return BIBLICAL_MAPS.find((m) => m.id === selectedMapId) || BIBLICAL_MAPS[0];
  }, [selectedMapId]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setSelectedPointId(null);
  };

  // Drag handlers with Mouse & Touch support for responsive pan
  const startDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX - pan.x, y: clientY - pan.y });
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setPan({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  // Convert map percentage coordinates (0-100) to actual SVG viewBox scale
  const getCoordinates = (point: { x: number; y: number }) => {
    const parts = activeMap.viewBox.split(' ');
    const width = parseFloat(parts[2]) || 800;
    const height = parseFloat(parts[3]) || 500;
    return {
      cx: (point.x / 100) * width,
      cy: (point.y / 100) * height,
    };
  };

  // Dynamically compile characters and books inside the active map
  const availableCharacters = useMemo(() => {
    const chars = activeMap.points.flatMap((p) => p.characters);
    return Array.from(new Set(chars)).sort();
  }, [activeMap]);

  const availableBooks = useMemo(() => {
    const bks = activeMap.points.flatMap((p) => p.books);
    return Array.from(new Set(bks)).sort();
  }, [activeMap]);

  // Filters points in map based on Search and Selected Filters
  const filteredPoints = useMemo(() => {
    return activeMap.points.filter((pt) => {
      const matchesSearch =
        searchQuery === '' ||
        pt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pt.modernName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pt.passages.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pt.characters.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCharacter =
        selectedCharacter === '' ||
        pt.characters.some(c => c.toLowerCase() === selectedCharacter.toLowerCase());

      const matchesBook =
        selectedBook === '' ||
        pt.books.some(b => b.toLowerCase() === selectedBook.toLowerCase());

      return matchesSearch && matchesCharacter && matchesBook;
    });
  }, [activeMap, searchQuery, selectedCharacter, selectedBook]);

  // Set selected point to first available if needed, or null on filter mismatch
  const selectedPoint = useMemo(() => {
    if (selectedPointId) {
      const found = activeMap.points.find((p) => p.id === selectedPointId);
      if (found) return found;
    }
    return null;
  }, [selectedPointId, activeMap]);

  const eras = [
    { id: 'antigo-oriente', label: 'Crescente Fértil', date: '2000 a.C.', order: 1 },
    { id: 'jornada-abraao', label: 'Jornada Abraão', date: '2000 a.C.', order: 2 },
    { id: 'exodo-deserto', label: 'Êxodo e Sinai', date: '1440 a.C.', order: 3 },
    { id: 'conquista-canaa', label: 'Conquista Canaã', date: '1400 a.C.', order: 4 },
    { id: 'reino-unido', label: 'Reino Unido', date: '1050 a.C.', order: 5 },
    { id: 'reinos-divididos', label: 'Reinos Divididos', date: '930 a.C.', order: 6 },
    { id: 'imperios-mundiais', label: 'Grandes Impérios', date: '745 a.C.', order: 7 },
    { id: 'ministerio-jesus', label: 'Ministério Jesus', date: '4 a.C.', order: 8 },
    { id: 'viagens-paulo', label: 'Viagens de Paulo', date: '46 d.C.', order: 9 },
    { id: 'mundo-nt', label: 'Mundo do NT', date: '100 d.C.', order: 10 },
  ];

  const handleEraChange = (mapId: string) => {
    setSelectedMapId(mapId);
    handleReset();
    setSelectedCharacter('');
    setSelectedBook('');
    setSearchQuery('');
  };

  const renderGeographyOutlines = () => {
    if (activeMap.id === 'antigo-oriente' || activeMap.id === 'jornada-abraao') {
      return (
        <g className="opacity-25 dark:opacity-15 pointer-events-none">
          {/* Mediterranean Coast */}
          <path d="M 5,20 L 15,35 Q 25,50 20,60 T 30,85" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="3,3" />
          {/* Persian Gulf */}
          <path d="M 72,72 Q 78,74 88,80 L 88,95 L 75,95 Z" fill="#b45309" className="opacity-15" />
          {/* Nile Delta */}
          <path d="M 8,85 L 10,72 L 12,85 Z" fill="none" stroke="#d97706" strokeWidth="1.5" />
          {/* Rivers Tigris & Euphrates */}
          <path d="M 45,15 Q 52,22 62,25 T 75,70" fill="none" stroke="#0284c7" strokeWidth="1.5" className="opacity-50" />
          <path d="M 42,18 Q 48,25 64,52 T 74,73" fill="none" stroke="#0284c7" strokeWidth="1.5" className="opacity-50" />
        </g>
      );
    }
    if (activeMap.id === 'exodo-deserto') {
      return (
        <g className="opacity-25 dark:opacity-15 pointer-events-none">
          {/* Nile delta */}
          <path d="M 5,20 C 10,25 10,35 15,30 C 15,40 12,60 12,95" fill="none" stroke="#0284c7" strokeWidth="2" />
          {/* Red Sea Suez & Aqaba */}
          <path d="M 25,40 C 26,45 32,55 35,70 L 36,95" fill="none" stroke="#0284c7" strokeWidth="2.5" />
          <path d="M 52,55 C 48,60 42,68 38,72 L 36,95" fill="none" stroke="#0284c7" strokeWidth="2.5" />
          {/* Sinai boundary */}
          <polygon points="25,40 52,55 36,70" fill="#d97706" className="opacity-5" />
          {/* Dead Sea */}
          <ellipse cx="57" cy="20" rx="2" ry="4" fill="#0284c7" className="opacity-35" />
        </g>
      );
    }
    if (activeMap.id === 'conquista-canaa' || activeMap.id === 'reino-unido' || activeMap.id === 'reinos-divididos' || activeMap.id === 'ministerio-jesus') {
      return (
        <g className="opacity-30 dark:opacity-15 pointer-events-none">
          {/* Mediterranean Coast */}
          <path d="M 15,0 C 25,200 15,400 10,750 L 0,750 L 0,0 Z" fill="#0284c7" className="opacity-5" />
          <path d="M 15,0 C 25,200 15,400 10,750" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="4,4" />
          {/* Galilee */}
          <ellipse cx="50" cy="18" rx="4" ry="6" fill="#0284c7" className="opacity-30" />
          <ellipse cx="50" cy="18" rx="4" ry="6" fill="none" stroke="#0284c7" strokeWidth="1" />
          {/* Dead Sea */}
          <ellipse cx="48" cy="65" rx="6" ry="25" fill="#0284c7" className="opacity-35" />
          <ellipse cx="48" cy="65" rx="6" ry="25" fill="none" stroke="#0284c7" strokeWidth="1.5" />
          {/* Jordan River */}
          <path d="M 50,24 C 51,32 49,42 48,59" fill="none" stroke="#0284c7" strokeWidth="1.5" />
          
          {/* Special boundaries for divided kingdoms */}
          {activeMap.id === 'reinos-divididos' && (
            <g>
              <line x1="5" y1="410" x2="150" y2="410" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
              <text x="25" y="402" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="serif" className="opacity-75">JUDÁ (SUL) | ISRAEL (NORTE)</text>
            </g>
          )}
        </g>
      );
    }
    if (activeMap.id === 'imperios-mundiais' || activeMap.id === 'viagens-paulo' || activeMap.id === 'mundo-nt') {
      return (
        <g className="opacity-25 dark:opacity-15 pointer-events-none">
          {/* Mediterranean outline */}
          <path d="M 5,20 L 20,25 C 28,30 25,48 30,55 C 42,52 48,38 52,42 C 55,40 70,55 80,60 C 85,62 88,78 88,85 L 75,95 L 40,95 L 12,95 Z" fill="#0284c7" className="opacity-10" />
          {/* Crete Island */}
          <path d="M 40,58 L 48,58 L 48,60 L 40,60 Z" fill="#d97706" className="opacity-30" />
          {/* Cyprus Island */}
          <path d="M 72,62 Q 76,61 78,63 T 73,64 Z" fill="#d97706" className="opacity-30" />
        </g>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Route Dashing Animation Styles injected dynamically */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .animate-route-path {
          stroke-dasharray: 8, 8;
          animation: dash 6s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Map Module Header Banner - Exquisite Editorial Scriptorium Style */}
      <div className="text-center max-w-3xl mx-auto space-y-4 py-4 animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A24C]/10 text-[#D4A24C] text-[11px] font-mono font-bold tracking-wider uppercase border border-[#D4A24C]/25">
          <Compass className="w-3.5 h-3.5" />
          <span>Geografia Sagrada & Revelação</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-theme-primary tracking-tight">
          Atlas Bíblico Interativo
        </h2>
        <p className="text-theme-secondary text-sm md:text-base leading-relaxed font-serif italic max-w-2xl mx-auto">
          "Pelo caminho em que andastes, o Senhor, vosso Deus, vos levou, como um homem leva a seu filho, por todo o caminho pelo qual andastes..."
          <span className="font-sans text-[11px] not-italic font-extrabold tracking-widest text-[#D4A24C] block mt-1 uppercase">
            — Deuteronômio 1:31
          </span>
        </p>
        <div className="w-16 h-[1px] bg-[#D4A24C]/40 mx-auto mt-4" />
      </div>

      {/* Advanced Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar cidade, descrição, personagem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-theme-app border border-theme rounded-xl text-theme-primary focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        {/* Character Filter */}
        <div className="relative">
          <select
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-theme-app border border-theme rounded-xl text-theme-primary focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none"
          >
            <option value="">Filtrar por Personagem (Todos)</option>
            {availableCharacters.map((char) => (
              <option key={char} value={char}>{char}</option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none text-theme-muted font-bold">▼</span>
        </div>

        {/* Book Filter */}
        <div className="relative">
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-theme-app border border-theme rounded-xl text-theme-primary focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none"
          >
            <option value="">Filtrar por Livro Bíblico (Todos)</option>
            {availableBooks.map((bk) => (
              <option key={bk} value={bk}>{bk}</option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none text-theme-muted font-bold">▼</span>
        </div>

        {/* Route Animation Toggle & Clear */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setAnimateRoutes(!animateRoutes)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
              animateRoutes
                ? 'bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/20'
                : 'bg-theme-app text-theme-muted border-theme'
            }`}
          >
            {animateRoutes ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{animateRoutes ? 'Pausar Rotas' : 'Animar Rotas'}</span>
          </button>

          {(searchQuery || selectedCharacter || selectedBook) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCharacter('');
                setSelectedBook('');
              }}
              className="py-2 px-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border border-transparent hover:border-red-600/10 transition-all"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Interactive Map & Chronology Slider (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative rounded-3xl border border-theme bg-stone-50 dark:bg-stone-950 overflow-hidden shadow-inner select-none h-[400px] md:h-[500px]">
            
            {/* Map floating scale/action buttons */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-white/95 dark:bg-stone-900/95 p-1.5 rounded-2xl border border-theme shadow-lg">
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-xl hover:bg-amber-500/10 text-theme-primary transition-all"
                title="Aumentar Zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-xl hover:bg-amber-500/10 text-theme-primary transition-all"
                title="Diminuir Zoom"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 rounded-xl hover:bg-amber-500/10 text-theme-primary transition-all border-t border-theme"
                title="Redefinir Vista"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Instruction bar overlay */}
            <div className="absolute bottom-4 left-4 z-10 bg-white/90 dark:bg-stone-900/90 px-3 py-1.5 rounded-xl border border-theme text-[10px] font-mono font-semibold text-theme-muted flex items-center gap-1.5 shadow-sm">
              <Navigation className="w-3 h-3 text-amber-600" />
              <span>Arraste para mover • Duplo clique para Zoom • Toque nas cidades</span>
            </div>

            {/* Interactive Vector Canvas */}
            <svg
              viewBox={activeMap.viewBox}
              className="w-full h-full cursor-grab active:cursor-grabbing bg-amber-50/5 dark:bg-stone-950 transition-colors duration-200"
              onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
              onMouseMove={(e) => moveDrag(e.clientX, e.clientY)}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={(e) => { if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY); }}
              onTouchMove={(e) => { if (e.touches[0]) moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
              onTouchEnd={endDrag}
              onDoubleClick={handleZoomIn}
            >
              <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`} className="transition-transform duration-75 ease-out">
                {/* Vintage graticule lines background */}
                <defs>
                  <pattern id="graticule" width="50" height="50" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="rgba(180, 140, 90, 0.05)" />
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(180, 140, 90, 0.05)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="1800" height="1800" x="-400" y="-400" fill="url(#graticule)" />

                {/* Custom stylized local coastlines/lakes vectors */}
                {renderGeographyOutlines()}

                {/* Render routes (animated pathway curves) */}
                {activeMap.routes.map((route) => {
                  const pathString = route.path
                    .map((pt, idx) => {
                      const { cx, cy } = getCoordinates(pt);
                      return `${idx === 0 ? 'M' : 'L'} ${cx} ${cy}`;
                    })
                    .join(' ');

                  return (
                    <g key={route.id}>
                      {/* Underlying glowing pipeline thickness */}
                      <path
                        d={pathString}
                        fill="none"
                        stroke={route.color}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-15"
                      />
                      {/* Interactive Route Line */}
                      <path
                        d={pathString}
                        fill="none"
                        stroke={route.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={animateRoutes ? "animate-route-path" : "stroke-solid opacity-90"}
                        style={{ strokeDasharray: animateRoutes ? '8, 8' : 'none' }}
                      />
                    </g>
                  );
                })}

                {/* Render coordinate location dots */}
                {activeMap.points.map((pt) => {
                  const { cx, cy } = getCoordinates(pt);
                  const isSelected = pt.id === selectedPointId;
                  
                  // Verify if point passes search filters
                  const passesFilters = filteredPoints.some(f => f.id === pt.id);

                  return (
                    <g
                      key={pt.id}
                      transform={`translate(${cx}, ${cy})`}
                      className={`cursor-pointer transition-all duration-300 ${
                        passesFilters ? 'opacity-100' : 'opacity-25 scale-75'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPointId(pt.id);
                      }}
                    >
                      {/* Outer pulse indicator for selected point */}
                      {isSelected && (
                        <circle
                          r="18"
                          className="fill-amber-500/10 stroke-amber-500/40 animate-ping"
                          style={{ animationDuration: '2.5s' }}
                        />
                      )}

                      {/* Golden border circle marker */}
                      <circle
                        r={isSelected ? 10 : 8}
                        className={`transition-all duration-300 ${
                          isSelected
                            ? 'fill-amber-500/20 stroke-amber-500'
                            : 'fill-white dark:fill-stone-900 stroke-stone-400 dark:stroke-stone-700 hover:stroke-amber-500'
                        }`}
                        strokeWidth="1.5"
                      />

                      {/* Innermost central core point */}
                      <circle
                        r="4"
                        className={`transition-colors duration-200 ${
                          isSelected 
                            ? 'fill-amber-600 dark:fill-amber-400 animate-pulse' 
                            : 'fill-amber-500'
                        }`}
                      />

                      {/* Text label underneath */}
                      <text
                        y="-14"
                        textAnchor="middle"
                        className={`font-serif text-[10px] select-none pointer-events-none drop-shadow ${
                          isSelected
                            ? 'fill-amber-800 dark:fill-amber-400 font-extrabold scale-110'
                            : 'fill-stone-800 dark:fill-stone-300 font-medium'
                        }`}
                      >
                        {pt.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Chronological Era Navigation Slider (Linha do Tempo) */}
          <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-stone-500 tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Linha do Tempo de Redenção</span>
              </span>
              <span className="text-xs font-mono text-amber-800 dark:text-amber-400 font-bold">
                Aprox. 2000 a.C. — 100 d.C.
              </span>
            </div>

            {/* Custom Interactive Chronological Slider Track */}
            <div className="relative py-4 select-none">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-200 dark:bg-stone-800 -translate-y-1/2 rounded-full" />
              
              {/* Highlight active path */}
              <div 
                className="absolute top-1/2 left-0 h-1 bg-amber-600 dark:bg-amber-500 -translate-y-1/2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((eras.find(e => e.id === activeMap.id)?.order || 1) - 1) / (eras.length - 1) * 100}%` 
                }}
              />

              {/* Steps Tick marks */}
              <div className="relative flex justify-between">
                {eras.map((era) => {
                  const isActive = era.id === activeMap.id;
                  const isCompleted = era.order < (eras.find(e => e.id === activeMap.id)?.order || 1);

                  return (
                    <button
                      key={era.id}
                      onClick={() => handleEraChange(era.id)}
                      className="group flex flex-col items-center relative focus:outline-none"
                    >
                      {/* Step Dot */}
                      <div 
                        className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10 ${
                          isActive
                            ? 'bg-amber-600 border-amber-600 scale-125 dark:bg-amber-500 dark:border-amber-500 shadow-md text-amber-50'
                            : isCompleted
                            ? 'bg-amber-100 border-amber-600 text-amber-600 dark:bg-stone-900 dark:border-amber-500 dark:text-amber-400'
                            : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-400 dark:text-stone-600 hover:border-amber-600'
                        }`}
                      >
                        <span className="text-[9px] font-sans font-bold">{era.order}</span>
                      </div>

                      {/* Tooltip on Hover / Active */}
                      <span className="absolute top-7 whitespace-nowrap text-[9px] font-sans font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-2 py-1 rounded shadow pointer-events-none z-20">
                        {era.label} ({era.date})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Selected Era Summary banner */}
            <div className="flex items-center gap-3 bg-theme-app p-3 rounded-xl border border-theme">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                <span className="font-mono font-black text-sm">{eras.find(e => e.id === activeMap.id)?.order}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-theme-primary truncate">
                  {activeMap.title}
                </h4>
                <p className="text-[10px] text-theme-muted font-mono uppercase font-bold">
                  {activeMap.period}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-theme-muted" />
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Info Card or Period Summary Panel (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <AnimatePresence mode="wait">
            {selectedPoint ? (
              <motion.div
                key={selectedPoint.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="p-6 rounded-3xl bg-theme-card border border-theme shadow-md space-y-5"
              >
                {/* Header Information */}
                <div className="border-b border-theme pb-4 space-y-2">
                  <div className="flex items-center gap-1 text-[10px] text-amber-700 dark:text-amber-400 font-mono font-bold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Localização Bíblica</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-theme-primary leading-tight">
                    {selectedPoint.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-theme-app text-theme-muted border border-theme font-semibold">
                      {activeMap.period}
                    </span>
                  </div>
                </div>

                {/* Modern Name Equivalence */}
                {selectedPoint.modernName && (
                  <div className="space-y-1 bg-stone-100/50 dark:bg-stone-900/40 p-3 rounded-xl border border-theme/50">
                    <span className="text-[9px] font-sans font-bold uppercase text-stone-500 tracking-wide block">Equivalente Geográfico Moderno</span>
                    <span className="text-xs font-mono font-extrabold text-amber-800 dark:text-amber-300">
                      {selectedPoint.modernName}
                    </span>
                  </div>
                )}

                {/* History Description */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-stone-500 tracking-wider">Histórico Bíblico & Conexões</span>
                  <p className="font-serif text-xs md:text-sm leading-relaxed text-theme-secondary text-justify">
                    {selectedPoint.description}
                  </p>
                </div>

                {/* Related Passages Tag Cloud */}
                {selectedPoint.passages && selectedPoint.passages.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-stone-500 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Referências Bíblicas</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPoint.passages.map((ref) => (
                        <span
                          key={ref}
                          className="px-2 py-1 text-[10px] font-mono font-bold rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-theme shadow-xs"
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Associated Characters Cloud */}
                {selectedPoint.characters && selectedPoint.characters.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-theme">
                    <span className="text-[10px] font-mono font-bold uppercase text-stone-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Personagens Relacionados</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPoint.characters.map((char) => (
                        <button
                          key={char}
                          onClick={() => setSelectedCharacter(char)}
                          className="px-2 py-0.5 text-[10px] font-serif font-bold rounded-full bg-emerald-500/10 text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300 border border-emerald-500/10 hover:border-emerald-500/30 transition-all flex items-center gap-1"
                          title={`Filtrar mapa por ${char}`}
                        >
                          <Filter className="w-2.5 h-2.5 opacity-50" />
                          <span>{char}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Associated Books */}
                {selectedPoint.books && selectedPoint.books.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-theme">
                    <span className="text-[10px] font-mono font-bold uppercase text-stone-500 flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-amber-500" />
                      <span>Livros Bíblicos Relacionados</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {selectedPoint.books.map((bk) => (
                        <span
                          key={bk}
                          className="px-2.5 py-0.5 text-[9px] font-mono font-semibold rounded bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
                        >
                          {bk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deselect control button */}
                <button
                  onClick={() => setSelectedPointId(null)}
                  className="w-full mt-4 py-2 bg-theme-app hover:bg-stone-100 dark:hover:bg-stone-800 text-theme-muted font-bold rounded-xl text-xs border border-theme transition-all block text-center"
                >
                  Fechar Detalhes
                </button>
              </motion.div>
            ) : (
              /* Display active map period summary by default */
              <motion.div
                key={activeMap.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 rounded-3xl bg-theme-card border border-theme shadow-md space-y-5"
              >
                <div className="border-b border-theme pb-4 space-y-1.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-400 text-[10px] font-mono font-black border border-amber-500/20">
                    Resumo do Período
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-theme-primary">
                    {activeMap.title}
                  </h3>
                  <p className="text-[10px] text-theme-muted font-mono font-bold uppercase tracking-wider">
                    {activeMap.period}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed font-serif text-justify">
                    {activeMap.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-stone-900/30 border border-amber-900/10 dark:border-stone-850 space-y-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-900 dark:text-amber-400 flex items-center gap-1.5 tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Propósito & Contexto Teológico</span>
                  </span>
                  <p className="text-xs text-theme-secondary leading-relaxed font-serif text-justify">
                    {activeMap.theologicalContext}
                  </p>
                </div>

                {/* Period Point list for easy navigation */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-stone-500 tracking-wider">
                    Pontos de Interesse Disponíveis ({activeMap.points.length})
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {activeMap.points.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedPointId(p.id);
                        }}
                        className="p-2 text-left rounded-xl bg-theme-app hover:bg-amber-500/10 border border-theme transition-all flex items-center gap-1.5"
                      >
                        <MapPin className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        <span className="text-[10px] font-serif font-semibold text-theme-primary truncate block">
                          {p.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-theme-muted leading-relaxed font-sans flex items-start gap-1.5 border-t border-theme pt-3 italic">
                  <HelpCircle className="w-4 h-4 text-theme-muted flex-shrink-0" />
                  <span>Escolha qualquer ponto de interesse acima ou toque diretamente no mapa para destrancar revelações bíblicas profundas.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
