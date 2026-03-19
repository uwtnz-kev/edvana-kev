// Provides derived values and route helpers for grade item submission details.
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";
import type { TeacherGradeSubmission } from "@/dashboard/teacher/components/grades";

export function getSubmissionQuestions(submission: TeacherGradeSubmission | null) {
  return submission?.submissionDetails?.questions ?? [];
}

export function getCalculatedTotal(questionScores: Record<string, string>, questionIds: string[]) {
  return questionIds.reduce((sum, id) => {
    const value = Number(questionScores[id]);
    return Number.isFinite(value) && value >= 0 ? sum + value : sum;
  }, 0);
}

export function getFinalScore(totalScore: string, calculatedTotal: number) {
  return totalScore.trim() ? Number(totalScore) : calculatedTotal;
}

export function getNextSubmittedRoute(itemId: string, type: string | null, subjectId: string | null, classId?: string | null) {
  const nextParams = new URLSearchParams();
  if (type) nextParams.set("type", type);
  if (subjectId) nextParams.set("subjectId", subjectId);
  if (classId) nextParams.set("classId", classId);
  const nextQuery = nextParams.toString();
  return `${TEACHER_ROUTES.GRADES_WORKSPACE}/${itemId}/submitted${nextQuery ? `?${nextQuery}` : ""}`;
}
