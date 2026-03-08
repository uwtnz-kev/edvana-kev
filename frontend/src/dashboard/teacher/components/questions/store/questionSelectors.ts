// Exposes read-only question builder selectors and derived seeding helpers.
import { cloneQuestions, createEmptyQuestion } from "./questionFactories";
import { readState, getScopeKey } from "./questionPersistence";
import { saveQuestionsForBuilder } from "./questionMutations";
import { buildQuestionsText, parseQuestionsTextToQuestions } from "./questionTextCodec";
import type { QuestionBuilderAssessmentType, QuestionBuilderQuestion } from "./questionTypes";

function hasMeaningfulQuestionContent(question: QuestionBuilderQuestion) {
  if (question.questionText.trim().length > 0) return true;
  if (question.options.some((option) => option.trim().length > 0)) return true;
  if (question.correctAnswer.trim().length > 0) return true;
  if (question.matchingPairs.some((pair) => pair.left.trim().length > 0 || pair.right.trim().length > 0)) return true;
  if (question.identificationAnswer.trim().length > 0) return true;
  if (question.shortAnswer.trim().length > 0) return true;
  return question.trueFalseAnswer === "true" || question.trueFalseAnswer === "false";
}

export function getQuestionsForBuilder(type: QuestionBuilderAssessmentType, itemId?: string | null) {
  // Clone-on-read preserves the previous store behavior for callers that mutate local state.
  return cloneQuestions(readState().byKey[getScopeKey(type, itemId)] ?? []);
}

export function getQuestionsTextForBuilder(type: QuestionBuilderAssessmentType, itemId?: string | null) {
  return buildQuestionsText(getQuestionsForBuilder(type, itemId));
}

export function ensureQuestionsForBuilder(type: QuestionBuilderAssessmentType, itemId?: string | null) {
  const existing = getQuestionsForBuilder(type, itemId);
  if (existing.length > 0) return existing;
  return saveQuestionsForBuilder(type, [createEmptyQuestion(type, itemId)], itemId);
}

export function ensureQuestionsForBuilderFromText(
  type: QuestionBuilderAssessmentType,
  itemId: string,
  questionsText?: string
) {
  const existing = getQuestionsForBuilder(type, itemId);
  const parsed = parseQuestionsTextToQuestions(type, itemId, questionsText);
  if (existing.length > 0) return !existing.some(hasMeaningfulQuestionContent) && parsed.length > 0 ? saveQuestionsForBuilder(type, parsed, itemId) : existing;
  if (parsed.length > 0) return saveQuestionsForBuilder(type, parsed, itemId);
  return ensureQuestionsForBuilder(type, itemId);
}

export { buildQuestionsText };
