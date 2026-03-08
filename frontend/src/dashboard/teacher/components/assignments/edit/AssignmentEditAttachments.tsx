/** Renders attachment picking and removal controls for assignment editing. */
import { AssessmentAttachmentsSection } from "@/dashboard/teacher/components/shared/assessment/AssessmentAttachmentsSection";
import type { AssignmentEditAttachmentSectionProps } from "./assignmentEditTypes";

export function AssignmentEditAttachments({ attachments, attachmentsInputRef, onClearAttachments, onPickAttachments, onRemoveAttachment }: AssignmentEditAttachmentSectionProps) {
  return <AssessmentAttachmentsSection attachments={attachments} attachmentsInputRef={attachmentsInputRef} onPickAttachments={onPickAttachments} onRemoveAttachment={onRemoveAttachment} onClearAttachments={onClearAttachments} />;
}
