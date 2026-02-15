export interface Question {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'matching' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  competency: string;
  tags: string[];
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  subject: string;
  grade: string;
  questions: Question[];
  timeLimit: number; // in minutes
  totalPoints: number;
  passingScore: number;
  attempts: number;
  isActive: boolean;
  createdBy: number;
  createdAt: Date;
  dueDate?: Date;
}

export interface QuizAttempt {
  id: number;
  quizId: number;
  studentId: number;
  answers: Record<number, string | number>; // questionId -> answer
  score: number;
  percentage: number;
  timeSpent: number; // in minutes
  startedAt: Date;
  submittedAt: Date;
  isCompleted: boolean;
}

export interface QuizResult {
  attempt: QuizAttempt;
  quiz: Quiz;
  feedback: {
    questionId: number;
    isCorrect: boolean;
    studentAnswer: string | number;
    correctAnswer: string | number;
    explanation?: string;
    points: number;
  }[];
  recommendations?: string[];
}

export interface QuizStatistics {
  quizId: number;
  totalAttempts: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
  averageTimeSpent: number;
  questionStats: {
    questionId: number;
    correctAnswers: number;
    totalAnswers: number;
    difficulty: number; // calculated difficulty based on success rate
  }[];
}