import React, { useState } from 'react';
import { AlertTriangle, Trash2, ShieldAlert, CheckCircle, RefreshCw, X } from 'lucide-react';
import { localDB } from '../utils/db';

interface ResetProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetComplete?: () => void;
}

export const ResetProgressModal: React.FC<ResetProgressModalProps> = ({
  isOpen,
  onClose,
  onResetComplete,
}) => {
  const [confirmationInput, setConfirmationInput] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [agreedToRisk, setAgreedToRisk] = useState(false);

  if (!isOpen) return null;

  const REQUIRED_WORD = 'ZERAR';
  const isInputValid = confirmationInput.trim().toUpperCase() === REQUIRED_WORD && agreedToRisk;

  const handleExecuteReset = async () => {
    if (!isInputValid) return;
    setIsResetting(true);

    try {
      await localDB.clearUserData();
      setResetDone(true);
      setTimeout(() => {
        if (onResetComplete) {
          onResetComplete();
        } else {
          window.location.reload();
        }
      }, 1500);
    } catch (err) {
      console.error('Erro ao zerar progresso:', err);
      alert('Ocorreu um erro ao zerar seu progresso. Tente novamente.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF8] dark:bg-[#1A1816] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative space-y-5 p-6">
        
        {/* Header with Close */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-extrabold text-lg text-[#1F1B16] dark:text-stone-100">
                Confirmação de Segurança
              </h3>
              <p className="text-[11px] font-sans text-stone-500 font-semibold uppercase tracking-wider">
                Ação Irreversível — Reset de Dados
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

        {resetDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#1F1B16] dark:text-stone-100">
              Progresso Zerado com Sucesso!
            </h4>
            <p className="text-xs font-sans text-stone-500">
              Reiniciando a aplicação para aplicar as alterações...
            </p>
          </div>
        ) : (
          <>
            {/* Warning Box */}
            <div className="p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-950/30 border border-rose-500/20 space-y-2">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-sans font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Atenção: Os dados listados abaixo serão apagados permanentemente:</span>
              </div>
              <ul className="text-xs font-serif text-stone-700 dark:text-stone-300 list-disc list-inside space-y-1 pl-1 leading-relaxed">
                <li>Progresso nos Planos de Leitura e Desafio 365</li>
                <li>Notas, anotações pessoais e destaques de versículos</li>
                <li>Favoritos e marcadores de leitura</li>
                <li>Planos de leitura personalizados criados por você</li>
              </ul>
            </div>

            {/* Checkbox Risk Agreement */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedToRisk}
                onChange={(e) => setAgreedToRisk(e.target.checked)}
                className="mt-0.5 rounded accent-rose-600 w-4 h-4"
              />
              <span className="text-xs font-sans font-semibold text-stone-700 dark:text-stone-300">
                Compreendo que todos os meus dados de leitura e estudo serão permanentemente apagados e não poderão ser recuperados.
              </span>
            </label>

            {/* Required Word Confirmation Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-extrabold text-stone-700 dark:text-stone-300 block">
                Para prosseguir, digite a palavra <span className="text-rose-600 font-mono font-bold">ZERAR</span> no campo abaixo:
              </label>
              <input
                type="text"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                placeholder="Digite ZERAR para confirmar"
                className="w-full px-4 py-2.5 bg-[#F7F1E5]/60 dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 rounded-xl font-mono font-bold text-sm text-[#1F1B16] dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 uppercase"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                disabled={isResetting}
                className="flex-1 py-3 rounded-xl border border-[#E7DECF] dark:border-stone-800 text-stone-600 dark:text-stone-300 font-sans font-bold text-xs uppercase tracking-wider hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer transition-all"
              >
                Cancelar
              </button>

              <button
                onClick={handleExecuteReset}
                disabled={!isInputValid || isResetting}
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-sans font-extrabold text-xs uppercase tracking-wider cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {isResetting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Zerando...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Zerar Progresso</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
