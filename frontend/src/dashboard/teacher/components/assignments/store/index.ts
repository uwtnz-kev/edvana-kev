// Combines the modular assignment store internals behind a single import surface.
export { loadAssignments, saveAssignments } from "./assignmentPersistence";
export {
  getAssignmentById,
  getAssignmentStats,
  getAssignmentStatusLabel,
} from "./assignmentSelectors";
export {
  archiveAssignment,
  closeAssignment,
  createAssignment,
  deleteAssignment,
  duplicateAssignment,
  publishAssignment,
  updateAssignment,
} from "./assignmentMutations";
