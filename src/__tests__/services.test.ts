import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { getBookById, BIBLE_BOOKS } from '../data/bibleBooks';
import { getLocalPrayers, addOrUpdatePrayer, togglePrayerAnswered } from '../services/prayerService';
import { saveHighlight, removeHighlight } from '../services/highlightService';
import { localDB } from '../utils/db';

describe('Bible Data Services', () => {
  it('should retrieve book by ID correctly', () => {
    const genesis = getBookById('GEN');
    expect(genesis).toBeDefined();
    expect(genesis?.name).toBe('Gênesis');
    expect(genesis?.totalChapters).toBe(50);
  });

  it('should find New Testament books correctly', () => {
    const matthew = getBookById('MAT');
    expect(matthew).toBeDefined();
    expect(matthew?.testament).toBe('NT');
  });

  it('should contain 66 canonical books in total', () => {
    expect(BIBLE_BOOKS.length).toBe(66);
  });
});

describe('Prayer Requests Local Storage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve prayer requests locally', async () => {
    const newPrayer = {
      id: 'p1',
      title: 'Oração pela Família',
      description: 'Paz e saúde no lar',
      category: 'Família' as const,
      isAnswered: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await addOrUpdatePrayer(newPrayer);
    const prayers = getLocalPrayers();
    expect(prayers.length).toBeGreaterThanOrEqual(1);
    const found = prayers.find(p => p.id === 'p1');
    expect(found?.title).toBe('Oração pela Família');
  });

  it('should toggle prayer answered state', async () => {
    const newPrayer = {
      id: 'p2',
      title: 'Aprovação no Exame',
      category: 'Trabalho & Estudos' as const,
      isAnswered: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await addOrUpdatePrayer(newPrayer);
    await togglePrayerAnswered('p2', true, 'Deus concedeu a benção');
    
    const prayers = getLocalPrayers();
    const found = prayers.find(p => p.id === 'p2');
    expect(found?.isAnswered).toBe(true);
    expect(found?.answerTestimony).toBe('Deus concedeu a benção');
  });
});

describe('Highlights Service with IndexedDB', () => {
  it('should save and remove highlight', async () => {
    const hl = {
      id: 'GEN-1-1',
      bookId: 'GEN',
      chapter: 1,
      verse: 1,
      color: 'bg-amber-200',
      createdAt: new Date().toISOString()
    };

    await saveHighlight(hl);
    let all = await localDB.getHighlights();
    expect(all.length).toBeGreaterThanOrEqual(1);

    await removeHighlight('GEN-1-1');
    all = await localDB.getHighlights();
    const found = all.find(h => h.id === 'GEN-1-1');
    expect(found).toBeUndefined();
  });
});
