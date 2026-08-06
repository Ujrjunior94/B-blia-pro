import { db, doc, getDoc, setDoc, collection, query, where, getDocs, deleteDoc } from './firebase';
import { localDB } from '../utils/db';
import { UserBookmark, UserHighlight, UserNote, UserProgress } from '../types';

export interface SyncStats {
  highlightsSynced: number;
  notesSynced: number;
  bookmarksSynced: number;
  desafioSynced: boolean;
  userProgressInitialized: boolean;
}

/**
 * Initializes a clean zeroed user progress record in Firebase Firestore
 * strictly tied to the provided userId.
 */
export async function initializeUserProgressInFirebase(userId: string): Promise<UserProgress> {
  // 1. Reset local storage & IndexedDB to clean state
  await localDB.clearUserData();
  localStorage.setItem('jornada_desafio_365_progress', JSON.stringify({
    completedDays: [],
    weeklyNotes: {},
    weeklyPrayers: {}
  }));

  const initialProgress: UserProgress = {
    userId,
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

  // 2. Persist zero progress directly to Firebase Firestore
  await setDoc(doc(db, 'userProgress', userId), initialProgress);
  await setDoc(doc(db, 'desafioProgress', userId), {
    completedDays: [],
    weeklyNotes: {},
    weeklyPrayers: {},
    userId,
    updatedAt: new Date().toISOString()
  });

  return initialProgress;
}

/**
 * Saves or updates user progress in Firebase Firestore for a specific userId.
 */
export async function saveUserProgressToFirebase(userId: string, progress: Partial<UserProgress>): Promise<void> {
  const userProgressRef = doc(db, 'userProgress', userId);
  await setDoc(userProgressRef, {
    ...progress,
    userId,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

/**
 * Synchronizes local IndexedDB data with Firebase Firestore for the authenticated user.
 * Ensures new accounts or accounts without progress start strictly from zero.
 */
export async function syncUserData(userId: string): Promise<SyncStats> {
  const stats: SyncStats = {
    highlightsSynced: 0,
    notesSynced: 0,
    bookmarksSynced: 0,
    desafioSynced: false,
    userProgressInitialized: false,
  };

  try {
    // 1. Sync Highlights
    const localHighlights = await localDB.getHighlights();
    const highlightsColRef = collection(db, 'highlights');
    const highlightsQuery = query(highlightsColRef, where('userId', '==', userId));
    const remoteHighlightsSnap = await getDocs(highlightsQuery);
    
    const remoteHighlightsMap = new Map<string, any>();
    remoteHighlightsSnap.forEach((docSnap) => {
      remoteHighlightsMap.set(docSnap.id, docSnap.data());
    });

    for (const hl of localHighlights) {
      const remoteHl = remoteHighlightsMap.get(hl.id);
      if (!remoteHl) {
        await setDoc(doc(db, 'highlights', hl.id), {
          ...hl,
          userId,
          synchronizedAt: new Date().toISOString(),
        });
        stats.highlightsSynced++;
      }
    }

    for (const [id, remoteHl] of remoteHighlightsMap.entries()) {
      const localExists = localHighlights.some(hl => hl.id === id);
      if (!localExists) {
        const { userId: uid, synchronizedAt, ...hlData } = remoteHl;
        await localDB.saveHighlight(hlData as UserHighlight);
        stats.highlightsSynced++;
      }
    }

    // 2. Sync Notes
    const localNotes = await localDB.getNotes();
    const notesColRef = collection(db, 'notes');
    const notesQuery = query(notesColRef, where('userId', '==', userId));
    const remoteNotesSnap = await getDocs(notesQuery);

    const remoteNotesMap = new Map<string, any>();
    remoteNotesSnap.forEach((docSnap) => {
      remoteNotesMap.set(docSnap.id, docSnap.data());
    });

    for (const note of localNotes) {
      const remoteNote = remoteNotesMap.get(note.id);
      if (!remoteNote || new Date(note.updatedAt) > new Date(remoteNote.updatedAt)) {
        await setDoc(doc(db, 'notes', note.id), {
          ...note,
          userId,
          synchronizedAt: new Date().toISOString(),
        });
        stats.notesSynced++;
      }
    }

    for (const [id, remoteNote] of remoteNotesMap.entries()) {
      const localNote = localNotes.find(n => n.id === id);
      if (!localNote || new Date(remoteNote.updatedAt) > new Date(localNote.updatedAt)) {
        const { userId: uid, synchronizedAt, ...noteData } = remoteNote;
        await localDB.saveNote(noteData as UserNote);
        stats.notesSynced++;
      }
    }

    // 3. Sync Bookmarks
    const localBookmarks = await localDB.getBookmarks();
    const bookmarksColRef = collection(db, 'bookmarks');
    const bookmarksQuery = query(bookmarksColRef, where('userId', '==', userId));
    const remoteBookmarksSnap = await getDocs(bookmarksQuery);

    const remoteBookmarksMap = new Map<string, any>();
    remoteBookmarksSnap.forEach((docSnap) => {
      remoteBookmarksMap.set(docSnap.id, docSnap.data());
    });

    for (const bm of localBookmarks) {
      const remoteBm = remoteBookmarksMap.get(bm.id);
      if (!remoteBm) {
        await setDoc(doc(db, 'bookmarks', bm.id), {
          ...bm,
          userId,
          synchronizedAt: new Date().toISOString(),
        });
        stats.bookmarksSynced++;
      }
    }

    for (const [id, remoteBm] of remoteBookmarksMap.entries()) {
      const localExists = localBookmarks.some(bm => bm.id === id);
      if (!localExists) {
        const { userId: uid, synchronizedAt, ...bmData } = remoteBm;
        await localDB.saveBookmark(bmData as UserBookmark);
        stats.bookmarksSynced++;
      }
    }

    // 4. User Progress & Zero-state verification in Firebase
    const userProgressRef = doc(db, 'userProgress', userId);
    const userProgressSnap = await getDoc(userProgressRef);

    if (!userProgressSnap.exists()) {
      // User has no progress record in Firebase -> initialize from zero
      await initializeUserProgressInFirebase(userId);
      stats.userProgressInitialized = true;
    } else {
      // Load progress from Firebase
      const remoteProgress = userProgressSnap.data() as UserProgress;
      if (remoteProgress.desafioCompletedDays) {
        const localDesafioRaw = localStorage.getItem('jornada_desafio_365_progress');
        const localDesafio = localDesafioRaw ? JSON.parse(localDesafioRaw) : { completedDays: [], weeklyNotes: {}, weeklyPrayers: {} };

        const mergedDesafio = {
          completedDays: Array.from(new Set([...(localDesafio.completedDays || []), ...(remoteProgress.desafioCompletedDays || [])])),
          weeklyNotes: { ...(localDesafio.weeklyNotes || {}), ...(remoteProgress.monthlyDevotionalsJournals || {}) },
          weeklyPrayers: localDesafio.weeklyPrayers || {}
        };
        localStorage.setItem('jornada_desafio_365_progress', JSON.stringify(mergedDesafio));
      }
    }

    // 5. Sync Desafio Progress
    const localDesafioRaw = localStorage.getItem('jornada_desafio_365_progress');
    const desafioDocRef = doc(db, 'desafioProgress', userId);

    if (localDesafioRaw) {
      const localDesafio = JSON.parse(localDesafioRaw);
      const remoteDesafioSnap = await getDoc(desafioDocRef);
      if (remoteDesafioSnap.exists()) {
        const remoteDesafio = remoteDesafioSnap.data();
        const mergedCompletedDays = Array.from(new Set([
          ...(localDesafio.completedDays || []),
          ...(remoteDesafio.completedDays || [])
        ]));
        const mergedNotes = {
          ...(remoteDesafio.weeklyNotes || {}),
          ...(localDesafio.weeklyNotes || {})
        };
        const mergedPrayers = {
          ...(remoteDesafio.weeklyPrayers || {}),
          ...(localDesafio.weeklyPrayers || {})
        };
        const mergedDesafio = {
          completedDays: mergedCompletedDays,
          weeklyNotes: mergedNotes,
          weeklyPrayers: mergedPrayers
        };

        localStorage.setItem('jornada_desafio_365_progress', JSON.stringify(mergedDesafio));
        await setDoc(desafioDocRef, {
          ...mergedDesafio,
          userId,
          updatedAt: new Date().toISOString()
        });

        // Also update userProgress doc
        await setDoc(userProgressRef, {
          userId,
          chaptersReadCount: mergedCompletedDays.length,
          desafioCompletedDays: mergedCompletedDays,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } else {
        await setDoc(desafioDocRef, {
          ...localDesafio,
          userId,
          updatedAt: new Date().toISOString()
        });
      }
      stats.desafioSynced = true;
    } else {
      const remoteDesafioSnap = await getDoc(desafioDocRef);
      if (remoteDesafioSnap.exists()) {
        const remoteData = remoteDesafioSnap.data();
        const { userId: uid, updatedAt, ...desafioData } = remoteData;
        localStorage.setItem('jornada_desafio_365_progress', JSON.stringify(desafioData));
        stats.desafioSynced = true;
      }
    }

  } catch (error) {
    console.error('Error during data synchronization:', error);
    throw error;
  }

  return stats;
}

/**
 * Resets Desafio 365 Days reading plan progress locally and in Firebase.
 */
export async function resetDesafioProgressInApp(userId?: string): Promise<void> {
  const emptyDesafio = { completedDays: [], weeklyNotes: {}, weeklyPrayers: {} };
  localStorage.setItem('jornada_desafio_365_progress', JSON.stringify(emptyDesafio));

  if (userId) {
    try {
      const desafioDocRef = doc(db, 'desafioProgress', userId);
      await setDoc(desafioDocRef, {
        ...emptyDesafio,
        userId,
        updatedAt: new Date().toISOString()
      });

      const userProgressRef = doc(db, 'userProgress', userId);
      await setDoc(userProgressRef, {
        userId,
        desafioCompletedDays: [],
        chaptersReadCount: 0,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error('Error resetting Desafio progress in Firebase:', err);
    }
  }
}

/**
 * Resets user notes, verse highlights, and bookmarks locally and in Firebase.
 */
export async function resetUserContentInApp(userId?: string): Promise<void> {
  await localDB.clearUserData();

  if (userId) {
    try {
      // Clear remote highlights
      const hlSnap = await getDocs(query(collection(db, 'highlights'), where('userId', '==', userId)));
      for (const d of hlSnap.docs) {
        await deleteDoc(doc(db, 'highlights', d.id));
      }
      // Clear remote notes
      const notesSnap = await getDocs(query(collection(db, 'notes'), where('userId', '==', userId)));
      for (const d of notesSnap.docs) {
        await deleteDoc(doc(db, 'notes', d.id));
      }
      // Clear remote bookmarks
      const bmSnap = await getDocs(query(collection(db, 'bookmarks'), where('userId', '==', userId)));
      for (const d of bmSnap.docs) {
        await deleteDoc(doc(db, 'bookmarks', d.id));
      }
    } catch (err) {
      console.error('Error resetting user content in Firebase:', err);
    }
  }
}

/**
 * Resets monthly devotionals and favorite bible characters.
 */
export async function resetDevotionalsAndFavoritesInApp(): Promise<void> {
  localStorage.removeItem('jornada_monthly_devotionals_v1');
  localStorage.removeItem('jornada_biblia_fav_characters');
}

/**
 * Performs a complete factory reset of all user progress, content, and local cache.
 */
export async function fullFactoryResetInApp(userId?: string): Promise<void> {
  await resetDesafioProgressInApp(userId);
  await resetUserContentInApp(userId);
  await resetDevotionalsAndFavoritesInApp();

  if (userId) {
    try {
      await initializeUserProgressInFirebase(userId);
    } catch (err) {
      console.error('Error in factory reset Firebase sync:', err);
    }
  }
}

