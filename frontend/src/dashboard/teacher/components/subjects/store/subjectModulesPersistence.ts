// Manages the persisted subject modules snapshot and subscription lifecycle.
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";
import { subjectModulesSeedData } from "./subjectModulesSeedData";
import { cloneSubjectModules } from "./subjectModulesFactories";
import type { SubjectModuleItem, SubjectSubmoduleItem } from "./subjectModulesTypes";

const SUBJECT_MODULES_STORAGE_KEY = "teacher.subjectModules.v1";

function cloneModuleList(modules: SubjectModuleItem[]) {
  return structuredClone(modules);
}

function normalizeSubmodule(input: unknown): SubjectSubmoduleItem | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Partial<SubjectSubmoduleItem>;
  if (typeof source.title !== "string" || typeof source.description !== "string") return null;
  return {
    id: typeof source.id === "string" && source.id.trim().length > 0 ? source.id : `submodule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: source.title,
    description: source.description,
    summary: typeof source.summary === "string" ? source.summary : source.description,
  };
}

function normalizeModule(input: unknown): SubjectModuleItem | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Partial<SubjectModuleItem>;
  if (typeof source.title !== "string" || typeof source.description !== "string") return null;
  const submodules = Array.isArray(source.submodules)
    ? source.submodules.map((item) => normalizeSubmodule(item)).filter((item): item is SubjectSubmoduleItem => item !== null)
    : [];

  return {
    id: typeof source.id === "string" && source.id.trim().length > 0 ? source.id : `module-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: source.title,
    description: source.description,
    status: source.status === "published" ? "published" : "draft",
    lessons: typeof source.lessons === "number" && Number.isFinite(source.lessons) && source.lessons >= 0 ? source.lessons : submodules.length,
    duration: typeof source.duration === "string" && source.duration.trim().length > 0 ? source.duration : "1 week",
    submodules,
  };
}

function parseStoredModules(raw: string | null): Record<string, SubjectModuleItem[]> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const entries = Object.entries(parsed as Record<string, unknown>).map(([subjectId, modules]) => [
      subjectId,
      Array.isArray(modules)
        ? modules.map((item) => normalizeModule(item)).filter((item): item is SubjectModuleItem => item !== null)
        : [],
    ]);
    return Object.fromEntries(entries);
  } catch {
    return null;
  }
}

function mergeSeedModules(current: Record<string, SubjectModuleItem[]>) {
  const merged = cloneSubjectModules(current);

  for (const [subjectId, seededModules] of Object.entries(subjectModulesSeedData)) {
    const existingModules = merged[subjectId] ?? [];
    const existingIds = new Set(existingModules.map((module) => module.id));
    const missingSeedModules = seededModules.filter((module) => !existingIds.has(module.id));
    merged[subjectId] = missingSeedModules.length > 0
      ? [...existingModules, ...cloneModuleList(missingSeedModules)]
      : existingModules;
  }

  return merged;
}

function saveSubjectModulesState(state: Record<string, SubjectModuleItem[]>) {
  writeStoredJson(SUBJECT_MODULES_STORAGE_KEY, cloneSubjectModules(state));
}

function loadSubjectModulesState() {
  const storage = getBrowserStorage();
  if (!storage) return cloneSubjectModules(subjectModulesSeedData);

  const parsed = parseStoredModules(storage.getItem(SUBJECT_MODULES_STORAGE_KEY));
  if (parsed) {
    const merged = mergeSeedModules(parsed);
    saveSubjectModulesState(merged);
    return cloneSubjectModules(merged);
  }

  const seeded = cloneSubjectModules(subjectModulesSeedData);
  saveSubjectModulesState(seeded);
  return seeded;
}

let moduleState: Record<string, SubjectModuleItem[]> = loadSubjectModulesState();
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function subscribeToSubjectModules(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSubjectModulesSnapshot() {
  return moduleState;
}

export function updateSubjectModulesState(
  updater: (current: Record<string, SubjectModuleItem[]>) => Record<string, SubjectModuleItem[]>
) {
  moduleState = updater(moduleState);
  saveSubjectModulesState(moduleState);
  emitChange();
}
