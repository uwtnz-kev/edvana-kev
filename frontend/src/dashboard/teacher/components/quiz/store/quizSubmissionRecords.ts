import { useSyncExternalStore } from "react";
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";

const QUIZ_SUBMISSIONS_STORAGE_KEY = "student.quizSubmissions.v1";

type QuizSubmissionRecord = {
  quizId: string;
  submittedAt: string;
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function parseQuizSubmissionRecords(raw: string | null): QuizSubmissionRecord[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is QuizSubmissionRecord => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Partial<QuizSubmissionRecord>;
      return typeof candidate.quizId === "string" && typeof candidate.submittedAt === "string";
    });
  } catch {
    return [];
  }
}

export function loadQuizSubmissionRecords() {
  const storage = getBrowserStorage();
  if (!storage) return [];
  return parseQuizSubmissionRecords(storage.getItem(QUIZ_SUBMISSIONS_STORAGE_KEY));
}

function saveQuizSubmissionRecords(records: QuizSubmissionRecord[]) {
  writeStoredJson(QUIZ_SUBMISSIONS_STORAGE_KEY, records);
  emitChange();
}

export function recordStudentQuizSubmission(quizId: string) {
  const normalizedQuizId = quizId.trim();
  if (!normalizedQuizId) return null;

  const existing = loadQuizSubmissionRecords();
  const duplicate = existing.find((record) => record.quizId === normalizedQuizId);
  if (duplicate) return duplicate;

  const nextRecord = {
    quizId: normalizedQuizId,
    submittedAt: new Date().toISOString(),
  } satisfies QuizSubmissionRecord;

  saveQuizSubmissionRecords([...existing, nextRecord]);
  return nextRecord;
}

export function getStudentQuizSubmissionCount(quizId: string) {
  const normalizedQuizId = quizId.trim();
  if (!normalizedQuizId) return 0;
  return loadQuizSubmissionRecords().filter((record) => record.quizId === normalizedQuizId).length;
}

function subscribeToQuizSubmissions(callback: () => void) {
  listeners.add(callback);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === QUIZ_SUBMISSIONS_STORAGE_KEY) callback();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

export function useTeacherQuizSubmissionTotal(quizId: string, baseCount: number) {
  return useSyncExternalStore(
    subscribeToQuizSubmissions,
    () => baseCount + getStudentQuizSubmissionCount(quizId),
    () => baseCount,
  );
}
