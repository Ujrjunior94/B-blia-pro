import { useState, useEffect, useCallback } from 'react';
import { 
  auth, 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  onAuthStateChanged,
  FirebaseUser 
} from '../services/firebase';
import { UserProgress } from '../types';
import { initializeUserProgressInFirebase, saveUserProgressToFirebase } from '../services/syncService';

const DEFAULT_PROGRESS: UserProgress = {
  userId: '',
  chaptersReadCount: 0,
  readChapters: [],
  activePlans: [],
  planProgress: {},
  desafioCompletedDays: [],
  monthlyDevotionalsCompletions: {},
  monthlyDevotionalsJournals: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export function useUserData() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load progress for authenticated user from Firestore
  const loadProgress = useCallback(async (uid: string) => {
    setLoading(true);
    setError(null);
    try {
      // Check user document in Firestore 'users/{uid}' or 'userProgress/{uid}'
      const progressRef = doc(db, 'userProgress', uid);
      const snap = await getDoc(progressRef);

      if (snap.exists()) {
        const data = snap.data() as UserProgress;
        setProgress(data);
      } else {
        // First login or newly registered account -> Initialize strictly from zero
        const newProgress = await initializeUserProgressInFirebase(uid);
        setProgress(newProgress);
      }
    } catch (err: any) {
      console.error('Error loading user progress from Firestore:', err);
      setError(err.message || 'Erro ao carregar dados do usuário.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadProgress(currentUser.uid);
      } else {
        setProgress(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [loadProgress]);

  // Save or update progress in Firestore
  const updateProgress = async (newProgressData: Partial<UserProgress>) => {
    if (!user) {
      setError('Usuário não autenticado.');
      return;
    }

    try {
      const updated = {
        ...(progress || DEFAULT_PROGRESS),
        ...newProgressData,
        userId: user.uid,
        updatedAt: new Date().toISOString()
      };
      setProgress(updated);
      await saveUserProgressToFirebase(user.uid, newProgressData);
    } catch (err: any) {
      console.error('Error updating progress in Firestore:', err);
      setError('Falha ao salvar progresso.');
    }
  };

  // Toggle chapter read status
  const toggleChapterRead = async (chapterKey: string) => {
    if (!user || !progress) return;
    const isRead = progress.readChapters.includes(chapterKey);
    const updatedReadChapters = isRead
      ? progress.readChapters.filter(c => c !== chapterKey)
      : [...progress.readChapters, chapterKey];

    await updateProgress({
      readChapters: updatedReadChapters,
      chaptersReadCount: updatedReadChapters.length
    });
  };

  // Toggle day completion in a reading plan
  const togglePlanDayCompleted = async (planId: string, dayNumber: number) => {
    if (!user || !progress) return;
    const currentPlanProgress = progress.planProgress[planId] || [];
    const isCompleted = currentPlanProgress.includes(dayNumber);
    const updatedDays = isCompleted
      ? currentPlanProgress.filter(d => d !== dayNumber)
      : [...currentPlanProgress, dayNumber];

    const updatedPlanProgress = {
      ...progress.planProgress,
      [planId]: updatedDays
    };

    await updateProgress({ planProgress: updatedPlanProgress });
  };

  // Reset user progress to zero in Firestore
  const resetProgress = async () => {
    if (!user) return;
    const cleanProgress = await initializeUserProgressInFirebase(user.uid);
    setProgress(cleanProgress);
  };

  return {
    user,
    progress,
    loading,
    error,
    updateProgress,
    toggleChapterRead,
    togglePlanDayCompleted,
    resetProgress,
    refetch: () => user && loadProgress(user.uid)
  };
}
