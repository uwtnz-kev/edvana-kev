// Exposes general grades selectors that read persisted state.
import type {
  TeacherClassRosterStudent,
  TeacherGradeItem,
  TeacherGradeList,
  TeacherGradeListFilters,
  TeacherPublishedItem,
  TeacherStudentGrade,
} from "../gradesTypes";
import { seedClassRosterByClass } from "./gradesSeedData";
import { readGradesState } from "./gradesPersistence";

export function loadGradeItems(): TeacherGradeItem[] { return readGradesState().gradeItems; }
export function loadPublishedItems(): TeacherPublishedItem[] { return readGradesState().publishedItems; }
export function loadStudentGrades(): TeacherStudentGrade[] { return readGradesState().studentGrades; }
export function loadGradeLists(): TeacherGradeList[] { return readGradesState().gradeLists; }
export function loadGradeSubmissions() { return readGradesState().submissions; }
export function getSelectedGradeListId(): string | null { return readGradesState().selectedGradeListId; }
export function getPublishedItemById(itemId: string): TeacherPublishedItem | null { return readGradesState().publishedItems.find((item) => item.id === itemId) ?? null; }
export function getClassRosterByClass(className: string): TeacherClassRosterStudent[] { return seedClassRosterByClass[className] ? [...seedClassRosterByClass[className]] : []; }

export function getPublishedItems(selectedGradeType: TeacherPublishedItem["type"] | null, subjectId?: string | null, classValue = "all", search = "") {
  if (!selectedGradeType || !subjectId) return [];
  const query = search.trim().toLowerCase();
  return readGradesState().publishedItems.filter((item) => item.type === selectedGradeType && item.subjectId === subjectId && (classValue === "all" || item.className === classValue) && (!query || `${item.title} ${item.className}`.toLowerCase().includes(query))).sort((a, b) => b.dueDate.localeCompare(a.dueDate));
}

export function listGradeLists(subjectId?: string | null, filters?: TeacherGradeListFilters) {
  return readGradesState().gradeLists.filter((gradeList) => (!subjectId || gradeList.subjectId === subjectId) && (!filters?.classId || gradeList.classId === filters.classId) && (!filters?.assessmentType || filters.assessmentType === "all" || gradeList.assessmentType === filters.assessmentType) && (!filters?.fromDate || gradeList.date >= filters.fromDate) && (!filters?.toDate || gradeList.date <= filters.toDate));
}

export function getGradesState() {
  const state = readGradesState();
  return { gradeItems: state.gradeItems, publishedItems: state.publishedItems, studentGrades: state.studentGrades, gradeLists: state.gradeLists, submissions: state.submissions, selectedGradeListId: state.selectedGradeListId };
}
