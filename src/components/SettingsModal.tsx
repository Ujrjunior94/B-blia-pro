import React, { useState } from 'react';
import { X, Settings, RotateCcw, ShieldAlert, Sliders, Type, Volume2, Moon, Download, Database } from 'lucide-react';
import { ReaderSettings } from '../types';
import { ResetProgressModal } from './ResetProgressModal';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF8] dark:bg-[#1A1816] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden relative p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7DECF] dark:border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3E5641]/10 text-[#3E5641] dark:text-[#D4A24C] flex items-center justify-center border border-[#3E5641]/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-extrabold text-lg text-[#1F1B16] dark:text-stone-100">
                Configurações da Jornada
              </h3>
              <p className="text-[11px] font-sans text-stone-500 font-semibold uppercase tracking-wider">
                Leitura, Tema & Dados
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
          
          {/* Versão Padrão */}
          <div className="p-4 rounded-2xl bg-[#F7F1E5]/50 dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 space-y-2">
            <label className="text-xs font-sans font-extrabold text-[#1F1B16] dark:text-stone-200 block uppercase tracking-wider">
              Versão Principal da Bíblia
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'ARC', label: 'Almeida Revista (ARC)' },
                { id: 'NVI', label: 'Nova Versão Int. (NVI)' },
                { id: 'INTERLINEAR', label: 'Interlinear (Original)' },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSettings((prev) => ({ ...prev, version: v.id as any }))}
                  className={`p-2.5 rounded-xl font-serif text-xs font-bold transition-all cursor-pointer border ${
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

          {/* Gerenciamento de Dados Offline */}
          {onOpenOfflineManager && (
            <div className="p-4 rounded-2xl bg-[#F7F1E5]/50 dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-sans font-extrabold text-[#1F1B16] dark:text-stone-200 block">
                  Gerenciador Offline de Bíblias
                </span>
                <span className="text-[11px] font-serif italic text-stone-500">
                  Baixe textos completos para ler sem conexão com a internet.
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenOfflineManager();
                }}
                className="px-3.5 py-2 rounded-xl bg-[#3E5641] text-white font-sans font-bold text-xs hover:bg-[#3E5641]/90 cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Gerenciar</span>
              </button>
            </div>
          )}

          {/* SEÇÃO DE RESET DE PROGRESSO COM CONFIRMAÇÃO DE SEGURANÇA (USER REQUEST) */}
          <div className="p-5 rounded-2xl bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/30 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-extrabold text-sm text-[#1F1B16] dark:text-stone-100">
                  Zerar Progresso & Resetar Dados
                </h4>
                <p className="text-xs font-serif italic text-stone-600 dark:text-stone-300 leading-relaxed mt-0.5">
                  Apaga todas as marcações, anotações, planos de leitura e histórico para iniciar uma nova jornada do zero.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsResetModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-sans font-extrabold text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Zerar Todo o Progresso</span>
            </button>
          </div>

        </div>

        {/* Security Reset Modal */}
        <ResetProgressModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
        />

      </div>
    </div>
  );
};
