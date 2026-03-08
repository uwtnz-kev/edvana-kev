// Provides non-UI validation helpers for question builder view state.
import type { QuestionBuilderQuestion } from "@/dashboard/teacher/components/questions/questionsStore";

// Uses the persisted snapshot format to detect unsaved structural and content changes.
export function hasUnsavedQuestionChanges(
  questions: QuestionBuilderQuestion[],
  initialSnapshot: string
) {
  return JSON.stringify(questions) !== initialSnapshot;
}
