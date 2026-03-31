import { useSyncExternalStore } from "react";
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";

const ASSIGNMENT_SUBMISSIONS_STORAGE_KEY = "student.assignmentSubmissions.v1";

type AssignmentSubmissionRecord = {
  assignmentId: string;
  submittedAt: string;
};

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function parseAssignmentSubmissionRecords(raw: string | null): AssignmentSubmissionRecord[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is AssignmentSubmissionRecord => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Partial<AssignmentSubmissionRecord>;
      return typeof candidate.assignmentId === "string" && typeof candidate.submittedAt === "string";
    });
  } catch {
    return [];
  }
}

export function loadAssignmentSubmissionRecords() {
  const storage = getBrowserStorage();
  if (!storage) return [];
  return parseAssignmentSubmissionRecords(storage.getItem(ASSIGNMENT_SUBMISSIONS_STORAGE_KEY));
}

function saveAssignmentSubmissionRecords(records: AssignmentSubmissionRecord[]) {
  writeStoredJson(ASSIGNMENT_SUBMISSIONS_STORAGE_KEY, records);
  emitChange();
}

export function recordStudentAssignmentSubmission(assignmentId: string) {
  const normalizedAssignmentId = assignmentId.trim();
  if (!normalizedAssignmentId) return null;

  const existing = loadAssignmentSubmissionRecords();
  const duplicate = existing.find((record) => record.assignmentId === normalizedAssignmentId);
  if (duplicate) return duplicate;

  const nextRecord = {
    assignmentId: normalizedAssignmentId,
    submittedAt: new Date().toISOString(),
  } satisfies AssignmentSubmissionRecord;

  saveAssignmentSubmissionRecords([...existing, nextRecord]);
  return nextRecord;
}

export function getStudentAssignmentSubmissionCount(assignmentId: string) {
  const normalizedAssignmentId = assignmentId.trim();
  if (!normalizedAssignmentId) return 0;
  return loadAssignmentSubmissionRecords().filter((record) => record.assignmentId === normalizedAssignmentId).length;
}

export function hasStudentSubmittedAssignment(assignmentId: string) {
  return getStudentAssignmentSubmissionCount(assignmentId) > 0;
}

function subscribeToAssignmentSubmissions(callback: () => void) {
  listeners.add(callback);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === ASSIGNMENT_SUBMISSIONS_STORAGE_KEY) callback();
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

export function useTeacherAssignmentSubmissionTotal(assignmentId: string, baseCount: number) {
  return useSyncExternalStore(
    subscribeToAssignmentSubmissions,
    () => baseCount + getStudentAssignmentSubmissionCount(assignmentId),
    () => baseCount,
  );
}

export function useStudentAssignmentSubmissionState(assignmentId?: string) {
  return useSyncExternalStore(
    subscribeToAssignmentSubmissions,
    () => (assignmentId ? hasStudentSubmittedAssignment(assignmentId) : false),
    () => false,
  );
}
