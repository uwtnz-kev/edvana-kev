// Main grading panel that shows question scoring and total grade actions.
import { GradeSubmissionActionsPanel } from "./panels/GradeSubmissionActionsPanel";
import { GradeSubmissionQuestionsPanel } from "./panels/GradeSubmissionQuestionsPanel";
import type { useGradeSubmissionDetailsState } from "./useGradeSubmissionDetailsState";

type Props = { state: ReturnType<typeof useGradeSubmissionDetailsState> };

export function GradeSubmissionRubricPanel({ state }: Props) {
  if (!state.submission || state.submission.type === "assignment") return null;

  return (
    <div className="space-y-4">
      <GradeSubmissionQuestionsPanel state={state} />
      <GradeSubmissionActionsPanel state={state} />
    </div>
  );
}
