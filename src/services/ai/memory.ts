import { db, auth, doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc, handleFirestoreError, OperationType } from '../firebase';

export interface UserAiPreferences {
  userLevel?: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Líder';
  studyDuration?: string;
  preferredTranslation?: string;
  favoriteTopics?: string[];
  lastUpdated?: string;
}

export interface UserSavedStudy {
  id: string;
  userId: string;
  topic: string;
  data: any; // Study JSON output
  createdAt: string;
  isFavorite?: boolean;
}

export interface UserSavedQuestion {
  id: string;
  userId: string;
  question: string;
  answer: string;
  createdAt: string;
}

export interface UserSavedPlan {
  id: string;
  userId: string;
  title: string;
  planData: any;
  createdAt: string;
  completedDays?: number[];
  isCompleted?: boolean;
}

export interface UserAiFavorite {
  id: string;
  userId: string;
  type: 'study' | 'devotional' | 'plan' | 'chat' | 'image';
  title: string;
  content: any;
  createdAt: string;
}

// ---------------- USER PREFERENCES ----------------
export async function saveUserAiPreferences(prefs: UserAiPreferences): Promise<void> {
  const userId = auth.currentUser?.uid || 'guest';
  const dataToSave = {
    ...prefs,
    userId,
    lastUpdated: new Date().toISOString(),
  };

  // 1. LocalStorage
  try {
    localStorage.setItem(`ai_user_prefs_${userId}`, JSON.stringify(dataToSave));
  } catch {
    // Ignore storage error
  }

  // 2. Firebase
  if (auth.currentUser) {
    const ref = doc(db, 'user_ai_preferences', userId);
    try {
      await setDoc(ref, dataToSave, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `user_ai_preferences/${userId}`);
    }
  }
}

export async function getUserAiPreferences(): Promise<UserAiPreferences> {
  const userId = auth.currentUser?.uid || 'guest';

  // 1. Try Firebase if authenticated
  if (auth.currentUser) {
    try {
      const ref = doc(db, 'user_ai_preferences', userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as UserAiPreferences;
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `user_ai_preferences/${userId}`);
    }
  }

  // 2. Fallback to LocalStorage
  try {
    const local = localStorage.getItem(`ai_user_prefs_${userId}`);
    if (local) {
      return JSON.parse(local);
    }
  } catch {
    // Ignore
  }

  return {
    userLevel: 'Intermediário',
    studyDuration: '15 min',
    preferredTranslation: 'Almeida',
    favoriteTopics: [],
  };
}

// ---------------- SAVED STUDIES ----------------
export async function saveAiStudy(topic: string, studyData: any): Promise<string> {
  const userId = auth.currentUser?.uid || 'guest';
  const id = `study_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: UserSavedStudy = {
    id,
    userId,
    topic,
    data: studyData,
    createdAt: new Date().toISOString(),
    isFavorite: false,
  };

  // Local storage
  try {
    const list = getLocalList<UserSavedStudy>(`ai_studies_${userId}`);
    list.unshift(record);
    localStorage.setItem(`ai_studies_${userId}`, JSON.stringify(list.slice(0, 50)));
  } catch {
    // Ignore
  }

  // Firebase
  if (auth.currentUser) {
    try {
      await setDoc(doc(db, 'user_studies', id), record);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `user_studies/${id}`);
    }
  }

  return id;
}

export async function getUserSavedStudies(): Promise<UserSavedStudy[]> {
  const userId = auth.currentUser?.uid || 'guest';

  if (auth.currentUser) {
    try {
      const q = query(collection(db, 'user_studies'), where('userId', '==', userId));
      const snap = await getDocs(q);
      const results: UserSavedStudy[] = [];
      snap.forEach((d) => results.push(d.data() as UserSavedStudy));
      return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'user_studies');
    }
  }

  return getLocalList<UserSavedStudy>(`ai_studies_${userId}`);
}

// ---------------- FAVORITES ----------------
export async function addAiFavorite(type: UserAiFavorite['type'], title: string, content: any): Promise<string> {
  const userId = auth.currentUser?.uid || 'guest';
  const id = `fav_${type}_${Date.now()}`;
  const record: UserAiFavorite = {
    id,
    userId,
    type,
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  try {
    const list = getLocalList<UserAiFavorite>(`ai_favorites_${userId}`);
    list.unshift(record);
    localStorage.setItem(`ai_favorites_${userId}`, JSON.stringify(list));
  } catch {
    // Ignore
  }

  if (auth.currentUser) {
    try {
      await setDoc(doc(db, 'user_favorites', id), record);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `user_favorites/${id}`);
    }
  }

  return id;
}

export async function getUserAiFavorites(): Promise<UserAiFavorite[]> {
  const userId = auth.currentUser?.uid || 'guest';

  if (auth.currentUser) {
    try {
      const q = query(collection(db, 'user_favorites'), where('userId', '==', userId));
      const snap = await getDocs(q);
      const results: UserAiFavorite[] = [];
      snap.forEach((d) => results.push(d.data() as UserAiFavorite));
      return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'user_favorites');
    }
  }

  return getLocalList<UserAiFavorite>(`ai_favorites_${userId}`);
}

export async function removeAiFavorite(favId: string): Promise<void> {
  const userId = auth.currentUser?.uid || 'guest';

  try {
    const list = getLocalList<UserAiFavorite>(`ai_favorites_${userId}`);
    const updated = list.filter((f) => f.id !== favId);
    localStorage.setItem(`ai_favorites_${userId}`, JSON.stringify(updated));
  } catch {
    // Ignore
  }

  if (auth.currentUser) {
    try {
      await deleteDoc(doc(db, 'user_favorites', favId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `user_favorites/${favId}`);
    }
  }
}

// Helper function
function getLocalList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
