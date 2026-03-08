// Provides form defaults, validation, and small helper utilities for quiz creation.
import { buildAssessmentAttachmentId, formatAssessmentFileSize } from "@/dashboard/teacher/components/shared/assessment/assessmentAttachmentHelpers";
import type {
  FieldName,
  FormErrors,
  FormValues,
  QuizCreateLocationState,
} from "./quizCreateTypes";
import { initialValues } from "./quizCreateConstants";

// Validates individual fields so sections can surface targeted errors without duplicate rules.
export function validateField(name: FieldName, value: string): string | null {
  const trimmed = value.trim();
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && trimmed.length === 0) return "Questions are required.";
  if (name === "dueAt" && trimmed.length === 0) return "Due date is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "durationMinutes") return validatePositiveNumber(trimmed, "Duration Minutes", true);
  if (name === "totalQuestions") return validatePositiveNumber(trimmed, "Total number of questions", false);
  if (name === "maxScore") return validatePositiveNumber(trimmed, "Max score", false, "positive number");
  return null;
}

function validatePositiveNumber(value: string, label: string, useGreaterThan: boolean, noun = "greater than 0.") {
  if (value.length === 0) return `${label} is required.`;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return useGreaterThan ? `${label} must be greater than 0.` : `${label} must be a ${noun}`;
  }
  return null;
}

export function buildErrors(values: FormValues): FormErrors {
  return Object.keys(values).reduce((next, key) => {
    next[key as FieldName] = validateField(key as FieldName, values[key as FieldName]);
    return next;
  }, {} as FormErrors);
}

export function canSaveQuiz(errors: FormErrors) {
  return !errors.title && !errors.instructions && !errors.questionsText && !errors.dueAt && !errors.classId && !errors.durationMinutes && !errors.totalQuestions && !errors.maxScore;
}

// Restores draft values after returning from the question builder while preserving built questions text.
export function resolveFormValues(state: QuizCreateLocationState | null) {
  const formDraft = state?.formDraft;
  const fromBuilder = state?.questionsText ?? state?.questionsTextFromBuilder;
  if (!formDraft && typeof fromBuilder !== "string") return initialValues;
  return {
    ...initialValues,
    ...formDraft,
    questionsText: typeof fromBuilder === "string" ? fromBuilder : typeof formDraft?.questionsText === "string" ? formDraft.questionsText : "",
  };
}

export function formatFileSize(sizeInBytes: number) {
  return formatAssessmentFileSize(sizeInBytes);
}

export function buildAttachmentId() {
  return buildAssessmentAttachmentId();
}
