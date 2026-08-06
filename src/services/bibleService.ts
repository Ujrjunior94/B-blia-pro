import { BibleBook, BibleVersion, BibleVersionCode, Verse } from '../types';
import { BIBLE_BOOKS, getBookById } from '../data/bibleBooks';
import { generateFallbackChapterVerses, SAMPLE_VERSES } from '../data/sampleBibleTexts';
import { localDB } from '../utils/db';

export const BIBLE_VERSIONS: BibleVersion[] = [
  {
    code: 'ARC',
    name: 'Almeida Revista e Corrigida',
    language: 'Português',
    description: 'Tradução clássica e venerada no Brasil, com linguagem solene e majestosa.',
  },
  {
    code: 'NAA',
    name: 'Nova Almeida Atualizada',
    language: 'Português',
    description: 'Revisão contemporânea da Almeida mantendo a fidelidade com linguagem clara.',
  },
  {
    code: 'NVI',
    name: 'Nova Versão Internacional',
    language: 'Português',
    description: 'Tradução dinâmica com excelente fluidez e clareza para a linguagem moderna.',
  },
  {
    code: 'INTERLINEAR',
    name: 'Interlinear Hebraico / Grego + Português',
    language: 'Original + Português',
    isOriginal: true,
    description: 'Texto original com transliteração, números de Strong e análise gramatical palavra por palavra.',
  },
];

export async function fetchChapterVerses(
  bookId: string,
  chapter: number,
  version: BibleVersionCode
): Promise<Verse[]> {
  const normalizedBookId = bookId.toUpperCase();
  const cacheKey = `${version}-${normalizedBookId}-${chapter}`;

  // 1. Check pre-bundled sample dataset first (fastest, guaranteed)
  if (SAMPLE_VERSES[cacheKey] && SAMPLE_VERSES[cacheKey].length > 0) {
    return SAMPLE_VERSES[cacheKey];
  }

  // 2. Check IndexedDB cached storage for offline reading
  try {
    const cached = await localDB.getCachedChapterVerses(version, normalizedBookId, chapter);
    if (cached && cached.length > 0) {
      return cached;
    }
  } catch (err) {
    console.warn('Error reading from IndexedDB:', err);
  }

  // 3. Attempt external open-source API fetch (e.g. bible-api.com) if online
  if (navigator.onLine && version !== 'INTERLINEAR') {
    try {
      const bookObj = getBookById(normalizedBookId);
      const bookNameForApi = bookObj ? bookObj.name : normalizedBookId;
      const apiRes = await fetch(`https://bible-api.com/${encodeURIComponent(bookNameForApi)}+${chapter}?translation=almeida`);
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.verses && Array.isArray(data.verses)) {
          const fetchedVerses: Verse[] = data.verses.map((v: any) => ({
            bookId: normalizedBookId,
            chapter,
            verse: v.verse,
            text: v.text.trim(),
          }));

          // Cache in IndexedDB for subsequent offline use!
          await localDB.cacheChapterVerses(version, normalizedBookId, chapter, fetchedVerses);
          return fetchedVerses;
        }
      }
    } catch (e) {
      console.warn('API fetch failed or offline, falling back to local dataset', e);
    }
  }

// 4. Fallback generated verses for complete continuous reading
  const fallback = generateFallbackChapterVerses(normalizedBookId, chapter, version);
  await localDB.cacheChapterVerses(version, normalizedBookId, chapter, fallback);
  return fallback;
}

export async function downloadFullVersionOffline(
  versionCode: string,
  onProgress?: (progressPct: number, currentChapterText: string) => void
): Promise<void> {
  let totalChapters = 0;
  BIBLE_BOOKS.forEach((b) => (totalChapters += b.totalChapters));
  let completedChapters = 0;

  for (const book of BIBLE_BOOKS) {
    for (let c = 1; c <= book.totalChapters; c++) {
      const existing = await localDB.getCachedChapterVerses(versionCode, book.id, c);
      if (!existing || existing.length === 0) {
        const verses = await fetchChapterVerses(book.id, c, versionCode as BibleVersionCode);
        await localDB.cacheChapterVerses(versionCode, book.id, c, verses);
      }
      completedChapters++;
      if (onProgress && (completedChapters % 5 === 0 || completedChapters === totalChapters)) {
        const pct = Math.round((completedChapters / totalChapters) * 100);
        onProgress(pct, `${book.name} cap. ${c} (${completedChapters}/${totalChapters})`);
      }
    }
  }
}

export function searchBibleVerses(query: string, version: BibleVersionCode): { book: BibleBook; chapter: number; verse: number; text: string }[] {
  if (!query || query.trim().length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const results: { book: BibleBook; chapter: number; verse: number; text: string }[] = [];

  // Search across pre-bundled sample texts first
  Object.keys(SAMPLE_VERSES).forEach((key) => {
    if (key.endsWith(`-${version}`)) {
      const verses = SAMPLE_VERSES[key];
      verses.forEach((v) => {
        if (v.text.toLowerCase().includes(normalizedQuery)) {
          const book = getBookById(v.bookId);
          if (book) {
            results.push({
              book,
              chapter: v.chapter,
              verse: v.verse,
              text: v.text,
            });
          }
        }
      });
    }
  });

  return results.slice(0, 50);
}
