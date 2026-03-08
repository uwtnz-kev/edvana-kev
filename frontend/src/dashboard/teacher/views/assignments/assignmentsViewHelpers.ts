// Provides derived filtering, sorting, paging, and stats helpers for the assignments view.
import type { TeacherAssignmentsStatsData } from "@/dashboard/teacher/components/assignments/TeacherAssignmentsStats";
import type { AssignmentStatusFilter, TeacherAssignment } from "@/dashboard/teacher/components/assignments";
import type { AssignmentSort } from "@/dashboard/teacher/components/assignments/TeacherAssignmentsControls";

export const ITEMS_PER_PAGE = 6;

export function sortAssignments(items: TeacherAssignment[], sort: AssignmentSort) {
  const next = [...items];
  const now = new Date();
  if (sort === "all") return next.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  if (sort === "ongoing") return next.filter((assignment) => new Date(assignment.dueAt) >= now).sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());
  return next.filter((assignment) => new Date(assignment.dueAt) < now).sort((a, b) => new Date(b.dueAt).getTime() - new Date(a.dueAt).getTime());
}

export function filterAssignments(items: TeacherAssignment[], search: string, statusFilter: AssignmentStatusFilter) {
  const query = search.toLowerCase().trim();
  return items.filter((assignment) => (statusFilter === "all" || assignment.status === statusFilter) && (query.length === 0 || `${assignment.title} ${assignment.classLabel}`.toLowerCase().includes(query)));
}

export function getAssignmentsStats(items: TeacherAssignment[]): TeacherAssignmentsStatsData {
  return { total: items.length, published: items.filter((assignment) => assignment.status === "published").length, drafts: items.filter((assignment) => assignment.status === "draft").length, pendingToGrade: items.reduce((sum, assignment) => sum + assignment.pendingToGrade, 0) };
}

export function getPagedAssignments(items: TeacherAssignment[], page: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  return { pagedAssignments: items.slice(start, start + ITEMS_PER_PAGE), totalPages };
}
