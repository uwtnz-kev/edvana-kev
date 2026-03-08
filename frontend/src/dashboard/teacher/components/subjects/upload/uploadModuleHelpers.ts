// Provides draft, subject, and navigation helpers for the upload module workflow.
import { seedSubjects2 } from "@/dashboard/teacher/components/assignments";
import { addSubjectModule } from "@/dashboard/teacher/components/subjects/subjectModulesStore";
import type { SubjectUploadRouteState, SubmoduleDraft } from "./uploadModuleTypes";

export function getSubjectName(subjectId: string, state: SubjectUploadRouteState | null) {
  return state?.subject?.name ?? seedSubjects2.find((item) => item.id === subjectId)?.name ?? "Subject";
}

export function getSubjectTitle(subjectId: string, state: SubjectUploadRouteState | null) {
  return state?.subject?.title ?? getSubjectName(subjectId, state);
}

// Generates stable-enough client ids for repeated submodule draft rows.
export function buildSubmoduleId() {
  return `submodule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createEmptySubmodule(): SubmoduleDraft {
  return { id: buildSubmoduleId(), title: "", description: "" };
}

export function isSubmoduleBlank(submodule: SubmoduleDraft) {
  return submodule.title.trim().length === 0 && submodule.description.trim().length === 0;
}

// Creates the module in the store and returns the route payload used by the page redirect.
export function saveSubjectModule(
  subjectId: string,
  fileName: string,
  moduleTitle: string,
  description: string,
  submodules: SubmoduleDraft[]
) {
  const nonBlankSubmodules = submodules.filter((submodule) => !isSubmoduleBlank(submodule));
  addSubjectModule(subjectId, {
    title: moduleTitle.trim(),
    description: description.trim(),
    fileName,
    submodules: nonBlankSubmodules.map((submodule) => ({
      title: submodule.title.trim(),
      description: submodule.description.trim(),
    })),
  });
  return nonBlankSubmodules;
}
