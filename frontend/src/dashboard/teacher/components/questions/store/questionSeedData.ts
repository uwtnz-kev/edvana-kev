// Provides reusable defaults and labels for question builder records.
import type {
  QuestionBuilderMatchingPair,
  QuestionBuilderQuestionType,
} from "./questionTypes";

export const DEFAULT_OPTION_VALUES = ["", "", "", ""];

export function createBlankMatchingPairs(buildId: (prefix: string) => string): QuestionBuilderMatchingPair[] {
  // Fresh ids keep each new pair stable for keyed React updates.
  return [
    { id: buildId("match"), left: "", right: "" },
    { id: buildId("match"), left: "", right: "" },
  ];
}

export function toQuestionTypeLabel(type: QuestionBuilderQuestionType): string {
  if (type === "multiple_choice") return "Multiple Choice";
  if (type === "matching") return "Matching";
  if (type === "identification") return "Identification";
  if (type === "short_answer") return "Short Answer";
  return "True / False";
}

export function fromQuestionTypeLabel(label: string): QuestionBuilderQuestionType {
  const normalized = label.trim().toLowerCase();
  if (normalized === "multiple choice") return "multiple_choice";
  if (normalized === "matching") return "matching";
  if (normalized === "identification") return "identification";
  if (normalized === "short answer") return "short_answer";
  if (normalized === "true / false" || normalized === "true/false") return "true_false";
  return "multiple_choice";
}
