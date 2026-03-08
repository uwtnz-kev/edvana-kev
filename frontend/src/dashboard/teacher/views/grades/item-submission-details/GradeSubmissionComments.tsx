// Renders grade-save controls and feedback for the item submission details page.
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { useGradeSubmissionState } from "./useGradeSubmissionState";

type Props = { state: ReturnType<typeof useGradeSubmissionState> };

export function GradeSubmissionComments({ state }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
      <h2 className="text-white font-semibold">Grade</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2"><span className="text-sm text-white/80">Total Score</span><Input type="number" min={0} max={state.submission?.maxScore} value={state.totalScore} onChange={(event) => state.setTotalScore(event.target.value)} placeholder={String(state.computedTotal)} className="w-24 bg-white/10 border-white/10 text-white placeholder:text-white/60" /><span className="text-sm text-white/70">/ {state.submission?.maxScore}</span></div>
        <Button type="button" onClick={state.onSave} className="bg-white/15 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl"><Save className="h-4 w-4 mr-2" />Save</Button>
      </div>
      {state.feedback ? <p className="text-sm text-white/80">{state.feedback}</p> : null}
    </div>
  );
}
