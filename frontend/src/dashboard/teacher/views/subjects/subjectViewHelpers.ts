// Helpers for subject restore-route handling and sidebar navigation targets.
import { BookOpen, Upload, type LucideIcon } from "lucide-react";
import { subjectWorkspaceData } from "./subjectWorkspaceData";

export type SubjectViewRestoreState = {
  restoreSubjectId?: string;
  resetToHome?: boolean;
};

export type SubjectSidebarAction = {
  icon: LucideIcon;
  label: string;
  to: string;
  value: string;
};

export function getSubjectWorkspaceData(subjectId: string | null) {
  return subjectWorkspaceData.find((subject) => subject.id === subjectId) ?? null;
}

// Build sidebar actions from the active subject so routes stay consistent.
export function getSubjectSidebarActions(subjectId: string) {
  return [
    { value: "modules", label: "Modules", icon: BookOpen, to: `/dashboard/teacher/subjects/${subjectId}/modules` },
    { value: "upload-module", label: "Upload Module", icon: Upload, to: `/dashboard/teacher/subjects/${subjectId}/upload-module` },
  ] satisfies SubjectSidebarAction[];
}
