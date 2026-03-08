/** Orchestrates the extracted assignment edit form sections and modal. */
import { QuestionsPreviewModal } from "@/dashboard/teacher/components/shared/QuestionsPreviewModal";
import { AssignmentEditActions } from "./AssignmentEditActions";
import { AssignmentEditAttachments } from "./AssignmentEditAttachments";
import { AssignmentEditBasicFields } from "./AssignmentEditBasicFields";
import { AssignmentEditRubricSection } from "./AssignmentEditRubricSection";
import { AssignmentEditSubmissionSettings } from "./AssignmentEditSubmissionSettings";
import type { TeacherAssignmentEditFormProps } from "./assignmentEditTypes";
import { useTeacherAssignmentEditForm } from "./useTeacherAssignmentEditForm";

export function TeacherAssignmentEditForm(props: TeacherAssignmentEditFormProps) {
  const form = useTeacherAssignmentEditForm(props);

  return (
    <section className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 space-y-6">
      <AssignmentEditBasicFields assignment={props.assignment} values={form.values} errors={form.errors} touched={form.touched} showError={form.showError} onFieldChange={form.onFieldChange} onFieldBlur={form.onFieldBlur} onClassChange={form.onClassChange} onOpenPreview={() => form.setIsQuestionsPreviewOpen(true)} onOpenQuestionBuilder={form.onOpenQuestionBuilder} />
      <AssignmentEditSubmissionSettings assignment={props.assignment} values={form.values} errors={form.errors} touched={form.touched} showError={form.showError} onFieldChange={form.onFieldChange} onFieldBlur={form.onFieldBlur} onClassChange={form.onClassChange} onOpenPreview={() => form.setIsQuestionsPreviewOpen(true)} onOpenQuestionBuilder={form.onOpenQuestionBuilder} />
      <AssignmentEditRubricSection assignment={props.assignment} values={form.values} errors={form.errors} touched={form.touched} showError={form.showError} onFieldChange={form.onFieldChange} onFieldBlur={form.onFieldBlur} onClassChange={form.onClassChange} onOpenPreview={() => form.setIsQuestionsPreviewOpen(true)} onOpenQuestionBuilder={form.onOpenQuestionBuilder} />
      <AssignmentEditAttachments attachments={form.attachments} attachmentsInputRef={form.attachmentsInputRef} onPickAttachments={form.onPickAttachments} onRemoveAttachment={form.onRemoveAttachment} onClearAttachments={form.onClearAttachments} />
      <QuestionsPreviewModal open={form.isQuestionsPreviewOpen} onClose={() => form.setIsQuestionsPreviewOpen(false)} content={form.values.questionsText} title="Questions Preview" />
      <AssignmentEditActions onCancel={props.onCancel} onSave={form.onSave} />
    </section>
  );
}
