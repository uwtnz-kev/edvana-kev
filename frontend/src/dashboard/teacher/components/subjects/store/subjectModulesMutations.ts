// Applies in-memory subject module updates for publish state and new modules.
import { createSubjectModule } from "./subjectModulesFactories";
import { updateSubjectModulesState } from "./subjectModulesPersistence";
import type { SubjectModuleItem, SubjectModulePayload } from "./subjectModulesTypes";

export function updateSubjectModuleStatus(
  subjectId: string,
  moduleId: string,
  status: SubjectModuleItem["status"]
) {
  updateSubjectModulesState((current) => ({
    ...current,
    [subjectId]: (current[subjectId] ?? []).map((module) =>
      module.id === moduleId ? { ...module, status } : module
    ),
  }));
}

export function addSubjectModule(subjectId: string, payload: SubjectModulePayload) {
  const nextModule = createSubjectModule(payload);
  updateSubjectModulesState((current) => ({
    ...current,
    [subjectId]: [...(current[subjectId] ?? []), nextModule],
  }));
  return nextModule;
}

export function deleteSubjectModule(subjectId: string, moduleId: string) {
  updateSubjectModulesState((current) => ({
    ...current,
    [subjectId]: (current[subjectId] ?? []).filter((module) => module.id !== moduleId),
  }));
}

export function deleteSubjectSubmodule(subjectId: string, moduleId: string, submoduleId: string) {
  updateSubjectModulesState((current) => ({
    ...current,
    [subjectId]: (current[subjectId] ?? []).map((module) =>
      module.id === moduleId
        ? {
            ...module,
            submodules: module.submodules.filter((submodule) => submodule.id !== submoduleId),
          }
        : module
    ),
  }));
}
