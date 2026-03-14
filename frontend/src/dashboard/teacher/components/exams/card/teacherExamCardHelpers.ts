// Provides formatting and style helpers for the teacher exam card.
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
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
  if (status === "published") return "Published";
  if (status === "closed") return "Closed";
  return "Draft";
}

export function getExamStatusChipClass(status: TeacherExam["status"]) {
  return getAssessmentStatusBadgeClass(status);
}
