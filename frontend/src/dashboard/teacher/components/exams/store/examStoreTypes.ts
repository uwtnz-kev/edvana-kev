// Defines public exam store helper types used by the UI and store modules.
import type { TeacherExam } from "../ExamsTypes";

export interface ExamStatsSummary {
  total: number;
  drafts: number;
  published: number;
  closed: number;
  totalQuestions: number;
  scheduledSoon: number;
}

export type CreateExamInput = Omit<TeacherExam, "id" | "createdAt"> &
  Partial<Pick<TeacherExam, "createdAt">>;

export type UpdateExamInput = Partial<Omit<TeacherExam, "id" | "createdAt">>;
