/**
 * QuizTypes
 * ---------
 * Defines types used by the teacher dashboard q ui z feature.
 */
export type QuizStatus = "draft" | "published";

export interface TeacherSubject2 {
  id: string;
  name: string;
}

export interface TeacherClass2 {
  id: string;
  label: string;
}

export type QuizAttachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

export type QuizDifficulty = "easy" | "medium" | "hard";

export type QuizType = "mcq" | "mixed" | "short_answer";

export interface TeacherQuiz {
  id: string;
  title: string;
  subject: string;
  classId: string;
  classLabel: string;
  dueAt: string;
  // durationMinutes is used by the student attempt timer to auto submit when time expires.
  durationMinutes: number;
  totalQuestions: number;
  difficulty: QuizDifficulty;
  type: QuizType;
  status: QuizStatus;
  createdAt: string;
  maxScore?: number;
  rubric?: string;
  instructions?: string;
  questionsText?: string;
  attachments?: QuizAttachment[];
}





