import React from 'react';
import { ImageIcon, Sparkles, Wand2 } from 'lucide-react';

interface ImageSkeletonProps {
  aspectRatio?: '16:9' | '1:1' | '9:16' | '4:3' | string;
  title?: string;
  subtitle?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  aspectRatio = '16:9',
  title = 'Gerando ilustração com IA...',
  subtitle = 'Compondo a cena bíblica com exegese teológica e renderização em alta definição.'
}) => {
  let aspectClass = 'aspect-[16/9]';
  if (aspectRatio === '1:1') aspectClass = 'aspect-square';
  if (aspectRatio === '9:16') aspectClass = 'aspect-[9/16]';
  if (aspectRatio === '4:3') aspectClass = 'aspect-[4/3]';

  return (
    <div
      className={`w-full ${aspectClass} max-h-[480px] rounded-2xl relative overflow-hidden skeleton-shimmer border border-[#E7DECF] dark:border-stone-700/80 shadow-inner flex flex-col items-center justify-center p-6 contain-layout`}
    >
      {/* Decorative ambient glow */}
      <div className="absolute w-36 h-36 bg-[#D4A24C]/20 dark:bg-[#D4A24C]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Center Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-3 bg-white/70 dark:bg-stone-900/80 backdrop-blur-md px-6 py-5 rounded-2xl border border-[#D4A24C]/30 shadow-lg max-w-sm w-full">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-[#3E5641] text-[#FFFDF8] flex items-center justify-center shadow-md">
            <ImageIcon className="w-6 h-6 text-[#D4A24C] animate-pulse" />
          </div>
          <div className="absolute -top-1 -right-1 p-1 bg-[#D4A24C] rounded-full text-[#1F1B16] shadow-sm animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-serif font-bold text-sm text-[#3E5641] dark:text-[#D4A24C] flex items-center justify-center gap-1.5">
            <Wand2 className="w-4 h-4 animate-spin text-[#D4A24C]" />
            <span>{title}</span>
          </p>
          <p className="text-[11px] text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden mt-1">
          <div className="h-full bg-gradient-to-r from-[#3E5641] via-[#D4A24C] to-[#3E5641] rounded-full animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
};
