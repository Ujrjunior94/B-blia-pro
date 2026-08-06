import React, { useState, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Heart,
  RefreshCw,
  Download,
  Share2,
  Bookmark,
  Image as ImageIcon,
  FileText,
  ListCheck,
  Copy,
  Check,
  Flame,
  Star,
  Trash2,
  Compass,
  Layers,
  Map,
  History,
  BookOpen,
  Calendar,
  AlertCircle,
  Clock,
  Sparkle
} from 'lucide-react';

import {
  sendAiChatMessage,
  generateAiStudy,
  generateAiDevotional,
  generateAiReadingPlan,
  generateAiImage,
  PROMPT_LIBRARY,
  PromptTemplate,
  getPromptsByCategory,
  saveAiStudy,
  addAiFavorite,
  removeAiFavorite,
  getUserAiFavorites,
  getUserSavedStudies,
  saveUserAiPreferences,
  getUserAiPreferences,
  UserAiPreferences,
  StudyResponse,
  DevotionalResponse,
  PlanResponse,
  ImageResponse,
  ChatMessage
} from '../services/ai';

import { ImageSkeleton } from './ImageSkeleton';
import { auth } from '../services/firebase';

interface AiTheologyAssistantProps {
  onOpenOffline?: () => void;
  onPlanCreated?: (planData: any) => void;
}

type AiSubTab = 'chat' | 'study' | 'devotional' | 'plans' | 'images' | 'prompts' | 'favorites';

export const AiTheologyAssistant: React.FC<AiTheologyAssistantProps> = ({ onOpenOffline, onPlanCreated }) => {
  const [activeSubTab, setActiveSubTab] = useState<AiSubTab>('chat');

  // User Preferences State
  const [userPrefs, setUserPrefs] = useState<UserAiPreferences>({
    userLevel: 'Intermediário',
    studyDuration: '15 min',
    preferredTranslation: 'Almeida',
  });

  useEffect(() => {
    getUserAiPreferences().then(setUserPrefs);
  }, []);

  // Shared Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // =========================================================================
  // SUB-TAB 1: ASSISTENTE BÍBLICO (CHAT)
  // =========================================================================
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Paz do Senhor! Eu sou a **Plataforma de IA do Bíblia-Pro**. Estou aqui para lhe auxiliar em exegese bíblica, dúvidas doutrinárias, contexto histórico, devocionais e planos de leitura. Como posso te edificar hoje?',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleSendChatMessage = async (overrideText?: string) => {
    const textToSend = overrideText || chatInput;
    if (!textToSend.trim() || chatLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!overrideText) setChatInput('');
    setChatLoading(true);

    try {
      const responseMsg = await sendAiChatMessage({
        message: textToSend,
        history: chatMessages,
      });
      setChatMessages((prev) => [...prev, responseMsg]);
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: `⚠️ Ops! Não foi possível obter resposta no momento. Detalhes: ${err.message || 'Verifique sua conexão.'}`,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // =========================================================================
  // SUB-TAB 2: GERADOR DE ESTUDOS
  // =========================================================================
  const [studyTopic, setStudyTopic] = useState('A Graca Transformadora de Deus');
  const [studyBook, setStudyBook] = useState('Romanos');
  const [studyChapter, setStudyChapter] = useState('5');
  const [studyVerses, setStudyVerses] = useState('1-11');
  const [studyLevel, setStudyLevel] = useState<'Iniciante' | 'Intermediário' | 'Avançado' | 'Líder'>('Intermediário');
  const [studyDuration, setStudyDuration] = useState('15 min');
  const [studyObjective, setStudyObjective] = useState('Entender como a justificação pela fé gera paz e esperança.');

  const [studyResult, setStudyResult] = useState<StudyResponse | null>(null);
  const [studyLoading, setStudyLoading] = useState(false);

  const handleGenerateStudy = async (forceRefresh = false) => {
    if (!studyTopic.trim() && !studyBook.trim()) {
      showToast('Por favor, preencha o tema ou o livro para o estudo.');
      return;
    }

    setStudyLoading(true);
    try {
      const res = await generateAiStudy(
        {
          tema: studyTopic,
          livro: studyBook,
          capitulo: studyChapter ? parseInt(studyChapter) : undefined,
          versiculos: studyVerses,
          duracao: studyDuration,
          nivelUsuario: studyLevel,
          objetivoEstudo: studyObjective,
        },
        forceRefresh
      );
      setStudyResult(res);
      showToast('Estudo bíblico gerado com sucesso!');
    } catch (err: any) {
      showToast(`Erro ao gerar estudo: ${err.message}`);
    } finally {
      setStudyLoading(false);
    }
  };

  // =========================================================================
  // SUB-TAB 3: DEVOCIONAL INTELIGENTE
  // =========================================================================
  const [devotionalTopic, setDevotionalTopic] = useState('Renovação Espiritual e Gratidão');
  const [devotionalTime, setDevotionalTime] = useState('10 min');
  const [devotionalResult, setDevotionalResult] = useState<DevotionalResponse | null>(null);
  const [devotionalLoading, setDevotionalLoading] = useState(false);

  const handleGenerateDevotional = async (forceRefresh = false) => {
    setDevotionalLoading(true);
    try {
      const res = await generateAiDevotional(
        {
          temaOuEmocao: devotionalTopic,
          tempoDisponivel: devotionalTime,
          historicoUsuario: `Nível ${userPrefs.userLevel || 'Intermediário'}`,
        },
        forceRefresh
      );
      setDevotionalResult(res);
      showToast('Devocional do dia gerado com sucesso!');
    } catch (err: any) {
      showToast(`Erro ao gerar devocional: ${err.message}`);
    } finally {
      setDevotionalLoading(false);
    }
  };

  // =========================================================================
  // SUB-TAB 4: PLANOS COM IA
  // =========================================================================
  const [planType, setPlanType] = useState<'tema' | 'emocao' | 'personagem' | 'livro' | 'palavraChave' | 'quantidadeDias'>('tema');
  const [planValue, setPlanValue] = useState('Superando a Ansiedade e Firmando a Fé');
  const [planDays, setPlanDays] = useState(21);
  const [planResult, setPlanResult] = useState<PlanResponse | null>(null);
  const [planLoading, setPlanLoading] = useState(false);

  const handleGeneratePlan = async (forceRefresh = false) => {
    setPlanLoading(true);
    try {
      const res = await generateAiReadingPlan(
        {
          tipo: planType,
          valor: planValue,
          dias: planDays,
        },
        forceRefresh
      );
      setPlanResult(res);
      showToast('Plano de leitura bíblica gerado com sucesso!');
    } catch (err: any) {
      showToast(`Erro ao gerar plano: ${err.message}`);
    } finally {
      setPlanLoading(false);
    }
  };

  // =========================================================================
  // SUB-TAB 5: GERAÇÃO DE IMAGENS
  // =========================================================================
  const [imageType, setImageType] = useState<'capa' | 'mapa' | 'linhaDoTempo' | 'objeto' | 'cidade' | 'templo' | 'infografico' | 'ilustracao' | 'decorativo'>('ilustracao');
  const [imageDesc, setImageDesc] = useState('O Templo de Salomão iluminado ao pôr do sol em Jerusalém');
  const [imageStyle, setImageStyle] = useState('Pintura Clássica a Óleo');
  const [imageResolution, setImageResolution] = useState<'16:9' | '1:1' | '9:16' | '4:3'>('16:9');
  const [imageResult, setImageResult] = useState<ImageResponse | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleGenerateImage = async (forceRefresh = false) => {
    const trimmedDesc = imageDesc.trim();
    if (!trimmedDesc) {
      showToast('Por favor, informe a descrição ou prompt para a imagem.');
      return;
    }
    if (trimmedDesc.length < 3) {
      showToast('A descrição da imagem deve ter pelo menos 3 caracteres.');
      return;
    }

    setImageLoading(true);
    try {
      const res = await generateAiImage(
        {
          tipo: imageType,
          descricao: trimmedDesc,
          estilo: imageStyle,
          resolucao: imageResolution,
        },
        forceRefresh
      );
      setImageResult(res);
      showToast('Ilustração bíblica gerada com sucesso!');
    } catch (err: any) {
      showToast(`Erro ao gerar imagem: ${err.message}`);
    } finally {
      setImageLoading(false);
    }
  };

  // =========================================================================
  // SUB-TAB 6: BIBLIOTECA DE PROMPTS
  // =========================================================================
  const [promptCategory, setPromptCategory] = useState<PromptTemplate['category']>('estudo');

  const handleUsePrompt = (promptObj: PromptTemplate) => {
    let filledText = promptObj.template
      .replace('{passagem}', studyBook ? `${studyBook} ${studyChapter}:${studyVerses}` : 'João 3:16')
      .replace('{tema}', studyTopic)
      .replace('{temaOuPassagem}', studyTopic)
      .replace('{dias}', '21')
      .replace('{passagemOuPersonagem}', 'Davi e Golias')
      .replace('{personagemOuTexto}', 'Neemias');

    if (promptObj.category === 'estudo') {
      setStudyTopic(promptObj.title);
      setActiveSubTab('study');
    } else if (promptObj.category === 'devocional') {
      setDevotionalTopic(promptObj.title);
      setActiveSubTab('devotional');
    } else if (promptObj.category === 'plano') {
      setPlanValue(promptObj.title);
      setActiveSubTab('plans');
    } else {
      setChatInput(filledText);
      setActiveSubTab('chat');
    }
    showToast(`Prompt "${promptObj.title}" carregado!`);
  };

  // =========================================================================
  // SUB-TAB 7: FAVORITOS & HISTÓRICO
  // =========================================================================
  const [favorites, setFavorites] = useState<any[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  const loadFavorites = async () => {
    setFavoritesLoading(true);
    try {
      const list = await getUserAiFavorites();
      setFavorites(list);
    } catch {
      // ignore
    } finally {
      setFavoritesLoading(false);
    }
  };

  useEffect(() => {
    if (activeSubTab === 'favorites') {
      loadFavorites();
    }
  }, [activeSubTab]);

  const handleSaveFavorite = async (type: 'study' | 'devotional' | 'plan' | 'chat' | 'image', title: string, content: any) => {
    try {
      await addAiFavorite(type, title, content);
      showToast('Item adicionado aos Favoritos!');
      if (activeSubTab === 'favorites') loadFavorites();
    } catch (err: any) {
      showToast(`Erro ao favoritar: ${err.message}`);
    }
  };

  const handleRemoveFavoriteItem = async (favId: string) => {
    try {
      await removeAiFavorite(favId);
      setFavorites((prev) => prev.filter((f) => f.id !== favId));
      showToast('Item removido dos Favoritos.');
    } catch (err: any) {
      showToast(`Erro ao remover: ${err.message}`);
    }
  };

  // Export helper function (Markdown / Text download)
  const handleExportText = (title: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '_')}_biblia_pro.md`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Download do arquivo iniciado!');
  };

  // Copy helper function
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copiado para a área de transferência!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4 font-sans text-stone-900 dark:text-stone-100">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#3E5641] text-[#FFFDF8] px-4 py-2.5 rounded-xl shadow-lg border border-[#D4A24C]/40 text-xs font-sans font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#D4A24C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header / Banner */}
      <div className="bg-gradient-to-r from-[#3E5641] via-[#2D4030] to-[#1F2E22] text-[#FFFDF8] rounded-2xl p-4 sm:p-6 shadow-md border border-[#D4A24C]/30 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#D4A24C]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#D4A24C]/20 border border-[#D4A24C]/40 rounded-xl shadow-inner">
              <Bot className="w-7 h-7 text-[#D4A24C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-serif font-bold text-[#FFFDF8]">Central de IA Bíblia-Pro</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#D4A24C]/20 border border-[#D4A24C]/40 text-[#D4A24C] text-[10px] font-mono font-bold uppercase tracking-wider">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-[#E7DECF]/80 font-sans mt-0.5">
                Plataforma teológica integrada com geração de estudos, devocionais, planos, exegese e arte sacra.
              </p>
            </div>
          </div>

          {/* User Preferences Selector */}
          <div className="flex items-center gap-2 bg-[#1A261C]/80 px-3 py-1.5 rounded-xl border border-[#D4A24C]/20 text-xs">
            <User className="w-3.5 h-3.5 text-[#D4A24C]" />
            <span className="text-[#E7DECF]/70 font-semibold">Nível:</span>
            <select
              value={userPrefs.userLevel || 'Intermediário'}
              onChange={(e) => {
                const updated = { ...userPrefs, userLevel: e.target.value as any };
                setUserPrefs(updated);
                saveUserAiPreferences(updated);
                showToast(`Nível alterado para ${e.target.value}`);
              }}
              className="bg-transparent text-[#FFFDF8] font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="Iniciante" className="bg-stone-900 text-stone-100">Iniciante</option>
              <option value="Intermediário" className="bg-stone-900 text-stone-100">Intermediário</option>
              <option value="Avançado" className="bg-stone-900 text-stone-100">Avançado</option>
              <option value="Líder" className="bg-stone-900 text-stone-100">Líder / Pastor</option>
            </select>
          </div>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-5 overflow-x-auto pb-1 no-scrollbar border-t border-[#E7DECF]/15 pt-3">
          {[
            { id: 'chat', label: 'Assistente', icon: Bot },
            { id: 'study', label: 'Gerador de Estudos', icon: FileText },
            { id: 'devotional', label: 'Devocional IA', icon: Flame },
            { id: 'plans', label: 'Planos com IA', icon: ListCheck },
            { id: 'images', label: 'Arte & Imagens', icon: ImageIcon },
            { id: 'prompts', label: 'Biblioteca Prompts', icon: Sparkles },
            { id: 'favorites', label: 'Favoritos', icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4A24C] text-[#1F1B16] shadow-sm font-extrabold'
                    : 'bg-[#1A261C]/60 hover:bg-[#1A261C] text-[#E7DECF]/80 border border-[#E7DECF]/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTENT FOR SUB-TAB 1: CHAT ASSISTANTE BÍBLICO */}
      {/* ========================================================================= */}
      {activeSubTab === 'chat' && (
        <div className="bg-[#FFFDF8] dark:bg-stone-900 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          {/* Chat Messages Box */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[550px]">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-[#D4A24C] text-[#1F1B16]'
                      : 'bg-[#3E5641] text-[#FFFDF8] border border-[#D4A24C]/40'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 relative group ${
                    msg.sender === 'user'
                      ? 'bg-[#3E5641] text-[#FFFDF8] rounded-tr-none'
                      : 'bg-[#F7F1E5] dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 rounded-tl-none border border-[#E7DECF] dark:border-stone-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-black/5 dark:border-white/5 text-[10px] opacity-70">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="hover:text-[#D4A24C] flex items-center gap-1"
                          title="Copiar texto"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={() => handleSaveFavorite('chat', 'Consulta Teológica', msg.text)}
                          className="hover:text-[#D4A24C] flex items-center gap-1"
                          title="Favoritar"
                        >
                          <Star className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Skeleton / Generation Indicator */}
            {chatLoading && (
              <div className="flex items-start gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-[#3E5641]/50 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 text-[#D4A24C] animate-spin" />
                </div>
                <div className="bg-[#F7F1E5] dark:bg-stone-800 p-4 rounded-2xl border border-[#E7DECF] dark:border-stone-700 space-y-2 w-2/3">
                  <div className="h-3 bg-stone-300 dark:bg-stone-700 rounded w-3/4"></div>
                  <div className="h-3 bg-stone-300 dark:bg-stone-700 rounded w-full"></div>
                  <div className="h-3 bg-stone-300 dark:bg-stone-700 rounded w-1/2"></div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-4 py-2 bg-[#F7F1E5]/60 dark:bg-stone-850/60 border-t border-[#E7DECF] dark:border-stone-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider shrink-0">Sugestões:</span>
            {[
              'Exegese de Romanos 8:28',
              'Contexto de Filipenses 4:13',
              'Como o Pentateuco aponta para Cristo?',
              'Diferença entre Justificação e Santificação',
            ].map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSendChatMessage(sug)}
                className="px-2.5 py-1 bg-white dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-lg text-[11px] text-stone-700 dark:text-stone-300 hover:border-[#D4A24C] whitespace-nowrap transition-colors cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 sm:p-4 bg-white dark:bg-stone-900 border-t border-[#E7DECF] dark:border-stone-800 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
              placeholder="Pergunte sobre exegese, teologia, contexto histórico ou passagens bíblicas..."
              className="flex-1 bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#3E5641] dark:focus:border-[#D4A24C]"
            />
            <button
              onClick={() => handleSendChatMessage()}
              disabled={chatLoading || !chatInput.trim()}
              className="px-4 py-2.5 bg-[#3E5641] hover:bg-[#324534] disabled:opacity-50 text-[#FFFDF8] rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#D4A24C]" />
              <span className="hidden sm:inline">Enviar</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONTENT FOR SUB-TAB 2: GERADOR DE ESTUDOS */}
      {/* ========================================================================= */}
      {activeSubTab === 'study' && (
        <div className="space-y-6">
          <div className="bg-[#FFFDF8] dark:bg-stone-900 p-5 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#3E5641] dark:text-[#D4A24C] flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Configuração do Estudo Bíblico</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Tema do Estudo:</label>
                <input
                  type="text"
                  value={studyTopic}
                  onChange={(e) => setStudyTopic(e.target.value)}
                  placeholder="Ex: A Graça em Efésios, O Sofrimento em Jó..."
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Nível do Estudo:</label>
                <select
                  value={studyLevel}
                  onChange={(e) => setStudyLevel(e.target.value as any)}
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                  <option value="Líder">Líder de Célula / Pastor</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Livro Bíblico:</label>
                <input
                  type="text"
                  value={studyBook}
                  onChange={(e) => setStudyBook(e.target.value)}
                  placeholder="Ex: Romanos, João, Isaías"
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Capítulo:</label>
                <input
                  type="text"
                  value={studyChapter}
                  onChange={(e) => setStudyChapter(e.target.value)}
                  placeholder="Ex: 5"
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Versículos:</label>
                <input
                  type="text"
                  value={studyVerses}
                  onChange={(e) => setStudyVerses(e.target.value)}
                  placeholder="Ex: 1-11"
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleGenerateStudy(false)}
                disabled={studyLoading}
                className="px-5 py-2.5 bg-[#3E5641] hover:bg-[#324534] disabled:opacity-50 text-[#FFFDF8] rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {studyLoading ? <RefreshCw className="w-4 h-4 animate-spin text-[#D4A24C]" /> : <Sparkles className="w-4 h-4 text-[#D4A24C]" />}
                <span>Gerar Estudo Estruturado</span>
              </button>
            </div>
          </div>

          {/* Skeleton Loading State */}
          {studyLoading && (
            <div className="bg-[#FFFDF8] dark:bg-stone-900 p-6 rounded-2xl border border-[#E7DECF] dark:border-stone-800 space-y-4 animate-pulse">
              <div className="h-6 bg-stone-300 dark:bg-stone-700 rounded w-2/3"></div>
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-5/6"></div>
              <div className="h-24 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
            </div>
          )}

          {/* Generated Study Presentation */}
          {studyResult && !studyLoading && (
            <div className="bg-[#FFFDF8] dark:bg-stone-900 p-6 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-md space-y-6">
              {/* Header & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E7DECF] dark:border-stone-800 pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#3E5641] dark:text-[#D4A24C]">
                    {studyResult.titulo}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">{studyResult.resumo}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleGenerateStudy(true)}
                    className="p-2 bg-[#F7F1E5] dark:bg-stone-800 hover:bg-[#E7DECF] rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Regenerar Estudo"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#3E5641] dark:text-[#D4A24C]" />
                  </button>
                  <button
                    onClick={() => saveAiStudy(studyTopic, studyResult).then(() => showToast('Estudo salvo no seu perfil!'))}
                    className="p-2 bg-[#F7F1E5] dark:bg-stone-800 hover:bg-[#E7DECF] rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Salvar no perfil"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-[#3E5641] dark:text-[#D4A24C]" />
                  </button>
                  <button
                    onClick={() => handleSaveFavorite('study', studyResult.titulo, studyResult)}
                    className="p-2 bg-[#F7F1E5] dark:bg-stone-800 hover:bg-[#E7DECF] rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Favoritar"
                  >
                    <Star className="w-3.5 h-3.5 text-[#D4A24C]" />
                  </button>
                  <button
                    onClick={() => handleExportText(studyResult.titulo, JSON.stringify(studyResult, null, 2))}
                    className="p-2 bg-[#3E5641] text-[#FFFDF8] hover:bg-[#324534] rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Exportar Markdown"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sections Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-2 bg-[#F7F1E5]/40 dark:bg-stone-850 p-4 rounded-xl border border-[#E7DECF]/60 dark:border-stone-800">
                  <h4 className="font-serif font-bold text-[#3E5641] dark:text-[#D4A24C] text-sm">📖 Introdução</h4>
                  <p className="leading-relaxed">{studyResult.introducao}</p>
                </div>

                <div className="space-y-2 bg-[#F7F1E5]/40 dark:bg-stone-850 p-4 rounded-xl border border-[#E7DECF]/60 dark:border-stone-800">
                  <h4 className="font-serif font-bold text-[#3E5641] dark:text-[#D4A24C] text-sm">🏛️ Contexto Histórico & Cultural</h4>
                  <p className="leading-relaxed">{studyResult.contextoHistorico}</p>
                </div>

                <div className="md:col-span-2 space-y-2 bg-[#F7F1E5]/40 dark:bg-stone-850 p-4 rounded-xl border border-[#E7DECF]/60 dark:border-stone-800">
                  <h4 className="font-serif font-bold text-[#3E5641] dark:text-[#D4A24C] text-sm">🔍 Análise Exegética do Texto</h4>
                  <p className="leading-relaxed whitespace-pre-wrap">{studyResult.analiseTexto}</p>
                </div>

                {/* Palavras-chave e Referências Cruzadas */}
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-[#3E5641] dark:text-[#D4A24C]">🔑 Palavras-Chave:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {studyResult.palavrasChave.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#3E5641]/10 text-[#3E5641] dark:text-[#D4A24C] font-bold rounded-lg text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-[#3E5641] dark:text-[#D4A24C]">📜 Referências Cruzadas:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {studyResult.referenciasCruzadas.map((ref, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#D4A24C]/15 text-[#1F1B16] dark:text-[#E7DECF] font-bold rounded-lg text-xs border border-[#D4A24C]/30">
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Aplicações Práticas e Perguntas */}
                <div className="space-y-2 bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20">
                  <h4 className="font-serif font-bold text-emerald-800 dark:text-emerald-400">🌱 Aplicações Práticas:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {studyResult.aplicacoesPraticas.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 bg-amber-500/5 p-4 rounded-xl border border-amber-500/20">
                  <h4 className="font-serif font-bold text-amber-800 dark:text-amber-400">❓ Perguntas para Reflexão:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {studyResult.perguntasReflexao.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Oração Sugerida */}
              <div className="bg-[#3E5641] text-[#FFFDF8] p-4 rounded-xl space-y-1">
                <h4 className="font-serif font-bold text-[#D4A24C] text-sm">🙏 Oração Sugerida</h4>
                <p className="italic text-xs leading-relaxed">"{studyResult.oracaoSugerida}"</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONTENT FOR SUB-TAB 3: DEVOCIONAL INTELIGENTE */}
      {/* ========================================================================= */}
      {activeSubTab === 'devotional' && (
        <div className="space-y-6">
          <div className="bg-[#FFFDF8] dark:bg-stone-900 p-5 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#3E5641] dark:text-[#D4A24C] flex items-center gap-2">
              <Flame className="w-5 h-5" />
              <span>Gerador Devocional Personalizado</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Tema ou Emoção do Dia:</label>
                <input
                  type="text"
                  value={devotionalTopic}
                  onChange={(e) => setDevotionalTopic(e.target.value)}
                  placeholder="Ex: Coragem nas Provações, Gratidão, Esperança..."
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Tempo Disponível:</label>
                <select
                  value={devotionalTime}
                  onChange={(e) => setDevotionalTime(e.target.value)}
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                >
                  <option value="5 min">5 minutos (Rápido)</option>
                  <option value="10 min">10 minutos (Ideal)</option>
                  <option value="20 min">20 minutos (Aprofundado)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => handleGenerateDevotional(false)}
              disabled={devotionalLoading}
              className="px-5 py-2.5 bg-[#3E5641] hover:bg-[#324534] disabled:opacity-50 text-[#FFFDF8] rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              {devotionalLoading ? <RefreshCw className="w-4 h-4 animate-spin text-[#D4A24C]" /> : <Flame className="w-4 h-4 text-[#D4A24C]" />}
              <span>Gerar Devocional do Dia</span>
            </button>
          </div>

          {devotionalLoading && (
            <div className="bg-[#FFFDF8] dark:bg-stone-900 p-6 rounded-2xl border border-[#E7DECF] dark:border-stone-800 space-y-3 animate-pulse">
              <div className="h-5 bg-stone-300 dark:bg-stone-700 rounded w-1/3"></div>
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
              <div className="h-16 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
            </div>
          )}

          {devotionalResult && !devotionalLoading && (
            <div className="bg-[#FFFDF8] dark:bg-stone-900 p-6 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-md space-y-6">
              {/* Devotional Versicle Card */}
              <div className="bg-gradient-to-r from-[#3E5641] to-[#2B3E2D] text-[#FFFDF8] p-5 rounded-2xl border border-[#D4A24C]/40 space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4A24C]">Versículo do Dia</span>
                  <button
                    onClick={() => handleSaveFavorite('devotional', devotionalResult.versiculoDoDia.referencia, devotionalResult)}
                    className="p-1.5 bg-[#D4A24C]/20 hover:bg-[#D4A24C]/30 rounded-lg text-xs"
                    title="Favoritar"
                  >
                    <Star className="w-3.5 h-3.5 text-[#D4A24C]" />
                  </button>
                </div>
                <p className="text-base font-serif italic">"{devotionalResult.versiculoDoDia.texto}"</p>
                <span className="text-xs font-sans font-bold text-[#D4A24C] block text-right">— {devotionalResult.versiculoDoDia.referencia}</span>
              </div>

              {/* Devotional Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-[#F7F1E5]/40 dark:bg-stone-850 p-4 rounded-xl border border-[#E7DECF]/60 dark:border-stone-800 space-y-1">
                  <h4 className="font-serif font-bold text-[#3E5641] dark:text-[#D4A24C]">🌱 Reflexão Spiritualmente Profunda</h4>
                  <p className="leading-relaxed">{devotionalResult.reflexao}</p>
                </div>

                <div className="bg-[#F7F1E5]/40 dark:bg-stone-850 p-4 rounded-xl border border-[#E7DECF]/60 dark:border-stone-800 space-y-1">
                  <h4 className="font-serif font-bold text-[#3E5641] dark:text-[#D4A24C]">🎯 Aplicação Prática no Cotidiano</h4>
                  <p className="leading-relaxed">{devotionalResult.aplicacao}</p>
                </div>

                <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 space-y-1">
                  <h4 className="font-serif font-bold text-amber-900 dark:text-amber-300">⚡ Desafio Prático do Dia</h4>
                  <p className="leading-relaxed font-bold">{devotionalResult.desafioPratico}</p>
                </div>

                <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 space-y-1">
                  <h4 className="font-serif font-bold text-emerald-900 dark:text-emerald-300">📖 Leitura Complementar Recomendada</h4>
                  <p className="leading-relaxed">{devotionalResult.leituraComplementar}</p>
                </div>
              </div>

              <div className="bg-[#1F1B16] text-[#E7DECF] p-4 rounded-xl space-y-1">
                <h4 className="font-serif font-bold text-[#D4A24C] text-xs">🙏 Oração do Dia</h4>
                <p className="italic text-xs leading-relaxed">"{devotionalResult.oracao}"</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONTENT FOR SUB-TAB 4: PLANOS COM IA */}
      {/* ========================================================================= */}
      {activeSubTab === 'plans' && (
        <div className="space-y-6">
          <div className="bg-[#FFFDF8] dark:bg-stone-900 p-5 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#3E5641] dark:text-[#D4A24C] flex items-center gap-2">
              <ListCheck className="w-5 h-5" />
              <span>Criador de Planos de Leitura com IA</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Tipo de Plano:</label>
                <select
                  value={planType}
                  onChange={(e) => setPlanType(e.target.value as any)}
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                >
                  <option value="tema">Por Tema Teológico</option>
                  <option value="emocao">Por Sentimento / Emoção</option>
                  <option value="personagem">Por Personagem Bíblico</option>
                  <option value="livro">Por Livro da Bíblia</option>
                  <option value="palavraChave">Por Palavra-Chave</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Assunto / Valor:</label>
                <input
                  type="text"
                  value={planValue}
                  onChange={(e) => setPlanValue(e.target.value)}
                  placeholder="Ex: Paz na Tempestade, A Vida de Davi..."
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Duração (Dias):</label>
                <select
                  value={planDays}
                  onChange={(e) => setPlanDays(parseInt(e.target.value))}
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3.5 py-2 text-xs font-sans focus:outline-none"
                >
                  <option value={7}>7 Dias (1 Semana)</option>
                  <option value={14}>14 Dias (2 Semanas)</option>
                  <option value={21}>21 Dias (Jejum/Purificação)</option>
                  <option value={30}>30 Dias (1 Mês)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => handleGeneratePlan(false)}
              disabled={planLoading}
              className="px-5 py-2.5 bg-[#3E5641] hover:bg-[#324534] disabled:opacity-50 text-[#FFFDF8] rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              {planLoading ? <RefreshCw className="w-4 h-4 animate-spin text-[#D4A24C]" /> : <Sparkles className="w-4 h-4 text-[#D4A24C]" />}
              <span>Gerar Plano de Leitura</span>
            </button>
          </div>

          {planLoading && (
            <div className="bg-[#FFFDF8] dark:bg-stone-900 p-6 rounded-2xl border border-[#E7DECF] dark:border-stone-800 space-y-3 animate-pulse">
              <div className="h-6 bg-stone-300 dark:bg-stone-700 rounded w-1/2"></div>
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
              <div className="h-20 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
            </div>
          )}

          {planResult && !planLoading && (
            <div className="bg-[#FFFDF8] dark:bg-stone-900 p-6 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-md space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E7DECF] dark:border-stone-800 pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#3E5641] dark:text-[#D4A24C]">{planResult.titulo}</h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">{planResult.descricao}</p>
                </div>
                <button
                  onClick={() => handleSaveFavorite('plan', planResult.titulo, planResult)}
                  className="px-3 py-1.5 bg-[#D4A24C] text-[#1F1B16] rounded-xl font-sans font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Star className="w-4 h-4" />
                  <span>Favoritar Plano</span>
                </button>
              </div>

              {/* Schedule Days */}
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {planResult.cronograma.map((day) => (
                  <div key={day.dia} className="bg-[#F7F1E5]/40 dark:bg-stone-850 p-3.5 rounded-xl border border-[#E7DECF]/60 dark:border-stone-800 space-y-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#3E5641] dark:text-[#D4A24C]">
                      <span>Dia {day.dia}: {day.titulo}</span>
                      <span className="bg-[#D4A24C]/20 text-[#1F1B16] dark:text-[#E7DECF] px-2 py-0.5 rounded text-[10px]">{day.passageRef}</span>
                    </div>
                    <p className="text-stone-700 dark:text-stone-300">{day.reflexao}</p>
                    {day.desafioDiario && (
                      <p className="text-[11px] italic font-medium text-emerald-800 dark:text-emerald-400">🎯 Desafio: {day.desafioDiario}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONTENT FOR SUB-TAB 5: GERAÇÃO DE IMAGENS */}
      {/* ========================================================================= */}
      {activeSubTab === 'images' && (
        <div className="space-y-6">
          <div className="bg-[#FFFDF8] dark:bg-stone-900 p-5 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#3E5641] dark:text-[#D4A24C] flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#D4A24C]" />
              <span>Gerador de Ilustrações Bíblicas com IA</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Tipo da Imagem:</label>
                <select
                  value={imageType}
                  onChange={(e) => setImageType(e.target.value as any)}
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                >
                  <option value="ilustracao">Ilustração Bíblica</option>
                  <option value="capa">Capa para Estudo</option>
                  <option value="mapa">Mapa Ilustrativo</option>
                  <option value="linhaDoTempo">Linha do Tempo</option>
                  <option value="objeto">Objeto Histórico</option>
                  <option value="cidade">Cidade Antiga</option>
                  <option value="templo">Templo / Tabernáculo</option>
                  <option value="infografico">Infográfico</option>
                  <option value="decorativo">Elemento Decorativo</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Estilo Artístico:</label>
                <select
                  value={imageStyle}
                  onChange={(e) => setImageStyle(e.target.value)}
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                >
                  <option value="Arte Sacra Histórica">Arte Sacra Histórica</option>
                  <option value="Pintura Clássica a Óleo">Pintura Clássica a Óleo</option>
                  <option value="Fotorrealismo Conceitual">Fotorrealismo Conceitual</option>
                  <option value="Aquarela Espiritual">Aquarela Espiritual</option>
                  <option value="Mosaico Bizantino">Mosaico Bizantino</option>
                  <option value="Gravura Antiga em Metal">Gravura Antiga em Metal</option>
                  <option value="Arte Digital 3D">Arte Digital 3D</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">Proporção / Resolução:</label>
                <select
                  value={imageResolution}
                  onChange={(e) => setImageResolution(e.target.value as any)}
                  className="w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-sans focus:outline-none"
                >
                  <option value="16:9">16:9 (Paisagem / Tela Cheia)</option>
                  <option value="1:1">1:1 (Quadrado / Redes Sociais)</option>
                  <option value="9:16">9:16 (Vertical / Stories)</option>
                  <option value="4:3">4:3 (Padrão Clássico)</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <label className="text-xs font-bold text-stone-600 dark:text-stone-400">
                  Descrição / Prompt <span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  value={imageDesc}
                  onChange={(e) => setImageDesc(e.target.value)}
                  placeholder="Ex: Arca da Aliança no Tabernáculo, Travessia do Mar Vermelho..."
                  className={`w-full bg-[#F7F1E5]/50 dark:bg-stone-800 border rounded-xl px-3 py-2 text-xs font-sans focus:outline-none ${
                    !imageDesc.trim() ? 'border-amber-400 focus:border-red-500' : 'border-[#E7DECF] dark:border-stone-700'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 italic">
                {!imageDesc.trim() ? '⚠️ Informe uma descrição para liberar a geração.' : '✨ Todos os metadados prontos para envio.'}
              </span>
              <button
                onClick={() => handleGenerateImage(false)}
                disabled={imageLoading || !imageDesc.trim()}
                className="px-5 py-2.5 bg-[#3E5641] hover:bg-[#324534] disabled:opacity-50 text-[#FFFDF8] rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {imageLoading ? <RefreshCw className="w-4 h-4 animate-spin text-[#D4A24C]" /> : <ImageIcon className="w-4 h-4 text-[#D4A24C]" />}
                <span>Gerar Ilustração com IA</span>
              </button>
            </div>
          </div>

          {imageLoading && (
            <ImageSkeleton
              aspectRatio={imageResolution}
              title="Criando imagem sacra com IA..."
              subtitle={`Aguarde enquanto geramos o conceito em estilo "${imageStyle}" na proporção ${imageResolution}...`}
            />
          )}

          {imageResult && !imageLoading && (
            <div className="bg-[#FFFDF8] dark:bg-stone-900 p-6 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-md space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#E7DECF] dark:border-stone-700 group">
                <img
                  src={imageResult.imageUrl}
                  alt={imageResult.titulo}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const seed = Math.floor(Math.random() * 10000);
                    e.currentTarget.src = `https://picsum.photos/seed/bible${seed}/1024/576`;
                  }}
                  className="w-full max-h-[500px] object-cover"
                />
                {/* REQUIRED MANDATORY DISCLOSURE BADGE */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md text-white p-3 rounded-xl text-[11px] font-sans flex items-center justify-between border border-white/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4A24C] shrink-0" />
                    <span className="italic">{imageResult.avisoIsencao}</span>
                  </div>
                  <button
                    onClick={() => handleSaveFavorite('image', imageResult.titulo, imageResult)}
                    className="p-1.5 bg-[#D4A24C] text-[#1F1B16] rounded-lg font-bold hover:scale-105 transition-all"
                    title="Favoritar"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-stone-100 dark:border-stone-800">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#3E5641] dark:text-[#D4A24C]">{imageResult.titulo}</h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">{imageResult.descricao}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="px-2.5 py-1 bg-[#F7F1E5] dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-[10px] font-bold">
                    🎨 {imageResult.estilo || imageStyle}
                  </span>
                  <span className="px-2.5 py-1 bg-[#F7F1E5] dark:bg-stone-800 border border-[#E7DECF] dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-[10px] font-bold">
                    📐 {imageResult.resolucao || imageResolution}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONTENT FOR SUB-TAB 6: BIBLIOTECA DE PROMPTS */}
      {/* ========================================================================= */}
      {activeSubTab === 'prompts' && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              'estudo',
              'devocional',
              'oracao',
              'plano',
              'sermao',
              'discipulado',
              'criancas',
              'jovens',
              'familia',
              'lideranca',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setPromptCategory(cat as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  promptCategory === cat
                    ? 'bg-[#3E5641] text-[#FFFDF8]'
                    : 'bg-[#F7F1E5] dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getPromptsByCategory(promptCategory).map((promptObj) => (
              <div
                key={promptObj.id}
                className="bg-[#FFFDF8] dark:bg-stone-900 p-4 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-sm space-y-2 hover:border-[#D4A24C] transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-[#3E5641] dark:text-[#D4A24C] text-sm">{promptObj.title}</h4>
                  <span className="text-[10px] font-mono uppercase bg-[#D4A24C]/20 px-2 py-0.5 rounded text-[#1F1B16] dark:text-[#E7DECF]">
                    {promptObj.category}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400">{promptObj.description}</p>
                <p className="text-xs italic bg-[#F7F1E5]/60 dark:bg-stone-850 p-2.5 rounded-xl border border-black/5 dark:border-white/5">
                  "{promptObj.template}"
                </p>
                <button
                  onClick={() => handleUsePrompt(promptObj)}
                  className="w-full py-2 bg-[#3E5641] hover:bg-[#324534] text-[#FFFDF8] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A24C]" />
                  <span>Usar Este Prompt</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONTENT FOR SUB-TAB 7: FAVORITOS & HISTÓRICO */}
      {/* ========================================================================= */}
      {activeSubTab === 'favorites' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-serif font-bold text-[#3E5641] dark:text-[#D4A24C]">
              Itens Favoritados e Salvos na Nuvem
            </h2>
            <button
              onClick={loadFavorites}
              className="text-xs font-bold text-[#3E5641] dark:text-[#D4A24C] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Atualizar
            </button>
          </div>

          {favoritesLoading ? (
            <div className="text-center py-8 text-xs text-stone-500">Carregando seus favoritos...</div>
          ) : favorites.length === 0 ? (
            <div className="bg-[#FFFDF8] dark:bg-stone-900 p-8 rounded-2xl border border-dashed border-[#E7DECF] dark:border-stone-800 text-center text-xs text-stone-500 space-y-2">
              <Star className="w-8 h-8 text-[#D4A24C] mx-auto opacity-50" />
              <p>Nenhum item adicionado aos favoritos ainda.</p>
              <p className="text-[11px]">Você pode favoritar estudos, devocionais, planos e imagens geradas!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-[#FFFDF8] dark:bg-stone-900 p-4 rounded-2xl border border-[#E7DECF] dark:border-stone-800 shadow-sm space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase bg-[#D4A24C]/20 px-2 py-0.5 rounded text-[#1F1B16] dark:text-[#E7DECF]">
                      {fav.type}
                    </span>
                    <button
                      onClick={() => handleRemoveFavoriteItem(fav.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#3E5641] dark:text-[#D4A24C]">{fav.title}</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3">
                    {typeof fav.content === 'string' ? fav.content : JSON.stringify(fav.content)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
