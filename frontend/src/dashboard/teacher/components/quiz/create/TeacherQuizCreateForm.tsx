// Orchestrates the extracted quiz create sections while keeping behavior unchanged.
import { QuestionsPreviewModal } from "@/dashboard/teacher/components/shared/QuestionsPreviewModal";
import { TeacherQuizAttachmentsSection } from "./TeacherQuizAttachmentsSection";
import { TeacherQuizBasicFieldsSection } from "./TeacherQuizBasicFieldsSection";
import { TeacherQuizCreateActions } from "./TeacherQuizCreateActions";
import { TeacherQuizSchedulingFieldsSection } from "./TeacherQuizSchedulingFieldsSection";
import { TeacherQuizSettingsSection } from "./TeacherQuizSettingsSection";
import type { TeacherQuizCreateFormProps } from "./quizCreateTypes";
import { useTeacherQuizCreateForm } from "./useTeacherQuizCreateForm";

export function TeacherQuizCreateForm(props: TeacherQuizCreateFormProps) {
  const form = useTeacherQuizCreateForm(props);

  return (
    <section className="space-y-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl sm:p-6">
      <TeacherQuizBasicFieldsSection
        subjectName={props.subjectName}
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
      />

      <TeacherQuizSchedulingFieldsSection
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
        onClassChange={form.onClassChange}
      />

      <TeacherQuizSettingsSection
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
        onOpenPreview={() => form.setIsQuestionsPreviewOpen(true)}
        onOpenQuestionBuilder={form.onOpenQuestionBuilder}
      />

      <TeacherQuizAttachmentsSection
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

      <TeacherQuizCreateActions onCancel={props.onCancel} onSave={form.onSave} />
    </section>
  );
}
