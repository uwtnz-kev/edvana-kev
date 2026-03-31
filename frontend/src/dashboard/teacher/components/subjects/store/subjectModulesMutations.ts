// Applies in-memory subject module updates for publish state and new modules.
import { createSubjectModule, sortModulesByOrder } from "./subjectModulesFactories";
import { updateSubjectModulesState } from "./subjectModulesPersistence";
import type { SubjectModuleItem, SubjectModulePayload } from "./subjectModulesTypes";

function getNextModuleOrder(modules: SubjectModuleItem[]) {
  return modules.reduce((highest, module) => Math.max(highest, module.order), -1) + 1;
}

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
  let nextModule: SubjectModuleItem | null = null;

  updateSubjectModulesState((current) => {
    const existingModules = current[subjectId] ?? [];
    nextModule = createSubjectModule(payload, getNextModuleOrder(existingModules));
    return {
      ...current,
      [subjectId]: sortModulesByOrder([...existingModules, nextModule]),
    };
  });

  return nextModule;
}

export function reorderSubjectModules(subjectId: string, orderedModuleIds: string[]) {
  updateSubjectModulesState((current) => {
    const existingModules = current[subjectId] ?? [];
    const modulesById = new Map(existingModules.map((module) => [module.id, module]));
    const orderedModules = orderedModuleIds
      .map((moduleId) => modulesById.get(moduleId) ?? null)
      .filter((module): module is SubjectModuleItem => module !== null);
    const remainingModules = existingModules.filter((module) => !orderedModuleIds.includes(module.id));

    return {
      ...current,
      [subjectId]: [...orderedModules, ...remainingModules].map((module, index) => ({
        ...module,
        order: index,
      })),
    };
  });
}

export function reorderSubjectSubmodules(subjectId: string, moduleId: string, orderedSubmoduleIds: string[]) {
  updateSubjectModulesState((current) => ({
    ...current,
    [subjectId]: (current[subjectId] ?? []).map((module) => {
      if (module.id !== moduleId) return module;
      const submodulesById = new Map(module.submodules.map((submodule) => [submodule.id, submodule]));
      const orderedSubmodules = orderedSubmoduleIds
        .map((submoduleId) => submodulesById.get(submoduleId) ?? null)
        .filter((submodule): submodule is SubjectModuleItem["submodules"][number] => submodule !== null);
      const remainingSubmodules = module.submodules.filter((submodule) => !orderedSubmoduleIds.includes(submodule.id));

      return {
        ...module,
        submodules: [...orderedSubmodules, ...remainingSubmodules].map((submodule, index) => ({
          ...submodule,
          order: index,
        })),
      };
    }),
  }));
}

export function deleteSubjectModule(subjectId: string, moduleId: string) {
  updateSubjectModulesState((current) => ({
    ...current,
    [subjectId]: (current[subjectId] ?? [])
      .filter((module) => module.id !== moduleId)
      .map((module, index) => ({ ...module, order: index })),
  }));
}

export function deleteSubjectSubmodule(subjectId: string, moduleId: string, submoduleId: string) {
  updateSubjectModulesState((current) => ({
    ...current,
    [subjectId]: (current[subjectId] ?? []).map((module) =>
      module.id === moduleId
        ? {
            ...module,
            submodules: module.submodules
              .filter((submodule) => submodule.id !== submoduleId)
              .map((submodule, index) => ({ ...submodule, order: index })),
          }
        : module
    ),
  }));
}
