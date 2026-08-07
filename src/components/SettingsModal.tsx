import React, { useState, useRef } from 'react';
import { X, Settings, RotateCcw, ShieldAlert, Sliders, Type, Volume2, Moon, Download, Database, Activity, Upload, FileDown, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { ReaderSettings } from '../types';
import { ResetProgressModal } from './ResetProgressModal';
import { ErrorLogsModal } from './ErrorLogsModal';
import { localDB } from '../utils/db';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  setSettings: React.Dispatch<React.SetStateAction<ReaderSettings>>;
  onOpenOfflineManager?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  setSettings,
  onOpenOfflineManager,
}) => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [showConfirmCounters, setShowConfirmCounters] = useState(false);
  const [showConfirmNotes, setShowConfirmNotes] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Backup Export
  const handleExportBackup = async () => {
    try {
      const backupJson = await localDB.exportBackup();
      const blob = new Blob([backupJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jornada_biblia_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setFeedbackMsg({ type: 'success', text: 'Backup exportado com sucesso!' });
    } catch (err) {
      console.error('Error exporting backup:', err);
      setFeedbackMsg({ type: 'error', text: 'Erro ao exportar backup de dados.' });
    }
  };

  // Handle Backup Import
  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setFeedbackMsg(null);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const content = evt.target?.result as string;
        const res = await localDB.importBackup(content);
        setFeedbackMsg({
          type: 'success',
          text: `Backup importado com sucesso! (${res.notesCount} notas, ${res.highlightsCount} destaques, ${res.bookmarksCount} marcadores)`,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      } catch (err: any) {
        setFeedbackMsg({
          type: 'error',
          text: err.message || 'Erro ao importar arquivo JSON de backup.',
        });
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  // Reset Reading Counters
  const handleResetCounters = () => {
    localDB.resetReadingCounters();
    setFeedbackMsg({ type: 'success', text: 'Contadores de leitura zerados com sucesso! Recarregando...' });
    setTimeout(() => window.location.reload(), 1200);
  };

  // Reset Notes & Highlights
  const handleResetNotes = async () => {
    await localDB.resetNotesAndHighlights();
    setFeedbackMsg({ type: 'success', text: 'Anotações e destaques removidos com sucesso! Recarregando...' });
    setTimeout(() => window.location.reload(), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#FFFDF8] dark:bg-[#1A1816] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden relative p-5 sm:p-6 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7DECF] dark:border-stone-800 pb-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#3E5641]/10 text-[#3E5641] dark:text-[#D4A24C] flex items-center justify-center border border-[#3E5641]/20 shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif font-extrabold text-base sm:text-lg text-[#1F1B16] dark:text-stone-100 truncate">
                Configurações da Jornada
              </h3>
              <p className="text-[10px] sm:text-[11px] font-sans text-stone-500 font-semibold uppercase tracking-wider truncate">
                Leitura, Backup & Reset de Dados
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 cursor-pointer transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Message */}
        {feedbackMsg && (
          <div
            className={`p-3 rounded-2xl border text-xs font-sans font-medium flex items-center gap-2 animate-fade-in break-words ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400'
            }`}
          >
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span className="flex-1 min-w-0">{feedbackMsg.text}</span>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
          
          {/* Identidade Visual / Temas Exclusivos */}
          <div className="p-4 rounded-2xl bg-theme-app border border-theme space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
              <label className="text-xs font-sans font-extrabold text-theme-primary block uppercase tracking-wider min-w-0 truncate">
                Tema & Identidade Visual
              </label>
              <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-theme-accent/15 text-theme-accent border border-theme-accent/30 shrink-0">
                Design System Scriptorium
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'parchment', name: 'Pergaminho Moderno', icon: '📜', desc: 'Marfim, marrom grafite e dourado', bg: 'bg-[#F9F6EE]', text: 'text-[#2C2523]', accent: 'bg-[#C5A059]' },
                { id: 'dark', name: 'Noite de Estudo', icon: '🌙', desc: 'Azul profundo e leitura noturna', bg: 'bg-[#0B132B]', text: 'text-[#F8FAFC]', accent: 'bg-[#E2C044]' },
                { id: 'oliveira', name: 'Oliveira', icon: '🌿', desc: 'Verdes suaves e paz acolhedora', bg: 'bg-[#F2F7F2]', text: 'text-[#1F3323]', accent: 'bg-[#2D5A27]' },
                { id: 'templo', name: 'Templo', icon: '🏛️', desc: 'Minimalista em pedra clara', bg: 'bg-[#F0F2F5]', text: 'text-[#1F2937]', accent: 'bg-[#C5A059]' },
              ].map((th) => {
                const isActive = settings.theme === th.id;
                return (
                  <button
                    key={th.id}
                    onClick={() => setSettings((prev) => ({ ...prev, theme: th.id as any }))}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden ${
                      isActive
                        ? 'border-theme-accent ring-2 ring-theme-accent/40 bg-theme-card'
                        : 'border-theme bg-theme-card/60 hover:border-theme-accent/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl ${th.bg} ${th.text} flex items-center justify-center text-sm shadow-2xs border border-black/10 shrink-0`}>
                      {th.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-extrabold text-xs text-theme-primary truncate">
                          {th.name}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${th.accent} shrink-0`} />
                      </div>
                      <span className="block text-[10px] font-sans text-theme-muted truncate mt-0.5">
                        {th.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Versão Padrão */}
          <div className="p-4 rounded-2xl bg-[#F7F1E5]/50 dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 space-y-2">
            <label className="text-xs font-sans font-extrabold text-[#1F1B16] dark:text-stone-200 block uppercase tracking-wider">
              Versão Principal da Bíblia
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'ARC', label: 'Almeida Revista (ARC)' },
                { id: 'NVI', label: 'Nova Versão Int. (NVI)' },
                { id: 'INTERLINEAR', label: 'Interlinear (Original)' },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSettings((prev) => ({ ...prev, version: v.id as any }))}
                  className={`p-2.5 rounded-xl font-serif text-xs font-bold transition-all cursor-pointer border text-center truncate ${
                    settings.version === v.id
                      ? 'bg-[#3E5641] text-white border-[#3E5641] shadow-2xs'
                      : 'bg-[#FFFDF8] dark:bg-stone-850 text-stone-700 dark:text-stone-300 border-[#E7DECF] hover:border-[#3E5641]'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tamanho e Fonte */}
          <div className="p-4 rounded-2xl bg-[#F7F1E5]/50 dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-extrabold text-[#1F1B16] dark:text-stone-200 uppercase tracking-wider">
                Tamanho da Fonte de Leitura
              </span>
              <span className="font-mono font-bold text-xs text-[#3E5641] dark:text-[#D4A24C]">
                {settings.fontSize}px
              </span>
            </div>
            <input
              type="range"
              min="14"
              max="28"
              value={settings.fontSize}
              onChange={(e) => setSettings((prev) => ({ ...prev, fontSize: Number(e.target.value) }))}
              className="w-full accent-[#3E5641]"
            />
          </div>

          {/* IMPORTAÇÃO E EXPORTAÇÃO DE BACKUP */}
          <div className="p-4 rounded-2xl bg-[#3E5641]/5 border border-[#3E5641]/20 space-y-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#3E5641] dark:text-[#D4A24C] shrink-0" />
              <h4 className="font-serif font-extrabold text-sm text-[#1F1B16] dark:text-stone-100">
                Importação & Backup de Dados
              </h4>
            </div>
            <p className="text-xs font-serif italic text-stone-600 dark:text-stone-300 leading-relaxed">
              Exporte um arquivo de segurança (.json) com todas as suas anotações, destaques e marcadores ou importe um backup prévio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleExportBackup}
                className="py-2.5 px-3 rounded-xl bg-[#3E5641] hover:bg-[#3E5641]/90 text-white font-sans font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <FileDown className="w-4 h-4 shrink-0" />
                <span className="truncate">Exportar Backup</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                className="py-2.5 px-3 rounded-xl bg-theme-app hover:bg-theme-card-hover border border-theme text-theme-primary font-sans font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isImporting ? (
                  <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                ) : (
                  <Upload className="w-4 h-4 text-[#D4A24C] shrink-0" />
                )}
                <span className="truncate">Importar JSON</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </div>
          </div>

          {/* RESET DE CONTADORES E DADOS ESPECÍFICOS */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
              <h4 className="font-serif font-extrabold text-sm text-[#1F1B16] dark:text-stone-100">
                Resetar Contadores & Estatísticas
              </h4>
            </div>
            <p className="text-xs font-serif italic text-stone-600 dark:text-stone-300 leading-relaxed">
              Zere apenas seus contadores de dias seguidos, progresso do Desafio 365 e planos sem apagar suas anotações.
            </p>

            <div className="space-y-2">
              {showConfirmCounters ? (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/35 text-xs font-sans space-y-2 animate-fade-in">
                  <p className="font-extrabold text-amber-800 dark:text-amber-400">Deseja realmente zerar todos os contadores de leitura?</p>
                  <p className="text-stone-600 dark:text-stone-300">Isso apagará dias seguidos, progresso do Desafio 365 e progresso dos planos de leitura.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetCounters}
                      className="py-1.5 px-3 rounded-lg bg-amber-600 text-white font-sans font-extrabold cursor-pointer hover:bg-amber-700 transition-colors"
                    >
                      Sim, zerar
                    </button>
                    <button
                      onClick={() => setShowConfirmCounters(false)}
                      className="py-1.5 px-3 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-sans font-bold cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : showConfirmNotes ? (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/35 text-xs font-sans space-y-2 animate-fade-in">
                  <p className="font-extrabold text-amber-800 dark:text-amber-400">Deseja realmente apagar todas as suas anotações e marcadores?</p>
                  <p className="text-stone-600 dark:text-stone-300">Essa ação removerá de forma permanente todos os seus destaques, notas e favoritos locais.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetNotes}
                      className="py-1.5 px-3 rounded-lg bg-amber-600 text-white font-sans font-extrabold cursor-pointer hover:bg-amber-700 transition-colors"
                    >
                      Sim, apagar
                    </button>
                    <button
                      onClick={() => setShowConfirmNotes(false)}
                      className="py-1.5 px-3 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-sans font-bold cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowConfirmCounters(true)}
                    className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-sans font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Zerar Contadores</span>
                  </button>

                  <button
                    onClick={() => setShowConfirmNotes(true)}
                    className="py-2.5 px-3 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-sans font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Zerar Anotações</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Diagnóstico & Monitoramento de Erros */}
          <div className="p-4 rounded-2xl bg-[#F7F1E5]/50 dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 flex items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <span className="text-xs font-sans font-extrabold text-[#1F1B16] dark:text-stone-200 block truncate">
                Central de Diagnóstico & Firebase
              </span>
              <span className="text-[11px] font-serif italic text-stone-500 block truncate">
                Inspecione logs de sincronização e rede.
              </span>
            </div>
            <button
              onClick={() => setIsLogsModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-sans font-bold text-xs cursor-pointer transition-all flex items-center gap-1.5 shrink-0 shadow-2xs"
            >
              <Activity className="w-3.5 h-3.5 shrink-0" />
              <span>Ver Logs</span>
            </button>
          </div>

          {/* Gerenciamento de Dados Offline */}
          {onOpenOfflineManager && (
            <div className="p-4 rounded-2xl bg-[#F7F1E5]/50 dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <span className="text-xs font-sans font-extrabold text-[#1F1B16] dark:text-stone-200 block truncate">
                  Gerenciador Offline de Bíblias
                </span>
                <span className="text-[11px] font-serif italic text-stone-500 block truncate">
                  Baixe textos completos sem internet.
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenOfflineManager();
                }}
                className="px-3.5 py-2 rounded-xl bg-[#3E5641] text-white font-sans font-bold text-xs hover:bg-[#3E5641]/90 cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span>Gerenciar</span>
              </button>
            </div>
          )}

          {/* SEÇÃO DE RESET DE PROGRESSO COM CONFIRMAÇÃO DE SEGURANÇA */}
          <div className="p-5 rounded-2xl bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/30 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-extrabold text-sm text-[#1F1B16] dark:text-stone-100 truncate">
                  Zerar Todo o Progresso
                </h4>
                <p className="text-xs font-serif italic text-stone-600 dark:text-stone-300 leading-relaxed mt-0.5">
                  Apaga absolutamente todos os dados salvos para iniciar uma nova jornada totalmente limpa.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsResetModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-sans font-extrabold text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Zerar Todo o Progresso do Zero</span>
            </button>
          </div>

        </div>

        {/* Security Reset Modal */}
        <ResetProgressModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
        />

        {/* Error Logs & Diagnostic Modal */}
        <ErrorLogsModal
          isOpen={isLogsModalOpen}
          onClose={() => setIsLogsModalOpen(false)}
        />

      </div>
    </div>
  );
};

