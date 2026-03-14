// Provides derived filtering, sorting, paging, and stats helpers for the assignments view.
import type { TeacherAssignmentsStatsData } from "@/dashboard/teacher/components/assignments/TeacherAssignmentsStats";
import type { AssignmentStatusFilter, TeacherAssignment } from "@/dashboard/teacher/components/assignments";

export const ITEMS_PER_PAGE = 6;

function isAssignmentClosed(assignment: TeacherAssignment, now = Date.now()) {
  if (assignment.status === "closed") return true;
  if (assignment.status !== "published") return false;
  const dueAt = new Date(assignment.dueAt).getTime();
  return Number.isFinite(dueAt) && dueAt < now;
}

function isAssignmentOngoing(assignment: TeacherAssignment, now = Date.now()) {
  if (assignment.status !== "published") return false;
  const dueAt = new Date(assignment.dueAt).getTime();
  return !Number.isFinite(dueAt) || dueAt >= now;
}

export function sortAssignments(items: TeacherAssignment[]) {
  return [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function filterAssignments(items: TeacherAssignment[], search: string, statusFilter: AssignmentStatusFilter, now = Date.now()) {
  const query = search.toLowerCase().trim();
  return items.filter((assignment) => {
    const matchesStatus =
      statusFilter === "all"
      || (statusFilter === "ongoing" ? isAssignmentOngoing(assignment, now) : false)
      || (statusFilter === "closed" ? isAssignmentClosed(assignment, now) : assignment.status === statusFilter);
    return matchesStatus && (query.length === 0 || `${assignment.title} ${assignment.classLabel}`.toLowerCase().includes(query));
  });
}

export function getAssignmentsStats(items: TeacherAssignment[]): TeacherAssignmentsStatsData {
  return { total: items.length, published: items.filter((assignment) => assignment.status === "published").length, drafts: items.filter((assignment) => assignment.status === "draft").length, pendingToGrade: items.reduce((sum, assignment) => sum + assignment.pendingToGrade, 0) };
}

export function getPagedAssignments(items: TeacherAssignment[], page: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  return { pagedAssignments: items.slice(start, start + ITEMS_PER_PAGE), totalPages };
}
