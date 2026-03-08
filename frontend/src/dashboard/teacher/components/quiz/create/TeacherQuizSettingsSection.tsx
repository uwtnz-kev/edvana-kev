// Handles rubric text and question-builder integration without owning form state.
import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { QuizFieldProps } from "./quizCreateTypes";

type Props = QuizFieldProps & {
  onOpenPreview: () => void;
  onOpenQuestionBuilder: () => void;
};

export function TeacherQuizSettingsSection({
  values,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  onOpenPreview,
  onOpenQuestionBuilder,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-slate-600/15 text-slate-700">
            <ClipboardCheck className="h-4 w-4" />
          </span>
          <span className="text-sm font-medium text-[#3B240F]">Rubric (Optional)</span>
        </div>
        <Textarea id="quiz-rubric" value={values.rubric} onChange={(event) => onFieldChange("rubric", event.target.value)} onBlur={() => onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] border-white/20 bg-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
      </div>

      <div className="space-y-2">
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="quiz-questions-text" className="text-sm text-[#3B240F]">Questions</label>
          <Button type="button" onClick={onOpenPreview} className="rounded-xl border border-white/20 bg-white/20 px-3 py-1 text-xs text-[#3B240F] hover:bg-white/30">Preview</Button>
        </div>
        <Textarea id="quiz-questions-text" value={values.questionsText} readOnly onBlur={() => onFieldBlur("questionsText")} placeholder="Use Input Questions to add questions" className="min-h-[140px] cursor-not-allowed border-white/15 bg-white/10 text-[#3B240F] placeholder:text-[#3B240F]/50" />
        {touched.questionsText && errors.questionsText ? <p className="mt-1 text-sm font-medium text-red-600">{errors.questionsText}</p> : null}
      </div>

      <div>
        <Button type="button" onClick={onOpenQuestionBuilder} className="rounded-2xl border border-white/20 bg-white/20 text-[#3B240F] hover:bg-white/30">
          Input Questions
        </Button>
      </div>
    </div>
  );
}
