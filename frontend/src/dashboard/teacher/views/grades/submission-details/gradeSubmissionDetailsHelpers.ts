// Helpers for grade submission details labels, derived questions, and totals.
import type { TeacherGradeSelectionType, TeacherGradeSubmission } from "@/dashboard/teacher/components/grades";

export function toDetailsTitle(type: TeacherGradeSelectionType) {
  if (type === "quiz") return "Quiz Submission";
  if (type === "assignment") return "Assignment Submission";
  return "Exam Submission";
}

export function getSubmissionQuestions(submission: TeacherGradeSubmission | null) {
  if (!submission) return [];
  if (submission.submissionDetails?.questions?.length) return submission.submissionDetails.questions;
  if (submission.type === "quiz" && submission.quizAnswers?.length) {
    return submission.quizAnswers.map((item, index) => ({ id: `q-${index + 1}`, prompt: item.question, studentAnswer: item.selectedAnswer, correctAnswer: "N/A", points: Math.max(1, Math.floor(submission.maxScore / Math.max(1, submission.quizAnswers?.length ?? 1))), earnedPoints: 0 }));
  }
  if (submission.type === "exam" && submission.examSectionAnswers?.length) {
    return submission.examSectionAnswers.map((item, index) => ({ id: `s-${index + 1}`, prompt: item.section, studentAnswer: item.answer, correctAnswer: "Teacher rubric", points: Math.max(1, Math.floor(submission.maxScore / Math.max(1, submission.examSectionAnswers?.length ?? 1))), earnedPoints: 0 }));
  }
  return [];
}

export function getSubmissionAttachments(submission: TeacherGradeSubmission) {
  return submission.submissionDetails?.attachments ?? (submission.assignmentAttachments ?? []).map((item) => ({ name: item.fileName, url: "#" }));
}

export function getCalculatedTotal(questionScores: Record<string, string>, questionIds: string[]) {
  return questionIds.reduce((sum, id) => {
    const parsed = Number(questionScores[id]);
    return Number.isFinite(parsed) && parsed >= 0 ? sum + parsed : sum;
  }, 0);
}

export function getEffectiveTotal(manualTotal: string, calculatedTotal: number) {
  const parsed = Number(manualTotal);
  return Number.isFinite(parsed) && manualTotal !== "" ? parsed : calculatedTotal;
}

export function formatSubmittedAt(value: string) {
  return new Date(value).toLocaleString();
}
