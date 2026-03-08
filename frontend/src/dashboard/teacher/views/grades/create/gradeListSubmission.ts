// Provides submission helpers for creating grade lists and returning to grades.
import { createGradeList, type TeacherGradeAssessmentType } from "@/dashboard/teacher/components/grades";
import type { Student } from "@/dashboard/teacher/components/students";
import type { GradeRowDraft, GradeSelectionType } from "./gradeListTypes";

export function getBackRoute(type: GradeSelectionType | null) {
  return type ? "/dashboard/teacher/grades/workspace" : "/dashboard/teacher/grades";
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
