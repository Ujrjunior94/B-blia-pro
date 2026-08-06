export * from './prayer';
export * from './readingPlan';
export * from './user';

export type BibleVersion = 'NVI' | 'ARA' | 'ARC' | 'KJV' | 'NAA' | 'NVT';

export interface BibleVerse {
  number: number;
  text: string;
  strongs?: {
    word: string;
    code: string;
    original: string;
    transliteration: string;
    gloss: string;
    grammar?: string;
  }[];
  greekHebrew?: {
    original: string;
    transliteration: string;
    gloss: string;
    code: string;
  }[];
}

export interface BibleChapter {
  bookId: string;
  chapterNumber: number;
  verses: BibleVerse[];
}

export interface BibleBookSummary {
  id: string; // 3-letter code: 'GEN', 'MAT'
  name: string;
  testament: 'AT' | 'NT';
  author: string;
  dateWritten: string;
  genre: string;
  totalChapters: number;
  keyVerse: string;
  mainTheme: string;
  historicalContext: string;
  outline: {
    sectionTitle: string;
    chapters: string;
  }[];
  theologicalHighlights: string[];
}

export interface Prophecy {
  id: string;
  title: string;
  category: string;
  oldTestamentRef: string;
  newTestamentRef: string;
  description: string;
  theologicalInsight: string;
}

export interface BibleCharacter {
  id: string;
  name: string;
  meaningName: string;
  testament: 'AT' | 'NT';
  mainRole: string;
  period: string;
  biography: string;
  keyVerses: string[];
  lessons: string[];
  relationships: {
    relation: string;
    name: string;
  }[];
}

export interface BibleMapLocation {
  id: string;
  name: string;
  modernName: string;
  region: string;
  testament: 'AT' | 'NT' | 'Ambos';
  description: string;
  keyEvents: {
    title: string;
    passageRef: string;
    description: string;
  }[];
  coordinates: {
    x: number;
    y: number;
  };
}

export interface TheologyTopic {
  id: string;
  title: string;
  category: 'Doutrina' | 'História' | 'Hermeneutica' | 'Vida Cristã';
  summary: string;
  keyVerses: string[];
  content: string;
}

export interface InteractiveCardData {
  id: string;
  title: string;
  verseRef: string;
  verseText: string;
  category: string;
  reflection: string;
  prayer: string;
  actionStep: string;
  themeColor: string;
  tags: string[];
}
