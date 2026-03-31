import type { TeacherQuiz } from "./QuizTypes";

export function isQuizClosed(quiz: Pick<TeacherQuiz, "status" | "dueAt">, now = Date.now()) {
  if (quiz.status === "closed") return true;
  if (quiz.status !== "published") return false;
  const closeAt = new Date(quiz.dueAt).getTime();
  return Number.isFinite(closeAt) && closeAt <= now;
}

export function isQuizPublished(quiz: Pick<TeacherQuiz, "status" | "dueAt">, now = Date.now()) {
  return quiz.status === "published" && !isQuizClosed(quiz, now);
}

export function getQuizDerivedStatus(quiz: Pick<TeacherQuiz, "status" | "dueAt">, now = Date.now()): TeacherQuiz["status"] {
  if (quiz.status === "draft") return "draft";
  return isQuizClosed(quiz, now) ? "closed" : "published";
}

export function formatQuizCloseDate(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatQuizCloseDateTime(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
