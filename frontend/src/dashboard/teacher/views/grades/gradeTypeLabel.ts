/** Provides a shared display label for teacher grade assessment types. */
import type { TeacherGradeSelectionType } from "@/dashboard/teacher/components/grades";

export function getGradeTypeLabel(type: TeacherGradeSelectionType) {
  if (type === "quiz") return "Quiz";
  if (type === "assignment") return "Assignment";
  return "Exam";
}
