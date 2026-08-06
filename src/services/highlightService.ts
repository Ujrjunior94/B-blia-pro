import { db, auth, doc, setDoc, deleteDoc, collection, query, where, getDocs, handleFirestoreError, OperationType } from './firebase';
import { onSnapshot } from 'firebase/firestore';
import { localDB } from '../utils/db';
import { UserHighlight } from '../types';

/**
 * Saves or updates a highlight both in local IndexedDB and Firebase Firestore.
 */
export async function saveHighlight(highlight: UserHighlight): Promise<void> {
  // 1. Save to local IndexedDB for instant UI response and offline support
  await localDB.saveHighlight(highlight);

  // 2. If user is logged into Firebase, persist to Firestore
  const user = auth.currentUser;
  if (user) {
    const highlightPath = `highlights/${highlight.id}`;
    try {
      await setDoc(doc(db, 'highlights', highlight.id), {
        ...highlight,
        userId: user.uid,
        synchronizedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error persisting highlight to Firebase:', error);
      handleFirestoreError(error, OperationType.WRITE, highlightPath);
    }
  }
}

/**
 * Removes a highlight both from local IndexedDB and Firebase Firestore.
 */
export async function removeHighlight(highlightId: string): Promise<void> {
  // 1. Remove from local IndexedDB
  await localDB.removeHighlight(highlightId);

  // 2. If user is logged into Firebase, delete from Firestore
  const user = auth.currentUser;
  if (user) {
    const highlightPath = `highlights/${highlightId}`;
    try {
      await deleteDoc(doc(db, 'highlights', highlightId));
    } catch (error) {
      console.error('Error deleting highlight from Firebase:', error);
      handleFirestoreError(error, OperationType.DELETE, highlightPath);
    }
  }
}

/**
 * Fetches user highlights directly from Firebase Firestore.
 */
export async function fetchUserHighlightsFromFirebase(userId: string): Promise<UserHighlight[]> {
  const highlightsPath = 'highlights';
  try {
    const colRef = collection(db, highlightsPath);
    const q = query(colRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);

    const remoteHighlights: UserHighlight[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const { userId: _uid, synchronizedAt: _sync, ...hl } = data;
      remoteHighlights.push(hl as UserHighlight);
    });

    // Mirror remote highlights to local IndexedDB
    for (const hl of remoteHighlights) {
      await localDB.saveHighlight(hl);
    }

    return remoteHighlights;
  } catch (error) {
    console.error('Error fetching highlights from Firebase:', error);
    handleFirestoreError(error, OperationType.GET, highlightsPath);
    return [];
  }
}

/**
 * Subscribes to real-time changes in user highlights from Firebase.
 */
export function subscribeUserHighlights(
  userId: string,
  onUpdate: (highlights: UserHighlight[]) => void,
  onError?: (err: any) => void
): () => void {
  const highlightsPath = 'highlights';
  const colRef = collection(db, highlightsPath);
  const q = query(colRef, where('userId', '==', userId));

  const unsubscribe = onSnapshot(
    q,
    async (snapshot) => {
      const highlights: UserHighlight[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const { userId: _uid, synchronizedAt: _sync, ...hl } = data;
        highlights.push(hl as UserHighlight);
      });

      // Mirror to IndexedDB
      for (const hl of highlights) {
        await localDB.saveHighlight(hl);
      }

      onUpdate(highlights);
    },
    (error) => {
      console.error('Realtime highlights subscription error:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, highlightsPath);
    }
  );

  return unsubscribe;
}
