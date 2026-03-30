/**
 * index
 * -----
 * Provides barrel exports for the teacher dashboard s ha re d module.
 */
export { default as SegmentedTabs } from "./SegmentedTabs";
export { StatusBadge } from "./StatusBadge";
export { TeacherDatePicker, type TeacherDatePickerProps } from "./TeacherDatePicker";
export { TeacherDateTimePicker, type TeacherDateTimePickerProps } from "./TeacherDateTimePicker";
export {
  getSubjectTheme as getSubjectThemeById,
  getSubjectIdByName,
  getSubjectThemeFromName,
  type SubjectTheme,
} from "./subjectTheme";
export {
  DEFAULT_SUBJECT_ICON_THEME,
  DEFAULT_SUBJECT_THEME,
  SUBJECT_THEMES,
  getSubjectIconTheme,
  getSubjectTheme,
  getSubjectThemeById as getSubjectIconThemeById,
} from "./subjectIconTheme";
export {
  resolveAssignmentRules,
  type AssignmentAttemptContext,
  type AssignmentRules,
} from "./assessment/assignmentRules";
export {
  DEFAULT_FILE_TOO_LARGE_MESSAGE,
  DEFAULT_UNSUPPORTED_FILE_MESSAGE,
  DEFAULT_UPLOAD_ALLOWED_EXTENSIONS,
  DEFAULT_UPLOAD_MAX_FILE_SIZE_BYTES,
  validateUploadFile,
  type FileValidationResult,
  type UploadFileValidationOptions,
} from "./files/uploadFileValidation";
export {
  findDuplicateAssignmentFile,
  type AssignmentFileDuplicateCandidate,
  type DuplicateAssignmentFileMatch,
  type DuplicateAssignmentFileResult,
  type DuplicateAssignmentFileScope,
} from "./files/assignmentFileDuplicates";
export {
  findDuplicateAssignmentTitle,
  type AssignmentTitleDuplicateCandidate,
  type DuplicateAssignmentTitleMatch,
  type DuplicateAssignmentTitleResult,
  type DuplicateAssignmentTitleScope,
} from "./files/assignmentTitleDuplicates";

