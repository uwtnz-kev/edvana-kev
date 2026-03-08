/** Centralizes validation rules for assignment edit fields. */
import type { FieldName, FormErrors, FormValues } from "./assignmentEditTypes";

// Keeps section-level inputs aligned on one validation rule set.
export function validateAssignmentEditField(name: FieldName, value: string): string | null {
  const trimmed = value.trim();
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && trimmed.length === 0) return "Questions are required.";
  if (name === "dueAt" && trimmed.length === 0) return "Due date is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "estimatedMinutes") return validatePositive(trimmed, "Estimated minutes", "greater than 0.");
  if (name === "totalQuestions") return validatePositive(trimmed, "Total number questions", "greater than 0.");
  if (name === "maxScore") return validatePositive(trimmed, "Max score", "a positive number.");
  return null;
}

function validatePositive(value: string, label: string, invalidMessage: string) {
  if (value.length === 0) return `${label} is required.`;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return `${label} must be ${invalidMessage}`;
  return null;
}

export function buildAssignmentEditErrors(values: FormValues): FormErrors {
  return Object.keys(values).reduce((next, key) => {
    next[key as FieldName] = validateAssignmentEditField(key as FieldName, values[key as FieldName]);
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
    !errors.estimatedMinutes &&
    !errors.totalQuestions &&
    !errors.maxScore
  );
}
