// Exposes read-only subject module selectors and the React subscription hook.
import { useSyncExternalStore } from "react";
import {
  getSubjectModulesSnapshot,
  subscribeToSubjectModules,
} from "./subjectModulesPersistence";

export function useSubjectModules(subjectId: string) {
  const snapshot = useSyncExternalStore(
    subscribeToSubjectModules,
    getSubjectModulesSnapshot,
    getSubjectModulesSnapshot
  );
  return snapshot[subjectId] ?? [];
}
