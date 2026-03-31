import { useSyncExternalStore } from "react";
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";

const EXAM_SUBMISSIONS_STORAGE_KEY = "student.examSubmissions.v1";

type ExamSubmissionRecord = {
  examId: string;
  submittedAt: string;
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function parseExamSubmissionRecords(raw: string | null): ExamSubmissionRecord[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is ExamSubmissionRecord => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Partial<ExamSubmissionRecord>;
      return typeof candidate.examId === "string" && typeof candidate.submittedAt === "string";
    });
  } catch {
    return [];
  }
}

export function loadExamSubmissionRecords() {
  const storage = getBrowserStorage();
  if (!storage) return [];
  return parseExamSubmissionRecords(storage.getItem(EXAM_SUBMISSIONS_STORAGE_KEY));
}

function saveExamSubmissionRecords(records: ExamSubmissionRecord[]) {
  writeStoredJson(EXAM_SUBMISSIONS_STORAGE_KEY, records);
  emitChange();
}

export function recordStudentExamSubmission(examId: string) {
  const normalizedExamId = examId.trim();
  if (!normalizedExamId) return null;

  const existing = loadExamSubmissionRecords();
  const duplicate = existing.find((record) => record.examId === normalizedExamId);
  if (duplicate) return duplicate;

  const nextRecord = {
    examId: normalizedExamId,
    submittedAt: new Date().toISOString(),
  } satisfies ExamSubmissionRecord;

  saveExamSubmissionRecords([...existing, nextRecord]);
  return nextRecord;
}

export function getStudentExamSubmissionCount(examId: string) {
  const normalizedExamId = examId.trim();
  if (!normalizedExamId) return 0;
  return loadExamSubmissionRecords().filter((record) => record.examId === normalizedExamId).length;
}

function subscribeToExamSubmissions(callback: () => void) {
  listeners.add(callback);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === EXAM_SUBMISSIONS_STORAGE_KEY) callback();
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

export function useTeacherExamSubmissionTotal(examId: string, baseCount: number) {
  return useSyncExternalStore(
    subscribeToExamSubmissions,
    () => baseCount + getStudentExamSubmissionCount(examId),
    () => baseCount,
  );
}
