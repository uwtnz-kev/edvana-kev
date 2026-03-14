/** Provides derived labels and formatting for assignment preview content. */
import { getAssessmentStatusBadgeClass } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
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
  return getAssessmentStatusBadgeClass(status);
}

export function getAssignmentPreviewStatus(status: TeacherAssignment["status"]) {
  return getAssignmentStatusLabel(status);
}
