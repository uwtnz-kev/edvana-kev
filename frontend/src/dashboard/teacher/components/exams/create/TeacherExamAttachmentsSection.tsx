/** Renders the shared attachments section for exam creation. */
import { AssessmentAttachmentsSection } from "@/dashboard/teacher/components/shared/assessment/AssessmentAttachmentsSection";
import type { ExamAttachmentSectionProps } from "./examCreateTypes";

export function TeacherExamAttachmentsSection({
  attachments,
  attachmentsInputRef,
  onPickAttachments,
  onRemoveAttachment,
  onClearAttachments,
}: ExamAttachmentSectionProps) {
  return <AssessmentAttachmentsSection attachments={attachments} attachmentsInputRef={attachmentsInputRef} onPickAttachments={onPickAttachments} onRemoveAttachment={onRemoveAttachment} onClearAttachments={onClearAttachments} />;
}
