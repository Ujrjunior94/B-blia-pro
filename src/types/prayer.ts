export type PrayerCategory =
  | 'Família'
  | 'Saúde'
  | 'Vida Espiritual'
  | 'Trabalho & Estudos'
  | 'Gratidão & Louvor'
  | 'Intercessão';

export interface PrayerRequest {
  id: string;
  title: string;
  description?: string;
  category: PrayerCategory;
  isAnswered: boolean;
  answeredAt?: string;
  answerTestimony?: string;
  createdAt: string;
  updatedAt: string;
  bibleVerseRef?: string;
}
