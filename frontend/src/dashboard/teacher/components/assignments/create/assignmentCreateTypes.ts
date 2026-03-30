// Defines the shared types used across the extracted assignment create form files.
import type { AssignmentAttachment } from "@/dashboard/teacher/components/assignments";
import type { SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";

export type TeacherAssignmentCreateFormProps = {
  subjectId: string;
  subjectName: string;
  lockedClassId?: string;
  lockedClassLabel?: string;
  onCancel: () => void;
  onSaved: (subjectId: string, classRouteId?: string) => void;
};

export type FormValues = {
  title: string;
  instructions: string;
  questionsText: string;
  dueAt: string;
  classId: string;
  classLabel: string;
  accessCode: string;
  estimatedMinutes: string;
  totalAttempts: string;
  totalQuestions: string;
  submissionMethods: SubmissionMethod[];
  maxScore: string;
};

export type FieldName = keyof FormValues;
export type TouchedState = Record<FieldName, boolean>;
export type FormErrors = Record<FieldName, string | null>;

export type AssignmentCreateLocationState = {
  formDraft?: Partial<FormValues>;
  questionDraftId?: string;
  questionsText?: string;
  questionsTextFromBuilder?: string;
};

export type AssignmentFieldProps = {
  values: FormValues;
  errors: FormErrors;
  touched: TouchedState;
  onFieldChange: (name: FieldName, value: string) => void;
  onFieldBlur: (name: FieldName) => void;
  onSubmissionMethodsChange: (methods: SubmissionMethod[]) => void;
};

export type AssignmentAttachmentSectionProps = {
  allowFileUpload: boolean;
  attachments: AssignmentAttachment[];
  attachmentsError: string | null;
  attachmentsInputRef: React.RefObject<HTMLInputElement | null>;
  onPickAttachments: React.ChangeEventHandler<HTMLInputElement>;
  onRemoveAttachment: (id: string) => void;
  onClearAttachments: () => void;
};
