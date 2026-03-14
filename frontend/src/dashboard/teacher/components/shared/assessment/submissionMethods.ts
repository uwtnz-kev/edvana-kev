import type { TeacherAssignment } from "@/dashboard/teacher/components/assignments";
import type { TeacherExam } from "@/dashboard/teacher/components/exams";
import type { TeacherQuiz } from "@/dashboard/teacher/components/quiz";

export type SubmissionMethod =
  | "quiz_form"
  | "file_upload"
  | "text_entry"
  | "link_submission";

export type AssessmentWithSubmissionMethods = {
  submissionMethods?: SubmissionMethod[];
  questionsText?: string;
};

export const QUIZ_FORM_SUBMISSION_METHOD: SubmissionMethod = "quiz_form";

export const DEFAULT_SUBMISSION_METHODS: SubmissionMethod[] = [QUIZ_FORM_SUBMISSION_METHOD];

export const SUBMISSION_METHOD_OPTIONS: Array<{ value: SubmissionMethod; label: string; description: string }> = [
  { value: "quiz_form", label: "Quiz Form", description: "Use Edvana's internal question builder and auto-graded flow." },
  { value: "file_upload", label: "File Upload", description: "Students upload documents, images, or other files." },
  { value: "text_entry", label: "Text Entry", description: "Students submit a written response directly in the form." },
  { value: "link_submission", label: "Link Submission", description: "Students submit a URL for external work." },
];

const VALID_SUBMISSION_METHODS = new Set<SubmissionMethod>(SUBMISSION_METHOD_OPTIONS.map((option) => option.value));

export function normalizeSubmissionMethods(
  value: unknown,
  fallback: SubmissionMethod[] = DEFAULT_SUBMISSION_METHODS
): SubmissionMethod[] {
  if (!Array.isArray(value)) return [...fallback];
  const methods = value.filter((entry): entry is SubmissionMethod => VALID_SUBMISSION_METHODS.has(entry as SubmissionMethod));
  const unique = Array.from(new Set(methods));
  return unique.length > 0 ? unique : [...fallback];
}

export function validateSubmissionMethods(methods: SubmissionMethod[]): string | null {
  if (methods.length === 0) return "Select at least one submission method";
  if (methods.includes(QUIZ_FORM_SUBMISSION_METHOD) && methods.length > 1) {
    return "Quiz Form cannot be combined with other submission methods";
  }
  return null;
}

export function requiresQuestionBuilder(methods: SubmissionMethod[]): boolean {
  return methods.includes(QUIZ_FORM_SUBMISSION_METHOD);
}

export function toggleSubmissionMethod(
  current: SubmissionMethod[],
  method: SubmissionMethod
): SubmissionMethod[] {
  const exists = current.includes(method);
  if (method === QUIZ_FORM_SUBMISSION_METHOD) return exists ? [] : [QUIZ_FORM_SUBMISSION_METHOD];
  const withoutQuizForm = current.filter((entry) => entry !== QUIZ_FORM_SUBMISSION_METHOD);
  if (exists) return withoutQuizForm.filter((entry) => entry !== method);
  return [...withoutQuizForm, method];
}

export function getQuestionBuilderPersistenceValues(methods: SubmissionMethod[], questionsText: string, totalQuestions: string) {
  if (!requiresQuestionBuilder(methods)) {
    return {
      questionsText: undefined,
      totalQuestions: 0,
    };
  }

  const parsedTotalQuestions = Number(totalQuestions);
  return {
    questionsText: questionsText.trim() || undefined,
    totalQuestions: Number.isFinite(parsedTotalQuestions) ? parsedTotalQuestions : 10,
  };
}

export function hydrateSubmissionMethods<T extends AssessmentWithSubmissionMethods>(
  item: T
): SubmissionMethod[] {
  return normalizeSubmissionMethods(item.submissionMethods, item.questionsText?.trim() ? DEFAULT_SUBMISSION_METHODS : DEFAULT_SUBMISSION_METHODS);
}

export function cloneSubmissionMethodAssessment<T extends TeacherAssignment | TeacherQuiz | TeacherExam>(item: T): T {
  return {
    ...item,
    submissionMethods: [...normalizeSubmissionMethods(item.submissionMethods)],
  };
}
