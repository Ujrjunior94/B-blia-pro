import React, { useState, useEffect } from 'react';
import { X, LogIn, UserPlus, User, LogOut, CheckCircle2, AlertCircle, RefreshCw, Cloud, ShieldCheck } from 'lucide-react';
import { auth, loginWithEmail, registerWithEmail, logoutUser, loginAnonymously, onAuthStateChanged, db, doc, setDoc, getDoc } from '../services/firebase';
import { syncUserData } from '../services/syncService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && !user.isAnonymous) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().displayName) {
            setDisplayName(userDoc.data().displayName);
          } else if (user.displayName) {
            setDisplayName(user.displayName);
          }
        } catch (err) {
          console.error('Error reading user profile:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setIsLoading(true);
    try {
      const userCred = await loginWithEmail(email.trim(), password);
      setSuccessMessage('Login realizado com sucesso!');
      
      // Auto sync user cloud data
      if (userCred.user) {
        setIsSyncing(true);
        try {
          await syncUserData(userCred.user.uid);
        } catch (syncErr) {
          console.warn('Sync issue after login:', syncErr);
        } finally {
          setIsSyncing(false);
        }
      }

      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess();
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setErrorMessage('E-mail ou senha incorretos. Verifique suas credenciais.');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMessage('Formato de e-mail inválido.');
      } else {
        setErrorMessage(err.message || 'Falha ao realizar login. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    setIsLoading(true);
    try {
      const userCred = await registerWithEmail(email.trim(), password);
      const user = userCred.user;

      // Save user profile in Firestore
      if (user) {
        const nameToSave = displayName.trim() || email.split('@')[0];
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: nameToSave,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, { merge: true });

        // Auto sync
        setIsSyncing(true);
        try {
          await syncUserData(user.uid);
        } catch (syncErr) {
          console.warn('Sync error after register:', syncErr);
        } finally {
          setIsSyncing(false);
        }
      }

      setSuccessMessage('Conta criada e sincronizada com sucesso!');
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess();
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error('Register error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Este e-mail já está em uso por outra conta.');
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('A senha é muito fraca (mínimo 6 caracteres).');
      } else {
        setErrorMessage(err.message || 'Falha ao criar conta. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await loginAnonymously();
      setSuccessMessage('Entrou como convidado (dados salvos localmente).');
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess();
        onClose();
      }, 800);
    } catch (err: any) {
      setErrorMessage('Erro ao entrar como convidado: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setSuccessMessage('Você saiu da conta.');
      setDisplayName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setErrorMessage('Erro ao sair da conta: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSync = async () => {
    if (!currentUser) return;
    setIsSyncing(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await syncUserData(currentUser.uid);
      setSuccessMessage('Sincronização com o Firebase concluída com sucesso!');
    } catch (err: any) {
      setErrorMessage('Erro ao sincronizar: ' + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#FFFDF8] dark:bg-[#1A1816] border border-[#E7DECF] dark:border-stone-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative p-5 sm:p-6 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E7DECF] dark:border-stone-800 pb-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#3E5641]/10 text-[#3E5641] dark:text-[#D4A24C] flex items-center justify-center border border-[#3E5641]/20 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif font-extrabold text-base sm:text-lg text-[#1F1B16] dark:text-stone-100 truncate">
                {currentUser && !currentUser.isAnonymous ? 'Sua Conta & Perfil' : 'Acessar a Jornada'}
              </h3>
              <p className="text-[10px] sm:text-[11px] font-sans text-stone-500 font-semibold uppercase tracking-wider truncate">
                Sincronização em Nuvem Firebase
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

        {/* Notifications */}
        {errorMessage && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-sans font-medium flex items-center gap-2 animate-fade-in break-words">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1 min-w-0">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-sans font-medium flex items-center gap-2 animate-fade-in break-words">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="flex-1 min-w-0">{successMessage}</span>
          </div>
        )}

        {/* LOGGED IN USER PROFILE SCREEN */}
        {currentUser && !currentUser.isAnonymous ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F7F1E5]/60 dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3E5641] to-[#2D3E30] text-amber-50 flex items-center justify-center font-serif font-black text-lg border border-[#D4A24C] shrink-0 shadow-sm">
                  {(displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-extrabold text-base text-[#1F1B16] dark:text-stone-100 truncate">
                    {displayName || currentUser.displayName || 'Estudante da Palavra'}
                  </h4>
                  <p className="text-xs font-sans text-stone-500 dark:text-stone-400 truncate">
                    {currentUser.email}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-sans font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" /> Conta Autenticada
                  </span>
                </div>
              </div>
            </div>

            {/* Cloud Sync Section */}
            <div className="p-4 rounded-2xl bg-[#3E5641]/5 border border-[#3E5641]/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-sans font-extrabold text-[#3E5641] dark:text-[#D4A24C] uppercase tracking-wider">
                  <Cloud className="w-4 h-4" />
                  <span>Sincronização de Dados</span>
                </div>
                {isSyncing && (
                  <span className="text-[10px] font-sans font-bold text-amber-600 animate-pulse">
                    Sincronizando...
                  </span>
                )}
              </div>
              <p className="text-xs font-serif italic text-stone-600 dark:text-stone-300">
                Suas anotações, marcadores, progresso do Desafio 365 e planos ficam salvos em nuvem na sua conta.
              </p>
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="w-full py-2 px-3 rounded-xl bg-[#3E5641] hover:bg-[#3E5641]/90 text-white font-sans font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sincronizar Agora com o Firestore</span>
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-sans font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          </div>
        ) : (
          /* LOGIN OR REGISTER FORM */
          <div className="space-y-4">
            {/* Tab Selector */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[#F7F1E5] dark:bg-stone-900 border border-[#E7DECF] dark:border-stone-800">
              <button
                onClick={() => { setActiveTab('login'); setErrorMessage(null); }}
                className={`py-2 rounded-xl font-sans text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'login'
                    ? 'bg-[#FFFDF8] dark:bg-stone-800 text-[#3E5641] dark:text-[#D4A24C] shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Entrar</span>
              </button>
              <button
                onClick={() => { setActiveTab('register'); setErrorMessage(null); }}
                className={`py-2 rounded-xl font-sans text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'register'
                    ? 'bg-[#FFFDF8] dark:bg-stone-800 text-[#3E5641] dark:text-[#D4A24C] shadow-2xs'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Criar Conta</span>
              </button>
            </div>

            <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} className="space-y-3.5">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-sans font-extrabold text-[#1F1B16] dark:text-stone-200 uppercase tracking-wider mb-1">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-theme-app border border-theme text-theme-primary font-sans text-xs focus:ring-2 focus:ring-[#3E5641] outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-sans font-extrabold text-[#1F1B16] dark:text-stone-200 uppercase tracking-wider mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-app border border-theme text-theme-primary font-sans text-xs focus:ring-2 focus:ring-[#3E5641] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-extrabold text-[#1F1B16] dark:text-stone-200 uppercase tracking-wider mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-theme-app border border-theme text-theme-primary font-sans text-xs focus:ring-2 focus:ring-[#3E5641] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#3E5641] hover:bg-[#3E5641]/90 text-white font-sans font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : activeTab === 'login' ? (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Entrar na Minha Conta</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Criar Minha Conta</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative flex items-center my-3">
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
              <span className="flex-shrink mx-2 text-[10px] font-sans font-bold text-stone-400 uppercase tracking-wider">
                ou continue sem login
              </span>
              <div className="flex-grow border-t border-stone-200 dark:border-stone-800"></div>
            </div>

            <button
              onClick={handleGuestLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-theme-app hover:bg-theme-card-hover border border-theme text-theme-secondary font-sans font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4 text-stone-400" />
              <span>Continuar como Convidado</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
