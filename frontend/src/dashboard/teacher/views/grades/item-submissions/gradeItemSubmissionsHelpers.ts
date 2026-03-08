/** Provides labels and styling helpers for the grade item submissions workspace. */
import { getGradeTypeLabel } from "@/dashboard/teacher/views/grades/gradeTypeLabel";
import type {
  TeacherGradeSelectionType,
  TeacherSubmissionStatus,
} from "@/dashboard/teacher/components/grades";

export function toTypeLabel(type: TeacherGradeSelectionType) {
  return getGradeTypeLabel(type);
}

export function toStatusClass(status: TeacherSubmissionStatus) {
  if (status === "graded") {
    return "bg-teal-500/20 border-teal-500/40 text-teal-800";
  }
  return "bg-white/20 border-white/30 text-white";
}
