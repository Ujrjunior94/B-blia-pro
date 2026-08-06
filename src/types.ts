export type Testament = 'AT' | 'NT';

export type BookCategory =
  | 'Pentateuco'
  | 'Históricos'
  | 'Poéticos e Sabedoria'
  | 'Profetas Maiores'
  | 'Profetas Menores'
  | 'Evangelhos'
  | 'Histórico NT'
  | 'Cartas Paulinas'
  | 'Cartas Gerais'
  | 'Revelação';

export type BibleVersionCode = 'ARC' | 'NAA' | 'NVI' | 'INTERLINEAR' | 'ORIGINAL';

export interface BibleVersion {
  code: BibleVersionCode;
  name: string;
  language: string;
  isOriginal?: boolean;
  description: string;
}

export interface BibleBook {
  id: string; // e.g., 'GEN', 'EXO', 'MAT', 'ROM'
  canonicalOrder: number;
  name: string;
  portugueseName: string;
  testament: Testament;
  category: BookCategory;
  totalChapters: number;
  abbreviation: string;
}

export interface OriginalWord {
  position: number;
  surfaceText: string; // Text in Hebrew or Greek script
  transliteration: string;
  strongNumber: string; // e.g. 'H7225' or 'G746'
  portugueseGloss: string;
  lemma: string;
  morphologyCode?: string;
  morphologyDescription?: string;
}

export interface Verse {
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
  originalWords?: OriginalWord[];
}

export interface StrongEntry {
  id: string; // e.g. 'H7225' or 'G746'
  originalWord: string;
  transliteration: string;
  pronunciation: string;
  definition: string;
  portugueseGloss: string;
  wordType: string; // e.g. 'Substantivo Feminino', 'Verbo', 'Adjetivo'
  occurrencesCount: number;
  biblicalCategory: string;
  keyVerseReference: string;
  detailedLexicon: string;
  testament: Testament;
  occurrencesSample?: { reference: string; textSnippet: string }[];
}

export interface CharacterInfo {
  name: string;
  role: string;
  description: string;
}

export interface BookOutlineItem {
  chapterRange: string;
  title: string;
  description: string;
}

export interface BookStudyGuide {
  bookId: string;
  bookName: string;
  traditionalAuthor: string;
  historicalPeriod: string;
  nameMeaning: string;
  centralTheme: string;
  keyWord: string;
  keyVerse: string;
  generalSummary: string;
  mainCharacters: CharacterInfo[];
  keyEventsAndOutline: BookOutlineItem[];
  theologicalPurposes: string[];
  ChristInTheBook: string; // Cristocentrismo
  practicalApplication: string[];
}

export interface UserHighlight {
  id: string;
  bookId: string;
  chapter: number;
  verse: number;
  color: string; // 'yellow' | 'green' | 'blue' | 'pink' | 'purple'
  createdAt: string;
}

export interface UserNote {
  id: string;
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserBookmark {
  id: string;
  bookId: string;
  chapter: number;
  verse: number;
  createdAt: string;
}

export interface ReadingPlanDay {
  day: number;
  title: string;
  passages: { bookId: string; chapter: number; verses?: string }[];
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  totalChapters: number;
  category: 'Anual' | 'Novo Testamento' | 'Sabedoria' | 'Evangelhos' | 'Cronológico';
  days: ReadingPlanDay[];
}

export interface CustomPlanStage {
  id: string;
  bookId: string;
  bookName: string;
  totalChapters: number;
  durationDays: number;
  targetDate?: string;
  startDayOffset: number;
  endDayOffset: number;
}

export interface CustomReadingPlan {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  targetEndDate?: string;
  totalDurationDays: number;
  selectedBookIds: string[];
  stages: CustomPlanStage[];
  days: ReadingPlanDay[];
  completedDays: number[];
}

export interface UserPlanProgress {
  planId: string;
  completedDays: number[];
  startDate: string;
  lastReadDate?: string;
}

export interface ReaderSettings {
  version: BibleVersionCode;
  fontSize: number; // e.g. 16, 18, 20, 22, 24
  fontFamily: 'serif' | 'sans' | 'mono';
  theme: 'light' | 'dark' | 'sepia' | 'parchment' | 'manuscript' | 'tora';
  lineHeight: 'normal' | 'relaxed' | 'loose';
  showVerseNumbers: boolean;
  interlinearMode?: boolean;
  autoPlayAudio?: boolean;
  continuousReading?: boolean;
  focusMode?: boolean;
  showStrong?: boolean;
  showInterlinear?: boolean;
  audioSpeed?: number;
}

export interface UserProgress {
  userId: string;
  chaptersReadCount: number;
  readChapters: string[];
  activePlans: string[];
  planProgress: { [planId: string]: number[] };
  desafioCompletedDays: number[];
  monthlyDevotionalsCompletions: { [key: string]: boolean };
  monthlyDevotionalsJournals: { [key: string]: string };
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  version: BibleVersionCode;
}
