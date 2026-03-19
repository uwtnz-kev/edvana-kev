// Encapsulates route-building actions used by the grades workspace state hook.
import type { NavigateFunction } from "react-router-dom";
import type { TeacherGradeSelectionType } from "@/dashboard/teacher/components/grades";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { SUBJECT_CLASS_QUERY_KEY } from "../subjects/subjectClassRouting";

export function navigateToCreateGradeList(
  navigate: NavigateFunction,
  selectedSubjectId: string | null,
  selectedGradeType: TeacherGradeSelectionType | null,
  classId?: string | null,
) {
  if (!selectedSubjectId || !selectedGradeType) return;
  const params = new URLSearchParams({ subjectId: selectedSubjectId, type: selectedGradeType });
  if (classId) params.set(SUBJECT_CLASS_QUERY_KEY, classId);
  navigate(`${TEACHER_ROUTES.GRADES_CREATE}?${params.toString()}`, {
    state: { subjectId: selectedSubjectId, gradeType: selectedGradeType, type: selectedGradeType },
  });
}
