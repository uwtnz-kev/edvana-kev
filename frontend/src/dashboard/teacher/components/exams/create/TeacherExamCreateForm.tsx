// Orchestrates the extracted exam create sections without owning detailed UI logic.
import { QuestionsPreviewModal } from "@/dashboard/teacher/components/shared/QuestionsPreviewModal";
import { TeacherExamAttachmentsSection } from "./TeacherExamAttachmentsSection";
import { TeacherExamBasicFieldsSection } from "./TeacherExamBasicFieldsSection";
import { TeacherExamCreateActions } from "./TeacherExamCreateActions";
import { TeacherExamRulesSection } from "./TeacherExamRulesSection";
import { TeacherExamSchedulingFieldsSection } from "./TeacherExamSchedulingFieldsSection";
import type { TeacherExamCreateFormProps } from "./examCreateTypes";
import { useTeacherExamCreateForm } from "./useTeacherExamCreateForm";

export function TeacherExamCreateForm(props: TeacherExamCreateFormProps) {
  const form = useTeacherExamCreateForm(props);

  return (
    <section className="space-y-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-6">
      <TeacherExamBasicFieldsSection
        subjectName={props.subjectName}
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
        onSubmissionMethodsChange={form.onSubmissionMethodsChange}
      />

      <TeacherExamSchedulingFieldsSection
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
        onSubmissionMethodsChange={form.onSubmissionMethodsChange}
        onClassChange={form.onClassChange}
      />

      <TeacherExamRulesSection
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
        onSubmissionMethodsChange={form.onSubmissionMethodsChange}
        requiresQuestionBuilder={form.requiresQuestionBuilder}
        onOpenPreview={() => form.setIsQuestionsPreviewOpen(true)}
        onOpenQuestionBuilder={form.onOpenQuestionBuilder}
      />

      <TeacherExamAttachmentsSection
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

      <TeacherExamCreateActions onCancel={props.onCancel} onSave={form.onSave} />
    </section>
  );
}
