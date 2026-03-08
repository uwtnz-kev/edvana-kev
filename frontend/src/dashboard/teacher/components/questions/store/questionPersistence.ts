/** Reads and writes question-builder state while reusing shared storage safety helpers. */
import { getBrowserStorage, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";
import { buildId, cloneQuestions } from "./questionFactories";
import { createBlankMatchingPairs, DEFAULT_OPTION_VALUES } from "./questionSeedData";
import type {
  QuestionBuilderAssessmentType,
  QuestionBuilderMatchingPair,
  QuestionBuilderQuestion,
  QuestionsState,
} from "./questionTypes";

const STORAGE_KEY = "teacher.questions.builder.v1";

export function getScopeKey(type: QuestionBuilderAssessmentType, itemId?: string | null) {
  return `${type}:${itemId && itemId.trim().length > 0 ? itemId : "draft"}`;
}

function normalizeMatchingPairs(input: unknown): QuestionBuilderMatchingPair[] {
  // Invalid stored pairs are replaced with a stable blank set so editors always render.
  if (!Array.isArray(input)) return createBlankMatchingPairs(buildId);
  const pairs = input
    .map((pair) => {
      if (!pair || typeof pair !== "object") return null;
      const candidate = pair as Partial<QuestionBuilderMatchingPair>;
      if (typeof candidate.left !== "string" || typeof candidate.right !== "string") return null;
      return { id: typeof candidate.id === "string" ? candidate.id : buildId("match"), left: candidate.left, right: candidate.right };
    })
    .filter((entry): entry is QuestionBuilderMatchingPair => entry !== null);
  return pairs.length > 0 ? pairs : createBlankMatchingPairs(buildId);
}

export function normalizeQuestion(
  input: unknown,
  fallbackType: QuestionBuilderAssessmentType,
  fallbackItemId: string
): QuestionBuilderQuestion | null {
  // Stored drafts can be partial or stale, so each field is normalized defensively.
  if (!input || typeof input !== "object") return null;
  const source = input as Partial<QuestionBuilderQuestion>;
  const validType = source.questionType;
  if (!["multiple_choice", "matching", "identification", "short_answer", "true_false"].includes(validType ?? "")) return null;
  const itemId = typeof source.itemId === "string" && source.itemId.trim().length > 0 ? source.itemId : fallbackItemId;
  const points = typeof source.points === "number" && Number.isFinite(source.points) && source.points >= 0 ? source.points : 1;
  return {
    id: typeof source.id === "string" ? source.id : buildId("question"),
    itemId,
    type: source.type === "quiz" || source.type === "assignment" || source.type === "exam" ? source.type : fallbackType,
    questionType: validType,
    questionText: typeof source.questionText === "string" ? source.questionText : "",
    points,
    options: Array.isArray(source.options) && source.options.every((entry) => typeof entry === "string") ? source.options : [...DEFAULT_OPTION_VALUES],
    correctAnswer: typeof source.correctAnswer === "string" ? source.correctAnswer : "",
    matchingPairs: normalizeMatchingPairs(source.matchingPairs),
    identificationAnswer: typeof source.identificationAnswer === "string" ? source.identificationAnswer : "",
    shortAnswer: typeof source.shortAnswer === "string" ? source.shortAnswer : "",
    trueFalseAnswer: source.trueFalseAnswer === "true" || source.trueFalseAnswer === "false" ? source.trueFalseAnswer : "",
  };
}

export function readState(): QuestionsState {
  const storage = getBrowserStorage();
  if (!storage) return { byKey: {} };
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY) ?? "null") as Partial<QuestionsState> | null;
    if (!parsed || typeof parsed !== "object" || !parsed.byKey || typeof parsed.byKey !== "object") throw new Error("invalid");
    const byKey: Record<string, QuestionBuilderQuestion[]> = {};
    for (const [key, value] of Object.entries(parsed.byKey)) {
      const [typePart, itemPart] = key.split(":");
      if (!Array.isArray(value) || !["quiz", "assignment", "exam"].includes(typePart)) continue;
      byKey[key] = value.map((entry) => normalizeQuestion(entry, typePart as QuestionBuilderAssessmentType, itemPart ?? "draft")).filter((entry): entry is QuestionBuilderQuestion => entry !== null);
    }
    return { byKey };
  } catch {
    const initial = { byKey: {} };
    writeStoredJson(STORAGE_KEY, initial);
    return initial;
  }
}

export function writeState(state: QuestionsState) {
  const storage = getBrowserStorage();
  if (!storage) return;
  try {
    // Clone before writing so callers never retain references to the persisted snapshot.
    writeStoredJson(STORAGE_KEY, { byKey: Object.fromEntries(Object.entries(state.byKey).map(([key, questions]) => [key, cloneQuestions(questions)])) });
  } catch {
    // Ignore write failures from unavailable storage.
  }
}
