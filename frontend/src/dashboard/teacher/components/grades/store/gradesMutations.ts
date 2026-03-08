// Applies persisted grades updates for submissions, lists, and student scores.
import type { CreateTeacherGradeListPayload, TeacherGradeList, TeacherGradeSubmission, TeacherStudentGrade } from "../gradesTypes";
import { getGradeSubmissionById } from "./gradeSubmissionSelectors";
import { readGradesState, writeGradesState } from "./gradesPersistence";
import { buildId } from "./gradesState";

export function updateSubmissionScore(submissionId: string, score: number): TeacherGradeSubmission | null {
  const state = readGradesState();
  const index = state.submissions.findIndex((submission) => submission.id === submissionId);
  if (index < 0) return null;
  const next = { ...state.submissions[index], status: "graded" as const, score, updatedAt: new Date().toISOString() };
  state.submissions[index] = next;
  writeGradesState(state);
  return next;
}

export function markSubmissionGraded(submissionId: string): TeacherGradeSubmission | null {
  const current = getGradeSubmissionById(submissionId);
  return current ? updateSubmissionScore(submissionId, current.score ?? 0) : null;
}

export function saveStudentGrade(updated: TeacherStudentGrade) {
  const state = readGradesState();
  const index = state.studentGrades.findIndex((grade) => grade.id === updated.id);
  index >= 0 ? (state.studentGrades[index] = updated) : state.studentGrades.push(updated);
  writeGradesState(state);
}

export function createGradeList(payload: CreateTeacherGradeListPayload): TeacherGradeList {
  const state = readGradesState();
  const createdAt = new Date().toISOString();
  const gradeList = { id: buildId("grade-list"), subjectId: payload.subjectId, classId: payload.classId, title: payload.title.trim(), assessmentType: payload.assessmentType, date: payload.date, maxScore: payload.maxScore, rows: payload.rows, createdAt };
  const gradeItemId = buildId("grade-item");
  state.gradeItems = [{ id: gradeItemId, title: gradeList.title, type: gradeList.assessmentType, maxScore: gradeList.maxScore, subjectId: gradeList.subjectId, classLabel: gradeList.classId, createdAt }, ...state.gradeItems];
  state.studentGrades = [...gradeList.rows.map((row) => ({ id: `${row.studentId}:${gradeItemId}`, studentId: row.studentId, studentName: row.studentName, classLabel: gradeList.classId, gradeItemId, score: row.score, updatedAt: createdAt })), ...state.studentGrades];
  state.gradeLists = [gradeList, ...state.gradeLists];
  state.selectedGradeListId = gradeList.id;
  writeGradesState(state);
  return gradeList;
}

export function deletePublishedItem(itemId: string) {
  const state = readGradesState();
  const nextItems = state.publishedItems.filter((item) => item.id !== itemId);
  if (nextItems.length === state.publishedItems.length) return false;
  state.publishedItems = nextItems;
  writeGradesState(state);
  return true;
}

export function setSelectedGradeListId(selectedGradeListId: string | null) {
  const state = readGradesState();
  state.selectedGradeListId = selectedGradeListId;
  writeGradesState(state);
}

export function updateStudentGrade(updated: TeacherStudentGrade) { saveStudentGrade(updated); }
