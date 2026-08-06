import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, Plus, CheckCircle2, Clock, Filter, Search, 
  Sparkles, Trash2, Edit3, MessageSquare, Check, X, BookOpen, Share2, 
  Award, Heart, Calendar, ArrowRight, ShieldCheck, Flame
} from 'lucide-react';
import { PrayerRequest, PrayerCategory } from '../types';
import { getLocalPrayers, addOrUpdatePrayer, togglePrayerAnswered, deletePrayer } from '../services/prayerService';

const PRAYER_CATEGORIES: { id: PrayerCategory; label: string; icon: string; color: string; badge: string }[] = [
  { id: 'Família', label: 'Família', icon: '👨‍👩‍👧‍👦', color: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20' },
  { id: 'Saúde', label: 'Saúde', icon: '🩺', color: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20' },
  { id: 'Vida Espiritual', label: 'Vida Espiritual', icon: '🕊️', color: 'text-indigo-600 dark:text-indigo-400', badge: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20' },
  { id: 'Trabalho & Estudos', label: 'Trabalho & Estudos', icon: '💼', color: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20' },
  { id: 'Gratidão & Louvor', label: 'Gratidão & Louvor', icon: '🙌', color: 'text-rose-600 dark:text-rose-400', badge: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20' },
  { id: 'Intercessão', label: 'Intercessão', icon: '🙏', color: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20' },
];

export const PrayerJournalView: React.FC = () => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'PENDING' | 'ANSWERED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingPrayer, setEditingPrayer] = useState<PrayerRequest | null>(null);

  // Form inputs
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<PrayerCategory>('Vida Espiritual');
  const [formVerseRef, setFormVerseRef] = useState('');

  // Mark Answered Modal
  const [answeringPrayer, setAnsweringPrayer] = useState<PrayerRequest | null>(null);
  const [testimonyInput, setTestimonyInput] = useState('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadPrayers();
  }, []);

  const loadPrayers = () => {
    const list = getLocalPrayers();
    setPrayers(list);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenCreateModal = () => {
    setEditingPrayer(null);
    setFormTitle('');
    setFormDescription('');
    setFormCategory('Vida Espiritual');
    setFormVerseRef('');
    setIsNewModalOpen(true);
  };

  const handleOpenEditModal = (prayer: PrayerRequest) => {
    setEditingPrayer(prayer);
    setFormTitle(prayer.title);
    setFormDescription(prayer.description || '');
    setFormCategory(prayer.category);
    setFormVerseRef(prayer.bibleVerseRef || '');
    setIsNewModalOpen(true);
  };

  const handleSavePrayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newOrUpdated: PrayerRequest = {
      id: editingPrayer ? editingPrayer.id : `prayer-${Date.now()}`,
      title: formTitle.trim(),
      description: formDescription.trim() || undefined,
      category: formCategory,
      isAnswered: editingPrayer ? editingPrayer.isAnswered : false,
      answeredAt: editingPrayer?.answeredAt,
      answerTestimony: editingPrayer?.answerTestimony,
      createdAt: editingPrayer ? editingPrayer.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bibleVerseRef: formVerseRef.trim() || undefined,
    };

    await addOrUpdatePrayer(newOrUpdated);
    loadPrayers();
    setIsNewModalOpen(false);
    showToast(editingPrayer ? 'Pedido de oração atualizado!' : 'Novo pedido de oração adicionado!');
  };

  const handleConfirmAnswered = async () => {
    if (!answeringPrayer) return;
    await togglePrayerAnswered(answeringPrayer.id, true, testimonyInput.trim() || undefined);
    loadPrayers();
    setAnsweringPrayer(null);
    setTestimonyInput('');
    showToast('Glorioso! Oração marcada como respondida. Glória a Deus!');
  };

  const handleUnmarkAnswered = async (prayer: PrayerRequest) => {
    await togglePrayerAnswered(prayer.id, false);
    loadPrayers();
    showToast('Oração retornada para a lista em andamento.');
  };

  const handleDelete = async (prayerId: string) => {
    if (window.confirm('Tem certeza que deseja remover este pedido de oração?')) {
      await deletePrayer(prayerId);
      loadPrayers();
      showToast('Pedido de oração removido.');
    }
  };

  // Filter logic
  const filteredPrayers = prayers.filter((p) => {
    // Category filter
    if (selectedCategory !== 'TODAS' && p.category !== selectedCategory) return false;
    // Status filter
    if (selectedStatus === 'PENDING' && p.isAnswered) return false;
    if (selectedStatus === 'ANSWERED' && !p.isAnswered) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = (p.description || '').toLowerCase().includes(q);
      const matchTestimony = (p.answerTestimony || '').toLowerCase().includes(q);
      const matchRef = (p.bibleVerseRef || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchTestimony && !matchRef) return false;
    }
    return true;
  });

  const totalCount = prayers.length;
  const pendingCount = prayers.filter((p) => !p.isAnswered).length;
  const answeredCount = prayers.filter((p) => p.isAnswered).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 min-h-screen pb-24">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#F7F1E5] to-[#EFE7D8] dark:from-[#1E1B18] dark:to-[#151311] border border-[#E7DECF] dark:border-stone-800 shadow-sm relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-sans font-extrabold uppercase tracking-widest text-[#3E5641] dark:text-[#D4A24C]">
              <HeartHandshake className="w-4 h-4" />
              <span>Diário Espiritual de Oração</span>
            </div>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#1F1B16] dark:text-stone-100">
              Pedidos & Testemunhos
            </h2>
            <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-400 max-w-xl italic">
              "Perseverai na oração, vigiando nela com ações de graças." — Colossenses 4:2
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="py-3 px-5 rounded-2xl bg-[#3E5641] hover:bg-[#324534] text-[#FFFDF8] font-sans font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Pedido</span>
          </button>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E7DECF]/80 dark:border-stone-800">
          <div className="p-3 rounded-2xl bg-[#FFFDF8]/80 dark:bg-stone-900/80 border border-[#E7DECF] dark:border-stone-800 text-center space-y-0.5">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              Total Pedidos
            </span>
            <span className="font-serif font-extrabold text-lg text-[#1F1B16] dark:text-stone-100">
              {totalCount}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-0.5">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" /> Em Oração
            </span>
            <span className="font-serif font-extrabold text-lg text-amber-800 dark:text-amber-300">
              {pendingCount}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-0.5">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Respondidas
            </span>
            <span className="font-serif font-extrabold text-lg text-emerald-800 dark:text-emerald-300">
              {answeredCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Search Bar */}
      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palavra, versículo ou testemunho..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 text-xs text-[#1F1B16] dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Tab Toggle & Category Filter Carousel */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-[#F7F1E5] dark:bg-stone-900 p-1 rounded-2xl border border-[#E7DECF] dark:border-stone-800 text-xs font-sans font-bold">
            <button
              onClick={() => setSelectedStatus('ALL')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedStatus === 'ALL'
                  ? 'bg-[#3E5641] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Todos ({totalCount})
            </button>
            <button
              onClick={() => setSelectedStatus('PENDING')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedStatus === 'PENDING'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Em Oração ({pendingCount})
            </button>
            <button
              onClick={() => setSelectedStatus('ANSWERED')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                selectedStatus === 'ANSWERED'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Respondidas ({answeredCount})
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('TODAS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === 'TODAS'
                  ? 'bg-[#D4A24C] text-stone-950 border-[#D4A24C] shadow-xs'
                  : 'bg-[#FFFDF8] dark:bg-stone-900 border-[#E7DECF] dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100'
              }`}
            >
              ✨ Todas Categorias
            </button>
            {PRAYER_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#3E5641] text-white border-[#3E5641] shadow-xs'
                    : 'bg-[#FFFDF8] dark:bg-stone-900 border-[#E7DECF] dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Prayer Cards List */}
      <div className="space-y-3.5">
        {filteredPrayers.length === 0 ? (
          <div className="p-10 rounded-3xl bg-[#FFFDF8] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#1F1B16] dark:text-stone-200">
              Nenhum pedido de oração encontrado
            </h4>
            <p className="text-xs font-sans text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== 'TODAS' || selectedStatus !== 'ALL'
                ? 'Tente alterar os filtros de busca para encontrar o pedido desejado.'
                : 'Você ainda não registrou nenhum pedido de oração. Clique no botão "Novo Pedido" para começar!'}
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="py-2.5 px-4 rounded-xl bg-[#3E5641] text-white font-sans font-bold text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Primeiro Pedido</span>
            </button>
          </div>
        ) : (
          filteredPrayers.map((prayer) => {
            const catObj = PRAYER_CATEGORIES.find((c) => c.id === prayer.category);
            return (
              <div
                key={prayer.id}
                className={`p-5 rounded-3xl border transition-all space-y-3 relative group cls-card-md ${
                  prayer.isAnswered
                    ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30 shadow-xs'
                    : 'bg-[#FFFDF8] dark:bg-[#1A1816] border-[#E7DECF] dark:border-stone-800 hover:shadow-md'
                }`}
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Category Badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-extrabold uppercase border flex items-center gap-1 ${catObj?.badge || 'bg-stone-100 text-stone-700'}`}>
                        <span>{catObj?.icon}</span>
                        <span>{prayer.category}</span>
                      </span>

                      {/* Status Badge */}
                      {prayer.isAnswered ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-extrabold uppercase bg-emerald-600 text-white flex items-center gap-1 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Respondida</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-extrabold uppercase bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Em Oração</span>
                        </span>
                      )}

                      {/* Bible Reference Badge if present */}
                      {prayer.bibleVerseRef && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold bg-[#F7F1E5] dark:bg-stone-850 text-[#3E5641] dark:text-[#D4A24C] border border-[#E7DECF] dark:border-stone-800 flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{prayer.bibleVerseRef}</span>
                        </span>
                      )}
                    </div>

                    <h3 className={`font-serif font-extrabold text-base sm:text-lg leading-snug ${
                      prayer.isAnswered ? 'text-emerald-950 dark:text-emerald-100' : 'text-[#1F1B16] dark:text-stone-100'
                    }`}>
                      {prayer.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(prayer)}
                      className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
                      title="Editar Pedido"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prayer.id)}
                      className="p-1.5 rounded-xl hover:bg-rose-500/10 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remover Pedido"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                {prayer.description && (
                  <p className="text-xs sm:text-sm font-sans text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                    {prayer.description}
                  </p>
                )}

                {/* Answered Testimony Box */}
                {prayer.isAnswered && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-sans font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Testemunho da Resposta:</span>
                    </div>
                    <p className="text-xs font-serif italic text-emerald-900 dark:text-emerald-200 leading-relaxed">
                      "{prayer.answerTestimony || 'Oração respondida com a benção e fidelidade do Senhor.'}"
                    </p>
                    {prayer.answeredAt && (
                      <p className="text-[10px] font-sans text-emerald-700 dark:text-emerald-400 pt-1">
                        Respondida em: {new Date(prayer.answeredAt).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                )}

                {/* Footer Controls & Toggle Answered Button */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-850 flex items-center justify-between text-[11px] font-sans text-stone-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Criado em: {new Date(prayer.createdAt).toLocaleDateString('pt-BR')}
                  </span>

                  {prayer.isAnswered ? (
                    <button
                      onClick={() => handleUnmarkAnswered(prayer)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Desmarcar Resposta
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setAnsweringPrayer(prayer);
                        setTestimonyInput('');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Marcar como Respondida!</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Novo / Editar Pedido */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-2xl bg-amber-500/10 text-[#D4A24C]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-extrabold text-base sm:text-lg text-[#1F1B16] dark:text-stone-100">
                  {editingPrayer ? 'Editar Pedido de Oração' : 'Novo Pedido de Oração'}
                </h3>
              </div>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePrayer} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                  Título do Pedido *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Saúde do irmão João, Sabedoria nos estudos..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                  Categoria
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRAYER_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormCategory(cat.id)}
                      className={`p-2 rounded-xl text-left border text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        formCategory === cat.id
                          ? 'bg-[#3E5641] text-white border-[#3E5641] shadow-xs'
                          : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span className="truncate">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                  Descrição & Detalhes (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Escreva os detalhes da sua oração ou pedidos específicos..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                  Versículo de Promessa Associado (Opcional)
                </label>
                <input
                  type="text"
                  value={formVerseRef}
                  onChange={(e) => setFormVerseRef(e.target.value)}
                  placeholder="Ex: Filipenses 4:6, Salmos 23:1..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-sans font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#3E5641] hover:bg-[#324534] text-white font-sans font-extrabold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  {editingPrayer ? 'Salvar Alterações' : 'Adicionar Pedido'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Marcar como Respondida + Testemunho */}
      {answeringPrayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-base text-emerald-900 dark:text-emerald-300">
                  Oração Respondida!
                </h3>
                <p className="text-xs font-sans text-stone-500">
                  Deus é fiel. Deseja registrar o testemunho?
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <p className="text-xs font-serif font-bold text-stone-800 dark:text-stone-200">
                "{answeringPrayer.title}"
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-300 block">
                Relato do Testemunho / Como Deus respondeu (Opcional)
              </label>
              <textarea
                rows={3}
                value={testimonyInput}
                onChange={(e) => setTestimonyInput(e.target.value)}
                placeholder="Escreva como a oração foi atendida para sempre lembrar das bençãos de Deus..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setAnsweringPrayer(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-sans font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmAnswered}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-extrabold text-xs uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar Resposta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-stone-900 text-stone-100 font-sans font-bold text-xs shadow-xl border border-stone-700 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#D4A24C]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
