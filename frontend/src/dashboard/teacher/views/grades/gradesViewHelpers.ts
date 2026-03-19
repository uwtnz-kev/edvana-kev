// Provides small derived-label and route helpers for the grades workspace view.
import type { TeacherGradeSelectionType } from "@/dashboard/teacher/components/grades";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import { SUBJECT_CLASS_QUERY_KEY } from "../subjects/subjectClassRouting";

export function isSelectionType(value: string): value is TeacherGradeSelectionType {
  return value === "quiz" || value === "assignment" || value === "exam";
}

export function toWorkspaceTitle(value: TeacherGradeSelectionType | null) {
  if (value === "quiz") return "Quiz Grades";
  if (value === "assignment") return "Assignment Grades";
  if (value === "exam") return "Exam Grades";
  return "Grades";
}

export function toPublishedTitle(value: TeacherGradeSelectionType | null) {
  if (value === "quiz") return "Published Quizzes";
  if (value === "assignment") return "Published Assignments";
  if (value === "exam") return "Published Exams";
  return "Published Items";
}

export function isGradesLanding(pathname: string) {
  return pathname === TEACHER_ROUTES.GRADES;
}

export function isGradesWorkspace(pathname: string) {
  return pathname === TEACHER_ROUTES.GRADES_WORKSPACE;
}

function buildGradesWorkspaceSearch({
  classId,
  subjectId,
  type,
}: {
  classId?: string | null;
  subjectId?: string | null;
  type?: TeacherGradeSelectionType | null;
}) {
  const params = new URLSearchParams();
  if (classId) params.set(SUBJECT_CLASS_QUERY_KEY, classId);
  if (subjectId) params.set("subjectId", subjectId);
  if (type) params.set("type", type);
  return params.toString();
}

export function buildGradesTypeSelectionRoute(subjectId: string | null, classId?: string | null) {
  if (!subjectId) {
    const search = buildGradesWorkspaceSearch({ classId });
    return search ? `${TEACHER_ROUTES.GRADES}?${search}` : TEACHER_ROUTES.GRADES;
  }

  const search = buildGradesWorkspaceSearch({ classId, subjectId });
  return search ? `${TEACHER_ROUTES.GRADES_WORKSPACE}?${search}` : TEACHER_ROUTES.GRADES_WORKSPACE;
}

export function buildGradesWorkspaceRoute(
  subjectId: string | null,
  type: TeacherGradeSelectionType | null,
  classId?: string | null,
) {
  if (!subjectId) {
    const search = buildGradesWorkspaceSearch({ classId });
    return search ? `${TEACHER_ROUTES.GRADES}?${search}` : TEACHER_ROUTES.GRADES;
  }

  if (!type) return buildGradesTypeSelectionRoute(subjectId, classId);

  const search = buildGradesWorkspaceSearch({ classId, subjectId, type });
  return `${TEACHER_ROUTES.GRADES_WORKSPACE}?${search}`;
}
