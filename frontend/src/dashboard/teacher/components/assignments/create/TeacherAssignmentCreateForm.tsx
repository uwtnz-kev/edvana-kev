// Orchestrates the extracted assignment create sections without owning detailed UI logic.
import { QuestionsPreviewModal } from "@/dashboard/teacher/components/shared/QuestionsPreviewModal";
import { SubjectFileDuplicateDialog } from "@/dashboard/teacher/components/subjects/upload/SubjectFileDuplicateDialog";
import { TeacherAssignmentAttachmentsSection } from "./TeacherAssignmentAttachmentsSection";
import { TeacherAssignmentBasicFieldsSection } from "./TeacherAssignmentBasicFieldsSection";
import { TeacherAssignmentCreateActions } from "./TeacherAssignmentCreateActions";
import { TeacherAssignmentInstructionsSection } from "./TeacherAssignmentInstructionsSection";
import { TeacherAssignmentSchedulingFieldsSection } from "./TeacherAssignmentSchedulingFieldsSection";
import { TeacherAssignmentSubmissionSection } from "./TeacherAssignmentSubmissionSection";
import type { TeacherAssignmentCreateFormProps } from "./assignmentCreateTypes";
import { useTeacherAssignmentCreateForm } from "./useTeacherAssignmentCreateForm";
import type { DuplicateAssignmentFileMatch, DuplicateAssignmentTitleMatch } from "@/dashboard/teacher/components/shared";

function buildDuplicateAssignmentLocations(match: DuplicateAssignmentFileMatch) {
  return [[match.classLabel, match.subject, `Assignment: ${match.assignmentTitle}`].filter(Boolean).join(" -> ")];
}

function buildDuplicateAssignmentTitleLocations(match: DuplicateAssignmentTitleMatch) {
  return [[match.classLabel, match.subject, `Assignment: ${match.assignmentTitle}`].filter(Boolean).join(" -> ")];
}

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
        onSubmissionMethodsChange={form.onSubmissionMethodsChange}
        onClassChange={form.onClassChange}
        isClassLocked={form.isClassLocked}
      />

      <TeacherAssignmentSchedulingFieldsSection
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
        onSubmissionMethodsChange={form.onSubmissionMethodsChange}
      />

      <TeacherAssignmentInstructionsSection
        values={form.values}
        errors={form.errors}
        touched={form.touched}
        onFieldChange={form.onFieldChange}
        onFieldBlur={form.onFieldBlur}
        onSubmissionMethodsChange={form.onSubmissionMethodsChange}
      />

      <TeacherAssignmentSubmissionSection
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

      <TeacherAssignmentAttachmentsSection
        allowFileUpload={form.allowsFileUpload}
        attachments={form.attachments}
        attachmentsError={form.attachmentsError}
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

      <SubjectFileDuplicateDialog
        open={form.duplicateDialogOpen}
        duplicateFileName={form.pendingDuplicateMatch?.attachmentName ?? null}
        existingLocations={form.pendingDuplicateMatch ? buildDuplicateAssignmentLocations(form.pendingDuplicateMatch) : []}
        busy={form.duplicateDecisionBusy}
        onDecision={form.handleDuplicateDecision}
        onOpenChange={(open) => {
          if (!open) {
            void form.handleDuplicateDecision("cancel");
            return;
          }
          form.setDuplicateDialogOpen(true);
        }}
      />

      <SubjectFileDuplicateDialog
        open={form.titleDuplicateDialogOpen}
        duplicateFileName={form.pendingTitleDuplicateMatch?.assignmentTitle ?? null}
        existingLocations={form.pendingTitleDuplicateMatch ? buildDuplicateAssignmentTitleLocations(form.pendingTitleDuplicateMatch) : []}
        busy={form.titleDuplicateDecisionBusy}
        dialogTitle="Duplicate assignment title found"
        description="An assignment with this title already exists in the same class and subject."
        duplicateItemLabel="Existing assignment title"
        onDecision={form.handleTitleDuplicateDecision}
        onOpenChange={(open) => {
          if (!open) {
            void form.handleTitleDuplicateDecision("cancel");
            return;
          }
          form.setTitleDuplicateDialogOpen(true);
        }}
      />
    </section>
  );
}
