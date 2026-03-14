// Provides formatting and badge helpers for the teacher assignment card.
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import { getAssignmentStatusLabel } from "../assignmentstore";
import type { TeacherAssignment } from "../AssignmentsTypes";

export function formatAssignmentDate(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function getAssignmentStatusClass(status: TeacherAssignment["status"]) {
  return getAssessmentStatusBadgeClass(status);
}

export function getAssignmentStatusChipLabel(status: TeacherAssignment["status"]) {
  return getAssignmentStatusLabel(status);
}
