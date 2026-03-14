// Renders rubric editing and question-builder controls for exam editing.
import { ClipboardCheck } from "lucide-react";
import { rubricChipStyles } from "@/dashboard/teacher/components/shared/assessment/assessmentVisualStyles";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { useTeacherExamEditForm } from "./useTeacherExamEditForm";

type Props = { state: ReturnType<typeof useTeacherExamEditForm> };

export function ExamEditRulesSection({ state }: Props) {
  if (!state.requiresQuestionBuilder) {
    return (
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <div className={rubricChipStyles.container}><span className={rubricChipStyles.icon}><ClipboardCheck className="h-4 w-4" /></span><span className={rubricChipStyles.text}>Rubric (Optional)</span></div>
          <Textarea id="exam-edit-rubric" value={state.values.rubric} onChange={(event) => state.onFieldChange("rubric", event.target.value)} onBlur={() => state.onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] bg-white/20 border-white/20 text-white placeholder:text-white/70" />
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
        <div className={rubricChipStyles.container}><span className={rubricChipStyles.icon}><ClipboardCheck className="h-4 w-4" /></span><span className={rubricChipStyles.text}>Rubric (Optional)</span></div>
        <Textarea id="exam-edit-rubric" value={state.values.rubric} onChange={(event) => state.onFieldChange("rubric", event.target.value)} onBlur={() => state.onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] bg-white/20 border-white/20 text-white placeholder:text-white/70" />
      </div>
      <div className="space-y-2">
        <div className="mb-2 flex items-center justify-between"><label htmlFor="exam-edit-questions-text" className="text-sm text-white">Questions</label><Button type="button" onClick={state.openQuestionsPreview} className="rounded-xl border border-white/20 bg-white/20 px-3 py-1 text-xs text-white hover:bg-white/30">Preview</Button></div>
        <Textarea id="exam-edit-questions-text" value={state.values.questionsText} readOnly onBlur={() => state.onFieldBlur("questionsText")} placeholder="Use Input Questions to add questions" className="min-h-[140px] cursor-not-allowed bg-white/10 border-white/15 text-white placeholder:text-white/70" />
        {state.showError("questionsText") ? <p className="mt-1 text-sm font-medium text-red-600">{state.errors.questionsText}</p> : null}
      </div>
      <div><Button type="button" onClick={state.onOpenQuestionBuilder} className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30">Edit Questions</Button></div>
    </div>
  );
}
