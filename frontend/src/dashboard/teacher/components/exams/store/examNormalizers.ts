// Normalizes persisted exam records and provides clone helpers.
import type { ExamAttachment, TeacherExam } from "../ExamsTypes";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isAttachment(value: unknown): value is ExamAttachment {
  return isRecord(value) && typeof value.id === "string" && typeof value.name === "string" && typeof value.size === "number" && typeof value.type === "string" && typeof value.lastModified === "number";
}

function isAttachmentArray(value: unknown): value is ExamAttachment[] {
  return Array.isArray(value) && value.every((entry) => isAttachment(entry));
}

export function cloneExam(item: TeacherExam): TeacherExam {
  return { ...item, attachments: item.attachments?.map((attachment) => ({ ...attachment })) };
}

export function cloneExams(items: TeacherExam[]): TeacherExam[] {
  return items.map(cloneExam);
}

export function normalizeExam(input: unknown): TeacherExam | null {
  // Legacy drafts may still use className instead of classLabel, so both are accepted.
  if (!isRecord(input) || !["draft", "published"].includes(String(input.status))) return null;
  const classLabel = typeof input.classLabel === "string" ? input.classLabel : typeof input.className === "string" ? input.className : null;
  const classId = typeof input.classId === "string" ? input.classId : classLabel ? `legacy-${classLabel.toLowerCase().replace(/\s+/g, "-")}` : null;
  if (typeof input.id !== "string" || typeof input.title !== "string" || typeof input.subject !== "string" || typeof classId !== "string" || typeof classLabel !== "string" || typeof input.scheduledAt !== "string" || typeof input.durationMinutes !== "number" || typeof input.createdAt !== "string") return null;
  if ((input.totalQuestions !== undefined && typeof input.totalQuestions !== "number") || (input.maxScore !== undefined && typeof input.maxScore !== "number") || (input.rubric !== undefined && typeof input.rubric !== "string") || (input.instructions !== undefined && typeof input.instructions !== "string") || (input.questionsText !== undefined && typeof input.questionsText !== "string") || (input.attachments !== undefined && !isAttachmentArray(input.attachments))) return null;
  return { id: input.id, title: input.title, subject: input.subject, classId, classLabel, scheduledAt: input.scheduledAt, durationMinutes: input.durationMinutes, status: input.status as TeacherExam["status"], createdAt: input.createdAt, totalQuestions: typeof input.totalQuestions === "number" && Number.isFinite(input.totalQuestions) ? input.totalQuestions : 10, maxScore: input.maxScore, rubric: input.rubric, instructions: input.instructions, questionsText: input.questionsText, attachments: input.attachments };
}
