// Defines the shared data contracts for the extracted exam create form.
import type { ExamAttachment } from "@/dashboard/teacher/components/exams";

export type TeacherExamCreateFormProps = {
  subjectId: string;
  subjectName: string;
  onCancel: () => void;
  onSaved: (subjectId: string) => void;
};

export type FormValues = {
  title: string;
  instructions: string;
  questionsText: string;
  scheduledAt: string;
  classId: string;
  classLabel: string;
  durationMinutes: string;
  totalQuestions: string;
  rubric: string;
  maxScore: string;
};

export type FieldName = keyof FormValues;
export type TouchedState = Record<FieldName, boolean>;
export type FormErrors = Record<FieldName, string | null>;

export type ExamCreateLocationState = {
  formDraft?: Partial<FormValues>;
  questionDraftId?: string;
  questionsText?: string;
  questionsTextFromBuilder?: string;
};

export type ExamFieldProps = {
  values: FormValues;
  errors: FormErrors;
  touched: TouchedState;
  onFieldChange: (name: FieldName, value: string) => void;
  onFieldBlur: (name: FieldName) => void;
};

export type ExamAttachmentSectionProps = {
  attachments: ExamAttachment[];
  attachmentsInputRef: React.RefObject<HTMLInputElement | null>;
  onPickAttachments: React.ChangeEventHandler<HTMLInputElement>;
  onRemoveAttachment: (id: string) => void;
  onClearAttachments: () => void;
};
