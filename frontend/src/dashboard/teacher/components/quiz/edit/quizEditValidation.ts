// Defines validation rules and save eligibility checks for quiz editing.
import { requiresQuestionBuilder, validateSubmissionMethods } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { FieldName, FormErrors, FormValues } from "../create/quizCreateTypes";

export function validateQuizEditField(name: FieldName, value: FormValues[FieldName], values: FormValues): string | null {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && requiresQuestionBuilder(values.submissionMethods) && trimmed.length === 0) return "Questions is required.";
  if (name === "dueAt" && trimmed.length === 0) return "Due date is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "durationMinutes") return validatePositiveValue(trimmed, "Duration Minutes", "greater than 0.");
  if (name === "totalAttempts") return validateWholeNumber(trimmed);
  if (name === "totalQuestions") return requiresQuestionBuilder(values.submissionMethods) ? validatePositiveValue(trimmed, "Total number of questions", "greater than 0.") : null;
  if (name === "submissionMethods") return validateSubmissionMethods(value as FormValues["submissionMethods"]);
  if (name === "maxScore") return validatePositiveValue(trimmed, "Max score", "a positive number.");
  return null;
}

function validatePositiveValue(value: string, label: string, messageSuffix: string) {
  if (value.length === 0) return `${label} is required.`;
  const parsed = Number(value);
  return !Number.isFinite(parsed) || parsed <= 0 ? `${label} must be ${messageSuffix}` : null;
}

function validateWholeNumber(value: string) {
  if (value.length === 0) return "Total attempts is required";
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return "Total attempts must be a whole number";
  if (parsed < 1) return "Total attempts must be at least 1";
  return null;
}

export function getQuizEditErrors(values: FormValues): FormErrors {
  return {
    title: validateQuizEditField("title", values.title, values),
    instructions: validateQuizEditField("instructions", values.instructions, values),
    questionsText: validateQuizEditField("questionsText", values.questionsText, values),
    dueAt: validateQuizEditField("dueAt", values.dueAt, values),
    classId: validateQuizEditField("classId", values.classId, values),
    classLabel: validateQuizEditField("classLabel", values.classLabel, values),
    accessCode: validateQuizEditField("accessCode", values.accessCode, values),
    durationMinutes: validateQuizEditField("durationMinutes", values.durationMinutes, values),
    totalAttempts: validateQuizEditField("totalAttempts", values.totalAttempts, values),
    totalQuestions: validateQuizEditField("totalQuestions", values.totalQuestions, values),
    submissionMethods: validateQuizEditField("submissionMethods", values.submissionMethods, values),
    rubric: validateQuizEditField("rubric", values.rubric, values),
    maxScore: validateQuizEditField("maxScore", values.maxScore, values),
  };
}

export function canSaveQuizEdit(errors: FormErrors) {
  return !errors.title && !errors.instructions && !errors.questionsText && !errors.dueAt && !errors.classId && !errors.durationMinutes && !errors.totalAttempts && !errors.totalQuestions && !errors.submissionMethods && !errors.maxScore;
}
