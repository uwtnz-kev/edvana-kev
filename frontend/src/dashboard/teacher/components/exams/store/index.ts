// Combines the modular exam store internals behind a single import surface.
export { loadExams, saveExams } from "./examPersistence";
export { getExamById, getExamStats } from "./examSelectors";
export {
  createExam,
  deleteExam,
  duplicateExam,
  publishExam,
  republishExam,
  updateExam,
} from "./examMutations";
export {
  loadExamSubmissionRecords,
  recordStudentExamSubmission,
  useTeacherExamSubmissionTotal,
} from "./examSubmissionRecords";
