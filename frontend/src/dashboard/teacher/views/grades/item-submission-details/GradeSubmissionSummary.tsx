// Renders either the assignment response or the per-question submission breakdown.
import { Input } from "@/components/ui/input";
import type { useGradeSubmissionState } from "./useGradeSubmissionState";

type Props = { state: ReturnType<typeof useGradeSubmissionState> };

export function GradeSubmissionSummary({ state }: Props) {
  if (state.item?.type === "assignment") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-white font-semibold mb-2">Text Response</h2>
        <p className="text-white/85">{state.submission?.submissionDetails?.responseText ?? state.submission?.assignmentTextResponse ?? "No response text submitted."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {state.questions.map((question, index) => (
        <div key={question.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
          <p className="text-white font-medium">{`${index + 1}. ${question.prompt}`}</p>
          <p className="text-white/85"><span className="text-white/60">Student answer:</span> {question.studentAnswer}</p>
          <p className="text-white/85"><span className="text-white/60">Correct answer:</span> {question.correctAnswer}</p>
          <div className="flex items-center gap-2"><span className="text-xs text-white/70">Points</span><Input type="number" min={0} max={question.points} value={state.questionScores[question.id] ?? ""} onChange={(event) => state.setQuestionScore(question.id, event.target.value)} className="h-8 w-20 bg-white/10 border-white/20 text-white" /><span className="text-xs text-white/70">/ {question.points}</span></div>
        </div>
      ))}
    </div>
  );
}
