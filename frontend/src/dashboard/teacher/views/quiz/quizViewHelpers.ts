// Provides derived filtering, sorting, paging, and stats helpers for the quiz view.
import type { TeacherQuizStatsData } from "@/dashboard/teacher/components/quiz/TeacherQuizStats";
import type { TeacherQuiz } from "@/dashboard/teacher/components/quiz";
import type { QuizStatusFilter } from "@/dashboard/teacher/components/quiz/TeacherQuizControls";
import { getQuizDerivedStatus } from "@/dashboard/teacher/components/quiz/quizStatus";

export const DEFAULT_PAGE_SIZE = 6;

export function sortQuizzes(items: TeacherQuiz[]) {
  return [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function filterQuizzes(items: TeacherQuiz[], search: string, statusFilter: QuizStatusFilter) {
  const query = search.toLowerCase().trim();
  return items.filter((quiz) => {
    const matchesStatus = statusFilter === "all" || getQuizDerivedStatus(quiz) === statusFilter;
    return matchesStatus && (query.length === 0 || `${quiz.title} ${quiz.classLabel}`.toLowerCase().includes(query));
  });
}

export function getQuizStats(items: TeacherQuiz[]): TeacherQuizStatsData {
  return {
    total: items.length,
    published: items.filter((quiz) => getQuizDerivedStatus(quiz) === "published").length,
    drafts: items.filter((quiz) => getQuizDerivedStatus(quiz) === "draft").length,
    closed: items.filter((quiz) => getQuizDerivedStatus(quiz) === "closed").length,
  };
}

export function getPagedQuizzes(items: TeacherQuiz[], page: number, pageSize = DEFAULT_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = (page - 1) * pageSize;
  return { pagedQuizzes: items.slice(start, start + pageSize), totalPages };
}
