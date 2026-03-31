import type { TeacherExam } from "./ExamsTypes";

export function isExamClosed(exam: Pick<TeacherExam, "status" | "scheduledAt">, now = Date.now()) {
  if (exam.status === "closed") return true;
  if (exam.status !== "published") return false;
  const closeAt = new Date(exam.scheduledAt).getTime();
  return Number.isFinite(closeAt) && closeAt <= now;
}

export function isExamPublished(exam: Pick<TeacherExam, "status" | "scheduledAt">, now = Date.now()) {
  return exam.status === "published" && !isExamClosed(exam, now);
}

export function getExamDerivedStatus(exam: Pick<TeacherExam, "status" | "scheduledAt">, now = Date.now()): TeacherExam["status"] {
  if (exam.status === "draft") return "draft";
  return isExamClosed(exam, now) ? "closed" : "published";
}

export function formatExamCloseDate(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No close date";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatExamCloseDateTime(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No close date";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
