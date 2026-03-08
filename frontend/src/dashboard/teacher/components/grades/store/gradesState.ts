// Defines persisted grades state shared by the internal store modules.
import type {
  TeacherGradeItem,
  TeacherGradeList,
  TeacherGradeSubmission,
  TeacherPublishedItem,
  TeacherStudentGrade,
} from "../gradesTypes";

export type GradesState = {
  gradeItems: TeacherGradeItem[];
  publishedItems: TeacherPublishedItem[];
  studentGrades: TeacherStudentGrade[];
  gradeLists: TeacherGradeList[];
  submissions: TeacherGradeSubmission[];
  selectedGradeListId: string | null;
};

export function buildId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
