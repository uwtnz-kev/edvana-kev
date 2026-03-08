// Manages the in-memory subject modules snapshot and subscription lifecycle.
import { subjectModulesSeedData } from "./subjectModulesSeedData";
import { cloneSubjectModules } from "./subjectModulesFactories";
import type { SubjectModuleItem } from "./subjectModulesTypes";

let moduleState: Record<string, SubjectModuleItem[]> = cloneSubjectModules(subjectModulesSeedData);
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
  emitChange();
}
