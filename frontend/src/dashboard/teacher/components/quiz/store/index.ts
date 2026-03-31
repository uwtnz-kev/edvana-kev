// Combines the modular quiz store internals behind a single import surface.
export {
  loadQuiz,
  loadQuizzes2,
  saveQuiz,
  saveQuizzes2,
} from "./quizPersistence";
export {
  getQuizById,
  getQuizStats,
} from "./quizSelectors";
export {
  createQuiz,
  deleteQuiz,
  duplicateQuiz,
  publishQuiz,
  republishQuiz,
  updateQuiz,
} from "./quizMutations";
export {
  loadQuizSubmissionRecords,
  recordStudentQuizSubmission,
  useTeacherQuizSubmissionTotal,
} from "./quizSubmissionRecords";
