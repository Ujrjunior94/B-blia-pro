import React, { useState } from 'react';
import { X, Download, Copy, Share2, Check } from 'lucide-react';
import { Verse } from '../types';

interface VerseShareModalProps {
  verse: Verse;
  bookName: string;
  version: string;
  onClose: () => void;
}

export const VerseShareModal: React.FC<VerseShareModalProps> = ({ verse, bookName, version, onClose }) => {
  const [cardTheme, setCardTheme] = useState<'parchment' | 'night' | 'grace' | 'gold'>('parchment');
  const [copied, setCopied] = useState(false);

  const referenceText = `${bookName} ${verse.chapter}:${verse.verse}`;

  const handleCopyText = () => {
    const textToShare = `"${verse.text}"\n— ${referenceText} (${version})\n\nCompartilhado via Jornada da Bíblia App`;
    navigator.clipboard.writeText(textToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCardClasses = () => {
    switch (cardTheme) {
      case 'parchment':
        return 'bg-amber-100 text-amber-950 border-amber-300';
      case 'night':
        return 'bg-stone-900 text-stone-100 border-stone-700';
      case 'grace':
        return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-stone-950 text-indigo-50 border-indigo-700';
      case 'gold':
        return 'bg-gradient-to-br from-amber-800 via-amber-900 to-stone-950 text-amber-50 border-amber-600';
      default:
        return 'bg-amber-100 text-amber-950 border-amber-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 border border-amber-900/20 dark:border-stone-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
            Compartilhar Card do Versículo
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Preview Stage */}
        <div className="p-6 flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-950">
          <div
            className={`w-full p-8 rounded-3xl border-2 shadow-2xl space-y-6 flex flex-col justify-between transition-all min-h-[260px] ${getCardClasses()}`}
          >
            <div className="text-3xl font-serif leading-none opacity-40">“</div>
            <p className="font-serif text-lg md:text-xl leading-relaxed italic font-medium px-2">
              {verse.text}
            </p>
            <div className="border-t border-current/20 pt-4 flex items-center justify-between text-xs font-serif font-semibold">
              <span className="tracking-wide uppercase">{referenceText}</span>
              <span className="opacity-70 font-sans text-[10px]">{version} • Jornada da Bíblia</span>
            </div>
          </div>
        </div>

        {/* Theme Picker & Share Controls */}
        <div className="p-5 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">Escolha o Estudo Visual:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCardTheme('parchment')}
                className={`w-6 h-6 rounded-full bg-amber-200 border-2 ${cardTheme === 'parchment' ? 'border-amber-700 ring-2 ring-amber-400' : 'border-amber-300'}`}
                title="Pergaminho"
              />
              <button
                onClick={() => setCardTheme('night')}
                className={`w-6 h-6 rounded-full bg-stone-800 border-2 ${cardTheme === 'night' ? 'border-amber-400 ring-2 ring-amber-400' : 'border-stone-600'}`}
                title="Noite"
              />
              <button
                onClick={() => setCardTheme('grace')}
                className={`w-6 h-6 rounded-full bg-indigo-900 border-2 ${cardTheme === 'grace' ? 'border-indigo-400 ring-2 ring-indigo-400' : 'border-indigo-700'}`}
                title="Graça Celestial"
              />
              <button
                onClick={() => setCardTheme('gold')}
                className={`w-6 h-6 rounded-full bg-amber-900 border-2 ${cardTheme === 'gold' ? 'border-amber-400 ring-2 ring-amber-400' : 'border-amber-700'}`}
                title="Ouro Real"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyText}
              className="flex-1 py-2.5 rounded-xl bg-amber-800 dark:bg-amber-600 text-amber-50 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-amber-900 transition-colors shadow"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado para a Área de Transferência!' : 'Copiar Texto Completo'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
