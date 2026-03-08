// Provides small derived-label and route helpers for the grades workspace view.
import type { TeacherGradeSelectionType } from "@/dashboard/teacher/components/grades";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";

export function isSelectionType(value: string): value is TeacherGradeSelectionType {
  return value === "quiz" || value === "assignment" || value === "exam";
}

export function toWorkspaceTitle(value: TeacherGradeSelectionType | null) {
  if (value === "quiz") return "Quiz Grades";
  if (value === "assignment") return "Assignment Grades";
  if (value === "exam") return "Exam Grades";
  return "Grades";
}

export function toPublishedTitle(value: TeacherGradeSelectionType | null) {
  if (value === "quiz") return "Published Quizzes";
  if (value === "assignment") return "Published Assignments";
  if (value === "exam") return "Published Exams";
  return "Published Items";
}

export function isGradesLanding(pathname: string) {
  return pathname === TEACHER_ROUTES.GRADES;
}

export function isGradesWorkspace(pathname: string) {
  return pathname === TEACHER_ROUTES.GRADES_WORKSPACE;
}
