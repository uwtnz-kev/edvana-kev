// Centralizes defaults and field ids for assignment create validation and scrolling.
import type { FieldName, FormValues, TouchedState } from "./assignmentCreateTypes";

const DEFAULT_TOTAL_QUESTIONS = 10;

export const initialValues: FormValues = {
  title: "",
  instructions: "",
  questionsText: "",
  dueAt: "",
  classId: "",
  classLabel: "",
  estimatedMinutes: "",
  totalQuestions: String(DEFAULT_TOTAL_QUESTIONS),
  rubric: "",
  maxScore: "",
};

export const initialTouched: TouchedState = {
  title: false,
  instructions: false,
  questionsText: false,
  dueAt: false,
  classId: false,
  classLabel: false,
  estimatedMinutes: false,
  totalQuestions: false,
  rubric: false,
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
  estimatedMinutes: "assignment-estimated",
  totalQuestions: "assignment-total-questions",
  rubric: "assignment-rubric",
  maxScore: "assignment-max-score",
};
