// Provides formatting and style helpers for the teacher exam card.
import type { TeacherExam } from "../ExamsTypes";

export function formatExamDate(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No schedule";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getExamStatusLabel(status: TeacherExam["status"]) {
  return status === "published" ? "Published" : "Draft";
}

export function getExamStatusChipClass(status: TeacherExam["status"]) {
  return status === "published"
    ? "bg-teal-500/20 border-teal-500/30 text-teal-700"
    : "bg-amber-400/20 border-amber-400/30 text-amber-700";
}
