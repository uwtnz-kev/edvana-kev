/** Renders the shared attachments section for assignment creation. */
import { AssessmentAttachmentsSection } from "@/dashboard/teacher/components/shared/assessment/AssessmentAttachmentsSection";
import type { AssignmentAttachmentSectionProps } from "./assignmentCreateTypes";

export function TeacherAssignmentAttachmentsSection({
  attachments,
  attachmentsInputRef,
  onPickAttachments,
  onRemoveAttachment,
  onClearAttachments,
}: AssignmentAttachmentSectionProps) {
  return <AssessmentAttachmentsSection attachments={attachments} attachmentsInputRef={attachmentsInputRef} onPickAttachments={onPickAttachments} onRemoveAttachment={onRemoveAttachment} onClearAttachments={onClearAttachments} />;
}
