/** Reads and writes persisted grades store state through shared storage helpers. */
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";
import { seedSubjects2 } from "../gradesMock";
import type { TeacherGradeItem, TeacherGradeList, TeacherGradeSubmission, TeacherPublishedItem, TeacherStudentGrade } from "../gradesTypes";
import { createInitialGradesState } from "./gradesSeedData";
import type { GradesState } from "./gradesState";

const GRADES_STORAGE_KEY = "teacher.grades.v2";

function hasValidSubmissions(value: unknown): value is GradesState["submissions"] {
  return Array.isArray(value) && value.every((submission) => typeof submission?.itemId === "string");
}

function toGradeItemId(gradeList: TeacherGradeList) {
  return gradeList.gradeItemId ?? gradeList.id;
}

function resolveSubjectName(subjectId: string) {
  return seedSubjects2.find((subject) => subject.id === subjectId)?.name ?? "Unknown subject";
}

function mergeById<T extends { id: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function mergeSubmissions(items: TeacherGradeSubmission[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.itemId}:${item.studentId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeGradesState(state: GradesState): GradesState {
  const derivedGradeItems: TeacherGradeItem[] = state.gradeLists.map((gradeList) => ({
    id: toGradeItemId(gradeList),
    title: gradeList.title,
    type: gradeList.assessmentType,
    maxScore: gradeList.maxScore,
    subjectId: gradeList.subjectId,
    classLabel: gradeList.classId,
    createdAt: gradeList.createdAt,
  }));

  const derivedPublishedItems: TeacherPublishedItem[] = state.gradeLists.map((gradeList) => ({
    id: toGradeItemId(gradeList),
    type: gradeList.assessmentType,
    subjectId: gradeList.subjectId,
    title: gradeList.title,
    className: gradeList.classId,
    dueDate: gradeList.date,
    submissionsCount: gradeList.rows.length,
    status: "published",
    maxScore: gradeList.maxScore,
  }));

  const derivedStudentGrades: TeacherStudentGrade[] = state.gradeLists.flatMap((gradeList) =>
    gradeList.rows.map((row) => ({
      id: `${row.studentId}:${toGradeItemId(gradeList)}`,
      studentId: row.studentId,
      studentName: row.studentName,
      classLabel: gradeList.classId,
      gradeItemId: toGradeItemId(gradeList),
      score: row.score,
      updatedAt: gradeList.createdAt,
    })),
  );

  const derivedSubmissions: TeacherGradeSubmission[] = state.gradeLists.flatMap((gradeList) =>
    gradeList.rows.map((row) => ({
      id: `submission-${toGradeItemId(gradeList)}-${row.studentId}`,
      itemId: toGradeItemId(gradeList),
      type: gradeList.assessmentType,
      subjectId: gradeList.subjectId,
      subjectName: resolveSubjectName(gradeList.subjectId),
      className: gradeList.classId,
      studentId: row.studentId,
      studentName: row.studentName,
      title: gradeList.title,
      assessmentTitle: gradeList.title,
      submittedAt: gradeList.createdAt,
      status: "graded",
      score: row.score,
      maxScore: gradeList.maxScore,
      updatedAt: gradeList.createdAt,
    })),
  );

  return {
    ...state,
    gradeItems: mergeById([...state.gradeItems, ...derivedGradeItems]),
    publishedItems: mergeById([...state.publishedItems, ...derivedPublishedItems]),
    studentGrades: mergeById([...state.studentGrades, ...derivedStudentGrades]),
    submissions: mergeSubmissions([...state.submissions, ...derivedSubmissions]),
  };
}

export function readGradesState(): GradesState {
  const storage = getBrowserStorage();
  if (!storage) return createInitialGradesState();
  const raw = storage.getItem(GRADES_STORAGE_KEY);
  if (!raw) {
    const initial = createInitialGradesState();
    writeStoredJson(GRADES_STORAGE_KEY, initial);
    return initial;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<GradesState>;
    const initial = createInitialGradesState();
    return normalizeGradesState({
      gradeItems: Array.isArray(parsed.gradeItems) ? parsed.gradeItems : initial.gradeItems,
      publishedItems: Array.isArray(parsed.publishedItems) ? parsed.publishedItems : initial.publishedItems,
      studentGrades: Array.isArray(parsed.studentGrades) ? parsed.studentGrades : [],
      gradeLists: Array.isArray(parsed.gradeLists) ? parsed.gradeLists : [],
      submissions: hasValidSubmissions(parsed.submissions) ? parsed.submissions : initial.submissions,
      selectedGradeListId: typeof parsed.selectedGradeListId === "string" ? parsed.selectedGradeListId : null,
    });
  } catch {
    // Malformed persisted data falls back to the seeded baseline.
    return createInitialGradesState();
  }
}

export function writeGradesState(state: GradesState) {
  writeStoredJson(GRADES_STORAGE_KEY, state);
}
