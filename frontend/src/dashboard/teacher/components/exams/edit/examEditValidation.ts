// Defines validation rules and save checks for exam editing.
import { requiresQuestionBuilder } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { FieldName, FormErrors, FormValues } from "../create/examCreateTypes";

function validateExamSubmissionMethods(methods: FormValues["submissionMethods"]) {
  return methods.length === 1 && methods[0] === "quiz_form"
    ? null
    : "Exams use Quiz Form only.";
}

export function validateExamEditField(name: FieldName, value: FormValues[FieldName], values: FormValues): string | null {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (name === "accessCode" && trimmed.length === 0) return "Access code is required for exams";
  if (name === "title" && trimmed.length === 0) return "Title is required.";
  if (name === "instructions" && trimmed.length === 0) return "Instructions are required.";
  if (name === "questionsText" && requiresQuestionBuilder(values.submissionMethods) && trimmed.length === 0) return "Questions are required.";
  if (name === "scheduledAt" && trimmed.length === 0) return "Close date and time is required.";
  if (name === "classId" && trimmed.length === 0) return "Class is required.";
  if (name === "durationMinutes") return validatePositiveValue(trimmed, "Duration", "greater than 0.");
  if (name === "totalAttempts") return validateWholeNumber(trimmed);
  if (name === "totalQuestions") return requiresQuestionBuilder(values.submissionMethods) ? validatePositiveValue(trimmed, "Total number of questions", "greater than 0.") : null;
  if (name === "submissionMethods") return validateExamSubmissionMethods(value as FormValues["submissionMethods"]);
  if (name === "maxScore") return validatePositiveValue(trimmed, "Max score", "a positive number.");
  return null;
}

function validatePositiveValue(value: string, label: string, suffix: string) {
  if (value.length === 0) return `${label} is required.`;
  const parsed = Number(value);
  return !Number.isFinite(parsed) || parsed <= 0 ? `${label} must be ${suffix}` : null;
}

function validateWholeNumber(value: string) {
  if (value.length === 0) return "Total attempts is required";
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return "Total attempts must be a whole number";
  if (parsed < 1) return "Total attempts must be at least 1";
  return null;
}

export function getExamEditErrors(values: FormValues): FormErrors {
  return {
    title: validateExamEditField("title", values.title, values),
    instructions: validateExamEditField("instructions", values.instructions, values),
    questionsText: validateExamEditField("questionsText", values.questionsText, values),
    scheduledAt: validateExamEditField("scheduledAt", values.scheduledAt, values),
    classId: validateExamEditField("classId", values.classId, values),
    classLabel: validateExamEditField("classLabel", values.classLabel, values),
    accessCode: validateExamEditField("accessCode", values.accessCode, values),
    durationMinutes: validateExamEditField("durationMinutes", values.durationMinutes, values),
    totalAttempts: validateExamEditField("totalAttempts", values.totalAttempts, values),
    totalQuestions: validateExamEditField("totalQuestions", values.totalQuestions, values),
    submissionMethods: validateExamEditField("submissionMethods", values.submissionMethods, values),
    rubric: validateExamEditField("rubric", values.rubric, values),
    maxScore: validateExamEditField("maxScore", values.maxScore, values),
  };
}

export function canSaveExamEdit(errors: FormErrors) {
  return !errors.title && !errors.instructions && !errors.questionsText && !errors.scheduledAt && !errors.classId && !errors.accessCode && !errors.durationMinutes && !errors.totalAttempts && !errors.totalQuestions && !errors.submissionMethods && !errors.maxScore;
}
