// Centralizes reusable defaults and DOM ids for the quiz create form.
import type { FieldName, FormValues, TouchedState } from "./quizCreateTypes";

const DEFAULT_TOTAL_QUESTIONS = 10;

export const initialValues: FormValues = {
  title: "",
  instructions: "",
  questionsText: "",
  dueAt: "",
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
  dueAt: false,
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
  title: "quiz-title",
  instructions: "quiz-instructions",
  questionsText: "quiz-questions-text",
  dueAt: "quiz-due-picker",
  classId: "quiz-class-trigger",
  classLabel: "quiz-class-trigger",
  durationMinutes: "quiz-duration-minutes",
  totalQuestions: "quiz-total-questions",
  rubric: "quiz-rubric",
  maxScore: "quiz-max-score",
};
