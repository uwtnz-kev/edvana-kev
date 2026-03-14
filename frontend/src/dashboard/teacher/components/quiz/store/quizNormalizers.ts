// Normalizes persisted quiz records and provides clone helpers.
import type { QuizAttachment, TeacherQuiz } from "../QuizTypes";
import { cloneSubmissionMethodAssessment, normalizeSubmissionMethods } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isAttachment(value: unknown): value is QuizAttachment {
  return isRecord(value) && typeof value.id === "string" && typeof value.name === "string" && typeof value.size === "number" && typeof value.type === "string" && typeof value.lastModified === "number";
}

function isAttachmentArray(value: unknown): value is QuizAttachment[] {
  return Array.isArray(value) && value.every((entry) => isAttachment(entry));
}

function normalizeDifficulty(value: unknown): TeacherQuiz["difficulty"] | null {
  return value === "easy" || value === "medium" || value === "hard" ? value : null;
}

function normalizeType(value: unknown): TeacherQuiz["type"] | null {
  return value === "mcq" || value === "mixed" || value === "short_answer" ? value : null;
}

export function cloneQuiz(item: TeacherQuiz): TeacherQuiz {
  return { ...cloneSubmissionMethodAssessment(item), attachments: item.attachments?.map((attachment) => ({ ...attachment })) };
}

export function cloneQuizzes(items: TeacherQuiz[]): TeacherQuiz[] {
  return items.map(cloneQuiz);
}

export function normalizeQuiz(input: unknown): TeacherQuiz | null {
  // Legacy quiz drafts may still use className or estimatedMinutes, so both are accepted.
  if (!isRecord(input) || !["draft", "published", "archived", "closed"].includes(String(input.status))) return null;
  const classLabel = typeof input.classLabel === "string" ? input.classLabel : typeof input.className === "string" ? input.className : null;
  const classId = typeof input.classId === "string" ? input.classId : classLabel ? `legacy-${classLabel.toLowerCase().replace(/\s+/g, "-")}` : null;
  const durationMinutes = typeof input.durationMinutes === "number" ? input.durationMinutes : typeof input.estimatedMinutes === "number" ? input.estimatedMinutes : null;
  if (typeof input.id !== "string" || typeof input.title !== "string" || typeof input.subject !== "string" || typeof classId !== "string" || typeof classLabel !== "string" || typeof input.dueAt !== "string" || durationMinutes === null || typeof input.createdAt !== "string") return null;
  if ((input.totalQuestions !== undefined && typeof input.totalQuestions !== "number") || (input.totalAttempts !== undefined && typeof input.totalAttempts !== "number") || (input.maxScore !== undefined && typeof input.maxScore !== "number") || (input.rubric !== undefined && typeof input.rubric !== "string") || (input.instructions !== undefined && typeof input.instructions !== "string") || (input.questionsText !== undefined && typeof input.questionsText !== "string") || (input.attachments !== undefined && !isAttachmentArray(input.attachments)) || (input.accessCode !== undefined && typeof input.accessCode !== "string")) return null;
  const status = input.status === "archived" ? "closed" : (input.status as TeacherQuiz["status"]);
  return { id: input.id, title: input.title, subject: input.subject, classId, classLabel, dueAt: input.dueAt, durationMinutes, totalAttempts: typeof input.totalAttempts === "number" && Number.isFinite(input.totalAttempts) && input.totalAttempts >= 1 ? Math.trunc(input.totalAttempts) : 1, totalQuestions: typeof input.totalQuestions === "number" && Number.isFinite(input.totalQuestions) ? input.totalQuestions : 10, difficulty: normalizeDifficulty(input.difficulty) ?? "medium", type: normalizeType(input.type) ?? "mcq", status, createdAt: input.createdAt, submissionMethods: normalizeSubmissionMethods(input.submissionMethods), maxScore: input.maxScore, rubric: input.rubric, instructions: input.instructions, questionsText: input.questionsText, attachments: input.attachments, accessCode: input.accessCode };
}
