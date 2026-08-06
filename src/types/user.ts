import { CustomReadingPlan } from './readingPlan';

export interface UserProgress {
  userId: string;
  chaptersReadCount: number;
  readChapters: string[]; // Format: 'GEN_1', 'MAT_5'
  activePlans: CustomReadingPlan[];
  planProgress: Record<string, number[]>; // planId -> completed day indexes
  desafioCompletedDays?: number[];
  monthlyDevotionalsCompletions?: Record<string, boolean>;
  monthlyDevotionalsJournals?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface UserBookmark {
  id: string;
  bookId: string;
  chapter: number;
  verse?: number;
  title?: string;
  note?: string;
  createdAt: string;
}

export interface UserHighlight {
  id: string;
  bookId: string;
  chapter: number;
  verse: number;
  color: string;
  createdAt: string;
}

export interface UserNote {
  id: string;
  bookId: string;
  chapter: number;
  verse?: number;
  content: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
