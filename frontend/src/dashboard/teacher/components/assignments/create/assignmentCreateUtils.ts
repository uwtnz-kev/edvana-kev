// Provides validation, draft restoration, and small file helpers for assignment creation.
import { buildAssessmentAttachmentId, formatAssessmentFileSize } from "@/dashboard/teacher/components/shared/assessment/assessmentAttachmentHelpers";
import { initialValues } from "./assignmentCreateConstants";
import type { FieldName, FormErrors, FormValues, AssignmentCreateLocationState } from "./assignmentCreateTypes";

// Validates individual inputs so extracted sections share one consistent rule set.
export function validateField(name: FieldName, value: string): string | null {
  const trimmed = value.trim();
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && trimmed.length === 0) return "Questions are required.";
  if (name === "dueAt" && trimmed.length === 0) return "Due date is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "estimatedMinutes") return validatePositiveNumber(trimmed, "Estimated minutes", "greater than 0.");
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

// Rehydrates the local draft when the question builder redirects back into this form.
export function resolveFormValues(state: AssignmentCreateLocationState | null): FormValues {
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

export function canSaveAssignment(errors: FormErrors) {
  return !errors.title && !errors.instructions && !errors.questionsText && !errors.dueAt && !errors.classId && !errors.estimatedMinutes && !errors.totalQuestions && !errors.maxScore;
}

export function formatFileSize(sizeInBytes: number) {
  return formatAssessmentFileSize(sizeInBytes);
}

export function buildAttachmentId() {
  return buildAssessmentAttachmentId();
}
