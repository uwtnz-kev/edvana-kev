// Provides validation, draft restoration, and small file helpers for assignment creation.
import { normalizeSubmissionMethods, requiresQuestionBuilder, validateSubmissionMethods } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import { buildAssessmentAttachmentId, formatAssessmentFileSize } from "@/dashboard/teacher/components/shared/assessment/assessmentAttachmentHelpers";
import { initialValues } from "./assignmentCreateConstants";
import type { FieldName, FormErrors, FormValues, AssignmentCreateLocationState } from "./assignmentCreateTypes";

// Validates individual inputs so extracted sections share one consistent rule set.
export function validateField(name: FieldName, value: FormValues[FieldName], values: FormValues): string | null {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && requiresQuestionBuilder(values.submissionMethods) && trimmed.length === 0) return "Questions are required.";
  if (name === "dueAt" && trimmed.length === 0) return "Due date is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "estimatedMinutes") return validatePositiveNumber(trimmed, "Estimated minutes", "greater than 0.");
  if (name === "totalAttempts") return validateWholeNumber(trimmed);
  if (name === "totalQuestions") return requiresQuestionBuilder(values.submissionMethods) ? validatePositiveNumber(trimmed, "Total number of questions", "greater than 0.") : null;
  if (name === "submissionMethods") return validateSubmissionMethods(value as FormValues["submissionMethods"]);
  if (name === "maxScore") return validatePositiveNumber(trimmed, "Max score", "a positive number.");
  return null;
}

function validatePositiveNumber(value: string, label: string, invalidMessage: string) {
  if (value.length === 0) return `${label} is required.`;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return `${label} must be ${invalidMessage}`;
  return null;
}

function validateWholeNumber(value: string) {
  if (value.length === 0) return "Total attempts is required";
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return "Total attempts must be a whole number";
  if (parsed < 1) return "Total attempts must be at least 1";
  return null;
}

// Rehydrates the local draft when the question builder redirects back into this form.
export function resolveFormValues(state: AssignmentCreateLocationState | null): FormValues {
  const formDraft = state?.formDraft;
  const fromBuilder = state?.questionsText ?? state?.questionsTextFromBuilder;
  if (!formDraft && typeof fromBuilder !== "string") return initialValues;
  return {
    ...initialValues,
    ...formDraft,
    submissionMethods: normalizeSubmissionMethods(formDraft?.submissionMethods),
    questionsText: typeof fromBuilder === "string" ? fromBuilder : typeof formDraft?.questionsText === "string" ? formDraft.questionsText : "",
  };
}

export function buildErrors(values: FormValues): FormErrors {
  return Object.keys(values).reduce((next, key) => {
    next[key as FieldName] = validateField(key as FieldName, values[key as FieldName], values);
    return next;
  }, {} as FormErrors);
}

export function canSaveAssignment(errors: FormErrors) {
  return !errors.title && !errors.instructions && !errors.questionsText && !errors.dueAt && !errors.classId && !errors.estimatedMinutes && !errors.totalAttempts && !errors.totalQuestions && !errors.submissionMethods && !errors.maxScore;
}

export function formatFileSize(sizeInBytes: number) {
  return formatAssessmentFileSize(sizeInBytes);
}

export function buildAttachmentId() {
  return buildAssessmentAttachmentId();
}
