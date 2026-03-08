// Provides small derived helpers used by the question builder create view.
import type { QuestionBuilderAssessmentType, QuestionBuilderQuestionType } from "@/dashboard/teacher/components/questions/questionsStore";

export const QUESTION_TYPE_OPTIONS: Array<{ value: QuestionBuilderQuestionType; label: string }> = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "matching", label: "Matching" },
  { value: "identification", label: "Identification" },
  { value: "short_answer", label: "Short Answer" },
  { value: "true_false", label: "True / False" },
];

export function parseAssessmentType(value: string | null): QuestionBuilderAssessmentType | null {
  return value === "quiz" || value === "assignment" || value === "exam" ? value : null;
}

export function getCreateBackRoute(type: QuestionBuilderAssessmentType) {
  if (type === "quiz") return "/dashboard/teacher/quiz/create";
  if (type === "assignment") return "/dashboard/teacher/assignments/create";
  return "/dashboard/teacher/exams/create";
}

export function getBuilderTitle(type: QuestionBuilderAssessmentType) {
  if (type === "quiz") return "Quiz Questions Builder";
  if (type === "assignment") return "Assignment Questions Builder";
  return "Exam Questions Builder";
}

// Normalizes the points input so transient invalid values do not pollute builder state.
export function normalizePoints(value: string) {
  const points = Number(value);
  if (!Number.isFinite(points)) return 0;
  return Math.max(0, points);
}
