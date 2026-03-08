// Centralizes default values and DOM ids for exam create validation and scrolling.
import type { FieldName, FormValues, TouchedState } from "./examCreateTypes";

const DEFAULT_TOTAL_QUESTIONS = 10;

export const initialValues: FormValues = {
  title: "",
  instructions: "",
  questionsText: "",
  scheduledAt: "",
  classId: "",
  classLabel: "",
  durationMinutes: "",
  totalQuestions: String(DEFAULT_TOTAL_QUESTIONS),
  rubric: "",
  maxScore: "",
};

export const initialTouched: TouchedState = {
  title: false,
  instructions: false,
  questionsText: false,
  scheduledAt: false,
  classId: false,
  classLabel: false,
  durationMinutes: false,
  totalQuestions: false,
  rubric: false,
  maxScore: false,
};

export const allTouched: TouchedState = Object.keys(initialTouched).reduce((next, key) => {
  next[key as FieldName] = true;
  return next;
}, {} as TouchedState);

export const FIELD_IDS: Record<FieldName, string> = {
  title: "exam-title",
  instructions: "exam-instructions",
  questionsText: "exam-questions-text",
  scheduledAt: "exam-scheduled-picker",
  classId: "exam-class-trigger",
  classLabel: "exam-class-trigger",
  durationMinutes: "exam-duration",
  totalQuestions: "exam-total-questions",
  rubric: "exam-rubric",
  maxScore: "exam-max-score",
};
