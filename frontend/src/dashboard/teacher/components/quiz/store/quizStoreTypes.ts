// Defines public quiz store helper types used by the UI and store modules.
import type { TeacherQuiz } from "../QuizTypes";

export interface QuizStatsSummary {
  total: number;
  drafts: number;
  published: number;
  totalQuestions: number;
  dueSoon: number;
}

export type CreateQuizInput = Omit<TeacherQuiz, "id" | "createdAt" | "difficulty" | "type"> &
  Partial<Pick<TeacherQuiz, "difficulty" | "type">> &
  Partial<Pick<TeacherQuiz, "createdAt">>;

export type UpdateQuizInput = Partial<Omit<TeacherQuiz, "id" | "createdAt">>;
