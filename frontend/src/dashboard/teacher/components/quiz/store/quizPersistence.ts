// Reads and writes persisted quiz data with seeded fallback behavior.
import { seedQuizzes2 } from "../QuizMock";
import type { TeacherQuiz } from "../QuizTypes";
import { cloneQuizzes, normalizeQuiz } from "./quizNormalizers";

const QUIZZES2_STORAGE_KEY = "teacher.quizzes2.v1";

function getStorage(): Storage | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    return null;
  }
}

function parseQuizzes(raw: string | null): TeacherQuiz[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map((item) => normalizeQuiz(item)).filter((item): item is TeacherQuiz => item !== null) : null;
  } catch {
    return null;
  }
}

function mergeSeedQuizzes(items: TeacherQuiz[]) {
  const existingIds = new Set(items.map((item) => item.id));
  const missingSeedQuizzes = seedQuizzes2.filter((item) => !existingIds.has(item.id));
  return missingSeedQuizzes.length > 0 ? [...items, ...cloneQuizzes(missingSeedQuizzes)] : items;
}

export function saveQuizzes2(items: TeacherQuiz[]): TeacherQuiz[] {
  const next = cloneQuizzes(items);
  const storage = getStorage();
  if (!storage) return next;
  try {
    storage.setItem(QUIZZES2_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore write failures and still return the intended state.
  }
  return next;
}

export function loadQuizzes2(): TeacherQuiz[] {
  const storage = getStorage();
  if (!storage) return cloneQuizzes(seedQuizzes2);
  const parsed = parseQuizzes(storage.getItem(QUIZZES2_STORAGE_KEY));
  if (parsed && parsed.length > 0) {
    const merged = mergeSeedQuizzes(parsed);
    const shouldResave = merged.length !== parsed.length || merged.some((item, index) => item.status !== parsed[index]?.status);
    if (shouldResave) saveQuizzes2(merged);
    return cloneQuizzes(merged);
  }
  const seeded = cloneQuizzes(seedQuizzes2);
  saveQuizzes2(seeded);
  return seeded;
}

export const loadQuiz = loadQuizzes2;
export const saveQuiz = saveQuizzes2;
