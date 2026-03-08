// Provides default seeded grades data and workspace defaults.
import { seedClassRosterByClass, seedGradeItems, seedGradeSubmissions, seedPublishedItems } from "../gradesMock";
import type { TeacherGradesFilters, TeacherGradesWorkspace } from "../gradesTypes";
import type { GradesState } from "./gradesState";

export { seedClassRosterByClass };

export const defaultGradesFilters: TeacherGradesFilters = {
  search: "",
  assessmentType: "all",
  classValue: "all",
  assessmentItemId: "all",
};

export function createInitialGradesState(): GradesState {
  return {
    gradeItems: [...seedGradeItems],
    publishedItems: [...seedPublishedItems],
    studentGrades: [],
    gradeLists: [],
    submissions: [...seedGradeSubmissions],
    selectedGradeListId: null,
  };
}

export function buildDefaultWorkspace(): TeacherGradesWorkspace {
  return { selectedSubjectId: null, selectedGradeType: null, filters: { ...defaultGradesFilters } };
}
