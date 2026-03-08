// Provides formatting and badge helpers for the teacher assignment card.
import { getAssignmentStatusLabel } from "../assignmentStore";
import type { TeacherAssignment } from "../assignmentsTypes";

export function formatAssignmentDate(dateISO: string) {
  const date = new Date(dateISO);
  if (Number.isNaN(date.getTime())) return "No due date";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function getAssignmentStatusClass(status: TeacherAssignment["status"]) {
  if (status === "published") return "bg-teal-500/20 border-teal-500/30 text-teal-700";
  if (status === "archived") return "bg-red-400/20 border-red-400/30 text-red-700";
  return "bg-amber-400/20 border-amber-400/30 text-amber-700";
}

export function getAssignmentStatusChipLabel(status: TeacherAssignment["status"]) {
  return getAssignmentStatusLabel(status);
}
