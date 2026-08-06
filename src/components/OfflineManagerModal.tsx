import React, { useState, useEffect } from 'react';
import { X, Download, HardDrive, CheckCircle2, ArrowLeft, CloudLightning, BookOpen, Crown, RefreshCw, Zap } from 'lucide-react';
import { downloadFullVersionOffline, downloadAllVersionsOffline, ALL_AVAILABLE_VERSION_CODES } from '../services/bibleService';
import { localDB } from '../utils/db';

interface OfflineManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({ isOpen, onClose }) => {
  const [activeSubTab, setActiveSubTab] = useState<'traducoes' | 'originais'>('traducoes');
  const [downloadingCode, setDownloadingCode] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<{ pct: number; text: string }>({ pct: 0, text: '' });
  const [installedVersions, setInstalledVersions] = useState<string[]>(() => {
    const saved = localStorage.getItem('jornada_installed_versions');
    return saved ? JSON.parse(saved) : ['ARC', 'INTERLINEAR'];
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const syncDbWithState = async () => {
      const dbInstalled: string[] = [];
      for (const code of ALL_AVAILABLE_VERSION_CODES) {
        const isDownloaded = await localDB.isVersionDownloaded(code);
        if (isDownloaded) {
          dbInstalled.push(code);
        }
      }
      const savedStr = localStorage.getItem('jornada_installed_versions');
      const saved: string[] = savedStr ? JSON.parse(savedStr) : ['ARC', 'INTERLINEAR'];
      const merged = Array.from(new Set([...saved, ...dbInstalled]));
      if (active) {
        setInstalledVersions(merged);
      }
    };
    if (isOpen) {
      syncDbWithState();
    }
    return () => {
      active = false;
    };
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('jornada_installed_versions', JSON.stringify(installedVersions));
  }, [installedVersions]);

  if (!isOpen) return null;

  const handleDownloadFullVersion = async (code: string) => {
    setDownloadingCode(code);
    setDownloadProgress({ pct: 0, text: 'Iniciando download da versão...' });

    try {
      await downloadFullVersionOffline(code, (pct, statusText) => {
        setDownloadProgress({ pct, text: statusText });
      });
      if (!installedVersions.includes(code)) {
        setInstalledVersions((prev) => [...prev, code]);
      }
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setDownloadingCode(null);
    }
  };

  const handleDownloadAllAvailable = async () => {
    setDownloadingCode('ALL');
    setDownloadProgress({ pct: 0, text: 'Iniciando download de todas as 8 versões...' });

    try {
      await downloadAllVersionsOffline((code, pct, statusText) => {
        setDownloadProgress({ pct, text: statusText });
        if (code !== 'CONCLUIDO' && !installedVersions.includes(code)) {
          setInstalledVersions((prev) => Array.from(new Set([...prev, code])));
        }
      });
      setInstalledVersions([...ALL_AVAILABLE_VERSION_CODES]);
    } catch (e) {
      console.error('Error downloading all versions:', e);
    } finally {
      setDownloadingCode(null);
    }
  };

  const handleSyncAllOffline = async () => {
    setIsSyncing(true);
    setSyncStatus('Sincronizando banco de dados online e offline...');
    try {
      for (const code of installedVersions) {
        await downloadFullVersionOffline(code, (pct, text) => {
          setSyncStatus(`Sincronizando ${code}: ${pct}% - ${text}`);
        });
      }
      setSyncStatus('Sincronização concluída com sucesso!');
      setTimeout(() => setSyncStatus(null), 3000);
    } catch (e) {
      setSyncStatus('Erro ao sincronizar.');
      setTimeout(() => setSyncStatus(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  const traducoesList = [
    { code: 'ARC', name: 'Almeida Revista e Corrigida (ARC)', size: '24 MB', iconType: 'green_cross' },
    { code: 'NAA', name: 'Nova Almeida Atualizada (NAA)', size: '26 MB', iconType: 'brown_book' },
    { code: 'NVI', name: 'Nova Versão Internacional (NVI)', size: '26 MB', iconType: 'gold_book' },
    { code: 'ACF', name: 'Almeida Corrigida Fiel (ACF)', size: '25 MB', iconType: 'brown_book' },
    { code: 'KJA', name: 'King James Atualizada (KJA)', size: '27 MB', iconType: 'crown' },
  ];

  const originaisList = [
    { code: 'INTERLINEAR', name: 'Interlinear Completa (Hebraico + Grego + Português)', size: '98 MB', iconType: 'interlinear' },
    { code: 'WLC', name: 'Hebraico - Westminster Leningrad Codex (WLC)', size: '45 MB', iconType: 'hebrew' },
    { code: 'SBLGNT', name: 'Grego - SBLGNT + Nestle-Aland 28ª Ed.', size: '90 MB', iconType: 'greek' },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'interlinear':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-900 flex flex-col items-center justify-center text-amber-100 font-bold shrink-0 shadow-3xs font-serif leading-tight">
            <span className="text-[10px]">תנ</span>
            <span className="text-[10px] -mt-1">ΑΩ</span>
          </div>
        );
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
        
        {/* 1. Header Row */}
        <div className="px-5 py-4 border-b border-[#E7DECF] dark:border-stone-800 flex items-center justify-between bg-[#F7F1E5] dark:bg-stone-900 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-stone-200/50 text-[#1F1B16] dark:text-stone-400 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="font-serif font-extrabold text-sm text-[#1F1B16] dark:text-amber-100">
              Biblioteca Offline & Interlinear
            </h3>
          </div>
          <button
            onClick={handleSyncAllOffline}
            disabled={isSyncing}
            title="Sincronizar dados online e offline"
            className="p-2 text-[#3E5641] dark:text-[#D4A24C] hover:bg-amber-100/30 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 text-xs font-bold"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-amber-600' : ''}`} />
            <span className="hidden sm:inline">Sincronizar</span>
          </button>
        </div>

        {syncStatus && (
          <div className="px-5 py-2 bg-amber-500/10 border-b border-amber-500/20 text-xs font-sans font-bold text-amber-800 dark:text-amber-200 flex items-center justify-between">
            <span>{syncStatus}</span>
          </div>
        )}

        {/* 2. Sub-Header Progress Bar & Download All Action */}
        <div className="p-4 bg-[#F7F1E5]/40 dark:bg-stone-950/20 border-b border-[#E7DECF] dark:border-stone-850 space-y-3 shrink-0">
          <div className="flex items-center justify-between text-xs font-sans font-bold text-[#5F5A52] dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-[#3E5641] dark:text-[#D4A24C]" />
              Armazenamento Local ({installedVersions.length} / {ALL_AVAILABLE_VERSION_CODES.length} Versões)
            </span>
            <span className="font-sans text-stone-600 dark:text-stone-300">
              {installedVersions.length * 48} MB
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#E7DECF] dark:bg-stone-800 overflow-hidden">
            <div 
              className="h-full bg-[#D4A24C] transition-all duration-500 rounded-full" 
              style={{ width: `${Math.round((installedVersions.length / ALL_AVAILABLE_VERSION_CODES.length) * 100)}%` }}
            />
          </div>

          {/* Download All Button */}
          {downloadingCode === 'ALL' ? (
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-sans font-extrabold text-amber-800 dark:text-amber-200">
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Baixando Todas as Versões...</span>
                </span>
                <span>{downloadProgress.pct}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div className="h-full bg-amber-600 transition-all duration-300 rounded-full" style={{ width: `${downloadProgress.pct}%` }} />
              </div>
              <p className="text-[10px] font-sans text-stone-500 dark:text-stone-400 truncate">
                {downloadProgress.text}
              </p>
            </div>
          ) : (
            <button
              onClick={handleDownloadAllAvailable}
              disabled={downloadingCode !== null}
              className="w-full py-2.5 px-3.5 rounded-xl bg-[#3E5641] hover:bg-[#324534] text-[#FFFDF8] font-sans font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Todas as Versões Bíblicas (100% Offline)</span>
            </button>
          )}
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

        {/* 4. Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
          {(activeSubTab === 'traducoes' ? traducoesList : originaisList).map((v: any) => {
            const isDownloaded = installedVersions.includes(v.code);
            const isDownloadingThis = downloadingCode === v.code;

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
                    
                    {isDownloadingThis ? (
                      <div className="space-y-1.5 pr-2">
                        <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                          <div className="h-full bg-[#D4A24C] transition-all duration-300 rounded-full" style={{ width: `${downloadProgress.pct}%` }} />
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-sans font-bold text-amber-700 dark:text-amber-300">
                          <span>{downloadProgress.pct}% baixado</span>
                          <span className="truncate max-w-[120px]">{downloadProgress.text}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] text-stone-400 font-sans block">
                        Tamanho aproximado: {v.size}
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
                  ) : isDownloadingThis ? (
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
        <div className="px-5 py-4 border-t border-[#E7DECF] dark:border-stone-800 bg-[#F7F1E5] dark:bg-stone-900 shrink-0 flex justify-between items-center">
          <span className="text-xs font-sans text-stone-500">
            Sincronização offline ativa
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#3E5641] text-[#FFFDF8] font-sans font-extrabold text-xs uppercase tracking-wider shadow-2xs hover:bg-[#324534] cursor-pointer"
          >
            Concluir
          </button>
        </div>

      </div>
    </div>
  );
};

