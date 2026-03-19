// Provides ids and factory helpers for new subject modules and submodules.
import type {
  SubjectModuleItem,
  SubjectModulePayload,
  SubjectSubmoduleDraft,
  SubjectSubmoduleItem,
} from "./subjectModulesTypes";

function buildId(prefix: string) {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return `${prefix}-${crypto.randomUUID()}`;
  } catch {
    // Fall back below.
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function sortSubmodulesByOrder<T extends { order: number }>(submodules: T[]) {
  return [...submodules].sort((left, right) => left.order - right.order);
}

export function sortModulesByOrder<T extends { order: number }>(modules: T[]) {
  return [...modules].sort((left, right) => left.order - right.order);
}

export function createSubjectSubmodule(submodule: SubjectSubmoduleDraft, order: number): SubjectSubmoduleItem {
  return {
    id: buildId("submodule"),
    title: submodule.title,
    description: submodule.description,
    content: submodule.content,
    attachedFileIds: submodule.attachedFileIds ?? [],
    summary: submodule.description,
    order,
  };
}

export function createSubjectModule(payload: SubjectModulePayload, order: number): SubjectModuleItem {
  const submodules = payload.submodules.map((submodule, index) => createSubjectSubmodule(submodule, index));
  return {
    id: buildId("module"),
    title: payload.title,
    description: payload.description,
    status: "draft",
    lessons: submodules.length || 0,
    duration: "1 week",
    order,
    attachedFileIds: payload.attachedFileIds ?? [],
    submodules,
  };
}

export function cloneSubjectModules(modules: Record<string, SubjectModuleItem[]>) {
  // Cloning prevents views from mutating the shared in-memory snapshot directly.
  return structuredClone(modules);
}
