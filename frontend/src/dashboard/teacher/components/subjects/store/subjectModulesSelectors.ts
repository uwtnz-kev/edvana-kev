// Exposes read-only subject module selectors and the React subscription hook.
import { useSyncExternalStore } from "react";
import {
  getSubjectModulesSnapshot,
  subscribeToSubjectModules,
} from "./subjectModulesPersistence";
import { sortModulesByOrder, sortSubmodulesByOrder } from "./subjectModulesFactories";

export function useSubjectModules(subjectId: string) {
  const snapshot = useSyncExternalStore(
    subscribeToSubjectModules,
    getSubjectModulesSnapshot,
    getSubjectModulesSnapshot
  );

  return sortModulesByOrder(snapshot[subjectId] ?? []).map((module) => ({
    ...module,
    submodules: sortSubmodulesByOrder(module.submodules),
  }));
}
