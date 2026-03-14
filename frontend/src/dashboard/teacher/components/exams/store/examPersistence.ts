/** Reads and writes persisted exam data with seeded fallback behavior. */
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";
import { seedExams } from "../ExamsMock";
import type { TeacherExam } from "../ExamsTypes";
import { cloneExams, normalizeExam } from "./examNormalizers";

const EXAMS2_STORAGE_KEY = "teacher.exams.v1";

function parseExams(raw: string | null): TeacherExam[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map((item) => normalizeExam(item)).filter((item): item is TeacherExam => item !== null) : null;
  } catch {
    return null;
  }
}

function mergeSeedExams(items: TeacherExam[]) {
  const existingIds = new Set(items.map((item) => item.id));
  const missingSeedExams = seedExams.filter((item) => !existingIds.has(item.id));
  return missingSeedExams.length > 0 ? [...items, ...cloneExams(missingSeedExams)] : items;
}

export function saveExams(items: TeacherExam[]): TeacherExam[] {
  const next = cloneExams(items);
  writeStoredJson(EXAMS2_STORAGE_KEY, next);
  return next;
}

export function loadExams(): TeacherExam[] {
  const storage = getBrowserStorage();
  if (!storage) return cloneExams(seedExams);
  const parsed = parseExams(storage.getItem(EXAMS2_STORAGE_KEY));
  if (parsed && parsed.length > 0) {
    const merged = mergeSeedExams(parsed);
    const shouldResave = merged.length !== parsed.length || merged.some((item, index) => item.status !== parsed[index]?.status);
    if (shouldResave) saveExams(merged);
    return cloneExams(merged);
  }
  const seeded = cloneExams(seedExams);
  saveExams(seeded);
  return seeded;
}
