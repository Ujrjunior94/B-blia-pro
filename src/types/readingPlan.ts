export interface CustomPlanPassageRef {
  bookId: string;
  chapter: number;
  verses?: string;
}

export interface CustomPlanStage {
  id: string;
  bookId: string;
  bookName: string;
  totalChapters: number;
  durationDays: number;
  startDayOffset: number;
  endDayOffset: number;
}

export interface ReadingPlanDay {
  day: number;
  title: string;
  passages: CustomPlanPassageRef[];
  devotionalNote?: string;
}

export interface CustomReadingPlan {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  totalDurationDays: number;
  selectedBookIds: string[];
  stages: CustomPlanStage[];
  days: ReadingPlanDay[];
  completedDays: number[];
}
