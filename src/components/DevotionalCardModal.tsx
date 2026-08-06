import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Download, Share2, Copy, Check, RefreshCw, Image as ImageIcon, Heart, Layers } from 'lucide-react';

interface DevotionalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  verseText: string;
  bookName: string;
  chapter: number;
  verseNum: number;
  versionCode?: string;
}

const CARD_STYLES = [
  { id: 'Amanhecer Espiritual', name: 'Amanhecer', icon: '🌅', desc: 'Luz dourada da manhã e esperança' },
  { id: 'Aquarela Sacra', name: 'Aquarela', icon: '🎨', desc: 'Tons suaves e artísticos de aquarela' },
  { id: 'Pintura Clássica a Óleo', name: 'Clássico Óleo', icon: '🖼️', desc: 'Estilo renascentista e sacro' },
  { id: 'Céu Estrelado e Galáxia', name: 'Céu Estrelado', icon: '🌌', desc: 'A vastidão dos céus e a glória divina' },
  { id: 'Natureza Mística e Montanhas', name: 'Montanhas', icon: '🏔️', desc: 'Paz das montanhas e criação' },
  { id: 'Minimalista Dourado', name: 'Minimalista', icon: '✨', desc: 'Fundo escuro com detalhes em ouro' },
];

export const DevotionalCardModal: React.FC<DevotionalCardModalProps> = ({
  isOpen,
  onClose,
  verseText,
  bookName,
  chapter,
  verseNum,
  versionCode = 'NVI',
}) => {
  const [selectedStyle, setSelectedStyle] = useState('Amanhecer Espiritual');
  const [aspectFormat, setAspectFormat] = useState<'story' | 'square'>('story'); // 'story' (9:16) or 'square' (1:1)
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState<{
    imageUrl: string;
    title: string;
    reflection: string;
    usedRealGenerator: boolean;
  } | null>(null);

  const [copiedText, setCopiedText] = useState(false);
  const [downloadingImg, setDownloadingImg] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

  const generateCard = async (styleName: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/theology/generate-verse-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verseText,
          bookName,
          chapter,
          verseNum,
          style: styleName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCardData({
          imageUrl: data.imageUrl,
          title: data.title,
          reflection: data.reflection,
          usedRealGenerator: data.usedRealGenerator,
        });
      } else {
        setErrorMessage(data.error || 'Não foi possível gerar a arte no momento.');
      }
    } catch (err: any) {
      console.error('Error generating card:', err);
      setErrorMessage('Erro de conexão com a IA. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      generateCard(selectedStyle);
    } else {
      setCardData(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStyleChange = (styleId: string) => {
    setSelectedStyle(styleId);
    generateCard(styleId);
  };

  const formattedRef = `${bookName} ${chapter}:${verseNum} (${versionCode})`;

  const handleCopyCaption = () => {
    const caption = `"${verseText}"\n— ${formattedRef}\n\n💡 Devocional: ${cardData?.reflection || ''}\n\n📖 App Jornada da Bíblia`;
    navigator.clipboard.writeText(caption);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  // Render high-res PNG to hidden canvas and trigger browser download
  const handleDownloadImage = async () => {
    if (!cardData?.imageUrl) return;
    setDownloadingImg(true);

    try {
      const canvas = hiddenCanvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = aspectFormat === 'story' ? 1080 : 1080;
      const height = aspectFormat === 'story' ? 1920 : 1080;

      canvas.width = width;
      canvas.height = height;

      // Load background image
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        bgImg.onload = resolve;
        bgImg.onerror = reject;
        bgImg.src = cardData.imageUrl;
      });

      // Draw background image scaled nicely
      ctx.drawImage(bgImg, 0, 0, width, height);

      // Draw dark vignette / gradient overlay for text readability
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw ornamental top border / badge
      ctx.fillStyle = '#D4A24C';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('JORNADA DA BÍBLIA • CARD DEVOCIONAL', width / 2, aspectFormat === 'story' ? 140 : 100);

      // Draw Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px serif';
      ctx.fillText(cardData.title.toUpperCase(), width / 2, aspectFormat === 'story' ? 210 : 160);

      // Wrap and draw Verse Text
      ctx.fillStyle = '#FFFDF8';
      ctx.font = 'italic 44px Georgia, serif';
      ctx.textAlign = 'center';

      const paddingHorizontal = 100;
      const maxLineWidth = width - paddingHorizontal * 2;
      const words = verseText.split(' ');
      let currentLine = '';
      const lines: string[] = [];

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxLineWidth && i > 0) {
          lines.push(currentLine.trim());
          currentLine = words[i] + ' ';
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine.trim());

      const lineHeight = 62;
      const startY = (height / 2) - ((lines.length * lineHeight) / 2) - 20;

      lines.forEach((line, idx) => {
        ctx.fillText(`"${line}"`, width / 2, startY + (idx * lineHeight));
      });

      // Draw Verse Reference
      const refY = startY + (lines.length * lineHeight) + 60;
      ctx.fillStyle = '#D4A24C';
      ctx.font = 'bold 34px sans-serif';
      ctx.fillText(`— ${formattedRef}`, width / 2, refY);

      // Draw Devotional Reflection
      if (cardData.reflection) {
        ctx.fillStyle = '#E2D8C6';
        ctx.font = '26px sans-serif';

        const refWords = cardData.reflection.split(' ');
        let refLine = '';
        const refLines: string[] = [];
        for (let w = 0; w < refWords.length; w++) {
          const testRefLine = refLine + refWords[w] + ' ';
          if (ctx.measureText(testRefLine).width > maxLineWidth && w > 0) {
            refLines.push(refLine.trim());
            refLine = refWords[w] + ' ';
          } else {
            refLine = testRefLine;
          }
        }
        refLines.push(refLine.trim());

        refLines.slice(0, 3).forEach((rLine, idx) => {
          ctx.fillText(rLine, width / 2, refY + 80 + (idx * 36));
        });
      }

      // Footer branding
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '22px sans-serif';
      ctx.fillText('Gerado por IA no App Jornada da Bíblia', width / 2, height - 60);

      // Convert canvas to image download link
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Devocional-${bookName}-${chapter}-${verseNum}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Error downloading image:', e);
      alert('Erro ao gerar imagem para download. Tente tirar uma captura de tela do card.');
    } finally {
      setDownloadingImg(false);
    }
  };

  const handleShareMobile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Devocional: ${bookName} ${chapter}:${verseNum}`,
          text: `"${verseText}"\n— ${formattedRef}\n\n${cardData?.reflection || ''}`,
          url: window.location.href,
        });
      } catch (_) {}
    } else {
      handleCopyCaption();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-5 my-auto max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 text-[#D4A24C]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-extrabold text-base sm:text-lg text-[#1F1B16] dark:text-stone-100 flex items-center gap-2">
                Card Devocional com IA
              </h3>
              <p className="text-[11px] font-sans text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider">
                {bookName} {chapter}:{verseNum} • Redes Sociais
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Style & Format Selector */}
        <div className="space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#D4A24C]" />
              Estilo Artístico de IA
            </span>
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-900 p-1 rounded-xl border border-stone-200 dark:border-stone-800 text-[10px] font-sans font-extrabold">
              <button
                onClick={() => setAspectFormat('story')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  aspectFormat === 'story'
                    ? 'bg-[#3E5641] text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                Story 9:16
              </button>
              <button
                onClick={() => setAspectFormat('square')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  aspectFormat === 'square'
                    ? 'bg-[#3E5641] text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                Post 1:1
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {CARD_STYLES.map((st) => (
              <button
                key={st.id}
                onClick={() => handleStyleChange(st.id)}
                disabled={isLoading}
                className={`flex flex-col items-center p-2 rounded-2xl text-center border transition-all cursor-pointer ${
                  selectedStyle === st.id
                    ? 'bg-amber-500/10 border-[#D4A24C] ring-2 ring-[#D4A24C]/50 dark:bg-amber-500/20'
                    : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <span className="text-lg mb-1">{st.icon}</span>
                <span className="text-[10px] font-sans font-bold text-stone-800 dark:text-stone-200 line-clamp-1">
                  {st.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Card Interactive Preview Stage */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 min-h-[300px]">
          {isLoading ? (
            <div className="w-full h-80 rounded-3xl bg-stone-900 flex flex-col items-center justify-center p-6 text-center text-stone-200 space-y-4 animate-pulse relative overflow-hidden border border-amber-500/30">
              <RefreshCw className="w-10 h-10 text-[#D4A24C] animate-spin" />
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base text-amber-200">
                  Gerando Ilustração de Fundo com IA...
                </h4>
                <p className="text-xs text-stone-400 max-w-sm">
                  Criando composição visual para "{verseText.substring(0, 60)}..."
                </p>
              </div>
            </div>
          ) : errorMessage ? (
            <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-center space-y-3">
              <p className="text-sm font-sans text-rose-600 dark:text-rose-400 font-bold">{errorMessage}</p>
              <button
                onClick={() => generateCard(selectedStyle)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs cursor-pointer"
              >
                Tentar Novamente
              </button>
            </div>
          ) : cardData ? (
            <div className="space-y-4">
              {/* Visual Card Canvas View */}
              <div
                ref={cardContainerRef}
                className={`mx-auto rounded-3xl overflow-hidden relative shadow-2xl border border-stone-800/40 text-white flex flex-col justify-between p-6 sm:p-8 transition-all ${
                  aspectFormat === 'story' ? 'max-w-xs h-[480px]' : 'max-w-sm h-[360px]'
                }`}
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.88) 100%), url(${cardData.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Card Top Header */}
                <div className="text-center space-y-1">
                  <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-[#D4A24C] bg-black/40 backdrop-blur-md px-3 py-1 rounded-full inline-block border border-amber-500/30">
                    JORNADA DA BÍBLIA
                  </span>
                  <h4 className="font-serif font-extrabold text-sm sm:text-base text-stone-100 drop-shadow-md">
                    {cardData.title}
                  </h4>
                </div>

                {/* Card Main Verse Text */}
                <div className="my-auto text-center space-y-3">
                  <p className="font-serif italic text-sm sm:text-base text-stone-50 leading-relaxed drop-shadow-lg px-2">
                    "{verseText}"
                  </p>
                  <p className="font-sans font-extrabold text-xs sm:text-sm text-[#D4A24C] tracking-wide">
                    — {formattedRef}
                  </p>
                </div>

                {/* Card Bottom Reflection */}
                <div className="text-center pt-2 border-t border-white/15 space-y-1">
                  <p className="font-sans text-[11px] text-stone-300 italic line-clamp-2">
                    {cardData.reflection}
                  </p>
                  <p className="text-[9px] font-sans text-stone-400 uppercase tracking-widest font-bold">
                    Devocional Diário • IA
                  </p>
                </div>
              </div>

              {/* Devotional Caption Summary Box */}
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    Legenda para Redes Sociais
                  </span>
                  <button
                    onClick={handleCopyCaption}
                    className="text-[11px] font-sans font-extrabold text-[#3E5641] dark:text-[#D4A24C] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'Copiado!' : 'Copiar Legenda'}</span>
                  </button>
                </div>
                <p className="text-xs font-sans text-stone-600 dark:text-stone-400 italic leading-relaxed">
                  "{verseText}" — {formattedRef}
                  <br />
                  💡 <span className="not-italic">{cardData.reflection}</span>
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Hidden Canvas element for generating PNG downloads */}
        <canvas ref={hiddenCanvasRef} className="hidden" />

        {/* Bottom Actions Bar */}
        <div className="border-t border-stone-200 dark:border-stone-800 pt-3 shrink-0 flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={handleDownloadImage}
            disabled={isLoading || !cardData || downloadingImg}
            className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-[#3E5641] hover:bg-[#324534] text-[#FFFDF8] font-sans font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {downloadingImg ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{downloadingImg ? 'Gerando PNG HD...' : 'Baixar Imagem PNG (HD)'}</span>
          </button>

          <button
            onClick={handleShareMobile}
            disabled={isLoading || !cardData}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-200 font-sans font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-500/30 disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar</span>
          </button>
        </div>

      </div>
    </div>
  );
};
