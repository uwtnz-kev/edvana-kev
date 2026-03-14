// Renders the shared editor shell for one question and delegates type-specific fields.
import { GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { QuestionBuilderQuestion, QuestionBuilderQuestionType } from "@/dashboard/teacher/components/questions/questionsStore";
import { normalizePoints } from "@/dashboard/teacher/components/questions/helpers/questionBuilderHelpers";
import { QuestionCardActions } from "./QuestionCardActions";
import { QuestionEditorFields } from "./QuestionEditorFields";
import { QuestionTypeSelector } from "./QuestionTypeSelector";

type Props = {
  index: number;
  question: QuestionBuilderQuestion;
  onDelete: () => void;
  onMoveDown: () => void;
  onMoveUp: () => void;
  onUpdate: (updater: (question: QuestionBuilderQuestion) => QuestionBuilderQuestion) => void;
};

export function QuestionEditorPanel({ index, question, onDelete, onMoveDown, onMoveUp, onUpdate }: Props) {
  return (
    <section className="space-y-4 rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-xl sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-3 py-1.5">
          <GripVertical className="h-4 w-4 text-white/70" />
          <span className="text-sm font-semibold text-white">Question {index + 1}</span>
        </div>
        <QuestionCardActions onDelete={onDelete} onMoveDown={onMoveDown} onMoveUp={onMoveUp} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm text-white">Question Text</label>
          <Textarea value={question.questionText} onChange={(event) => onUpdate((current) => ({ ...current, questionText: event.target.value }))} placeholder="Enter question text..." className="min-h-[120px] border-white/20 bg-white/20 text-white placeholder:text-white/70" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-white">Points</label>
          <Input type="number" min={0} value={question.points} onChange={(event) => onUpdate((current) => ({ ...current, points: normalizePoints(event.target.value) }))} className="h-12 border-white/20 bg-white/20 text-white" />
        </div>
      </div>

      <QuestionTypeSelector value={question.questionType} onChange={(next) => onUpdate((current) => ({ ...current, questionType: next as QuestionBuilderQuestionType }))} />
      <QuestionEditorFields question={question} onPatch={(patch) => onUpdate((current) => ({ ...current, ...patch }))} />
    </section>
  );
}
