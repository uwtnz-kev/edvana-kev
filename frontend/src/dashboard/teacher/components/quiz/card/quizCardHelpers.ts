// Provides formatting and badge helpers for the teacher quiz card.
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import type { TeacherQuiz } from "../QuizTypes";

export function formatQuizDate(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function getQuizStatusLabel(status: TeacherQuiz["status"]) {
  if (status === "published") return "Published";
  if (status === "closed") return "Closed";
  return "Draft";
}

export function getQuizStatusClass(status: TeacherQuiz["status"]) {
  return getAssessmentStatusBadgeClass(status);
}
