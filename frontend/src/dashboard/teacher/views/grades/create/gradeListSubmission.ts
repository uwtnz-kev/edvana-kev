// Provides submission helpers for creating grade lists and returning to grades.
import { createGradeList, type TeacherGradeAssessmentType } from "@/dashboard/teacher/components/grades";
import type { Student } from "@/dashboard/teacher/components/students";
import type { GradeRowDraft } from "./gradeListTypes";
import { buildGradesWorkspaceRoute } from "../gradesViewHelpers";

export function getBackRoute(
  subjectId: string,
  assessmentType: Exclude<TeacherGradeAssessmentType, "all"> | null,
  classId?: string | null,
) {
  return buildGradesWorkspaceRoute(subjectId, assessmentType, classId);
}

export function saveGradeListRecord(payload: {
  subjectId: string;
  classId: string;
  title: string;
  assessmentType: Exclude<TeacherGradeAssessmentType, "all">;
  date: string;
  maxScore: number;
  classStudents: Student[];
  rowsByStudentId: Record<string, GradeRowDraft>;
}) {
  createGradeList({
    subjectId: payload.subjectId,
    classId: payload.classId,
    title: payload.title.trim(),
    assessmentType: payload.assessmentType,
    date: payload.date,
    maxScore: payload.maxScore,
    rows: payload.classStudents.map((student) => ({
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      score: Number(payload.rowsByStudentId[student.id]?.score ?? 0),
    })),
  });
}
