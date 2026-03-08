/** Renders the shared attachments section for quiz editing. */
import { AssessmentAttachmentsSection } from "@/dashboard/teacher/components/shared/assessment/AssessmentAttachmentsSection";
import type { useTeacherQuizEditForm } from "./useTeacherQuizEditForm";

type Props = { state: ReturnType<typeof useTeacherQuizEditForm> };

export function QuizEditAttachments({ state }: Props) {
  return <AssessmentAttachmentsSection attachments={state.attachments} attachmentsInputRef={state.attachmentsInputRef} onPickAttachments={state.onPickAttachments} onRemoveAttachment={state.onRemoveAttachment} onClearAttachments={state.onClearAttachments} />;
}
