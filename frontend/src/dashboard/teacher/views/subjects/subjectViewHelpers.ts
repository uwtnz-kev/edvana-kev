// Helpers for subject restore-route handling and sidebar navigation targets.
import { BookOpen, FileText, Upload, type LucideIcon } from "lucide-react";
import { appendClassIdToPath } from "./subjectClassRouting";
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
export function getSubjectSidebarActions(subjectId: string, classId?: string | null) {
  return [
    { value: "modules", label: "Modules", icon: BookOpen, to: appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/modules`, classId) },
    { value: "upload-module", label: "Create Module", icon: Upload, to: appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/upload-module`, classId) },
    { value: "upload-module-file", label: "Upload Module", icon: Upload, to: appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/upload-module-file`, classId) },
    { value: "files", label: "Files", icon: FileText, to: appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/files`, classId) },
    { value: "upload-files", label: "Upload Files", icon: Upload, to: appendClassIdToPath(`/dashboard/teacher/subjects/${subjectId}/upload-files`, classId) },
  ] satisfies SubjectSidebarAction[];
}

