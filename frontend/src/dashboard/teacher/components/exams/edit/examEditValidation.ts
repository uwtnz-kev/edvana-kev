// Defines validation rules and save checks for exam editing.
import type { FieldName, FormErrors, FormValues } from "../create/examCreateTypes";

export function validateExamEditField(name: FieldName, value: string): string | null {
  const trimmed = value.trim();
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && trimmed.length === 0) return "Questions are required.";
  if (name === "scheduledAt" && trimmed.length === 0) return "Scheduled date is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "durationMinutes") return validatePositiveValue(trimmed, "Duration", "greater than 0.");
  if (name === "totalQuestions") return validatePositiveValue(trimmed, "Total number of questions", "greater than 0.");
  if (name === "maxScore") return validatePositiveValue(trimmed, "Max score", "a positive number.");
  return null;
}

function validatePositiveValue(value: string, label: string, suffix: string) {
  if (value.length === 0) return `${label} is required.`;
  const parsed = Number(value);
  return !Number.isFinite(parsed) || parsed <= 0 ? `${label} must be ${suffix}` : null;
}

export function getExamEditErrors(values: FormValues): FormErrors {
  return {
    title: validateExamEditField("title", values.title),
    instructions: validateExamEditField("instructions", values.instructions),
    questionsText: validateExamEditField("questionsText", values.questionsText),
    scheduledAt: validateExamEditField("scheduledAt", values.scheduledAt),
    classId: validateExamEditField("classId", values.classId),
    classLabel: validateExamEditField("classLabel", values.classLabel),
    durationMinutes: validateExamEditField("durationMinutes", values.durationMinutes),
    totalQuestions: validateExamEditField("totalQuestions", values.totalQuestions),
    rubric: validateExamEditField("rubric", values.rubric),
    maxScore: validateExamEditField("maxScore", values.maxScore),
  };
}

export function canSaveExamEdit(errors: FormErrors) {
  return !errors.title && !errors.instructions && !errors.questionsText && !errors.scheduledAt && !errors.classId && !errors.durationMinutes && !errors.totalQuestions && !errors.maxScore;
}
