// Centralizes reusable defaults and DOM ids for the quiz create form.
import { DEFAULT_SUBMISSION_METHODS } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { FieldName, FormValues, TouchedState } from "./quizCreateTypes";

const DEFAULT_TOTAL_QUESTIONS = 10;

export const initialValues: FormValues = {
  title: "",
  instructions: "",
  questionsText: "",
  dueAt: "",
  classId: "",
  classLabel: "",
  accessCode: "",
  durationMinutes: "",
  totalAttempts: "",
  totalQuestions: String(DEFAULT_TOTAL_QUESTIONS),
  submissionMethods: DEFAULT_SUBMISSION_METHODS,
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
  accessCode: false,
  durationMinutes: false,
  totalAttempts: false,
  totalQuestions: false,
  submissionMethods: false,
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
  accessCode: "quiz-access-code",
  durationMinutes: "quiz-duration-minutes",
  totalAttempts: "quiz-total-attempts",
  totalQuestions: "quiz-total-questions",
  submissionMethods: "quiz-submission-methods",
  rubric: "quiz-rubric",
  maxScore: "quiz-max-score",
};
