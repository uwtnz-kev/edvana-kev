// Helpers and fallback data for the subject modules workspace.
import { seedSubjects2 } from "@/dashboard/teacher/components/assignments";
import type { TeacherSubjectNavData } from "@/dashboard/teacher/components/subjects/TeacherSubjectCard";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";

export type SubjectModulesRouteState = {
  returnModuleId?: string;
  returnScrollTop?: number;
  subject?: TeacherSubjectNavData | null;
  restoreSubjectId?: string;
};

export function getSubjectName(subjectId: string, state: SubjectModulesRouteState | null) {
  return state?.subject?.name ?? seedSubjects2.find((item) => item.id === subjectId)?.name ?? "Subject";
}

export function getSubjectTitle(subjectId: string, state: SubjectModulesRouteState | null) {
  return state?.subject?.title ?? getSubjectName(subjectId, state);
}

// Keep the workspace populated even when a subject has no saved modules yet.
export function getFallbackModules(modules: SubjectModuleItem[]) {
  return modules.length > 0 ? modules : [{
    id: "module-1",
    title: "Module 1",
    description: "Module content for this subject will appear here once modules are added.",
    status: "draft" as const,
    lessons: 1,
    duration: "1 week",
    order: 0,
    attachedFileIds: [],
    submodules: [{ id: "overview", title: "Overview", description: "Initial module overview and lesson goals.", content: "A starter content block for this subject module.", attachedFileIds: [], summary: "A starter content block for this subject module.", order: 0 }],
  }];
}
