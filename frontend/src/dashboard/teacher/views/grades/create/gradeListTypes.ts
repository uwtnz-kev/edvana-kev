// Defines local types used by the create grade list workspace.
import type { TeacherGradeAssessmentType } from "@/dashboard/teacher/components/grades";

export type CreateGradeListState = {
  subjectId?: string;
  gradeType?: string;
  type?: string;
};

export type GradeRowDraft = {
  score: string;
};

export type GradeSelectionType = Exclude<TeacherGradeAssessmentType, "all">;
