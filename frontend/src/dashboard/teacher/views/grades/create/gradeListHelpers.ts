// Provides route parsing and derived labels for the create grade list view.
import type { TeacherGradeAssessmentType } from "@/dashboard/teacher/components/grades";
import type { CreateGradeListState, GradeSelectionType } from "./gradeListTypes";

export const assessmentOptions: Array<{ value: GradeSelectionType; label: string }> = [
  { value: "quiz", label: "Quiz" },
  { value: "exam", label: "Exam" },
  { value: "assignment", label: "Assignment" },
];

export function getCreateGradeListTitle(type: GradeSelectionType | null) {
  if (type === "quiz") return "Create New Quiz Grade List";
  if (type === "assignment") return "Create New Assignment Grade List";
  if (type === "exam") return "Create New Exam Grade List";
  return "Create Grade List";
}

export function getCreateState(state: unknown): CreateGradeListState | null {
  if (!state || typeof state !== "object") return null;
  const candidate = state as CreateGradeListState;
  return { subjectId: typeof candidate.subjectId === "string" ? candidate.subjectId : undefined, gradeType: typeof candidate.gradeType === "string" ? candidate.gradeType : undefined, type: typeof candidate.type === "string" ? candidate.type : undefined };
}

export function isSelectionType(value: string): value is GradeSelectionType {
  return value === "quiz" || value === "assignment" || value === "exam";
}

export function toSelectionType(value?: string): GradeSelectionType | null {
  return value && isSelectionType(value) ? value : null;
}
