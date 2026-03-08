// Grading actions panel for total score editing and save feedback.
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { useGradeSubmissionDetailsState } from "../useGradeSubmissionDetailsState";

type Props = { state: ReturnType<typeof useGradeSubmissionDetailsState> };

export function GradeSubmissionActionsPanel({ state }: Props) {
  if (!state.submission) return null;

  return (
    <div className="rounded-2xl bg-white/10 border border-white/10 p-4 space-y-4">
      <h2 className="text-lg font-semibold text-[#3B240F]">Grading Actions</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/80">Total score</span>
          <Input type="number" min={0} max={state.submission.maxScore} value={state.manualTotal} onChange={(event) => state.setManualTotal(event.target.value)} placeholder={String(state.calculatedTotal)} className="w-24 bg-white/10 border-white/10 text-white placeholder:text-white/60" />
          <span className="text-sm text-white/70">/ {state.submission.maxScore}</span>
        </div>
        <Button type="button" onClick={state.saveGrade} className="bg-white/15 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl">
          <Save className="h-4 w-4 mr-2" />Save Grade
        </Button>
      </div>
      {state.feedback ? <p className="text-white/80 text-sm">{state.feedback}</p> : null}
    </div>
  );
}
