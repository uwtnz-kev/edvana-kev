// Provides derived filtering, sorting, paging, and stats helpers for the exams view.
import type { TeacherExamsStatsData } from "@/dashboard/teacher/components/exams/TeacherExamsStats";
import type { TeacherExam } from "@/dashboard/teacher/components/exams";
import type { ExamStatusFilter } from "@/dashboard/teacher/components/exams/TeacherExamsControls";
import { getExamDerivedStatus } from "@/dashboard/teacher/components/exams/examStatus";

export const DEFAULT_PAGE_SIZE = 6;

export function sortExams(items: TeacherExam[]) {
  return [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function filterExams(items: TeacherExam[], search: string, statusFilter: ExamStatusFilter) {
  const query = search.toLowerCase().trim();
  return items.filter((exam) => {
    const matchesStatus = statusFilter === "all" || getExamDerivedStatus(exam) === statusFilter;
    return matchesStatus && (query.length === 0 || `${exam.title} ${exam.classLabel}`.toLowerCase().includes(query));
  });
}

export function getExamsStats(items: TeacherExam[]): TeacherExamsStatsData {
  return {
    total: items.length,
    published: items.filter((exam) => getExamDerivedStatus(exam) === "published").length,
    drafts: items.filter((exam) => getExamDerivedStatus(exam) === "draft").length,
    closed: items.filter((exam) => getExamDerivedStatus(exam) === "closed").length,
  };
}

export function getPagedExams(items: TeacherExam[], page: number, pageSize = DEFAULT_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = (page - 1) * pageSize;
  return { pagedExams: items.slice(start, start + pageSize), totalPages };
}
