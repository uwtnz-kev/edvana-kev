/** Provides labels and derived values for the not-submitted list view. */
import { getGradeTypeLabel } from "@/dashboard/teacher/views/grades/gradeTypeLabel";
import type { TeacherGradeSelectionType } from "@/dashboard/teacher/components/grades";

export function toTypeLabel(type: TeacherGradeSelectionType) {
  return getGradeTypeLabel(type);
}

// Keeps the row status text consistent with the current table output.
export function getNotSubmittedStatusLabel() {
  return "not submitted";
}
