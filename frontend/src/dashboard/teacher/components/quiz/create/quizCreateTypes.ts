// Defines the create-form data contracts shared across extracted quiz form sections.
import type { QuizAttachment } from "@/dashboard/teacher/components/quiz";
import type { SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";

export type TeacherQuizCreateFormProps = {
  subjectId: string;
  subjectName: string;
  onCancel: () => void;
  onSaved: (subjectId: string) => void;
};

export type FormValues = {
  title: string;
  instructions: string;
  questionsText: string;
  dueAt: string;
  classId: string;
  classLabel: string;
  accessCode: string;
  durationMinutes: string;
  totalAttempts: string;
  totalQuestions: string;
  submissionMethods: SubmissionMethod[];
  rubric: string;
  maxScore: string;
};

export type FieldName = keyof FormValues;
export type TouchedState = Record<FieldName, boolean>;
export type FormErrors = Record<FieldName, string | null>;

export type QuizCreateLocationState = {
  formDraft?: Partial<FormValues>;
  questionDraftId?: string;
  questionsText?: string;
  questionsTextFromBuilder?: string;
};

export type QuizFieldProps = {
  values: FormValues;
  errors: FormErrors;
  touched: TouchedState;
  onFieldChange: (name: FieldName, value: string) => void;
  onFieldBlur: (name: FieldName) => void;
  onSubmissionMethodsChange: (methods: SubmissionMethod[]) => void;
};

export type AttachmentSectionProps = {
  attachments: QuizAttachment[];
  attachmentsInputRef: React.RefObject<HTMLInputElement | null>;
  onPickAttachments: React.ChangeEventHandler<HTMLInputElement>;
  onRemoveAttachment: (id: string) => void;
  onClearAttachments: () => void;
};
