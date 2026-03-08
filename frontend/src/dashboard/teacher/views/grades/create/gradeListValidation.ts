// Provides validation helpers for grade list form fields and student rows.
import type { Student } from "@/dashboard/teacher/components/students";
import type { GradeRowDraft } from "./gradeListTypes";

export function hasValidMaxScore(value: number) {
  return Number.isFinite(value) && value > 0;
}

export function buildRowErrors(
  classStudents: Student[],
  rowsByStudentId: Record<string, GradeRowDraft>,
  parsedMaxScore: number
) {
  const errors: Record<string, string> = {};
  classStudents.forEach((student) => {
    const parsedScore = Number(rowsByStudentId[student.id]?.score ?? "");
    if (!Number.isFinite(parsedScore)) {
      errors[student.id] = "Score is required.";
      return;
    }
    if (!hasValidMaxScore(parsedMaxScore)) {
      errors[student.id] = "Set a valid max score first.";
      return;
    }
    if (parsedScore < 0 || parsedScore > parsedMaxScore) {
      errors[student.id] = `Score must be between 0 and ${parsedMaxScore}.`;
    }
  });
  return errors;
}
