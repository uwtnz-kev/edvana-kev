// Provides formatting and style helpers for the teacher exam card.
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import type { TeacherExam } from "../ExamsTypes";
import { formatExamCloseDate, getExamDerivedStatus } from "../examStatus";

export function formatExamDate(dateISO: string) {
  return formatExamCloseDate(dateISO);
}

export function getExamStatusLabel(status: TeacherExam["status"]) {
  if (status === "published") return "Published";
  if (status === "closed") return "Closed";
  return "Draft";
}

export function getExamStatusChipClass(exam: TeacherExam) {
  return getAssessmentStatusBadgeClass(getExamDerivedStatus(exam));
}

export function getExamDerivedStatusLabel(exam: TeacherExam) {
  return getExamStatusLabel(getExamDerivedStatus(exam));
}
