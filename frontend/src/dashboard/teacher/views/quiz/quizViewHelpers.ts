// Provides derived filtering, sorting, paging, and stats helpers for the quiz view.
import type { TeacherQuizStatsData } from "@/dashboard/teacher/components/quiz/TeacherQuizStats";
import type { TeacherQuiz } from "@/dashboard/teacher/components/quiz";
import type { QuizSort, QuizStatusFilter } from "@/dashboard/teacher/components/quiz/TeacherQuizControls";

export const DEFAULT_PAGE_SIZE = 6;

export function sortQuizzes(items: TeacherQuiz[], sort: QuizSort) {
  const next = [...items];
  const now = Date.now();
  if (sort === "all") return next.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  if (sort === "ongoing") return next.filter((quiz) => new Date(quiz.dueAt).getTime() >= now).sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime());
  return next.filter((quiz) => new Date(quiz.dueAt).getTime() < now).sort((a, b) => new Date(b.dueAt).getTime() - new Date(a.dueAt).getTime());
}

export function filterQuizzes(items: TeacherQuiz[], search: string, statusFilter: QuizStatusFilter) {
  const query = search.toLowerCase().trim();
  return items.filter((quiz) => (statusFilter === "all" || quiz.status === statusFilter) && (query.length === 0 || `${quiz.title} ${quiz.classLabel}`.toLowerCase().includes(query)));
}

export function getQuizStats(items: TeacherQuiz[]): TeacherQuizStatsData {
  const now = Date.now();
  const sevenDaysFromNow = now + 7 * 24 * 60 * 60 * 1000;
  return { total: items.length, published: items.filter((quiz) => quiz.status === "published").length, drafts: items.filter((quiz) => quiz.status === "draft").length, dueSoon: items.filter((quiz) => { const t = new Date(quiz.dueAt).getTime(); return Number.isFinite(t) && t >= now && t <= sevenDaysFromNow; }).length };
}

export function getPagedQuizzes(items: TeacherQuiz[], page: number, pageSize = DEFAULT_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = (page - 1) * pageSize;
  return { pagedQuizzes: items.slice(start, start + pageSize), totalPages };
}
