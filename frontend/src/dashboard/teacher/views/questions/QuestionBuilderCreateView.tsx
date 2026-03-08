// Orchestrates the question builder create page by composing extracted builder parts.
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionBuilderCanvas } from "@/dashboard/teacher/components/questions/builder/QuestionBuilderCanvas";
import { QuestionBuilderHeader } from "@/dashboard/teacher/components/questions/builder/QuestionBuilderHeader";
import { QuestionPreviewPanel } from "@/dashboard/teacher/components/questions/builder/QuestionPreviewPanel";
import { useQuestionBuilderCreateState } from "./useQuestionBuilderCreateState";

export default function QuestionBuilderCreateView() {
  const builder = useQuestionBuilderCreateState();
  if (!builder.selectedType) return null;

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <QuestionBuilderHeader title={builder.title} totalPoints={builder.totalPoints} theme={builder.theme} onBack={builder.handleBackClick} />
        <QuestionBuilderCanvas questions={builder.questions} onMove={builder.moveQuestion} onRemove={builder.removeQuestion} onUpdate={builder.updateQuestion} />
        <div className="flex justify-start">
          <Button type="button" onClick={builder.addQuestion} className="rounded-2xl border border-white/25 bg-white/20 text-[#3B240F] hover:bg-white/30">
            <Plus className="h-4 w-4" />
            Add Question
          </Button>
        </div>
        <QuestionPreviewPanel open={builder.isBackConfirmOpen} totalPoints={builder.totalPoints} onCancel={builder.handleBackClick} onConfirmBack={builder.handleConfirmBack} onOpenChange={builder.setIsBackConfirmOpen} onSave={builder.saveQuestions} />
      </div>
    </div>
  );
}
