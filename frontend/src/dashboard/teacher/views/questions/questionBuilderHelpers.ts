// Provides edit-specific question builder helpers and routing fallbacks.
import { parseAssessmentType } from "@/dashboard/teacher/components/questions/helpers/questionBuilderHelpers";
import type { QuestionBuilderAssessmentType } from "@/dashboard/teacher/components/questions/questionsStore";

export { parseAssessmentType };

export function getEditBackRoute(type: QuestionBuilderAssessmentType, itemId: string) {
  if (type === "quiz") return `/dashboard/teacher/quizzes/${itemId}/edit`;
  if (type === "assignment") return `/dashboard/teacher/assignments/${itemId}/edit`;
  return `/dashboard/teacher/exams/${itemId}/edit`;
}

export function getEditBuilderTitle(type: QuestionBuilderAssessmentType) {
  if (type === "quiz") return "Edit Quiz Questions";
  if (type === "assignment") return "Edit Assignment Questions";
  return "Edit Exam Questions";
}
