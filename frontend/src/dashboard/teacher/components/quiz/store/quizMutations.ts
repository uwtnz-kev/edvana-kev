// Applies persisted quiz mutations while preserving immutable results for callers.
import type { TeacherQuiz } from "../QuizTypes";
import { cloneQuiz } from "./quizNormalizers";
import { loadQuizzes2, saveQuizzes2 } from "./quizPersistence";
import type { CreateQuizInput, UpdateQuizInput } from "./quizStoreTypes";

function buildId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch {
    // Fall through to deterministic fallback.
  }
  return `q2-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createQuiz(data: CreateQuizInput): TeacherQuiz {
  const now = new Date().toISOString();
  // Defaults are filled here so create callers can provide partial draft data.
  const nextItem: TeacherQuiz = { ...data, difficulty: data.difficulty ?? "medium", type: data.type ?? "mcq", id: buildId(), createdAt: data.createdAt ?? now };
  saveQuizzes2([nextItem, ...loadQuizzes2()]);
  return cloneQuiz(nextItem);
}

export function updateQuiz(id: string, updates: UpdateQuizInput): TeacherQuiz | null {
  const items = loadQuizzes2();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const updated: TeacherQuiz = { ...items[index], ...updates, id: items[index].id, createdAt: items[index].createdAt };
  const next = [...items];
  next[index] = updated;
  saveQuizzes2(next);
  return cloneQuiz(updated);
}

export function deleteQuiz(id: string): boolean {
  const items = loadQuizzes2();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  saveQuizzes2(next);
  return true;
}

export function duplicateQuiz(id: string): TeacherQuiz | null {
  const items = loadQuizzes2();
  const source = items.find((item) => item.id === id);
  if (!source) return null;
  const duplicated: TeacherQuiz = { ...source, id: buildId(), title: `${source.title} (Copy)`, status: "draft", createdAt: new Date().toISOString() };
  saveQuizzes2([duplicated, ...items]);
  return cloneQuiz(duplicated);
}

export function publishQuiz(id: string): TeacherQuiz | null {
  return updateQuiz(id, { status: "published" });
}
