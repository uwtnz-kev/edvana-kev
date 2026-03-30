/** Renders the shared attachments section for assignment creation. */
import { AssessmentAttachmentsSection } from "@/dashboard/teacher/components/shared/assessment/AssessmentAttachmentsSection";
import type { AssignmentAttachmentSectionProps } from "./assignmentCreateTypes";

export function TeacherAssignmentAttachmentsSection({
  allowFileUpload,
  attachments,
  attachmentsError,
  attachmentsInputRef,
  onPickAttachments,
  onRemoveAttachment,
  onClearAttachments,
}: AssignmentAttachmentSectionProps) {
  void allowFileUpload;

  return (
    <AssessmentAttachmentsSection
      attachments={attachments}
      attachmentsError={attachmentsError}
      attachmentsInputRef={attachmentsInputRef}
      onPickAttachments={onPickAttachments}
      onRemoveAttachment={onRemoveAttachment}
      onClearAttachments={onClearAttachments}
      showActionIcons
      showHeader={false}
      addAttachmentsLabel="Add attachments (Optional)"
    />
  );
}
