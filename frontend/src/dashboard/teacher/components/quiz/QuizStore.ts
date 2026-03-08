// Re-exports the modular quiz store through the existing public import path.
export type {
  CreateQuizInput,
  QuizStatsSummary,
  UpdateQuizInput,
} from "./store/quizStoreTypes";
export {
  createQuiz,
  deleteQuiz,
  duplicateQuiz,
  getQuizById,
  getQuizStats,
  loadQuiz,
  loadQuizzes2,
  publishQuiz,
  saveQuiz,
  saveQuizzes2,
  updateQuiz,
} from "./store";
