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

