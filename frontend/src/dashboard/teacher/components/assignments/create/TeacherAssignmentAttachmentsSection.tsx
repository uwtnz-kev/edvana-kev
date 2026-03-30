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
  if (!allowFileUpload) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/10 px-4 py-5 text-sm text-white/75">
        Attachments are only available when Submission Method includes File Upload.
      </div>
    );
  }

  return (
    <AssessmentAttachmentsSection
      attachments={attachments}
      attachmentsError={attachmentsError}
      attachmentsInputRef={attachmentsInputRef}
      onPickAttachments={onPickAttachments}
      onRemoveAttachment={onRemoveAttachment}
      onClearAttachments={onClearAttachments}
      showActionIcons
    />
  );
}
