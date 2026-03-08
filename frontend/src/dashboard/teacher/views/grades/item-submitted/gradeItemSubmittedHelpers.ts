/** Provides labels and display formatting for the submitted list view. */
import { getGradeTypeLabel } from "@/dashboard/teacher/views/grades/gradeTypeLabel";
import type {
  TeacherGradeSelectionType,
  TeacherGradeSubmission,
} from "@/dashboard/teacher/components/grades";

export function toTypeLabel(type: TeacherGradeSelectionType) {
  return getGradeTypeLabel(type);
}

// Unscored submissions keep the existing dash placeholder.
export function formatSubmissionScore(submission: TeacherGradeSubmission) {
  if (typeof submission.score !== "number") return "-";
  return `${submission.score}/${submission.maxScore}`;
}
