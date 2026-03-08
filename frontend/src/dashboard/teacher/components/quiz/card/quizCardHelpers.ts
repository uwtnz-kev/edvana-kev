// Provides formatting and badge helpers for the teacher quiz card.
import type { TeacherQuiz } from "../QuizTypes";

export function formatQuizDate(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function getQuizStatusLabel(status: TeacherQuiz["status"]) {
  return status === "published" ? "Published" : "Draft";
}

export function getQuizStatusClass(status: TeacherQuiz["status"]) {
  return status === "published"
    ? "bg-teal-500/20 border-teal-500/30 text-teal-700"
    : "bg-amber-400/20 border-amber-400/30 text-amber-700";
}
