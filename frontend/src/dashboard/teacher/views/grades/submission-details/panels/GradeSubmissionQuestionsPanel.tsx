// Question list with per-question scoring inputs for quiz and exam submissions.
import { Input } from "@/components/ui/input";
import type { useGradeSubmissionDetailsState } from "../useGradeSubmissionDetailsState";

type Props = { state: ReturnType<typeof useGradeSubmissionDetailsState> };

export function GradeSubmissionQuestionsPanel({ state }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">Questions and Answers</h2>
      {state.questions.map((question, index) => (
        <div key={question.id} className="rounded-2xl bg-white/10 border border-white/10 p-4 space-y-3">
          <p className="text-white font-medium">{`${index + 1}. ${question.prompt}`}</p>
          <p className="text-white/85"><span className="text-white/65">Student answer:</span> {question.studentAnswer}</p>
          <p className="text-white/85"><span className="text-white/65">Correct answer:</span> {question.correctAnswer}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/70">Score</span>
            <Input type="number" min={0} max={question.points} value={state.questionScores[question.id] ?? ""} onChange={(event) => state.setQuestionScore(question.id, event.target.value)} className="h-8 w-20 bg-white/10 border-white/20 text-white" />
            <span className="text-xs text-white/70">/ {question.points}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

