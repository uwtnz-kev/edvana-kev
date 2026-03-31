// Applies persisted exam mutations while preserving immutable results for callers.
import type { RepublishAssignmentPayload } from "@/dashboard/teacher/components/assignments/republish/republishTypes";
import type { TeacherExam } from "../ExamsTypes";
import { cloneExam } from "./examNormalizers";
import { loadExams, saveExams } from "./examPersistence";
import type { CreateExamInput, UpdateExamInput } from "./examStoreTypes";

function buildId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch {
    // Fall through to deterministic fallback.
  }
  return `e2-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createExam(data: CreateExamInput): TeacherExam {
  const now = new Date().toISOString();
  const nextItem: TeacherExam = { ...data, id: buildId(), createdAt: data.createdAt ?? now };
  saveExams([nextItem, ...loadExams()]);
  return cloneExam(nextItem);
}

export function updateExam(id: string, updates: UpdateExamInput): TeacherExam | null {
  const items = loadExams();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const updated: TeacherExam = { ...items[index], ...updates, id: items[index].id, createdAt: items[index].createdAt };
  const next = [...items];
  next[index] = updated;
  saveExams(next);
  return cloneExam(updated);
}

export function deleteExam(id: string): boolean {
  const items = loadExams();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  saveExams(next);
  return true;
}

export function duplicateExam(id: string): TeacherExam | null {
  const items = loadExams();
  const source = items.find((item) => item.id === id);
  if (!source) return null;
  const duplicated: TeacherExam = { ...source, id: buildId(), title: `${source.title} (Copy)`, status: "draft", createdAt: new Date().toISOString() };
  saveExams([duplicated, ...items]);
  return cloneExam(duplicated);
}

export function publishExam(id: string): TeacherExam | null { return updateExam(id, { status: "published" }); }
export function republishExam(id: string, payload: RepublishAssignmentPayload): TeacherExam | null {
  return updateExam(id, {
    status: "published",
    scheduledAt: payload.closesAt,
  });
}
