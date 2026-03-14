// Exposes read-only quiz selectors and derived stats.
import type { TeacherQuiz } from "../QuizTypes";
import { cloneQuiz } from "./quizNormalizers";
import { loadQuizzes2 } from "./quizPersistence";
import type { QuizStatsSummary } from "./quizStoreTypes";

export function getQuizById(id: string): TeacherQuiz | null {
  const item = loadQuizzes2().find((entry) => entry.id === id);
  return item ? cloneQuiz(item) : null;
}

export function getQuizStats(): QuizStatsSummary {
  const items = loadQuizzes2();
  const now = Date.now();
  const sevenDaysFromNow = now + 7 * 24 * 60 * 60 * 1000;
  const dueSoon = items.filter((item) => {
    const due = new Date(item.dueAt).getTime();
    return Number.isFinite(due) && due >= now && due <= sevenDaysFromNow;
  }).length;
  return {
    total: items.length,
    drafts: items.filter((item) => item.status === "draft").length,
    published: items.filter((item) => item.status === "published").length,
    closed: items.filter((item) => item.status === "closed").length,
    totalQuestions: items.reduce((sum, item) => sum + item.totalQuestions, 0),
    dueSoon,
  };
}
