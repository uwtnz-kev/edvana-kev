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

export function createSubjectSubmodule(submodule: SubjectSubmoduleDraft): SubjectSubmoduleItem {
  return { id: buildId("submodule"), title: submodule.title, description: submodule.description, summary: submodule.description };
}

export function createSubjectModule(payload: SubjectModulePayload): SubjectModuleItem {
  const submodules = payload.submodules.map(createSubjectSubmodule);
  return { id: buildId("module"), title: payload.title, description: payload.description, status: "draft", lessons: submodules.length || 0, duration: "1 week", submodules };
}

export function cloneSubjectModules(modules: Record<string, SubjectModuleItem[]>) {
  // Cloning prevents views from mutating the shared in-memory snapshot directly.
  return structuredClone(modules);
}
