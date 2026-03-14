// Normalizes persisted assignment records and provides clone helpers.
import type { AssignmentAttachment, TeacherAssignment } from "../AssignmentsTypes";
import { cloneSubmissionMethodAssessment, normalizeSubmissionMethods } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isAttachment(value: unknown): value is AssignmentAttachment {
  return isRecord(value) && typeof value.id === "string" && typeof value.name === "string" && typeof value.size === "number" && typeof value.type === "string" && typeof value.lastModified === "number";
}

function isAttachmentArray(value: unknown): value is AssignmentAttachment[] {
  return Array.isArray(value) && value.every((entry) => isAttachment(entry));
}

export function cloneAssignment(item: TeacherAssignment): TeacherAssignment {
  return cloneSubmissionMethodAssessment(item);
}

export function cloneAssignments(items: TeacherAssignment[]): TeacherAssignment[] {
  return items.map(cloneAssignment);
}

export function normalizeAssignment(input: unknown): TeacherAssignment | null {
  // Legacy drafts may still use className instead of classLabel, so both are accepted.
  if (!isRecord(input) || !["draft", "published", "archived", "closed"].includes(String(input.status))) return null;
  const classLabel = typeof input.classLabel === "string" ? input.classLabel : typeof input.className === "string" ? input.className : null;
  const classId = typeof input.classId === "string" ? input.classId : classLabel ? `legacy-${classLabel.toLowerCase().replace(/\s+/g, "-")}` : null;
  if (typeof input.id !== "string" || typeof input.title !== "string" || typeof input.subject !== "string" || typeof classId !== "string" || typeof classLabel !== "string" || typeof input.dueAt !== "string" || typeof input.createdAt !== "string" || typeof input.totalSubmissions !== "number" || typeof input.pendingToGrade !== "number" || typeof input.estimatedMinutes !== "number") return null;
  if ((input.totalQuestions !== undefined && typeof input.totalQuestions !== "number") || (input.totalAttempts !== undefined && typeof input.totalAttempts !== "number") || (input.instructions !== undefined && typeof input.instructions !== "string") || (input.questionsText !== undefined && typeof input.questionsText !== "string") || (input.attachments !== undefined && !isAttachmentArray(input.attachments)) || (input.rubric !== undefined && typeof input.rubric !== "string") || (input.maxScore !== undefined && typeof input.maxScore !== "number") || (input.accessCode !== undefined && typeof input.accessCode !== "string")) return null;
  const status = input.status === "archived" ? "closed" : (input.status as TeacherAssignment["status"]);
  return { id: input.id, title: input.title, subject: input.subject, classId, classLabel, dueAt: input.dueAt, createdAt: input.createdAt, status, totalAttempts: typeof input.totalAttempts === "number" && Number.isFinite(input.totalAttempts) && input.totalAttempts >= 1 ? Math.trunc(input.totalAttempts) : 1, totalQuestions: typeof input.totalQuestions === "number" && Number.isFinite(input.totalQuestions) ? input.totalQuestions : 10, totalSubmissions: input.totalSubmissions, pendingToGrade: input.pendingToGrade, estimatedMinutes: input.estimatedMinutes, submissionMethods: normalizeSubmissionMethods(input.submissionMethods), instructions: input.instructions, questionsText: input.questionsText, attachments: input.attachments, rubric: input.rubric, maxScore: input.maxScore, accessCode: input.accessCode };
}
