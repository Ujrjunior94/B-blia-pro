import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  HardDrive, 
  ShieldCheck, 
  DownloadCloud, 
  Settings, 
  Heart, 
  MessageSquare,
  LogIn,
  LogOut,
  RefreshCw,
  Cloud,
  CloudLightning,
  CloudOff,
  Database,
  UserPlus,
  CheckCircle,
  Mail,
  Lock,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { 
  auth, 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  db,
  doc,
  setDoc,
  getDoc
} from '../services/firebase';
import { syncUserData, SyncStats } from '../services/syncService';
import { localDB } from '../utils/db';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AiTheologyAssistantProps {
  onOpenOffline?: () => void;
}

export const AiTheologyAssistant: React.FC<AiTheologyAssistantProps> = ({ onOpenOffline }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Paz do Senhor! Eu sou o Teólogo Virtual do **Jornada da Bíblia**. Estou aqui para lhe auxiliar em exegese bíblica, análise das línguas originais (Hebraico e Grego Koiné), teologia cristocêntrica e aplicação pastoral. Em que posso te ajudar hoje?',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    'Explique o significado de João 1:1 no Grego Koiné',
    'Como o livro de Gênesis aponta para Jesus Cristo?',
    'Esboço de mensagem pastoral baseada no Salmo 23',
  ];

  // Auth states
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Sync states
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState<boolean | null>(null);
  const [syncedStats, setSyncedStats] = useState<SyncStats | null>(null);

  // Local Counts
  const [hlCount, setHlCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const [bookmarksCount, setBookmarksCount] = useState(0);

  useEffect(() => {
    // Listen for auth state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user profile if exists in firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            setUserProfile(null);
          }
        } catch (e) {
          console.error('Error fetching user profile from firestore', e);
        }
        
        // Auto-sync on sign-in
        try {
          const stats = await syncUserData(user.uid);
          setSyncedStats(stats);
          setSyncSuccess(true);
        } catch (e) {
          console.error('Auto-sync failed on sign-in', e);
        }
      } else {
        setUserProfile(null);
      }
      refreshLocalCounts();
    });

    return () => unsubscribe();
  }, []);

  const refreshLocalCounts = async () => {
    try {
      const hl = await localDB.getHighlights();
      const nt = await localDB.getNotes();
      const bm = await localDB.getBookmarks();
      setHlCount(hl.length);
      setNotesCount(nt.length);
      setBookmarksCount(bm.length);
    } catch (e) {
      console.error('Error updating counts', e);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setAuthLoading(true);
    setAuthError(null);

    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Clear local storage and IndexedDB user progress for a brand new clean registration
        await localDB.clearUserData();

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const profile = {
          displayName: displayName.trim() || user.email?.split('@')[0] || 'Discípulo',
          email: user.email,
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', user.uid), profile);
        setUserProfile(profile);
      }
      setEmail('');
      setPassword('');
      setDisplayName('');
    } catch (err: any) {
      console.error(err);
      let translated = err.message;
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        translated = 'E-mail ou senha incorretos.';
      } else if (err.code === 'auth/email-already-in-use') {
        translated = 'Este endereço de e-mail já está em uso.';
      } else if (err.code === 'auth/weak-password') {
        translated = 'A senha de segurança deve conter pelo menos 6 caracteres.';
      } else if (err.code === 'auth/invalid-email') {
        translated = 'Por favor, insira um endereço de e-mail válido.';
      }
      setAuthError(translated);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAnonymousAuth = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      console.error(err);
      setAuthError('Falha ao autenticar em Modo Convidado: ' + err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Save Google profile to Firestore if not present
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // Clear local storage and IndexedDB user progress for a brand new Google registration
        await localDB.clearUserData();

        const profile = {
          displayName: user.displayName || 'Discípulo',
          email: user.email,
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, profile);
        setUserProfile(profile);
      } else {
        setUserProfile(userDoc.data());
      }
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError('Erro na autenticação do Google: ' + err.message);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setAuthLoading(true);
    try {
      await localDB.clearUserData();
      await signOut(auth);
      setSyncedStats(null);
      setSyncSuccess(null);
      await refreshLocalCounts();
    } catch (err: any) {
      console.error(err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSyncCloud = async () => {
    if (!currentUser) return;
    setSyncing(true);
    setSyncSuccess(null);
    try {
      const stats = await syncUserData(currentUser.uid);
      setSyncedStats(stats);
      setSyncSuccess(true);
      await refreshLocalCounts();
    } catch (err: any) {
      console.error(err);
      setSyncSuccess(false);
    } finally {
      setSyncing(false);
    }
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/theology/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await response.json();
      if (data.success && data.reply) {
        const aiReply: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        throw new Error(data.error || 'Erro ao comunicar com o modelo Gemini');
      }
    } catch (err: any) {
      const errorReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Ocorreu uma instabilidade ao conectar com o serviço teológico: ${err.message}. Verifique se a chave GEMINI_API_KEY está configurada no painel de Segredos.`,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  const getUserInitials = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase();
    }
    if (currentUser?.email) {
      return currentUser.email.substring(0, 2).toUpperCase();
    }
    if (currentUser?.isAnonymous) {
      return 'CV';
    }
    return 'LS';
  };

  const getUserName = () => {
    if (userProfile?.displayName) return userProfile.displayName;
    if (currentUser?.email) return currentUser.email.split('@')[0];
    if (currentUser?.isAnonymous) return 'Convidado da Jornada';
    return 'Lucas Silveira';
  };

  return (
    <div className="max-w-md mx-auto px-4 py-5 space-y-5 bg-[#F7F1E5] dark:bg-[#151311] min-h-screen text-[#1F1B16] dark:text-stone-200 pb-24">
      
      {/* 1. Profile / Authentication Block */}
      {!currentUser ? (
        <div className="p-5 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-850 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E5641]/10 text-[#3E5641] flex items-center justify-center">
              <User className="w-5 h-5 text-[#3E5641]" />
            </div>
            <div>
              <h3 className="font-serif font-extrabold text-sm">Sincronização na Nuvem</h3>
              <p className="text-[10px] text-[#5F5A52] font-sans">Acesse para salvar seu progresso e notas</p>
            </div>
          </div>

          {/* Form tab selectors */}
          <div className="flex p-0.5 rounded-xl bg-[#F7F1E5] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 text-xs font-sans font-bold">
            <button
              onClick={() => { setAuthMode('login'); setAuthError(null); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                authMode === 'login' 
                  ? 'bg-white dark:bg-stone-800 text-[#3E5641] dark:text-amber-100 shadow-3xs' 
                  : 'text-stone-500'
              }`}
            >
              Fazer Login
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setAuthError(null); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                authMode === 'signup' 
                  ? 'bg-white dark:bg-stone-800 text-[#3E5641] dark:text-amber-100 shadow-3xs' 
                  : 'text-stone-500'
              }`}
            >
              Criar Conta
            </button>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[11px] font-sans flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-3">
            {authMode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 rounded-xl text-xs font-serif text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3E5641] transition-colors shadow-3xs"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 rounded-xl text-xs font-sans text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3E5641] transition-colors shadow-3xs"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-stone-400" />
              <input
                type="password"
                placeholder="Senha de segurança"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 rounded-xl text-xs font-sans text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3E5641] transition-colors shadow-3xs"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 rounded-xl bg-[#3E5641] hover:bg-[#324534] disabled:bg-[#3E5641]/50 text-white font-sans font-extrabold uppercase tracking-wider text-[11px] cursor-pointer transition-colors shadow-3xs flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : authMode === 'login' ? (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Entrar com E-mail</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Cadastrar Nova Conta</span>
                </>
              )}
            </button>
          </form>

          {/* Alternative Auth buttons */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#E7DECF] dark:border-stone-800"></div>
            <span className="flex-shrink mx-4 text-[10px] text-stone-400 font-sans uppercase tracking-widest">ou acesse com</span>
            <div className="flex-grow border-t border-[#E7DECF] dark:border-stone-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleGoogleAuth}
              disabled={authLoading}
              className="py-2 px-3 rounded-xl border border-[#E7DECF] dark:border-stone-800 bg-[#FFFDF8] dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors flex items-center justify-center gap-2 text-[11px] font-sans font-bold cursor-pointer"
            >
              {/* Google G icon simulated with beautiful SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Google</span>
            </button>
            <button
              onClick={handleAnonymousAuth}
              disabled={authLoading}
              className="py-2 px-3 rounded-xl border border-[#E7DECF] dark:border-stone-800 bg-[#FFFDF8] dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors flex items-center justify-center gap-2 text-[11px] font-sans font-bold cursor-pointer"
            >
              <User className="w-4 h-4 text-stone-500" />
              <span>Convidado</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-850 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Custom Avatar with Gold-Amber border */}
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3E5641] to-[#2D3E30] flex items-center justify-center text-[#F7F1E5] border-2 border-[#D4A24C] shadow-md font-serif font-bold text-xl">
                  {getUserInitials()}
                </div>
                {/* Connected cloud status badge */}
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#FFFDF8] rounded-full flex items-center justify-center">
                  <Cloud className="w-2 h-2 text-white" />
                </span>
              </div>

              <div className="space-y-0.5">
                <h2 className="font-serif font-extrabold text-base text-[#1F1B16] dark:text-amber-100 flex items-center gap-1">
                  <span>{getUserName()}</span>
                </h2>
                <p className="text-[10px] text-stone-400 font-sans font-bold uppercase tracking-wider">
                  {currentUser.isAnonymous ? 'Modo Visitante' : currentUser.email}
                </p>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#3E5641]/10 text-[#3E5641] dark:text-[#D4A24C] font-sans font-extrabold text-[9px] uppercase tracking-wider">
                  <UserCheck className="w-2.5 h-2.5" />
                  <span>Sincronizado na Nuvem</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={authLoading}
              className="p-2 rounded-xl bg-transparent border border-red-200 dark:border-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/10 cursor-pointer transition-all"
              title="Sair da Conta"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Sync Stats results */}
          {syncSuccess === true && syncedStats && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#3E5641] dark:text-emerald-400 text-[10px] font-sans space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Nuvem sincronizada com sucesso!</span>
              </div>
              <p className="opacity-80 leading-relaxed">
                Alterações integradas: {syncedStats.highlightsSynced} marcações, {syncedStats.notesSynced} notas, {syncedStats.bookmarksSynced} marcadores.
              </p>
            </div>
          )}

          {syncSuccess === false && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-sans flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              <span>Não foi possível sincronizar no momento. As alterações serão salvas localmente e sincronizadas assim que a conexão estabilizar.</span>
            </div>
          )}

          {/* 3 columns personal stats row */}
          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-[#E7DECF] dark:border-stone-800 text-center">
            <div className="space-y-0.5">
              <span className="text-[9px] font-sans font-bold text-stone-400 block uppercase tracking-wider">Notas</span>
              <span className="font-serif font-extrabold text-base text-[#3E5641] dark:text-amber-100">{notesCount}</span>
            </div>
            <div className="space-y-0.5 border-x border-[#E7DECF] dark:border-stone-800">
              <span className="text-[9px] font-sans font-bold text-stone-400 block uppercase tracking-wider">Marcações</span>
              <span className="font-serif font-extrabold text-base text-[#3E5641] dark:text-amber-100">{hlCount}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[9px] font-sans font-bold text-stone-400 block uppercase tracking-wider">Marcadores</span>
              <span className="font-serif font-extrabold text-base text-[#3E5641] dark:text-amber-100">{bookmarksCount}</span>
            </div>
          </div>

          {/* Sync Button */}
          <button
            onClick={handleSyncCloud}
            disabled={syncing}
            className="w-full py-2 px-4 rounded-xl bg-transparent hover:bg-stone-100 dark:hover:bg-stone-850 border border-[#E7DECF] dark:border-stone-800 text-[#3E5641] dark:text-amber-100 font-sans font-extrabold text-[10px] uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            <span>{syncing ? 'Sincronizando...' : 'Sincronizar com Nuvem'}</span>
          </button>
        </div>
      )}


      {/* 2. Biblioteca Offline Card matching Image 2 */}
      <div className="p-4 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-850 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#3E5641]/10 text-[#3E5641] flex items-center justify-center">
              <HardDrive className="w-4 h-4 text-[#3E5641]" />
            </div>
            <div>
              <h3 className="font-serif font-extrabold text-xs">Biblioteca Offline</h3>
              <p className="text-[9px] text-[#5F5A52] font-sans tracking-wide">312 MB de 2 GB usados</p>
            </div>
          </div>

          <button
            onClick={onOpenOffline}
            className="px-3.5 py-2 rounded-xl bg-transparent border border-[#D4A24C] text-[#D4A24C] hover:bg-[#D4A24C]/5 text-[10px] font-sans font-extrabold uppercase tracking-widest cursor-pointer transition-colors shadow-3xs"
          >
            Gerenciar
          </button>
        </div>

        {/* storage progress indicator */}
        <div className="w-full h-1.5 rounded-full bg-[#E7DECF] dark:bg-stone-800 overflow-hidden">
          <div className="h-full bg-[#D4A24C] rounded-full" style={{ width: '15.6%' }} />
        </div>
      </div>

      {/* 3. Falar com Teólogo IA Chat Section */}
      <div className="p-5 rounded-3xl bg-[#FFFDF8] dark:bg-[#1C1A18] border border-[#E7DECF] dark:border-stone-850 shadow-2xs space-y-4">
        
        {/* Teólogo header bar */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#3E5641] text-[#FFFDF8] flex items-center justify-center shadow-3xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-extrabold text-xs">Teólogo Virtual IA</h3>
            <p className="text-[10px] text-[#5F5A52] font-serif italic">Pergunte sobre línguas originais e manuscritos</p>
          </div>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[10px]">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={loading}
              className="px-2.5 py-1.5 rounded-xl bg-[#F7F1E5] dark:bg-stone-850 text-stone-700 font-serif border border-transparent hover:border-[#D4A24C] whitespace-nowrap transition-all cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages Logs Box */}
        <div className="p-4 rounded-2xl bg-[#F7F1E5]/40 dark:bg-stone-900/30 border border-[#E7DECF] dark:border-stone-800 min-h-[180px] max-h-[300px] overflow-y-auto space-y-3 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-[#D4A24C] text-[#1F1B16]'
                    : 'bg-[#3E5641] text-[#FFFDF8]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`p-3 rounded-2xl max-w-[85%] space-y-0.5 shadow-3xs ${
                  msg.sender === 'user'
                    ? 'bg-[#3E5641] text-[#FFFDF8] rounded-tr-none font-serif text-xs'
                    : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-tl-none font-serif text-xs leading-relaxed border border-[#E7DECF] dark:border-stone-750'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="text-[8px] opacity-65 block text-right">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#3E5641] text-[#FFFDF8] flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-stone-800 text-[10px] font-serif italic text-stone-400 animate-pulse">
                Consultando manuscritos originais...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Digite sua dúvida teológica..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={loading}
            className="flex-1 p-3 bg-white dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 rounded-xl text-stone-900 dark:text-amber-100 font-serif text-xs focus:outline-none focus:border-[#3E5641] shadow-3xs disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="p-3 rounded-xl bg-[#3E5641] hover:bg-[#324534] text-white font-bold transition-all disabled:opacity-40 shadow-3xs flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
