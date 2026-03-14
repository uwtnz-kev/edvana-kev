// Exposes read-only assignment selectors and derived stats.
import type { TeacherAssignment } from "../AssignmentsTypes";
import { cloneAssignment } from "./assignmentNormalizers";
import { loadAssignments } from "./assignmentPersistence";
import type { AssignmentStatsSummary } from "./assignmentStoreTypes";

export function getAssignmentById(id: string): TeacherAssignment | null {
  const item = loadAssignments().find((entry) => entry.id === id);
  return item ? cloneAssignment(item) : null;
}

export function getAssignmentStats(): AssignmentStatsSummary {
  const items = loadAssignments();
  return {
    total: items.length,
    drafts: items.filter((item) => item.status === "draft").length,
    published: items.filter((item) => item.status === "published").length,
    closed: items.filter((item) => item.status === "closed").length,
    pendingToGrade: items.reduce((sum, item) => sum + item.pendingToGrade, 0),
    totalSubmissions: items.reduce((sum, item) => sum + item.totalSubmissions, 0),
  };
}

export function getAssignmentStatusLabel(status: TeacherAssignment["status"]) {
  if (status === "published") return "Published";
  if (status === "closed") return "Closed";
  return "Draft";
}
