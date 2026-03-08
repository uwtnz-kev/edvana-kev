// Provides derived labels and progress values for the teacher subject card.
import type { TeacherSubjectNavData } from "../TeacherSubjectCard";

// Keeps the original minimum and maximum progress bar bounds.
export function getPendingProgressWidth(pendingToGrade: number) {
  return `${Math.min(100, Math.max(10, pendingToGrade * 4))}%`;
}

export function getPendingLabel(subject: TeacherSubjectNavData) {
  return `${subject.pendingToGrade} pending`;
}

export function getStudentsLabel(subject: TeacherSubjectNavData) {
  return `${subject.studentsCount} students`;
}

export function getToGradeLabel(subject: TeacherSubjectNavData) {
  return `${subject.pendingToGrade} to grade`;
}
