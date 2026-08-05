import React, { useState } from 'react';
import { X, Download, HardDrive, CheckCircle2, ArrowLeft, CloudLightning, BookOpen, Crown } from 'lucide-react';

interface OfflineManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({ isOpen, onClose }) => {
  const [activeSubTab, setActiveSubTab] = useState<'traducoes' | 'originais'>('traducoes');
  const [downloading, setDownloading] = useState<string | null>('NVI'); // Mock NVI as downloading at 65% to match Image 2!
  const [installedVersions, setInstalledVersions] = useState<string[]>(['ARC']);

  if (!isOpen) return null;

  const handleDownloadFullVersion = (code: string) => {
    setDownloading(code);
    setTimeout(() => {
      setDownloading(null);
      if (!installedVersions.includes(code)) {
        setInstalledVersions((prev) => [...prev, code]);
      }
    }, 2000);
  };

  const handleRemoveVersion = (code: string) => {
    setInstalledVersions((prev) => prev.filter((c) => c !== code));
  };

  const traducoesList = [
    { code: 'ARC', name: 'Almeida Revista e Corrigida (ARC)', size: '24 MB', status: 'downloaded', iconType: 'green_cross' },
    { code: 'NAA', name: 'Nova Almeida Atualizada (NAA)', size: '26 MB', status: 'download', iconType: 'brown_book' },
    { code: 'NVI', name: 'Nova Versão Internacional (NVI)', size: '26 MB', status: 'progress', iconType: 'gold_book', progress: 65, progressText: '17/26 MB' },
    { code: 'ACF', name: 'Almeida Corrigida Fiel (ACF)', size: '25 MB', status: 'download', iconType: 'brown_book' },
    { code: 'KJA', name: 'King James Atualizada (KJA)', size: '27 MB', status: 'download', iconType: 'crown' },
  ];

  const originaisList = [
    { code: 'WLC', name: 'Hebraico - Westminster Leningrad Codex', size: '45 MB', status: 'download', iconType: 'hebrew' },
    { code: 'SBLGNT', name: 'Grego - SBLGNT + Nestle-Aland', size: '90 MB', status: 'download', iconType: 'greek' },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'green_cross':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shrink-0 shadow-3xs border border-emerald-900/10">
            <span className="text-lg font-serif font-bold">†</span>
          </div>
        );
      case 'gold_book':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#D4A24C] flex items-center justify-center text-[#1F1B16] shrink-0 shadow-3xs">
            <BookOpen className="w-5 h-5" />
          </div>
        );
      case 'crown':
        return (
          <div className="w-10 h-10 rounded-xl bg-[#3E5641] flex items-center justify-center text-amber-200 shrink-0 shadow-3xs">
            <Crown className="w-5 h-5" />
          </div>
        );
      case 'hebrew':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-950 flex items-center justify-center text-amber-100 font-bold shrink-0 shadow-3xs font-serif">
            תנ
          </div>
        );
      case 'greek':
        return (
          <div className="w-10 h-10 rounded-xl bg-indigo-950 flex items-center justify-center text-indigo-100 font-bold shrink-0 shadow-3xs font-serif">
            ΑΩ
          </div>
        );
      case 'brown_book':
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[#EFE6D6] text-amber-900 flex items-center justify-center shrink-0 border border-[#E7DECF]">
            <BookOpen className="w-5 h-5 opacity-70" />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md bg-[#FFFDF8] dark:bg-[#151311] border border-[#E7DECF] dark:border-stone-850 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1F1B16] dark:text-stone-200">
        
        {/* 1. Header Row (Image 2) */}
        <div className="px-5 py-4 border-b border-[#E7DECF] dark:border-stone-800 flex items-center justify-between bg-[#F7F1E5] dark:bg-stone-900 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-stone-200/50 text-[#1F1B16] dark:text-stone-400 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="font-serif font-extrabold text-sm text-[#1F1B16] dark:text-amber-100">
              Biblioteca Offline
            </h3>
          </div>
          {/* Cloud download top-right icon */}
          <div className="p-2 text-[#3E5641] dark:text-[#D4A24C]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m0 0l-3-3m3 3l3-3m-9 3h12a3 3 0 003-3V7.5a3 3 0 00-3-3h-1.5a4.5 4.5 0 00-9 0H7.5a3 3 0 00-3 3V12a3 3 0 003 3z" />
            </svg>
          </div>
        </div>

        {/* 2. Sub-Header Progress Bar (Image 2) */}
        <div className="p-4 bg-[#F7F1E5]/40 dark:bg-stone-950/20 border-b border-[#E7DECF] dark:border-stone-850 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-sans font-bold text-[#5F5A52] dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-[#3E5641] dark:text-[#D4A24C]" />
              Espaço em Disco
            </span>
            <span className="font-sans text-stone-600 dark:text-stone-300">
              312 MB usados de 2 GB disponíveis
            </span>
          </div>

          {/* Elegant gold progress bar */}
          <div className="w-full h-2 rounded-full bg-[#E7DECF] dark:bg-stone-800 overflow-hidden">
            <div 
              className="h-full bg-[#D4A24C] transition-all duration-500 rounded-full" 
              style={{ width: '15.6%' }} // 312MB of 2000MB is 15.6%
            />
          </div>
        </div>

        {/* 3. Sub Tabs: Traduções & Textos Originais */}
        <div className="flex bg-[#F7F1E5]/30 border-b border-[#E7DECF] dark:border-stone-850 shrink-0">
          <button
            onClick={() => setActiveSubTab('traducoes')}
            className={`flex-1 py-3 text-xs font-sans font-extrabold uppercase tracking-widest relative transition-all cursor-pointer ${
              activeSubTab === 'traducoes'
                ? 'text-[#D4A24C]'
                : 'text-stone-400 hover:text-[#1F1B16]'
            }`}
          >
            <span>Traduções</span>
            {activeSubTab === 'traducoes' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A24C]" />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('originais')}
            className={`flex-1 py-3 text-xs font-sans font-extrabold uppercase tracking-widest relative transition-all cursor-pointer ${
              activeSubTab === 'originais'
                ? 'text-[#D4A24C]'
                : 'text-stone-400 hover:text-[#1F1B16]'
            }`}
          >
            <span>Textos Originais</span>
            {activeSubTab === 'originais' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A24C]" />
            )}
          </button>
        </div>

        {/* 4. Scrollable List of items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
          {(activeSubTab === 'traducoes' ? traducoesList : originaisList).map((v: any) => {
            const isDownloaded = installedVersions.includes(v.code) || v.status === 'downloaded';
            const isProgress = downloading === v.code || v.status === 'progress';

            return (
              <div
                key={v.code}
                className="p-3.5 bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-850 rounded-2xl flex items-center justify-between gap-4 shadow-3xs"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {renderIcon(v.iconType)}
                  
                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="font-serif font-extrabold text-xs text-[#1F1B16] dark:text-stone-100 truncate">
                      {v.name}
                    </h4>
                    
                    {isProgress ? (
                      <div className="space-y-1.5 pr-2">
                        <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                          <div className="h-full bg-[#D4A24C] rounded-full" style={{ width: `${v.progress || 65}%` }} />
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-sans font-bold text-stone-400">
                          <span>{v.progress}% concluído</span>
                          <span>{v.progressText}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-sans block">
                        Tamanho: {v.size}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side download action button */}
                <div className="shrink-0">
                  {isDownloaded ? (
                    <span className="flex items-center gap-1 text-[10px] font-sans font-extrabold text-emerald-600 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1.5 rounded-lg border border-emerald-200/25">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Baixado</span>
                    </span>
                  ) : isProgress ? (
                    <span className="text-[10px] font-sans font-extrabold text-[#D4A24C] uppercase tracking-wider animate-pulse bg-amber-50 dark:bg-amber-950/20 px-2.5 py-1.5 rounded-lg border border-amber-200/25">
                      Baixando
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDownloadFullVersion(v.code)}
                      className="px-4 py-2 rounded-xl bg-transparent border border-[#3E5641] text-[#3E5641] dark:text-stone-200 hover:bg-[#3E5641]/5 text-[10px] font-sans font-extrabold uppercase tracking-wider cursor-pointer shadow-3xs transition-all active:scale-95"
                    >
                      Baixar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. Footer Row */}
        <div className="px-5 py-4 border-t border-[#E7DECF] dark:border-stone-800 bg-[#F7F1E5] dark:bg-stone-900 shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#3E5641] text-[#FFFDF8] font-sans font-extrabold text-xs uppercase tracking-wider shadow-2xs hover:bg-[#324534] cursor-pointer"
          >
            Fechar Biblioteca
          </button>
        </div>

      </div>
    </div>
  );
};
