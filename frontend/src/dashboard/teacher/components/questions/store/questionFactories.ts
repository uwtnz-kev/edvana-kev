// Creates fresh question builder records and clone-safe copies.
import { createBlankMatchingPairs, DEFAULT_OPTION_VALUES } from "./questionSeedData";
import type { QuestionBuilderAssessmentType, QuestionBuilderQuestion } from "./questionTypes";

export function buildId(prefix: string) {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return `${prefix}-${crypto.randomUUID()}`;
    }
  } catch {
    // Fallback below.
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createQuestionBuilderDraftId(type: QuestionBuilderAssessmentType) {
  return `create-${type}-${buildId("draft")}`;
}

export function createEmptyQuestion(
  type: QuestionBuilderAssessmentType,
  itemId?: string | null
): QuestionBuilderQuestion {
  return {
    id: buildId("question"),
    itemId: itemId && itemId.trim().length > 0 ? itemId : "draft",
    type,
    questionType: "multiple_choice",
    questionText: "",
    points: 1,
    options: [...DEFAULT_OPTION_VALUES],
    correctAnswer: "",
    matchingPairs: createBlankMatchingPairs(buildId),
    identificationAnswer: "",
    shortAnswer: "",
    trueFalseAnswer: "",
  };
}

export function cloneQuestion(question: QuestionBuilderQuestion): QuestionBuilderQuestion {
  return {
    ...question,
    options: [...question.options],
    matchingPairs: question.matchingPairs.map((pair) => ({ ...pair })),
  };
}

export function cloneQuestions(questions: QuestionBuilderQuestion[]) {
  return questions.map(cloneQuestion);
}
