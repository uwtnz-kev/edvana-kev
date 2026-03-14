// Orchestrates the quiz edit form using focused edit-form sections.
import { Button } from "@/components/ui/button";
import { QuestionsPreviewModal } from "@/dashboard/teacher/components/shared/QuestionsPreviewModal";
import type { TeacherQuiz } from "@/dashboard/teacher/components/quiz";
import { QuizEditAttachments } from "./QuizEditAttachments";
import { QuizEditBasicFields } from "./QuizEditBasicFields";
import { QuizEditHeader } from "./QuizEditHeader";
import { QuizEditQuestionSettings } from "./QuizEditQuestionSettings";
import { QuizEditScheduling } from "./QuizEditScheduling";
import { useTeacherQuizEditForm } from "./useTeacherQuizEditForm";

type Props = {
  quiz: TeacherQuiz;
  onCancel: () => void;
  onSaved: () => void;
};

export function TeacherQuizEditForm({ quiz, onCancel, onSaved }: Props) {
  const state = useTeacherQuizEditForm({ onSaved, quiz });

  return (
    <section className="teacher-panel-surface rounded-2xl p-4 sm:p-6 space-y-6">
      <QuizEditHeader subjectName={quiz.subject} />
      <QuizEditScheduling state={state} subjectName={quiz.subject} />
      <QuizEditBasicFields state={state} />
      <QuizEditQuestionSettings state={state} />
      <QuizEditAttachments state={state} />
      <QuestionsPreviewModal open={state.isQuestionsPreviewOpen} onClose={state.closeQuestionsPreview} content={state.values.questionsText} title="Questions Preview" />
      <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
        <Button type="button" onClick={onCancel} className="bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-2xl">Cancel</Button>
        <Button type="button" onClick={state.onSave} className="px-6 py-3 rounded-2xl border border-white/25 bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors duration-200 ring-1 ring-[#3B240F]/20">Save Quiz</Button>
      </div>
    </section>
  );
}

