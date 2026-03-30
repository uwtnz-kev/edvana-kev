import type { AssignmentStatus, TeacherAssignment } from "@/dashboard/teacher/components/assignments";
import {
  QUIZ_FORM_SUBMISSION_METHOD,
  normalizeSubmissionMethods,
} from "./submissionMethods";

export type AssignmentAttemptContext = {
  attemptCount?: number | null;
};

export type AssignmentRules = {
  isClosedByDueAt: boolean;
  requiresAccessCode: boolean;
  hasAccessCode: boolean;
  hasAttemptsLimit: boolean;
  hasAttemptContext: boolean;
  hasAttemptsRemaining: boolean;
  attemptsRemaining: number | null;
  allowsFileUpload: boolean;
  allowsTextEntry: boolean;
  allowsLinkSubmission: boolean;
  isQuizForm: boolean;
  derivedStatus: AssignmentStatus;
  canStart: boolean;
  canSubmit: boolean;
};

type AssignmentRulesInput = Pick<
  TeacherAssignment,
  "accessCode" | "dueAt" | "status" | "submissionMethods" | "totalAttempts"
>;

export function resolveAssignmentRules(
  assignment: AssignmentRulesInput,
  now: Date | string | number = new Date(),
  attemptContext?: AssignmentAttemptContext
): AssignmentRules {
  const nowDate = toValidDate(now);
  const dueAtDate = toValidDate(assignment.dueAt);
  const isClosedByDueAt = Boolean(
    nowDate && dueAtDate && nowDate.getTime() >= dueAtDate.getTime()
  );
  const requiresAccessCode = assignment.accessCode?.trim().length
    ? true
    : false;
  const methods = normalizeSubmissionMethods(assignment.submissionMethods, []);
  const isQuizForm = methods.includes(QUIZ_FORM_SUBMISSION_METHOD);
  const activeMethods = isQuizForm
    ? [QUIZ_FORM_SUBMISSION_METHOD]
    : methods;

  const hasAttemptsLimit =
    Number.isFinite(assignment.totalAttempts) && assignment.totalAttempts > 0;
  const hasAttemptContext =
    typeof attemptContext?.attemptCount === "number" &&
    Number.isFinite(attemptContext.attemptCount);
  const attemptsUsed = hasAttemptContext
    ? Math.max(0, Math.trunc(attemptContext?.attemptCount ?? 0))
    : null;
  const attemptsRemaining =
    hasAttemptsLimit && attemptsUsed !== null
      ? Math.max(assignment.totalAttempts - attemptsUsed, 0)
      : null;
  const hasAttemptsRemaining = hasAttemptsLimit
    ? attemptsRemaining === null || attemptsRemaining > 0
    : true;
  const derivedStatus = deriveAssignmentStatus(
    assignment.status,
    isClosedByDueAt
  );
  const canStart = !isClosedByDueAt && hasAttemptsRemaining;
  const canSubmit = !isClosedByDueAt && hasAttemptsRemaining;

  return {
    isClosedByDueAt,
    requiresAccessCode,
    hasAccessCode: requiresAccessCode,
    hasAttemptsLimit,
    hasAttemptContext,
    hasAttemptsRemaining,
    attemptsRemaining,
    allowsFileUpload: activeMethods.includes("file_upload"),
    allowsTextEntry: activeMethods.includes("text_entry"),
    allowsLinkSubmission: activeMethods.includes("link_submission"),
    isQuizForm,
    derivedStatus,
    canStart,
    canSubmit,
  };
}

function deriveAssignmentStatus(
  status: AssignmentStatus,
  isClosedByDueAt: boolean
): AssignmentStatus {
  if (status === "closed") return "closed";
  if (status === "published" && isClosedByDueAt) return "closed";
  return status;
}

function toValidDate(value: Date | string | number | undefined | null) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
