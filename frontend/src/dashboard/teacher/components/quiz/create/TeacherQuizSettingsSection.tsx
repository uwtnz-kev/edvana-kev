// Handles rubric text and question-builder integration without owning form state.
import { ClipboardCheck } from "lucide-react";
import { rubricChipStyles } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { QuizFieldProps } from "./quizCreateTypes";

type Props = QuizFieldProps & {
  requiresQuestionBuilder: boolean;
  onOpenPreview: () => void;
  onOpenQuestionBuilder: () => void;
};

export function TeacherQuizSettingsSection({
  values,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  requiresQuestionBuilder,
  onOpenPreview,
  onOpenQuestionBuilder,
}: Props) {
  if (!requiresQuestionBuilder) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <div className={rubricChipStyles.container}>
            <span className={rubricChipStyles.icon}>
              <ClipboardCheck className="h-4 w-4" />
            </span>
            <span className={rubricChipStyles.text}>Rubric (Optional)</span>
          </div>
          <Textarea id="quiz-rubric" value={values.rubric} onChange={(event) => onFieldChange("rubric", event.target.value)} onBlur={() => onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] border-white/20 bg-white/20 text-white placeholder:text-white/70" />
        </div>
        <div className="rounded-2xl border border-dashed border-white/20 bg-white/10 px-4 py-5 text-sm text-white/75">
          Question builder is only available when Submission Method includes Quiz Form.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <div className={rubricChipStyles.container}>
          <span className={rubricChipStyles.icon}>
            <ClipboardCheck className="h-4 w-4" />
          </span>
          <span className={rubricChipStyles.text}>Rubric (Optional)</span>
        </div>
        <Textarea id="quiz-rubric" value={values.rubric} onChange={(event) => onFieldChange("rubric", event.target.value)} onBlur={() => onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] border-white/20 bg-white/20 text-white placeholder:text-white/70" />
      </div>

      <div className="space-y-2">
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="quiz-questions-text" className="text-sm text-white">Questions</label>
          <Button type="button" onClick={onOpenPreview} className="rounded-xl border border-white/20 bg-white/20 px-3 py-1 text-xs text-white hover:bg-white/30">Preview</Button>
        </div>
        <Textarea id="quiz-questions-text" value={values.questionsText} readOnly onBlur={() => onFieldBlur("questionsText")} placeholder="Use Input Questions to add questions" className="min-h-[140px] cursor-not-allowed border-white/15 bg-white/10 text-white placeholder:text-white/70" />
        {touched.questionsText && errors.questionsText ? <p className="mt-1 text-sm font-medium text-red-600">{errors.questionsText}</p> : null}
      </div>

      <div>
        <Button type="button" onClick={onOpenQuestionBuilder} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">
          Input Questions
        </Button>
      </div>
    </div>
  );
}


