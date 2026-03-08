/** Provides defaults, field ids, and small utilities for assignment editing. */
import { buildAssessmentAttachmentId, formatAssessmentFileSize } from "@/dashboard/teacher/components/shared/assessment/assessmentAttachmentHelpers";
import type { TeacherAssignment } from "@/dashboard/teacher/components/assignments";
import type { FieldName, FormValues, TouchedState } from "./assignmentEditTypes";

const DEFAULT_TOTAL_QUESTIONS = 10;

export const INITIAL_TOUCHED: TouchedState = {
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

export const ALL_TOUCHED = Object.keys(INITIAL_TOUCHED).reduce((next, key) => {
  next[key as FieldName] = true;
  return next;
}, {} as TouchedState);

export const FIELD_IDS: Record<FieldName, string> = {
  title: "assignment-edit-title",
  instructions: "assignment-edit-instructions",
  questionsText: "assignment-edit-questions-text",
  dueAt: "assignment-edit-due-picker",
  classId: "assignment-edit-class-trigger",
  classLabel: "assignment-edit-class-trigger",
  estimatedMinutes: "assignment-edit-estimated",
  totalQuestions: "assignment-edit-total-questions",
  rubric: "assignment-edit-rubric",
  maxScore: "assignment-edit-max-score",
};

export function toInitialValues(assignment: TeacherAssignment): FormValues {
  return {
    title: assignment.title,
    instructions: assignment.instructions ?? "",
    questionsText: assignment.questionsText ?? "",
    dueAt: assignment.dueAt,
    classId: assignment.classId,
    classLabel: assignment.classLabel,
    estimatedMinutes: String(assignment.estimatedMinutes),
    totalQuestions: String(assignment.totalQuestions ?? DEFAULT_TOTAL_QUESTIONS),
    rubric: assignment.rubric ?? "",
    maxScore: assignment.maxScore ? String(assignment.maxScore) : "",
  };
}

export function formatFileSize(sizeInBytes: number) {
  return formatAssessmentFileSize(sizeInBytes);
}

export function buildAttachmentId() {
  return buildAssessmentAttachmentId();
}
