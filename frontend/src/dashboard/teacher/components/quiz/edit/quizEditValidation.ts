// Defines validation rules and save eligibility checks for quiz editing.
import type { FieldName, FormErrors, FormValues } from "../create/quizCreateTypes";

export function validateQuizEditField(name: FieldName, value: string): string | null {
  const trimmed = value.trim();
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && trimmed.length === 0) return "Questions is required.";
  if (name === "dueAt" && trimmed.length === 0) return "Due date is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "durationMinutes") return validatePositiveValue(trimmed, "Duration Minutes", "greater than 0.");
  if (name === "totalQuestions") return validatePositiveValue(trimmed, "Total number of questions", "greater than 0.");
  if (name === "maxScore") return validatePositiveValue(trimmed, "Max score", "a positive number.");
  return null;
}

function validatePositiveValue(value: string, label: string, messageSuffix: string) {
  if (value.length === 0) return `${label} is required.`;
  const parsed = Number(value);
  return !Number.isFinite(parsed) || parsed <= 0 ? `${label} must be ${messageSuffix}` : null;
}

export function getQuizEditErrors(values: FormValues): FormErrors {
  return {
    title: validateQuizEditField("title", values.title),
    instructions: validateQuizEditField("instructions", values.instructions),
    questionsText: validateQuizEditField("questionsText", values.questionsText),
    dueAt: validateQuizEditField("dueAt", values.dueAt),
    classId: validateQuizEditField("classId", values.classId),
    classLabel: validateQuizEditField("classLabel", values.classLabel),
    durationMinutes: validateQuizEditField("durationMinutes", values.durationMinutes),
    totalQuestions: validateQuizEditField("totalQuestions", values.totalQuestions),
    rubric: validateQuizEditField("rubric", values.rubric),
    maxScore: validateQuizEditField("maxScore", values.maxScore),
  };
}

export function canSaveQuizEdit(errors: FormErrors) {
  return !errors.title && !errors.instructions && !errors.questionsText && !errors.dueAt && !errors.classId && !errors.durationMinutes && !errors.totalQuestions && !errors.maxScore;
}
