// Re-exports the modular exam store through the existing public import path.
export type {
  CreateExamInput,
  ExamStatsSummary,
  UpdateExamInput,
} from "./store/examStoreTypes";
export {
  createExam,
  deleteExam,
  duplicateExam,
  getExamById,
  getExamStats,
  loadExams,
  publishExam,
  saveExams,
  updateExam,
} from "./store";
