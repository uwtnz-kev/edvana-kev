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
  loadExamSubmissionRecords,
  loadExams,
  publishExam,
  recordStudentExamSubmission,
  republishExam,
  saveExams,
  updateExam,
  useTeacherExamSubmissionTotal,
} from "./store";
