// Applies persisted assignment mutations while preserving immutable results for callers.
import type { TeacherAssignment } from "../AssignmentsTypes";
import { cloneAssignment } from "./assignmentNormalizers";
import { loadAssignments, saveAssignments } from "./assignmentPersistence";
import type { CreateAssignmentInput, UpdateAssignmentInput } from "./assignmentStoreTypes";

function buildId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch {
    // Fall through to deterministic fallback.
  }
  return `a2-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createAssignment(data: CreateAssignmentInput): TeacherAssignment {
  const now = new Date().toISOString();
  const nextItem: TeacherAssignment = { ...data, id: buildId(), createdAt: data.createdAt ?? now };
  saveAssignments([nextItem, ...loadAssignments()]);
  return cloneAssignment(nextItem);
}

export function updateAssignment(id: string, updates: UpdateAssignmentInput): TeacherAssignment | null {
  const items = loadAssignments();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const updated: TeacherAssignment = { ...items[index], ...updates, id: items[index].id, createdAt: items[index].createdAt };
  const next = [...items];
  next[index] = updated;
  saveAssignments(next);
  return cloneAssignment(updated);
}

export function deleteAssignment(id: string): boolean {
  const items = loadAssignments();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  saveAssignments(next);
  return true;
}

export function duplicateAssignment(id: string): TeacherAssignment | null {
  const items = loadAssignments();
  const source = items.find((item) => item.id === id);
  if (!source) return null;
  const duplicated: TeacherAssignment = { ...source, id: buildId(), title: `${source.title} (Copy)`, status: "draft", createdAt: new Date().toISOString(), totalSubmissions: 0, pendingToGrade: 0 };
  saveAssignments([duplicated, ...items]);
  return cloneAssignment(duplicated);
}

export function publishAssignment(id: string): TeacherAssignment | null { return updateAssignment(id, { status: "published" }); }
export function archiveAssignment(id: string): TeacherAssignment | null { return updateAssignment(id, { status: "archived" }); }
