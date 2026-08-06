import { PrayerRequest } from '../types';
import { db, auth, doc, setDoc, deleteDoc, collection, query, where, getDocs, handleFirestoreError, OperationType } from './firebase';

const LOCAL_STORAGE_KEY = 'jornada_prayer_requests';

// Default initial sample prayers for a rich first-time experience
const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: 'sample-1',
    title: 'Sabedoria no trabalho e decisões diárias',
    description: 'Pedindo orientação ao Senhor para tomar decisões corretas com graça e discernimento.',
    category: 'Trabalho & Estudos',
    isAnswered: false,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    bibleVerseRef: 'Tiago 1:5'
  },
  {
    id: 'sample-2',
    title: 'Restauração e saúde da família',
    description: 'Oração pela saúde física e paz no lar de toda a família.',
    category: 'Família',
    isAnswered: true,
    answeredAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    answerTestimony: 'O Senhor concedeu recuperação completa e paz no coração de todos!',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    bibleVerseRef: 'Salmos 103:2-3'
  },
  {
    id: 'sample-3',
    title: 'Crescimento na vida de oração e palavra',
    description: 'Desejo de manter comunhão diária e constante com Deus.',
    category: 'Vida Espiritual',
    isAnswered: false,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    bibleVerseRef: '1 Tessalonicenses 5:17'
  }
];

export function getLocalPrayers(): PrayerRequest[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_PRAYERS));
      return INITIAL_PRAYERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading prayer requests from localStorage', e);
    return INITIAL_PRAYERS;
  }
}

export function saveLocalPrayers(prayers: PrayerRequest[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prayers));
  } catch (e) {
    console.error('Error saving prayer requests to localStorage', e);
  }
}

export async function addOrUpdatePrayer(prayer: PrayerRequest): Promise<void> {
  const current = getLocalPrayers();
  const index = current.findIndex(p => p.id === prayer.id);
  if (index >= 0) {
    current[index] = prayer;
  } else {
    current.unshift(prayer);
  }
  saveLocalPrayers(current);

  const user = auth.currentUser;
  if (user) {
    try {
      await setDoc(doc(db, 'prayer_requests', prayer.id), {
        ...prayer,
        userId: user.uid,
        synchronizedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error syncing prayer to Firestore:', err);
    }
  }
}

export async function togglePrayerAnswered(
  prayerId: string, 
  isAnswered: boolean, 
  testimony?: string
): Promise<PrayerRequest | null> {
  const current = getLocalPrayers();
  const index = current.findIndex(p => p.id === prayerId);
  if (index === -1) return null;

  const updated: PrayerRequest = {
    ...current[index],
    isAnswered,
    answeredAt: isAnswered ? new Date().toISOString() : undefined,
    answerTestimony: isAnswered ? (testimony || current[index].answerTestimony) : undefined,
    updatedAt: new Date().toISOString()
  };

  current[index] = updated;
  saveLocalPrayers(current);

  const user = auth.currentUser;
  if (user) {
    try {
      await setDoc(doc(db, 'prayer_requests', updated.id), {
        ...updated,
        userId: user.uid,
        synchronizedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error syncing prayer answer toggle to Firestore:', err);
    }
  }

  return updated;
}

export async function deletePrayer(prayerId: string): Promise<void> {
  const current = getLocalPrayers();
  const filtered = current.filter(p => p.id !== prayerId);
  saveLocalPrayers(filtered);

  const user = auth.currentUser;
  if (user) {
    try {
      await deleteDoc(doc(db, 'prayer_requests', prayerId));
    } catch (err) {
      console.error('Error deleting prayer from Firestore:', err);
    }
  }
}
