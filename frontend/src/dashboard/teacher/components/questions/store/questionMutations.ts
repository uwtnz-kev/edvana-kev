// Applies write operations to persisted question builder state.
import { cloneQuestions } from "./questionFactories";
import { getScopeKey, normalizeQuestion, readState, writeState } from "./questionPersistence";
import type { QuestionBuilderAssessmentType, QuestionBuilderQuestion } from "./questionTypes";

export function saveQuestionsForBuilder(
  type: QuestionBuilderAssessmentType,
  questions: QuestionBuilderQuestion[],
  itemId?: string | null
) {
  const fallbackItemId = itemId && itemId.trim().length > 0 ? itemId : "draft";
  const normalized = questions.map((question) => normalizeQuestion(question, type, fallbackItemId)).filter((question): question is QuestionBuilderQuestion => question !== null);
  const state = readState();
  state.byKey[getScopeKey(type, itemId)] = normalized;
  writeState(state);
  return cloneQuestions(normalized);
}

export function clearQuestionsForBuilder(type: QuestionBuilderAssessmentType, itemId?: string | null) {
  const state = readState();
  const key = getScopeKey(type, itemId);
  if (!(key in state.byKey)) return;
  delete state.byKey[key];
  writeState(state);
}

export function clearCreateDraft(type: QuestionBuilderAssessmentType, draftId?: string | null) {
  clearQuestionsForBuilder(type, "draft");
  if (draftId && draftId.trim().length > 0) clearQuestionsForBuilder(type, draftId);
}
