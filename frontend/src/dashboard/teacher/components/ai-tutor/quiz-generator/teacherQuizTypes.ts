export type QuizType = "MCQ" | "Open" | "Mixed";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuizStatus = "draft" | "published";

export interface Question {
  id: string;
  type: "MCQ" | "Open";
  question: string;
  options?: string[];
  correctAnswer?: string;
}

export interface TeacherQuiz {
  id: string;
  title: string;
  subject: string;
  grade: string;
  type: QuizType;
  difficulty: Difficulty;
  totalQuestions: number;
  estimatedTime: number;
  createdAt: string;
  status: QuizStatus;
  questions: Question[];
  publishedTo?: string[];
}
