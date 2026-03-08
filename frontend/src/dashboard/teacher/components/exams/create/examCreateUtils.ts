// Provides validation, draft restoration, and attachment helpers for exam creation.
import { buildAssessmentAttachmentId, formatAssessmentFileSize } from "@/dashboard/teacher/components/shared/assessment/assessmentAttachmentHelpers";
import { initialValues } from "./examCreateConstants";
import type { ExamCreateLocationState, FieldName, FormErrors, FormValues } from "./examCreateTypes";

// Validates fields in one place so all extracted sections share consistent rules.
export function validateField(name: FieldName, value: string): string | null {
  const trimmed = value.trim();
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && trimmed.length === 0) return "Questions are required.";
  if (name === "scheduledAt" && trimmed.length === 0) return "Scheduled date is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "durationMinutes") return validatePositiveNumber(trimmed, "Duration", "greater than 0.");
  if (name === "totalQuestions") return validatePositiveNumber(trimmed, "Total number of questions", "greater than 0.");
  if (name === "maxScore") return validatePositiveNumber(trimmed, "Max score", "a positive number.");
  return null;
}

function validatePositiveNumber(value: string, label: string, invalidMessage: string) {
  if (value.length === 0) return `${label} is required.`;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return `${label} must be ${invalidMessage}`;
  return null;
}

// Restores form state after returning from the question builder while preserving built questions.
export function resolveFormValues(state: ExamCreateLocationState | null): FormValues {
  const formDraft = state?.formDraft;
  const fromBuilder = state?.questionsText ?? state?.questionsTextFromBuilder;
  if (!formDraft && typeof fromBuilder !== "string") return initialValues;
  return {
    ...initialValues,
    ...formDraft,
    questionsText: typeof fromBuilder === "string" ? fromBuilder : typeof formDraft?.questionsText === "string" ? formDraft.questionsText : "",
  };
}

export function buildErrors(values: FormValues): FormErrors {
  return Object.keys(values).reduce((next, key) => {
    next[key as FieldName] = validateField(key as FieldName, values[key as FieldName]);
    return next;
  }, {} as FormErrors);
}

export function canSaveExam(errors: FormErrors) {
  return !errors.title && !errors.instructions && !errors.questionsText && !errors.scheduledAt && !errors.classId && !errors.durationMinutes && !errors.totalQuestions && !errors.maxScore;
}

export function formatFileSize(sizeInBytes: number) {
  return formatAssessmentFileSize(sizeInBytes);
}

export function buildAttachmentId() {
  return buildAssessmentAttachmentId();
}
