import { useState, useEffect, useCallback } from 'react';
import { BibleVersionCode, Verse } from '../types';
import { fetchChapterVerses } from '../services/bibleService';
import { localDB } from '../utils/db';

interface UseBibleDataResult {
  verses: Verse[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to centralize the fetching and loading of Bible text.
 * It checks IndexedDB and LocalStorage before loading to ensure the fastest
 * possible offline-first rendering.
 */
export function useBibleData(
  bookId: string,
  chapter: number,
  version: BibleVersionCode
): UseBibleDataResult {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (isMounted: boolean) => {
    setIsLoading(true);
    setError(null);

    try {
      // Direct fast-path check: Let's see if we have downloaded/installed versions or cached text directly
      const normalizedBookId = bookId.toUpperCase();
      
      // Let's check IndexedDB cache directly to verify if we can fetch instantly
      let localVerses: Verse[] = [];
      try {
        const cached = await localDB.getCachedChapterVerses(version, normalizedBookId, chapter);
        if (cached && cached.length > 0) {
          localVerses = cached;
        }
      } catch (dbErr) {
        console.warn('IndexedDB initial check failed in hook:', dbErr);
      }

      // Check if version is registered as downloaded/installed in localStorage
      const installedVersionsStr = localStorage.getItem('jornada_installed_versions');
      const installedVersions: string[] = installedVersionsStr ? JSON.parse(installedVersionsStr) : [];
      const isLocallyInstalled = installedVersions.includes(version);

      // If we found local verses, we can pre-populate the state to keep the experience instantaneous
      if (localVerses.length > 0 && isMounted) {
        setVerses(localVerses);
        // If it is completely local or we are offline, we can skip the remote network wait entirely
        if (isLocallyInstalled || !navigator.onLine) {
          setIsLoading(false);
          return;
        }
      }

      // Perform full loading process which handles fetching from sample dataset, offline DB, or remote API
      const data = await fetchChapterVerses(bookId, chapter, version);
      if (isMounted) {
        setVerses(data);
      }
    } catch (err: any) {
      console.error('Error in useBibleData hook:', err);
      if (isMounted) {
        setError(err.message || 'Erro ao carregar o texto bíblico.');
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  }, [bookId, chapter, version]);

  useEffect(() => {
    let isMounted = true;
    loadData(isMounted);

    return () => {
      isMounted = false;
    };
  }, [loadData]);

  const refetch = useCallback(async () => {
    await loadData(true);
  }, [loadData]);

  return {
    verses,
    isLoading,
    error,
    refetch,
  };
}
