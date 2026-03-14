// Orchestrates the exam edit form using focused edit-form sections.
import { Button } from "@/components/ui/button";
import { QuestionsPreviewModal } from "@/dashboard/teacher/components/shared/QuestionsPreviewModal";
import type { TeacherExam } from "@/dashboard/teacher/components/exams";
import { ExamEditAttachments } from "./ExamEditAttachments";
import { ExamEditBasicFields } from "./ExamEditBasicFields";
import { ExamEditHeader } from "./ExamEditHeader";
import { ExamEditRulesSection } from "./ExamEditRulesSection";
import { ExamEditScheduleSection } from "./ExamEditScheduleSection";
import { useTeacherExamEditForm } from "./useTeacherExamEditForm";

type Props = {
  exam: TeacherExam;
  onCancel: () => void;
  onSaved: () => void;
};

export function TeacherExamEditForm({ exam, onCancel, onSaved }: Props) {
  const state = useTeacherExamEditForm({ exam, onSaved });

  return (
    <section className="teacher-panel-surface rounded-2xl p-4 sm:p-6 space-y-6">
      <ExamEditHeader subjectName={exam.subject} />
      <ExamEditScheduleSection state={state} />
      <ExamEditBasicFields state={state} />
      <ExamEditRulesSection state={state} />
      <ExamEditAttachments state={state} />
      <QuestionsPreviewModal open={state.isQuestionsPreviewOpen} onClose={state.closeQuestionsPreview} content={state.values.questionsText} title="Questions Preview" />
      <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
        <Button type="button" onClick={onCancel} className="bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-2xl">Cancel</Button>
        <Button type="button" onClick={state.onSave} className="px-6 py-3 rounded-2xl border border-white/25 bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors duration-200 ring-1 ring-white/20">Save Exam</Button>
      </div>
    </section>
  );
}

