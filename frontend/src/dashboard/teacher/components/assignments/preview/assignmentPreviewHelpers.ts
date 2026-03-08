/** Provides derived labels and formatting for assignment preview content. */
import { getAssignmentStatusLabel } from "../assignmentstore";
import type { TeacherAssignment } from "../AssignmentsTypes";

export function formatAssignmentDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "No due date";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Match the existing badge treatments for each assignment state.
export function getAssignmentStatusClass(status: TeacherAssignment["status"]) {
  if (status === "published") {
    return "bg-white/15 text-white border border-white/30";
  }

  if (status === "archived") {
    return "bg-slate-500/20 text-slate-200 border border-slate-400/30";
  }

  return "bg-white/10 text-white border border-white/25";
}

export function getAssignmentPreviewStatus(status: TeacherAssignment["status"]) {
  return getAssignmentStatusLabel(status);
}
