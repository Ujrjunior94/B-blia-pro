import { db, doc, getDoc, setDoc, collection, query, where, getDocs, deleteDoc } from './firebase';
import { localDB } from '../utils/db';
import { UserBookmark, UserHighlight, UserNote } from '../types';

export interface SyncStats {
  highlightsSynced: number;
  notesSynced: number;
  bookmarksSynced: number;
  desafioSynced: boolean;
}

/**
 * Synchronizes local IndexedDB data with Firebase Firestore for the authenticated user.
 * Merges both data sources by keeping all items and resolving conflicts (most recently updated/created).
 */
export async function syncUserData(userId: string): Promise<SyncStats> {
  const stats: SyncStats = {
    highlightsSynced: 0,
    notesSynced: 0,
    bookmarksSynced: 0,
    desafioSynced: false,
  };

  try {
    // 1. Sync Highlights
    const localHighlights = await localDB.getHighlights();
    const highlightsColRef = collection(db, 'highlights');
    const highlightsQuery = query(highlightsColRef, where('userId', '==', userId));
    const remoteHighlightsSnap = await getDocs(highlightsQuery);
    
    const remoteHighlightsMap = new Map<string, any>();
    remoteHighlightsSnap.forEach((doc) => {
      remoteHighlightsMap.set(doc.id, doc.data());
    });

    // Upload local highlights that don't exist remotely or are newer
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

    // Download remote highlights that don't exist locally
    for (const [id, remoteHl] of remoteHighlightsMap.entries()) {
      const localExists = localHighlights.some(hl => hl.id === id);
      if (!localExists) {
        const { userId, synchronizedAt, ...hlData } = remoteHl;
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
    remoteNotesSnap.forEach((doc) => {
      remoteNotesMap.set(doc.id, doc.data());
    });

    // Upload local notes
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

    // Download remote notes
    for (const [id, remoteNote] of remoteNotesMap.entries()) {
      const localNote = localNotes.find(n => n.id === id);
      if (!localNote || new Date(remoteNote.updatedAt) > new Date(localNote.updatedAt)) {
        const { userId, synchronizedAt, ...noteData } = remoteNote;
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
    remoteBookmarksSnap.forEach((doc) => {
      remoteBookmarksMap.set(doc.id, doc.data());
    });

    // Upload local bookmarks
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

    // Download remote bookmarks
    for (const [id, remoteBm] of remoteBookmarksMap.entries()) {
      const localExists = localBookmarks.some(bm => bm.id === id);
      if (!localExists) {
        const { userId, synchronizedAt, ...bmData } = remoteBm;
        await localDB.saveBookmark(bmData as UserBookmark);
        stats.bookmarksSynced++;
      }
    }

    // 4. Sync Desafio Progress (from localStorage)
    const localDesafioRaw = localStorage.getItem('jornada_desafio_365_progress');
    const desafioDocRef = doc(db, 'desafioProgress', userId);

    if (localDesafioRaw) {
      const localDesafio = JSON.parse(localDesafioRaw);
      
      // Fetch remote progress
      const remoteDesafioSnap = await getDoc(desafioDocRef);
      if (remoteDesafioSnap.exists()) {
        const remoteDesafio = remoteDesafioSnap.data();
        
        // Merge completed days array and notes/prayers objects
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

        // Write merged back to both places
        localStorage.setItem('jornada_desafio_365_progress', JSON.stringify(mergedDesafio));
        await setDoc(desafioDocRef, {
          ...mergedDesafio,
          userId,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Just upload local if no remote exists
        await setDoc(desafioDocRef, {
          ...localDesafio,
          userId,
          updatedAt: new Date().toISOString()
        });
      }
      stats.desafioSynced = true;
    } else {
      // If no local, try downloading from remote
      const remoteDesafioSnap = await getDoc(desafioDocRef);
      if (remoteDesafioSnap.exists()) {
        const remoteData = remoteDesafioSnap.data();
        const { userId, updatedAt, ...desafioData } = remoteData;
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
