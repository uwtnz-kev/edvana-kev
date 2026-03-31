// Centralizes defaults and field ids for assignment create validation and scrolling.
import { DEFAULT_SUBMISSION_METHODS } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { FieldName, FormValues, TouchedState } from "./assignmentCreateTypes";

const DEFAULT_TOTAL_QUESTIONS = 10;

export const initialValues: FormValues = {
  title: "",
  instructions: "",
  questionsText: "",
  dueAt: "",
  classId: "",
  classLabel: "",
  accessCode: "",
  totalAttempts: "",
  totalQuestions: String(DEFAULT_TOTAL_QUESTIONS),
  submissionMethods: DEFAULT_SUBMISSION_METHODS,
  maxScore: "",
};

export const initialTouched: TouchedState = {
  title: false,
  instructions: false,
  questionsText: false,
  dueAt: false,
  classId: false,
  classLabel: false,
  accessCode: false,
  totalAttempts: false,
  totalQuestions: false,
  submissionMethods: false,
  maxScore: false,
};

export const allTouched: TouchedState = Object.keys(initialTouched).reduce((next, key) => {
  next[key as FieldName] = true;
  return next;
}, {} as TouchedState);

export const FIELD_IDS: Record<FieldName, string> = {
  title: "assignment-title",
  instructions: "assignment-instructions",
  questionsText: "assignment-questions-text",
  dueAt: "assignment-due-picker",
  classId: "assignment-class-trigger",
  classLabel: "assignment-class-trigger",
  accessCode: "assignment-access-code",
  totalAttempts: "assignment-total-attempts",
  totalQuestions: "assignment-total-questions",
  submissionMethods: "assignment-submission-methods",
  maxScore: "assignment-max-score",
};

