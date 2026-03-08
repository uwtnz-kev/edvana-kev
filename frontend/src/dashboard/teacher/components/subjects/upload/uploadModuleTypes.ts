// Defines the shared form types used by the subject module upload page and sections.
import type { TeacherSubjectNavData } from "@/dashboard/teacher/components/subjects/TeacherSubjectCard";

export type SubjectUploadParams = {
  subjectId?: string;
};

export type SubjectUploadRouteState = {
  subject?: TeacherSubjectNavData | null;
  restoreSubjectId?: string;
};

export type SubmoduleDraft = {
  id: string;
  title: string;
  description: string;
};

export type FieldTouchedState = {
  moduleTitle: boolean;
  description: boolean;
  submodules: Record<string, { title: boolean; description: boolean }>;
};

export type ModuleErrors = {
  moduleTitle: string | null;
  description: string | null;
  submodules: Record<string, { title: string | null; description: string | null }>;
};
