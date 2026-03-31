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
  loadQuizSubmissionRecords,
  publishQuiz,
  recordStudentQuizSubmission,
  republishQuiz,
  saveQuiz,
  saveQuizzes2,
  updateQuiz,
  useTeacherQuizSubmissionTotal,
} from "./store";
