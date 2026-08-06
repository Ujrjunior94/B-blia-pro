/**
 * AI Cache Service (Módulo 9 - Cache)
 * Armazena temporariamente respostas repetidas da IA (estudos, planos, devocionais, imagens, chat)
 * para otimizar desempenho, economia de cota e tempo de resposta.
 */

interface CacheEntry<T> {
  timestamp: number;
  data: T;
  ttlMs: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();

const DEFAULT_TTL_MS = 1000 * 60 * 60 * 24; // 24 horas por padrão

export function getCacheKey(prefix: string, payload: Record<string, any>): string {
  const normalizedStr = JSON.stringify(payload, Object.keys(payload).sort());
  return `ai_cache_${prefix}_${normalizedStr}`;
}

export function getFromCache<T>(key: string): T | null {
  // 1. Check in-memory map
  const entry = memoryCache.get(key);
  const now = Date.now();

  if (entry) {
    if (now - entry.timestamp < entry.ttlMs) {
      return entry.data as T;
    } else {
      memoryCache.delete(key);
    }
  }

  // 2. Check LocalStorage fallback
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed: CacheEntry<T> = JSON.parse(stored);
        if (now - parsed.timestamp < parsed.ttlMs) {
          memoryCache.set(key, parsed);
          return parsed.data;
        } else {
          localStorage.removeItem(key);
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }

  return null;
}

export function setToCache<T>(key: string, data: T, ttlMs: number = DEFAULT_TTL_MS): void {
  const now = Date.now();
  const entry: CacheEntry<T> = { timestamp: now, data, ttlMs };

  memoryCache.set(key, entry);

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(key, JSON.stringify(entry));
    } catch {
      // Ignore localStorage write quota errors
    }
  }
}

export function clearAiCache(): void {
  memoryCache.clear();
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('ai_cache_')) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch {
      // Ignore
    }
  }
}
