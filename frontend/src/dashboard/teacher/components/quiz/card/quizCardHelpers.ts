// Provides formatting and badge helpers for the teacher quiz card.
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import type { TeacherQuiz } from "../QuizTypes";
import { formatQuizCloseDate, getQuizDerivedStatus } from "../quizStatus";

export function formatQuizDate(dateISO: string) {
  return formatQuizCloseDate(dateISO);
}

export function getQuizStatusLabel(status: TeacherQuiz["status"]) {
  if (status === "published") return "Published";
  if (status === "closed") return "Closed";
  return "Draft";
}

export function getQuizStatusClass(quiz: TeacherQuiz) {
  return getAssessmentStatusBadgeClass(getQuizDerivedStatus(quiz));
}

export function getQuizDerivedStatusLabel(quiz: TeacherQuiz) {
  return getQuizStatusLabel(getQuizDerivedStatus(quiz));
}
