/** Renders the shared attachments section for exam editing. */
import { AssessmentAttachmentsSection } from "@/dashboard/teacher/components/shared/assessment/AssessmentAttachmentsSection";
import type { useTeacherExamEditForm } from "./useTeacherExamEditForm";

type Props = { state: ReturnType<typeof useTeacherExamEditForm> };

export function ExamEditAttachments({ state }: Props) {
  return <AssessmentAttachmentsSection attachments={state.attachments} attachmentsInputRef={state.attachmentsInputRef} onPickAttachments={state.onPickAttachments} onRemoveAttachment={state.onRemoveAttachment} onClearAttachments={state.onClearAttachments} />;
}
