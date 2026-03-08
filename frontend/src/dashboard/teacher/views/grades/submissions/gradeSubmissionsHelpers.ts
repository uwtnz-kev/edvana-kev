// Provides labels and styling helpers for the grade submissions workspace.
import type {
  TeacherGradeSelectionType,
  TeacherSubmissionStatus,
} from "@/dashboard/teacher/components/grades";

export function isSelectionType(value: string): value is TeacherGradeSelectionType {
  return value === "quiz" || value === "assignment" || value === "exam";
}

export function toSubmissionTitle(value: TeacherGradeSelectionType | null) {
  if (value === "quiz") return "Quiz Submissions";
  if (value === "assignment") return "Assignment Submissions";
  if (value === "exam") return "Exam Submissions";
  return "Submissions";
}

export function toStatusClass(status: TeacherSubmissionStatus) {
  if (status === "graded") {
    return "bg-teal-500/20 border-teal-500/40 text-teal-800";
  }
  return "bg-white/20 border-white/30 text-white";
}
