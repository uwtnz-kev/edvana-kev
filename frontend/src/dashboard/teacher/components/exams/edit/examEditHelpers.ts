/** Provides defaults, theme lookup, and shared attachment helpers for exam editing. */
import { buildAssessmentAttachmentId, formatAssessmentFileSize } from "@/dashboard/teacher/components/shared/assessment/assessmentAttachmentHelpers";
import { DEFAULT_SUBJECT_ICON_THEME, SUBJECT_ICON_THEME } from "@/dashboard/teacher/components/exams/examsTheme";
import type { ExamAttachment, TeacherExam } from "@/dashboard/teacher/components/exams";
import type { FieldName, FormValues, TouchedState } from "../create/examCreateTypes";

export const initialTouched: TouchedState = {
  title: false, instructions: false, questionsText: false, scheduledAt: false, classId: false,
  classLabel: false, durationMinutes: false, totalQuestions: false, rubric: false, maxScore: false,
};

export const FIELD_IDS: Record<FieldName, string> = {
  title: "exam-edit-title", instructions: "exam-edit-instructions", questionsText: "exam-edit-questions-text",
  scheduledAt: "exam-edit-scheduled-picker", classId: "exam-edit-class-trigger", classLabel: "exam-edit-class-trigger",
  durationMinutes: "exam-edit-duration", totalQuestions: "exam-edit-total-questions", rubric: "exam-edit-rubric", maxScore: "exam-edit-max-score",
};

export function toInitialExamEditValues(exam: TeacherExam): FormValues {
  return {
    title: exam.title, instructions: exam.instructions ?? "", questionsText: exam.questionsText ?? "",
    scheduledAt: exam.scheduledAt, classId: exam.classId, classLabel: exam.classLabel,
    durationMinutes: String(exam.durationMinutes), totalQuestions: String(exam.totalQuestions),
    rubric: exam.rubric ?? "", maxScore: exam.maxScore ? String(exam.maxScore) : "",
  };
}

export function getExamEditTheme(subjectName: string) {
  return SUBJECT_ICON_THEME[subjectName] ?? DEFAULT_SUBJECT_ICON_THEME;
}

export function formatExamEditFileSize(sizeInBytes: number) {
  return formatAssessmentFileSize(sizeInBytes);
}

export function buildExamEditAttachmentId() {
  return buildAssessmentAttachmentId();
}

export function mapFilesToExamAttachments(fileList: FileList): ExamAttachment[] {
  return Array.from(fileList).map((file) => ({ id: buildExamEditAttachmentId(), name: file.name, size: file.size, type: file.type, lastModified: file.lastModified }));
}
