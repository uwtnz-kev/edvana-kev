/** Provides defaults, theme lookup, and shared attachment helpers for quiz editing. */
import { buildAssessmentAttachmentId, formatAssessmentFileSize } from "@/dashboard/teacher/components/shared/assessment/assessmentAttachmentHelpers";
import {
  DEFAULT_SUBJECT_ICON_THEME,
  SUBJECT_ICON_THEME,
} from "@/dashboard/teacher/components/quiz/QuizTheme";
import type { QuizAttachment, TeacherQuiz } from "@/dashboard/teacher/components/quiz";
import type { FieldName, FormValues, TouchedState } from "../create/quizCreateTypes";

export const DEFAULT_TOTAL_QUESTIONS = 10;

export const initialTouched: TouchedState = {
  title: false, instructions: false, questionsText: false, dueAt: false, classId: false,
  classLabel: false, durationMinutes: false, totalQuestions: false, rubric: false, maxScore: false,
};

export const FIELD_IDS: Record<FieldName, string> = {
  title: "quiz-edit-title", instructions: "quiz-edit-instructions", questionsText: "quiz-edit-questions-text",
  dueAt: "quiz-edit-due-picker", classId: "quiz-edit-class-trigger", classLabel: "quiz-edit-class-trigger",
  durationMinutes: "quiz-edit-duration-minutes", totalQuestions: "quiz-edit-total-questions", rubric: "quiz-edit-rubric", maxScore: "quiz-edit-max-score",
};

export function toInitialQuizEditValues(quiz: TeacherQuiz): FormValues {
  return {
    title: quiz.title,
    instructions: quiz.instructions ?? "",
    questionsText: quiz.questionsText ?? "",
    dueAt: quiz.dueAt,
    classId: quiz.classId,
    classLabel: quiz.classLabel,
    durationMinutes: String(quiz.durationMinutes),
    totalQuestions: String(quiz.totalQuestions ?? DEFAULT_TOTAL_QUESTIONS),
    rubric: quiz.rubric ?? "",
    maxScore: quiz.maxScore ? String(quiz.maxScore) : "",
  };
}

export function getQuizEditTheme(subjectName: string) {
  return SUBJECT_ICON_THEME[subjectName] ?? DEFAULT_SUBJECT_ICON_THEME;
}

export function formatQuizEditFileSize(sizeInBytes: number) {
  return formatAssessmentFileSize(sizeInBytes);
}

export function buildQuizEditAttachmentId() {
  return buildAssessmentAttachmentId();
}

export function mapFilesToQuizAttachments(fileList: FileList): QuizAttachment[] {
  return Array.from(fileList).map((file) => ({
    id: buildQuizEditAttachmentId(),
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  }));
}
