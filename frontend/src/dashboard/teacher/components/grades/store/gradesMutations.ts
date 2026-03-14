// Applies persisted grades updates for submissions, lists, and student scores.
import { seedSubjects2 } from "../gradesMock";
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
  const gradeItemId = buildId("grade-item");
  const subjectName = seedSubjects2.find((subject) => subject.id === payload.subjectId)?.name ?? "Unknown subject";
  const gradeList = { id: buildId("grade-list"), gradeItemId, subjectId: payload.subjectId, classId: payload.classId, title: payload.title.trim(), assessmentType: payload.assessmentType, date: payload.date, maxScore: payload.maxScore, rows: payload.rows, createdAt };
  state.gradeItems = [{ id: gradeItemId, title: gradeList.title, type: gradeList.assessmentType, maxScore: gradeList.maxScore, subjectId: gradeList.subjectId, classLabel: gradeList.classId, createdAt }, ...state.gradeItems];
  state.publishedItems = [{
    id: gradeItemId,
    type: gradeList.assessmentType,
    subjectId: gradeList.subjectId,
    title: gradeList.title,
    className: gradeList.classId,
    dueDate: gradeList.date,
    submissionsCount: gradeList.rows.length,
    status: "published",
    maxScore: gradeList.maxScore,
  }, ...state.publishedItems.filter((item) => item.id !== gradeItemId)];
  state.studentGrades = [...gradeList.rows.map((row) => ({ id: `${row.studentId}:${gradeItemId}`, studentId: row.studentId, studentName: row.studentName, classLabel: gradeList.classId, gradeItemId, score: row.score, updatedAt: createdAt })), ...state.studentGrades];
  state.submissions = [
    ...gradeList.rows.map((row) => ({
      id: buildId("submission"),
      itemId: gradeItemId,
      type: gradeList.assessmentType,
      subjectId: gradeList.subjectId,
      subjectName,
      className: gradeList.classId,
      studentId: row.studentId,
      studentName: row.studentName,
      title: gradeList.title,
      assessmentTitle: gradeList.title,
      submittedAt: createdAt,
      status: "graded" as const,
      score: row.score,
      maxScore: gradeList.maxScore,
      updatedAt: createdAt,
    } satisfies TeacherGradeSubmission)),
    ...state.submissions.filter((submission) => submission.itemId !== gradeItemId),
  ];
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
  state.gradeItems = state.gradeItems.filter((item) => item.id !== itemId);
  state.gradeLists = state.gradeLists.filter((gradeList) => (gradeList.gradeItemId ?? gradeList.id) !== itemId);
  state.studentGrades = state.studentGrades.filter((grade) => grade.gradeItemId !== itemId);
  state.submissions = state.submissions.filter((submission) => submission.itemId !== itemId);
  if (state.selectedGradeListId && !state.gradeLists.some((gradeList) => gradeList.id === state.selectedGradeListId)) {
    state.selectedGradeListId = null;
  }
  writeGradesState(state);
  return true;
}

export function setSelectedGradeListId(selectedGradeListId: string | null) {
  const state = readGradesState();
  state.selectedGradeListId = selectedGradeListId;
  writeGradesState(state);
}

export function updateStudentGrade(updated: TeacherStudentGrade) { saveStudentGrade(updated); }
