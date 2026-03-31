/** Defines shared types used across the extracted assignment edit form files. */
import type { AssignmentAttachment, TeacherAssignment } from "@/dashboard/teacher/components/assignments";
import type { SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";

export type TeacherAssignmentEditFormProps = {
  assignment: TeacherAssignment;
  onCancel: () => void;
  onSaved: () => void;
};

export type FormValues = {
  title: string;
  instructions: string;
  questionsText: string;
  dueAt: string;
  classId: string;
  classLabel: string;
  accessCode: string;
  totalAttempts: string;
  totalQuestions: string;
  submissionMethods: SubmissionMethod[];
  rubric: string;
  maxScore: string;
};

export type FieldName = keyof FormValues;
export type TouchedState = Record<FieldName, boolean>;
export type FormErrors = Record<FieldName, string | null>;
export type AssignmentEditFieldProps = {
  assignment: TeacherAssignment;
  values: FormValues;
  errors: FormErrors;
  touched: TouchedState;
  showError: (name: FieldName) => boolean;
  onFieldChange: (name: FieldName, value: string) => void;
  onFieldBlur: (name: FieldName) => void;
  onSubmissionMethodsChange: (methods: SubmissionMethod[]) => void;
  onClassChange: (value: string) => void;
  requiresQuestionBuilder: boolean;
  onOpenPreview: () => void;
  onOpenQuestionBuilder: () => void;
};

export type AssignmentEditAttachmentSectionProps = {
  attachments: AssignmentAttachment[];
  attachmentsInputRef: React.RefObject<HTMLInputElement | null>;
  onPickAttachments: React.ChangeEventHandler<HTMLInputElement>;
  onRemoveAttachment: (id: string) => void;
  onClearAttachments: () => void;
};

