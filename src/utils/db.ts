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
      request.onerror = () => {
        this.dbPromise = null;
        reject(request.error);
      };
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
        req.onerror = (e) => {
          e.preventDefault();
          resolve([]);
        };
      });
    } catch {
      return [];
    }
  }

  async saveHighlight(highlight: UserHighlight): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('highlights', 'readwrite');
        const store = tx.objectStore('highlights');
        const req = store.put(highlight);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
        req.onerror = (e) => {
          e.preventDefault();
          reject(req.error);
        };
      });
    } catch (e) {
      console.error('Error saving highlight to IDB', e);
    }
  }

  async removeHighlight(id: string): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('highlights', 'readwrite');
        const store = tx.objectStore('highlights');
        const req = store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
        req.onerror = (e) => {
          e.preventDefault();
          reject(req.error);
        };
      });
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
        req.onerror = (e) => {
          e.preventDefault();
          resolve([]);
        };
      });
    } catch {
      return [];
    }
  }

  async saveNote(note: UserNote): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('notes', 'readwrite');
        const store = tx.objectStore('notes');
        const req = store.put(note);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
        req.onerror = (e) => {
          e.preventDefault();
          reject(req.error);
        };
      });
    } catch (e) {
      console.error('Error saving note', e);
    }
  }

  async deleteNote(id: string): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('notes', 'readwrite');
        const store = tx.objectStore('notes');
        const req = store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
        req.onerror = (e) => {
          e.preventDefault();
          reject(req.error);
        };
      });
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
        req.onerror = (e) => {
          e.preventDefault();
          resolve([]);
        };
      });
    } catch {
      return [];
    }
  }

  async saveBookmark(bookmark: UserBookmark): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('bookmarks', 'readwrite');
        const store = tx.objectStore('bookmarks');
        const req = store.put(bookmark);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
        req.onerror = (e) => {
          e.preventDefault();
          reject(req.error);
        };
      });
    } catch (e) {
      console.error('Error saving bookmark', e);
    }
  }

  async removeBookmark(id: string): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('bookmarks', 'readwrite');
        const store = tx.objectStore('bookmarks');
        const req = store.delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
        req.onerror = (e) => {
          e.preventDefault();
          reject(req.error);
        };
      });
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
      return new Promise((resolve, reject) => {
        const tx = db.transaction('planProgress', 'readwrite');
        const store = tx.objectStore('planProgress');
        const req = store.put(progress);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
        req.onerror = (e) => {
          e.preventDefault();
          reject(req.error);
        };
      });
    } catch (e) {
      console.error('Error saving plan progress', e);
    }
  }

  // --- CACHED VERSES FOR FULL OFFLINE USE ---
  async cacheChapterVerses(version: string, bookId: string, chapter: number, verses: Verse[]): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('verses', 'readwrite');
        const store = tx.objectStore('verses');
        verses.forEach((v) => {
          const key = `${version}-${bookId}-${chapter}-${v.verse}`;
          store.put({ id: key, version, bookId, chapter, verse: v.verse, verseObj: v });
        });
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
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
        req.onerror = (e) => {
          e.preventDefault();
          resolve(null);
        };
      });
    } catch {
      return null;
    }
  }

  async getCachedChapterCount(version: string): Promise<number> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('verses', 'readonly');
        const store = tx.objectStore('verses');
        const index = store.index('version_book_chap');
        // Count distinct chapters cached by counting entries
        const req = index.count(IDBKeyRange.bound([version, '', 0], [version, '\uffff', 9999]));
        req.onsuccess = () => resolve(req.result || 0);
        req.onerror = (e) => {
          e.preventDefault();
          resolve(0);
        };
      });
    } catch {
      return 0;
    }
  }

  async isVersionDownloaded(version: string): Promise<boolean> {
    const count = await this.getCachedChapterCount(version);
    return count > 50; // consider downloaded if significant chapters cached
  }

  async deleteCachedVersion(version: string): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('verses', 'readwrite');
        const store = tx.objectStore('verses');
        const index = store.index('version_book_chap');
        const req = index.openCursor(IDBKeyRange.bound([version, '', 0], [version, '\uffff', 9999]));
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
        req.onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          }
        };
        req.onerror = (e) => {
          e.preventDefault();
          reject(req.error);
        };
      });
    } catch (e) {
      console.error('Error deleting cached version', e);
    }
  }

  // CLEAR ALL USER DATA & PROGRESS FOR CLEAN SLATE
  async clearUserData(): Promise<void> {
    try {
      const db = await this.getDB();
      const stores = ['highlights', 'notes', 'bookmarks', 'planProgress'];
      for (const storeName of stores) {
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(storeName, 'readwrite');
          const store = tx.objectStore(storeName);
          const req = store.clear();
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
          tx.onabort = () => reject(new Error('Transaction aborted'));
          req.onerror = (e) => {
            e.preventDefault();
            reject(req.error);
          };
        });
      }
      localStorage.removeItem('jornada_desafio_365_progress');
      localStorage.removeItem('jornada_custom_reading_plans');
      localStorage.removeItem('jornada_user_settings');
      localStorage.removeItem('jornada_reading_streaks');
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
      desafio365: localStorage.getItem('jornada_desafio_365_progress'),
      customPlans: localStorage.getItem('jornada_custom_plans_v2'),
      installedVersions: localStorage.getItem('jornada_installed_versions'),
    };
    return JSON.stringify(backupObj, null, 2);
  }

  // IMPORT USER DATA FROM BACKUP JSON
  async importBackup(jsonString: string): Promise<{ success: boolean; notesCount: number; highlightsCount: number; bookmarksCount: number }> {
    try {
      const data = JSON.parse(jsonString);
      let notesCount = 0;
      let highlightsCount = 0;
      let bookmarksCount = 0;

      if (Array.isArray(data.notes)) {
        for (const note of data.notes) {
          if (note.id && (note.content || note.text)) {
            await this.saveNote(note);
            notesCount++;
          }
        }
      }

      if (Array.isArray(data.highlights)) {
        for (const hl of data.highlights) {
          if (hl.id && (hl.verseId || hl.verse)) {
            await this.saveHighlight(hl);
            highlightsCount++;
          }
        }
      }

      if (Array.isArray(data.bookmarks)) {
        for (const bm of data.bookmarks) {
          if (bm.id && (bm.bookId || bm.bookName)) {
            await this.saveBookmark(bm);
            bookmarksCount++;
          }
        }
      }

      if (data.desafio365) {
        localStorage.setItem('jornada_desafio_365_progress', typeof data.desafio365 === 'string' ? data.desafio365 : JSON.stringify(data.desafio365));
      }

      if (data.customPlans) {
        localStorage.setItem('jornada_custom_plans_v2', typeof data.customPlans === 'string' ? data.customPlans : JSON.stringify(data.customPlans));
      }

      return { success: true, notesCount, highlightsCount, bookmarksCount };
    } catch (err) {
      console.error('Error importing backup JSON:', err);
      throw new Error('Formato de arquivo JSON inválido ou corrompido.');
    }
  }

  // GRANULAR COUNTER RESETS
  resetReadingCounters(): void {
    localStorage.removeItem('jornada_desafio_365_progress');
    localStorage.removeItem('jornada_reading_streaks');
    localStorage.removeItem('jornada_custom_plans_v2');
    localStorage.removeItem('jornada_monthly_devotionals_v1');
    localStorage.removeItem('jornada_custom_reading_plans');
  }

  async resetNotesAndHighlights(): Promise<void> {
    const db = await this.getDB();
    const stores = ['highlights', 'notes', 'bookmarks'];
    for (const storeName of stores) {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(new Error('Transaction aborted'));
        req.onerror = (e) => {
          e.preventDefault();
          reject(req.error);
        };
      });
    }
  }
}

export const localDB = new LocalBibleDatabase();
