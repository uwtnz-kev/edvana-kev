// Manages the persisted subject modules snapshot and subscription lifecycle.
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";
import { subjectModulesSeedData } from "./subjectModulesSeedData";
import { cloneSubjectModules, sortModulesByOrder, sortSubmodulesByOrder } from "./subjectModulesFactories";
import type { SubjectModuleItem, SubjectSubmoduleItem } from "./subjectModulesTypes";

const SUBJECT_MODULES_STORAGE_KEY = "teacher.subjectModules.v1";

function cloneModuleList(modules: SubjectModuleItem[]) {
  return structuredClone(modules);
}

function normalizeSubmodule(input: unknown, index: number): SubjectSubmoduleItem | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Partial<SubjectSubmoduleItem>;
  if (typeof source.title !== "string" || typeof source.description !== "string") return null;
  return {
    id: typeof source.id === "string" && source.id.trim().length > 0 ? source.id : `submodule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: source.title,
    description: source.description,
    content: typeof source.content === "string" ? source.content : "",
    attachedFileIds: Array.isArray(source.attachedFileIds)
      ? source.attachedFileIds.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      : [],
    summary: typeof source.summary === "string" ? source.summary : source.description,
    order: typeof source.order === "number" && Number.isFinite(source.order) ? source.order : index,
  };
}

function normalizeModule(input: unknown, index: number): SubjectModuleItem | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Partial<SubjectModuleItem>;
  if (typeof source.title !== "string" || typeof source.description !== "string") return null;
  const submodules = Array.isArray(source.submodules)
    ? sortSubmodulesByOrder(source.submodules.map((item, submoduleIndex) => normalizeSubmodule(item, submoduleIndex)).filter((item): item is SubjectSubmoduleItem => item !== null))
    : [];

  return {
    id: typeof source.id === "string" && source.id.trim().length > 0 ? source.id : `module-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: source.title,
    description: source.description,
    status: source.status === "published" ? "published" : "draft",
    lessons: typeof source.lessons === "number" && Number.isFinite(source.lessons) && source.lessons >= 0 ? source.lessons : submodules.length,
    duration: typeof source.duration === "string" && source.duration.trim().length > 0 ? source.duration : "1 week",
    order: typeof source.order === "number" && Number.isFinite(source.order) ? source.order : index,
    attachedFileIds: Array.isArray(source.attachedFileIds)
      ? source.attachedFileIds.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      : [],
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
        ? sortModulesByOrder(modules.map((item, moduleIndex) => normalizeModule(item, moduleIndex)).filter((item): item is SubjectModuleItem => item !== null))
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
    merged[subjectId] = sortModulesByOrder(
      missingSeedModules.length > 0
        ? [...existingModules, ...cloneModuleList(missingSeedModules)]
        : existingModules
    );
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
