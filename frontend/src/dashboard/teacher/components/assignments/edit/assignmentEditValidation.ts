/** Centralizes validation rules for assignment edit fields. */
import { requiresQuestionBuilder, validateSubmissionMethods } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { FieldName, FormErrors, FormValues } from "./assignmentEditTypes";

// Keeps section-level inputs aligned on one validation rule set.
export function validateAssignmentEditField(name: FieldName, value: FormValues[FieldName], values: FormValues): string | null {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && requiresQuestionBuilder(values.submissionMethods) && trimmed.length === 0) return "Questions are required.";
  if (name === "dueAt" && trimmed.length === 0) return "Due date is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "totalAttempts") return validateWholeNumber(trimmed);
  if (name === "totalQuestions") return requiresQuestionBuilder(values.submissionMethods) ? validatePositive(trimmed, "Total number questions", "greater than 0.") : null;
  if (name === "submissionMethods") return validateSubmissionMethods(value as FormValues["submissionMethods"]);
  if (name === "maxScore") return validatePositive(trimmed, "Max score", "a positive number.");
  return null;
}

function validatePositive(value: string, label: string, invalidMessage: string) {
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

export function buildAssignmentEditErrors(values: FormValues): FormErrors {
  return Object.keys(values).reduce((next, key) => {
    next[key as FieldName] = validateAssignmentEditField(key as FieldName, values[key as FieldName], values);
    return next;
  }, {} as FormErrors);
}

export function canSaveAssignmentEdit(errors: FormErrors) {
  return (
    !errors.title &&
    !errors.instructions &&
    !errors.questionsText &&
    !errors.dueAt &&
    !errors.classId &&
    !errors.totalAttempts &&
    !errors.totalQuestions &&
    !errors.submissionMethods &&
    !errors.maxScore
  );
}

