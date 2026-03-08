// Renders rubric editing and question-builder controls for exam editing.
import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { useTeacherExamEditForm } from "./useTeacherExamEditForm";

type Props = { state: ReturnType<typeof useTeacherExamEditForm> };

export function ExamEditRulesSection({ state }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5"><span className="h-7 w-7 rounded-xl bg-slate-600/15 text-slate-700 inline-flex items-center justify-center"><ClipboardCheck className="h-4 w-4" /></span><span className="text-[#3B240F] text-sm font-medium">Rubric (Optional)</span></div>
        <Textarea id="exam-edit-rubric" value={state.values.rubric} onChange={(event) => state.onFieldChange("rubric", event.target.value)} onBlur={() => state.onFieldBlur("rubric")} placeholder="Scoring criteria and weight distribution" className="min-h-[110px] bg-white/20 border-white/20 text-[#3B240F] placeholder:text-[#3B240F]/50" />
      </div>
      <div className="space-y-2">
        <div className="mb-2 flex items-center justify-between"><label htmlFor="exam-edit-questions-text" className="text-sm text-[#3B240F]">Questions</label><Button type="button" onClick={state.openQuestionsPreview} className="rounded-xl border border-white/20 bg-white/20 px-3 py-1 text-xs text-[#3B240F] hover:bg-white/30">Preview</Button></div>
        <Textarea id="exam-edit-questions-text" value={state.values.questionsText} readOnly onBlur={() => state.onFieldBlur("questionsText")} placeholder="Use Input Questions to add questions" className="min-h-[140px] cursor-not-allowed bg-white/10 border-white/15 text-[#3B240F] placeholder:text-[#3B240F]/50" />
        {state.showError("questionsText") ? <p className="mt-1 text-sm font-medium text-red-600">{state.errors.questionsText}</p> : null}
      </div>
      <div><Button type="button" onClick={state.onOpenQuestionBuilder} className="rounded-2xl border border-white/20 bg-white/20 text-[#3B240F] hover:bg-white/30">Edit Questions</Button></div>
    </div>
  );
}
