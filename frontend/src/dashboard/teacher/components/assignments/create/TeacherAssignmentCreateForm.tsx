// Orchestrates the extracted assignment create sections without owning detailed UI logic.
import { QuestionsPreviewModal } from "@/dashboard/teacher/components/shared/QuestionsPreviewModal";
import { TeacherAssignmentAttachmentsSection } from "./TeacherAssignmentAttachmentsSection";
import { TeacherAssignmentBasicFieldsSection } from "./TeacherAssignmentBasicFieldsSection";
import { TeacherAssignmentCreateActions } from "./TeacherAssignmentCreateActions";
import { TeacherAssignmentRubricSection } from "./TeacherAssignmentRubricSection";
import { TeacherAssignmentSchedulingFieldsSection } from "./TeacherAssignmentSchedulingFieldsSection";
import { TeacherAssignmentSubmissionSection } from "./TeacherAssignmentSubmissionSection";
import type { TeacherAssignmentCreateFormProps } from "./assignmentCreateTypes";
import { useTeacherAssignmentCreateForm } from "./useTeacherAssignmentCreateForm";

export function TeacherAssignmentCreateForm(props: TeacherAssignmentCreateFormProps) {
  const form = useTeacherAssignmentCreateForm(props);

  return (
    <section className="space-y-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-6">
      <TeacherAssignmentBasicFieldsSection
        subjectName={props.subjectName}
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
      />

      <TeacherAssignmentSchedulingFieldsSection
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
        onClassChange={form.onClassChange}
      />

      <TeacherAssignmentRubricSection
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
      />

      <TeacherAssignmentSubmissionSection
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
        onOpenPreview={() => form.setIsQuestionsPreviewOpen(true)}
        onOpenQuestionBuilder={form.onOpenQuestionBuilder}
      />

      <TeacherAssignmentAttachmentsSection
        attachments={form.attachments}
        attachmentsInputRef={form.attachmentsInputRef}
        onPickAttachments={form.onPickAttachments}
        onRemoveAttachment={form.onRemoveAttachment}
        onClearAttachments={form.onClearAttachments}
      />

      <QuestionsPreviewModal
        open={form.isQuestionsPreviewOpen}
        onClose={() => form.setIsQuestionsPreviewOpen(false)}
        content={form.values.questionsText}
        title="Questions Preview"
      />

      <TeacherAssignmentCreateActions onCancel={props.onCancel} onSave={form.onSave} />
    </section>
  );
}
