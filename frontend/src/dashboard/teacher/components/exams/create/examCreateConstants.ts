// Centralizes default values and DOM ids for exam create validation and scrolling.
import { DEFAULT_SUBMISSION_METHODS } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import type { FieldName, FormValues, TouchedState } from "./examCreateTypes";

const DEFAULT_TOTAL_QUESTIONS = 10;

export const initialValues: FormValues = {
  title: "",
  instructions: "",
  questionsText: "",
  scheduledAt: "",
  classId: "",
  classLabel: "",
  accessCode: "",
  durationMinutes: "",
  totalAttempts: "1",
  totalQuestions: String(DEFAULT_TOTAL_QUESTIONS),
  submissionMethods: DEFAULT_SUBMISSION_METHODS,
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
  title: "exam-title",
  instructions: "exam-instructions",
  questionsText: "exam-questions-text",
  scheduledAt: "exam-scheduled-picker",
  classId: "exam-class-trigger",
  classLabel: "exam-class-trigger",
  accessCode: "exam-access-code",
  durationMinutes: "exam-duration",
  totalAttempts: "exam-total-attempts",
  totalQuestions: "exam-total-questions",
  submissionMethods: "exam-submission-methods",
  rubric: "exam-rubric",
  maxScore: "exam-max-score",
};
