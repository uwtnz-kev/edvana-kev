// Re-exports the modular assignment store through the existing public import path.
export type {
  AssignmentStatsSummary,
  CreateAssignmentInput,
  UpdateAssignmentInput,
} from "./store/assignmentStoreTypes";
export {
  archiveAssignment,
  createAssignment,
  deleteAssignment,
  duplicateAssignment,
  getAssignmentById,
  getAssignmentStats,
  getAssignmentStatusLabel,
  loadAssignments,
  publishAssignment,
  saveAssignments,
  updateAssignment,
} from "./store";
