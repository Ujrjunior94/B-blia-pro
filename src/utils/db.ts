import { UserBookmark, UserHighlight, UserNote, UserPlanProgress, Verse } from '../types';

const DB_NAME = 'JornadaDaBibliaDB';
const DB_VERSION = 1;

export class LocalBibleDatabase {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Verses cache for offline
        if (!db.objectStoreNames.contains('verses')) {
          const verseStore = db.createObjectStore('verses', { keyPath: 'id' }); // key: `VERSION-BOOK-CHAP-VERSE`
          verseStore.createIndex('version_book_chap', ['version', 'bookId', 'chapter'], { unique: false });
        }

        // Highlights
        if (!db.objectStoreNames.contains('highlights')) {
          db.createObjectStore('highlights', { keyPath: 'id' });
        }

        // Notes
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'id' });
        }

        // Bookmarks
        if (!db.objectStoreNames.contains('bookmarks')) {
          db.createObjectStore('bookmarks', { keyPath: 'id' });
        }

        // Reading Plan Progress
        if (!db.objectStoreNames.contains('planProgress')) {
          db.createObjectStore('planProgress', { keyPath: 'planId' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  // --- HIGHLIGHTS ---
  async getHighlights(): Promise<UserHighlight[]> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('highlights', 'readonly');
        const store = tx.objectStore('highlights');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    } catch {
      return [];
    }
  }

  async saveHighlight(highlight: UserHighlight): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction('highlights', 'readwrite');
      tx.objectStore('highlights').put(highlight);
    } catch (e) {
      console.error('Error saving highlight to IDB', e);
    }
  }

  async removeHighlight(id: string): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction('highlights', 'readwrite');
      tx.objectStore('highlights').delete(id);
    } catch (e) {
      console.error('Error removing highlight', e);
    }
  }

  // --- NOTES ---
  async getNotes(): Promise<UserNote[]> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('notes', 'readonly');
        const store = tx.objectStore('notes');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    } catch {
      return [];
    }
  }

  async saveNote(note: UserNote): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction('notes', 'readwrite');
      tx.objectStore('notes').put(note);
    } catch (e) {
      console.error('Error saving note', e);
    }
  }

  async deleteNote(id: string): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction('notes', 'readwrite');
      tx.objectStore('notes').delete(id);
    } catch (e) {
      console.error('Error deleting note', e);
    }
  }

  // --- BOOKMARKS ---
  async getBookmarks(): Promise<UserBookmark[]> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('bookmarks', 'readonly');
        const store = tx.objectStore('bookmarks');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    } catch {
      return [];
    }
  }

  async saveBookmark(bookmark: UserBookmark): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction('bookmarks', 'readwrite');
      tx.objectStore('bookmarks').put(bookmark);
    } catch (e) {
      console.error('Error saving bookmark', e);
    }
  }

  async removeBookmark(id: string): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction('bookmarks', 'readwrite');
      tx.objectStore('bookmarks').delete(id);
    } catch (e) {
      console.error('Error removing bookmark', e);
    }
  }

  // --- PLAN PROGRESS ---
  async getPlanProgress(planId: string): Promise<UserPlanProgress | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('planProgress', 'readonly');
        const store = tx.objectStore('planProgress');
        const req = store.get(planId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  }

  async savePlanProgress(progress: UserPlanProgress): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction('planProgress', 'readwrite');
      tx.objectStore('planProgress').put(progress);
    } catch (e) {
      console.error('Error saving plan progress', e);
    }
  }

  // --- CACHED VERSES FOR FULL OFFLINE USE ---
  async cacheChapterVerses(version: string, bookId: string, chapter: number, verses: Verse[]): Promise<void> {
    try {
      const db = await this.getDB();
      const tx = db.transaction('verses', 'readwrite');
      const store = tx.objectStore('verses');
      verses.forEach((v) => {
        const key = `${version}-${bookId}-${chapter}-${v.verse}`;
        store.put({ id: key, version, bookId, chapter, verse: v.verse, verseObj: v });
      });
    } catch (e) {
      console.error('Error caching chapter verses', e);
    }
  }

  async getCachedChapterVerses(version: string, bookId: string, chapter: number): Promise<Verse[] | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('verses', 'readonly');
        const store = tx.objectStore('verses');
        const index = store.index('version_book_chap');
        const req = index.getAll([version, bookId, chapter]);
        req.onsuccess = () => {
          if (req.result && req.result.length > 0) {
            const verses = req.result.map((r: any) => r.verseObj);
            verses.sort((a, b) => a.verse - b.verse);
            resolve(verses);
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      });
    } catch {
      return null;
    }
  }

  // CLEAR ALL USER DATA FOR CLEAN SLATE
  async clearUserData(): Promise<void> {
    try {
      const db = await this.getDB();
      const stores = ['highlights', 'notes', 'bookmarks', 'planProgress'];
      for (const storeName of stores) {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).clear();
      }
      localStorage.removeItem('jornada_desafio_365_progress');
    } catch (e) {
      console.error('Error clearing user data', e);
    }
  }

  // EXPORT ALL USER DATA FOR BACKUP
  async exportBackup(): Promise<string> {
    const notes = await this.getNotes();
    const highlights = await this.getHighlights();
    const bookmarks = await this.getBookmarks();
    const backupObj = {
      app: 'Jornada da Bíblia',
      exportedAt: new Date().toISOString(),
      notes,
      highlights,
      bookmarks,
    };
    return JSON.stringify(backupObj, null, 2);
  }
}

export const localDB = new LocalBibleDatabase();
