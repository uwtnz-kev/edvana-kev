// Exposes read-only exam selectors and derived stats.
import type { TeacherExam } from "../ExamsTypes";
import { cloneExam } from "./examNormalizers";
import { loadExams } from "./examPersistence";
import type { ExamStatsSummary } from "./examStoreTypes";

export function getExamById(id: string): TeacherExam | null {
  const item = loadExams().find((entry) => entry.id === id);
  return item ? cloneExam(item) : null;
}

export function getExamStats(): ExamStatsSummary {
  const items = loadExams();
  const now = Date.now();
  const sevenDaysFromNow = now + 7 * 24 * 60 * 60 * 1000;
  const scheduledSoon = items.filter((item) => {
    const scheduled = new Date(item.scheduledAt).getTime();
    return Number.isFinite(scheduled) && scheduled >= now && scheduled <= sevenDaysFromNow;
  }).length;
  return {
    total: items.length,
    drafts: items.filter((item) => item.status === "draft").length,
    published: items.filter((item) => item.status === "published").length,
    totalQuestions: items.reduce((sum, item) => sum + item.totalQuestions, 0),
    scheduledSoon,
  };
}
