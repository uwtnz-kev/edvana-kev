/** Reads and writes persisted assignment data with seeded fallback behavior. */
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";
import { seedAssignments } from "../AssignmentsMock";
import type { TeacherAssignment } from "../AssignmentsTypes";
import { cloneAssignments, normalizeAssignment } from "./assignmentNormalizers";

const ASSIGNMENTS2_STORAGE_KEY = "teacher.assignments.v1";

function parseAssignments(raw: string | null): TeacherAssignment[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map((item) => normalizeAssignment(item)).filter((item): item is TeacherAssignment => item !== null) : null;
  } catch {
    return null;
  }
}

function mergeSeedAssignments(items: TeacherAssignment[]) {
  const existingIds = new Set(items.map((item) => item.id));
  const missingSeedAssignments = seedAssignments.filter((item) => !existingIds.has(item.id));
  return missingSeedAssignments.length > 0 ? [...items, ...cloneAssignments(missingSeedAssignments)] : items;
}

export function saveAssignments(items: TeacherAssignment[]): TeacherAssignment[] {
  const next = cloneAssignments(items);
  writeStoredJson(ASSIGNMENTS2_STORAGE_KEY, next);
  return next;
}

export function loadAssignments(): TeacherAssignment[] {
  const storage = getBrowserStorage();
  if (!storage) return cloneAssignments(seedAssignments);
  const parsed = parseAssignments(storage.getItem(ASSIGNMENTS2_STORAGE_KEY));
  if (parsed && parsed.length > 0) {
    const merged = mergeSeedAssignments(parsed);
    const shouldResave = merged.length !== parsed.length || merged.some((item, index) => item.status !== parsed[index]?.status);
    if (shouldResave) saveAssignments(merged);
    return cloneAssignments(merged);
  }
  const seeded = cloneAssignments(seedAssignments);
  saveAssignments(seeded);
  return seeded;
}
