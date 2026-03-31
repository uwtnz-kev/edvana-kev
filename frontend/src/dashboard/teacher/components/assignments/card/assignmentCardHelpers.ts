// Provides formatting and badge helpers for the teacher assignment card.
import { resolveAssignmentRules } from "@/dashboard/teacher/components/shared";
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import { getAssignmentStatusLabel } from "../assignmentstore";
import type { TeacherAssignment } from "../AssignmentsTypes";

export function formatAssignmentDate(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function getAssignmentStatusClass(assignment: TeacherAssignment) {
  const status = resolveAssignmentRules(assignment, Date.now()).derivedStatus;
  return getAssessmentStatusBadgeClass(status);
}

export function getAssignmentStatusChipLabel(assignment: TeacherAssignment) {
  const status = resolveAssignmentRules(assignment, Date.now()).derivedStatus;
  return getAssignmentStatusLabel(status);
}

export function getAssignmentDerivedStatus(assignment: TeacherAssignment) {
  return resolveAssignmentRules(assignment, Date.now()).derivedStatus;
}

