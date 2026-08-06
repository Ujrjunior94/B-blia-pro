import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  PROMPT_LIBRARY,
  getPromptsByCategory,
  getCacheKey,
  getFromCache,
  setToCache,
  clearAiCache,
  getUserAiPreferences,
  saveUserAiPreferences
} from '../services/ai';

describe('AI Central - Prompts Library (Módulo 7)', () => {
  it('should contain prompts for all 10 required categories', () => {
    const categories = [
      'estudo',
      'devocional',
      'oracao',
      'plano',
      'sermao',
      'discipulado',
      'criancas',
      'jovens',
      'familia',
      'lideranca',
    ];

    categories.forEach((cat) => {
      const prompts = getPromptsByCategory(cat as any);
      expect(prompts.length).toBeGreaterThan(0);
      expect(prompts[0].category).toBe(cat);
    });
  });

  it('should correctly filter prompts by category', () => {
    const estudioPrompts = getPromptsByCategory('estudo');
    expect(estudioPrompts.every((p) => p.category === 'estudo')).toBe(true);
  });
});

describe('AI Central - Cache System (Módulo 9)', () => {
  beforeEach(() => {
    clearAiCache();
    localStorage.clear();
  });

  it('should generate consistent cache keys', () => {
    const key1 = getCacheKey('study', { tema: 'Graça', nivel: 'Intermediário' });
    const key2 = getCacheKey('study', { nivel: 'Intermediário', tema: 'Graça' });
    expect(key1).toBe(key2);
  });

  it('should store and retrieve data from cache before TTL expires', () => {
    const key = getCacheKey('test', { id: 123 });
    const dummyData = { title: 'Estudo Teste', content: 'Conteúdo do estudo' };

    setToCache(key, dummyData, 10000);
    const cached = getFromCache<typeof dummyData>(key);

    expect(cached).toBeDefined();
    expect(cached?.title).toBe('Estudo Teste');
  });

  it('should return null when cache key expires', () => {
    const key = getCacheKey('test_exp', { id: 456 });
    const dummyData = { expired: true };

    setToCache(key, dummyData, -100); // Expired immediately
    const cached = getFromCache<typeof dummyData>(key);

    expect(cached).toBeNull();
  });
});

describe('AI Central - User Preferences & Memory (Módulo 8)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve user preferences locally when offline', async () => {
    const prefs = {
      userLevel: 'Avançado' as const,
      studyDuration: '20 min',
      preferredTranslation: 'NVI',
      favoriteTopics: ['Escatologia', 'Salvação'],
    };

    await saveUserAiPreferences(prefs);
    const retrieved = await getUserAiPreferences();

    expect(retrieved.userLevel).toBe('Avançado');
    expect(retrieved.studyDuration).toBe('20 min');
  });
});
