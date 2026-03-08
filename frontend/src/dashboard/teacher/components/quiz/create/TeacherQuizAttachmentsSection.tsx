/** Renders the shared attachments section for quiz creation. */
import { AssessmentAttachmentsSection } from "@/dashboard/teacher/components/shared/assessment/AssessmentAttachmentsSection";
import type { AttachmentSectionProps } from "./quizCreateTypes";

export function TeacherQuizAttachmentsSection({
  attachments,
  attachmentsInputRef,
  onPickAttachments,
  onRemoveAttachment,
  onClearAttachments,
}: AttachmentSectionProps) {
  return <AssessmentAttachmentsSection attachments={attachments} attachmentsInputRef={attachmentsInputRef} onPickAttachments={onPickAttachments} onRemoveAttachment={onRemoveAttachment} onClearAttachments={onClearAttachments} />;
}
